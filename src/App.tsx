import { useState, useEffect } from 'react';
import { Navbar, type Page } from '@/components/Navbar';
import { VoiceChat } from '@/components/VoiceChat';
import { ArthurChatbot } from '@/components/ArthurChatbot';
import { Home } from '@/pages/Home';
import { Scholarships } from '@/pages/Scholarships';
import { TNEA } from '@/pages/TNEA';
import { Skills } from '@/pages/Skills';
import { Jobs } from '@/pages/Jobs';
import { About } from '@/pages/About';
import { FAQs } from '@/pages/FAQs';
import { type Lang, t } from '@/i18n/translations';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [page, setPage] = useState<Page>('home');
  const [responseText, setResponseText] = useState('');
  const [arthurOpen, setArthurOpen] = useState(false);

  // Set document language for Tamil font rendering
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleTranscript = (text: string) => {
    // Simple response: acknowledge the query and suggest relevant page
    const lower = text.toLowerCase();
    let response = '';
    let targetPage: Page = page;

    if (lower.includes('scholar') || lower.includes('உதவித்தொகை')) {
      targetPage = 'scholarships';
      response = lang === 'ta'
        ? 'உதவித்தொகை பக்கத்திற்கு செல்கிறேன். உங்கள் வகை, வருமானம், பாலினம் மற்றும் கல்வி நிலையைத் தேர்வு செய்யவும்.'
        : 'Taking you to the Scholarships page. Please select your category, income, gender, and education level to find matching schemes.';
    } else if (lower.includes('tnea') || lower.includes('counselling') || lower.includes('ஆலோசனை') || lower.includes('college')) {
      targetPage = 'tnea';
      response = lang === 'ta'
        ? 'TNEA வழிகாட்டி பக்கத்திற்கு செல்கிறேன். உங்கள் மதிப்பெண்கள், வகை, மற்றும் விருப்பப் படிப்பை உள்ளிடவும்.'
        : 'Taking you to the TNEA Helper page. Enter your marks, category, and preferred branch to find matching colleges.';
    } else if (lower.includes('skill') || lower.includes('learn') || lower.includes('திறன்') || lower.includes('கற்க')) {
      targetPage = 'skills';
      response = lang === 'ta'
        ? 'திறன் உதவியாளர் பக்கத்திற்கு செல்கிறேன். உங்கள் தகுதி மற்றும் ஆர்வங்களைத் தேர்வு செய்யவும்.'
        : 'Taking you to the Skills page. Select your qualification and interests to get skill recommendations.';
    } else if (lower.includes('job') || lower.includes('intern') || lower.includes('வேலை') || lower.includes('பயிற்சி')) {
      targetPage = 'jobs';
      response = lang === 'ta'
        ? 'வேலை பலகைக்கு செல்கிறேன். உங்கள் பகுதி மற்றும் வேலை வகையை வடிகட்டவும்.'
        : 'Taking you to the Jobs board. Filter by your location and job type to find opportunities.';
    } else if (lower.includes('about') || lower.includes('sdg') || lower.includes('பற்றி')) {
      targetPage = 'about';
      response = lang === 'ta'
        ? 'SDG 10 பற்றி பக்கத்திற்கு செல்கிறேன்.'
        : 'Taking you to the About SDG 10 page.';
    } else if (lower.includes('home') || lower.includes('முகப்பு') || lower.includes('start')) {
      targetPage = 'home';
      response = lang === 'ta' ? 'முகப்பு பக்கத்திற்கு செல்கிறேன்.' : 'Taking you to the Home page.';
    } else {
      response = lang === 'ta'
        ? 'நான் உதவித்தொகை, TNEA, திறன்கள், மற்றும் வேலைகள் பற்றி உதவ முடியும். தயவுசெய்து மேலே உள்ள பக்கங்களைப் பயன்படுத்தவும்.'
        : 'I can help with scholarships, TNEA counselling, skills, and jobs. Please use the navigation above to explore.';
    }

    setResponseText(response);
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ink-50" lang={lang}>
      <Navbar lang={lang} setLang={setLang} page={page} setPage={setPage} onArthur={() => setArthurOpen(true)} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Voice Chat — visible on all pages except home */}
        {page !== 'home' && (
          <div className="mb-6">
            <VoiceChat lang={lang} onTranscript={handleTranscript} responseText={responseText} />
          </div>
        )}

        {page === 'home' && <Home lang={lang} setPage={setPage} />}
        {page === 'scholarships' && <Scholarships lang={lang} />}
        {page === 'tnea' && <TNEA lang={lang} />}
        {page === 'skills' && <Skills lang={lang} />}
        {page === 'jobs' && <Jobs lang={lang} />}
        {page === 'about' && <About lang={lang} />}
        {page === 'faqs' && <FAQs lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-200 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-sdg-orange/5 border border-sdg-orange/20 mb-6">
            <ShieldCheck size={20} className="text-sdg-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm text-ink-600">{t(lang, 'verifyNote')}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sdg-blue via-sdg-teal to-sdg-orange flex items-center justify-center">
                <span className="text-white font-bold text-xs">10</span>
              </div>
              <div>
                <p className="font-bold text-ink-800 text-sm">SDG 10 Assistant</p>
                <p className="text-xs text-ink-500">Reducing Inequalities — Tamil Nadu</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="text-sdg-blue hover:underline">NSP</a>
              <a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="text-sdg-blue hover:underline">myScheme</a>
              <a href="https://tneaonline.org" target="_blank" rel="noopener noreferrer" className="text-sdg-blue hover:underline">TNEA</a>
              <a href="https://swayam.gov.in" target="_blank" rel="noopener noreferrer" className="text-sdg-blue hover:underline">SWAYAM</a>
            </div>
          </div>
          <p className="text-center text-xs text-ink-400 mt-6">
            Built for SDG 10 — Reduced Inequalities. Always verify on official government websites.
          </p>
        </div>
      </footer>

      <ArthurChatbot lang={lang} setLang={setLang} open={arthurOpen} onOpenChange={setArthurOpen} />
    </div>
  );
}

export default App;
