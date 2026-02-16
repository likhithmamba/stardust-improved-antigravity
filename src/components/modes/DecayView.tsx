import React from 'react';

export const DecayOverlay: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Background Scanline */}
            <div className="absolute inset-0 scan-line opacity-20"></div>

            {/* Breadcrumbs */}
            <div className="absolute top-24 left-8 z-20 flex items-center gap-2 text-sm">
                <span className="text-zinc-400 dark:text-white/40">Solar System</span>
                <span className="text-zinc-300 dark:text-white/20">/</span>
                <span className="text-zinc-400 dark:text-white/40">Admin</span>
                <span className="text-zinc-300 dark:text-white/20">/</span>
                <span className="text-emerald-500 font-medium tracking-tight">Routine Decay ARCH-772</span>
            </div>

            {/* Archive Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-emerald-400/20 rounded-full z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-dashed border-emerald-400/10 rounded-full z-0 opacity-50 pointer-events-none"></div>

            {/* Terminal Output */}
            <div className="absolute bottom-8 right-8 z-30">
                <div className="bg-zinc-900/90 border border-emerald-400/20 p-4 font-mono text-[10px] w-64 rounded-lg shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-500 uppercase font-bold tracking-tighter">PROCESS ARCHIVED</span>
                    </div>
                    <div className="space-y-1 text-emerald-500/60">
                        <p>&gt; DECAY SEQUENCE INITIATED</p>
                        <p>&gt; COOLING: 68%</p>
                        <p>&gt; STATUS: NOMINAL</p>
                    </div>
                </div>
            </div>

            {/* Corners */}
            <div className="absolute top-0 left-0 size-16 border-t-2 border-l-2 border-emerald-500/20 m-4 pointer-events-none"></div>
            <div className="absolute top-0 right-0 size-16 border-t-2 border-r-2 border-emerald-500/20 m-4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 size-16 border-b-2 border-l-2 border-emerald-500/20 m-4 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 size-16 border-b-2 border-r-2 border-emerald-500/20 m-4 pointer-events-none"></div>
        </div>
    );
};
