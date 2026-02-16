import React from 'react';
import { motion } from 'framer-motion';

const TECHNICAL_CARDS = [
    {
        title: 'Local-First Architecture',
        description: 'Data lives in IndexedDB on your device. No loading spinners. Works offline. You own the atoms of your data.',
        icon: '⚡',
        stats: [
            { label: 'Latency', value: '0ms' },
            { label: 'Uptime', value: '100%' }
        ]
    },
    {
        title: 'Privacy by Physics',
        description: 'No servers means no prying eyes. Your intellectual property never leaves your local cosmos.',
        icon: '🔒',
        stats: [
            { label: 'Data Sharing', value: 'Zero' },
            { label: 'Encryption', value: 'Native' }
        ]
    },
    {
        title: 'Web Worker Compute',
        description: 'Physics calculations and AI refraction run off the main thread. UI remains buttery smooth at 60fps, even with 10k notes.',
        icon: '⚙️',
        stats: [
            { label: 'Frame Rate', value: '60fps' },
            { label: 'Threads', value: 'Multi' }
        ]
    }
];

export const EngineRoom: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen bg-[var(--void-prime)] py-32 px-6">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--nebula-purple)] mb-4">
                        Technical Specifications
                    </div>
                    <h2 className="text-5xl md:text-7xl font-[var(--font-headline)] font-black text-white mb-6">
                        Zero Latency.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nebula-blue)] to-[var(--starlight-gold)]">
                            Zero Cloud Dependency.
                        </span>
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TECHNICAL_CARDS.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative bg-[var(--frosted-glass)] backdrop-blur-md border border-[var(--frosted-border)] rounded-2xl p-8 hover:border-[var(--nebula-purple)] transition-all duration-500"
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-[var(--font-display)] font-bold text-white mb-4">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 font-[var(--font-body)] leading-relaxed mb-6">
                                {card.description}
                            </p>

                            {/* Stats */}
                            <div className="flex gap-6 pt-4 border-t border-white/10">
                                {card.stats.map((stat, idx) => (
                                    <div key={idx}>
                                        <div className="text-2xl font-[var(--font-mono)] font-bold text-[var(--starlight-gold)] mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--nebula-purple)]/0 via-[var(--nebula-purple)]/0 to-[var(--nebula-purple)]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Technical diagram accent */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <svg className="w-full h-32 opacity-20" viewBox="0 0 800 100" fill="none">
                        <path d="M0 50 L200 50 M600 50 L800 50" stroke="url(#techGrad)" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="400" cy="50" r="20" stroke="url(#techGrad)" strokeWidth="2" fill="var(--void-prime)" />
                        <circle cx="400" cy="50" r="10" fill="var(--nebula-purple)" />
                        <defs>
                            <linearGradient id="techGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0" stopColor="var(--nebula-purple)" />
                                <stop offset="1" stopColor="var(--nebula-blue)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
};
