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

    // Sync Viewport
    useEffect(() => {
        engine.updateConfig({
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: viewport.zoom,
            x: viewport.x, // Engine expects World Center x/y usually, wait. 
            y: viewport.y  // Viewport.x/y in store is usually top-left or center? 
            // In CanvasViewport: translate(viewport.x, viewport.y). 
            // So these are translation offsets. 
            // Engine.world.camera is expecting Center World Coords.
        });
        // We might need to map Viewport Props -> World Camera Props
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
