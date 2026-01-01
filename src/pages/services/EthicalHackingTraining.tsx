import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { GraduationCap } from 'lucide-react';

const EthicalHackingTraining = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <GraduationCap className="h-20 w-20 text-yellow-400 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ethical Hacking <span className="text-cyber-green">Training</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "Our ethical hacking training is built to ignite curiosity and forge real-world cybersecurity skills. We go beyond theory, immersing learners in hands-on attack simulations and defensive strategies inspired by how threats operate in the real world — always within strict ethical and educational boundaries."
                        </p>

                        <p>
                            The program spans machine hacking, web exploitation, networking fundamentals, and core security principles, carefully structured to build both offensive insight and defensive mastery. Every concept is reinforced through practical labs, research-driven learning, and problem-solving challenges that sharpen the hacker mindset.
                        </p>

                        <p>
                            This training is crafted for those who don’t just want certificates — but a solid, battle-tested foundation in cybersecurity, the confidence to analyze complex systems, and the skills to protect, defend, and think like a security professional.
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

export default EthicalHackingTraining;
