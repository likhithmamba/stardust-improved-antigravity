import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from './utils/sound';
import { ModeManager } from './ui/modes/ModeManager';
import { LandingUltimate } from './pages/LandingUltimate';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
    const [hasEnteredApp, setHasEnteredApp] = useState(false);
    useKeyboardShortcuts();

    const handleEnterApp = () => {
        soundManager.playWarp();
        setHasEnteredApp(true);
    };

    return (
        <AnimatePresence mode="wait">
            {!hasEnteredApp ? (
                <motion.div
                    key="landing"
                    exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    <LandingUltimate onEnterApp={handleEnterApp} />
                </motion.div>
            ) : (
                <motion.div
                    key="canvas"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.0, ease: "circOut" }}
                    className="w-full h-full"
                >
                    <ModeManager />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;
