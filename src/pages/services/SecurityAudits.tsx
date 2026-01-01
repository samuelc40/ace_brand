import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { ShieldCheck } from 'lucide-react';

const SecurityAudits = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <ShieldCheck className="h-20 w-20 text-cyber-green mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Security Audits & <span className="text-cyber-green">Testing</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-lg leading-relaxed">
                        <p className="text-xl font-medium text-white border-l-4 border-cyber-green pl-6 italic">
                            "We deliver deep, intelligence-driven security assessments designed to uncover weaknesses before adversaries even know they exist. Our approach goes beyond surface-level checks — we think like attackers, simulate real-world threats, and expose hidden vulnerabilities across your infrastructure."
                        </p>

                        <p>
                            Our services include advanced penetration testing, continuous vulnerability discovery, secure configuration reviews, and strategic security hardening to eliminate risks at their core. Every finding is translated into clear, actionable insights, not confusing reports.
                        </p>

                        <p>
                            The result is complete visibility into your true security posture — empowering your organization to make confident decisions, strengthen defenses, and safeguard critical digital assets against today’s evolving cyber threats.
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

export default SecurityAudits;
