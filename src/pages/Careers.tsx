import { BriefcaseBusiness, GraduationCap, Wrench, ArrowRight, Target, Sparkles } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import type { Page } from '@/components/Navbar';

export function Careers({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  const ta = lang === 'ta';
  const cards = [
    {
      icon: GraduationCap,
      title: ta ? 'TNEA • கல்லூரி சேர்க்கை' : 'TNEA • College Admissions',
      text: ta ? 'கல்லூரி, branch, city மற்றும் counselling வழிகாட்டுதல்.' : 'Find colleges, branches, cities and counselling guidance.',
      page: 'tnea' as Page,
      label: ta ? 'TNEA திறக்கவும்' : 'Open TNEA'
    },
    {
      icon: Wrench,
      title: ta ? 'திறன் வளர்ப்பு' : 'Skills & Learning',
      text: ta ? 'உங்கள் ஆர்வத்திற்கு ஏற்ற free / low-cost learning paths.' : 'Explore free or low-cost learning paths based on your interests.',
      page: 'skills' as Page,
      label: ta ? 'Skills பார்க்கவும்' : 'Explore Skills'
    },
    {
      icon: BriefcaseBusiness,
      title: ta ? 'வேலை & Internship' : 'Jobs & Internships',
      text: ta ? 'வேலை, internship மற்றும் trainee வாய்ப்புகளை தேடுங்கள்.' : 'Search jobs, internships, trainee and entry-level opportunities.',
      page: 'jobs' as Page,
      label: ta ? 'Opportunities பார்க்கவும்' : 'Find Opportunities'
    }
  ];

  return <div className="space-y-6">
    <section className="samam-career-hero">
      <div className="samam-career-orb" />
      <div className="relative">
        <div className="flex items-center gap-2 text-cyan-200 text-xs font-black uppercase tracking-[.18em]">
          <Target size={15} /> {ta ? 'Career Access Hub' : 'Career Access Hub'}
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-black text-white">
          {ta ? 'படிப்பு → திறன் → வாய்ப்பு' : 'Education → Skills → Opportunity'}
        </h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300 leading-6">
          {ta
            ? 'SAMAM-ன் career core: TNEA கல்லூரி வழிகாட்டுதல், திறன் வளர்ப்பு மற்றும் வேலை / internship வாய்ப்புகளை ஒரே இடத்தில் இணைக்கிறது.'
            : 'SAMAM’s career core connects TNEA college guidance, skill development, and job or internship opportunities in one place.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="samam-career-pill"><Sparkles size={14}/> Arthur career guidance</span>
          <span className="samam-career-pill">Tamil + English</span>
          <span className="samam-career-pill">Low-data friendly</span>
        </div>
      </div>
    </section>

    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(({ icon: Icon, title, text, page, label }) => (
        <button key={title} onClick={() => setPage(page)} className="samam-career-card text-left">
          <span className="samam-career-icon"><Icon size={24}/></span>
          <h2 className="mt-4 text-lg font-black text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">{label} <ArrowRight size={15}/></span>
        </button>
      ))}
    </div>

    <section className="rounded-3xl border border-white/10 bg-white/[.04] p-5 md:p-6">
      <p className="text-xs font-black uppercase tracking-[.18em] text-violet-300">{ta ? 'SAMAM Career Flow' : 'SAMAM Career Flow'}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {(ta
          ? ['1. கல்வி பாதை', '2. கல்லூரி / TNEA', '3. திறன் வளர்ப்பு', '4. வேலை / Internship']
          : ['1. Education path', '2. College / TNEA', '3. Build skills', '4. Job / Internship']
        ).map((step, i) => <div key={step} className="rounded-2xl bg-[#08142b] border border-white/10 p-4">
          <span className="text-sm font-bold text-slate-200">{step}</span>
          {i < 3 && <span className="hidden md:block mt-2 text-xs text-slate-500">↓ next step</span>}
        </div>)}
      </div>
    </section>
  </div>;
}
