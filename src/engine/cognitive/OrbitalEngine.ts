/**
 * ORBITAL ENGINE - Force-Directed Knowledge Graph
 * Supports 5000+ notes at 60fps via Quadtree culling (Barnes-Hut algorithm)
 * 
 * @module OrbitalEngine
 * @author ImperialX
 */

import type {
    Note,
    Vector2,
    QuadNode,
    Bounds,
    GravityScore,
    SemanticCluster
} from '../../types/StardustSchema';

// === CONSTANTS ===

const GRAVITY_CONSTANTS = {
    LINK_WEIGHT: 1.5,
    ACCESS_WEIGHT: 0.5,
    DECAY_LAMBDA: 0.05,  // Half-life ~14 days
    THETA: 0.5,          // Barnes-Hut approximation threshold
    MAX_TREE_DEPTH: 12,
    LEAF_CAPACITY: 4
};

const ZONE_THRESHOLDS = {
    CORE: 10,       // G_score >= 10 → Core zone
    ACTIVE: 3,      // G_score >= 3 → Active zone
    PERIPHERY: 0    // G_score < 3 → Periphery zone
};

// === GRAVITY SCORE CALCULATION ===

/**
 * Calculates the gravity score for a note with temporal decay.
 * Formula: G = (Links × 1.5 + AccessCount × 0.5) × e^(-λt)
 * 
 * @param note - The note to calculate gravity for
 * @returns GravityScore object with score, decayFactor, and zone
 */
export function calculateGravityScore(note: Note): GravityScore {
    const now = Date.now();
    const daysSinceModified = (now - (note.lastModified || note.updatedAt || now)) / (1000 * 60 * 60 * 24);
    const daysSinceAccessed = (now - (note.lastAccessed || note.updatedAt || now)) / (1000 * 60 * 60 * 24);

    // Use the most recent activity
    const daysSinceActivity = Math.min(daysSinceModified, daysSinceAccessed);

    // Base score: G = (Links × 1.5) + (AccessCount × 0.5)
    const linkCount = note.linkCount || 0;
    const accessCount = note.accessCount || 0;
    const baseScore = (linkCount * GRAVITY_CONSTANTS.LINK_WEIGHT) +
        (accessCount * GRAVITY_CONSTANTS.ACCESS_WEIGHT);

    // Exponential decay: e^(-λt)
    const decayFactor = Math.exp(-GRAVITY_CONSTANTS.DECAY_LAMBDA * daysSinceActivity);

    const score = baseScore * decayFactor;

    // Determine zone based on score
    let zone: 'core' | 'active' | 'periphery';
    if (score >= ZONE_THRESHOLDS.CORE) {
        zone = 'core';
    } else if (score >= ZONE_THRESHOLDS.ACTIVE) {
        zone = 'active';
    } else {
        zone = 'periphery';
    }

    return {
        noteId: note.id,
        score,
        decayFactor,
        zone
    };
}

/**
 * Batch calculate gravity scores for all notes
 */
export function calculateAllGravityScores(notes: Note[]): Map<string, GravityScore> {
    const scores = new Map<string, GravityScore>();
    for (const note of notes) {
        scores.set(note.id, calculateGravityScore(note));
    }
    return scores;
}

// === QUADTREE IMPLEMENTATION ===

/**
 * Builds a Quadtree from notes for spatial partitioning.
 * Used for Barnes-Hut approximation in N-body simulation.
 */
export function buildQuadtree(notes: Note[], bounds: Bounds): QuadNode | null {
    if (notes.length === 0) return null;

    const root = createQuadNode(bounds);

    for (const note of notes) {
        insertNote(root, note, 0);
    }

    // Calculate center of mass for all nodes
    computeMass(root);

    return root;
}

function createQuadNode(bounds: Bounds): QuadNode {
    return {
        x: bounds.minX,
        y: bounds.minY,
        width: bounds.maxX - bounds.minX,
        height: bounds.maxY - bounds.minY,
        mass: 0,
        centerOfMass: { x: 0, y: 0 },
        children: null,
        notes: []
    };
}

