import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { expandIntent } from './services/gemini.js';
import { synthesizeVoice, VOICE_CATALOG } from './services/elevenlabs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load environment from project root
dotenv.config({ path: path.join(projectRoot, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  const hasElevenLabs = Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_API_KEY !== 'your_elevenlabs_api_key_here');

  res.json({
    status: 'online',
    service: 'GiftOfVoice API Proxy',
    version: '1.0.0',
    providers: {
      gemini: {
        configured: hasGemini,
        primaryModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
      },
      elevenlabs: {
        configured: hasElevenLabs,
        defaultVoice: process.env.ELEVENLABS_DEFAULT_VOICE || '21m00Tcm4TlvDq8ikWAM',
      },
    },
    timestamp: new Date().toISOString(),
  });
});

// Community Voice Catalog
app.get('/api/voices', (req, res) => {
  res.json({
    voices: VOICE_CATALOG,
  });
});

// Gemini Intent Expander
app.post('/api/expand-intent', async (req, res) => {
  try {
    const { keywords, tone, context, recipient } = req.body;
    if (!keywords || (Array.isArray(keywords) && keywords.length === 0)) {
      return res.status(400).json({ error: 'Missing keywords for intent expansion.' });
    }

    const result = await expandIntent({
      keywords,
      tone: tone || 'grateful',
      context: context || 'general',
      recipient: recipient || 'caregiver',
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error('API /api/expand-intent error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to expand intent',
      message: err.message,
    });
  }
});

// ElevenLabs Voice Synthesis
app.post('/api/synthesize-voice', async (req, res) => {
  try {
    const { text, voiceId, tone } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text parameter is required.' });
    }

    const result = await synthesizeVoice({
      text: text.trim(),
      voiceId: voiceId || process.env.ELEVENLABS_DEFAULT_VOICE || '21m00Tcm4TlvDq8ikWAM',
      tone: tone || 'grateful',
    });

    res.json(result);
  } catch (err) {
    console.error('API /api/synthesize-voice error:', err);
    res.status(500).json({
      success: false,
      fallback: true,
      error: err.message,
    });
  }
});

// Serve frontend in production mode
const distPath = path.join(projectRoot, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`GiftOfVoice Express server running on port ${PORT}`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
  });
}

export default app;
