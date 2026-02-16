import React from 'react';
import { motion } from 'framer-motion';

export const ComparisonSection: React.FC = () => {
    return (
        <section className="py-32 px-4 bg-black text-white overflow-hidden relative font-body">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="font-display text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight">The Paradigm Shift</h2>
                    <p className="text-slate-400 text-xl font-light">Stop filing. Start thinking.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Old Way: The Archive (Desaturated, Rusty) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/40 p-10 rounded-[2rem] border border-neutral-800 grayscale hover:grayscale-0 transition-all duration-500 hover:border-red-900/30 group"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-red-400 transition-colors">✕</div>
                            <h3 className="text-2xl font-bold text-neutral-500 group-hover:text-red-300 transition-colors">The Archive</h3>
                        </div>

                        <ul className="space-y-6 text-neutral-500 font-mono text-sm leading-relaxed group-hover:text-neutral-400 transition-colors">
                            <li className="flex items-center gap-4 border-b border-neutral-800 pb-4">
                                <span className="text-2xl opacity-50">📂</span>
                                <div className="flex flex-col">
                                    <span className="font-semibold">Nested Folders</span>
                                    <span className="text-xs opacity-50">Ideas hidden in sub-directories</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 border-b border-neutral-800 pb-4">
                                <span className="text-2xl opacity-50">📄</span>
                                <div className="flex flex-col">
                                    <span className="font-semibold">Static Documents</span>
                                    <span className="text-xs opacity-50">Dead text on a page</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-2xl opacity-50">⛓️</span>
                                <div className="flex flex-col">
                                    <span className="font-semibold">Rigid Structure</span>
                                    <span className="text-xs opacity-50">Forced hierarchy, no flow</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* New Way: Stardust Canvas (Glowing, Holographic) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group p-[1px] rounded-[2rem]" // Wrapper for border gradient
                    >
                        {/* Animated Border Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-500 rounded-[2rem] opacity-30 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-700 animate-gradient-xy" />

                        <div className="relative bg-black/90 h-full p-10 rounded-[2rem] overflow-hidden glass-panel">
                            {/* Inner Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">✓</div>
                                <h3 className="text-3xl font-bold text-white font-display">Stardust</h3>
                            </div>

                            <ul className="space-y-8 relative z-10">
                                <li className="flex items-center gap-6 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover/item:scale-110 group-hover/item:border-purple-500/50 transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                        ⚡
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg font-display">Instant Association</h4>
                                        <p className="text-slate-400 text-sm">Link thoughts at the speed of light.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-6 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/item:scale-110 group-hover/item:border-blue-500/50 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                        🌌
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg font-display">Spatial Context</h4>
                                        <p className="text-slate-400 text-sm">Remember where everything is naturally.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-6 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover/item:scale-110 group-hover/item:border-pink-500/50 transition-all shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                                        🎯
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg font-display">Fluid Focus</h4>
                                        <p className="text-slate-400 text-sm">Zoom in to create. Zoom out to connect.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
