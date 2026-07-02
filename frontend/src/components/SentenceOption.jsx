import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function SentenceOption({ sentence, profileId, onReject }) {
  const [speaking, setSpeaking] = useState(false)

  async function handleSpeak() {
    if (speaking) return
    setSpeaking(true)

    // Try ElevenLabs via backend first
    try {
      const res = await fetch(`${API_BASE}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentence, profile_id: profileId }),
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url) }
        audio.onerror = () => { setSpeaking(false); URL.revokeObjectURL(url); speakFallback() }
        await audio.play()
        return
      }
    } catch {
      // fall through to browser TTS
    }

    speakFallback()
  }

  function speakFallback() {
    if (!('speechSynthesis' in window)) { setSpeaking(false); return }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(sentence)
    utterance.rate = 0.95
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="sentence-option">
      <p className="sentence-text">{sentence}</p>
      <p className="sentence-attribution">Reconstructed from your tapped concepts — not predicted text.</p>
      <div className="sentence-actions">
        <button
          className={`btn-speak${speaking ? ' speaking' : ''}`}
          onClick={handleSpeak}
          disabled={speaking}
          aria-label={speaking ? 'Speaking…' : 'Speak this sentence'}
        >
          <span className={`speak-icon${speaking ? ' pulse' : ''}`} aria-hidden="true">🔊</span>
          {speaking ? 'Speaking…' : 'Speak'}
        </button>
        <div className="reject-wrapper">
          <p className="reject-hint">Not right?</p>
          <button
            className="btn-reject"
            onClick={onReject}
            disabled={speaking}
            aria-label="Reject this sentence and get another"
            title="Voca tries a different angle"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  )
}
