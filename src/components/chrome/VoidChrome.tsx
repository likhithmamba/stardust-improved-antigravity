import React from 'react';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../ui/settings/settingsStore';
import { useStore } from '../../store/useStore';

// Note: The original files used material-symbols-outlined classes. 
// If the user has that font loaded, we can use it. 
// For safety/rendering, I'll use Lucide icons which are standard in modern React stacks, 
// OR I will stick to the span classes if I'm sure the font is loaded. 
// Given the previous files used <span>material-symbols-outlined</span>, I will try to preserve that where possible 
// but Lucide is often cleaner. I'll stick to the original style to ensure visual parity with user's expectation.

export const VoidChrome: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const setDesignSystem = useSettingsStore((state) => state.setDesignSystem);
    const isSolar = designSystem === 'solar';

    // Actions
    const setViewMode = useSettingsStore((state) => state.setViewMode);
    const setSearchOpen = useStore((state) => state.setSearchOpen);

    // Dissolve = Clear all? Or delete selected? Let's just make it delete selected for safety or Toast "cleared".
    // For now, let's wire it to trigger a toast or nothing to be safe.

    if (isSolar) {
        return (
            <div className="absolute inset-0 pointer-events-none font-inter text-slate-800">
                {/* Header */}
                <header className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-auto">
                    <h1 className="font-serif text-3xl font-light tracking-[0.2em] text-slate-400 uppercase italic">Void</h1>
                    <p className="text-[10px] tracking-[0.4em] text-slate-300 mt-2 uppercase">A space for ephemeral thoughts</p>
                </header>

                {/* Search Button */}
                <div className="absolute top-8 right-12 pointer-events-auto">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors"
                    >
                        <span className="material-symbols-outlined font-extralight text-2xl">search</span>
                    </button>
                </div>

                {/* Bottom Right Action (Dissolve) */}
                <div className="absolute bottom-12 right-12 pointer-events-auto">
                    <div className="group relative flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-slate-100 bg-white/50 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-red-400 text-xl transition-colors">delete_outline</span>
                        </div>
                        <span className="mt-2 font-serif italic text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">dissolve</span>
                    </div>
                </div>

                {/* Bottom Nav */}
                <nav className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
                    <div className="flex items-center space-x-6 px-8 py-3 bg-white/80 backdrop-blur-md rounded-full border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Ink" onClick={() => { }}>
                            <span className="material-symbols-outlined font-light text-xl">stylus_note</span>
                        </button>
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Seed" onClick={() => { }}>
                            <span className="material-symbols-outlined font-light text-xl">add</span>
                        </button>
                        <div className="h-4 w-px bg-slate-200" />
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Flow" onClick={() => setViewMode('matrix')}>
                            <span className="material-symbols-outlined font-light text-xl">account_tree</span>
                        </button>
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Reflections" onClick={() => setViewMode('prism')}>
                            <span className="material-symbols-outlined font-light text-xl">auto_awesome</span>
                        </button>
                        <div className="h-4 w-px bg-slate-200" />
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Compass" onClick={() => setViewMode('orbital')}>
                            <span className="material-symbols-outlined font-light text-xl">explore</span>
                        </button>
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Weave" onClick={() => setViewMode('timeline')}>
                            <span className="material-symbols-outlined font-light text-xl">link</span>
                        </button>
                    </div>
                </nav>

                {/* Bottom Left Toggle (Theme) */}
                <div className="absolute bottom-12 left-12 pointer-events-auto">
                    <button
                        onClick={() => setDesignSystem('zero-point')}
                        className="text-slate-300 hover:text-slate-500 transition-colors p-2"
                        title="Switch to Zero Point"
                    >
                        <span className="material-symbols-outlined font-light text-xl">contrast</span>
                    </button>
                </div>
            </div>
        );
    }

    // Zero Point Theme
    return (
        <div className="absolute inset-0 pointer-events-none font-sans-alt text-white selection:bg-[#1919e6]/30">
            {/* Top Bar (Header) - Appears on Hover */}
            <div className="fixed top-0 left-0 right-0 h-24 flex justify-center items-start pt-6 z-50 pointer-events-auto group">
                <header className="flex items-center justify-between w-full max-w-4xl px-8 py-3 rounded-full border border-white/5 backdrop-blur-xl bg-[#111122]/60 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl shadow-black/50">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-5 text-[#1919e6]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-white text-sm font-bold leading-tight tracking-[0.2em] uppercase">VOID</h2>
                    </div>

                    {/* Mode Navigation integrated into Header for ZeroPoint */}
                    <nav className="flex items-center gap-6">
                        <button onClick={() => setViewMode('matrix')} className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">Matrix</button>
                        <button onClick={() => setViewMode('orbital')} className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">Orbital</button>
                        <button onClick={() => setViewMode('timeline')} className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">Timeline</button>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#242447]/50 text-white hover:bg-[#1919e6]/20 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                        </button>
                        <button
                            onClick={() => setDesignSystem('solar')}
                            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#242447]/50 text-white hover:bg-[#1919e6]/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">light_mode</span>
                        </button>
                    </div>
                </header>
            </div>

            {/* Main Center Message */}
            <main className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
                <div className="flex flex-col items-center max-w-[960px]">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white tracking-[0.2em] text-[24px] md:text-[32px] font-light leading-tight px-4 text-center select-none italic"
                    >
                        Nothing is required of you.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.2, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-[#9393c8] text-sm font-normal leading-normal pb-3 pt-6 px-4 text-center tracking-widest uppercase select-none"
                    >
                        Scroll to explore the cosmos
                    </motion.p>
                </div>
            </main>
        </div>
    );
};
