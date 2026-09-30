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
import { type Lang, t } from '@/i18n/translations';

function App() {
 const [lang,setLang]=useState<Lang>('en');
 const [page,setPage]=useState<Page>('home');
 const [responseText,setResponseText]=useState('');
 const [arthurOpen,setArthurOpen]=useState(false);
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 useEffect(()=>{const open=()=>setArthurOpen(true);document.addEventListener('open-arthur',open);return()=>document.removeEventListener('open-arthur',open)},[]);
 const handleTranscript=(text:string)=>{
  const l=text.toLowerCase();let target:Page=page;
  if(l.includes('scholar')||l.includes('scheme'))target='scholarships';
  else if(l.includes('tnea')||l.includes('college')||l.includes('counselling'))target='tnea';
  else if(l.includes('career')||l.includes('opportunit'))target='careers';
  else if(l.includes('skill')||l.includes('learn')||l.includes('course'))target='skills';
  else if(l.includes('job')||l.includes('intern')||l.includes('work'))target='jobs';
  else if(l.includes('service'))target='services';
  else if(l.includes('map')||l.includes('near'))target='maps';
  else if(l.includes('about')||l.includes('sdg'))target='about';
  setPage(target);setResponseText('Arthur understood your request. Explore the selected section for the next step.');window.scrollTo({top:0,behavior:'smooth'})
 };
 return <div className="min-h-screen bg-[#060b1a]" lang={lang}>
  <Navbar lang={lang} setLang={setLang} page={page} setPage={setPage} onArthur={()=>setArthurOpen(true)}/>
  <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
   {page!=='home'&&<div className="mb-5"><VoiceChat lang={lang} onTranscript={handleTranscript} responseText={responseText}/></div>}
   {page==='home'&&<Home lang={lang} setPage={setPage}/>}
   {page==='scholarships'&&<Scholarships lang={lang}/>}
   {page==='tnea'&&<TNEA lang={lang}/>}
   {page==='careers'&&<Careers lang={lang} setPage={setPage}/>}
   {page==='skills'&&<Skills lang={lang}/>}
   {page==='jobs'&&<Jobs lang={lang}/>}
   {page==='about'&&<About lang={lang}/>}
   {page==='faqs'&&<FAQs lang={lang}/>}
   {page==='services'&&<Services lang={lang}/>}
   {page==='maps'&&<Maps lang={lang}/>}
  </main>
  <footer className="border-t border-white/10 bg-[#050816] mt-10"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 text-center"><p className="font-bold text-white">SAMAM AI</p><p className="mt-1 text-xs text-slate-400">Equal Access • Stronger Communities • SDG 10</p><p className="mt-3 text-[11px] text-slate-500">{t(lang,'verifyNote')}</p></div></footer>
  <ArthurChatbot lang={lang} setLang={setLang} open={arthurOpen} onOpenChange={setArthurOpen}/>
 </div>
}
export default App;
