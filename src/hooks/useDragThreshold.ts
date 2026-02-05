import { useRef } from 'react';

export function useDragThreshold(threshold = 5) {
    const startRef = useRef<{ x: number; y: number } | null>(null);

    function onPointerDown(x: number, y: number) {
        startRef.current = { x, y };
    }

    function onPointerUp() {
        startRef.current = null;
    }

    function movedEnough(x: number, y: number) {
        if (!startRef.current) return false;
        const dx = Math.abs(x - startRef.current.x);
        const dy = Math.abs(y - startRef.current.y);
        return Math.hypot(dx, dy) > threshold;
    }

    return { onPointerDown, onPointerUp, movedEnough };
}
