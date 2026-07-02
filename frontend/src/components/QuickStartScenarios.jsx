const SCENARIOS = [
  {
    label: "Chest Pain · Can't Breathe · Help Me",
    concepts: ["chest_pain", "cant_breathe", "help_me"],
    sub: "Try the highest-stakes scenario →",
    urgent: true,
  },
  {
    label: "Friend · Coffee · Tomorrow",
    concepts: ["friend", "coffee", "tomorrow"],
    urgent: false,
  },
  {
    label: "Doctor · Scared · Appointment",
    concepts: ["doctor", "scared", "appointment"],
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
            <span className="quickstart-chip-main">
              {s.urgent && <span className="quickstart-urgent-icon" aria-hidden="true">🚨</span>}
              {s.label}
            </span>
            {s.sub && <span className="quickstart-chip-sub">{s.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
