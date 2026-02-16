import React from 'react';

export const MatrixSolar: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#221910] overflow-hidden font-display text-white selection:bg-[#f27f0d]/30">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#f27f0d]/10 to-transparent opacity-40" />
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-[400px] rounded-[100%] border-t border-[#f27f0d]/20 bg-[#221910]/80 blur-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#f27f0d]/40 to-transparent" />
                    <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#f27f0d]/40 to-transparent" />
                </div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-[#221910]/40 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-[#f27f0d]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">HORIZON</h2>
                    </div>
                    <nav className="flex items-center gap-6">
                        <button className="text-white/70 hover:text-white text-sm font-medium transition-colors">Zoom 85%</button>
                        <button className="text-[#f27f0d] text-sm font-medium border-b-2 border-[#f27f0d] pb-0.5">Board View</button>
                        <button className="text-white/70 hover:text-white text-sm font-medium transition-colors">Timeline</button>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#f27f0d] transition-colors">search</span>
                        <input className="bg-white/5 border-none rounded-full pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-[#f27f0d]/50 text-sm placeholder:text-white/20 outline-none" placeholder="Search the cosmos..." type="text" />
                    </div>
                    <button className="flex items-center justify-center rounded-full bg-[#f27f0d] px-5 py-2 text-[#221910] font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#f27f0d]/20">
                        <span className="material-symbols-outlined text-[18px] mr-1">add</span>
                        New Note
                    </button>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </header>

            {/* Main Canvas - 4 Quadrants */}
            <main className="relative w-full h-full pt-20 pb-10 px-6 overflow-hidden z-10 grid grid-cols-2 grid-rows-2 gap-8">
                {/* Q1: Solar Core */}
                <div className="p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#f27f0d]">wb_sunny</span>
                        <h2 className="text-lg font-bold text-white/90">Solar Core <span className="text-xs font-normal text-white/40 ml-2 uppercase tracking-widest">Priority</span></h2>
                    </div>
                    <div className="flex flex-wrap gap-6 relative">
                        <div className="w-56 h-56 rounded-full p-8 flex flex-col items-center justify-center text-center group cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-300 bg-white/[0.03] backdrop-blur-md border border-[#f27f0d]/20 shadow-[0_0_20px_rgba(242,127,13,0.05),inset_0_0_15px_rgba(242,127,13,0.1)]">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#f27f0d] drop-shadow-[0_0_8px_rgba(242,127,13,0.8)]">
                                <span className="material-symbols-outlined text-[16px]">push_pin</span>
                            </div>
                            <h3 className="font-bold text-sm mb-2 text-[#f27f0d]">Urgent: Launch Sequence</h3>
                            <p className="text-xs text-white/70 line-clamp-3">Verify all fuel cell pressure levels before final ignition. T-minus 48 hours.</p>
                            <div className="mt-3 text-[10px] text-white/30 uppercase tracking-tighter">Modified 2m ago</div>
                        </div>
                    </div>
                </div>

                {/* Q2: Nebula Flow */}
                <div className="p-8 flex flex-col gap-6 items-end text-right">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-white/90">Nebula Flow <span className="text-xs font-normal text-white/40 mr-2 uppercase tracking-widest">Brainstorm</span></h2>
                        <span className="material-symbols-outlined text-purple-400">filter_drama</span>
                    </div>
                    <div className="flex flex-wrap flex-row-reverse gap-6">
                        <div className="w-64 h-64 rounded-full p-10 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 bg-purple-500/5 backdrop-blur-md border border-purple-500/20">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-purple-400">
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                            </div>
                            <h3 className="font-bold text-sm mb-2 text-purple-300">Infinite Expansion</h3>
                            <p className="text-xs text-white/70">What if the workspace scales based on user heart rate? Biometric sync concept for the Q4 roadmap.</p>
                        </div>
                    </div>
                </div>

                {/* Q3: Deep Void */}
                <div className="p-8 flex flex-col justify-end gap-6">
                    <div className="flex flex-wrap gap-6 items-end">
                        <div className="w-40 h-40 rounded-full p-6 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 hover:scale-105 transition-all bg-white/[0.03] backdrop-blur-md border border-white/10">
                            <h3 className="font-bold text-[10px] mb-1 text-white/40">Archived Mission</h3>
                            <p className="text-[10px] text-white/40 line-clamp-2">Vostok 1 Telemetry logs from 1961.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <span className="material-symbols-outlined text-white/40">nights_stay</span>
                        <h2 className="text-lg font-bold text-white/60">Deep Void <span className="text-xs font-normal text-white/20 ml-2 uppercase tracking-widest">Storage</span></h2>
                    </div>
                </div>

                {/* Q4: Stellar Events */}
                <div className="p-8 flex flex-col justify-end gap-6 items-end text-right">
                    <div className="flex flex-wrap flex-row-reverse gap-6 items-end">
                        <div className="w-60 h-60 rounded-full p-8 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 bg-white/[0.03] backdrop-blur-md border border-[#f27f0d]/30 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-[#f27f0d]/40 animate-pulse" />
                            <h3 className="font-bold text-sm mb-2 text-[#f27f0d]">Board Meeting</h3>
                            <p className="text-xs text-white/80">Friday at 15:00 UTC. Discussing the orbital debris mitigation project.</p>
                            <div className="mt-3 flex items-center gap-1 text-[10px] text-[#f27f0d]/80 font-bold">
                                <span className="material-symbols-outlined text-[12px]">schedule</span>
                                In 4 Hours
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <h2 className="text-lg font-bold text-white/90">Stellar Events <span className="text-xs font-normal text-white/40 mr-2 uppercase tracking-widest">Deadlines</span></h2>
                        <span className="material-symbols-outlined text-[#f27f0d]">event_upcoming</span>
                    </div>
                </div>
            </main>

            {/* Toolbar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-[#221910]/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl z-50">
                <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Select">
                    <span className="material-symbols-outlined">near_me</span>
                </button>
                <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Pencil">
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <div className="w-px h-8 bg-white/10 mx-1" />
                <button className="size-10 flex items-center justify-center rounded-full bg-[#f27f0d] text-[#221910] shadow-lg shadow-[#f27f0d]/30">
                    <span className="material-symbols-outlined">add</span>
                </button>
                <div className="w-px h-8 bg-white/10 mx-1" />
                <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Gallery">
                    <span className="material-symbols-outlined">image</span>
                </button>
                <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Grid Toggle">
                    <span className="material-symbols-outlined">grid_view</span>
                </button>
            </div>
        </div>
    );
};
