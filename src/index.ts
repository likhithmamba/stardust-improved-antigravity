// Stardust — Active Architecture Re-Exports
// Single source of truth: store, database, engine

export { useStore } from './store/useStore';
export type { Note, Connection } from './store/useStore';
export { initDB } from './db/idb';
export { engine } from './engine/Engine';
