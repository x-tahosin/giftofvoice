export const SOUNDBOARD_CATEGORIES = [
  { id: 'gratitude', label: 'Gratitude & Care', color: 'emerald', icon: 'HeartHandshake' },
  { id: 'needs', label: 'Comfort & Needs', color: 'sky', icon: 'CupSoda' },
  { id: 'love', label: 'Family & Love', color: 'rose', icon: 'Heart' },
  { id: 'social', label: 'Humor & Social', color: 'amber', icon: 'Smile' },
  { id: 'urgent', label: 'Urgent & Medical', color: 'red', icon: 'AlertCircle' },
];

export const SOUNDBOARD_ITEMS = [
  // Gratitude & Care
  { id: 'g1', label: 'Thank you so much', category: 'gratitude', icon: 'HeartHandshake', defaultTone: 'grateful', recipient: 'nurse' },
  { id: 'g2', label: 'Your kindness warms me', category: 'gratitude', icon: 'Sparkles', defaultTone: 'grateful', recipient: 'caregiver' },
  { id: 'g3', label: 'Deeply blessed today', category: 'gratitude', icon: 'Sun', defaultTone: 'peaceful', recipient: 'family' },
  { id: 'g4', label: 'You made my day better', category: 'gratitude', icon: 'ThumbsUp', defaultTone: 'grateful', recipient: 'volunteer' },

  // Comfort & Needs
  { id: 'n1', label: 'Cold water please', category: 'needs', icon: 'CupSoda', defaultTone: 'gentle', recipient: 'caregiver' },
  { id: 'n2', label: 'Warm blanket', category: 'needs', icon: 'Flame', defaultTone: 'gentle', recipient: 'nurse' },
  { id: 'n3', label: 'Adjust my pillow', category: 'needs', icon: 'Bed', defaultTone: 'gentle', recipient: 'caregiver' },
  { id: 'n4', label: 'Help sitting up', category: 'needs', icon: 'MoveUp', defaultTone: 'direct', recipient: 'caregiver' },
  { id: 'n5', label: 'Dim the room lights', category: 'needs', icon: 'Moon', defaultTone: 'peaceful', recipient: 'nurse' },

  // Family & Love
  { id: 'l1', label: 'I love you deeply', category: 'love', icon: 'Heart', defaultTone: 'loving', recipient: 'spouse' },
  { id: 'l2', label: 'So proud of you', category: 'love', icon: 'Award', defaultTone: 'loving', recipient: 'child' },
  { id: 'l3', label: 'I miss you dearly', category: 'love', icon: 'Users', defaultTone: 'loving', recipient: 'friend' },
  { id: 'l4', label: 'Hold my hand', category: 'love', icon: 'Hand', defaultTone: 'loving', recipient: 'family' },
  { id: 'l5', label: 'Tell me about your day', category: 'love', icon: 'MessageCircle', defaultTone: 'loving', recipient: 'family' },

  // Humor & Social
  { id: 's1', label: 'Tell me a funny joke', category: 'social', icon: 'Laugh', defaultTone: 'playful', recipient: 'friend' },
  { id: 's2', label: 'You look amazing today', category: 'social', icon: 'Eye', defaultTone: 'playful', recipient: 'caregiver' },
  { id: 's3', label: 'Do not worry about me', category: 'social', icon: 'ShieldCheck', defaultTone: 'peaceful', recipient: 'family' },
  { id: 's4', label: 'I am feeling spirited', category: 'social', icon: 'Smile', defaultTone: 'playful', recipient: 'everyone' },

  // Urgent & Medical
  { id: 'u1', label: 'Pain medicine needed', category: 'urgent', icon: 'Pill', defaultTone: 'urgent', recipient: 'nurse' },
  { id: 'u2', label: 'Difficulty breathing', category: 'urgent', icon: 'Wind', defaultTone: 'urgent', recipient: 'doctor' },
  { id: 'u3', label: 'Please stay with me', category: 'urgent', icon: 'ShieldAlert', defaultTone: 'urgent', recipient: 'caregiver' },
  { id: 'u4', label: 'Call the doctor now', category: 'urgent', icon: 'PhoneCall', defaultTone: 'urgent', recipient: 'nurse' },
];

export const EMOTIONAL_TONES = [
  { id: 'grateful', label: 'Heartfelt & Grateful', emoji: '🙏', desc: 'Sincere appreciation, warmth, emotional depth' },
  { id: 'loving', label: 'Loving & Tender', emoji: '❤️', desc: 'Affectionate, intimate, family comfort' },
  { id: 'playful', label: 'Playful & Humorous', emoji: '😄', desc: 'Gentle humor, lighthearted warmth, smile' },
  { id: 'peaceful', label: 'Calm & Peaceful', emoji: '🕊️', desc: 'Serene, soft-spoken, quiet reassurance' },
  { id: 'urgent', label: 'Urgent & Clear', emoji: '⚠️', desc: 'Direct, focused, prioritized medical clarity' },
];
