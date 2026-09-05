import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, Pause, Heart, Cpu } from 'lucide-react';

const STEPPER_TONE_EXAMPLES = {
  grateful: {
    label: 'Heartfelt & Grateful',
    emoji: '🙏',
    desc: 'Sincere bedside gratitude that comforts both patient and caregiver',
    natural: 'Thank you so much, Sarah. Bringing me this warm blanket gave me peace and comfort during a cold night.',
    concise: 'Thank you Sarah, this warm blanket helped me immensely.',
    expressive: 'I cannot thank you enough, Sarah. Your gentleness and this blanket made me feel safe and cared for.',
  },
  loving: {
    label: 'Loving & Tender',
    emoji: '❤️',
    desc: 'Gentle family affection, soft warmth, and deep care',
    natural: 'Thank you so much for tucking me in with this warm blanket, Sarah... you take such wonderful, loving care of me.',
    concise: 'Bless your kind heart, Sarah... thank you for bringing me this cozy blanket.',
    expressive: 'You wrap me up with so much gentle tenderness, dear... this blanket feels just like a sweet, comforting hug.',
  },
  playful: {
    label: 'Playful & Humorous',
    emoji: '😄',
    desc: 'Spirited witty banter to break the clinical silence and bring a smile',
    natural: "Thanks for the blanket, Sarah! Though I'm pretty sure you're secretly trying to wrap me up like a cozy burrito!",
    concise: "Thanks for the blanket—you're officially my favorite warmth-delivery specialist on this floor!",
    expressive: 'Ah, the legendary blanket service strikes again... thanks a bunch for saving me from turning into an ice cube!',
  },
  urgent: {
    label: 'Urgent & Direct',
    emoji: '⚠️',
    desc: 'Immediate medical priority and focused clarity without panic',
    natural: "Thank you for checking in, Sarah... but could you please get me another blanket right now? I'm shivering quite badly.",
    concise: 'Nurse Sarah, I really need that warm blanket as soon as possible, please.',
    expressive: 'I am feeling a severe chill right now—could you please bring a heated blanket immediately? Thank you.',
  },
  peaceful: {
    label: 'Calm & Peaceful',
    emoji: '🕊️',
    desc: 'Quiet, serene reassurance for peaceful rest',
    natural: 'Thank you so much for the blanket, Sarah... it feels so warm and peaceful, I think I can finally drift off to sleep now.',
    concise: 'Thank you for the warm blanket, Sarah. I feel so much more comfortable.',
    expressive: 'Oh, thank you, Sarah... this soft warmth brings such a quiet, gentle comfort right now, helping my whole body relax.',
  },
};

