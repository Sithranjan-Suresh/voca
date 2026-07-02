const PROFILES = [
  { id: 'jordan', label: 'Jordan' },
  { id: 'alex', label: 'Alex' },
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
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
