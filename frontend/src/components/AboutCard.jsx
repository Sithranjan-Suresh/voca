import { motion } from 'framer-motion'

export default function AboutCard() {
  return (
    <motion.div
      className="about-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 14 }}
      role="region"
      aria-label="About Voca"
    >
      <p className="about-stat">
        <span className="about-stat-number">2.5M</span> Americans — <span className="about-stat-number">50M</span> worldwide — live with aphasia after stroke or brain injury.
      </p>
      <p className="about-body">
        Imagine trying to say <em>"my chest hurts"</em> after a stroke — and not being able to find the words.
        They know exactly what they want to say. Existing AAC tools still require sentence construction:
        the very step aphasia makes impossible.
      </p>
      <p className="about-differentiator">
        Voca inverts this: tap a few concepts → get a complete, natural sentence → speak.
        No typing. No sentence assembly. No friction.
      </p>
    </motion.div>
  )
}
