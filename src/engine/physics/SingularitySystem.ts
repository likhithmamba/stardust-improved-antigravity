import { World } from '../World';

const HAS_SCHWARZSCHILD_RADIUS = 60; // Event Horizon
const ACCRETION_DISK = 250; // Pull starts here
const G = 5000; // Gravitational Constant

export class SingularitySystem {
    private world: World;
    private onConsume: (id: string, consumerId: string) => void;

    constructor(world: World, onConsume: (id: string, consumerId: string) => void) {
        this.world = world;
        this.onConsume = onConsume;
    }

    public step() {
        const blackHoles = Array.from(this.world.notes.values()).filter(n => n.type === 'black-hole');
        const victims = Array.from(this.world.notes.values()).filter(n => n.type !== 'black-hole' && !n.fixed);

        blackHoles.forEach(bh => {
            victims.forEach(victim => {
                const dx = bh.x - victim.x;
                const dy = bh.y - victim.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                if (dist < HAS_SCHWARZSCHILD_RADIUS) {
                    // CONSUME
                    this.onConsume(victim.id, bh.id);
                } else if (dist < ACCRETION_DISK) {
                    // GRAVITY WELL
                    // F = G * m1 * m2 / r^2
                    // We assume unit mass for now or use note.mass
                    const force = (G * (bh.mass || 100)) / distSq;

                    // Normalize direction
                    const fx = (dx / dist) * force;
                    const fy = (dy / dist) * force;

                    victim.vx += fx;
                    victim.vy += fy;

                    // SPAGHETTIFICATION (Visual stretch towards center)
                    // We modify a temp property that Engine reads for VisualRegistry
                    const stretchFactor = Math.max(0.1, dist / ACCRETION_DISK); // 1.0 at edge, 0.1 at center
                    // Store on note (casting to any since EngineNote is strict, effectively treating it as mutable runtime state)
                    (victim as any).tempScale = stretchFactor;
                } else {
                    if ((victim as any).tempScale) (victim as any).tempScale = 1;
                }
            });
        });
    }
}
