import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, Languages } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import schemesData from '@/data/schemes.json';

interface Scheme {
  id: string;
  name: string;
  name_ta: string;
  category: string[];
  gender: string;
  incomeLimit: number;
  educationLevel: string;
  provider: string;
  benefits: string;
  benefits_ta: string;
  eligibility: string[];
  applyLink: string;
  tags: string[];
}

const schemes = schemesData as Scheme[];

interface ChatMessage {
  role: 'user' | 'arthur';
  content: string;
}

function ElephantAvatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="relative rounded-full bg-gradient-to-br from-violet-600 via-sdg-blue to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg samam-orb overflow-hidden"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 rounded-full bg-cyan-300/30 blur-md samam-glow" />
      <svg viewBox="0 0 64 64" width={size * 0.6} height={size * 0.6} fill="white">
        <path d="M20 14c-6 0-11 5-11 12 0 4 2 7 4 9v8c0 3 2 5 5 5h2v-6h4v6h4v-6h4v6h2c3 0 5-2 5-5v-8c2-2 4-5 4-9 0-7-5-12-11-12-1-2-3-3-6-3s-5 1-6 3z" />
        <circle cx="15" cy="24" r="2.5" fill="#0F4C81" />
        <path d="M28 30c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" fill="#0F4C81" opacity="0.3" />
      </svg>
    </div>
  );
}

