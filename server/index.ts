import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;


const httpServer = createServer(app);
const ADMIN_HASH = 'f96dfc73494c2ebc0266c98beaeade469af6132313c99fafa27104059a1e3b79'; // SHA-256 of "m9803fds"

const io = new Server(httpServer, {
    maxHttpBufferSize: 1e8, // 100 MB
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Vite frontend
const distPath = path.join(__dirname, "..", "..", "dist");

app.use(express.static(distPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address (authenticated account)
        to: 'acereconforce@gmail.com', // Receiver address
        replyTo: email, // Allow replying directly to the user
        subject: `New Contact Form Submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    };

    try {
        // If credentials are not provided, log it (dev mode simulation)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('No email credentials found. Logging email content instead:');
            console.log(mailOptions);
            // Simulate success for demo purposes if no credentials
            return res.status(200).json({ message: 'Email logged (dev mode)' });
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});


const MESSAGES_FILE = path.join(process.cwd(), 'server', 'messages.json');

// Interface for Message
interface Message {
    id: string;
    text?: string;
    file?: string;
    fileType?: string;
    fileName?: string;
    sender: 'me' | 'other'; // Note: In a real app we'd store userId
    timestamp: Date;
    replyTo?: Message;
    socketId: string; // Store socketId to determine sender
    userId?: string; // Persistent user ID
}

let messages: Message[] = [];
let adminSocketIds = new Set<string>(); // Track active admin sessions

// Load messages on startup
if (fs.existsSync(MESSAGES_FILE)) {
    try {
        const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        messages = JSON.parse(data);
        console.log(`Loaded ${messages.length} messages from disk.`);
    } catch (err) {
        console.error('Error loading messages:', err);
    }
}

const saveMessages = () => {
    try {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    } catch (err) {
        console.error('Error saving messages:', err);
    }
};

app.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, adminToken } = req.body;

    if (adminToken !== ADMIN_HASH) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const project = projectsData.projects.find(p => p.id === id);
    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    if (title) project.title = title;
    if (description) project.description = description;

    saveProjects();
    res.json({ message: 'Project updated', project });
});


// --- Projects Feature ---
const PROJECTS_FILE = path.join(process.cwd(), 'server', 'projects.json');
const UPLOADS_DIR = path.join(process.cwd(), 'server', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve static files
app.use('/uploads', express.static(UPLOADS_DIR));

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

interface ProjectsData {
    count: number;
    projects: Project[];
}

let projectsData: ProjectsData = { count: 0, projects: [] };

// Load projects data
if (fs.existsSync(PROJECTS_FILE)) {
    try {
        const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
        projectsData = JSON.parse(data);
    } catch (err) {
        console.error('Error loading projects:', err);
    }
}

const saveProjects = () => {
    try {
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsData, null, 2));
    } catch (err) {
        console.error('Error saving projects:', err);
    }
};

// API Endpoints for Projects
app.get('/api/projects', (req, res) => {
    res.json(projectsData);
});

app.post('/api/projects/count', (req, res) => {
    const { count, adminToken } = req.body;
    if (adminToken !== ADMIN_HASH) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    projectsData.count = count;
    saveProjects();
    res.json({ message: 'Count updated', count: projectsData.count });
});

app.post('/api/projects', (req, res) => {
    const { title, description, image, adminToken } = req.body;

    if (adminToken !== ADMIN_HASH) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!title || !image) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Handle base64 image
        const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: 'Invalid image string' });
        }

        const type = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const extension = type.split('/')[1];
        const filename = `project-${Date.now()}.${extension}`;
        const filepath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(filepath, buffer);

        const newProject: Project = {
            id: Date.now().toString(),
            title,
            description,
            imageUrl: `/uploads/${filename}`
        };

        projectsData.projects.unshift(newProject); // Add to beginning
        saveProjects();

        res.json({ message: 'Project added', project: newProject });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { adminToken } = req.body; // In DELETE, body might not be standard but express.json() parses it if sent

    // Note: For DELETE requests, clients often send data in query or body. 
    // Let's check headers or body. simple auth for now via body.
    if (req.body.adminToken !== ADMIN_HASH) {
        // If not in body, check query (optional fallback)
        if (req.query.adminToken !== ADMIN_HASH) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    }

    const projectIndex = projectsData.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }

    const project = projectsData.projects[projectIndex];

    // Try to delete image file
    try {
        const filename = project.imageUrl.split('/uploads/')[1];
        if (filename) {
            const filepath = path.join(UPLOADS_DIR, filename);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
    } catch (err) {
        console.error('Error deleting image file:', err);
    }

    projectsData.projects.splice(projectIndex, 1);
    saveProjects();

    res.json({ message: 'Project deleted' });
});


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send existing history to the new client
    socket.emit('chat_history', messages);
    socket.emit('admin_status', adminSocketIds.size > 0); // Send current admin status

    socket.on('request_history', () => {
        socket.emit('chat_history', messages);
    });

    socket.on('admin_entered', (token: string) => {
        if (token === ADMIN_HASH) {
            adminSocketIds.add(socket.id);
            io.emit('admin_status', true);
        }
    });

    socket.on('message', (data) => {
        // Add timestamp if missing
        const msg = {
            ...data,
            timestamp: data.timestamp || new Date()
        };
        messages.push(msg);
        saveMessages();
        io.emit('message', msg);
    });

    socket.on('delete_message', (data: { id: string, adminToken?: string }) => {
        if (data.adminToken !== ADMIN_HASH) {
            console.warn(`Unauthorized delete attempt from ${socket.id}`);
            return;
        }
        messages = messages.filter(m => m.id !== data.id);
        saveMessages();
        io.emit('message_deleted', data.id);
    });

    socket.on('edit_message', (data: { id: string, text: string, adminToken?: string }) => {
        if (data.adminToken !== ADMIN_HASH) {
            console.warn(`Unauthorized edit attempt from ${socket.id}`);
            return;
        }
        messages = messages.map(m =>
            m.id === data.id ? { ...m, text: data.text } : m
        );
        saveMessages();
        io.emit('message_edited', { id: data.id, text: data.text });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        if (adminSocketIds.has(socket.id)) {
            adminSocketIds.delete(socket.id);
            io.emit('admin_status', adminSocketIds.size > 0);
        }
    });
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
