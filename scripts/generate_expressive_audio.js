import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('No ELEVENLABS_API_KEY found in .env');
  process.exit(1);
}

const SCENARIOS = [
  {
    filename: 'scenario_icu_nurse.mp3',
    voiceId: 'XrExE9yKIg1WjnnlVkGX', // Matilda (Grandma Margaret - warm, gentle, mature grandmotherly tone)
    // Expressive text with gentle breathing pauses and sincere warmth
    text: "Oh Sarah, thank you so much... you have no idea how much comfort this warm blanket gives me tonight. You've been working so hard, and your kindness touches my heart.",
    voiceSettings: { stability: 0.45, similarity_boost: 0.85, style: 0.45, use_speaker_boost: true }
  },
  {
    filename: 'scenario_birthday_leo.mp3',
    voiceId: 'pqHfZKP75CvOlQylNhV4', // Grandpa Bill (Elderly grandfatherly voice)
    // Joyful, affectionate grandfather blessing with emotional excitement
    text: "Happy birthday, my sweet little Leo! Look at you growing so fast! Come give grandpa a big hug and hold my hand... I love you to the moon and back, and I am so proud of you!",
    voiceSettings: { stability: 0.35, similarity_boost: 0.80, style: 0.60, use_speaker_boost: true }
  },
  {
    filename: 'scenario_family_humor.mp3',
    voiceId: 'CwhRBWXzGAHq8TQ4Fs17', // Roger
    // Cheerful, laughing cadence and lively dinner banter
    text: "Hey everyone! (laughs) Stop looking so worried over there! My voice might be digital today, but you all know I still tell the best jokes at this dinner table!",
    voiceSettings: { stability: 0.22, similarity_boost: 0.75, style: 0.80, use_speaker_boost: true }
  },
  {
    filename: 'scenario_daily_checkin.mp3',
    voiceId: 'ErXwobaYiN019PkySvjV', // Antoni
    // Calming, gentle, grounded bedside communication
    text: "David, could you please tilt my pillow slightly to the right, and let me take a gentle sip of cold water? Thank you so much for always being so patient with me.",
    voiceSettings: { stability: 0.38, similarity_boost: 0.82, style: 0.50, use_speaker_boost: true }
  }
];

async function generateAudio() {
  const publicDir = path.join(__dirname, '../public/audio');
  const distDir = path.join(__dirname, '../dist/audio');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  for (const s of SCENARIOS) {
    console.log(`Generating expressive audio for ${s.filename}...`);
    try {
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${s.voiceId}?optimize_streaming_latency=3&output_format=mp3_44100_128`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: s.text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: s.voiceSettings,
        }),
      });

      if (!res.ok) {
        console.warn(`Failed ${s.filename} (${res.status}): ${await res.text()}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(publicDir, s.filename), buffer);
      fs.writeFileSync(path.join(distDir, s.filename), buffer);
      console.log(`✓ Successfully saved ${s.filename} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error generating ${s.filename}:`, e.message);
    }
  }
}

generateAudio();
