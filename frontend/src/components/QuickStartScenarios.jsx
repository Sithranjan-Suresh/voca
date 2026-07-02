const SCENARIOS = [
  {
    label: "Pain · Chest · Now",
    concepts: ["chest_pain", "now", "help_me"],
    emoji: "🚨",
    urgent: true,
  },
  {
    label: "Friend · Coffee · Tomorrow",
    concepts: ["friend", "coffee", "tomorrow"],
    emoji: "☕",
    urgent: false,
  },
  {
    label: "Doctor · Scared · Appointment",
    concepts: ["doctor", "scared", "appointment"],
    emoji: "🩺",
    urgent: false,
  },
]

export default function QuickStartScenarios({ onSelectScenario }) {
  return (
    <div className="quickstart-section">
      <p className="quickstart-label">Try a scenario</p>
      <div className="quickstart-chips">
        {SCENARIOS.map(s => (
          <button
            key={s.label}
            className={`quickstart-chip${s.urgent ? ' quickstart-urgent' : ''}`}
            onClick={() => onSelectScenario(s.concepts)}
            aria-label={`Load scenario: ${s.label}`}
          >
            <span aria-hidden="true">{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
