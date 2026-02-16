import React from 'react';
import { useSettingsStore } from '../../ui/settings/settingsStore';
import { useStore } from '../../store/useStore';
import { Settings, Plus, Grid, Layers } from 'lucide-react';

export const OrbitalChrome: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const isSolar = designSystem === 'solar';
    const setViewMode = useSettingsStore((state) => state.setViewMode);
    const setSettingsOpen = useStore((state) => state.setSettingsOpen);

    // Solar Theme
    if (isSolar) {
        return (
            <div className="absolute inset-0 pointer-events-none font-inter text-zinc-800">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-start z-50 pointer-events-none">
                    <div className="pointer-events-auto">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">System Status: Orbital</span>
                        </div>
                        <h1 className="font-serif text-3xl font-light tracking-tight flex items-baseline gap-3 text-zinc-900">
                            STARDUST <span className="text-zinc-400 text-lg font-light">Minimalist Orbit V1</span>
                        </h1>
                    </div>
                    <div className="flex flex-col items-end pointer-events-auto">
                        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase mb-1">Active Sector</span>
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-zinc-800">Solaris Alpha</span>
                            <button
                                onClick={() => setSettingsOpen(true)}
                                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors bg-white shadow-sm"
                            >
                                <Settings size={14} className="text-zinc-600" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Gravity Well Sidebar */}
                <aside className="fixed left-8 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-zinc-200/60 p-6 rounded-[2.5rem] w-24 h-[440px] flex flex-col items-center justify-between z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pointer-events-auto">
                    <span className="font-mono text-[10px] text-zinc-400 [writing-mode:vertical-lr] rotate-180 uppercase tracking-[0.3em]">Gravity Well</span>
                    <div className="flex flex-col items-center gap-4 flex-grow py-8 h-full w-full">
                        <span className="font-mono text-[8px] text-zinc-400 uppercase text-center leading-tight">Max<br />Mass</span>
                        <div className="w-1 h-60 bg-[#f1f1f4] rounded-sm relative">
                            <div className="absolute bottom-0 w-full bg-[#18181b] rounded-sm" style={{ height: '40%' }}></div>
                            <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-2 border-[#18181b] rounded-full translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"></div>
                        </div>
                        <span className="font-mono text-[8px] text-zinc-400 uppercase text-center leading-tight">Zero<br />G</span>
                    </div>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 transition-colors">
                        <span className="material-symbols-outlined">expand_more</span>
                    </button>
                </aside>

                {/* Bottom Nav */}
                <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-zinc-200/60 px-4 py-3 rounded-full flex items-center gap-1 z-50 shadow-sm pointer-events-auto">
                    <button onClick={() => setViewMode('matrix')} className="flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 rounded-2xl transition-all group">
                        <Grid size={20} className="text-zinc-400 group-hover:text-zinc-900" />
                        <span className="font-mono text-[8px] text-zinc-400 group-hover:text-zinc-900 uppercase tracking-tighter mt-0.5">Matrix</span>
                    </button>
                    <div className="w-px h-8 bg-zinc-200 mx-2"></div>
                    <button className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all mx-2 hover:shadow-xl hover:bg-black">
                        <Plus size={24} />
                    </button>
                    <div className="w-px h-8 bg-zinc-200 mx-2"></div>
                    <button className="flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 rounded-2xl transition-all group">
                        <Layers size={20} className="text-zinc-400 group-hover:text-zinc-900" />
                        <span className="font-mono text-[8px] text-zinc-400 group-hover:text-zinc-900 uppercase tracking-tighter mt-0.5">Archive</span>
                    </button>
                </nav>

                {/* Singularity Button */}
                <div className="fixed bottom-10 right-10 group z-50 pointer-events-auto">
                    <button className="relative w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden">
                        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
                        <div className="absolute inset-[-2px] rounded-full border border-black/20 scale-80 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-140"></div>
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Singularity</span>
                </div>
            </div>
        );
    }

    // Zero Point Theme
    return (
        <div className="absolute inset-0 pointer-events-none font-sans text-slate-200 selection:bg-[#6366f1]/30">
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 h-20 flex justify-center items-start pt-4 z-50 pointer-events-none hover:pointer-events-auto">
                <header className="flex items-center justify-between w-full max-w-5xl px-8 py-3 rounded-full border border-white/10 backdrop-blur-xl bg-[#05050f]/60 opacity-0 -translate-y-4 hover:opacity-100 hover:translate-y-0 transition-all duration-500 shadow-xl shadow-indigo-900/20">
                    <div className="flex items-center gap-4 pointer-events-auto">
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
            <div className="fixed left-8 top-1/2 -translate-x-1/2 flex flex-col gap-12 opacity-60 pointer-events-none">
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-300">Entropy</span>
                    <div className="h-32 w-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-1/3 w-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-300">Pull</span>
                    <div className="h-32 w-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-2/3 w-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
                    </div>
                </div>
            </div>

            <div className="fixed right-8 bottom-8 text-right opacity-50 pointer-events-none">
                <p className="text-[10px] font-light tracking-widest uppercase text-indigo-200">Sector: Event Horizon</p>
                <p className="font-display italic text-sm text-indigo-100">Priority flows toward the center.</p>
            </div>
        </div>
    );
};
