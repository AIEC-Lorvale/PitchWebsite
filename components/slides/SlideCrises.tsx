'use client'
import type { SlideProps } from '../Deck'

export default function SlideCrises({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-crises${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Two Coinciding Crises</p>
        <h2 className="slide-title">Fraud and falls — same people,<br />same homes, zero integrated solution.</h2>
        <div className="crises-grid">
          <div className="crisis-card" data-stagger="0">
            <div className="crisis-top">
              <span className="crisis-tag crisis-tag--fraud">SCAM FRAUD</span>
              <span className="crisis-num">$12.5B</span>
              <span className="crisis-denom">US consumer fraud losses · 2024</span>
            </div>
            <ul className="crisis-list">
              <li>Adults 60+ report highest median losses per incident <span className="src">(FTC 2025)</span></li>
              <li>CAD $638M in Canadian losses — true figure 5–10× higher <span className="src">(CAFC 2025)</span></li>
              <li>AI voice cloning &amp; LLM-written phishing crossed consumer-quality threshold in 2024</li>
              <li>Imposter scams now #1 fraud category by complaint volume</li>
            </ul>
          </div>
          <div className="crisis-card" data-stagger="1">
            <div className="crisis-top">
              <span className="crisis-tag crisis-tag--falls">UNATTENDED FALLS</span>
              <span className="crisis-num">1 in 4</span>
              <span className="crisis-denom">Adults 65+ falls each year</span>
            </div>
            <ul className="crisis-list">
              <li>3M emergency-department visits annually in the US <span className="src">(CDC 2024)</span></li>
              <li>~38,000 deaths per year — falls are the 2nd leading cause of unintentional injury death <span className="src">(WHO)</span></li>
              <li>85% of seniors&apos; injury-related hospitalizations in Canada <span className="src">(Stats Canada)</span></li>
              <li>Time-to-help is the single biggest lever on survival outcomes</li>
            </ul>
          </div>
        </div>
        <p className="crises-gap" data-stagger="2">Today the market sells a scam-call app <em>over here</em>, a medical pendant <em>over there</em>, a camera for a third fee.<br /><strong>No one offers one account that does both.</strong></p>
      </div>
    </section>
  )
}
