# Geetha AI — Free API Integration & Training Guide

This guide explains how Geetha AI connects to free AI providers (such as Google Gemini Flash) and how her knowledge training/grounding works.

## 1. Free AI Engine (Google Gemini 1.5 Flash)

Geetha AI is powered by Google Gemini 1.5 Flash (free tier: 15 requests/minute, 1,500 requests/day, zero credit card required):
- **Multilingual Mastery**: Native support for **Tamil (தமிழ்)**, **English**, and **Tanglish** (Tamil written in Latin script).
- **Zero-cost**: Free for hackathons, testing, and community deployments.

### How Users Connect Their Key in the Web App
1. Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open SAMAM and tap **Ask Geetha AI**.
3. In the top bar, click **"✨ Connect Free API"**.
4. Paste your API key and click **Save & Connect AI**.
5. The key is stored locally in the user's browser `localStorage` and is never exposed in the public Git repository.

---

## 2. How Geetha is "Trained" (RAG Grounding)

Instead of slow and costly model fine-tuning, Geetha utilizes **Retrieval-Augmented Generation (RAG) & Dynamic Knowledge Grounding**:

1. **Context Extraction**:
   When a user submits a query (e.g. *"BC engineering scholarship in Tamil Nadu"*), `retrieveContext()` automatically queries:
   - `src/data/schemes.json` (31+ Tamil Nadu & National scholarships)
   - `src/data/colleges.json` / `colleges.csv` (TNEA college cutoffs & counselling flow)
   - `src/data/jobs.json` (Curated local jobs & internships)
   - Official Tamil Nadu portals (`scholarships.gov.in`, `tneaonline.org`, `myscheme.gov.in`, etc.)

2. **System Instruction & Guardrails**:
   Geetha is trained with the system persona in `src/lib/gemini.ts`:
   - Warm, encouraging, empathetic female persona aligned with **UN SDG 10 (Reduced Inequalities)**.
   - Always provides exact eligibility criteria, income caps, and official application links.
   - Strict rule against hallucinating changing dates or deadlines; refers to official portals.
   - Safety guardrail: Never asks for Aadhaar numbers, OTPs, or passwords.

3. **Graceful Fallbacks**:
   - If an API key is connected &rarr; Uses Gemini AI with grounded context.
   - If offline or no key &rarr; Falls back seamlessly to built-in rule-based knowledge engine.

---

## 3. Serverless Proxy Deployment (Optional for Vercel)

If you prefer to deploy a backend proxy on Vercel so users do not need to enter their own key:
- Add server-side environment variables in your Vercel Dashboard:
  - `GEMINI_API_KEY`: Your private Google Gemini key
  - `SAMAM_ALLOWED_ORIGIN`: `https://prabhakarancaswath-hub.github.io`
- Set `VITE_GEETHA_API_URL` in your frontend environment.
