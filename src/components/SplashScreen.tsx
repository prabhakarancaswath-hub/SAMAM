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
        <div className="samam-splash-people"><svg className="samam-community-svg" viewBox="0 0 760 310" role="img" aria-label="Diverse SAMAM community">
  <defs>
    <linearGradient id="skin1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffd9c4"/><stop offset="1" stopColor="#c98672"/></linearGradient>
    <linearGradient id="skin2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2c1a7"/><stop offset="1" stopColor="#9a5e50"/></linearGradient>
    <linearGradient id="skin3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b9785d"/><stop offset="1" stopColor="#6d3f35"/></linearGradient>
    <linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9a65ec"/><stop offset="1" stopColor="#40349d"/></linearGradient>
    <linearGradient id="cloth2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#687ce8"/><stop offset="1" stopColor="#342c8e"/></linearGradient>
    <filter id="softGlow"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>
  <ellipse cx="380" cy="288" rx="330" ry="22" fill="#080b35" opacity=".55"/>
  <g className="samam-person samam-person-1" transform="translate(55 80)">
    <path d="M18 205 Q25 125 63 116 Q100 125 108 205Z" fill="url(#cloth)"/>
    <circle cx="63" cy="92" r="34" fill="url(#skin2)"/>
    <path d="M30 91 Q27 45 64 44 Q100 45 98 91 Q84 65 63 65 Q45 66 30 91Z" fill="#26164e"/>
    <circle cx="51" cy="92" r="3.2" fill="#17112e"/><circle cx="75" cy="92" r="3.2" fill="#17112e"/>
    <path d="M54 107 Q63 114 72 107" fill="none" stroke="#6f3541" strokeWidth="3" strokeLinecap="round"/>
    <path d="M39 143 Q18 161 8 184 M87 143 Q107 160 118 184" fill="none" stroke="#ffd0bd" strokeWidth="14" strokeLinecap="round"/>
  </g>
  <g className="samam-person samam-person-2" transform="translate(145 44)">
    <path d="M20 242 Q28 135 73 128 Q118 135 126 242Z" fill="url(#cloth2)"/>
    <circle cx="73" cy="101" r="39" fill="#f0d2bd"/>
    <path d="M34 96 Q27 50 70 47 Q117 47 113 101 Q99 72 73 72 Q48 72 34 96Z" fill="#e7e2e0"/>
    <circle cx="59" cy="101" r="3.2" fill="#332541"/><circle cx="87" cy="101" r="3.2" fill="#332541"/>
    <path d="M59 118 Q73 126 87 118" fill="none" stroke="#8d5b63" strokeWidth="3" strokeLinecap="round"/>
    <path d="M45 151 Q23 176 16 204 M102 151 Q124 176 132 204" fill="none" stroke="#f0d2bd" strokeWidth="15" strokeLinecap="round"/>
  </g>
  <g className="samam-person samam-person-3" transform="translate(255 65)">
    <path d="M18 222 Q27 132 69 125 Q111 132 120 222Z" fill="url(#cloth)"/>
    <circle cx="69" cy="98" r="37" fill="url(#skin3)"/>
    <path d="M33 96 Q34 52 70 50 Q105 53 106 94 Q91 70 69 70 Q48 70 33 96Z" fill="#16112e"/>
    <circle cx="55" cy="98" r="3.2" fill="#0c0920"/><circle cx="83" cy="98" r="3.2" fill="#0c0920"/>
    <path d="M55 114 Q69 122 83 114" fill="none" stroke="#e09a8a" strokeWidth="3" strokeLinecap="round"/>
    <path d="M42 145 Q19 168 10 193 M96 145 Q120 168 128 193" fill="none" stroke="#a96b53" strokeWidth="15" strokeLinecap="round"/>
  </g>
  <g className="samam-person samam-person-4" transform="translate(365 37)">
    <path d="M16 250 Q24 133 74 125 Q124 133 132 250Z" fill="url(#cloth2)"/>
    <circle cx="74" cy="98" r="41" fill="url(#skin2)"/>
    <path d="M34 97 Q32 45 75 45 Q117 47 116 98 Q100 70 75 70 Q51 70 34 97Z" fill="#17162d"/>
    <circle cx="59" cy="98" r="3.5" fill="#101020"/><circle cx="89" cy="98" r="3.5" fill="#101020"/>
    <path d="M59 119 Q74 128 89 119" fill="none" stroke="#7d4145" strokeWidth="3" strokeLinecap="round"/>
    <path d="M46 152 Q20 177 9 205 M101 152 Q127 177 139 205" fill="none" stroke="#b8755e" strokeWidth="16" strokeLinecap="round"/>
    <path d="M49 144 Q74 162 99 144" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" opacity=".75"/>
  </g>
  <g className="samam-person samam-person-5" transform="translate(480 92)">
    <path d="M25 185 Q34 125 74 119 Q114 125 123 185Z" fill="url(#cloth)"/>
    <circle cx="74" cy="91" r="35" fill="url(#skin3)"/>
    <path d="M40 89 Q40 48 75 47 Q109 48 108 89 Q96 67 75 67 Q53 67 40 89Z" fill="#21152f"/>
    <circle cx="61" cy="91" r="3.2" fill="#0d0920"/><circle cx="87" cy="91" r="3.2" fill="#0d0920"/>
    <path d="M61 107 Q74 114 87 107" fill="none" stroke="#d58b79" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="74" cy="198" r="47" fill="none" stroke="#17133f" strokeWidth="9"/>
    <circle cx="74" cy="198" r="18" fill="none" stroke="#17133f" strokeWidth="6"/>
    <path d="M42 153 L74 173 L105 151 M74 173 L74 194" fill="none" stroke="#17133f" strokeWidth="7" strokeLinecap="round"/>
  </g>
  <g className="samam-person samam-person-6" transform="translate(595 57)">
    <path d="M17 230 Q26 132 70 125 Q114 132 123 230Z" fill="url(#cloth2)"/>
    <circle cx="70" cy="98" r="38" fill="url(#skin2)"/>
    <path d="M33 96 Q33 48 71 47 Q107 49 108 96 Q94 69 71 69 Q48 69 33 96Z" fill="#3a2458"/>
    <circle cx="56" cy="98" r="3.2" fill="#161026"/><circle cx="84" cy="98" r="3.2" fill="#161026"/>
    <path d="M56 115 Q70 123 84 115" fill="none" stroke="#874c50" strokeWidth="3" strokeLinecap="round"/>
    <path d="M43 148 Q20 174 11 199 M97 148 Q120 174 130 199" fill="none" stroke="#b87762" strokeWidth="15" strokeLinecap="round"/>
  </g>
  <g className="samam-person samam-person-7" transform="translate(690 82)">
    <path d="M10 205 Q18 130 49 123 Q80 130 88 205Z" fill="url(#cloth)"/>
    <circle cx="49" cy="97" r="32" fill="url(#skin1)"/>
    <path d="M18 96 Q20 55 50 53 Q80 55 81 95 Q68 73 50 73 Q31 73 18 96Z" fill="#20133f"/>
    <circle cx="39" cy="97" r="3" fill="#120b24"/><circle cx="59" cy="97" r="3" fill="#120b24"/>
    <path d="M40 111 Q49 117 59 111" fill="none" stroke="#86464e" strokeWidth="3" strokeLinecap="round"/>
  </g>
  <g className="samam-face-sparkles" fill="#67e8f9" filter="url(#softGlow)">
    <circle cx="105" cy="130" r="3"/><circle cx="336" cy="92" r="3"/><circle cx="646" cy="128" r="3"/>
  </g>
</svg></div>
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
