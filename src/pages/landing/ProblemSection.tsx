import React from 'react';

export const ProblemSection: React.FC = () => (
    <section id="lp-problem">
        <div className="lp-pg">
            <div className="lp-reveal-left">
                <span className="lp-section-kicker">The Problem</span>
                <h2 className="lp-section-title">Every other tool gives your ideas equal-sized boxes.</h2>
                <p className="lp-section-body">Notion. Obsidian. Roam. Miro. They are all fundamentally grid systems wearing different clothes. A billion-dollar idea and a grocery reminder look identical. You read importance from a label. You organize by typing, not by thinking.</p>
                <p className="lp-section-body" style={{ marginTop: 16 }}>The result: your tool fights your brain instead of matching it. Every day you adapt to software that was never designed for the way ideas actually work.</p>
            </div>
            <div className="lp-reveal-right">
                <div className="lp-flat-tool">
                    <p className="lp-problem-label bad">// Every other tool</p>
                    <div className="lp-flat-row" style={{ borderColor: '#ef4444' }}><div className="lp-flat-dot" style={{ background: '#ef4444' }} /><span className="lp-flat-text">The company's 10-year vision</span><span className="lp-flat-badge">High</span></div>
                    <div className="lp-flat-row" style={{ borderColor: '#3b82f6' }}><div className="lp-flat-dot" style={{ background: '#3b82f6' }} /><span className="lp-flat-text">Buy oat milk</span><span className="lp-flat-badge">Low</span></div>
                    <div className="lp-flat-row" style={{ borderColor: '#ef4444' }}><div className="lp-flat-dot" style={{ background: '#ef4444' }} /><span className="lp-flat-text">Raise the Series A</span><span className="lp-flat-badge">High</span></div>
                    <div className="lp-flat-row" style={{ borderColor: '#3b82f6' }}><div className="lp-flat-dot" style={{ background: '#3b82f6' }} /><span className="lp-flat-text">Reply to David's email</span><span className="lp-flat-badge">Medium</span></div>
                    <div className="lp-flat-row" style={{ borderColor: '#6b7280' }}><div className="lp-flat-dot" style={{ background: '#6b7280' }} /><span className="lp-flat-text">The theory that changes everything</span><span className="lp-flat-badge">?</span></div>
                    <p className="lp-flat-caption">⚠ Same size. Same shape. Every idea equally invisible.</p>
                </div>
            </div>
        </div>
        <div className="lp-pg" style={{ marginTop: 100 }}>
            <div className="lp-reveal-left">
                <div className="lp-spatial-tool">
                    <p className="lp-problem-label good" style={{ position: 'absolute', top: 16, left: 20, zIndex: 10, margin: 0 }}>// Stardust</p>
                    <div className="lp-s-planet" style={{ width: 108, height: 108, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle at 35% 35%,#fde68a,#f59e0b,#92400e)', boxShadow: '0 0 60px rgba(245,158,11,0.5)', fontSize: 10, fontWeight: 600, color: '#000' }}>Company<br />10-year vision</div>
                    <div className="lp-s-planet" style={{ width: 58, height: 58, top: '18%', left: '16%', background: 'radial-gradient(circle at 35% 35%,#fca5a5,#ef4444,#7f1d1d)', boxShadow: '0 0 25px rgba(239,68,68,0.5)', fontSize: 8 }}>Raise<br />Series A</div>
                    <div className="lp-s-planet" style={{ width: 52, height: 52, top: '65%', right: '16%', background: 'radial-gradient(circle at 35% 35%,#bfdbfe,#3b82f6,#1e3a8a)', boxShadow: '0 0 20px rgba(59,130,246,0.5)', fontSize: 7 }}>New<br />Product</div>
                    <div className="lp-s-planet" style={{ width: 40, height: 40, top: '20%', right: '14%', background: 'radial-gradient(circle at 35% 35%,#a5f3fc,#06b6d4,#164e63)', boxShadow: '0 0 15px rgba(6,182,212,0.4)', fontSize: 7 }}>Research</div>
                    <div className="lp-s-planet" style={{ width: 14, height: 14, bottom: '24%', left: '28%', background: '#475569', opacity: .6 }} />
                    <div className="lp-s-planet" style={{ width: 10, height: 10, bottom: '35%', left: '62%', background: '#475569', opacity: .5 }} />
                    <div className="lp-s-planet" style={{ width: 18, height: 18, top: '55%', left: '18%', background: '#334155', opacity: .7, borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' }} />
                    <p className="lp-spatial-cap">✦ Size = importance. Instant, wordless comprehension.</p>
                </div>
            </div>
            <div className="lp-reveal-right">
                <span className="lp-section-kicker">The Solution</span>
                <h2 className="lp-section-title">In Stardust, your canvas reads like a solar system.</h2>
                <p className="lp-section-body">Stars are your biggest ideas — anchors everything orbits around. Planets are your active projects. Moons are your working notes. Asteroids are raw fragments not yet developed.</p>
                <p className="lp-section-body" style={{ marginTop: 16 }}>You understand the entire structure of your thinking in a single glance. No reading required. Importance is a shape, not a label. Mass is calculated from content richness, not manually assigned.</p>
            </div>
        </div>
    </section>
);
