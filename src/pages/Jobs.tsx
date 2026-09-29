import { useState, useMemo } from 'react';
import { Search, MapPin, IndianRupee, Mail, ExternalLink, Briefcase, Filter, X } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';
import jobsData from '@/data/jobs.json';

interface Job {
  id: string;
  role: string;
  role_ta: string;
  company: string;
  location: string;
  stipend: string;
  type: string;
  contact: string;
  link: string;
  skills: string[];
  description: string;
  description_ta: string;
}

const jobTypes = ['internship', 'full-time', 'part-time', 'temporary', 'trainee', 'freelance'];

export function Jobs({ lang }: { lang: Lang }) {
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showTop5, setShowTop5] = useState(false);

  const jobs = jobsData as Job[];

  const locations = useMemo(() => [...new Set(jobs.map(j => j.location))], [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const role = lang === 'ta' ? j.role_ta : j.role;
      const matchSearch = !search ||
        role.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.location.toLowerCase().includes(search.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchLoc = !filterLocation || j.location === filterLocation;
      const matchType = !filterType || j.type === filterType;
      return matchSearch && matchLoc && matchType;
    });
  }, [jobs, search, filterLocation, filterType, lang]);

  const top5 = useMemo(() => filtered.slice(0, 5), [filtered]);

  const display = showTop5 ? top5 : filtered;

  const resetFilters = () => {
    setSearch('');
    setFilterLocation('');
    setFilterType('');
    setShowTop5(false);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="section-title">{t(lang, 'jobsTitle')}</h1>
        <p className="text-ink-500 mt-1">{t(lang, 'jobsSub')}</p>
      </div>

      {/* Search & Filters */}
      <div className="card p-4 space-y-3 animate-fade-in-up">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(lang, 'searchJobs')}
            className="input-field pl-10"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="input-field text-sm">
            <option value="">{t(lang, 'allLocations')}</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="input-field text-sm">
            <option value="">{t(lang, 'allTypes')}</option>
            {jobTypes.map(ty => <option key={ty} value={ty}>{ty}</option>)}
          </select>
          <button
            onClick={() => { setShowTop5(!showTop5); }}
            className={`btn-teal text-sm ${showTop5 ? 'bg-sdg-orange hover:bg-sdg-orange-light' : ''}`}
          >
            <Filter size={16} /> {t(lang, 'topMatches')}
          </button>
        </div>
        {(search || filterLocation || filterType) && (
          <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700">
            <X size={14} /> {t(lang, 'reset')}
          </button>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm text-ink-500">{display.length} {t(lang, 'topMatches')}</p>
        {display.length === 0 ? (
          <div className="card p-8 text-center text-ink-400">{t(lang, 'noResults')}</div>
        ) : (
          display.map((j, i) => {
            const role = lang === 'ta' ? j.role_ta : j.role;
            const desc = lang === 'ta' ? j.description_ta : j.description;
            return (
              <div key={j.id} className="card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sdg-blue to-sdg-teal flex items-center justify-center flex-shrink-0">
                        <Briefcase size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink-800">{role}</h3>
                        <p className="text-sm text-ink-500">{j.company}</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-sdg-orange/10 text-sdg-orange-dark capitalize">{j.type}</span>
                </div>

                <p className="text-sm text-ink-600 mt-3">{desc}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-ink-600">
                    <MapPin size={14} className="text-sdg-teal" /> {j.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-ink-600">
                    <IndianRupee size={14} className="text-sdg-teal" /> {j.stipend}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-ink-600 truncate">
                    <Mail size={14} className="text-sdg-teal" /> {j.contact}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {j.skills.map((s, si) => (
                    <span key={si} className="badge bg-ink-100 text-ink-600">{s}</span>
                  ))}
                </div>

                <a href={j.link} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm mt-3">
                  {t(lang, 'apply')} <ExternalLink size={14} />
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
