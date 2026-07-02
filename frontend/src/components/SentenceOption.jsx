import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Check once on load whether ElevenLabs TTS is available
let elevenLabsAvailable = null
async function checkElevenLabs() {
  if (elevenLabsAvailable !== null) return elevenLabsAvailable
  try {
    const res = await fetch(`${API_BASE}/tts/status`)
    elevenLabsAvailable = res.ok
  } catch {
    elevenLabsAvailable = false
  }
  return elevenLabsAvailable
}

const SAVED_KEY = 'voca_saved_phrases'
function getSaved() { try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]') } catch { return [] } }
function setSaved(list) { localStorage.setItem(SAVED_KEY, JSON.stringify(list)) }

export default function SentenceOption({ sentence, profileId, onReject }) {
  const [speaking, setSpeaking] = useState(false)
  const [hdActive, setHdActive] = useState(false)
  const [saved, setSavedState] = useState(() => getSaved().includes(sentence))

  useEffect(() => {
    checkElevenLabs().then(ok => setHdActive(!!ok))
  }, [])

  async function handleSpeak() {
    if (speaking) return
    setSpeaking(true)

    const useHD = await checkElevenLabs()
    if (useHD) {
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
        // fall through
      }
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

  function handleSave() {
    const current = getSaved()
    let updated
    if (current.includes(sentence)) {
      updated = current.filter(s => s !== sentence)
    } else {
      updated = [sentence, ...current].slice(0, 20)
    }
    setSaved(updated)
    setSavedState(updated.includes(sentence))
  }

  return (
    <div className="sentence-option">
      <p className="sentence-text">{sentence}</p>
      <p className="sentence-attribution">
        Reconstructed from your tapped concepts — not predicted text.
      </p>
      <div className="sentence-actions">
        <button
          className={`btn-speak${speaking ? ' speaking' : ''}`}
          onClick={handleSpeak}
          disabled={speaking}
          aria-label={speaking ? 'Speaking…' : 'Speak this sentence'}
        >
          <span className={`speak-icon${speaking ? ' pulse' : ''}`} aria-hidden="true">🔊</span>
          {speaking ? 'Speaking…' : 'Speak'}
          {hdActive && !speaking && (
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
            disabled={speaking}
            aria-label="Reject this sentence and get another"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  )
}
