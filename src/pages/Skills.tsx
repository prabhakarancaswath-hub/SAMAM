import { useState } from 'react';
import { Wrench, ExternalLink, Play, Sparkles, Youtube } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';

interface Skill {
  id: string;
  name: string;
  name_ta: string;
  description: string;
  description_ta: string;
  level: string;
  courseLink: string;
  platform: string;
  duration: string;
  cost: string;
  interests: string[];
}

const skillsData: Skill[] = [
  {
    id: 's1',
    name: 'Microsoft Excel Basics',
    name_ta: 'மைக்ரோசாஃப்ட் எக்செல் அடிப்படை',
    description: 'Learn spreadsheets, formulas, charts, and data management.',
    description_ta: 'விரிதாள்கள், சூத்திரங்கள், வரைபடங்கள் மற்றும் தரவு மேலாண்மை கற்றுக்கொள்ளுங்கள்.',
    level: 'Beginner',
    courseLink: 'https://swayam.gov.in',
    platform: 'SWAYAM',
    duration: '4 weeks',
    cost: 'Free',
    interests: ['office', 'data', 'accounting', 'admin'],
  },
  {
    id: 's2',
    name: 'Python Programming',
    name_ta: 'பைதான் நிரலாக்கம்',
    description: 'Start coding with Python — variables, loops, functions, and basic projects.',
    description_ta: 'பைதான் நிரலாக்கம் — மாறிகள், மடக்குகள், செயல்பாடுகள் மற்றும் அடிப்படை திட்டங்கள்.',
    level: 'Beginner',
    courseLink: 'https://nptel.ac.in',
    platform: 'NPTEL',
    duration: '8 weeks',
    cost: 'Free',
    interests: ['coding', 'software', 'data', 'ai', 'tech'],
  },
  {
    id: 's3',
    name: 'Spoken English',
    name_ta: 'பேச்சு ஆங்கிலம்',
    description: 'Improve English speaking, grammar, and conversation skills.',
    description_ta: 'ஆங்கிலம் பேச்சு, இலக்கணம் மற்றும் உரையாடல் திறன்களை மேம்படுத்துங்கள்.',
    level: 'Beginner',
    courseLink: 'https://swayam.gov.in',
    platform: 'SWAYAM',
    duration: '6 weeks',
    cost: 'Free',
    interests: ['communication', 'jobs', 'career', 'english'],
  },
  {
    id: 's4',
    name: 'Digital Marketing',
    name_ta: 'டிஜிட்டல் சந்தைப்படுத்தல்',
    description: 'Learn SEO, social media marketing, and online advertising basics.',
    description_ta: 'SEO, சமூக ஊடக சந்தைப்படுத்தல் மற்றும் ஆன்லைன் விளம்பர அடிப்படைகள்.',
    level: 'Beginner',
    courseLink: 'https://www.nsdcindia.org',
    platform: 'NSDC',
    duration: '4 weeks',
    cost: 'Low-cost',
    interests: ['marketing', 'business', 'social-media', 'startup'],
  },
  {
    id: 's5',
    name: 'Tally / Accounting',
    name_ta: 'டாலி / கணக்கியல்',
    description: 'Learn Tally ERP for bookkeeping, GST filing, and accounting.',
    description_ta: 'புத்தக பதிவு, GST தாக்கல் மற்றும் கணக்கியலுக்கு Tally ERP கற்றுக்கொள்ளுங்கள்.',
    level: 'Beginner',
    courseLink: 'https://www.nsdcindia.org',
    platform: 'NSDC',
    duration: '6 weeks',
    cost: 'Low-cost',
    interests: ['accounting', 'finance', 'office', 'jobs'],
  },
  {
    id: 's6',
    name: 'Web Development (HTML/CSS)',
    name_ta: 'வலை வடிவமைப்பு (HTML/CSS)',
    description: 'Build websites with HTML, CSS, and basic JavaScript.',
    description_ta: 'HTML, CSS மற்றும் அடிப்படை JavaScript மூலம் வலைத்தளங்கள் உருவாக்குங்கள்.',
    level: 'Beginner',
    courseLink: 'https://swayam.gov.in',
    platform: 'SWAYAM',
    duration: '6 weeks',
    cost: 'Free',
    interests: ['coding', 'web', 'design', 'tech', 'startup'],
  },
  {
    id: 's7',
    name: 'Data Entry & Computer Basics',
    name_ta: 'தரவு உள்ளீடு & கணினி அடிப்படை',
    description: 'Typing speed, MS Office, internet basics for office jobs.',
    description_ta: 'தட்டச்சு வேகம், MS Office, ஆபிஸ் வேலைகளுக்கு இணைய அடிப்படைகள்.',
    level: 'Beginner',
    courseLink: 'https://www.nsdcindia.org',
    platform: 'NSDC',
    duration: '4 weeks',
    cost: 'Low-cost',
    interests: ['office', 'data', 'admin', 'jobs'],
  },
  {
    id: 's8',
    name: 'Graphic Design Basics',
    name_ta: 'கிராபிக் வடிவமைப்பு அடிப்படை',
    description: 'Learn Canva, design principles, and social media graphics.',
    description_ta: 'Canva, வடிவமைப்பு கோட்பாடுகள் மற்றும் சமூக ஊடக கிராபிக்ஸ்.',
    level: 'Beginner',
    courseLink: 'https://swayam.gov.in',
    platform: 'SWAYAM',
    duration: '4 weeks',
    cost: 'Free',
    interests: ['design', 'creative', 'social-media', 'marketing'],
  },
];

