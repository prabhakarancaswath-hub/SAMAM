# Geetha AI secure API setup

This branch adds a server-side proxy at `api/geetha-chat.ts`. It keeps the provider token out of the browser and public frontend bundle.

## Server-only environment variables

Set these in your backend hosting dashboard (not in public GitHub files):

- `OLLAMA_API_KEY`: the private provider token
- `OLLAMA_MODEL`: model name (defaults to `deepseek-v4.1-flash`)
- `SAMAM_ALLOWED_ORIGIN`: the exact origin of the SAMAM frontend

## Frontend variable

- `VITE_GEETHA_API_URL`: full HTTPS URL to the deployed endpoint `/api/geetha-chat`. This value is public and must not contain secrets.

If this variable is blank or the API request fails, Geetha falls back to her existing local response logic.

## Notes

- Never commit real tokens, `.env` files, or private credentials.
- Rotate any token pasted into chats or committed to a repository.
- This endpoint is intended for Vercel deployment. GitHub Pages alone cannot execute the serverless `api/` route.
- Provider free-tier limits, model availability, and costs can change. Verify them before using.
- The endpoint limits message count and content size and returns generic upstream errors to avoid leaking provider details.
