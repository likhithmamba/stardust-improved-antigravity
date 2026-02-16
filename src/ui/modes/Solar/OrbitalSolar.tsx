import React from 'react';

export const OrbitalSolar: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-white overflow-hidden font-inter text-zinc-800">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-start z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">System Status: Orbital</span>
                    </div>
                    <h1 className="font-cinzel text-3xl font-light tracking-tight flex items-baseline gap-3 text-zinc-900">
                        STARDUST <span className="text-zinc-400 text-lg font-light">Minimalist Orbit V1</span>
                    </h1>
                </div>
                <div className="flex flex-col items-end pointer-events-auto">
                    <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase mb-1">Active Sector</span>
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-zinc-800">Solaris Alpha</span>
                        <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors bg-white">
                            <span className="material-symbols-outlined text-sm text-zinc-600">settings</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Orbital System */}
            <main className="relative w-full h-full flex items-center justify-center">
                {/* Rings */}
                <div className="absolute w-[800px] h-[800px] border border-blue-500/20 rounded-full pointer-events-none opacity-40" />
                <div className="absolute w-[600px] h-[600px] border border-blue-500/20 rounded-full pointer-events-none opacity-60" />
                <div className="absolute w-[400px] h-[400px] border border-blue-500/20 rounded-full pointer-events-none opacity-80" />

                {/* Core Focus */}
                <div className="relative w-40 h-40 bg-[radial-gradient(circle,#ffffff_30%,#f3f4f6_100%)] border border-zinc-200 shadow-[0_0_60px_rgba(0,0,0,0.03)] flex items-center justify-center rounded-full z-10">
                    <div className="absolute inset-0 bg-white rounded-full opacity-50 blur-xl"></div>
                    <span className="text-zinc-800 font-medium tracking-wide z-10 font-cinzel">CORE</span>
                </div>

                {/* Note Planets */}
                <div className="absolute w-40 aspect-square rounded-full flex flex-col items-center justify-center p-4 bg-white/65 border border-white backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.05)] hover:scale-110 transition-transform duration-400 z-20" style={{ transform: 'translate(140px, -110px)' }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle,#fb923c_0%,transparent_70%)] rounded-full blur-md opacity-60 pointer-events-none" />
                    <div className="relative z-10 text-center">
                        <span className="material-symbols-outlined text-lg text-orange-600 mb-1">warning</span>
                        <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-500 mb-1 block">Critical</span>
                        <p className="text-[10px] font-bold leading-tight text-zinc-800">THERMAL EXHAUST</p>
                    </div>
                </div>

                <div className="absolute w-32 aspect-square rounded-full flex flex-col items-center justify-center p-4 bg-white/65 border border-white backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.05)] hover:scale-110 transition-transform duration-400 z-20" style={{ transform: 'translate(-180px, -140px)' }}>
                    <div className="absolute inset-0 bg-zinc-200 rounded-full blur-md opacity-40 pointer-events-none" />
                    <div className="relative z-10 text-center">
                        <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-500 mb-1 block">Insight</span>
                        <p className="text-[9px] leading-tight text-zinc-600 italic">"Project scope Q4"</p>
                    </div>
                </div>

                <div className="absolute w-48 aspect-square rounded-full flex flex-col items-center justify-center p-6 bg-white/65 border border-white backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.05)] hover:scale-110 transition-transform duration-400 z-20" style={{ transform: 'translate(-90px, 160px)' }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle,#60a5fa_0%,transparent_70%)] rounded-full blur-md opacity-60 pointer-events-none" />
                    <div className="relative z-10 text-center px-6">
                        <span className="font-mono text-[7px] uppercase tracking-widest text-blue-600 mb-2 block">Atmosphere</span>
                        <p className="text-[11px] leading-relaxed text-zinc-700 font-medium italic">"Interface must breathe like vacuum"</p>
                    </div>
                </div>

                <div className="absolute w-36 aspect-square rounded-full flex flex-col items-center justify-center p-4 bg-white/65 border border-white backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.05)] hover:scale-110 transition-transform duration-400 z-20" style={{ transform: 'translate(240px, 180px)' }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle,#4ade80_0%,transparent_70%)] rounded-full blur-md opacity-60 pointer-events-none" />
                    <div className="relative z-10 text-center">
                        <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-500 mb-1 block">Budget</span>
                        <p className="text-[10px] font-medium text-zinc-700">Phase 2 Constraints</p>
                        <span className="text-[9px] text-zinc-400 mt-1 font-mono block">75%</span>
                    </div>
                </div>

                <div className="absolute w-12 h-12 bg-white border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-50 cursor-pointer group transition-all shadow-sm z-10" style={{ transform: 'translate(-220px, 200px)' }}>
                    <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-800 text-lg">add</span>
                </div>
            </main>

            {/* Gravity Well Sidebar */}
            <aside className="fixed left-8 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-zinc-200/60 p-6 rounded-[2.5rem] w-24 h-[440px] flex flex-col items-center justify-between z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                <span className="font-mono text-[10px] text-zinc-400 [writing-mode:vertical-lr] rotate-180 uppercase tracking-[0.3em]">Gravity Well</span>
                <div className="flex flex-col items-center gap-4 flex-grow py-8 h-full w-full">
                    <span className="font-mono text-[8px] text-zinc-400 uppercase text-center leading-tight">Max<br />Mass</span>
                    <div className="w-1 h-60 bg-[#f1f1f4] rounded-sm relative">
                        <div className="absolute bottom-0 w-full bg-[#18181b] rounded-sm" style={{ height: '40%' }}></div>
                        <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-2 border-[#18181b] rounded-full translate-y-1/2 cursor-pointer"></div>
                    </div>
                    <span className="font-mono text-[8px] text-zinc-400 uppercase text-center leading-tight">Zero<br />G</span>
                </div>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 transition-colors">
                    <span className="material-symbols-outlined">expand_more</span>
                </button>
            </aside>

            {/* Bottom Nav */}
            <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-zinc-200/60 px-4 py-3 rounded-full flex items-center gap-1 z-50 shadow-sm">
                <button className="flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 rounded-2xl transition-all group">
                    <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900">grid_view</span>
                    <span className="font-mono text-[8px] text-zinc-400 group-hover:text-zinc-900 uppercase tracking-tighter mt-0.5">Matrix</span>
                </button>
                <div className="w-px h-8 bg-zinc-200 mx-2"></div>
                <button className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all mx-2 hover:shadow-xl hover:bg-black">
                    <span className="material-symbols-outlined text-2xl">add</span>
                </button>
                <div className="w-px h-8 bg-zinc-200 mx-2"></div>
                <button className="flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 rounded-2xl transition-all group">
                    <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900">layers</span>
                    <span className="font-mono text-[8px] text-zinc-400 group-hover:text-zinc-900 uppercase tracking-tighter mt-0.5">Archive</span>
                </button>
            </nav>

            {/* Singularity Button */}
            <div className="fixed bottom-10 right-10 group z-50">
                <button className="relative w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden">
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
                    <div className="absolute inset-[-2px] rounded-full border border-black/20 scale-80 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-140"></div>
                </button>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Singularity</span>
            </div>
        </div>
    );
};
