
// Stardust Persistence Layer
import Dexie, { Table } from 'dexie';
import type { Note, Link, Snapshot } from '../types';

export class StardustDatabase extends Dexie {
  notes!: Table<Note, string>;
  links!: Table<Link, string>;
  snapshots!: Table<Snapshot, number>;

  constructor() {
    super('StardustDatabase');
    this.version(1).stores({
      notes: 'id, title, createdAt, updatedAt, lastAccessed, tags, *tags',
      links: '[sourceId+targetId], sourceId, targetId, type',
      snapshots: 'timestamp'
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

export async function saveSnapshot(state: any): Promise<void> {
  const snapshot: Snapshot = {
    timestamp: new Date(),
    state,
    diffFromPrevious: ''
  };
  await db.snapshots.add(snapshot);
}

export async function getSnapshots(since?: Date): Promise<Snapshot[]> {
  const query = since 
    ? db.snapshots.where('timestamp').above(since)
    : db.snapshots;
  return query.toArray();
}

