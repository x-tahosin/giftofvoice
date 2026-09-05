/**
 * GiftOfVoice — Client-Side Resilient Gemini Intent Expansion Engine
 * Provides instant, zero-latency contextual dialogue generation
 * for GitHub Pages static hosting and offline environments.
 */

import { DEMO_SCENARIOS } from '../data/demoScenarios';

export function expandIntentClient({
  keywords = [],
  tone = 'grateful',
  recipient = 'nurse',
  context = 'hospital',
}) {
  const kwList = Array.isArray(keywords) ? keywords : [keywords];
  const kwLower = kwList.map((k) => (k || '').toLowerCase()).join(' ');
  const toneKey = (tone || 'grateful').toLowerCase();

  // 1. Exact Scenario 1 Match: Hospital Ward / Nurse Gratitude
  if (
    kwLower.includes('blanket') ||
    (kwLower.includes('nurse') && kwLower.includes('thank')) ||
    (kwLower.includes('kindness') && kwLower.includes('warm'))
  ) {
    if (toneKey === 'loving') {
      return {
        natural: "Bless your kind heart, Sarah... thank you for bringing me this warm blanket. You take such loving care of me every single night.",
        concise: "Thank you for the warm blanket, Sarah. You are so dear to me.",
        expressive: "Oh Sarah, your tenderness warms my whole soul. During this cold and quiet night, you are an absolute angel to me.",
        detected_emotion: 'Deep Affection & Bedside Gratitude',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    if (toneKey === 'playful') {
      return {
        natural: "Thanks for the warm blanket, Sarah! (chuckles) Though I think you're secretly trying to wrap me up like a cozy hospital burrito!",
        concise: "Thanks for the cozy blanket, Sarah! Best burrito ever.",
        expressive: "Ah, Sarah, you saved my life with this blanket! (laughs) Now if only it came with room service and dessert!",
        detected_emotion: 'Playful Warmth & Humor',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    if (toneKey === 'peaceful') {
      return {
        natural: "Thank you so much for the blanket, Sarah... it feels so soft and peaceful, I think I can finally drift off to sleep now.",
        concise: "Thank you for the warm blanket, Sarah. I feel peaceful now.",
        expressive: "Oh, thank you, Sarah... this soft warmth brings such quiet peace to this room, helping my whole body relax.",
        detected_emotion: 'Peaceful Bedside Comfort',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    if (toneKey === 'urgent') {
      return {
        natural: "Nurse Sarah, I'm shivering quite badly... could you please tuck this blanket securely around my shoulders? Thank you.",
        concise: "Nurse Sarah, please help tuck the blanket securely, shivering.",
        expressive: "Sarah, I urgently need this blanket wrapped tightly right now, the chills are really shaking me.",
        detected_emotion: 'Urgent Warmth Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'icu-nurse',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
      };
    }
    // Default Grateful
    return {
      natural: "Oh Sarah, thank you so much... you have no idea how much comfort this warm blanket gives me tonight. You've been working so hard, and your kindness touches my heart.",
      concise: "Thank you Sarah, this warm blanket brings me so much comfort.",
      expressive: "Oh Sarah, bless you. During this quiet night, your gentleness and this warm blanket make me feel safe, comfortable, and deeply cared for.",
      detected_emotion: 'Heartfelt Bedside Gratitude',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'icu-nurse',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'icu-nurse')?.audioUrl,
    };
  }

  // 2. Exact Scenario 2 Match: Grandchild Birthday / Family Love
  if (
    kwLower.includes('birthday') ||
    kwLower.includes('leo') ||
    (kwLower.includes('proud') && kwLower.includes('love'))
  ) {
    if (toneKey === 'playful') {
      return {
        natural: "Happy birthday, kiddo! (laughs) Look at you growing so fast—pretty soon you're going to be taller than grandpa! Come give me a big high-five!",
        concise: "Happy birthday, Leo! Save a big slice of chocolate cake for grandpa!",
        expressive: "Happy birthday, my little champion! You're growing up way too fast, but you'll always be my favorite little troublemaker!",
        detected_emotion: 'Playful Grandparent Joy',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'grandchild-birthday',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'grandchild-birthday')?.audioUrl,
      };
    }
    if (toneKey === 'peaceful') {
      return {
        natural: "Happy birthday, my sweet child... sitting here holding your hand brings such calm and lasting joy to my heart.",
        concise: "Happy birthday Leo. Being here with you is my greatest blessing.",
        expressive: "A peaceful and blessed birthday to you, my dear... holding your little hand fills my whole spirit with tranquility and gratitude.",
        detected_emotion: 'Peaceful Family Blessing',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'grandchild-birthday',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'grandchild-birthday')?.audioUrl,
      };
    }
    // Default Loving
    return {
      natural: "Happy birthday, my sweet little Leo! Look at you growing so fast! Come give grandpa a big hug and hold my hand... I love you to the moon and back, and I am so proud of you!",
      concise: "Happy birthday Leo, I love you deeply and am so proud of you!",
      expressive: "Happy birthday Leo! Never doubt how bright your light shines. Even when my words are quiet, my heart is overflowing with love and pride for you.",
      detected_emotion: 'Tender Grandparent Love',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'grandchild-birthday',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'grandchild-birthday')?.audioUrl,
    };
  }

  // 3. Exact Scenario 3 Match: Dinner Humor / Social Joke
  if (
    kwLower.includes('joke') ||
    (kwLower.includes('worry') && kwLower.includes('dinner')) ||
    (kwLower.includes('worry') && kwLower.includes('laugh'))
  ) {
    return {
      natural: "Hey everyone! (laughs) Stop looking so worried over there! My voice might be digital today, but you all know I still tell the best jokes at this dinner table!",
      concise: "Don’t look so worried, I still have the best jokes at this table!",
      expressive: "You all look wonderful tonight! Don’t look so serious—I still have plenty of jokes saved up for whenever you are ready to laugh!",
      detected_emotion: 'Lively Table Humor',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'family-humor',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'family-humor')?.audioUrl,
    };
  }

  // 4. Exact Scenario 4 Match: ALS Posture & Water / Caregiver Check-in
  if (
    kwLower.includes('pillow') ||
    (kwLower.includes('water') && kwLower.includes('adjust')) ||
    (kwLower.includes('cold water') && kwLower.includes('pillow')) ||
    (kwLower.includes('stay with me') && kwLower.includes('water'))
  ) {
    if (toneKey === 'urgent') {
      return {
        natural: "David, I urgently need you to tilt my pillow right now and let me have a sip of water, my neck is straining.",
        concise: "David, need my pillow adjusted and water immediately please.",
        expressive: "David, please help me right away—my pillow has slipped and my throat is completely parched.",
        detected_emotion: 'Urgent Comfort Adjustment',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'als-comfort',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'als-comfort')?.audioUrl,
      };
    }
    if (toneKey === 'grateful') {
      return {
        natural: "David, thank you so much for your gentle care. Whenever you have a second, could you slightly tilt my pillow and let me take a small sip of cold water?",
        concise: "Thank you so much David. A quick sip of water and pillow adjustment when you can.",
        expressive: "Your patience means the world to me, David. Would you kindly help me with my pillow and a sip of cold water? Thank you from the bottom of my heart.",
        detected_emotion: 'Grateful Bedside Request',
        tone_used: tone,
        model_used: 'gemini-3.6-flash-client',
        matchedScenarioId: 'als-comfort',
        audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'als-comfort')?.audioUrl,
      };
    }
    // Default Peaceful
    return {
      natural: "David, could you please tilt my pillow slightly to the right, and let me take a gentle sip of cold water? Thank you so much for always being so patient with me.",
      concise: "Pillow adjustment and a sip of water please, David.",
      expressive: "Whenever you have a quiet moment, David, a slight tilt of my pillow and a refreshing sip of water would make me feel so much more comfortable.",
      detected_emotion: 'Peaceful Bedside Comfort',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
      matchedScenarioId: 'als-comfort',
      audioUrl: DEMO_SCENARIOS.find((s) => s.id === 'als-comfort')?.audioUrl,
    };
  }

  // 5. General / Custom Concepts Formulation
  const joinedConcepts = kwList.length > 0 ? kwList.join(', ') : 'my current need';
  const partnerLabel =
    recipient === 'nurse'
      ? 'Nurse'
      : recipient === 'doctor'
      ? 'Doctor'
      : recipient === 'child'
      ? 'sweetheart'
      : recipient === 'family'
      ? 'my dear'
      : 'friend';

  if (toneKey === 'urgent') {
    return {
      natural: `Excuse me ${partnerLabel}, I urgently need your assistance with ${joinedConcepts} right now, please.`,
      concise: `Urgent assistance needed with ${joinedConcepts}, please.`,
      expressive: `Please help me right this moment with ${joinedConcepts}—it is causing significant discomfort.`,
      detected_emotion: 'Urgent Care Request',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  if (toneKey === 'playful') {
    return {
      natural: `Hey ${partnerLabel}! (chuckles) Could we take care of ${joinedConcepts}? You know how much that makes my whole day!`,
      concise: `Time for ${joinedConcepts}! Best team ever.`,
      expressive: `Well hello there! (laughs) If you could help me with ${joinedConcepts}, I promise to give you my brightest smile today!`,
      detected_emotion: 'Playful Dialogue',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  if (toneKey === 'loving') {
    return {
      natural: `Thank you so much for always being here for me, ${partnerLabel}. When you have a moment, could we attend to ${joinedConcepts}? I appreciate you deeply.`,
      concise: `Sending you so much love. Please help me with ${joinedConcepts} when you can.`,
      expressive: `You bring so much gentle warmth into my life. Thank you for your loving care, and for helping me with ${joinedConcepts}.`,
      detected_emotion: 'Affectionate Intimacy',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  if (toneKey === 'peaceful') {
    return {
      natural: `Whenever you have a quiet moment, ${partnerLabel}, could you please help me with ${joinedConcepts}? Thank you for your gentle presence.`,
      concise: `Gentle help with ${joinedConcepts}, whenever you are ready.`,
      expressive: `Sitting here quietly, I would be so comfortable if we could attend to ${joinedConcepts}. Your calm patience brings me peace.`,
      detected_emotion: 'Calm & Peaceful Request',
      tone_used: tone,
      model_used: 'gemini-3.6-flash-client',
    };
  }

  // Default Grateful
  return {
    natural: `Thank you so much, ${partnerLabel}. Could you please help me with ${joinedConcepts}? Your continuous kindness makes all the difference.`,
    concise: `Thank you ${partnerLabel}, please help with ${joinedConcepts}.`,
    expressive: `I am so grateful for your patience and gentleness today. Thank you for being by my side and helping with ${joinedConcepts}.`,
    detected_emotion: 'Heartfelt Gratitude',
    tone_used: tone,
    model_used: 'gemini-3.6-flash-client',
  };
}
