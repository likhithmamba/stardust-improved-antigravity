import React from 'react';
import { motion } from 'framer-motion';

interface EventHorizonCTAProps {
    onEnterApp?: () => void;
}

export const EventHorizonCTA: React.FC<EventHorizonCTAProps> = ({ onEnterApp }) => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Intense Event Horizon Gradient - BRIGHT */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.15) 30%, rgba(10, 10, 15, 0.9) 60%, #000000)',
                }}
            />

            {/* Secondary glow layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.2), transparent 40%)',
                }}
            />

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 50%)',
                }}
            />

            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border"
                        style={{
                            width: `${300 + i * 150}px`,
                            height: `${300 + i * 150}px`,
                            borderColor: `rgba(251, 191, 36, ${0.3 - i * 0.05})`
                        }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Badge */}
                    <div className="inline-block mb-8 px-6 py-2 rounded-full border-2 border-amber-500/50 bg-amber-500/10 backdrop-blur-md">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase">
                            Final Decision Gateway
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-6xl md:text-8xl font-[var(--font-headline)] font-black mb-8 leading-none"
                        style={{
                            background: 'linear-gradient(to bottom, #ffffff, #fbbf24, #ffffff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 80px rgba(251, 191, 36, 0.5)'
                        }}>
                        Enter Your<br />
                        Cosmos.
                    </h2>

                    {/* Pricing */}
                    <div className="mb-12">
                        <div className="text-7xl md:text-9xl font-[var(--font-headline)] font-black text-white mb-4"
                            style={{
                                textShadow: '0 0 60px rgba(251, 191, 36, 0.6)'
                            }}>
                            $299
                        </div>
                        <div className="text-xl text-slate-300 font-[var(--font-body)] mb-2">
                            One-time license. Lifetime access.
                        </div>
                        <div className="text-sm text-slate-500 font-mono italic">
                            No subscriptions. You rent tools; you own engines.
                        </div>
                    </div>

                    {/* Heartbeat CTA */}
                    <motion.button
                        onClick={onEnterApp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-16 py-6 text-black font-[var(--font-display)] font-bold text-2xl rounded-full overflow-hidden shadow-2xl"
                        style={{
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)',
                            backgroundSize: '200% 200%',
                        }}
                        animate={{
                            boxShadow: [
                                '0 0 60px rgba(251, 191, 36, 0.6)',
                                '0 0 100px rgba(251, 191, 36, 0.8)',
                                '0 0 60px rgba(251, 191, 36, 0.6)'
                            ],
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                            boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            },
                            backgroundPosition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear'
                            }
                        }}
                    >
                        <span className="relative z-10 drop-shadow-md">Initialize Access</span>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </motion.button>

                    {/* Trust signals */}
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-slate-400 font-mono">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span>Zero latency guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span>100% local-first</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span>Lifetime updates</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
