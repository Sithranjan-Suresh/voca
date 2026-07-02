import { useEffect, useState, useRef } from 'react'

const DURATION = 8000

export default function OnboardingSplash({ onDismiss }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  const startRef = useRef(Date.now())
  const rafRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => handleDismiss(), DURATION)

    function tick() {
      const elapsed = Date.now() - startRef.current
      const pct = Math.max(0, 100 - (elapsed / DURATION) * 100)
      setProgress(pct)
      if (pct > 0) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function handleDismiss() {
    cancelAnimationFrame(rafRef.current)
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  return (
    <div className={`splash-overlay${visible ? '' : ' splash-out'}`} onClick={handleDismiss}>
      <div className="splash-card" onClick={e => e.stopPropagation()}>
        <div className="splash-icon" aria-hidden="true">🗣️</div>
        <h2 className="splash-title">Meet Voca</h2>
        <p className="splash-stat">
          <strong>Over 2 million Americans</strong> live with aphasia — a condition that leaves
          intent fully intact but makes producing words and sentences nearly impossible.
        </p>
        <p className="splash-body">
          Imagine trying to say <em>"my chest hurts"</em> after a stroke — and not being able
          to find the words. Existing tools still require sentence construction: the very thing
          aphasia makes hard.
          <br /><br />
          Voca inverts this. <strong>Tap a few concepts. Get your sentence. Speak.</strong>
        </p>
        <button className="splash-btn" onClick={handleDismiss}>
          Try Voca →
        </button>
        <div className="splash-progress-bar" aria-hidden="true">
          <div className="splash-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="splash-skip">Tap anywhere to continue</p>
      </div>
    </div>
  )
}
