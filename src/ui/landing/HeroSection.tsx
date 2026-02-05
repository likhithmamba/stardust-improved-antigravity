import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
    onEnterApp?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [animationStep, setAnimationStep] = useState<'initial' | 'bang' | 'settle'>('initial');

    // Sequence the Big Bang
    useEffect(() => {
        const timer1 = setTimeout(() => setAnimationStep('bang'), 500); // Wait a beat before bang
        const timer2 = setTimeout(() => setAnimationStep('settle'), 800); // 300ms flash duration

        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // Warp Speed Particle System
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles: { x: number, y: number, z: number, px: number, py: number }[] = [];
        const particleCount = 2000; // Dense starfield
        const centerX = width / 2;
        const centerY = height / 2;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: (Math.random() - 0.5) * width * 2,
                y: (Math.random() - 0.5) * height * 2,
                z: Math.random() * width,
                px: 0,
                py: 0
            });
        }

        let afId: number;

        const animate = () => {
            // Trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // Longer trails
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = 'white';

            // Speed depends on animation state
            let speed = 20;
            if (animationStep === 'initial') speed = 0;
            if (animationStep === 'bang') speed = 100; // Hyperdrive burst

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];

                // Move star closer
                p.z -= speed;

                // Reset if passed screen
                if (p.z <= 0) {
                    p.z = width;
                    p.x = (Math.random() - 0.5) * width * 2;
                    p.y = (Math.random() - 0.5) * height * 2;
                    p.px = (p.x / p.z) * 100 + centerX;
                    p.py = (p.y / p.z) * 100 + centerY;
                }

                // Project 3D to 2D
                const sx = (p.x / p.z) * 100 + centerX;
                const sy = (p.y / p.z) * 100 + centerY;

                // Draw line from previous position (streak)
                const size = (1 - p.z / width) * 2.5; // Bigger as they get closer

                if (p.px !== 0) {
                    ctx.beginPath();
                    ctx.moveTo(p.px, p.py);
                    ctx.lineTo(sx, sy);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - p.z / width})`;
                    ctx.lineWidth = size;
                    ctx.stroke();
                }

                p.px = sx;
                p.py = sy;
            }

            afId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(afId);
            window.removeEventListener('resize', handleResize);
        };
    }, [animationStep]);

    // Text Reveal Variant (Blur to Focus)
    const textVariant = {
        hidden: { opacity: 0, y: 30, filter: "blur(20px)" },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            textShadow: "0 0 30px rgba(255,255,255,0.2)",
            transition: {
                delay: i * 0.2 + 1, // Start after settle
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1] as any // Exposure ease
            }
        })
    };

    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-black select-none">
            {/* Big Bang Flash Overlay */}
            <AnimatePresence>
                {animationStep === 'bang' && (
                    <motion.div
                        className="absolute inset-0 bg-white z-[60] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Background Canvas for Warp Particles */}
            <div className="absolute inset-0 z-0">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Vignette & Color Grade */}
            <div className="absolute inset-0 z-[1] bg-radial-gradient from-transparent to-black opacity-80 pointer-events-none" />

            {/* Central Content */}
            {animationStep === 'settle' && (
                <div className="relative z-10 text-center px-6 mix-blend-difference_ text-white flex flex-col items-center max-w-7xl mx-auto">

                    <motion.div className="overflow-hidden p-2">
                        <motion.h1
                            custom={1}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white drop-shadow-2xl mb-2"
                        >
                            Ideas don’t start
                        </motion.h1>
                    </motion.div>

                    <motion.div className="overflow-hidden p-2 mb-8">
                        <motion.h1
                            custom={2}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-slate-500"
                        >
                            <span className="text-white italic">organized</span>.
                        </motion.h1>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed tracking-wide">
                            Stardust is the <strong className="text-purple-400 font-medium glow-text">Cosmic Canvas</strong> for your mind.
                            Where thoughts behave like matter—attracting, orbiting, and evolving naturally.
                        </p>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5, y: [0, 10, 0] }}
                        transition={{ delay: 3, duration: 2, repeat: Infinity }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Begin Transmission</span>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
                    </motion.div>
                </div>
            )}

            {/* Initial Singularity Point */}
            {animationStep === 'initial' && (
                <div className="absolute z-40 inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-1 h-1 bg-white rounded-full shadow-[0_0_100px_50px_rgba(255,255,255,1)]"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 0.2, 500] }} // Implode then explode
                        transition={{ duration: 0.8, times: [0, 0.7, 1], ease: "anticipate" }}
                    />
                </div>
            )}
        </section>
    );
};

