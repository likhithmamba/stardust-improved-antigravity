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
        <section className="py-32 px-4 bg-black text-white relative overflow-hidden font-body">
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
                    <h2 className="font-display text-4xl md:text-6xl font-semibold text-white mb-4 tracking-tight">
                        Mission Trajectory
                    </h2>
                    <p className="text-slate-500 font-mono tracking-widest text-xs uppercase">The expansion plan</p>
                </motion.div>

                <div className="relative">
                    {/* Central Trajectory Line (Glowing Beam) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 -translate-x-1/2" />

                    <div className="flex flex-col gap-12 md:gap-24 relative">
                        {roadmapItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Card */}
                                <div className="flex-1 w-full relative group pl-12 md:pl-0">
                                    <div className={`glass-panel p-8 rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:-translate-y-1 ${item.status === 'active' ? 'border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'border-white/5'}`}>

                                        {/* Status Pill */}
                                        <div className="absolute top-6 right-6">
                                            {item.status === 'complete' && <div className="text-green-400 font-mono text-xs border border-green-500/30 px-2 py-1 rounded bg-green-500/10">COMPLETE</div>}
                                            {item.status === 'active' && <div className="text-purple-400 font-mono text-xs border border-purple-500/30 px-2 py-1 rounded bg-purple-500/10 animate-pulse">IN PROGRESS</div>}
                                            {item.status === 'upcoming' && <div className="text-slate-500 font-mono text-xs border border-slate-700 px-2 py-1 rounded">UPCOMING</div>}
                                        </div>

                                        <div className="text-xs text-purple-400 font-mono font-bold tracking-widest uppercase mb-4">{item.quarter}</div>
                                        <h3 className="font-display text-3xl font-bold mb-3 text-white">{item.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Center Node (Star) */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center z-10">
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${item.status === 'active' ? 'bg-purple-500 border-white shadow-[0_0_20px_purple]' : 'bg-black border-slate-700'}`} />
                                    {item.status === 'active' && <div className="absolute inset-0 rounded-full border border-purple-500 animate-ping opacity-50" />}
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
