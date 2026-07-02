import SentenceOption from './SentenceOption'

export default function GenerationResultPanel({ status, sentences, onReject, onRetry }) {
  if (status === 'loading') {
    return (
      <div className="result-panel result-loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Generating your sentence…</p>
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
        <p className="result-label">Choose a sentence:</p>
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
