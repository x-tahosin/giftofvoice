import React, { useState } from 'react';
import {
  SOUNDBOARD_CATEGORIES,
  SOUNDBOARD_ITEMS,
  EMOTIONAL_TONES,
} from '../data/soundboardItems';
import { COMMUNITY_VOICE_CATALOG } from '../data/voiceCatalog';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import {
  HeartHandshake,
  CupSoda,
  Heart,
  Smile,
  AlertCircle,
  Volume2,
  Check,
  Sparkles,
  Sun,
  ThumbsUp,
  Flame,
  Bed,
  MoveUp,
  Moon,
  Award,
  Users,
  Hand,
  MessageCircle,
  Laugh,
  Eye,
  ShieldCheck,
  Pill,
  Wind,
  ShieldAlert,
  PhoneCall,
  Play,
  Pause,
  Wand2,
  RefreshCw,
  Radio,
  CheckCircle2,
  Zap,
  FastForward,
} from 'lucide-react';

const ICON_MAP = {
  HeartHandshake,
  CupSoda,
  Heart,
  Smile,
  AlertCircle,
  Sparkles,
  Sun,
  ThumbsUp,
  Flame,
  Bed,
  MoveUp,
  Moon,
  Award,
  Users,
  Hand,
  MessageCircle,
  Laugh,
  Eye,
  ShieldCheck,
  Pill,
  Wind,
  ShieldAlert,
  PhoneCall,
};

