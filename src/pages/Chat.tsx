import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Paperclip, Users, MessageSquare, Copy, Reply, X, FileVideo, FileAudio, FileArchive, FileText, Trash2, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const socketUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:5000';

const socket: Socket = io(socketUrl);

interface Message {
    id: string;
    text?: string;
    file?: string; // base64 data
    fileType?: string; // mime type
    fileName?: string;
    sender: 'me' | 'other';
    timestamp: Date;
    replyTo?: Message;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null); // For mobile/click menu
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [adminOnline, setAdminOnline] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        let storedUserId = localStorage.getItem('ace_chat_userid');
        if (!storedUserId) {
            storedUserId = 'user_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('ace_chat_userid', storedUserId);
        }
        setUserId(storedUserId);

        const adminAuth = localStorage.getItem('ace_admin_auth');
        setIsAdmin(adminAuth === 'true');
    }, []);

    useEffect(() => {
        if (!userId) return; // Wait for userId to be initialized

        const handleReceiveMessage = (data: any) => {
            const isMe = data.userId === userId;
            setMessages((prev) => [...prev, {
                id: data.id || Date.now().toString() + Math.random(),
                text: data.text,
                file: data.file,
                fileType: data.fileType,
                fileName: data.fileName,
                replyTo: data.replyTo,
                sender: isMe ? 'me' : 'other',
                timestamp: new Date(data.timestamp),
                userId: data.userId // Store it for reference
            } as Message]); // Cast to Message to handle dynamic prop adding if interface isn't updated yet
        };

        const handleHistory = (history: any[]) => {
            const formattedHistory = history.map(msg => ({
                ...msg,
                sender: msg.userId === userId ? 'me' : 'other',
                timestamp: new Date(msg.timestamp)
            }));
            setMessages(formattedHistory);
        };

        socket.on('connect', () => {
            console.log('Connected to chat server');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from chat server');
            setIsConnected(false);
        });

        socket.on('message', handleReceiveMessage);
        socket.on('chat_history', handleHistory);

        socket.on('message_deleted', (id: string) => {
            setMessages((prev) => prev.filter(msg => msg.id !== id));
        });

        socket.on('message_edited', (data: { id: string, text: string }) => {
            setMessages((prev) => prev.map(msg =>
                msg.id === data.id ? { ...msg, text: data.text } : msg
            ));
        });

        // Request history explicitly to ensure we don't miss it due to race conditions
        if (socket.connected) {
            setIsConnected(true);
            socket.emit('request_history');
        }

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message', handleReceiveMessage);
            socket.off('chat_history', handleHistory);
            socket.off('message_deleted');
            socket.off('message_edited');
        };
    }, [userId]); // Re-run effect when userId is set

    // Separate effect for admin presence
    useEffect(() => {
        const token = localStorage.getItem('ace_admin_token');
        if (isAdmin && token) {
            socket.emit('admin_entered', token);
        }

        const handleAdminStatus = (status: boolean) => {
            setAdminOnline(status);
        };

        socket.on('admin_status', handleAdminStatus);

        return () => {
            socket.off('admin_status');
        };
    }, [isAdmin]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const payload = {
            id: Date.now().toString() + Math.random(),
            text: inputText,
            socketId: socket.id,
            userId: userId, // Send persistent ID
            replyTo: replyingTo
        };

        socket.emit('message', payload);
        setInputText('');
        setReplyingTo(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const payload = {
                    id: Date.now().toString() + Math.random(),
                    file: reader.result as string,
                    fileType: file.type,
                    fileName: file.name,
                    socketId: socket.id,
                    userId: userId, // Send persistent ID
                    replyTo: replyingTo
                };
                socket.emit('message', payload);
                setReplyingTo(null);
            };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = (id: string) => {
        const token = localStorage.getItem('ace_admin_token');
        socket.emit('delete_message', { id, adminToken: token });
        setSelectedMessageId(null);
    };

    const handleStartEdit = (msg: Message) => {
        if (msg.text) {
            setEditingMessageId(msg.id);
            setEditContent(msg.text);
            setSelectedMessageId(null);
        }
    };

    const handleSubmitEdit = (id: string) => {
        const token = localStorage.getItem('ace_admin_token');
        socket.emit('edit_message', { id, text: editContent, adminToken: token });
        setEditingMessageId(null);
        setEditContent('');
    };

    const handleCancelEdit = () => {
        setEditingMessageId(null);
        setEditContent('');
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setSelectedMessageId(null);
    };

    const handleReply = (msg: Message) => {
        setReplyingTo(msg);
        setSelectedMessageId(null);
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('video/')) return <FileVideo className="h-8 w-8 text-blue-400" />;
        if (mimeType.startsWith('audio/')) return <FileAudio className="h-8 w-8 text-purple-400" />;
        if (mimeType.includes('zip') || mimeType.includes('compressed')) return <FileArchive className="h-8 w-8 text-yellow-500" />;
        return <FileText className="h-8 w-8 text-gray-400" />;
    };

    const groupMessagesByDate = (msgs: Message[]) => {
        const groups: { [key: string]: Message[] } = {};
        msgs.forEach(msg => {
            const dateObj = new Date(msg.timestamp);
            if (isNaN(dateObj.getTime())) return;

            const date = dateObj.toLocaleDateString();
            if (!groups[date]) groups[date] = [];
            groups[date].push(msg);
        });
        return groups;
    };

    const getDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toLocaleDateString() === today.toLocaleDateString()) return 'Today';
        if (date.toLocaleDateString() === yesterday.toLocaleDateString()) return 'Yesterday';
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const messageGroups = groupMessagesByDate(messages);

    return (
        <div className="fixed inset-0 top-16 z-40 bg-stone-950 text-amber-50 flex flex-col items-center overflow-hidden">
            <div className="w-full h-full flex flex-col">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-stone-900 border border-stone-800 p-4 rounded-t-xl flex items-center justify-between shadow-lg shadow-amber-900/10 shrink-0"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-900/30 rounded-lg">
                            <Users className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-amber-100">ACE NETWORK</h1>
                            <p className="text-xs text-stone-400">learn together</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {adminOnline && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full mr-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase">Admin Online</span>
                            </div>
                        )}

                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-stone-400">Live</span>
                    </div>
                </motion.div>

                {/* Connection Warning */}
                <AnimatePresence>
                    {!isConnected && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs text-center py-1"
                        >
                            Connection lost. Attempting to reconnect...
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Chat Area */}
                <div className="flex-1 bg-stone-900/50 border-x border-stone-800 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent relative" onClick={() => setSelectedMessageId(null)}>
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-stone-500 opacity-50">
                            <MessageSquare className="h-12 w-12 mb-2" />
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    )}

                    {Object.entries(messageGroups).map(([date, groupMessages]) => (
                        <div key={date}>
                            <div className="flex justify-center my-4 sticky top-0 z-10">
                                <span className="text-xs bg-stone-800 text-stone-400 px-3 py-1 rounded-full border border-stone-700 shadow-sm uppercase tracking-wider font-medium">
                                    {getDateLabel(date)}
                                </span>
                            </div>

                            {groupMessages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`relative max-w-[85%] md:max-w-[70%] mb-4 sm:mb-2`}>
                                        {/* Interaction Menu */}
                                        {selectedMessageId === msg.id && (
                                            <div className={`absolute top-0 z-50 flex flex-col gap-2 bg-stone-800 rounded-lg shadow-xl p-1 border border-stone-700 ${msg.sender === 'me'
                                                ? 'right-full mr-2'
                                                : 'left-full ml-2'
                                                }`}>
                                                <button onClick={(e) => { e.stopPropagation(); handleReply(msg); }} className="p-2 hover:bg-stone-700 rounded text-amber-500" title="Reply">
                                                    <Reply className="h-4 w-4" />
                                                </button>
                                                {msg.text && (
                                                    <button onClick={(e) => { e.stopPropagation(); handleCopy(msg.text!); }} className="p-2 hover:bg-stone-700 rounded text-amber-500" title="Copy">
                                                        <Copy className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {isAdmin && (
                                                    <>
                                                        <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }} className="p-2 hover:bg-red-900/30 rounded text-red-500" title="Delete">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                        {msg.text && (
                                                            <button onClick={(e) => { e.stopPropagation(); handleStartEdit(msg); }} className="p-2 hover:bg-stone-700 rounded text-blue-400" title="Edit">
                                                                <Edit2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        <div
                                            className={`rounded-xl p-3 shadow-md cursor-pointer transition-all ${msg.sender === 'me'
                                                ? 'bg-amber-900/40 text-amber-50 border border-amber-800/50 rounded-br-none hover:bg-amber-900/50'
                                                : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-bl-none hover:bg-stone-700/80'
                                                } ${selectedMessageId === msg.id ? 'ring-1 ring-amber-500/50' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); setSelectedMessageId(selectedMessageId === msg.id ? null : msg.id); }}
                                        >
                                            {/* Replying To Preview */}
                                            {msg.replyTo && (
                                                <div className={`mb-2 p-2 rounded text-xs border-l-2 ${msg.sender === 'me' ? 'bg-amber-950/50 border-amber-600' : 'bg-stone-900/50 border-stone-500'}`}>
                                                    <p className="font-bold opacity-75">{msg.replyTo.sender === 'me' ? 'You' : 'Others'}</p>
                                                    <p className="truncate opacity-60">{msg.replyTo.file ? '[Attachment]' : msg.replyTo.text}</p>
                                                </div>
                                            )}

                                            {/* File Display */}
                                            {msg.file && (
                                                <div className="mb-2">
                                                    {msg.fileType?.startsWith('image/') ? (
                                                        <img src={msg.file} alt="Shared content" className="max-w-full rounded-lg border border-stone-700/50" />
                                                    ) : (
                                                        <div className="flex items-center gap-3 p-3 bg-stone-950/50 rounded-lg border border-stone-700/50">
                                                            {getFileIcon(msg.fileType || '')}
                                                            <div className="overflow-hidden">
                                                                <p className="text-sm font-medium truncate max-w-[150px]">{msg.fileName || 'Unknown File'}</p>
                                                                <a href={msg.file} download={msg.fileName || 'download'} className="text-xs text-amber-500 hover:underline block mt-1" onClick={(e) => e.stopPropagation()}>
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Text Display */}
                                            {editingMessageId === msg.id ? (
                                                <div className="flex flex-col gap-2 min-w-[200px]" onClick={e => e.stopPropagation()}>
                                                    <textarea
                                                        value={editContent}
                                                        onChange={(e) => setEditContent(e.target.value)}
                                                        className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-sm text-white focus:outline-none focus:border-amber-500"
                                                        rows={2}
                                                    />
                                                    <div className="flex gap-2 justify-end">
                                                        <button onClick={() => handleCancelEdit()} className="p-1 hover:bg-stone-700 rounded text-red-400">
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                        <button onClick={() => handleSubmitEdit(msg.id)} className="p-1 hover:bg-stone-700 rounded text-green-400">
                                                            <Check className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                msg.text && <p className="text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>
                                            )}

                                            <span className="text-[10px] opacity-50 block text-right mt-1 ml-4 text-amber-200/60">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Reply Indicator */}
                <AnimatePresence>
                    {replyingTo && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-stone-900/90 border-t border-stone-800 px-4 py-2 flex items-center justify-between shrink-0"
                        >
                            <div className="flex-1">
                                <p className="text-xs text-amber-500 font-bold mb-1">Replying to {replyingTo.sender === 'me' ? 'yourself' : 'others'}</p>
                                <p className="text-sm text-stone-400 truncate max-w-[80vw]">{replyingTo.file ? `[Attachment: ${replyingTo.fileName}]` : replyingTo.text}</p>
                            </div>
                            <button onClick={() => setReplyingTo(null)} className="p-1 hover:bg-stone-800 rounded">
                                <X className="h-4 w-4 text-stone-500" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="bg-stone-900 border-t border-stone-800 p-4 shrink-0">
                    <form onSubmit={sendMessage} className="flex gap-3 items-end">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 bg-stone-800 hover:bg-stone-700 text-amber-500 rounded-lg transition-colors border border-stone-700"
                            title="Upload File"
                        >
                            <Paperclip className="h-5 w-5" />
                        </button>

                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-stone-950 border border-stone-800 text-stone-200 rounded-lg p-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-900/50 placeholder-stone-600"
                        />

                        <button
                            type="submit"
                            disabled={!inputText.trim() && !fileInputRef.current?.value}
                            className="p-3 bg-amber-700 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-amber-900/20"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Chat;
