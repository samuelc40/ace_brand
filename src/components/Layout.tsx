import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CompanyLogo from '../assets/company-logo-bg.png';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-cyber-black text-white font-sans selection:bg-cyber-green selection:text-black relative">
            {/* Background Image Layer */}
            <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <img
                    src={CompanyLogo}
                    alt="Background Logo"
                    className="w-[80vw] md:w-[60vw] lg:w-[40vw] object-contain opacity-[0.27] filter blur-[3px] brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] select-none animate-pulse-slow"
                />
            </div>

            {/* Content Layer (z-10 to stay above background) */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
