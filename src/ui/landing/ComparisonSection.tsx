import React from 'react';
import { motion } from 'framer-motion';

export const ComparisonSection: React.FC = () => {
    return (
        <section className="py-32 px-4 bg-black text-white overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tighter">The Paradigm Shift</h2>
                    <p className="text-slate-500 text-xl font-light">Stop filing. Start thinking.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Old Way: The Archive */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/5 grayscale opacity-60 hover:opacity-100 transition-all duration-500"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-slate-500">The Archive</h3>
                        <ul className="space-y-6 text-slate-500 font-mono text-sm leading-relaxed">
                            <li className="flex items-center gap-4 border-b border-slate-800/50 pb-4">
                                <span className="text-2xl opacity-50">📂</span>
                                <div className="flex flex-col">
                                    <span className="text-slate-400">Nested Folders</span>
                                    <span className="text-xs opacity-50">Where ideas get lost</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 border-b border-slate-800/50 pb-4">
                                <span className="text-2xl opacity-50">📄</span>
                                <div className="flex flex-col">
                                    <span className="text-slate-400">Static Documents</span>
                                    <span className="text-xs opacity-50">Dead text on a page</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-2xl opacity-50">⛓️</span>
                                <div className="flex flex-col">
                                    <span className="text-slate-400">Rigid Structure</span>
                                    <span className="text-xs opacity-50">Forced hierarchy</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* New Way: Stardust Canvas */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group p-1" // Wrapper for border
                    >
                        {/* Animated Border Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-[2rem] opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-700 animate-gradient-xy" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-[2rem] opacity-20 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative bg-black h-full p-10 rounded-[2rem] overflow-hidden">
                            {/* Inner Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

                            <h3 className="text-4xl font-bold mb-2 text-white">Stardust</h3>
                            <p className="text-purple-400 mb-10 font-mono text-sm tracking-widest uppercase">The Cosmic Canvas</p>

                            <ul className="space-y-8 relative z-10">
                                <li className="flex items-center gap-6 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover/item:scale-110 group-hover/item:border-purple-500/50 transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                        ⚡
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Instant Association</h4>
                                        <p className="text-slate-400 text-sm">Link thoughts at the speed of light.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-6 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/item:scale-110 group-hover/item:border-blue-500/50 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                        🌌
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Spatial Context</h4>
                                        <p className="text-slate-400 text-sm">Remember where everything is naturally.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-6 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover/item:scale-110 group-hover/item:border-pink-500/50 transition-all shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                                        🎯
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Fluid Focus</h4>
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
