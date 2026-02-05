
import type { ViewMode } from '../constants';
import { ORBITAL_CONFIG, TIMELINE_CONFIG } from './LayoutConstants';

export interface DragConstraintResult {
    x: number;
    y: number;
    dataUpdates?: {
        tags?: string[];
        priority?: 'critical' | 'high' | 'medium' | 'low';
        originMode?: ViewMode;
    };
}

export class ViewConstraints {

    /**
     * Applies magnetic constraints based on the active View Mode.
     * @param mode Current View Mode
     * @param targetX User's desired X position (cursor/drag)
     * @param targetY User's desired Y position (cursor/drag)
     * @param origin Layout center {x,y}
     * @param viewport Viewport dimensions for scaling
     * @returns Constrained position {x,y} and any data updates (tags, etc.)
     */
    static applyConstraints(
        mode: ViewMode,
        targetX: number,
        targetY: number,
        origin: { x: number; y: number },
        viewport: { width: number; height: number }
    ): DragConstraintResult {

        if (mode === 'free') {
            // Free mode: Identity (no constraint)
            return { x: targetX, y: targetY };
        }

        if (mode === 'orbital') {
            return this.getOrbitalConstraint(targetX, targetY, origin, viewport);
        }

        if (mode === 'matrix') {
            return this.getMatrixConstraint(targetX, targetY, origin, viewport);
        }

        if (mode === 'timeline') {
            return this.getTimelineConstraint(targetX, targetY, origin);
        }

        // Prism/Void/Etc - Default to free for now or add specific logic
        return { x: targetX, y: targetY };
    }

    /**
     * ORBITAL LOGIC: Magnetic Ring Snapping
     */
    private static getOrbitalConstraint(
        x: number,
        y: number,
        origin: { x: number; y: number },
        viewport: { width: number; height: number }
    ): DragConstraintResult {
        const dx = x - origin.x;
        const dy = y - origin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        const minDim = Math.min(viewport.width, viewport.height);
        const baseSize = minDim / 2;

        const { RADII_PCT, MIN_RADII } = ORBITAL_CONFIG;

        // Define Rings
        const rings = [
            { r: Math.max(MIN_RADII.critical, baseSize * RADII_PCT.critical), p: 'critical' },
            { r: Math.max(MIN_RADII.high, baseSize * RADII_PCT.high), p: 'high' },
            { r: Math.max(MIN_RADII.medium, baseSize * RADII_PCT.medium), p: 'medium' },
            { r: Math.max(MIN_RADII.low, baseSize * RADII_PCT.low), p: 'low' }
        ] as const;

        // Find closest ring
        // "Magnetic" effect: Always return the snapped radius
        const closest = rings.reduce((prev, curr) =>
            Math.abs(curr.r - dist) < Math.abs(prev.r - dist) ? curr : prev
        );

        // Snap position
        const snappedX = origin.x + closest.r * Math.cos(angle);
        const snappedY = origin.y + closest.r * Math.sin(angle);

        return {
            x: snappedX,
            y: snappedY,
            dataUpdates: {
                priority: closest.p as 'critical' | 'high' | 'medium' | 'low',
                originMode: 'orbital'
            }
        };
    }

    /**
     * MATRIX LOGIC: Quadrant Detection & "Box" Constraint
     */
    private static getMatrixConstraint(
        x: number,
        y: number,
        origin: { x: number; y: number },
        _viewport: { width: number; height: number }
    ): DragConstraintResult {
        const relX = x - origin.x;
        const relY = y - origin.y;

        // Define Quadrants relative to Origin (0,0)
        // TL: Urgent/Impt | TR: Not Urgent/Impt
        // BL: Urgent/Not  | BR: Not/Not

        let tags: string[] = [];
        let priority: 'critical' | 'high' | 'medium' | 'low' = 'medium';

        const isLeft = relX < 0;
        const isTop = relY < 0;

        // Apply Logic Data
        if (isLeft && isTop) {
            tags = ['urgent'];
            priority = 'critical';
        } else if (!isLeft && isTop) {
            tags = [];
            priority = 'critical'; // Important but not urgent -> Schedule -> High/Critical?
            // "Plan" usually means high priority execution later.
        } else if (isLeft && !isTop) {
            tags = ['urgent'];
            priority = 'low'; // Delegate -> urgent but low personal priority
        } else {
            tags = [];
            priority = 'low'; // Eliminate
        }

        return {
            x: x,
            y: y,
            dataUpdates: {
                tags,
                priority,
                originMode: 'matrix'
            }
        };
    }

    /**
     * TIMELINE LOGIC: Y-Axis Lock
     */
    private static getTimelineConstraint(
        x: number,
        y: number,
        origin: { x: number; y: number }
    ): DragConstraintResult {
        // Lock Y to the timeline axis (or origin Y)
        const { SNAP_THRESHOLD } = TIMELINE_CONFIG;
        let constrainedY = y;

        // If close to axis, snap hard
        if (Math.abs(y - origin.y) < SNAP_THRESHOLD) {
            constrainedY = origin.y;
        }

        return {
            x: x, // Time flows freely
            y: constrainedY,
            dataUpdates: {
                originMode: 'timeline'
                // Date updates handled by component mapping X to Date if needed
            }
        };
    }
}
