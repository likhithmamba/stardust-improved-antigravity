import React from 'react';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { AnimatePresence, motion } from 'framer-motion';

import { VoidChrome } from './chrome/VoidChrome';
import { MatrixChrome } from './chrome/MatrixChrome';
import { OrbitalChrome } from './chrome/OrbitalChrome';
import { TimelineChrome } from './chrome/TimelineChrome';
import { PrismChrome } from './chrome/PrismChrome';

export const DashboardOverlay: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const viewMode = useSettingsStore((state) => state.viewMode);

    // Theme-based base classes
    const themeClass = designSystem === 'solar'
        ? 'text-slate-800'
        : 'text-white/90';

    return (
        <div className={`absolute inset-0 pointer-events-none z-40 ${themeClass}`}>
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
