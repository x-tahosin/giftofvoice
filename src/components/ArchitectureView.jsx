import React from 'react';
import { Cpu, CheckCircle, Radio, Shield, Terminal, Sparkles } from 'lucide-react';

export default function ArchitectureView() {
  return (
    <section id="specs" className="specs-section">
      <div className="section-header">
        <div className="section-tag scroll-reveal-text">
          <Cpu size={14} />
          <span>System Architecture & Technical Specifications</span>
        </div>
        <h2 className="section-title scroll-reveal-text delay-100">
          Engineered for Low-Latency Dignity & Accessibility
        </h2>
        <p className="section-desc scroll-reveal-text delay-150">
          GiftOfVoice unites Google Gemini 3.6 Flash for rapid contextual understanding with ElevenLabs Turbo v2.5 for emotional vocal prosody, strictly adhering to WCAG 2.1 AAA accessibility.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* ASCII Pipeline Box */}
        <div className="scroll-reveal-scale delay-200" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '12px' }}>
            End-to-End Assistive Speech Dataflow
          </span>
          <pre className="ascii-code-box">
{`+-----------------------------------------------------------------------------------------+
|                                    GiftOfVoice Client                                   |
|                                                                                         |
|  [ 1. AAC Soundboard ]  --->  [ 2. Context & Tone ]  --->  [ 3. Gemini Expansion ]      |
|    - Sparse Concepts            - Grateful / Loving          - Natural, Concise,        |
|    - High-Contrast Targets      - Recipient Context            Expressive Variations    |
+----------------------------------------------------------------------------+------------+
                                                                             |
                                                                             v
+----------------------------------------------------------------------------+------------+
|                                 Express Backend Proxy                                   |
|                                                                                         |
|  POST /api/expand-intent  ==========>  Google Generative Language API (gemini-3.6-flash) |
|  POST /api/synthesize-voice ========>  ElevenLabs TTS API (eleven_turbo_v2_5)           |
+----------------------------------------------------------------------------+------------+
                                                                             |
                                                                             v
+-----------------------------------------------------------------------------------------+
|                                  Audio Delivery Layer                                   |
|                                                                                         |
|  [ Pre-rendered Preset Audio ]  OR  [ Live Base64 Audio Stream ]  OR  [ Web Speech API ]|
|          (Zero Latency)                     (Real-Time)                   (Offline)     |
+-----------------------------------------------------------------------------------------+`}
          </pre>
        </div>

        {/* Dual Partner Tech Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--emerald)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} />
                Google AI (Gemini 3.6 Flash)
              </span>
              <span className="brand-badge" style={{ color: 'var(--emerald)' }}>Active Integration</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Contextual expansion parses minimal shorthand keywords and constructs grammatically complete, human sentences tailored to the physical setting and relationship dynamic.
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Latency: <strong>~380ms</strong> • Strict JSON Mode • Resilient Fallback Engine
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={16} />
                ElevenLabs Turbo v2.5
              </span>
              <span className="brand-badge" style={{ color: 'var(--primary)' }}>Active Integration</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Synthesizes nuanced emotional inflection and micro-breaths from community-donated vocal timbres. Replaces computerized robot voices with living human warmth.
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Bitrate: <strong>128 kbps MP3</strong> • Sampling: <strong>44.1 kHz</strong> • Zero Robotic Artifacts
            </div>
          </div>
        </div>

        {/* Accessibility & Ethical Scorecard */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--amber)', display: 'block', marginBottom: '12px' }}>
            WCAG 2.1 AAA Accessibility & Humanitarian Standards
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <h5 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>Touch Target Sizing</h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>All tiles satisfy minimum 48px tactile boundaries for tremor or motor difficulty.</p>
            </div>
            <div>
              <h5 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>7:1+ Contrast Ratio</h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>High contrast mode exceeds AAA standards for low vision or daylight ICU wards.</p>
            </div>
            <div>
              <h5 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>Zero-Fail Graceful Degradation</h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>If cloud networks drop, the engine immediately falls back to Web Speech API.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
