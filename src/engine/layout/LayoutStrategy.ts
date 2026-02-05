import type { EngineNote, WorldConfig } from '../types/EngineTypes';
import type { Vector2 } from './LayoutConstants';

export interface LayoutStrategy {
    calculateTargets(notes: EngineNote[], config: WorldConfig): Map<string, Vector2>;
}
