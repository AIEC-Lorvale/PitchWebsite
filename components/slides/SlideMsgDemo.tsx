'use client'
import { useState, useEffect, useRef } from 'react'
import type { SlideProps } from '../Deck'

const SCAM_KEYWORDS = [
  'bank','account','locked','suspended','urgent','verify','click',
  'password','credit card','winner','prize','congratulations','qr',
  'transfer','wire','irs','cra','arrest','lawsuit','social security',
  'grandma','accident','police','lottery','bitcoin','crypto',
]

const VERDICTS = {
  scam: {
    cls: 'badge--scam',
    label: '🚨 SCAM DETECTED',
    reasons: [
      'Urgency trigger: "NOW" + time pressure ("2 hours")',
      'Impersonation pattern: "this is your bank"',
      'Suspicious action request: QR code scan',
      'High-risk phrasing matches known phishing templates',
    ],
    alert: 'Alert dispatched to family dashboard · Evidence logged',
  },
  suspicious: {
    cls: 'badge--suspicious',
    label: '⚠ SUSPICIOUS',
    reasons: [
      'Unusual request for personal action via message',
      'Informal language inconsistent with claimed sender',
      'No verifiable sender ID',
    ],
    alert: 'Flagged for family review · Verify through official channels',
  },
  safe: {
    cls: 'badge--safe',
    label: '✓ SAFE',
    reasons: [
      'No urgent action requests',
      'No links or QR codes detected',
      'Message pattern consistent with normal communication',
    ],
    alert: 'No action required',
  },
} as const

type VerdictKey = keyof typeof VERDICTS

function classify(text: string): VerdictKey {
  const lower = text.toLowerCase()
  const hits = SCAM_KEYWORDS.filter(k => lower.includes(k))
  if (hits.length >= 3) return 'scam'
  if (hits.length >= 1) return 'suspicious'
  return 'safe'
}

const DEFAULT_MSG = "Dad, this is your bank. Your account has been compromised. Scan this QR code NOW or your account will be locked within 2 hours."

export default function SlideMsgDemo({ isActive, isPrev }: SlideProps) {
  const [bubbleText, setBubbleText] = useState(DEFAULT_MSG)
  const [inputText, setInputText] = useState('')
  const [verdict, setVerdict] = useState<VerdictKey | null>(null)
  const [isDanger, setIsDanger] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const hasInit = useRef(false)

  function runAnalysis(text: string) {
    setBubbleText(text)
    setVerdict(null)
    setIsDanger(false)
    setPanelVisible(false)

    setTimeout(() => setIsDanger(true), 300)
    setTimeout(() => {
      const v = classify(text)
      setVerdict(v)
      setPanelVisible(true)
      if (v === 'safe') setIsDanger(false)
    }, 900)
  }

  useEffect(() => {
    if (isActive && !hasInit.current) {
      hasInit.current = true
      setTimeout(() => runAnalysis(DEFAULT_MSG), 600)
    }
    if (!isActive) {
      hasInit.current = false
      setVerdict(null)
      setIsDanger(false)
      setPanelVisible(false)
      setBubbleText(DEFAULT_MSG)
    }
  }, [isActive])

  function handleAnalyze() {
    const text = inputText.trim()
    if (text) { runAnalysis(text); setInputText('') }
  }

  const v = verdict ? VERDICTS[verdict] : null

  return (
    <section className={`slide s-demo-msg${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Pillar 1 · Interactive Demo</p>
        <h2 className="slide-title">MessageGuard</h2>
        <div className="demo-layout">
          <div className="demo-sidebar">
            <p className="demo-how-title">Pipeline</p>
            <ol className="demo-pipeline">
              <li>Share-sheet → FastAPI gateway</li>
              <li>URL regex extraction + OpenCV / ZXing QR decode</li>
              <li>Google Safe Browsing v4 + PhishTank threat feeds</li>
              <li>GradientBoosting URL classifier (18 features)</li>
              <li>gpt-4o-mini full-message text analysis + signal fusion</li>
              <li>Verdict pushed to family dashboard</li>
            </ol>
            <div className="demo-stat">
              <span className="demo-stat__n">91%</span>
              <span className="demo-stat__l">accuracy · 240-message blind set · AUC 0.94</span>
            </div>
          </div>
          <div className="demo-phone-wrap">
            <div className="demo-phone">
              <div className="demo-phone__notch" />
              <div className="demo-phone__screen">
                <div className="demo-phone__topbar">Messages · Unknown</div>
                <div className="demo-phone__chat">
                  <div className={`demo-bubble${isDanger ? ' is-danger' : ''}`}>{bubbleText}</div>
                </div>
                <div className="demo-phone__input-row">
                  <textarea
                    className="demo-text-input"
                    placeholder="Try your own message…"
                    rows={2}
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAnalyze() } }}
                  />
                  <button className="demo-analyze-btn" onClick={handleAnalyze}>Analyze →</button>
                </div>
              </div>
            </div>
            <div className="demo-verdict-panel" style={{ opacity: panelVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              {v && <>
                <div className={`demo-verdict-badge ${v.cls}`}>{v.label}</div>
                <ul className="demo-verdict-reasons">
                  {v.reasons.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <p className="demo-verdict-alert">{v.alert}</p>
              </>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
