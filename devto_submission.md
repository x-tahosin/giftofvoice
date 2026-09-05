---
title: When Words Become Difficult, Humanity Shouldn’t: Building GiftOfVoice
published: false
tags: devchallenge, weekendchallenge, ai, accessibility
---

*This is a submission for [Weekend Challenge: Generosity Edition](https://dev.to/challenges/weekend-2026-09-03)*

> *"The greatest act of generosity is not giving what you have in abundance, but giving someone the ability to express what is locked inside their heart."*

---

## 💡 What I Built

Over **65 million people worldwide** live with profound speech loss caused by conditions like ALS (Amyotrophic Lateral Sclerosis), post-stroke aphasia, cerebral palsy, and vocal trauma. 

For decades, the standard assistive tools (Augmentative and Alternative Communication, or AAC) have suffered from two heartbreaking problems:
1. **Financial Barrier:** Proprietary hardware costs anywhere from **$5,000 to $12,000**.
2. **Emotional Robbery:** The voices sound like flat, monotone 1990s robots. 

Think about what that means in human terms: When a mother with ALS wants to say *"I love you"* to her child, or a patient in an ICU ward wants to thank a night nurse for a warm blanket, a mechanical monotone voice strips away every trace of tenderness, laughter, and vulnerability. The patient's mind is vibrant, their heart is full of love, but their output sounds like a microwave beep.

**GiftOfVoice** was born out of a simple conviction: **Generosity is more than donating money.** The most profound gift one human being can give another is a voice when theirs has been taken away.

GiftOfVoice is an open-source, humanitarian web platform that combines **Google Gemini 3.6 Flash** and **ElevenLabs** into an empathic assistive communication engine:

1. **The Empathy Soundboard (Accessible AAC Grid):** Large, high-contrast, keyboard-navigable tiles organized by semantic human needs (*Gratitude & Care, Daily Comfort, Family & Love, Humor & Social, Urgent & Medical*).
2. **Contextual Intent Expander (Google Gemini):** Recognizes that motor fatigue makes typing arduous. A patient taps just two or three shorthand concepts (e.g., `[Water] + [Pillow] + [Nurse]`), and Gemini contextually expands them into natural, dignified, first-person sentences adapted to the chosen emotional tone (*Grateful, Loving, Playful, Peaceful, Urgent*).
3. **The Voice Generosity Bank (ElevenLabs):** Delivers authentic human warmth, breath, and emotional prosody using vocal timbres donated by healthy community volunteers, replacing robotic monotone with living human presence.
4. **The Voice Generosity Studio:** An ethical framework where community members can record and donate their vocal cadence to the open repository for speech-impaired individuals.

---

## 🎬 Demo

### 🚀 Live Interactive Application
- **Live URL:** [https://x-tahosin.github.io/giftofvoice/](https://x-tahosin.github.io/giftofvoice/)
- **GitHub Repository:** [https://github.com/x-tahosin/giftofvoice](https://github.com/x-tahosin/giftofvoice)

### ⚡ 1-Click Judge Showcase Scenarios

To ensure judges on any device or connection speed experience instant results, GiftOfVoice features **4 zero-latency pre-rendered clinical & family scenarios**:

1. **ICU Night Ward — Thanking the Overworked Nurse**
   - *Concepts:* `[Thank you so much]` + `[Warm blanket]` + `[Your kindness]`
   - *Gemini Output:* *"Thank you so much, Sarah. You have been working so hard all night, and bringing me this warm blanket gave me so much peace and comfort. I truly appreciate your kindness."*
   - *Voice:* Grandma Margaret (Warm, gentle, mature grandmotherly tone)
2. **Bedtime Blessing — Grandchild's 7th Birthday**
   - *Concepts:* `[I love you deeply]` + `[So proud of you]` + `[Hold my hand]`
   - *Gemini Output:* *"Happy birthday, my sweet Leo! I love you with all of my heart, and I am so deeply proud of the brave, curious boy you are growing into today. Come hold my hand!"*
   - *Voice:* Grandpa Bill (Elderly grandfatherly warmth, raspy wisdom)
3. **Family Dinner — Breaking the Silence with a Dad Joke**
   - *Concepts:* `[Tell me a funny joke]` + `[Do not worry about me]` + `[You look amazing]`
   - *Gemini Output:* *"Hey everyone, please don’t worry about me over here! I might be letting the technology do the talking today, but I definitely still have the best sense of humor in this room."*
   - *Voice:* Roger (Laid-back, friendly timbre)
4. **ALS Caregiver Check-in — Calm Posture & Hydration Adjustment**
   - *Concepts:* `[Cold water please]` + `[Adjust my pillow]` + `[Please stay with me]`
   - *Gemini Output:* *"Could you please help adjust my pillow slightly to the right, and let me take a small sip of cold water? Thank you so much for your patience, David."*
   - *Voice:* Antoni (Deep, reassuring, steady presence)

---

## 💻 Code

**Repository Link:** [https://github.com/x-tahosin/giftofvoice](https://github.com/x-tahosin/giftofvoice)

The entire project is open-source under the MIT license, with full clean architecture, measurable WCAG 2.1 AAA accessibility compliance, and unified Express + Vite production serving.

---

## 🛠️ How I Built It

### The 5-Step Pipeline Architecture

```
+-----------------------------------------------------------------------------------------+
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
+-----------------------------------------------------------------------------------------+
```

### 1. Google Gemini as the Cognitive Intent Expander
A critical mistake in assistive tech is assuming that an LLM should just be a chatbot. In AAC, patients experience severe motor fatigue—typing full sentences with eye-tracking or single-switch clicks can take 5 to 10 exhausting minutes.

We engineered a prompt for **Gemini 3.6 Flash** that acts as an empathic co-pilot:
- Takes sparse semantic primitives (`[Water] + [Nurse]`) and recipient context.
- Analyzes the desired emotional tone (*Grateful, Loving, Playful, Peaceful, Urgent*).
- Outputs 3 distinct first-person variations:
  - **Natural (Balanced):** The recommended everyday conversational sentence.
  - **Concise (Direct):** Minimal friction for urgent or clinical clarity.
  - **Expressive (Heartfelt):** Emotionally rich and vulnerable for intimate family moments.

```javascript
// server/services/gemini.js snippet
const prompt = `You are GiftOfVoice's Contextual Intent Expander, giving dignity and expressive speech to individuals with severe speech impairments.
Concepts: "${keywords.join(', ')}"
Tone: "${tone}"
Recipient: "${recipient}"
Task: Formulate 3 variations in first person ("I") with authentic human prosody and feeling.`;
```

### 2. ElevenLabs as the Voice Generosity Synthesizer
Monotone speech synthesis strips away humanity. To solve this, we integrated ElevenLabs using dynamic prosody mapping based on emotional tone:

```javascript
// server/services/elevenlabs.js snippet
function getVoiceSettings(tone) {
  switch (tone) {
    case 'loving':
      return { stability: 0.55, similarity_boost: 0.88, style: 0.45, use_speaker_boost: true };
    case 'playful':
      return { stability: 0.45, similarity_boost: 0.82, style: 0.60, use_speaker_boost: true };
    case 'peaceful':
      return { stability: 0.80, similarity_boost: 0.85, style: 0.20, use_speaker_boost: true };
    case 'urgent':
      return { stability: 0.70, similarity_boost: 0.80, style: 0.35, use_speaker_boost: true };
    default: // grateful
      return { stability: 0.65, similarity_boost: 0.85, style: 0.35, use_speaker_boost: true };
  }
}
```
Lower stability and higher style exaggeration allow laughter, emotional warmth, and natural breath pauses to emerge in playful and loving tones, while higher stability ensures rock-solid clarity for medical check-ins.

### 3. Measurable Accessibility (WCAG 2.1 AAA)
Accessibility was baked into every line of CSS and HTML:
- **Zero Mouse Dependency:** Full keyboard navigation (`Tab`, `Enter`, `Space`) with 3px amber focus rings (`focus-visible`).
- **High-Contrast Mode:** Instant toggle between deep aurora theme and pure black/white/yellow high-contrast mode for visually impaired users.
- **Minimum 48px Touch Targets:** All soundboard buttons exceed 88px for motor-impaired users.
- **Zero-Fail Fallback:** If internet access drops or cloud rate limits are reached, the application gracefully falls back to the client-side Web Speech API.

---

## 🏆 Prize Categories

GiftOfVoice was intentionally built to embody the spirit of the challenge across two key partner technologies:

### 1. Best Use of ElevenLabs
- Replaces cold robotic TTS with living human timbre.
- Dynamic emotional prosody mapping (stability, style, and similarity tuned per emotional state).
- Community Voice Bank concept that grounds voice synthesis in humanitarian generosity.

### 2. Best Use of Google AI
- Powered by **Gemini 3.6 Flash**.
- Moves beyond generic chatbot tropes by using Gemini as an intent-expansion intelligence that bridges human thought and physical disability.
- Provides multi-option contextual dialogue in sub-second response times.

---

## ❤️ Final Thoughts

Generosity isn't just what we give from our wallets; it is what we restore to our fellow human beings. When we give a voice back to someone who has spent years in silence, we aren't just writing code—we are giving them back their seat at the family dinner table.

*Thank you to DEV, Google AI, and ElevenLabs for hosting this inspiring challenge!*
