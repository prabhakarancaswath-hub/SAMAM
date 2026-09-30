import { ArrowRight, Bot, GraduationCap, Landmark, MapPin, Mic, Search, ShieldCheck, Wifi, FileText, BriefcaseBusiness, Route, Languages, Accessibility as AccessibilityIcon, Bell, HeartHandshake } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import type { Page } from '@/components/Navbar';

interface HomeProps { lang: Lang; setPage: (p: Page) => void; }

function ArthurHero() {
 return <div className="samam-arthur-card">
  <div className="samam-arthur-glow" />
  <div className="samam-arthur-avatar"><span>🐘</span><i>A</i></div>
  <div className="samam-arthur-copy">
   <div className="flex items-center gap-2"><span className="samam-live-dot"/> <span className="text-xs font-bold text-cyan-200">ARTHUR • ONLINE</span></div>
   <h2 className="mt-1 text-2xl font-black">Arthur AI</h2>
   <p className="mt-1 text-sm leading-5 text-slate-300">Your guide to equal access — schemes, education, careers, services and support.</p>
   <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-bold shadow-lg">Ask Arthur <ArrowRight size={15} className="inline ml-1"/></button>
  </div>
 </div>;
}

export function Home({ lang, setPage }: HomeProps) {
 const core = [
  { icon: Landmark, title:'Government Schemes', sub:'Benefits & scholarships', page:'scholarships' as Page },
  { icon: Route, title:'TNEA & Education', sub:'College & counselling', page:'tnea' as Page },
  { icon: BriefcaseBusiness, title:'Career Opportunities', sub:'Skills, jobs & internships', page:'careers' as Page },
  { icon: FileText, title:'Services Directory', sub:'Essential public services', page:'services' as Page },
  { icon: MapPin, title:'Interactive Maps', sub:'Nearby support & facilities', page:'maps' as Page },
  { icon: AccessibilityIcon, title:'Accessibility', sub:'Low data & easier access', page:'accessibility' as Page },
 ];
 const schemes = [
  ['Kalingar Magalir Urimai Thogai','Financial support information','from-fuchsia-500 to-violet-600'],
  ['Muthalvar’s Health Insurance','Healthcare support information','from-emerald-400 to-cyan-500'],
  ['National Scholarship Portal','Scholarship access and guidance','from-blue-500 to-cyan-500'],
 ];
 return <div className="relative -mx-4 sm:-mx-6 overflow-hidden rounded-b-[2rem] bg-[#050a18] text-white">
  <div className="absolute inset-0 samam-grid opacity-30"/>
  <div className="relative px-4 sm:px-8 lg:px-12 pt-7 pb-10">
   <div className="mx-auto max-w-6xl">
    <div className="flex items-center justify-between">
     <div><p className="text-xs font-bold text-cyan-300">SAMAM AI • EQUAL ACCESS</p><h1 className="mt-1 text-3xl md:text-4xl font-black">Equal Access • Stronger Communities</h1><p className="mt-2 max-w-2xl text-sm text-slate-400">One accessible place to discover government support, education pathways, career opportunities and essential services.</p></div>
     <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10"><Bot className="text-cyan-300"/></button>
    </div>
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3"><Search size={18} className="text-slate-400"/><span className="flex-1 text-sm text-slate-400">Ask Arthur about schemes, TNEA, careers, services or nearby support...</span><Mic size={18} className="text-cyan-300"/></div>
    <ArthurHero/>
    <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300"><span className="rounded-full bg-white/5 px-3 py-2"><Languages size={13} className="mr-1 inline"/> Tamil + English</span><span className="rounded-full bg-white/5 px-3 py-2"><Wifi size={13} className="mr-1 inline"/> Low Data</span><span className="rounded-full bg-white/5 px-3 py-2"><HeartHandshake size={13} className="mr-1 inline"/> Inclusive Access</span><span className="rounded-full bg-white/5 px-3 py-2"><Bell size={13} className="mr-1 inline"/> Updates</span></div>
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
     {core.map(({icon:Icon,title,sub,page})=><button key={title} onClick={()=>setPage(page)} className="samam-quick-card text-left"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg"><Icon size={21}/></span><b className="mt-3 block text-sm">{title}</b><span className="mt-1 block text-[11px] text-slate-400">{sub}</span></button>)}
    </div>
    <div className="mt-7 overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-r from-violet-900/40 to-cyan-900/30 p-5">
     <div className="flex items-center gap-2 text-cyan-200"><ShieldCheck size={17}/><span className="text-xs font-black uppercase tracking-widest">THE SAMAM CORE</span></div>
     <h2 className="mt-2 text-xl md:text-2xl font-black">Discover → Understand → Apply → Access</h2>
     <p className="mt-2 text-sm leading-6 text-slate-300">Arthur helps users understand eligibility, find official sources, prepare for applications, explore education and career pathways, locate services and reach nearby support — in Tamil or English.</p>
     <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
      <button onClick={()=>setPage('scholarships')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><Landmark className="mb-2 text-violet-300" size={18}/><b>Schemes</b><span className="block text-slate-400 mt-1">Find support</span></button>
      <button onClick={()=>setPage('tnea')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><Route className="mb-2 text-cyan-300" size={18}/><b>TNEA</b><span className="block text-slate-400 mt-1">Education path</span></button>
      <button onClick={()=>setPage('careers')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><BriefcaseBusiness className="mb-2 text-fuchsia-300" size={18}/><b>Careers</b><span className="block text-slate-400 mt-1">Opportunity path</span></button>
      <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><Bot className="mb-2 text-emerald-300" size={18}/><b>Arthur</b><span className="block text-slate-400 mt-1">Personal guidance</span></button>
     </div>
    </div>
    <div className="mt-8 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-violet-300">Government Support</p><h2 className="mt-1 text-2xl font-black">Start with a verified pathway</h2></div><button onClick={()=>setPage('scholarships')} className="text-xs font-bold text-cyan-300">View schemes →</button></div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">{schemes.map(([name,desc,c])=><button key={name} onClick={()=>setPage('scholarships')} className="samam-scheme-card text-left"><span className={'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br '+c}><GraduationCap size={19}/></span><b className="mt-3 block text-sm">{name}</b><span className="mt-1 block text-xs leading-5 text-slate-400">{desc}</span><span className="mt-3 block text-xs font-bold text-cyan-300">Open guidance →</span></button>)}</div>
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
     <button onClick={()=>setPage('maps')} className="samam-info-card"><MapPin/><span><b>Nearby Support</b><small>Find offices, centres and services</small></span></button>
     <button onClick={()=>setPage('accessibility')} className="samam-info-card"><AccessibilityIcon/><span><b>Accessibility</b><small>Low data, text and motion controls</small></span></button>
     <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="samam-info-card"><Bot/><span><b>Arthur + Voice</b><small>Ask in English or Tamil</small></span></button>
    </div>
   </div>
  </div>
  <div className="samam-mobile-bottom md:hidden"><button onClick={()=>setPage('home')}><Landmark/><span>Home</span></button><button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))}><Bot/><span>Arthur</span></button><button onClick={()=>setPage('careers')}><BriefcaseBusiness/><span>Career</span></button><button onClick={()=>setPage('maps')}><MapPin/><span>Maps</span></button></div>
 </div>;
}
