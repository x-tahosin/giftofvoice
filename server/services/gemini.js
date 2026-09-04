/**
 * GiftOfVoice — Google Gemini Intent Expansion Service
 * Transforms shorthand AAC concepts into dignified, emotionally resonant human speech.
 */

const GEMINI_MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];

/**
 * Robust JSON parser for LLM responses
 */
function cleanAndParseJSON(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
  }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

/**
 * Tone-conditioned deterministic fallback (ensures distinct outputs per tone even offline)
 */
function getDeterministicFallback(keywords, tone = 'grateful', recipient = 'caregiver') {
  const kwList = Array.isArray(keywords) ? keywords.join(', ') : String(keywords);
  const kwLower = kwList.toLowerCase();
  const toneKey = (tone || 'grateful').toLowerCase();

  // Tone-specific variations for Bedside / Gratitude / Comfort concepts
  if (kwLower.includes('thank') || kwLower.includes('blanket') || kwLower.includes('nurse') || kwLower.includes('kindness')) {
    if (toneKey === 'playful' || toneKey === 'humorous') {
      return {
        natural: "Ah, thank you so much for the warm blanket... (chuckles) you're officially my favorite nurse on this floor today!",
        concise: "Thanks for the cozy blanket! You just saved me from turning into an ice cube.",
        expressive: "Oh, bless you for this blanket! With service like this, I might just have to write you a five-star review!",
        detected_emotion: 'Playful & Lighthearted Gratitude',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'loving') {
      return {
        natural: "Oh, bless your sweet heart... thank you so much for this warm blanket. You take such wonderful, loving care of me.",
        concise: "Thank you for the warm blanket, darling. You truly have the kindest heart.",
        expressive: "You are such an absolute blessing to me... thank you for wrapping me up in this warmth and caring for me so tenderly.",
        detected_emotion: 'Deep Tender Affection',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'urgent') {
      return {
        natural: "Thank you for checking in... but could you please get me another blanket right now? I'm shivering quite badly.",
        concise: "Nurse, I really need that warm blanket as soon as possible, please.",
        expressive: "I am feeling a severe chill right now—could you please bring a heated blanket immediately? Thank you.",
        detected_emotion: 'Urgent Medical Comfort',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'peaceful') {
      return {
        natural: "Thank you so much for the blanket... it feels so warm and peaceful, I think I can finally rest now.",
        concise: "Thank you for the warm blanket. I feel so much more comfortable.",
        expressive: "Oh, thank you... this soft warmth brings such a peaceful comfort right now, you've helped my whole body relax.",
        detected_emotion: 'Calm & Restful Peace',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    // Default: grateful
    return {
      natural: "Thank you so much, Sarah. Bringing me this warm blanket gave me so much peace and comfort during a cold night.",
      concise: "Thank you Sarah, this warm blanket helped me immensely.",
      expressive: "I cannot thank you enough, Sarah. During a long and quiet night, your gentleness and this warm blanket made me feel safe and cared for.",
      detected_emotion: 'Heartfelt Bedside Gratitude',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // Tone-specific variations for Family / Birthday / Love concepts
  if (kwLower.includes('love') || kwLower.includes('birthday') || kwLower.includes('proud') || kwLower.includes('hand')) {
    if (toneKey === 'playful' || toneKey === 'humorous') {
      return {
        natural: "Happy birthday! Look at you growing so fast—pretty soon you're going to be taller than grandpa! Come give me a high-five!",
        concise: "Happy birthday! Don't eat all the birthday cake before grandpa gets a slice!",
        expressive: "Happy birthday, kiddo! (laughs) You're growing up way too fast for me to keep up, but I love you with all my heart!",
        detected_emotion: 'Playful Grandparent Joy',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'peaceful') {
      return {
        natural: "Happy birthday, my sweet child... sitting here holding your hand brings such calm and happiness to my soul.",
        concise: "Happy birthday. Being here with you is the greatest blessing.",
        expressive: "A very happy birthday to you... holding your hand fills my heart with a quiet, lasting joy that words could never measure.",
        detected_emotion: 'Peaceful Family Blessing',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    // Default: loving
    return {
      natural: "Happy birthday, my sweet little Leo! Look at you growing so fast! Come give grandpa a big hug and hold my hand... I love you to the moon and back, and I am so proud of you!",
      concise: "Happy birthday Leo, grandpa loves you so much and is so proud of you!",
      expressive: "Happy birthday, my darling Leo! Never doubt how bright your light shines. Even when my words are quiet, my heart is overflowing with love and pride for you.",
      detected_emotion: 'Tender Grandparent Love',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // Water / Comfort / Needs
  if (kwLower.includes('water') || kwLower.includes('thirsty') || kwLower.includes('drink')) {
    if (toneKey === 'urgent') {
      return {
        natural: "I urgently need a sip of water right now, my throat is completely dry.",
        concise: "Water please, urgently.",
        expressive: "Excuse me, I am feeling extremely parched and need a drink of water right this minute, please.",
        detected_emotion: 'Urgent Hydration',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: "Could I please get a fresh glass of water? (smiles) Promise I won't spill this time!",
        concise: "Cold water please, on the rocks!",
        expressive: "I would love a cool glass of water if you're offering—ice cold would be heavenly right now!",
        detected_emotion: 'Playful Request',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: "Could I please have a small sip of cold water? Thank you so much.",
      concise: "Cold water please, when you have a moment.",
      expressive: "Whenever you have a chance, a fresh glass of cold water would give me so much relief right now.",
      detected_emotion: 'Gentle Hydration Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // Generic fallback with realistic tone conditioning for custom needs/keywords
  if (toneKey === 'urgent') {
    return {
      natural: `Could you please help me with ${kwList} right away? Thank you.`,
      concise: `Need help with ${kwList} immediately, please.`,
      expressive: `I urgently need assistance with ${kwList} right this moment, please.`,
      detected_emotion: 'Urgent Medical/Physical Need',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }
  if (toneKey === 'playful') {
    return {
      natural: `Could we please get ${kwList}? (chuckles) You know I can never resist!`,
      concise: `Time for ${kwList}, please!`,
      expressive: `I would be so happy if we could do ${kwList}—promise to give you my biggest smile today!`,
      detected_emotion: 'Playful & Cheerful Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }
  if (toneKey === 'loving') {
    return {
      natural: `Could you please help me with ${kwList}, my dear? Thank you for taking such wonderful care of me.`,
      concise: `Thank you for helping me with ${kwList}, darling.`,
      expressive: `You are such a blessing in my life... whenever you have a moment, could you please help me with ${kwList}?`,
      detected_emotion: 'Tender Loving Affection',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }
  if (toneKey === 'peaceful') {
    return {
      natural: `Whenever you have a quiet moment, could you please help with ${kwList}? Thank you for being here.`,
      concise: `Quietly requesting ${kwList} when you have time.`,
      expressive: `It would bring me so much peace and comfort if you could assist me with ${kwList}... thank you.`,
      detected_emotion: 'Calm & Peaceful Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // Default: grateful
  return {
    natural: `Could you please help me with ${kwList} when you have a moment? Thank you so much for your gentle care.`,
    concise: `${kwList}, please and thank you.`,
    expressive: `I truly appreciate your patience and kindness with me... whenever you have a moment, could we please have ${kwList}?`,
    detected_emotion: 'Heartfelt Bedside Gratitude',
    tone_used: tone,
    model_used: 'fallback-deterministic',
  };
}

/**
 * Expands concepts into contextual dialogue using Google Gemini 3.6 Flash
 */
export async function expandIntent({
  keywords,
  tone = 'grateful',
  context = 'general',
  recipient = 'caregiver',
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return getDeterministicFallback(keywords, tone, recipient);
  }

  const toneDirectives = {
    grateful: 'TONE: HEARTFELT & GRATEFUL. Sincere, heartfelt bedside intimacy. Express deep thankfulness and appreciation that touches the caregiver or loved one.',
    loving: 'TONE: LOVING & TENDER. Deep family affection, gentle terms of endearment ("my sweet", "darling", "bless you"), emotional pride, tender warmth.',
    playful: 'TONE: PLAYFUL & HUMOROUS. Lively wit, cheerful teasing, warm laughter. MUST include a playful chuckle like "(chuckles)" or "(laughs)" and a witty, spirited remark to bring a smile.',
    peaceful: 'TONE: CALM & PEACEFUL. Serene, quiet, soft-spoken, relaxing cadence. Brings reassuring tranquility and comfort.',
    urgent: 'TONE: URGENT & DIRECT. Immediate medical necessity or physical discomfort. Clear, direct, prioritized request without sounding panic-stricken.',
  };

  const selectedDirective = toneDirectives[tone.toLowerCase()] || `TONE: ${tone.toUpperCase()}`;

  const prompt = `You are GiftOfVoice's Contextual Intent Expander, an assistive empathy intelligence that transforms shorthand AAC concept taps into living, dignified, emotionally distinct human speech.

The speaker has speech impairment (ALS, stroke, locked-in) and tapped these concepts:
- Tapped Concepts / Keywords: "${Array.isArray(keywords) ? keywords.join(', ') : keywords}"
- Selected Target Emotional Tone: "${tone}"
- Recipient: "${recipient}"
- Setting: "${context}"

${selectedDirective}

CRITICAL RULES FOR EMOTIONAL TONE ACCURACY:
1. The 3 variations MUST unmistakably express the chosen tone: "${tone}".
   - If PLAYFUL: inject humor, playful teasing, and a chuckle "(chuckles)".
   - If LOVING: speak with tender intimate family affection and warmth.
   - If URGENT: make it clear, immediate, and direct without beating around the bush.
   - If GRATEFUL: express sincere bedside gratitude that touches the soul.
   - If PEACEFUL: make it calm, gentle, and relaxing.
2. Speak strictly in the first-person ("I") of an actual human being talking to a loved one or caregiver.
3. Natural conversational pauses ("...", dashes) for human breathing.
4. Exactly 1-2 spoken sentences ready for ElevenLabs high-fidelity emotional voice synthesis.

Respond ONLY with valid JSON in this exact structure:
{
  "natural": "Authentic conversational speech strictly embodying the '${tone}' tone (1-2 sentences)",
  "concise": "Direct, short sentence strictly embodying the '${tone}' tone",
  "expressive": "Deeply vivid or humorous phrasing strictly embodying the '${tone}' tone",
  "detected_emotion": "Emotion summary label",
  "tone_used": "${tone}"
}`;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 1200,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Gemini model ${model} returned (${response.status}):`, errText);
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.natural) {
        return {
          ...parsed,
          tone_used: tone,
          model_used: model,
        };
      }
    } catch (err) {
      console.warn(`Gemini attempt with ${model} encountered error:`, err.message);
    }
  }

  // Deterministic fallback with tone conditioning
  return getDeterministicFallback(keywords, tone, recipient);
}