export default function StudioWorkspace({
  voiceCatalog,
  selectedItems,
  onToggleItem,
  onClearItems,
  onQuickSpeak,
  selectedTone,
  setSelectedTone,
  onToneChange,
  recipient,
  setRecipient,
  expandedResult,
  isExpanding,
  onExpandIntent,
  finalText,
  setFinalText,
  activeVoice,
  setActiveVoice,
  currentAudioUrl,
  isPlaying,
  onTogglePlay,
  isSynthesizing,
  onSynthesizeLive,
  isCachedPlayback,
  onSelectScenario,
  onInstantSpeakSoundboard,
  activeScenarioId,
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [customConcept, setCustomConcept] = useState('');

  const handleAddCustomConcept = (e) => {
    if (e) e.preventDefault();
    const trimmed = customConcept.trim();
    if (!trimmed) return;

    const newItem = {
      id: `custom_${Date.now()}`,
      label: trimmed,
      category: 'custom',
      icon: 'Sparkles',
    };
    onToggleItem(newItem);
    setCustomConcept('');
  };

  const filteredItems =
    activeCategory === 'all'
      ? SOUNDBOARD_ITEMS
      : SOUNDBOARD_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="studio" className="studio-section">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag scroll-reveal-text">
          <Zap size={14} color="var(--primary)" />
          <span>Interactive AAC Assistive Studio</span>
        </div>
        <h2 className="section-title scroll-reveal-text delay-100">
          Assistive Expression Canvas & Voice Engine
        </h2>
        <p className="section-desc scroll-reveal-text delay-150">
          Designed for minimal motor fatigue and maximum ease of use. Choose an instant 1-click preset below for immediate speech, or tap concepts on the soundboard to generate tailored human dialogue.
        </p>
      </div>

      {/* =========================================================================
          FEATURE 1: 1-CLICK QUICK EXPRESSION PRESETS (INSTANT EASE OF USE)
          ========================================================================= */}
      <div className="quick-presets-container scroll-reveal-scale delay-200">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.84rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
              1-Click Instant Express Presets (Zero Latency)
            </span>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Tap once to speak immediately
          </span>
        </div>

        <div className="quick-presets-grid">
          {DEMO_SCENARIOS.map((scenario) => {
            const isThisPlaying = isPlaying && (currentAudioUrl === scenario.audioUrl || activeScenarioId === scenario.id);
            return (
              <div key={scenario.id} className="quick-preset-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={scenario.image}
                    alt={scenario.title}
                    style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', rowGap: '2px' }}>
                      <span className="brand-badge" style={{ fontSize: '0.66rem', padding: '2px 6px', whiteSpace: 'nowrap' }}>
                        {scenario.badge}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        Voice: <strong style={{ color: 'var(--text-primary)' }}>{scenario.voiceName.split(' ')[0]}</strong>
                      </span>
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {scenario.title}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '8px 0', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{scenario.expandedSpeech}"
                </p>

                <button
                  onClick={() => onSelectScenario(scenario)}
                  className={isThisPlaying ? 'btn-danger' : 'btn-primary-glow'}
                  style={{ width: '100%', justifyContent: 'center', padding: '9px 10px', fontSize: '0.8rem', boxSizing: 'border-box' }}
                >
                  {isThisPlaying ? (
                    <>
                      <Pause size={14} />
                      <span>Pause Speech</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>1-Tap Instant Speak</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2-COLUMN STUDIO WORKSPACE (SOUNDBOARD + ENGINE)
          ========================================================================= */}
      <div className="studio-grid-2col" style={{ marginTop: '28px' }}>
        {/* =======================================================================
            LEFT COLUMN: AAC SOUNDBOARD
            ======================================================================= */}
        <div className="studio-card-panel scroll-reveal-left delay-150">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                1. Expression Soundboard (AAC)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {selectedItems.length} concept{selectedItems.length === 1 ? '' : 's'} selected
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedItems.length > 0 && (
                <>
                  <button
                    onClick={onClearItems}
                    className="btn-outline"
                    style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    <span>Clear</span>
                  </button>

                  <button
                    onClick={() => (onInstantSpeakSoundboard ? onInstantSpeakSoundboard() : onExpandIntent && onExpandIntent())}
                    className="btn-primary-glow"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    title="Generate speech and speak immediately"
                  >
                    <Zap size={13} fill="currentColor" />
                    <span>Instant Speak</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="category-chip-bar">
            {SOUNDBOARD_CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? SOUNDBOARD_ITEMS.length
                  : SOUNDBOARD_ITEMS.filter((i) => i.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-chip ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span style={{ fontSize: '0.68rem', opacity: 0.75, marginLeft: '4px' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Concept Chips */}
          {selectedItems.length > 0 ? (
            <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--primary-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', marginRight: '4px' }}>
                Queued:
              </span>
              {selectedItems.map((item) => (
                <span
                  key={item.id}
                  onClick={() => onToggleItem(item)}
                  className="brand-badge"
                  style={{
                    background: item.category === 'custom' ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                    border: item.category === 'custom' ? '1px solid var(--primary)' : '1px solid var(--border)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px'
                  }}
                  title="Click to remove"
                >
                  {item.category === 'custom' && <Sparkles size={11} color="var(--primary)" />}
                  <span>{item.label}</span>
                  <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>×</span>
                </span>
              ))}
            </div>
          ) : (
            <div style={{ background: 'var(--bg-subtle)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '12px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Tap any phrase tile below, or type any custom need.
            </div>
          )}

          {/* Custom Concept / Intent Input Bar (For anything outside preset tiles) */}
          <form onSubmit={handleAddCustomConcept} className="custom-concept-bar">
            <div className="custom-concept-input-wrap">
              <Sparkles size={15} className="custom-concept-icon" />
              <input
                type="text"
                value={customConcept}
                onChange={(e) => setCustomConcept(e.target.value)}
                placeholder="Need something outside presets? Type keyword (e.g. coffee, open window, itchy foot)..."
                className="custom-concept-input"
                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
              />
            </div>
            <button
              type="submit"
              disabled={!customConcept.trim()}
              className="btn-primary-glow custom-concept-btn"
              title="Add custom keyword to soundboard selection for AI expansion"
            >
              <span>+ Add Concept</span>
            </button>
          </form>

          {/* Soundboard Tiles Grid */}
          <div className="soundboard-tiles-grid">
            {filteredItems.map((item) => {
              const isSelected = selectedItems.some((i) => i.id === item.id);
              const IconComponent = ICON_MAP[item.icon] || Heart;

              return (
                <button
                  key={item.id}
                  onClick={() => onToggleItem(item)}
                  className={`tile-btn ${isSelected ? 'selected' : ''}`}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <div className="tile-check-icon">
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}

                  <div style={{ color: isSelected ? 'var(--primary)' : 'var(--text-secondary)' }}>
                    <IconComponent size={22} />
                  </div>

                  <span className="tile-label">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Direct 1-Tap Emergency & Basic Needs Bar */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: 'auto' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              One-Tap Direct Speech (No Wait):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { label: '💧 Water Please', text: 'Could I please have a sip of cold water?' },
                { label: '🛏 Adjust Pillow', text: 'Could you please help adjust my pillow gently?' },
                { label: '💖 Thank You', text: 'Thank you so much, your kindness means everything to me.' },
                { label: '🚨 Urgent Nurse', text: 'Excuse me, I need assistance right now.' },
              ].map((direct, i) => (
                <button
                  key={i}
                  onClick={() => onQuickSpeak(direct.text)}
                  className="btn-outline"
                  style={{ fontSize: '0.74rem', padding: '6px 10px', borderRadius: 'var(--radius-full)' }}
                  title="Speak instantly with browser voice"
                >
                  <span>{direct.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =======================================================================
            RIGHT COLUMN: GEMINI INTENT & ELEVENLABS ENGINE
            ======================================================================= */}
        <div className="studio-card-panel scroll-reveal-right delay-200">
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              2. Voice & Intent Engine
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Google Gemini 3.6 Flash + ElevenLabs Turbo v2.5
            </p>
          </div>

          {/* Emotional Prosody Tone */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Emotional Prosody & Inflection
            </span>
            <div className="tone-pills-row">
              {EMOTIONAL_TONES.map((tone) => {
                const isSelected = selectedTone === tone.id;
                return (
                  <button
                    key={tone.id}
                    onClick={() => {
                      setSelectedTone(tone.id);
                      if (onToneChange) {
                        onToneChange(tone.id);
                      }
                    }}
                    className={`tone-pill-btn ${isSelected ? 'active' : ''}`}
                    title={`Switch emotional expression to ${tone.label}`}
                  >
                    <span>{tone.emoji}</span>
                    <span>{tone.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Expression Feedback Banner */}
          <div style={{
            background: isExpanding ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
            border: isExpanding ? '1px solid var(--primary)' : '1px solid var(--border)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.25s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={14} color={isExpanding ? 'var(--primary)' : 'var(--emerald)'} />
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: isExpanding ? 'var(--primary)' : 'var(--text-primary)' }}>
                {isExpanding
                  ? `Composing ${EMOTIONAL_TONES.find((t) => t.id === selectedTone)?.label || selectedTone} Phrasing...`
                  : `Active Expression: ${EMOTIONAL_TONES.find((t) => t.id === selectedTone)?.label || selectedTone}`}
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Google Gemini 3.6 Flash
            </span>
          </div>

          {/* Recipient & Generate Button */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Conversation Partner
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600 }}
              >
                <option value="nurse">Caregiver / Nurse</option>
                <option value="doctor">Attending Physician</option>
                <option value="family">Spouse / Family</option>
                <option value="friend">Close Friend</option>
                <option value="child">Grandchild / Child</option>
              </select>
            </div>

            <div style={{ alignSelf: 'flex-end' }}>
              <button
                onClick={() => (onInstantSpeakSoundboard ? onInstantSpeakSoundboard() : onExpandIntent && onExpandIntent())}
                disabled={isExpanding || isSynthesizing || (!finalText && selectedItems.length === 0)}
                className="btn-primary-glow"
                style={{ padding: '10px 18px', fontSize: '0.84rem' }}
                title="Generate speech and speak with chosen vocal timbre"
              >
                {isExpanding ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Expanding...</span>
                  </>
                ) : isSynthesizing ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause size={15} />
                    <span>Pause Speech</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} fill="currentColor" />
                    <span>Generate Speech</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Gemini Phrasing Options */}
          {expandedResult && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: isExpanding ? 0.6 : 1, transition: 'opacity 0.2s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Preferred Phrasing (Gemini 3.6 Flash)
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {(selectedItems.length > 0 || finalText) && (
                    <button
                      onClick={() => onExpandIntent && onExpandIntent(null, true)}
                      disabled={isExpanding}
                      className="btn-outline"
                      style={{ padding: '2px 8px', fontSize: '0.68rem', borderRadius: 'var(--radius-sm)' }}
                      title="Re-run Gemini contextual expansion with fresh phrasing variations"
                    >
                      <RefreshCw size={11} className={isExpanding ? 'animate-spin' : ''} />
                      <span>Regenerate Phrasings</span>
                    </button>
                  )}
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Tap option to select
                  </span>
                </div>
              </div>

              {/* Natural */}
              <div
                onClick={() => setFinalText(expandedResult.natural)}
                className={`phrasing-card ${finalText === expandedResult.natural ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--emerald)' }}>Natural & Warm</span>
                  {finalText === expandedResult.natural && <CheckCircle2 size={14} color="var(--primary)" />}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontStyle: 'italic', marginTop: '2px' }}>
                  "{expandedResult.natural}"
                </p>
              </div>

              {/* Concise */}
              <div
                onClick={() => setFinalText(expandedResult.concise)}
                className={`phrasing-card ${finalText === expandedResult.concise ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Concise & Direct</span>
                  {finalText === expandedResult.concise && <CheckCircle2 size={14} color="var(--primary)" />}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                  "{expandedResult.concise}"
                </p>
              </div>

              {/* Expressive */}
              <div
                onClick={() => setFinalText(expandedResult.expressive)}
                className={`phrasing-card ${finalText === expandedResult.expressive ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--rose)' }}>Deep & Heartfelt</span>
                  {finalText === expandedResult.expressive && <CheckCircle2 size={14} color="var(--primary)" />}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                  "{expandedResult.expressive}"
                </p>
              </div>

              {/* Editable Speech Input */}
              <div className="speech-composer-box">
                <div className="speech-composer-header">
                  <span>Speech Output (Direct Editable)</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--primary)', textTransform: 'none', fontWeight: 600 }}>
                    Type or customize any full sentence here
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={finalText}
                  onChange={(e) => setFinalText(e.target.value)}
                  className="speech-composer-textarea"
                  placeholder="Type any custom sentence or edit phrasing here to speak..."
                />
              </div>
            </div>
          )}

          {/* Voice Selection & Synthesis */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Donated Vocal Timbre
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {isCachedPlayback ? 'Pre-rendered Audio' : 'Live ElevenLabs Cloud'}
              </span>
            </div>

            {/* Voice Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(voiceCatalog || COMMUNITY_VOICE_CATALOG).map((v) => {
                const isSelected = activeVoice?.id === v.id;
                const isDonated = v.id && v.id.startsWith('donated_');
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveVoice(v)}
                    className={`tone-pill-btn ${isSelected ? 'active' : ''}`}
                    style={isDonated ? { borderColor: 'var(--primary)', boxShadow: isSelected ? '0 0 0 2px var(--primary)' : '0 0 8px var(--primary-glow)' } : {}}
                    title={isDonated ? `${v.name} (Community Donated Voice)` : v.name}
                  >
                    <span>{v.avatar}</span>
                    <span>{v.shortName}</span>
                    {isDonated && <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 800 }}>★</span>}
                  </button>
                );
              })}
            </div>

            {/* Play & Cloud Synthesize Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
              <button
                onClick={onTogglePlay}
                disabled={!currentAudioUrl && !finalText}
                className="btn-primary-glow"
                style={{ justifyContent: 'center', padding: '12px' }}
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} />
                    <span>Pause Speech</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>Play Voice</span>
                  </>
                )}
              </button>

              <button
                onClick={onSynthesizeLive}
                disabled={isSynthesizing || !finalText}
                className="btn-outline"
                style={{ padding: '10px 16px', fontSize: '0.82rem' }}
                title="Synthesize custom text via live ElevenLabs API"
              >
                <Sparkles size={14} color="var(--primary)" />
                <span>{isSynthesizing ? 'Rendering...' : 'Live Cloud TTS'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
