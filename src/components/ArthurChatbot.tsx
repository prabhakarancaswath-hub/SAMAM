import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Languages, GraduationCap, Landmark, ClipboardCheck, WifiOff, ExternalLink, ListChecks, Briefcase, BookOpen, Sparkles } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import schemesData from '@/data/schemes.json';
import { supabase } from '@/lib/supabase';

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
      <div className="geetha-mini-ear left" />
      <div className="geetha-mini-ear right" />
      <div className="geetha-mini-head">
        <div className="geetha-mini-eye left" />
        <div className="geetha-mini-eye right" />
        <div className="geetha-mini-trunk" />
        <div className="geetha-mini-headset" />
        <div className="geetha-mini-hair" />
        <div className="geetha-mini-lip" />
      </div>
    </div>
  );
}

function generateGeethaResponse(input: string, lang: Lang): string {
  const lower = input.toLowerCase();
  const isTa = lang === 'ta';

  if (lower.includes('government') || lower.includes('scheme') || lower.includes('portal') || lower.includes('website') || lower.includes('அரசு') || lower.includes('திட்டம்') || lower.includes('இணையதளம்')) {
    return isTa
      ? `**அரசு இணையதளம் / திட்டத்தை அணுகுவது எப்படி?**\n\n1. திட்டத்தின் அதிகாரப்பூர்வ பெயரை கண்டறியவும்.\n2. SAMAM-ல் கொடுக்கப்பட்ட **Official source** இணைப்பை மட்டும் திறக்கவும்.\n3. தளத்தில் **Eligibility / தகுதி** பகுதியை சரிபார்க்கவும்.\n4. கேட்கப்படும் ஆவணங்களை தயாராக வைத்துக்கொள்ளவும்.\n5. விண்ணப்பத்தை சமர்ப்பித்து **Application / Reference number**-ஐ சேமிக்கவும்.\n6. விண்ணப்ப நிலையை அதே அதிகாரப்பூர்வ portal-ல் சரிபார்க்கவும்.\n\n**முக்கிய portals:**\n• National Scholarship Portal — scholarships.gov.in\n• myScheme — myscheme.gov.in\n• Tamil Nadu e-District — edistricts.tn.gov.in\n• TNEA — tneaonline.org\n\n⚠️ விதிமுறைகள் மற்றும் தேதிகள் மாறலாம்; சமர்ப்பிக்கும் முன் அதிகாரப்பூர்வ portal-ஐ சரிபார்க்கவும்.`
      : `**How to access government websites & schemes**\n\n1. Identify the official scheme name.\n2. Open only the **Official source** link shown by SAMAM.\n3. Read the **Eligibility** section before applying.\n4. Keep the required documents ready.\n5. Submit the application and save the **Application / Reference number**.\n6. Track status on the same official portal.\n\n**Key portals:**\n• National Scholarship Portal — scholarships.gov.in\n• myScheme — myscheme.gov.in\n• Tamil Nadu e-District — edistricts.tn.gov.in\n• TNEA — tneaonline.org\n\n⚠️ Rules and dates can change. Check the official portal before submitting.`;
  }

  if (lower.includes('eligib') || lower.includes('தகுதி') || lower.includes('who can') || lower.includes('documents') || lower.includes('ஆவணம்')) {
    return isTa
      ? `**தகுதி சரிபார்ப்பு**\n\n• சமூக வகை / வகைப்பாடு\n• குடும்ப வருமானம்\n• கல்வி நிலை\n• மாநிலம் / வசிப்பிடம்\n• வயது அல்லது பாலின நிபந்தனை இருந்தால் அது\n• தேவையான சான்றிதழ்கள்\n\nஉங்கள் தனிப்பட்ட தகவல்களை இங்கே பகிர வேண்டிய அவசியமில்லை. நீங்கள் பார்க்கும் அதிகாரப்பூர்வ scheme page-ன் eligibility விதிகளைப் பின்பற்றுங்கள்.`
      : `**Eligibility check**\n\n• Category / community requirement\n• Family income\n• Education level\n• State / residence requirement\n• Age or gender condition, if the scheme specifies one\n• Required certificates\n\nYou do not need to share sensitive personal details here. Follow the eligibility rules on the official scheme page.`;
  }

  if (lower.includes('low internet') || lower.includes('offline') || lower.includes('slow internet') || lower.includes('data') || lower.includes('இணையம்') || lower.includes('ஆஃப்லைன்')) {
    return isTa
      ? `**குறைந்த இணைய வசதி முறை**\n\nSAMAM-ன் முக்கிய வழிகாட்டுதல்கள் உள்ளூர் தரவாக இயங்கும் வகையில் வடிவமைக்கப்பட்டுள்ளன. இணையம் மெதுவாக இருந்தால்:\n\n• Scholarship மற்றும் scheme வழிகாட்டுதலை உள்ளூர் தகவலிலிருந்து பார்க்கவும்\n• குறைந்த data கொண்ட text chat-ஐ பயன்படுத்தவும்\n• தேவையானபோது மட்டும் அதிகாரப்பூர்வ portal-ஐ திறக்கவும்\n• Application/reference number-ஐ சேமித்து வைத்துக்கொள்ளவும்\n\nஅதிகாரப்பூர்வ website-க்கு புதிய தகவல் அல்லது submission செய்ய இணையம் தேவைப்படும்.`
      : `**Low-internet mode**\n\nSAMAM's core guidance is designed to use local data, so important help can still work when connectivity is weak:\n\n• Read saved scholarship and scheme guidance\n• Use the lightweight text chat\n• Open official portals only when needed\n• Save your application/reference number\n\nYou still need internet for live government-portal updates and final submission.`;
  }

  if (lower.includes('apply') || lower.includes('application') || lower.includes('விண்ணப்ப') || lower.includes('how to') || lower.includes('எப்படி')) {
    return isTa
      ? `**விண்ணப்பிக்கும் பொதுவான நடைமுறை**\n\n1. தகுதியை சரிபார்க்கவும்.\n2. அதிகாரப்பூர்வ scheme portal-ஐ திறக்கவும்.\n3. தேவையான ஆவணங்களை தயார் செய்யவும்.\n4. படிவத்தை கவனமாக நிரப்பவும்.\n5. Submit செய்த பிறகு reference number-ஐ சேமிக்கவும்.\n6. Status-ஐ அதிகாரப்பூர்வ portal-ல் மட்டும் பார்க்கவும்.`
      : `**Typical application flow**\n\n1. Check eligibility.\n2. Open the official scheme portal.\n3. Prepare the required documents.\n4. Fill the form carefully.\n5. Save the reference number after submission.\n6. Check status only on the official portal.`;
  }

  if (lower.includes('scholar') || lower.includes('உதவித்தொகை') || lower.includes('grant') || lower.includes('நிதி')) {
    if (isTa) return `**உதவித்தொகை உதவி**\n\nஉங்கள் கல்வி நிலை, வகை, மற்றும் scheme-ன் தகுதி விதிகளைப் பார்த்து பொருத்தமான வாய்ப்புகளை கண்டறியலாம்.\n\n• அரசு scholarship portal-ஐ சரிபார்க்கவும்\n• scheme eligibility-ஐ முதலில் படிக்கவும்\n• ஆவணங்களை தயாராக வைத்துக்கொள்ளவும்\n• விண்ணப்ப reference number-ஐ சேமிக்கவும்\n\n**Geetha-க்கு கேட்கலாம்:** “என் scholarship-க்கு எப்படி apply செய்வது?”`;
    return `**Scholarship help**\n\nI can help you understand schemes and the application path.\n\n• Check the official scholarship portal\n• Read eligibility first\n• Prepare required documents\n• Save your application reference number\n\n**Ask Geetha:** “How do I apply for a scholarship?”`;
  }

  if (lower.includes('tnea') || lower.includes('counselling') || lower.includes('counseling') || lower.includes('college') || lower.includes('ஆலோசனை') || lower.includes('கல்லூரி') || lower.includes('engineering')) {
    return isTa
      ? `**TNEA ஆலோசனை — 5 படிகள்**\n\n1. பதிவு\n2. சான்றிதழ் சரிபார்ப்பு\n3. விருப்பப் படிப்பு / கல்லூரி தேர்வு\n4. ஒதுக்கீடு முடிவை சரிபார்ப்பு\n5. ஒதுக்கப்பட்ட கல்லூரியில் சேருதல்\n\n🔗 tneaonline.org\n\nதற்போதைய தேதிகள் மற்றும் அறிவிப்புகளை அதிகாரப்பூர்வ TNEA portal-ல் சரிபார்க்கவும்.`
      : `**TNEA counselling — 5 steps**\n\n1. Register\n2. Complete certificate verification\n3. Fill preferred branches / colleges\n4. Check allotment\n5. Report to the allotted college\n\n🔗 tneaonline.org\n\nCheck the official TNEA portal for current dates and announcements.`;
  }

  if (lower.includes('skill') || lower.includes('learn') || lower.includes('course') || lower.includes('திறன்') || lower.includes('கற்க') || lower.includes('பாடநெறி')) {
    return isTa
      ? `திறன் பக்கத்தில் உங்கள் ஆர்வத்திற்கு ஏற்ற கற்றல் வழிகளைப் பார்க்கலாம். SWAYAM போன்ற அதிகாரப்பூர்வ கல்வி தளங்களையும் சரிபார்க்கலாம்.`
      : `Use the Skills page to explore learning paths for your interests. You can also check official education platforms such as SWAYAM for courses.`;
  }

  if (lower.includes('job') || lower.includes('intern') || lower.includes('work') || lower.includes('வேலை') || lower.includes('பயிற்சி') || lower.includes('தொழில்')) {
    return isTa
      ? `வேலை மற்றும் internship வாய்ப்புகளுக்கான Jobs பக்கத்தைப் பயன்படுத்தவும். விண்ணப்பிக்கும் முன் நிறுவனம் அல்லது அதிகாரப்பூர்வ தளத்தை சரிபார்க்கவும்.`
      : `Use the Jobs page for work and internship opportunities. Before applying, verify the organisation and its official source.`;
  }

  if (lower.includes('sdg') || lower.includes('inequal') || lower.includes('ஏற்றத்தாழ்வு')) {
    return isTa
      ? `**SDG 10 — ஏற்றத்தாழ்வைக் குறைத்தல்**\n\nSAMAM தகவல் மற்றும் வழிகாட்டுதலுக்கான அணுகலை எளிதாக்குகிறது.`
      : `**SDG 10 — Reduced Inequalities**\n\nSAMAM makes opportunity information and guidance easier to access.`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('வணக்கம்') || lower.includes('ஹாய்')) {
    return isTa
      ? `வணக்கம்! நான் **Geetha** 🐘. உதவித்தொகைகள், அரசு திட்டங்கள், அதிகாரப்பூர்வ இணையதளங்கள், TNEA மற்றும் விண்ணப்பிக்கும் படிகளை எளிமையாக விளக்க முடியும்.`
      : `Hello! I'm **Geetha** ✨. I can explain scholarships, government schemes, official websites, TNEA and application steps in simple language.`;
  }

  return isTa
    ? `நான் உதவ முடியும்:\n\n• **Scholarships** — உதவித்தொகை வழிகாட்டி\n• **Government schemes** — அரசு திட்டங்கள் மற்றும் portals\n• **Eligibility** — தகுதி மற்றும் ஆவணங்கள்\n• **How to apply** — படிப்படியான வழிகாட்டி\n• **Low internet** — குறைந்த data வழிகாட்டி\n• **TNEA / Skills / Jobs**\n\nகீழே உள்ள segment-ஐ தேர்வு செய்யலாம் அல்லது உங்கள் கேள்வியை கேளுங்கள்.`
    : `I can help with:\n\n• **Scholarships** — scholarship guidance\n• **Government schemes** — schemes and official portals\n• **Eligibility** — requirements and documents\n• **How to apply** — step-by-step guidance\n• **Low internet** — lightweight guidance\n• **TNEA / Skills / Jobs**\n\nChoose a segment below or ask your question.`;
}

