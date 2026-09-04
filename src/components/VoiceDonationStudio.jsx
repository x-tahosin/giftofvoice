import React, { useState, useRef } from 'react';
import {
  Mic,
  Square,
  RotateCcw,
  CheckCircle2,
  Heart,
  Info,
} from 'lucide-react';

export default function VoiceDonationStudio({ onAddDonatedVoice }) {
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

  // Start audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied or unavailable:', err);
      alert('Microphone access is needed to record a voice donation sample.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Reset recording
  const resetRecording = () => {
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    setIsDonated(false);
  };

  // Submit donation
  const handleSubmitDonation = (e) => {
    e.preventDefault();
    if (!hasConsented) {
      alert('Please accept the ethical consent & release agreement.');
      return;
    }

    const newVoice = {
      id: `donated_${Date.now()}`,
      name: `${donorName || 'Anonymous Hero'} (Donated Voice)`,
      shortName: donorName ? donorName.split(' ')[0] : 'Hero',
      gender: 'Neutral',
      timbre: 'Warm, empathetic, human',
      accent: 'Community Donated',
      avatar: '🌟',
      donorStory: donorStory || 'Donated vocal warmth to support non-verbal communication and dignity.',
      bestFor: 'Everyday conversations, expressing gratitude and comfort',
      sampleText: 'Thank you for your warmth today. I am happy to be speaking with you.',
      audioUrl: recordedAudioUrl,
    };

    if (onAddDonatedVoice) {
      onAddDonatedVoice(newVoice);
    }

    setIsDonated(true);
  };

  return (
    <section className="glass-card" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', background: 'linear-gradient(180deg, rgba(16, 35, 45, 0.6) 0%, rgba(10, 16, 30, 0.85) 100%)' }}>
      {/* Header */}
      <div className="gov-panel-header">
        <div>
          <h2 className="gov-panel-title">
            <span className="gov-dot-indicator gov-dot-emerald" />
            The Voice Generosity Studio (Donate Your Voice)
          </h2>
          <p className="gov-panel-desc">
            Generosity is more than money. Donate your voice so someone who cannot speak can communicate with human warmth.
          </p>
        </div>

        <span className="gov-challenge-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: 'var(--emerald-light)', background: 'rgba(16, 185, 129, 0.12)' }}>
          <Heart size={12} fill="currentColor" style={{ display: 'inline', marginRight: '4px' }} />
          148 Voices Donated Community-Wide
        </span>
      </div>

      {/* Suggested Reading Prompt for Donors */}
      <div className="gov-studio-reading">
        <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--indigo-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Info size={14} />
          Suggested Reading Sample (15-30 seconds):
        </span>
        <blockquote className="gov-studio-quote">
          “May this voice bring you comfort whenever you need to be heard. You are deeply loved, your thoughts matter, and you will never be alone.”
        </blockquote>
      </div>

      {/* Recording Studio Controls */}
      <div className="gov-studio-split">
        {/* Recording Card */}
        <div style={{ background: '#050914', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div
            className={`gov-mic-circle ${
              isRecording
                ? 'gov-mic-recording'
                : recordedAudioUrl
                ? 'gov-mic-ready'
                : 'gov-mic-idle'
            }`}
          >
            <Mic size={36} />
          </div>

          <div>
            <div className="gov-timer">
              {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:
              {String(recordingSeconds % 60).padStart(2, '0')}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
              {isRecording
                ? 'Recording your vocal sample...'
                : recordedAudioUrl
                ? 'Sample recorded successfully!'
                : 'Click below to begin recording'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {!isRecording && !recordedAudioUrl && (
              <button
                type="button"
                onClick={startRecording}
                className="gov-btn-primary"
              >
                <Mic size={15} />
                <span>Start Recording</span>
              </button>
            )}

            {isRecording && (
              <button
                type="button"
                onClick={stopRecording}
                className="gov-btn-primary"
                style={{ background: 'var(--rose)' }}
              >
                <Square size={15} fill="currentColor" />
                <span>Stop Recording</span>
              </button>
            )}

            {recordedAudioUrl && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <audio src={recordedAudioUrl} controls style={{ height: '36px', maxWidth: '220px' }} />
                <button
                  type="button"
                  onClick={resetRecording}
                  className="gov-btn-ghost"
                  style={{ padding: '8px' }}
                  title="Re-record sample"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Donation Metadata & Ethics Form */}
        <form onSubmit={handleSubmitDonation} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label className="gov-field-label">Your Name / Pseudonym</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="e.g. Maya Lin, Teacher"
              required
              style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--r-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.85rem', marginTop: '6px', outline: 'none' }}
            />
          </div>

          <div>
            <label className="gov-field-label">Why are you donating your voice?</label>
            <input
              type="text"
              value={donorStory}
              onChange={(e) => setDonorStory(e.target.value)}
              placeholder="e.g. In honor of my grandfather who had ALS"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--r-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.85rem', marginTop: '6px', outline: 'none' }}
            />
          </div>

          {/* Ethical Consent Checkbox */}
          <div className="gov-consent-box">
            <input
              type="checkbox"
              id="ethics-consent"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              style={{ marginTop: '2px', accentColor: 'var(--emerald)', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="ethics-consent" style={{ cursor: 'pointer' }}>
              <strong style={{ color: '#fff' }}>Ethical Voice Release:</strong> I consent to donating this voice sample exclusively for humanitarian, non-commercial assistive AAC speech synthesis. I retain ownership and grant an irrevocable open-source license to empower speech-impaired individuals.
            </label>
          </div>

          <button
            type="submit"
            disabled={!recordedAudioUrl || !hasConsented || isDonated}
            className="gov-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '4px' }}
          >
            {isDonated ? (
              <>
                <CheckCircle2 size={16} />
                <span>Added to Community Voice Bank!</span>
              </>
            ) : (
              <>
                <Heart size={16} fill="currentColor" />
                <span>Complete Voice Donation</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
