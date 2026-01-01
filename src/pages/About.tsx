import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Lock, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About <span className="text-cyber-green">ACE RECON</span> FORCE</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We are a premier IT and cybersecurity services company dedicated to fortifying digital assets and training the next generation of security professionals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-cyber-gray/30 p-8 rounded-lg border border-cyber-green/10"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <Target className="mr-3 text-cyber-red" /> Our Mission
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            To provide cutting-edge cybersecurity solutions that protect businesses from evolving digital threats, while simultaneously empowering individuals with the practical skills needed to excel in the field of ethical hacking and information security.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-cyber-gray/30 p-8 rounded-lg border border-cyber-green/10"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <Eye className="mr-3 text-cyber-blue" /> Our Vision
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            To be the global standard for cybersecurity excellence, creating a safer digital world through innovative technology, rigorous testing, and superior education.
                        </p>
                    </motion.div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Lock className="h-8 w-8 text-cyber-green" />}
                            title="Uncompromising Security"
                            description="We adopt a zero-trust approach, ensuring every layer of your infrastructure is rigorously tested and secured."
                        />
                        <ValueCard
                            icon={<Zap className="h-8 w-8 text-cyber-blue" />}
                            title="Innovation Driven"
                            description="Leveraging the latest tools and techniques in AI, automation, and surveillance to stay ahead of threats."
                        />
                        <ValueCard
                            icon={<Target className="h-8 w-8 text-cyber-red" />}
                            title="Practical Expertise"
                            description="Our training and services are grounded in real-world scenarios, not just theory."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-cyber-black p-6 rounded-lg border border-cyber-gray shadow-lg hover:border-cyber-green/30 transition-all duration-300"
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
);

export default About;
