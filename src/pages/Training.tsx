
import { motion } from 'framer-motion';
import Button from '../components/Button';



const Training = () => {
    return (
        <div className="pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Cybersecurity <span className="text-cyber-red">Training</span></h1>
                    <div className="max-w-4xl mx-auto mb-12 p-6 border border-cyber-red/30 bg-cyber-red/5 rounded-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cyber-red/5 translate-y-full transition-transform duration-700 group-hover:translate-y-0" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-cyber-red mb-4 uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="text-3xl">⚠️</span> Disclaimer
                            </h2>
                            <div className="text-lg text-gray-300 space-y-4 text-justify">
                                <p>
                                    We do not provide video classes or personal tutoring. Ethical hacking is a skill that can be learned, but it cannot be spoon-fed or taught through traditional classroom methods.
                                </p>
                                <p>
                                    This is a community-driven learning network designed for individuals who are genuinely interested in ethical hacking. Members are encouraged to interact with one another, ask questions, share knowledge, and learn collaboratively.
                                </p>
                                <p>
                                    We provide selected books and learning resources to support your journey. However, becoming a hacker requires independent research, hands-on experimentation, and continuous self-development.
                                </p>
                                <p className="text-white font-semibold">
                                    All training provided in this section is completely free.
                                </p>
                                <p>
                                    If you are passionate about cybersecurity and willing to learn through research and practical experience, you are welcome to join our community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RoadmapSection
                        level="Beginner Level Topics"
                        topics={[
                            "1. Computer & OS Basics",
                            "2. Networking Fundamentals",
                            "3. Cybersecurity Basics",
                            "4. Linux for Hackers",
                            "5. Web Technology Basics",
                            "6. Basic Security Concepts",
                            "7. Introduction to Tools"
                        ]}
                        color="border-cyber-green"
                        textColor="text-cyber-green"
                    />

                    <RoadmapSection
                        level="Intermediate Level Topics"
                        topics={[
                            "8. Footprinting & Reconnaissance",
                            "9. Network Attacks",
                            "10. Web Application Hacking (Core)",
                            "11. System Hacking"
                        ]}
                        color="border-cyber-blue"
                        textColor="text-cyber-blue"
                    />

                    <RoadmapSection
                        level="Advanced Level Topics"
                        topics={[
                            "12. Advanced Network Exploitation",
                            "13. Advanced Web Exploitation",
                            "14. Wireless Hacking",
                            "15. Malware & Exploit Development"
                        ]}
                        color="border-cyber-red"
                        textColor="text-cyber-red"
                    />

                    <RoadmapSection
                        level="Expert / Professional Level"
                        topics={[
                            "16. Reverse Engineering",
                            "17. Exploit Development",
                            "18. Cloud & Modern Attacks",
                            "19. SOC & Blue Team Awareness"
                        ]}
                        color="border-yellow-500"
                        textColor="text-yellow-500"
                    />
                </div>

                <div className="mt-16 text-center">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => window.location.href = '/chat'}
                        className="bg-amber-600 hover:bg-amber-700 text-white border-amber-500"
                    >
                        Start Learn With Others
                    </Button>
                </div>
            </div>
        </div>
    );
};

const RoadmapSection = ({ level, topics, color, textColor }: { level: string, topics: string[], color: string, textColor: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-cyber-gray/20 border-t-4 ${color} p-6 rounded-b-lg hover:bg-cyber-gray/30 transition-all duration-300 h-full`}
    >
        <h3 className={`text-2xl font-bold mb-6 ${textColor}`}>{level}</h3>
        <ul className="space-y-3">
            {topics.map((topic, index) => (
                <li key={index} className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <span className="text-lg">{topic}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

export default Training;
