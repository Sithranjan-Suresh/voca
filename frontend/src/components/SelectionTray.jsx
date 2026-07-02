import { motion, AnimatePresence } from 'framer-motion'
import { CONCEPTS } from '../data/concepts'

export default function SelectionTray({ selectedConceptIds, onDeselect, onGenerate, onClearAll }) {
  const selected = selectedConceptIds.map(id => CONCEPTS.find(c => c.id === id)).filter(Boolean)
  const canGenerate = selectedConceptIds.length >= 2

  return (
    <div className="selection-tray" role="region" aria-label="Selected concepts">
      <div className="tray-chips">
        {selected.length === 0 ? (
          <span className="tray-empty">Tap concepts above to get started</span>
        ) : (
          <AnimatePresence>
            {selected.map(concept => (
              <motion.button
                key={concept.id}
                className="tray-chip"
                onClick={() => onDeselect(concept.id)}
                aria-label={`Remove ${concept.label}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {concept.label}
                <span className="chip-remove" aria-hidden="true">✕</span>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="tray-actions">
        {selected.length > 0 && (
          <button className="btn-clear" onClick={onClearAll} aria-label="Clear all selections">
            Clear
          </button>
        )}
        {!canGenerate && selectedConceptIds.length > 0 && (
          <p className="tray-hint" role="status">Select at least 2 ideas</p>
        )}
        <motion.button
          className={`btn-generate${canGenerate ? ' btn-generate-ready' : ''}`}
          onClick={onGenerate}
          disabled={!canGenerate}
          aria-disabled={!canGenerate}
          whileHover={canGenerate ? { scale: 1.04, y: -2 } : {}}
          whileTap={canGenerate ? { scale: 0.97, y: 2 } : {}}
        >
          Generate ✦
        </motion.button>
      </div>
    </div>
  )
}
