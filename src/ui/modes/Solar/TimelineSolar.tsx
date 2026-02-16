import React from 'react';

export const TimelineSolar: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#05070a] overflow-hidden font-sans text-slate-300 select-none">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none -z-10" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-[#00d4ff]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 h-16 bg-[#0d1117]/85 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6">
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
                    <button className="bg-white/5 hover:bg-white/10 p-2 rounded border border-white/10 transition-colors">
                        <span className="material-symbols-outlined text-xl block">settings_input_component</span>
                    </button>
                </div>
            </header>

            {/* Sidebar Stats */}
            <aside className="absolute top-20 right-6 w-64 bg-[#0d1117]/85 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden shadow-2xl z-40">
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

            {/* Main Content Areas */}
            <main className="relative h-full w-full flex flex-col pt-16">
                {/* Upper Lane */}
                <div className="flex-1 w-full relative flex items-center overflow-hidden border-b border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                    <div className="absolute top-4 left-6 z-10">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Flux.Stream_Alpha</span>
                    </div>
                    <div className="flex items-center space-x-32 px-[50vw]">
                        <div className="relative flex flex-col items-center group">
                            <div className="mb-4 bg-[#0d1117]/85 backdrop-blur-md p-3 rounded-md border border-white/10 border-l-2 border-l-[#00ff9d] min-w-[140px]">
                                <span className="text-[9px] font-bold text-[#00ff9d] block mb-1">EVENT_DETECTION</span>
                                <span className="text-xs font-mono block">QUANTUM_LEAP_01</span>
                                <div className="mt-2 text-[10px] font-mono text-slate-400 flex justify-between border-t border-white/5 pt-1">
                                    <span>VAL: 84.2</span>
                                    <span>±0.02</span>
                                </div>
                            </div>
                            <div className="w-1.5 h-16 bg-gradient-to-t from-[#00ff9d]/40 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Central Timeline */}
                <div className="h-32 w-full relative flex items-center bg-black/40 border-y border-white/5">
                    <div className="absolute top-1/2 left-0 w-[10000px] h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_15px_rgba(0,242,255,0.3)]"></div>

                    {/* Cursor/Scanning Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#ff4d4d] shadow-[0_0_10px_#ff4d4d] z-30"></div>
                    <div className="absolute left-1/2 top-0 -ml-8 -mt-6 bg-[#ff4d4d] text-white text-[9px] px-2 py-1 rounded font-mono font-bold uppercase tracking-widest shadow-lg shadow-[#ff4d4d]/20">LIVE_CURSOR</div>

                    <div className="absolute left-[calc(50%+200px)] z-20 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-[#00d4ff] flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                            <span className="material-symbols-outlined text-[#00d4ff]">analytics</span>
                        </div>
                        <div className="mt-4 bg-[#00d4ff] text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold">FOCUS_NODE_88</div>
                    </div>
                </div>

                {/* Lower Lane */}
                <div className="flex-1 w-full relative flex items-center overflow-hidden">
                    <div className="absolute bottom-4 left-6 z-10">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Logs.Stream_Gamma</span>
                    </div>
                    <div className="flex items-center space-x-48 px-[50vw]">
                        <div className="flex flex-col items-start bg-[#0d1117]/85 backdrop-blur-md p-2 rounded-sm border-l-2 border-slate-700 min-w-[200px]">
                            <div className="flex justify-between w-full mb-1">
                                <span className="text-[8px] font-mono text-slate-500 uppercase">Timestamp: 21:04:11</span>
                                <span className="text-[8px] font-mono text-[#00d4ff]">ID: #C99</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-300">Packet inspection completed. No anomalies found in sub-sector 4.</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Controls */}
            <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4">
                <div className="bg-[#0d1117]/85 backdrop-blur-md px-4 py-2 rounded-lg flex items-center space-x-4 border border-white/10 shadow-2xl">
                    <button className="text-slate-500 hover:text-[#00d4ff] transition-colors"><span className="material-symbols-outlined">first_page</span></button>
                    <button className="text-slate-300 hover:text-[#00d4ff]"><span className="material-symbols-outlined">play_arrow</span></button>
                    <button className="text-slate-500 hover:text-[#00d4ff]"><span className="material-symbols-outlined">last_page</span></button>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase font-bold">Playback Speed</span>
                        <span className="text-xs font-mono text-[#00d4ff]">0.25x (REALTIME)</span>
                    </div>
                </div>
                <div className="bg-[#0d1117]/85 backdrop-blur-md px-6 py-2 rounded-full flex items-center space-x-6 border border-white/10 shadow-2xl">
                    <button className="text-slate-400 hover:text-[#00ff9d] transition-colors"><span className="material-symbols-outlined text-xl">search</span></button>
                    <button className="text-slate-400 hover:text-[#00ff9d] transition-colors"><span className="material-symbols-outlined text-xl">add_chart</span></button>
                    <button className="text-[#00d4ff]"><span className="material-symbols-outlined text-xl fill-current">dashboard</span></button>
                    <button className="text-slate-400 hover:text-[#00ff9d] transition-colors"><span className="material-symbols-outlined text-xl">database</span></button>
                </div>
            </nav>
        </div>
    );
};
