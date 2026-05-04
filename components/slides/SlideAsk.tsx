'use client'
import type { SlideProps } from '../Deck'

export default function SlideAsk({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-ask${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Roadmap &amp; The Ask</p>
        <h2 className="slide-title">CAD $60,000 seed<br />to launch in Ontario + California by Q4 2026.</h2>
        <div className="ask-layout">
          <div className="timeline">
            <div className="tl-item tl-done" data-stagger="0">
              <div className="tl-dot tl-dot--done" />
              <div className="tl-body">
                <span className="tl-date">Feb – Apr 2026</span>
                <span className="tl-title">Discovery + MVP</span>
                <span className="tl-desc">48 user interviews · VoiceGuard + MessageGuard demo-ready · 84 waitlist signups</span>
              </div>
            </div>
            <div className="tl-item tl-now" data-stagger="1">
              <div className="tl-dot tl-dot--now" />
              <div className="tl-body">
                <span className="tl-date">Apr – May 2026 ← NOW</span>
                <span className="tl-title">AIEC Semi-Finals + HomeGuard MVP</span>
                <span className="tl-desc">On-device fall detector live · 3-pillar suite demo-ready</span>
              </div>
            </div>
            <div className="tl-item" data-stagger="2">
              <div className="tl-dot" />
              <div className="tl-body">
                <span className="tl-date">June 13, 2026</span>
                <span className="tl-title">AIEC Finals</span>
                <span className="tl-desc">In-person pitch + poster · Full 3-pillar live demo</span>
              </div>
            </div>
            <div className="tl-item" data-stagger="3">
              <div className="tl-dot" />
              <div className="tl-body">
                <span className="tl-date">Aug – Oct 2026</span>
                <span className="tl-title">Commercial v1 — ON + CA</span>
                <span className="tl-desc">Public launch at aegisfamily.ai · Paid marketing · Elder-care agency partnerships</span>
              </div>
            </div>
            <div className="tl-item" data-stagger="4">
              <div className="tl-dot" />
              <div className="tl-body">
                <span className="tl-date">2027+</span>
                <span className="tl-title">B2B2C + Expansion</span>
                <span className="tl-desc">White-label for senior-care communities · MedGuard · RouteGuard</span>
              </div>
            </div>
          </div>
          <div className="ask-breakdown">
            <p className="ask-breakdown__title">Seed allocation</p>
            <div className="ask-row" data-stagger="0"><span className="ask-pct">~40%</span><span className="ask-lbl">API + cloud infra during beta (Whisper, LLMs, Firebase, FCM)</span></div>
            <div className="ask-row" data-stagger="1"><span className="ask-pct">~25%</span><span className="ask-lbl">Threat-intel feeds + domain + tooling</span></div>
            <div className="ask-row" data-stagger="2"><span className="ask-pct">~20%</span><span className="ask-lbl">User acquisition — caregiver channel</span></div>
            <div className="ask-row" data-stagger="3"><span className="ask-pct">~15%</span><span className="ask-lbl">Legal, compliance, elder-care partnerships</span></div>
            <div className="ask-vision">
              <p>Breakeven at <strong>2,810</strong> paying households.</p>
              <p>Year 1 target: <strong>5,000 HH · CAD $780K ARR</strong>.</p>
              <p className="ask-vision__close">The future of safety should feel invisible — but always present.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
