'use client'
import type { SlideProps } from '../Deck'

export default function SlideTech({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-tech${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Technology</p>
        <h2 className="slide-title">Three pipelines. One hub.<br />Original ML assets — not a ChatGPT wrapper.</h2>
        <div className="tech-table">
          <div className="tech-table__head">
            <span>Pillar</span>
            <span>Models &amp; Tools</span>
            <span>Runs where</span>
            <span>Accuracy</span>
          </div>
          <div className="tech-row" data-stagger="0">
            <span className="tech-pillar-label">MessageGuard</span>
            <span className="tech-models">In-house GradientBoosting (18 URL features) · Google Safe Browsing v4 · PhishTank · gpt-4o-mini text analysis · OpenCV + ZXing QR decode</span>
            <span className="tech-where">Cloud · sandboxed fetch</span>
            <span className="tech-acc good">91% · AUC 0.94 · p95 800ms</span>
          </div>
          <div className="tech-row" data-stagger="1">
            <span className="tech-pillar-label">VoiceGuard</span>
            <span className="tech-models">whisper-1 transcription · Keyword scam lexicon (sigmoid scoring) · gpt-5-nano scoring + explanation</span>
            <span className="tech-where">Cloud · FastAPI + Redis</span>
            <span className="tech-acc good">94% · F1 0.93 · &lt;3s end-to-end</span>
          </div>
          <div className="tech-row" data-stagger="2">
            <span className="tech-pillar-label">HomeGuard</span>
            <span className="tech-models">YOLOv8n (frozen, COCO) · MediaPipe BlazePose 33-pt · In-house LR fall classifier (7 pose features) · gpt-5.4-nano summary</span>
            <span className="tech-where">Edge-only · on-device</span>
            <span className="tech-acc good">89% recall · ≤500ms alert</span>
          </div>
        </div>
        <div className="tech-moat">
          <p className="tech-moat__title">Our original ML assets (scikit-learn, CPU-trainable in minutes)</p>
          <div className="tech-moat__list">
            <span className="moat-item">Keyword scam lexicon · sigmoid scoring · zero-latency inference</span>
            <span className="moat-item">GradientBoosting URL classifier · 18 features · AUC 0.94 · ~30s training</span>
            <span className="moat-item">LR fall classifier · 7 pose features · 89% recall · 30FPS on $75 SBC</span>
          </div>
        </div>
        <p className="tech-privacy-note">🔒 HomeGuard raw video never leaves home · All user content purged ≤24h · Hard-coded no-training opt-out · TLS 1.3 + AES-256</p>
      </div>
    </section>
  )
}
