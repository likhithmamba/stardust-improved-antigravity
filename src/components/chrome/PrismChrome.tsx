import React from 'react';
import { useSettingsStore } from '../../ui/settings/settingsStore';
import { useStore } from '../../store/useStore';
import { Settings, Plus, Grid, Layers, Trash2 } from 'lucide-react';

export const PrismChrome: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const setViewMode = useSettingsStore((state) => state.setViewMode);
    const setSettingsOpen = useStore((state) => state.setSettingsOpen);
    const isSolar = designSystem === 'solar';

    // Solar Theme
    if (isSolar) {
        return (
            <div className="absolute inset-0 pointer-events-none font-inter text-zinc-900 flex flex-col">
                {/* Header */}
                <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-end z-50 pointer-events-none">
                    <div className="pointer-events-auto">
                        <div className="flex items-center space-x-3 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                            <span className="font-display font-bold tracking-[0.2em] text-[10px] text-zinc-400 uppercase">System Status: Active</span>
                        </div>
                        <h1 className="font-display text-3xl font-light tracking-tight text-zinc-800">MATRIX <span className="text-zinc-400 ml-2 font-thin">Stellar Grid</span></h1>
                    </div>
                    <div className="flex items-center space-x-6 pointer-events-auto">
                        <div className="text-right">
                            <span className="block text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Active Workspace</span>
                            <span className="font-display text-sm">Solaris Core Alpha</span>
                        </div>
                        <button
                            onClick={() => setSettingsOpen(true)}
                            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-white transition-all"
                        >
                            <Settings size={20} className="text-zinc-600" />
                        </button>
                    </div>
                </header>

                {/* Trash Singularity */}
                <div className="absolute bottom-10 right-10 group cursor-pointer z-50 pointer-events-auto">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(10,10,12,0.2)_0%,rgba(10,10,12,0.05)_50%,transparent_70%)]" />
                        <div className="w-8 h-8 rounded-full bg-black shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                            <Trash2 size={18} className="text-white" />
                        </div>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold tracking-widest text-zinc-400 uppercase whitespace-nowrap">Void Trash</span>
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                    <nav className="bg-white/80 backdrop-blur-xl px-8 py-3 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-200 flex items-center space-x-8">
                        <button onClick={() => setViewMode('matrix')} className="flex flex-col items-center group">
                            <Grid size={20} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                            <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-1">Matrix</span>
                        </button>
                        <button onClick={() => setViewMode('void')} className="flex flex-col items-center group">
                            {/* Hub Icon Proxy */}
                            <div className="size-5 border-2 border-zinc-400 rounded-full group-hover:border-zinc-900 transition-colors"></div>
                            <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-1">Void</span>
                        </button>
                        <div className="w-px h-6 bg-zinc-200" />
                        <button className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                            <Plus size={20} />
                        </button>
                        <div className="w-px h-6 bg-zinc-200" />
                        <button className="flex flex-col items-center group">
                            <Layers size={20} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                            <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-1">Archive</span>
                        </button>
                    </nav>
                </div>

                {/* Background Grid Lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
                    <div className="absolute top-[20%] left-[10%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                    <div className="absolute top-[20%] left-[36.6%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                    <div className="absolute top-[20%] left-[63.3%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                    <div className="absolute top-[20%] left-[90%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                </div>
            </div>
        );
    }

    // Zero Point Theme
    return (
        <div className="absolute inset-0 pointer-events-none font-sans-alt text-white/90 selection:bg-[#1919e6]/30 flex flex-col">
            {/* Deep Space Background */}
            <div className="fixed inset-0 z-0 opacity-50 bg-[radial-gradient(circle_at_center,_#0B0B1A_0%,_#020205_100%)]">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}
                />
            </div>

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
            </div>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                <div className="size-20 rounded-full flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                    <div className="size-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#3b82f6_40%,_transparent_70%)] blur-[1px]">
                        <Plus size={28} className="text-white relative z-10" />
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 backdrop-blur-md px-3 py-1 rounded border border-white/10 whitespace-nowrap">
                        <span className="text-[10px] tracking-widest uppercase font-bold">Forge New Note</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
