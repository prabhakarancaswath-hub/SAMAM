import { useState, useRef, useCallback, useEffect } from 'react';

// --- Text-to-Speech (speechSynthesis) ---
export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [enabled, setEnabled] = useState(true);
  const lastTextRef = useRef<string>('');

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!enabled || !text) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const locale = lang === 'ta' ? 'ta-IN' : 'en-US';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.rate = rate;
    utterance.pitch = 1;

    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang === locale) || voices.find(v => v.lang.startsWith(lang));
    if (match) utterance.voice = match;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    lastTextRef.current = text;
    window.speechSynthesis.speak(utterance);
  }, [enabled, rate]);

  const repeat = useCallback(() => {
    if (lastTextRef.current) speak(lastTextRef.current);
  }, [speak]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const slower = useCallback(() => {
    setRate(r => Math.max(0.5, +(r - 0.1).toFixed(1)));
  }, []);

  const faster = useCallback(() => {
    setRate(r => Math.min(2, +(r + 0.1).toFixed(1)));
  }, []);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  return { speaking, rate, enabled, setEnabled, speak, repeat, stop, slower, faster };
}

// --- Speech-to-Text (SpeechRecognition) ---
type SpeechRecognitionType = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
};

export function useSTT() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setSupported(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const recognition: SpeechRecognitionType = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognitionRef.current = recognition;

    return () => {
      try { recognition.abort(); } catch { /* noop */ }
    };
  }, []);

  const startListening = useCallback((lang: string = 'en') => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    setTranscript('');
    recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-US';

    recognition.onresult = (event: any) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    try {
      recognition.start();
      setListening(true);
    } catch (e) {
      console.error('Failed to start recognition:', e);
      setListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      try { recognition.stop(); } catch { /* noop */ }
    }
    setListening(false);
  }, []);

  return { listening, transcript, supported, startListening, stopListening, setTranscript };
}
