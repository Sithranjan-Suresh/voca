import { motion, AnimatePresence } from 'framer-motion'
import SentenceOption from './SentenceOption'

const panelAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 16 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.15 } },
}

export default function GenerationResultPanel({
  status, sentences, streamingText, activeProfileId, profileNames, onReject, onRetry, onSwitchProfile
}) {
  const profileLabel = profileNames?.[activeProfileId] || activeProfileId
  const otherProfileId = activeProfileId === 'jordan' ? 'alex' : 'jordan'
  const otherProfileLabel = profileNames?.[otherProfileId] || otherProfileId

  if (status === 'loading') {
    return (
      <motion.div {...panelAnim} className="result-panel result-loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Generating in {profileLabel}'s voice…</p>
      </motion.div>
    )
  }

  if (status === 'streaming') {
    const displaySentences = streamingText.length > 0 ? streamingText : sentences
    return (
      <motion.div {...panelAnim} className="result-panel" role="region" aria-live="polite">
        <div className="result-label-row">
          <span className="profile-voice-badge">In {profileLabel}'s voice</span>
          <span className="result-subline">Reconstructed from your concepts — not predicted text</span>
        </div>
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
      </motion.div>
    )
  }

  if (status === 'error') {
    return (
      <motion.div {...panelAnim} className="result-panel result-error" role="alert">
        <p>Something went wrong. Please try again.</p>
        <button className="btn-retry" onClick={onRetry}>Try again</button>
      </motion.div>
    )
  }

  if (status === 'success' && sentences.length > 0) {
    return (
      <motion.div {...panelAnim} className="result-panel" role="region" aria-label="Generated sentences" aria-live="polite">
        <div className="result-label-row">
          <span className="profile-voice-badge">In {profileLabel}'s voice</span>
          <span className="result-subline">Reconstructed from your concepts — not predicted text</span>
        </div>
        <AnimatePresence>
          {sentences.map((sentence, i) => (
            <motion.div
              key={`${sentence}-${i}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 150, damping: 16 }}
            >
              <SentenceOption
                sentence={sentence}
                profileId={activeProfileId}
                onReject={() => onReject(sentence)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {onSwitchProfile && (
          <button className="btn-switch-profile" onClick={onSwitchProfile}>
            Try {otherProfileLabel}'s voice →
          </button>
        )}
      </motion.div>
    )
  }

  return null
}