export default function InteractivePipelineStepper({
  isPlaying,
  onTogglePlay,
}) {
  const [activeStep, setActiveStep] = useState(2); // default to step 2
  const [stepperTone, setStepperTone] = useState('grateful');

  const currentExample = STEPPER_TONE_EXAMPLES[stepperTone] || STEPPER_TONE_EXAMPLES.grateful;

  return (
    <section id="demo" className="stepper-section">
      <div className="section-header">
        <div className="section-tag scroll-reveal-text">
          <Sparkles size={14} />
          <span>Interactive 3-Step Assistive Pipeline</span>
        </div>
        <h2 className="section-title scroll-reveal-text delay-100">
          How GiftOfVoice Transforms Minimal Clicks into Human Dignity
        </h2>
        <p className="section-desc scroll-reveal-text delay-150">
          Click across the steps below to experience how a single fatigued gesture is enriched into natural human dialogue and spoken with authentic vocal warmth.
        </p>
      </div>

      {/* Stepper Navigation Pills */}
      <div className="stepper-nav-bar scroll-reveal-scale delay-200">
        <button
          onClick={() => setActiveStep(1)}
          className={`step-nav-btn ${activeStep === 1 ? 'active' : ''}`}
        >
          <div className="step-num-bubble">1</div>
          <span>Step 1: Patient Shorthand</span>
        </button>

        <ArrowRight size={14} color="var(--text-dim)" />

        <button
          onClick={() => setActiveStep(2)}
          className={`step-nav-btn ${activeStep === 2 ? 'active' : ''}`}
        >
          <div className="step-num-bubble">2</div>
          <span>Step 2: Gemini 3.6 Expansion</span>
        </button>

        <ArrowRight size={14} color="var(--text-dim)" />

        <button
          onClick={() => setActiveStep(3)}
          className={`step-nav-btn ${activeStep === 3 ? 'active' : ''}`}
        >
          <div className="step-num-bubble">3</div>
          <span>Step 3: ElevenLabs Prosody</span>
        </button>
      </div>

      {/* Dynamic Stepper Card */}
      <div className="stepper-card-container scroll-reveal-scale delay-250">
        {/* STEP 1 */}
        {activeStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--amber)', letterSpacing: '0.04em' }}>
                  The Reality of Motor Fatigue
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-primary)' }}>
                  A non-verbal patient can only manage 2 or 3 clicks per minute
                </h3>
              </div>
              <span className="brand-badge" style={{ color: 'var(--amber)', background: 'var(--amber-subtle)', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
                Physical Limitation
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.6' }}>
              With severe ALS, stroke hemiplegia, or cerebral palsy, typing full sentences is physically exhausting. Traditional AAC systems force patients to endure monotone robotic synthesis (e.g. "THANK. YOU. BLANKET."). In GiftOfVoice, patients simply tap shorthand concepts:
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <div style={{ padding: '14px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart size={18} color="var(--primary)" fill="currentColor" />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>"Thank you so much"</span>
              </div>

              <div style={{ padding: '14px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '2px solid var(--emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={18} color="var(--emerald)" />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>"Warm blanket"</span>
              </div>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveStep(2)} className="btn-primary-glow">
                <span>See How Gemini Expands This →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INTERACTIVE GEMINI EXPANSION DEMO */}
        {activeStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.04em' }}>
                  Google Gemini 3.6 Flash
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-primary)' }}>
                  Contextual & Emotional Intent Expansion
                </h3>
              </div>
              <span className="brand-badge">Dual-API Intelligence</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.6' }}>
              Gemini understands the medical setting (hospital bed, cold night), the caregiver recipient (Nurse Sarah), and dynamically injects the chosen emotional expression into living human dialogue:
            </p>

            {/* Interactive Tone Switcher */}
            <div style={{ background: 'var(--bg-subtle)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>
                Switch Target Expression to see Gemini re-tune the phrasing instantly:
              </span>
              <div className="tone-pills-row" style={{ flexWrap: 'wrap', gap: '8px' }}>
                {Object.entries(STEPPER_TONE_EXAMPLES).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => setStepperTone(key)}
                    className={`tone-pill-btn ${stepperTone === key ? 'active' : ''}`}
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phrasing Cards reflecting the chosen tone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div className="comparison-box-light enhanced">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
                    1. Natural & Conversational
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{currentExample.emoji} {currentExample.label}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic', marginTop: '4px', lineHeight: '1.45' }}>
                  "{currentExample.natural}"
                </p>
              </div>

              <div className="comparison-box-light">
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  2. Concise & Direct
                </span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '4px', lineHeight: '1.45' }}>
                  "{currentExample.concise}"
                </p>
              </div>

              <div className="comparison-box-light">
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--rose)' }}>
                  3. Deep & Expressive
                </span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '4px', lineHeight: '1.45' }}>
                  "{currentExample.expressive}"
                </p>
              </div>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setActiveStep(1)} className="btn-outline">
                <span>← Back to Step 1</span>
              </button>
              <button onClick={() => setActiveStep(3)} className="btn-primary-glow">
                <span>Hear ElevenLabs Speak This →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {activeStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--emerald)', letterSpacing: '0.04em' }}>
                  ElevenLabs Turbo v2.5
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-primary)' }}>
                  Emotional Prosody & Expressive Voice Synthesis
                </h3>
              </div>
              <span className="brand-badge" style={{ color: 'var(--emerald)', background: 'var(--emerald-subtle)', borderColor: 'rgba(5, 150, 105, 0.2)' }}>
                Zero Robotic Sounds
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.6' }}>
              ElevenLabs delivers the expanded dialogue with authentic vocal inflection, warm human breath, and genuine emotional resonance—giving the patient back their unique voice and humanity.
            </p>

            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Spoken Timbre: Grandma Margaret (Elderly Donated Voice)
                </span>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontStyle: 'italic', marginTop: '4px' }}>
                  "Oh Sarah, thank you so much... you have no idea how much comfort this warm blanket gives me tonight."
                </p>
              </div>

              <button
                onClick={onTogglePlay}
                className="btn-primary-glow"
                style={{ padding: '10px 18px' }}
              >
                {isPlaying ? (
                  <>
                    <Pause size={15} />
                    <span>Pause Voice</span>
                  </>
                ) : (
                  <>
                    <Play size={15} fill="currentColor" />
                    <span>Hear Live Speech</span>
                  </>
                )}
              </button>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setActiveStep(2)} className="btn-outline">
                <span>← Back to Step 2</span>
              </button>
              <a href="#studio" className="btn-primary-glow">
                <span>Open Full AAC Studio →</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
