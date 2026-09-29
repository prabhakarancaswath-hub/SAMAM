import { useState, useMemo } from 'react';
import { ExternalLink, Search, CheckCircle2, MapPin, GraduationCap, IndianRupee, ListChecks, Link2, Youtube, Building2, Users, Bus } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import collegesData from '@/data/colleges.json';

interface Branch {
  code: string;
  name: string;
  intake: number;
}

interface College {
  code: string;
  name: string;
  city: string;
  autonomous: string;
  hostel: string;
  transport: string;
  branches: Branch[];
}

const colleges = collegesData as College[];

const categories = ['OC', 'BC', 'MBC', 'SC', 'ST'];

const steps = [
  { titleKey: 'step1Title', descKey: 'step1Desc', num: 1 },
  { titleKey: 'step2Title', descKey: 'step2Desc', num: 2 },
  { titleKey: 'step3Title', descKey: 'step3Desc', num: 3 },
  { titleKey: 'step4Title', descKey: 'step4Desc', num: 4 },
  { titleKey: 'step5Title', descKey: 'step5Desc', num: 5 },
];

const choiceChecklist = [
  'List your preferred branches in order of priority',
  'List preferred colleges from most to least desired',
  'Consider city/location preference and travel distance',
  'Check past cutoffs on cutoff.tneaonline.org',
  'Fill maximum number of choices to increase chances',
  'Keep a backup option in case top choices are not allotted',
  'Lock your choices before the deadline',
  'Take a screenshot of your filled choices for reference',
];

