import type { EngineNote, WorldConfig } from '../../types/EngineTypes';
import type { LayoutStrategy } from '../LayoutStrategy';
import { TIMELINE_CONFIG, type Vector2 } from '../LayoutConstants';
import { differenceInDays } from 'date-fns';
import {
    calculateProjectVelocity,
    type ProjectVelocity
} from '../../cognitive/TimelineEngine';

/**
 * TIMELINE LAYOUT - Sequential Momentum with Velocity Tracking
 * Uses cognitive engine for project velocity calculations
 * Shows notes on a horizontal timeline based on creation date
 */
export class TimelineLayout implements LayoutStrategy {
    private velocity: ProjectVelocity | null = null;
    private lastVelocityUpdate: number = 0;
    private readonly VELOCITY_UPDATE_INTERVAL = 5000; // Update every 5s

    calculateTargets(notes: EngineNote[], config: WorldConfig): Map<string, Vector2> {
        const targets = new Map<string, Vector2>();
        const center = { x: config.centerX, y: config.centerY };
        const { PIXELS_PER_DAY } = TIMELINE_CONFIG;

        const now = Date.now();

        // Update velocity periodically
        if (!this.velocity || now - this.lastVelocityUpdate > this.VELOCITY_UPDATE_INTERVAL) {
            this.updateVelocity(notes);
            this.lastVelocityUpdate = now;
        }

        // Sort notes by creation date for proper timeline ordering
        const sortedNotes = [...notes].sort((a, b) => {
            const aTime = a.createdAt || 0;
            const bTime = b.createdAt || 0;
            return aTime - bTime;
        });

        // Create swimlanes based on priority/type
        const lanes: Record<string, EngineNote[]> = {
            top: [],      // Critical/High priority
            middle: [],   // Medium priority
            bottom: []    // Low priority / completed
        };

        sortedNotes.forEach(note => {
            if (note.priority === 'critical' || note.priority === 'high') {
                lanes.top.push(note);
            } else if (note.priority === 'low') {
                lanes.bottom.push(note);
            } else {
                lanes.middle.push(note);
            }
        });

        // Lane Y offsets
        const laneOffsets = {
            top: -150,
            middle: 0,
            bottom: 150
        };

        // Place notes on timeline
        Object.entries(lanes).forEach(([lane, laneNotes]) => {
            const yOffset = laneOffsets[lane as keyof typeof laneOffsets];

            laneNotes.forEach((note, index) => {
                const created = note.createdAt ? new Date(note.createdAt) : new Date();
                const daysDiff = differenceInDays(created, new Date());

                // Add slight vertical offset within lane to prevent overlap
                const intraLaneOffset = (index % 3 - 1) * 40;

                targets.set(note.id, {
                    x: center.x + (daysDiff * PIXELS_PER_DAY),
                    y: center.y + yOffset + intraLaneOffset
                });
            });
        });

        return targets;
    }

    private updateVelocity(notes: EngineNote[]): void {
        // Convert EngineNotes to format expected by cognitive engine
        const adaptedNotes = notes.map(note => ({
            ...note,
            linkCount: 0,
            accessCount: 1,
            lastModified: note.createdAt || Date.now(),
            lastAccessed: Date.now(),
            title: '',
            content: '',
            tags: note.tags || [],
            priority: (note.priority || 'medium') as 'critical' | 'high' | 'medium' | 'low',
            impact: 0.5,
            effort: 0.5,
            createdAt: note.createdAt || Date.now(),
            updatedAt: Date.now(),
            isCompleted: false
        }));

        this.velocity = calculateProjectVelocity(adaptedNotes as any);
    }

    // Public API
    getVelocity(): ProjectVelocity | null {
        return this.velocity;
    }

    getTrend(): 'accelerating' | 'stable' | 'decelerating' | null {
        return this.velocity?.trend || null;
    }

    getCreationRate(): number {
        return this.velocity?.creationRate || 0;
    }

    getCompletionRate(): number {
        return this.velocity?.completionRate || 0;
    }
}
