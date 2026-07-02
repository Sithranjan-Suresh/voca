import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001'
const SAVED_KEY = 'voca_saved_phrases'

function getSaved() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
    return raw.map(item => typeof item === 'string' ? { text: item, profileId: 'jordan' } : item)
  } catch { return [] }
}

export default function SavedPhrases({ profileId }) {
  const [allPhrases, setAllPhrases] = useState(getSaved)
  const [speaking, setSpeaking] = useState(null)
  const phrases = allPhrases.filter(p => p.profileId === profileId)

  useEffect(() => {
    function sync() { setAllPhrases(getSaved()) }
    window.addEventListener('storage', sync)
    const t = setInterval(() => setAllPhrases(getSaved()), 500)
    return () => { window.removeEventListener('storage', sync); clearInterval(t) }
  }, [])

  if (phrases.length === 0) return null

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
    u.rate = 0.95
    u.onend = () => setSpeaking(null)
    u.onerror = () => setSpeaking(null)
    window.speechSynthesis.speak(u)
  }

  function handleRemove(text) {
    const updated = getSaved().filter(item => item.text !== text)
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated))
    setAllPhrases(updated)
  }

  return (
    <div className="saved-phrases-panel">
      <p className="saved-phrases-title">★ Saved phrases — {profileId === 'jordan' ? 'Jake' : 'Maria'}</p>
      {phrases.map((item, i) => (
        <div key={i} className="saved-phrase-row">
          <p className="saved-phrase-text">{item.text}</p>
          <div className="saved-phrase-actions">
            <button
              className={`btn-speak-sm${speaking === item.text ? ' speaking' : ''}`}
              onClick={() => handleSpeak(item.text)}
              disabled={speaking === item.text}
              aria-label="Speak this saved phrase"
            >
              🔊 {speaking === item.text ? 'Speaking…' : 'Speak'}
            </button>
            <button
              className="btn-remove-saved"
              onClick={() => handleRemove(item.text)}
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
