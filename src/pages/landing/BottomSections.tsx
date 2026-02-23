import React from 'react';

export const AISection: React.FC = () => (
    <section id="lp-ai">
        <div className="lp-ai-header">
            <div className="lp-reveal">
                <span className="lp-section-kicker">AI Navigator</span>
                <h2 className="lp-section-title">Bring your own key.<br />Free models. Zero cost to start.</h2>
                <p className="lp-section-body" style={{ maxWidth: 580, margin: '14px 0 0' }}>Your OpenRouter key, stored locally in your browser. No server relay. No data sent to Stardust servers. Works with every major model including completely free tiers that cost you nothing. The AI observes your canvas and offers synthesis — it never interrupts with a chat window.</p>
            </div>
        </div>
        <div className="lp-ai-grid lp-reveal-scale">
            {[
                { icon: '✦', title: 'Stellar Synthesis', desc: 'Reads every note in your viewport. Returns a 2–4 sentence synthesis identifying the dominant theme, key tension, and emerging direction. Shows you what your thinking is actually about — the pattern you could not see from inside it.' },
                { icon: '🌌', title: 'Constellation Mapper', desc: 'Sends all note titles to the AI. Discovers semantic connections and renders them as animated SVG lines — solid for strong links, dashed for medium, dotted for weak. Your canvas becomes a knowledge graph in one click.' },
                { icon: '🪐', title: 'Planet Expander', desc: 'Right-click any note. The AI generates 3–5 sub-ideas calibrated to the planet type — actions for Mars, creative directions for Venus, sub-projects for Jupiter. Child notes materialize around the parent. Pin what you want, dissolve the rest.' },
                { icon: '🎨', title: 'Spectral Color Analysis', desc: 'After saving, AI analyzes content sentiment and returns a spectral category. Urgent notes glow hotter. Creative notes shift amber. Technical notes cool to blue. Your canvas becomes emotionally readable at a distance.' },
                { icon: '☄️', title: 'Comet Deadline Parser', desc: 'Write "next Friday" or "before the client call" in any Comet note. AI extracts the date, sets the deadline field, and adjusts the comet\'s tail length automatically. Longer tail means closer deadline — urgency is visual.' },
                { icon: '⚕️', title: 'Canvas Health Report', desc: 'Finds orphaned notes, duplicate concepts, empty notes older than 7 days, and Stars with no child planets. Returns the Asteroid Field Report with one-click fixes. A clean canvas is a clear mind.' },
            ].map((card, i) => (
                <div key={i} className="lp-ai-card">
                    <div className="lp-ai-icon">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                </div>
            ))}
        </div>
        <div className="lp-ai-models lp-reveal">
            <h3>Free models. Your key. Your data stays on your device.</h3>
            <p>Connect a free OpenRouter account — no credit card required — and all AI features work at zero cost. Upgrade to premium models when you want higher reasoning quality.</p>
            <div className="lp-models-grid">
                {[
                    { name: 'Mistral 7B', free: true }, { name: 'Llama 3.1 8B', free: true }, { name: 'Gemma 2 9B', free: true }, { name: 'Qwen 2.5 7B', free: true },
                    { name: 'Claude 3.5 Sonnet' }, { name: 'GPT-4o Mini' }, { name: 'Gemini Flash 1.5' }, { name: 'Claude 3 Haiku' },
                ].map((m, i) => (
                    <div key={i} className="lp-mc">{m.name} <span className={m.free ? 'lp-fb' : 'lp-pb'}>{m.free ? 'FREE' : 'PREMIUM'}</span></div>
                ))}
            </div>
        </div>
    </section>
);

