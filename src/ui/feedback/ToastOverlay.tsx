import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Check, Zap } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'ultra';
}

export const ToastOverlay: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const handleToast = (e: any) => {
            const { message, type = 'info' } = e.detail;
            const id = Math.random().toString(36).substr(2, 9);
            setToasts(prev => [...prev, { id, message, type }]);

            // Auto dismiss
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        };

        window.addEventListener('stardust:toast', handleToast);
        return () => window.removeEventListener('stardust:toast', handleToast);
    }, []);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map(toast => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md border 
                            ${toast.type === 'ultra' ? 'bg-black/80 border-purple-500/50 text-purple-200' :
                                toast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' :
                                    'bg-slate-900/80 border-white/10 text-slate-200'}
                        `}
                    >
                        {toast.type === 'ultra' && <Zap size={16} className="text-purple-400" />}
                        {toast.type === 'success' && <Check size={16} className="text-emerald-400" />}
                        {toast.type === 'info' && <Info size={16} className="text-slate-400" />}

                        <span className="text-sm font-medium">{toast.message}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
