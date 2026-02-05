import React from 'react';
import { type Note, useStore } from '../../store/useStore';
import { NOTE_STYLES, NoteType } from '../../constants';

interface HierarchyOverlayProps {
    notes: Note[];
}

export const HierarchyOverlay: React.FC<HierarchyOverlayProps> = ({ notes }) => {
    const zoom = useStore((state) => state.viewport.zoom);

    // Filter relationships
    const relationships = notes.filter(n => n.parentId).map(child => {
        const parent = notes.find(p => p.id === child.parentId);
        if (!parent) return null;
        return { child, parent };
    }).filter(pair => pair !== null) as { child: Note, parent: Note }[];

    if (relationships.length === 0) return null;

    const getCenter = (note: Note) => {
        // Use actual dimension if available (from resized notes), else fallback to style default
        // If scaleMode is active, this logic might need shared helpers, but for now we assume standard size logic
        const style = NOTE_STYLES[note.type] || NOTE_STYLES[NoteType.Asteroid];
        const width = note.w || style.width;
        const height = note.h || style.height;
        return {
            x: note.x + width / 2,
            y: note.y + height / 2
        };
    };

    // calculate opacity based on zoom.
    // If zoomed out very far (zoom < 0.2), fade out to reduce clutter? 
    // Or if zoomed in very close? The prompt says "fade with zoom distance".
    // Let's assume less opacity when zoomed out to reduce noise.
    const opacity = Math.min(1, Math.max(0.2, zoom));

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <defs>
                <filter id="glow-hierarchy" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            {relationships.map(({ child, parent }) => {
                const childCenter = getCenter(child);
                const parentCenter = getCenter(parent);

                // Quadratic Bezier: Control point is midpoint with Y offset to create arc
                // This makes it look like a celestial orbit or gravity line
                const midY = (childCenter.y + parentCenter.y) / 2;

                // Perpendicular offset
                // Normalize vector (-dy, dx)
                // const perpX = -dy / dist;
                // const perpY = dx / dist;
                // const curveAmount = dist * 0.2; // 20% of distance is curvature

                // Keep it simpler: straight line with subtle S-curve (cubic bezier) looks more modern than simple arc
                // C startingX, startingY, endingX, endingY

                return (
                    <g key={`${child.id}-${parent.id}`} style={{ opacity }}>
                        <path
                            d={`M ${childCenter.x} ${childCenter.y} 
                               C ${childCenter.x} ${midY} 
                                 ${parentCenter.x} ${midY} 
                                 ${parentCenter.x} ${parentCenter.y}`}
                            fill="none"
                            stroke="rgba(168, 85, 247, 0.4)" // Purple-500 equivalent, subtle
                            strokeWidth={2 / zoom} // Keep constant visual thickness
                            strokeDasharray={`${5 / zoom},${5 / zoom}`}
                            filter="url(#glow-hierarchy)"
                            className="transition-opacity duration-300"
                        />
                    </g>
                );
            })}
        </svg>
    );
};
