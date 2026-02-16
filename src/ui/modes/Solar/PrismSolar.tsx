import React from 'react';

export const PrismSolar: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#f5f5f7] overflow-hidden font-inter text-zinc-900 flex flex-col">
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
                    <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-white transition-all">
                        <span className="material-symbols-outlined text-zinc-600">settings_brightness</span>
                    </button>
                </div>
            </header>

            {/* Main Content - Gravity Wells */}
            <main className="h-full w-full flex px-8 pt-32 pb-24 gap-6 relative">
                {/* Mercury */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-4 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Mercury</span>
                        <div className="h-px w-8 bg-zinc-200 mx-auto mt-2"></div>
                    </div>
                    <div className="w-full flex-1 rounded-2xl border border-dashed border-zinc-200 bg-gradient-to-b from-transparent to-white/40 p-4 flex flex-col gap-6 items-center">
                        <div className="w-48 h-48 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[inset_0_0_20px_rgba(255,255,255,0.5),0_10px_30px_rgba(0,0,0,0.03)] box-shadow-[0_0_30px_10px_rgba(99,102,241,0.1)] relative flex items-center justify-center p-6 group cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-center">
                                <span className="text-[8px] uppercase tracking-widest text-zinc-500 mb-1 block">Flash Insight</span>
                                <p className="text-xs font-medium leading-tight text-zinc-800">Initial project scope for Q4</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-[10px]">push_pin</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Venus */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-4 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Venus</span>
                        <div className="h-px w-8 bg-zinc-200 mx-auto mt-2"></div>
                    </div>
                    <div className="w-full flex-1 rounded-2xl border border-dashed border-zinc-200 bg-gradient-to-b from-transparent to-white/40 p-4 flex flex-col gap-6 items-center">
                        <div className="w-56 h-56 rounded-full bg-white/40 backdrop-blur-md border border-orange-100 shadow-[inset_0_0_20px_rgba(255,255,255,0.5),0_10px_30px_rgba(0,0,0,0.03)] relative flex items-center justify-center p-8 group cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-center">
                                <span className="text-[8px] uppercase tracking-widest text-orange-400 mb-1 block">Atmosphere</span>
                                <p className="text-sm font-medium leading-tight text-zinc-800 italic">"The user interface must breathe like vacuum."</p>
                            </div>
                        </div>
                        <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-md border border-white/60 cursor-pointer flex items-center justify-center p-4 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-zinc-300 text-3xl">add</span>
                        </div>
                    </div>
                </div>

                {/* Earth */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-4 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Earth</span>
                        <div className="h-px w-8 bg-zinc-200 mx-auto mt-2"></div>
                    </div>
                    <div className="w-full flex-1 rounded-2xl border border-dashed border-zinc-200 bg-gradient-to-b from-transparent to-white/40 p-4 flex flex-col gap-6 items-center">
                        <div className="w-64 h-64 rounded-full bg-white/40 backdrop-blur-md border border-blue-100 shadow-[inset_0_0_20px_rgba(255,255,255,0.5),0_10px_30px_rgba(0,0,0,0.03)] relative flex items-center justify-center p-10 group cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-center">
                                <span className="text-[8px] uppercase tracking-widest text-blue-500 mb-1 block">Primary Goal</span>
                                <p className="text-lg font-display font-light text-zinc-800">Product Launch Ecosystem</p>
                                <div className="mt-4 flex justify-center space-x-1">
                                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                    <div className="w-1 h-1 rounded-full bg-blue-200"></div>
                                    <div className="w-1 h-1 rounded-full bg-blue-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mars */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-4 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Mars</span>
                        <div className="h-px w-8 bg-zinc-200 mx-auto mt-2"></div>
                    </div>
                    <div className="w-full flex-1 rounded-2xl border border-dashed border-zinc-200 bg-gradient-to-b from-transparent to-white/40 p-4 flex flex-col gap-6 items-center">
                        <div className="w-44 h-44 rounded-full bg-white/40 backdrop-blur-md border border-red-50 shadow-[inset_0_0_20px_rgba(255,255,255,0.5),0_10px_30px_rgba(0,0,0,0.03)] relative flex items-center justify-center p-6 group cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-center">
                                <span className="text-[8px] uppercase tracking-widest text-red-400 mb-1 block">Risk Factor</span>
                                <p className="text-xs font-medium leading-tight text-zinc-800 uppercase tracking-tighter">Thermal Exhaust Defect</p>
                            </div>
                        </div>
                        <div className="w-40 h-40 rounded-full bg-white/40 backdrop-blur-md border border-zinc-100 relative flex items-center justify-center p-6 group cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-center">
                                <span className="text-[8px] uppercase tracking-widest text-zinc-400 mb-1 block">Resource</span>
                                <p className="text-xs font-medium leading-tight text-zinc-800">Budgetary Constraints Phase 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Trash Singularity */}
            <div className="absolute bottom-10 right-10 group cursor-pointer z-50">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(10,10,12,0.2)_0%,rgba(10,10,12,0.05)_50%,transparent_70%)]" />
                    <div className="w-8 h-8 rounded-full bg-black shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-white text-lg">delete_forever</span>
                    </div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold tracking-widest text-zinc-400 uppercase whitespace-nowrap">Void Trash</span>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
                <nav className="bg-white/80 backdrop-blur-xl px-8 py-3 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-200 flex items-center space-x-8">
                    <button className="flex flex-col items-center group">
                        <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900 transition-colors">grid_view</span>
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-1">Matrix</span>
                    </button>
                    <button className="flex flex-col items-center group">
                        <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900 transition-colors">hub</span>
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-1">Void</span>
                    </button>
                    <div className="w-px h-6 bg-zinc-200" />
                    <button className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <div className="w-px h-6 bg-zinc-200" />
                    <button className="flex flex-col items-center group">
                        <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900 transition-colors">auto_awesome_motion</span>
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-1">Archive</span>
                    </button>
                </nav>
            </div>

            {/* Background Grid Lines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-[10%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                <div className="absolute top-[20%] left-[36.6%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                <div className="absolute top-[20%] left-[63.3%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
                <div className="absolute top-[20%] left-[90%] w-px h-[60%] bg-gradient-to-b from-transparent via-zinc-400 to-transparent"></div>
            </div>
        </div>
    );
};
