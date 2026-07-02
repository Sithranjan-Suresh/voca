import { useState } from 'react'

export default function SentenceOption({ sentence, onReject }) {
  const [speaking, setSpeaking] = useState(false)

  function handleSpeak() {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(sentence)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="sentence-option">
      <p className="sentence-text">{sentence}</p>
      <div className="sentence-actions">
        <button
          className={`btn-speak${speaking ? ' speaking' : ''}`}
          onClick={handleSpeak}
          aria-label={speaking ? 'Speaking…' : 'Speak this sentence'}
        >
          <span className={`speak-icon${speaking ? ' pulse' : ''}`} aria-hidden="true">🔊</span>
          {speaking ? 'Speaking…' : 'Speak'}
        </button>
        <button
          className="btn-reject"
          onClick={onReject}
          disabled={speaking}
          aria-label="Reject this sentence and get another"
        >
          👎
        </button>
      </div>
    </div>
  )
}
