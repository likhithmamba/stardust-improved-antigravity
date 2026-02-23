// src/hooks/useKeyboardShortcuts.ts — Global keyboard shortcuts for Stardust
import { useEffect } from 'react';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { useStore } from '../store/useStore';

/**
 * Global keyboard shortcuts:
 * - 1-5: Switch mode (void, matrix, prism, orbital, timeline)
 * - Ctrl+K / Cmd+K: Toggle search
 * - Ctrl+, / Cmd+,: Toggle settings
 * - Escape: Close open panels
 */
export function useKeyboardShortcuts() {
    const setViewMode = useSettingsStore((state) => state.setViewMode);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Don't fire when typing in inputs
            const target = e.target as HTMLElement;
            if (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
                return;
            }

            const isMod = e.ctrlKey || e.metaKey;

            // Mode switching: 1-5
            if (!isMod && !e.altKey && !e.shiftKey) {
                switch (e.key) {
                    case '1': setViewMode('void'); e.preventDefault(); return;
                    case '2': setViewMode('matrix'); e.preventDefault(); return;
                    case '3': setViewMode('prism'); e.preventDefault(); return;
                    case '4': setViewMode('orbital'); e.preventDefault(); return;
                    case '5': setViewMode('timeline'); e.preventDefault(); return;
                    case '0': setViewMode('free'); e.preventDefault(); return;
                }
            }

            // Ctrl+K: Search
            if (isMod && e.key === 'k') {
                e.preventDefault();
                const store = useStore.getState();
                store.setSearchOpen(!store.isSearchOpen);
                return;
            }

            // Ctrl+,: Settings
            if (isMod && e.key === ',') {
                e.preventDefault();
                const store = useStore.getState();
                store.setSettingsOpen(!store.isSettingsOpen);
                return;
            }

            // Escape: Close panels
            if (e.key === 'Escape') {
                const store = useStore.getState();
                if (store.isSearchOpen) { store.setSearchOpen(false); return; }
                if (store.isSettingsOpen) { store.setSettingsOpen(false); return; }
                if (store.selectedId) { store.setSelectedId(undefined); return; }
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [setViewMode]);
}
