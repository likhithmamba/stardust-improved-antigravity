import React from 'react';

export const OrbitalZeroPoint: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#020205] overflow-hidden font-sans text-slate-200 selection:bg-[#6366f1]/30">
            {/* SVG Filter for Gravitational Lens */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="lens-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
                    <feDisplacementMap in="SourceGraphic" scale="10" />
                </filter>
            </svg>

            {/* Star Field */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_#0a0a1a_0%,_#020205_100%)]">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            radial-gradient(1px 1px at 20% 30%, #fff 100%, transparent),
                            radial-gradient(1px 1px at 70% 10%, #fff 100%, transparent),
                            radial-gradient(1.5px 1.5px at 40% 60%, #fff 100%, transparent),
                            radial-gradient(1px 1px at 80% 80%, #fff 100%, transparent),
                            radial-gradient(1px 1px at 10% 90%, #fff 100%, transparent)
                        `,
                        backgroundSize: '300px 300px'
                    }}
                />
            </div>

            {/* Main Content */}
            <main className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
                {/* Black Hole System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-center">
                    {/* Accretion Disk */}
                    <div
                        className="absolute w-[280px] h-[80px] bg-[linear-gradient(90deg,transparent,#fcd34d,#ffffff,#fcd34d,transparent)] blur-[20px] opacity-60 rounded-full shadow-[0_0_60px_#f59e0b]"
                        style={{ transform: 'rotateX(75deg)' }}
                    />
                    {/* Event Horizon */}
                    <div className="absolute w-[120px] h-[120px] bg-black rounded-full shadow-[0_0_40px_10px_rgba(0,0,0,1),0_0_10px_2px_rgba(255,255,255,0.2)] z-10" />

                    {/* Orbital Ripples */}
                    <div className="absolute border border-[#6366f1]/15 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[300px] h-[300px]" />
                    <div className="absolute border border-[#6366f1]/15 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[500px] h-[500px]" />
                    <div className="absolute border border-[#6366f1]/15 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[750px] h-[750px]" />
                    <div className="absolute border border-[#6366f1]/15 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[1100px] h-[1100px]" />
                </div>

                {/* Planet Nodes */}
                <div className="absolute top-[35%] left-[42%] w-32 h-32 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-400 cursor-pointer hover:border-[#6366f1]/50 hover:bg-white/[0.08] hover:scale-105 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" style={{ filter: 'url(#lens-filter)' }}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#6366f1] mb-1 opacity-80">Critical</span>
                    <h3 className="font-display text-sm text-center leading-tight">Project Horizon<br />Launch Phase</h3>
                    <div className="mt-2 text-[10px] opacity-40 italic">2h ago</div>
                </div>

                <div className="absolute top-[60%] left-[58%] w-28 h-28 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-400 cursor-pointer hover:border-[#6366f1]/50 hover:bg-white/[0.08] hover:scale-105 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" style={{ filter: 'url(#lens-filter)' }}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#6366f1] mb-1 opacity-80">High</span>
                    <h3 className="font-display text-xs text-center leading-tight">Quarterly<br />Review Notes</h3>
                    <div className="mt-1 text-[10px] opacity-40">Yesterday</div>
                </div>

                <div className="absolute top-[20%] left-[65%] w-36 h-36 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-400 cursor-pointer hover:border-[#6366f1]/50 hover:bg-white/[0.08] hover:scale-105 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" style={{ filter: 'url(#lens-filter)' }}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#6366f1] mb-1 opacity-80">Medium</span>
                    <h3 className="font-display text-sm text-center leading-tight">Deep Space<br />Architecture Draft</h3>
                    <p className="text-[9px] mt-2 opacity-50 px-4 text-center">Structural analysis of the dark matter core...</p>
                </div>

                <div className="absolute top-[75%] left-[25%] w-24 h-24 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-400 cursor-pointer hover:border-[#6366f1]/50 hover:bg-white/[0.08] hover:scale-105 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" style={{ filter: 'url(#lens-filter)' }}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#6366f1] mb-1 opacity-80">Low</span>
                    <h3 className="font-display text-[11px] text-center leading-tight">Miscellaneous<br />Thoughts</h3>
                </div>

                <div className="absolute top-[15%] left-[15%] w-40 h-40 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-400 cursor-pointer hover:border-[#6366f1]/50 hover:bg-white/[0.08] hover:scale-105 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" style={{ filter: 'url(#lens-filter)' }}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#6366f1] mb-1 opacity-80">Active Focus</span>
                    <h3 className="font-display text-lg text-center leading-tight">System<br />Optimization</h3>
                    <p className="text-[10px] mt-2 opacity-60 px-4 text-center">Finalize the gravitational lens shaders for the V2 release.</p>
                </div>
            </main>

            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 h-20 flex justify-center items-start pt-4 z-50 pointer-events-none hover:pointer-events-auto">
                <header className="flex items-center justify-between w-full max-w-5xl px-8 py-3 rounded-full border border-white/10 backdrop-blur-xl bg-[#05050f]/60 opacity-0 -translate-y-4 hover:opacity-100 hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-4">
                        <div className="size-6 text-indigo-400">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M24 0L48 24L24 48L0 24L24 0ZM24 8L8 24L24 40L40 24L24 8Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-white text-sm font-bold tracking-[0.3em] uppercase">Orbital: Horizon</h2>
                    </div>
                </header>
            </div>

            {/* Side Stats */}
            <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-12 opacity-40">
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-300">Entropy</span>
                    <div className="h-32 w-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-1/3 w-full bg-indigo-500"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-300">Pull</span>
                    <div className="h-32 w-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-2/3 w-full bg-indigo-500"></div>
                    </div>
                </div>
            </div>

            <div className="fixed right-8 bottom-8 text-right opacity-30">
                <p className="text-[10px] font-light tracking-widest uppercase">Sector: Event Horizon</p>
                <p className="font-display italic text-sm">Priority flows toward the center.</p>
            </div>
        </div>
    );
};
