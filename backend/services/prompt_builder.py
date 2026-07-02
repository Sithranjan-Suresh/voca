from data.concepts import get_labels

FEW_SHOT_EXAMPLES = """
Example inputs and outputs (for reference — produce the same style of complete, natural sentence):

Concepts: Friend, Coffee, Tomorrow
Output 1: I'd like to grab coffee with my friend tomorrow.
Output 2: Could we get coffee together tomorrow?
Output 3: I was hoping to see my friend for coffee tomorrow.

Concepts: Pain, Left arm, Now
Output 1: My left arm hurts right now.
Output 2: I'm having pain in my left arm.
Output 3: There's pain in my left arm at the moment.

Concepts: Doctor, Appointment, Scared
Output 1: I'm nervous about my doctor's appointment.
Output 2: I have a doctor's appointment and I'm feeling anxious.
Output 3: My upcoming doctor's appointment is worrying me.

Concepts: Water, Help, Now
Output 1: I need some water right now.
Output 2: Can someone help me get water?
Output 3: I'd like water, please.

Concepts: Home, Tired, Later
Output 1: I want to go home and rest later.
Output 2: I'm feeling tired and would like to head home.
Output 3: I need to go home — I'm exhausted.

Concepts: Family, Happy, Tomorrow
Output 1: I'm looking forward to seeing my family tomorrow.
Output 2: I'll be happy to spend time with my family tomorrow.
Output 3: Tomorrow I get to see my family, which makes me happy.
"""


def build_prompt(concept_ids: list[str], profile: dict, excluded_sentences: list[str]) -> str:
    labels = get_labels(concept_ids)
    concepts_str = ", ".join(labels)

    style = profile["phrasing_style"]
    contact = profile["common_contact"]
    samples = profile["sample_phrases"]
    samples_str = "\n".join(f'- "{s}"' for s in samples)

    exclusion_block = ""
    if excluded_sentences:
        excluded_str = "\n".join(f'- "{s}"' for s in excluded_sentences)
        exclusion_block = f"""
IMPORTANT: The user has already seen and rejected the following sentences — do NOT repeat or closely paraphrase any of them:
{excluded_str}
Produce sentences that are meaningfully different in phrasing and structure from those above.
"""

    system_prompt = f"""You are an augmentative communication assistant helping a person with expressive aphasia.

Your job is to reconstruct a complete, natural, grammatically correct sentence from a small set of disconnected concept words. The user cannot produce sentences themselves — your sentence IS their voice. It must sound natural, not robotic.

{FEW_SHOT_EXAMPLES}

PERSONALIZATION:
This specific user prefers {style} phrasing. Their speech style sounds like:
{samples_str}

When a person is mentioned, they may refer to {contact} as someone in their life.

TASK:
Given the concepts below, produce exactly 3 distinct sentence options that the user could plausibly mean. Each must:
- Be a complete, grammatically correct sentence
- Include all provided concepts naturally
- Match the user's {style} phrasing style (not generic — sound like the sample phrases above)
- Be different from each other in structure or emphasis
{exclusion_block}
Return ONLY a JSON array of 3 strings and nothing else. Example format:
["Sentence one.", "Sentence two.", "Sentence three."]

Concepts: {concepts_str}"""

    return system_prompt
