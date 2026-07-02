export default function ContrastModeToggle({ enabled, onToggle }) {
  return (
    <button
      className={`contrast-toggle${enabled ? ' active' : ''}`}
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label="Toggle high contrast mode"
      title="High contrast"
    >
      ◑
    </button>
  )
}