export function TNEA({ lang }: { lang: Lang }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [branch, setBranch] = useState('');
  const [city, setCity] = useState('');
  const [autonomousOnly, setAutonomousOnly] = useState(false);
  const [hostelOnly, setHostelOnly] = useState(false);
  const [results, setResults] = useState<College[]>([]);
  const [searched, setSearched] = useState(false);

  const allBranches = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach(c => c.branches.forEach(b => set.add(b.name)));
    return Array.from(set).sort();
  }, []);

  const allCities = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach(c => { if (c.city) set.add(c.city); });
    return Array.from(set).sort();
  }, []);

  const findColleges = () => {
    const term = search.toLowerCase().trim();
    const matches = colleges.filter((c) => {
      const nameMatch = !term || c.name.toLowerCase().includes(term);
      const cityMatch = !city || c.city === city;
      const branchMatch = !branch || c.branches.some(b => b.name === branch);
      const autoMatch = !autonomousOnly || c.autonomous === 'Yes';
      const hostelMatch = !hostelOnly || c.hostel === 'Yes';
      return nameMatch && cityMatch && branchMatch && autoMatch && hostelMatch;
    }).slice(0, 50);

    setResults(matches);
    setSearched(true);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="section-title">{t(lang, 'tneaTitle')}</h1>
        <p className="text-ink-500 mt-1">{t(lang, 'tneaSub')}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="badge bg-sdg-blue/10 text-sdg-blue"><Building2 size={12} /> {colleges.length} colleges</span>
          <span className="badge bg-sdg-teal/10 text-sdg-teal-dark">{allBranches.length} branches</span>
          <span className="badge bg-sdg-orange/10 text-sdg-orange">{allCities.length} cities</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-ink-800">{t(lang, 'tneaSteps')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step, i) => (
            <div key={i} className="card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sdg-blue to-sdg-teal flex items-center justify-center text-white font-bold text-lg mb-3">
                {step.num}
              </div>
              <h3 className="font-semibold text-ink-800 text-sm">{t(lang, step.titleKey as any)}</h3>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">{t(lang, step.descKey as any)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Links */}
      <div className="flex flex-wrap gap-3">
        <a href="https://tneaonline.org" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
          <Link2 size={16} /> {t(lang, 'officialSite')} <ExternalLink size={14} />
        </a>
        <a href="https://cutoff.tneaonline.org" target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
          <Search size={16} /> {t(lang, 'cutoffSite')} <ExternalLink size={14} />
        </a>
      </div>

      {/* College Finder */}
      <div className="card p-6 space-y-4 animate-fade-in-up">
        <h2 className="text-lg font-bold text-ink-800 flex items-center gap-2">
          <GraduationCap size={20} className="text-sdg-blue" />
          {t(lang, 'collegeFinder')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1">College Name</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="e.g. Anna University" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1">{t(lang, 'selectCategory')}</label>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="input-field">
              <option value="">--</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1">{t(lang, 'selectBranch')}</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} className="input-field">
              <option value="">All branches</option>
              {allBranches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1">{t(lang, 'selectCity')}</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field">
              <option value="">All cities</option>
              {allCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4 pt-6">
            <label className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
              <input type="checkbox" checked={autonomousOnly} onChange={(e) => setAutonomousOnly(e.target.checked)} className="w-4 h-4 rounded accent-sdg-blue" />
              Autonomous only
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
              <input type="checkbox" checked={hostelOnly} onChange={(e) => setHostelOnly(e.target.checked)} className="w-4 h-4 rounded accent-sdg-teal" />
              Hostel only
            </label>
          </div>
          <div className="flex items-end">
            <button onClick={findColleges} className="btn-primary w-full">
              <Search size={18} /> {t(lang, 'findColleges')}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-3 animate-fade-in-up">
          <h2 className="text-lg font-bold text-ink-800">{t(lang, 'collegeResults')} ({results.length})</h2>
          {results.length === 0 ? (
            <div className="card p-8 text-center text-ink-400">{t(lang, 'noResults')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((c, i) => (
                <div key={c.code + i} className="card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-ink-800 text-sm leading-snug">{c.name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="badge bg-sdg-blue/10 text-sdg-blue text-xs"><MapPin size={10} /> {c.city}</span>
                        {c.autonomous === 'Yes' && <span className="badge bg-sdg-orange/10 text-sdg-orange text-xs">Autonomous</span>}
                        {c.hostel === 'Yes' && <span className="badge bg-sdg-teal/10 text-sdg-teal-dark text-xs">Hostel</span>}
                        {c.transport === 'Yes' && <span className="badge bg-ink-100 text-ink-600 text-xs"><Bus size={10} /> Transport</span>}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-ink-400 bg-ink-50 px-2 py-1 rounded-md flex-shrink-0">#{c.code}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-ink-500 mb-1.5 flex items-center gap-1"><Users size={12} /> Branches ({c.branches.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {c.branches.map((b, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded-md bg-ink-50 text-ink-700 border border-ink-100">
                          {b.name} <span className="text-ink-400">({b.intake})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-sdg-orange mt-3 flex items-center gap-1">
                    <CheckCircle2 size={12} /> {t(lang, 'verifyOfficial')}
                  </p>
                </div>
              ))}
            </div>
          )}
          <a href="https://cutoff.tneaonline.org" target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
            <ExternalLink size={14} /> {t(lang, 'verifyOfficial')}
          </a>
        </div>
      )}

      {/* Choice Filling Checklist */}
      <div className="card p-6 space-y-3 animate-fade-in">
        <h2 className="text-lg font-bold text-ink-800 flex items-center gap-2">
          <ListChecks size={20} className="text-sdg-teal-dark" />
          {t(lang, 'choiceChecklist')}
        </h2>
        <ul className="space-y-2">
          {choiceChecklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
              <div className="w-5 h-5 rounded-md border-2 border-sdg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={12} className="text-sdg-teal" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        <div className="space-y-3 mt-4">
          <h3 className="font-bold text-ink-800 flex items-center gap-2"><Youtube size={18} className="text-red-500" /> YouTube Tutorials</h3>
          <div className="flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=nynv0bUgIM8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              TNEA Choice Filling Step-by-Step Tutorial
            </a>
            <a href="https://www.youtube.com/watch?v=63MijUbQPPw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              TNEA Choice Filling Full Demo (Tamil)
            </a>
            <a href="https://www.youtube.com/watch?v=urMQ8Qel4H0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              How to Fill TNEA Choice List Like a Pro
            </a>
            <a href="https://www.youtube.com/playlist?list=PLuwKjRfi2s1Ujm8_kHavXQ08xl-obEY-L" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              TNEA Counselling Complete Procedure (Tamil Playlist)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
