import React from 'react';
import { useSettingsStore } from '../../ui/settings/settingsStore';
import { useStore } from '../../store/useStore';
import { Settings, Play, FastForward, Rewind, Search, BarChart2, Database, Layout } from 'lucide-react';

export const TimelineChrome: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const isSolar = designSystem === 'solar';
    const setSettingsOpen = useStore((state) => state.setSettingsOpen);

    if (isSolar) {
        return (
            <div className="absolute inset-0 pointer-events-none font-sans text-slate-300 select-none">
                {/* Header */}
                <header className="absolute top-0 left-0 right-0 h-16 bg-[#0d1117]/85 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6 pointer-events-auto">
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-[#00d4ff] tracking-[0.2em] uppercase">System Status</span>
                            <span className="font-mono text-sm font-semibold text-[#00ff9d]">STABLE // 0.042ms LATENCY</span>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Active Nodes</span>
                            <span className="font-mono text-sm font-semibold">4,812.00</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Temporal Hash</span>
                            <span className="font-mono text-xs text-[#00d4ff]">0x8F2A...4D21</span>
                        </div>
                        <button
                            onClick={() => setSettingsOpen(true)}
                            className="bg-white/5 hover:bg-white/10 p-2 rounded border border-white/10 transition-colors"
                        >
                            <Settings size={20} className="text-slate-300" />
                        </button>
                    </div>
                </header>

                {/* Sidebar Stats */}
                <aside className="absolute top-20 right-6 w-64 bg-[#0d1117]/85 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden shadow-2xl z-40 pointer-events-auto">
                    <div className="p-3 border-b border-white/5 flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Telemetry</span>
                        <span className="animate-pulse w-2 h-2 rounded-full bg-[#00ff9d]"></span>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="relative w-full h-12 bg-black/40 rounded border border-white/5">
                            <div className="absolute inset-y-0 left-1/3 w-1/4 bg-[#00d4ff]/10 border-x border-[#00d4ff]/30"></div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#ff4d4d]/60 z-10"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/5 p-2 rounded">
                                <span className="block text-[8px] text-slate-500 uppercase">Delta-V</span>
                                <span className="font-mono text-xs text-[#00ff9d]">+14.22</span>
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <span className="block text-[8px] text-slate-500 uppercase">Sync-Rate</span>
                                <span className="font-mono text-xs text-[#00d4ff]">99.98%</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Areas (Background Elements) */}
                <main className="absolute inset-0 flex flex-col pt-16 pointer-events-none">
                    {/* Upper Lane */}
                    <div className="flex-1 w-full relative flex items-center overflow-hidden border-b border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                        <div className="absolute top-4 left-6 z-10">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Flux.Stream_Alpha</span>
                        </div>
                    </div>

                    {/* Central Timeline Background */}
                    <div className="h-32 w-full relative flex items-center bg-black/40 border-y border-white/5">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_15px_rgba(0,242,255,0.3)]"></div>

                        {/* Cursor/Scanning Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#ff4d4d] shadow-[0_0_10px_#ff4d4d] z-30"></div>
                        <div className="absolute left-1/2 top-0 -ml-8 -mt-6 bg-[#ff4d4d] text-white text-[9px] px-2 py-1 rounded font-mono font-bold uppercase tracking-widest shadow-lg shadow-[#ff4d4d]/20">LIVE_CURSOR</div>
                    </div>

                    {/* Lower Lane */}
                    <div className="flex-1 w-full relative flex items-center overflow-hidden">
                        <div className="absolute bottom-4 left-6 z-10">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Logs.Stream_Gamma</span>
                        </div>
                    </div>
                </main>

                {/* Bottom Controls */}
                <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 pointer-events-auto">
                    <div className="bg-[#0d1117]/85 backdrop-blur-md px-4 py-2 rounded-lg flex items-center space-x-4 border border-white/10 shadow-2xl">
                        <button className="text-slate-500 hover:text-[#00d4ff] transition-colors"><Rewind size={20} /></button>
                        <button className="text-slate-300 hover:text-[#00d4ff]"><Play size={20} /></button>
                        <button className="text-slate-500 hover:text-[#00d4ff]"><FastForward size={20} /></button>
                        <div className="h-4 w-px bg-white/10 mx-2" />
                        <div className="flex flex-col">
                            <span className="text-[8px] text-slate-500 uppercase font-bold">Playback Speed</span>
                            <span className="text-xs font-mono text-[#00d4ff]">0.25x (REALTIME)</span>
                        </div>
                    </div>
                    <div className="bg-[#0d1117]/85 backdrop-blur-md px-6 py-2 rounded-full flex items-center space-x-6 border border-white/10 shadow-2xl">
                        <button className="text-slate-400 hover:text-[#00ff9d] transition-colors"><Search size={20} /></button>
                        <button className="text-slate-400 hover:text-[#00ff9d] transition-colors"><BarChart2 size={20} /></button>
                        <button className="text-[#00d4ff]"><Layout size={20} /></button>
                        <button className="text-slate-400 hover:text-[#00ff9d] transition-colors"><Database size={20} /></button>
                    </div>
                </nav>
            </div>
        );
    }

    // Zero Point Theme
    return (
        <div className="absolute inset-0 pointer-events-none font-manrope text-slate-900 dark:text-white/90 selection:bg-[#eebd2b]/30">
            {/* Background Layers */}
            <div className="fixed inset-0 pointer-events-none opacity-30 z-0 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[length:200px_200px]" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(238,189,43,0.05),transparent_70%)] z-0" />

            <div className="absolute z-10 flex flex-col items-center pt-32 pb-64 px-4 w-full pointer-events-none">
                {/* Headline Section */}
                <div className="flex flex-col items-center mb-24">
                    <h1 className="text-white tracking-[0.3em] text-[42px] font-extralight uppercase leading-tight text-center pb-2">Temporal Star Stream</h1>
                    <p className="text-[#eebd2b]/60 text-sm font-medium tracking-[0.5em] uppercase text-center max-w-md">Variant 1: Star Stream Architecture</p>
                    <div className="mt-8 flex gap-3 pointer-events-auto">
                        <div className="px-4 py-1.5 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full text-[10px] text-[#eebd2b] uppercase font-bold tracking-tighter flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#eebd2b] animate-pulse"></span>
                            Live Stream
                        </div>
                    </div>
                </div>

                {/* Central Timeline Axis */}
                <div className="relative w-full max-w-[1000px] flex justify-center h-full">
                    {/* The Light Beam (Central vertical axis) */}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#eebd2b] to-transparent shadow-[0_0_20px_rgba(238,189,43,0.4)]"></div>
                </div>
            </div>

            {/* Top Bar */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 flex items-center justify-between z-50 pointer-events-auto">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-8 bg-[#eebd2b] rounded-full flex items-center justify-center text-[#0a0a0c]">
                            <Layout size={18} />
                        </div>
                        <h2 className="text-white text-lg font-extrabold leading-tight tracking-[0.2em] uppercase font-display">Timeline</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSettingsOpen(true)}
                        className="size-10 flex items-center justify-center backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full text-white hover:bg-[#eebd2b] hover:text-[#0a0a0c] transition-all"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            {/* Infinite Scroll Gradient Fades */}
            <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>
            <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>
        </div>
    );
};
