export function snapToGrid(x: number, y: number, gridSize = 50) {
    const nx = Math.round(x / gridSize) * gridSize;
    const ny = Math.round(y / gridSize) * gridSize;
    return { x: nx, y: ny };
}

// align to neighbors centers (simple nearest-center)
// objects should be an array of { x, y, id }
export function snapToNeighbors(
    x: number,
    y: number,
    objects: { x: number; y: number; id: string }[],
    threshold = 20
) {
    let bestX = x;
    let bestY = y;

    for (const t of objects) {
        // skip self if ID passed? (Caller handles filtering usually)
        const dx = Math.abs(t.x - x);
        const dy = Math.abs(t.y - y);
        if (dx < threshold) bestX = t.x;
        if (dy < threshold) bestY = t.y;
    }
    return { x: bestX, y: bestY };
}
