import SentenceOption from './SentenceOption'

export default function GenerationResultPanel({
  status, sentences, streamingText, activeProfileId, profileNames, onReject, onRetry
}) {
  const profileLabel = profileNames?.[activeProfileId] || activeProfileId

  if (status === 'loading') {
    return (
      <div className="result-panel result-loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Generating in {profileLabel}'s voice…</p>
      </div>
    )
  }

  if (status === 'streaming') {
    const displaySentences = streamingText.length > 0 ? streamingText : sentences
    return (
      <div className="result-panel" role="region" aria-live="polite">
        <p className="result-label">
          <span className="profile-voice-badge">In {profileLabel}'s voice</span>
        </p>
        {displaySentences.map((s, i) => (
          <div key={i} className="sentence-option sentence-streaming">
            <p className="sentence-text">{s}<span className="cursor-blink" aria-hidden="true">|</span></p>
          </div>
        ))}
        {displaySentences.length === 0 && (
          <div className="sentence-option sentence-streaming">
            <p className="sentence-text sentence-placeholder">
              <span className="cursor-blink" aria-hidden="true">|</span>
            </p>
          </div>
        )}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="result-panel result-error" role="alert">
        <p>Something went wrong. Please try again.</p>
        <button className="btn-retry" onClick={onRetry}>Try again</button>
      </div>
    )
  }

  if (status === 'success' && sentences.length > 0) {
    return (
      <div className="result-panel" role="region" aria-label="Generated sentences" aria-live="polite">
        <p className="result-label">
          <span className="profile-voice-badge">In {profileLabel}'s voice</span>
        </p>
        {sentences.map((sentence, i) => (
          <SentenceOption
            key={`${sentence}-${i}`}
            sentence={sentence}
            onReject={() => onReject(sentence)}
          />
        ))}
      </div>
    )
  }

  return null
}
