# GiftOfVoice — The Empathy & Voice Generosity Network 🎙️✨

> **“When words become difficult, humanity shouldn’t.”**

[![DEV Challenge](https://img.shields.io/badge/DEV_Weekend_Challenge-Generosity_Edition-indigo.svg)](https://dev.to/challenges/weekend-2026-09-03)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemini_3.6_Flash-emerald.svg)](https://aistudio.google.com/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Expressive_Synthesis-rose.svg)](https://elevenlabs.io/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AAA-amber.svg)](#measurable-accessibility-standards)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An open-source assistive speech engine designed to restore human voice, emotional inflection, and personal dignity to non-verbal and speech-impaired individuals (ALS, stroke, cerebral palsy, throat cancer, and vocal trauma).

Built for the **[DEV Weekend Challenge: Generosity Edition](https://dev.to/challenges/weekend-2026-09-03)**, targeting:
- **Best Use of ElevenLabs**
- **Best Use of Google AI**
- **Overall Winner**

---

## 🌟 The Philosophy: Generosity Beyond Dollars

Generosity is almost always measured in money—crowdfunding campaigns, donation forms, and charity checks. But for the **65 million people worldwide living with severe speech loss**, the most precious thing another human being can give them isn't cash:

**It is a voice.**

Traditional AAC (Augmentative and Alternative Communication) systems cost up to **$10,000** and speak in cold, flat, 1990s robotic monotones. When a mother with ALS wants to tell her child *"I love you,"* or a patient in an ICU wants to thank a night nurse for a warm blanket, a monotone robot voice strips away every ounce of human tenderness and vulnerability.

**GiftOfVoice bridges two AI breakthroughs to solve this:**
1. **Google Gemini (gemini-3.6-flash)**: Acts as the **Cognitive Intent Expander**. It understands that patients suffer from severe motor fatigue. A user taps just two or three shorthand concepts (e.g. `[Water] + [Pillow] + [Nurse]`), and Gemini contextually expands them into natural, dignified, first-person human dialogue.
2. **ElevenLabs**: Acts as the **Expressive Voice Bank**. Healthy volunteers donate their vocal warmth, cadence, and breath, allowing speech-impaired individuals to speak with authentic human prosody, emotional nuance (Grateful, Loving, Playful, Peaceful, Urgent), and unmistakable warmth.

---

## 🚀 The 5-Step Experience

```
1. Choose What to Say (Accessible AAC Soundboard)
      ↓
2. Choose How to Say It (Emotional Tone & Context)
      ↓
3. Gemini Gives the Words (Natural / Concise / Expressive Variations)
      ↓
4. ElevenLabs Gives the Voice (Community Voice Bank)
      ↓
5. Hear It with Dignity (Interactive Waveform Player + Offline Fallback)
```

---

## 🧭 Live Preset Scenarios (One-Click Judge Showcase)

To respect judges' time and avoid slow connections, GiftOfVoice features **4 instant 1-click clinical & family scenarios** with pre-rendered, high-fidelity ElevenLabs audio:

| Scenario | Setting | Emotional Tone | Shorthand Keywords | Voice |
| :--- | :--- | :--- | :--- | :--- |
| **1. Thanking the Night Nurse** | Hospital ICU Ward | Heartfelt & Grateful | `[Thank you so much]` + `[Warm blanket]` + `[Your kindness]` | Sarah (Maternal warmth) |
| **2. Grandparent’s Birthday Blessing** | Family Milestone | Loving & Tender | `[I love you deeply]` + `[So proud of you]` + `[Hold my hand]` | Sarah (Tender affection) |
| **3. Breaking the Silence at Dinner** | Family Gathering | Playful & Humorous | `[Tell a funny joke]` + `[Do not worry]` + `[You look amazing]` | Roger (Laid-back friend) |
| **4. Daily Comfort & Repositioning** | Caregiver Check-in | Calm & Peaceful | `[Cold water please]` + `[Adjust my pillow]` + `[Stay with me]` | Antoni (Steady paramedic) |

---

## 🏗️ System Architecture

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

---

## ♿ Measurable Accessibility Standards (WCAG 2.1 AAA)

Accessibility is a core engineering requirement of GiftOfVoice, not an afterthought:

- ✅ **Keyboard Navigable:** Entire soundboard, tone selector, and audio controls are 100% accessible via `Tab`, `Enter`, and `Space`.
- ✅ **Visible Focus Indicators:** 3px high-visibility amber rings (`focus-visible:outline-none focus-visible:ring-2`).
- ✅ **High-Contrast Mode Toggle:** Instant switch to true black background with pure white and yellow contrast.
- ✅ **Touch Targets:** All interactive tiles exceed the minimum 48px × 48px target standard (88px min height).
- ✅ **Semantic ARIA:** Proper `role="button"`, `aria-pressed`, `aria-label`, and live regions for screen readers.
- ✅ **Zero-Fail Offline Fallback:** When cloud APIs are unavailable or offline, speech automatically routes to the browser's native Web Speech API.

---

## 🔒 Ethical Voice Donation Framework

To prevent deepfake misuse and protect donor privacy:
1. Donated voice samples are strictly licensed under an irrevocable humanitarian assistive charter.
2. The current MVP simulates community contributions with pre-cleared, verified high-fidelity vocal profiles.
3. Donors complete an explicit ethical release before any sample is cataloged.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
- Node.js v18+ (tested on v24)
- NPM v9+

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/your-username/giftofvoice.git
   cd giftofvoice
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your API keys:
   ```ini
   PORT=3001
   GEMINI_API_KEY=your_google_gemini_api_key
   GEMINI_MODEL=gemini-3.6-flash
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ELEVENLABS_DEFAULT_VOICE=EXAVITQu4vr4xnSDxMaL
   ```

4. **Run Development Mode (Dual Ports):**
   ```bash
   # Terminal 1: Backend Express Server (Port 3001)
   npm run server

   # Terminal 2: Frontend Vite Dev Server (Port 5173 with proxy)
   npm run dev
   ```

5. **Run Production Mode (Single Port 3001):**
   ```bash
   npm run build
   npm run start
   ```
   Open `http://localhost:3001` in your browser.

---

## 📦 Deployment

GiftOfVoice is architected for zero-friction single-service deployment to **Render**, **Railway**, **Fly.io**, or **Vercel**:
- The Express server automatically serves the compiled `dist/` bundle on `process.env.PORT`.
- Health check available at `GET /api/health`.

---

## 📄 License

MIT License © 2026 S M Tahosin (@tahosin). Built with love for the global assistive tech community.
