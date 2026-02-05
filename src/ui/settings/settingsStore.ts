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

    // Lens System (Ultra Mode)
    viewMode: ViewMode;
    setViewMode: (v: ViewMode) => void;

    // Toolbar Settings
    toolbarMode: 'fixed' | 'auto-hide' | 'collapsed';

    setToggle: (key: string, val: boolean | string) => void;
}

import type { ViewMode } from '../../constants';

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
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
            setViewMode: (v) => {
                set({ viewMode: v });
                useStore.getState().setViewMode(v);
            },
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
