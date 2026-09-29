import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { t, type Lang } from '@/i18n/translations';

interface FAQ {
  q: string;
  a: string;
  q_ta: string;
  a_ta: string;
}

const faqs: FAQ[] = [
  {
    q: 'What is SDG 10 and why does it matter?',
    a: 'SDG 10 (Reduced Inequalities) is a UN Sustainable Development Goal that aims to reduce inequality within and among countries by 2030. This app helps students and workers in Tamil Nadu access equal opportunities in education and employment.',
    q_ta: 'SDG 10 என்றால் என்ன, ஏன் முக்கியம்?',
    a_ta: 'SDG 10 (ஏற்றத்தாழ்வைக் குறைத்தல்) என்பது ஐக்கிய நாடுகளின் நிலையான வளர்ச்சி இலக்கு ஆகும். இது 2030க்குள் நாடுகளுக்குள் மற்றும் நாடுகளுக்கு இடையே ஏற்றத்தாழ்வைக் குறைக்க நோக்கம் கொண்டுள்ளது. இந்த செயலி தமிழ்நாட்டில் மாணவர்கள் மற்றும் தொழிலாளர்களுக்கு கல்வி மற்றும் வேலைவாய்ப்பில் சம வாய்ப்புகளை அணுக உதவுகிறது.',
  },
  {
    q: 'How do I find scholarships that match my profile?',
    a: 'Go to the Scholarships page and use the filters for category (OC/BC/MBC/SC/ST), family income, gender, and education level. The app will show matching schemes from 30+ scholarships. You can also ask Arthur, the AI assistant, for personalized recommendations.',
    q_ta: 'எனது தகுதிக்கு ஏற்ற உதவித்தொகையை எப்படி கண்டுபிடிப்பது?',
    a_ta: 'உதவித்தொகை பக்கத்திற்குச் சென்று வகை, குடும்ப வருமானம், பாலினம், மற்றும் கல்வி நிலை வடிகட்டிகளைப் பயன்படுத்தவும். 30+ உதவித்தொகைகளிலிருந்து பொருத்தமான திட்டங்கள் காட்டப்படும். AI உதவியாளர் ஆர்தரிடமும் கேட்கலாம்.',
  },
  {
    q: 'What documents do I need to apply for scholarships?',
    a: 'Common documents include: Aadhaar card, community certificate, income certificate, mark sheets, bank passbook, and passport-size photos. Some scholarships may require additional documents like disability certificates or first-graduate certificates.',
    q_ta: 'உதவித்தொகை விண்ணப்பிக்க என்ன ஆவணங்கள் தேவை?',
    a_ta: 'பொதுவான ஆவணங்கள்: ஆதார் அட்டை, சமூக சான்றிதழ், வருமான சான்றிதழ், மதிப்பெண் சான்றிதழ்கள், வங்கி பாஸ்புக், மற்றும் பாஸ்போர்ட் அளவு புகைப்படங்கள். சில உதவித்தொகைகளுக்கு கூடுதல் ஆவணங்கள் தேவைப்படலாம்.',
  },
  {
    q: 'How does TNEA counselling work?',
    a: 'TNEA counselling has 5 steps: 1) Registration on the TNEA portal, 2) Certificate verification at a designated center, 3) Choice filling (selecting preferred colleges and branches), 4) Allotment (checking your seat result and paying the fee), 5) Reporting to the allotted college with original documents. Use the TNEA Helper page for step-by-step guidance.',
    q_ta: 'TNEA ஆலோசனை எப்படி செயல்படுகிறது?',
    a_ta: 'TNEA ஆலோசனை 5 படிகளைக் கொண்டுள்ளது: 1) TNEA போர்ட்டலில் பதிவு, 2) சான்றிதழ் சரிபார்ப்பு, 3) தேர்வு நிரப்புதல், 4) ஒதுக்கீடு, 5) கல்லூரியில் சேர்க்கை. TNEA வழிகாட்டி பக்கத்தைப் பயன்படுத்தவும்.',
  },
  {
    q: 'Can I use this app in Tamil?',
    a: 'Yes! The entire app works in both English and Tamil. Use the language toggle in the navbar (EN / த) to switch. Arthur, the AI assistant, also responds in both languages.',
    q_ta: 'இந்த செயலியை தமிழில் பயன்படுத்தலாமா?',
    a_ta: 'ஆம்! முழு செயலியும் ஆங்கிலம் மற்றும் தமிழ் இரண்டிலும் செயல்படுகிறது. நேவிகேசன் பட்டையில் உள்ள மொழி மாற்றியை (EN / த) பயன்படுத்தி மாற்றவும். AI உதவியாளர் ஆர்தரும் இரு மொழிகளிலும் பதிலளிக்கிறார்.',
  },
  {
    q: 'Who is Arthur and what can he help with?',
    a: 'Arthur is the app\'s AI assistant — a friendly elephant mascot who guides you on SDG 10 topics. He can help you find scholarships, understand TNEA counselling, suggest skills to learn, and point you to job opportunities. Click the "Chat with Arthur" button at the bottom-right of any page to start.',
    q_ta: 'ஆர்தர் யார், எதில் உதவ முடியும்?',
    a_ta: 'ஆர்தர் இந்த செயலியின் AI உதவியாளர் — ஒரு நட்பான யானை சின்னம். உதவித்தொகை கண்டுபிடித்தல், TNEA ஆலோசனை, திறன் பரிந்துரைகள், மற்றும் வேலை வாய்ப்புகளில் உதவுவார். எந்தப் பக்கத்திலும் வலது கீழ் மூலையில் உள்ள "ஆர்தருடன் அரட்டை" பொத்தானை அழுத்தவும்.',
  },
  {
    q: 'Are the scholarship links official?',
    a: 'We provide links to official government portals like scholarships.gov.in, myscheme.gov.in, and tneaonline.org. However, always verify details and deadlines on the official websites, as schemes can change. This app is an educational guide, not an official government portal.',
    q_ta: 'உதவித்தொகை இணைப்புகள் அதிகாரப்பூர்வமானவையா?',
    a_ta: 'scholarships.gov.in, myscheme.gov.in, tneaonline.org போன்ற அதிகாரப்பூர்வ அரசு தளங்களுக்கான இணைப்புகளை வழங்குகிறோம். ஆனால் எப்போதும் அதிகாரப்பூர்வ தளங்களில் விவரங்கள் மற்றும் காலக்கெடுவை சரிபார்க்கவும். இது ஒரு கல்வி வழிகாட்டி, அதிகாரப்பூர்வ அரசு தளம் அல்ல.',
  },
];