function generateArthurResponse(input: string, lang: Lang): string {
  const lower = input.toLowerCase();
  const isTa = lang === 'ta';

  // Scholarships
  if (lower.includes('scholar') || lower.includes('உதவித்தொகை') || lower.includes('scholarship') || lower.includes('grant') || lower.includes('நிதி')) {
    if (isTa) {
      return `உதவித்தொகைகளைப் பற்றி நான் உதவுகிறேன்! உங்களுக்கு ஏற்ற திட்டங்களைக் கண்டறிய, தயவுசெய்து பின்வருவனவற்றைக் கூறுங்கள்:\n\n• **வகை** (OC/BC/MBC/SC/ST/OBC)\n• **குடும்ப வருமானம்** (ஆண்டு)\n• **கல்வி நிலை** (பள்ளி/இளநிலை/முதுநிலை)\n• **பாலினம்**\n\nஇல்லையெனில், சில பிரபலமான உதவித்தொகைகள்:\n1. **Post Matric Scholarship (SC/ST/OBC)** — முழு கட்டணம் + மாதம் ₹7,500\n2. **AICTE Pragati Scholarship** — பெண் மாணவர்களுக்கு ஆண்டு ₹50,000\n3. **TN First Graduate Concession** — முதல் பட்டதாரிக்கு இலவச கட்டணம்\n4. **NMMS** — 9-12 வகுப்பு மாணவர்களுக்கு ஆண்டு ₹12,000\n\n📋 [scholarships.gov.in](https://scholarships.gov.in) இல் விண்ணப்பிக்கவும்`;
    }
    return `I'd love to help you find scholarships! To give you the best matches, please tell me:\n\n• **Category** (OC/BC/MBC/SC/ST/OBC)\n• **Family income** (per year)\n• **Education level** (school/UG/PG)\n• **Gender**\n\nIn the meantime, here are some popular ones:\n1. **Post Matric Scholarship (SC/ST/OBC)** — Full tuition + ₹7,500/month\n2. **AICTE Pragati Scholarship** — ₹50,000/year for girls in tech\n3. **TN First Graduate Concession** — Free tuition for first graduate in family\n4. **NMMS** — ₹12,000/year for classes 9-12\n\n📋 Apply at [scholarships.gov.in](https://scholarships.gov.in)`;
  }

  // SDG 10
  if (lower.includes('sdg') || lower.includes('inequal') || lower.includes('10') || lower.includes('ஏற்றத்தாழ்வு')) {
    if (isTa) {
      return `**SDG 10: ஏற்றத்தாழ்வைக் குறைத்தல்**\n\nநிலையான வளர்ச்சி இலக்கு 10, நாடுகளுக்குள் மற்றும் நாடுகளுக்கு இடையே ஏற்றத்தாழ்வைக் குறைக்க நோக்கம் கொண்டுள்ளது.\n\n**இலக்கு 10.2:** 2030க்குள், அனைத்து நபர்களின் சமூக, பொருளாதார மற்றும் அரசியல் உள்ளீட்டை இணைத்து மேம்படுத்துதல்.\n\n**இந்த செயலி எப்படி உதவுகிறது:**\n• உதவித்தொகை மற்றும் நலத்திட்டங்கள் தகவல்\n• TNEA பொறியியல் ஆலோசனை வழிகாட்டி\n• திறன் பரிந்துரைகள்\n• வேலை மற்றும் பயிற்சி வாய்ப்புகள்\n\nஇவை அனைத்தும் தமிழ் மற்றும் ஆங்கிலத்தில் கிடைக்கின்றன!`;
    }
    return `**SDG 10: Reduced Inequalities**\n\nSustainable Development Goal 10 aims to reduce inequality within and among countries.\n\n**Target 10.2:** By 2030, empower and promote the social, economic and political inclusion of all.\n\n**How this app helps:**\n• Scholarship & welfare scheme information\n• TNEA engineering counselling guidance\n• Skill recommendations\n• Job & internship opportunities\n\nAll available in both Tamil and English!`;
  }

  // TNEA
  if (lower.includes('tnea') || lower.includes('counselling') || lower.includes('counseling') || lower.includes('college') || lower.includes('ஆலோசனை') || lower.includes('கல்லூரி') || lower.includes('engineering')) {
    if (isTa) {
      return `**TNEA ஆலோசனை — 5 படிகள்**\n\n1. **பதிவு** — TNEA போர்ட்டலில் +2 மதிப்பெண்களுடன் பதிவு செய்யவும்\n2. **சான்றிதழ் சரிபார்ப்பு** — குறிப்பிட்ட மையத்திற்கு செல்லவும்\n3. **தேர்வு நிரப்புதல்** — விருப்பப் கல்லூரிகள் மற்றும் படிப்புகளை நிரப்பவும்\n4. **ஒதுக்கீடு** — முடிவைச் சரிபார்த்து கட்டணம் செலுத்தவும்\n5. **சேர்க்கை** — கல்லூரியில் அசல் ஆவணங்களுடன் சேரவும்\n\n🔗 [tneaonline.org](https://tneaonline.org) | [cutoff.tneaonline.org](https://cutoff.tneaonline.org)\n\nகல்லூரி தேடி பக்கத்தில் 387 கல்லூரிகள் உள்ளன!`;
    }
    return `**TNEA Counselling — 5 Steps**\n\n1. **Registration** — Register on TNEA portal with +2 marks\n2. **Certificate Verification** — Visit designated center\n3. **Choice Filling** — Fill preferred colleges and branches\n4. **Allotment** — Check result and pay fee to confirm seat\n5. **Reporting** — Report to allotted college with originals\n\n🔗 [tneaonline.org](https://tneaonline.org) | [cutoff.tneaonline.org](https://cutoff.tneaonline.org)\n\nThe College Finder page has 387 colleges with branch details!`;
  }

  // Skills
  if (lower.includes('skill') || lower.includes('learn') || lower.includes('course') || lower.includes('திறன்') || lower.includes('கற்க') || lower.includes('பாடநெறி')) {
    if (isTa) {
      return `திறன் உதவியாளர் பக்கத்திற்குச் செல்லுங்கள்! உங்கள் தகுதி மற்றும் ஆர்வங்களைத் தேர்வு செய்தால், பரிந்துரைக்கப்பட்ட திறன்கள் மற்றும் இலவாய பாடநெறிகளைப் பெறலாம்.\n\n**பிரபலமான திறன்கள்:**\n• நிரலாக்கம் (Python, JavaScript)\n• தரவு பகுப்பாய்வு\n• டிஜிட்டல் சந்தைப்படுத்தல்\n• ஆங்கிலம் தொடர்பாடல்\n\n📚 [swayam.gov.in](https://swayam.gov.in) இல் இலவாய பாடநெறிகள்`;
    }
    return `Check the Skills page! Select your qualification and interests to get recommended skills and free courses.\n\n**Popular skills:**\n• Programming (Python, JavaScript)\n• Data Analytics\n• Digital Marketing\n• English Communication\n\n📚 Free courses at [swayam.gov.in](https://swayam.gov.in)`;
  }

  // Jobs
  if (lower.includes('job') || lower.includes('intern') || lower.includes('work') || lower.includes('வேலை') || lower.includes('பயிற்சி') || lower.includes('தொழில்')) {
    if (isTa) {
      return `வேலை பலகையில் தமிழ்நாடு முழுவதும் வாய்ப்புகள் உள்ளன! இடம் மற்றும் வேலை வகை மூலம் வடிகட்டவும்.\n\n**கிடைக்கும் வகைகள்:**\n• முழுநேரம்\n• பகுதிநேரம்\n• பயிற்சி\n• தொலைதூர வேலை`;
    }
    return `The Jobs board has opportunities across Tamil Nadu! Filter by location and job type.\n\n**Available types:**\n• Full-time\n• Part-time\n• Internship\n• Remote work`;
  }

  // Eligibility / category specific
  if (lower.includes('sc') || lower.includes('st') || lower.includes('obc') || lower.includes('bc') || lower.includes('mbc')) {
    const matched = schemes.filter(s => {
      const cats = s.category.map(c => c.toLowerCase());
      return lower.split(/\s+/).some(w => cats.includes(w));
    }).slice(0, 5);

    if (matched.length > 0) {
      const list = matched.map((s, i) =>
        isTa
          ? `${i + 1}. **${s.name_ta}** — ${s.benefits_ta}\n   தகுதி: ${s.eligibility.join(', ')}\n   🔗 [விண்ணப்பிக்க](${s.applyLink})`
          : `${i + 1}. **${s.name}** — ${s.benefits}\n   Eligibility: ${s.eligibility.join(', ')}\n   🔗 [Apply](${s.applyLink})`
      ).join('\n\n');
      return isTa
        ? `உங்கள் வகைக்கான உதவித்தொகைகள்:\n\n${list}\n\n⚠️ எப்போதும் அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.`
        : `Scholarships for your category:\n\n${list}\n\n⚠️ Always verify on the official website.`;
    }
  }

  // Income-based
  if (lower.includes('income') || lower.includes('வருமானம்') || lower.includes('poor') || lower.includes('financial')) {
    if (isTa) {
      return `உங்கள் குடும்ப வருமானத்தைக் கூறினால், நான் பொருத்தமான உதவித்தொகைகளைப் பட்டியலிடுவேன். பொதுவாக:\n\n• ₹1.5 லட்சம் வரை → NMMS, Pre-Matric schemes\n• ₹2.5 லட்சம் வரை → Post Matric, BC/MBC scholarships\n• ₹4.5 லட்சம் வரை → Central Sector, TN Higher Education\n• ₹8 லட்சம் வரை → AICTE Pragati/Saksham`;
    }
    return `Tell me your family income and I'll list matching scholarships. Generally:\n\n• Up to ₹1.5L → NMMS, Pre-Matric schemes\n• Up to ₹2.5L → Post Matric, BC/MBC scholarships\n• Up to ₹4.5L → Central Sector, TN Higher Education\n• Up to ₹8L → AICTE Pragati/Saksham`;
  }

  // Greeting
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('வணக்கம்') || lower.includes('ஹாய்')) {
    return isTa
      ? `வணக்கம்! நான் ஆர்தர் 🐘 உதவித்தொகை, TNEA, திறன்கள், மற்றும் வேலைகள் பற்றி உதவ முடியும். என்ன கேட்க விரும்புகிறீர்கள்?`
      : `Hello! I'm Arthur 🐘 I can help with scholarships, TNEA, skills, and jobs. What would you like to know?`;
  }

  // Default
  return isTa
    ? `நான் பின்வருவனவற்றில் உதவ முடியும்:\n\n• **உதவித்தொகைகள்** — உங்கள் தகுதிக்கு ஏற்ற திட்டங்கள்\n• **TNEA ஆலோசனை** — பொறியியல் சேர்க்கை வழிகாட்டி\n• **திறன்கள்** — கற்க வேண்டிய திறன்கள்\n• **வேலைகள்** — வாய்ப்புகள்\n• **SDG 10** — ஏற்றத்தாழ்வைக் குறைத்தல்\n\nதயவுசெய்து கேளுங்கள்!`
    : `I can help with:\n\n• **Scholarships** — schemes matching your eligibility\n• **TNEA Counselling** — engineering admission guide\n• **Skills** — what to learn and where\n• **Jobs** — opportunities across Tamil Nadu\n• **SDG 10** — reducing inequalities\n\nJust ask!`;
}