const qualifications = [
  { value: '8th', label: '8th Class / 8 ஆம் வகுப்பு' },
  { value: '10th', label: '10th / SSLC' },
  { value: '12th', label: '12th / HSC' },
  { value: 'ug', label: 'Undergraduate / இளநிலை' },
  { value: 'pg', label: 'Postgraduate / முதுநிலை' },
  { value: 'working', label: 'Working / வேலை செய்கிறேன்' },
];

const interestOptions = [
  { value: 'coding', label: 'Coding / நிரலாக்கம்' },
  { value: 'office', label: 'Office Work / அலுவலகம்' },
  { value: 'marketing', label: 'Marketing / சந்தைப்படுத்தல்' },
  { value: 'design', label: 'Design / வடிவமைப்பு' },
  { value: 'accounting', label: 'Accounting / கணக்கியல்' },
  { value: 'communication', label: 'Communication / தொடர்பாடல்' },
  { value: 'data', label: 'Data / தரவு' },
  { value: 'tech', label: 'Technology / தொழில்நுட்பம்' },
];

export function Skills({ lang }: { lang: Lang }) {
  const [qualification, setQualification] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [results, setResults] = useState<Skill[]>([]);
  const [searched, setSearched] = useState(false);

  const toggleInterest = (val: string) => {
    setInterests(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
  };

  const suggest = () => {
    let matches: Skill[];
    if (interests.length === 0) {
      matches = skillsData.slice(0, 5);
    } else {
      matches = skillsData
        .map(s => ({ skill: s, score: s.interests.filter(i => interests.includes(i)).length }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(x => x.skill);
    }
    if (matches.length < 3) {
      const remaining = skillsData.filter(s => !matches.includes(s));
      matches = [...matches, ...remaining].slice(0, 5);
    }
    setResults(matches);
    setSearched(true);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="section-title">{t(lang, 'skillsTitle')}</h1>
        <p className="text-ink-500 mt-1">{t(lang, 'skillsSub')}</p>
      </div>

      {/* Input form */}
      <div className="card p-6 space-y-4 animate-fade-in-up">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">{t(lang, 'askQualification')}</label>
          <div className="flex flex-wrap gap-2">
            {qualifications.map(q => (
              <button
                key={q.value}
                onClick={() => setQualification(q.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                  qualification === q.value
                    ? 'border-sdg-blue bg-sdg-blue/10 text-sdg-blue'
                    : 'border-ink-300 text-ink-600 hover:border-sdg-blue'
                }`}
              >
                {lang === 'ta' ? q.label.split(' / ')[1] || q.label : q.label.split(' / ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">{t(lang, 'askInterests')}</label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => toggleInterest(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                  interests.includes(opt.value)
                    ? 'border-sdg-teal bg-sdg-teal/10 text-sdg-teal-dark'
                    : 'border-ink-300 text-ink-600 hover:border-sdg-teal'
                }`}
              >
                {lang === 'ta' ? opt.label.split(' / ')[1] || opt.label : opt.label.split(' / ')[0]}
              </button>
            ))}
          </div>
        </div>

        <button onClick={suggest} className="btn-orange">
          <Sparkles size={18} /> {t(lang, 'suggestSkills')}
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-3 animate-fade-in-up">
          <h2 className="text-lg font-bold text-ink-800">{t(lang, 'skillResults')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((s, i) => {
              const name = lang === 'ta' ? s.name_ta : s.name;
              const desc = lang === 'ta' ? s.description_ta : s.description;
              return (
                <div key={s.id} className="card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sdg-orange to-sdg-orange-light flex items-center justify-center flex-shrink-0">
                      <Wrench size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-ink-800">{name}</h3>
                      <p className="text-sm text-ink-500 mt-1">{desc}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="badge bg-sdg-blue/10 text-sdg-blue">{s.platform}</span>
                        <span className="badge bg-sdg-teal/10 text-sdg-teal-dark">{s.level}</span>
                        <span className="badge bg-ink-100 text-ink-600">{s.duration}</span>
                        <span className="badge bg-sdg-orange/10 text-sdg-orange-dark">{s.cost}</span>
                      </div>
                      <a href={s.courseLink} target="_blank" rel="noopener noreferrer" className="btn-teal text-sm mt-3">
                        <Play size={16} /> {t(lang, 'startLearning')} <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course platforms */}
      <div className="card p-6 space-y-4 animate-fade-in">
        <div>
          <h3 className="font-bold text-ink-800">Free / Low-Cost Learning Platforms</h3>
          <div className="flex flex-wrap gap-3 mt-3">
            <a href="https://swayam.gov.in" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              SWAYAM <ExternalLink size={14} />
            </a>
            <a href="https://nptel.ac.in" target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
              NPTEL <ExternalLink size={14} />
            </a>
            <a href="https://www.nsdcindia.org" target="_blank" rel="noopener noreferrer" className="btn-orange text-sm">
              NSDC <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-ink-800 flex items-center gap-2 mb-3"><Youtube size={18} className="text-red-500" /> YouTube Tutorials</h3>
          <div className="flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=QqZJLfmckG8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              How to Register & Enroll in SWAYAM Courses
            </a>
            <a href="https://www.youtube.com/watch?v=9mWTEBZ6oUc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              How to Enroll for SWAYAM Courses 2026
            </a>
            <a href="https://www.youtube.com/watch?v=IL2Nxrk7mWo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              SWAYAM NPTEL Course Registration Process
            </a>
            <a href="https://www.youtube.com/watch?v=WTWYbX3N4J0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sdg-blue hover:underline">
              <Youtube size={16} className="text-red-500 flex-shrink-0" />
              NPTEL Registration 2026 Complete Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
