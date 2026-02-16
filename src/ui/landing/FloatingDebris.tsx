import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Icons / Symbols appropriate for a "thinking tool"
const SYMBOLS = ['∑', '∫', '∆', '⚡', '⊕', '⊗', '∇', '∃', '∀', '∈', '::', '{}', '</>'];

export const FloatingDebris: React.FC = () => {
    const { scrollY } = useScroll();

    // Create layers of parallax
    const y1 = useTransform(scrollY, [0, 4000], [0, -500]);
    const y2 = useTransform(scrollY, [0, 4000], [0, -1000]);
    const y3 = useTransform(scrollY, [0, 4000], [0, -200]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 h-full w-full">
            {/* Layer 1: Fast (Close) - Mathematical Symbols */}
            <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-full">
                {SYMBOLS.map((sym, i) => (
                    <div
                        key={`l1-${i}`}
                        className="absolute font-mono font-bold text-lg md:text-2xl blur-[1px] select-none pointer-events-none"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(251, 191, 36, 0.2)' // Purple or Gold
                        }}
                    >
                        {sym}
                    </div>
                ))}
            </motion.div>

            {/* Layer 2: Medium - Geometric Glyphs */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-full">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={`l2-${i}`}
                        className="absolute border rounded-full border-purple-500/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() * 60 + 20,
                            height: Math.random() * 60 + 20,
                            animation: `spin-slow ${Math.random() * 20 + 20}s infinite linear`
                        }}
                    />
                ))}
            </motion.div>

            {/* Layer 3: Deep Space Stars */}
            <motion.div style={{ y: y3 }} className="absolute inset-0 w-full h-full">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={`l3-${i}`}
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                            backgroundColor: Math.random() > 0.7 ? '#fbbf24' : '#ffffff', // Gold stars
                            opacity: Math.random() * 0.5 + 0.1,
                            boxShadow: Math.random() > 0.9 ? '0 0 4px 1px rgba(251, 191, 36, 0.4)' : 'none'
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};
