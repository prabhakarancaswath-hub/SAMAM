import { ArrowRight, Bot, GraduationCap, Landmark, MapPin, Mic, Search, ShieldCheck, Wifi, FileText, BriefcaseBusiness, Route, Languages, Accessibility as AccessibilityIcon, Bell, HeartHandshake } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';
import type { Page } from '@/components/Navbar';

interface HomeProps { lang: Lang; setPage: (p: Page) => void; }

function GeethaHero({lang}:{lang:Lang}) {
 return <div className="samam-arthur-card">
  <div className="samam-arthur-glow" />
  <div className="samam-arthur-avatar"><span>🐘</span><i>A</i></div>
  <div className="samam-arthur-copy">
   <div className="flex items-center gap-2"><span className="samam-live-dot"/> <span className="text-xs font-bold text-cyan-200">ARTHUR • {bi(lang,'ONLINE','ஆன்லைன்')}</span></div>
   <h2 className="mt-1 text-2xl font-black">Geetha AI</h2>
   <p className="mt-1 text-sm leading-5 text-slate-300">{bi(lang,'Your guide to equal access — schemes, education, careers, services and support.','சம அணுகலுக்கான உங்கள் வழிகாட்டி — திட்டங்கள், கல்வி, தொழில், சேவைகள் மற்றும் ஆதரவு.')}</p>
   <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-bold shadow-lg">{bi(lang,'Ask Geetha','கீதாவிடம் கேளுங்கள்')} <ArrowRight size={15} className="inline ml-1"/></button>
  </div>
 </div>;
}

