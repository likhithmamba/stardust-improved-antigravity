/**
 * TIMELINE ENGINE - Sequential Momentum & State-Diffing
 * Contextual rewind via JSON diff-based snapshots
 * 
 * @module TimelineEngine
 * @author ImperialX
 */

import type {
    Note,
    Link,
    Snapshot,
    NoteSnapshot,
    LinkSnapshot,
    SnapshotDiff,
    ProjectVelocity,
    ContextSwitchEntry,
    Viewport
} from '../../types/StardustSchema';
import type { ViewMode } from '../../constants';

// === CONSTANTS ===

const VELOCITY_CONFIG = {
    DEFAULT_WINDOW_DAYS: 7,
    TREND_THRESHOLD_ACCELERATING: 1.2,
    TREND_THRESHOLD_DECELERATING: 0.8,
    SNAPSHOT_RETENTION_DAYS: 30
};

// === PROJECT VELOCITY ===

/**
 * Calculate project velocity using a moving average.
 * Measures note creation vs completion rates.
 */
export function calculateProjectVelocity(
    notes: Note[],
    windowDays: number = VELOCITY_CONFIG.DEFAULT_WINDOW_DAYS
): ProjectVelocity {
    const now = Date.now();
    const windowMs = windowDays * 24 * 60 * 60 * 1000;
    const cutoff = now - windowMs;

    // Filter notes created within window
    const recentCreated = notes.filter(n => (n.createdAt || 0) >= cutoff);

    // Filter completed notes within window
    const recentCompleted = notes.filter(n =>
        n.isCompleted &&
        (n.tags?.includes('done') || n.isCompleted) &&
        (n.updatedAt || 0) >= cutoff
    );

    const creationRate = recentCreated.length / windowDays;
    const completionRate = recentCompleted.length / windowDays;
    const ratio = creationRate > 0 ? completionRate / creationRate : 0;

    // Determine trend
    let trend: ProjectVelocity['trend'];
    if (ratio >= VELOCITY_CONFIG.TREND_THRESHOLD_ACCELERATING) {
        trend = 'accelerating';
    } else if (ratio <= VELOCITY_CONFIG.TREND_THRESHOLD_DECELERATING) {
        trend = 'decelerating';
    } else {
        trend = 'stable';
    }

    return {
        creationRate,
        completionRate,
        ratio,
        trend
    };
}

/**
 * Calculate velocity over multiple windows for trend analysis
 */
export function calculateVelocityTrend(
    notes: Note[],
    periods: number[] = [7, 14, 30]
): ProjectVelocity[] {
    return periods.map(days => calculateProjectVelocity(notes, days));
}

// === SNAPSHOT SYSTEM ===

/**
 * Create a snapshot of the current state.
 * Captures positions, titles, tags, and links.
 */
export function createSnapshot(
    notes: Note[],
    links: Link[],
    viewport: Viewport,
    mode: ViewMode
): Snapshot {
    const noteSnapshots: NoteSnapshot[] = notes.map(n => ({
        id: n.id,
        x: n.x,
        y: n.y,
        title: n.title || '',
        tags: n.tags || [],
        priority: n.priority || 'medium'
    }));

    const linkSnapshots: LinkSnapshot[] = links.map(l => ({
        id: l.id,
        from: l.from,
        to: l.to
    }));

    return {
        id: generateSnapshotId(),
        timestamp: Date.now(),
        notes: noteSnapshots,
        links: linkSnapshots,
        viewport: { ...viewport },
        mode
    };
}

/**
 * Generate a unique snapshot ID
 */
