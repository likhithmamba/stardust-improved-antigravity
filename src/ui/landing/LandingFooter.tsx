import React from 'react';
import { motion } from 'framer-motion';

interface LandingFooterProps {
    onEnterApp?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onEnterApp }) => {
    return (
        <footer className="py-32 bg-black border-t border-white/5 text-center relative overflow-hidden flex flex-col items-center justify-center">
            {/* Ambient Background */}
            <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-2xl px-4"
            >
                <div className="mb-16">
                    <h3 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tighter">
                        Create your universe.
                    </h3>
                    <p className="text-slate-500 text-lg font-light">
                        The canvas is infinite. The physics are real.
                    </p>
                </div>

                <div className="relative group mb-20 inline-block">
                    {/* Button Glow Effects */}
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 group-hover:opacity-100 blur transition-all duration-300 group-hover:blur-md" />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onEnterApp}
                        className="relative z-10 px-16 py-6 bg-white text-black text-xl font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl flex items-center gap-3"
                    >
                        <span>ENTER STARDUST</span>
                        <span className="text-purple-600">→</span>
                    </motion.button>
                </div>

                <div className="flex flex-col items-center gap-6 text-slate-600">
                    <div className="flex gap-8 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Manifesto</a>
                        <a href="#" className="hover:text-white transition-colors">Changelog</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                    <div className="h-px w-12 bg-white/10" />
                    <p className="text-xs font-mono tracking-widest uppercase opacity-50">
                        Stardust Canvas © 2024
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};
