import React from 'react';

export const TimelineOverlay: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex flex-col justify-center">
            {/* Top Lane */}
            <div className="flex-1 w-full relative flex items-center border-b border-white/5 data-stream-lane">
                <div className="absolute top-4 left-6 z-10">
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-white/20 uppercase tracking-widest">Flux.Stream_Alpha</span>
                </div>
                {/* Decorative Ticks */}
                <div className="w-full h-12 flex items-end space-x-1 opacity-20 ml-24">
                    <div className="w-1 bg-cyan-400 h-[20%]"></div><div className="w-1 bg-cyan-400 h-[40%]"></div><div className="w-1 bg-cyan-400 h-[30%]"></div>
                </div>
            </div>

            {/* Central Time Axis */}
            <div className="h-32 w-full relative flex items-center bg-zinc-100/50 dark:bg-black/40 border-y border-zinc-200 dark:border-white/5">
                <div className="absolute top-1/2 left-0 w-full h-[2px] time-axis-main -translate-y-1/2"></div>

                {/* Ticks Generation (Simplified for React) */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-10 opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={`w-[1px] ${i % 5 === 0 ? 'h-10 bg-cyan-500/60' : 'h-3 bg-zinc-400 dark:bg-slate-700'} relative`}>
                            {i % 5 === 0 && (
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-500 dark:text-slate-500">
                                    {1000 + i * 100}ms
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="absolute left-[50%] z-20 flex flex-col items-center -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center bg-white/10 dark:bg-black/60 shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-md">
                        <span className="material-symbols-outlined text-cyan-400">analytics</span>
                    </div>
                    <div className="mt-4 bg-cyan-400 text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold">NOW</div>
                </div>
            </div>

            {/* Bottom Lane */}
            <div className="flex-1 w-full relative flex items-center border-t-0 data-stream-lane">
                <div className="absolute bottom-4 left-6 z-10">
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-white/20 uppercase tracking-widest">Logs.Stream_Gamma</span>
                </div>
            </div>

            {/* Scanning Line */}
            <div className="absolute inset-y-0 left-[60%] w-[2px] scanning-line pointer-events-none opacity-50"></div>
        </div>
    );
};
