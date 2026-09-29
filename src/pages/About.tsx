import { Scale, Globe, Mic, ShieldCheck, GraduationCap, BookOpen, Wrench, Briefcase, Heart } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';

export function About({ lang }: { lang: Lang }) {
  const features = [
    { icon: GraduationCap, text: t(lang, 'aboutFeature1') },
    { icon: BookOpen, text: t(lang, 'aboutFeature2') },
    { icon: Wrench, text: t(lang, 'aboutFeature3') },
    { icon: Briefcase, text: t(lang, 'aboutFeature4') },
    { icon: Globe, text: t(lang, 'aboutFeature5') },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="section-title">{t(lang, 'aboutTitle')}</h1>
      </div>

      {/* SDG 10 Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sdg-blue via-sdg-teal to-sdg-orange p-8 md:p-12 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 animate-bounce-soft">
            <Scale size={40} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">SDG 10</h2>
          <p className="text-white/90 text-lg font-medium mb-4">Reduced Inequalities</p>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t(lang, 'aboutSDGGoal')}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="card p-6 animate-fade-in-up">
        <p className="text-ink-600 leading-relaxed">{t(lang, 'aboutDesc')}</p>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-ink-800">{t(lang, 'aboutFeatures')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card p-4 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 rounded-xl bg-sdg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-sdg-teal-dark" />
                </div>
                <p className="text-sm text-ink-600 pt-1.5">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Globe, title: 'Bilingual', desc: 'Tamil + English' },
          { icon: Mic, title: 'Voice AI', desc: 'Web Speech API' },
          { icon: ShieldCheck, title: 'Verified', desc: 'Official links only' },
        ].map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="card p-5 text-center animate-fade-in" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sdg-blue to-sdg-teal flex items-center justify-center mx-auto mb-3">
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-ink-800">{h.title}</h3>
              <p className="text-sm text-ink-500">{h.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-sdg-orange/5 border border-sdg-orange/20 animate-fade-in">
        <Heart size={20} className="text-sdg-orange flex-shrink-0 mt-0.5" />
        <p className="text-sm text-ink-600">{t(lang, 'aboutDisclaimer')}</p>
      </div>

      {/* Official Links */}
      <div className="card p-6 space-y-3 animate-fade-in">
        <h3 className="font-bold text-ink-800">Official Resources</h3>
        <div className="flex flex-wrap gap-3">
          <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            National Scholarship Portal
          </a>
          <a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
            myScheme
          </a>
          <a href="https://tneaonline.org" target="_blank" rel="noopener noreferrer" className="btn-orange text-sm">
            TNEA
          </a>
          <a href="https://swayam.gov.in" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            SWAYAM
          </a>
          <a href="https://nptel.ac.in" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            NPTEL
          </a>
          <a href="https://www.nsdcindia.org" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            NSDC
          </a>
        </div>
      </div>
    </div>
  );
}
