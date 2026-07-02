# Voca — full_context.md

## Vision

**One sentence:** Voca lets someone with aphasia tap a few concepts and instantly get back a natural, personalized sentence they can speak aloud — recovering their voice instead of asking them to rebuild it from scratch.

**One paragraph:** Millions of people live with aphasia following a stroke or brain injury — a condition that disrupts language production while leaving intent fully intact. They know exactly what they want to say; they simply can't retrieve or assemble the words to say it. Existing AAC (Augmentative and Alternative Communication) tools — symbol grids, typing interfaces, word-prediction keyboards — still require the user to construct a sentence, which is precisely the step aphasia makes difficult. Voca inverts this: the user supplies a few tapped concepts (a person, an action, a time, a need), and an LLM reconstructs the full, grammatically natural sentence, phrased in a way personalized to how that specific person speaks, then speaks it aloud via text-to-speech. Built for the CTRL-V Hackathon (theme: accessibility and access), Voca is scoped deliberately narrow — one flawless, demonstrable loop rather than a broad, half-built feature set — because a live, working demo of real personalization is worth more to judges than a long list of claimed capabilities.

## Problem

- Aphasia affects language processing, most commonly after stroke or brain injury, and affects a large population worldwide (cite a sourced prevalence statistic, e.g. National Aphasia Association figures, in the final submission write-up and demo).
- The defining and most under-addressed characteristic: people with aphasia typically retain full comprehension and intent — the failure is in *production*, not understanding.
- Existing AAC tools ask the user to do the hardest part themselves: assembling a grammatically complete sentence, symbol by symbol or word by word. For someone whose core deficit is language construction, this design assumption is the barrier, not the solution.
- Typing doesn't bypass the problem — it just moves sentence construction onto a keyboard, which is still sentence construction.

## Target Users

**Primary user:** An adult with expressive aphasia (word-finding and sentence-construction difficulty) following stroke or brain injury, who retains conception of what they want to communicate but struggles to produce it verbally or in writing.
- **What they currently do:** Attempt to type or speak in fragments; rely on caregivers to guess intent from partial words; use symbol-based AAC apps that still require multi-step sentence assembly.
- **Why that's painful:** Every interaction — asking for water, describing pain, making plans — becomes a slow, effortful, sometimes humiliating negotiation. Fragmented communication also causes real safety risk (e.g., an inability to quickly and clearly communicate "chest pain" in an emergency).

**Secondary user (context, not built for hackathon):** A caregiver or family member who currently acts as an interpreter for the primary user's fragmented speech.

## User Journey (end-to-end, as built for submission)

1. User opens Voca. Home screen shows large category icons: People, Food, Places, Needs, Health, Emotions.
2. User taps 2–4 concept icons across categories (e.g., Friend → Coffee → Tomorrow).
3. User taps **Generate**. Within ~3 seconds, Voca returns 2–3 natural sentence options.
4. User selects a sentence and taps **Speak** — the phone speaks it aloud via TTS.
5. If none of the options are right, user taps **👎** to regenerate — a fresh option (or one of the other pre-generated alternatives) appears.
6. A profile toggle (e.g., "Alex" / "Jordan") lets the same tapped concepts produce genuinely different, personalized phrasing — demonstrating the system adapts to how a specific person talks rather than returning generic output.

## Core Features (what exists at submission)

- **Tap-to-concept interface** across six categories, large-target and high-contrast.
- **LLM-based sentence generation** from 2–4 tapped concepts, returning 2–3 natural phrasing options.
- **Text-to-speech output** for the selected sentence (browser-native, no paid API).
- **Real, live personalization**: a small stored profile (name, one common contact, phrasing style — formal vs. casual) is injected into the generation prompt so that identical taps under different profiles produce genuinely different, natural sentences.
- **Correction flow**: a thumbs-down regenerates or surfaces an alternate option, so the interaction survives a wrong first guess.
- **High-contrast mode toggle** (real, functioning, not just described).

**Explicitly not built for submission** (stated only as future vision): Emergency Mode, Caregiver Mode (editable profiles UI), offline mode, eye-tracking/switch-control compatibility, long-term embedding-based memory, emotion detection, multi-turn conversation memory.

## Key Differentiators

- **Reconstructs meaning, not text.** Predictive keyboards complete partial words the user has already started typing; Voca takes disconnected concept taps with no linear text at all and produces a complete, grammatical sentence. Input like `Doctor / Scared / Tomorrow` has no valid predictive-text completion — Voca produces "I'm nervous about my doctor's appointment tomorrow."
- **Not a chatbot.** The AI never converses with the user; it performs a single, bounded transformation (concepts → sentence) and stops. This distinction matters for scope, reliability, and judge perception — it's a purpose-built accessibility tool, not a general LLM wrapper.
- **Personalization is demonstrated live, not claimed.** The profile toggle produces genuinely different output from identical input in real time — this is the feature most competing AAC-adjacent hackathon projects will not have working and demoable.
- **Designed for the disorder, not accessibility in the abstract.** The tap-first, minimal-typing, minimal-navigation interaction model is specifically shaped around expressive language deficits, not a generic "accessible UI" checklist.

## Technical Overview

- **Stack is 100% free-tier**, chosen for hackathon speed and zero cost: React (frontend), FastAPI (backend), Groq API (LLM inference, free tier), Web Speech API (browser-native TTS, no API cost), Vercel or Netlify (frontend hosting, free tier), Render or Railway (backend hosting, free tier).
- **Architecture approach:** thin, single-purpose backend — one primary endpoint that takes tapped concept tags + active profile, returns 2–3 generated sentences. No database required for submission scope; profiles are stored client-side or as static seed data server-side.
- **Key technical bet:** the entire Innovation and Technical Implementation score rests on the personalization mechanism being real (profile data actually injected into the prompt and materially changing output) rather than hardcoded or faked — this is the single highest-priority engineering correctness requirement.

## Demo Flow

Matches the Phase 4 demo design: cold-open typing struggle → tap-to-speech reveal → live profile toggle proving personalization → correction flow → closing stat and future vision. Full word-for-word script lives in the Phase 4 output delivered alongside this document.

## Success Metrics

**Technical "winning" bar:**
- Core loop (tap → generate → speak) completes in under 3 seconds, reliably, across at least 10 consecutive test runs before recording the final demo.
- Profile toggle produces measurably different sentence structure/formality between the two demo profiles on the same input, every time it's demoed.
- Correction flow always returns a genuinely different sentence, never a repeat of the rejected one.

**Product/judging "winning" bar (against CTRL-V's stated rubric):**
- Impact (30%): a judge can articulate, in one sentence after watching the demo, who this helps and why it matters.
- Innovation (25%): a judge distinguishes this from a predictive keyboard or generic chatbot without prompting.
- Technical Implementation (25%): the personalization mechanism withstands a follow-up question about whether it's "real."
- UX (10%) / Presentation (10%): demo runs under 90 seconds and requires zero narration to understand the core mechanic.

## Future Expansion

1. **OS-level accessibility layer** — Voca's tap-to-speech mechanism embedded directly into phone calls, messaging, and FaceTime, so the communication layer follows the user across every app rather than living in a single one.
2. **Caregiver-authored profiles** — a real interface (not just seed data) letting family members or SLPs (speech-language pathologists) enter names, common phrases, and preferred formality, making personalization scale beyond two demo profiles.
3. **Emergency Mode** — a one-tap path from concept selection (e.g., Pain + Chest) directly to a generated emergency sentence and a call to a saved emergency contact, addressing the safety dimension of expressive aphasia noted in the Problem section.
