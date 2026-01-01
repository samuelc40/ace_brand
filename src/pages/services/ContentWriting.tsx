import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { PenTool } from 'lucide-react';

const ContentWriting = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <PenTool className="h-20 w-20 text-cyber-green mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Content Writing & <span className="text-cyber-green">Layout Design</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "We craft compelling, purpose-driven content that speaks clearly to your audience and strengthens your brand identity. From website content and marketing copy to technical and creative writing, every word is carefully structured to inform, engage, and convert."
                        </p>

                        <p>
                            Our InDesign and layout design services transform raw content into visually powerful designs. We create clean, modern, and professional layouts for brochures, presentations, reports, magazines, posters, and digital publications—ensuring perfect alignment, typography balance, and visual flow.
                        </p>

                        <p>
                            By combining strong storytelling with polished design, we deliver content that not only looks exceptional but also communicates with clarity, consistency, and impact across both print and digital platforms.
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

export default ContentWriting;
