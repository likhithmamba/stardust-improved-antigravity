import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { useStore } from '../store/useStore';
import { useEngine } from '../hooks/useEngine';

import { ViewConstraints } from '../systems/ViewConstraints';
import { MiniMap } from './MiniMap';
import { PlanetNote } from './PlanetNote';
import { ConnectionLayer } from './ConnectionLayer';
import { BlackHole } from './BlackHole';
import { NOTE_STYLES, NoteType, REAL_SIZES } from '../constants';
import { HierarchyOverlay } from '../features/hierarchy/HierarchyOverlay';
import { LinksOverlay } from '../features/links/LinksOverlay';
import { SearchTeleport } from './SearchTeleport';
import { ToastOverlay } from '../ui/feedback/ToastOverlay';
import { CanvasInputHandler } from '../ui/canvas/CanvasInputHandler';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { SemanticZoomController } from './SemanticZoomController';
import { LayoutVisuals } from './LayoutVisuals';
import { StarfieldLayer } from './StarfieldLayer';
import { soundManager } from '../utils/sound';

// Mode Overlays

import { DecayOverlay } from './modes/DecayView';
import { NotesChoiceRing } from './NotesChoiceRing';
import { DashboardBackground } from './DashboardBackground';
import { AppShell } from './AppShell';

