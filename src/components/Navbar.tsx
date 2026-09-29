import { useState } from 'react';
import { Home, GraduationCap, Info, Menu, X, HelpCircle, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { t, type Lang } from '@/i18n/translations';

export type Page = 'home' | 'scholarships' | 'tnea' | 'skills' | 'jobs' | 'about' | 'faqs';

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  page: Page;
  setPage: (p: Page) => void;
  onArthur: () => void;
}

export function Navbar({ lang, setLang, page, setPage, onArthur }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems: { id: Page; label: string; icon: typeof Home }[] = [
    { id: 'home', label: t(lang, 'navHome'), icon: Home },
    { id: 'scholarships', label: t(lang, 'navScholarships'), icon: GraduationCap },
    { id: 'about', label: t(lang, 'navAbout'), icon: Info },
    { id: 'faqs', label: t(lang, 'navFAQs'), icon: HelpCircle },
  ];
  const handleNav = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060b1a]/85 backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,.25)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">
          <button onClick={() => handleNav('home')} className="flex-shrink-0">
            <Logo size="md" />
          </button>

          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active ? 'bg-white/10 text-white ring-1 ring-cyan-300/20 shadow-[0_0_24px_rgba(34,211,238,.08)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}>
                  <Icon size={16} />{item.label}
                </button>
              );
            })}
            <button onClick={onArthur}
              className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg shadow-violet-900/30 hover:scale-[1.03] hover:shadow-cyan-500/20 transition-all">
              <Sparkles size={16} />{t(lang, 'navArthur')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl p-1 bg-white/5 ring-1 ring-white/10">
              <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('ta')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'ta' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}>த</button>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden pb-4 animate-fade-in-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return <button key={item.id} onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    page === item.id ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}>
                  <Icon size={18} />{item.label}
                </button>;
              })}
              <button onClick={() => { onArthur(); setMobileOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 mt-1">
                <Sparkles size={18} />{t(lang, 'navArthur')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
