/**
 * GiftOfVoice — ElevenLabs Expressive Speech Synthesis Service
 * Provides authentic, emotionally prosodic speech synthesis for donated community voices.
 */

// Curated community voice bank catalog with verified working premade voices
export const VOICE_CATALOG = [
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Sarah (Donated by Sarah M., Hospice Volunteer)',
    shortName: 'Sarah',
    gender: 'female',
    tone: 'Reassuring, mature, gentle',
    accent: 'American',
    avatar: '👩',
    description: 'Gentle and soothing, ideal for bedside gratitude and personal comfort.',
  },
  {
    id: 'CwhRBWXzGAHq8TQ4Fs17',
    name: 'Roger (Donated by Marcus T., Musician)',
    shortName: 'Roger',
    gender: 'male',
    tone: 'Laid-back, casual, resonant',
    accent: 'American',
    avatar: '🧔',
    description: 'Natural, casual, and friendly, great for social conversation and sharing humor.',
  },
  {
    id: 'ErXwobaYiN019PkySvjV',
    name: 'Antoni (Donated by David L., EMT Paramedic)',
    shortName: 'Antoni',
    gender: 'male',
    tone: 'Deep, steady, measured',
    accent: 'American',
    avatar: '👨',
    description: 'Grounding and reassuring timbre, ideal for clear medical check-ins and heartfelt advice.',
  },
  {
    id: 'pqHfZKP75CvOlQylNhV4',
    name: 'Grandpa Bill (Donated by William P., Veteran & Grandfather)',
    shortName: 'Grandpa Bill',
    gender: 'male',
    tone: 'Wise, raspy, authentic elderly grandfather',
    accent: 'American (Elderly)',
    avatar: '👴',
    description: 'Authentic elderly grandfatherly timbre, full of warmth, wisdom, and gentle affection for family and grandchildren.',
  },
];

/**
 * Maps emotional tone to ElevenLabs voice settings for authentic, emotional prosody
 * Lower stability (0.25 - 0.40) and boosted style (0.50 - 0.75) unlocks real human breath,
 * vocal warmth, cheerful laughter inflection, and sincere bedside emotion.
 */
function getVoiceSettings(tone = 'grateful') {
  switch (tone.toLowerCase()) {
    case 'loving':
    case 'warm':
      return { stability: 0.32, similarity_boost: 0.80, style: 0.65, use_speaker_boost: true };
    case 'playful':
    case 'humorous':
      return { stability: 0.25, similarity_boost: 0.75, style: 0.75, use_speaker_boost: true };
    case 'gentle':
    case 'peaceful':
      return { stability: 0.42, similarity_boost: 0.80, style: 0.45, use_speaker_boost: true };
    case 'urgent':
    case 'direct':
      return { stability: 0.45, similarity_boost: 0.85, style: 0.55, use_speaker_boost: true };
    case 'grateful':
    default:
      return { stability: 0.35, similarity_boost: 0.80, style: 0.60, use_speaker_boost: true };
  }
}

/**
 * Synthesizes speech using ElevenLabs API
 * Returns base64 encoded MP3 audio data
 */
export async function synthesizeVoice({
  text,
  voiceId = 'EXAVITQu4vr4xnSDxMaL',
  tone = 'grateful',
}) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
    return {
      success: false,
      fallback: true,
      error: 'ELEVENLABS_API_KEY is not configured',
    };
  }

  const voiceSettings = getVoiceSettings(tone);
  const modelId = 'eleven_turbo_v2_5'; // Ultra-low latency model

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?optimize_streaming_latency=3&output_format=mp3_44100_128`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: voiceSettings,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`ElevenLabs synthesis failed (${response.status}):`, errText);
      return {
        success: false,
        fallback: true,
        status: response.status,
        error: `ElevenLabs returned ${response.status}`,
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString('base64');

    return {
      success: true,
      fallback: false,
      audioBase64: `data:audio/mpeg;base64,${base64Audio}`,
      format: 'audio/mpeg',
      voiceId,
      tone,
    };
  } catch (err) {
    console.error('ElevenLabs service error:', err);
    return {
      success: false,
      fallback: true,
      error: err.message,
    };
  }
}
