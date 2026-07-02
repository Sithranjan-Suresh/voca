import { useState } from 'react'
import { motion } from 'framer-motion'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const EMERGENCY_PHRASES = [
  { label: 'Chest Pain',    text: 'My chest is hurting. Please help me right now.' },
  { label: "Can't Breathe", text: "I can't breathe. Please call 911 immediately." },
  { label: 'Help Me',       text: 'Help! I need immediate assistance. Please hurry.' },
  { label: 'I Fell',        text: "I've fallen and I need help getting up." },
  { label: 'Call 911',      text: 'Please call 911 right now. This is an emergency.' },
]

export default function QuickEmergency({ profileId }) {
  const [speaking, setSpeaking] = useState(null)

  async function handleSpeak(text) {
    if (speaking === text) return
    setSpeaking(text)

    try {
      const res = await fetch(`${API_BASE}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, profile_id: profileId }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.onended = () => { setSpeaking(null); URL.revokeObjectURL(url) }
        audio.onerror = () => { setSpeaking(null); URL.revokeObjectURL(url); speakFallback(text) }
        await audio.play()
        return
      }
    } catch {}

    speakFallback(text)
  }

  function speakFallback(text) {
    if (!('speechSynthesis' in window)) { setSpeaking(null); return }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.9
    u.onend = () => setSpeaking(null)
    u.onerror = () => setSpeaking(null)
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="quick-emergency" role="region" aria-label="Quick emergency phrases">
      <p className="quick-emergency-label">
        <span className="quick-emergency-icon" aria-hidden="true">🚨</span>
        Quick Emergency — tap to speak instantly
      </p>
      <div className="quick-emergency-grid">
        {EMERGENCY_PHRASES.map((phrase, i) => (
          <motion.button
            key={phrase.label}
            className={`qe-btn${speaking === phrase.text ? ' qe-speaking' : ''}`}
            onClick={() => handleSpeak(phrase.text)}
            disabled={speaking !== null && speaking !== phrase.text}
            aria-label={`Emergency: ${phrase.label}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 16 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97, y: 1 }}
          >
            {speaking === phrase.text ? (
              <span className="qe-speaking-indicator" aria-hidden="true">🔊</span>
            ) : null}
            {phrase.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
