import schemesData from '@/data/schemes.json';
import jobsData from '@/data/jobs.json';
import trainedQAData from '@/data/trained_qa.json';
import type { Lang } from '@/i18n/translations';

export interface SchemeItem {
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

export interface JobItem {
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

export interface TrainedQAItem {
  id: string;
  category: string;
  title: string;
  sample_questions_en: string[];
  sample_questions_ta: string[];
  sample_questions_tanglish: string[];
  expected_answer_en: string;
  expected_answer_ta: string;
  keywords: string[];
}

const STORAGE_KEY = 'samam_gemini_api_key';
export const SUPPORTED_MODELS = [
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash'
];

export function getStoredGeminiKey(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch {}
  return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
}

export function saveStoredGeminiKey(key: string): void {
  try {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}

export function hasGeminiKey(): boolean {
  return !!getStoredGeminiKey();
}

// Grounding / RAG: Search local dataset for relevant schemes, jobs, and trained benchmark QA
export function retrieveContext(query: string, lang: Lang): string {
  const q = query.toLowerCase();
  const schemes = schemesData as SchemeItem[];
  const jobs = jobsData as JobItem[];
  const trainedQAList = trainedQAData as TrainedQAItem[];

  let context = '=== VERIFIED SAMAM KNOWLEDGE BASE & TRAINING BENCHMARK ===\n';

  // 1. Match trained QA intents from the official benchmark document
  const matchedQA = trainedQAList.find(item => {
    // Check keywords
    const keywordMatch = item.keywords.some(kw => q.includes(kw.toLowerCase()));
    if (keywordMatch) return true;
    
    // Check sample questions
    const allSamples = [...item.sample_questions_en, ...item.sample_questions_ta, ...item.sample_questions_tanglish];
    return allSamples.some(s => {
      const sLower = s.toLowerCase();
      return q.includes(sLower) || sLower.includes(q);
    });
  });

  if (matchedQA) {
    context += `\n[EXACT APPROVED TRAINING BENCHMARK FOR THIS QUERY]:
Category: ${matchedQA.title}
Expected Answer in English: "${matchedQA.expected_answer_en}"
Expected Answer in Tamil: "${matchedQA.expected_answer_ta}"
MANDATORY INSTRUCTION: Deliver this exact benchmark guidance and tone when answering the user. Do not contradict or omit these key details.\n`;
  }

  // 2. Match schemes
  const matchedSchemes = schemes.filter(s => {
    const haystack = [
      s.name,
      s.name_ta,
      s.provider,
      s.benefits,
      s.benefits_ta,
      ...s.category,
      ...s.eligibility,
      ...s.tags,
      s.educationLevel,
      s.gender,
    ].join(' ').toLowerCase();

    return q.split(/\s+/).some(token => token.length > 2 && haystack.includes(token));
  }).slice(0, 3);

  // 3. Match jobs
  const matchedJobs = jobs.filter(j => {
    const haystack = [
      j.role,
      j.role_ta,
      j.company,
      j.location,
      j.type,
      ...j.skills,
      j.description,
      j.description_ta,
    ].join(' ').toLowerCase();

    return q.split(/\s+/).some(token => token.length > 2 && haystack.includes(token));
  }).slice(0, 2);

  if (matchedSchemes.length > 0) {
    context += '\n[VERIFIED RELEVANT SCHEMES / SCHOLARSHIPS]:\n';
    matchedSchemes.forEach(s => {
      const name = lang === 'ta' && s.name_ta ? s.name_ta : s.name;
      const benefits = lang === 'ta' && s.benefits_ta ? s.benefits_ta : s.benefits;
      context += `- **${name}** (${s.provider})\n`;
      context += `  Benefits: ${benefits}\n`;
      context += `  Category: ${s.category.join(', ')} | Gender: ${s.gender} | Education: ${s.educationLevel}\n`;
      if (s.incomeLimit > 0) context += `  Income Limit: ₹${s.incomeLimit.toLocaleString('en-IN')}/year\n`;
      context += `  Eligibility: ${s.eligibility.join('; ')}\n`;
      context += `  Official Portal: ${s.applyLink}\n`;
    });
  }

  if (matchedJobs.length > 0) {
    context += '\n[VERIFIED RELEVANT JOBS / INTERNSHIPS]:\n';
    matchedJobs.forEach(j => {
      const role = lang === 'ta' && j.role_ta ? j.role_ta : j.role;
      context += `- **${role}** at ${j.company} (${j.location})\n`;
      context += `  Stipend: ${j.stipend} | Type: ${j.type} | Skills: ${j.skills.join(', ')}\n`;
      context += `  Link: ${j.link}\n`;
    });
  }

  context += `\n[KEY TAMIL NADU OFFICIAL WEBSITES]:
• National Scholarship Portal (NSP): https://scholarships.gov.in
• myScheme Government Portal: https://myscheme.gov.in
• Tamil Nadu e-District / e-Sevai: https://edistricts.tn.gov.in
• TNEA Engineering Counselling: https://www.tneaonline.org
• Naan Mudhalvan Skill Portal: https://www.naanmudhalvan.tn.gov.in
• SWAYAM / NPTEL: https://swayam.gov.in
`;

  return context;
}

export function buildSystemInstruction(query: string, lang: Lang): string {
  const context = retrieveContext(query, lang);

  return `You are Geetha AI (கீதா AI), an empowering, culturally warm, empathetic female AI assistant for the SAMAM AI platform supporting citizens of Tamil Nadu, India.
Your mission is aligned with United Nations SDG 10: Reduced Inequalities. You help students, job seekers, and marginalized communities access government schemes, scholarships, TNEA counselling, career guidance, digital skills, and public welfare.

CORE IDENTITY & TONE:
- Be warm, encouraging, respectful, clear, and action-oriented.
- Use simple, accessible words suitable for first-time digital users or first-generation learners.
- When greeting, you can warmly say "வணக்கம்! SAMAM AI-க்கு உங்களை வரவேற்கிறோம். நான் உங்களுக்கு எப்படி உதவ வேண்டும்?" in Tamil or "Hello! Welcome to SAMAM AI. How can I help you today?" in English.

LANGUAGE ADAPTABILITY (CRITICAL):
- Seamlessly support English, Tamil (தமிழ்), and Tanglish (Tamil in Latin script).
- Current user UI language is: ${lang === 'ta' ? 'Tamil (தமிழ்)' : 'English'}.
- If the user asks in Tamil script, answer in fluent, respectful, natural Tamil (தமிழ்).
- If the user asks in Tanglish, reply in helpful Tanglish or Tamil.
- If the user asks in English, reply in crisp, clear English.

ACCURACY & KNOWLEDGE RULES:
- Use the verified data and exact benchmark training answers provided below.
- When citing a scheme, mention its eligibility conditions, benefits, and official apply link.
- For changing deadlines, unknown dates, or live admission cutoffs, NEVER fabricate dates. Deliver the exact trained guardrail: "I don't have a verified latest deadline available right now. Please check the official scholarship website before applying. I don't want to give you incorrect information." (or in Tamil: "தற்போது சரிபார்க்கப்பட்ட கடைசி தேதி என்னிடம் இல்லை. தவறான தகவலை வழங்க விரும்பவில்லை. விண்ணப்பிப்பதற்கு முன் அதிகாரப்பூர்வ இணையதளத்தில் சரிபார்க்கவும்.")
- Never ask for passwords, OTPs, Aadhaar numbers, or bank account details.

${context}`;
}

export async function testGeminiKey(apiKey: string): Promise<{ success: boolean; message: string }> {
  if (!apiKey || !apiKey.trim()) {
    return { success: false, message: 'Please enter an API key.' };
  }

  for (const model of SUPPORTED_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
          generationConfig: { maxOutputTokens: 10 }
        }),
      });

      if (res.ok) {
        return { success: true, message: `Connected to Google ${model} successfully!` };
      }
    } catch {}
  }

  return { success: false, message: 'Could not connect to Gemini models. Please check your key.' };
}

export async function askGeminiGeetha(
  messages: Array<{ role: 'user' | 'arthur'; content: string }>,
  latestQuery: string,
  lang: Lang
): Promise<string> {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const systemInstruction = buildSystemInstruction(latestQuery, lang);

  // Map messages to Gemini API format
  const formattedContents = messages.slice(-10).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  let lastError = null;

  for (const model of SUPPORTED_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && typeof candidateText === 'string' && candidateText.trim()) {
          return candidateText.trim();
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        lastError = new Error(errData?.error?.message || `Error ${response.status}`);
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to get response from Gemini API');
}
