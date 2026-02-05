import React from 'react';
import { motion } from 'framer-motion';

export const RoadmapSection: React.FC = () => {
    const roadmapItems = [
        { quarter: "Phase 1", title: "Synapse Sync", desc: "Real-time, multiplayer creative sessions in shared star systems.", status: "complete" },
        { quarter: "Phase 2", title: "Neural Auto-Layout", desc: "AI-driven constellation detection for your chaotic notes.", status: "active" },
        { quarter: "Phase 3", title: "Mobile Companion", desc: "Capture ideas on the go. Sync instantly to your universe.", status: "upcoming" },
        { quarter: "Future", title: "Brain Interface", desc: "The ultimate goal. Direct thought-to-canvas mapping.", status: "upcoming" }
    ];

    return (
        <section className="py-32 px-4 bg-black text-white relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
                        Mission Trajectory
                    </h2>
                    <p className="text-slate-500 font-mono tracking-widest text-xs uppercase">The expansion plan</p>
                </motion.div>

                <div className="relative">
                    {/* Central Trajectory Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent -translate-x-1/2 hidden md:block" />

                    <div className="flex flex-col gap-12 md:gap-24 relative">
                        {roadmapItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Card */}
                                <div className="flex-1 w-full relative group">
                                    <div className={`p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-purple-500/30 ${item.status === 'active' ? 'shadow-[0_0_30px_rgba(168,85,247,0.1)] border-purple-500/30' : ''}`}>

                                        {/* Status Indicator */}
                                        <div className="absolute top-0 right-0 p-4">
                                            {item.status === 'complete' && <div className="text-green-500">✓</div>}
                                            {item.status === 'active' && <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
                                        </div>

                                        <div className="text-xs text-purple-400 font-mono font-bold tracking-widest uppercase mb-4">{item.quarter}</div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Center Node */}
                                <div className="w-4 h-4 rounded-full bg-black border-2 border-white/20 z-10 relative hidden md:block">
                                    {item.status === 'active' && (
                                        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75" />
                                    )}
                                    <div className={`absolute inset-0 rounded-full ${item.status === 'active' ? 'bg-purple-500' : 'bg-slate-700'}`} />
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
