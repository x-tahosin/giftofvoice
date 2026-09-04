import React, { useRef, useEffect, useState } from 'react';
import { COMMUNITY_VOICE_CATALOG } from '../data/voiceCatalog';
import {
  Play,
  Pause,
  Sparkles,
  Download,
  CheckCircle,
  Radio,
} from 'lucide-react';

export default function VoicePlayer({
  activeVoice,
  setActiveVoice,
  currentAudioUrl,
  isPlaying,
  setIsPlaying,
  isSynthesizing,
  onSynthesizeLive,
  finalText,
  isCachedPlayback,
}) {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Synchronize audio playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Canvas visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Draw subtle center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      if (isPlaying) {
        phase += 0.08;
        // Primary emerald sine wave
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#10b981';

        for (let x = 0; x < width; x++) {
          const distance = Math.abs(x - width / 2) / (width / 2);
          const envelope = Math.max(0, 1 - distance);
          const y = midY + Math.sin(x * 0.04 + phase) * Math.cos(x * 0.02 - phase) * (height * 0.38) * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Secondary indigo harmonic wave
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.8)';
        for (let x = 0; x < width; x++) {
          const distance = Math.abs(x - width / 2) / (width / 2);
          const envelope = Math.max(0, 1 - distance);
          const y = midY + Math.sin(x * 0.06 - phase * 1.4) * (height * 0.22) * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        // Idle ambient line
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        for (let x = 0; x < width; x++) {
          const y = midY + Math.sin(x * 0.02) * 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error, triggering Web Speech fallback:', err);
          speakWithBrowserFallback(finalText);
        });
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Browser Web Speech API Fallback
  const speakWithBrowserFallback = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackRate;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="glass-card">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentAudioUrl}
        onEnded={handleAudioEnded}
      />

      {/* Header */}
      <div className="gov-panel-header">
        <div>
          <h2 className="gov-panel-title">
            <span className="gov-dot-indicator gov-dot-rose" />
            3. Expressive Voice Bank & Audio Player (ElevenLabs)
          </h2>
          <p className="gov-panel-desc">
            Speech synthesis modeled after donated community voices with authentic human emotional inflection.
          </p>
        </div>

        <div>
          {isCachedPlayback ? (
            <span className="gov-challenge-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: 'var(--emerald-light)', background: 'rgba(16, 185, 129, 0.12)' }}>
              <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Instant Pre-rendered Audio
            </span>
          ) : (
            <span className="gov-challenge-pill" style={{ borderColor: 'rgba(99, 102, 241, 0.4)', color: 'var(--indigo-light)', background: 'rgba(99, 102, 241, 0.12)' }}>
              <Radio size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Live ElevenLabs Stream
            </span>
          )}
        </div>
      </div>

      {/* Voice Selection Cards */}
      <div>
        <label className="gov-field-label">
          Select Donated Community Voice
        </label>
        <div className="gov-voices-grid">
          {COMMUNITY_VOICE_CATALOG.map((voice) => {
            const isSelected = activeVoice?.id === voice.id;
            return (
              <div
                key={voice.id}
                onClick={() => setActiveVoice(voice)}
                className={`gov-voice-card ${isSelected ? 'active' : ''}`}
              >
                <div>
                  <div className="gov-voice-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="gov-voice-avatar">{voice.avatar}</span>
                      <div>
                        <h4 className="gov-voice-name">{voice.shortName}</h4>
                        <span className="gov-voice-timbre">{voice.timbre}</span>
                      </div>
                    </div>
                    {isSelected && <CheckCircle size={18} color="var(--indigo-light)" />}
                  </div>
                  <p className="gov-voice-story" style={{ marginTop: '8px' }}>
                    "{voice.donorStory}"
                  </p>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--indigo-light)', background: 'rgba(99, 102, 241, 0.12)', padding: '2px 8px', borderRadius: '6px', width: 'fit-content' }}>
                  {voice.bestFor.split(',')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Waveform Visualizer Canvas */}
      <div className="gov-waveform-box">
        <canvas
          ref={canvasRef}
          width={600}
          height={64}
          className="gov-waveform-canvas"
        />

        <div className="gov-waveform-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="gov-status-dot" style={{ background: isPlaying ? 'var(--emerald)' : 'var(--text-dim)' }} />
            <span>Status: {isPlaying ? 'Speaking Aloud' : currentAudioUrl ? 'Audio Ready' : 'Awaiting Synthesis'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Voice: <strong style={{ color: '#fff' }}>{activeVoice?.shortName}</strong></span>
            <span>Speed: <strong style={{ color: '#fff' }}>{playbackRate}x</strong></span>
          </div>
        </div>
      </div>

      {/* Control Bar: Play / Pause, Synthesize Live, Speed, Download */}
      <div className="gov-controls-bar">
        <div className="gov-controls-left">
          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            disabled={!currentAudioUrl && !finalText}
            className="gov-btn-play"
            aria-label={isPlaying ? 'Pause speech' : 'Play speech'}
          >
            {isPlaying ? (
              <>
                <Pause size={18} />
                <span>Pause Speech</span>
              </>
            ) : (
              <>
                <Play size={18} fill="currentColor" />
                <span>Play Donated Voice</span>
              </>
            )}
          </button>

          {/* Generate Live with ElevenLabs */}
          <button
            onClick={onSynthesizeLive}
            disabled={isSynthesizing || !finalText}
            className="gov-btn-ghost"
            style={{ padding: '12px 18px', fontWeight: 700 }}
            title="Generate custom real-time audio with ElevenLabs API"
          >
            <Sparkles size={16} color="var(--rose-light)" className={isSynthesizing ? 'animate-spin' : ''} />
            <span>{isSynthesizing ? 'Synthesizing with ElevenLabs...' : 'Generate Live Speech'}</span>
          </button>

          {/* Browser Web Speech Fallback Button */}
          <button
            onClick={() => speakWithBrowserFallback(finalText)}
            disabled={!finalText}
            className="gov-btn-ghost"
            style={{ padding: '12px 16px', color: 'var(--text-muted)' }}
            title="Browser Web Speech API fallback (works 100% offline)"
          >
            Browser Offline Speech
          </button>
        </div>

        {/* Speed Adjustment + Download */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="gov-speed-group">
            {[0.8, 1.0, 1.2].map((rate) => (
              <button
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={`gov-speed-btn ${playbackRate === rate ? 'active' : ''}`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {currentAudioUrl && currentAudioUrl.startsWith('data:audio') && (
            <a
              href={currentAudioUrl}
              download="GiftOfVoice_Speech.mp3"
              className="gov-btn-ghost"
              style={{ padding: '10px' }}
              title="Download MP3 Audio File"
            >
              <Download size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
