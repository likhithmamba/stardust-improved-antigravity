import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { NoteType } from '../constants';
import type { NoteType as NoteTypeValue } from '../constants';
import { useSettingsStore } from '../ui/settings/settingsStore';

interface NotesChoiceRingProps {
    x: number;
    y: number;
    onSelect: (type: NoteTypeValue) => void;
    onClose: () => void;
}

// Three-orbit Genesis Ring — organized by object tier
const ORBITS = [
    {
        id: 'macro',
        label: 'ORBIT 1: MACRO',
        radius: 110,
        items: [
            { type: NoteType.Sun, label: 'Star', glow: '#fbbf24', desc: 'Central Core Content' },
            { type: NoteType.Nebula, label: 'Nebula', glow: '#a78bfa', desc: 'Expansive Cloud' },
            { type: NoteType.Galaxy, label: 'Galaxy', glow: '#6366f1', desc: 'Universal Container' },
        ],
    },
    {
        id: 'meso',
        label: 'ORBIT 2: MESO',
        radius: 210,
        items: [
            { type: NoteType.Earth, label: 'Earth', glow: '#3b82f6', desc: 'Standard Logic' },
            { type: NoteType.Mars, label: 'Mars', glow: '#ef4444', desc: 'Aggressive Goal' },
            { type: NoteType.Jupiter, label: 'Jupiter', glow: '#f59e0b', desc: 'Heavy Data' },
            { type: NoteType.Saturn, label: 'Saturn', glow: '#eab308', desc: 'Structured Rings' },
        ],
    },
    {
        id: 'micro',
        label: 'ORBIT 3: MICRO',
        radius: 300,
        items: [
            { type: NoteType.Moon, label: 'Moon', glow: '#d1d5db', desc: 'Satallite Note' },
            { type: NoteType.Asteroid, label: 'Asteroid', glow: '#6b7280', desc: 'Minor Fragment' },
            { type: NoteType.Comet, label: 'Comet', glow: '#22d3ee', desc: 'Fleeting Thought' },
        ],
    },
];

// Tier visual sizes (px diameter in ring)
const TIER_SIZE: Record<string, number> = {
    star: 48,
    planet: 32,
    moon: 20,
    asteroid: 14,
};

function getTierForSize(type: NoteTypeValue): string {
    const stars = [NoteType.Sun, NoteType.Nebula, NoteType.Galaxy];
    const moons = [NoteType.Moon, NoteType.Mercury, NoteType.Pluto];
    const fragments = [NoteType.Asteroid, NoteType.Comet];
    if ((stars as NoteTypeValue[]).includes(type)) return 'star';
    if ((moons as NoteTypeValue[]).includes(type)) return 'moon';
    if ((fragments as NoteTypeValue[]).includes(type)) return 'asteroid';
    return 'planet';
}

export const NotesChoiceRing: React.FC<NotesChoiceRingProps> = ({ x: _x, y: _y, onSelect, onClose }) => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const isSolar = designSystem === 'solar';

    const bgOverlay = isSolar
        ? 'bg-white/60 backdrop-blur-xl'
        : 'bg-black/50 backdrop-blur-xl';

    const textClass = isSolar ? 'text-slate-700' : 'text-white';
    const subTextClass = isSolar ? 'text-slate-400' : 'text-white/40';
    const ringBorderClass = isSolar ? 'border-slate-200/50' : 'border-white/5';

    return (
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center ${bgOverlay}`} onClick={onClose}>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative w-[650px] h-[650px] flex items-center justify-center pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Center label */}
                <div className="text-center space-y-2 pointer-events-none z-10">
                    <h1 className={`text-2xl font-light tracking-[0.25em] uppercase ${textClass}`}
                        style={{ fontFamily: 'var(--mode-font, "Cinzel", serif)' }}>
                        Genesis
                    </h1>
                    <p className={`text-[10px] tracking-[0.4em] uppercase ${subTextClass}`}>
                        Select Celestial Body
                    </p>
                </div>

                {/* Orbit rings */}
                {ORBITS.map((orbit, orbitIdx) => (
                    <React.Fragment key={orbit.label}>
                        {/* Orbit circle border */}
                        <div
                            className={`absolute rounded-full border ${ringBorderClass} pointer-events-none`}
                            style={{
                                width: orbit.radius * 2,
                                height: orbit.radius * 2,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <span className={clsx(
                                'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[7px] tracking-[0.35em] font-black uppercase opacity-20',
                                isSolar ? 'bg-slate-100 text-slate-900' : 'bg-white/5 text-white'
                            )}>
                                {orbit.label}
                            </span>
                        </div>

                        {/* Items on this orbit */}
                        {orbit.items.map((item, itemIdx) => {
                            const angle = (itemIdx / orbit.items.length) * 360 - 90;
                            const rad = (angle * Math.PI) / 180;
                            const cx = Math.cos(rad) * orbit.radius;
                            const cy = Math.sin(rad) * orbit.radius;
                            const tierSize = TIER_SIZE[getTierForSize(item.type)] || 28;

                            return (
                                <motion.div
                                    key={item.type}
                                    className="absolute cursor-pointer group"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.05 * (orbitIdx * 3 + itemIdx),
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 15,
                                    }}
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`,
                                    }}
                                    onClick={() => {
                                        onSelect(item.type);
                                        onClose();
                                    }}
                                >
                                    <div
                                        className={clsx(
                                            'rounded-full transition-all duration-300 relative',
                                            'group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]',
                                            'glass-panel border-white/20'
                                        )}
                                        style={{
                                            width: tierSize,
                                            height: tierSize,
                                            background: `radial-gradient(circle at 35% 35%, ${item.glow}aa, ${item.glow}44)`,
                                            boxShadow: `0 0 15px ${item.glow}30, inset 0 0 10px rgba(255,255,255,0.2)`,
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                                    </div>
                                    <div className={clsx(
                                        'absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5',
                                        'opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1',
                                        'pointer-events-none'
                                    )}>
                                        <span className={clsx(
                                            'text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap',
                                            isSolar ? 'text-slate-800' : 'text-white'
                                        )}>
                                            {item.label}
                                        </span>
                                        <span className={clsx(
                                            'text-[7px] tracking-widest uppercase whitespace-nowrap opacity-60 font-medium',
                                            isSolar ? 'text-slate-500' : 'text-white/60'
                                        )}>
                                            {(item as any).desc}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </React.Fragment>
                ))}

                {/* Close button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={onClose}
                    className={clsx(
                        'absolute -bottom-16 left-1/2 -translate-x-1/2',
                        'px-6 py-2 rounded-full text-xs tracking-widest uppercase',
                        'border transition-all',
                        isSolar
                            ? 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            : 'border-white/10 text-white/40 hover:text-white hover:bg-white/5'
                    )}
                >
                    Cancel
                </motion.button>
            </motion.div>
        </div>
    );
};
