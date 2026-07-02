export default function SentenceOption({ sentence, onReject }) {
  function handleSpeak() {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(sentence)
    utterance.rate = 0.95
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="sentence-option">
      <p className="sentence-text">{sentence}</p>
      <div className="sentence-actions">
        <button className="btn-speak" onClick={handleSpeak} aria-label="Speak this sentence">
          🔊 Speak
        </button>
        <button className="btn-reject" onClick={onReject} aria-label="Reject this sentence and get another">
          👎
        </button>
      </div>
    </div>
  )
}
