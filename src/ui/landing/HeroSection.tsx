import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FloatingDebris } from './FloatingDebris';

// --- Text Scramble Effect ---
const scrambleText = (text: string, progress: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    return text.split('').map((char, index) => {
        if (progress * text.length > index) return char;
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
};

const ScrambleTitle = ({ text, className }: { text: string, className?: string }) => {
    const [display, setDisplay] = useState(text);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 1) {
                    clearInterval(interval);
                    return 1;
                }
                return p + 0.01; // speed
            });
        }, 16);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDisplay(scrambleText(text, progress));
    }, [progress, text]);

    return <span className={className}>{display}</span>;
};


interface HeroSectionProps {
    onEnterApp?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterApp }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Mouse position for magnetic effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHoveringBtn, setIsHoveringBtn] = useState(false);

    // Advanced Starfield (Preserved)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const stars: { x: number, y: number, z: number, o: number, size: number }[] = [];
        const starCount = 3000;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: (Math.random() - 0.5) * width * 2,
                y: (Math.random() - 0.5) * height * 2,
                z: Math.random() * width,
                o: Math.random(),
                size: Math.random() * 2 // varied sizes
            });
        }

        let animationFrameId: number;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let time = 0;

        const render = () => {
            time += 0.005;
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            stars.forEach(star => {
                // Move stars towards viewer
                star.z -= 2;
                if (star.z <= 0) {
                    star.z = width;
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                }

                const x = (star.x / star.z) * width + cx;
                const y = (star.y / star.z) * height + cy;
                const size = (1 - star.z / width) * star.size * 2;
                const alpha = (1 - star.z / width);

                if (x > 0 && x < width && y > 0 && y < height) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Draw nebulas/gradients
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.8);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.03)'); // Indigo center
            gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.01)'); // Purple mid
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Magnetic Button Logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        // Only magnetize if close
        if (Math.abs(x) < 100 && Math.abs(y) < 100) {
            setMousePosition({ x: x * 0.2, y: y * 0.2 });
        } else {
            setMousePosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        setIsHoveringBtn(false);
    };

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">

            {/* Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* NEW: Floating Debris Layer */}
            <FloatingDebris />

            {/* Content Container */}
            <motion.div
                style={{ y: y1, opacity }}
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-purple-300 text-xs font-medium tracking-widest uppercase"
                >
                    System V3.0 // Ready
                </motion.div>

                {/* Main Title - Split for impact */}
                <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.8 }}
                        className="block bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent"
                    >
                        <ScrambleTitle text="Think at" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="block text-gradient-cosmic pb-4" // Padding for descenders
                    >
                        <ScrambleTitle text="Light Speed." />
                    </motion.div>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl leading-relaxed mb-12"
                >
                    The infinite canvas for high-velocity teams. <br className="hidden md:block" />
                    Map ideas, orbit tasks, and collapse chaos into clarity.
                </motion.p>

                {/* Magnetic CTA Button */}
                <div
                    className="relative group"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => setIsHoveringBtn(true)}
                >
                    <motion.button
                        ref={buttonRef}
                        onClick={onEnterApp}
                        animate={{ x: mousePosition.x, y: mousePosition.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="relative z-20 px-10 py-5 bg-white text-black font-display font-bold text-xl rounded-full hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <ScrambleTitle text="Enter Stardust" className="inline-block min-w-[140px]" />
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                    </motion.button>

                    {/* Glow behind button */}
                    <motion.div
                        animate={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5, opacity: isHoveringBtn ? 0.6 : 0.2 }}
                        className="absolute inset-0 bg-purple-500 blur-[40px] rounded-full z-10 transition-opacity duration-500 scale-150"
                    />
                </div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-slate-800 to-slate-200/20"></div>
            </motion.div>

        </section>
    );
};
