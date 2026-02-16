import React from 'react';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { AnimatePresence, motion } from 'framer-motion';

export const DashboardBackground: React.FC = () => {
    const designSystem = useSettingsStore((state) => state.designSystem);
    const viewMode = useSettingsStore((state) => state.viewMode);
    const isSolar = designSystem === 'solar';

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <AnimatePresence mode="wait">
                {/* VOID BACKGROUNDS */}
                {viewMode === 'void' && (
                    <motion.div
                        key="void-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {isSolar ? (
                            // Solar Void Background
                            <div className="w-full h-full bg-white">
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
                                {/* Detail Lines */}
                                <div className="absolute h-px bg-gradient-to-r from-slate-200 to-transparent w-40 top-1/3 left-1/4 -rotate-12 origin-left" />
                            </div>
                        ) : (
                            // ZeroPoint Void Background
                            <div className="w-full h-full bg-[#050510]">
                                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 20px, #ffffff 100%, transparent)', backgroundSize: '400px 400px' }} />
                                <div className="absolute top-[20%] left-[30%] w-[800px] h-[800px] bg-blue-900/10 blur-[80px] rounded-full" />
                            </div>
                        )}
                    </motion.div>
                )}

                {/* MATRIX BACKGROUNDS */}
                {viewMode === 'matrix' && (
                    <motion.div
                        key="matrix-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {isSolar ? (
                            <div className="w-full h-full bg-[#221910]">
                                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#f27f0d]/10 to-transparent opacity-40" />
                                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-[400px] rounded-[100%] border-t border-[#f27f0d]/20 bg-[#221910]/80 blur-xl" />
                            </div>
                        ) : (
                            <div className="w-full h-full bg-[#05050a]">
                                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0))', backgroundSize: '100px 100px' }} />
                                <div className="absolute bottom-[-20%] left-0 w-full h-[60%] blur-[60px] bg-blue-600/10" />
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ORBITAL BACKGROUNDS */}
                {viewMode === 'orbital' && (
                    <motion.div
                        key="orbital-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {isSolar ? (
                            <div className="w-full h-full bg-white flex items-center justify-center">
                                {/* Rings */}
                                <div className="absolute w-[800px] h-[800px] border border-blue-500/10 rounded-full" />
                                <div className="absolute w-[600px] h-[600px] border border-blue-500/10 rounded-full" />
                                <div className="absolute w-[400px] h-[400px] border border-blue-500/10 rounded-full" />
                                {/* Core */}
                                <div className="absolute w-40 h-40 bg-zinc-50 border border-zinc-100 rounded-full shadow-lg opacity-50 blur-xl" />
                            </div>
                        ) : (
                            <div className="w-full h-full bg-[#020205] flex items-center justify-center">
                                {/* Star Field */}
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(1px 1px at 50% 50%, white, transparent)', backgroundSize: '250px 250px' }} />
                                {/* Black Hole System Visuals */}
                                <div className="absolute w-[500px] h-[500px] border border-indigo-500/10 rounded-full" />
                                <div className="absolute w-[800px] h-[800px] border border-indigo-500/5 rounded-full" />
                                {/* Accretion Disk Blur */}
                                <div className="absolute w-[300px] h-[100px] bg-orange-400/20 blur-[40px] rounded-full rotate-12" />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
