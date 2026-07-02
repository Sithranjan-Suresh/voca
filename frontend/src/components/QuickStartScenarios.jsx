import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCENARIOS = [
  {
    label: "Chest Pain · Can't Breathe · Help Me",
    concepts: ["chest_pain", "cant_breathe", "help_me"],
    sub: "Highest-stakes scenario →",
    urgent: true,
  },
  {
    label: "Friend · Coffee · Tomorrow",
    concepts: ["friend", "coffee", "tomorrow"],
  },
  {
    label: "Doctor · Scared · Appointment",
    concepts: ["doctor", "scared", "appointment"],
  },
]

export default function QuickStartScenarios({ onSelectScenario }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="quickstart-section">
      <button
        className="quickstart-toggle"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span className="quickstart-toggle-arrow" aria-hidden="true">{open ? '▾' : '▸'}</span>
        Try a scenario
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="quickstart-chips"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {SCENARIOS.map((s) => (
              <motion.button
                key={s.label}
                className={`quickstart-chip${s.urgent ? ' quickstart-urgent' : ''}`}
                onClick={() => { onSelectScenario(s.concepts); setOpen(false) }}
                aria-label={`Load scenario: ${s.label}`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
