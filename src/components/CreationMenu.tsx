import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { NoteType, NOTE_STYLES } from '../constants';



interface CreationMenuProps {
    x: number;
    y: number;
    isOpen: boolean; // Kept in interface for compatibility but unused
    onClose: () => void;
    onSelect: (type: NoteType) => void;
}

export const CreationMenu: React.FC<CreationMenuProps> = ({ x, y, onClose, onSelect }) => {
    // Optimized Cosmic Layout
    const radius = 220;


    const options = useMemo(() => {
        return Object.values(NoteType).filter(t =>
            t !== NoteType.BlackHole &&
            t !== NoteType.Nebula &&
            t !== NoteType.Galaxy
        );
    }, []);

    const [hoveredType, setHoveredType] = useState<NoteType | null>(null);

    // Memoize positions and styles
    const menuItems = useMemo(() => {
        const count = options.length;
        const step = (Math.PI * 2) / count;
        // Start from -PI/2 (top center)
        return options.map((type, index) => {
            const angle = -Math.PI / 2 + (index * step);
            // Organic Jitter: +/- 4px radial variance for imperfect alignment
            const jitter = (index % 3 === 0 ? 4 : index % 2 === 0 ? -3 : 0);
            const finalRadius = (radius * 0.9) + jitter;

            return {
                type,
                angle,
                x: Math.cos(angle) * finalRadius,
                y: Math.sin(angle) * finalRadius,
                style: NOTE_STYLES[type]
            };
        });
    }, []);

    return (
        <div
            className="fixed inset-0 z-50"
            style={{ pointerEvents: 'none' }} // Let clicks pass through background
        >
            {/* Dark Backdrop - Optimized */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px] pointer-events-auto"
                onClick={onClose}
                onContextMenu={(e) => { e.preventDefault(); onClose(); }}
            />

            {/* Menu Container: Centered on Click Coordinates */}
            <motion.div
                className="absolute z-50 pointer-events-none flex items-center justify-center"
                style={{ left: x, top: y }}
                initial={{ scale: 0.5, opacity: 0, rotate: -30 }} // Start smaller and rotated
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }} // Balanced Speed/Pop
            >
                {/* 1. Large Main Ring - Premium Gradient & Reactive */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute rounded-full shadow-2xl backdrop-blur-xl"
                    style={{
                        width: 520,
                        height: 520,
                        background: 'linear-gradient(135deg, rgba(20,20,30,0.95), rgba(5,5,10,0.98))',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 0 50px rgba(0,0,0,0.5), inset 0 0 100px rgba(0,0,0,0.8)'
                    }}
                />

                {/* 1.5 Subtle Gradient Rim Light & Texture */}
                <div
                    className="absolute rounded-full opacity-30 pointer-events-none"
                    style={{
                        width: 520, height: 520,
                        background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.1) 20%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 80%, transparent 100%)',
                        maskImage: 'radial-gradient(transparent 68%, black 70%)',
                        WebkitMaskImage: 'radial-gradient(transparent 68%, black 70%)'
                    }}
                />

                {/* 2. Rotating Orbital Lines - Drift */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border border-white/5 opacity-40"
                    style={{ width: 480, height: 480 }}
                />

                {/* 4. Central Star (Breathing & Interactive) */}
                <motion.div
                    animate={{
                        scale: hoveredType ? [1, 1.1, 1] : [1, 1.05, 1], // Breathe harder on selection
                        opacity: hoveredType ? [1, 0.8, 1] : [0.9, 1, 0.9]
                    }}
                    transition={{ duration: hoveredType ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none"
                >
                    <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_20px_white]" />
                    <div className="absolute w-12 h-12 rounded-full bg-white/5 blur-md" />
                    <div className="absolute w-24 h-px bg-white/20 blur-[1px]" />
                    <div className="absolute w-px h-24 bg-white/20 blur-[1px]" />
                </motion.div>

                {/* 5. Menu Items (Planets) - Rotating Container */}
                <motion.div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    animate={{ rotate: 360 }} // Restored Rotation
                    transition={{ duration: 240, repeat: Infinity, ease: "linear" }} // Very slow organic drift
                >
                    {menuItems.map((item, index) => {
                        // V10: Granular Sizing for Realism
                        let baseSize = 56; // Default
                        if (item.type === 'sun') baseSize = 88;
                        else if (item.type === 'jupiter' || item.type === 'saturn') baseSize = 78;
                        else if (item.type === 'uranus' || item.type === 'neptune') baseSize = 64;
                        else if (item.type === 'mars' || item.type === 'mercury') baseSize = 48;
                        else if (item.type === 'pluto') baseSize = 42;
                        else if (item.type === 'asteroid' || item.type === 'comet') baseSize = 38;

                        const isHovered = hoveredType === item.type;
                        const isDimmed = hoveredType && !isHovered;
                        const isGalaxy = (item.type as any) === 'galaxy';
                        const isSun = item.type === 'sun';
                        const isAsteroid = item.type === 'asteroid';
                        const isComet = item.type === 'comet';

                        // Type-Specific Texture Details
                        // Type-Specific Texture Details
                        let planetGradient = `radial-gradient(circle at 35% 35%, ${item.style.color} 0%, ${item.style.color} 40%, #000 100%)`;
                        let borderRadius = '50%';

                        // Jupiter: Banded Gas Giant
                        if (item.type === 'jupiter') {
                            planetGradient = `radial-gradient(circle at 35% 35%, ${item.style.color} 0%, #d4a373 20%, ${item.style.color} 40%, #a98467 60%, #000 100%)`;
                        }
                        // Earth: Oceanic Blue
                        if (item.type === 'earth') planetGradient = `radial-gradient(circle at 35% 35%, #87ceeb 0%, ${item.style.color} 30%, #1a237e 80%, #000 100%)`;
                        // Mars: Rusty
                        if (item.type === 'mars') planetGradient = `radial-gradient(circle at 35% 35%, #ffccbc 0%, ${item.style.color} 40%, #8d6e63 80%, #3e2723 100%)`;

                        // Sun: Hot Star
                        if (isSun) {
                            planetGradient = `radial-gradient(circle at 40% 40%, #fff 0%, #fff 10%, ${item.style.color} 30%, #ff8c00 60%, #b22222 100%)`;
                        }

                        // Galaxy: Milky Way (Deep Barred Spiral)
                        if (isGalaxy) {
                            // V12: Richer, deeper galactic colors (Gold/Purple/Blue)
                            planetGradient = `conic-gradient(from 0deg, 
                                #000 0%, #4b0082 10%, #000 20%, 
                                #ffd700 25%, #000 30%, 
                                #1e90ff 45%, #000 55%, 
                                #fff 60%, #4b0082 75%, 
                                #000 85%, #ffd700 95%, #000 100%)`;
                        }

                        // Asteroid: Metroid Shape (Organic Blob)
                        if (isAsteroid) {
                            planetGradient = `radial-gradient(circle at 40% 40%, #ddd 0%, #888 30%, #444 70%, #222 100%)`;
                            borderRadius = '53% 47% 72% 28% / 46% 51% 49% 54%'; // Organic Metroid-like
                        }

                        // Comet: Icy Head
                        if (isComet) {
                            planetGradient = `radial-gradient(circle at 30% 30%, #fff 0%, #b3e5fc 40%, transparent 100%)`;
                            // Tail implemented below
                        }



                        return (
                            <motion.button
                                key={item.type}
                                onMouseEnter={() => setHoveredType(item.type)}
                                onMouseLeave={() => setHoveredType(null)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect(item.type);
                                    onClose();
                                }}
                                className="absolute group flex flex-col items-center justify-center rounded-full outline-none transition-all duration-300"
                                style={{
                                    pointerEvents: 'auto'
                                }}
                                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                                animate={{
                                    x: item.x,
                                    y: item.y,
                                    scale: isHovered ? 1.2 : (isDimmed ? 0.9 : 1), // Selection Hierarchy
                                    opacity: isDimmed ? 0.5 : 1,
                                    rotate: -360
                                }}
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 20, delay: index * 0.02 },
                                    y: { type: "spring", stiffness: 300, damping: 20, delay: index * 0.02 },
                                    scale: { type: "spring", stiffness: 400, damping: 25 },
                                    opacity: { duration: 0.2 },
                                    rotate: { duration: 240, repeat: Infinity, ease: "linear" }
                                }}
                            >
                                {/* SUN CORONA (V9 Unique) */}
                                {isSun && (
                                    <div className="absolute inset-[-40%] rounded-full opacity-60 mix-blend-screen animate-pulse"
                                        style={{
                                            background: `radial-gradient(circle, ${item.style.color} 0%, transparent 70%)`,
                                            filter: 'blur(10px)',
                                            zIndex: -1
                                        }}
                                    />
                                )}

                                {/* GALAXY GLOW (V9 Unique) */}
                                {/* GALAXY GLOW (V9 Unique) */}
                                {isGalaxy && (
                                    <div className="absolute inset-[-20%] rounded-full opacity-50 mix-blend-screen"
                                        style={{
                                            background: `conic-gradient(from 180deg, transparent 0%, ${item.style.color} 50%, transparent 100%)`,
                                            filter: 'blur(8px)',
                                            animation: 'spin 4s linear infinite', // Faster spin for galaxy core
                                            zIndex: -1
                                        }}
                                    />
                                )}

                                {/* GALAXY CORE (V10 Unique) */}
                                {isGalaxy && (
                                    <div className="absolute inset-[-40%] rounded-full opacity-40 mix-blend-screen"
                                        style={{
                                            background: `radial-gradient(circle, white 0%, ${item.style.color} 40%, transparent 70%)`,
                                            filter: 'blur(15px)',
                                            zIndex: -2
                                        }}
                                    />
                                )}

                                {/* COMET TAIL (V10 Unique) */}
                                {isComet && (
                                    <div className="absolute w-[180%] h-[250%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[5%]"
                                        style={{
                                            background: 'linear-gradient(to bottom, rgba(200,240,255,0.8), transparent)',
                                            transformOrigin: 'top center',
                                            transform: 'rotate(45deg)',
                                            filter: 'blur(8px)',
                                            zIndex: -1,
                                            borderRadius: '50% 50% 50% 50% / 20% 20% 80% 80%',
                                            opacity: 0.8
                                        }}
                                    />
                                )}

                                {/* Active Glow (Subtle Ambience) */}
                                <div
                                    className={`absolute inset-0 rounded-full bg-white/10 blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-100 scale-125' : 'opacity-0'}`}
                                />

                                {/* HOVER GLOW - Secondary */}
                                <div
                                    className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    style={{ transform: 'scale(1.3)', filter: 'blur(12px)' }}
                                />

                                {/* Planet Visual Container (Rotates) */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        rotate: { duration: (isGalaxy ? 15 : (isComet ? 240 : (isAsteroid ? 10 : 50))), repeat: Infinity, ease: "linear" },
                                    }}
                                    className="relative flex items-center justify-center"
                                    style={{
                                        width: baseSize,
                                        height: baseSize,
                                    }}
                                >
                                    {/* ORB BODY (Clipped Content) */}
                                    <div
                                        className="absolute inset-0 overflow-hidden"
                                        style={{
                                            borderRadius: borderRadius,
                                            background: planetGradient,
                                            // Conditional Shadow: Sun/Galaxy emit light, Planets block it.
                                            boxShadow: (isSun || isGalaxy)
                                                ? `0 0 25px ${item.style.color}88, inset 0 0 20px ${item.style.color}` // Emitter
                                                : (isHovered
                                                    ? `inset 4px 4px 12px rgba(255,255,255,0.4), inset -4px -4px 12px rgba(0,0,0,0.8), 0 0 20px ${item.style.color}`
                                                    : `inset 2px 2px 6px rgba(255,255,255,0.2), inset -3px -3px 8px rgba(0,0,0,0.6), 0 0 10px ${item.style.color}44`),
                                            border: (isSun || isGalaxy) ? 'none' : (isHovered ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.15)')
                                        }}
                                    >
                                        {/* Surface Micro-Variation (Not for Galaxy/Sun/Comet) */}
                                        {(!isSun && !isGalaxy && !isComet) && (
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    borderRadius: borderRadius,
                                                    background: `conic-gradient(from ${index * 45}deg, rgba(255,255,255,0.05) 0%, transparent 25%, rgba(0,0,0,0.05) 50%, transparent 75%)`,
                                                    opacity: 0.8,
                                                    mixBlendMode: 'overlay'
                                                }}
                                            />
                                        )}

                                        {/* Specular Highlight (Top-Left Sharp Glint) */}
                                        <div
                                            className="absolute top-[15%] left-[15%] w-[25%] h-[20%] rounded-full bg-white blur-[2px]"
                                            style={{ opacity: isHovered ? 0.3 : 0.15 }}
                                        />

                                    </div>
                                    {/* Saturn Ring - Premium Disc */}
                                    {item.type === 'saturn' && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
                                            style={{
                                                width: '200%',
                                                height: '60%',
                                                background: `radial-gradient(ellipse at center, 
                                                    transparent 50%, 
                                                    ${item.style.color}44 52%, 
                                                    ${item.style.color} 55%, 
                                                    ${item.style.color}44 60%, 
                                                    ${item.style.color} 62%, 
                                                    transparent 70%)`,
                                                boxShadow: `inset 0 0 10px ${item.style.color}22`,
                                                transform: 'rotate(-20deg)',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    )}

                                    {/* Uranus Rings - Vertical Tilt */}
                                    {item.type === 'uranus' && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
                                            style={{
                                                width: '180%',
                                                height: '180%',
                                                background: `radial-gradient(ellipse at center, transparent 60%, ${item.style.color}33 62%, transparent 70%)`,
                                                transform: 'rotate(90deg) scaleY(0.3)', // Vertical ring
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* Label with Glass Tag */}
                                <span className={`transition-all duration-300 absolute top-[120%] mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-300 drop-shadow-md whitespace-nowrap ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-5px]'}`}>
                                    {item.style.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div >
    );
};
