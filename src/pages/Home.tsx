import { GraduationCap, BookOpen, Wrench, Briefcase, ArrowRight, Scale, Globe, Mic, ShieldCheck } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import type { Page } from '@/components/Navbar';

interface HomeProps {
  lang: Lang;
  setPage: (p: Page) => void;
}

export function Home({ lang, setPage }: HomeProps) {
  const features = [
    { id: 'scholarships' as Page, icon: GraduationCap, title: t(lang, 'homeFeature1'), desc: t(lang, 'homeFeature1Desc'), color: 'from-sdg-blue to-sdg-blue-light', delay: '0s' },
    { id: 'tnea' as Page, icon: BookOpen, title: t(lang, 'homeFeature2'), desc: t(lang, 'homeFeature2Desc'), color: 'from-sdg-teal to-sdg-teal-light', delay: '0.1s' },
    { id: 'skills' as Page, icon: Wrench, title: t(lang, 'homeFeature3'), desc: t(lang, 'homeFeature3Desc'), color: 'from-sdg-orange to-sdg-orange-light', delay: '0.2s' },
    { id: 'jobs' as Page, icon: Briefcase, title: t(lang, 'homeFeature4'), desc: t(lang, 'homeFeature4Desc'), color: 'from-sdg-blue-dark to-sdg-teal', delay: '0.3s' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sdg-blue via-sdg-blue-light to-sdg-teal py-16 px-6 md:py-24 md:px-12">
        <div className="absolute inset-0 bg-wave-pattern bg-cover bg-bottom opacity-30" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-sdg-orange/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sdg-teal/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in-down">
            <Scale size={16} className="text-white" />
            <span className="text-white text-sm font-medium">SDG 10 — Reduced Inequalities</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t(lang, 'homeHeroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t(lang, 'homeHeroSub')}
          </p>
          <button
            onClick={() => setPage('scholarships')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-sdg-blue font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {t(lang, 'homeHeroCta')}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => setPage(f.id)}
              className="card p-6 text-left group hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: f.delay }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-ink-800 mb-2">{f.title}</h3>
              <p className="text-ink-500 text-sm leading-relaxed">{f.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-sdg-blue font-medium text-sm group-hover:gap-2 transition-all">
                {t(lang, 'viewDetails')}
                <ArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Globe, title: 'Tamil + English', desc: 'Bilingual interface' },
          { icon: Mic, title: 'Voice Support', desc: 'Speak & listen' },
          { icon: ShieldCheck, title: 'Verified Links', desc: 'Official sources only' },
        ].map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-ink-200 animate-fade-in" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-xl bg-sdg-teal/10 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-sdg-teal-dark" />
              </div>
              <div>
                <p className="font-semibold text-ink-800 text-sm">{h.title}</p>
                <p className="text-ink-500 text-xs">{h.desc}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-sdg-orange/5 border border-sdg-orange/20">
        <ShieldCheck size={20} className="text-sdg-orange flex-shrink-0 mt-0.5" />
        <p className="text-sm text-ink-600">{t(lang, 'verifyNote')}</p>
      </div>
    </div>
  );
}
