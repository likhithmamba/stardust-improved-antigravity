export const NoteType = {
    Nebula: 'nebula',
    Galaxy: 'galaxy',
    Sun: 'sun',
    Mercury: 'mercury',
    Venus: 'venus',
    Earth: 'earth',
    Mars: 'mars',
    Jupiter: 'jupiter',
    Saturn: 'saturn',
    Uranus: 'uranus',
    Neptune: 'neptune',
    Pluto: 'pluto',
    Asteroid: 'asteroid',
    Comet: 'comet',
    BlackHole: 'black-hole',
    Moon: 'moon',
} as const;

export type NoteType = typeof NoteType[keyof typeof NoteType];

export const NOTE_STYLES = {
    [NoteType.Nebula]: {
        width: 1600,
        height: 1600,
        className: 'shape-nebula',
        label: 'Nebula',
        color: '#6366f1', // Indigo Neon
    },
    [NoteType.Galaxy]: {
        width: 1200,
        height: 1200,
        className: 'shadow-[0_0_150px_rgba(99,102,241,0.3)] bg-[#0B0C15]/50 backdrop-blur-3xl border border-indigo-500/30',
        label: 'Galaxy',
        color: '#818cf8',
    },
    [NoteType.Sun]: {
        width: 1000,
        height: 1000,
        className: 'shadow-[0_0_150px_rgba(255,160,0,0.6)] bg-gradient-to-br from-amber-400/20 to-orange-600/20 backdrop-blur-2xl border border-amber-500/50',
        label: 'Sun',
        color: '#ffaa00',
    },
    [NoteType.Mercury]: {
        width: 180,
        height: 180,
        className: 'shadow-[0_0_30px_rgba(168,162,158,0.4)] bg-stone-400/20 backdrop-blur-lg border border-stone-300/40',
        label: 'Mercury',
        color: '#d6d3d1',
    },
    [NoteType.Venus]: {
        width: 380,
        height: 380,
        className: 'shadow-[0_0_50px_rgba(249,115,22,0.5)] bg-orange-300/20 backdrop-blur-lg border border-orange-300/40',
        label: 'Venus',
        color: '#fb923c',
    },
    [NoteType.Earth]: {
        width: 420,
        height: 420,
        className: 'shadow-[0_0_60px_rgba(59,130,246,0.6)] bg-blue-500/20 backdrop-blur-xl border border-blue-400/50',
        label: 'Earth',
        color: '#3b82f6',
    },
    [NoteType.Moon]: {
        width: 100,
        height: 100,
        className: 'shadow-[0_0_20px_rgba(226,232,240,0.4)] bg-slate-200/30 backdrop-blur-md border border-slate-300/50',
        label: 'Moon',
        color: '#e2e8f0',
    },
    [NoteType.Mars]: {
        width: 320,
        height: 320,
        className: 'shadow-[0_0_45px_rgba(239,68,68,0.6)] bg-red-600/20 backdrop-blur-lg border border-red-500/40',
        label: 'Mars',
        color: '#ef4444',
    },
    [NoteType.Jupiter]: {
        width: 850,
        height: 850,
        className: 'shadow-[0_0_90px_rgba(234,179,8,0.5)] bg-yellow-700/20 backdrop-blur-xl border border-yellow-600/40',
        label: 'Jupiter',
        color: '#eab308',
    },
    [NoteType.Saturn]: {
        width: 750,
        height: 750,
        className: 'shadow-[0_0_80px_rgba(217,119,6,0.5)] bg-amber-600/20 backdrop-blur-xl border border-amber-500/40',
        label: 'Saturn',
        color: '#f59e0b',
        hasRings: true,
    },
    [NoteType.Uranus]: {
        width: 500,
        height: 500,
        className: 'shadow-[0_0_60px_rgba(6,182,212,0.5)] bg-cyan-400/20 backdrop-blur-xl border border-cyan-300/40',
        label: 'Uranus',
        color: '#22d3ee',
    },
    [NoteType.Neptune]: {
        width: 490,
        height: 490,
        className: 'shadow-[0_0_60px_rgba(59,130,246,0.6)] bg-blue-700/30 backdrop-blur-xl border border-blue-500/40',
        label: 'Neptune',
        color: '#3b82f6',
    },
    [NoteType.Pluto]: {
        width: 140,
        height: 140,
        className: 'shadow-[0_0_20px_rgba(253,230,138,0.4)] bg-amber-100/20 backdrop-blur-sm border border-amber-200/30',
        label: 'Pluto',
        color: '#fde68a',
    },
    [NoteType.Asteroid]: {
        width: 160,
        height: 160,
        className: 'shape-asteroid bg-slate-600/30 backdrop-blur-sm border border-slate-500/40 shadow-none',
        label: 'Asteroid',
        color: '#94a3b8',
    },
    [NoteType.Comet]: {
        width: 120,
        height: 120,
        className: 'shadow-[0_0_30px_rgba(14,165,233,0.6)] bg-sky-400/30 backdrop-blur-sm border border-sky-300/50',
        label: 'Comet',
        color: '#38bdf8',
    },
    [NoteType.BlackHole]: {
        width: 600,
        height: 600,
        className: 'bg-black shadow-[0_0_80px_#7c3aed] border border-violet-500/50 black-hole-enter',
        label: 'Black Hole',
        color: '#000000',
    },
};

export const REAL_SIZES: Record<string, number> = {
    // Premium Visual Scale
    [NoteType.Sun]: 400, // Giant anchor
    [NoteType.Jupiter]: 220,
    [NoteType.Saturn]: 190,
    [NoteType.Uranus]: 130,
    [NoteType.Neptune]: 125,
    [NoteType.Earth]: 85, // Standard unit
    [NoteType.Venus]: 80,
    [NoteType.Mars]: 70,
    [NoteType.Mercury]: 50,
    [NoteType.Pluto]: 35,
    [NoteType.Asteroid]: 25,
    [NoteType.Comet]: 20,
    [NoteType.Nebula]: 800,
    [NoteType.Galaxy]: 700,
    [NoteType.BlackHole]: 150,
};

// V13: Planet Size Law - Logical Slot Radius (Physics Size)
// This separates visual size from physics size to prevent layout breakage.
export const LOGICAL_SLOT_RADIUS: Record<string, number> = {
    [NoteType.Sun]: 250,      // Massive logic slot to keep distance
    [NoteType.Jupiter]: 150,
    [NoteType.Saturn]: 140,
    [NoteType.Uranus]: 100,
    [NoteType.Neptune]: 100,
    [NoteType.Earth]: 80,     // Standard unit
    [NoteType.Venus]: 75,
    [NoteType.Mars]: 60,
    [NoteType.Mercury]: 50,
    [NoteType.Pluto]: 40,
    [NoteType.Asteroid]: 30,
    [NoteType.Comet]: 30,
    [NoteType.Nebula]: 400,   // Huge zone
    [NoteType.Galaxy]: 350,   // Huge zone
    [NoteType.BlackHole]: 200,
};

// Unified View Mode Definition
export type ViewMode = 'free' | 'orbital' | 'constellation' | 'nebula' | 'project' | 'matrix' | 'prism' | 'timeline' | 'void' | 'stream' | 'archive';
