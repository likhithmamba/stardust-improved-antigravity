import React, { useEffect } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { useStore } from '../store/useStore';
import { SettingsPanel } from './SettingsPanel';
import type { ViewMode } from '../constants';

// ─── Stitch-Inspired Unified UI Shell ────────────────────────────────

const MODES: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'void', label: 'Void', icon: 'blur_on' },
    { id: 'matrix', label: 'Matrix', icon: 'grid_view' },
    { id: 'prism', label: 'Prism', icon: 'view_column' },
    { id: 'orbital', label: 'Orbital', icon: 'bubble_chart' },
    { id: 'timeline', label: 'Timeline', icon: 'timeline' },
];

// Stitch color palette
const PALETTE = {
    solar: {
        bg: 'bg-white/60',
        border: 'border-slate-200/40',
        text: 'text-slate-600',
        textMute: 'text-slate-400',
        hover: 'hover:bg-slate-100/80',
        active: 'bg-slate-900 text-white shadow-lg',
        accent: '#6366f1',
        glow: 'shadow-[0_8px_32px_rgba(99,102,241,0.1)]',
        create: 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_4px_24px_rgba(99,102,241,0.4)]',
    },
    'zero-point': {
        bg: 'bg-[#111121]/70',
        border: 'border-[#9393c8]/10',
        text: 'text-[#9393c8]',
        textMute: 'text-[#9393c8]/40',
        hover: 'hover:bg-white/5',
        active: 'bg-[#1919e6]/20 text-[#1919e6] border border-[#1919e6]/30',
        accent: '#1919e6',
        glow: 'shadow-[0_8px_32px_rgba(25,25,230,0.15)]',
        create: 'bg-[#1919e6] text-white shadow-[0_0_24px_rgba(25,25,230,0.5)]',
    },
};

