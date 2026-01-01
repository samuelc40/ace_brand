import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Camera, GraduationCap, Flag, Palette, PenTool } from 'lucide-react';

import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: <Globe className="h-12 w-12 text-cyber-blue" />,
            title: "Website Development",
            description: "Custom, high-performance websites built with modern frameworks. Secure by design and optimized for speed and scalability.",
            link: "/services/website-development"
        },
        {
            icon: <ShieldCheck className="h-12 w-12 text-cyber-green" />,
            title: "Security Audits & Testing",
            description: "End-to-end vulnerability assessments, penetration testing, and security hardening for your digital infrastructure.",
            link: "/services/security-audits"
        },
        {
            icon: <Camera className="h-12 w-12 text-cyber-red" />,
            title: "Surveillance Customization",
            description: "Advanced camera system setups with custom software integration for enhanced security and monitoring capabilities.",
            link: "/services/surveillance-customization"
        },
        {
            icon: <GraduationCap className="h-12 w-12 text-yellow-400" />,
            title: "Ethical Hacking Training",
            description: "Comprehensive training programs covering machine hacking, web exploitation, and advanced attack vectors.",
            link: "/services/ethical-hacking-training"
        },
        {
            icon: <Flag className="h-12 w-12 text-purple-400" />,
            title: "Capture_The_Flag Training",
            description: "Specialized training for Security Operations Centers and competitive Capture The Flag tournaments.",
            link: "/services/capture-the-flag-training"
        },
        {
            icon: <Palette className="h-12 w-12 text-orange-400" />,
            title: "Designing",
            description: "Creative services including posters, logos, banners, brochures, visiting cards, mock-ups, and more.",
            link: "/services/designing"
        },
        {
            icon: <PenTool className="h-12 w-12 text-pink-400" />,
            title: "Content Writing & Layout Design",
            description: "We create clear, engaging content and transform it into professional, visually appealing layouts. From powerful copy to polished designs, our work ensures your message looks sharp, consistent, and impactful across all platforms.",
            link: "/services/content-writing"
        }
    ];

    return (
        <div className="pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our <span className="text-cyber-green">Services</span></h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Elite solutions tailored for the modern digital battlefield.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ServiceCard = ({ icon, title, description, index, link }: { icon: React.ReactNode, title: string, description: string, index: number, link?: string }) => {
    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-cyber-gray/20 border border-cyber-green/10 p-8 rounded-xl hover:bg-cyber-gray/40 hover:border-cyber-green/40 transition-all duration-300 group h-full cursor-pointer"
        >
            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyber-green transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </motion.div>
    );

    return link ? (
        <Link to={link} className="block h-full">
            {CardContent}
        </Link>
    ) : (
        CardContent
    );
};

export default Services;
