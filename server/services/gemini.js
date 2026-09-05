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
function getDeterministicFallback(keywords, tone = 'grateful', recipient = 'nurse', variation = 0) {
  const kwList = Array.isArray(keywords) ? keywords : [keywords];
  const kwLower = kwList.map((k) => (k || '').toLowerCase()).join(' ');
  const toneKey = (tone || 'grateful').toLowerCase();

  const partnerLabel =
    recipient === 'nurse'
      ? 'Nurse'
      : recipient === 'doctor'
      ? 'Doctor'
      : recipient === 'child'
      ? 'sweetheart'
      : recipient === 'family'
      ? 'my dear'
      : recipient === 'friend'
      ? 'my friend'
      : 'David';

  const hasGratitude =
    kwLower.includes('thank') ||
    kwLower.includes('kindness') ||
    kwLower.includes('blessed') ||
    kwLower.includes('better') ||
    kwLower.includes('made my day');

  const hasBlanket = kwLower.includes('blanket') || kwLower.includes('cold') || kwLower.includes('shiver');
  const hasWater = kwLower.includes('water') || kwLower.includes('drink') || kwLower.includes('thirsty');
  const hasPillow = kwLower.includes('pillow') || kwLower.includes('adjust') || kwLower.includes('tilt');
  const hasSitUp = kwLower.includes('sitting') || kwLower.includes('sit up') || kwLower.includes('lift');
  const hasLights = kwLower.includes('light') || kwLower.includes('dim') || kwLower.includes('dark');
  const hasLove =
    kwLower.includes('love') ||
    kwLower.includes('proud') ||
    kwLower.includes('hand') ||
    kwLower.includes('miss') ||
    kwLower.includes('birthday') ||
    kwLower.includes('leo') ||
    kwLower.includes('day');
  const hasHumor =
    kwLower.includes('joke') ||
    kwLower.includes('laugh') ||
    kwLower.includes('worry') ||
    kwLower.includes('spirited') ||
    kwLower.includes('amazing');
  const hasUrgentMedical =
    kwLower.includes('pain') ||
    kwLower.includes('breath') ||
    kwLower.includes('medicine') ||
    kwLower.includes('pill') ||
    kwLower.includes('doctor now') ||
    kwLower.includes('stay with me');

  // 1. Bedside Gratitude with Blanket (Scenario 1)
  if (hasBlanket && hasGratitude) {
    if (toneKey === 'loving') {
      return {
        natural: `Bless your kind heart, ${partnerLabel}... thank you for bringing me this warm blanket. You take such loving care of me every single night.`,
        concise: `Thank you for the warm blanket, ${partnerLabel}. You are so dear to me.`,
        expressive: `Oh ${partnerLabel}, your tenderness warms my whole soul. During this cold and quiet night, you are an absolute angel to me.`,
        detected_emotion: 'Deep Affection & Bedside Gratitude',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Thanks for the warm blanket, ${partnerLabel}! (chuckles) Though I think you're secretly trying to wrap me up like a cozy hospital burrito!`,
        concise: `Thanks for the cozy blanket, ${partnerLabel}! Best burrito ever.`,
        expressive: `Ah ${partnerLabel}, you saved my life with this blanket! (laughs) Now if only it came with room service and dessert!`,
        detected_emotion: 'Playful Warmth & Humor',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'peaceful') {
      return {
        natural: `Thank you so much for the blanket, ${partnerLabel}... it feels so soft and peaceful, I think I can finally drift off to sleep now.`,
        concise: `Thank you for the warm blanket, ${partnerLabel}. I feel peaceful now.`,
        expressive: `Oh, thank you, ${partnerLabel}... this soft warmth brings such quiet peace to this room, helping my whole body relax.`,
        detected_emotion: 'Peaceful Bedside Comfort',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'urgent') {
      return {
        natural: `${partnerLabel}, I'm shivering quite badly... could you please tuck this blanket securely around my shoulders? Thank you.`,
        concise: `${partnerLabel}, please help tuck the blanket securely, shivering.`,
        expressive: `${partnerLabel}, I urgently need this blanket wrapped tightly right now, the chills are really shaking me.`,
        detected_emotion: 'Urgent Warmth Request',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `Oh ${partnerLabel}, thank you so much... you have no idea how much comfort this warm blanket gives me tonight. You've been working so hard, and your kindness touches my heart.`,
      concise: `Thank you ${partnerLabel}, this warm blanket brings me so much comfort.`,
      expressive: `Oh ${partnerLabel}, bless you. During this quiet night, your gentleness and this warm blanket make me feel safe, comfortable, and deeply cared for.`,
      detected_emotion: 'Heartfelt Bedside Gratitude',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 2. Pure Gratitude & Appreciation (Without blanket)
  if (hasGratitude && !hasWater && !hasPillow && !hasSitUp && !hasLights && !hasUrgentMedical) {
    if (toneKey === 'peaceful') {
      return {
        natural: `Thank you so much, ${partnerLabel}... your quiet patience and gentle care bring such peaceful comfort to my room.`,
        concise: `Thank you so much for your peaceful, gentle presence.`,
        expressive: `Sitting here in quiet peace, I just wanted to say thank you so much... having you by my side brings calm, safety, and deep comfort to my soul.`,
        detected_emotion: 'Calm & Peaceful Gratitude',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'loving') {
      return {
        natural: `Thank you so much, ${partnerLabel}... you take such loving care of me, and I appreciate you with all my heart.`,
        concise: `Thank you so much, my dear. You mean everything to me.`,
        expressive: `Bless your kind and loving heart... thank you so much for watching over me with such tender devotion.`,
        detected_emotion: 'Tender Loving Gratitude',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Thank you so much, ${partnerLabel}! (smiles) You take such wonderful care of me, I'm definitely giving you a five-star review today!`,
        concise: `Thank you so much! You're officially the MVP today.`,
        expressive: `Thank you so much! (laughs) Even when I'm being a handful, you still treat me with the biggest smile in the room!`,
        detected_emotion: 'Playful Appreciation & Cheer',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'urgent') {
      return {
        natural: `Thank you so much for coming in right away, ${partnerLabel}. I really needed you.`,
        concise: `Thank you so much for responding so quickly.`,
        expressive: `Thank you so much for hurrying in, ${partnerLabel}... I was in distress and your quick arrival is such a relief.`,
        detected_emotion: 'Urgent Relief & Appreciation',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `Thank you so much, ${partnerLabel}. Your continuous kindness and watchful care mean more to me than words can ever express.`,
      concise: `Thank you so much, ${partnerLabel}, for your wonderful kindness.`,
      expressive: `Oh, thank you so much... you work so hard, and your warmth and gentleness truly touch my heart today.`,
      detected_emotion: 'Heartfelt Gratitude',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 3. Ergonomic Comfort (Pillow & Water - Scenario 4)
  if ((hasPillow && hasWater) || (hasPillow && kwLower.includes('stay with me'))) {
    if (toneKey === 'urgent') {
      return {
        natural: `David, I urgently need you to tilt my pillow right now and let me have a sip of water, my neck is straining.`,
        concise: `David, need my pillow adjusted and water immediately please.`,
        expressive: `David, please help me right away—my pillow has slipped and my throat is completely parched.`,
        detected_emotion: 'Urgent Comfort Adjustment',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (toneKey === 'grateful') {
      return {
        natural: `David, thank you so much for your gentle care. Whenever you have a second, could you slightly tilt my pillow and let me take a small sip of cold water?`,
        concise: `Thank you so much David. A quick sip of water and pillow adjustment when you can.`,
        expressive: `Your patience means the world to me, David. Would you kindly help me with my pillow and a sip of cold water? Thank you from the bottom of my heart.`,
        detected_emotion: 'Grateful Bedside Request',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `David, could you please tilt my pillow slightly to the right, and let me take a gentle sip of cold water? Thank you so much for always being so patient with me.`,
      concise: `Pillow adjustment and a sip of water please, David.`,
      expressive: `Whenever you have a quiet moment, David, a slight tilt of my pillow and a refreshing sip of water would make me feel so much more comfortable.`,
      detected_emotion: 'Peaceful Bedside Comfort',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 4. Water / Hydration
  if (hasWater) {
    if (toneKey === 'urgent') {
      return {
        natural: `Excuse me ${partnerLabel}, I urgently need a small sip of cold water right now, my throat is completely parched.`,
        concise: `Cold water please, urgently needed.`,
        expressive: `Please help me with a drink of water right this minute, ${partnerLabel}... I am struggling with severe dryness.`,
        detected_emotion: 'Urgent Hydration Need',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `Whenever you have a quiet moment, ${partnerLabel}, could I please have a small sip of cold water? Thank you so much.`,
      concise: `Cold water please, when you have a moment.`,
      expressive: `Whenever you have a chance, a fresh glass of cold water would give me so much relief right now... thank you.`,
      detected_emotion: 'Gentle Hydration Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 5. Pillow
  if (hasPillow) {
    if (toneKey === 'urgent') {
      return {
        natural: `${partnerLabel}, my neck is straining badly... could you please adjust my pillow right now?`,
        concise: `Need pillow adjusted immediately, please.`,
        expressive: `Please help me readjust my pillow right this second, ${partnerLabel}, it has slipped and is causing severe strain.`,
        detected_emotion: 'Urgent Ergonomic Adjustment',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `Could you please adjust my pillow slightly, ${partnerLabel}? Thank you so much for your gentle hands.`,
      concise: `Pillow adjustment please, ${partnerLabel}.`,
      expressive: `Whenever you have a quiet second, slightly tilting my pillow would help my whole neck and shoulders relax... thank you.`,
      detected_emotion: 'Gentle Pillow Adjustment',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 6. Blanket
  if (hasBlanket) {
    if (toneKey === 'urgent') {
      return {
        natural: `${partnerLabel}, I am shivering quite badly... could you please bring me an extra warm blanket right away?`,
        concise: `Warm blanket urgently needed, shivering.`,
        expressive: `Please get me a warm blanket immediately, ${partnerLabel}, the cold chills are really overwhelming me.`,
        detected_emotion: 'Urgent Warmth Request',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `Could you please bring me a warm blanket, ${partnerLabel}? It would help me rest so comfortably.`,
      concise: `Warm blanket please, when you have a moment.`,
      expressive: `A soft, warm blanket tucked around my shoulders would bring so much cozy comfort right now... thank you.`,
      detected_emotion: 'Gentle Warmth Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 7. Sitting Up / Lights
  if (hasSitUp) {
    return {
      natural: `Could you please assist me in sitting up a little higher, ${partnerLabel}? Thank you for your support.`,
      concise: `Help sitting up please, ${partnerLabel}.`,
      expressive: `Whenever you have a second, a gentle lift to sit upright would make me feel so much more alert and refreshed... thank you.`,
      detected_emotion: 'Posture Assistance Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }
  if (hasLights) {
    return {
      natural: `Could you please dim the room lights a bit, ${partnerLabel}? Thank you so much for helping me rest.`,
      concise: `Please dim the lights, ${partnerLabel}.`,
      expressive: `The room would feel so peaceful and tranquil if we softened the lights... thank you for the quiet comfort.`,
      detected_emotion: 'Ambient Comfort Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 8. Family & Love
  if (hasLove) {
    if (kwLower.includes('birthday') || kwLower.includes('leo')) {
      if (toneKey === 'playful') {
        return {
          natural: `Happy birthday, kiddo! (laughs) Look at you growing so fast—pretty soon you're going to be taller than grandpa! Come give me a big high-five!`,
          concise: `Happy birthday, Leo! Save a big slice of chocolate cake for grandpa!`,
          expressive: `Happy birthday, my little champion! You're growing up way too fast, but you'll always be my favorite little troublemaker!`,
          detected_emotion: 'Playful Grandparent Joy',
          tone_used: tone,
          model_used: 'fallback-deterministic',
        };
      }
      return {
        natural: `Happy birthday, my sweet little Leo! Look at you growing so fast! Come give grandpa a big hug and hold my hand... I love you to the moon and back, and I am so proud of you!`,
        concise: `Happy birthday Leo, I love you deeply and am so proud of you!`,
        expressive: `Happy birthday Leo! Never doubt how bright your light shines. Even when my words are quiet, my heart is overflowing with love and pride for you.`,
        detected_emotion: 'Tender Grandparent Love',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `I love you with all of my heart, ${partnerLabel}... seeing you and holding your hand fills my whole soul with joy and pride.`,
      concise: `I love you deeply and am so proud of you.`,
      expressive: `Never forget how deeply I love you... even when words are hard to find, my heart is completely overflowing with love for you.`,
      detected_emotion: 'Tender Loving Affection',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 9. Humor & Social
  if (hasHumor) {
    return {
      natural: `Hey everyone! (laughs) Stop looking so worried over there! My voice might be digital today, but you all know I still tell the best jokes at this dinner table!`,
      concise: `Don’t look so worried, I still have the best jokes at this table!`,
      expressive: `You all look wonderful tonight! Don’t look so serious—I still have plenty of jokes saved up for whenever you are ready to laugh!`,
      detected_emotion: 'Lively Table Humor',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 10. Urgent Medical
  if (hasUrgentMedical) {
    if (kwLower.includes('breath')) {
      return {
        natural: `${partnerLabel}, please come in immediately... I am having difficulty breathing and need respiratory support right away.`,
        concise: `Difficulty breathing, urgent medical assistance needed!`,
        expressive: `Nurse, Doctor, please hurry... my chest is tight and I am struggling to breathe comfortably.`,
        detected_emotion: 'Critical Respiratory Urgency',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    if (kwLower.includes('pain')) {
      return {
        natural: `${partnerLabel}, my pain has spiked significantly... could you please bring my pain medication as soon as possible?`,
        concise: `Pain medication needed immediately, please.`,
        expressive: `Please assist me right now, ${partnerLabel}... the physical pain is becoming unbearable and I need medication.`,
        detected_emotion: 'Acute Pain Management',
        tone_used: tone,
        model_used: 'fallback-deterministic',
      };
    }
    return {
      natural: `Please call the attending physician into my room immediately, ${partnerLabel}. I need to be evaluated right now.`,
      concise: `Please call the doctor into my room right now.`,
      expressive: `I am experiencing an unexpected medical complication—please page the doctor immediately.`,
      detected_emotion: 'Physician Call Escalation',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }

  // 11. Custom concepts
  const cleanConcepts = kwList
    .map((k) => k.replace(/please|thank you|so much|needed|now/gi, '').trim())
    .filter(Boolean)
    .join(' and ') || 'my needs';

  if (toneKey === 'urgent') {
    return {
      natural: `Excuse me ${partnerLabel}, I urgently need assistance regarding ${cleanConcepts} right now, please.`,
      concise: `Urgent assistance needed with ${cleanConcepts}, please.`,
      expressive: `Please help me right this moment with ${cleanConcepts}—it requires immediate attention.`,
      detected_emotion: 'Urgent Care Request',
      tone_used: tone,
      model_used: 'fallback-deterministic',
    };
  }
  return {
    natural: `Thank you so much, ${partnerLabel}. When you have a moment, could you please help me with ${cleanConcepts}? Your kindness means everything.`,
    concise: `Thank you ${partnerLabel}, please help with ${cleanConcepts}.`,
    expressive: `I am so grateful for your patience and gentle hands today. Thank you for being by my side and helping with ${cleanConcepts}.`,
    detected_emotion: 'Heartfelt Gratitude',
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
  variation = 0,
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return getDeterministicFallback(keywords, tone, recipient, variation);
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
5. DEEP INTENT UNDERSTANDING OVER LITERAL SLOTTING:
   - DO NOT literally interpolate concepts into awkward templates like 'help me with [concept]'.
   - If the concept expresses gratitude ('Thank you so much', 'Deeply blessed', 'Your kindness warms me'), formulate heartfelt spoken appreciation and blessings directly to the recipient, NOT a request for help.
   - If the concept expresses physical needs (water, blanket, posture, lighting), formulate a natural, considerate, and conversational bedside request.
   - If the concept expresses humor or love, make it lively, warm, and natural dialogue.

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
