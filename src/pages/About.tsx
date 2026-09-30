import { Scale, Globe, Mic, ShieldCheck, GraduationCap, BookOpen, Wrench, Briefcase, Heart } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import { bi } from '@/i18n/bilingual';

export function About({ lang }: { lang: Lang }) {
 const features = [
  { icon: GraduationCap, text: t(lang, 'aboutFeature1') },
  { icon: BookOpen, text: t(lang, 'aboutFeature2') },
  { icon: Wrench, text: t(lang, 'aboutFeature3') },
  { icon: Briefcase, text: t(lang, 'aboutFeature4') },
  { icon: Globe, text: t(lang, 'aboutFeature5') },
 ];
 return <div className="samam-page space-y-6">
  <div><h1 className="text-3xl font-black">{t(lang,'aboutTitle')}</h1><p className="mt-2 text-sm text-slate-400">{bi(lang,'SAMAM AI is a bilingual access layer for education, government support, careers and essential services.','SAMAM AI கல்வி, அரசு ஆதரவு, தொழில் மற்றும் அத்தியாவசிய சேவைகளுக்கான இருமொழி அணுகல் தளம்.')}</p></div>
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-cyan-600 to-indigo-700 p-8 md:p-12"><div className="relative text-center"><div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-white/20"><Scale size={40} className="text-white"/></div><h2 className="text-3xl font-black text-white">SDG 10</h2><p className="mt-2 text-lg font-semibold text-white/90">{bi(lang,'Reduced Inequalities','ஏற்றத்தாழ்வுகளைக் குறைத்தல்')}</p><p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80">{t(lang,'aboutSDGGoal')}</p></div></div>
  <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><p className="leading-7 text-slate-300">{t(lang,'aboutDesc')}</p></div>
  <section><h2 className="text-xl font-black">{t(lang,'aboutFeatures')}</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{features.map((f,i)=>{const Icon=f.icon;return <div key={i} className="rounded-2xl border border-white/10 bg-white/[.03] p-4 flex items-start gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon size={20}/></span><p className="pt-1 text-sm text-slate-300">{f.text}</p></div>})}</div></section>
  <div className="grid gap-4 sm:grid-cols-3">{[
   {icon:Globe,title:bi(lang,'Bilingual','இருமொழி'),desc:bi(lang,'Tamil + English','தமிழ் + ஆங்கிலம்')},
   {icon:Mic,title:bi(lang,'Voice AI','குரல் AI'),desc:bi(lang,'Browser voice interaction','உலாவி குரல் தொடர்பு')},
   {icon:ShieldCheck,title:bi(lang,'Official Guidance','அதிகாரப்பூர்வ வழிகாட்டி'),desc:bi(lang,'Verify links before applying','விண்ணப்பிக்கும் முன் இணைப்புகளை சரிபார்க்கவும்')}
  ].map(({icon:Icon,title,desc})=><div key={title} className="rounded-2xl border border-white/10 bg-white/[.03] p-5 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500"><Icon size={23}/></span><h3 className="mt-3 font-bold">{title}</h3><p className="mt-1 text-sm text-slate-400">{desc}</p></div>)}</div>
  <div className="flex items-start gap-3 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4"><Heart size={20} className="mt-0.5 text-amber-300"/><p className="text-sm text-slate-300">{t(lang,'aboutDisclaimer')}</p></div>
  <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><h3 className="font-bold">{bi(lang,'Official Resources','அதிகாரப்பூர்வ ஆதாரங்கள்')}</h3><div className="mt-3 flex flex-wrap gap-3">{[['National Scholarship Portal','https://scholarships.gov.in'],['myScheme','https://myscheme.gov.in'],['TNEA','https://tneaonline.org'],['SWAYAM','https://swayam.gov.in'],['NPTEL','https://nptel.ac.in'],['NSDC','https://www.nsdcindia.org']].map(([name,url])=><a key={name} href={url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-cyan-200 hover:bg-white/10">{name}</a>)}</div></div>
 </div>;
}
