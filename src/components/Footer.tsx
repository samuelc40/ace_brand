import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-cyber-black border-t border-cyber-green/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            ACE <span className="text-cyber-green">RECON</span> FORCE
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Securing Digital Infrastructure. Training the Next Cyber Warriors.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/about" className="hover:text-cyber-green transition-colors">About Us</a></li>
                            <li><a href="/services" className="hover:text-cyber-green transition-colors">Services</a></li>
                            <li><a href="/training" className="hover:text-cyber-green transition-colors">Training</a></li>
                            <li><a href="/contact" className="hover:text-cyber-green transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com/ace_recon_force" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors"><Instagram className="h-6 w-6" /></a>
                            <a href="https://twitter.com/acereconforce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors"><Twitter className="h-6 w-6" /></a>
                            <a href="https://www.linkedin.com/in/ace-recon-force-3631773a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-red transition-colors"><Linkedin className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-cyber-gray text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} ACE RECON FORCE SOLUTIONS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