interface GuideRow { id: string; name: string; type: 'government' | 'private'; eligibility: string; benefits: string; documents: string; application_route: string; official_source: string; status_notes?: string | null; }

const GUIDE_KEYWORDS = ['scholar','scholarship','deadline','2026','2027','eligib','benefit','document','apply','application','nsp','otr','umis','bc','mbc','dnc','aicte','pragati','saksham','swanath','csss','pm yasasvi','உதவித்தொகை','தகுதி','ஆவணம்','விண்ணப்ப','கடைசி தேதி','ஓடிஆர்','யூமிஸ்'];

async function getGuideResponse(input: string, lang: Lang): Promise<string | null> {
  if (!supabase) return null;
  const lower = input.toLowerCase();
  if (!GUIDE_KEYWORDS.some(k => lower.includes(k))) return null;
  try {
    const [guideResult, knowledgeResult] = await Promise.all([
      supabase.from('scholarship_guide_2026_27').select('id,name,type,eligibility,benefits,documents,application_route,official_source,status_notes').limit(50),
      supabase.from('knowledge_documents').select('title,content').ilike('title', '%2026%').limit(5)
    ]);
    const guide = (guideResult.data || []) as GuideRow[];
    const terms = lower.split(/[^a-z0-9\u0B80-\u0BFF]+/i).filter(x => x.length >= 3);
    const matches = guide.filter(row => {
      const hay = [row.name,row.eligibility,row.benefits,row.application_route].join(' ').toLowerCase();
      return terms.some(term => hay.includes(term));
    });
    if (matches.length) {
      const item = matches[0];
      const title = lang === 'ta' ? '**' + item.name + ' — 2026–27 வழிகாட்டி**' : '**' + item.name + ' — 2026–27 guide**';
      const out = [title, '', (lang === 'ta' ? 'தகுதி: ' : 'Eligibility: ') + item.eligibility, '', (lang === 'ta' ? 'நன்மை: ' : 'Benefit: ') + item.benefits, '', (lang === 'ta' ? 'ஆவணங்கள்: ' : 'Documents: ') + item.documents, '', (lang === 'ta' ? 'விண்ணப்ப வழி: ' : 'Application route: ') + item.application_route, '', (lang === 'ta' ? 'அதிகாரப்பூர்வ மூலம்: ' : 'Official source: ') + item.official_source];
      if (item.status_notes) out.push('', (lang === 'ta' ? 'நிலை குறிப்பு: ' : 'Status note: ') + item.status_notes);
      out.push('', lang === 'ta' ? '⚠️ இந்த தகவல் 30-09-2026 அன்று தயாரிக்கப்பட்ட வழங்கப்பட்ட வழிகாட்டியிலிருந்து பெறப்பட்டது. சமர்ப்பிப்பதற்கு முன் அதிகாரப்பூர்வ portal/notification-ஐ சரிபார்க்கவும்.' : '⚠️ This information comes from the supplied guide prepared 30 Sep 2026. Verify the live official portal/notification before submitting.');
      return out.join('\n');
    }
    const sourceDoc = (knowledgeResult.data || [])[0]?.content;
    if (sourceDoc) return (lang === 'ta' ? '**2026–27 உதவித்தொகை தகவல்**\n\n' : '**2026–27 scholarship information**\n\n') + sourceDoc + '\n\n⚠️ Verify the live official portal before submitting.';
  } catch {}
  return null;
}

