import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, LogOut, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = () => {
            const token = localStorage.getItem('ace_admin_token');
            if (token === 'f96dfc73494c2ebc0266c98beaeade469af6132313c99fafa27104059a1e3b79') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [location]);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('ace_admin_auth');
            localStorage.removeItem('ace_admin_token');
            setIsAdmin(false);
            navigate('/');
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Training', path: '/training' },
        { name: 'Contact', path: '/contact' },
    ];

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Check local storage or preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.documentElement.classList.add('light-mode');
        } else {
            setIsDarkMode(true);
            document.documentElement.classList.remove('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed w-full z-50 bg-cyber-black/90 backdrop-blur-md border-b border-cyber-green/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <Shield className="h-8 w-8 text-cyber-green group-hover:text-cyber-red transition-colors duration-300" />
                            <span className="text-white font-bold text-xl tracking-wider">
                                ACE <span className="text-cyber-green group-hover:text-cyber-red transition-colors duration-300">RECON</span> FORCE
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${location.pathname === link.path
                                        ? 'text-cyber-green'
                                        : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyber-green transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                </Link>
                            ))}

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-cyber-gray/50 transition-colors duration-300 text-cyber-green"
                                aria-label="Toggle Theme"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {isAdmin && (
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 flex items-center gap-1"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyber-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyber-green"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cyber-black/95 border-b border-cyber-green/20"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                                        ? 'text-cyber-green bg-cyber-gray'
                                        : 'text-gray-300 hover:text-white hover:bg-cyber-gray'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cyber-gray"
                            >
                                <div className="flex items-center gap-2">
                                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                                </div>
                            </button>

                            {isAdmin && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} /> Logout
                                    </div>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
