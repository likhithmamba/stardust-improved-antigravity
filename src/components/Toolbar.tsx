import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useSettingsStore } from '../ui/settings/settingsStore';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Plus,
    Trash2,
    Palette,
    Layout,
    Search,
    Settings
} from 'lucide-react';
import { NoteType, NOTE_STYLES } from '../constants';
import clsx from 'clsx';

export const Toolbar: React.FC = () => {
    const addNote = useStore((state) => state.addNote);
    const viewport = useStore((state) => state.viewport);
    const setNotes = useStore((state) => state.setNotes);
    const setConnections = useStore((state) => state.setConnections);
    const toolbarMode = useSettingsStore((state) => state.toolbarMode);

    const [isHovered, setHovered] = useState(false);
    const hoverTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => {
            setHovered(true);
        }, 300); // 300ms delay to prevent accidental triggers
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        // Small delay before hiding to smooth out jitter
        hoverTimer.current = setTimeout(() => {
            setHovered(false);
        }, 100);
    };

    // UI Toggles
    const scaleMode = useStore((state) => state.scaleMode);
    const setScaleMode = useStore((state) => state.setScaleMode);

    // Theme State
    const [showThemeMenu, setShowThemeMenu] = React.useState(false);

    // Search State
    const isSearchOpen = useStore((state) => state.isSearchOpen);
    const setSearchOpen = useStore((state) => state.setSearchOpen);
    const isSettingsOpen = useStore((state) => state.isSettingsOpen);

    // Keybinds (Ctrl+K)
    React.useEffect(() => {
        const handleDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen(!isSearchOpen);
            }
        };
        window.addEventListener('keydown', handleDown);
        return () => window.removeEventListener('keydown', handleDown);
    }, [isSearchOpen, setSearchOpen]);

    // Selection State for Theme editing
    const selectedId = useStore((state) => state.selectedId);
    const updateNote = useStore((state) => state.updateNote);
    const notes = useStore((state) => state.notes);
    const selectedNote = notes.find(n => n.id === selectedId);

    const handleAddSun = () => {
        // Center on screen
        const x = -viewport.x / viewport.zoom + window.innerWidth / (2 * viewport.zoom) - 100;
        const y = -viewport.y / viewport.zoom + window.innerHeight / (2 * viewport.zoom) - 50;

        addNote({
            id: Math.random().toString(36).substr(2, 9),
            x,
            y,
            w: 800,
            h: 800,
            type: NoteType.Sun,
            title: 'The Sun',
            color: NOTE_STYLES[NoteType.Sun].color
        });
    };

    const handleClear = () => {
        if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
            setNotes([]);
            setConnections([]);
        }
    };

    const isCollapsed = toolbarMode === 'collapsed' && !isHovered;
    const isHidden = toolbarMode === 'auto-hide' && !isHovered;

    return (
        <>
            {/* Hover Trigger for Auto-Hide Mode */}
            {toolbarMode === 'auto-hide' && (
                <div
                    className="fixed bottom-0 left-0 right-0 h-16 z-[899] bg-transparent"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            )}

            <motion.div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[900] pointer-events-auto flex flex-col items-center"
                initial={false}
                animate={{
                    y: isHidden ? 120 : 0,
                    opacity: isHidden ? 0 : 1,
                    scale: isCollapsed ? 0.9 : 1,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Theme Menu Popover - Floats above */}
                <div className="relative w-full flex justify-center">
                    <AnimatePresence>
                        {showThemeMenu && !isCollapsed && (
                            <motion.div
                                key="theme-menu"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full mb-4 p-4 rounded-2xl bg-[#0F1018]/90 border border-white/10 w-72 backdrop-blur-2xl shadow-2xl origin-bottom"
                            >
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4 text-center">Appearance Control</h3>

                                {/* Global Theme */}
                                <div className="mb-4 pb-4 border-b border-white/10">
                                    <label className="text-[10px] text-white/40 mb-2 block text-center">Global Theme</label>
                                    <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                                        {['default', 'cyberpunk', 'zen'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => useStore.getState().setTheme(t as any)}
                                                className={clsx(
                                                    "flex-1 py-1.5 text-[10px] uppercase tracking-wide font-medium rounded-md transition-all",
                                                    useStore.getState().theme === t ? "bg-purple-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                                                )}
                                            >
                                                {t.charAt(0).toUpperCase() + t.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {selectedNote ? (
                                    <div className="space-y-4">
                                        {/* Object Controls */}
                                        <div>
                                            <div className="flex bg-white/5 rounded-lg p-1">
                                                {['sans', 'serif', 'mono'].map(fam => (
                                                    <button
                                                        key={fam}
                                                        onClick={() => updateNote(selectedNote.id, { fontFamily: fam as any })}
                                                        className={clsx(
                                                            "flex-1 py-1.5 text-[10px] uppercase tracking-wide font-medium rounded-md transition-all",
                                                            selectedNote.fontFamily === fam ? "bg-purple-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                                                        )}
                                                    >
                                                        {fam}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] text-white/40 mb-2 block text-center">Size</label>
                                            <input
                                                type="range"
                                                min="12"
                                                max="64"
                                                value={selectedNote.fontSize || 16}
                                                onChange={(e) => updateNote(selectedNote.id, { fontSize: parseInt(e.target.value) })}
                                                className="w-full accent-purple-500/80 h-1 bg-white/10 rounded-full appearance-none"
                                            />
                                        </div>

                                        <div className="flex justify-center gap-2">
                                            {[
                                                { name: 'White', code: '#ffffff', bg: 'bg-white' },
                                                { name: 'Red', code: '#fecaca', bg: 'bg-red-300' },
                                                { name: 'Amber', code: '#fde68a', bg: 'bg-amber-300' },
                                                { name: 'Blue', code: '#bfdbfe', bg: 'bg-blue-300' },
                                                { name: 'Purple', code: '#d8b4fe', bg: 'bg-purple-300' }
                                            ].map(c => (
                                                <button
                                                    key={c.name}
                                                    onClick={() => updateNote(selectedNote.id, { textColor: c.code })}
                                                    className={clsx(
                                                        "w-6 h-6 rounded-full border-2 transition-all hover:scale-110",
                                                        c.bg,
                                                        selectedNote.textColor === c.code ? "border-purple-500 scale-110 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "border-transparent opacity-80"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 text-center py-2 italic font-serif">Select an object to customize.</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Toolbar Pill */}
                <motion.div
                    layout
                    className={clsx(
                        "ui-interactive-area flex items-center gap-2 px-3 py-2.5 rounded-full bg-[#0F1018]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:border-white/20 hover:bg-[#0F1018]/90 hover:shadow-[0_8px_32px_rgba(168,85,247,0.1)]",
                        isCollapsed && "px-2 py-2"
                    )}
                >

                    {/* Collapsed Logic: Hide most items */}
                    {(!isCollapsed) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, width: 0 }}
                            animate={{ opacity: 1, scale: 1, width: 'auto' }}
                            exit={{ opacity: 0, scale: 0.9, width: 0 }}
                            className="flex items-center gap-2 overflow-hidden"
                        >
                            <Button
                                onClick={() => setSearchOpen(true)}
                                icon={Search}
                                title="Search"
                                active={isSearchOpen}
                            />

                            <div className="w-px h-6 bg-white/5 mx-1" />

                            <Button
                                onClick={() => setShowThemeMenu(!showThemeMenu)}
                                icon={Palette}
                                title="Appearance"
                                active={showThemeMenu}
                            />

                            <Button
                                onClick={handleAddSun}
                                icon={Plus}
                                title="Add Sun"
                                highlight
                            />

                            <Button onClick={handleClear} icon={Trash2} title="Clear" />

                            <div className="w-px h-6 bg-white/5 mx-1" />

                            <Button
                                onClick={() => setScaleMode(scaleMode === 'real' ? 'compact' : 'real')}
                                icon={Layout}
                                active={scaleMode === 'real'}
                                title="Layout Mode"
                            />
                        </motion.div>
                    )}

                    <Button
                        onClick={() => useStore.getState().setSettingsOpen(true)}
                        icon={Settings}
                        title="Settings"
                        active={isSettingsOpen}
                    />
                </motion.div>
            </motion.div>
        </>
    );
};

// Updated Button Component
const Button = ({ onClick, icon: Icon, title, active, highlight }: any) => (
    <button
        onClick={onClick}
        title={title}
        className={clsx(
            "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group",
            active
                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "text-slate-400 hover:text-white hover:bg-white/5",
            highlight && !active && "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200 border border-purple-500/30"
        )}
    >
        <Icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
        {active && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-purple-400 box-shadow-[0_0_5px_currentColor]" />
        )}
    </button>
);
