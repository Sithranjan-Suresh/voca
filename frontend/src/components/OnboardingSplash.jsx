import { useEffect, useState } from 'react'

export default function OnboardingSplash({ onDismiss }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => handleDismiss(), 5000)
    return () => clearTimeout(t)
  }, [])

  function handleDismiss() {
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  return (
    <div className={`splash-overlay${visible ? '' : ' splash-out'}`} onClick={handleDismiss}>
      <div className="splash-card" onClick={e => e.stopPropagation()}>
        <div className="splash-icon" aria-hidden="true">🗣️</div>
        <h2 className="splash-title">Meet Voca</h2>
        <p className="splash-stat">
          <strong>Over 2 million Americans</strong> live with aphasia — a condition
          that leaves intent fully intact but makes producing words and sentences
          nearly impossible.
        </p>
        <p className="splash-body">
          Existing tools still require sentence construction — the very thing aphasia makes hard.
          <br /><br />
          Voca inverts this. Tap a few concepts. Get your sentence. Speak.
        </p>
        <button className="splash-btn" onClick={handleDismiss}>
          Try Voca →
        </button>
        <p className="splash-skip">Tap anywhere to skip</p>
      </div>
    </div>
  )
}
