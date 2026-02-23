// src/utils/noteSize.ts — Dynamic note sizing based on tier and content length
import { NoteType } from '../constants';
import type { NoteType as NoteTypeValue } from '../constants';

type ObjectTier = 'star' | 'planet' | 'moon' | 'asteroid';

const STAR_TYPES: readonly NoteTypeValue[] = [NoteType.Sun, NoteType.Nebula, NoteType.Galaxy];
const PLANET_TYPES: readonly NoteTypeValue[] = [NoteType.Earth, NoteType.Mars, NoteType.Venus, NoteType.Jupiter,
NoteType.Saturn, NoteType.Uranus, NoteType.Neptune];
const MOON_TYPES: readonly NoteTypeValue[] = [NoteType.Moon, NoteType.Mercury, NoteType.Pluto];

export function getNoteObjectTier(type: NoteTypeValue): ObjectTier {
    if (STAR_TYPES.includes(type)) return 'star';
    if (PLANET_TYPES.includes(type)) return 'planet';
    if (MOON_TYPES.includes(type)) return 'moon';
    return 'asteroid';
}

const BASE: Record<ObjectTier, number> = { star: 220, planet: 115, moon: 38, asteroid: 12 };
const RANGE: Record<ObjectTier, number> = { star: 80, planet: 50, moon: 22, asteroid: 8 };

export function calculateNoteSize(note: { type: NoteTypeValue; content?: string; title?: string }): number {
    const contentLength = (note.content?.length ?? 0) + (note.title?.length ?? 0);
    const tier = getNoteObjectTier(note.type);

    // Scale within tier based on content: log scale so content growth doesn't explode size
    const contentScale = Math.min(1, Math.log10(1 + contentLength / 100));

    return BASE[tier] + (contentScale * RANGE[tier]);
}

/**
 * Mass values per tier for physics calculations
 */
export function getNoteMass(type: NoteTypeValue): number {
    const tier = getNoteObjectTier(type);
    const MASS: Record<ObjectTier, number> = { star: 100, planet: 55, moon: 12, asteroid: 3 };
    return MASS[tier];
}
