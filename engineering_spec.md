# Voca — engineering_spec.md

**No code. Design only.** This spec is written so an engineer can implement without making further architecture decisions. Entire stack is free-tier — no paid API keys, no paid hosting, no paid TTS.

---

## 1. Overall Architecture

```
┌─────────────────────────────┐
│         Browser (User)       │
│  React SPA (Frontend)        │
│  - Concept tap UI            │
│  - Profile toggle            │
│  - Web Speech API (TTS)      │  ← runs entirely client-side, no external call
└──────────────┬───────────────┘
               │ HTTPS (fetch)
               ▼
┌─────────────────────────────┐
│   FastAPI Backend (Render/   │
│   Railway free tier)         │
│  - /generate endpoint        │
│  - Profile data (static/     │
│    in-memory, seeded)        │
│  - Prompt construction       │
└──────────────┬───────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────┐
│      Groq API (free tier)    │
│  LLM inference                │
│  (e.g., Llama 3.x model       │
│  served via Groq)             │
└───────────────────────────────┘
```

**Why this shape:** Only one network hop out of the user's control (frontend → backend → Groq). TTS is entirely client-side via the browser's native Web Speech API, which eliminates a third-party dependency, eliminates cost, and eliminates a failure point that would otherwise sit directly in the demo's most important moment (the spoken output).

**No database is required for hackathon scope.** Profiles are a small, fixed set (2 demo profiles) that can live as a static JSON structure in the backend — this avoids provisioning, seeding, and connecting a database under time pressure, and removes an entire category of live-demo failure risk.

---

## 2. Data Model

No persistent database. Two in-memory/static data structures, defined as backend constants (conceptually — no code, just shape):

### Profile
```
Profile {
  id: string                 // e.g. "alex", "jordan"
  display_name: string       // e.g. "Alex"
  phrasing_style: string     // "formal" | "casual"  -- drives prompt instruction
  common_contact: string     // e.g. "my roommate Sam" -- injected as example context
  sample_phrases: string[]   // 2-3 short example sentences in this profile's voice,
                              // used as few-shot grounding in the prompt (see §5)
}
```

### ConceptTag
```
ConceptTag {
  id: string          // e.g. "friend", "coffee", "tomorrow"
  category: string    // "People" | "Food" | "Places" | "Needs" | "Health" | "Emotions"
  label: string        // display label, e.g. "Friend"
  icon: string          // emoji or icon reference for frontend rendering
}
```

Concept tags are defined as a static, seeded list (minimum 6 categories × 4–6 tags each = 24–36 total tags), shipped as a JSON constant either in the frontend directly or served from a lightweight `/concepts` backend endpoint (either is acceptable — frontend-embedded is simpler and removes a network call, and is the recommended choice given no personalization or dynamism is needed for tag data).

### GenerationRequest / GenerationResponse (API contract, not stored data — see §3)

---

## 3. API Design

### Base URL
Backend deployed on Render or Railway free tier, e.g. `https://voca-api.onrender.com`.

### Auth Strategy
**None required.** This is a single-user, no-login hackathon demo. No auth layer, no API keys exposed to the frontend. The Groq API key lives only as a backend environment variable, never sent to or accessible from the client.

### Endpoints

#### `POST /generate`
Generates 2–3 sentence options from tapped concepts and active profile.

**Request body:**
```json
{
  "profile_id": "alex",
  "concept_ids": ["friend", "coffee", "tomorrow"],
  "excluded_sentences": []   // optional, populated on correction re-generation
                              // to avoid returning a previously rejected sentence
}
```

**Response body (200):**
```json
{
  "sentences": [
    "I'd like to grab coffee with my friend tomorrow.",
    "Could we get coffee together tomorrow?",
    "I was hoping to see my friend for coffee tomorrow."
  ]
}
```

**Error response (4xx/5xx):**
```json
{
  "error": "generation_failed",
  "message": "Could not generate a sentence. Please try again."
}
```
Frontend must handle this by showing the retry state defined in product_spec.md's edge cases — never a blank or frozen screen.

