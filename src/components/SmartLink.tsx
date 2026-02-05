import React, { useEffect, useRef } from 'react';
import type { EngineConnection, EngineNote } from '../engine/types/EngineTypes';
import { visualRegistry } from '../engine/render/VisualRegistry';
import { useStore } from '../store/useStore';

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

    // Initial Path Calculation (Stateless render fallback)
    const sx = source.x + (source.w || 0) / 2;
    const sy = source.y + (source.h || 0) / 2;
    const tx = target.x + (target.w || 0) / 2;
    const ty = target.y + (target.h || 0) / 2;

    // Midpoint for Label (React-driven, might lag slightly behind physics, but acceptable)
    // To fix lag: VisualRegistry would need to update this element too.
    const midX = (sx + tx) / 2;
    const midY = (sy + ty) / 2;
    const label = connection.label || '';

    return (
        <g className="smart-link group">
            {/* Glow */}
            <path
                d={`M ${sx} ${sy} L ${tx} ${ty}`} // Initial draw
                fill="none"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth={4}
                className="blur-[4px] transition-colors group-hover:stroke-purple-400/50"
            />
            {/* Core Line (Driven by VisualRegistry) */}
            <path
                ref={pathRef}
                d={`M ${sx} ${sy} L ${tx} ${ty}`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth={1}
                strokeDasharray={label ? "5,5" : "none"}
            />

            {/* Label Input */}
            <foreignObject x={midX - 70} y={midY - 14} width={140} height={28} className="overflow-visible pointer-events-auto">
                <div className="flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <input
                        type="text"
                        defaultValue={label}
                        placeholder="Link..."
                        onBlur={(e) => updateConnection(connection.id, { label: e.target.value })}
                        className="w-20 bg-black/60 border border-white/10 rounded-l-full text-[10px] text-center text-white placeholder-white/30 px-2 py-0.5 outline-none focus:border-purple-500 transition-colors backdrop-blur-sm shadow-lg pointer-events-auto select-none"
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeConnection(connection.id);
                        }}
                        className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-200 rounded-r-full p-0.5 px-2 h-full flex items-center justify-center transition-colors backdrop-blur-sm shadow-lg pointer-events-auto"
                    >
                        ×
                    </button>
                </div>
            </foreignObject>
        </g>
    );
};
