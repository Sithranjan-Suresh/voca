const PROFILES = [
  { id: 'jordan', label: 'Jake', subtitle: 'Casual · TBI recovery' },
  { id: 'alex',   label: 'Maria', subtitle: 'Formal · Stroke survivor' },
]

export default function ProfileToggle({ activeProfileId, onChange }) {
  return (
    <div className="profile-toggle" role="group" aria-label="Select voice profile">
      {PROFILES.map(p => (
        <button
          key={p.id}
          className={`profile-btn${activeProfileId === p.id ? ' active' : ''}`}
          onClick={() => onChange(p.id)}
          aria-pressed={activeProfileId === p.id}
          title={p.subtitle}
        >
          <span className="profile-btn-name">{p.label}</span>
          <span className="profile-btn-sub">{p.subtitle}</span>
        </button>
      ))}
    </div>
  )
}
