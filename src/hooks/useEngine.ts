import { useEffect } from 'react';
import { engine } from '../engine/Engine';
import { useStore } from '../store/useStore';
import { useSettingsStore } from '../ui/settings/settingsStore';
import type { LayoutMode } from '../engine/types/EngineTypes';

export const useEngine = () => {
    const notes = useStore((state) => state.notes);
    const connections = useStore((state) => state.connections);
    const viewport = useStore((state) => state.viewport);
    const viewMode = useSettingsStore((state) => state.viewMode);

    useEffect(() => {
        // Initialize Engine
        engine.start();
        return () => {
            engine.stop();
        };
    }, []);

    // Sync World Data
    useEffect(() => {
        engine.getWorld().syncNotes(notes);
    }, [notes]); // Caution: this might be frequent. Improve diffing inside World.ts?

    useEffect(() => {
        engine.getWorld().syncConnections(connections);
    }, [connections]);

    // Sync Viewport — convert translate offset to world-center coordinates
    useEffect(() => {
        engine.updateConfig({
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: viewport.zoom,
            x: (-viewport.x + window.innerWidth / 2) / viewport.zoom,
            y: (-viewport.y + window.innerHeight / 2) / viewport.zoom,
        });
    }, [viewport]);

    // Sync Mode
    useEffect(() => {
        engine.setMode(viewMode as LayoutMode);
    }, [viewMode]);

    // Listen for Engine Deletions
    useEffect(() => {
        const handleDelete = (e: CustomEvent<{ id: string }>) => {
            // We need to remove it from the Store, which will sync back to World.
            // But World might have already deleted it partially.
            // Crucially, we need Zustand to update so React unmounts it.
            useStore.getState().deleteNote(e.detail.id);
        };
        window.addEventListener('stardust:delete-note', handleDelete as EventListener);

        const handleUpdateLink = (e: CustomEvent<{ id: string; label: string }>) => {
            // Handle store update
            useStore.getState().updateConnection(e.detail.id, { label: e.detail.label } as any);
        };
        window.addEventListener('stardust:update-link', handleUpdateLink as EventListener);

        return () => {
            window.removeEventListener('stardust:delete-note', handleDelete as EventListener);
            window.removeEventListener('stardust:update-link', handleUpdateLink as EventListener);
        };
    }, []);

    return engine;
};
