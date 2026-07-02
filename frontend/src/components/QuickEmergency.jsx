import { motion } from 'framer-motion'
import { useTTS } from '../hooks/useTTS'

const EMERGENCY_PHRASES = [
  { label: 'Chest Pain',    text: 'My chest is hurting. Please help me right now.' },
  { label: "Can't Breathe", text: "I can't breathe. Please call 911 immediately." },
  { label: 'Help Me',       text: 'Help! I need immediate assistance. Please hurry.' },
  { label: 'I Fell',        text: "I've fallen and I need help getting up." },
  // Call 911 spans full width — most critical phrase gets the most prominent button
  { label: '📞 Call 911',   text: 'Please call 911 right now. This is an emergency.', fullWidth: true },
]

export default function QuickEmergency() {
  // Emergency phrases always use the neutral Jordan/Josh voice for maximum clarity —
  // in a real emergency, voice personalization is secondary to being understood.
  const { speaking, speak } = useTTS('jordan')

  return (
    <div className="quick-emergency" role="region" aria-label="Quick emergency phrases">
      <p className="quick-emergency-label">
        <span className="quick-emergency-icon" aria-hidden="true">🚨</span>
        Quick Emergency — tap to speak instantly, no AI wait
      </p>
      <div className="quick-emergency-grid">
        {EMERGENCY_PHRASES.map((phrase, i) => (
          <motion.button
            key={phrase.label}
            className={`qe-btn${speaking === phrase.text ? ' qe-speaking' : ''}${phrase.fullWidth ? ' qe-full' : ''}`}
            onClick={() => speak(phrase.text)}
            disabled={speaking !== null && speaking !== phrase.text}
            aria-label={`Emergency: ${phrase.label}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 16 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97, y: 1 }}
          >
            {speaking === phrase.text && (
              <span className="qe-speaking-indicator" aria-hidden="true">🔊 </span>
            )}
            {phrase.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
