import React from 'react';
import { EMOTIONAL_TONES } from '../data/soundboardItems';
import { Sparkles, Wand2, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function IntentBuilder({
  selectedItems,
  selectedTone,
  setSelectedTone,
  recipient,
  setRecipient,
  expandedResult,
  isExpanding,
  onExpandIntent,
  finalText,
  setFinalText,
}) {
  const keywordStrings = selectedItems.map((i) => i.label);

  return (
    <section className="glass-card">
      {/* Header */}
      <div className="gov-panel-header">
        <div>
          <h2 className="gov-panel-title">
            <span className="gov-dot-indicator gov-dot-emerald" />
            2. Contextual Intent Expander (Google AI / Gemini)
          </h2>
          <p className="gov-panel-desc">
            Translates shorthand keywords into dignified, emotionally resonant human speech with Gemini 3.6 Flash.
          </p>
        </div>

        <span className="gov-challenge-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: 'var(--emerald-light)', background: 'rgba(16, 185, 129, 0.12)' }}>
          Gemini 3.6 Flash Active
        </span>
      </div>

      {/* Row: Emotion Tone Selector + Recipient */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Tone Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="gov-field-label">
            Select Emotional Tone
          </label>
          <div className="gov-tone-grid">
            {EMOTIONAL_TONES.map((tone) => {
              const isSelected = selectedTone === tone.id;
              return (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`gov-tone-btn ${isSelected ? 'active' : ''}`}
                  title={tone.desc}
                >
                  <span className="gov-tone-emoji">{tone.emoji}</span>
                  <span className="gov-tone-label">
                    {tone.label.split('&')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recipient Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="gov-field-label">
            Speaking To (Contextual Nuance)
          </label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="gov-select"
          >
            <option value="caregiver">Caregiver / Nurse</option>
            <option value="spouse">Spouse / Partner</option>
            <option value="child">Child / Grandchild</option>
            <option value="family">Family Gathering</option>
            <option value="doctor">Doctor / Physician</option>
            <option value="friend">Friend / Visitor</option>
          </select>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Gemini dynamically adapts conversational phrasing based on the recipient.
          </p>
        </div>
      </div>

      {/* Trigger Button: Expand Intent */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {selectedItems.length === 0 ? (
            <span style={{ fontStyle: 'italic' }}>Select concepts from the soundboard above or click below to use defaults.</span>
          ) : (
            <span>
              Target Concepts: <strong style={{ color: '#fff' }}>{keywordStrings.join(' + ')}</strong>
            </span>
          )}
        </div>

        <button
          onClick={onExpandIntent}
          disabled={isExpanding}
          className="gov-btn-primary"
        >
          {isExpanding ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Gemini is generating speech...</span>
            </>
          ) : (
            <>
              <Wand2 size={16} />
              <span>Expand Intent with Google Gemini</span>
            </>
          )}
        </button>
      </div>

      {/* Expanded Variations Display */}
      {expandedResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="var(--emerald)" />
              Gemini Variations (Click one to select):
            </span>
            {expandedResult.model_used && (
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                Model: {expandedResult.model_used}
              </span>
            )}
          </div>

          <div className="gov-variations-grid">
            {/* Natural Variation */}
            <div
              onClick={() => setFinalText(expandedResult.natural)}
              className={`gov-var-card ${finalText === expandedResult.natural ? 'active' : ''}`}
            >
              <div>
                <div className="gov-var-badge" style={{ color: 'var(--emerald)' }}>
                  <span>Natural & Balanced</span>
                  {finalText === expandedResult.natural && <CheckCircle2 size={16} />}
                </div>
                <p className="gov-var-text" style={{ marginTop: '6px' }}>
                  "{expandedResult.natural}"
                </p>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Recommended for everyday conversation</span>
            </div>

            {/* Concise Variation */}
            <div
              onClick={() => setFinalText(expandedResult.concise)}
              className={`gov-var-card ${finalText === expandedResult.concise ? 'active' : ''}`}
            >
              <div>
                <div className="gov-var-badge" style={{ color: 'var(--sky-light)' }}>
                  <span>Concise & Direct</span>
                  {finalText === expandedResult.concise && <CheckCircle2 size={16} />}
                </div>
                <p className="gov-var-text" style={{ marginTop: '6px' }}>
                  "{expandedResult.concise}"
                </p>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Direct clarity with minimal fatigue</span>
            </div>

            {/* Expressive Variation */}
            <div
              onClick={() => setFinalText(expandedResult.expressive)}
              className={`gov-var-card ${finalText === expandedResult.expressive ? 'active' : ''}`}
            >
              <div>
                <div className="gov-var-badge" style={{ color: 'var(--rose-light)' }}>
                  <span>Heartfelt & Poetic</span>
                  {finalText === expandedResult.expressive && <CheckCircle2 size={16} />}
                </div>
                <p className="gov-var-text" style={{ marginTop: '6px' }}>
                  "{expandedResult.expressive}"
                </p>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Deep emotional inflection & vulnerability</span>
            </div>
          </div>

          {/* Active Editable Speech Box */}
          <div style={{ marginTop: '8px' }}>
            <label className="gov-field-label">
              Active Sentence for Voice Synthesis (Editable):
            </label>
            <textarea
              rows={2}
              value={finalText}
              onChange={(e) => setFinalText(e.target.value)}
              className="gov-textarea"
              placeholder="Click a variation above or type custom words here..."
            />
          </div>
        </div>
      )}
    </section>
  );
}
