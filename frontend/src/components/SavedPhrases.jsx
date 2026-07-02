import { useState, useEffect } from 'react'
import { useTTS } from '../hooks/useTTS'

const SAVED_KEY = 'voca_saved_phrases'

function getSaved() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
    return raw.map(item => typeof item === 'string' ? { text: item, profileId: 'jordan' } : item)
  } catch { return [] }
}

export default function SavedPhrases({ profileId }) {
  const [allPhrases, setAllPhrases] = useState(getSaved)
  const { speaking, speak } = useTTS(profileId)
  const phrases = allPhrases.filter(p => p.profileId === profileId)

  useEffect(() => {
    function sync() { setAllPhrases(getSaved()) }
    window.addEventListener('storage', sync)
    const t = setInterval(() => setAllPhrases(getSaved()), 500)
    return () => { window.removeEventListener('storage', sync); clearInterval(t) }
  }, [])

  if (phrases.length === 0) return null

  function handleRemove(text) {
    const updated = getSaved().filter(item => item.text !== text)
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated))
    setAllPhrases(updated)
  }

  return (
    <div className="saved-phrases-panel">
      <p className="saved-phrases-title">
        ★ Saved phrases — {profileId === 'jordan' ? 'Jake' : 'Maria'}
      </p>
      {phrases.map((item, i) => (
        <div key={i} className="saved-phrase-row">
          <p className="saved-phrase-text">{item.text}</p>
          <div className="saved-phrase-actions">
            <button
              className={`btn-speak-sm${speaking === item.text ? ' speaking' : ''}`}
              onClick={() => speak(item.text)}
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
