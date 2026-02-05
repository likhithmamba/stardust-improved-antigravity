/**
 * STARDUST DATABASE - Dexie.js Persistence Layer
 * Optimized for 5000+ note performance with compound indices
 * 
 * @module StardustDB
 * @author ImperialX
 */

import Dexie, { type Table } from 'dexie';
import type {
    Note,
    Link,
    Snapshot,
    SnapshotDiff
} from '../types/StardustSchema';

// === DATABASE SCHEMA ===

export class StardustDB extends Dexie {
    notes!: Table<Note>;
    links!: Table<Link>;
    snapshots!: Table<Snapshot>;
    snapshotDiffs!: Table<SnapshotDiff & { id?: number }>;
    settings!: Table<{ id: string; value: any }>;

    constructor() {
        super('stardust-ultra');

        this.version(1).stores({
            // Compound indices for fast queries
            // Format: 'primaryKey, index1, index2, [compound1+compound2], *multiEntry'
            notes: 'id, [priority+lastModified], type, *tags, createdAt, updatedAt, [type+priority]',
            links: 'id, from, to, [from+to], createdAt',
            snapshots: 'id, timestamp, mode',
            snapshotDiffs: '++id, timestamp',
            settings: 'id'
        });
    }
}

export const db = new StardustDB();

// === NOTE OPERATIONS ===

/**
 * Add or update a single note
 */
export async function upsertNote(note: Note): Promise<string> {
    return db.notes.put(note);
}

/**
 * Bulk add/update notes (efficient for sync operations)
 */
export async function bulkUpsertNotes(notes: Note[]): Promise<void> {
    await db.notes.bulkPut(notes);
}

/**
 * Delete a note by ID
 */
export async function deleteNote(id: string): Promise<void> {
    await db.notes.delete(id);
    // Also delete associated links
    await db.links.where('from').equals(id).delete();
    await db.links.where('to').equals(id).delete();
}

/**
 * Get all notes
 */
export async function getAllNotes(): Promise<Note[]> {
    return db.notes.toArray();
}

/**
 * Get notes by priority
 */
export async function getNotesByPriority(
    priority: 'critical' | 'high' | 'medium' | 'low'
): Promise<Note[]> {
    return db.notes.where('priority').equals(priority).toArray();
}

/**
 * Get notes by type
 */
export async function getNotesByType(type: string): Promise<Note[]> {
    return db.notes.where('type').equals(type).toArray();
}

/**
 * Get notes by tag (uses multi-entry index)
 */
export async function getNotesByTag(tag: string): Promise<Note[]> {
    return db.notes.where('tags').equals(tag).toArray();
}

/**
 * Get notes with gravity score above threshold
 * Uses compound index [priority+lastModified] for efficient filtering
 */
export async function getActiveNotes(dayThreshold: number = 30): Promise<Note[]> {
    const cutoffTime = Date.now() - (dayThreshold * 24 * 60 * 60 * 1000);

    return db.notes
        .where('updatedAt')
        .aboveOrEqual(cutoffTime)
        .toArray();
}

/**
 * Get notes for a specific view mode (using type patterns)
 */
export async function getNotesForMode(
    mode: string,
    limit: number = 1000
): Promise<Note[]> {
    switch (mode) {
        case 'orbital':
            // All notes, sorted by priority
            return db.notes
                .orderBy('[priority+lastModified]')
                .limit(limit)
                .toArray();

        case 'timeline':
            // Sort by creation date
            return db.notes
                .orderBy('createdAt')
                .limit(limit)
                .toArray();

        case 'matrix':
            // Filter notes that have impact/effort scores
            return db.notes
                .filter(n => n.impact !== undefined && n.effort !== undefined)
                .limit(limit)
                .toArray();

        default:
            return db.notes.limit(limit).toArray();
    }
}

// === LINK OPERATIONS ===

/**
 * Add or update a link
 */
export async function upsertLink(link: Link): Promise<string> {
    return db.links.put(link);
}

/**
 * Bulk add/update links
 */
export async function bulkUpsertLinks(links: Link[]): Promise<void> {
    await db.links.bulkPut(links);
}

/**
 * Delete a link
 */
export async function deleteLink(id: string): Promise<void> {
    await db.links.delete(id);
}

/**
 * Get all links
 */
export async function getAllLinks(): Promise<Link[]> {
    return db.links.toArray();
}

/**
 * Get links for a specific note
 */
export async function getLinksForNote(noteId: string): Promise<Link[]> {
    const outgoing = await db.links.where('from').equals(noteId).toArray();
    const incoming = await db.links.where('to').equals(noteId).toArray();
    return [...outgoing, ...incoming];
}

