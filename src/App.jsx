import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractivePipelineStepper from './components/InteractivePipelineStepper';
import CaseStudiesView from './components/CaseStudiesView';
import StudioWorkspace from './components/StudioWorkspace';
import VoiceBankView from './components/VoiceBankView';
import { COMMUNITY_VOICE_CATALOG } from './data/voiceCatalog';
import { DEMO_SCENARIOS } from './data/demoScenarios';
import { expandIntentClient } from './utils/clientGeminiEngine';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  // Activate smooth scroll reveal transitions
  useScrollReveal();

  // Theme State: 'dark' (Default Velvet Pine) | 'contrast' (WCAG AAA)
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Sync Theme with Root HTML and Body elements
  useEffect(() => {
    document.documentElement.classList.remove('high-contrast');
    document.body.classList.remove('high-contrast');
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
    if (currentTheme === 'contrast') {
      document.documentElement.classList.add('high-contrast');
      document.body.classList.add('high-contrast');
    }
  }, [currentTheme]);

  // Soundboard & Intent State
  const [selectedItems, setSelectedItems] = useState([
    { id: 'g1', label: 'Thank you so much', category: 'gratitude' },
    { id: 'n2', label: 'Warm blanket', category: 'needs' },
    { id: 'g2', label: 'Your kindness warms me', category: 'gratitude' },
  ]);
  const [selectedTone, setSelectedTone] = useState('grateful');
  const [recipient, setRecipient] = useState('nurse');
  const [expandedResult, setExpandedResult] = useState({
    natural: 'Thank you so much, Sarah. Bringing me this warm blanket gave me so much peace and comfort during a cold night.',
    concise: 'Thank you Sarah, this warm blanket helped me immensely.',
    expressive: 'I cannot thank you enough, Sarah. During a long and quiet night, your gentleness and this warm blanket made me feel safe and cared for.',
    detected_emotion: 'Deep Gratitude & Comfort',
    tone_used: 'grateful',
    model_used: 'gemini-3.6-flash',
  });
  const [isExpanding, setIsExpanding] = useState(false);
  const [finalText, setFinalText] = useState(
    'Thank you so much, Sarah. Bringing me this warm blanket gave me so much peace and comfort during a cold night.'
  );

  // Clear any old donated voice cache
  try {
    localStorage.removeItem('gov_donated_voices');
  } catch (e) {}

  // Voice & Audio State (Curated 4-Voice Community Catalog)
  const [voiceCatalog] = useState(COMMUNITY_VOICE_CATALOG);
  const [activeVoice, setActiveVoice] = useState(COMMUNITY_VOICE_CATALOG[0]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState('/audio/scenario_icu_nurse.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isCachedPlayback, setIsCachedPlayback] = useState(true);
  const [activeScenarioId, setActiveScenarioId] = useState('icu-nurse');

  const audioRef = useRef(null);

  // Browser Web Speech API Fallback (Resilient offline speech)
  const speakWithBrowserFallback = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (activeVoice?.gender?.toLowerCase() === 'female') {
        const femaleVoice = voices.find(
          (v) =>
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('zira') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('karen')
        );
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.pitch = 1.05;
        utterance.rate = 0.92;
      } else {
        const maleVoice = voices.find(
          (v) =>
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('george')
        );
        if (maleVoice) utterance.voice = maleVoice;
        utterance.pitch = 0.92;
        utterance.rate = 0.92;
      }
    }
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (!audioRef.current) {
      speakWithBrowserFallback(finalText);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      if (currentAudioUrl) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback error, falling back to Web Speech API:', err);
            speakWithBrowserFallback(finalText);
          });
      } else {
        speakWithBrowserFallback(finalText);
      }
    }
  };

  // Toggle soundboard tile selection
  const handleToggleItem = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Clear all soundboard items
  const handleClearItems = () => {
    setSelectedItems([]);
  };

  // Quick single word speech
  const handleQuickSpeak = (phrase) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(phrase);
      window.speechSynthesis.speak(u);
    }
  };

  // Expand intent with Gemini 3.6 Flash (with client-side zero-latency fallback)
  const handleExpandIntent = async (customKeywords = null) => {
    const kws = customKeywords || selectedItems;
    if (kws.length === 0 && !finalText) {
      alert('Please select at least one concept on the soundboard first.');
      return;
    }

    setIsExpanding(true);
    try {
      let expansion = null;
      try {
        const response = await fetch('/api/expand-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keywords: kws.map((i) => (typeof i === 'string' ? i : i.label)),
            tone: selectedTone,
            recipient,
            context: recipient === 'nurse' || recipient === 'doctor' ? 'hospital' : 'home',
          }),
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.data) {
            expansion = resData.data;
          }
        }
      } catch (apiErr) {
        console.warn('Backend API unavailable, using client Gemini engine:', apiErr);
      }

      if (!expansion) {
        expansion = expandIntentClient({
          keywords: kws.map((i) => (typeof i === 'string' ? i : i.label)),
          tone: selectedTone,
          recipient,
          context: recipient === 'nurse' || recipient === 'doctor' ? 'hospital' : 'home',
        });
      }

      setExpandedResult(expansion);
      setFinalText(expansion.natural);
      if (expansion.audioUrl) {
        setCurrentAudioUrl(expansion.audioUrl);
        setIsCachedPlayback(true);
      } else {
        setIsCachedPlayback(false);
      }
      return expansion;
    } catch (err) {
      console.warn('Intent expansion error:', err);
    } finally {
      setIsExpanding(false);
    }
  };

  // Change Tone and automatically re-tune phrasing if concepts are selected
  const handleToneChange = async (newTone) => {
    setSelectedTone(newTone);
    if (selectedItems.length === 0) return;

    setIsExpanding(true);
    try {
      let expansion = null;
      try {
        const response = await fetch('/api/expand-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keywords: selectedItems.map((i) => (typeof i === 'string' ? i : i.label)),
            tone: newTone,
            recipient,
            context: recipient === 'nurse' || recipient === 'doctor' ? 'hospital' : 'home',
          }),
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.data) {
            expansion = resData.data;
          }
        }
      } catch (apiErr) {
        console.warn('API backend unavailable, using client Gemini engine:', apiErr);
      }

      if (!expansion) {
        expansion = expandIntentClient({
          keywords: selectedItems.map((i) => (typeof i === 'string' ? i : i.label)),
          tone: newTone,
          recipient,
          context: recipient === 'nurse' || recipient === 'doctor' ? 'hospital' : 'home',
        });
      }

      setExpandedResult(expansion);
      setFinalText(expansion.natural);
      if (expansion.audioUrl) {
        setCurrentAudioUrl(expansion.audioUrl);
        setIsCachedPlayback(true);
      } else {
        setIsCachedPlayback(false);
      }
    } catch (err) {
      console.warn('Tone switch expansion error:', err);
    } finally {
      setIsExpanding(false);
    }
  };

  // Instant 1-Click Expand and Speak (Powers "Generate Speech" and "Instant Speak")
  const handleInstantSpeakSoundboard = async () => {
    // 1. If currently playing, clicking acts as pause/stop
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    let spokenText = finalText;
    let spokenAudioUrl = currentAudioUrl;

    // 2. If concepts are selected on soundboard, expand them first
    if (selectedItems.length > 0) {
      setIsExpanding(true);
      try {
        let expansion = null;
        try {
          const response = await fetch('/api/expand-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              keywords: selectedItems.map((i) => (typeof i === 'string' ? i : i.label)),
              tone: selectedTone,
              recipient,
              context: recipient === 'nurse' || recipient === 'doctor' ? 'hospital' : 'home',
            }),
          });
          if (response.ok) {
            const resData = await response.json();
            if (resData.success && resData.data) {
              expansion = resData.data;
            }
          }
        } catch (apiErr) {
          console.warn('API backend unavailable, using client Gemini engine:', apiErr);
        }

        if (!expansion) {
          expansion = expandIntentClient({
            keywords: selectedItems.map((i) => (typeof i === 'string' ? i : i.label)),
            tone: selectedTone,
            recipient,
            context: recipient === 'nurse' || recipient === 'doctor' ? 'hospital' : 'home',
          });
        }

        setExpandedResult(expansion);
        spokenText = expansion.natural;
        setFinalText(spokenText);

        if (expansion.audioUrl) {
          spokenAudioUrl = expansion.audioUrl;
          setCurrentAudioUrl(spokenAudioUrl);
          setIsCachedPlayback(true);
        } else {
          spokenAudioUrl = null;
          setCurrentAudioUrl(null);
          setIsCachedPlayback(false);
        }
      } catch (err) {
        console.error('Intent expansion error:', err);
      } finally {
        setIsExpanding(false);
      }
    }

    if (!spokenText || spokenText.trim().length === 0) {
      alert('Please select concepts on the soundboard or type custom text to speak.');
      return;
    }

    // 3. Play matching scenario audio if available
    if (spokenAudioUrl && audioRef.current) {
      audioRef.current.src = spokenAudioUrl;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          speakWithBrowserFallback(spokenText);
        });
      return;
    }

    // 4. Try live ElevenLabs synthesis API
    setIsSynthesizing(true);
    try {
      const synthRes = await fetch('/api/synthesize-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: spokenText,
          voiceId: activeVoice.id,
          tone: selectedTone,
        }),
      });
      if (synthRes.ok) {
        const synthData = await synthRes.json();
        if (synthData.success && synthData.audioBase64) {
          setCurrentAudioUrl(synthData.audioBase64);
          if (audioRef.current) {
            audioRef.current.src = synthData.audioBase64;
            audioRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                speakWithBrowserFallback(spokenText);
              });
            return;
          }
        }
      }
      speakWithBrowserFallback(spokenText);
    } catch (sErr) {
      speakWithBrowserFallback(spokenText);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Synthesize speech live with ElevenLabs
  const handleSynthesizeLive = async () => {
    if (!finalText || finalText.trim().length === 0) {
      alert('Please enter or select a sentence to synthesize.');
      return;
    }

    setIsSynthesizing(true);
    try {
      const response = await fetch('/api/synthesize-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: finalText,
          voiceId: activeVoice.id,
          tone: selectedTone,
        }),
      });

      const data = await response.json();
      if (data.success && data.audioBase64) {
        setCurrentAudioUrl(data.audioBase64);
        setIsCachedPlayback(false);
        setActiveScenarioId(null);
        if (audioRef.current) {
          audioRef.current.src = data.audioBase64;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
            speakWithBrowserFallback(finalText);
          });
        }
      } else {
        console.warn('Synthesis returned fallback response:', data.error);
        speakWithBrowserFallback(finalText);
      }
    } catch (err) {
      console.error('Synthesis error:', err);
      speakWithBrowserFallback(finalText);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Select Preset Scenario (Zero Latency)
  const handleSelectScenario = (scenario) => {
    setActiveScenarioId(scenario.id);
    setSelectedTone(scenario.tone);
    setRecipient(scenario.recipient);
    setSelectedItems(
      scenario.keywords.map((kw, idx) => ({
        id: `kw_${idx}`,
        label: kw,
        category: 'preset',
      }))
    );
    setExpandedResult({
      natural: scenario.expandedSpeech,
      concise: scenario.concise,
      expressive: scenario.expressive,
      detected_emotion: scenario.title,
      tone_used: scenario.tone,
      model_used: 'gemini-3.6-flash',
    });
    setFinalText(scenario.expandedSpeech);

    const matchedVoice = voiceCatalog.find((v) => v.id === scenario.voiceId) || voiceCatalog[0];
    setActiveVoice(matchedVoice);
    setCurrentAudioUrl(scenario.audioUrl);
    setIsCachedPlayback(true);

    if (audioRef.current) {
      audioRef.current.src = scenario.audioUrl;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback interrupted:', err);
          speakWithBrowserFallback(scenario.expandedSpeech);
        });
    }
  };

  // Load Scenario into Studio & Smooth Scroll
  const handleLoadIntoStudio = (scenario) => {
    handleSelectScenario(scenario);
    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add a newly donated community voice
  const handleAddDonatedVoice = (newVoice) => {
    if (newVoice?.audioUrl) {
      setCurrentAudioUrl(newVoice.audioUrl);
      setIsCachedPlayback(true);
      if (audioRef.current) {
        audioRef.current.src = newVoice.audioUrl;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
    }
  };

  // Play a voice sample from VoiceBank
  const handlePlaySample = (audioUrl) => {
    if (!audioUrl) return;
    setCurrentAudioUrl(audioUrl);
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const themeClass = currentTheme === 'contrast' ? 'high-contrast' : 'dark-theme';

  return (
    <div className={`gov-app ${themeClass}`}>
      {/* Hidden Persistent Audio Element */}
      <audio
        ref={audioRef}
        src={currentAudioUrl}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Sticky Header with Navigation & Dark/AAA Contrast Theme Switcher */}
      <Header
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
      />

      <main>
        {/* 1. Luminous Hero Section */}
        <HeroSection
          activeVoice={activeVoice}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onOpenCaseStudies={() => {
            const el = document.getElementById('cases');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStudio={() => {
            const el = document.getElementById('studio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Interactive 3-Step Assistive Pipeline Stepper */}
        <InteractivePipelineStepper
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />

        {/* 3. Clinical & Family Case Studies Sliding Carousel */}
        <CaseStudiesView
          onSelectScenario={handleSelectScenario}
          activeScenarioId={activeScenarioId}
          isPlaying={isPlaying}
          onLoadIntoStudio={handleLoadIntoStudio}
        />

        {/* 4. Assistive Expression Studio (Core AAC Tool) */}
        <StudioWorkspace
          voiceCatalog={voiceCatalog}
          selectedItems={selectedItems}
          onToggleItem={handleToggleItem}
          onClearItems={handleClearItems}
          onQuickSpeak={handleQuickSpeak}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          onToneChange={handleToneChange}
          recipient={recipient}
          setRecipient={setRecipient}
          expandedResult={expandedResult}
          isExpanding={isExpanding}
          onExpandIntent={handleExpandIntent}
          finalText={finalText}
          setFinalText={setFinalText}
          activeVoice={activeVoice}
          setActiveVoice={setActiveVoice}
          currentAudioUrl={currentAudioUrl}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          isSynthesizing={isSynthesizing}
          onSynthesizeLive={handleSynthesizeLive}
          isCachedPlayback={isCachedPlayback}
          onSelectScenario={handleSelectScenario}
          onInstantSpeakSoundboard={handleInstantSpeakSoundboard}
        />

        {/* 5. Community Voice Bank & Donation Studio */}
        <VoiceBankView
          voiceCatalog={voiceCatalog}
          onAddDonatedVoice={handleAddDonatedVoice}
          onPlaySample={handlePlaySample}
          activeVoice={activeVoice}
          setActiveVoice={setActiveVoice}
          isPlaying={isPlaying}
          currentAudioUrl={currentAudioUrl}
        />
      </main>

      {/* Modern Studio Footer */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <a
            href="https://github.com/x-tahosin"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            title="Tahosin's GitHub Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub / x-tahosin</span>
          </a>

          <div className="footer-author-brand">
            <span>Developed by</span>
            <span className="footer-author-name">Tahosin</span>
          </div>

          <a
            href="https://dev.to/tahosin"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            title="Tahosin's DEV Community Profile"
          >
            <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
              <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c0-5.81-1.94-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.6.06 75.8v360.4C.06 460.4 19.7 480 43.9 480h360.2c24.2 0 43.8-19.6 43.8-43.8V75.8c0-24.2-19.6-43.8-43.8-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.38 28.49 47.38 47.25v70.96zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16 0-20.58-9.42-20.58-20.58V193.56c0-11.16 9.42-20.58 20.58-20.58h62.19v29.55zm41.29 136.94l-28.54-140.8h30.29l17.01 94.72 17.01-94.72h30.29l-28.55 140.8h-37.51z"/>
            </svg>
            <span>DEV.to / tahosin</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
