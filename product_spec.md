# Voca — product_spec.md

## Product Requirements (what must be true at submission)

1. User can select 2–4 concept tags from at least 6 categories (People, Food, Places, Needs, Health, Emotions), each category containing at least 4–6 selectable concept icons.
2. User can trigger sentence generation from selected tags, receiving 2–3 distinct natural-language sentence options within ~3 seconds under normal network conditions.
3. User can select a generated sentence and have it spoken aloud via text-to-speech with a single tap.
4. User can switch between at least 2 predefined profiles ("Alex" — formal phrasing, "Jordan" — casual phrasing), and identical concept taps must produce measurably different sentence phrasing under each profile.
5. User can reject a generated sentence via a single-tap correction control, receiving a genuinely different alternative (not a repeat).
6. User can toggle a high-contrast display mode that visibly changes the interface (not a cosmetic no-op).
7. Interface uses large tap targets (minimum ~44x44px equivalent) and minimal-to-zero required typing anywhere in the core flow.
8. Application runs reliably end-to-end without manual developer intervention, suitable for a live or recorded demo.

## User Stories

### US-1: Concept Selection
**As a** person with aphasia, **I want to** tap a small number of concept icons instead of typing or navigating deep menus, **so that** I can express an idea without needing to construct a sentence myself.

**Acceptance Criteria:**
- At least 6 top-level categories are visible on the home screen without scrolling on a standard mobile/tablet viewport.
- Tapping a category reveals at least 4–6 concept icons within that category.
- Selected concepts are visibly collected in a persistent tray/summary area (e.g., "Friend · Coffee · Tomorrow") before generation.
- User can deselect a tapped concept before generating.

### US-2: Sentence Generation
**As a** person with aphasia, **I want to** receive a complete, natural sentence from my tapped concepts, **so that** I don't have to produce grammar, tense, or wording myself.

**Acceptance Criteria:**
- Generation is triggered by a single explicit action (a "Generate" button), not automatically on every tap, to avoid premature/incomplete generation.
- Response returns 2–3 distinct sentence options, not a single forced output.
- Response time is under ~3 seconds on a stable connection; a loading state is shown if generation exceeds ~1 second.
- Generated sentences are grammatically complete and correctly reflect all tapped concepts (no dropped or invented concepts).

### US-3: Spoken Output
**As a** person with aphasia, **I want to** have my selected sentence spoken aloud, **so that** I can communicate verbally without relying on my own speech production.

**Acceptance Criteria:**
- A single tap on a selected sentence triggers text-to-speech playback.
- Playback begins within 1 second of the tap.
- Sentence text remains visible on screen during playback (supports users who also benefit from reading along).

### US-4: Live Personalization
**As a** person with aphasia who has their own way of speaking, **I want to** receive sentences phrased the way I actually talk, **so that** the output sounds like my voice, not a generic one.

**Acceptance Criteria:**
- At least 2 selectable profiles exist, each with a distinct stored phrasing style (formal/indirect vs. casual/direct) and at least one stored personal detail (e.g., a common contact name).
- Switching profiles and regenerating from identical tapped concepts produces sentences that differ in phrasing style, not just superficial wording (e.g., "Could you please..." vs. "Can you...").
- The mechanism must be driven by actual injected profile data in the generation request — not a hardcoded lookup table of pre-written sentences per profile.

### US-5: Correction Flow
**As a** person with aphasia, **I want to** reject an incorrect sentence and get another attempt, **so that** I stay in control of what's actually communicated even when the AI's first guess is wrong.

**Acceptance Criteria:**
- A visible, single-tap control (e.g., 👎) is present on every generated sentence option.
- Tapping it returns a new sentence that is not identical to the rejected one.
- The correction action does not require re-tapping the original concepts from scratch.

### US-6: Accessible Display
**As a** person with visual or cognitive accessibility needs, **I want to** use a high-contrast mode and large touch targets, **so that** I can reliably use the interface regardless of visual acuity or motor precision.

**Acceptance Criteria:**
- A visible toggle switches the entire interface into a high-contrast color scheme.
- All primary interactive elements meet a minimum touch-target size across both display modes.
- Toggle state persists for the duration of the session (does not need to persist across app restarts for hackathon scope).

## Edge Cases to Handle

- **Fewer than 2 concepts selected when Generate is tapped:** Generate button is disabled or shows a brief inline prompt ("Select at least 2 ideas") rather than sending an incomplete/ambiguous request to the LLM.
- **LLM request fails or times out:** Show a clear retry state within the interface rather than a silent failure or blank screen — critical for live demo reliability.
- **Text-to-speech unsupported or blocked by browser autoplay policy:** Provide a visible manual "tap to speak" affordance rather than relying on autoplay, since some browsers require a user gesture to trigger audio.
- **Repeated correction taps:** If a user taps 👎 multiple times in a row, ensure the system does not return to a previously rejected sentence within the same generation cycle.
- **Ambiguous or sparse concept combinations** (e.g., only emotion tags with no subject): generation should still return a complete, reasonable sentence rather than erroring out — this should be validated during prompt testing (Task 5 from the roadmap), not handled with special-case code.
- **Profile not selected:** default to one profile (e.g., "Jordan") rather than requiring an explicit choice before first use, to keep the demo's cold-start path frictionless.

## Feature Priority

| Feature | Priority | Notes |
|---|---|---|
| Concept tap selection UI (6 categories) | P0 | Demo-blocking — nothing works without this |
| LLM sentence generation (2-3 options) | P0 | Demo-blocking — the core mechanic |
| Text-to-speech output | P0 | Demo-blocking — "spoken aloud" is core to the pitch |
| Live personalization (2 profiles) | P0 | Demo-blocking — this is the single highest-leverage feature identified in the improvement roadmap |
| Correction flow (👎 regenerate) | P0 | Demo-blocking — required to show the unhappy path in the demo script |
| High-contrast mode toggle | P1 | Strengthens UX score and accessibility credibility; demo survives without it but it should not be cut if time allows |
| Loading/error states for generation | P1 | Not flashy, but protects demo reliability — a failed live demo with no graceful state is a worse outcome than a slightly slower one |
| Large-target styling polish pass | P1 | Affects UX and Presentation scoring; should be done after all P0s are functionally complete |
| Category icon custom illustration/branding polish | P2 | Nice-to-have visual polish, cut first if time runs short |
| Any additional categories/concepts beyond the minimum 6x4 set | P2 | Breadth beyond what the demo script actually uses adds risk without adding score |
| Caregiver-editable profile UI | Out of scope | Explicitly deferred to Future Expansion per full_context.md |
| Emergency Mode / Offline Mode / Eye-tracking | Out of scope | Explicitly deferred to Future Expansion per full_context.md |
