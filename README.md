# SDG10 Assistant — Reducing Inequalities

A bilingual (Tamil + English) AI voice/chat assistant web app for **SDG 10 (Reduced Inequalities)** that helps students and workers in Tamil Nadu access scholarships, TNEA counselling, skill development, and job opportunities.

## Features

1. **Scholarships & Government Schemes** — Searchable knowledge base of 31+ Indian/Tamil Nadu scholarships and welfare schemes with eligibility, benefits, and official apply links. AI-style match finder asks for category, income, gender, and education level to suggest 3–5 matching schemes.

2. **TNEA Counselling Helper** — Step-by-step guidance for TNEA engineering counselling (registration, certificate verification, choice filling, allotment, reporting). Rule-based college recommender suggests 5–10 colleges based on marks, category, preferred branch, city, and budget with past cutoff ranges.

3. **Skill-Gap Assistant** — Suggests 3–5 skills (Excel, Python, English speaking, digital marketing, etc.) with free/low-cost course links from SWAYAM, NPTEL, and NSDC based on the user's qualification and interests.

4. **Small Jobs / Internships Board** — Curated jobs board with role, location, stipend/salary, contact, and link. Shows top 5 matches with search and filter by location and job type.

5. **Voice + Chat UX** — Language selector (Tamil/English), microphone button for voice input (Web Speech API SpeechRecognition), text-to-speech toggle (Web Speech API speechSynthesis), Repeat and Slower controls, and a fallback verification message.

## Tech Stack

- **React** + **Vite** + **TypeScript**
- **Tailwind CSS** with custom SDG10 theme (Deep Blue #0F4C81, Teal #20B2AA, Orange #FF6F3C)
- **Lucide React** for icons
- **Web Speech API** for STT (SpeechRecognition) and TTS (speechSynthesis)
- Client-side JSON/CSV knowledge base — no backend required

## How to Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## How to Update the Knowledge Base

All data is stored as static files in `src/data/`:

### `schemes.json`
Array of scholarship/scheme objects. Each has:
- `id`, `name` (English), `name_ta` (Tamil)
- `category` — array of categories (OC, BC, MBC, SC, ST, OBC)
- `gender` — "all", "male", or "female"
- `incomeLimit` — annual family income limit in ₹ (0 = no limit)
- `educationLevel` — "pre-matric", "post-matric", "undergraduate", "postgraduate"
- `provider`, `benefits`, `benefits_ta`, `eligibility` (array), `applyLink`, `tags`

To add a new scheme, copy an existing object and modify the fields.

### `colleges.csv`
CSV file with columns: `college_id, college_name, city, branch, category_cutoff_min, category_cutoff_max, fees_per_year, category_allowed`

To add colleges, append rows following the same format.

### `jobs.json`
Array of job objects. Each has:
- `id`, `role`, `role_ta`, `company`, `location`, `stipend`, `type`, `contact`, `link`, `skills` (array), `description`, `description_ta`

To add jobs, copy an existing object and modify the fields.

### `guides.md`
Markdown file with YouTube tutorial links for NSP, myScheme, TNEA, and skill platforms. Replace `example-*` URLs with actual YouTube links.

## Project Structure

```
src/
├── components/
│   ├── Logo.tsx          — Animated SDG10 logo
│   ├── Navbar.tsx        — Navigation with language selector
│   └── VoiceChat.tsx     — Voice input + TTS controls
├── data/
│   ├── schemes.json      — 31 scholarships/schemes
│   ├── colleges.csv      — 50 engineering colleges
│   ├── jobs.json         — 12 job/internship listings
│   └── guides.md         — YouTube tutorial links
├── hooks/
│   └── useSpeech.ts      — TTS + STT hooks
├── i18n/
│   └── translations.ts   — Tamil + English translations
├── pages/
│   ├── Home.tsx          — Landing page with feature cards
│   ├── Scholarships.tsx  — Scholarship search + AI match finder
│   ├── TNEA.tsx          — Counselling steps + college finder
│   ├── Skills.tsx        — Skill gap assistant
│   ├── Jobs.tsx          — Jobs board
│   └── About.tsx         — SDG 10 information
├── App.tsx               — Main app with navigation
├── main.tsx              — Entry point
└── index.css            — Tailwind + custom styles
```

## Voice Features

- **Speech-to-Text**: Uses `webkitSpeechRecognition` / `SpeechRecognition`. Falls back to text input if unsupported.
- **Text-to-Speech**: Uses `speechSynthesis`. Toggle on/off, with Repeat, Slower, and Faster controls.
- **Language-aware**: TTS and STT use `ta-IN` for Tamil and `en-US` for English.

## Important Note

This is an educational tool. Always verify information on official government websites:
- National Scholarship Portal: https://scholarships.gov.in
- myScheme: https://myscheme.gov.in
- TNEA: https://tneaonline.org
- TNEA Cutoff: https://cutoff.tneaonline.org
- SWAYAM: https://swayam.gov.in
- NPTEL: https://nptel.ac.in
- NSDC: https://www.nsdcindia.org

## License

Educational use. Built for SDG 10 — Reduced Inequalities.
