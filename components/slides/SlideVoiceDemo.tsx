'use client'
import { useState, useEffect, useRef } from 'react'
import type { SlideProps } from '../Deck'

const TRANSCRIPT = "Hi there, this is Michael from the Canada Revenue Agency. We've detected unusual activity on your account and need to verify your identity immediately. Failure to respond will result in your account being frozen and legal proceedings being initiated against you. Please press 1 now to speak with our security department. This is urgent."

const SIGNALS = [
  'Government impersonation (CRA)',
  'Artificial urgency + threat of legal action',
  'Unsolicited call requesting immediate response',
  'Secrecy cue: "press 1 now"',
  'Money transfer / account threat framing',
]

export default function SlideVoiceDemo({ isActive, isPrev }: SlideProps) {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'typing' | 'done'>('idle')
  const [typedText, setTypedText] = useState('')
  const [showVerdict, setShowVerdict] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isActive) {
      setPhase('idle')
      setTypedText('')
      setShowVerdict(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive])

  function handlePlay() {
    if (phase !== 'idle') return
    setPhase('playing')

    setTimeout(() => {
      setPhase('typing')
      let i = 0
      timerRef.current = setInterval(() => {
        i++
        setTypedText(TRANSCRIPT.slice(0, i))
        if (i >= TRANSCRIPT.length) {
          clearInterval(timerRef.current!)
          setTimeout(() => {
            setShowVerdict(true)
            setPhase('done')
          }, 500)
        }
      }, 18)
    }, 1200)
  }

  return (
    <section className={`slide s-demo-voice${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Pillar 2 · Interactive Demo</p>
        <h2 className="slide-title">VoiceGuard</h2>
        <div className="demo-layout">
          <div className="demo-sidebar">
            <p className="demo-how-title">Pipeline</p>
            <ol className="demo-pipeline">
              <li>Audio upload via webhook (MP3 / WAV / base64)</li>
              <li>whisper-1 speech-to-text → transcript</li>
              <li>Keyword scam lexicon hit detection (sigmoid scoring)</li>
              <li>gpt-5-nano scam intent scoring + explanation</li>
              <li>Threshold-gated: explanation only above 0.26 score</li>
              <li>Result in &lt;3s · family push alert</li>
            </ol>
            <div className="demo-stat">
              <span className="demo-stat__n">94%</span>
              <span className="demo-stat__l">accuracy · F1 0.93 · 160-call blind set · EER 4.2%</span>
            </div>
          </div>
          <div className="voice-demo-wrap">
            <div className="voice-player-card">
              <div className={`voice-waveform${phase === 'playing' || phase === 'typing' ? ' is-playing' : ''}`}>
                {Array.from({ length: 15 }, (_, i) => <span key={i} />)}
              </div>
              <p className="voice-label">Incoming voicemail · unknown caller</p>
              <button
                className="voice-play-btn"
                onClick={handlePlay}
                disabled={phase !== 'idle'}
              >
                {phase === 'idle' ? '▶ Play & Analyze' : phase === 'done' ? '✓ Analysis complete' : '⏸ Analyzing…'}
              </button>
            </div>
            <div className={`voice-transcript-card${phase !== 'idle' ? ' is-visible' : ''}`}>
              <p className="voice-transcript-title">Transcript</p>
              <p className="voice-transcript-text">{typedText}</p>
            </div>
            <div className={`voice-verdict-card${showVerdict ? ' is-visible' : ''}`}>
              <div className="voice-verdict-badge demo-verdict-badge badge--scam">🚨 DO NOT TRUST</div>
              <div className="voice-signals">
                {SIGNALS.map((s, i) => <span key={i} className="signal-tag">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
