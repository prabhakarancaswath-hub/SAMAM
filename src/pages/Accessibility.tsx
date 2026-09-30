import { useEffect, useState } from 'react';
import { Accessibility as AccessibilityIcon, Eye, Type, WifiOff, Volume2, Languages, CheckCircle2 } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

export function Accessibility({ lang }: { lang: Lang }) {
 const [lowData,setLowData]=useState(()=>localStorage.getItem('samam-low-data')==='1');
 const [largeText,setLargeText]=useState(()=>localStorage.getItem('samam-large-text')==='1');
 const [reducedMotion,setReducedMotion]=useState(()=>localStorage.getItem('samam-reduced-motion')==='1');
 useEffect(()=>{localStorage.setItem('samam-low-data',lowData?'1':'0');document.documentElement.classList.toggle('low-data-mode',lowData)},[lowData]);
 useEffect(()=>{localStorage.setItem('samam-large-text',largeText?'1':'0');document.documentElement.classList.toggle('large-text-mode',largeText)},[largeText]);
 useEffect(()=>{localStorage.setItem('samam-reduced-motion',reducedMotion?'1':'0');document.documentElement.classList.toggle('reduced-motion',reducedMotion)},[reducedMotion]);
 const options=[
  {icon:WifiOff,title:bi(lang,'Low Data Mode','குறைந்த தரவு முறை'),desc:bi(lang,'Reduces animation and keeps the experience lightweight.','அனிமேஷனை குறைத்து செயலியை இலகுவாக வைத்திருக்கும்.'),value:lowData,set:setLowData},
  {icon:Type,title:bi(lang,'Larger Text','பெரிய எழுத்து'),desc:bi(lang,'Increase text size for easier reading.','எளிதாகப் படிக்க எழுத்து அளவை பெரிதாக்கும்.'),value:largeText,set:setLargeText},
  {icon:Eye,title:bi(lang,'Reduced Motion','குறைந்த இயக்கம்'),desc:bi(lang,'Reduce motion and transitions.','இயக்கம் மற்றும் மாற்றங்களை குறைக்கும்.'),value:reducedMotion,set:setReducedMotion}
 ];
 return <div className="mx-auto max-w-4xl space-y-6">
  <section className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-violet-900/35 to-cyan-900/25 p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500"><AccessibilityIcon/></span><div><p className="text-xs font-black uppercase tracking-widest text-cyan-200">SAMAM</p><h1 className="text-2xl md:text-3xl font-black text-white">{bi(lang,'Accessibility Settings','அணுகல் அமைப்புகள்')}</h1></div></div><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{bi(lang,'Make SAMAM easier to use with low-data, text, motion and voice controls.','குறைந்த தரவு, எழுத்து, இயக்கம் மற்றும் குரல் கட்டுப்பாடுகளுடன் SAMAM-ஐ எளிதாகப் பயன்படுத்துங்கள்.')}</p></section>
  <div className="grid gap-3">{options.map(({icon:Icon,title,desc,value,set})=><button key={title} onClick={()=>set(!value)} className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-5 text-left hover:bg-white/[.07]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-cyan-300"><Icon size={21}/></span><span className="flex-1"><b className="block text-white">{title}</b><small className="mt-1 block leading-5 text-slate-400">{desc}</small></span><span className={value?'text-cyan-300':'text-slate-600'}>{value?<CheckCircle2/>:<span className="block h-6 w-6 rounded-full border-2 border-current"/>}</span></button>)}</div>
  <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5 text-sm text-slate-300"><div className="flex items-center gap-2 font-bold text-white"><Volume2 size={17}/>{bi(lang,'Voice + Language','குரல் + மொழி')}</div><p className="mt-2 leading-6">{bi(lang,'Use Arthur and Voice Interaction in English or Tamil. Voice availability depends on your browser/device.','ஆங்கிலம் அல்லது தமிழில் ஆர்தர் மற்றும் குரல் தொடர்பைப் பயன்படுத்துங்கள். குரல் வசதி உங்கள் உலாவி / சாதனத்தைப் பொறுத்தது.')}</p><div className="mt-3 flex items-center gap-2 text-xs text-slate-400"><Languages size={15}/> EN / தமிழ்</div></div>
 </div>;
}
