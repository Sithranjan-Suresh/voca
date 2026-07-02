import { motion } from 'framer-motion'

const STEPS = [
  { label: "Tap concepts", icon: "👆" },
  { label: "Generate",     icon: "✦" },
  { label: "Speak",        icon: "🔊" },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 12 } },
}

export default function HowItWorks() {
  return (
    <div className="how-it-works-wrapper">
      <motion.div
        className="how-it-works"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {STEPS.map((step, i) => (
          <motion.div key={step.label} className="hiw-step" variants={item}>
            <span className="hiw-icon" aria-hidden="true">{step.icon}</span>
            <span className="hiw-label">{step.label}</span>
            {i < STEPS.length - 1 && <span className="hiw-arrow" aria-hidden="true">→</span>}
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        className="hiw-tagline"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Not autocomplete — Voca reconstructs full sentences from disconnected concepts.
      </motion.p>
    </div>
  )
}
