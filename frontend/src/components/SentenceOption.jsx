import { useState } from 'react'
import { useTTS } from '../hooks/useTTS'

const SAVED_KEY = 'voca_saved_phrases'

function getSaved() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
    return raw.map(item => typeof item === 'string' ? { text: item, profileId: 'jordan' } : item)
  } catch { return [] }
}

function setSaved(list) { localStorage.setItem(SAVED_KEY, JSON.stringify(list)) }

export default function SentenceOption({ sentence, profileId, onReject }) {
  const { speaking, hdActive, speak } = useTTS(profileId)
  const isSpeaking = speaking === sentence
  const [saved, setSavedState] = useState(() => getSaved().some(item => item.text === sentence))

  function handleSave() {
    const current = getSaved()
    const alreadySaved = current.some(item => item.text === sentence)
    const updated = alreadySaved
      ? current.filter(item => item.text !== sentence)
      : [{ text: sentence, profileId }, ...current].slice(0, 20)
    setSaved(updated)
    setSavedState(!alreadySaved)
  }

  return (
    <div className="sentence-option">
      <p className="sentence-text">{sentence}</p>
      <div className="sentence-actions">
        <button
          className={`btn-speak${isSpeaking ? ' speaking' : ''}`}
          onClick={() => speak(sentence)}
          disabled={isSpeaking}
          aria-label={isSpeaking ? 'Speaking…' : 'Speak this sentence'}
        >
          <span className={`speak-icon${isSpeaking ? ' pulse' : ''}`} aria-hidden="true">🔊</span>
          {isSpeaking ? 'Speaking…' : 'Speak'}
          {hdActive && !isSpeaking && (
            <span className="hd-badge" aria-label="HD Voice via ElevenLabs">HD</span>
          )}
        </button>
        <button
          className={`btn-save${saved ? ' saved' : ''}`}
          onClick={handleSave}
          aria-label={saved ? 'Remove from saved phrases' : 'Save this phrase'}
          title={saved ? 'Saved — tap to remove' : 'Save phrase'}
        >
          {saved ? '★' : '☆'}
        </button>
        <div className="reject-wrapper">
          <p className="reject-hint">Not right?</p>
          <button
            className="btn-reject"
            onClick={onReject}
            disabled={isSpeaking}
            aria-label="Reject this sentence and get another"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  )
}
