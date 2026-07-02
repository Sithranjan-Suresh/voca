PROFILES = {
    "alex": {
        "id": "alex",
        "display_name": "Alex",
        "phrasing_style": "formal",
        "common_contact": "my colleague Dr. Patel",
        "sample_phrases": [
            "I would appreciate it if we could reschedule our appointment.",
            "Could you please pass me a glass of water?",
            "I am experiencing some discomfort and would like assistance.",
        ],
    },
    "jordan": {
        "id": "jordan",
        "display_name": "Jordan",
        "phrasing_style": "casual",
        "common_contact": "my roommate Sam",
        "sample_phrases": [
            "Hey, can we push the meeting back?",
            "Can you grab me some water?",
            "I'm not feeling great, can you help me out?",
        ],
    },
}

DEFAULT_PROFILE_ID = "jordan"


def get_profile(profile_id: str) -> dict:
    return PROFILES.get(profile_id, PROFILES[DEFAULT_PROFILE_ID])


def list_profiles() -> list[dict]:
    return [{"id": p["id"], "display_name": p["display_name"]} for p in PROFILES.values()]
