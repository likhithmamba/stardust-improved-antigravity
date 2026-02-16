import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
    {
        id: 'orbital',
        title: 'The Orbital Engine',
        subtitle: 'Knowledge Gravity',
        description: "Don't file. Let gravity do the work. Related ideas naturally pull together, revealing hidden clusters in your thinking.",
        color: '#8b5cf6'
    },
    {
        id: 'matrix',
        title: 'The Matrix Plane',
        subtitle: 'Strategic Evaluation',
        description: "Move beyond 'Urgent vs. Important.' Map effort against impact on a dynamic 2D plane. Automate the pruning of low-value tasks.",
        color: '#3b82f6'
    },
    {
        id: 'timeline',
        title: 'The Timeline Log',
        subtitle: 'Velocity Tracking',
        description: "Capture momentum, not just memories. Interstitial journaling calculates your project velocity and mental flow state.",
        color: '#10b981'
    },
    {
        id: 'prism',
        title: 'The Prism',
        subtitle: 'Spectral Refraction',
        description: "One thought, many wavelengths. Instantly refract a single note into actionable strategy, required resources, and AI-driven counter-arguments.",
        color: '#f59e0b'
    }
];

export const ModesMorphingSuite: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const [activeStage, setActiveStage] = useState(0);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        particles?: THREE.Points;
        gridHelper?: THREE.GridHelper;
        lines?: THREE.Line[];
    } | null>(null);

    // Initialize Three.js scene
    useEffect(() => {
        if (!canvasContainerRef.current) return;

        const container = canvasContainerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0005);

        // Camera
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
        camera.position.set(0, 100, 400);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0a0a0f, 0);
        container.appendChild(renderer.domElement);

        // Create initial orbital particles
        const particleCount = 800;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 200 + 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            colors[i3] = 0.55 + Math.random() * 0.2;
            colors[i3 + 1] = 0.13 + Math.random() * 0.4;
            colors[i3 + 2] = 0.96;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        sceneRef.current = { scene, camera, renderer, particles };

        // Animation loop
        let animationId: number;
        const animate = () => {
            if (particles) {
                particles.rotation.y += 0.001;
            }
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
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

    // GSAP ScrollTrigger for pinning and stage transitions
    useEffect(() => {
        if (!sectionRef.current || !sceneRef.current) return;

        const section = sectionRef.current;
        const { camera, particles } = sceneRef.current;

        // Pin the section
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const stageIndex = Math.floor(progress * 4);
                setActiveStage(Math.min(stageIndex, 3));

                if (!particles) return;

                // Morph based on stage
                const positions = particles.geometry.attributes.position.array as Float32Array;
                const targetPositions = new Float32Array(positions.length);

                if (stageIndex === 0) {
                    // Orbital - clustered spheres
                    for (let i = 0; i < positions.length / 3; i++) {
                        const i3 = i * 3;
                        const radius = Math.random() * 200 + 50;
                        const theta = Math.random() * Math.PI * 2;
                        const phi = Math.random() * Math.PI;

                        targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                        targetPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                        targetPositions[i3 + 2] = radius * Math.cos(phi);
                    }
                } else if (stageIndex === 1) {
                    // Matrix - flatten to 2D grid
                    const gridSize = Math.ceil(Math.sqrt(positions.length / 3));
                    for (let i = 0; i < positions.length / 3; i++) {
                        const i3 = i * 3;
                        const x = (i % gridSize) * 20 - (gridSize * 10);
                        const z = Math.floor(i / gridSize) * 20 - (gridSize * 10);

                        targetPositions[i3] = x;
                        targetPositions[i3 + 1] = 0;
                        targetPositions[i3 + 2] = z;
                    }
                } else if (stageIndex === 2) {
                    // Timeline - extrude into z-axis tunnel
                    for (let i = 0; i < positions.length / 3; i++) {
                        const i3 = i * 3;
                        const angle = (i / (positions.length / 3)) * Math.PI * 2;
                        const radius = 100;

                        targetPositions[i3] = Math.cos(angle) * radius;
                        targetPositions[i3 + 1] = Math.sin(angle) * radius;
                        targetPositions[i3 + 2] = (i / (positions.length / 3)) * -500;
                    }
                } else {
                    // Prism - converge to center
                    for (let i = 0; i < positions.length / 3; i++) {
                        const i3 = i * 3;
                        targetPositions[i3] = (Math.random() - 0.5) * 50;
                        targetPositions[i3 + 1] = (Math.random() - 0.5) * 50;
                        targetPositions[i3 + 2] = (Math.random() - 0.5) * 50;
                    }
                }

                // Lerp positions
                const lerpFactor = 0.1;
                for (let i = 0; i < positions.length; i++) {
                    positions[i] += (targetPositions[i] - positions[i]) * lerpFactor;
                }
                particles.geometry.attributes.position.needsUpdate = true;

                // Camera movement
                gsap.to(camera.position, {
                    y: 100 + stageIndex * 50,
                    z: 400 - stageIndex * 80,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-[var(--void-prime)] overflow-hidden"
        >
            <div className="absolute inset-0 flex">
                {/* Left Column - Text */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-12 z-10">
                    <div className="max-w-xl">
                        <div className="mb-4 text-xs font-mono tracking-[0.3em] uppercase" style={{ color: STAGES[activeStage].color }}>
                            {STAGES[activeStage].subtitle}
                        </div>
                        <h2 className="text-5xl md:text-6xl font-[var(--font-headline)] font-black text-white mb-6 leading-tight">
                            {STAGES[activeStage].title}
                        </h2>
                        <p className="text-xl text-slate-300 font-light leading-relaxed font-[var(--font-body)]">
                            {STAGES[activeStage].description}
                        </p>

                        {/* Stage indicators */}
                        <div className="flex gap-2 mt-12">
                            {STAGES.map((_, index) => (
                                <div
                                    key={index}
                                    className="h-1 rounded-full transition-all duration-500"
                                    style={{
                                        width: activeStage === index ? '48px' : '24px',
                                        backgroundColor: activeStage === index ? STAGES[activeStage].color : 'rgba(255,255,255,0.2)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - 3D Canvas */}
                <div
                    ref={canvasContainerRef}
                    className="hidden md:block w-1/2 relative"
                    style={{ perspective: '1000px' }}
                />
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-600 uppercase tracking-widest z-10">
                Scroll to Morph // Stage {activeStage + 1}/4
            </div>
        </section>
    );
};
