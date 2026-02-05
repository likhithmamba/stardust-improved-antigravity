import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchTeleport: React.FC = () => {
    const isSearchOpen = useStore((state) => state.isSearchOpen);
    const setSearchOpen = useStore((state) => state.setSearchOpen);
    const notes = useStore((state) => state.notes);
    const setViewport = useStore((state) => state.setViewport);
    const setSelectedId = useStore((state) => state.setSelectedId);

    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery(''); // Clear on close? Optional.
        }
    }, [isSearchOpen]);

    if (!isSearchOpen) return null;

    const filteredNotes = notes.filter(n =>
        (n.title && n.title.toLowerCase().includes(query.toLowerCase())) ||
        (n.content && n.content.toLowerCase().includes(query.toLowerCase())) ||
        (n.type.toLowerCase().includes(query.toLowerCase()))
    );

    const handleTeleport = (note: typeof notes[0]) => {
        // Teleport logic
        // Center the note. Note coords are Top-Left (mostly).
        // Viewport x/y are translations.
        // To center note at screen center:
        // screenCenter = note.x * zoom + viewport.x
        // viewport.x = screenCenter - note.x * zoom
        // We want screenCenter to be window.w/2

        const targetZoom = 1; // Reset zoom or keep? Reset usually better for "finding".
        const w = window.innerWidth;
        const h = window.innerHeight;

        // Approximate center of note (if w/h available, else 0)
        const nw = note.w || 100; // fallback
        const nh = note.h || 100;

        const textX = -note.x * targetZoom + w / 2 - (nw * targetZoom) / 2;
        const textY = -note.y * targetZoom + h / 2 - (nh * targetZoom) / 2;

        setViewport({ x: textX, y: textY, zoom: targetZoom });

        setSelectedId(note.id);
        setSearchOpen(false);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32">
            <div
                className="absolute inset-0"
                onClick={() => setSearchOpen(false)}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative w-[600px] max-w-[90vw] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
            >
                {/* Header / Input */}
                <div className="flex items-center gap-3 p-4 border-b border-slate-800">
                    <Search className="text-slate-400" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search your universe..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setSearchOpen(false);
                        }}
                    />
                    <div className="text-xs text-slate-600 font-mono px-2 py-1 border border-slate-800 rounded">
                        ESC
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-2">
                    {filteredNotes.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            No matching celestial bodies found.
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredNotes.map(note => (
                                <button
                                    key={note.id}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 group transition-colors text-left"
                                    onClick={() => handleTeleport(note)}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 group-hover:bg-slate-700 border border-slate-700 text-xs`}>
                                        {/* Icon based on type? */}
                                        {note.type.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-slate-200 font-medium truncate">
                                            {note.title || 'Untitled Planet'}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate">
                                            {note.type} • {Math.round(note.x)}, {Math.round(note.y)}
                                        </div>
                                    </div>
                                    <div className="text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
                                        <MapPin size={16} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-950/50 p-2 text-[10px] text-slate-600 text-center border-t border-slate-800">
                    Pro Mode: Smart Navigation Active
                </div>
            </motion.div>
        </div>
    );
};
