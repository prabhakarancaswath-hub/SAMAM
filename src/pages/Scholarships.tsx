import { useState, useMemo } from 'react';
import { Search, ExternalLink, CheckCircle2, Filter, Sparkles, X, Youtube } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import schemesData from '@/data/schemes.json';

interface Scheme {
  id: string;
  name: string;
  name_ta: string;
  category: string[];
  gender: string;
  incomeLimit: number;
  educationLevel: string;
  provider: string;
  benefits: string;
  benefits_ta: string;
  eligibility: string[];
  applyLink: string;
  tags: string[];
}

const categories = ['OC', 'BC', 'MBC', 'SC', 'ST', 'OBC'];
const educationLevels = ['pre-matric', 'post-matric', 'undergraduate', 'postgraduate'];

export function Scholarships({ lang }: { lang: Lang }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterIncome, setFilterIncome] = useState('');
  const [filterEdu, setFilterEdu] = useState('');
  const [showMatch, setShowMatch] = useState(false);
  const [matchCat, setMatchCat] = useState('');
  const [matchIncome, setMatchIncome] = useState('');
  const [matchGender, setMatchGender] = useState('');
  const [matchEdu, setMatchEdu] = useState('');
  const [matchResults, setMatchResults] = useState<Scheme[]>([]);
  const [matchStep, setMatchStep] = useState(0);

  const schemes = schemesData as Scheme[];

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const name = lang === 'ta' ? s.name_ta : s.name;
      const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.includes(search.toLowerCase()));
      const matchCat = !filterCat || s.category.includes(filterCat);
      const matchGender = !filterGender || s.gender === 'all' || s.gender === filterGender;
      const matchIncome = !filterIncome || s.incomeLimit === 0 || s.incomeLimit >= parseInt(filterIncome);
      const matchEdu = !filterEdu || s.educationLevel === filterEdu;
      return matchSearch && matchCat && matchGender && matchIncome && matchEdu;
    });
  }, [schemes, search, filterCat, filterGender, filterIncome, filterEdu, lang]);

  const findMatch = () => {
    const results = schemes.filter((s) => {
      const catMatch = !matchCat || s.category.includes(matchCat);
      const genderMatch = s.gender === 'all' || s.gender === matchGender;
      const incomeMatch = s.incomeLimit === 0 || !matchIncome || s.incomeLimit >= parseInt(matchIncome);
      const eduMatch = !matchEdu || s.educationLevel === matchEdu;
      return catMatch && genderMatch && incomeMatch && eduMatch;
    }).slice(0, 5);
    setMatchResults(results);
  };

  const resetFilters = () => {
    setSearch('');
    setFilterCat('');
    setFilterGender('');
    setFilterIncome('');
    setFilterEdu('');
  };

  const matchSteps = [
    { key: 'category', label: t(lang, 'askCategory'), options: categories },
    { key: 'income', label: t(lang, 'askIncome'), type: 'number' },
    { key: 'gender', label: t(lang, 'askGender'), options: ['male', 'female'] },
    { key: 'education', label: t(lang, 'askEducation'), options: educationLevels },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="section-title">{t(lang, 'scholarshipsTitle')}</h1>
        <p className="text-ink-500 mt-1">{t(lang, 'scholarshipsSub')}</p>
      </div>

      {/* AI Match Finder */}
      <div className="card p-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sdg-orange to-sdg-orange-light flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-ink-800">{t(lang, 'findMatch')}</h2>
        </div>

        {!showMatch ? (
          <button onClick={() => setShowMatch(true)} className="btn-orange">
            <Sparkles size={18} />
            {t(lang, 'findMatch')}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Step indicators */}
            <div className="flex items-center gap-2">
              {matchSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    i < matchStep ? 'bg-sdg-teal text-white' : i === matchStep ? 'bg-sdg-blue text-white' : 'bg-ink-100 text-ink-400'
                  }`}>
                    {i < matchStep ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  {i < matchSteps.length - 1 && <div className={`w-8 h-0.5 ${i < matchStep ? 'bg-sdg-teal' : 'bg-ink-200'}`} />}
                </div>
              ))}
            </div>

            {matchStep < matchSteps.length ? (
              <div className="space-y-3 animate-fade-in">
                <label className="block text-sm font-medium text-ink-700">{matchSteps[matchStep].label}</label>
                {matchSteps[matchStep].options ? (
                  <div className="flex flex-wrap gap-2">
                    {matchSteps[matchStep].options!.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const key = matchSteps[matchStep].key;
                          if (key === 'category') setMatchCat(opt);
                          else if (key === 'gender') setMatchGender(opt);
                          else if (key === 'education') setMatchEdu(opt);
                          setMatchStep(matchStep + 1);
                        }}
                        className="px-4 py-2 rounded-xl border border-ink-300 hover:border-sdg-blue hover:bg-sdg-blue/5 text-sm font-medium transition-all active:scale-95"
                      >
                        {opt === 'male' ? t(lang, 'male') : opt === 'female' ? t(lang, 'female') : opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="₹"
                      className="input-field flex-1"
                      value={matchIncome}
                      onChange={(e) => setMatchIncome(e.target.value)}
                    />
                    <button
                      onClick={() => setMatchStep(matchStep + 1)}
                      disabled={!matchIncome}
                      className="btn-primary disabled:opacity-40"
                    >
                      OK
                    </button>
                  </div>
                )}
                {matchStep > 0 && (
                  <button onClick={() => setMatchStep(matchStep - 1)} className="text-sm text-ink-500 hover:text-ink-700">
                    ← Back
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <button onClick={findMatch} className="btn-teal">
                  <Sparkles size={18} />
                  {t(lang, 'findMatch')}
                </button>
                <button onClick={() => { setMatchStep(0); setMatchCat(''); setMatchIncome(''); setMatchGender(''); setMatchEdu(''); setMatchResults([]); }} className="text-sm text-ink-500 hover:text-ink-700 ml-2">
                  {t(lang, 'reset')}
                </button>
              </div>
            )}

            {matchResults.length > 0 && (
              <div className="space-y-3 animate-fade-in-up">
                <h3 className="font-bold text-ink-800">{t(lang, 'matchResults')}</h3>
                {matchResults.map((s, i) => (
                  <SchemeCard key={s.id} scheme={s} lang={lang} index={i} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search & Filters */}
      <div className="card p-4 space-y-3 animate-fade-in-up">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(lang, 'scholarshipsSearch')}
            className="input-field pl-10"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="input-field text-sm">
            <option value="">{t(lang, 'allCategories')}</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="input-field text-sm">
            <option value="">{t(lang, 'allGenders')}</option>
            <option value="male">{t(lang, 'male')}</option>
            <option value="female">{t(lang, 'female')}</option>
          </select>
          <input type="number" value={filterIncome} onChange={(e) => setFilterIncome(e.target.value)} placeholder={t(lang, 'filterIncome')} className="input-field text-sm" />
          <select value={filterEdu} onChange={(e) => setFilterEdu(e.target.value)} className="input-field text-sm">
            <option value="">{t(lang, 'allLevels')}</option>
            {educationLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        {(search || filterCat || filterGender || filterIncome || filterEdu) && (
          <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700">
            <X size={14} /> {t(lang, 'reset')}
          </button>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm text-ink-500">{filtered.length} {t(lang, 'matchResults')}</p>
        {filtered.length === 0 ? (
          <div className="card p-8 text-center text-ink-400">{t(lang, 'noResults')}</div>
        ) : (
          filtered.map((s, i) => <SchemeCard key={s.id} scheme={s} lang={lang} index={i} />)
        )}
      </div>

      {/* Official links + YouTube guides */}
      <div className="card p-6 space-y-4 animate-fade-in">
        <div>
          <h3 className="font-bold text-ink-800 flex items-center gap-2 mb-3"><Filter size={18} /> Official Portals</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              National Scholarship Portal <ExternalLink size={14} />
            </a>
            <a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
              myScheme <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-ink-800 flex items-center gap-2 mb-3"><Youtube size={18} className="text-red-500" /> YouTube Tutorials</h3>
          <div className="flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=kZ3QQXhUUNk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              NSP Step-by-Step Guidance (2024-25)
            </a>
            <a href="https://www.youtube.com/watch?v=xRIVG3UhNmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              NSP OTR Registration + Full Guide
            </a>
            <a href="https://www.youtube.com/watch?v=ku8KFqXKdAc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              How to Find Schemes on myScheme Portal
            </a>
            <a href="https://www.youtube.com/watch?v=2VPdhMFq1XA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              How to Apply for Government Schemes Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchemeCard({ scheme, lang, index }: { scheme: Scheme; lang: Lang; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const name = lang === 'ta' ? scheme.name_ta : scheme.name;
  const benefits = lang === 'ta' ? scheme.benefits_ta : scheme.benefits;

  return (
    <div
      className="card p-5 animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-ink-800 text-lg">{name}</h3>
          <p className="text-sm text-ink-500 mt-0.5">{scheme.provider}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {scheme.category.map(c => (
              <span key={c} className="badge bg-sdg-blue/10 text-sdg-blue">{c}</span>
            ))}
            <span className="badge bg-sdg-teal/10 text-sdg-teal-dark">{scheme.educationLevel}</span>
            {scheme.gender !== 'all' && <span className="badge bg-sdg-orange/10 text-sdg-orange-dark">{scheme.gender}</span>}
          </div>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-xl bg-ink-50">
        <p className="text-sm font-medium text-ink-700">{t(lang, 'benefits')}</p>
        <p className="text-sm text-ink-600 mt-1">{benefits}</p>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 animate-fade-in">
          <div>
            <p className="text-sm font-medium text-ink-700 mb-1">{t(lang, 'eligibility')}</p>
            <ul className="space-y-1">
              {scheme.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle2 size={14} className="text-sdg-teal mt-0.5 flex-shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm" onClick={(e) => e.stopPropagation()}>
            {t(lang, 'applyLink')} <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
}
