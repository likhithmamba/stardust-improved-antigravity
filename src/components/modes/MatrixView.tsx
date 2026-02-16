import React from 'react';

const MATRIX_QUADRANTS = {
    q1: { title: 'Solar Core', subtitle: 'Priority', icon: 'wb_sunny', color: 'text-orange-500' },
    q2: { title: 'Nebula Flow', subtitle: 'Brainstorm', icon: 'filter_drama', color: 'text-purple-400' },
    q3: { title: 'Deep Void', subtitle: 'Storage', icon: 'nights_stay', color: 'text-zinc-400 dark:text-white/40' },
    q4: { title: 'Stellar Events', subtitle: 'Deadlines', icon: 'event_upcoming', color: 'text-orange-500' }
};

export const MatrixOverlay: React.FC = () => {
    const q = MATRIX_QUADRANTS;

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {/* The 4 Quadrants Background Grid */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="starlight-divider w-full h-[1px]"></div>
                <div className="starlight-divider-v h-full w-[1px] absolute"></div>
            </div>

            {/* Quadrant Headers - Positioned absolutely to match the 2x2 grid */}
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full p-8 gap-8">
                {/* Q1: Top-Left */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${q.q1.color}`}>{q.q1.icon}</span>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white/90">{q.q1.title} <span className="text-xs font-normal text-zinc-400 dark:text-white/40 ml-2 uppercase tracking-widest">{q.q1.subtitle}</span></h2>
                    </div>
                </div>

                {/* Q2: Top-Right */}
                <div className="flex flex-col gap-6 items-end text-right">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white/90">{q.q2.title} <span className="text-xs font-normal text-zinc-400 dark:text-white/40 mr-2 uppercase tracking-widest">{q.q2.subtitle}</span></h2>
                        <span className={`material-symbols-outlined ${q.q2.color}`}>{q.q2.icon}</span>
                    </div>
                </div>

                {/* Q3: Bottom-Left */}
                <div className="flex flex-col justify-end gap-6">
                    <div className="flex items-center gap-3 mt-4">
                        <span className={`material-symbols-outlined ${q.q3.color}`}>{q.q3.icon}</span>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white/60">{q.q3.title} <span className="text-xs font-normal text-zinc-400 dark:text-white/20 ml-2 uppercase tracking-widest">{q.q3.subtitle}</span></h2>
                    </div>
                </div>

                {/* Q4: Bottom-Right */}
                <div className="flex flex-col justify-end gap-6 items-end text-right">
                    <div className="flex items-center gap-3 mt-4">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white/90">{q.q4.title} <span className="text-xs font-normal text-zinc-400 dark:text-white/40 mr-2 uppercase tracking-widest">{q.q4.subtitle}</span></h2>
                        <span className={`material-symbols-outlined ${q.q4.color}`}>{q.q4.icon}</span>
                    </div>
                </div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-orange-500/10 to-transparent opacity-40"></div>
        </div>
    );
};
