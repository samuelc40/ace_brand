import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Terminal, Palette } from 'lucide-react';
import Button from '../components/Button';

const Home = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cyber-black">
                {/* Background Grid & Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-cyber-black"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center mb-6">
                            <span className="px-4 py-1.5 rounded-full border border-cyber-green/30 bg-cyber-green/10 text-cyber-green text-sm font-mono tracking-wider">
                                SYSTEM STATUS: SECURE
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            Securing Digital <span className="text-cyber-green text-glow">Infrastructure</span>.
                            <br />
                            Building Modern Web & <span className="text-cyber-red">Cyber Solutions</span>.
                        </h1>

                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
                            ACE RECON FORCE SOLUTIONS delivers secure website development, cybersecurity testing, surveillance customization, and hands-on ethical hacking & CTF training for competition.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/services">
                                <Button variant="primary" size="lg">Explore Our Services</Button>
                            </Link>
                            <Link to="/training">
                                <Button variant="outline" size="lg">Get Started</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-24 bg-cyber-dark relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="h-10 w-10 text-cyber-green" />}
                            title="Security Audits"
                            description="Comprehensive vulnerability assessments and penetration testing for web and mobile applications."
                        />
                        <FeatureCard
                            icon={<Terminal className="h-10 w-10 text-cyber-blue" />}
                            title="Elite Training"
                            description="Hands-on training in ethical hacking, SOC operations, and advanced CTF challenges."
                        />
                        <FeatureCard
                            icon={<Palette className="h-10 w-10 text-cyber-red" />}
                            title="Designing"
                            description="Creative services including posters, logos, banners, brochures, visiting cards, mock-ups, and more."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-cyber-gray/50 border border-cyber-green/10 rounded-lg hover:border-cyber-green/50 transition-colors duration-300"
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </motion.div>
);

export default Home;
