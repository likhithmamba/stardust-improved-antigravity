import React from 'react';
import { motion } from 'framer-motion';

interface BlackHoleProps {
    isActive: boolean;
}

export const BlackHole: React.FC<BlackHoleProps> = ({ isActive }) => {

    // In a real implementation, we would subscribe to drag events to check distance
    // For now, we'll rely on the parent (CanvasViewport) to pass a prop or update a store value
    // But since the prompt asks for "Gravity Logic: During a drag event... system calculates distance",
    // we can make this component purely visual and reactive to a prop if we want, 
    // OR we can make it subscribe to the store's "dragState" if we put that in the store.
    // Currently `dragState` is local state in CanvasViewport.
    // Let's make this component accept an `isActive` prop or similar, 
    // BUT for simplicity in integration, let's just make it a dumb component that animates 
    // and let CanvasViewport handle the logic and pass a prop.
    // Wait, I can't easily pass props if I just drop it in. 
    // Let's export it and use it in CanvasViewport.

    // Actually, let's make it self-contained if possible? No, it needs to know about dragging.
    // I'll add `isBlackHoleActive` to the store or just pass it as a prop from CanvasViewport.
    // Passing as prop is cleaner for now.

    return (
        <div className="fixed bottom-8 right-8 w-48 h-48 pointer-events-none z-40 flex items-center justify-center">
            {/* Gravity Well / Distortion Field */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    scale: isActive ? 1.5 : 1, // Stronger expansion
                    rotate: isActive ? 180 : 0 // Add some rotation to the distortion
                }}
                transition={{ duration: 0.8, ease: "circOut" }}
                style={{
                    background: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
                    backdropFilter: 'blur(8px)', // heavier blur
                }}
            />

            <div className={`relative flex items-center justify-center transition-transform duration-500 ${isActive ? 'scale-150' : 'scale-100'}`}>
                {/* Accretion Disk - Glow */}
                <div className={`absolute w-40 h-10 bg-orange-500 rounded-full blur-xl mix-blend-screen transition-all duration-300 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-50'}`} />

                {/* Accretion Disk - Rings (Spin Faster on Active) */}
                <motion.div
                    className="absolute w-48 h-48 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 0%, #f97316 20%, transparent 40%, #ea580c 60%, transparent 80%)',
                        maskImage: 'radial-gradient(transparent 50%, black 55%)',
                        WebkitMaskImage: 'radial-gradient(transparent 50%, black 55%)'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: isActive ? 2 : 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Event Horizon (Pure Black) */}
                <div className="absolute w-20 h-20 bg-black rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6),inset_0_0_20px_rgba(255,255,255,0.2)] z-10 transition-shadow duration-300"
                    style={{ boxShadow: isActive ? '0 0 60px rgba(249,115,22,0.9), inset 0 0 30px rgba(255,255,255,0.4)' : undefined }}
                />

                {/* Photon Sphere (Thin Ring) */}
                <div className="absolute w-22 h-22 rounded-full border border-white/40 blur-[0.5px] z-20" />
            </div>

            {/* Label */}
            <div className={`absolute -top-12 text-xs font-bold tracking-[0.3em] text-orange-500/80 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                SINGULARITY
            </div>

            {/* Suction Status Text */}
            <div className={`absolute -bottom-12 text-[10px] font-mono text-orange-300/60 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                RELEASE TO INCINERATE
            </div>
        </div>
    );
};

// We'll actually implement the logic in CanvasViewport and just use this for visuals?
// Or we can use a store selector if we move drag state to store.
// Let's stick to props in CanvasViewport for now.
