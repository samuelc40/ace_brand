import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Camera } from 'lucide-react';

const SurveillanceCustomization = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <Camera className="h-20 w-20 text-cyber-red mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Surveillance <span className="text-cyber-green">Customization</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "We engineer next-generation surveillance solutions that go far beyond ordinary camera installations. From precision camera planning and deployment to intelligent configuration and custom software integration, we transform surveillance systems into powerful, reliable security ecosystems."
                        </p>

                        <p>
                            Our solutions are carefully tailored to your environment — enhancing real-time monitoring, system stability, and situational awareness with absolute precision. Whether it’s a home, corporate office, campus, or institution, we design surveillance infrastructures that adapt to your unique security needs.
                        </p>

                        <p>
                            The result is uninterrupted visibility, smarter control, and total peace of mind — where every angle is covered, every moment is monitored, and security works silently but flawlessly in the background.
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

export default SurveillanceCustomization;
