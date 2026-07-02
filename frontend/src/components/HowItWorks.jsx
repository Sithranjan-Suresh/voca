const STEPS = [
  { n: "1", label: "Tap concepts", icon: "👆" },
  { n: "2", label: "Generate",     icon: "✦" },
  { n: "3", label: "Speak",        icon: "🔊" },
]

export default function HowItWorks() {
  return (
    <div className="how-it-works" aria-label="How Voca works">
      {STEPS.map((step, i) => (
        <div key={step.n} className="hiw-step">
          <span className="hiw-icon" aria-hidden="true">{step.icon}</span>
          <span className="hiw-label">{step.label}</span>
          {i < STEPS.length - 1 && <span className="hiw-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  )
}
