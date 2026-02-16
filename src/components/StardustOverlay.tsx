import React from 'react';
import { useSettingsStore } from '../ui/settings/settingsStore';
import clsx from 'clsx';


export const StardustOverlay: React.FC = () => {
    const viewMode = useSettingsStore((state) => state.viewMode);
    const setViewMode = useSettingsStore((state) => state.setViewMode);
    const designSystem = useSettingsStore((state) => state.designSystem);
    const setDesignSystem = useSettingsStore((state) => state.setDesignSystem);

    const toggleSystem = () => {
        setDesignSystem(designSystem === 'zero-point' ? 'solar' : 'zero-point');
    };



    return (
        <>
            {/* HEADER REMOVED: Using PersistentLogo (Variant 2) instead */}

            {/* SIDEBAR (Gravity Well) - Visual Only for now */}
            <aside className="fixed left-8 top-1/2 -translate-y-1/2 glass-panel p-6 rounded-[2.5rem] w-24 h-[440px] flex flex-col items-center justify-between z-50 transition-colors">
                <span className="mono text-[10px] text-zinc-400 [writing-mode:vertical-lr] rotate-180 uppercase tracking-[0.3em]">Gravity Well</span>
                <div className="flex flex-col items-center gap-4 flex-grow py-8 h-full w-full">
                    <span className="mono text-[8px] text-zinc-400 uppercase text-center leading-tight">Max<br />Mass</span>
                    <div className="priority-slider-track">
                        <div className="priority-slider-fill" style={{ height: '40%' }}></div>
                        <div className="priority-slider-thumb" style={{ bottom: '40%' }}></div>
                    </div>
                    <span className="mono text-[8px] text-zinc-400 uppercase text-center leading-tight">Zero<br />G</span>
                </div>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                    <span className="material-symbols-outlined">expand_more</span>
                </button>
            </aside>

            {/* DECORATIVE RIGHT PANEL */}
            <aside className="fixed top-24 right-8 glass-panel p-3 rounded-2xl w-48 h-32 z-50 overflow-hidden hidden md:block">
                <div className="relative w-full h-full bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center border border-zinc-100/50 dark:border-zinc-800/50">
                    <div className="absolute w-20 h-20 border border-zinc-300 dark:border-zinc-600 rounded-full opacity-30"></div>
                    <div className="absolute w-12 h-12 border border-zinc-300 dark:border-zinc-600 rounded-full opacity-30"></div>
                    <div className="absolute w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                    <div className="absolute w-2 h-2 bg-orange-400 rounded-full blur-[1px]" style={{ top: '30%', right: '35%' }}></div>
                    <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse blur-[1px]" style={{ bottom: '25%', left: '40%' }}></div>
                </div>
            </aside>

            {/* BOTTOM NAV */}
            <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-panel px-4 py-3 rounded-full flex items-center gap-1 z-50 shadow-sm transition-all text-zinc-500 dark:text-zinc-400">
                <button
                    onClick={() => setViewMode('matrix')}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        viewMode === 'matrix' && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    )}
                    title="Matrix"
                >
                    <span className="material-symbols-outlined group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">grid_view</span>
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">Matrix</span>
                </button>

                <button
                    onClick={() => setViewMode('free')}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        (viewMode === 'free' || viewMode === 'void') && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    )}
                    title="Void (Free)"
                >
                    <span className="material-symbols-outlined group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">check_box_outline_blank</span>
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">Void</span>
                </button>

                <button
                    onClick={() => setViewMode('orbital')}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        viewMode === 'orbital' && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    )}
                    title="Orbital"
                >
                    <span className="material-symbols-outlined group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">bubble_chart</span>
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">Orbital</span>
                </button>

                <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-700 mx-2"></div>

                <button
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('stardust:openSphericalMenu', { detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 } }));
                    }}
                    className="w-14 h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all mx-2 hover:shadow-xl group"
                >
                    <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
                </button>

                <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-700 mx-2"></div>

                <button
                    onClick={() => setViewMode('prism')}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        viewMode === 'prism' && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    )}
                    title="Prism"
                >
                    <span className="material-symbols-outlined group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">view_column</span>
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">Prism</span>
                </button>

                <button
                    onClick={() => setViewMode('timeline')}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        viewMode === 'timeline' && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    )}
                    title="Timeline"
                >
                    <span className="material-symbols-outlined group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">timeline</span>
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">Time</span>
                </button>

                <button
                    onClick={() => setViewMode('archive')}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        viewMode === 'archive' && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    )}
                    title="Archive"
                >
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">Arch</span>
                </button>

                <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-700 mx-2"></div>

                <button
                    onClick={toggleSystem}
                    className={clsx(
                        "flex flex-col items-center justify-center w-16 h-12 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group",
                        designSystem === 'solar' && "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100"
                    )}
                    title={`Switch System (${designSystem === 'zero-point' ? 'Solar' : 'Zero-Point'})`}
                >
                    <span className="material-symbols-outlined group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                        {designSystem === 'zero-point' ? 'wb_sunny' : 'dark_mode'}
                    </span>
                    <span className="mono text-[8px] uppercase tracking-tighter mt-0.5">
                        {designSystem === 'zero-point' ? 'Solar' : 'Deep'}
                    </span>
                </button>
            </nav>

            {/* SINGULARITY BUTTON */}
            <div className="fixed bottom-10 right-10 group z-50">
                <button className="singularity-btn w-14 h-14 text-white">
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
                </button>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 mono text-[9px] text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Singularity</span>
            </div>
        </>
    );
};
