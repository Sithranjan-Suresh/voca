export const CONCEPTS = [
  // People
  { id: "friend", label: "Friend", category: "People", icon: "👫" },
  { id: "doctor", label: "Doctor", category: "People", icon: "👨‍⚕️" },
  { id: "family", label: "Family", category: "People", icon: "👨‍👩‍👧" },
  { id: "caregiver", label: "Caregiver", category: "People", icon: "🤝" },
  { id: "nurse", label: "Nurse", category: "People", icon: "👩‍⚕️" },

  // Food
  { id: "coffee", label: "Coffee", category: "Food", icon: "☕" },
  { id: "water", label: "Water", category: "Food", icon: "💧" },
  { id: "food", label: "Food", category: "Food", icon: "🍽️" },
  { id: "breakfast", label: "Breakfast", category: "Food", icon: "🥐" },
  { id: "snack", label: "Snack", category: "Food", icon: "🍎" },

  // Places
  { id: "home", label: "Home", category: "Places", icon: "🏠" },
  { id: "hospital", label: "Hospital", category: "Places", icon: "🏥" },
  { id: "outside", label: "Outside", category: "Places", icon: "🌳" },
  { id: "bathroom", label: "Bathroom", category: "Places", icon: "🚿" },
  { id: "store", label: "Store", category: "Places", icon: "🛒" },

  // Needs
  { id: "help", label: "Help", category: "Needs", icon: "🆘" },
  { id: "rest", label: "Rest", category: "Needs", icon: "😴" },
  { id: "tomorrow", label: "Tomorrow", category: "Needs", icon: "📅" },
  { id: "now", label: "Now", category: "Needs", icon: "⚡" },
  { id: "later", label: "Later", category: "Needs", icon: "⏰" },

  // Health
  { id: "pain", label: "Pain", category: "Health", icon: "😣" },
  { id: "tired", label: "Tired", category: "Health", icon: "😓" },
  { id: "medicine", label: "Medicine", category: "Health", icon: "💊" },
  { id: "appointment", label: "Appointment", category: "Health", icon: "🗓️" },
  { id: "dizzy", label: "Dizzy", category: "Health", icon: "😵" },

  // Emotions
  { id: "happy", label: "Happy", category: "Emotions", icon: "😊" },
  { id: "scared", label: "Scared", category: "Emotions", icon: "😨" },
  { id: "sad", label: "Sad", category: "Emotions", icon: "😢" },
  { id: "frustrated", label: "Frustrated", category: "Emotions", icon: "😤" },
  { id: "grateful", label: "Grateful", category: "Emotions", icon: "🙏" },
]

export const CATEGORIES = ["People", "Food", "Places", "Needs", "Health", "Emotions"]

export const CATEGORY_ICONS = {
  People: "👥",
  Food: "🍽️",
  Places: "📍",
  Needs: "✋",
  Health: "❤️",
  Emotions: "😊",
}

export const CONCEPTS_BY_CATEGORY = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = CONCEPTS.filter((c) => c.category === cat)
  return acc
}, {})
