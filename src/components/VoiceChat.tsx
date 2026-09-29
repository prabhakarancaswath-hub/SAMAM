import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Gauge, Send } from 'lucide-react';
import { useTTS, useSTT } from '@/hooks/useSpeech';
import { t, type Lang } from '@/i18n/translations';

interface VoiceChatProps {
  lang: Lang;
  onTranscript: (text: string) => void;
  responseText: string;
}

export function VoiceChat({ lang, onTranscript, responseText }: VoiceChatProps) {
  const tts = useTTS();
  const stt = useSTT();
  const [input, setInput] = useState('');
  const prevResponseRef = useRef('');

  useEffect(() => {
    if (responseText && responseText !== prevResponseRef.current) {
      prevResponseRef.current = responseText;
      if (tts.enabled) {
        tts.speak(responseText, lang);
      }
    }
  }, [responseText, lang, tts]);

  const handleMic = () => {
    if (stt.listening) {
      stt.stopListening();
      if (stt.transcript) {
        setInput(stt.transcript);
        onTranscript(stt.transcript);
      }
    } else {
      if (!stt.supported) {
        alert(t(lang, 'voiceUnsupported'));
        return;
      }
      stt.startListening(lang);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onTranscript(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-4 space-y-3">
      {/* TTS controls bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => tts.setEnabled(!tts.enabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              tts.enabled
                ? 'bg-sdg-teal/10 text-sdg-teal-dark'
                : 'bg-ink-100 text-ink-400'
            }`}
          >
            {tts.enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {tts.enabled ? t(lang, 'ttsOn') : t(lang, 'ttsOff')}
          </button>
          {tts.enabled && (
            <>
              <button
                onClick={tts.repeat}
                disabled={!tts.speaking && !responseText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50 transition-all disabled:opacity-40"
              >
                <RotateCcw size={14} />
                {t(lang, 'repeat')}
              </button>
              <button
                onClick={tts.slower}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50 transition-all"
              >
                <Gauge size={14} />
                {t(lang, 'slower')} ({tts.rate.toFixed(1)}x)
              </button>
              <button
                onClick={tts.faster}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50 transition-all"
              >
                <Gauge size={14} />
                {t(lang, 'faster')}
              </button>
            </>
          )}
        </div>
        {tts.speaking && (
          <div className="flex items-center gap-1 text-sdg-teal animate-fade-in">
            <span className="voice-bar h-4" />
            <span className="voice-bar h-4" />
            <span className="voice-bar h-4" />
            <span className="voice-bar h-4" />
            <span className="voice-bar h-4" />
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleMic}
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
            stt.listening
              ? 'bg-red-500 text-white animate-pulse-soft shadow-lg shadow-red-500/30'
              : 'bg-sdg-blue text-white hover:bg-sdg-blue-light shadow-lg shadow-sdg-blue/30'
          }`}
        >
          {stt.listening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <input
          type="text"
          value={stt.listening ? stt.transcript : input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={stt.listening ? t(lang, 'listening') : t(lang, 'search') + '...'}
          className="flex-1 input-field"
          disabled={stt.listening}
        />
        <button
          type="submit"
          className="flex-shrink-0 w-12 h-12 rounded-xl bg-sdg-teal text-white flex items-center justify-center hover:bg-sdg-teal-light shadow-lg shadow-sdg-teal/30 active:scale-95 transition-all duration-200"
        >
          <Send size={18} />
        </button>
      </form>

      {!stt.supported && (
        <p className="text-xs text-ink-400 italic">{t(lang, 'voiceUnsupported')}</p>
      )}
    </div>
  );
}
