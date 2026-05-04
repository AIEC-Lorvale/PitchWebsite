'use client'
import { useEffect, useRef } from 'react'
import type { SlideProps } from '../Deck'

const HYPOTHESES = [
  { label: 'H1 · Scam exposure widespread (target ≥60%)', val: 78, color: '#3db96a', obs: '78% observed', pass: true },
  { label: 'H2 · Senior unaided detection below chance (target <50%)', val: 39, color: '#e8793a', obs: '39% accuracy — worse than random', pass: true },
  { label: 'H3 · Guardians willing to pay CAD $12.99/mo (target ≥35%)', val: 41, color: '#3db96a', obs: '41% · 73% prefer bundled pricing', pass: true },
  { label: 'H4 · Guardian NPS exceeds Senior NPS by ≥15 pts', val: 68, color: '#3db96a', obs: '+22 point gap (NPS +43 vs +21)', pass: true },
  { label: 'H5 · Guardian fall-anxiety ≥7/10 + senior accepts hallway camera (target ≥60% + ≥50%)', val: 74, color: '#3db96a', obs: '74% fall-anxiety ≥7 · 64% camera acceptance', pass: true },
]

export default function SlideValidation({ isActive, isPrev }: SlideProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (isActive && !triggeredRef.current) {
      triggeredRef.current = true
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        const val = HYPOTHESES[i].val
        setTimeout(() => { bar.style.width = `${val}%` }, i * 150 + 200)
      })
    }
    if (!isActive) {
      triggeredRef.current = false
      barsRef.current.forEach(bar => { if (bar) bar.style.width = '0%' })
    }
  }, [isActive])

  return (
    <section className={`slide s-validation${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Market Validation · n=48 guardian-senior study · Feb–Mar 2026</p>
        <h2 className="slide-title">5 hypotheses tested.<br />5 hypotheses passed.</h2>
        <div className="hypotheses">
          {HYPOTHESES.map((h, i) => (
            <div key={i} className="hyp" data-stagger={i}>
              <div className="hyp__label">{h.label}</div>
              <div className="hyp__bar-wrap">
                <div
                  className="hyp__bar"
                  ref={el => { barsRef.current[i] = el }}
                  style={{ width: '0%', ['--c' as string]: h.color }}
                />
              </div>
              <div className="hyp__nums">
                <span className="hyp__obs">{h.obs}</span>
                <span className="hyp__pass">PASS</span>
              </div>
            </div>
          ))}
        </div>
        <div className="validation-bonus">
          <span>84 wait-list signups during research window</span>
          <span>90% prototype task-success rate (9/10)</span>
          <span>Guardian satisfaction 8.7/10</span>
        </div>
      </div>
    </section>
  )
}
