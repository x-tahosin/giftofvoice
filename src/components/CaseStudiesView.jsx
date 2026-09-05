import React, { useState, useEffect, useRef } from 'react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import {
  Play,
  Pause,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Clock,
  User,
  Volume2,
  CheckCircle2,
} from 'lucide-react';

export default function CaseStudiesView({
  onSelectScenario,
  activeScenarioId,
  isPlaying,
  onLoadIntoStudio,
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const touchStartX = useRef(null);

  const currentScenario = DEMO_SCENARIOS[selectedIdx] || DEMO_SCENARIOS[0];
  const isCurrentPlaying = activeScenarioId === currentScenario.id && isPlaying;

  // Continuous Auto-Advance: Automatically slides from one event to the next every 4.8 seconds
  // Will only pause temporarily if speech audio is actively playing, resuming right after.
  useEffect(() => {
    if (!isAutoPlay || isPlaying) {
      return;
    }

    const intervalTime = 40; // ms
    const totalDuration = 4800; // 4.8 seconds per event
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setSelectedIdx((curr) => (curr + 1) % DEMO_SCENARIOS.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlay, isPlaying, selectedIdx]);

  // Synchronize active scenario with external selection when playing
  useEffect(() => {
    if (activeScenarioId && isPlaying) {
      const foundIdx = DEMO_SCENARIOS.findIndex((s) => s.id === activeScenarioId);
      if (foundIdx !== -1 && foundIdx !== selectedIdx) {
        setSelectedIdx(foundIdx);
        setSlideProgress(0);
      }
    }
  }, [activeScenarioId, isPlaying]);

  const handlePrev = () => {
    setSlideProgress(0);
    setSelectedIdx((prev) => (prev - 1 + DEMO_SCENARIOS.length) % DEMO_SCENARIOS.length);
  };

  const handleNext = () => {
    setSlideProgress(0);
    setSelectedIdx((prev) => (prev + 1) % DEMO_SCENARIOS.length);
  };

  const handleSlideSelect = (index) => {
    setSlideProgress(0);
    setSelectedIdx(index);
  };

  // Touch swipe support for mobile/tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="cases" className="cases-section">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag scroll-reveal-text">
          <Heart size={14} color="var(--rose)" />
          <span>Clinical & Family Evaluation Suite</span>
        </div>
        <h2 className="section-title scroll-reveal-text delay-100">
          Real-World Assistive Communication Stories
        </h2>
        <p className="section-desc scroll-reveal-text delay-150">
          Witness how GiftOfVoice bridges severe motor fatigue with authentic emotional connection. Stories automatically advance below one after another. Each is synthesized with genuine human warmth and vocal dynamics.
        </p>
      </div>

      {/* Main Sliding Carousel Container */}
      <div
        className="carousel-outer-wrapper scroll-reveal-scale delay-200"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="carousel-arrow-btn left"
          aria-label="Previous scenario"
          title="Previous story"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNext}
          className="carousel-arrow-btn right"
          aria-label="Next scenario"
          title="Next story"
        >
          <ChevronRight size={22} />
        </button>

        {/* Carousel Viewport */}
        <div className="carousel-viewport">
          <div
            className="carousel-slider-track"
            style={{
              transform: `translateX(-${selectedIdx * 100}%)`,
            }}
          >
            {DEMO_SCENARIOS.map((scenario, index) => {
              const isSlideActive = index === selectedIdx;
              const isThisPlaying = activeScenarioId === scenario.id && isPlaying;

              return (
                <div key={scenario.id} className="carousel-slide-item">
                  <div className="carousel-slide-inner">
                    {/* Left Column: Heart-touching Documentary Photography */}
                    <div className="carousel-photo-col">
                      <div className="carousel-photo-frame">
                        <img
                          src={scenario.image}
                          alt={scenario.title}
                          className="carousel-photo-img"
                          loading="lazy"
                        />
                        <div className="carousel-photo-overlay" />
                        <div className="carousel-photo-badge">
                          <span className="brand-badge" style={{ background: 'rgba(0,0,0,0.75)', color: '#fff', backdropFilter: 'blur(6px)' }}>
                            {scenario.badge}
                          </span>
                        </div>
                        <div className="carousel-photo-caption">
                          <strong>{scenario.title}</strong>
                          <p>{scenario.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column: The 2-Step Transformation Journey */}
                    <div className="carousel-journey-col">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                        <span className="brand-badge" style={{ color: 'var(--primary)' }}>
                          {scenario.badge}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          Emotional Tone: <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{scenario.tone}</strong>
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.38rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.25' }}>
                        {scenario.title}
                      </h3>

                      {/* Step A: Sparse Concept Input */}
                      <div className="journey-step-box">
                        <div className="step-label-strip">
                          <span>1. PATIENT FATIGUE INPUT (SPARSE CONCEPTS)</span>
                        </div>
                        <div className="concept-tokens-list">
                          {scenario.keywords.map((kw, i) => (
                            <span key={i} className="concept-token-pill">
                              {kw.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Step B: Gemini 3.6 Flash Contextual Expansion */}
                      <div className="journey-step-box gemini-result">
                        <div className="step-label-strip" style={{ color: 'var(--primary)' }}>
                          <Sparkles size={12} />
                          <span>2. GEMINI 3.6 FLASH CONTEXTUAL EXPANSION</span>
                        </div>
                        <p className="expanded-quote-text">
                          "{scenario.expandedSpeech}"
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Audio Playback & Actions */}
                    <div className="carousel-audio-col">
                      <div className="audio-action-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <div className={`live-dot ${isThisPlaying ? 'pulsing' : ''}`} />
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            ElevenLabs Voice Synthesis
                          </span>
                        </div>

                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                          Donated Vocal Timbre<br />
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{scenario.voiceName}</strong>
                        </div>

                        {/* Animated Waveform Visualization */}
                        <div className="mini-waveform-box">
                          {[0.3, 0.7, 0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3].map((h, i) => (
                            <div
                              key={i}
                              className={`mini-wave-bar ${isThisPlaying ? 'active' : ''}`}
                              style={{
                                height: `${h * 100}%`,
                                animationDelay: `${(i * 0.08).toFixed(2)}s`,
                                background: isThisPlaying ? 'var(--emerald)' : 'var(--border-hover)',
                              }}
                            />
                          ))}
                        </div>

                        {/* Play / Listen Button */}
                        <button
                          onClick={() => {
                            setSlideProgress(0);
                            setSelectedIdx(index);
                            onSelectScenario(scenario);
                          }}
                          className="btn-primary-glow"
                          style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '12px' }}
                        >
                          {isThisPlaying ? (
                            <>
                              <Pause size={16} />
                              <span>Pause Speech</span>
                            </>
                          ) : (
                            <>
                              <Play size={16} fill="currentColor" />
                              <span>Listen to Heartfelt Speech</span>
                            </>
                          )}
                        </button>

                        {/* Load into Interactive Studio Button */}
                        <button
                          onClick={() => onLoadIntoStudio(scenario)}
                          className="btn-outline"
                          style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '0.78rem', padding: '9px' }}
                          title="Open this scenario in AAC Studio to customize words and tone"
                        >
                          <span>Load into Interactive Studio</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continuous Story Auto-Scroll Progress Line */}
        {isAutoPlay && !isPlaying && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              width: `${slideProgress}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--amber), var(--emerald))',
              boxShadow: '0 0 10px var(--primary)',
              transition: 'width 0.04s linear',
              zIndex: 10,
            }}
          />
        )}

        {/* Slide Indicator Dots & Auto-Play Controls */}
        <div className="carousel-indicators-bar">
          <div className="carousel-dots-list">
            {DEMO_SCENARIOS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideSelect(i)}
                className={`carousel-dot-btn ${i === selectedIdx ? 'active' : ''}`}
                aria-label={`Go to story ${i + 1}`}
              >
                {i === selectedIdx && isAutoPlay && !isPlaying && (
                  <div
                    className="carousel-dot-fill"
                    style={{
                      width: `${slideProgress}%`,
                      transition: 'width 0.04s linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isPlaying ? (
                <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>🔊 Audio Playing • Resumes after speech</span>
              ) : isAutoPlay ? (
                <>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block', boxShadow: '0 0 6px var(--emerald)' }} />
                  <span>Story <strong>{selectedIdx + 1}</strong> of {DEMO_SCENARIOS.length} • Auto-advancing</span>
                </>
              ) : (
                <>Story <strong>{selectedIdx + 1}</strong> of {DEMO_SCENARIOS.length}</>
              )}
            </span>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="btn-ghost"
              style={{ fontSize: '0.74rem', padding: '4px 8px' }}
              title="Toggle automatic sliding"
            >
              {isAutoPlay ? '⏸ Pause Auto' : '▶ Auto-Advance'}
            </button>
          </div>
        </div>
      </div>

      {/* Story Quick-Selector Cards Below */}
      <div className="case-selector-strip reveal-on-scroll" style={{ marginTop: '24px' }}>
        {DEMO_SCENARIOS.map((scenario, index) => {
          const isActive = index === selectedIdx;
          return (
            <button
              key={scenario.id}
              onClick={() => {
                setSlideProgress(0);
                setSelectedIdx(index);
              }}
              className={`case-tab-card ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={scenario.image}
                  alt={scenario.title}
                  style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {scenario.badge}
                  </div>
                  <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {scenario.title}
                  </h4>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
