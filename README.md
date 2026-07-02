# Voca

> **Tap a few concepts. Get a complete sentence. Speak — in your own voice.**

An AAC (Augmentative and Alternative Communication) app for people with expressive aphasia.
Over **2 million Americans** live with aphasia after stroke or brain injury — a condition that
leaves intent fully intact but makes producing words and sentences nearly impossible.
Voca inverts the AAC model: instead of asking users to construct a sentence (the very thing
aphasia makes hard), users tap disconnected concepts and Voca reconstructs the full sentence
for them — personalized to how they actually talk.

## Demo

> **[Live demo link — add after deployment]**
>
> Suggested demo path: tap **Emergency → Chest Pain + Now + Help Me** → Generate → Speak.
> Then switch profile (Jake ↔ Maria) and Generate again to see personalized phrasing.

## How it works

| Step | What happens |
|------|-------------|
| 1. Tap concepts | Select 2–4 icons across categories (Emergency, People, Food, Places, Needs, Health, Emotions) |
| 2. Generate | Voca sends your concepts + active profile to an LLM which reconstructs a complete, natural sentence |
| 3. Speak | Tap **Speak** — the sentence plays aloud via ElevenLabs HD voice (or browser TTS fallback). Tap 👎 to get a different option. |

## Key differentiators

- **Reconstructs meaning, not text.** `Chest Pain + Now + Help` has no predictive-text completion — Voca produces "My chest is hurting right now, please help me."
- **Live personalization.** Switch between Jake (casual, TBI recovery) and Maria (formal, stroke survivor) — identical taps, genuinely different phrasing driven by real prompt injection.
- **No-repeat correction.** Tap 👎 as many times as needed — Voca never returns a previously rejected sentence.
- **Emergency category.** The highest-stakes use case (health emergencies) is front and center, not buried.

## Tech stack

- **Frontend:** React + Vite, mobile-first, high-contrast mode
- **Backend:** FastAPI (Python) with real Groq streaming (`stream=True`)
- **LLM inference:** Groq API — Llama 3.3 70B, free tier, sub-1s generation
- **TTS:** ElevenLabs (HD, profile-matched voice) with Web Speech API fallback
- **Frontend hosting:** Vercel (free tier)
- **Backend hosting:** Render (free tier)

## Repository structure

```
/frontend   → React app (deployed to Vercel)
/backend    → FastAPI app (deployed to Render)
```

## Local development

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env          # add GROQ_API_KEY and ELEVENLABS_API_KEY
uvicorn main:app --reload --port 8001
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env          # sets VITE_API_URL=http://localhost:8001
npm run dev
```

## Pre-demo checklist

1. Send a warm-up request to `/generate` ~2 minutes before recording (Render free tier cold-starts).
2. Open in a Chromium-based browser for best Web Speech API support.
3. Demo path: Emergency → Chest Pain + Now + Help Me → Generate → Speak → switch to Maria → Generate again.
4. Confirm both profiles produce visibly different phrasing on identical concept taps.
