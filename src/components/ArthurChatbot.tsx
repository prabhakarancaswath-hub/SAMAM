import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Languages, GraduationCap, Landmark, ClipboardCheck, WifiOff, ExternalLink, ListChecks, Briefcase, BookOpen, Sparkles } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import schemesData from '@/data/schemes.json';

interface Scheme {
  id: string; name: string; name_ta: string; category: string[]; gender: string; incomeLimit: number;
  educationLevel: string; provider: string; benefits: string; benefits_ta: string; eligibility: string[];
  applyLink: string; tags: string[];
}
const schemes = schemesData as Scheme[];
interface ChatMessage { role: 'user' | 'arthur'; content: string; }

function GeethaAvatar({ size = 44, large = false }: { size?: number; large?: boolean }) {
  return (
    <div className={`geetha-avatar relative flex items-center justify-center flex-shrink-0 ${large ? 'geetha-avatar-large' : ''}`} style={{ width: size, height: size }} aria-label="Geetha AI assistant">
      <div className="geetha-avatar-ring" />
      <div className="geetha-hair" />
      <div className="geetha-face">
        <div className="geetha-eye left" />
        <div className="geetha-eye right" />
        <div className="geetha-brow left" />
        <div className="geetha-brow right" />
        <div className="geetha-mouth" />
      </div>
      <div className="geetha-shoulders"><span>G</span></div>
    </div>
  );
}
