import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { NoteType } from '../constants';

interface NotesChoiceRingProps {
    x: number;
    y: number;
    onSelect: (type: NoteType) => void;
    onClose: () => void;
}

export const NotesChoiceRing: React.FC<NotesChoiceRingProps> = ({ x, y, onSelect, onClose }) => {
    // 8 Planets Arrangement
    const items = [
        { type: NoteType.Sun, color: 'glow-yellow', size: 'w-20 h-20' },
        { type: NoteType.Earth, color: 'glow-blue', size: 'w-12 h-12' },
        { type: NoteType.Mars, color: 'glow-primary', size: 'w-10 h-10' }, // using glow-primary as redish
        { type: NoteType.Jupiter, color: 'glow-yellow', size: 'w-24 h-24' },
        { type: NoteType.Saturn, color: 'glow-yellow', size: 'w-20 h-20' }, // ring logic generic
        { type: NoteType.Uranus, color: 'glow-green', size: 'w-14 h-14' },
        { type: NoteType.Neptune, color: 'glow-blue', size: 'w-14 h-14' },
        { type: NoteType.Moon, color: 'glow-white', size: 'w-8 h-8' },
    ];

    const radius = 250;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative w-[700px] h-[700px] rounded-full border border-white/10 dark:border-white/5 flex items-center justify-center pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center space-y-2 pointer-events-none">
                    <h1 className="text-2xl font-light tracking-widest text-zinc-400 uppercase cinzel">Genesis</h1>
                    <p className="text-sm text-zinc-500">Select Celestial Body</p>
                </div>

                {items.map((item, index) => {
                    const angle = (index / items.length) * 360;
                    return (
                        <div
                            key={item.type}
                            className="absolute cursor-pointer group"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
                            }}
                            onClick={() => {
                                onSelect(item.type);
                                onClose();
                            }}
                        >
                            <div className={clsx(
                                "rounded-full shadow-lg transition-transform duration-300 group-hover:scale-125 bg-white dark:bg-slate-300",
                                item.color,
                                item.size
                            )}></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white text-xs font-bold uppercase tracking-widest transition-opacity text-shadow">
                                {item.type}
                            </span>
                        </div>
                    );
                })}

                {/* Black Hole / Cancel Center */}
                <div className="absolute bottom-12 right-12 group cursor-pointer" onClick={onClose}>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md animate-pulse"></div>
                        <div className="relative w-12 h-12 bg-black rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-orange-500/50">close</span>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};
