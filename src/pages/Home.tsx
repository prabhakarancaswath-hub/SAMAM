import { ArrowRight, BookOpen, GraduationCap, Landmark, ListChecks, MessageCircle, Search, ShieldCheck, Sparkles, WifiOff, Wrench, Briefcase, Globe2 } from 'lucide-react';
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
          <div className="arthur-body"><div className="arthur-badge">A</div></div>
        </div>
        <div className="arthur-nameplate"><span className="arthur-live-dot" /> ARTHUR AI<small>Your access assistant</small></div>
      </div>
    </div>
  );
}

export function Home({ lang, setPage }: HomeProps) {
  const cards = [
    {
      icon: WifiOff,
      title: 'Low Internet Functionality',
      desc: 'Fast on slow internet. Use lightweight text guidance and saved essential information.',
      action: 'Try Low Data',
      color: 'from-cyan-500 to-blue-600',
      onClick: () => document.dispatchEvent(new CustomEvent('open-arthur', { detail: { prompt: 'How does Low Internet mode work?' } })),
    },
    {
      icon: Globe2,
      title: 'Access Govt Websites',
      desc: 'Learn how to identify and navigate official government portals safely.',
      action: 'Ask Arthur',
      color: 'from-violet-500 to-indigo-600',
      onClick: () => document.dispatchEvent(new CustomEvent('open-arthur', { detail: { prompt: 'How do I access government websites and schemes?' } })),
    },
    {
      icon: Landmark,
      title: 'Explore Schemes',
      desc: 'Discover education, scholarship, welfare and other public-service opportunities.',
      action: 'View Schemes',
      color: 'from-emerald-400 to-cyan-600',
      onClick: () => setPage('scholarships'),
    },
    {
      icon: ListChecks,
      title: 'Step-by-Step Guides',
      desc: 'Follow simple instructions for eligibility, documents, applications and status checks.',
      action: 'Get Started',
      color: 'from-amber-400 to-orange-500',
      onClick: () => document.dispatchEvent(new CustomEvent('open-arthur', { detail: { prompt: 'How do I apply for a government scheme step by step?' } })),
    },
  ];

  const modules = [
    { icon: GraduationCap, title: t(lang, 'homeFeature1'), desc: t(lang, 'homeFeature1Desc'), page: 'scholarships' as Page },
    { icon: BookOpen, title: t(lang, 'homeFeature2'), desc: t(lang, 'homeFeature2Desc'), page: 'tnea' as Page },
    { icon: Wrench, title: t(lang, 'homeFeature3'), desc: t(lang, 'homeFeature3Desc'), page: 'skills' as Page },
    { icon: Briefcase, title: t(lang, 'homeFeature4'), desc: t(lang, 'homeFeature4Desc'), page: 'jobs' as Page },
  ];

  return (
    <div className="relative -mx-4 sm:-mx-6 overflow-hidden rounded-b-[2rem] bg-[#050a18] text-white">
      <div className="absolute inset-0 samam-grid opacity-40" />
      <div className="absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl samam-float" />
      <div className="absolute top-[32rem] -left-40 h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-3xl samam-float" style={{ animationDelay: '1s' }} />

      <section className="relative px-5 sm:px-10 lg:px-16 pt-10 pb-12 md:pt-16 md:pb-14">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-300/5 px-3.5 py-2 text-xs font-bold text-cyan-200 ring-1 ring-cyan-300/20">
              <Sparkles size={14} /> ARTHUR AI • EQUAL ACCESS
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              {lang === 'ta' ? 'அனைவருக்கும் சமமான அணுகல்.' : 'Equal access.'}
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                {lang === 'ta' ? 'சமமான வாய்ப்புகள்.' : 'Smarter opportunities.'}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {lang === 'ta'
                ? 'Arthur AI அரசு இணையதளங்கள், திட்டங்கள், உதவித்தொகைகள் மற்றும் விண்ணப்ப வழிமுறைகளை எளிய முறையில் புரிந்துகொள்ள உதவுகிறது.'
                : 'Arthur AI helps you understand government websites, schemes, scholarships and application steps in a simple way — even when internet access is limited.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-bold shadow-lg transition hover:scale-[1.03]">
                <MessageCircle size={18} /> Ask Arthur
              </button>
              <button onClick={() => setPage('scholarships')} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 shadow-xl transition hover:scale-[1.03]">
                Explore schemes <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5"><Globe2 size={14} className="text-cyan-300" /> Tamil + English</span>
              <span className="inline-flex items-center gap-1.5"><WifiOff size={14} className="text-violet-300" /> Low-data friendly</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-300" /> Verify official sources</span>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <ArthurHero />
            <div className="mx-auto mt-3 max-w-md rounded-3xl border border-cyan-300/20 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-xl">
              <p className="text-lg font-extrabold text-cyan-100">Hi there! 👋</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">I can help you access important government websites and schemes, even on a slow internet connection.</p>
              <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="mt-4 w-full rounded-xl bg-cyan-500/10 px-4 py-2.5 text-sm font-bold text-cyan-200 ring-1 ring-cyan-300/20 transition hover:bg-cyan-500/20">Chat with Arthur →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-10 lg:px-16 pb-14">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button key={card.title} onClick={card.onClick} className="interactive-card group rounded-3xl bg-white/[.045] p-5 text-left ring-1 ring-white/10">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}>
                  <Icon size={27} />
                </div>
                <h2 className="text-lg font-black">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{card.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">{card.action} <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="relative border-y border-white/5 bg-white/[.025] px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Government portal guidance</p>
            <h2 className="mt-2 text-2xl font-black">Find the right official source before you apply.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Arthur can explain the general path: identify the scheme, open the official portal, check eligibility, prepare documents, submit, then save the reference number.</p>
          </div>
          <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur', { detail: { prompt: 'How do I access government websites and schemes?' } }))} className="shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-bold shadow-lg transition hover:scale-[1.03]">Ask Arthur →</button>
        </div>
      </section>

      <section className="relative px-5 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-violet-300">Explore SAMAM</p>
              <h2 className="mt-2 text-3xl font-black">Your next step starts here.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button key={module.page} onClick={() => setPage(module.page)} className="interactive-card group rounded-2xl bg-white/[.045] p-6 text-left ring-1 ring-white/10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg"><Icon size={22} /></div>
                    <div>
                      <h3 className="text-xl font-black">{module.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{module.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-300">Open module <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
