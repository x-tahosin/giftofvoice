/**
 * GiftOfVoice — Intelligent Contextual Intent Expansion Engine
 * Transforms sparse AAC concept taps into living, dignified, emotionally
 * rich human dialogue tailored to tone and conversation partner.
 */

import { DEMO_SCENARIOS } from '../data/demoScenarios';

function pickVariant(variants, varIndex = 0) {
  if (!Array.isArray(variants) || variants.length === 0) return variants;
  const idx = Math.abs(Number(varIndex) || 0) % variants.length;
  return variants[idx];
}

export function expandIntentClient({
  keywords = [],
  tone = 'grateful',
  recipient = 'nurse',
  context = 'hospital',
  variation = 0,
}) {
  const kwList = Array.isArray(keywords) ? keywords : [keywords];
  const kwLower = kwList.map((k) => (k || '').toLowerCase()).join(' ');
  const toneKey = (tone || 'grateful').toLowerCase();

  // Determine respectful partner address
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

  // Feature detection flags
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

  // =========================================================================
  // 1. HOSPITAL WARD GRATITUDE (With Blanket) -> Exact Scenario 1 Match
  // =========================================================================
  if (hasBlanket && hasGratitude) {
    if (toneKey === 'loving') {
      return {
        natural: `Bless your kind heart, ${partnerLabel}... thank you for bringing me this warm blanket. You take such loving care of me every single night.`,
        concise: `Thank you for the warm blanket, ${partnerLabel}. You are so dear to me.`,
        expressive: `Oh ${partnerLabel}, your tenderness warms my whole soul. During this cold and quiet night, you are an absolute angel to me.`,
        detected_emotion: 'Deep Affection & Bedside Gratitude',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Thanks for the warm blanket, ${partnerLabel}! (chuckles) Though I think you're secretly trying to wrap me up like a cozy hospital burrito!`,
        concise: `Thanks for the cozy blanket, ${partnerLabel}! Best burrito ever.`,
        expressive: `Ah ${partnerLabel}, you saved my life with this blanket! (laughs) Now if only it came with room service and dessert!`,
        detected_emotion: 'Playful Warmth & Humor',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    if (toneKey === 'peaceful') {
      return {
        natural: `Thank you so much for the blanket, ${partnerLabel}... it feels so soft and peaceful, I think I can finally drift off to sleep now.`,
        concise: `Thank you for the warm blanket, ${partnerLabel}. I feel peaceful now.`,
        expressive: `Oh, thank you, ${partnerLabel}... this soft warmth brings such quiet peace to this room, helping my whole body relax.`,
        detected_emotion: 'Peaceful Bedside Comfort',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    if (toneKey === 'urgent') {
      return {
        natural: `${partnerLabel}, I'm shivering quite badly... could you please tuck this blanket securely around my shoulders? Thank you.`,
        concise: `${partnerLabel}, please help tuck the blanket securely, shivering.`,
        expressive: `${partnerLabel}, I urgently need this blanket wrapped tightly right now, the chills are really shaking me.`,
        detected_emotion: 'Urgent Warmth Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    // Default Grateful
    return {
      natural: `Oh ${partnerLabel}, thank you so much... you have no idea how much comfort this warm blanket gives me tonight. You've been working so hard, and your kindness touches my heart.`,
      concise: `Thank you ${partnerLabel}, this warm blanket brings me so much comfort.`,
      expressive: `Oh ${partnerLabel}, bless you. During this quiet night, your gentleness and this warm blanket make me feel safe, comfortable, and deeply cared for.`,
      detected_emotion: 'Heartfelt Bedside Gratitude',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'icu-nurse',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
    };
  }

  // =========================================================================
  // 2. PURE GRATITUDE & APPRECIATION (e.g. "Thank you so much", "Your kindness")
  // =========================================================================
  if (hasGratitude && !hasWater && !hasPillow && !hasSitUp && !hasLights && !hasUrgentMedical) {
    if (toneKey === 'peaceful') {
      return pickVariant([
        {
          natural: `Thank you so much, ${partnerLabel}... your quiet patience and gentle care bring such peaceful comfort to my room.`,
          concise: `Thank you so much for your peaceful, gentle presence.`,
          expressive: `Sitting here in quiet peace, I just wanted to say thank you so much... having you by my side brings calm, safety, and deep comfort to my soul.`,
          detected_emotion: 'Calm & Peaceful Gratitude',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
        {
          natural: `I truly appreciate you, ${partnerLabel}... the gentle calm and attentiveness you bring into this room means the world to me.`,
          concise: `Deeply grateful for your calm and gentle care, ${partnerLabel}.`,
          expressive: `Thank you from the bottom of my heart, ${partnerLabel}... your quiet compassion turns this whole room into a sanctuary of peace.`,
          detected_emotion: 'Serene Gratitude',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
        {
          natural: `A quiet and heartfelt thank you, ${partnerLabel}... resting here knowing you are watching over me brings such soothing comfort.`,
          concise: `Thank you, ${partnerLabel}. Resting peacefully thanks to your care.`,
          expressive: `Even when I don't say much, please know how thankful I am... your gentle presence brings absolute stillness and peace to my spirit.`,
          detected_emotion: 'Tranquil Appreciation',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
      ], variation);
    }
    if (toneKey === 'loving') {
      return pickVariant([
        {
          natural: `Thank you so much, ${partnerLabel}... you take such loving care of me, and I appreciate you with all my heart.`,
          concise: `Thank you so much, my dear. You mean everything to me.`,
          expressive: `Bless your kind and loving heart... thank you so much for watching over me with such tender devotion.`,
          detected_emotion: 'Tender Loving Gratitude',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
        {
          natural: `Bless you, my dear... thank you so much for your sweet presence and the endless love you pour into every single day.`,
          concise: `With all my love, thank you so much for being here with me.`,
          expressive: `You are an extraordinary blessing in my life... thank you so much for loving me through every moment with tender patience.`,
          detected_emotion: 'Deep Loving Appreciation',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
      ], variation);
    }
    if (toneKey === 'playful') {
      return pickVariant([
        {
          natural: `Thank you so much, ${partnerLabel}! (smiles) You take such wonderful care of me, I'm definitely giving you a five-star review today!`,
          concise: `Thank you so much! You're officially the MVP today.`,
          expressive: `Thank you so much! (laughs) Even when I'm being a handful, you still treat me with the biggest smile in the room!`,
          detected_emotion: 'Playful Appreciation & Cheer',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
        {
          natural: `Hey ${partnerLabel}, thank you so much! (chuckles) You deserve a gold medal for being so patient with me today!`,
          concise: `Gold medal for you today! Thank you so much.`,
          expressive: `Thank you a million times, ${partnerLabel}! (laughs) You're officially my favorite person on this entire shift!`,
          detected_emotion: 'Playful Bedside Wit',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
      ], variation);
    }
    if (toneKey === 'urgent') {
      return pickVariant([
        {
          natural: `Thank you so much for coming in right away, ${partnerLabel}. I really needed you.`,
          concise: `Thank you so much for responding so quickly.`,
          expressive: `Thank you so much for hurrying in, ${partnerLabel}... I was in distress and your quick arrival is such a relief.`,
          detected_emotion: 'Urgent Relief & Appreciation',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
        {
          natural: `Thank you for your immediate response, ${partnerLabel}. Having you here right now takes a huge weight off my chest.`,
          concise: `Thank you for the prompt assistance, ${partnerLabel}.`,
          expressive: `I cannot thank you enough for getting here so fast... thank you for attending to my distress without delay.`,
          detected_emotion: 'Prompt Care Gratitude',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
        },
      ], variation);
    }
    // Default Grateful
    return pickVariant([
      {
        natural: `Thank you so much, ${partnerLabel}. Your continuous kindness and watchful care mean more to me than words can ever express.`,
        concise: `Thank you so much, ${partnerLabel}, for your wonderful kindness.`,
        expressive: `Oh, thank you so much... you work so hard, and your warmth and gentleness truly touch my heart today.`,
        detected_emotion: 'Heartfelt Gratitude',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `I just wanted to take a moment to thank you, ${partnerLabel}... everything you do for me makes an enormous difference.`,
        concise: `Thank you so much, ${partnerLabel}. You make every day brighter.`,
        expressive: `My heart is full of gratitude today... thank you so much for your tireless dedication, gentle smile, and faithful care.`,
        detected_emotion: 'Deep Heartfelt Thanks',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `Thank you with all my heart, ${partnerLabel}. Having someone who treats me with such deep respect and kindness is a true blessing.`,
        concise: `Heartfelt thanks to you, ${partnerLabel}, for always being by my side.`,
        expressive: `Even when I cannot speak many words, please know how deeply grateful I am... thank you so much for your empathy and constant support.`,
        detected_emotion: 'Sincere Devoted Gratitude',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
    ], variation);
  }

  // =========================================================================
  // 3. ALS ERGONOMIC COMFORT (Pillow & Water) -> Exact Scenario 4 Match
  // =========================================================================
  if ((hasPillow && hasWater) || (hasPillow && kwLower.includes('stay with me'))) {
    if (toneKey === 'urgent') {
      return {
        natural: `David, I urgently need you to tilt my pillow right now and let me have a sip of water, my neck is straining.`,
        concise: `David, need my pillow adjusted and water immediately please.`,
        expressive: `David, please help me right away—my pillow has slipped and my throat is completely parched.`,
        detected_emotion: 'Urgent Comfort Adjustment',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'als-comfort',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'als-comfort')?.audioUrl,
      };
    }
    if (toneKey === 'grateful') {
      return {
        natural: `David, thank you so much for your gentle care. Whenever you have a second, could you slightly tilt my pillow and let me take a small sip of cold water?`,
        concise: `Thank you so much David. A quick sip of water and pillow adjustment when you can.`,
        expressive: `Your patience means the world to me, David. Would you kindly help me with my pillow and a sip of cold water? Thank you from the bottom of my heart.`,
        detected_emotion: 'Grateful Bedside Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'als-comfort',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'als-comfort')?.audioUrl,
      };
    }
    // Default Peaceful
    return {
      natural: `David, could you please tilt my pillow slightly to the right, and let me take a gentle sip of cold water? Thank you so much for always being so patient with me.`,
      concise: `Pillow adjustment and a sip of water please, David.`,
      expressive: `Whenever you have a quiet moment, David, a slight tilt of my pillow and a refreshing sip of water would make me feel so much more comfortable.`,
      detected_emotion: 'Peaceful Bedside Comfort',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'als-comfort',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'als-comfort')?.audioUrl,
    };
  }

  // =========================================================================
  // 4. WATER / HYDRATION ALONE
  // =========================================================================
  if (hasWater) {
    if (toneKey === 'urgent') {
      return {
        natural: `Excuse me ${partnerLabel}, I urgently need a small sip of cold water right now, my throat is completely parched.`,
        concise: `Cold water please, urgently needed.`,
        expressive: `Please help me with a drink of water right this minute, ${partnerLabel}... I am struggling with severe dryness.`,
        detected_emotion: 'Urgent Hydration Need',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Could I please get a fresh glass of cold water, ${partnerLabel}? (smiles) On the rocks, if the kitchen is still open!`,
        concise: `Cold water please, on the rocks!`,
        expressive: `I would love a cool glass of water if you're offering—ice cold would be absolutely heavenly right now!`,
        detected_emotion: 'Playful Hydration Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (toneKey === 'loving') {
      return {
        natural: `Would you mind helping me take a small sip of water, my dear? Thank you for taking such sweet care of me.`,
        concise: `A sip of water please, darling.`,
        expressive: `Whenever you have a moment, could you bring me a cup of cool water? Thank you for always looking after me with love.`,
        detected_emotion: 'Loving Hydration Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    return {
      natural: `Whenever you have a quiet moment, ${partnerLabel}, could I please have a small sip of cold water? Thank you so much.`,
      concise: `Cold water please, when you have a moment.`,
      expressive: `Whenever you have a chance, a fresh glass of cold water would give me so much relief right now... thank you.`,
      detected_emotion: 'Gentle Hydration Request',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // =========================================================================
  // 5. PILLOW ADJUSTMENT ALONE
  // =========================================================================
  if (hasPillow) {
    if (toneKey === 'urgent') {
      return {
        natural: `${partnerLabel}, my neck is straining badly... could you please adjust my pillow right now?`,
        concise: `Need pillow adjusted immediately, please.`,
        expressive: `Please help me readjust my pillow right this second, ${partnerLabel}, it has slipped and is causing severe strain.`,
        detected_emotion: 'Urgent Ergonomic Adjustment',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Could we fluff my pillow a little bit, ${partnerLabel}? (smiles) Getting the royal treatment today!`,
        concise: `Pillow fluffing please!`,
        expressive: `If we could adjust my pillow just an inch to the left, I'll be the happiest patient on this floor!`,
        detected_emotion: 'Playful Comfort Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    return {
      natural: `Could you please adjust my pillow slightly, ${partnerLabel}? Thank you so much for your gentle hands.`,
      concise: `Pillow adjustment please, ${partnerLabel}.`,
      expressive: `Whenever you have a quiet second, slightly tilting my pillow would help my whole neck and shoulders relax... thank you.`,
      detected_emotion: 'Gentle Pillow Adjustment',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // =========================================================================
  // 6. BLANKET ALONE
  // =========================================================================
  if (hasBlanket) {
    if (toneKey === 'urgent') {
      return {
        natural: `${partnerLabel}, I am shivering quite badly... could you please bring me an extra warm blanket right away?`,
        concise: `Warm blanket urgently needed, shivering.`,
        expressive: `Please get me a warm blanket immediately, ${partnerLabel}, the cold chills are really overwhelming me.`,
        detected_emotion: 'Urgent Warmth Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Could I get another blanket, ${partnerLabel}? (chuckles) Wrap me up like a cozy burrito!`,
        concise: `Cozy blanket please, time to hibernate!`,
        expressive: `A warm blanket would make me feel like royalty right now! (smiles) Thank you so much.`,
        detected_emotion: 'Playful Warmth Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    return {
      natural: `Could you please bring me a warm blanket, ${partnerLabel}? It would help me rest so comfortably.`,
      concise: `Warm blanket please, when you have a moment.`,
      expressive: `A soft, warm blanket tucked around my shoulders would bring so much cozy comfort right now... thank you.`,
      detected_emotion: 'Gentle Warmth Request',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // =========================================================================
  // 7. SITTING UP & ROOM LIGHTS
  // =========================================================================
  if (hasSitUp) {
    return {
      natural: `Could you please assist me in sitting up a little higher, ${partnerLabel}? Thank you for your support.`,
      concise: `Help sitting up please, ${partnerLabel}.`,
      expressive: `Whenever you have a second, a gentle lift to sit upright would make me feel so much more alert and refreshed... thank you.`,
      detected_emotion: 'Posture Assistance Request',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  if (hasLights) {
    return {
      natural: `Could you please dim the room lights a bit, ${partnerLabel}? Thank you so much for helping me rest.`,
      concise: `Please dim the lights, ${partnerLabel}.`,
      expressive: `The room would feel so peaceful and tranquil if we softened the lights... thank you for the quiet comfort.`,
      detected_emotion: 'Ambient Comfort Request',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // =========================================================================
  // 8. FAMILY & LOVE (Birthday / Grandchild / Affection) -> Exact Scenario 2
  // =========================================================================
  if (hasLove) {
    if (kwLower.includes('birthday') || kwLower.includes('leo')) {
      if (toneKey === 'playful') {
        return {
          natural: `Happy birthday, kiddo! (laughs) Look at you growing so fast—pretty soon you're going to be taller than grandpa! Come give me a big high-five!`,
          concise: `Happy birthday, Leo! Save a big slice of chocolate cake for grandpa!`,
          expressive: `Happy birthday, my little champion! You're growing up way too fast, but you'll always be my favorite little troublemaker!`,
          detected_emotion: 'Playful Grandparent Joy',
          tone_used: tone,
          model_used: 'gemini-3.6-flash-client',
          matchedScenarioId: 'grandchild-birthday',
          audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'grandchild-birthday')?.audioUrl,
        };
      }
      return {
        natural: `Happy birthday, my sweet little Leo! Look at you growing so fast! Come give grandpa a big hug and hold my hand... I love you to the moon and back, and I am so proud of you!`,
        concise: `Happy birthday Leo, I love you deeply and am so proud of you!`,
        expressive: `Happy birthday Leo! Never doubt how bright your light shines. Even when my words are quiet, my heart is overflowing with love and pride for you.`,
        detected_emotion: 'Tender Grandparent Love',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'grandchild-birthday',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'grandchild-birthday')?.audioUrl,
      };
    }

    if (toneKey === 'peaceful') {
      return {
        natural: `Sitting here quietly with you, ${partnerLabel}, brings such deep serenity to my heart. I love you so much.`,
        concise: `Holding your hand brings me complete peace.`,
        expressive: `A quiet moment with you fills my whole spirit with tranquility and gratitude... thank you for your loving presence.`,
        detected_emotion: 'Peaceful Family Blessing',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: `Come over here and hold my hand, ${partnerLabel}! (laughs) You know you're still my absolute favorite person in the world!`,
        concise: `Give me a hug! Best family ever.`,
        expressive: `Look at you looking so wonderful! (smiles) Come sit close and tell me everything about your day!`,
        detected_emotion: 'Playful Affection',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    // Default Loving
    return {
      natural: `I love you with all of my heart, ${partnerLabel}... seeing you and holding your hand fills my whole soul with joy and pride.`,
      concise: `I love you deeply and am so proud of you.`,
      expressive: `Never forget how deeply I love you... even when words are hard to find, my heart is completely overflowing with love for you.`,
      detected_emotion: 'Tender Loving Affection',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // =========================================================================
  // 9. DINNER BANTER & HUMOR -> Exact Scenario 3 Match
  // =========================================================================
  if (hasHumor) {
    if (toneKey === 'peaceful') {
      return {
        natural: `Please don't worry about me, everyone... I am resting comfortably and feel so peaceful seeing you all together today.`,
        concise: `Don't worry about me, I am at peace.`,
        expressive: `Seeing your calm and happy faces is the greatest medicine in the world... please rest easy, I am doing well.`,
        detected_emotion: 'Peaceful Reassurance',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    return {
      natural: `Hey everyone! (laughs) Stop looking so worried over there! My voice might be digital today, but you all know I still tell the best jokes at this dinner table!`,
      concise: `Don’t look so worried, I still have the best jokes at this table!`,
      expressive: `You all look wonderful tonight! Don’t look so serious—I still have plenty of jokes saved up for whenever you are ready to laugh!`,
      detected_emotion: 'Lively Table Humor',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'family-humor',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'family-humor')?.audioUrl,
    };
  }

  // =========================================================================
  // 10. URGENT MEDICAL CARE
  // =========================================================================
  if (hasUrgentMedical) {
    if (kwLower.includes('breath')) {
      return {
        natural: `${partnerLabel}, please come in immediately... I am having difficulty breathing and need respiratory support right away.`,
        concise: `Difficulty breathing, urgent medical assistance needed!`,
        expressive: `Nurse, Doctor, please hurry... my chest is tight and I am struggling to breathe comfortably.`,
        detected_emotion: 'Critical Respiratory Urgency',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (kwLower.includes('pain')) {
      return {
        natural: `${partnerLabel}, my pain has spiked significantly... could you please bring my pain medication as soon as possible?`,
        concise: `Pain medication needed immediately, please.`,
        expressive: `Please assist me right now, ${partnerLabel}... the physical pain is becoming unbearable and I need medication.`,
        detected_emotion: 'Acute Pain Management',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    if (kwLower.includes('doctor')) {
      return {
        natural: `Please call the attending physician into my room immediately, ${partnerLabel}. I need to be evaluated right now.`,
        concise: `Please call the doctor into my room right now.`,
        expressive: `I am experiencing an unexpected medical complication—please page the doctor immediately.`,
        detected_emotion: 'Physician Call Escalation',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      };
    }
    return {
      natural: `Please stay with me right now, ${partnerLabel}... your presence helps me stay calm and secure.`,
      concise: `Please stay by my side right now.`,
      expressive: `Don't leave my room just yet, ${partnerLabel}... having you close gives me the comfort and courage I need.`,
      detected_emotion: 'Bedside Comfort & Security',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // =========================================================================
  // 11. GENERAL / CUSTOM USER INPUT (Handles "+ Add Concept" items cleanly)
  // =========================================================================
  const cleanConcepts = kwList
    .map((k) => k.replace(/please|thank you|so much|needed|now/gi, '').trim())
    .filter(Boolean)
    .join(' and ') || 'my needs';

  if (toneKey === 'urgent') {
    return pickVariant([
      {
        natural: `Excuse me ${partnerLabel}, I urgently need assistance regarding ${cleanConcepts} right now, please.`,
        concise: `Urgent assistance needed with ${cleanConcepts}, please.`,
        expressive: `Please help me right this moment with ${cleanConcepts}—it requires immediate attention.`,
        detected_emotion: 'Urgent Care Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `${partnerLabel}, I am in urgent need of help with ${cleanConcepts}, please assist me as soon as you can.`,
        concise: `Urgent help needed with ${cleanConcepts}.`,
        expressive: `Please don't delay, ${partnerLabel}... I really need your immediate assistance with ${cleanConcepts}.`,
        detected_emotion: 'Immediate Assistance',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
    ], variation);
  }

  if (toneKey === 'playful') {
    return pickVariant([
      {
        natural: `Hey ${partnerLabel}! (smiles) Whenever you have a second, could we check on ${cleanConcepts}? You know it'll make my whole day!`,
        concise: `Time for ${cleanConcepts}! Best team ever.`,
        expressive: `Well hello there! (chuckles) If you could help me with ${cleanConcepts}, I promise to give you my biggest smile today!`,
        detected_emotion: 'Playful Dialogue',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `Well hello ${partnerLabel}! (chuckles) If you have a free minute, could we tackle ${cleanConcepts}? Best team in the house!`,
        concise: `Ready for ${cleanConcepts}? Let's do it!`,
        expressive: `Hey ${partnerLabel}! (laughs) You're my favorite superhero around here, especially if we can sort out ${cleanConcepts}!`,
        detected_emotion: 'Humorous Bedside Banter',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
    ], variation);
  }

  if (toneKey === 'loving') {
    return pickVariant([
      {
        natural: `Thank you so much for always taking such loving care of me, ${partnerLabel}. When you have a moment, could you help me with ${cleanConcepts}?`,
        concise: `Sending you my love. Please help me with ${cleanConcepts} when you can.`,
        expressive: `You bring so much warmth into my days, my dear. Thank you for your kindness, and for helping me with ${cleanConcepts}.`,
        detected_emotion: 'Affectionate Intimacy',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `My dear ${partnerLabel}, your gentle presence is such a comfort. Whenever you have a free second, could we attend to ${cleanConcepts}?`,
        concise: `With all my heart, please assist me with ${cleanConcepts}.`,
        expressive: `Bless you for being so patient and loving with me... whenever you are ready, I would love some help with ${cleanConcepts}.`,
        detected_emotion: 'Loving Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
    ], variation);
  }

  if (toneKey === 'peaceful') {
    return pickVariant([
      {
        natural: `Whenever you have a quiet moment, ${partnerLabel}, could you kindly help me with ${cleanConcepts}? Thank you for your gentle presence.`,
        concise: `Gentle help with ${cleanConcepts}, whenever you are ready.`,
        expressive: `Sitting here quietly, I would be so comfortable if we could attend to ${cleanConcepts}... thank you for your patience and peace.`,
        detected_emotion: 'Calm & Peaceful Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `At your own pace, ${partnerLabel}, I would be so grateful for your quiet help with ${cleanConcepts}... thank you for being here.`,
        concise: `Help with ${cleanConcepts} at your convenience, ${partnerLabel}.`,
        expressive: `In this serene moment, having some gentle assistance with ${cleanConcepts} would bring such calm relief to my day.`,
        detected_emotion: 'Serene Bedside Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
      {
        natural: `When it's peaceful and convenient, ${partnerLabel}, could we take care of ${cleanConcepts}? Your calm patience means so much to me.`,
        concise: `Quiet help with ${cleanConcepts}, please.`,
        expressive: `Resting here peacefully, I would deeply appreciate your gentle assistance with ${cleanConcepts} whenever you are ready.`,
        detected_emotion: 'Tranquil Bedside Care',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
      },
    ], variation);
  }

  // Default Grateful
  return pickVariant([
    {
      natural: `Thank you so much, ${partnerLabel}. When you have a moment, could you please help me with ${cleanConcepts}? Your kindness means everything.`,
      concise: `Thank you ${partnerLabel}, please help with ${cleanConcepts}.`,
      expressive: `I am so grateful for your patience and gentle hands today. Thank you for being by my side and helping with ${cleanConcepts}.`,
      detected_emotion: 'Heartfelt Gratitude',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    },
    {
      natural: `I am so thankful for your dedication today, ${partnerLabel}. Whenever you have a second, could you please assist me with ${cleanConcepts}?`,
      concise: `Deeply grateful for your help with ${cleanConcepts}.`,
      expressive: `Your continuous support means the world to me... thank you so much for looking after me and assisting with ${cleanConcepts}.`,
      detected_emotion: 'Sincere Gratitude',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    },
  ], variation);
}