export const AppShell: React.FC = () => {
    const viewMode = useSettingsStore((s) => s.viewMode);
    const setViewMode = useSettingsStore((s) => s.setViewMode);
    const designSystem = useSettingsStore((s) => s.designSystem);
    const setDesignSystem = useSettingsStore((s) => s.setDesignSystem);
    const isSettingsOpen = useStore((s) => s.isSettingsOpen);
    const setSettingsOpen = useStore((s) => s.setSettingsOpen);
    const isSearchOpen = useStore((s) => s.isSearchOpen);
    const setSearchOpen = useStore((s) => s.setSearchOpen);

    const isSolar = designSystem === 'solar';
    const p = PALETTE[designSystem] || PALETTE['zero-point'];

    // Wire designSystem to html element
    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('solar', 'zero-point', 'dark');
        html.classList.add(designSystem);
        if (designSystem === 'zero-point') html.classList.add('dark');
        html.setAttribute('data-mode', viewMode);
    }, [designSystem, viewMode]);

    const handleCreate = () => {
        window.dispatchEvent(new CustomEvent('stardust:openSphericalMenu', {
            detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        }));
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-50">

            {/* ═══════════════════════════════════════════════════
                TOP BAR — Glass header with hover reveal
            ═══════════════════════════════════════════════════ */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'circOut' }}
                className={clsx(
                    'absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-between',
                    'w-[min(720px,92vw)] px-5 py-2.5 rounded-full pointer-events-auto',
                    'backdrop-blur-xl transition-all duration-500',
                    p.bg, p.border, 'border', p.glow
                )}
            >
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        isSolar
                            ? 'bg-slate-900 text-white'
                            : 'bg-[#1919e6] text-white'
                    )}>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>hub</span>
                    </div>
                    <div className="flex flex-col">
                        <span className={clsx(
                            'text-[11px] font-bold tracking-[0.25em] uppercase leading-none',
                            isSolar ? 'text-slate-800' : 'text-white'
                        )}>
                            STARDUST
                        </span>
                        <span className={clsx(
                            'text-[9px] tracking-[0.15em] uppercase leading-none mt-0.5',
                            p.textMute
                        )}>
                            {viewMode === 'free' ? 'FREE CANVAS' : viewMode.toUpperCase() + ' MODE'}
                        </span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1">
                    {/* Search */}
                    <button
                        onClick={() => setSearchOpen(!isSearchOpen)}
                        className={clsx(
                            'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                            p.textMute, p.hover
                        )}
                        title="Search (Ctrl+K)"
                    >
                        <span className="material-symbols-outlined text-[18px]">search</span>
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={() => setDesignSystem(isSolar ? 'zero-point' : 'solar')}
                        className={clsx(
                            'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                            p.textMute, p.hover
                        )}
                        title="Toggle Theme"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isSolar ? 'dark_mode' : 'light_mode'}
                        </span>
                    </button>

                    {/* Settings */}
                    <button
                        onClick={() => setSettingsOpen(!isSettingsOpen)}
                        className={clsx(
                            'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                            p.textMute, p.hover
                        )}
                        title="Settings (Ctrl+,)"
                    >
                        <span className="material-symbols-outlined text-[18px]">settings</span>
                    </button>
                </div>
            </motion.header>

            {/* ═══════════════════════════════════════════════════
                BOTTOM NAV — Stitch-style glass dock
            ═══════════════════════════════════════════════════ */}
            <motion.nav
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'circOut' }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto"
            >
                <div className={clsx(
                    'flex items-center gap-0.5 p-1.5 rounded-2xl backdrop-blur-xl border transition-all duration-500',
                    p.bg, p.border, p.glow
                )}>
                    {/* Mode buttons */}
                    {MODES.map((mode) => {
                        const isActive = viewMode === mode.id;
                        return (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id)}
                                className={clsx(
                                    'relative flex flex-col items-center justify-center w-[52px] h-[44px] rounded-xl transition-all duration-300 group',
                                    isActive
                                        ? p.active
                                        : clsx(p.textMute, p.hover, 'hover:' + (isSolar ? 'text-slate-700' : 'text-white'))
                                )}
                                title={`${mode.label} (${MODES.indexOf(mode) + 1})`}
                            >
                                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110">
                                    {mode.icon}
                                </span>
                                <span className="text-[7px] font-semibold uppercase tracking-[0.08em] mt-0.5 leading-none">
                                    {mode.label}
                                </span>
                                {/* Active indicator dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-mode-indicator"
                                        className={clsx(
                                            'absolute -bottom-0.5 w-1 h-1 rounded-full',
                                            isSolar ? 'bg-slate-900' : 'bg-[#1919e6]'
                                        )}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}

                    {/* Divider */}
                    <div className={clsx(
                        'w-px h-7 mx-1.5',
                        isSolar ? 'bg-slate-200' : 'bg-[#242447]'
                    )} />

                    {/* Create button */}
                    <motion.button
                        onClick={handleCreate}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                            'w-11 h-11 rounded-xl flex items-center justify-center transition-all',
                            p.create
                        )}
                        title="Create Note (Double-click on canvas)"
                    >
                        <span className="material-symbols-outlined text-xl">add</span>
                    </motion.button>
                </div>
            </motion.nav>

            {/* ═══════════════════════════════════════════════════
                MODE BADGE — Ambient breathing label (Stitch void style)
            ═══════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={viewMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                    <p className={clsx(
                        'text-[10px] tracking-[0.3em] uppercase font-light select-none',
                        isSolar ? 'text-slate-300' : 'text-[#9393c8]/30'
                    )}
                        style={{ animation: 'slowBreath 8s ease-in-out infinite' }}
                    >
                        {viewMode === 'void' && 'Nothing is required of you'}
                        {viewMode === 'matrix' && 'Structured thought grid active'}
                        {viewMode === 'prism' && 'Multi-lens refraction'}
                        {viewMode === 'orbital' && 'Gravitational priority flows'}
                        {viewMode === 'timeline' && 'Temporal drift: nominal'}
                        {viewMode === 'free' && 'Infinite canvas'}
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Settings Panel */}
            <SettingsPanel />
        </div>
    );
};