export function Home({ lang, setPage }: HomeProps) {
 const core = [
  { icon: Landmark, title:bi(lang,'Government Schemes','அரசுத் திட்டங்கள்'), sub:bi(lang,'Benefits & scholarships','நலன்கள் & உதவித்தொகைகள்'), page:'scholarships' as Page },
  { icon: Route, title:bi(lang,'TNEA & Education','TNEA & கல்வி'), sub:bi(lang,'College & counselling','கல்லூரி & கலந்தாய்வு'), page:'tnea' as Page },
  { icon: BriefcaseBusiness, title:bi(lang,'Career Opportunities','தொழில் வாய்ப்புகள்'), sub:bi(lang,'Skills, jobs & internships','திறன்கள், வேலை & பயிற்சிகள்'), page:'careers' as Page },
  { icon: FileText, title:bi(lang,'Services Directory','சேவை அடைவு'), sub:bi(lang,'Essential public services','முக்கிய பொது சேவைகள்'), page:'services' as Page },
  { icon: MapPin, title:bi(lang,'Interactive Maps','ஊடாடும் வரைபடங்கள்'), sub:bi(lang,'Nearby support & facilities','அருகிலுள்ள ஆதரவு & வசதிகள்'), page:'maps' as Page },
  { icon: AccessibilityIcon, title:bi(lang,'Accessibility','அணுகல்'), sub:bi(lang,'Low data & easier access','குறைந்த தரவு & எளிய அணுகல்'), page:'accessibility' as Page },
 ];
 const schemes = [
  [bi(lang,'Kalingar Magalir Urimai Thogai','கலைஞர் மகளிர் உரிமைத் தொகை'),bi(lang,'Financial support information','நிதி ஆதரவு தகவல்'),'from-fuchsia-500 to-violet-600'],
  [bi(lang,"Muthalvar’s Health Insurance",'முதல்வர் மருத்துவ காப்பீடு'),bi(lang,'Healthcare support information','மருத்துவ ஆதரவு தகவல்'),'from-emerald-400 to-cyan-500'],
  [bi(lang,'National Scholarship Portal','தேசிய உதவித்தொகை இணையதளம்'),bi(lang,'Scholarship access and guidance','உதவித்தொகை அணுகல் மற்றும் வழிகாட்டி'),'from-blue-500 to-cyan-500'],
 ];
 return <div className="relative -mx-4 sm:-mx-6 overflow-hidden rounded-b-[2rem] bg-[#050a18] text-white">
  <div className="absolute inset-0 samam-grid opacity-30"/>
  <div className="relative px-4 sm:px-8 lg:px-12 pt-7 pb-10">
   <div className="mx-auto max-w-6xl">
    <div className="flex items-center justify-between">
     <div><p className="text-xs font-bold text-cyan-300">SAMAM AI • EQUAL ACCESS</p><h1 className="mt-1 text-3xl md:text-4xl font-black">{bi(lang,'Equal Access • Stronger Communities','சம அணுகல் • வலுவான சமூகங்கள்')}</h1><p className="mt-2 max-w-2xl text-sm text-slate-400">{bi(lang,'One accessible place to discover government support, education pathways, career opportunities and essential services.','அரசு ஆதரவு, கல்விப் பாதைகள், தொழில் வாய்ப்புகள் மற்றும் அத்தியாவசிய சேவைகளை ஒரே இடத்தில் எளிதாகக் கண்டறியுங்கள்.')}</p></div>
     <button aria-label="Arthur" onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10"><Bot className="text-cyan-300"/></button>
    </div>
    <button onClick={() => document.dispatchEvent(new CustomEvent('open-arthur'))} className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3 text-left"><Search size={18} className="text-slate-400"/><span className="flex-1 text-sm text-slate-400">{bi(lang,'Ask Geetha about schemes, TNEA, careers, services or nearby support...','திட்டங்கள், TNEA, தொழில், சேவைகள் அல்லது அருகிலுள்ள ஆதரவு பற்றி கீதாவிடம் கேளுங்கள்...')}</span><Mic size={18} className="text-cyan-300"/></button>
    <GeethaHero lang={lang}/>
    <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300"><span className="rounded-full bg-white/5 px-3 py-2"><Languages size={13} className="mr-1 inline"/> {bi(lang,'Tamil + English','தமிழ் + ஆங்கிலம்')}</span><span className="rounded-full bg-white/5 px-3 py-2"><Wifi size={13} className="mr-1 inline"/> {bi(lang,'Low Data','குறைந்த தரவு')}</span><span className="rounded-full bg-white/5 px-3 py-2"><HeartHandshake size={13} className="mr-1 inline"/> {bi(lang,'Inclusive Access','அனைவருக்கும் அணுகல்')}</span><span className="rounded-full bg-white/5 px-3 py-2"><Bell size={13} className="mr-1 inline"/> {bi(lang,'Updates','புதுப்பிப்புகள்')}</span></div>
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">{core.map(({icon:Icon,title,sub,page})=><button key={title} onClick={()=>setPage(page)} className="samam-quick-card text-left"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg"><Icon size={21}/></span><b className="mt-3 block text-sm">{title}</b><span className="mt-1 block text-[11px] text-slate-400">{sub}</span></button>)}</div>
    <div className="mt-7 overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-r from-violet-900/40 to-cyan-900/30 p-5">
     <div className="flex items-center gap-2 text-cyan-200"><ShieldCheck size={17}/><span className="text-xs font-black uppercase tracking-widest">{bi(lang,'THE SAMAM CORE','SAMAM மையம்')}</span></div>
     <h2 className="mt-2 text-xl md:text-2xl font-black">{bi(lang,'Discover → Understand → Apply → Access','கண்டறி → புரிந்துகொள் → விண்ணப்பி → அணுகு')}</h2>
     <p className="mt-2 text-sm leading-6 text-slate-300">{bi(lang,'Arthur helps users understand eligibility, find official sources, prepare for applications, explore education and career pathways, locate services and reach nearby support — in Tamil or English.','தகுதியைப் புரிந்துகொள்ள, அதிகாரப்பூர்வ ஆதாரங்களைக் கண்டறிய, விண்ணப்பத்திற்குத் தயாராக, கல்வி மற்றும் தொழில் பாதைகளை ஆராய, சேவைகளைத் தேட மற்றும் அருகிலுள்ள ஆதரவை அடைய கீதா தமிழ் அல்லது ஆங்கிலத்தில் உதவுகிறார்.')}</p>
     <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
      <button onClick={()=>setPage('scholarships')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><Landmark className="mb-2 text-violet-300" size={18}/><b>{bi(lang,'Schemes','திட்டங்கள்')}</b><span className="block text-slate-400 mt-1">{bi(lang,'Find support','ஆதரவை கண்டறி')}</span></button>
      <button onClick={()=>setPage('tnea')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><Route className="mb-2 text-cyan-300" size={18}/><b>TNEA</b><span className="block text-slate-400 mt-1">{bi(lang,'Education path','கல்விப் பாதை')}</span></button>
      <button onClick={()=>setPage('careers')} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><BriefcaseBusiness className="mb-2 text-fuchsia-300" size={18}/><b>{bi(lang,'Careers','தொழில்')}</b><span className="block text-slate-400 mt-1">{bi(lang,'Opportunity path','வாய்ப்புப் பாதை')}</span></button>
      <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="rounded-xl bg-white/5 border border-white/10 p-3 text-left"><Bot className="mb-2 text-emerald-300" size={18}/><b>Geetha</b><span className="block text-slate-400 mt-1">{bi(lang,'Personal guidance','தனிப்பட்ட வழிகாட்டி')}</span></button>
     </div>
    </div>
    <div className="mt-8 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-violet-300">{bi(lang,'Government Support','அரசு ஆதரவு')}</p><h2 className="mt-1 text-2xl font-black">{bi(lang,'Start with a verified pathway','சரிபார்க்கப்பட்ட பாதையில் தொடங்குங்கள்')}</h2></div><button onClick={()=>setPage('scholarships')} className="text-xs font-bold text-cyan-300">{bi(lang,'View schemes →','திட்டங்களைப் பார்க்க →')}</button></div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">{schemes.map(([name,desc,c])=><button key={name} onClick={()=>setPage('scholarships')} className="samam-scheme-card text-left"><span className={'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br '+c}><GraduationCap size={19}/></span><b className="mt-3 block text-sm">{name}</b><span className="mt-1 block text-xs leading-5 text-slate-400">{desc}</span><span className="mt-3 block text-xs font-bold text-cyan-300">{bi(lang,'Open guidance →','வழிகாட்டியைத் திற →')}</span></button>)}</div>
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
     <button onClick={()=>setPage('maps')} className="samam-info-card"><MapPin/><span><b>{bi(lang,'Nearby Support','அருகிலுள்ள ஆதரவு')}</b><small>{bi(lang,'Find offices, centres and services','அலுவலகங்கள், மையங்கள் மற்றும் சேவைகளைக் கண்டறியுங்கள்')}</small></span></button>
     <button onClick={()=>setPage('accessibility')} className="samam-info-card"><AccessibilityIcon/><span><b>{bi(lang,'Accessibility','அணுகல்')}</b><small>{bi(lang,'Low data, text and motion controls','குறைந்த தரவு, எழுத்து மற்றும் இயக்க கட்டுப்பாடுகள்')}</small></span></button>
     <button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))} className="samam-info-card"><Bot/><span><b>{bi(lang,'Geetha + Voice','கீதா + குரல்')}</b><small>{bi(lang,'Ask in English or Tamil','தமிழ் அல்லது ஆங்கிலத்தில் கேளுங்கள்')}</small></span></button>
    </div>
   </div>
  </div>
  <div className="samam-mobile-bottom md:hidden"><button onClick={()=>setPage('home')}><Landmark/><span>{bi(lang,'Home','முகப்பு')}</span></button><button onClick={()=>document.dispatchEvent(new CustomEvent('open-arthur'))}><Bot/><span>Arthur</span></button><button onClick={()=>setPage('careers')}><BriefcaseBusiness/><span>{bi(lang,'Career','தொழில்')}</span></button><button onClick={()=>setPage('maps')}><MapPin/><span>{bi(lang,'Maps','வரைபடம்')}</span></button></div>
 </div>;
}
