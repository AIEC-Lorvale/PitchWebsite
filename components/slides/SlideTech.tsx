'use client'
import type { SlideProps } from '../Deck'

export default function SlideTech({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-tech${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner arch-layout">
        <header className="arch-head">
          <h2 className="arch-title">System Architecture</h2>
          <p className="arch-subtitle">Multi-input - Layered detection - Unified output</p>
        </header>

        <div className="arch-sections">
          <article className="arch-section">
            <div className="arch-section-head">
              <p className="arch-kicker">Scam Detection System</p>
              <h3 className="arch-section-title">Scam Detection</h3>
            </div>

            <section className="arch-stage">
              <p className="arch-stage-label">Input Normalization</p>
              <p className="arch-flowline"><strong>Voice</strong> -&gt; Speech-to-Text</p>
              <p className="arch-flowline"><strong>Messages</strong> -&gt; Text</p>
              <p className="arch-flowmerge">Both inputs merge into:</p>
              <p className="arch-flowtarget">TEXT PIPELINE</p>
            </section>

            <section className="arch-stage">
              <p className="arch-stage-label">Two-Layer Detection</p>
              <div className="arch-layer">
                <p className="arch-layer-id">Layer 1</p>
                <p><strong>Custom ML classifier</strong></p>
                <p>Keyword / pattern detection - <strong>&lt;40ms</strong></p>
              </div>
              <p className="arch-arrowline">v</p>
              <div className="arch-layer">
                <p className="arch-layer-id">Layer 2</p>
                <p><strong>LLM-based reasoning</strong></p>
                <p>Context + intent analysis - API inference</p>
              </div>
            </section>

            <section className="arch-stage">
              <p className="arch-stage-label">Output</p>
              <p className="arch-em">Decision Engine</p>
              <p>risk scoring - explanation generation - alert trigger</p>
            </section>

            <p className="arch-stackline">
              <strong>Stack:</strong> GradientBoosting - Scam lexicon - Whisper STT - LLM inference
            </p>
          </article>

          <article className="arch-section">
            <div className="arch-section-head">
              <p className="arch-kicker">Fall Detection System</p>
              <h3 className="arch-section-title">Fall Detection (HomeGuard)</h3>
            </div>

            <section className="arch-stage">
              <p className="arch-stage-label">Input</p>
              <p className="arch-em">Camera / Video Feed</p>
              <p className="arch-arrowline">v</p>
            </section>

            <section className="arch-stage">
              <p className="arch-stage-label">Vision Pipeline</p>
              <p><strong>YOLOv8n</strong> person detection</p>
              <p className="arch-arrowline">v</p>
              <p><strong>MediaPipe BlazePose</strong> 33-point pose tracking</p>
              <p className="arch-arrowline">v</p>
              <p><strong>Feature extraction</strong> 7 pose features</p>
              <p className="arch-arrowline">v</p>
            </section>

            <section className="arch-stage">
              <p className="arch-stage-label">Classification</p>
              <p className="arch-em">Logistic Regression (fall classifier)</p>
              <p className="arch-arrowline">v</p>
            </section>

            <section className="arch-stage">
              <p className="arch-stage-label">Output</p>
              <p className="arch-em">Edge Decision Engine</p>
              <p>fall detection - alert trigger <strong>(&lt;500ms)</strong></p>
            </section>

            <section className="arch-stage">
              <p className="arch-stage-label">Deployment</p>
              <p><strong>Runs on-device (edge)</strong></p>
              <p>No continuous streaming</p>
            </section>

            <p className="arch-stackline">
              <strong>Stack:</strong> YOLOv8n - BlazePose - LR classifier - On-device inference
            </p>
          </article>
        </div>

        <footer className="arch-foot">
          <span>Layered detection architecture</span>
          <span>Unified alert system</span>
          <span>Low-latency inference</span>
          <span>Privacy-first design</span>
        </footer>
      </div>
    </section>
  )
}