interface FAQsProps {
  lang: Lang;
}

export function FAQs({ lang }: FAQsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const isTa = lang === 'ta';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sdg-blue to-sdg-teal mb-4 shadow-lg shadow-sdg-blue/30">
          <HelpCircle size={32} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink-800 mb-2">
          {isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-ink-500 text-sm max-w-2xl mx-auto">
          {isTa
            ? 'SDG 10, உதவித்தொகை, TNEA, மற்றும் இந்த செயலி பற்றிய பொதுவான கேள்விகள்.'
            : 'Common questions about SDG 10, scholarships, TNEA, and this app.'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                isOpen ? 'border-sdg-teal/40 shadow-md' : 'border-ink-200 hover:border-ink-300'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-ink-800 text-sm md:text-base">
                  {isTa ? faq.q_ta : faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-sdg-teal-dark transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-4 text-ink-600 text-sm leading-relaxed">
                  {isTa ? faq.a_ta : faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-sdg-orange/5 border border-sdg-orange/20">
        <HelpCircle size={20} className="text-sdg-orange flex-shrink-0 mt-0.5" />
        <p className="text-sm text-ink-600">
          {isTa
            ? 'உங்கள் கேள்விக்கு பதில் இல்லையா? ஆர்தரிடம் கேளுங்கள் — வலது கீழ் மூலையில் உள்ள சாட் பொத்தானை அழுத்தவும்.'
            : 'Didn\'t find your answer? Ask Arthur — click the chat button at the bottom-right corner.'}
        </p>
      </div>
    </div>
  );
}
