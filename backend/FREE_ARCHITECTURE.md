# SAMAM AI — Free Backend Architecture

This project intentionally uses a zero-paid-service architecture for the hackathon/demo stage.

## Architecture

SAMAM React/Vite (GitHub Pages)
        |
        +--> Supabase REST/Postgres (database + RLS)
        |
        +--> Browser APIs (voice + geolocation)
        |
        +--> Google Maps browser API (only when the project's applicable free allowance is available)

## What is implemented

- Supabase-backed scholarship data.
- 2026–27 scholarship guide data and knowledge records.
- Geetha AI reads the scholarship guide from Supabase when configured.
- Local fallback knowledge keeps Geetha usable without Supabase.
- RLS is enabled for public read-only knowledge tables.
- GitHub Pages deployment is used for the frontend.
- No OpenAI/Anthropic API key is required for Geetha's current rule-based/local knowledge mode.
- No paid Redis server is required.
- No Pinecone paid vector database is required.
- No paid FastAPI/Node hosting is required.

## What is deliberately NOT implemented

The requested production architecture included FastAPI/Node, Redis, Pinecone/Qdrant and paid/external LLM providers. Those components require an always-on backend or may create usage charges. They are therefore not added to this free version.

The free equivalent is:

Frontend -> Supabase Postgres/API -> local/rule-based Geetha

This is enough for the current scholarship, schemes, TNEA, services and accessibility prototype.

## Required setup

The SQL in supabase/schema.sql must be executed once in the user's Supabase SQL Editor. Committing SQL to GitHub does not execute it in Supabase.

The GitHub Actions deployment expects these repository secrets when those integrations are enabled:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_GOOGLE_MAPS_API_KEY (only for Maps)

Never put a service-role key or any private server credential in the frontend.

## Cost guardrail

Do not add a paid plan, paid API credits, paid hosting, or a credit-card-required service as part of the free implementation.

Supabase's current Free plan is $0 and has quotas; GitHub Pages is available with GitHub Free for public repositories. Free allowances are not an unlimited-cost guarantee, so usage should remain within provider limits.
