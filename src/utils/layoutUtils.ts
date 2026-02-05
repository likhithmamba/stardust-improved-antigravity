import { type Note } from '../store/useStore';
import { NoteType } from '../constants';

/**
 * STARDUST CORE UTILITIES
 * Determinism & Energy Logic
 */

// 1. STABLE HASHING
// Generates a deterministic number between 0 and 1 from a string ID.
// Replaces Math.random() for layout logic.
export const stableHash = (str: string, seed: number = 0): number => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0) / 4294967296; // Normalize to 0-1
};


// 2. ENERGY SYSTEM (Canonical Importance)
// Single source of truth for "how important is this note?".
// Used for: Orbital radius, Prism sort order, Stream clustering.
export const getNoteEnergy = (note: Note): number => {
    const w_importance = 0.5;
    const w_recency = 0.3;
    const w_interaction = 0.2;

    // 1. Importance (User Defined or Inferred)
    // TODO: Add 'importance' field to Note type if not present, infer from mass/size for now
    let importance = 0.5;
    if (note.type === NoteType.Sun || note.type === NoteType.BlackHole) importance = 1.0;
    else if (note.type === NoteType.Jupiter || note.type === NoteType.Saturn) importance = 0.8;
    else if (note.type === NoteType.Asteroid) importance = 0.2;

    // 2. Recency Decay (Exponential)
    // Formula: e^(-time / halfLife)
    // Half-life: 14 days (Notes lose 50% importance every 2 weeks)
    const createdAt = (note as any).createdAt || Date.now();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysOld = Math.max(0, (Date.now() - createdAt) / msPerDay);
    const halfLife = 14;

    // Decay constant lambda = ln(2) / half_life
    const lambda = 0.693 / halfLife;
    const recency = Math.exp(-lambda * daysOld);

    // 3. Interaction Score (Edits, Links, etc)
    // TODO: Hook into real interaction metrics
    const interaction = 0.5;

    return (
        w_importance * importance +
        w_recency * recency +
        w_interaction * interaction
    );
};

// 3. SAFETY & FAILSAFES
export const isValidNumber = (n: number) => {
    return typeof n === 'number' && !isNaN(n) && isFinite(n);
};

export const clamp = (val: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, val));
};
