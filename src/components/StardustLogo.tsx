import React from 'react';
import { motion } from 'framer-motion';

export const StardustLogo: React.FC<{ className?: string }> = ({ className }) => {
    // A stylized 8-point star / orbital path logo
    // Geometric, precise, "Pro"

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut" as any
            }
        }
    };

    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" /> {/* Purple-500 */}
                    <stop offset="100%" stopColor="#ec4899" /> {/* Pink-500 */}
                </linearGradient>
            </defs>

            {/* Central Star */}
            <motion.path
                d="M50 20 L55 45 L80 50 L55 55 L50 80 L45 55 L20 50 L45 45 Z"
                stroke="url(#logoGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial="hidden"
                animate="visible"
                variants={pathVariants}
            />

            {/* Orbital Ring 1 (Partial) */}
            <motion.path
                d="M50 10 A 40 40 0 0 1 90 50"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, rotate: -30, opacity: 0 }}
                animate={{ pathLength: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                style={{ originX: "50px", originY: "50px" }}
            />

            {/* Orbital Ring 2 (Opposite) */}
            <motion.path
                d="M50 90 A 40 40 0 0 1 10 50"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, rotate: -30, opacity: 0 }}
                animate={{ pathLength: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
                style={{ originX: "50px", originY: "50px" }}
            />

            {/* Central Glow (Scale in) */}
            <motion.circle
                cx="50" cy="50" r="5"
                fill="url(#logoGradient)"
                opacity="0.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1, type: 'spring' }}
            />
        </svg>
    );
};
