import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Globe } from 'lucide-react';

const WebsiteDevelopment = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <Globe className="h-20 w-20 text-cyber-blue mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Website <span className="text-cyber-green">Development</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "We craft powerful digital experiences that don’t just look good — they perform."
                        </p>

                        <p>
                            Our team designs and develops modern, high-performance websites precisely aligned with your business vision and growth goals. Built on trusted, future-ready frameworks, every solution is engineered for lightning-fast speed, seamless scalability, and rock-solid security from the very foundation.
                        </p>

                        <div className="bg-cyber-gray/20 border border-cyber-green/10 rounded-xl p-8 my-8">
                            <p className="mb-6">
                                From sleek portfolios and impactful business websites to fully custom platforms, we obsess over the details that matter:
                            </p>
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex items-center gap-3">
                                    <span className="text-2xl">✨</span>
                                    <span>clean, elegant design</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-2xl">✨</span>
                                    <span>intuitive and engaging user experiences</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-2xl">✨</span>
                                    <span>robust architecture that stands the test of time</span>
                                </li>
                            </ul>
                        </div>

                        <p>
                            The result? A website that captures attention, builds trust, and converts visitors into loyal users — today and for years to come.
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

export default WebsiteDevelopment;
