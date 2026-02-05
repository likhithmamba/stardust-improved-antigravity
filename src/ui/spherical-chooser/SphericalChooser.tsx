import React from 'react';
import { motion } from 'framer-motion';
import { NoteType, NOTE_STYLES } from '../../constants';
import clsx from 'clsx';

interface SphericalChooserProps {
    x: number;
    y: number;
    onSelect: (type: NoteType) => void;
    onClose: () => void;
}

const PLANET_TYPES = [
    NoteType.Sun,
    NoteType.Jupiter,
    NoteType.Saturn,
    NoteType.Earth,
    NoteType.Mars,
    NoteType.Venus,
    NoteType.Mercury,
    NoteType.Uranus,
    NoteType.Neptune,
    NoteType.Pluto,
    NoteType.Asteroid,
    NoteType.Comet,
    NoteType.Nebula,
    NoteType.Galaxy,
    NoteType.BlackHole
];

import { useSettingsStore } from '../../ui/settings/settingsStore';

export const SphericalChooser: React.FC<SphericalChooserProps> = ({ x, y, onSelect, onClose }) => {
    const viewMode = useSettingsStore((state) => state.viewMode);

    // Distribute planets in a circle/sphere
    const radius = 160; // Increased radius for better spacing

    const visibleTypes = React.useMemo(() => {
        if (viewMode !== 'free' && viewMode !== 'void') {
            return [NoteType.Uranus];
        }
        return PLANET_TYPES;
    }, [viewMode]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            style={{ left: 0, top: 0 }}
        >
            {/* Backdrop for click to close */}
            <div className="absolute inset-0 pointer-events-auto bg-black/10 backdrop-blur-[1px]" onClick={onClose} />

            {/* Center Anchor */}
            <div
                className="absolute pointer-events-none"
                style={{ left: x, top: y }}
            >
                <div className="relative">
                    {/* Center Close/Cancel Button */}
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-900/80 border border-slate-700 hover:border-red-500 text-slate-400 hover:text-red-500 z-50 pointer-events-auto flex items-center justify-center shadow-2xl backdrop-blur-md"
                        onClick={onClose}
                    >
                        ✕
                    </motion.button>

                    {/* Rotating Container for Orbit Animation */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                        {visibleTypes.map((type, index) => {
                            const angle = (index / visibleTypes.length) * 2 * Math.PI;
                            const px = Math.cos(angle) * radius;
                            const py = Math.sin(angle) * radius;

                            // Retrieve rich styles
                            const style = NOTE_STYLES[type as keyof typeof NOTE_STYLES] || NOTE_STYLES[NoteType.Asteroid];

                            return (
                                <motion.button
                                    key={type}
                                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                    animate={{ x: px, y: py, scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.03, type: 'spring', stiffness: 200, damping: 20 }}
                                    className={clsx(
                                        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-auto",
                                        "w-14 h-14 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-125 z-10",
                                        // Use the rich glassmorphic classes from constants
                                        style.className,
                                        // Fallback border if none in class
                                        !style.className.includes('border') && "border border-white/20"
                                    )}
                                    // Custom color glow override for menu
                                    style={{
                                        boxShadow: `0 0 15px ${style.color || '#fff'}40`
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(type);
                                    }}
                                >
                                    {/* Counter-rotate text so it stays upright */}
                                    <motion.div
                                        className="flex flex-col items-center justify-center w-full h-full"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    >
                                        <span className="sr-only">{type}</span>
                                        {/* Visual Label */}
                                        <span className="text-[10px] font-bold text-white/90 drop-shadow-md bg-black/20 px-1 rounded backdrop-blur-sm mt-8 whitespace-nowrap pointer-events-none">
                                            {style.label || type}
                                        </span>
                                    </motion.div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
