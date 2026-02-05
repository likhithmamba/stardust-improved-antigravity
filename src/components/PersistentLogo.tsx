import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StardustLogo } from './StardustLogo';

export const PersistentLogo: React.FC = () => {
    const [status, setStatus] = useState<'splash' | 'corner'>('splash');

    useEffect(() => {
        // Match the Hero "bang" timing
        // Hero: 0.5s bang start, 2.0s settle.
        // Let's hold splash until settle, then move to corner.
        const timer = setTimeout(() => {
            setStatus('corner');
        }, 2200); // Wait for Hero to settle (2s) + small buffer

        return () => clearTimeout(timer);
    }, []);

    const variants = {
        splash: {
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 4, // Bigger for initial impact
            opacity: 1,
        },
        corner: {
            top: '32px', // 2rem
            left: '32px', // 2rem
            x: '0%',
            y: '0%',
            scale: 0.8,
            opacity: 1,
        }
    };

    return (
        <motion.div
            initial="splash"
            animate={status}
            variants={variants}
            transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1], // Expo out for sleekness
                // type: "spring", // Spring can be a bit bouncy for "Official", let's try sleek ease
            }}
            className="fixed z-[100] pointer-events-none flex items-center gap-4"
        >
            {/* The Vector Logo */}
            <StardustLogo className="w-24 h-24 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]" />

            {/* Text Label (Only appears in corner or fades in?) */}
            <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={status === 'corner' ? { opacity: 1, width: 'auto' } : { opacity: 0, width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="text-2xl font-bold tracking-tight text-white whitespace-nowrap">
                    Stardust <span className="font-light text-purple-400">Canvas</span>
                </h1>
            </motion.div>
        </motion.div>
    );
};
