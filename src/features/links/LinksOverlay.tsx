import React from 'react';
import { type Note, useStore } from '../../store/useStore';
import { NOTE_STYLES, NoteType } from '../../constants';

interface LinksOverlayProps {
    notes: Note[];
}

export const LinksOverlay: React.FC<LinksOverlayProps> = ({ notes }) => {
    const zoom = useStore((state) => state.viewport.zoom);

    const allLinks: { from: Note, to: Note }[] = [];

    notes.forEach(sourceNote => {
        if (sourceNote.links) {
            sourceNote.links.forEach(link => {
                const targetNote = notes.find(n => n.id === link.toId);
                if (targetNote) {
                    allLinks.push({ from: sourceNote, to: targetNote });
                }
            });
        }
    });

    if (allLinks.length === 0) return null;

    const getCenter = (note: Note) => {
        const style = NOTE_STYLES[note.type] || NOTE_STYLES[NoteType.Asteroid];
        const width = note.w || style.width;
        const height = note.h || style.height;
        return {
            x: note.x + width / 2,
            y: note.y + height / 2
        };
    };

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
                <marker
                    id="link-arrow"
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
            </defs>
            {allLinks.map((link, idx) => {
                const start = getCenter(link.from);
                const end = getCenter(link.to);

                // Offset end point by planet radius approx (roughly 50px for standard planets, scalable)
                // Using a safe estimate or could use actual radius if calculated.
                // Let's just draw to center for now but put marker slightly back?
                // SVG marker refX handles the offset somewhat. refX=10 puts it at tip.

                return (
                    <g key={`link-${idx}`} style={{ opacity: Math.max(0.4, Math.min(1, zoom)) }}>
                        <line
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            stroke="#38bdf8"
                            strokeWidth={1.5 / zoom}
                            strokeDasharray={`${6 / zoom},${4 / zoom}`}
                            markerEnd="url(#link-arrow)"
                        />
                    </g>
                );
            })}
        </svg>
    );
};
