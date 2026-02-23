import React from 'react';

export const DualModeSection: React.FC = () => (
    <section id="lp-dualmode">
        <div className="lp-dualmode-header lp-reveal">
            <span className="lp-section-kicker">Two Cognitive States</span>
            <h2 className="lp-section-title" style={{ maxWidth: 720, margin: '0 auto' }}>
                This is not a dark mode toggle.<br />It is a different way of thinking.
            </h2>
        </div>
        <div className="lp-split">
            {/* Solar */}
            <div className="lp-mode-half solar lp-reveal-left">
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className="lp-mode-badge">☀️ Solar Strategy</div>
                    <h2>Day Mode.<br />Execution Mode.</h2>
                    <p>The sun is up. You know what needs to happen. The canvas is warm, bright, structured — a cockpit designed to pressure you into clarity and action. Everything is labeled, actionable, high contrast.</p>
                    <ul className="lp-mf">
                        <li>White and amber backgrounds — designed for clarity not ambience</li>
                        <li>Labeled navigation always visible — you should always know where you are</li>
                        <li>Every mode optimized for execution and decision-making</li>
                        <li>Cinzel and Space Grotesk — authority and precision in every character</li>
                    </ul>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 28, opacity: .45, pointerEvents: 'none' }}>
                    <div style={{ width: 78, height: 78, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fde68a,#f59e0b)', boxShadow: '0 0 40px rgba(245,158,11,0.5)' }} />
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#bfdbfe,#3b82f6)', marginTop: -10, marginLeft: 72 }} />
                </div>
            </div>
            {/* Divider */}
            <div className="lp-mode-divider" />
            {/* Zero-Point */}
            <div className="lp-mode-half zp lp-reveal-right" style={{ position: 'relative' }}>
                <div className="lp-zp-star" style={{ width: 2, height: 2, top: '12%', left: '18%' }} />
                <div className="lp-zp-star" style={{ width: 1, height: 1, top: '28%', left: '72%', animationDelay: '1s' }} />
                <div className="lp-zp-star" style={{ width: 2, height: 2, top: '68%', left: '88%', animationDelay: '2s' }} />
                <div className="lp-zp-star" style={{ width: 1, height: 1, top: '82%', left: '38%', animationDelay: '.5s' }} />
                <div className="lp-zp-star" style={{ width: 2, height: 2, top: '8%', left: '58%', animationDelay: '1.5s' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className="lp-mode-badge">✦ Zero-Point</div>
                    <h2>Night Mode.<br />Exploration Mode.</h2>
                    <p>It is 2am and ideas are forming before you understand them. Deep space, slow breathing, no demands. The canvas opens itself to you. Navigation hides until needed. A central mantra breathes: <em>"Nothing is required of you."</em></p>
                    <ul className="lp-mf">
                        <li>Deep space backgrounds — designed for thinking, not managing</li>
                        <li>Ghost navigation revealed only by hover proximity</li>
                        <li>Cobalt, indigo, and amber — cool palette for warm ideas</li>
                        <li>Newsreader and Manrope — typefaces that invite rather than demand</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);
