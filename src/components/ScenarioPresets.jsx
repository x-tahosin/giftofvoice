import React from 'react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { Play, CheckCircle2 } from 'lucide-react';

export default function ScenarioPresets({
  onSelectScenario,
  activeScenarioId,
  isPlaying,
}) {
  return (
    <section className="glass-card gov-presets-panel">
      {/* Header */}
      <div className="gov-panel-header">
        <div>
          <h2 className="gov-panel-title">
            <span className="gov-dot-indicator gov-dot-amber" />
            Judge Quick-Start Showcase (One-Click Live Demos)
          </h2>
          <p className="gov-panel-desc">
            Click any clinical or family scenario below to instantly load keywords, Gemini intent expansion, and pre-rendered ElevenLabs audio.
          </p>
        </div>

        <span className="gov-challenge-pill" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: 'var(--amber-light)', background: 'rgba(245, 158, 11, 0.12)' }}>
          Zero Latency Testing
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="gov-presets-grid">
        {DEMO_SCENARIOS.map((scenario) => {
          const isActive = activeScenarioId === scenario.id;

          return (
            <div
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`gov-preset-card ${isActive ? 'active' : ''}`}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="gov-preset-badge">
                    {scenario.badge}
                  </span>
                  {isActive && <CheckCircle2 size={16} color="var(--emerald)" />}
                </div>

                <h3 className="gov-preset-title">
                  {scenario.title}
                </h3>

                <p className="gov-preset-sub">
                  {scenario.subtitle}
                </p>

                {/* Shorthand Keywords */}
                <div className="gov-preset-keywords">
                  {scenario.keywords.map((kw, i) => (
                    <span key={i} className="gov-kw-pill">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="gov-preset-footer">
                <span style={{ color: 'var(--text-dim)' }}>
                  Voice: <strong style={{ color: 'var(--text-muted)' }}>{scenario.voiceName.split(' ')[0]}</strong>
                </span>
                <div className="gov-listen-action">
                  <span>{isActive && isPlaying ? 'Playing Audio' : 'Listen Demo'}</span>
                  <Play size={12} fill="currentColor" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
