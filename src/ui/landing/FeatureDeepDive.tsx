import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';

// --- Premium Bento Card Component (Wrapped in Tilt) ---
const BentoCard = ({
    title,
    subtitle,
    className,
    children,
    delay = 0
}: {
    title: string,
    subtitle: string,
    className?: string,
    children?: React.ReactNode,
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`${className}`}
    >
        <TiltCard className="h-full bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm" glowColor="rgba(139, 92, 246, 0.3)">
            <div className="p-8 flex flex-col h-full relative z-10">
                <div className="mb-6 pointer-events-none">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="font-body text-slate-400 leading-relaxed text-sm">{subtitle}</p>
                </div>

                <div className="flex-grow relative rounded-2xl bg-black/20 border border-white/5 overflow-hidden">
                    {children}
                </div>
            </div>
        </TiltCard>
    </motion.div>
);

// --- Simulations (Preserved & Enhanced) ---

const NebulaSimulation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        let width = canvas.width;
        let height = canvas.height;

        const particles: { x: number, y: number, vx: number, vy: number, s: number }[] = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                s: Math.random() * 2 + 1
            });
        }

        let afId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Nebular Gas (Gradient Blobs)
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.8);
            gradient.addColorStop(0, "rgba(79, 70, 229, 0.2)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(165, 180, 252, ${0.5 + Math.random() * 0.5})`;
                ctx.fill();
            });
            afId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(afId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export const FeatureDeepDive: React.FC = () => {
    return (
        <section className="py-32 px-4 relative bg-black overflow-hidden font-body">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="font-display text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight">
                        Infinite Space. <span className="text-gradient-cosmic">Zero Friction.</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Features designed for the speed of thought.
                        Stardust removes the cognitive load of file management.
                    </p>
                </motion.div>

                {/* --- BENTO GRID LAYOUT --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-6 h-auto md:h-[900px]">

                    {/* 1. Large Main Feature: Infinite Canvas */}
                    <BentoCard
                        title="The Infinite Canvas"
                        subtitle="A workspace without edges. Map complex systems without ever running out of room."
                        className="md:col-span-2 md:row-span-2"
                        delay={0.1}
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="absolute inset-0 grid-bg opacity-30 animate-pan-diagonal"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                                    backgroundSize: '40px 40px'
                                }}
                            />
                            {/* Central Element */}
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-40 animate-pulse" />
                                <div className="absolute inset-0 border border-white/20 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                                </div>
                                {/* Orbiting Elements */}
                                <div className="absolute w-48 h-48 border border-white/10 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
                            </div>
                        </div>
                    </BentoCard>

                    {/* 2. Semantic Gravity */}
                    <BentoCard
                        title="Semantic Gravity"
                        subtitle="Physics-based organization. Related concepts drift together."
                        className="md:col-span-1 md:row-span-1"
                        delay={0.2}
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-20 h-20 rounded-full border border-orange-400/30 flex items-center justify-center relative animate-float">
                                <div className="w-6 h-6 bg-orange-400 rounded-full shadow-[0_0_15px_orange]" />
                            </div>
                        </div>
                    </BentoCard>

                    {/* 3. Neural Links */}
                    <BentoCard
                        title="Neural Links"
                        subtitle="Connect thoughts instantly. Build a living network."
                        className="md:col-span-1 md:row-span-1"
                        delay={0.3}
                    >
                        <svg className="absolute inset-0 w-full h-full p-6 pointer-events-none" viewBox="0 0 100 100" overflow="visible">
                            <path d="M 20 50 Q 50 20 80 50" stroke="url(#lineGrad)" strokeWidth="3" fill="none" strokeDasharray="4 4" className="animate-pulse" />
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stopColor="#a855f7" />
                                    <stop offset="1" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                            <circle cx="20" cy="50" r="4" fill="#a855f7" />
                            <circle cx="80" cy="50" r="4" fill="#3b82f6" />
                        </svg>
                    </BentoCard>

                    {/* 4. Nebula Mode (Visual Simulation) */}
                    <BentoCard
                        title="Nebula Simulation"
                        subtitle="Fluid systems that react to your ideas."
                        className="md:col-span-2 md:row-span-1"
                        delay={0.4}
                    >
                        <NebulaSimulation />
                    </BentoCard>

                    {/* 5. Local First */}
                    <BentoCard
                        title="Local Velocity"
                        subtitle="Zero latency. 100% Privacy. 0ms Delay."
                        className="md:col-span-2 md:row-span-1"
                        delay={0.5}
                    >
                        <div className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-300 to-green-600">0ms</span>
                                <span className="text-xs text-green-500/50 uppercase tracking-widest mt-1">Latency</span>
                            </div>
                            <div className="h-12 w-[1px] bg-white/10" />
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-600">100%</span>
                                <span className="text-xs text-blue-500/50 uppercase tracking-widest mt-1">Offline</span>
                            </div>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
};
