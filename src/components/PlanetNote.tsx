import React, { useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useStore, type Note } from '../store/useStore';
import { NOTE_STYLES, NoteType, REAL_SIZES, type ViewMode } from '../constants';
import { ViewConstraints } from '../systems/ViewConstraints';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { analyzeContent } from '../utils/intelligence';
import { visualRegistry } from '../engine/render/VisualRegistry';
import { useZoomLOD, type ZoomLOD } from '../hooks/useZoomLOD';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { planetExpander } from '../utils/ai';
import { Sparkles } from 'lucide-react';

interface PlanetNoteProps {
    note: Note;
    isSelected: boolean;
    zoom: number;
    isReadOnly?: boolean;
    visualColor?: string;
    layoutOrigin?: { x: number; y: number };
    viewMode?: string;
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

    const designSystem = useSettingsStore((state) => state.designSystem);
    const mode = useSettingsStore((state) => state.mode);

    const proMode = mode === 'pro' || mode === 'ultra';
    const ultraMode = mode === 'ultra';
    const isEnhanced = proMode || ultraMode;

    const focusModeId = useStore((state) => state.focusModeId);
    const isFocused = focusModeId === note.id;
    const isDimmed = focusModeId && !isFocused;

    const effectiveType = note.type;
    const baseStyle = NOTE_STYLES[effectiveType] || NOTE_STYLES[NoteType.Asteroid];
    const lod: ZoomLOD = useZoomLOD();
    const style = { ...baseStyle };

    const dragPositionRef = useRef({ x: note.x, y: note.y });
    const isDragging = useRef(false);
    const noteRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Compute Size
    let size = style.width;
    if (viewMode === 'free') {
        size = REAL_SIZES[note.type] || size;
    }

