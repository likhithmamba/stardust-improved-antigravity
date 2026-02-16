import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

interface HeroPrimeProps {
    onEnterApp?: () => void;
}

export const HeroPrime: React.FC<HeroPrimeProps> = ({ onEnterApp }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        particles: THREE.Points;
        raycaster: THREE.Raycaster;
        mouse: THREE.Vector2;
    } | null>(null);

    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroY = useTransform(scrollY, [0, 400], [0, 200]);

    // Initialize Three.js scene
    useEffect(() => {
        if (!canvasRef.current) return;

        const container = canvasRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0008);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 500;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0a0a0f, 1);
        container.appendChild(renderer.domElement);

        // Particle System (3000 particles in orbital formation)
        const particleCount = 3000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Orbital distribution
            const radius = Math.random() * 400 + 100;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // More vibrant colors (purple to gold)
            const colorMix = Math.random();
            colors[i3] = 0.5 + colorMix * 0.5;     // R (more red for warmth)
            colors[i3 + 1] = 0.2 + colorMix * 0.4; // G
            colors[i3 + 2] = 0.8 + colorMix * 0.2; // B (strong blue base)
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3, // Larger particles
            vertexColors: true,
            transparent: true,
            opacity: 0.9, // More opaque
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Raycaster for mouse interaction
        const raycaster = new THREE.Raycaster();
        raycaster.params.Points!.threshold = 10;
        const mouse = new THREE.Vector2();

        sceneRef.current = { scene, camera, renderer, particles, raycaster, mouse };

        // Animation loop
        let animationId: number;
        const animate = () => {
            particles.rotation.y += 0.0005;
            particles.rotation.x += 0.0002;

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    // Mouse interaction
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!sceneRef.current) return;

            const { mouse, raycaster, particles } = sceneRef.current;

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, sceneRef.current.camera);
            const intersects = raycaster.intersectObject(particles);

            // Reset sizes
            const geometry = particles.geometry;
            const sizes = new Float32Array(geometry.attributes.position.count).fill(3);

            // Highlight nearby particles
            if (intersects.length > 0) {
                const positions = geometry.attributes.position.array;
                const intersectPoint = intersects[0].point;

                for (let i = 0; i < positions.length / 3; i++) {
                    const x = positions[i * 3];
                    const y = positions[i * 3 + 1];
                    const z = positions[i * 3 + 2];

                    const distance = Math.sqrt(
                        Math.pow(x - intersectPoint.x, 2) +
                        Math.pow(y - intersectPoint.y, 2) +
                        Math.pow(z - intersectPoint.z, 2)
                    );

                    if (distance < 50) {
                        sizes[i] = 10 * (1 - distance / 50); // Larger glow
                    }
                }
            }

            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--void-prime)]">
            {/* Three.js WebGL Canvas */}
            <div ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Content */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY }}
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-10 px-6 py-2 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-purple-300 text-xs font-mono tracking-[0.3em] uppercase"
                >
                    System.Init.Prime // v3.0.0
                </motion.div>

                {/* Headline - Editorial Serif */}
                <h1 className="text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] font-black tracking-tight mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="font-[var(--font-headline)] text-white mb-4"
                    >
                        Stop Taking Notes.
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="font-[var(--font-headline)]"
                        style={{
                            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #fbbf24 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 60px rgba(168, 85, 247, 0.4))'
                        }}
                    >
                        Start Building Intelligence.
                    </motion.div>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-14 font-[var(--font-body)]"
                >
                    Stardust is the local-first cognitive engine designed for non-linear thinkers.
                    <br className="hidden md:block" />
                    Turn scattered data into a structured cosmos of insight.
                </motion.p>

                {/* Dual CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col md:flex-row gap-4"
                >
                    {/* Primary CTA */}
                    <button
                        onClick={onEnterApp}
                        className="group relative px-10 py-5 text-black font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 overflow-hidden font-[var(--font-display)]"
                        style={{
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)',
                            backgroundSize: '200% 200%',
                            boxShadow: '0 0 50px rgba(251, 191, 36, 0.6), 0 10px 40px rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Initialize Stardust Gateway
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    {/* Secondary CTA */}
                    <button
                        className="px-10 py-5 border-2 border-purple-500/30 bg-purple-500/5 backdrop-blur-md text-slate-300 font-mono text-sm rounded-full hover:border-purple-500 hover:bg-purple-500/10 hover:text-white transition-all duration-300"
                    >
                        Watch the Architecture →
                    </button>
                </motion.div>

                {/* Social Proof Ticker */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="absolute bottom-12 left-0 right-0 overflow-hidden"
                >
                    <div className="font-mono text-xs text-slate-600 tracking-wider whitespace-nowrap animate-scroll">
                        Used by engineers at ImperialX // ECE Architects // Quantitative Traders // 50,000+ Local Nodes Active // Zero Cloud Dependency
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