**Validation:**
- `concept_ids` must contain at least 2 entries; if fewer, backend returns a 400 with a clear message, and frontend should ideally prevent this request from firing at all (per US-2 acceptance criteria).
- `profile_id` must match a known seeded profile; if missing/invalid, backend defaults to a fallback profile (e.g., "jordan") rather than erroring, to protect demo continuity.

#### `GET /concepts` (optional — only if concept data is served from backend rather than embedded in frontend)
Returns the full static concept tag list grouped by category. Recommended to skip this endpoint and embed the data directly in the frontend for one less network dependency during the demo.

#### `GET /profiles`
Returns the list of available profiles (id + display_name only, not the full prompt-construction data) so the frontend can render the profile toggle without hardcoding names client-side. Low priority — hardcoding two profile names in the frontend is also acceptable given there are only two.

---

## 4. Frontend Architecture

**Framework:** React (Create React App or Vite — Vite recommended for faster local dev iteration during the hackathon).

### Component Hierarchy
```
App
 ├── ProfileToggle              (switches active profile: Alex / Jordan)
 ├── ContrastModeToggle         (switches high-contrast theme)
 ├── CategoryGrid                (renders 6 category tiles)
 │    └── CategoryPanel          (expands on tap, shows concept icons for that category)
 │         └── ConceptIcon       (individual tappable concept, toggles selected state)
 ├── SelectionTray                (shows currently selected concept tags + Generate button)
 ├── GenerationResultPanel
 │    ├── SentenceOption          (one of 2-3 generated sentences)
 │    │    ├── SpeakButton         (triggers Web Speech API playback)
 │    │    └── RejectButton        (👎 triggers regeneration)
 │    └── LoadingState / ErrorState
 └── ToastOrInlineMessage        (e.g., "Select at least 2 ideas")
```

### Routing
None required. This is a single-screen application — all state transitions (category expansion, selection, generation, results) happen within one view. No React Router needed; this reduces complexity and demo risk.

### State Management
Local component state via React's built-in `useState`/`useReducer` is sufficient — no Redux or external state library needed given the app's small surface area. Suggested state shape at the `App` level:

```
{
  activeProfileId: string,
  contrastMode: boolean,
  selectedConceptIds: string[],
  generationStatus: "idle" | "loading" | "success" | "error",
  sentenceOptions: string[],
  rejectedSentences: string[]   // tracked per generation cycle, passed as
                                  // excluded_sentences on regeneration requests
}
```

### Text-to-Speech Integration
Use the browser-native `SpeechSynthesis` Web Speech API directly in the frontend — zero backend involvement, zero cost, zero external dependency. On `SpeakButton` tap: construct an utterance from the selected sentence text and play it. Because some browsers require a user gesture before allowing audio playback, ensure the speak action is always triggered directly by a tap event (not programmatically after an async delay), satisfying browser autoplay policies and avoiding a silent-failure risk during the live demo.

---

## 5. Backend Architecture

**Framework:** FastAPI (Python), chosen for speed of development and because it's already the stack referenced in the original concept doc.

### Service Structure
A minimal, single-service backend — no microservices, no queue, no worker processes. Structure:

```
main.py            — FastAPI app instance, route registration
routes/
  generate.py       — POST /generate handler
  profiles.py        — GET /profiles handler (optional)
data/
  profiles.py         — static Profile seed data (Alex, Jordan)
  concepts.py          — static ConceptTag seed data (only if /concepts endpoint is used)
services/
  prompt_builder.py     — constructs the LLM prompt from concept_ids + profile
  groq_client.py          — wraps the Groq API call
```

### Key Algorithm: Prompt Construction (the core technical bet)

This is the single most important piece of engineering in the project — it is what makes personalization real rather than faked, and it directly determines the Technical Implementation and Innovation scores.

