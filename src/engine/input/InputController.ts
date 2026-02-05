import { World } from '../World';

export class InputController {
    private world: World;
    private container: HTMLElement | null = null;

    private isDragging: boolean = false;
    private dragTargetId: string | null = null;
    private lastPointer: { x: number; y: number } = { x: 0, y: 0 };

    constructor(world: World) {
        this.world = world;
    }

    public attach(container: HTMLElement) {
        this.container = container;
        container.addEventListener('pointerdown', this.onPointerDown);
        container.addEventListener('pointermove', this.onPointerMove);
        container.addEventListener('pointerup', this.onPointerUp);
        container.addEventListener('pointercancel', this.onPointerUp);
        container.addEventListener('wheel', this.onWheel, { passive: false });
    }

    public detach() {
        if (!this.container) return;
        this.container.removeEventListener('pointerdown', this.onPointerDown);
        this.container.removeEventListener('pointermove', this.onPointerMove);
        this.container.removeEventListener('pointerup', this.onPointerUp);
        this.container.removeEventListener('pointercancel', this.onPointerUp);
        this.container.removeEventListener('wheel', this.onWheel);
        this.container = null;
    }

    private onPointerDown = (e: PointerEvent) => {
        // Hit Test (Naive DOM-based for now via VisualRegistry reverse lookup? Or just event target?)
        // Since VisualRegistry keys ID -> Element, we can check if event.target is inside one of them.
        // For performance, we assume the React component attached data-id.
        const targetEl = (e.target as HTMLElement).closest('[data-note-id]');
        if (targetEl) {
            const id = targetEl.getAttribute('data-note-id');
            if (id && this.world.notes.has(id)) {
                this.isDragging = true;
                this.dragTargetId = id;
                this.lastPointer = { x: e.clientX, y: e.clientY };

                // Lock physics
                const note = this.world.notes.get(id);
                if (note) {
                    note.fixed = true;
                    note.vx = 0;
                    note.vy = 0;
                }

                // Capture pointer
                if (this.container) this.container.setPointerCapture(e.pointerId);
                e.stopPropagation();
                return;
            }
        }

        // Background drag (Pan) handling could go here
    };

    private onPointerMove = (e: PointerEvent) => {
        if (this.isDragging && this.dragTargetId) {
            const dx = (e.clientX - this.lastPointer.x) / this.world.zoom;
            const dy = (e.clientY - this.lastPointer.y) / this.world.zoom;

            this.lastPointer = { x: e.clientX, y: e.clientY };

            // Direct World Update
            const note = this.world.notes.get(this.dragTargetId);
            if (note) {
                note.x += dx;
                note.y += dy;
                // Visual Registry Update happens next tick in Engine loop
            }
        }
    };

    private onPointerUp = (e: PointerEvent) => {
        if (this.isDragging && this.dragTargetId) {
            const note = this.world.notes.get(this.dragTargetId);
            if (note) {
                note.fixed = false; // Release lock
            }
            this.isDragging = false;
            this.dragTargetId = null;
            if (this.container) this.container.releasePointerCapture(e.pointerId);
        }
    };

    private onWheel = (_e: WheelEvent) => {
        // Handle Zoom/Pan if not handled by React?
        // For now, let React handle viewport, syncing to Engine via updates.
        // e.preventDefault();
    };
}