    const showText = lod === 'surface' || lod === 'planet';
    const showContent = lod === 'surface';
    const showAsMinimalDot = lod === 'galaxy';
    const tier = [NoteType.Sun, NoteType.Galaxy, NoteType.Nebula, NoteType.Jupiter, NoteType.Saturn].includes(effectiveType as any) ? 1 : 2;
    const isMajor = tier === 1;

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
            dragPositionRef.current = { x: note.x, y: note.y };
            visualRegistry.updatePosition(note.id, note.x, note.y);
        }
    }, [note.x, note.y, note.id]);

    // Text Auto-fit Logic
    React.useLayoutEffect(() => {
        if (textRef.current && showText) {
            const el = textRef.current;
            const containerSize = size * 0.7;
            el.style.fontSize = '24px';
            let currentSize = 24;

            while ((el.scrollHeight > containerSize || el.scrollWidth > containerSize) && currentSize > 8) {
                currentSize -= 1;
                el.style.fontSize = `${currentSize}px`;
            }
        }
    }, [note.title, size, showText]);

    const lastTap = useRef<number>(0);
    const [isEditing, setIsEditing] = useState(false);

    const bind = useGesture({
        onDragStart: ({ event }) => {
            if (isEditing || isReadOnly) return;
            if ((event.target as HTMLElement).classList.contains('handle-base')) return;

            isDragging.current = true;
            setSelectedId(note.id);
            onDragStart?.(note.id);
            updateNote(note.id, { fixed: true });
        },
        onDrag: ({ delta: [dx, dy], event, memo = { x: dragPositionRef.current.x, y: dragPositionRef.current.y } }) => {
            if (isEditing || isReadOnly) return memo;
            if ((event.target as HTMLElement).classList.contains('handle-base')) return memo;
            event.stopPropagation();

            let newX = memo.x + dx / zoom;
            let newY = memo.y + dy / zoom;

            visualRegistry.updatePosition(note.id, newX, newY);
            dragPositionRef.current = { x: newX, y: newY };
            onDrag?.(note.id, newX, newY);

            return { x: newX, y: newY };
        },
        onDragEnd: () => {
            isDragging.current = false;
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

            updateNote(note.id, {
                x: finalX,
                y: finalY,
                w: size,
                h: size,
                fixed: false,
                vx: 0,
                vy: 0,
                ...dataUpdates
            });
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
        if (textRef.current) {
            const newContent = textRef.current.innerText;
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
        if (note.id === 'welcome-nebula') {
            deleteNote(note.id);
            return;
        }
        if (onClickOverride) {
            e.stopPropagation();
            onClickOverride(note.id);
            return;
        }
        if (proMode) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const targetX = -note.x * 1 + w / 2 - size / 2;
            const targetY = -note.y * 1 + h / 2 - size / 2;
            const dx = viewport.x - targetX;
            const dy = viewport.y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 100 || Math.abs(viewport.zoom - 1) > 0.2) {
                setViewport({ x: targetX, y: targetY, zoom: 1 });
            }
        }
        setIsEditing(true);
        setTimeout(() => {
            if (textRef.current) textRef.current.focus();
        }, 50);
    };

    const renderHandle = (position: 'top' | 'right' | 'bottom' | 'left') => {
        if (!isSelected || isReadOnly) return null;
        const handleClass = clsx("handle-base", `handle-${position}`, "fixed-node");
        return (
            <div
                key={position}
                className={clsx(handleClass, "pointer-events-auto z-[60]")}
                style={{
                    width: 12,
                    height: 12,
                    background: note.color || '#3b82f6',
                    border: '2px solid white',
                    borderRadius: '50%',
                    position: 'absolute'
                }}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    let hx = note.x + size / 2;
                    let hy = note.y + size / 2;
                    if (position === 'top') hy -= size / 2;
                    if (position === 'bottom') hy += size / 2;
                    if (position === 'left') hx -= size / 2;
                    if (position === 'right') hx += size / 2;
                    onConnectStart(note.id, hx, hy);
                }}
            />
        );
    };

    const bindHandlers = bind() as any;

    if (showAsMinimalDot) {
        return (
            <div ref={noteRef} data-note-id={note.id} className="absolute top-0 left-0">
                <div
                    style={{
                        width: size * 0.2,
                        height: size * 0.2,
                        borderRadius: '50%',
                        background: note.color || visualColor || baseStyle.color || '#6366f1',
                        boxShadow: `0 0 10px ${note.color || visualColor || baseStyle.color || '#6366f1'}`,
                    }}
                />
            </div>
        );
    }

    return (
        <div ref={noteRef} data-note-id={note.id} className="absolute top-0 left-0 hover:z-50">
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
                    ...(note.color || visualColor ? {
                        boxShadow: `0 0 30px -5px ${visualColor || note.color}, inset 0 0 20px -5px ${visualColor || note.color}`,
                        borderColor: visualColor || note.color
                    } : {
                        borderColor: 'var(--mode-accent, rgba(255,255,255,0.5))',
                        boxShadow: '0 0 20px -5px var(--mode-accent, transparent)'
                    }),
                } as any}
                layoutId={`note-${note.id}`}
                initial={false}
                animate={{
                    width: size,
                    height: size,
                    scale: note.isDying ? (viewMode === 'orbital' ? 2.5 : 0) : (isFocused ? 1.2 : 1),
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
                {lod !== 'surface' && !isMajor && (
                    <div className="absolute inset-0 rounded-full bg-inherit" />
                )}
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
                    ref={textRef}
                    className={clsx(
                        "absolute inset-0 z-20 flex items-center justify-center text-center p-[15%]",
                        "whitespace-pre-wrap break-words outline-none",
                        showContent && isEditing ? "overflow-y-auto cursor-text px-2" : "cursor-pointer overflow-hidden"
                    )}
                    style={{
                        fontSize: 'inherit',
                        fontFamily: 'var(--mode-font)',
                        color: note.textColor || (designSystem === 'solar' ? '#1a1a1a' : 'white'),
                        textShadow: designSystem === 'solar' ? 'none' : '0 2px 4px rgba(0,0,0,0.5)',
                        lineHeight: 1.2
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
                {isEditing && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={async (e) => {
                            e.stopPropagation();
                            if (!note.title) return;
                            window.dispatchEvent(new CustomEvent('stardust:toast', { detail: { message: 'Expanding thought...', type: 'info' } }));
                            try {
                                const expanded = await planetExpander(note.title, note.content || '');
                                updateNote(note.id, { title: expanded });
                                if (textRef.current) textRef.current.innerText = expanded;
                                setIsEditing(false);
                            } catch (err: any) {
                                window.dispatchEvent(new CustomEvent('stardust:toast', { detail: { message: err.message, type: 'info' } }));
                            }
                        }}
                        className="absolute -top-10 right-0 p-2 rounded-full glass-panel border-purple-500/50 text-purple-400 hover:scale-110 transition-transform z-50 pointer-events-auto"
                        title="AI Expand (Planet Expander)"
                    >
                        <Sparkles size={16} />
                    </motion.button>
                )}
                {isSelected && (
                    <motion.div
                        layoutId="selection-ring"
                        className="selection-ring z-0 absolute inset-[-4px] rounded-full border-2 border-blue-400"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
                {isSelected && !isEditing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full glass-panel border-white/5 z-[100]"
                    >
                        {(
                            effectiveType === NoteType.Sun ? ['#f59e0b', '#ef4444', '#f87171', '#0ea5e9'] :
                                ['earth', 'venus', 'mars'].includes(effectiveType) ? ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#a855f7'] :
                                    ['jupiter', 'saturn'].includes(effectiveType) ? ['#eab308', '#d97706', '#78350f', '#f59e0b'] :
                                        ['#94a3b8', '#e2e8f0', '#ffffff', '#475569']
                        ).map(color => (
                            <button
                                key={color}
                                onClick={() => updateNote(note.id, { color })}
                                className="w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125 hover:border-white/50"
                                style={{ background: color }}
                            />
                        ))}
                    </motion.div>
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
    if (prev.isSelected !== next.isSelected) return false;
    if (prev.zoom !== next.zoom) return false;
    const pNote = prev.note;
    const nNote = next.note;
    if (pNote.x !== nNote.x || pNote.y !== nNote.y) return false;
    if (pNote.title !== nNote.title) return false;
    if (pNote.color !== nNote.color) return false;
    return true;
});
