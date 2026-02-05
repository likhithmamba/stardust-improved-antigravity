// import { PhysicsLoop } from '../systems/PhysicsLoop'; // REMOVED
import { ViewConstraints } from '../systems/ViewConstraints';
import clsx from 'clsx';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { useStore } from '../store/useStore';
import { useEngine } from '../hooks/useEngine';
// import { InputController } from '../engine/input/InputController'; // REMOVED: Conflict
import { Toolbar } from './Toolbar';
import { MiniMap } from './MiniMap';
import { SettingsPanel } from './SettingsPanel';
import { soundManager } from '../utils/sound';
import { PlanetNote } from './PlanetNote';
import { ConnectionLayer } from './ConnectionLayer';
import { CreationMenu } from './CreationMenu';
import { BlackHole } from './BlackHole';
import { NOTE_STYLES, NoteType, REAL_SIZES } from '../constants';
import { HierarchyOverlay } from '../features/hierarchy/HierarchyOverlay';
import { LinksOverlay } from '../features/links/LinksOverlay';
import { SearchTeleport } from './SearchTeleport';
import { SphericalChooser } from '../ui/spherical-chooser/SphericalChooser';
import { QuestOverlay } from '../ui/quest-mode/QuestOverlay';
import { InvoiceOverlay } from '../ui/invoice-universe/InvoiceOverlay';
import { ToastOverlay } from '../ui/feedback/ToastOverlay';
import { CanvasInputHandler } from '../ui/canvas/CanvasInputHandler';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { SemanticZoomController } from './SemanticZoomController';
// import { calculateTargets } from '../systems/LayoutEngine';
// import { SmartLink } from './SmartLink';
import { LayoutVisuals } from './LayoutVisuals';
import { StarfieldLayer } from './StarfieldLayer';

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

    // Migrated: UI Toggles & Modes from SettingsStore (The single source of truth)
    const mode = useSettingsStore((state) => state.mode);
    const viewMode = useSettingsStore((state) => state.viewMode);
    // const theme = useStore((state) => state.theme); // Visuals still in core store? Or moved? Let's assume core for now as settings panel might not have fully moved theme.
    // Actually, checked SettingsPanel, it uses useStore for Theme. So keep Theme here.

    // ENGINE INTEGRATION
    const engine = useEngine();
    // const inputControllerRef = useRef<InputController | null>(null); // REMOVED: Conflict
    // Note: InputController is currently blocked by PlanetNote's own gesture handlers.
    // We keep it for future background interaction or unified input handling.

    // Derived Modes
    const proMode = mode === 'pro' || mode === 'ultra';

    // --- HYBRID VIEW ARCHITECTURE ---

    // Orbital Animation State
    // Layout Origin State (Captures camera position when entering a mode)
    const [layoutOrigin, setLayoutOrigin] = useState({ x: 0, y: 0 });


    // Origin Capture for Structured Modes
    useEffect(() => {
        if (viewMode !== 'free' && viewMode !== 'void') {
            // Calculate World Coordinates of the center of the screen
            const centerX = (-viewport.x + window.innerWidth / 2) / viewport.zoom;
            const centerY = (-viewport.y + window.innerHeight / 2) / viewport.zoom;
            setLayoutOrigin({ x: centerX, y: centerY });
        }
    }, [viewMode]); // Intentionally exclude viewport to capture snapshot only on mode change




    // Toggles
    const showHierarchy = useSettingsStore((state) => state.showHierarchy);

    const showLinks = useSettingsStore((state) => state.showLinks);
    // Legacy visual props still in useStore for now if not in SettingsStore layout
    const showMinimap = useStore((state) => state.showMinimap);
    // const setShowMinimap = useStore((state) => state.setShowMinimap);
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

    // Starfield moved to StarfieldLayer
    // const stars = ...
    // const nebulas = ...
    // const particleSystem = ...

    // Starfield initialization moved to StarfieldLayer

    // Event Listener for CanvasInputHandler (Robust Input)
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

                // EFFICIENCY UPGRADE: Instant Create in Structured Modes
                if (viewMode !== 'free' && viewMode !== 'void') {
                    // Bypass menu, auto-create "Standard" note (Earth/Task)
                    // We need to set a temporary 'creationMenu' state so handleCreateNote can use it, 
                    // OR refactor handleCreateNote to accept coords.
                    // Refactoring handleCreateNote is cleaner but large change.
                    // Hack: Set state then trigger? No, state is async.

                    // Direct Call Logic
                    const spawnX = worldX;
                    const spawnY = worldY;

                    // Quick Context Logic Inline (Critical for speed)
                    // Use centralized engine to ensure creation matches drag logic perfectly
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
                        type: NoteType.Earth, // Default to Earth/Task
                        title: '',
                        tags: finalTags,
                        priority: finalPriority,
                        originMode: constraint.dataUpdates?.originMode || 'free'
                    });
                    soundManager.playClick();
                    return; // Skip menu
                }

                // Default Free Mode Behavior
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
            for (const entry of entries) { // Should only be one
                const { width, height } = entry.contentRect;
                sizeRef.current = { width, height };
                // Force canvas update if needed
                if (canvasRef.current) {
                    const dpr = window.devicePixelRatio || 1;
                    canvasRef.current.width = width * dpr;
                    canvasRef.current.height = height * dpr;
                }
            }
        });
        observer.observe(containerRef.current);

        // Initialize InputController
        // We use a local instance or modify Engine to have one?
        // Let's use a local instance for now as it needs container ref
        // CONFLICT FIX: InputController fights with PlanetNote useGesture/React events.
        // Disabling it for now as React handles all necessary inputs (Drag, Pan, Zoom).
        /*
        if (!inputControllerRef.current) {
            inputControllerRef.current = new InputController(engine.getWorld());
            inputControllerRef.current.attach(containerRef.current!);
        }
        */

        return () => {
            observer.disconnect();
            /*
            if (inputControllerRef.current) {
                inputControllerRef.current.detach();
                inputControllerRef.current = null;
            }
            */
        };
    }, [engine]);

    // Background Rendering moved to StarfieldLayer

    // Close context menu on click elsewhere
    useEffect(() => {
        const handleClick = () => {
            setContextMenu(null);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Gestures for Viewport
    useGesture({
        onDrag: ({ delta: [dx, dy], event }) => {
            // Check if we are interacting with canvas/background
            const target = event.target as HTMLElement;

            // PRIORITY 1: Handle Connection Dragging
            // If we are in "linking mode", update the line and DO NOT pan
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

            // PRIORITY 2: Prevent Panning if dragging a note or handle
            // If dragging a note, don't pan
            if (target.closest('.note-planet') || target.closest('.handle-base')) return;

            setViewport({ ...viewport, x: viewport.x + dx, y: viewport.y + dy });
        },
        onWheel: ({ delta: [_dx, dy], ctrlKey }) => {
            if (ctrlKey) {
                const zoomFactor = dy > 0 ? 0.9 : 1.1;
                const newZoom = Math.max(0.1, Math.min(5, viewport.zoom * zoomFactor));
                setViewport({ ...viewport, zoom: newZoom });
            } else {
                setViewport({ ...viewport, x: viewport.x - _dx, y: viewport.y - dy });
            }
        },
        onPointerDown: ({ event }) => {
            const target = event.target as HTMLElement;
            if (target.closest('.note-planet')) {
                // Notes handle their own selection
                return;
            }

            setSelectedId(undefined); // Deselect if clicking background
        },
        onPointerUp: ({ event }) => {
            if (connectionStart) {
                // Handle drop via global handler (math-based) since pointer capture might be on container
                checkConnectionDrop(event);
            }
        }
    }, {
        target: containerRef,
        eventOptions: { passive: false },
        drag: { filterTaps: true, threshold: 5 } // Threshold logic handled in PlanetNote, but good here too
    });



    // InputController Logic (Redundant? Maybe, but safe)
    // ...

    const handleNoteDragStart = useCallback((id: string) => {
        // FAST LOCK: Stop physics immediately
        const worldNote = engine.getWorld().notes.get(id);
        if (worldNote) {
            worldNote.fixed = true;
            worldNote.vx = 0;
            worldNote.vy = 0;
        }
    }, [engine]);

    const handleNoteDrag = useCallback((id: string, x: number, y: number) => {
        // FAST PATH: Update Engine World directly so physics/links react instantly
        // This is critical because React State is too slow for 60fps drag-linking
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

    // 3. APPLY LAYOUT TO PHYSICS WORLD (One-Time Move when Mode/LayoutOrigin changes)
    // This allows them to settle into their new homes but remain movable.
    // DEPRECATED: Engine Handles this now.
    /*
    useEffect(() => {
        if (viewMode === 'free') return; // Don't touch physics in Free mode

        // Get fresh targets with current config
        // NOTE: We use the *calculated* layoutOrigin from previous effect, so this runs after it updates.
        const targets = calculateTargets(viewMode, notes, { width: window.innerWidth, height: window.innerHeight }, {
            orbital: { center: layoutOrigin, rotationOffset: 0, minDimension: Math.min(window.innerWidth, window.innerHeight) },
            viewport: { ...viewport, width: window.innerWidth, height: window.innerHeight }
        });

        // Batch Update Position
        targets.forEach((pos, id) => {
            updateNote(id, { x: pos.x, y: pos.y });
        });

    }, [viewMode, layoutOrigin]); // When mode or origin changes, Snap them.
    */


    const handleNoteDragEnd = (id: string, _x?: number, _y?: number) => {
        setAlignmentLines(null); // Clear lines

        // 1. Black Hole Check
        if (blackHoleActive) {
            soundManager.playWarp();
            deleteNote(id);
            setBlackHoleActive(false);
            return;
        }

        // 2. Timeline Passive Snap - HANDLED BY VIEWCONSTRAINTS IN PLANETNOTE
        // Redundant logic removed to prevent conflicts.
        // The effective position is already committed by PlanetNote.onDragEnd before calling this.
    };


    const checkConnectionDrop = (e: any, explicitTargetId?: string) => {
        if (!connectionStart) return;

        let hitNote: typeof notes[0] | undefined;

        if (explicitTargetId) {
            hitNote = notes.find(n => n.id === explicitTargetId);
        } else {
            // Fallback to math-based detection (dragging to empty space near planet)
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
                return dist <= (width / 2) + 200; // Snap distance
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

    // --- COMPARTMENTALIZATION (Filtering) ---
    // Filter notes based on the current View Mode.
    // 'Free' mode sees 'free' notes + legacy (undefined).
    // Structured modes only see their own notes.
    const visibleNotes = notes.filter(n => {
        if (viewMode === 'free') {
            return n.originMode === 'free' || n.originMode === undefined;
        }
        return n.originMode === viewMode;
    });

    const handleCreateNote = (type: NoteType) => {
        if (creationMenu || sphericalMenu) { // Support both menus or direct calls
            // Use spherical menu coords if available (priority), else creation menu
            const menu = sphericalMenu || creationMenu;
            if (!menu) return;

            let spawnX = menu.worldX;
            let spawnY = menu.worldY;
            let initialTags: string[] = [];
            let initialPriority: string = 'default';

            // --- CONTEXT AWARE CREATION ---
            // Unified Logic via ViewConstraints Engine
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
                // Cast viewMode to ensure compatibility. If it's a complex mode not in 'originMode', it will be just a string.
                // But our originMode type is broader now or need to check.
                // For now, cast as any logic-safe string.
                originMode: (viewMode === 'free' || viewMode === 'void' || viewMode === 'orbital' || viewMode === 'timeline' || viewMode === 'matrix' || viewMode === 'prism') ? viewMode : 'free'
            });
            soundManager.playClick();
            setCreationMenu(null);
            setSphericalMenu(null);
        }
    };


    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none">
            {/* Visual Layer: Starfield & Background */}
            <StarfieldLayer />

            {/* Legacy Canvas Ref (if needed for resizing but handled by StarfieldLayer now) */}
            {/* <canvas ref={canvasRef} ... /> REMOVED */}

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
                <ConnectionLayer
                    connections={connections}
                    notes={notes} // Connections might need filtering too? For now show all connections but maybe nodes vanish.
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
                            // Slide-on-Rails: Notes are interactive but constrained. Not ReadOnly.
                            const isReadOnly = false;

                            // Check compatibility of note.originMode with component viewMode prop if needed
                            // But distinct prop isn't strict enum in PlanetNote yet?
                            // Let's pass viewMode safely.

                            return (
                                <PlanetNote
                                    key={note.id}
                                    note={note}
                                    isSelected={selectedId === note.id}
                                    zoom={viewport.zoom}
                                    isReadOnly={isReadOnly}
                                    layoutOrigin={layoutOrigin} // World Center for Structured Modes
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
                    {/* Improvements: Color & Delete */}
                    <div className="h-px bg-slate-700 my-1" />
                    <div className="px-2 py-1 flex gap-1">
                        {['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'].map(c => (
                            <button
                                key={c}
                                className="w-4 h-4 rounded-full border border-white/20 hover:scale-125 transition-transform"
                                style={{ backgroundColor: c }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateNote(contextMenu.noteId, { color: c });
                                    setContextMenu(null);
                                }}
                            />
                        ))}
                    </div>
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

            {
                linkingFromId && (
                    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg z-[100] animate-pulse pointer-events-none">
                        Select a planet to link connection...
                    </div>
                )
            }


            {/* HUD CONTROLLER: CAMERA-RELATIVE SWITCHER */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-3 bg-slate-900/90 p-3 rounded-2xl backdrop-blur-xl border border-white/10 z-[200] pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {(['free', 'orbital', 'timeline', 'prism', 'matrix'] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => {
                            useSettingsStore.getState().setViewMode(m);
                        }}
                        className={clsx(
                            "px-5 py-2 rounded-xl text-s font-bold tracking-wide transition-all duration-300 uppercase",
                            viewMode === m
                                ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.6)] scale-110"
                                : "text-slate-500 hover:text-white hover:bg-white/10"
                        )}
                    >
                        {m}
                    </button>
                ))}
            </div>

            <BlackHole isActive={blackHoleActive} />

            <AnimatePresence>
                {creationMenu?.isOpen && (
                    <CreationMenu
                        x={creationMenu.x}
                        y={creationMenu.y}
                        isOpen={creationMenu.isOpen}
                        onSelect={handleCreateNote}
                        onClose={() => setCreationMenu(null)}
                    />
                )}
            </AnimatePresence>

            <Toolbar />
            <SettingsPanel />
            <SearchTeleport />
            <ToastOverlay />
            <QuestOverlay />
            <InvoiceOverlay />

            <SemanticZoomController />
            {/* <PhysicsLoop /> REMOVED for Engine v2 */}

            {showMinimap && <MiniMap />}

            <AnimatePresence>
                {sphericalMenu?.isOpen && (
                    <SphericalChooser
                        x={sphericalMenu.x}
                        y={sphericalMenu.y}
                        onSelect={(type) => handleCreateNote(type)}
                        onClose={() => setSphericalMenu(null)}
                    />
                )}
            </AnimatePresence>

            <div className="absolute top-4 left-4 text-white/50 pointer-events-none font-light tracking-widest text-sm uppercase z-50">
                Stardust Canvas <span className="text-xs text-amber-400 font-bold opacity-100">v2.3 (COMPARTMENTS)</span>
            </div>
            <CanvasInputHandler />
        </div>
    );
};