export const CanvasViewport: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const notes = useStore((state) => state.notes);
    const connections = useStore((state) => state.connections);
    const viewport = useStore((state) => state.viewport);
    const setViewport = useStore((state) => state.setViewport);
    const addNote = useStore((state) => state.addNote);
    const addConnection = useStore((state) => state.addConnection);
    const updateNote = useStore((state) => state.updateNote);
    const deleteNote = useStore((state) => state.deleteNote);
    const selectedId = useStore((state) => state.selectedId);
    const setSelectedId = useStore((state) => state.setSelectedId);

    // Migrated: UI Toggles & Modes from SettingsStore
    const mode = useSettingsStore((state) => state.mode);
    const viewMode = useSettingsStore((state) => state.viewMode);

    // ENGINE INTEGRATION
    const engine = useEngine();

    // Derived Modes
    const proMode = mode === 'pro' || mode === 'ultra';

    // Layout Origin State
    const [layoutOrigin, setLayoutOrigin] = useState({ x: 0, y: 0 });

    // Origin Capture for Structured Modes
    useEffect(() => {
        if (viewMode !== 'free' && viewMode !== 'void') {
            const centerX = (-viewport.x + window.innerWidth / 2) / viewport.zoom;
            const centerY = (-viewport.y + window.innerHeight / 2) / viewport.zoom;
            setLayoutOrigin({ x: centerX, y: centerY });
        }
    }, [viewMode]);

    // Toggles
    const showHierarchy = useSettingsStore((state) => state.showHierarchy);
    const showLinks = useSettingsStore((state) => state.showLinks);
    const showMinimap = useStore((state) => state.showMinimap);
    const scaleMode = useStore((state) => state.scaleMode);

    // Interaction State
    const [creationMenu, setCreationMenu] = useState<{ isOpen: boolean; x: number; y: number; worldX: number; worldY: number } | null>(null);
    const [connectionStart, setConnectionStart] = useState<{ id: string; x: number; y: number } | null>(null);
    const [tempConnectionEnd, setTempConnectionEnd] = useState<{ x: number; y: number } | null>(null);
    const [blackHoleActive, setBlackHoleActive] = useState(false);

    // Mobile Chooser State
    const [sphericalMenu, setSphericalMenu] = useState<{ isOpen: boolean; x: number; y: number; worldX: number; worldY: number } | null>(null);

    // Linking System State
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; noteId: string } | null>(null);
    const [linkingFromId, setLinkingFromId] = useState<string | null>(null);
    const [alignmentLines, setAlignmentLines] = useState<{ x?: number; y?: number } | null>(null);

    // Event Listener for CanvasInputHandler
    useEffect(() => {
        const handleOpenRadial = (e: any) => {
            const { screenX, screenY } = e.detail;
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const worldX = (screenX - rect.left - viewport.x) / viewport.zoom;
                const worldY = (screenY - rect.top - viewport.y) / viewport.zoom;
                setCreationMenu({
                    isOpen: true,
                    x: screenX - rect.left,
                    y: screenY - rect.top,
                    worldX,
                    worldY
                });
                soundManager.playClick();
            }
        };

        const handleOpenSpherical = (e: any) => {
            const { x, y } = e.detail;
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const worldX = (x - rect.left - viewport.x) / viewport.zoom;
                const worldY = (y - rect.top - viewport.y) / viewport.zoom;

                if (viewMode !== 'free' && viewMode !== 'void') {
                    // Direct Call Logic for structured modes
                    const spawnX = worldX;
                    const spawnY = worldY;

                    const constraint = ViewConstraints.applyConstraints(
                        viewMode || 'free',
                        spawnX,
                        spawnY,
                        layoutOrigin,
                        { width: window.innerWidth, height: window.innerHeight }
                    );

                    let finalX = constraint.x;
                    let finalY = constraint.y;
                    let finalTags: string[] = constraint.dataUpdates?.tags || [];
                    let finalPriority = constraint.dataUpdates?.priority;

                    addNote({
                        id: Math.random().toString(36).substr(2, 9),
                        x: finalX,
                        y: finalY,
                        w: 0,
                        h: 0,
                        type: NoteType.Earth,
                        title: '',
                        tags: finalTags,
                        priority: finalPriority,
                        originMode: constraint.dataUpdates?.originMode || 'free'
                    });
                    soundManager.playClick();
                    return;
                }

                setSphericalMenu({
                    isOpen: true,
                    x: x - rect.left,
                    y: y - rect.top,
                    worldX,
                    worldY
                });
                soundManager.playClick();
            }
        };

        window.addEventListener('stardust:openRadialMenu', handleOpenRadial);
        window.addEventListener('stardust:openSphericalMenu', handleOpenSpherical);

        return () => {
            window.removeEventListener('stardust:openRadialMenu', handleOpenRadial);
            window.removeEventListener('stardust:openSphericalMenu', handleOpenSpherical);
        };
    }, [viewport]);

    // Optimized Resize Handling
    const sizeRef = useRef({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                sizeRef.current = { width, height };
                if (canvasRef.current) {
                    const dpr = window.devicePixelRatio || 1;
                    canvasRef.current.width = width * dpr;
                    canvasRef.current.height = height * dpr;
                }
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [engine]);

    useEffect(() => {
        const handleClick = () => {
            setContextMenu(null);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    useGesture({
        onDrag: ({ delta: [dx, dy], event }) => {
            const target = event.target as HTMLElement;

            if (connectionStart) {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    const clientX = (event as any).clientX;
                    const clientY = (event as any).clientY;
                    const worldX = (clientX - rect.left - viewport.x) / viewport.zoom;
                    const worldY = (clientY - rect.top - viewport.y) / viewport.zoom;
                    setTempConnectionEnd({ x: worldX, y: worldY });
                }
                return;
            }

            if (target.closest('.note-planet') || target.closest('.handle-base')) return;

            setViewport({ ...viewport, x: viewport.x + dx, y: viewport.y + dy });
        },
        onWheel: ({ delta: [dx, dy], ctrlKey, event }) => {
            // Plain scroll = zoom (natural, like Figma/Miro)
            // Ctrl+scroll = pan
            if (!ctrlKey) {
                const zoomFactor = dy > 0 ? 0.95 : 1.05;
                const newZoom = Math.max(0.1, Math.min(5, viewport.zoom * zoomFactor));

                // Cursor-centric zoom: zoom toward mouse position
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect && event) {
                    const mouseEvent = event as WheelEvent;
                    const mx = mouseEvent.clientX - rect.left;
                    const my = mouseEvent.clientY - rect.top;
                    const scale = newZoom / viewport.zoom;
                    const newX = mx - (mx - viewport.x) * scale;
                    const newY = my - (my - viewport.y) * scale;
                    setViewport({ x: newX, y: newY, zoom: newZoom });
                } else {
                    setViewport({ ...viewport, zoom: newZoom });
                }
            } else {
                // Ctrl+scroll = pan
                setViewport({ ...viewport, x: viewport.x - dx, y: viewport.y - dy });
            }
        },
        onPointerDown: ({ event }) => {
            const target = event.target as HTMLElement;
            if (target.closest('.note-planet')) return;
            setSelectedId(undefined);
        },
        onPointerUp: ({ event }) => {
            if (connectionStart) {
                checkConnectionDrop(event);
            }
        }
    }, {
        target: containerRef,
        eventOptions: { passive: false },
        drag: { filterTaps: true, threshold: 5 }
    });

    const handleNoteDragStart = useCallback((id: string) => {
        const worldNote = engine.getWorld().notes.get(id);
        if (worldNote) {
            worldNote.fixed = true;
            worldNote.vx = 0;
            worldNote.vy = 0;
        }
    }, [engine]);

    const handleNoteDrag = useCallback((id: string, x: number, y: number) => {
        const worldNote = engine.getWorld().notes.get(id);
        if (worldNote) {
            worldNote.x = x;
            worldNote.y = y;
        }

        const screenX = x * viewport.zoom + viewport.x;
        const screenY = y * viewport.zoom + viewport.y;
        const bhX = window.innerWidth - 100;
        const bhY = window.innerHeight - 100;
        const dist = Math.sqrt(Math.pow(screenX - bhX, 2) + Math.pow(screenY - bhY, 2));

        if (dist < 300) {
            setBlackHoleActive(true);
        } else {
            setBlackHoleActive(false);
        }
    }, [engine, viewport.zoom, viewport.x, viewport.y]);

    const handleNoteDragEnd = (id: string, _x?: number, _y?: number) => {
        setAlignmentLines(null);
        if (blackHoleActive) {
            soundManager.playWarp();
            deleteNote(id);
            setBlackHoleActive(false);
            return;
        }
    };

    const checkConnectionDrop = (e: any, explicitTargetId?: string) => {
        if (!connectionStart) return;

        let hitNote: typeof notes[0] | undefined;

        if (explicitTargetId) {
            hitNote = notes.find(n => n.id === explicitTargetId);
        } else {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const worldX = (e.clientX - rect.left - viewport.x) / viewport.zoom;
            const worldY = (e.clientY - rect.top - viewport.y) / viewport.zoom;

            hitNote = notes.find(n => {
                let width, height;
                if (scaleMode === 'real') {
                    const size = REAL_SIZES[n.type] || NOTE_STYLES[n.type]?.width || 100;
                    width = size;
                    height = size;
                } else {
                    const style = NOTE_STYLES[n.type] || NOTE_STYLES[NoteType.Asteroid];
                    width = n.w || style.width;
                    height = n.h || style.height;
                }

                const centerX = n.x + width / 2;
                const centerY = n.y + height / 2;
                const dist = Math.sqrt(Math.pow(worldX - centerX, 2) + Math.pow(worldY - centerY, 2));

                if (n.id === connectionStart.id) return false;
                return dist <= (width / 2) + 200;
            });
        }

        if (hitNote && hitNote.id !== connectionStart.id) {
            addConnection({
                id: Math.random().toString(36).substr(2, 9),
                from: connectionStart.id,
                to: hitNote.id
            });
            soundManager.playConnect();
        }
        setConnectionStart(null);
        setTempConnectionEnd(null);
    };

    const handleNoteContextMenu = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, noteId: id });
    };

    const startLinking = (id: string) => {
        setLinkingFromId(id);
        setContextMenu(null);
    };

    const handleNoteClickOverride = (targetId: string) => {
        if (linkingFromId) {
            if (linkingFromId === targetId) {
                setLinkingFromId(null);
                return;
            }
            const sourceNote = notes.find(n => n.id === linkingFromId);
            if (sourceNote) {
                const existingLinks = sourceNote.links || [];
                if (!existingLinks.some(l => l.toId === targetId)) {
                    updateNote(linkingFromId, {
                        links: [...existingLinks, { fromId: linkingFromId, toId: targetId }]
                    });
                    soundManager.playConnect();
                }
            }
            setLinkingFromId(null);
        }
    };

    // Show all notes in all modes — no originMode filtering
    const visibleNotes = notes;

    const handleCreateNote = (type: NoteType) => {
        if (creationMenu || sphericalMenu) {
            const menu = sphericalMenu || creationMenu;
            if (!menu) return;

            let spawnX = menu.worldX;
            let spawnY = menu.worldY;
            let initialTags: string[] = [];
            let initialPriority: string = 'default';

            if (viewMode !== 'free' && viewMode !== 'void') {
                const constraint = ViewConstraints.applyConstraints(
                    viewMode || 'free',
                    spawnX,
                    spawnY,
                    layoutOrigin,
                    { width: window.innerWidth, height: window.innerHeight }
                );

                spawnX = constraint.x;
                spawnY = constraint.y;

                if (constraint.dataUpdates) {
                    if (constraint.dataUpdates.tags) initialTags = constraint.dataUpdates.tags;
                    if (constraint.dataUpdates.priority) initialPriority = constraint.dataUpdates.priority;
                }
            }

            // Allowed structured modes
            const originMode = (['free', 'void', 'orbital', 'timeline', 'matrix', 'prism', 'archive'].includes(viewMode)) ? viewMode : 'free';

            addNote({
                id: Math.random().toString(36).substr(2, 9),
                x: spawnX,
                y: spawnY,
                w: 0,
                h: 0,
                type: type,
                title: '',
                tags: initialTags,
                priority: initialPriority as any,
                originMode: originMode as any
            });
            soundManager.playClick();
            setCreationMenu(null);
            setSphericalMenu(null);
        }
    };

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-white dark:bg-[#020617] select-none transition-colors duration-500">


            {/* Visual Layer: Starfield & Background */}
            <DashboardBackground />
            <StarfieldLayer />

            {/* MODE OVERLAYS (Static Grids/Layouts) */}
            {viewMode === 'archive' && <DecayOverlay />}

            {/* Background Interaction Layer */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none origin-top-left"
                animate={{
                    x: viewport.x,
                    y: viewport.y,
                    scale: viewport.zoom
                }}
                transition={{ duration: 0 }}
            >
                {/* Core Focus Ring from Design - Only in Orbital Mode */}
                {viewMode === 'orbital' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-[800px] h-[800px] border border-blue-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="w-[600px] h-[600px] border border-blue-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
                        <div className="w-[400px] h-[400px] border border-blue-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
                        <div className="w-[160px] h-[160px] bg-gradient-radial from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center z-0">
                            <span className="text-zinc-800 dark:text-zinc-200 font-medium tracking-wide cinzel">CORE</span>
                        </div>
                    </div>
                )}

                <ConnectionLayer
                    connections={connections}
                    notes={notes}
                    tempConnection={connectionStart && tempConnectionEnd ? { startId: connectionStart.id, endX: tempConnectionEnd.x, endY: tempConnectionEnd.y } : null}
                    zoom={viewport.zoom}
                />

                {showHierarchy && <HierarchyOverlay notes={notes} />}
                {showLinks && <LinksOverlay notes={notes} />}

                {/* Layout Visual Rails */}
                <LayoutVisuals
                    viewMode={viewMode}
                    layoutOrigin={layoutOrigin}
                    minDimension={Math.min(window.innerWidth, window.innerHeight)}
                />

                {/* Alignment Lines (Pro Mode) */}
                {alignmentLines && proMode && (
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-visible">
                        {alignmentLines.x !== undefined && (
                            <line
                                x1={alignmentLines.x} y1={-100000}
                                x2={alignmentLines.x} y2={100000}
                                stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5"
                            />
                        )}
                        {alignmentLines.y !== undefined && (
                            <line
                                x1={-100000} y1={alignmentLines.y}
                                x2={100000} y2={alignmentLines.y}
                                stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5"
                            />
                        )}
                    </svg>
                )}

                <div className="pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        {visibleNotes.map(note => {
                            return (
                                <PlanetNote
                                    key={note.id}
                                    note={note}
                                    isSelected={selectedId === note.id}
                                    zoom={viewport.zoom}
                                    isReadOnly={false}
                                    layoutOrigin={layoutOrigin}
                                    viewMode={viewMode === 'free' ? undefined : viewMode}
                                    onConnectStart={(id, x, y) => {
                                        setConnectionStart({ id, x, y });
                                        setTempConnectionEnd({ x, y });
                                    }}
                                    onDragStart={handleNoteDragStart}
                                    onDrag={handleNoteDrag}
                                    onDragEnd={(id, x, y) => {
                                        updateNote(id, { x, y });
                                        handleNoteDragEnd(id, x, y);
                                    }}
                                    onContextMenu={handleNoteContextMenu}
                                    onClickOverride={linkingFromId ? () => handleNoteClickOverride(note.id) : undefined}
                                    onPointerUp={(e) => checkConnectionDrop(e, note.id)}
                                />
                            );
                        })}
                    </AnimatePresence>
                </div>
            </motion.div >

            {contextMenu && (
                <div
                    className="fixed z-[100] bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 w-48 backdrop-blur-md"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                >
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 text-sm flex items-center gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            startLinking(contextMenu.noteId);
                        }}
                    >
                        <span>🔗</span> Link to...
                    </button>
                    <div className="h-px bg-slate-700 my-1" />
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-sm flex items-center gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this star system?')) {
                                deleteNote(contextMenu.noteId);
                                setContextMenu(null);
                            }
                        }}
                    >
                        <span>🗑️</span> Delete
                    </button>
                </div>
            )}

            <BlackHole isActive={blackHoleActive} />

            <AnimatePresence>
                {creationMenu?.isOpen && (
                    <NotesChoiceRing
                        x={creationMenu.x}
                        y={creationMenu.y}
                        onSelect={handleCreateNote}
                        onClose={() => setCreationMenu(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {sphericalMenu?.isOpen && (
                    <NotesChoiceRing
                        x={sphericalMenu.x}
                        y={sphericalMenu.y}
                        onSelect={handleCreateNote}
                        onClose={() => setSphericalMenu(null)}
                    />
                )}
            </AnimatePresence>

            <SearchTeleport />
            <ToastOverlay />
            <SemanticZoomController />
            {showMinimap && <MiniMap />}
            <CanvasInputHandler />

            {/* UNIFIED APP SHELL */}
            <AppShell />
        </div>
    );
};