**Prompt construction steps:**
1. Resolve `concept_ids` to their human-readable labels (e.g., `["friend", "coffee", "tomorrow"]` → `["Friend", "Coffee", "Tomorrow"]`).
2. Resolve `profile_id` to its full Profile object (phrasing_style, common_contact, sample_phrases).
3. Construct a system prompt that:
   - Instructs the model to reconstruct a natural, grammatically complete sentence from the given disconnected concept words — explicitly framing this as intent reconstruction for an augmentative communication tool, not open-ended chat.
   - Includes 5–10 few-shot examples (static, embedded in the prompt template) mirroring the pitch's original examples (Friend/Coffee/Tomorrow → "I'd like to grab coffee with my friend tomorrow," Pain/Left Arm/Now → "My left arm hurts right now," etc.) to anchor output format and tone.
   - Injects the active profile's `phrasing_style` as an explicit instruction (e.g., "This user prefers formal, polite phrasing such as 'Could you please...'" vs. "This user prefers direct, casual phrasing such as 'Can you...'").
   - Injects 2–3 of the profile's `sample_phrases` as additional few-shot grounding specific to that profile, so the model has concrete stylistic anchors beyond just an adjective like "formal."
   - If `excluded_sentences` is non-empty (a correction/regeneration request), explicitly instructs the model not to repeat any of the excluded sentences and to produce a meaningfully different phrasing or interpretation.
4. Requests 2–3 sentence completions in a single call (via prompt instruction to return multiple numbered options, or via multiple short completions) — favor a single call returning a small JSON array of options over multiple round-trip calls, to protect the ~3 second response time target.
5. Sends the constructed prompt to Groq's chat completion endpoint using a fast Llama 3.x model (free tier), parses the response into a list of 2–3 sentence strings, and returns them via the `/generate` response contract defined in §3.

**Why this matters for judge scrutiny:** because `phrasing_style` and `sample_phrases` are genuinely different per profile and genuinely flow into the prompt sent to the LLM, the personalization is real and inspectable — an engineer or judge could review the prompt construction logic and confirm it isn't a hardcoded per-profile lookup table. This directly protects against the Phase 2 attack ("if a judge asks a probing question, that unravels fast") identified in the earlier feedback review.

### Error Handling
- Wrap the Groq API call in a try/except; on failure (timeout, rate limit, malformed response), return the standardized error shape from §3 rather than a raw stack trace or an unhandled 500.
- Set a reasonable request timeout (e.g., 8–10 seconds) on the Groq call so a hung request doesn't stall the demo indefinitely — surface the error/retry state instead.

---

## 6. External Integrations

| Integration | Purpose | Cost | Notes |
|---|---|---|---|
| Groq API | LLM inference for sentence generation | Free tier | Backend-only; API key stored as environment variable, never exposed to frontend |
| Web Speech API (`SpeechSynthesis`) | Text-to-speech output | Free (browser-native) | No API key, no external call — runs entirely in-browser |
| Vercel or Netlify | Frontend hosting | Free tier | Auto-deploys from GitHub on push; static React build |
| Render or Railway | Backend hosting | Free tier | Note: free-tier backend hosts may "sleep" after inactivity — see Deployment Strategy below for mitigation |

No sponsor APIs apply (CTRL-V has no listed sponsors per the Phase 1 analysis), and no paid service of any kind is required anywhere in this architecture.

---

## 7. Deployment Strategy

**What "submitted and running" looks like:**
- Frontend: React app built and deployed to Vercel or Netlify free tier, producing a public URL (e.g., `voca-hackathon.vercel.app`) that loads directly with no login.
- Backend: FastAPI app deployed to Render or Railway free tier, producing a public API URL that the frontend calls for `/generate`.
- Environment variable `GROQ_API_KEY` set in the backend hosting provider's dashboard — never committed to the repository.
- CORS configured on the backend to explicitly allow requests from the deployed frontend origin.

**Free-tier cold-start risk (important):** Render and Railway free tiers commonly spin down an inactive backend after a period of no traffic, causing the first request after idle to take several extra seconds. **Mitigation for demo day:** send a warm-up request to the backend a minute or two before recording or presenting live, so the actual demo's `/generate` call hits an already-warm instance and lands within the ~3 second target. This should be an explicit step in the pre-demo checklist, not left to chance.

**Repository structure (single repo, two deployable folders):**
```
/frontend      → deployed to Vercel/Netlify
/backend       → deployed to Render/Railway
README.md      → setup instructions, tech stack, link to demo video
```

**Submission checklist alignment:** this structure directly supports the CTRL-V required submission materials — GitHub repository link, technologies used list, and a working project link — all satisfied by this deployment without any additional infrastructure work.
