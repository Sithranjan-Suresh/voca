import { useState, useEffect, useRef } from 'react'
import ProfileToggle from './components/ProfileToggle'
import ContrastModeToggle from './components/ContrastModeToggle'
import CategoryGrid from './components/CategoryGrid'
import SelectionTray from './components/SelectionTray'
import GenerationResultPanel from './components/GenerationResultPanel'
import OnboardingSplash from './components/OnboardingSplash'
import Toast from './components/Toast'
import HowItWorks from './components/HowItWorks'
import QuickStartScenarios from './components/QuickStartScenarios'
import SavedPhrases from './components/SavedPhrases'
import QuickEmergency from './components/QuickEmergency'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001'
const PROFILE_NAMES = { jordan: 'Jake', alex: 'Maria' }

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState('jordan')
  const [contrastMode, setContrastMode] = useState(false)
  const [selectedConceptIds, setSelectedConceptIds] = useState([])
  const [generationStatus, setGenerationStatus] = useState('idle')
  const [sentenceOptions, setSentenceOptions] = useState([])
  const [rejectedSentences, setRejectedSentences] = useState([])
  const [toast, setToast] = useState(null)
  const [showSplash, setShowSplash] = useState(true)
  const [streamingText, setStreamingText] = useState([])
  const isFirstMount = useRef(true)
  const trayRef = useRef(null)

  // Auto-clear results and show toast on profile switch
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    setSentenceOptions([])
    setGenerationStatus('idle')
    setRejectedSentences([])
    setStreamingText([])
    const name = PROFILE_NAMES[activeProfileId] || activeProfileId
    showToast(`Switched to ${name} — tap Generate to hear their voice`)
  }, [activeProfileId])

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  function toggleConcept(id) {
    setSelectedConceptIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function deselectConcept(id) {
    setSelectedConceptIds(prev => prev.filter(x => x !== id))
  }

  function clearAll() {
    setSelectedConceptIds([])
    setSentenceOptions([])
    setGenerationStatus('idle')
    setRejectedSentences([])
    setStreamingText([])
  }

  function handleSelectScenario(conceptIds) {
    setSelectedConceptIds(conceptIds)
    setSentenceOptions([])
    setGenerationStatus('idle')
    setRejectedSentences([])
    setStreamingText([])
    setTimeout(() => trayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
  }

  async function handleGenerate(excluded = []) {
    setGenerationStatus('loading')
    setSentenceOptions([])
    setStreamingText([])

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile_id: activeProfileId,
          concept_ids: selectedConceptIds,
          excluded_sentences: excluded,
        }),
      })

      if (!res.ok) {
        setGenerationStatus('error')
        return
      }

      const contentType = res.headers.get('content-type') || ''

      if (contentType.includes('text/event-stream') || res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        const sentences = []

        setGenerationStatus('streaming')

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          const lines = buffer.split('\n')
          buffer = lines.pop()

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const raw = line.slice(6).trim()
              if (raw === '[DONE]') continue
              try {
                const parsed = JSON.parse(raw)
                if (parsed.sentences) {
                  setSentenceOptions(parsed.sentences)
                  setGenerationStatus('success')
                } else if (parsed.partial !== undefined) {
                  const idx = parsed.index ?? 0
                  sentences[idx] = parsed.partial
                  setStreamingText([...sentences])
                  setGenerationStatus('streaming')
                }
              } catch {}
            }
          }
        }

        if (buffer.trim()) {
          try {
            const data = JSON.parse(buffer.trim())
            if (data.sentences) {
              setSentenceOptions(data.sentences)
              setGenerationStatus('success')
            }
          } catch {}
        }
      } else {
        const data = await res.json()
        setSentenceOptions(data.sentences || [])
        setGenerationStatus('success')
      }
    } catch {
      setGenerationStatus('error')
    }
  }

  function handleReject(sentence) {
    const newRejected = [...rejectedSentences, sentence]
    setRejectedSentences(newRejected)
    handleGenerate(newRejected)
  }

  function handleRetry() {
    handleGenerate(rejectedSentences)
  }

  function handleNewGeneration() {
    setRejectedSentences([])
    handleGenerate([])
  }

  return (
    <>
      {showSplash && <OnboardingSplash onDismiss={() => setShowSplash(false)} />}
      {toast && <Toast message={toast} />}

      <div className={`app profile-${activeProfileId}${contrastMode ? ' high-contrast' : ''}`}>
        <header className="app-header">
          <div className="app-brand">
            <h1 className="app-title">Voca</h1>
            <span className="app-tagline">When words don't come — Voca speaks.</span>
          </div>
          <div className="header-controls">
            <ProfileToggle activeProfileId={activeProfileId} onChange={setActiveProfileId} />
            <ContrastModeToggle enabled={contrastMode} onToggle={() => setContrastMode(v => !v)} />
          </div>
        </header>

        <main className="app-main">
          <HowItWorks />

          <QuickEmergency profileId={activeProfileId} />

          <QuickStartScenarios onSelectScenario={handleSelectScenario} />

          <CategoryGrid
            selectedConceptIds={selectedConceptIds}
            onToggle={toggleConcept}
          />

          <div ref={trayRef}>
            <SelectionTray
              selectedConceptIds={selectedConceptIds}
              onDeselect={deselectConcept}
              onGenerate={handleNewGeneration}
              onClearAll={clearAll}
            />
          </div>

          <SavedPhrases profileId={activeProfileId} />

          {generationStatus !== 'idle' && (
            <GenerationResultPanel
              status={generationStatus}
              sentences={sentenceOptions}
              streamingText={streamingText}
              activeProfileId={activeProfileId}
              profileNames={PROFILE_NAMES}
              onReject={handleReject}
              onRetry={handleRetry}
            />
          )}
        </main>
      </div>
    </>
  )
}
