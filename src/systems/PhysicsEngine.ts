import type { Note, Connection } from '../store/useStore';
import type { ViewMode } from '../constants';
import { calculateTargets } from './LayoutEngine';


export type PhysicsContext = {
    notes: Note[];
    connections: Connection[];
    mode: ViewMode;
    viewport: { width: number; height: number; x: number; y: number; zoom: number };
    config?: any;
    layoutVersion?: number;
    anchor?: { x: number; y: number };
};

/**
 * PHYSICS ENGINE V13 (The Enforcer)
 * Rules:
 * 1. Constraint Fields: Nodes must obey their mode's constraints (Orbit, Time, Grid).
 * 2. Planet Size Law: Collisions respect Logical Slots, not Visual Size.
 * 3. Local Fairness: Nodes can drift locally but can't break global structure.
 */

// Constraint Configuration - TUNED FOR STABILITY
const CONSTRAINT_CONFIG = {
    springStrength: 0.1,
    damping: 0.9,          // Increased to reduce oscillation
    repulsionStrength: 200000,
    sleepThreshold: 0.001  // Reduced to catch even smaller movements, but we'll use a hard check later
};

export const stepPhysics = (
    context: PhysicsContext
): { notes: Note[]; events: { type: string; id: string }[] } => {

    const anchor = context.anchor || { x: 0, y: 0 };
    const forces = new Map<string, { fx: number; fy: number }>();

    // Helper to add force
    const addForce = (id: string, fx: number, fy: number) => {
        const current = forces.get(id) || { fx: 0, fy: 0 };
        forces.set(id, { fx: current.fx + fx, fy: current.fy + fy });
    };

    // 1. Get Ideal Constraint Targets
    const targets = calculateTargets(context.mode, context.notes, context.viewport, {
        ...context.config,
        orbital: { ...context.config?.orbital, center: anchor }
    });

    const viewportBuffer = 1000;
    const viewL = context.viewport.x - context.viewport.width / 2 / context.viewport.zoom - viewportBuffer;
    const viewR = context.viewport.x + context.viewport.width / 2 / context.viewport.zoom + viewportBuffer;
    const viewT = context.viewport.y - context.viewport.height / 2 / context.viewport.zoom - viewportBuffer;
    const viewB = context.viewport.y + context.viewport.height / 2 / context.viewport.zoom + viewportBuffer;

    // Filter active notes for optimization
    const activeNotes = context.notes.filter(note =>
        !note.fixed &&
        note.x > viewL && note.x < viewR && note.y > viewT && note.y < viewB
    );

    // --- 2. ACCUMULATE FORCES ---

    // 2.1 FIELD FORCES (Layout Targets) - ENABLED
    activeNotes.forEach(note => {
        const target = targets.get(note.id);
        if (target) {
            const dx = target.x - note.x;
            const dy = target.y - note.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // STABILITY: If very close to target, snap to it to stop micro-jitters
            // STABILITY: If very close to target, snap to it to stop micro-jitters
            if (dist < 1.0) {
                // Hard Snap: We directly tell integration to lock this note
                // Add a special 'snap' force or handle it here?
                // Actually, we can't change position here easily without dirtying the loop.
                // Better: Set a flag in context?
                // Simplest: Apply MASSIVE damping force
                addForce(note.id, dx * 1000, dy * 1000); // Super spring
            }

            let strength = CONSTRAINT_CONFIG.springStrength;

            // Mode-specific Tuning
            if (context.mode === 'prism' || context.mode === 'matrix') {
                strength = 0.2; // Reduced stiffness (was 0.3) to prevent overshoot
            } else if (context.mode === 'timeline') {
                strength = 0.15; // Reduced (was 0.2)
            } else if (context.mode === 'orbital') {
                strength = 0.03; // Looser (was 0.05) for smoother drift
            }

            addForce(note.id, dx * strength, dy * strength);
        }
    });

    // 2.2 LINK FORCES (Springs)
    // Only apply in Structured Modes. In Free Mode, links are visual only (Total Stability).
    if (context.mode !== 'free') {
        const LINK_STRENGTH = 0.05;
        const LINK_DISTANCE = 300;

        context.connections.forEach(conn => {
            const source = context.notes.find(n => n.id === conn.from);
            const target = context.notes.find(n => n.id === conn.to);

            // Only apply if both exist and at least one is active/movable
            if (source && target && (!source.fixed || !target.fixed)) {
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 0) {
                    const displacement = dist - LINK_DISTANCE;
                    const force = displacement * LINK_STRENGTH;

                    const fx = (dx / dist) * force;
                    const fy = (dy / dist) * force;

                    if (!source.fixed) addForce(source.id, fx, fy);
                    if (!target.fixed) addForce(target.id, -fx, -fy); // Newton's 3rd Law
                }
            }
        });
    }

    // 2.3 COLLISION HELPER (Spatial Grid)
    // DISABLED: Core Contract Rule A.1 prohibits "Collisions that recenter/push". 
    // HOWEVER, if we needed them, we'd use this O(1) grid:

    /* 
    const CELL_SIZE = 150;
    const grid = new Map<string, string[]>(); // 'x,y' -> [nodeId]

    const getKeys = (n: Note) => {
        // A node might span multiple cells, but let's assume center point for simplicity first
        const cx = Math.floor(n.x / CELL_SIZE);
        const cy = Math.floor(n.y / CELL_SIZE);
        return [`${cx},${cy}`, `${cx+1},${cy}`, `${cx-1},${cy}`, `${cx},${cy+1}`, `${cx},${cy-1}`];
    };

    // 1. Build Grid
    // activeNotes.forEach(n => {
    //    const key = `${Math.floor(n.x / CELL_SIZE)},${Math.floor(n.y/CELL_SIZE)}`;
    //    if (!grid.has(key)) grid.set(key, []);
    //    grid.get(key)!.push(n.id);
    // });

    // 2. Query Neighbors
    // activeNotes.forEach(n => {
    //      // get all molecules in current + neighbor cells
    //      // for each neighbor, check collision
    // });
    */

    // Since collision is explicitly disabled by user request ("Core Contract"), 
    // we do NOT run collision logic.
    // We just leave this placeholder for Space Partitioning Architecture.

    const enableCollision = false; // Forced OFF per Contract

    if (enableCollision) {
        // Implementation would go here
    }

    // --- 3. INTEGRATION ---
    const nextNotes = context.notes.map(note => {
        if (note.fixed) return note;

        const f = forces.get(note.id);
        if (!f) {
            // Apply simple damping even if no forces, to stop drift
            let vx = (note.vx || 0) * CONSTRAINT_CONFIG.damping;
            let vy = (note.vy || 0) * CONSTRAINT_CONFIG.damping;
            // Check if velocity is negligible to sleep
            if (Math.abs(vx) < CONSTRAINT_CONFIG.sleepThreshold && Math.abs(vy) < CONSTRAINT_CONFIG.sleepThreshold) {
                vx = 0;
                vy = 0;
            }
            return { ...note, x: note.x + vx, y: note.y + vy, vx, vy };
        }

        const ax = f.fx / (note.mass || 1);
        const ay = f.fy / (note.mass || 1);

        let vx = (note.vx || 0) + ax;
        let vy = (note.vy || 0) + ay;

        vx *= CONSTRAINT_CONFIG.damping;
        vy *= CONSTRAINT_CONFIG.damping;

        // NaN Guard
        if (isNaN(vx) || isNaN(vy)) {
            // console.warn('Physics NaN detected for note:', note.id);
            vx = 0;
            vy = 0;
        }

        const nextX = note.x + vx;
        const nextY = note.y + vy;

        if (isNaN(nextX) || isNaN(nextY)) {
            return note; // Safety abort
        }

        return {
            ...note,
            x: nextX,
            y: nextY,
            vx,
            vy
        };
    });

    return { notes: nextNotes, events: [] };
};