function insertNote(node: QuadNode, note: Note, depth: number): void {
    // Check if note is within bounds
    if (note.x < node.x || note.x > node.x + node.width ||
        note.y < node.y || note.y > node.y + node.height) {
        return;
    }

    // If leaf node
    if (node.children === null) {
        if (!node.notes) node.notes = [];

        // Add to leaf if under capacity or max depth
        if (node.notes.length < GRAVITY_CONSTANTS.LEAF_CAPACITY ||
            depth >= GRAVITY_CONSTANTS.MAX_TREE_DEPTH) {
            node.notes.push(note);
            return;
        }

        // Subdivide
        subdivide(node);

        // Re-insert existing notes
        const existingNotes = node.notes;
        node.notes = null;
        for (const existing of existingNotes) {
            insertNoteIntoChildren(node, existing, depth + 1);
        }
    }

    // Insert into appropriate child
    insertNoteIntoChildren(node, note, depth + 1);
}

function subdivide(node: QuadNode): void {
    const halfW = node.width / 2;
    const halfH = node.height / 2;

    node.children = [
        createQuadNode({ minX: node.x, minY: node.y, maxX: node.x + halfW, maxY: node.y + halfH }),           // NW
        createQuadNode({ minX: node.x + halfW, minY: node.y, maxX: node.x + node.width, maxY: node.y + halfH }), // NE
        createQuadNode({ minX: node.x, minY: node.y + halfH, maxX: node.x + halfW, maxY: node.y + node.height }), // SW
        createQuadNode({ minX: node.x + halfW, minY: node.y + halfH, maxX: node.x + node.width, maxY: node.y + node.height }) // SE
    ];
}

function insertNoteIntoChildren(node: QuadNode, note: Note, depth: number): void {
    if (!node.children) return;

    const midX = node.x + node.width / 2;
    const midY = node.y + node.height / 2;

    const index = (note.x < midX ? 0 : 1) + (note.y < midY ? 0 : 2);
    insertNote(node.children[index], note, depth);
}

function computeMass(node: QuadNode): void {
    if (node.children === null) {
        // Leaf node
        if (node.notes && node.notes.length > 0) {
            let totalMass = 0;
            let comX = 0;
            let comY = 0;

            for (const note of node.notes) {
                const mass = note.mass || 1;
                totalMass += mass;
                comX += note.x * mass;
                comY += note.y * mass;
            }

            node.mass = totalMass;
            node.centerOfMass = {
                x: comX / totalMass,
                y: comY / totalMass
            };
        }
        return;
    }

    // Internal node
    let totalMass = 0;
    let comX = 0;
    let comY = 0;

    for (const child of node.children) {
        computeMass(child);
        if (child.mass > 0) {
            totalMass += child.mass;
            comX += child.centerOfMass.x * child.mass;
            comY += child.centerOfMass.y * child.mass;
        }
    }

    node.mass = totalMass;
    if (totalMass > 0) {
        node.centerOfMass = {
            x: comX / totalMass,
            y: comY / totalMass
        };
    }
}

/**
 * Barnes-Hut force calculation using Quadtree
 * Returns repulsion force on target note from all other notes
 */
export function calculateRepulsionForce(
    note: Note,
    quadtree: QuadNode,
    repulsionStrength: number = 200000
): Vector2 {
    return calculateForceFromNode(note, quadtree, repulsionStrength);
}

function calculateForceFromNode(
    note: Note,
    node: QuadNode,
    repulsionStrength: number
): Vector2 {
    if (node.mass === 0) return { x: 0, y: 0 };

    const dx = node.centerOfMass.x - note.x;
    const dy = node.centerOfMass.y - note.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    if (dist === 0) return { x: 0, y: 0 };

    // Barnes-Hut criterion: s/d < θ
    const s = Math.max(node.width, node.height);

    if (node.children === null || s / dist < GRAVITY_CONSTANTS.THETA) {
        // Treat as single body
        const force = -repulsionStrength * (note.mass || 1) * node.mass / (distSq + 1);
        return {
            x: (dx / dist) * force,
            y: (dy / dist) * force
        };
    }

    // Recurse into children
    let fx = 0, fy = 0;
    for (const child of node.children) {
        const childForce = calculateForceFromNode(note, child, repulsionStrength);
        fx += childForce.x;
        fy += childForce.y;
    }

    return { x: fx, y: fy };
}

