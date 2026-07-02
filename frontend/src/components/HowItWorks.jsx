const STEPS = [
  { label: "Tap concepts", icon: "👆" },
  { label: "Generate",     icon: "✦" },
  { label: "Speak",        icon: "🔊" },
]

export default function HowItWorks() {
  return (
    <div className="how-it-works-wrapper">
      <div className="how-it-works" aria-label="How Voca works">
        {STEPS.map((step, i) => (
          <div key={step.label} className="hiw-step">
            <span className="hiw-icon" aria-hidden="true">{step.icon}</span>
            <span className="hiw-label">{step.label}</span>
            {i < STEPS.length - 1 && <span className="hiw-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="hiw-tagline">Not autocomplete — Voca reconstructs full sentences from disconnected concepts.</p>
    </div>
  )
}
