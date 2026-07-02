# CTRL-V Hackathon — Submission Draft

## Project name
Voca

## One-line description
Concept-tap AAC app that reconstructs complete, natural sentences for people with expressive aphasia — no typing, no sentence assembly, just speak.

## Problem
Over **2.5 million Americans** (50 million worldwide) live with expressive aphasia following stroke or traumatic brain injury. They know exactly what they want to say — their comprehension is intact — but they cannot produce the words or construct sentences.

Existing AAC (Augmentative and Alternative Communication) tools like TouchChat and Proloquo2Go still require users to drag, arrange, or select word-by-word to build sentences. This is precisely what aphasia makes impossible.

## Solution
Voca inverts the AAC model entirely:

1. **Tap concepts** — 49 concept icons across 9 categories (Emergency, Basics, People, Food, Places, Needs, Health, Emotions, Body). No typing. No sentence construction.
2. **Generate** — Voca sends the concept set plus an active user profile to Llama 3.3 70B via Groq. The LLM reconstructs what the person *meant* to say as three complete, natural-language options, streamed progressively.
3. **Speak** — Tap any option to speak it aloud via ElevenLabs HD voice (per-profile voice mapping) or Web Speech API fallback. The sentence sounds like *you*, not a robot.

## Why it's different
- **Reconstructs meaning, not text.** `Chest Pain + Help` becomes "My chest is hurting right now. Please call for help immediately." — not autocomplete, not word prediction.
- **Live persona system.** Switch between Jake (casual, TBI recovery, Josh voice) and Maria (formal, stroke survivor, Rachel voice). Identical concept taps → genuinely different phrasing, different voice.
- **Emergency-first.** Life-critical phrases (Chest Pain, Can't Breathe, Call 911) are always visible and speak instantly with no AI wait.
- **No-repeat regeneration.** Rejected sentences are permanently excluded from subsequent generations.
- **Basics vocabulary.** Yes, No, Please, Thank You, Stop, Wait, More, Repeat — instant single-tap responses for high-frequency communication needs.
- **PWA.** Installable on mobile, works offline for emergency phrases.

## Tech stack
- **Frontend:** React 18 + Vite, Framer Motion, Space Grotesk, neobrutalism design system
- **Backend:** FastAPI (Python), real Groq streaming (`stream=True`, SSE), ElevenLabs TTS
- **LLM:** Groq API — Llama 3.3 70B (free tier, sub-1s latency)
- **TTS:** ElevenLabs Turbo v2 with Web Speech API fallback
- **PWA:** vite-plugin-pwa, Workbox service worker, installable manifest

## Accessibility features
- High-contrast mode toggle (WCAG)
- All buttons have `aria-label` attributes
- Emergency panel always visible, no menu depth
- Large tap targets (minimum 48×48px)
- Saved phrases with profile tagging for trusted caregivers to pre-populate
- Font: Space Grotesk (high legibility)

## Impact
Aphasia affects more Americans than Parkinson's disease, muscular dystrophy, or cerebral palsy — but has far fewer technology resources. Voca makes the highest-stakes moments (medical emergencies, expressing pain, communicating with family) possible for people who have lost the ability to speak spontaneously.

## Demo path
1. Open app → read the "my chest hurts" context in the problem card
2. Tap **Emergency** category → tap **Chest Pain** (Jake profile, single concept)
3. Tap **Generate** → first sentence streams in <1s: *"Chest is killing me. Call 911."*
4. Tap **Speak** → ElevenLabs Josh voice plays — casual, punchy, sounds like Jake
5. Tap **"Try Maria's voice →"** in the result panel — the app instantly regenerates with Maria's phrasing, no extra tap
6. Tap **Speak** → ElevenLabs Rachel voice plays — formal, measured, sounds like Maria: *"I am experiencing significant chest pain and require immediate medical attention."*
7. **This is the demo-winning moment:** same concept, two completely different humans speaking.
8. Tap 👎 on any sentence → new generation, rejected sentence permanently excluded
9. Tap **Quick Emergency → Call 911** → speaks instantly, no AI wait
10. Star a sentence → appears in **Saved Phrases** for instant future access

## GitHub
https://github.com/Sithranjan-Suresh/voca
