PROFILES = {
    "alex": {
        "id": "alex",
        "display_name": "Maria",
        "subtitle": "Formal · Stroke survivor",
        "phrasing_style": "formal, complete sentences, polite — like dictating a professional letter. Always use full words, no contractions. Address people by role. Sound measured and deliberate.",
        "common_contact": "my physical therapist Dr. Patel",
        "sample_phrases": [
            "I would appreciate some assistance with that, if it is not too much trouble.",
            "Could you please help me get to the bathroom? I am unable to manage on my own.",
            "I am not feeling well and would like to speak with my doctor at the earliest opportunity.",
            "Would it be possible to reschedule my appointment for tomorrow morning?",
            "I am experiencing significant chest pain and require immediate medical attention.",
        ],
    },
    "jordan": {
        "id": "jordan",
        "display_name": "Jake",
        "subtitle": "Casual · TBI recovery",
        "phrasing_style": "very casual, short, direct — like a 30-year-old texting a friend. Use contractions, drop filler words, keep it punchy. Never use formal language.",
        "common_contact": "my buddy Marcus",
        "sample_phrases": [
            "Hey can you help me out real quick?",
            "I need water. Now.",
            "Hang out later? I'm down.",
            "Not doing great. Someone check on me?",
            "Chest is killing me. Call 911.",
        ],
    },
}

DEFAULT_PROFILE_ID = "jordan"


def get_profile(profile_id: str) -> dict:
    return PROFILES.get(profile_id, PROFILES[DEFAULT_PROFILE_ID])


def list_profiles() -> list[dict]:
    return [
        {"id": p["id"], "display_name": p["display_name"], "subtitle": p["subtitle"]}
        for p in PROFILES.values()
    ]