function generateSnapshotId(): string {
    return `snap-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Calculate the diff between two snapshots
 */
export function calculateSnapshotDiff(
    before: Snapshot,
    after: Snapshot
): SnapshotDiff {
    const delta: any = {
        notes: {
            added: [] as NoteSnapshot[],
            removed: [] as string[],
            modified: [] as { id: string; changes: Partial<NoteSnapshot> }[]
        },
        links: {
            added: [] as LinkSnapshot[],
            removed: [] as string[]
        },
        viewport: null as Partial<Viewport> | null,
        mode: before.mode !== after.mode ? after.mode : null
    };

    // Note changes
    const beforeNotesMap = new Map(before.notes.map(n => [n.id, n]));
    const afterNotesMap = new Map(after.notes.map(n => [n.id, n]));

    // Find added and modified
    for (const afterNote of after.notes) {
        const beforeNote = beforeNotesMap.get(afterNote.id);
        if (!beforeNote) {
            delta.notes.added.push(afterNote);
        } else {
            const changes: Partial<NoteSnapshot> = {};
            if (beforeNote.x !== afterNote.x) changes.x = afterNote.x;
            if (beforeNote.y !== afterNote.y) changes.y = afterNote.y;
            if (beforeNote.title !== afterNote.title) changes.title = afterNote.title;
            if (JSON.stringify(beforeNote.tags) !== JSON.stringify(afterNote.tags)) {
                changes.tags = afterNote.tags;
            }
            if (beforeNote.priority !== afterNote.priority) changes.priority = afterNote.priority;

            if (Object.keys(changes).length > 0) {
                delta.notes.modified.push({ id: afterNote.id, changes });
            }
        }
    }

    // Find removed
    for (const beforeNote of before.notes) {
        if (!afterNotesMap.has(beforeNote.id)) {
            delta.notes.removed.push(beforeNote.id);
        }
    }

    // Link changes
    const beforeLinksSet = new Set(before.links.map(l => l.id));
    const afterLinksSet = new Set(after.links.map(l => l.id));

    for (const afterLink of after.links) {
        if (!beforeLinksSet.has(afterLink.id)) {
            delta.links.added.push(afterLink);
        }
    }

    for (const beforeLink of before.links) {
        if (!afterLinksSet.has(beforeLink.id)) {
            delta.links.removed.push(beforeLink.id);
        }
    }

    // Viewport changes
    if (before.viewport.x !== after.viewport.x ||
        before.viewport.y !== after.viewport.y ||
        before.viewport.zoom !== after.viewport.zoom) {
        delta.viewport = {
            x: after.viewport.x,
            y: after.viewport.y,
            zoom: after.viewport.zoom
        };
    }

    return {
        timestamp: after.timestamp,
        delta
    };
}

/**
 * Apply a diff to restore a previous state
 */
export function applySnapshotDiff(
    snapshot: Snapshot,
    diff: SnapshotDiff,
    reverse: boolean = false
): Snapshot {
    const result: Snapshot = JSON.parse(JSON.stringify(snapshot));
    const delta = diff.delta;

    if (reverse) {
        // Undo: Remove added, restore removed, reverse modifications
        // Remove added notes
        const addedIds = new Set(delta.notes.added.map((n: NoteSnapshot) => n.id));
        result.notes = result.notes.filter(n => !addedIds.has(n.id));

        // We don't have the original data for removed notes in reverse...
        // This is a limitation - full reverse requires storing before state
    } else {
        // Forward: Apply diff
        // Add new notes
        result.notes.push(...delta.notes.added);

        // Remove deleted notes
        const removedSet = new Set(delta.notes.removed);
        result.notes = result.notes.filter(n => !removedSet.has(n.id));

        // Apply modifications
        for (const mod of delta.notes.modified) {
            const note = result.notes.find(n => n.id === mod.id);
            if (note) {
                Object.assign(note, mod.changes);
            }
        }

        // Links
        result.links.push(...delta.links.added);
        const removedLinks = new Set(delta.links.removed);
        result.links = result.links.filter(l => !removedLinks.has(l.id));

        // Viewport
        if (delta.viewport) {
            Object.assign(result.viewport, delta.viewport);
        }

        // Mode
        if (delta.mode) {
            result.mode = delta.mode;
        }
    }

    return result;
}

/**
 * Get state at a specific timestamp by replaying diffs
 */
export function getStateAtTime(
    baseSnapshot: Snapshot,
    diffs: SnapshotDiff[],
    targetTimestamp: number
): Snapshot {
    let state = JSON.parse(JSON.stringify(baseSnapshot)) as Snapshot;

    // Sort diffs by timestamp
    const sortedDiffs = [...diffs].sort((a, b) => a.timestamp - b.timestamp);

    for (const diff of sortedDiffs) {
        if (diff.timestamp > targetTimestamp) break;
        state = applySnapshotDiff(state, diff);
    }

    return state;
}

/**
 * Prune old snapshots beyond retention period
 */
export function pruneOldSnapshots(
    snapshots: Snapshot[],
    retentionDays: number = VELOCITY_CONFIG.SNAPSHOT_RETENTION_DAYS
): Snapshot[] {
    const cutoff = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);
    return snapshots.filter(s => s.timestamp >= cutoff);
}

// === CONTEXT SWITCHING ===

/**
 * Track context switches between high-level tags.
 * Prompts for "Cache Clear" entry when switching contexts.
 */
export function detectContextSwitch(
    previousTags: string[],
    currentTags: string[],
    highLevelTags: string[] = ['work', 'personal', 'project', 'learning']
): ContextSwitchEntry | null {
    const prevHighLevel = previousTags.filter(t =>
        highLevelTags.includes(t.toLowerCase())
    );
    const currHighLevel = currentTags.filter(t =>
        highLevelTags.includes(t.toLowerCase())
    );

    // Check if primary context changed
    const prevPrimary = prevHighLevel[0]?.toLowerCase();
    const currPrimary = currHighLevel[0]?.toLowerCase();

    if (prevPrimary && currPrimary && prevPrimary !== currPrimary) {
        return {
            timestamp: Date.now(),
            fromTag: prevPrimary,
            toTag: currPrimary,
            cacheNote: undefined // Will be filled by user
        };
    }

    return null;
}

/**
 * Generate a cache-clear prompt message
 */
export function generateCacheClearPrompt(entry: ContextSwitchEntry): string {
    return `Context Switch Detected: ${entry.fromTag} → ${entry.toTag}\n\n` +
        `Before continuing, take a moment to:\n` +
        `1. Close any mental loops from "${entry.fromTag}"\n` +
        `2. Note any unfinished items\n` +
        `3. Set your intention for "${entry.toTag}"`;
}

// === TIMELINE LAYOUT ===

/**
 * Calculate timeline positions for notes based on creation date
 */
export function getTimelineLayoutTargets(
    notes: Note[],
    center: { x: number; y: number },
    pixelsPerDay: number = 100
): Map<string, { x: number; y: number; dayOffset: number }> {
    const targets = new Map<string, { x: number; y: number; dayOffset: number }>();
    const now = Date.now();

    // Group by day for staggering
    const dayGroups = new Map<number, Note[]>();

    for (const note of notes) {
        const created = note.createdAt || now;
        const dayOffset = Math.floor((created - now) / (24 * 60 * 60 * 1000));

        if (!dayGroups.has(dayOffset)) {
            dayGroups.set(dayOffset, []);
        }
        dayGroups.get(dayOffset)!.push(note);
    }

    // Calculate positions
    for (const [dayOffset, dayNotes] of dayGroups) {
        dayNotes.forEach((note, index) => {
            // Stagger vertically within same day
            const yOffset = (index % 2 === 0 ? -1 : 1) * (60 + Math.floor(index / 2) * 40);

            targets.set(note.id, {
                x: center.x + (dayOffset * pixelsPerDay),
                y: center.y + yOffset,
                dayOffset
            });
        });
    }

    return targets;
}

// === EXPORTS ===

export const TimelineEngine = {
    calculateProjectVelocity,
    calculateVelocityTrend,
    createSnapshot,
    calculateSnapshotDiff,
    applySnapshotDiff,
    getStateAtTime,
    pruneOldSnapshots,
    detectContextSwitch,
    generateCacheClearPrompt,
    getTimelineLayoutTargets,
    VELOCITY_CONFIG
};
