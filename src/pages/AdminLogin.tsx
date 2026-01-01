
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const hashPassword = async (pwd: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(pwd);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const hash = await hashPassword(password);

        // Hash for "pass"
        if (hash === 'f96dfc73494c2ebc0266c98beaeade469af6132313c99fafa27104059a1e3b79') {
            localStorage.setItem('ace_admin_auth', 'true');
            localStorage.setItem('ace_admin_token', hash); // Store token for server validation
            navigate('/');
        } else {
            setError('Access Denied: Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-stone-900/50 border border-stone-800 rounded-xl backdrop-blur-sm shadow-xl shadow-black/50">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-amber-900/20 rounded-full mb-4 ring-1 ring-amber-500/20">
                        <Lock className="h-8 w-8 text-amber-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-wider">ADMIN ACCESS</h1>
                    <p className="text-stone-500 text-sm mt-2">Restricted Area</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Passcode..."
                            className="w-full bg-stone-950 border border-stone-800 text-amber-500 rounded-lg p-4 text-center tracking-widest text-lg focus:outline-none focus:border-amber-700 transition-colors placeholder-stone-700"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="flex items-center justify-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleLogin}
                        className="w-full justify-center bg-amber-700 hover:bg-amber-600 text-white"
                    >
                        AUTHENTICATE
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
