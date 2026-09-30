import { ArrowRight, Bot, BriefcaseBusiness, GraduationCap, Route, Sparkles, Wrench } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';
import type { Page } from '@/components/Navbar';

export function Careers({lang,setPage}:{lang:Lang;setPage:(p:Page)=>void}) {
 const cards=[
  {icon:GraduationCap,title:bi(lang,'TNEA • College Admissions','TNEA • கல்லூரி சேர்க்கை'),desc:bi(lang,'Understand counselling steps, college options and official admission links.','கலந்தாய்வு படிகள், கல்லூரி விருப்பங்கள் மற்றும் அதிகாரப்பூர்வ சேர்க்கை இணைப்புகளை அறியுங்கள்.'),page:'tnea' as Page},
  {icon:Wrench,title:bi(lang,'Skills & Learning','திறன்கள் & கற்றல்'),desc:bi(lang,'Explore beginner-friendly skills and learning pathways for future opportunities.','எதிர்கால வாய்ப்புகளுக்கான தொடக்கநிலை திறன்கள் மற்றும் கற்றல் பாதைகளை ஆராயுங்கள்.'),page:'skills' as Page},
  {icon:BriefcaseBusiness,title:bi(lang,'Jobs & Internships','வேலை & பயிற்சிகள்'),desc:bi(lang,'Explore jobs and internship guidance and connect skills to opportunities.','வேலை மற்றும் பயிற்சி வழிகாட்டிகளைப் பார்த்து, திறன்களை வாய்ப்புகளுடன் இணைக்குங்கள்.'),page:'jobs' as Page},
 ];
 return <div className="samam-page space-y-7">
  <section className="samam-career-hero">
   <div className="samam-career-orb"/>
   <span className="samam-career-pill"><Sparkles size={13}/>{bi(lang,'CAREER ACCESS HUB','தொழில் வாய்ப்பு மையம்')}</span>
   <h1 className="relative mt-4 text-3xl md:text-5xl font-black">{bi(lang,'Education → Skills → Opportunity','கல்வி → திறன்கள் → வாய்ப்பு')}</h1>
   <p className="relative mt-3 max-w-2xl text-sm md:text-base leading-7 text-slate-300">{bi(lang,'SAMAM connects education guidance, skill-building and career opportunities so users can move from learning to action with fewer access barriers.','SAMAM கல்வி வழிகாட்டி, திறன் வளர்ப்பு மற்றும் தொழில் வாய்ப்புகளை இணைத்து, அணுகல் தடைகளை குறைத்து கற்றலிலிருந்து செயல்பாட்டிற்கு செல்ல உதவுகிறது.')}</p>
   <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="relative mt-5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-bold"><Bot size={17} className="inline mr-2"/>{bi(lang,'Ask Arthur for career guidance','தொழில் வழிகாட்டலுக்கு ஆர்தரிடம் கேளுங்கள்')}</button>
  </section>
  <div className="grid gap-4 md:grid-cols-3">{cards.map(({icon:Icon,title,desc,page})=><button key={title} onClick={()=>setPage(page)} className="samam-career-card text-left"><span className="samam-career-icon"><Icon size={24}/></span><h2 className="mt-4 text-lg font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-300">{bi(lang,'Open pathway','பாதையைத் திற')} <ArrowRight size={14}/></span></button>)}</div>
  <section className="rounded-3xl border border-white/10 bg-white/[.03] p-5 md:p-7"><div className="flex items-center gap-2 text-violet-300"><Route size={18}/><span className="text-xs font-black uppercase tracking-widest">{bi(lang,'Career flow','தொழில் பாதை')}</span></div><div className="mt-5 grid gap-3 md:grid-cols-4">{[bi(lang,'Discover','கண்டறி'),bi(lang,'Learn','கற்று'),bi(lang,'Prepare','தயார் செய்'),bi(lang,'Apply / Connect','விண்ணப்பி / இணை')].map((x,i)=><div key={x} className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><span className="text-xs text-cyan-300">0{i+1}</span><b className="mt-2 block text-sm">{x}</b></div>)}</div></section>
 </div>;
}
