import React from 'react';
import { motion } from 'framer-motion';

const COMPARISONS = [
    {
        pro: { label: 'Unmatched speed', detail: 'Local-first architecture' },
        con: { label: 'No real-time multi-user collaboration', detail: 'By design, for deep solo work' }
    },
    {
        pro: { label: 'Cognitive scaffolding', detail: '4 distinct thinking modes' },
        con: { label: 'Steeper learning curve', detail: 'Requires intellectual buy-in' }
    },
    {
        pro: { label: 'Handles massive complexity', detail: '10,000+ notes without lag' },
        con: { label: 'Overkill for simple tasks', detail: 'Not for grocery lists' }
    }
];

export const TransparentComparison: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-[var(--void-prime)] to-black py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-[var(--font-headline)] font-black text-white mb-6 leading-tight">
                        Designed for the 1%,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nebula-purple)] to-[var(--starlight-gold)]">
                            not the 99%.
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 font-[var(--font-body)] max-w-2xl mx-auto">
                        We frame "cons" as deliberate features that filter out unserious users.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <div className="overflow-hidden rounded-3xl border border-[var(--frosted-border)] bg-[var(--frosted-glass)] backdrop-blur-md">
                    {/* Table Header */}
                    <div className="grid grid-cols-2 border-b border-white/10">
                        <div className="p-6 border-r border-white/10">
                            <h3 className="text-lg font-[var(--font-mono)] font-bold text-emerald-400 uppercase tracking-wider">
                                The Stardust Protocol
                            </h3>
                            <div className="text-xs text-slate-600 mt-1">Advantages</div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-[var(--font-mono)] font-bold text-amber-400 uppercase tracking-wider">
                                Deliberate Trade-offs
                            </h3>
                            <div className="text-xs text-slate-600 mt-1">Constraints</div>
                        </div>
                    </div>

                    {/* Table Rows */}
                    {COMPARISONS.map((row, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="grid grid-cols-2 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-300"
                        >
                            {/* Pro Column */}
                            <div className="p-6 border-r border-white/10">
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">✓</div>
                                    <div>
                                        <div className="font-[var(--font-display)] font-semibold text-white mb-1">
                                            {row.pro.label}
                                        </div>
                                        <div className="text-sm text-slate-400 font-[var(--font-body)]">
                                            {row.pro.detail}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Con Column */}
                            <div className="p-6">
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">⊘</div>
                                    <div>
                                        <div className="font-[var(--font-display)] font-semibold text-white mb-1">
                                            {row.con.label}
                                        </div>
                                        <div className="text-sm text-slate-400 font-[var(--font-body)] italic">
                                            {row.con.detail}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center text-sm text-slate-600 font-[var(--font-mono)] mt-8 italic"
                >
                    // Honesty is our pricing model.
                </motion.p>
            </div>
        </section>
    );
};