interface ArthurChatbotProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ArthurChatbot({ lang, setLang, open: externalOpen, onOpenChange }: ArthurChatbotProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    else setInternalOpen(val);
  };

  const chatLang = lang;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'arthur', content: t(chatLang, 'arthurWelcome') }]);
    }
  }, [open, chatLang, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = generateArthurResponse(text, chatLang);
      setMessages(prev => [...prev, { role: 'arthur', content: response }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  }, [chatLang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickChips = chatLang === 'en'
    ? [t(chatLang, 'arthurQuick1'), t(chatLang, 'arthurQuick2'), t(chatLang, 'arthurQuick3')]
    : [t(chatLang, 'arthurQuick1'), t(chatLang, 'arthurQuick2'), t(chatLang, 'arthurQuick3')];

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-slate-950 via-sdg-blue-dark to-violet-700 text-white px-4 py-3 rounded-2xl shadow-xl shadow-sdg-blue/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in"
          aria-label={t(chatLang, 'arthurChatWith')}
        >
          <ElephantAvatar size={36} />
          <span className="font-semibold text-sm hidden sm:inline">{t(chatLang, 'arthurChatWith')}</span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-96 max-w-full animate-slide-in-right">
          <div className="flex flex-col bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-ink-200 overflow-hidden" style={{ height: 'min(600px, 85vh)' }}>
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-950 via-sdg-blue-dark to-violet-700 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ElephantAvatar size={40} />
                <div>
                  <p className="font-bold text-white text-sm leading-none">{t(chatLang, 'arthurName') || 'Arthur'}</p>
                  <p className="text-white/80 text-xs mt-0.5">{t(chatLang, 'arthurSubtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang(chatLang === 'en' ? 'ta' : 'en')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-all"
                  title="Switch language"
                >
                  <Languages size={14} />
                  {chatLang === 'en' ? 'தமிழ்' : 'English'}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-all"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-ink-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                  {msg.role === 'arthur' && <ElephantAvatar size={28} />}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-sdg-blue text-white rounded-br-md ml-2'
                        : 'bg-white text-ink-700 rounded-bl-md ml-2 border border-ink-100 shadow-sm'
                    }`}
                  >
                    {msg.content.split('\n').map((line, j) => {
                      const boldMatch = line.match(/\*\*(.+?)\*\*/);
                      const linkMatch = line.match(/\[(.+?)\]\((.+?)\)/);
                      if (linkMatch) {
                        const before = line.substring(0, linkMatch.index || 0);
                        return (
                          <span key={j}>
                            {before && <span>{before}</span>}
                            <a href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-sdg-blue underline font-medium">
                              {linkMatch[1]}
                            </a>
                            {line.substring((linkMatch.index || 0) + linkMatch[0].length)}
                          </span>
                        );
                      }
                      if (boldMatch) {
                        return (
                          <span key={j}>
                            {line.split(/\*\*(.+?)\*\*/).map((part, k) =>
                              k % 2 === 1 ? <strong key={k}>{part}</strong> : <span key={k}>{part}</span>
                            )}
                          </span>
                        );
                      }
                      return <span key={j}>{line}</span>;
                    }).reduce((acc: React.ReactNode[], line, j) => [...acc, line, <br key={`br${j}`} />], []).slice(0, -1)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <ElephantAvatar size={28} />
                  <div className="bg-white border border-ink-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-sdg-teal animate-bounce-soft" />
                      <span className="w-2 h-2 rounded-full bg-sdg-teal animate-bounce-soft" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 rounded-full bg-sdg-teal animate-bounce-soft" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick chips */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {quickChips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(chip)}
                    className="px-3 py-1.5 rounded-full bg-sdg-teal/10 text-sdg-teal-dark text-xs font-medium hover:bg-sdg-teal/20 transition-all active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-ink-100 bg-white flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={chatLang === 'en' ? t(chatLang, 'arthurPlaceholder') : t(chatLang, 'arthurPlaceholderTa')}
                className="flex-1 px-4 py-2.5 rounded-xl border border-ink-200 bg-ink-50 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-sdg-teal/40 focus:border-sdg-teal transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-sdg-teal text-white flex items-center justify-center hover:bg-sdg-teal-light shadow-md shadow-sdg-teal/30 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
