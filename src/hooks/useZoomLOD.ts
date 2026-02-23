// src/hooks/useZoomLOD.ts — Zoom-based Level of Detail
import { useStore } from '../store/useStore';

export type ZoomLOD = 'galaxy' | 'system' | 'planet' | 'surface';

/**
 * Returns the current Level of Detail based on the zoom level.
 *
 * - galaxy (zoom < 0.2): Only stars visible, everything else is a dot
 * - system (zoom < 0.5): Stars + planets visible, moons as small dots
 * - planet (zoom < 1.0): Stars + planets + moons visible, asteroids hidden
 * - surface (zoom >= 1.0): Everything visible, text editable
 */
export function getZoomLOD(zoom: number): ZoomLOD {
    if (zoom < 0.2) return 'galaxy';
    if (zoom < 0.5) return 'system';
    if (zoom < 1.0) return 'planet';
    return 'surface';
}

/**
 * Hook that returns the current LOD level based on viewport zoom.
 */
export function useZoomLOD(): ZoomLOD {
    const zoom = useStore((state) => state.viewport.zoom);
    return getZoomLOD(zoom);
}