interface GeethaChatbotProps { lang: Lang; setLang: (lang: Lang) => void; open?: boolean; onOpenChange?: (open: boolean) => void; }

export function GeethaChatbot({ lang, setLang, open: externalOpen, onOpenChange }: GeethaChatbotProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [lowData, setLowData] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (val: boolean) => { if (onOpenChange) onOpenChange(val); else setInternalOpen(val); };
  const chatLang = lang;

  useEffect(() => {
    try { setLowData(localStorage.getItem('samam-low-data') === '1'); } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('samam-low-data', lowData ? '1' : '0'); } catch {}
  }, [lowData]);

  useEffect(() => {
    if (open && messages.length === 0) setMessages([{ role: 'arthur', content: t(chatLang, 'arthurWelcome') }]);
  }, [open, chatLang, messages.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ prompt?: string }>;
      if (custom.detail?.prompt) setTimeout(() => sendMessage(custom.detail.prompt!), 100);
    };
    document.addEventListener('open-arthur', handler);
    return () => document.removeEventListener('open-arthur', handler);
  });

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text.trim() }]);
    setInput('');
    setTyping(true);
    setTimeout(async () => {
      const response = (await getGuideResponse(text, chatLang)) ?? generateGeethaResponse(text, chatLang);
      setMessages(prev => [...prev, { role: 'arthur', content: response }]);
      setTyping(false);
    }, lowData ? 150 : 450);
  }, [chatLang, lowData]);

  const segments = chatLang === 'en'
    ? [
        ['Scholarships', 'scholarship', GraduationCap],
        ['Government Schemes', 'How do I access government websites and schemes?', Landmark],
        ['Eligibility', 'Check eligibility and documents', ClipboardCheck],
        ['How to Apply', 'How do I apply for a government scheme?', ListChecks],
        ['Low Internet', 'How does low internet mode work?', WifiOff],
        ['TNEA', 'TNEA counselling', BookOpen],
        ['Skills', 'skills and free courses', Sparkles],
        ['Jobs', 'jobs and internships', Briefcase],
      ] as const
    : [
        ['உதவித்தொகை', 'உதவித்தொகை', GraduationCap],
        ['அரசு திட்டங்கள்', 'அரசு இணையதளம் மற்றும் திட்டத்தை எப்படி அணுகுவது?', Landmark],
        ['தகுதி', 'தகுதி மற்றும் ஆவணங்கள்', ClipboardCheck],
        ['விண்ணப்பம்', 'அரசு திட்டத்திற்கு எப்படி விண்ணப்பிப்பது?', ListChecks],
        ['குறைந்த இணையம்', 'குறைந்த இணைய வசதி முறை', WifiOff],
        ['TNEA', 'TNEA ஆலோசனை', BookOpen],
        ['திறன்கள்', 'திறன்கள் மற்றும் இலவச பாடநெறிகள்', Sparkles],
        ['வேலைகள்', 'வேலை மற்றும் internship', Briefcase],
      ] as const;

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-slate-950 via-violet-950 to-cyan-900 text-white px-4 py-3 rounded-2xl shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in" aria-label="Open Geetha AI">
          <GeethaAvatar size={40} />
          <span className="font-semibold text-sm hidden sm:inline">Ask Geetha AI</span>
        </button>
      )}

      {open && (
        <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[430px] max-w-full animate-slide-in-right ${lowData ? 'low-data-mode' : ''}`}>
          <div className="flex flex-col bg-[#071025] text-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-cyan-300/15 overflow-hidden" style={{ height: 'min(720px, 90vh)' }}>
            <div className="flex items-center justify-between bg-gradient-to-r from-[#080d24] via-[#25105d] to-[#063d55] px-4 py-3.5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <GeethaAvatar size={48} large />
                <div>
                  <p className="font-black text-white text-base leading-none">Geetha AI</p>
                  <p className="text-cyan-100/70 text-xs mt-1">Government • Scholarships • Guidance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setLowData(v => !v)} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${lowData ? 'bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/30' : 'bg-white/10 text-white/80'}`} title="Toggle low internet mode">
                  <WifiOff size={13} className="inline mr-1" /> {lowData ? 'LOW DATA ON' : 'LOW DATA'}
                </button>
                <button onClick={() => setLang(chatLang === 'en' ? 'ta' : 'en')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
                  <Languages size={14} /> {chatLang === 'en' ? 'தமிழ்' : 'English'}
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white" aria-label="Close"><X size={18} /></button>
              </div>
            </div>

            <div className="px-4 pt-3 pb-2 bg-[#08142b] border-b border-white/10">
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {segments.map(([label, prompt, Icon]) => (
                  <button key={label} onClick={() => sendMessage(prompt)} className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.05] ring-1 ring-white/10 hover:bg-cyan-400/10 hover:ring-cyan-300/30 text-xs font-semibold text-slate-200 transition-all">
                    <Icon size={14} className="text-cyan-300" /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#061022]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                  {msg.role === 'arthur' && <GeethaAvatar size={30} />}
                  <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-br-md ml-2' : 'bg-white/[.07] text-slate-100 rounded-bl-md ml-2 border border-white/10 shadow-sm'}`}>
                    {msg.content.split('\n').map((line, j) => {
                      const parts = line.split(/(\*\*.+?\*\*)/g);
                      const linkMatch = line.match(/\[(.+?)\]\((.+?)\)/);
                      if (linkMatch) {
                        return <span key={j}>{line.replace(linkMatch[0], '')}<a href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline font-semibold">{linkMatch[1]}</a></span>;
                      }
                      return <span key={j}>{parts.map((part, k) => part.startsWith('**') ? <strong key={k}>{part.slice(2,-2)}</strong> : part)}</span>;
                    }).reduce((acc: React.ReactNode[], line, j) => [...acc, line, <br key={`br${j}`} />], []).slice(0, -1)}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <GeethaAvatar size={30} />
                  <div className="bg-white/[.07] border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-cyan-300 animate-bounce-soft" /><span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce-soft" style={{ animationDelay: '0.2s' }} /><span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce-soft" style={{ animationDelay: '0.4s' }} /></div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2 p-3 border-t border-white/10 bg-[#07152c] flex-shrink-0">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={chatLang === 'en' ? 'Ask about a scheme, portal or application…' : 'திட்டம், portal அல்லது விண்ணப்பம் பற்றி கேளுங்கள்…'} className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/[.05] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 focus:border-cyan-300/40" />
              <button type="submit" disabled={!input.trim()} className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"><Send size={18} /></button>
            </form>
            <div className="px-4 py-2 bg-[#050b19] text-[10px] text-slate-500 flex items-center justify-between">
              <span>{lowData ? 'Low-data mode • local guidance' : 'Local guidance • no account required'}</span>
              <span className="inline-flex items-center gap-1"><ExternalLink size={10} /> Verify on official portals</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


// Backward-compatible export used by App.tsx
export const ArthurChatbot = GeethaChatbot;
