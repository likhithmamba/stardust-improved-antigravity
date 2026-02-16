import React from 'react';
import { useSettingsStore } from '../../ui/settings/settingsStore';
import { useStore } from '../../store/useStore';
import {
    Sun, CloudLightning, Archive, Calendar,
    Search, Plus, Settings, Grid, Image as ImageIcon, Edit3, MousePointer2
} from 'lucide-react';

export const MatrixChrome: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const isSolar = designSystem === 'solar';

    // Actions
    const setViewMode = useSettingsStore((state) => state.setViewMode);
    const setSearchOpen = useStore((state) => state.setSearchOpen);
    const setSettingsOpen = useStore((state) => state.setSettingsOpen);
    const addNote = useStore((state) => state.addNote);

    const handleCreateNote = () => {
        addNote({
            id: Math.random().toString(36).substr(2, 9),
            x: -window.innerWidth / 4 + Math.random() * 100, // Random pos near center
            y: Math.random() * 100,
            w: 180,
            h: 180,
            type: 'asteroid', // Default
            title: '',
        });
    };

    // Solar Theme
    if (isSolar) {
        return (
            <div className="absolute inset-0 pointer-events-none font-display text-white selection:bg-[#f27f0d]/30">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 pointer-events-auto bg-[#221910]/40 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Sun className="text-[#f27f0d]" size={24} />
                            <h2 className="text-xl font-bold tracking-tight">HORIZON</h2>
                        </div>
                        <nav className="flex items-center gap-6">
                            <button className="text-white/70 hover:text-white text-sm font-medium transition-colors">Zoom 85%</button>
                            <button className="text-[#f27f0d] text-sm font-medium border-b-2 border-[#f27f0d] pb-0.5">Board View</button>
                            <button
                                onClick={() => setViewMode('timeline')}
                                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                            >
                                Timeline
                            </button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group" onClick={() => setSearchOpen(true)}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#f27f0d] transition-colors" size={16} />
                            <input className="bg-white/5 border-none rounded-full pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-[#f27f0d]/50 text-sm placeholder:text-white/20 outline-none text-white pointer-events-none" placeholder="Search the cosmos..." type="text" readOnly />
                        </div>
                        <button
                            onClick={handleCreateNote}
                            className="flex items-center justify-center rounded-full bg-[#f27f0d] px-5 py-2 text-[#221910] font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#f27f0d]/20"
                        >
                            <Plus size={18} className="mr-1" />
                            New Note
                        </button>
                        <button
                            onClick={() => setSettingsOpen(true)}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Quadrant Headers (Visual Only - Content is Canvas) */}
                <div className="absolute inset-0 pt-20 pb-10 px-6 z-0 grid grid-cols-2 grid-rows-2 gap-8 pointer-events-none">
                    {/* Q1: Solar Core */}
                    <div className="p-8 flex flex-col gap-6 border-r border-b border-white/5">
                        <div className="flex items-center gap-3 opacity-80">
                            <Sun className="text-[#f27f0d]" size={20} />
                            <h2 className="text-lg font-bold text-white/90">Solar Core <span className="text-xs font-normal text-white/40 ml-2 uppercase tracking-widest">Priority</span></h2>
                        </div>
                    </div>

                    {/* Q2: Nebula Flow */}
                    <div className="p-8 flex flex-col gap-6 items-end text-right border-b border-white/5">
                        <div className="flex items-center gap-3 opacity-80">
                            <h2 className="text-lg font-bold text-white/90">Nebula Flow <span className="text-xs font-normal text-white/40 mr-2 uppercase tracking-widest">Brainstorm</span></h2>
                            <CloudLightning className="text-purple-400" size={20} />
                        </div>
                    </div>

                    {/* Q3: Deep Void */}
                    <div className="p-8 flex flex-col justify-end gap-6 border-r border-white/5">
                        <div className="flex items-center gap-3 mt-4 opacity-80">
                            <Archive className="text-white/40" size={20} />
                            <h2 className="text-lg font-bold text-white/60">Deep Void <span className="text-xs font-normal text-white/20 ml-2 uppercase tracking-widest">Storage</span></h2>
                        </div>
                    </div>

                    {/* Q4: Stellar Events */}
                    <div className="p-8 flex flex-col justify-end gap-6 items-end text-right">
                        <div className="flex items-center gap-3 mt-4 opacity-80">
                            <h2 className="text-lg font-bold text-white/90">Stellar Events <span className="text-xs font-normal text-white/40 mr-2 uppercase tracking-widest">Deadlines</span></h2>
                            <Calendar className="text-[#f27f0d]" size={20} />
                        </div>
                    </div>
                </div>

                {/* Bottom Toolbar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-[#221910]/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl z-50 pointer-events-auto">
                    <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Select">
                        <MousePointer2 size={20} />
                    </button>
                    <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Pencil">
                        <Edit3 size={20} />
                    </button>
                    <div className="w-px h-8 bg-white/10 mx-1" />
                    <button className="size-10 flex items-center justify-center rounded-full bg-[#f27f0d] text-[#221910] shadow-lg shadow-[#f27f0d]/30 hover:scale-105 transition-transform">
                        <Plus size={24} />
                    </button>
                    <div className="w-px h-8 bg-white/10 mx-1" />
                    <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Gallery">
                        <ImageIcon size={20} />
                    </button>
                    <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Grid Toggle">
                        <Grid size={20} />
                    </button>
                </div>
            </div>
        );
    }

    // Zero Point Theme
    return (
        <div className="absolute inset-0 pointer-events-none font-sans-alt text-white/90">
            {/* Starlight Grid Background Elements for ZeroPoint styling */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 -z-10">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Labels */}
            <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold pointer-events-none text-blue-200">Inner Belt / Alpha</div>
            <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold text-right pointer-events-none text-blue-200">Outer Belt / Beta</div>
            <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold pointer-events-none text-blue-200">Kuiper Fringe / Gamma</div>
            <div className="absolute bottom-8 right-32 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold text-right pointer-events-none text-blue-200">Oort Terminal / Delta</div>

            {/* Top Navigation */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                <nav className="backdrop-blur-xl bg-white/[0.03] px-6 py-3 rounded-full flex items-center gap-8 border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="size-4 text-[#3b82f6]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase">Horizon</span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <div className="flex gap-6">
                        <button className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">System Map</button>
                        <button className="text-[10px] uppercase tracking-widest text-[#3b82f6] font-bold">Belt Strategy</button>
                        <button className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Void Deep</button>
                    </div>
                </nav>
            </div>

            {/* Bottom HUD */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40 pointer-events-auto">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase opacity-60">
                    Scanning Sector: <span className="text-[#3b82f6]">CERES-7</span>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase opacity-60">
                    Gravity: <span className="text-[#3b82f6]">0.27G</span>
                </div>
            </div>
        </div>
    );
};
