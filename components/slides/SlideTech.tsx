'use client'
import type { SlideProps } from '../Deck'

export default function SlideTech({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-tech${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">AI Technology</p>
        <h2 className="slide-title">Two pipelines. Built for speed,<br />privacy, and real families.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>

          {/* ── Scam Detection ── */}
          <div
            data-stagger="0"
            style={{
              padding: '1.4rem',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '18px',
              background: 'rgba(255,255,255,0.035)',
              display: 'grid',
              gap: '1rem',
              alignContent: 'start',
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>Scam Detection</p>
              <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                VoiceGuard + MessageGuard
              </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.65rem' }}>
              {[
                <><strong style={{ color: 'var(--text)' }}>Layer 1</strong> — Custom ML classifier, keyword + pattern detection</>,
                <><strong style={{ color: 'var(--text)' }}>Layer 2</strong> — LLM reasoning, context + intent analysis</>,
                <>Handles voice (STT) and text in one unified pipeline</>,
                <>Risk score + plain-language explanation + alert trigger</>,
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', paddingLeft: '1rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>›</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(196,96,26,0.1)',
              border: '1px solid rgba(196,96,26,0.3)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.55rem',
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '-0.04em', lineHeight: 1 }}>&lt;40ms</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>detection latency</span>
            </div>
          </div>

          {/* ── Fall Detection ── */}
          <div
            data-stagger="1"
            style={{
              padding: '1.4rem',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '18px',
              background: 'rgba(255,255,255,0.035)',
              display: 'grid',
              gap: '1rem',
              alignContent: 'start',
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>Fall Detection</p>
              <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                HomeGuard Vision Pipeline
              </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.65rem' }}>
              {[
                <>YOLOv8n person detection → BlazePose 33-point pose tracking</>,
                <>7-feature logistic regression classifier</>,
                <><strong style={{ color: 'var(--text)' }}>Runs fully on-device</strong> — no continuous streaming</>,
                <>Only a short encrypted clip leaves the device on a confirmed event</>,
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', paddingLeft: '1rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>›</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(196,96,26,0.1)',
              border: '1px solid rgba(196,96,26,0.3)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.55rem',
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '-0.04em', lineHeight: 1 }}>&lt;500ms</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>edge inference response</span>
            </div>
          </div>
        </div>

        <footer
          className="arch-foot"
          style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
        >
          <span>On-device inference</span>
          <span>Privacy-first design</span>
          <span>&lt;40ms scam detection</span>
          <span>&lt;500ms fall response</span>
        </footer>
      </div>
    </section>
  )
}
