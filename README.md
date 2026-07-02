# Voca

An AAC (Augmentative and Alternative Communication) app for people with expressive aphasia. Tap a few concepts — get a complete, natural sentence spoken aloud. Built for the CTRL-V Hackathon (accessibility theme).

## How it works

1. Tap 2–4 concept icons (e.g., Friend + Coffee + Tomorrow)
2. Hit **Generate** — Voca reconstructs a complete sentence via LLM
3. Tap **Speak** — the sentence is spoken aloud via the browser's built-in TTS
4. Switch profiles to hear how the same concepts sound in your voice

## Tech stack

- **Frontend:** React + Vite, Web Speech API (browser-native TTS)
- **Backend:** FastAPI (Python)
- **LLM inference:** Groq API (Llama 3, free tier)
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
cp .env.example .env          # add your GROQ_API_KEY
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Pre-demo checklist

1. Send a warm-up request to the backend `/generate` endpoint ~2 minutes before recording or presenting live (Render free tier may cold-start and add latency to the first request).
2. Open the app in a Chromium-based browser for best Web Speech API support.
3. Confirm both profiles (Alex, Jordan) produce visibly different phrasing on the same concept taps.
