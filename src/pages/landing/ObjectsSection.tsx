import React from 'react';

export const ObjectsSection: React.FC = () => (
    <section id="lp-objects">
        <div className="lp-objects-header lp-reveal">
            <span className="lp-section-kicker">The Object Vocabulary</span>
            <h2 className="lp-section-title">Four types of celestial bodies.<br />Four levels of thought.</h2>
            <p className="lp-section-body" style={{ maxWidth: 580, margin: '14px auto 0' }}>Size is calculated, not arbitrary. The longer and richer a note becomes, the heavier it grows. Zoom out to see the shape of your universe. Zoom in to edit at the surface.</p>
        </div>
        <div className="lp-obj-grid lp-reveal-scale">
            {/* Star */}
            <div className="lp-obj-card">
                <div className="lp-obj-icon" style={{ width: 72, height: 72, background: 'radial-gradient(circle at 35% 35%,#fde68a,#f59e0b,#92400e)', boxShadow: '0 0 30px rgba(245,158,11,0.6),0 0 60px rgba(245,158,11,0.2)', animation: 'lp-gp 3s ease-in-out infinite', '--ga': '0 0 30px rgba(245,158,11,0.5)', '--gb': '0 0 50px rgba(245,158,11,0.9)' } as React.CSSProperties} />
                <h3>⭐ Star</h3>
                <span className="lp-obj-range">180 – 260 px diameter</span>
                <p>The heaviest semantic object. Your thesis, your company vision, your major project anchor. Cannot be accidentally moved — requires 400ms hold to drag. Everything else exists in relation to a Star.</p>
                <div className="lp-obj-tags"><span className="lp-obj-tag">Company vision</span><span className="lp-obj-tag">Book thesis</span><span className="lp-obj-tag">Project anchor</span></div>
            </div>
            {/* Planet */}
            <div className="lp-obj-card">
                <div className="lp-obj-icon" style={{ width: 48, height: 48, background: 'radial-gradient(circle at 35% 35%,#bfdbfe,#3b82f6,#1e3a8a)', boxShadow: '0 0 20px rgba(59,130,246,0.6)' }} />
                <h3>🪐 Planet</h3>
                <span className="lp-obj-range">90 – 140 px diameter</span>
                <p>A chapter, feature, module, or workstream. Planets exist in relation to a Star. Drop near a Star and a relationship arc renders between them. Size scales with content richness.</p>
                <div className="lp-obj-tags"><span className="lp-obj-tag">Feature area</span><span className="lp-obj-tag">Book chapter</span><span className="lp-obj-tag">Sub-project</span></div>
            </div>
            {/* Moon */}
            <div className="lp-obj-card">
                <div className="lp-obj-icon" style={{ width: 32, height: 32, background: 'radial-gradient(circle at 35% 35%,#e2e8f0,#94a3b8,#334155)', boxShadow: '0 0 12px rgba(148,163,184,0.5)' }} />
                <h3>🌕 Moon</h3>
                <span className="lp-obj-range">28 – 50 px diameter</span>
                <p>The primary working unit. Tasks, paragraphs, references, data points. Freely draggable with no delay. Text visible at zoom ≥ 1.0. Your canvas will be filled mostly with Moons.</p>
                <div className="lp-obj-tags"><span className="lp-obj-tag">Task</span><span className="lp-obj-tag">Paragraph</span><span className="lp-obj-tag">Reference</span></div>
            </div>
            {/* Asteroid */}
            <div className="lp-obj-card">
                <div className="lp-obj-icon" style={{ width: 16, height: 16, background: '#475569', borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%', marginBottom: 40, marginTop: 16 }} />
                <h3>☄️ Asteroid</h3>
                <span className="lp-obj-range">8 – 20 px diameter</span>
                <p>A raw fragment — the thought not yet developed. Irregular shape, no glow, flat color. Expand on hover to read. Promote to Moon when ready. Your perpetual inbox of unprocessed ideas.</p>
                <div className="lp-obj-tags"><span className="lp-obj-tag">Fleeting idea</span><span className="lp-obj-tag">Quick capture</span><span className="lp-obj-tag">Inbox</span></div>
            </div>
        </div>
        {/* Zoom Demo */}
        <div className="lp-zoom-demo lp-reveal">
            <h3>Semantic Zoom — The Canvas Evolves As You Move Through It</h3>
            <div className="lp-zoom-levels">
                <div className="lp-zoom-level">
                    <span className="lp-zoom-label">Far Out 0.2×</span>
                    <div className="lp-zoom-scene">
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fde68a,#f59e0b)', boxShadow: '0 0 15px rgba(245,158,11,0.7)' }} />
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#475569', position: 'absolute', top: '28%', right: '32%' }} />
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#475569', position: 'absolute', bottom: '28%', left: '34%' }} />
                    </div>
                    <p className="lp-zoom-desc">Stars only. Everything else is a faint dot.</p>
                </div>
                <div className="lp-zoom-arr">→</div>
                <div className="lp-zoom-level">
                    <span className="lp-zoom-label">System 0.5×</span>
                    <div className="lp-zoom-scene">
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fde68a,#f59e0b)', boxShadow: '0 0 12px rgba(245,158,11,0.6)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#bfdbfe,#3b82f6)', position: 'absolute', top: '22%', right: '24%' }} />
                        <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fca5a5,#ef4444)', position: 'absolute', bottom: '28%', left: '26%' }} />
                    </div>
                    <p className="lp-zoom-desc">Stars + Planets. Moons are semi-visible.</p>
                </div>
                <div className="lp-zoom-arr">→</div>
                <div className="lp-zoom-level">
                    <span className="lp-zoom-label">Planet 1.0×</span>
                    <div className="lp-zoom-scene">
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fde68a,#f59e0b)', position: 'absolute', top: '44%', left: '40%', transform: 'translate(-50%,-50%)' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#bfdbfe,#3b82f6)', position: 'absolute', top: '20%', right: '22%' }} />
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', position: 'absolute', bottom: '24%', right: '28%' }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', position: 'absolute', top: '62%', left: '28%' }} />
                    </div>
                    <p className="lp-zoom-desc">All levels. Titles appear on Stars & Planets.</p>
                </div>
                <div className="lp-zoom-arr">→</div>
                <div className="lp-zoom-level">
                    <span className="lp-zoom-label">Surface 2×+</span>
                    <div className="lp-zoom-scene">
                        <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#bfdbfe,#3b82f6,#1e3a8a)', boxShadow: '0 0 20px rgba(59,130,246,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.9)', textAlign: 'center', padding: 8 }}>Full text<br />editable</div>
                    </div>
                    <p className="lp-zoom-desc">Full content visible. Editor active. All asteroids shown.</p>
                </div>
            </div>
        </div>
    </section>
);
