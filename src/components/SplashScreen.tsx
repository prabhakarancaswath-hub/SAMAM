import { ArrowRight } from 'lucide-react';

type Lang = 'en' | 'ta';

interface SplashScreenProps {
  lang: Lang;
  onStart: () => void;
  onLanguage: (lang: Lang) => void;
}

export function SplashScreen({ lang, onStart, onLanguage }: SplashScreenProps) {
  return (
    <section className="samam-splash" aria-label="SAMAM AI welcome screen">
      <div className="samam-splash-art" aria-hidden="true">
        <div className="samam-splash-glow" />
        <div className="samam-splash-skyline">
          <span className="dome dome-a" />
          <span className="dome dome-b" />
          <span className="tower tower-a" />
          <span className="tower tower-b" />
          <span className="tower tower-c" />
          <span className="arch arch-a" />
          <span className="arch arch-b" />
        </div>
        <div className="samam-splash-ground" />
        <div className="samam-splash-people">
          <span className="person p1" />
          <span className="person p2" />
          <span className="person p3" />
          <span className="person p4" />
          <span className="person p5 wheelchair"><i /></span>
          <span className="person p6" />
          <span className="person p7" />
        </div>
      </div>

      <div className="samam-splash-content">
        <div className="samam-splash-logo" aria-hidden="true">
          <span className="samam-s-logo">S</span>
          <span className="samam-s-logo-orb" />
        </div>

        <h1>SAMAM AI</h1>
        <p className="samam-splash-tagline">Equal Access <b>•</b> Stronger Communities</p>

        <div className="samam-splash-copy">
          <strong>
            {lang === 'ta' ? 'திட்டங்கள், சேவைகள் மற்றும் ஆதரவுக்கான' : 'Your AI Assistant for'}
          </strong>
          <strong>
            {lang === 'ta' ? 'உங்கள் AI உதவியாளர்' : 'Schemes, Services & Support'}
          </strong>
        </div>

        <div className="samam-splash-language" role="group" aria-label="Language">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => onLanguage('en')}>English</button>
          <span>|</span>
          <button className={lang === 'ta' ? 'active' : ''} onClick={() => onLanguage('ta')}>தமிழ்</button>
        </div>

        <button className="samam-splash-start" onClick={onStart}>
          <span>{lang === 'ta' ? 'தொடங்குங்கள்' : 'Get Started'}</span>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>

      <p className="samam-splash-footer">Powered by AI <b>•</b> Built for a Better Tomorrow</p>
    </section>
  );
}
