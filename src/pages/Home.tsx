import { GraduationCap, BookOpen, Wrench, Briefcase, ArrowRight, Sparkles, Globe2, Mic, ShieldCheck, Search, MessageCircle, ChevronRight, WifiOff, Landmark } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import type { Page } from '@/components/Navbar';

interface HomeProps { lang: Lang; setPage: (p: Page) => void; }

function ArthurHero() {
  return (
    <div className="relative flex justify-center">
      <div className="arthur-stage">
        <div className="arthur-aura" />
        <div className="arthur-spark arthur-spark-1" />
        <div className="arthur-spark arthur-spark-2" />
        <div className="arthur-spark arthur-spark-3" />
        <div className="arthur-elephant" aria-label="Arthur AI elephant assistant">
          <div className="arthur-ear arthur-ear-left" />
          <div className="arthur-ear arthur-ear-right" />
          <div className="arthur-head">
            <div className="arthur-eye arthur-eye-left" />
            <div className="arthur-eye arthur-eye-right" />
            <div className="arthur-tusk arthur-tusk-left" />
            <div className="arthur-tusk arthur-tusk-right" />
            <div className="arthur-trunk" />
            <div className="arthur-blush arthur-blush-left" />
            <div className="arthur-blush arthur-blush-right" />
            <div className="arthur-headset" />
          </div>
          <div className="arthur-body">
            <div className="arthur-badge">A</div>
          </div>
        </div>
        <div className="arthur-nameplate">
          <span className="arthur-live-dot" /> ARTHUR AI
          <small>Your access assistant</small>
        </div>
        <div className="absolute -right-3 top-12 px-4 py-2.5 rounded-2xl bg-slate-950/90 ring-1 ring-cyan-300/30 shadow-xl text-xs backdrop-blur">
          <span className="text-cyan-300 font-bold">Ask Arthur</span><br />
          <span className="text-slate-400">Schemes • Portals • Steps</span>
        </div>
        <div className="absolute -left-5 bottom-20 px-4 py-2.5 rounded-2xl bg-slate-950/90 ring-1 ring-violet-300/30 shadow-xl text-xs backdrop-blur">
          <span className="text-violet-300 font-bold">Low Internet</span><br />
          <span className="text-slate-400">Works with saved guidance</span>
        </div>
      </div>
    </div>
  );
}

export function Home({ lang, setPage }: HomeProps) {
  const features = [
    { id: 'scholarships' as Page, icon: GraduationCap, title: t(lang, 'homeFeature1'), desc: t(lang, 'homeFeature1Desc'), accent: 'from-violet-500 to-fuchsia-500' },
    { id: 'tnea' as Page, icon: BookOpen, title: t(lang, 'homeFeature2'), desc: t(lang, 'homeFeature2Desc'), accent: 'from-cyan-400 to-blue-500' },
    { id: 'skills' as Page, icon: Wrench, title: t(lang, 'homeFeature3'), desc: t(lang, 'homeFeature3Desc'), accent: 'from-emerald-400 to-cyan-500' },
    { id: 'jobs' as Page, icon: Briefcase, title: t(lang, 'homeFeature4'), desc: t(lang, 'homeFeature4Desc'), accent: 'from-pink-500 to-violet-500' },
  ];

  return (
    <div className="relative -mx-4 sm:-mx-6 overflow-hidden rounded-b-[2rem] bg-[#060b1a] text-white">
      <div className="absolute inset-0 samam-grid opacity-40" />
      <div className="absolute -top-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-violet-600/20 blur-3xl samam-float" />
      <div className="absolute top-80 -left-40 w-[28rem] h-[28rem] rounded-full bg-cyan-500/15 blur-3xl samam-float" style={{ animationDelay: '1.2s' }} />

      <section className="relative px-5 sm:px-10 lg:px-16 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 ring-1 ring-cyan-300/20 text-cyan-200 text-xs font-semibold mb-6">
              <Sparkles size={14} /> AI-POWERED • EQUAL ACCESS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.02]">
              {lang === 'ta' ? 'அனைவருக்கும் சமமான அணுகல்.' : 'Equal access.'}
              <span className="block bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {lang === 'ta' ? 'சமமான வாய்ப்புகள்.' : 'Smarter opportunities.'}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-slate-300">
              {lang === 'ta' ? 'உதவித்தொகைகள், அரசு நலத்திட்டங்கள், கல்வி, திறன்கள் மற்றும் வேலை வாய்ப்புகளை ஒரே இடத்தில் கண்டறிய SAMAM AI உங்களுக்கு உதவுகிறது.' : 'SAMAM AI helps you discover scholarships, government schemes, education guidance, skills and opportunities in one simple place.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPage('scholarships')} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-bold hover:scale-[1.03] transition-all shadow-xl">
                Explore opportunities <ArrowRight size={18} />
              </button>
              <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold hover:scale-[1.03] transition-all shadow-lg">
                <MessageCircle size={18} /> Ask Arthur
              </button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5"><Globe2 size={14} className="text-cyan-300" /> Tamil + English</span>
              <span className="inline-flex items-center gap-1.5"><WifiOff size={14} className="text-violet-300" /> Low-internet friendly</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-300" /> Official sources</span>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <ArthurHero />
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-10 lg:px-16 pb-14">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-4 gap-3">
          {[
            { icon: Search, value: '01', label: 'Discover', desc: 'Find schemes and resources' },
            { icon: MessageCircle, value: '02', label: 'Ask Arthur', desc: 'Get simple guidance' },
            { icon: Landmark, value: '03', label: 'Access portals', desc: 'Learn where and how to apply' },
            { icon: WifiOff, value: '04', label: 'Low internet', desc: 'Use saved essential guidance' },
          ].map((item) => {
            const Icon = item.icon;
            return <div key={item.value} className="interactive-card rounded-2xl bg-white/[.04] ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between mb-5"><Icon size={21} className="text-cyan-300" /><span className="text-xs font-bold text-slate-500">{item.value}</span></div>
              <h3 className="font-bold text-lg">{item.label}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
            </div>;
          })}
        </div>
      </section>

      <section className="relative px-5 sm:px-10 lg:px-16 py-16 bg-white/[.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-cyan-300 uppercase">One platform</p>
              <h2 className="text-3xl sm:text-4xl font-black mt-2">Everything you need to move forward.</h2>
            </div>
            <button onClick={() => setPage('faqs')} className="hidden sm:flex items-center gap-1 text-sm text-slate-300 hover:text-white">FAQs <ChevronRight size={16}/></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return <button key={f.id} onClick={() => setPage(f.id)} className="interactive-card text-left rounded-2xl bg-white/[.045] ring-1 ring-white/10 p-6 hover:bg-white/[.07] group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}><Icon size={23} className="text-white" /></div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-sm leading-6 text-slate-400 mt-2 max-w-lg">{f.desc}</p>
                <span className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-cyan-300">Open module <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/></span>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-10 lg:px-16 py-14">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-violet-600/20 via-blue-600/10 to-cyan-500/20 ring-1 ring-white/10 p-7 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-violet-300 uppercase">Government access guide</p>
              <h2 className="text-2xl sm:text-3xl font-black mt-2">Arthur explains the next step.</h2>
              <p className="text-slate-400 mt-2 max-w-2xl">Ask “How do I access a government scheme?” and Arthur gives a simple path: identify the scheme, open the official portal, check eligibility, prepare documents, submit, and save the application reference.</p>
            </div>
            <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur', { detail: { prompt: 'How do I access government websites and schemes?' } }))} className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold shadow-lg hover:scale-[1.03] transition-all">
              <Sparkles size={18}/> Ask Arthur
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
