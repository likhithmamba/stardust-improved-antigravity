import React from 'react';
import { motion } from 'framer-motion';

export const VoidZeroPoint: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#050510] overflow-hidden font-display text-white selection:bg-[#1919e6]/30">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            radial-gradient(1px 1px at 10% 20%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 30% 50%, #ffffff 80%, transparent),
                            radial-gradient(2px 2px at 50% 10%, #ffffff 90%, transparent),
                            radial-gradient(1px 1px at 70% 80%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 90% 40%, #ffffff 70%, transparent),
                            radial-gradient(1.5px 1.5px at 25% 75%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 85% 15%, #ffffff 80%, transparent)
                        `,
                        backgroundSize: '400px 400px'
                    }}
                />
                <div className="absolute top-[20%] left-[30%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(25,25,230,0.08)_0%,rgba(25,25,230,0)_70%)] blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-[70%] left-[80%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(25,25,230,0.08)_0%,rgba(25,25,230,0)_70%)] blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                <div className="flex flex-col items-center max-w-[960px]">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white tracking-[0.2em] text-[24px] md:text-[32px] font-light leading-tight px-4 text-center select-none italic"
                    >
                        Nothing is required of you.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.2, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-[#9393c8] text-sm font-normal leading-normal pb-3 pt-6 px-4 text-center tracking-widest uppercase select-none font-sans-alt"
                    >
                        Scroll to explore the cosmos
                    </motion.p>
                </div>
            </main>

            {/* Top Bar (Header) */}
            <div className="fixed top-0 left-0 right-0 h-20 flex justify-center items-start pt-4 z-50 pointer-events-none hover:pointer-events-auto group">
                <header className="flex items-center justify-between w-full max-w-4xl px-6 py-2 rounded-full border border-white/5 backdrop-blur-md bg-[#111122]/40 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-5 text-[#1919e6]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-white text-sm font-bold leading-tight tracking-[0.2em] uppercase font-sans-alt">VOID</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#242447]/50 text-white hover:bg-[#1919e6]/20 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                        </button>
                        <button className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#242447]/50 text-white hover:bg-[#1919e6]/20 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                        </button>
                    </div>
                </header>
            </div>

            {/* Visual Artifacts */}
            <div className="fixed top-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-20 shadow-[0_0_10px_white]" />
            <div className="fixed bottom-1/3 left-1/5 w-1 h-1 bg-[#1919e6] rounded-full opacity-30 shadow-[0_0_15px_#1919e6]" />
        </div>
    );
};