export const CompareSection: React.FC = () => {
    const rows = [
        ['Importance visible as visual size', '✕', '✕', '✕', '✓'],
        ['Spatial infinite canvas', '✕', '~', '✓', '✓'],
        ['Multiple cognitive layout modes', '✓', '✕', '✕', '✓ Five modes'],
        ['Dual execution / exploration design system', '✕', '✕', '✕', '✓'],
        ['Semantic zoom (level-of-detail rendering)', '✕', '✕', '~', '✓'],
        ['Priority visible as orbital radius', '✕', '✕', '✕', '✓'],
        ['AI with bring-your-own-key + free models', '~', '~', '✕', '✓'],
        ['Works fully offline, data stays local', '✕', '✓', '✕', '✓'],
        ['Obsidian / Markdown / CSV export', '✕', '✓', '✕', '✓ Pro'],
        ['Real-time collaboration (live cursors)', '✓', '✕', '✓', '✓ Pro'],
    ];
    const icon = (v: string) => v.startsWith('✓') ? <span className="lp-ck">{v}</span> : v === '✕' ? <span className="lp-cx">✕</span> : <span className="lp-cp">~</span>;
    return (
        <section id="lp-compare">
            <div className="lp-compare-header lp-reveal">
                <span className="lp-section-kicker">vs. Everything Else</span>
                <h2 className="lp-section-title">Why your current tool will not<br />change how you think.</h2>
            </div>
            <div className="lp-reveal-scale">
                <table className="lp-ct">
                    <thead><tr><th>Capability</th><th>Notion</th><th>Obsidian</th><th>Miro</th><th className="hl">Stardust ✦</th></tr></thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}><td>{r[0]}</td><td>{icon(r[1])}</td><td>{icon(r[2])}</td><td>{icon(r[3])}</td><td className="hl">{icon(r[4])}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export const WorkflowSection: React.FC = () => (
    <section id="lp-workflow">
        <div className="lp-workflow-header lp-reveal">
            <span className="lp-section-kicker">Daily Rhythm</span>
            <h2 className="lp-section-title">One tool. Four cognitive states.<br />One continuous flow of thought.</h2>
        </div>
        <div className="lp-wsteps lp-reveal-scale">
            {[
                { n: '01', time: 'Morning · 15 min', title: 'Capture Everything', mode: 'Zero-Point Void', desc: 'Open Void. Double-click, type, place. No structure, no judgment, no labels. Every thought gets a note.' },
                { n: '02', time: 'Morning · 10 min', title: 'Assign Gravity', mode: 'Orbital', desc: 'Switch to Orbital. The canvas shows what has gravitational weight. Drag important items inward toward the center.' },
                { n: '03', time: 'Work Day', title: 'Execute in the Sun', mode: 'Solar Strategy', desc: 'Switch to Solar design system. Use Prism or Matrix for the work itself. The warm canvas signals execution mode.' },
                { n: '04', time: 'Evening · 5 min', title: 'Reflect in Space', mode: 'Zero-Point Timeline', desc: 'Switch to Timeline. Scroll through today in the amber vertical stream. See the shape of your thinking.' },
            ].map((s, i) => (
                <div key={i} className="lp-ws">
                    <div className="lp-wsn">{s.n}</div>
                    <span className="lp-wst">{s.time}</span>
                    <h3 className="lp-wsttl">{s.title}</h3>
                    <span className="lp-wsmode">{s.mode}</span>
                    <p className="lp-wsd">{s.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

export const PricingSection: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => (
    <section id="lp-pricing">
        <div className="lp-pricing-header lp-reveal">
            <span className="lp-section-kicker">Pricing</span>
            <h2 className="lp-section-title">Start free. Upgrade when you grow.</h2>
            <p className="lp-section-body" style={{ maxWidth: 520, margin: '14px auto 0' }}>Free is genuinely powerful — one Universe, all five modes, all planet types, AI with your own free-model key. Pro and Ultra are for people whose thinking is their livelihood.</p>
        </div>
        <div className="lp-pg3 lp-reveal-scale">
            <div className="lp-pc">
                <span className="lp-ptier">Explorer</span>
                <div className="lp-pamt">$0<span>/mo</span></div>
                <p className="lp-pper">Free forever. No card required.</p>
                <div className="lp-pdiv" />
                <ul className="lp-pfl">
                    {['1 Universe (infinite canvas)', 'All 5 view modes', 'All planet types — Star to Asteroid', 'Dual design system (Solar + Zero-Point)', 'AI with your own key — free models', 'IndexedDB offline persistence', '.stardust file export and import', 'Genesis Ring full vocabulary'].map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button className="lp-pcta sec" onClick={onEnterApp}>Start Exploring</button>
            </div>
            <div className="lp-pc feat">
                <div className="lp-feat-badge">Most Popular</div>
                <span className="lp-ptier">Navigator</span>
                <div className="lp-pamt">$8<span>/mo</span></div>
                <p className="lp-pper">$72/year — save 25%</p>
                <div className="lp-pdiv" />
                <ul className="lp-pfl">
                    {['Unlimited Universes', 'Constellation Templates (10+ presets)', 'Focus Tunnel — distraction-free writing', 'Markdown, Obsidian vault, CSV export', 'Note version history — 30 versions', 'Gravitational Session Timer', 'AI with any model (including premium)', 'Planet Pulse — live collaboration, 2 users', 'Black Hole Inbox — capture from anywhere'].map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button className="lp-pcta pri" onClick={onEnterApp}>Start Navigator</button>
            </div>
            <div className="lp-pc">
                <span className="lp-ptier">Architect</span>
                <div className="lp-pamt">$18<span>/mo</span></div>
                <p className="lp-pper">$156/year — save 28%</p>
                <div className="lp-pdiv" />
                <ul className="lp-pfl">
                    {['Everything in Navigator', 'Universe Sharing — public read-only links', 'Orbital Resonance — self-organizing canvas', 'Unlimited live collaboration', 'Browser Extension — capture from any tab', 'AI Mission Log — daily summaries', 'API access — build on Stardust', 'Early access to every new feature'].map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button className="lp-pcta sec" onClick={onEnterApp}>Start Architect</button>
            </div>
        </div>
    </section>
);

export const CTASection: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => (
    <section id="lp-final-cta">
        <div className="lp-reveal">
            <h2 className="lp-cta-title">Your ideas deserve<br />to look like what they <em>actually are</em>.</h2>
            <p className="lp-cta-sub">A billion-dollar vision should look nothing like a grocery list. Start building a universe where importance has mass — for free, today, no account required.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="lp-btn-primary" onClick={onEnterApp}>Begin Your Universe — Free</button>
                <button className="lp-btn-ghost">Watch a 90-second demo</button>
            </div>
            <p className="lp-cta-note">No credit card · Works offline · Data never leaves your device</p>
        </div>
    </section>
);

export const FooterSection: React.FC = () => (
    <footer className="lp-footer">
        <div className="lp-fl">STAR<span>DUST</span></div>
        <div className="lp-fc">© 2025 Stardust Canvas · Think in Space, Not in Rows</div>
    </footer>
);
