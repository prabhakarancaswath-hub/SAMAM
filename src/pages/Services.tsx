import { Building2, ExternalLink, FileText, HeartPulse, Landmark, MapPin, Bus, ShieldCheck } from 'lucide-react';
import type { Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

export function Services({lang}:{lang:Lang}) {
 const services=[
  {icon:HeartPulse,title:bi(lang,'Government Hospital','அரசு மருத்துவமனை'),desc:bi(lang,'Public healthcare and support information.','அரசு மருத்துவ சேவை மற்றும் ஆதரவு தகவல்.')},
  {icon:Landmark,title:bi(lang,'Ration Shop','நியாய விலைக் கடை'),desc:bi(lang,'Find public distribution and ration support.','பொது விநியோகம் மற்றும் ரேஷன் ஆதரவை அறியுங்கள்.')},
  {icon:Building2,title:bi(lang,'Education Centre','கல்வி மையம்'),desc:bi(lang,'Education and student support services.','கல்வி மற்றும் மாணவர் ஆதரவு சேவைகள்.')},
  {icon:Bus,title:bi(lang,'Transport Office','போக்குவரத்து அலுவலகம்'),desc:bi(lang,'Transport-related public service guidance.','போக்குவரத்து தொடர்பான பொது சேவை வழிகாட்டி.')},
  {icon:FileText,title:bi(lang,'e-District Centre','e-District மையம்'),desc:bi(lang,'Certificates and online citizen services.','சான்றிதழ்கள் மற்றும் ஆன்லைன் குடிமக்கள் சேவைகள்.')},
  {icon:ShieldCheck,title:bi(lang,'Government Office','அரசு அலுவலகம்'),desc:bi(lang,'General public-service information and guidance.','பொது சேவை தகவல் மற்றும் வழிகாட்டி.')},
 ];
 return <div className="samam-page space-y-7">
  <section><div className="samam-page-icon"><Building2/></div><h1 className="mt-4 text-3xl font-black">{bi(lang,'Services Directory','சேவை அடைவு')}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{bi(lang,'A simple starting point for essential public services. Use Arthur to understand what to look for and verify details with the official service provider.','அத்தியாவசிய பொது சேவைகளுக்கான எளிய தொடக்க இடம். எதைத் தேட வேண்டும் என்பதை ஆர்தரிடம் அறிந்து, விவரங்களை அதிகாரப்பூர்வ சேவை வழங்குநரிடம் சரிபார்க்கவும்.')}</p></section>
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{services.map(({icon:Icon,title,desc})=><div key={title} className="samam-service-card"><span className="samam-service-icon"><Icon size={21}/></span><span className="flex-1"><b>{title}</b><small>{desc}</small></span><ExternalLink size={15} className="text-slate-500"/></div>)}</div>
  <section className="rounded-2xl border border-cyan-300/15 bg-cyan-950/20 p-5"><div className="flex items-center gap-2 text-cyan-200"><MapPin size={17}/><b>{bi(lang,'Need a nearby service?','அருகிலுள்ள சேவை வேண்டுமா?')}</b></div><p className="mt-2 text-sm text-slate-400">{bi(lang,'Open Maps for the visual support map, or ask Arthur in Tamil or English.','காட்சி ஆதரவு வரைபடத்திற்காக வரைபடத்தைத் திறக்கவும் அல்லது தமிழ் / ஆங்கிலத்தில் ஆர்தரிடம் கேளுங்கள்.')}</p></section>
 </div>;
}