/**
 * Check if a link exists between two notes
 */
export async function linkExists(from: string, to: string): Promise<boolean> {
    const count = await db.links.where('[from+to]').equals([from, to]).count();
    return count > 0;
}

// === SNAPSHOT OPERATIONS ===

/**
 * Save a snapshot
 */
export async function saveSnapshot(snapshot: Snapshot): Promise<string> {
    return db.snapshots.put(snapshot);
}

/**
 * Save a snapshot diff
 */
export async function saveSnapshotDiff(diff: SnapshotDiff): Promise<void> {
    await db.snapshotDiffs.add(diff as SnapshotDiff & { id?: number });
}

/**
 * Get all snapshots, ordered by timestamp
 */
export async function getAllSnapshots(): Promise<Snapshot[]> {
    return db.snapshots.orderBy('timestamp').toArray();
}

/**
 * Get snapshots within a time range
 */
export async function getSnapshotsInRange(
    startTime: number,
    endTime: number
): Promise<Snapshot[]> {
    return db.snapshots
        .where('timestamp')
        .between(startTime, endTime)
        .toArray();
}

/**
 * Get the most recent snapshot
 */
export async function getLatestSnapshot(): Promise<Snapshot | undefined> {
    return db.snapshots.orderBy('timestamp').last();
}

/**
 * Get all diffs after a timestamp
 */
export async function getDiffsAfter(timestamp: number): Promise<SnapshotDiff[]> {
    return db.snapshotDiffs
        .where('timestamp')
        .above(timestamp)
        .toArray();
}

/**
 * Prune old snapshots and diffs
 */
export async function pruneOldData(retentionDays: number = 30): Promise<void> {
    const cutoff = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);

    await db.snapshots.where('timestamp').below(cutoff).delete();
    await db.snapshotDiffs.where('timestamp').below(cutoff).delete();
}

// === SETTINGS OPERATIONS ===

/**
 * Get a setting value
 */
export async function getSetting<T>(key: string): Promise<T | undefined> {
    const setting = await db.settings.get(key);
    return setting?.value as T | undefined;
}

/**
 * Set a setting value
 */
export async function setSetting<T>(key: string, value: T): Promise<void> {
    await db.settings.put({ id: key, value });
}

/**
 * Get all settings
 */
export async function getAllSettings(): Promise<Record<string, any>> {
    const settings = await db.settings.toArray();
    return Object.fromEntries(settings.map(s => [s.id, s.value]));
}

// === UTILITY FUNCTIONS ===

/**
 * Count total notes
 */
export async function countNotes(): Promise<number> {
    return db.notes.count();
}

/**
 * Count total links
 */
export async function countLinks(): Promise<number> {
    return db.links.count();
}

/**
 * Clear all data (use with caution!)
 */
export async function clearAllData(): Promise<void> {
    await db.notes.clear();
    await db.links.clear();
    await db.snapshots.clear();
    await db.snapshotDiffs.clear();
}

/**
 * Export all data as JSON
 */
export async function exportAllData(): Promise<{
    notes: Note[];
    links: Link[];
    settings: Record<string, any>;
}> {
    const [notes, links, settings] = await Promise.all([
        getAllNotes(),
        getAllLinks(),
        getAllSettings()
    ]);

    return { notes, links, settings };
}

/**
 * Import data from JSON
 */
export async function importData(data: {
    notes?: Note[];
    links?: Link[];
    settings?: Record<string, any>;
}): Promise<void> {
    if (data.notes) {
        await bulkUpsertNotes(data.notes);
    }
    if (data.links) {
        await bulkUpsertLinks(data.links);
    }
    if (data.settings) {
        for (const [key, value] of Object.entries(data.settings)) {
            await setSetting(key, value);
        }
    }
}

// === EXPORTS ===

export const StardustDatabase = {
    db,
    // Notes
    upsertNote,
    bulkUpsertNotes,
    deleteNote,
    getAllNotes,
    getNotesByPriority,
    getNotesByType,
    getNotesByTag,
    getActiveNotes,
    getNotesForMode,
    // Links
    upsertLink,
    bulkUpsertLinks,
    deleteLink,
    getAllLinks,
    getLinksForNote,
    linkExists,
    // Snapshots
    saveSnapshot,
    saveSnapshotDiff,
    getAllSnapshots,
    getSnapshotsInRange,
    getLatestSnapshot,
    getDiffsAfter,
    pruneOldData,
    // Settings
    getSetting,
    setSetting,
    getAllSettings,
    // Utilities
    countNotes,
    countLinks,
    clearAllData,
    exportAllData,
    importData
};
