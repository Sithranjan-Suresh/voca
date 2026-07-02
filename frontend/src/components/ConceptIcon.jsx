export default function ConceptIcon({ concept, selected, onToggle }) {
  return (
    <button
      className={`concept-icon${selected ? ' selected' : ''}`}
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={concept.label}
    >
      <span className="concept-icon-emoji" aria-hidden="true">{concept.icon}</span>
      <span className="concept-icon-label">{concept.label}</span>
    </button>
  )
}
