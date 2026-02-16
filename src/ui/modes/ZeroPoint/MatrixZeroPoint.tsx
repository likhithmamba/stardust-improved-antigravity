import React from 'react';

export const MatrixZeroPoint: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#05050a] overflow-hidden font-sans-alt text-white/90 selection:bg-[#3b82f6]/30">
            {/* Star Field & Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 z-[-1]"
                    style={{ background: 'radial-gradient(circle at bottom, #1a1a2e 0%, #05050a 100%)' }}
                />
                <div className="absolute bottom-[-20%] left-0 w-full h-[60%] blur-[60px]"
                    style={{ background: 'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0))',
                        backgroundSize: '100px 100px'
                    }}
                />
                {/* Starlight Grid */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold pointer-events-none">Inner Belt / Alpha</div>
            <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold text-right pointer-events-none">Outer Belt / Beta</div>
            <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold pointer-events-none">Kuiper Fringe / Gamma</div>
            <div className="absolute bottom-8 right-32 text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold text-right pointer-events-none">Oort Terminal / Delta</div>

            {/* Interactive Nodes Container */}
            <div className="relative w-full h-full">
                {/* Asteroid 433 */}
                <div className="absolute top-[15%] left-[12%] w-48 h-40 p-6 flex flex-col justify-center items-center text-center backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-[#3b82f6]/40 hover:scale-105 hover:bg-white/[0.07] transition-all duration-300 cursor-grab rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%] shadow-lg">
                    <span className="text-[10px] uppercase tracking-widest text-[#3b82f6] mb-2">Asteroid 433</span>
                    <p className="text-sm font-medium leading-relaxed">Quarterly resource allocation for project Vesta</p>
                </div>

                {/* Pluto Archives */}
                <div className="absolute top-[20%] right-[18%] w-56 h-56 p-8 flex flex-col justify-center items-center text-center backdrop-blur-xl bg-white/[0.03] border border-white/20 hover:border-[#3b82f6]/40 hover:scale-105 hover:bg-white/[0.07] transition-all duration-300 cursor-grab rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.05)]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent mb-4" />
                    <h3 className="font-display italic text-lg mb-1">Pluto Archives</h3>
                    <p className="text-xs opacity-60">Deep cold storage of legacy mission data</p>
                </div>

                {/* Comet Orb */}
                <div className="absolute bottom-[25%] left-[20%] w-36 h-36 p-5 flex flex-col justify-center items-center text-center backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-[#3b82f6]/40 hover:scale-105 transition-all duration-300 cursor-grab rounded-full">
                    <div className="absolute w-[60px] h-[2px] bg-gradient-to-l from-[#3b82f6]/40 to-transparent right-full top-1/2 blur-[2px]" />
                    <span className="material-symbols-outlined text-[#3b82f6] mb-2 text-[20px]">auto_awesome</span>
                    <p className="text-xs font-bold tracking-tight">FAST-TRACK<br />PROTOCOLS</p>
                </div>

                {/* Eris Node */}
                <div className="absolute bottom-[15%] right-[25%] w-44 h-44 p-6 flex flex-col justify-center items-center text-center backdrop-blur-xl bg-white/[0.03] border border-blue-400/20 hover:border-[#3b82f6]/40 hover:scale-105 transition-all duration-300 cursor-grab rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.05)]">
                    <h3 className="font-display italic text-base mb-2">Eris Node</h3>
                    <p className="text-[11px] leading-snug opacity-70">Disruptive strategy thoughts & chaos mapping</p>
                </div>

                {/* Background Shapes */}
                <div className="absolute top-[45%] left-[45%] w-28 h-24 p-3 flex items-center justify-center text-[10px] text-center opacity-80 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%]">
                    Supply Chain<br />Logistics
                </div>
                <div className="absolute top-[55%] right-[40%] w-32 h-28 p-4 flex items-center justify-center text-[10px] text-center opacity-80 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%]">
                    Interstellar<br />Compliance
                </div>
            </div>

            {/* Top Navigation */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
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
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase opacity-60">
                    Scanning Sector: <span className="text-[#3b82f6]">CERES-7</span>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase opacity-60">
                    Gravity: <span className="text-[#3b82f6]">0.27G</span>
                </div>
            </div>

            {/* Visual Artifacts */}
            <div className="fixed top-1/3 left-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-40 shadow-[0_0_8px_white]" />
            <div className="fixed top-2/3 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-30 shadow-[0_0_10px_#3b82f6]" />
            <div className="fixed top-10 left-10 w-1 h-1 bg-white rounded-full opacity-10" />
        </div>
    );
};
