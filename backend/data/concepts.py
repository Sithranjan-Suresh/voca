CONCEPTS = [
    # Emergency (first — highest-stakes use case)
    {"id": "chest_pain", "label": "Chest Pain", "category": "Emergency", "icon": "chest_pain"},
    {"id": "fall", "label": "Fall", "category": "Emergency", "icon": "fall"},
    {"id": "help_me", "label": "Help Me", "category": "Emergency", "icon": "help_me"},
    {"id": "call_emergency", "label": "Call 911", "category": "Emergency", "icon": "call_emergency"},
    {"id": "cant_breathe", "label": "Can't Breathe", "category": "Emergency", "icon": "cant_breathe"},

    # People
    {"id": "friend", "label": "Friend", "category": "People", "icon": "friend"},
    {"id": "doctor", "label": "Doctor", "category": "People", "icon": "doctor"},
    {"id": "family", "label": "Family", "category": "People", "icon": "family"},
    {"id": "caregiver", "label": "Caregiver", "category": "People", "icon": "caregiver"},
    {"id": "nurse", "label": "Nurse", "category": "People", "icon": "nurse"},

    # Food
    {"id": "coffee", "label": "Coffee", "category": "Food", "icon": "coffee"},
    {"id": "water", "label": "Water", "category": "Food", "icon": "water"},
    {"id": "food", "label": "Food", "category": "Food", "icon": "food"},
    {"id": "breakfast", "label": "Breakfast", "category": "Food", "icon": "breakfast"},
    {"id": "snack", "label": "Snack", "category": "Food", "icon": "snack"},

    # Places
    {"id": "home", "label": "Home", "category": "Places", "icon": "home"},
    {"id": "hospital", "label": "Hospital", "category": "Places", "icon": "hospital"},
    {"id": "outside", "label": "Outside", "category": "Places", "icon": "outside"},
    {"id": "bathroom", "label": "Bathroom", "category": "Places", "icon": "bathroom"},
    {"id": "store", "label": "Store", "category": "Places", "icon": "store"},

    # Needs
    {"id": "help", "label": "Help", "category": "Needs", "icon": "help"},
    {"id": "rest", "label": "Rest", "category": "Needs", "icon": "rest"},
    {"id": "tomorrow", "label": "Tomorrow", "category": "Needs", "icon": "tomorrow"},
    {"id": "now", "label": "Now", "category": "Needs", "icon": "now"},
    {"id": "later", "label": "Later", "category": "Needs", "icon": "later"},

    # Health
    {"id": "pain", "label": "Pain", "category": "Health", "icon": "pain"},
    {"id": "tired", "label": "Tired", "category": "Health", "icon": "tired"},
    {"id": "medicine", "label": "Medicine", "category": "Health", "icon": "medicine"},
    {"id": "appointment", "label": "Appointment", "category": "Health", "icon": "appointment"},
    {"id": "dizzy", "label": "Dizzy", "category": "Health", "icon": "dizzy"},

    # Emotions
    {"id": "happy", "label": "Happy", "category": "Emotions", "icon": "happy"},
    {"id": "scared", "label": "Scared", "category": "Emotions", "icon": "scared"},
    {"id": "sad", "label": "Sad", "category": "Emotions", "icon": "sad"},
    {"id": "frustrated", "label": "Frustrated", "category": "Emotions", "icon": "frustrated"},
    {"id": "grateful", "label": "Grateful", "category": "Emotions", "icon": "grateful"},

    # Body
    {"id": "head",    "label": "Head",    "category": "Body", "icon": "head"},
    {"id": "chest",   "label": "Chest",   "category": "Body", "icon": "chest"},
    {"id": "back",    "label": "Back",    "category": "Body", "icon": "back"},
    {"id": "stomach", "label": "Stomach", "category": "Body", "icon": "stomach"},
    {"id": "arm",     "label": "Arm",     "category": "Body", "icon": "arm"},
    {"id": "leg",     "label": "Leg",     "category": "Body", "icon": "leg"},
]

CONCEPT_MAP = {c["id"]: c for c in CONCEPTS}


def get_labels(concept_ids: list[str]) -> list[str]:
    labels = []
    for cid in concept_ids:
        if cid in CONCEPT_MAP:
            labels.append(CONCEPT_MAP[cid]["label"])
        else:
            # Fallback: humanize the raw ID so unknown concepts still reach the LLM
            labels.append(cid.replace("_", " ").title())
    return labels


def get_concepts_by_category() -> dict[str, list[dict]]:
    result: dict[str, list[dict]] = {}
    for c in CONCEPTS:
        result.setdefault(c["category"], []).append(c)
    return result
