'use client'
import type { SlideProps } from '../Deck'

export default function SlideMarket({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-market${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Market Opportunity</p>
        <h2 className="slide-title">39M households.<br />Two unserved needs. One hub.</h2>
        <div className="market-layout">
          <div className="market-funnel">
            <div className="mf-layer mf-tam" data-stagger="0">
              <span className="mf-num">39M</span>
              <span className="mf-label">TAM · All NA 65+ households</span>
            </div>
            <div className="mf-arrow" aria-hidden="true">▼</div>
            <div className="mf-layer mf-sam" data-stagger="1">
              <span className="mf-num">9.4M</span>
              <span className="mf-label">SAM · Digitally-reachable w/ caregiver (24% of TAM)</span>
            </div>
            <div className="mf-arrow" aria-hidden="true">▼</div>
            <div className="mf-layer mf-som" data-stagger="2">
              <span className="mf-num">620K</span>
              <span className="mf-label">SOM Yr3 · Caregiver channel · ~CAD $97M ARR</span>
            </div>
          </div>
          <div className="market-milestones">
            <div className="market-ms" data-stagger="0">
              <span className="market-ms__val">5,000 HH</span>
              <span className="market-ms__lbl">Year 1 target</span>
              <span className="market-ms__arr">CAD $780K ARR</span>
            </div>
            <div className="market-ms" data-stagger="1">
              <span className="market-ms__val">2,810 HH</span>
              <span className="market-ms__lbl">Breakeven</span>
              <span className="market-ms__arr">CAD $23K fixed costs</span>
            </div>
            <div className="market-ms market-ms--hi" data-stagger="2">
              <span className="market-ms__val">8.0×</span>
              <span className="market-ms__lbl">LTV / CAC</span>
              <span className="market-ms__arr">LTV CAD $257 · CAC CAD $32</span>
            </div>
            <div className="market-ms" data-stagger="3">
              <span className="market-ms__val">63%</span>
              <span className="market-ms__lbl">Gross margin</span>
              <span className="market-ms__arr">Improves to 71% Year 2</span>
            </div>
          </div>
        </div>
        <p className="market-driver">Scam losses up 25% YoY (FTC) · Falls cost USD $50B/yr in US medical costs (CDC) · AARP: 53M caregivers avg $7,200/yr out-of-pocket</p>
      </div>
    </section>
  )
}
