const API_KEY_STORAGE = 'samam_elevenlabs_api_key';
const VOICE_ID_STORAGE = 'samam_elevenlabs_voice_id';

// Default popular ElevenLabs warm female voices
export const ELEVENLABS_VOICES = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (Calm & Clear)' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Warm & Natural)' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura (Empathetic)' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi (Expressive)' },
];

export const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel

export function getStoredElevenLabsKey(): string {
  try {
    const key = localStorage.getItem(API_KEY_STORAGE);
    if (key && key.trim()) return key.trim();
  } catch {}
  return (import.meta.env.VITE_ELEVENLABS_API_KEY || '').trim();
}

export function saveStoredElevenLabsKey(key: string): void {
  try {
    if (key && key.trim()) {
      localStorage.setItem(API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  } catch {}
}

export function getStoredVoiceId(): string {
  try {
    const id = localStorage.getItem(VOICE_ID_STORAGE);
    if (id && id.trim()) return id.trim();
  } catch {}
  return DEFAULT_VOICE_ID;
}

export function saveStoredVoiceId(id: string): void {
  try {
    localStorage.setItem(VOICE_ID_STORAGE, id.trim());
  } catch {}
}

export function hasElevenLabsKey(): boolean {
  return !!getStoredElevenLabsKey();
}

let currentAudio: HTMLAudioElement | null = null;

export function stopElevenLabsSpeech(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
}

// Cleans markdown and extracts a spoken-friendly snippet to preserve free-tier characters
export function cleanTextForSpeech(text: string, maxChars = 350): string {
  const cleaned = text
    .replace(/https?:\/\/\S+/g, '') // remove URLs
    .replace(/[*#_`•]/g, ' ') // remove markdown syntax
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [link text](url) -> link text
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length <= maxChars) return cleaned;
  // Truncate cleanly at a sentence or word boundary
  const truncated = cleaned.slice(0, maxChars);
  const lastDot = Math.max(truncated.lastIndexOf('.'), truncated.lastIndexOf('!'), truncated.lastIndexOf('?'));
  if (lastDot > 100) return truncated.slice(0, lastDot + 1);
  return truncated + '...';
}

export async function testElevenLabsKey(apiKey: string): Promise<{ success: boolean; message: string }> {
  if (!apiKey || !apiKey.trim()) {
    return { success: false, message: 'Please enter an ElevenLabs API key.' };
  }

  try {
    const res = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: { 'xi-api-key': apiKey.trim() },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err?.detail?.message || `HTTP Error ${res.status}` };
    }

    const data = await res.json();
    const quota = data?.subscription?.character_count ?? 0;
    const limit = data?.subscription?.character_limit ?? 10000;
    const remaining = Math.max(0, limit - quota);

    return {
      success: true,
      message: `Connected! Remaining: ${remaining.toLocaleString()} / ${limit.toLocaleString()} free characters.`,
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error reaching ElevenLabs API' };
  }
}

export async function playElevenLabsSpeech(
  text: string,
  callbacks: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  } = {}
): Promise<boolean> {
  const apiKey = getStoredElevenLabsKey();
  if (!apiKey) return false;

  stopElevenLabsSpeech();

  const speechText = cleanTextForSpeech(text);
  if (!speechText) return false;

  const voiceId = getStoredVoiceId();

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: speechText,
        model_id: 'eleven_multilingual_v2', // Best for Tamil + English bilingual pronunciation
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      console.warn('ElevenLabs API returned error:', response.status);
      callbacks.onError?.();
      return false;
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onplay = () => callbacks.onStart?.();
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      callbacks.onEnd?.();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      callbacks.onError?.();
    };

    await audio.play();
    return true;
  } catch (err) {
    console.warn('ElevenLabs playback failed, will fallback:', err);
    callbacks.onError?.();
    return false;
  }
}
