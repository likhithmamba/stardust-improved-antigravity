import Dexie, { Table } from 'dexie';
import { Note, Link, Snapshot } from '../types';

// Mock jsondiffpatch for demonstration
const createPatch = (from: any, to: any) => {
  const patch: any = {};
  for (const key in to) {
    if (from[key] !== to[key]) {
      patch[key] = [from[key], to[key]];
    }
  }
  return patch;
};

const applyPatch = (obj: any, patch: any) => {
  const result = {...obj};
  for (const key in patch) {
    if (patch[key].length === 2) {
      result[key] = patch[key][1];
    }
  }
  return result;
};

export class StardustDatabase extends Dexie {
  notes!: Table<Note, string>;
  links!: Table<Link, string>;
  snapshots!: Table<Snapshot, number>;
  snapshotDiffs!: Table<{id?: number, timestamp: Date, patch: any}, number>;

  constructor() {
    super('StardustDatabase');
    this.version(2).stores({
      notes: 'id, title, createdAt, updatedAt, lastAccessed, tags, *tags',
      links: '[sourceId+targetId], sourceId, targetId, type',
      snapshots: '++id, timestamp',
      snapshotDiffs: '++id, timestamp'
    });
  }
}

// Singleton instance
export const db = new StardustDatabase();

// Batch operations for performance
export async function batchSaveNotes(notes: Note[]): Promise<void> {
  return db.transaction('rw', db.notes, async () => {
    await db.notes.bulkPut(notes);
  });
}

export async function batchSaveLinks(links: Link[]): Promise<void> {
  return db.transaction('rw', db.links, async () => {
    await db.links.bulkPut(links);
  });
}

export async function getRecentNotes(limit: number = 50): Promise<Note[]> {
  return db.notes.orderBy('lastAccessed').reverse().limit(limit).toArray();
}

// Save snapshot with diff compression
export async function saveSnapshot(currentState: any): Promise<void> {
  const latestSnapshot = await db.snapshots.orderBy('timestamp').last();
  
  if (latestSnapshot) {
    // Create diff from previous snapshot
    const patch = createPatch(latestSnapshot.state, currentState);
    
    // Only save if there are changes
    if (Object.keys(patch).length > 0) {
      await db.transaction('rw', db.snapshotDiffs, async () => {
        await db.snapshotDiffs.add({
          timestamp: new Date(),
          patch
        });
      });
    }
  } else {
    // First snapshot - save full state
    await db.transaction('rw', db.snapshots, async () => {
      await db.snapshots.add({
        timestamp: new Date(),
        state: currentState,
        diffFromPrevious: ''
      });
    });
  }
}

// Reconstruct state at specific time using diffs
export async function reconstructState(atTime: Date): Promise<any> {
  // Get the base snapshot before atTime
  const baseSnapshot = await db.snapshots
    .where('timestamp')
    .belowOrEqual(atTime)
    .reverse()
    .first();
  
  if (!baseSnapshot) {
    return {};
  }
  
  // Get all diffs between base and atTime
  const diffs = await db.snapshotDiffs
    .where('timestamp')
    .between(baseSnapshot.timestamp, atTime)
    .toArray();
  
  // Apply diffs sequentially
  let reconstructedState = baseSnapshot.state;
  for (const diff of diffs) {
    reconstructedState = applyPatch(reconstructedState, diff.patch);
  }
  
  return reconstructedState;
}

export async function getSnapshots(since?: Date): Promise<Date[]> {
  const query = since 
    ? db.snapshotDiffs.where('timestamp').above(since)
    : db.snapshotDiffs;
    
  const diffs = await query.toArray();
  return diffs.map(diff => diff.timestamp);
}
