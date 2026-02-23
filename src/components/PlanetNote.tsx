import React, { useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useStore, type Note } from '../store/useStore';
import { NOTE_STYLES, NoteType, type ViewMode } from '../constants';
import { ViewConstraints } from '../systems/ViewConstraints';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { analyzeContent } from '../utils/intelligence';
import { visualRegistry } from '../engine/render/VisualRegistry';
import { useZoomLOD, type ZoomLOD } from '../hooks/useZoomLOD';


interface PlanetNoteProps {
    note: Note;
    isSelected: boolean;
    zoom: number;
    isReadOnly?: boolean; // NEW: For Prism/Locked modes
    visualColor?: string; // NEW: Override color
    layoutOrigin?: { x: number; y: number }; // NEW: Local constraints
    viewMode?: string; // NEW: For constraint logic
    onConnectStart: (id: string, x: number, y: number) => void;
    onDragStart?: (id: string) => void;
    onDrag?: (id: string, x: number, y: number) => void;
    onDragEnd?: (id: string, x?: number, y?: number) => void;
    onContextMenu?: (e: React.MouseEvent, id: string) => void;
    onClickOverride?: (id: string) => void;
    onPointerUp?: (e: React.PointerEvent) => void;
}

const PlanetNoteComponent: React.FC<PlanetNoteProps> = ({
    note, isSelected, zoom, isReadOnly, visualColor, layoutOrigin, viewMode,
    onConnectStart, onDragStart, onDrag, onDragEnd, onClickOverride, onPointerUp
}) => {
    const updateNote = useStore((state) => state.updateNote);
    const setSelectedId = useStore((state) => state.setSelectedId);

    // Pro/Ultra Checks
    const proMode = useStore((state) => state.proMode);
    const ultraMode = useStore((state) => state.ultraMode);
    const isEnhanced = proMode || ultraMode;

    const focusModeId = useStore((state) => state.focusModeId);
    const isFocused = focusModeId === note.id;
    const isDimmed = focusModeId && !isFocused;

    // Unified Type: Always use the node's actual type
    const effectiveType = note.type;
    const baseStyle = NOTE_STYLES[effectiveType] || NOTE_STYLES[NoteType.Asteroid];

    // LOD: Zoom-based Level of Detail
    const lod: ZoomLOD = useZoomLOD();

    // Allow mutating style for local needs or clone it
    const style = { ...baseStyle };

    // Local Visual Position for Free-Threaded Dragging (60FPS)
    // We keep state for initial render, but moving forward we use refs/registry
    // const [visualPosition, setVisualPosition] = useState({ x: note.x, y: note.y }); // REMOVED: Unused
    const dragPositionRef = useRef({ x: note.x, y: note.y }); // NEW: Track drag without render
    const isDragging = useRef(false);

    // Explicitly declare ref here to be safe and available for LayoutEffect
    const noteRef = useRef<HTMLDivElement>(null);

    // PERFORMANCE: Register with Visual Engine
    React.useLayoutEffect(() => {
        if (noteRef.current) {
            visualRegistry.register(note.id, noteRef.current);
            visualRegistry.updatePosition(note.id, note.x, note.y);
        }
        return () => {
            visualRegistry.unregister(note.id);
        };
    }, []);

    // Sync visual position when store changes
    React.useEffect(() => {
        if (!isDragging.current) {
            // setVisualPosition({ x: note.x, y: note.y }); // REMOVED
            dragPositionRef.current = { x: note.x, y: note.y };
            // Ensure registry is smooth
            visualRegistry.updatePosition(note.id, note.x, note.y);
        }
    }, [note.x, note.y, note.id]);

    const contentRef = useRef<HTMLDivElement>(null);
    const lastTap = useRef<number>(0);
    const [isEditing, setIsEditing] = useState(false);

    // Text Optimization: Cache font size
    const fontSize = React.useMemo(() => {
        if (note.fontSize) return `${note.fontSize}px`;
        const len = (note.title || '').length;
        if (len < 10) return '24px';
        if (len < 30) return '20px';
        if (len < 60) return '18px';
        if (len < 100) return '16px';
        if (len < 200) return '14px';
        if (len < 350) return '13px';
        return '12px';
    }, [note.title, note.fontSize]);

    // Compute Size — use original NOTE_STYLES sizes (known working)
    let size = style.width;

    // Enhanced sizes in pro/ultra free mode
    if (isEnhanced && viewMode === 'free') {
        if (note.type === NoteType.Nebula) size = 1600;
        else if (note.type === NoteType.Galaxy) size = 1200;
        else if (note.type === NoteType.Sun) size = 800;
        else if (note.type === NoteType.Jupiter) size = 700;
        else if (note.type === NoteType.Saturn) size = 600;
        else if (note.type === NoteType.Earth) size = 400;
        else if (note.type === NoteType.Mars) size = 340;
        else if (note.type === NoteType.Asteroid || note.type === NoteType.Comet) size = 180;
    }

    // LOD: Only affects text visibility — never size (to avoid layout breakage)
    const showText = true; // Always show text — LOD text gating was too aggressive
    const showContent = lod === 'surface' || lod === 'planet';
    const showAsMinimalDot = false; // Disabled — was rendering notes as tiny invisible dots

    const bind = useGesture({
        onDragStart: ({ event }) => {
            if (isEditing || isReadOnly) return;
            if ((event.target as HTMLElement).classList.contains('handle-base')) return;

            isDragging.current = true;
            setSelectedId(note.id);

            // LOCK PHYSICS: Prevent engine from fighting user
            onDragStart?.(note.id); // Call prop if exists

            updateNote(note.id, { fixed: true });
        },
        onDrag: ({ delta: [dx, dy], event, memo = { x: dragPositionRef.current.x, y: dragPositionRef.current.y } }) => {
            if (isEditing || isReadOnly) return memo;
            if ((event.target as HTMLElement).classList.contains('handle-base')) return memo;
            event.stopPropagation();

            let newX = memo.x + dx / zoom;
            let newY = memo.y + dy / zoom;

            // DIRECT DOM UPDATE (No React Render)
            visualRegistry.updatePosition(note.id, newX, newY);
            dragPositionRef.current = { x: newX, y: newY };

            // Notify Parent
            onDrag?.(note.id, newX, newY);

            return { x: newX, y: newY };
        },

        onDragEnd: () => {
            isDragging.current = false;

            // Final constraint check
            let finalX = dragPositionRef.current.x;
            let finalY = dragPositionRef.current.y;
            let dataUpdates: Record<string, any> = {};

            if (layoutOrigin && viewMode && (viewMode !== 'free')) {
                const constraint = ViewConstraints.applyConstraints(
                    viewMode as ViewMode,
                    finalX,
                    finalY,
                    layoutOrigin,
                    { width: window.innerWidth, height: window.innerHeight }
                );
                finalX = constraint.x;
                finalY = constraint.y;
                dataUpdates = constraint.dataUpdates || {};
            }

            // 1. Commit Position
            const updatePayload: any = {
                x: finalX,
                y: finalY,
                w: size,
                h: size,
                fixed: false, // Release lock
                vx: 0,
                vy: 0,
                ...dataUpdates
            };

            updateNote(note.id, updatePayload);
            onDragEnd?.(note.id, finalX, finalY);
        },
        onPointerDown: ({ event }) => {
            if (isEditing || isReadOnly) return;
            event.stopPropagation();
            setSelectedId(note.id);

            const now = Date.now();
            if (lastTap.current && (now - lastTap.current < 300)) {
                handleContentClick(event as any);
            }
            lastTap.current = now;
        }
    }, {
        drag: { filterTaps: true, threshold: 5, from: () => [dragPositionRef.current.x, dragPositionRef.current.y] },
    });

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            const newContent = contentRef.current.innerText;
            const updates: Partial<Note> = { title: newContent };

            if (proMode) {
                const analysis = analyzeContent(newContent);
                if (analysis?.color && !note.color) {
                    updates.color = analysis.color;
                }
            }
            updateNote(note.id, updates);
        }
    };

    const deleteNote = useStore((state) => state.deleteNote);
    const viewport = useStore((state) => state.viewport);
    const setViewport = useStore((state) => state.setViewport);

    const handleContentClick = (e: React.MouseEvent) => {
        if (isReadOnly) return;

        // Special case for Welcome Nebula
        if (note.id === 'welcome-nebula') {
            deleteNote(note.id);
            return;
        }

        if (onClickOverride) {
            e.stopPropagation();
            onClickOverride(note.id);
            return;
        }

        // Smart Zoom + Edit: If far away and proMode, zoom first then enter edit
        if (proMode) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const targetX = -note.x * 1 + w / 2 - (size * 1) / 2;
            const targetY = -note.y * 1 + h / 2 - (size * 1) / 2;
            const dx = viewport.x - targetX;
            const dy = viewport.y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 100 || Math.abs(viewport.zoom - 1) > 0.2) {
                setViewport({ x: targetX, y: targetY, zoom: 1 });
                // Don't return — still enter edit mode after zoom
            }
        }

        // Always enter edit mode on double-click
        setIsEditing(true);
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.focus();
            }
        }, 50);
    };

    // Connection Handles
    const renderHandle = (position: 'top' | 'right' | 'bottom' | 'left') => {
        if (!isSelected || isReadOnly) return null;

        const handleClass = clsx("handle-base", `handle-${position}`);

        return (
            <div
                className={clsx(handleClass, "pointer-events-auto")}
                onPointerDown={() => {
                    const rect = noteRef.current?.getBoundingClientRect();
                    if (rect) {
                        onConnectStart(note.id, note.x + size / 2, note.y + size / 2);
                    }
                }}
            />
        );
    };

    const bindHandlers = bind() as any;

    // REFACTOR: Separate Engine Position (Outer) and React Appearance (Inner)
    // This wrapper is controlled by VisualRegistry and completely ignored by React reconciliation
    // regarding the 'transform' style, because we don't set 'style' prop on it (except initial).

    // LOD: At galaxy/system zoom levels, render a minimal dot instead of the full planet
    if (showAsMinimalDot) {
        return (
            <div
                ref={noteRef}
                data-note-id={note.id}
                className="absolute top-0 left-0"
            >
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        background: note.color || visualColor || baseStyle.color || '#6366f1',
                        opacity: 0.8,
                    }}
                />
            </div>
        );
    }

    return (
        <div
            ref={noteRef}
            data-note-id={note.id}
            className="absolute top-0 left-0 hover:z-50"
        // Important: Do NOT set dynamic style here that React updates often.
        // VisualRegistry will set 'transform'. React won't touch it if we don't provide style.transform.
        >
            <motion.div
                {...bindHandlers}
                onPointerUp={(e: React.PointerEvent) => {
                    if (!isReadOnly) {
                        bindHandlers.onPointerUp?.(e);
                        onPointerUp?.(e);
                    }
                }}
                className={clsx(
                    "note-planet",
                    `planet-${effectiveType}`,
                    style.className,
                    isEnhanced && viewMode === 'free' && `planet-${effectiveType}-pro`,
                    isReadOnly && "pointer-events-none cursor-default"
                )}
                style={{
                    '--planet-size': `${size}px`,
                    width: 'var(--planet-size)',
                    height: 'var(--planet-size)',
                    // Apply User Selected Color as a strong glow
                    ...(note.color || visualColor ? {
                        boxShadow: `0 0 30px -5px ${visualColor || note.color}, inset 0 0 20px -5px ${visualColor || note.color}`,
                        borderColor: visualColor || note.color
                    } : {
                        borderColor: 'var(--mode-accent, rgba(255,255,255,0.5))',
                        boxShadow: '0 0 20px -5px var(--mode-accent, transparent)'
                    }),
                    // We DO NOT set transform here. It is handled by the parent wrapper via Engine.
                } as React.CSSProperties}
                layoutId={`note-${note.id}`}
                initial={false}
                animate={{
                    width: size,
                    height: size,
                    scale: note.isDying
                        ? (viewMode === 'orbital' ? 2.5 : 0)
                        : (isFocused ? 1.2 : 1),
                    opacity: note.isDying ? 0 : (isDimmed ? 0.2 : 1),
                    filter: note.isDying && viewMode === 'orbital' ? 'brightness(3) blur(4px)' : undefined
                }}
                transition={{
                    width: { duration: 0.4, type: "spring" },
                    height: { duration: 0.4, type: "spring" },
                    scale: { type: 'spring', stiffness: 200, damping: 20 },
                    opacity: { duration: 0.3 }
                }}
            >
                {/* UNIFIED RENDERER: Always use Premium Glassmorphism */}
                {isEnhanced && (
                    <div className="absolute inset-0 pointer-events-none overflow-visible">
                        <div className="absolute inset-[-10%] rounded-full opacity-60 mix-blend-screen"
                            style={{
                                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)`
                            }}
                        />

                        {note.type === NoteType.Saturn && effectiveType === NoteType.Saturn && (
                            <>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260%] h-[260%] opacity-40 mix-blend-screen"
                                    style={{
                                        background: `radial-gradient(ellipse at center, transparent 40%, ${note.color || '#eab308'} 45%, transparent 60%)`,
                                        transform: 'rotateX(75deg) rotateY(10deg)'
                                    }}
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[220%] opacity-90"
                                    style={{
                                        background: `radial-gradient(ellipse at center, transparent 30%, ${note.color || '#eab308'} 40%, transparent 50%, ${note.color || '#eab308'} 60%, transparent 70%)`,
                                        transform: 'rotateX(75deg) rotateY(10deg)',
                                        boxShadow: `0 0 20px -5px ${note.color || '#eab308'}`
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}
                <div
                    ref={contentRef}
                    className={clsx(
                        "absolute inset-0 z-20 flex items-center justify-center text-center p-[15%]",
                        "whitespace-pre-wrap break-words outline-none",
                        showContent && isEditing ? "overflow-y-auto cursor-text" : "cursor-pointer overflow-hidden"
                    )}
                    style={{
                        fontSize: fontSize,
                        fontFamily: 'var(--mode-font)',
                        color: note.textColor || (designSystem === 'solar' ? '#1a1a1a' : 'white'),
                        textShadow: designSystem === 'solar' ? 'none' : '0 2px 4px rgba(0,0,0,0.5)'
                    }}
                    contentEditable={showContent && isEditing}
                    suppressContentEditableWarning
                    onBlur={handleBlur}
                    onPointerDown={(e) => isEditing && e.stopPropagation()}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleBlur();
                        }
                    }}
                >
                    {showText && (note.title || style.label)}
                </div>

                {/* Shared Selection Ring */}
                {isSelected && (
                    <motion.div
                        layoutId="selection-ring"
                        className="selection-ring z-0 absolute inset-[-4px] rounded-full border-2 border-blue-400"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                )}

                {renderHandle('top')}
                {renderHandle('right')}
                {renderHandle('bottom')}
                {renderHandle('left')}
            </motion.div>
        </div>
    );
};

export const PlanetNote = React.memo(PlanetNoteComponent, (prev, next) => {
    // Custom comparison for high performance
    if (prev.isSelected !== next.isSelected) return false;
    if (prev.zoom !== next.zoom) return false;
    if (prev.note.x !== next.note.x || prev.note.y !== next.note.y) return false; // Basic pos check (though managed by engine mostly)
    if (prev.note.title !== next.note.title) return false;
    if (prev.note.color !== next.note.color) return false;

    // Check if handlers changed (should generally be stable now)
    // if (prev.onDrag !== next.onDrag) return false; // Handled by useCallback in parent

    return true; // Assume equal otherwise
});
