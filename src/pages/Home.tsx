import { ArrowRight, Bot, GraduationCap, Landmark, MapPin, Mic, Search, ShieldCheck, Wifi, FileText, BriefcaseBusiness, Bell, Languages, Route } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import type { Page } from '@/components/Navbar';

interface HomeProps { lang: Lang; setPage: (p: Page) => void; }

function ArthurHero() {
 return <div className="samam-arthur-card">
  <div className="samam-arthur-glow" />
  <div className="samam-arthur-avatar"><span>🐘</span><i>A</i></div>
  <div className="samam-arthur-copy">
   <div className="flex items-center gap-2"><span className="samam-live-dot"/> <span className="text-xs font-bold text-cyan-200">ARTHUR • ONLINE</span></div>
   <h2 className="mt-1 text-2xl font-black">Meet Arthur</h2>
   <p className="mt-1 text-sm leading-5 text-slate-300">Your AI assistant for schemes, education, careers & services.</p>
   <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-bold shadow-lg">Hi! I'm Arthur 👋 <ArrowRight size={15} className="inline ml-1"/></button>
  </div>
 </div>;
}

export function Home({ lang, setPage }: HomeProps) {
 const quick = [
  { icon: Landmark, title:'Schemes', sub:'Government benefits', page:'scholarships' as Page, c:'from-violet-500 to-blue-600' },
  { icon: Route, title:'TNEA', sub:'College & counselling', page:'tnea' as Page, c:'from-cyan-400 to-blue-500' },
  { icon: BriefcaseBusiness, title:'Careers', sub:'Skills & job opportunities', page:'careers' as Page, c:'from-fuchsia-500 to-violet-600' },
  { icon: FileText, title:'Services', sub:'Public services directory', page:'services' as Page, c:'from-emerald-400 to-cyan-500' },
 ];
 const schemes = [
  ['Kalingar Magalir Urimai Thogai','Financial support for women','from-fuchsia-500 to-violet-600'],
  ['Muthalvar’s Health Insurance','Healthcare coverage for families','from-emerald-400 to-cyan-500'],
  ['National Scholarship Portal','Education support and scholarships','from-blue-500 to-cyan-500'],
 ];
 return <div className="relative -mx-4 sm:-mx-6 overflow-hidden rounded-b-[2rem] bg-[#050a18] text-white">
  <div className="absolute inset-0 samam-grid opacity-30"/>
  <div className="relative px-4 sm:px-8 lg:px-12 pt-7 pb-10">
   <div className="mx-auto max-w-6xl">
    <div className="flex items-center justify-between">
     <div><p className="text-xs font-bold text-cyan-300">SAMAM AI • EQUAL ACCESS</p><h1 className="mt-1 text-3xl font-black">Welcome Back! 👋</h1><p className="text-sm text-slate-400">One place for education, schemes, careers and essential services.</p></div>
     <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10"><Bot className="text-cyan-300"/></button>
    </div>
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3"><Search size={18} className="text-slate-400"/><span className="flex-1 text-sm text-slate-400">Ask Arthur: TNEA, scholarships, skills, jobs or services...</span><Mic size={18} className="text-cyan-300"/></div>
    <ArthurHero/>
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
     {quick.map(({icon:Icon,title,sub,page,c})=><button key={title} onClick={()=>setPage(page)} className="samam-quick-card text-left"><span className={'flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br '+c+' shadow-lg'}><Icon size={21}/></span><b className="mt-3 block text-sm">{title}</b><span className="mt-1 block text-[11px] text-slate-400">{sub}</span></button>)}
    </div>
    <div className="mt-7 overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-r from-violet-900/40 to-cyan-900/30 p-5">
     <div className="flex items-center gap-2 text-cyan-200"><ShieldCheck size={17}/><span className="text-xs font-black uppercase tracking-widest">SAMAM CORE</span></div>
     <h2 className="mt-2 text-xl font-black">Education → Opportunity → Access</h2>
     <p className="mt-2 text-sm text-slate-300">Arthur connects people to TNEA guidance, scholarships, skill learning, jobs, government services and nearby support — in Tamil or English.</p>
     <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
      <button onClick={()=>setPage('tnea')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/10"><Route className="mb-2 text-cyan-300" size={18}/><b>TNEA</b><span className="block text-slate-400 mt-1">College path</span></button>
      <button onClick={()=>setPage('skills')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/10"><GraduationCap className="mb-2 text-violet-300" size={18}/><b>Skills</b><span className="block text-slate-400 mt-1">Learn next</span></button>
      <button onClick={()=>setPage('jobs')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/10"><BriefcaseBusiness className="mb-2 text-fuchsia-300" size={18}/><b>Jobs</b><span className="block text-slate-400 mt-1">Find opportunities</span></button>
      <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/10"><Bot className="mb-2 text-emerald-300" size={18}/><b>Arthur</b><span className="block text-slate-400 mt-1">Ask for guidance</span></button>
     </div>
    </div>
    <div className="mt-8 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-violet-300">Government Schemes</p><h2 className="mt-1 text-2xl font-black">Explore opportunities</h2></div><button onClick={()=>setPage('scholarships')} className="text-xs font-bold text-cyan-300">View all →</button></div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">{schemes.map(([name,desc,c])=><button key={name} onClick={()=>setPage('scholarships')} className="samam-scheme-card text-left"><span className={'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br '+c}><GraduationCap size={19}/></span><b className="mt-3 block text-sm">{name}</b><span className="mt-1 block text-xs leading-5 text-slate-400">{desc}</span><span className="mt-3 block text-xs font-bold text-cyan-300">Learn more →</span></button>)}</div>
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
     <button onClick={()=>setPage('services')} className="samam-info-card"><FileText/><span><b>Services Directory</b><small>Find public services & facilities</small></span></button>
     <button onClick={()=>setPage('maps')} className="samam-info-card"><MapPin/><span><b>Interactive Maps</b><small>Locate offices, centres & services</small></span></button>
     <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="samam-info-card"><Wifi/><span><b>Low Data + Voice</b><small>Lightweight and accessible support</small></span></button>
    </div>
   </div>
  </div>
  <div className="samam-mobile-bottom md:hidden"><button onClick={()=>setPage('home')}><Landmark/><span>Home</span></button><button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))}><Bot/><span>Arthur</span></button><button onClick={()=>setPage('careers')}><BriefcaseBusiness/><span>Career</span></button><button onClick={()=>setPage('maps')}><MapPin/><span>Maps</span></button></div>
 </div>;
}
