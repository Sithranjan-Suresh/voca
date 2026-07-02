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
          selected.map(concept => (
            <button
              key={concept.id}
              className="tray-chip"
              onClick={() => onDeselect(concept.id)}
              aria-label={`Remove ${concept.label}`}
            >
              {concept.label}
              <span className="chip-remove" aria-hidden="true">✕</span>
            </button>
          ))
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
        <button
          className={`btn-generate${canGenerate ? ' btn-generate-ready' : ''}`}
          onClick={onGenerate}
          disabled={!canGenerate}
          aria-disabled={!canGenerate}
        >
          Generate ✦
        </button>
      </div>
    </div>
  )
}
