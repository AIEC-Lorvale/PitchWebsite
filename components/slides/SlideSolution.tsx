'use client'
import type { SlideProps } from '../Deck'

export default function SlideSolution({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-solution${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Our Solution</p>
        <h2 className="slide-title">One household account.<br />Three AI pillars. Zero senior setup.</h2>
        <div className="pillars-grid">
          <div className="pillar-card" data-stagger="0">
            <div className="pillar-card__head">
              <span className="pillar-card__icon">
                <svg viewBox="0 0 64 64"><rect x="10" y="14" width="44" height="32" rx="9"/><path d="M20 24h24M20 31h18"/><path d="M23 46l-6 8M41 46l6 8"/></svg>
              </span>
              <div>
                <p className="pillar-card__num">Pillar 1</p>
                <h3 className="pillar-card__name">MessageGuard</h3>
              </div>
            </div>
            <p className="pillar-card__desc">Triages forwarded texts, links, and QR codes as Safe / Suspicious / Scam with a plain-language explanation. Result in under 800ms.</p>
            <div className="pillar-card__setup"><span className="setup-tag">Setup:</span> Adult child enables share-sheet. Senior forwards with one tap.</div>
          </div>
          <div className="pillar-card" data-stagger="1">
            <div className="pillar-card__head">
              <span className="pillar-card__icon">
                <svg viewBox="0 0 64 64"><circle cx="32" cy="20" r="10"/><path d="M14 52c0-10 8-17 18-17s18 7 18 17"/><path d="M32 38v-4M24 48h16"/></svg>
              </span>
              <div>
                <p className="pillar-card__num">Pillar 2</p>
                <h3 className="pillar-card__name">VoiceGuard</h3>
              </div>
            </div>
            <p className="pillar-card__desc">Analyzes forwarded voicemails and call clips for scam-intent phrasing. Transcription → classifier → LLM explanation in under 3s.</p>
            <div className="pillar-card__setup"><span className="setup-tag">Setup:</span> Adult child configures voicemail forwarding once. Senior role: zero.</div>
          </div>
          <div className="pillar-card" data-stagger="2">
            <div className="pillar-card__head">
              <span className="pillar-card__icon">
                <svg viewBox="0 0 64 64"><rect x="16" y="8" width="32" height="48" rx="8"/><circle cx="32" cy="47" r="2.5"/><path d="M24 20c0 6 2 11 8 14 6-3 8-8 8-14"/></svg>
              </span>
              <div>
                <p className="pillar-card__num">Pillar 3</p>
                <h3 className="pillar-card__name">HomeGuard</h3>
              </div>
            </div>
            <p className="pillar-card__desc">Turns an existing camera or old phone into an on-device fall detector. Raw video never leaves the home. Only a 3-second event clip is encrypted and sent on fall.</p>
            <div className="pillar-card__setup"><span className="setup-tag">Setup:</span> Adult child mounts device (~10 min), pairs via QR. Senior role: zero.</div>
          </div>
        </div>
        <p className="solution-price-note">Family Standard · CAD $12.99 / USD $9.99 per household per month</p>
      </div>
    </section>
  )
}
