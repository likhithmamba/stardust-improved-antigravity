import React from 'react';

export const VoidSolar: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-white overflow-hidden font-inter text-slate-800 selection:bg-indigo-100">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

            {/* Header */}
            <header className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-50">
                <h1 className="font-lora text-3xl font-light tracking-[0.2em] text-slate-400 uppercase italic">Void</h1>
                <p className="text-[10px] tracking-[0.4em] text-slate-300 mt-2 uppercase">A space for ephemeral thoughts</p>
            </header>

            {/* Search Button */}
            <div className="absolute top-8 right-12 z-50">
                <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
                    <span className="material-symbols-outlined font-extralight">search</span>
                </button>
            </div>

            {/* Main Canvas Area */}
            <div className="relative w-full h-full">
                {/* Connection Lines */}
                <div className="absolute h-px bg-gradient-to-r from-slate-200 to-transparent w-40 top-1/3 left-1/4 -rotate-12 origin-left pointer-events-none" style={{ backgroundSize: '8px 1px' }} />
                <div className="absolute h-px bg-gradient-to-r from-slate-200 to-transparent w-32 top-[45%] left-[22%] rotate-[70deg] origin-left pointer-events-none" style={{ backgroundSize: '8px 1px' }} />
                <div className="absolute h-px bg-gradient-to-r from-slate-200 to-transparent w-64 top-1/2 left-[60%] rotate-[10deg] origin-left pointer-events-none" style={{ backgroundSize: '8px 1px' }} />

                {/* Nodes - Lavender */}
                <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-[#f5f3ff] border border-[#ddd6fe] shadow-[0_0_8px_rgba(167,139,250,0.3)] cursor-pointer group hover:scale-125 transition-transform">
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-lora italic text-xs text-slate-400 whitespace-nowrap">whispered dreams</span>
                </div>
                <div className="absolute top-[35%] left-[28%] w-2 h-2 rounded-full bg-[#f5f3ff] border border-[#ddd6fe] shadow-[0_0_8px_rgba(167,139,250,0.3)] pointer-events-none" />

                {/* Nodes - Mint */}
                <div className="absolute top-[60%] left-[45%] w-4 h-4 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] shadow-[0_0_8px_rgba(52,211,153,0.3)] cursor-pointer group hover:scale-125 transition-transform">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-lora italic text-xs text-slate-400 whitespace-nowrap">morning dew</span>
                </div>
                <div className="absolute top-[63%] left-[48%] w-2 h-2 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] shadow-[0_0_8px_rgba(52,211,153,0.3)] pointer-events-none" />
                <div className="absolute top-[58%] left-[49%] w-3 h-3 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] shadow-[0_0_8px_rgba(52,211,153,0.3)] pointer-events-none" />
                <div className="absolute top-[65%] left-[44%] w-2 h-2 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] shadow-[0_0_8px_rgba(52,211,153,0.3)] pointer-events-none" />

                {/* Nodes - Peach */}
                <div className="absolute top-[45%] left-[70%] w-6 h-6 rounded-full bg-[#fffaf5] border border-[#fed7aa] shadow-[0_0_8px_rgba(251,146,60,0.3)] cursor-pointer group hover:scale-110 transition-transform flex items-center justify-center">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-100 font-lora italic text-sm text-slate-500 whitespace-nowrap tracking-wide">The Quiet Mind</span>
                </div>
                <div className="absolute top-[75%] left-[20%] w-4 h-4 rounded-full bg-[#fffaf5] border border-[#fed7aa] shadow-[0_0_8px_rgba(251,146,60,0.3)] cursor-pointer group hover:scale-125 transition-transform">
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 opacity-100 font-lora italic text-xs text-slate-400 whitespace-nowrap">entropy</span>
                </div>

                {/* Nodes - Lavender 2 */}
                <div className="absolute top-[20%] left-[60%] w-3 h-3 rounded-full bg-[#f5f3ff] border border-[#ddd6fe] shadow-[0_0_8px_rgba(167,139,250,0.3)] cursor-pointer group hover:scale-125 transition-transform">
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-lora italic text-xs text-slate-400 whitespace-nowrap">stardust logic</span>
                </div>
                <div className="absolute top-[22%] left-[63%] w-2 h-2 rounded-full bg-[#f5f3ff] border border-[#ddd6fe] shadow-[0_0_8px_rgba(167,139,250,0.3)] pointer-events-none" />
            </div>

            {/* Bottom Right Action */}
            <div className="absolute bottom-12 right-12 z-40">
                <div className="group relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-slate-100 bg-white/50 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-slate-200 group-hover:text-slate-400 text-lg transition-colors">delete_outline</span>
                    </div>
                    <span className="mt-2 font-lora italic text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">dissolve</span>
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center space-x-6 px-8 py-3 bg-white/40 backdrop-blur-md rounded-full border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Ink">
                        <span className="material-symbols-outlined font-light text-xl">stylus_note</span>
                    </button>
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Seed">
                        <span className="material-symbols-outlined font-light text-xl">add</span>
                    </button>
                    <div className="h-4 w-px bg-slate-100" />
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Flow">
                        <span className="material-symbols-outlined font-light text-xl">account_tree</span>
                    </button>
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Reflections">
                        <span className="material-symbols-outlined font-light text-xl">auto_awesome</span>
                    </button>
                    <div className="h-4 w-px bg-slate-100" />
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Compass">
                        <span className="material-symbols-outlined font-light text-xl">explore</span>
                    </button>
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Weave">
                        <span className="material-symbols-outlined font-light text-xl">link</span>
                    </button>
                </div>
            </nav>

            {/* Bottom Left Toggle */}
            <div className="absolute bottom-12 left-12">
                <button className="text-slate-300 hover:text-slate-500 transition-colors">
                    <span className="material-symbols-outlined font-light text-xl">contrast</span>
                </button>
            </div>

            {/* Top Left Widget */}
            <div className="absolute top-8 left-8">
                <div className="w-32 h-32 border border-slate-50 rounded-xl bg-white/20 backdrop-blur-[2px] relative overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-24 h-24 border border-dashed border-slate-400 rounded-full" />
                    </div>
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-indigo-200 rounded-full" />
                    <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-emerald-200 rounded-full" />
                    <div className="absolute top-1/2 left-[70%] w-1.5 h-1.5 bg-orange-200 rounded-full" />
                </div>
            </div>
        </div>
    );
};
