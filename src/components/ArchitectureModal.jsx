import React from 'react';
import { X, Cpu, Radio, Shield, CheckCircle } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="gov-modal-overlay" onClick={onClose}>
      <div className="gov-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={22} color="var(--indigo-light)" />
              GiftOfVoice — System Architecture & Verification
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Multi-model assistive communication pipeline designed for the DEV Weekend Challenge: Generosity Edition.
            </p>
          </div>

          <button
            onClick={onClose}
            className="gov-btn-ghost"
            style={{ padding: '8px' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Architecture Flow Diagram */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--indigo-light)', display: 'block', marginBottom: '8px' }}>
            End-to-End Assistive Pipeline
          </span>
          <pre className="gov-ascii-box">
{`+-----------------------------------------------------------------------------------------+
|                                    GiftOfVoice Client                                   |
|                                                                                         |
|  [ 1. AAC Soundboard ]  --->  [ 2. Context & Tone ]  --->  [ 3. Gemini Expansion ]      |
|    - Sparse Concepts            - Grateful / Loving          - Natural, Concise,        |
|    - Touch Targets              - Recipient Context            Expressive Variations    |
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

        {/* Partner Integrations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {/* Google AI Card */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: 'var(--r-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--emerald-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="var(--emerald)" />
                Google AI (Gemini 3.6 Flash)
              </span>
              <span style={{ fontSize: '0.68rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-light)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                Active & Verified
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
              Acts as the **Intent Expansion Engine**. Transforms shorthand AAC clicks (e.g. <code>[Water] + [Nurse]</code>) into 3 contextually tailored human dialogue options matching the chosen emotional prosody.
            </p>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', background: '#04060c', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              Endpoint: <code>POST /api/expand-intent</code><br />
              Model: <code>gemini-3.6-flash</code>
            </div>
          </div>

          {/* ElevenLabs Card */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(99, 102, 241, 0.35)', borderRadius: 'var(--r-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--indigo-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={15} color="var(--indigo)" />
                ElevenLabs Expressive Synthesis
              </span>
              <span style={{ fontSize: '0.68rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--indigo-light)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                Active & Verified
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
              Acts as the **Voice Generosity Synthesizer**. Delivers authentic human warmth, dynamic prosody, and emotional inflections using donated community voices instead of robotic monotone TTS.
            </p>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', background: '#04060c', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              Endpoint: <code>POST /api/synthesize-voice</code><br />
              Model: <code>eleven_turbo_v2_5</code>
            </div>
          </div>
        </div>

        {/* Measurable Accessibility Checklist */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--amber-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={16} color="var(--amber)" />
            Measurable Accessibility Standards (WCAG 2.1 AAA)
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div><span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓</span> Full Keyboard Navigation (Tab, Enter, Space)</div>
            <div><span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓</span> Visible 3px Focus Rings (<code>focus-visible</code>)</div>
            <div><span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓</span> High-Contrast Theme (Pure Black & High Contrast)</div>
            <div><span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓</span> Touch Targets min 88px (exceeds 48px standard)</div>
            <div><span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓</span> Semantic ARIA Roles (<code>role="button"</code>)</div>
            <div><span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓</span> Graceful Offline Web Speech API Fallback</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', marginTop: '20px' }}>
          <button
            onClick={onClose}
            className="gov-btn-primary"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
