import type { EngineNote, EngineConnection, LayoutMode } from './types/EngineTypes';

/**
 * The World
 * Single Source of Truth for the imperative simulation.
 * 
 * Invariants:
 * 1. React writes Intent (addNote, setMode).
 * 2. Engine writes Physics (x, y, vx, vy).
 * 3. React reads snapshots for persistence.
 */
export class World {
    // Mutable State
    public notes: Map<string, EngineNote> = new Map();
    public connections: Map<string, EngineConnection> = new Map();

    // View State
    public mode: LayoutMode = 'free';
    public width: number = window.innerWidth;
    public height: number = window.innerHeight;
    public zoom: number = 1;
    public camera: { x: number; y: number } = { x: 0, y: 0 }; // World center

    // Cache
    public isDirty: boolean = false;

    constructor() { }

    /**
     * Sync notes from React Store to Engine
     * optimized to update in-place to preserve velocity where possible
     */
    public syncNotes(incoming: any[]) {
        const touched = new Set<string>();

        incoming.forEach(n => {
            touched.add(n.id);
            const existing = this.notes.get(n.id);
            if (existing) {
                // Update properties but PRESERVE PHYSICS STATE if not overridden
                existing.mass = n.mass || 1;
                existing.fixed = n.fixed || false;
                existing.w = n.w || 100;
                existing.h = n.h || 100;
                existing.type = n.type;
                // If React explicitly changed position (e.g. undo/redo), snap it. 
                // Detection logic: strict equality check or timestamp? 
                // For now, assume React is authoratative ONLY on mount/load. 
                // We rely on 'fixed' flag for user drags.
            } else {
                // New Note
                this.notes.set(n.id, {
                    id: n.id,
                    x: n.x || 0,
                    y: n.y || 0,
                    vx: n.vx || 0,
                    vy: n.vy || 0,
                    mass: n.mass || 1,
                    fixed: n.fixed || false,
                    w: n.w || 100,
                    h: n.h || 100,
                    type: n.type,
                    priority: n.priority,
                    tags: n.tags,
                    createdAt: n.createdAt,
                    originMode: n.originMode
                });
            }
        });

        // Cleanup removed notes
        for (const id of this.notes.keys()) {
            if (!touched.has(id)) {
                this.notes.delete(id);
            }
        }

        this.isDirty = true;
    }

    public syncConnections(incoming: any[]) {
        this.connections.clear();
        incoming.forEach(c => {
            this.connections.set(c.id, c);
        });
    }

    public setMode(mode: LayoutMode) {
        this.mode = mode;
        // Optionally freeze physics or reset velocities here
    }

    public updateViewport(w: number, h: number, z: number, x: number, y: number) {
        this.width = w;
        this.height = h;
        this.zoom = z;
        this.camera.x = x;
        this.camera.y = y;
    }

    /**
     * Export state back to React/Store
     */
    public getSnapshot() {
        return Array.from(this.notes.values());
    }
}

export const world = new World();
