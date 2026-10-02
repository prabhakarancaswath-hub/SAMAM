import { useState, useEffect } from 'react';
import { Navbar, type Page } from '@/components/Navbar';
import { ArthurChatbot } from '@/components/ArthurChatbot';
import { Home } from '@/pages/Home';
import { Scholarships } from '@/pages/Scholarships';
import { TNEA } from '@/pages/TNEA';
import { Skills } from '@/pages/Skills';
import { Jobs } from '@/pages/Jobs';
import { Careers } from '@/pages/Careers';
import { About } from '@/pages/About';
import { FAQs } from '@/pages/FAQs';
import { Services } from '@/pages/Services';
import { Accessibility } from '@/pages/Accessibility';
import { SplashScreen } from '@/components/SplashScreen';
import { type Lang, t } from '@/i18n/translations';

function App() {
 const [lang,setLangState]=useState<Lang>(() => localStorage.getItem('samam-language') === 'ta' ? 'ta' : 'en');
 const setLang=(next:Lang)=>{setLangState(next);localStorage.setItem('samam-language',next)};
 const [page,setPage]=useState<Page>('home');
 const [arthurOpen,setArthurOpen]=useState(false);
 const [showSplash,setShowSplash]=useState(() => sessionStorage.getItem('samam-splash-seen') !== '1');
 const enterApp=()=>{sessionStorage.setItem('samam-splash-seen','1');setShowSplash(false)};
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 useEffect(()=>{const open=()=>setArthurOpen(true);document.addEventListener('open-arthur',open);return()=>document.removeEventListener('open-arthur',open)},[]);
 if(showSplash) return <SplashScreen lang={lang} onStart={enterApp} onLanguage={setLang}/>;
 if(page==='geetha') return <ArthurChatbot lang={lang} setLang={setLang} open={true} onOpenChange={(v)=>{if(!v)setPage('home')}}/>;
 return <div className="min-h-screen bg-[#060b1a]" lang={lang}>
  <Navbar lang={lang} setLang={setLang} page={page} setPage={setPage} onArthur={()=>setArthurOpen(true)}/>
  <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
   {page==='home'&&<Home lang={lang} setPage={setPage} onGeetha={()=>setPage('geetha')}/>} {page==='scholarships'&&<Scholarships lang={lang}/>} {page==='tnea'&&<TNEA lang={lang}/>} {page==='careers'&&<Careers lang={lang} setPage={setPage}/>} {page==='skills'&&<Skills lang={lang}/>} {page==='jobs'&&<Jobs lang={lang}/>} {page==='about'&&<About lang={lang}/>} {page==='faqs'&&<FAQs lang={lang}/>} {page==='services'&&<Services lang={lang}/>} {page==='accessibility'&&<Accessibility lang={lang}/>} 
  </main>
  <footer className="border-t border-white/10 bg-[#050816] mt-10"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 text-center"><p className="font-bold text-white">SAMAM AI</p><p className="mt-1 text-xs text-slate-400">{lang === 'en' ? 'Equal Access • Stronger Communities • SDG 10' : 'சம அணுகல் • வலுவான சமூகங்கள் • SDG 10'}</p><p className="mt-3 text-[11px] text-slate-500">{t(lang,'verifyNote')}</p></div></footer>
  <ArthurChatbot lang={lang} setLang={setLang} open={arthurOpen} onOpenChange={setArthurOpen}/>
 </div>
}
export default App;
