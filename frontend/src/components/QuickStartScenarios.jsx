import { motion } from 'framer-motion'

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
        {SCENARIOS.map((s, i) => (
          <motion.button
            key={s.label}
            className={`quickstart-chip${s.urgent ? ' quickstart-urgent' : ''}`}
            onClick={() => onSelectScenario(s.concepts)}
            aria-label={`Load scenario: ${s.label}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 140, damping: 14 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="quickstart-chip-main">
              {s.urgent && <span className="quickstart-urgent-icon" aria-hidden="true">🚨</span>}
              {s.label}
            </span>
            {s.sub && <span className="quickstart-chip-sub">{s.sub}</span>}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
