import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStore } from '../../store/useStore';

export type Mode = 'core' | 'pro' | 'ultra';

export interface SettingsState {
    mode: Mode;
    showHierarchy: boolean;
    showLinks: boolean;
    showChooserPreview: boolean; // dev/test preview; not persisted by default
    pro: {
        magneticAlignment: boolean;
        smartZoom: boolean;
        templatesVisible: boolean;
    };
    ultra: {
        focusMode: boolean;
        autoMapEnabled: boolean;
        invoiceUniverse: boolean;
        questMode: boolean;
    };
    setMode: (m: Mode) => void;
    transitionPhase: 'entering' | 'settling' | 'stable';
    freePositions: Map<string, { x: number; y: number }>;
    layoutVersion: number;
    setTransitionPhase: (phase: 'entering' | 'settling' | 'stable') => void;

    // Lens System (Ultra Mode)
    viewMode: ViewMode;
    designSystem: 'zero-point' | 'solar'; // Dual design system
    setViewMode: (v: ViewMode | 'void' | 'matrix' | 'prism' | 'orbital' | 'timeline' | 'free') => void;
    setDesignSystem: (ds: 'zero-point' | 'solar') => void;

    // Toolbar Settings
    toolbarMode: 'fixed' | 'auto-hide' | 'collapsed';

    setToggle: (key: string, val: boolean | string) => void;
}

import type { ViewMode } from '../../constants';

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            mode: 'ultra', // Default to Ultra for Showcase
            showHierarchy: true,
            showLinks: true,
            showChooserPreview: false,
            toolbarMode: 'fixed',
            pro: {
                magneticAlignment: true,
                smartZoom: true,
                templatesVisible: true,
            },
            ultra: {
                focusMode: false,
                autoMapEnabled: true,
                invoiceUniverse: true,
                questMode: true,
            },
            viewMode: 'void',
            designSystem: 'zero-point',
            transitionPhase: 'stable',
            freePositions: new Map(),
            layoutVersion: 1,
            setViewMode: (v) => {
                const state = get();
                const currentMode = state.viewMode;
                const viewStore = useStore.getState();

                // 1. If leaving FREE mode, snapshot current positions in useStore
                if (currentMode === 'free') {
                    const snapshot = new Map<string, { x: number; y: number }>();
                    viewStore.notes.forEach(n => {
                        snapshot.set(n.id, { x: n.x, y: n.y });
                    });
                    set({ freePositions: snapshot });
                }

                // 2. Set new mode and enter transition phase
                if (v === 'free' && state.freePositions.size > 0) {
                    const restoredNotes = viewStore.notes.map(n => {
                        const saved = state.freePositions.get(n.id);
                        return saved ? { ...n, x: saved.x, y: saved.y, vx: 0, vy: 0, fixed: false } : n;
                    });
                    viewStore.setNotes(restoredNotes);
                }

                set({
                    viewMode: v as ViewMode,
                    transitionPhase: 'entering'
                });
            },
            setTransitionPhase: (phase) => set({ transitionPhase: phase }),
            setDesignSystem: (ds) => set({ designSystem: ds }),
            setMode: (m: Mode) => {
                set((state) => {
                    const updates: any = { mode: m };

                    // Auto-enable features when upgrading
                    if (m === 'pro' || m === 'ultra') {
                        updates.pro = {
                            ...state.pro,
                            magneticAlignment: true,
                            smartZoom: true
                        };
                    }

                    if (m === 'ultra') {
                        updates.ultra = {
                            ...state.ultra,
                            invoiceUniverse: true,
                            questMode: true
                        };
                    }
                    return updates;
                });
            },
            setToggle: (key: string, val: boolean | string) => {
                // safe setter with simple path support
                const parts = key.split('.');
                if (parts.length === 1) set({ [key]: val } as any);
                else if (parts.length === 2) {
                    const [group, sub] = parts;
                    set((state: any) => ({
                        [group]: { ...state[group], [sub]: val },
                    }));
                }
            },
        }),
        { name: 'stardust.settings.v2' }
    )
);
