import React, { useEffect, useRef } from 'react';
import type { EngineConnection, EngineNote } from '../engine/types/EngineTypes';
import { visualRegistry } from '../engine/render/VisualRegistry';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface SmartLinkProps {
    connection: EngineConnection;
    source: EngineNote;
    target: EngineNote;
}

export const SmartLink: React.FC<SmartLinkProps> = ({ connection, source, target }) => {
    const pathRef = useRef<SVGPathElement>(null);
    const updateConnection = useStore((state) => state.updateConnection);
    const removeConnection = useStore((state) => state.removeConnection);

    useEffect(() => {
        if (pathRef.current) {
            visualRegistry.registerConnection(connection.id, pathRef.current);
        }
        return () => {
            visualRegistry.unregisterConnection(connection.id);
        };
    }, [connection.id]);

    // Calculate Handle Nodes (Top, Right, Bottom, Left)
    const getHandles = (node: EngineNote) => {
        const cx = node.x + (node.w || 0) / 2;
        const cy = node.y + (node.h || 0) / 2;
        const r = (node.w || 0) / 2;
        return [
            { x: cx, y: cy - r }, // Top
            { x: cx + r, y: cy }, // Right
            { x: cx, y: cy + r }, // Bottom
            { x: cx - r, y: cy }  // Left
        ];
    };

    // Find closest handles for stable initial/fallback render
    const sourceHandles = getHandles(source);
    const targetHandles = getHandles(target);

    let bestDist = Infinity;
    let sx = source.x + (source.w || 0) / 2;
    let sy = source.y + (source.h || 0) / 2;
    let tx = target.x + (target.w || 0) / 2;
    let ty = target.y + (target.h || 0) / 2;

    sourceHandles.forEach(sh => {
        targetHandles.forEach(th => {
            const dx = sh.x - th.x;
            const dy = sh.y - th.y;
            const d = dx * dx + dy * dy;
            if (d < bestDist) {
                bestDist = d;
                sx = sh.x;
                sy = sh.y;
                tx = th.x;
                ty = th.y;
            }
        });
    });

    const midX = (sx + tx) / 2;
    const midY = (sy + ty) / 2;
    const label = connection.label || '';

    return (
        <g className="smart-link group">
            {/* Glow Path (Subtle) */}
            <path
                d={`M ${sx} ${sy} L ${tx} ${ty}`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={6}
                className="blur-[8px]"
            />

            {/* Core Dotted Line (Visual Registry will update 'd' attribute directly) */}
            <path
                ref={pathRef}
                d={`M ${sx} ${sy} L ${tx} ${ty}`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth={1.5}
                strokeDasharray="6,4"
                strokeLinecap="round"
                className="transition-colors group-hover:stroke-blue-400"
            />

            {/* Premium Pill Label */}
            <foreignObject
                x={midX - 50}
                y={midY - 12}
                width={100}
                height={24}
                className="overflow-visible pointer-events-auto"
            >
                <div className="flex items-center justify-center h-full">
                    <div className={clsx(
                        "flex items-center gap-1 px-3 py-1 rounded-full",
                        "bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl",
                        "transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-105",
                        !label && "opacity-0 group-hover:opacity-100" // Hide if empty unless hovered
                    )}>
                        <input
                            type="text"
                            defaultValue={label}
                            placeholder="Link..."
                            onBlur={(e) => updateConnection(connection.id, { label: e.target.value })}
                            className="bg-transparent text-[10px] text-white text-center w-full outline-none placeholder-white/20 font-medium"
                            onPointerDown={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeConnection(connection.id);
                            }}
                            className="text-white/40 hover:text-red-400 p-0.5 rounded-full transition-colors"
                            title="Remove Link"
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </foreignObject>
        </g>
    );
};
