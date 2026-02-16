import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from './TiltCard';

export const ModesShowcase: React.FC = () => {
    const [activeMode, setActiveMode] = useState<'nebula' | 'constellation'>('nebula');

    return (
        <section className="py-32 px-4 relative bg-black text-white overflow-hidden font-body">
            {/* Background Transition */}
            <motion.div
                animate={{
                    background: activeMode === 'nebula'
                        ? 'radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.15), transparent 70%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1), transparent 70%)'
                }}
                className="absolute inset-0 z-0 transition-colors duration-1000"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">
                        Two Modes. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">
                            One Universe.
                        </span>
                    </h2>

                    {/* Industrial Switcher UI */}
                    <div className="inline-flex bg-slate-900/80 p-2 rounded-full border border-white/10 backdrop-blur-md relative">
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-2 w-[calc(50%-8px)] bg-white/10 rounded-full"
                            style={{
                                left: activeMode === 'nebula' ? '8px' : '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <button
                            onClick={() => setActiveMode('nebula')}
                            className={`relative z-10 px-8 py-3 rounded-full text-lg font-bold transition-colors ${activeMode === 'nebula' ? 'text-purple-300' : 'text-slate-500 hover:text-white'}`}
                        >
                            Nebula
                        </button>
                        <button
                            onClick={() => setActiveMode('constellation')}
                            className={`relative z-10 px-8 py-3 rounded-full text-lg font-bold transition-colors ${activeMode === 'constellation' ? 'text-amber-300' : 'text-slate-500 hover:text-white'}`}
                        >
                            Constellation
                        </button>
                    </div>
                </div>

                {/* Content Swap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Side */}
                    <div className="h-[400px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {activeMode === 'nebula' ? (
                                <motion.div
                                    key="nebula-text"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-purple-400 font-mono tracking-widest uppercase mb-4 text-sm font-bold">Chaos Engine</div>
                                    <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Unbounded Creativity</h3>
                                    <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                                        No grids. No lists. Just raw, uninhibited thought. Drag ideas anywhere, link anything, and let your mind wander without friction.
                                    </p>
                                    <ul className="mt-8 space-y-4 text-slate-300">
                                        <li className="flex items-center gap-3">
                                            <span className="text-purple-500 text-xl">⚡</span> Infinite Canvas
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-purple-500 text-xl">🌊</span> Physics-based interactions
                                        </li>
                                    </ul>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="constellation-text"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-amber-500 font-mono tracking-widest uppercase mb-4 text-sm font-bold">Logic Engine</div>
                                    <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Crystal Clarity</h3>
                                    <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                                        When it's time to execute, Stardust snaps your chaos into order. Auto-sorts ideas into timelines, kanban boards, and hierarchical lists.
                                    </p>
                                    <ul className="mt-8 space-y-4 text-slate-300">
                                        <li className="flex items-center gap-3">
                                            <span className="text-amber-500 text-xl">📐</span> Auto-Layout Algorithms
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-amber-500 text-xl">📅</span> Instant Gantt Charts
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Visual Side */}
                    <div className="h-[500px] relative perspective-1000">
                        <AnimatePresence mode="wait">
                            {activeMode === 'nebula' ? (
                                <motion.div
                                    key="nebula-visual"
                                    initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                                    transition={{ duration: 0.6, type: "spring" }}
                                    className="absolute inset-0"
                                >
                                    <TiltCard glowColor="rgba(168, 85, 247, 0.4)" className="h-full w-full bg-slate-900/50 border border-purple-500/20 rounded-[2rem] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
                                        {/* Abstract Nebula Visuals */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-64 h-64 bg-purple-600 blur-[80px] rounded-full opacity-40 animate-pulse" />
                                            {/* Floating Nodes */}
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-16 h-16 bg-slate-800 rounded-2xl border border-white/10 shadow-xl flex items-center justify-center text-2xl"
                                                    animate={{
                                                        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                                                        y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                                                        rotate: [0, Math.random() * 20 - 10]
                                                    }}
                                                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                                                    style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 2) * 20}%` }}
                                                >
                                                    {['💡', '✨', '🧠', '🎨', '🚀'][i]}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="constellation-visual"
                                    initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                                    transition={{ duration: 0.6, type: "spring" }}
                                    className="absolute inset-0"
                                >
                                    <TiltCard glowColor="rgba(245, 158, 11, 0.4)" className="h-full w-full bg-slate-900/50 border border-amber-500/20 rounded-[2rem] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent" />
                                        {/* Structured Grid Visuals */}
                                        <div className="absolute inset-0 p-8 flex flex-col gap-4">
                                            {/* Header */}
                                            <div className="w-full h-8 bg-white/5 rounded-md mb-4" />
                                            {/* List Items */}
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    key={i}
                                                    className="w-full h-12 bg-slate-800/50 border border-white/5 rounded-lg flex items-center px-4 gap-4"
                                                >
                                                    <div className="w-4 h-4 rounded bg-amber-500/50" />
                                                    <div className="h-2 w-1/3 bg-white/10 rounded" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
