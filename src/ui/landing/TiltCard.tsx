import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = "",
    glowColor = "rgba(139, 92, 246, 0.5)" // Purple default
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
    const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        const xPct = mouseXRel / width - 0.5;
        const yPct = mouseYRel / height - 0.5;

        x.set(mouseXRel);
        y.set(mouseYRel);

        rotateX.set(yPct * -20); // Tilt range
        rotateY.set(xPct * 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
            }}
            className={`relative group ${className}`}
        >
            <div
                style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
                className="relative h-full"
            >
                {children}
            </div>

            {/* Holographic Glow/Reflection Layer */}
            <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            ${glowColor},
                            transparent 80%
                        )
                    `,
                    opacity: 0,
                    zIndex: 0 // Behind content but in front of bg
                }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-screen"
            />
        </motion.div>
    );
};
