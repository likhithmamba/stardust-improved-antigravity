import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

import { stepPhysics } from './PhysicsEngine';
import { soundManager } from '../utils/sound';
import { visualRegistry } from './VisualRegistry';

export const PhysicsLoop: React.FC = () => {
    const setNotes = useStore((state) => state.setNotes);

    // We use a ref to track if loop is running to avoid react render cycle traps
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);
    const simulationNotesRef = useRef<any[]>([]); // Local simulation state

    // Sync ref with store only when store updates (e.g. added note) but NOT when physics runs
    // effectively "forking" the state for the physics engine
    useEffect(() => {
        simulationNotesRef.current = useStore.getState().notes;
    }, [useStore.getState().notes.length, useStore.getState().layoutVersion]); // Dependency on structural changes only

    const animate = (time: number) => {
        if (previousTimeRef.current !== null) {
            // physics step
            const store = useStore.getState();

            // Construct Context for new Physics Engine
            const context = {
                // Use local simulation state if available, else store
                notes: simulationNotesRef.current.length > 0 ? simulationNotesRef.current : store.notes,
                connections: store.connections,
                mode: store.viewMode,
                viewport: {
                    x: store.viewport.x,
                    y: store.viewport.y,
                    zoom: store.viewport.zoom,
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                layoutVersion: store.layoutVersion
            };

            // Step Physics
            const { notes: newNotes, events } = stepPhysics(context);

            // Update Local Simulation State
            simulationNotesRef.current = newNotes;

            // Handle Events
            if (events.length > 0) {
                events.forEach(e => {
                    if (e.type === 'supernova') {
                        soundManager.playExplosion();
                        window.dispatchEvent(new CustomEvent('stardust:toast', {
                            detail: { message: 'TASK COMPLETED! Supernova Ignition!', type: 'ultra' }
                        }));
                        // Animate Death, then delete
                        useStore.getState().updateNote(e.id, { isDying: true });
                        setTimeout(() => {
                            useStore.getState().deleteNote(e.id);
                        }, 1000);
                    }
                    if (e.type === 'spaghettify') {
                        soundManager.playBlackHole();
                        window.dispatchEvent(new CustomEvent('stardust:toast', {
                            detail: { message: 'Note consumed by Event Horizon.', type: 'warning' }
                        }));
                        useStore.getState().updateNote(e.id, { isDying: true });
                        setTimeout(() => {
                            useStore.getState().deleteNote(e.id);
                        }, 800);
                    }
                });
            }

            // PERFORMANCE: Direct DOM Update via Registry
            newNotes.forEach((note: any) => {
                visualRegistry.updatePosition(note.id, note.x, note.y);
            });

            // Optimization: basic kinetic energy check
            const ke = newNotes.reduce((acc: number, n: any) => acc + Math.abs(n.vx || 0) + Math.abs(n.vy || 0), 0);

            // SYNC LOGIC:
            // Sync if events happened
            if (events.length > 0) {
                setNotes(newNotes);
            }
            // Probabilistic Sync when moving to keep connections somewhat updated (5% chance per frame => ~3fps update)
            // This prevents complete connection detachment while keeping React load low (1/20th of original load)
            else if (ke > 0.001) {
                if (Math.random() < 0.05) {
                    setNotes(newNotes);
                }
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    // Subscribe to mode changes to start/stop loop
    // For now, we always run if the app is active. We can optimize later.
    useEffect(() => {
        const startLoop = () => {
            if (!requestRef.current) {
                previousTimeRef.current = null;
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        const stopLoop = () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }
        };

        startLoop();

        return () => stopLoop();
    }, []);

    return null;
};
