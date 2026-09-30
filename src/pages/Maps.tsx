import { useState } from 'react';
import { Bus, Building2, Hospital, MapPin, Navigation, Search } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

export function Maps({lang}:{lang:Lang}) {
 const [selected,setSelected]=useState(0);
 const places=[
  {name:bi(lang,'Government Hospital','அரசு மருத்துவமனை'),type:bi(lang,'Healthcare','மருத்துவம்'),icon:Hospital},
  {name:bi(lang,'Education Centre','கல்வி மையம்'),type:bi(lang,'Education','கல்வி'),icon:Building2},
  {name:bi(lang,'Bus Stop','பேருந்து நிறுத்தம்'),type:bi(lang,'Transport','போக்குவரத்து'),icon:Bus},
  {name:bi(lang,'Government Office','அரசு அலுவலகம்'),type:bi(lang,'Public service','பொது சேவை'),icon:Building2},
 ];
 return <div className="samam-page space-y-6">
  <section><div className="samam-page-icon"><MapPin/></div><h1 className="mt-4 text-3xl font-black">{bi(lang,'Interactive Support Map','ஊடாடும் ஆதரவு வரைபடம்')}</h1><p className="mt-2 text-sm text-slate-400">{bi(lang,'A lightweight visual map concept for nearby public support, services and transport.','அருகிலுள்ள பொது ஆதரவு, சேவைகள் மற்றும் போக்குவரத்துக்கான குறைந்த தரவு காட்சி வரைபடக் கருத்து.')}</p></section>
  <div className="flex gap-2 overflow-x-auto no-scrollbar">{places.map((p,i)=><button key={p.name} onClick={()=>setSelected(i)} className={`samam-filter ${selected===i?'active':''}`}><p.icon size={13} className="inline mr-1"/>{p.name}</button>)}</div>
  <div className="samam-map">
   <div className="samam-map-grid"/><div className="samam-map-label">Coimbatore</div><div className="samam-route"/>
   <span className="samam-pin p1"/><span className="samam-pin p2"/><span className="samam-pin p3"/><span className="samam-pin p4"/>
   <div className="samam-map-card"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><MapPin size={19}/></span><div className="flex-1"><b className="block text-sm text-white">{places[selected].name}</b><small className="text-xs text-slate-400">{places[selected].type} • {bi(lang,'Support location concept','ஆதரவு இடக் கருத்து')}</small></div><button className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-2 text-xs font-bold"><Navigation size={13} className="inline mr-1"/>{bi(lang,'Directions','வழிகாட்டி')}</button></div></div>
  </div>
  <div className="grid gap-3 sm:grid-cols-3"><div className="samam-info-card"><Search/><span><b>{bi(lang,'Search nearby','அருகில் தேடு')}</b><small>{bi(lang,'Find a support category','ஆதரவு வகையைத் தேடுங்கள்')}</small></span></div><div className="samam-info-card"><Bus/><span><b>{bi(lang,'Transport support','போக்குவரத்து ஆதரவு')}</b><small>{bi(lang,'Bus and route information can be added here','பேருந்து மற்றும் வழித்தட தகவலை இங்கு சேர்க்கலாம்')}</small></span></div><div className="samam-info-card"><MapPin/><span><b>{bi(lang,'Location access','இருப்பிட அணுகல்')}</b><small>{bi(lang,'Use device location only when you choose','நீங்கள் தேர்வு செய்தால் மட்டும் சாதன இருப்பிடத்தைப் பயன்படுத்தவும்')}</small></span></div></div>
 </div>;
}
