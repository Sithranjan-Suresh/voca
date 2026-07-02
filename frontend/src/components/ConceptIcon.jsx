import ConceptSVGIcon from './ConceptIcons'

export default function ConceptIcon({ concept, selected, onToggle }) {
  return (
    <button
      className={`concept-icon${selected ? ' selected' : ''}`}
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={concept.label}
    >
      <ConceptSVGIcon id={concept.icon} size={26} />
      <span className="concept-icon-label">{concept.label}</span>
    </button>
  )
}
