import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanvasViewport } from '../../components/CanvasViewport';

export const ModeManager: React.FC = () => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="unified-viewport"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full h-full"
            >
                <CanvasViewport />
            </motion.div>
        </AnimatePresence>
    );
};
