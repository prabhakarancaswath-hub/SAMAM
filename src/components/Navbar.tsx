import { useState } from 'react';
import { Home, GraduationCap, BookOpen, Wrench, Briefcase, Info, Menu, X, HelpCircle, Sparkles } from 'lucide-react';
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
    { id: 'about', label: t(lang, 'navAbout'), icon: Info },
    { id: 'scholarships', label: t(lang, 'navScholarships'), icon: GraduationCap },
    { id: 'faqs', label: t(lang, 'navFAQs'), icon: HelpCircle },
  ];

  const handleNav = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-ink-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNav('home')} className="flex-shrink-0">
            <Logo size="md" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-sdg-blue/10 text-sdg-blue'
                      : 'text-ink-600 hover:text-sdg-blue hover:bg-ink-50'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={onArthur}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-sdg-teal to-sdg-teal-light text-white shadow-md shadow-sdg-teal/30 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Sparkles size={16} />
              {t(lang, 'navArthur')}
            </button>
          </nav>

          {/* Language selector + mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-ink-100 rounded-xl p-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  lang === 'en' ? 'bg-white text-sdg-blue shadow-sm' : 'text-ink-500'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  lang === 'ta' ? 'bg-white text-sdg-blue shadow-sm' : 'text-ink-500'
                }`}
              >
                த
              </button>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-ink-100 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 animate-fade-in-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = page === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-sdg-blue/10 text-sdg-blue'
                        : 'text-ink-600 hover:bg-ink-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => { onArthur(); setMobileOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-sdg-teal to-sdg-teal-light text-white shadow-md transition-all duration-200"
              >
                <Sparkles size={18} />
                {t(lang, 'navArthur')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
