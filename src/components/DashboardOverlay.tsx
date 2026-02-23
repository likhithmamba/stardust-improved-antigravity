import React, { useEffect } from 'react';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { AnimatePresence, motion } from 'framer-motion';

import { VoidChrome } from './chrome/VoidChrome';
import { MatrixChrome } from './chrome/MatrixChrome';
import { OrbitalChrome } from './chrome/OrbitalChrome';
import { TimelineChrome } from './chrome/TimelineChrome';
import { PrismChrome } from './chrome/PrismChrome';

// D5: Mode names per design system
const MODE_NAMES: Record<string, Record<string, string>> = {
    solar: {
        void: 'VOID — Thought Web',
        matrix: 'HORIZON — Priority Board',
        prism: 'MATRIX — Stellar Grid',
        orbital: 'STARDUST — Minimalist Orbit',
        timeline: 'CHRONOS — Analytics Stream',
        free: 'FREE — Open Canvas',
    },
    'zero-point': {
        void: 'VOID — Zero-Point Canvas',
        matrix: 'HORIZON — Belt Strategy',
        prism: 'MATRIX — Inner Orbit',
        orbital: 'ORBITAL — Event Horizon',
        timeline: 'TIMELINE — Temporal Star Stream',
        free: 'FREE — Deep Space',
    },
};

// D7: Ambient status text per mode × design system
const AMBIENT_TEXT: Record<string, Record<string, string>> = {
    solar: {
        void: 'CAPTURE · zero friction',
        matrix: 'PRIORITY GRID · drag to decide',
        prism: 'COLUMN FLOW · size ≈ weight',
        orbital: 'CORE FOCUS · proximity = priority',
        timeline: 'STABLE // 0.042ms LATENCY',
    },
    'zero-point': {
        void: 'Nothing is required of you.',
        matrix: 'Scanning Sector: CERES-7 · Gravity: 0.27G',
        prism: 'Gravitational columns active.',
        orbital: 'Priority flows toward the center.',
        timeline: 'Temporal drift: nominal.',
    },
};

export const DashboardOverlay: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const viewMode = useSettingsStore((state) => state.viewMode);

    // D1: Wire designSystem to html class and data-mode attribute
    useEffect(() => {
        const html = document.documentElement;
        // Remove old design system classes
        html.classList.remove('solar', 'zero-point', 'dark');
        // Apply new design system class
        html.classList.add(designSystem);
        // For Zero-Point, also add 'dark' for Tailwind compatibility
        if (designSystem === 'zero-point') {
            html.classList.add('dark');
        }
        // Set data-mode for per-mode CSS variable overrides
        html.setAttribute('data-mode', viewMode);
    }, [designSystem, viewMode]);

    // Theme-based base classes
    const themeClass = designSystem === 'solar'
        ? 'text-slate-800'
        : 'text-white/90';

    const modeName = MODE_NAMES[designSystem]?.[viewMode] ?? viewMode.toUpperCase();
    const ambientText = AMBIENT_TEXT[designSystem]?.[viewMode] ?? '';

    return (
        <div className={`absolute inset-0 pointer-events-none z-40 ${themeClass}`}>
            {/* D5: Mode Name Label */}
            <div className="absolute top-6 left-8 z-50">
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40"
                    style={{ fontFamily: 'var(--mode-font, inherit)' }}>
                    {modeName}
                </div>
            </div>

            {/* D7: Ambient Status Text */}
            {ambientText && (
                <div className="absolute bottom-8 right-8 z-50">
                    <div className="text-[10px] font-mono tracking-widest opacity-25"
                        style={{ fontFamily: 'var(--mode-font, inherit)' }}>
                        {ambientText}
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {viewMode === 'void' && (
                    <motion.div
                        key="void-chrome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <VoidChrome />
                    </motion.div>
                )}

                {viewMode === 'matrix' && (
                    <motion.div
                        key="matrix-chrome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <MatrixChrome />
                    </motion.div>
                )}

                {viewMode === 'orbital' && (
                    <motion.div
                        key="orbital-chrome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <OrbitalChrome />
                    </motion.div>
                )}

                {viewMode === 'timeline' && (
                    <motion.div
                        key="timeline-chrome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <TimelineChrome />
                    </motion.div>
                )}

                {viewMode === 'prism' && (
                    <motion.div
                        key="prism-chrome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <PrismChrome />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
