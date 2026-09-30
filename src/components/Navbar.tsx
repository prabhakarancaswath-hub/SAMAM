import { useState } from 'react';
import { Home, GraduationCap, Info, Menu, X, Sparkles, MapPin, Building2, BriefcaseBusiness, Accessibility as AccessibilityIcon, Wrench, Briefcase } from 'lucide-react';
import { Logo } from './Logo';
import { type Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

export type Page = 'home'|'scholarships'|'tnea'|'skills'|'jobs'|'careers'|'about'|'faqs'|'services'|'maps'|'accessibility';
interface NavbarProps { lang:Lang; setLang:(lang:Lang)=>void; page:Page; setPage:(p:Page)=>void; onArthur:()=>void; }

export function Navbar({lang,setLang,page,setPage,onArthur}:NavbarProps){
 const [mobileOpen,setMobileOpen]=useState(false);
 const navItems=[
  {id:'home' as Page,label:bi(lang,'Home','முகப்பு'),icon:Home},
  {id:'scholarships' as Page,label:bi(lang,'Schemes','அரசுத் திட்டங்கள்'),icon:GraduationCap},
  {id:'tnea' as Page,label:'TNEA',icon:GraduationCap},
  {id:'careers' as Page,label:bi(lang,'Careers','தொழில் வாய்ப்புகள்'),icon:BriefcaseBusiness},
  {id:'services' as Page,label:bi(lang,'Services','சேவைகள்'),icon:Building2},
  {id:'maps' as Page,label:bi(lang,'Maps','வரைபடம்'),icon:MapPin},
  {id:'accessibility' as Page,label:bi(lang,'Access','அணுகல்'),icon:AccessibilityIcon},
  {id:'about' as Page,label:bi(lang,'About','பற்றி'),icon:Info}
 ];
 const go=(p:Page)=>{setPage(p);setMobileOpen(false);window.scrollTo({top:0,behavior:'smooth'})};
 return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060b1a]/90 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="flex items-center justify-between h-[70px]">
   <button aria-label="SAMAM Home" onClick={()=>go('home')}><Logo size="md"/></button>
   <nav className="hidden xl:flex items-center gap-1">{navItems.map(({id,label,icon:Icon})=><button key={id} onClick={()=>go(id)} className={'flex items-center gap-1.5 px-2.5 py-2.5 rounded-xl text-sm font-semibold '+(page===id?'bg-white/10 text-white':'text-slate-400 hover:text-white')}><Icon size={15}/>{label}</button>)}<button onClick={onArthur} className="ml-1 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-bold"><Sparkles size={16}/>{bi(lang,'Arthur AI','ஆர்தர் AI')}</button></nav>
   <div className="flex items-center gap-2"><div className="flex rounded-xl bg-white/5 p-1 ring-1 ring-white/10" aria-label={bi(lang,'Language','மொழி')}><button onClick={()=>setLang('en')} className={'px-3 py-1.5 rounded-lg text-xs font-bold '+(lang==='en'?'bg-white text-slate-900':'text-slate-400')}>EN</button><button onClick={()=>setLang('ta')} className={'px-3 py-1.5 rounded-lg text-xs font-bold '+(lang==='ta'?'bg-white text-slate-900':'text-slate-400')}>தமிழ்</button></div><button aria-label={bi(lang,'Open menu','மெனுவைத் திறக்க')} onClick={()=>setMobileOpen(!mobileOpen)} className="xl:hidden p-2 rounded-xl text-white">{mobileOpen?<X/>:<Menu/>}</button></div>
  </div>{mobileOpen&&<nav className="xl:hidden pb-4 grid grid-cols-2 gap-2">{navItems.map(({id,label,icon:Icon})=><button key={id} onClick={()=>go(id)} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3 text-sm text-slate-200"><Icon size={17}/>{label}</button>)}<button onClick={()=>{onArthur();setMobileOpen(false)}} className="col-span-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-bold">✨ {bi(lang,'Arthur AI','ஆர்தர் AI')}</button></nav>}</div>
 </header>;
}
