import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001'
const SAVED_KEY = 'voca_saved_phrases'

function getSaved() {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]') } catch { return [] }
}

export default function SavedPhrases({ profileId }) {
  const [phrases, setPhrases] = useState(getSaved)
  const [speaking, setSpeaking] = useState(null)

  useEffect(() => {
    function sync() { setPhrases(getSaved()) }
    window.addEventListener('storage', sync)
    // Poll for changes within same tab (SentenceOption writes localStorage)
    const t = setInterval(() => setPhrases(getSaved()), 500)
    return () => { window.removeEventListener('storage', sync); clearInterval(t) }
  }, [])

  if (phrases.length === 0) return null

  async function handleSpeak(sentence) {
    if (speaking === sentence) return
    setSpeaking(sentence)

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
        audio.onended = () => { setSpeaking(null); URL.revokeObjectURL(url) }
        audio.onerror = () => { setSpeaking(null); URL.revokeObjectURL(url); speakFallback(sentence) }
        await audio.play()
        return
      }
    } catch {}

    speakFallback(sentence)
  }

  function speakFallback(sentence) {
    if (!('speechSynthesis' in window)) { setSpeaking(null); return }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(sentence)
    u.rate = 0.95
    u.onend = () => setSpeaking(null)
    u.onerror = () => setSpeaking(null)
    window.speechSynthesis.speak(u)
  }

  function handleRemove(sentence) {
    const updated = getSaved().filter(s => s !== sentence)
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated))
    setPhrases(updated)
  }

  return (
    <div className="saved-phrases-panel">
      <p className="saved-phrases-title">★ Saved phrases</p>
      {phrases.map((phrase, i) => (
        <div key={i} className="saved-phrase-row">
          <p className="saved-phrase-text">{phrase}</p>
          <div className="saved-phrase-actions">
            <button
              className={`btn-speak-sm${speaking === phrase ? ' speaking' : ''}`}
              onClick={() => handleSpeak(phrase)}
              disabled={speaking === phrase}
              aria-label="Speak this saved phrase"
            >
              🔊 {speaking === phrase ? 'Speaking…' : 'Speak'}
            </button>
            <button
              className="btn-remove-saved"
              onClick={() => handleRemove(phrase)}
              aria-label="Remove saved phrase"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
