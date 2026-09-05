import React from 'react';
import { Volume2, Play, Pause, ExternalLink } from 'lucide-react';

export default function HeroSection({
  activeVoice,
  isPlaying,
  onTogglePlay,
  onOpenCaseStudies,
  onOpenStudio,
}) {
  return (
    <section className="hero-section">
      <div className="hero-glow-bg" />

      <div className="hero-inner">
        {/* Left Column: Mission & Headline */}
        <div className="hero-content">
          <h1 className="hero-title scroll-reveal-text">
            When words become difficult,{' '}
            <span className="hero-title-highlight">humanity shouldn’t.</span>
          </h1>

          <p className="hero-subtitle scroll-reveal-text delay-100">
            Over 65 million people living with ALS, stroke, or speech loss are forced to speak through robotic, monotone machines. 
            <strong> GiftOfVoice</strong> reimagines generosity — pairing Google Gemini 3.6 Flash with ElevenLabs community voice donation to restore warm, dignified human speech from minimal gestures.
          </p>

          <div className="hero-cta-row scroll-reveal-text delay-150">
            <a href="#studio" className="btn-primary-glow" onClick={onOpenStudio}>
              <Volume2 size={16} />
              <span>Experience AAC Studio</span>
            </a>

            <a href="#cases" className="btn-outline" onClick={onOpenCaseStudies}>
              <span>Clinical Case Studies</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Key Metrics Strip */}
          <div className="metrics-strip">
            <div className="metric-item delay-100">
              <span className="metric-num">65M+</span>
              <span className="metric-label">Non-verbal lives impacted globally</span>
            </div>
            <div className="metric-item delay-150">
              <span className="metric-num" style={{ color: 'var(--emerald)' }}>0</span>
              <span className="metric-label">Robotic monotones or cold synthesized sounds</span>
            </div>
            <div className="metric-item delay-200">
              <span className="metric-num" style={{ color: 'var(--primary)' }}>Dual-AI</span>
              <span className="metric-label">Gemini 3.6 Flash + ElevenLabs Turbo v2.5</span>
            </div>
            <div className="metric-item delay-250">
              <span className="metric-num" style={{ color: 'var(--amber)' }}>100%</span>
              <span className="metric-label">Open-source & WCAG 2.1 AAA accessible</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Interactive Voice Widget */}
        <div className="scroll-reveal-scale delay-150">
          <div className="hero-widget-card">
            <div className="widget-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="live-dot" />
                <span className="widget-status-badge">Live Vocal Preview</span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Vocal Timbre: <strong>{activeVoice?.shortName || 'Grandma Margaret'}</strong>
              </span>
            </div>

            <div className="widget-phrase-box">
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.04em' }}>
                ICU Nurse Bedside Gratitude
              </span>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontStyle: 'italic', marginTop: '6px', lineHeight: '1.5' }}>
                "Oh Sarah, thank you so much... you have no idea how much comfort this warm blanket gives me tonight. You've been working so hard, and your kindness touches my heart."
              </p>
            </div>

            {/* Waveform Visualization Box */}
            <div className="widget-waveform-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isPlaying ? 'Streaming ElevenLabs Expressive Prosody' : 'Click to hear emotional inflection'}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: isPlaying ? 'var(--emerald)' : 'var(--text-dim)' }}>
                  {isPlaying ? 'Playing (24kHz)' : 'Ready'}
                </span>
              </div>

              {/* Dynamic Animated Soundwave Bars */}
              <div className="animated-wave-bars">
                {[0.4, 0.7, 0.3, 0.9, 0.6, 1.0, 0.5, 0.8, 0.4, 0.9, 0.7, 0.3, 0.8, 0.5].map((h, i) => (
                  <div
                    key={i}
                    className={`wave-bar ${isPlaying ? 'active' : ''}`}
                    style={{
                      height: `${h * 100}%`,
                      animationDelay: `${(i * 0.08).toFixed(2)}s`,
                      background: isPlaying ? 'var(--emerald)' : 'var(--border-hover)',
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={onTogglePlay}
              className="btn-primary-glow"
              style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} />
                  <span>Pause Voice Sample</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  <span>Listen to Grandma Margaret's Warm Inflection</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
