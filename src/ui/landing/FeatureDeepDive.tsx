import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, className, children, delay }: { title: string, description: string, className?: string, children?: React.ReactNode, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(168,85,247,0.15)" }}
        className={`bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col overflow-hidden hover:border-purple-500/30 transition-all duration-300 group ${className}`}
    >
        <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
        <div className="flex-grow relative rounded-xl bg-black/20 overflow-hidden border border-white/5 group-hover:border-purple-500/20 transition-colors">
            {children}
        </div>
    </motion.div>
);

// --- Elite Motion Simulations (Kept as Visual Anchors) ---

const NebulaSimulation = () => {
    // Interactive Nebula: Particles react to mouse
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

        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });

        let afId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Nebular Gas (Gradient Blobs)
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.8);
            gradient.addColorStop(0, "rgba(79, 70, 229, 0.1)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                // Fluiddynamics-ish: repelled by mouse
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    p.vx += (dx / dist) * force * 0.5;
                    p.vy += (dy / dist) * force * 0.5;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Friction & Boundary
                p.vx *= 0.98;
                p.vy *= 0.98;

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
        return () => {
            cancelAnimationFrame(afId);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="h-48 bg-indigo-950/20 rounded-lg relative overflow-hidden border border-indigo-500/10">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
        </div>
    );
};

const ConstellationSimulation = () => {
    // Structured Mode: Orbiting grid
    return (
        <div className="h-48 bg-amber-950/10 rounded-lg relative overflow-hidden flex items-center justify-center border border-amber-500/10">
            {/* Grid Background */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Central Sun */}
            <div className="w-6 h-6 bg-amber-500 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)] z-10 relative">
                <div className="absolute inset-0 bg-white rounded-full opacity-50 blur-sm" />
            </div>

            {/* Orbits */}
            <div className="absolute w-32 h-32 border border-amber-500/20 rounded-full" />
            <div className="absolute w-60 h-60 border border-amber-500/10 rounded-full" />

            {/* Orbiting Planets with connectors */}
            <motion.div
                className="absolute w-32 h-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-3 h-3 bg-amber-300 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_10px_orange]" />
            </motion.div>

            <motion.div
                className="absolute w-60 h-60"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-4 h-4 bg-amber-600 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 border border-amber-300" />
            </motion.div>
        </div>
    );
};

const TemplateShowcase = () => {
    return (
        <div className="mt-40">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h3 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tighter">Modes of Thought</h3>
                <p className="text-slate-500 text-xl font-light">Switch instantly between free-flow and structure.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nebula Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-[2rem] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <h4 className="text-3xl font-bold text-white mb-2">Nebula Mode</h4>
                    <p className="text-xs text-indigo-400 mb-6 font-mono uppercase tracking-widest">Unbounded</p>
                    <p className="text-slate-400 mb-8 font-light leading-relaxed text-lg">
                        A limitless playground for brainstorming. No grids, no lists—just raw connection.
                    </p>
                    <NebulaSimulation />
                </motion.div>

                {/* Constellation Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/50 transition-all duration-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <h4 className="text-3xl font-bold text-white mb-2">Constellation Mode</h4>
                    <p className="text-xs text-amber-400 mb-6 font-mono uppercase tracking-widest">Structured</p>
                    <p className="text-slate-400 mb-8 font-light leading-relaxed text-lg">
                        Automated organization. Stardust detects patterns and arranges your ideas into coherent systems.
                    </p>
                    <ConstellationSimulation />
                </motion.div>
            </div>
        </div>
    )
}

export const FeatureDeepDive: React.FC = () => {
    return (
        <section className="py-32 px-4 relative bg-black overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-purple-900/10 blur-[150px] rounded-full sm:opacity-50 opacity-20" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full sm:opacity-50 opacity-20" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tighter">
                        Infinite Space. <span className="font-bold">Zero Friction.</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Stardust removes the cognitive load of file management, letting you focus entirely on the velocity of your ideas.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">

                    {/* Feature 1: Infinite Cosmos (Main) */}
                    <FeatureCard
                        title="The Infinite Canvas"
                        description="A workspace without edges. Map complex systems without ever running out of room."
                        className="md:col-span-2"
                        delay={0}
                    >
                        {/* Mini Sim: Pan/Zoom Grid */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute inset-0 grid-bg opacity-30 animate-pan-diagonal"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                    backgroundSize: '30px 30px'
                                }}
                            />
                            <div className="w-20 h-20 rounded-full bg-purple-500 blur-xl absolute animate-pulse" />
                            <div className="w-16 h-16 rounded-full bg-white relative z-10 shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-transform hover:scale-110 duration-500" />
                        </div>
                    </FeatureCard>

                    {/* Feature 2: Gravity (Physics) */}
                    <FeatureCard
                        title="Semantic Gravity"
                        description="Related concepts naturally drift together. Let the physics engine organize your mess."
                        delay={0.2}
                    >
                        {/* Mini Sim: Orbiting planets */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] z-10" />
                            <div className="absolute w-32 h-32 border border-white/20 rounded-full animate-spin-slow flex items-center justify-center group-hover:border-white/40 transition-colors">
                                <div className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] absolute -top-2" />
                            </div>
                            <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-spin-reverse flex items-center justify-center group-hover:border-white/30 transition-colors">
                                <div className="w-3 h-3 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.8)] absolute -bottom-1.5" />
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Feature 3: Neural Links */}
                    <FeatureCard
                        title="Dynamic Linking"
                        description="Create living connections between thoughts. Build a neural network, not a list."
                        delay={0.3}
                    >
                        <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 100" overflow="visible">
                            <motion.path
                                d="M 20 50 Q 50 20 80 50"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                            <circle cx="20" cy="50" r="5" fill="#a855f7" />
                            <circle cx="80" cy="50" r="5" fill="#3b82f6" />
                        </svg>
                    </FeatureCard>

                    {/* Feature 4: Local Power (Instant) */}
                    <FeatureCard
                        title="Local Velocity"
                        description="Zero latency. 100% privacy. Stardust runs locally on your machine."
                        delay={0.4}
                    >
                        <div className="absolute inset-0 flex items-center justify-center gap-12">
                            <div className="text-center group-hover:scale-110 transition-transform duration-300">
                                <div className="text-5xl mb-3 filter drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">⚡</div>
                                <div className="text-sm text-green-400 font-mono tracking-wider">0ms</div>
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Feature 5: Command & Control (NEW) */}
                    <FeatureCard
                        title="Command Palette"
                        description="Navigate your entire universe without lifting your hands from the keyboard."
                        delay={0.5}
                    >
                        {/* Mini Sim: Radar / Search UI */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-32 rounded-lg border border-white/10 bg-black/50 flex flex-col p-4 shadow-xl group-hover:-translate-y-2 transition-transform">
                                <div className="w-full h-4 bg-white/10 rounded mb-2 animate-pulse" />
                                <div className="w-2/3 h-2 bg-purple-500/20 rounded" />
                            </div>
                        </div>
                    </FeatureCard>

                </div>

                <TemplateShowcase />
            </div>
        </section>
    );
};
