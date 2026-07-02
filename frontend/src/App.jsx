import { useState } from 'react'
import ProfileToggle from './components/ProfileToggle'
import ContrastModeToggle from './components/ContrastModeToggle'
import CategoryGrid from './components/CategoryGrid'
import SelectionTray from './components/SelectionTray'
import GenerationResultPanel from './components/GenerationResultPanel'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState('jordan')
  const [contrastMode, setContrastMode] = useState(false)
  const [selectedConceptIds, setSelectedConceptIds] = useState([])
  const [generationStatus, setGenerationStatus] = useState('idle') // idle | loading | success | error
  const [sentenceOptions, setSentenceOptions] = useState([])
  const [rejectedSentences, setRejectedSentences] = useState([])

  function toggleConcept(id) {
    setSelectedConceptIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function deselectConcept(id) {
    setSelectedConceptIds(prev => prev.filter(x => x !== id))
  }

  async function handleGenerate(excluded = []) {
    setGenerationStatus('loading')
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
      const data = await res.json()
      if (!res.ok) {
        setGenerationStatus('error')
        return
      }
      setSentenceOptions(data.sentences)
      setGenerationStatus('success')
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
    <div className={`app${contrastMode ? ' high-contrast' : ''}`}>
      <header className="app-header">
        <h1 className="app-title">Voca</h1>
        <div className="header-controls">
          <ProfileToggle activeProfileId={activeProfileId} onChange={setActiveProfileId} />
          <ContrastModeToggle enabled={contrastMode} onToggle={() => setContrastMode(v => !v)} />
        </div>
      </header>

      <main className="app-main">
        <CategoryGrid
          selectedConceptIds={selectedConceptIds}
          onToggle={toggleConcept}
        />

        <SelectionTray
          selectedConceptIds={selectedConceptIds}
          onDeselect={deselectConcept}
          onGenerate={handleNewGeneration}
        />

        {generationStatus !== 'idle' && (
          <GenerationResultPanel
            status={generationStatus}
            sentences={sentenceOptions}
            onReject={handleReject}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  )
}
