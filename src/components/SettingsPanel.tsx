import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { saveApiKey, getApiKey } from '../utils/ai';
import { X, Check, Globe, Zap, Layout, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { useSettingsStore } from '../ui/settings/settingsStore';

export const SettingsPanel: React.FC = () => {
    const isSettingsOpen = useStore((state) => state.isSettingsOpen);
    const setSettingsOpen = useStore((state) => state.setSettingsOpen);

    // Migrated to SettingsStore
    // Toggles
    const showHierarchy = useSettingsStore((state) => state.showHierarchy);
    const setToggle = useSettingsStore((state) => state.setToggle);

    const showLinks = useSettingsStore((state) => state.showLinks);
    const toolbarMode = useSettingsStore((state) => state.toolbarMode);
    const setToolbarMode = (mode: 'fixed' | 'auto-hide' | 'collapsed') => useSettingsStore.getState().setToggle('toolbarMode', mode);
    const toolbarSkin = useStore((state) => state.toolbarSkin);

    // Physics Engine Controls
    const currentViewMode = useStore((state) => state.viewMode);
    const setViewMode = useStore((state) => state.setViewMode);

    // Helpers to bridge the UI logic + Feedback
    const dispatchToast = (msg: string, type: 'info' | 'success' | 'ultra' = 'info') => {
        window.dispatchEvent(new CustomEvent('stardust:toast', {
            detail: { message: msg, type }
        }));
    };

    const setShowHierarchy = (val: boolean) => {
        setToggle('showHierarchy', val);
    };
    const setShowLinks = (val: boolean) => {
        setToggle('showLinks', val);
    };

    // Legacy visual props still in useStore for now if not in SettingsStore layout
    const showMinimap = useStore((state) => state.showMinimap);
    const setShowMinimap = useStore((state) => state.setShowMinimap);
    const showConnections = useStore((state) => state.showConnections);
    const setShowConnections = useStore((state) => state.setShowConnections);

    // Legacy/Visual State still in useStore
    const theme = useStore((state) => state.theme);
    const setTheme = useStore((state) => state.setTheme);
    const setToolbarSkin = useStore((state) => state.setToolbarSkin);

    const [apiKey, setApiKey] = useState('');
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState<'general' | 'features' | 'visuals' | 'templates'>('features');

    useEffect(() => {
        if (isSettingsOpen) {
            getApiKey('default').then(key => {
                if (key) setApiKey(key);
            });
        }
    }, [isSettingsOpen]);

    const handleSave = async () => {
        await saveApiKey(apiKey, 'default');
        setStatus('Saved!');
        setTimeout(() => setStatus(''), 2000);
    };

    const handleSetViewMode = (mode: 'free' | 'prism' | 'stream' | 'orbital') => {
        setViewMode(mode);
        dispatchToast(`Switched to ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`, 'success');
        // We can optionally close settings or keep them open
        // setSettingsOpen(false); 
    };

    if (!isSettingsOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-auto">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer" onClick={() => setSettingsOpen(false)} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-[#0B0C15]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col max-h-[80vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Stardust <span className="text-purple-400">Settings</span>
                    </h2>
                    <button
                        onClick={() => setSettingsOpen(false)}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-4 border-b border-white/5 overflow-x-auto custom-scrollbar">
                    <TabButton
                        id="features"
                        label="Features"
                        icon={Zap}
                        isActive={activeTab === 'features'}
                        onClick={() => setActiveTab('features')}
                    />
                    <TabButton
                        id="visuals"
                        label="Visuals"
                        icon={Eye}
                        isActive={activeTab === 'visuals'}
                        onClick={() => setActiveTab('visuals')}
                    />
                    <TabButton
                        id="templates"
                        label="Views"
                        icon={Sparkles}
                        isActive={activeTab === 'templates'}
                        onClick={() => setActiveTab('templates')}
                    />
                    <TabButton
                        id="general"
                        label="System"
                        icon={Layout}
                        isActive={activeTab === 'general'}
                        onClick={() => setActiveTab('general')}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">

                    {activeTab === 'features' && (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                            <Zap size={48} className="mb-4 opacity-20" />
                            <h3 className="text-lg font-medium text-slate-400">All Systems Operational</h3>
                            <p className="text-sm max-w-xs mx-auto mt-2">
                                Pro and Ultra features are enabled by default for the best experience.
                            </p>
                        </div>
                    )}

                    {activeTab === 'visuals' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Interface</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Toggle
                                        label="Minimap"
                                        checked={showMinimap}
                                        onChange={setShowMinimap}
                                    />
                                    <Toggle
                                        label="Wire Connections"
                                        description="Manual lines between planets"
                                        checked={showConnections}
                                        onChange={setShowConnections}
                                    />
                                    <Toggle
                                        label="Smart Links"
                                        description="Auto-generated relationships"
                                        checked={showLinks}
                                        onChange={setShowLinks}
                                    />
                                    <Toggle
                                        label="Hierarchy Lines"
                                        description="Visual parent-child curves"
                                        checked={showHierarchy}
                                        onChange={setShowHierarchy}
                                    />
                                    <Toggle
                                        label="Glass Toolbar"
                                        description="Enable premium translucent skin"
                                        checked={toolbarSkin}
                                        onChange={setToolbarSkin}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Toolbar Behavior</h3>
                                <div className="flex gap-3">
                                    {['fixed', 'auto-hide', 'collapsed'].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setToolbarMode(m as any)}
                                            className={clsx(
                                                "px-4 py-3 rounded-xl border text-sm font-medium transition-all flex-1",
                                                toolbarMode === m
                                                    ? "bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                            )}
                                        >
                                            {m.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Theme</h3>
                                <div className="flex gap-3">
                                    {['default', 'cyberpunk', 'zen'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTheme(t as any)}
                                            className={clsx(
                                                "px-4 py-3 rounded-xl border text-sm font-medium transition-all flex-1",
                                                theme === t
                                                    ? "bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                            )}
                                        >
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'templates' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">View Modes</h3>
                                <p className="text-xs text-slate-400 mb-4">Switch your mental model. Your notes stay; the physics change.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <ViewCard
                                        id="free"
                                        label="Free Space"
                                        description="Standard infinite canvas. Drifting physics."
                                        active={currentViewMode === 'free'}
                                        onClick={() => handleSetViewMode('free')}
                                    />
                                    <ViewCard
                                        id="prism"
                                        label="Prism"
                                        description="Auto-sorts notes into columns by color/tag."
                                        active={currentViewMode === 'prism'}
                                        onClick={() => handleSetViewMode('prism')}
                                    />
                                    <ViewCard
                                        id="stream"
                                        label="Stream"
                                        description="Timeline view based on creation date."
                                        active={currentViewMode === 'stream'}
                                        onClick={() => handleSetViewMode('stream')}
                                    />
                                    <ViewCard
                                        id="orbital"
                                        label="Orbital"
                                        description="Radial gravity based on importance."
                                        active={currentViewMode === 'orbital'}
                                        onClick={() => handleSetViewMode('orbital')}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-400 text-sm mb-2 font-medium">Google Gemini API Key</label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-purple-500 focus:bg-white/10 transition-colors"
                                        placeholder="Enter key for AI features..."
                                    />
                                    <button
                                        onClick={handleSave}
                                        className="px-6 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
                                    >
                                        Save
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    {status ? <span className="text-green-400 flex items-center gap-1"><Check size={12} /> {status}</span> : "Key is stored locally securely."}
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <h4 className="flex items-center gap-2 text-purple-300 font-bold mb-2">
                                    <Globe size={16} />
                                    Stardust v2.1
                                </h4>
                                <p className="text-xs text-purple-200/60 leading-relaxed mb-4">
                                    Running on React, Vite & Zustand. <br />
                                    Performance optimized for infinite canvas interaction.
                                </p>

                                {/* Persistence Controls */}
                                <div className="border-t border-purple-500/10 pt-4 flex gap-2">
                                    <button
                                        onClick={() => useStore.getState().exportData?.()}
                                        className="flex-1 py-2 px-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-xs font-medium text-purple-200 flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Check size={12} />
                                        Save to File
                                    </button>
                                    <button
                                        onClick={() => useStore.getState().importData?.()}
                                        className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-slate-300 flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Load from File
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-2 text-center">
                                    Saves as .stardust (JSON). Unlimited local storage.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </motion.div>
        </div>
    );
};

// Moved components outside to prevent re-renders breaking focus/clicks
const TabButton = ({ label, icon: Icon, isActive, onClick }: any) => (
    <button
        onClick={onClick}
        type="button"
        className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            isActive
                ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
    >
        <Icon size={16} />
        {label}
    </button>
);

const Toggle = ({ label, description, checked, onChange }: any) => (
    <label className="flex items-start justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
        <div>
            <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{label}</div>
            {description && <div className="text-[10px] text-slate-500">{description}</div>}
        </div>
        <div className={clsx(
            "w-10 h-5 rounded-full relative transition-colors duration-300 mt-1",
            checked ? "bg-purple-500" : "bg-slate-700"
        )}>
            <div className={clsx(
                "absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300",
                checked ? "translate-x-5" : "translate-x-0"
            )} />
            <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        </div>
    </label>
);

const ViewCard = ({ label, description, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={clsx(
            "text-left group flex flex-col p-4 rounded-xl border transition-all active:scale-[0.98]",
            active
                ? "bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
        )}
    >
        <div className="flex items-center justify-between w-full mb-1">
            <span className={clsx(
                "text-sm font-bold transition-colors",
                active ? "text-purple-300" : "text-white group-hover:text-purple-200"
            )}>
                {label}
            </span>
            {active && <Check size={14} className="text-purple-400" />}
        </div>
        <span className="text-xs text-slate-400 group-hover:text-slate-300">
            {description}
        </span>
    </button>
);

