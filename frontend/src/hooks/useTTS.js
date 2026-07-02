import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001'

// Module-level ElevenLabs availability cache — re-checks on failure
let elevenLabsAvailable = null

async function checkElevenLabs() {
  if (elevenLabsAvailable === true) return true
  try {
    const res = await fetch(`${API_BASE}/tts/status`)
    elevenLabsAvailable = res.ok ? true : null
    return res.ok
  } catch {
    elevenLabsAvailable = null
    return false
  }
}

/**
 * useTTS(profileId)
 * Returns { speaking, hdActive, speak(text) }
 * speak() tries ElevenLabs HD first, falls back to Web Speech API.
 * speaking is the text currently being spoken, or null.
 */
export function useTTS(profileId) {
  const [speaking, setSpeaking] = useState(null)
  const [hdActive, setHdActive] = useState(false)

  useEffect(() => {
    checkElevenLabs().then(ok => setHdActive(!!ok))
  }, [])

  async function speak(text) {
    if (speaking === text) return
    setSpeaking(text)

    const useHD = await checkElevenLabs()
    if (useHD) {
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
          audio.onerror = () => { setSpeaking(null); URL.revokeObjectURL(url); fallback(text) }
          await audio.play()
          return
        }
      } catch { /* fall through */ }
    }

    fallback(text)
  }

  function fallback(text) {
    if (!('speechSynthesis' in window)) { setSpeaking(null); return }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.92
    u.onend = () => setSpeaking(null)
    u.onerror = () => setSpeaking(null)
    window.speechSynthesis.speak(u)
  }

  return { speaking, hdActive, speak }
}
