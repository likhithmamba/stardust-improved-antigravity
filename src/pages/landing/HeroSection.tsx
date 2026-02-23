import React from 'react';

interface HeroSectionProps {
    onEnterApp: () => void;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterApp, canvasRef }) => (
    <section id="lp-hero">
        <canvas id="lp-star-canvas" ref={canvasRef} />
        <div className="lp-hero-nebula lp-n1" />
        <div className="lp-hero-nebula lp-n2" />
        <div className="lp-hero-nebula lp-n3" />
        <div className="lp-hero-content">
            <p className="lp-hero-eyebrow">// The Cognitive Operating System</p>
            <h1 className="lp-hero-headline">
                Your most important idea<br />should look like <em>a star</em>.<br />Not a bullet point.
            </h1>
            <p className="lp-hero-sub">
                Stardust is the only thinking tool where importance has physical weight. Ideas orbit each other. Your canvas changes its entire personality based on how you think.
            </p>
            <div className="lp-hero-actions">
                <button className="lp-btn-primary" onClick={onEnterApp}>Begin Your Universe — Free</button>
                <button className="lp-btn-ghost" onClick={() => document.getElementById('lp-modes')?.scrollIntoView({ behavior: 'smooth' })}>
                    See All Five Modes
                </button>
            </div>
        </div>
        <p className="lp-hero-proof">Five cognitive modes &nbsp;·&nbsp; Dual design systems &nbsp;·&nbsp; Free AI models &nbsp;·&nbsp; Works offline</p>
    </section>
);
