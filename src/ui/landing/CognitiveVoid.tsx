import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CognitiveVoid: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current || !overlayRef.current) return;

        const section = sectionRef.current;
        const overlay = overlayRef.current;
        const texts = textRefs.current.filter(Boolean);

        // GSAP Timeline triggered on scroll
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'center center',
                scrub: 1,
            }
        });

        // Expand void (dark overlay)
        timeline.to(overlay, {
            opacity: 0.95,
            scale: 3,
            duration: 1,
            ease: 'power2.out'
        });

        // Reveal text with stagger
        timeline.fromTo(
            texts,
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                stagger: 0.3,
                duration: 1,
                ease: 'power3.out'
            },
            '-=0.5'
        );

        return () => {
            timeline.kill();
        };
    }, []);

    const addTextRef = (el: HTMLParagraphElement | null) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center justify-center bg-[var(--void-prime)] overflow-hidden py-32"
        >
            {/* Expanding Dark Void */}
            <div
                ref={overlayRef}
                className="absolute inset-0 rounded-full bg-black opacity-0 blur-3xl"
                style={{ transformOrigin: 'center' }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <p
                    ref={addTextRef}
                    className="text-2xl md:text-4xl text-slate-300 font-light leading-relaxed mb-10 font-[var(--font-body)]"
                >
                    Your current tools treat thoughts as <span className="text-white font-semibold">lists</span>.
                </p>

                <p
                    ref={addTextRef}
                    className="text-2xl md:text-4xl text-slate-300 font-light leading-relaxed mb-10 font-[var(--font-body)]"
                >
                    But your brain works in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nebula-purple)] to-[var(--nebula-blue)] font-semibold">networks</span>.
                </p>

                <p
                    ref={addTextRef}
                    className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed italic font-[var(--font-body)]"
                >
                    You are losing insights in the friction of folder structures.
                </p>
            </div>
        </section>
    );
};
