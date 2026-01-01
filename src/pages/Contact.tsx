import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Failed to connect to the server. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-6">Get in <span className="text-cyber-green">Touch</span></h1>
                        <p className="text-gray-400 mb-8 text-lg">
                            Have a project in mind or want to join our training programs? Reach out to us.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-center text-gray-300">
                                <Mail className="h-6 w-6 text-cyber-green mr-4" />
                                <span>acereconforce@gmail.com</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Phone className="h-6 w-6 text-cyber-blue mr-4" />
                                <span>+91 6238457189, +91 9895122942</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <MapPin className="h-6 w-6 text-cyber-red mr-4" />
                                <span>Ernakulam, India</span>
                            </div>
                        </div>


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-cyber-gray/30 p-8 rounded-lg border border-gray-800"
                    >
                        {submitStatus && (
                            <div className={`mb-6 p-4 rounded ${submitStatus.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-cyber-black border border-gray-700 rounded p-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-colors outline-none"
                                    placeholder="John Doe"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-cyber-black border border-gray-700 rounded p-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-colors outline-none"
                                    placeholder="john@example.com"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full bg-cyber-black border border-gray-700 rounded p-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-colors outline-none"
                                    placeholder="Tell us about your project..."
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                                <Send className="w-4 h-4 mr-2" />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
