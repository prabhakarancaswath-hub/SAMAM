import { useState, useEffect } from 'react';
import { Navbar, type Page } from '@/components/Navbar';
import { VoiceChat } from '@/components/VoiceChat';
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
import { Maps } from '@/pages/Maps';
import { Accessibility } from '@/pages/Accessibility';
import { type Lang, t } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

function App() {
 const [lang,setLangState]=useState<Lang>(() => localStorage.getItem('samam-language') === 'ta' ? 'ta' : 'en');
 const setLang=(next:Lang)=>{setLangState(next);localStorage.setItem('samam-language',next)};
 const [page,setPage]=useState<Page>('home');
 const [responseText,setResponseText]=useState('');
 const [arthurOpen,setArthurOpen]=useState(false);
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 useEffect(()=>{const open=()=>setArthurOpen(true);document.addEventListener('open-arthur',open);return()=>document.removeEventListener('open-arthur',open)},[]);
 const handleTranscript=(text:string)=>{
  const l=text.toLowerCase();let target:Page=page;
  if(l.includes('scholar')||l.includes('scheme')||l.includes('benefit')||l.includes('உதவித்தொகை')||l.includes('திட்டம்'))target='scholarships';
  else if(l.includes('tnea')||l.includes('college')||l.includes('counselling')||l.includes('admission')||l.includes('கல்லூரி')||l.includes('சேர்க்கை'))target='tnea';
  else if(l.includes('career')||l.includes('opportunit')||l.includes('தொழில்')||l.includes('வாய்ப்பு'))target='careers';
  else if(l.includes('skill')||l.includes('learn')||l.includes('course')||l.includes('திறன்')||l.includes('கற்க'))target='skills';
  else if(l.includes('job')||l.includes('intern')||l.includes('work')||l.includes('வேலை'))target='jobs';
  else if(l.includes('service')||l.includes('hospital')||l.includes('ration')||l.includes('சேவை')||l.includes('மருத்துவமனை'))target='services';
  else if(l.includes('map')||l.includes('nearby')||l.includes('location')||l.includes('வரைபடம்')||l.includes('அருகில்'))target='maps';
  else if(l.includes('access')||l.includes('low data')||l.includes('accessibility')||l.includes('அணுகல்'))target='accessibility';
  else if(l.includes('about')||l.includes('sdg')||l.includes('inequal')||l.includes('பற்றி')||l.includes('சமத்துவ'))target='about';
  setPage(target);setResponseText(bi(lang,'Arthur understood your request. SAMAM opened the relevant support area.','ஆர்தர் உங்கள் கோரிக்கையைப் புரிந்துகொண்டார். SAMAM தொடர்புடைய பகுதியைத் திறந்துள்ளது.'));window.scrollTo({top:0,behavior:'smooth'})
 };
 return <div className="min-h-screen bg-[#060b1a]" lang={lang}>
  <Navbar lang={lang} setLang={setLang} page={page} setPage={setPage} onArthur={()=>setArthurOpen(true)}/>
  <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
   <div className="mb-5"><VoiceChat lang={lang} onTranscript={handleTranscript} responseText={responseText}/></div>
   {page==='home'&&<Home lang={lang} setPage={setPage}/>} {page==='scholarships'&&<Scholarships lang={lang}/>} {page==='tnea'&&<TNEA lang={lang}/>} {page==='careers'&&<Careers lang={lang} setPage={setPage}/>} {page==='skills'&&<Skills lang={lang}/>} {page==='jobs'&&<Jobs lang={lang}/>} {page==='about'&&<About lang={lang}/>} {page==='faqs'&&<FAQs lang={lang}/>} {page==='services'&&<Services lang={lang}/>} {page==='maps'&&<Maps lang={lang}/>} {page==='accessibility'&&<Accessibility lang={lang}/>} 
  </main>
  <footer className="border-t border-white/10 bg-[#050816] mt-10"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 text-center"><p className="font-bold text-white">SAMAM AI</p><p className="mt-1 text-xs text-slate-400">{bi(lang,'Equal Access • Stronger Communities • SDG 10','சம அணுகல் • வலுவான சமூகங்கள் • SDG 10')}</p><p className="mt-3 text-[11px] text-slate-500">{t(lang,'verifyNote')}</p></div></footer>
  <ArthurChatbot lang={lang} setLang={setLang} open={arthurOpen} onOpenChange={setArthurOpen}/>
 </div>
}
export default App;
