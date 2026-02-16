import React from 'react';

export const PrismMode: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#05050A] overflow-hidden font-sans-alt text-white/90 selection:bg-[#1919e6]/30 flex flex-col">
            {/* Deep Space Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_#0B0B1A_0%,_#020205_100%)]">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}
                />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Main Content: Gravity Wells */}
            <main className="flex h-screen w-full relative z-10">
                {/* Mercury Section */}
                <section className="flex-1 flex flex-col items-center pt-24 px-4 gap-8 relative transition-colors duration-500 hover:bg-white/[0.02]">
                    <div className="text-center mb-4">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#A5A5AF] font-bold">Inner-01</span>
                        <h2 className="font-display italic text-2xl text-[#A5A5AF]/80">Mercury</h2>
                    </div>
                    <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center p-4 text-center cursor-pointer relative overflow-hidden group backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#A5A5AF]/10 mix-blend-overlay" />
                        <p className="text-[10px] leading-tight font-medium relative z-10 group-hover:opacity-0 transition-opacity">Quick thoughts & sparks</p>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[#A5A5AF]">open_in_full</span>
                        </div>
                    </div>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer overflow-hidden group backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#A5A5AF]/20 mix-blend-overlay" />
                        <span className="material-symbols-outlined text-white/40 group-hover:text-white transition-colors">notes</span>
                    </div>
                </section>

                <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]" />

                {/* Venus Section */}
                <section className="flex-1 flex flex-col items-center pt-32 px-4 gap-12 relative transition-colors duration-500 hover:bg-white/[0.02]">
                    <div className="text-center mb-4">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#E3BB76] font-bold">Inner-02</span>
                        <h2 className="font-display italic text-2xl text-[#E3BB76]/80">Venus</h2>
                    </div>
                    <div className="w-48 h-48 rounded-full flex flex-col items-center justify-center p-8 text-center cursor-pointer relative overflow-hidden group backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#E3BB76]/20 mix-blend-overlay" />
                        <h3 className="text-xs font-bold tracking-widest uppercase mb-2 relative z-10">Atmospheric Data</h3>
                        <p className="text-[11px] text-white/60 relative z-10">High pressure projects and dense research papers.</p>
                    </div>
                </section>

                <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]" />

                {/* Earth Section */}
                <section className="flex-1 flex flex-col items-center pt-20 px-4 gap-10 relative transition-colors duration-500 hover:bg-white/[0.02]">
                    <div className="text-center mb-4">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#2271B3] font-bold">Inner-03</span>
                        <h2 className="font-display italic text-2xl text-[#2271B3]/80">Earth</h2>
                    </div>
                    <div className="w-56 h-56 rounded-full flex flex-col items-center justify-center p-10 text-center cursor-pointer relative overflow-hidden group backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 hover:border-white/20 transition-all duration-300">
                        <div
                            className="absolute inset-0 bg-[#2271B3]/20 mix-blend-overlay"
                            style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, #4ade8022 0%, transparent 60%)' }}
                        />
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-2 relative z-10">Living Archive</h3>
                        <p className="text-xs text-white/70 relative z-10">Main life-notes and daily reflections. The blue-marble core of your matrix.</p>
                        <div className="mt-4 flex gap-1 relative z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2271B3]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        </div>
                    </div>
                    <div className="w-32 h-32 rounded-full flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#2271B3]/10 mix-blend-overlay" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Active Projects</p>
                    </div>
                </section>

                <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]" />

                {/* Mars Section */}
                <section className="flex-1 flex flex-col items-center pt-40 px-4 gap-8 relative transition-colors duration-500 hover:bg-white/[0.02]">
                    <div className="text-center mb-4">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#E27B58] font-bold">Inner-04</span>
                        <h2 className="font-display italic text-2xl text-[#E27B58]/80">Mars</h2>
                    </div>
                    <div className="w-36 h-36 rounded-full flex flex-col items-center justify-center p-6 text-center cursor-pointer relative overflow-hidden group backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#E27B58]/20 mix-blend-overlay" />
                        <h3 className="text-xs font-bold tracking-widest uppercase mb-1 relative z-10">Red Planet</h3>
                        <p className="text-[10px] text-white/60 relative z-10">Action items, goals, and competitive drive.</p>
                    </div>
                    <div className="w-28 h-28 rounded-full flex items-center justify-center cursor-pointer overflow-hidden group backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#E27B58]/15 mix-blend-overlay" />
                        <span className="material-symbols-outlined text-[#E27B58]/60 group-hover:text-[#E27B58] transition-colors text-[32px]">rocket_launch</span>
                    </div>
                </section>
            </main>

            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-none z-50">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="size-6 text-blue-500">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h1 className="text-xs font-bold tracking-[0.4em] uppercase text-white/50">Matrix System // Inner Orbit</h1>
                </div>
                {/* <div className="flex items-center gap-6 pointer-events-auto">
                    <button className="text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Orbit View</button>
                    <button className="text-[10px] font-bold tracking-widest uppercase text-white transition-colors border-b border-blue-500 pb-1">Matrix Grid</button>
                    <button className="text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Void Mode</button>
                </div> */}
            </div>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
                <div className="size-20 rounded-full flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                    <div className="size-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#3b82f6_40%,_transparent_70%)] blur-[1px]">
                        <span className="material-symbols-outlined text-white text-[28px] relative z-10">add</span>
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 backdrop-blur-md px-3 py-1 rounded border border-white/10 whitespace-nowrap">
                        <span className="text-[10px] tracking-widest uppercase font-bold">Forge New Note</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
