export const CONCEPTS = [
  // Emergency
  { id: "chest_pain",      label: "Chest Pain",    category: "Emergency", icon: "chest_pain" },
  { id: "fall",            label: "Fall",           category: "Emergency", icon: "fall" },
  { id: "help_me",         label: "Help Me",        category: "Emergency", icon: "help_me" },
  { id: "call_emergency",  label: "Call 911",       category: "Emergency", icon: "call_emergency" },
  { id: "cant_breathe",    label: "Can't Breathe",  category: "Emergency", icon: "cant_breathe" },

  // People
  { id: "friend",    label: "Friend",    category: "People", icon: "friend" },
  { id: "doctor",    label: "Doctor",    category: "People", icon: "doctor" },
  { id: "family",    label: "Family",    category: "People", icon: "family" },
  { id: "caregiver", label: "Caregiver", category: "People", icon: "caregiver" },
  { id: "nurse",     label: "Nurse",     category: "People", icon: "nurse" },

  // Food
  { id: "coffee",    label: "Coffee",    category: "Food", icon: "coffee" },
  { id: "water",     label: "Water",     category: "Food", icon: "water" },
  { id: "food",      label: "Food",      category: "Food", icon: "food" },
  { id: "breakfast", label: "Breakfast", category: "Food", icon: "breakfast" },
  { id: "snack",     label: "Snack",     category: "Food", icon: "snack" },

  // Places
  { id: "home",     label: "Home",     category: "Places", icon: "home" },
  { id: "hospital", label: "Hospital", category: "Places", icon: "hospital" },
  { id: "outside",  label: "Outside",  category: "Places", icon: "outside" },
  { id: "bathroom", label: "Bathroom", category: "Places", icon: "bathroom" },
  { id: "store",    label: "Store",    category: "Places", icon: "store" },

  // Needs
  { id: "help",     label: "Help",     category: "Needs", icon: "help" },
  { id: "rest",     label: "Rest",     category: "Needs", icon: "rest" },
  { id: "tomorrow", label: "Tomorrow", category: "Needs", icon: "tomorrow" },
  { id: "now",      label: "Now",      category: "Needs", icon: "now" },
  { id: "later",    label: "Later",    category: "Needs", icon: "later" },

  // Health
  { id: "pain",        label: "Pain",        category: "Health", icon: "pain" },
  { id: "tired",       label: "Tired",       category: "Health", icon: "tired" },
  { id: "medicine",    label: "Medicine",    category: "Health", icon: "medicine" },
  { id: "appointment", label: "Appointment", category: "Health", icon: "appointment" },
  { id: "dizzy",       label: "Dizzy",       category: "Health", icon: "dizzy" },

  // Emotions
  { id: "happy",      label: "Happy",      category: "Emotions", icon: "happy" },
  { id: "scared",     label: "Scared",     category: "Emotions", icon: "scared" },
  { id: "sad",        label: "Sad",        category: "Emotions", icon: "sad" },
  { id: "frustrated", label: "Frustrated", category: "Emotions", icon: "frustrated" },
  { id: "grateful",   label: "Grateful",   category: "Emotions", icon: "grateful" },
]

export const CATEGORIES = ["Emergency", "People", "Food", "Places", "Needs", "Health", "Emotions"]

// SVG path data for category tiles (24×24 viewBox, stroke-based)
// SVG path strings for the 7 category tiles
export const CATEGORY_SVGS = {
  Emergency: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  People:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  Food:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="18" y2="22"/><line x1="14" y1="2" x2="14" y2="7"/><path d="M14 7a4 4 0 0 0 4 4"/><path d="M6 2c0 0-4 3-4 8s4 8 4 8"/><path d="M2 10h8"/></svg>`,
  Places:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  Needs:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a4 4 0 0 0-8 0v5"/><path d="M10 18H5l2 3 2-3h-1"/><path d="M19 18h-5l2 3 2-3h-1"/><line x1="12" y1="14" x2="12" y2="21"/></svg>`,
  Health:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  Emotions:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
}

export const CONCEPTS_BY_CATEGORY = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = CONCEPTS.filter((c) => c.category === cat)
  return acc
}, {})

// Backwards-compat alias — remove once Vite module cache clears
export const CATEGORY_ICONS = CATEGORY_SVGS
