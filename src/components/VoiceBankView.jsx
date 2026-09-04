import React, { useState, useRef } from 'react';
import { COMMUNITY_VOICE_CATALOG } from '../data/voiceCatalog';
import { Mic, Square, RotateCcw, Heart, CheckCircle2, Sparkles } from 'lucide-react';

export default function VoiceBankView({
  voiceCatalog,
  onAddDonatedVoice,
  onPlaySample,
  activeVoice,
  setActiveVoice,
  isPlaying,
  currentAudioUrl,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [donorName, setDonorName] = useState('');
  const [donorStory, setDonorStory] = useState('');
  const [hasConsented, setHasConsented] = useState(false);
  const [isDonated, setIsDonated] = useState(false);

  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setRecordedAudioUrl(reader.result);
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => setRecordingSeconds((prev) => prev + 1), 1000);
    } catch (err) {
      alert('Microphone access is required to donate a voice sample.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    setIsDonated(false);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!hasConsented) {
      alert('Please agree to the ethical release terms.');
      return;
    }

    const newVoice = {
      id: `donated_${Date.now()}`,
      name: `${donorName || 'Community Hero'} (Donated)`,
      shortName: donorName ? donorName.split(' ')[0] : 'Hero',
      gender: 'Neutral',
      timbre: 'Warm, sincere community timbre',
      accent: 'Natural',
      avatar: '🌟',
      donorStory: donorStory || 'Donated vocal warmth to empower non-verbal speech.',
      bestFor: 'Everyday communication, bedside comfort',
      sampleText: 'Thank you for giving me the opportunity to share my voice with you.',
      audioUrl: recordedAudioUrl,
    };

    if (onAddDonatedVoice) onAddDonatedVoice(newVoice);
    setIsDonated(true);
  };

  return (
    <section id="donors" className="donors-section">
      <div className="section-header">
        <div className="section-tag scroll-reveal-text">
          <Heart size={14} color="var(--primary)" />
          <span>Community Generosity Wall</span>
        </div>
        <h2 className="section-title scroll-reveal-text delay-100">
          The Open Voice Bank
        </h2>
        <p className="section-desc scroll-reveal-text delay-150">
          Healthy volunteers donate their vocal timbre, cadence, and breath so people living with ALS, stroke, or speech impairments can speak with human tenderness rather than robotic monotones.
        </p>
      </div>

      {/* Active Donated Vocal Timbres */}
      <div className="donor-cards-layout">
        {COMMUNITY_VOICE_CATALOG.map((voice, idx) => (
          <div
            key={voice.id}
            className={`donor-profile-card delay-${Math.min((idx + 1) * 100, 400)}`}
          >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minHeight: '68px' }}>
                <div className="donor-avatar-circle">
                  {voice.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.25', margin: 0 }}>
                    {voice.name}
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{voice.timbre}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.45', flex: 1, margin: '0 0 12px 0' }}>
                "{voice.donorStory}"
              </p>

              <div style={{
                fontSize: '0.74rem',
                color: 'var(--emerald)',
                background: 'rgba(78, 205, 196, 0.12)',
                border: '1px solid rgba(78, 205, 196, 0.28)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                width: '100%',
                boxSizing: 'border-box',
                fontWeight: 600,
                marginTop: 'auto',
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
              }}>
                Best For: {voice.bestFor}
              </div>
            </div>
          ))}
      </div>

      {/* In-Browser Microphone Recording Studio */}
      <div className="mic-studio-card scroll-reveal-scale delay-200">
        {/* Left: Recording Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: isRecording ? 'var(--primary-subtle)' : recordedAudioUrl ? 'var(--emerald-subtle)' : 'var(--bg-subtle)',
            border: `2px solid ${isRecording ? 'var(--primary)' : recordedAudioUrl ? 'var(--emerald)' : 'var(--border)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isRecording ? 'var(--primary)' : recordedAudioUrl ? 'var(--emerald)' : 'var(--text-muted)',
            transition: 'all 0.3s ease',
          }}>
            <Mic size={32} />
          </div>

          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:{String(recordingSeconds % 60).padStart(2, '0')}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isRecording ? 'Recording your voice sample...' : recordedAudioUrl ? 'Sample recorded successfully' : 'Record 15–30 seconds of gentle speech'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {!isRecording && !recordedAudioUrl && (
              <button onClick={startRecording} className="btn-primary-glow" style={{ padding: '9px 18px' }}>
                <Mic size={15} />
                <span>Start Donating Voice</span>
              </button>
            )}

            {isRecording && (
              <button onClick={stopRecording} className="btn-primary-glow" style={{ padding: '9px 18px' }}>
                <Square size={14} fill="currentColor" />
                <span>Finish Recording</span>
              </button>
            )}

            {recordedAudioUrl && (
              <button onClick={resetRecording} className="btn-outline" style={{ padding: '9px 14px' }}>
                <RotateCcw size={14} />
                <span>Re-record</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Dedication & Ethics Form */}
        <div>
          {isDonated ? (
            <div style={{ background: 'var(--emerald-subtle)', border: '1px solid rgba(5, 150, 105, 0.2)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={36} color="var(--emerald)" />
              <h4 style={{ fontWeight: 800, color: 'var(--emerald)', fontSize: '1.05rem' }}>Voice Donated to the Open Bank!</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Thank you for your generosity. Your vocal timbre has been added to the active catalog above and can now give voice to non-verbal patients.
              </p>
              <button
                type="button"
                onClick={resetRecording}
                className="btn-outline"
                style={{ padding: '7px 16px', fontSize: '0.78rem', marginTop: '6px' }}
              >
                <span>Record & Donate Another Voice</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Your Name or Pseudonym
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Elena Vance, Hospice Caregiver"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Dedication or Story
                </label>
                <input
                  type="text"
                  value={donorStory}
                  onChange={(e) => setDonorStory(e.target.value)}
                  placeholder="e.g. Dedicated to my father who lost his voice to ALS."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  style={{ marginTop: '3px' }}
                />
                <label htmlFor="consent" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  I grant irrevocable, royalty-free permission to use this vocal timbre solely for assistive speech and humanitarian AAC communication.
                </label>
              </div>

              <button
                type="submit"
                disabled={!recordedAudioUrl || !hasConsented}
                className="btn-primary-glow"
                style={{ justifyContent: 'center', marginTop: '4px', opacity: (!recordedAudioUrl || !hasConsented) ? 0.5 : 1 }}
              >
                <Heart size={16} />
                <span>Submit Voice to Open Bank</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
