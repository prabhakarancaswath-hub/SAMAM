import { useEffect, useRef, useState } from 'react';
import { Bus, Building2, Crosshair, Hospital, MapPin, Navigation, Search, Star } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

declare global { interface Window { google?: any; } }

type Place = { name:string; address:string; lat:number; lng:number; rating?:number; placeId?:string; };

const COIMBATORE = {lat:11.0168,lng:76.9558};

function loadMaps(key:string):Promise<any>{
 return new Promise((resolve,reject)=>{
  if(window.google?.maps) return resolve(window.google.maps);
  const s=document.createElement('script');
  s.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&v=weekly`;
  s.async=true;s.defer=true;
  s.onload=()=>window.google?.maps?resolve(window.google.maps):reject(new Error('Maps unavailable'));
  s.onerror=()=>reject(new Error('Maps failed'));
  document.head.appendChild(s);
 });
}

export function Maps({lang}:{lang:Lang}){
 const mapEl=useRef<HTMLDivElement>(null);
 const map=useRef<any>(null);
 const service=useRef<any>(null);
 const userMarker=useRef<any>(null);
 const accuracy=useRef<any>(null);
 const markers=useRef<any[]>([]);
 const watch=useRef<number|null>(null);
 const [ready,setReady]=useState(false);
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('government');
 const [places,setPlaces]=useState<Place[]>([]);
 const [live,setLive]=useState<{lat:number;lng:number;accuracy:number}|null>(null);
 const [message,setMessage]=useState('');
 const key=(import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string|undefined)?.trim();

 useEffect(()=>{
  if(!key){setMessage(bi(lang,'Add VITE_GOOGLE_MAPS_API_KEY to enable Google Maps.','Google Maps-ஐ இயக்க VITE_GOOGLE_MAPS_API_KEY சேர்க்கவும்.'));return;}
  loadMaps(key).then((m)=>{
   if(!mapEl.current)return;
   map.current=new m.Map(mapEl.current,{center:COIMBATORE,zoom:13,mapTypeControl:false,streetViewControl:false,fullscreenControl:false,gestureHandling:'greedy'});
   service.current=new m.places.PlacesService(map.current);
   setReady(true);
  }).catch(()=>setMessage(bi(lang,'Google Maps could not load. Check the API key restrictions.','Google Maps ஏற்றப்படவில்லை. API key restrictions-ஐ சரிபார்க்கவும்.')));
  return()=>{if(watch.current!==null)navigator.geolocation?.clearWatch(watch.current);};
 },[key,lang]);

 const setLocation=(p:GeolocationPosition)=>{
  const m=window.google?.maps;if(!m||!map.current)return;
  const pos={lat:p.coords.latitude,lng:p.coords.longitude};
  setLive({lat:pos.lat,lng:pos.lng,accuracy:p.coords.accuracy});
  if(!userMarker.current)userMarker.current=new m.Marker({map:map.current,position:pos,title:bi(lang,'Your live location','உங்கள் நேரடி இருப்பிடம்'),icon:{path:m.SymbolPath.CIRCLE,scale:9,fillColor:'#22d3ee',fillOpacity:1,strokeColor:'#fff',strokeWeight:3}});
  else userMarker.current.setPosition(pos);
  if(!accuracy.current)accuracy.current=new m.Circle({map:map.current,fillColor:'#22d3ee',fillOpacity:.08,strokeColor:'#22d3ee',strokeOpacity:.3,strokeWeight:1});
  accuracy.current.setCenter(pos);accuracy.current.setRadius(p.coords.accuracy);
  map.current.panTo(pos);
 };

 const useLiveLocation=()=>{
  if(!navigator.geolocation){setMessage(bi(lang,'Location is not supported by this browser.','இந்த browser இருப்பிடத்தை ஆதரிக்கவில்லை.'));return;}
  setMessage('');
  navigator.geolocation.getCurrentPosition(setLocation,()=>setMessage(bi(lang,'Please allow location access in your browser.','உங்கள் browser-ல் இருப்பிட அனுமதியை வழங்கவும்.')),{enableHighAccuracy:true,maximumAge:5000,timeout:15000});
  if(watch.current===null)watch.current=navigator.geolocation.watchPosition(setLocation,()=>undefined,{enableHighAccuracy:true,maximumAge:5000,timeout:15000});
 };

 const clear=()=>{markers.current.forEach(m=>m.setMap(null));markers.current=[];};

 const search=()=>{
  if(!service.current)return;
  clear();
  const center=live?{lat:live.lat,lng:live.lng}:map.current.getCenter();
  service.current.nearbySearch({location:center,radius:5000,keyword:query.trim()||category},(items:any[],status:any)=>{
   if(status!=='OK'||!items?.length){setPlaces([]);setMessage(bi(lang,'No nearby places found.','அருகிலுள்ள இடங்கள் கிடைக்கவில்லை.'));return;}
   const next=items.slice(0,12).map((p:any)=>({name:p.name,address:p.vicinity||p.formatted_address||'',lat:p.geometry.location.lat(),lng:p.geometry.location.lng(),rating:p.rating,placeId:p.place_id}));
   setPlaces(next);setMessage('');
   next.forEach(p=>{const marker=new window.google.maps.Marker({map:map.current,position:{lat:p.lat,lng:p.lng},title:p.name});marker.addListener('click',()=>map.current.panTo({lat:p.lat,lng:p.lng}));markers.current.push(marker);});
  });
 };

 useEffect(()=>{if(ready)search();},[ready,category]);

 const directions=(p:Place)=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}${live?`&origin=${live.lat},${live.lng}`:''}`,'_blank');

 const cats=[['government',bi(lang,'Government services','அரசு சேவைகள்'),Building2],['hospital',bi(lang,'Hospitals','மருத்துவமனைகள்'),Hospital],['bus stop',bi(lang,'Bus stops','பேருந்து நிறுத்தங்கள்'),Bus]] as const;

 return <div className="samam-page space-y-6">
  <section><div className="samam-page-icon"><MapPin/></div><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-black">{bi(lang,'Live Maps & Nearby Support','நேரடி வரைபடம் & அருகிலுள்ள ஆதரவு')}</h1><p className="mt-2 text-sm text-slate-400">{bi(lang,'Real Google Maps places with optional live device location.','Google Maps இடங்கள் மற்றும் உங்கள் அனுமதியுடன் சாதன நேரடி இருப்பிடம்.')}</p></div><button onClick={useLiveLocation} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-bold"><Crosshair size={15}/>{bi(lang,'Use my live location','என் நேரடி இருப்பிடத்தைப் பயன்படுத்து')}</button></div></section>
  <div className="grid gap-4 lg:grid-cols-[1.6fr_.9fr]">
   <div className="space-y-3">
    <div className="flex gap-2"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder={bi(lang,'Search hospitals, bus stops, government offices…','மருத்துவமனை, பேருந்து நிறுத்தம், அரசு அலுவலகம்…')} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none"/></div><button onClick={search} className="rounded-xl bg-cyan-500 px-4 text-xs font-bold text-slate-950">{bi(lang,'Search','தேடு')}</button></div>
    <div className="flex gap-2 overflow-x-auto no-scrollbar">{cats.map(([id,label,Icon])=><button key={id} onClick={()=>{setCategory(id);setQuery('')}} className={`samam-filter ${category===id?'active':''}`}><Icon size={13} className="inline mr-1"/>{label}</button>)}</div>
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900"><div ref={mapEl} className="h-[510px] w-full"/></div>
    {message&&<div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-200">{message}</div>}
    {live&&<div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-cyan-100"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400"/>{bi(lang,'Live location active','நேரடி இருப்பிடம் செயல்பாட்டில்')} • ±{Math.round(live.accuracy)}m</div>}
   </div>
   <aside className="space-y-3"><div className="samam-info-card"><Navigation/><span><b>{bi(lang,'Google Maps results','Google Maps முடிவுகள்')}</b><small>{bi(lang,'Places are searched near your current location when enabled.','இருப்பிடம் இயக்கப்பட்டால் அதற்கு அருகில் இடங்கள் தேடப்படும்.')}</small></span></div><div className="space-y-2 max-h-[470px] overflow-y-auto">{places.map(p=><div key={p.placeId||p.name} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><MapPin size={18}/></span><div className="min-w-0 flex-1"><b className="block text-sm text-white">{p.name}</b><small className="mt-1 block text-xs text-slate-400">{p.address}</small>{p.rating&&<span className="mt-2 flex items-center gap-1 text-[11px] text-amber-200"><Star size={12}/>{p.rating.toFixed(1)}</span>}<button onClick={()=>directions(p)} className="mt-3 rounded-lg bg-violet-600 px-3 py-2 text-[11px] font-bold text-white"><Navigation size={12} className="mr-1 inline"/>{bi(lang,'Directions','வழிகாட்டி')}</button></div></div></div>)}</div></aside>
  </div>
 </div>;
}
