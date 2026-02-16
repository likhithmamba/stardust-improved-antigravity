import React from 'react';

export const TimelineMode: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#f8f7f6] dark:bg-[#0a0a0c] overflow-y-auto overflow-x-hidden font-manrope text-slate-900 dark:text-white selection:bg-[#eebd2b]/30">
            {/* Background Layers */}
            <div className="fixed inset-0 pointer-events-none opacity-30 z-0 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[length:200px_200px]" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(238,189,43,0.05),transparent_70%)] z-0" />

            <div className="relative z-10 flex flex-col items-center pt-32 pb-64 px-4 w-full">
                {/* Headline Section */}
                <div className="flex flex-col items-center mb-24">
                    <h1 className="text-white tracking-[0.3em] text-[42px] font-extralight uppercase leading-tight text-center pb-2">Temporal Star Stream</h1>
                    <p className="text-[#eebd2b]/60 text-sm font-medium tracking-[0.5em] uppercase text-center max-w-md">Variant 1: Star Stream Architecture</p>
                    <div className="mt-8 flex gap-3">
                        <div className="px-4 py-1.5 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full text-[10px] text-[#eebd2b] uppercase font-bold tracking-tighter flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#eebd2b] animate-pulse"></span>
                            Live Stream
                        </div>
                        <div className="px-4 py-1.5 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full text-[10px] text-white/50 uppercase font-bold tracking-tighter">
                            Oct 24, 2024
                        </div>
                    </div>
                </div>

                {/* Central Timeline Axis */}
                <div className="relative w-full max-w-[1000px] flex justify-center">
                    {/* The Light Beam (Central vertical axis) */}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#eebd2b] to-transparent shadow-[0_0_20px_rgba(238,189,43,0.4)]"></div>

                    <div className="flex flex-col gap-32 w-full relative">
                        {/* Timeline Node 1 (Left) */}
                        <div className="relative flex justify-center w-full">
                            <div className="absolute left-1/2 -translate-x-full pr-12 text-right top-0 flex flex-col items-end group">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-px bg-[#eebd2b]/30"></div>
                                <div className="backdrop-blur-xl bg-[#0a0a0c]/60 border border-[#eebd2b]/20 shadow-[0_0_40px_rgba(238,189,43,0.15),inset_0_0_20px_rgba(255,255,255,0.05)] p-6 rounded-[2.5rem] w-80 hover:shadow-[0_0_60px_rgba(238,189,43,0.6)] hover:border-[#eebd2b]/80 transition-all duration-500 cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="material-symbols-outlined text-[#eebd2b]">draw</span>
                                        <span className="text-[10px] font-bold text-[#eebd2b] tracking-widest uppercase">Priority 01</span>
                                    </div>
                                    <h3 className="text-white text-xl font-bold mb-2">Design System Draft</h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-4">Finalizing the core components for the Andromeda interface upgrade.</p>
                                    <div className="flex gap-2 justify-end">
                                        <span className="px-2 py-1 bg-[#eebd2b]/10 rounded-full text-[9px] text-[#eebd2b]">#interface</span>
                                        <span className="px-2 py-1 bg-[#eebd2b]/10 rounded-full text-[9px] text-[#eebd2b]">#v1</span>
                                    </div>
                                </div>
                            </div>
                            {/* Time Marker */}
                            <div className="z-20 size-4 rounded-full bg-[#eebd2b] border-4 border-[#0a0a0c] shadow-[0_0_10px_#eebd2b]"></div>
                            <div className="absolute left-1/2 translate-x-8 top-1/2 -translate-y-1/2">
                                <p className="text-[#eebd2b] font-display font-medium text-xs tracking-[0.2em] uppercase">10:00 AM</p>
                            </div>
                        </div>

                        {/* Timeline Node 2 (Right) */}
                        <div className="relative flex justify-center w-full">
                            <div className="absolute right-1/2 translate-x-full pl-12 text-left top-0 flex flex-col items-start group">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-px bg-[#eebd2b]/30"></div>
                                <div className="backdrop-blur-xl bg-[#0a0a0c]/60 border border-[#eebd2b]/20 shadow-[0_0_40px_rgba(238,189,43,0.15),inset_0_0_20px_rgba(255,255,255,0.05)] p-6 rounded-[2.5rem] w-80 hover:shadow-[0_0_60px_rgba(238,189,43,0.6)] hover:border-[#eebd2b]/80 transition-all duration-500 cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="material-symbols-outlined text-[#eebd2b]">rocket_launch</span>
                                        <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase animate-pulse">Critical</span>
                                    </div>
                                    <h3 className="text-white text-xl font-bold mb-2">Launch Voyager I</h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-4">Automated deployment of the main node to the Orion cluster.</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] text-white/40 italic">2 collaborators synced</span>
                                    </div>
                                </div>
                            </div>
                            {/* Time Marker */}
                            <div className="z-20 size-4 rounded-full bg-[#eebd2b] border-4 border-[#0a0a0c] shadow-[0_0_15px_#eebd2b]"></div>
                            <div className="absolute right-1/2 -translate-x-8 top-1/2 -translate-y-1/2 text-right">
                                <p className="text-[#eebd2b] font-display font-medium text-xs tracking-[0.2em] uppercase">14:00 PM</p>
                            </div>
                        </div>

                        {/* Timeline Node 3 (Left) - Different Shape */}
                        <div className="relative flex justify-center w-full">
                            <div className="absolute left-1/2 -translate-x-full pr-12 text-right top-0 flex flex-col items-end group">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-px bg-[#eebd2b]/30"></div>
                                <div className="backdrop-blur-xl bg-[#0a0a0c]/60 border border-[#eebd2b]/20 shadow-[0_0_40px_rgba(238,189,43,0.15),inset_0_0_20px_rgba(255,255,255,0.05)] p-6 rounded-full w-64 h-64 flex flex-col items-center justify-center text-center hover:scale-105 transition-all">
                                    <span className="material-symbols-outlined text-[#eebd2b] mb-2 text-3xl">light_mode</span>
                                    <h3 className="text-white text-lg font-bold">Stellar Sync</h3>
                                    <p className="text-white/50 text-xs px-4 mt-2">Daily alignment with the Nebula engineering team.</p>
                                </div>
                            </div>
                            {/* Time Marker */}
                            <div className="z-20 size-4 rounded-full bg-[#eebd2b] border-4 border-[#0a0a0c] shadow-[0_0_10px_#eebd2b]"></div>
                            <div className="absolute left-1/2 translate-x-8 top-1/2 -translate-y-1/2">
                                <p className="text-[#eebd2b] font-display font-medium text-xs tracking-[0.2em] uppercase">OCT 25</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Bar */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 flex items-center justify-between z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-8 bg-[#eebd2b] rounded-full flex items-center justify-center text-[#0a0a0c]">
                            <span className="material-symbols-outlined text-lg">auto_awesome</span>
                        </div>
                        <h2 className="text-white text-lg font-extrabold leading-tight tracking-[0.2em] uppercase font-display">Timeline</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="size-10 flex items-center justify-center backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full text-white hover:bg-[#eebd2b] hover:text-[#0a0a0c] transition-all">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </header>

            {/* Infinite Scroll Gradient Fades */}
            <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>
            <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>
        </div>
    );
};
