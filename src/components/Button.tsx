import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button = ({ children, className = '', variant = 'primary', size = 'md', ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-cyber-green text-black hover:bg-white hover:text-black focus:ring-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)]",
        secondary: "bg-cyber-red text-white hover:bg-white hover:text-black focus:ring-cyber-red shadow-[0_0_15px_rgba(255,0,60,0.3)] hover:shadow-[0_0_25px_rgba(255,0,60,0.6)]",
        outline: "border-2 border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black focus:ring-cyber-green"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
