PROFILES = {
    "alex": {
        "id": "alex",
        "display_name": "Maria",
        "subtitle": "Formal · Stroke survivor",
        "phrasing_style": "formal and polite",
        "common_contact": "my physical therapist Dr. Patel",
        "sample_phrases": [
            "I would appreciate some assistance with that, if it is not too much trouble.",
            "Could you please help me get to the bathroom?",
            "I am not feeling well and would like to speak with my doctor.",
            "Would it be possible to reschedule my appointment for tomorrow?",
        ],
    },
    "jordan": {
        "id": "jordan",
        "display_name": "Jake",
        "subtitle": "Casual · TBI recovery",
        "phrasing_style": "casual and direct",
        "common_contact": "my buddy Marcus",
        "sample_phrases": [
            "Hey, can you help me out?",
            "I really need some water right now.",
            "Can we hang out later? I'm up for it.",
            "I'm not doing great — can someone check on me?",
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
