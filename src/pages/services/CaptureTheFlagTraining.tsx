import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Flag } from 'lucide-react';

const CaptureTheFlagTraining = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <Flag className="h-20 w-20 text-purple-400 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Capture The Flag <span className="text-cyber-green">Training</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "We provide elite, competition-focused training crafted specifically for Capture The Flag (CTF) warriors who aim to dominate the scoreboard. This program sharpens speed, strategy, and precision, preparing participants to think under pressure and solve complex challenges in real time."
                        </p>

                        <p>
                            From advanced exploitation techniques and forensic analysis to cryptography, reverse engineering, and team-based tactics, our training mirrors the intensity of real CTF tournaments. Every challenge is designed to push limits, refine instincts, and build the confidence needed to outperform the competition.
                        </p>

                        <p>
                            The result is not just participation — it’s mastery, momentum, and the mindset to win in high-stakes cybersecurity battles.
                        </p>

                        <div className="flex justify-center pt-10">
                            <Link to="/contact">
                                <Button variant="primary" size="lg" className="px-12">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CaptureTheFlagTraining;