// === SEMANTIC GRAVITY DETECTION ===

/**
 * Detects clusters of notes with high metadata overlap.
 * Notes with ≥70% shared tags are considered semantically related.
 */
export function detectSemanticClusters(
    notes: Note[],
    threshold: number = 0.7
): SemanticCluster[] {
    const clusters: SemanticCluster[] = [];
    const visited = new Set<string>();

    for (const note of notes) {
        if (visited.has(note.id)) continue;

        const cluster: string[] = [note.id];
        const noteTags = new Set(note.tags || []);

        for (const other of notes) {
            if (other.id === note.id || visited.has(other.id)) continue;

            const otherTags = new Set(other.tags || []);
            const overlap = calculateTagOverlap(noteTags, otherTags);

            if (overlap >= threshold) {
                cluster.push(other.id);
                visited.add(other.id);
            }
        }

        if (cluster.length >= 2) {
            // Get shared tags
            const sharedTags = getSharedTags(notes.filter(n => cluster.includes(n.id)));

            clusters.push({
                id: `cluster-${crypto.randomUUID().slice(0, 8)}`,
                noteIds: cluster,
                sharedTags,
                overlapScore: threshold,
                suggestedBridgeTitle: generateBridgeTitle(sharedTags)
            });
        }

        visited.add(note.id);
    }

    return clusters;
}

function calculateTagOverlap(a: Set<string>, b: Set<string>): number {
    if (a.size === 0 || b.size === 0) return 0;

    let intersection = 0;
    for (const tag of a) {
        if (b.has(tag)) intersection++;
    }

    const union = a.size + b.size - intersection;
    return intersection / union; // Jaccard similarity
}

function getSharedTags(notes: Note[]): string[] {
    if (notes.length === 0) return [];

    const tagCounts = new Map<string, number>();
    for (const note of notes) {
        for (const tag of note.tags || []) {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
    }

    // Return tags that appear in at least 50% of notes
    const threshold = notes.length / 2;
    return Array.from(tagCounts.entries())
        .filter(([, count]) => count >= threshold)
        .map(([tag]) => tag);
}

function generateBridgeTitle(sharedTags: string[]): string {
    if (sharedTags.length === 0) return 'Bridge Note';
    return `Bridge: ${sharedTags.slice(0, 3).join(' + ')}`;
}

// === ORBITAL LAYOUT WITH GRAVITY ===

/**
 * Calculate orbital positions based on gravity scores.
 * High gravity → inner rings, Low gravity → outer rings
 */
export function getGravityOrbitalTargets(
    notes: Note[],
    center: Vector2,
    gravityScores: Map<string, GravityScore>,
    rotationOffset: number = 0
): Map<string, Vector2> {
    const targets = new Map<string, Vector2>();

    // Group by zone
    const zones: Record<string, Note[]> = {
        core: [],
        active: [],
        periphery: []
    };

    for (const note of notes) {
        const score = gravityScores.get(note.id);
        const zone = score?.zone || 'periphery';
        zones[zone].push(note);
    }

    // Define radii for each zone
    const radii = {
        core: 150,
        active: 350,
        periphery: 600
    };

    // Place notes in concentric rings
    for (const [zone, zoneNotes] of Object.entries(zones)) {
        const radius = radii[zone as keyof typeof radii];
        const count = zoneNotes.length;

        if (count === 0) continue;

        const angleStep = (2 * Math.PI) / count;

        zoneNotes.forEach((note, i) => {
            const angle = i * angleStep + rotationOffset;
            targets.set(note.id, {
                x: center.x + radius * Math.cos(angle),
                y: center.y + radius * Math.sin(angle)
            });
        });
    }

    return targets;
}

// === EXPORTS ===

export const OrbitalEngine = {
    calculateGravityScore,
    calculateAllGravityScores,
    buildQuadtree,
    calculateRepulsionForce,
    detectSemanticClusters,
    getGravityOrbitalTargets,
    GRAVITY_CONSTANTS,
    ZONE_THRESHOLDS
};
