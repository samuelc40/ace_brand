import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Palette } from 'lucide-react';

const Designing = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <Palette className="h-20 w-20 text-orange-400 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Creative <span className="text-cyber-green">Designing</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "We craft bold, unforgettable visual identities that speak before words ever do. Our creative design solutions are built to amplify your brand presence, capture attention instantly, and leave a lasting impression in every medium."
                        </p>

                        <p>
                            From striking posters, iconic logos, dynamic banners, and elegant brochures to professional visiting cards, immersive mock-ups, and beyond, every design is meticulously shaped with purpose. We blend aesthetic excellence with strategic thinking, ensuring each visual aligns perfectly with your brand’s voice, values, and vision.
                        </p>

                        <p>
                            The result is design that doesn’t just look good — it communicates power, builds trust, and makes your brand impossible to ignore.
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

export default Designing;
