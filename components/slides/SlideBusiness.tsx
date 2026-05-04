'use client'
import type { SlideProps } from '../Deck'

export default function SlideBusiness({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-biz${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Business Model</p>
        <h2 className="slide-title">Household subscription.<br />Family-first pricing.</h2>
        <div className="pricing-row">
          <div className="pricing-card" data-stagger="0">
            <p className="pricing-card__name">Family Free</p>
            <p className="pricing-card__price">CAD $0</p>
            <ul className="pricing-card__features">
              <li>1 VoiceGuard / day</li>
              <li>3 MessageGuard / day</li>
              <li>1 HomeGuard camera</li>
              <li>No event storage</li>
            </ul>
            <p className="pricing-card__share">~70% of signups · top of funnel</p>
          </div>
          <div className="pricing-card pricing-card--hero" data-stagger="1">
            <span className="pricing-card__badge">Core revenue tier</span>
            <p className="pricing-card__name">Family Standard</p>
            <p className="pricing-card__price">CAD $12.99 <span className="pricing-per">/mo</span></p>
            <ul className="pricing-card__features">
              <li>Unlimited Voice + Message</li>
              <li>Up to 3 HomeGuard cameras</li>
              <li>30-day event storage</li>
              <li>Priority alert routing</li>
            </ul>
            <p className="pricing-card__share">~25% of signups · ~85% of revenue</p>
          </div>
          <div className="pricing-card" data-stagger="2">
            <p className="pricing-card__name">Family Plus</p>
            <p className="pricing-card__price">CAD $24.99 <span className="pricing-per">/mo</span></p>
            <ul className="pricing-card__features">
              <li>Everything in Standard</li>
              <li>Up to 10 cameras</li>
              <li>90-day storage</li>
              <li>Professional monitoring bridge</li>
            </ul>
            <p className="pricing-card__share">~5% · multi-senior households</p>
          </div>
        </div>
        <div className="unit-econ">
          <div className="ue-item" data-stagger="0">
            <span className="ue-num">CAD $4.80</span>
            <span className="ue-lbl">Variable cost / HH / mo</span>
          </div>
          <div className="ue-divider">→</div>
          <div className="ue-item ue-item--hi" data-stagger="1">
            <span className="ue-num">63%</span>
            <span className="ue-lbl">Gross margin</span>
          </div>
          <div className="ue-divider">→</div>
          <div className="ue-item" data-stagger="2">
            <span className="ue-num">CAD $257</span>
            <span className="ue-lbl">LTV (18-mo retention)</span>
          </div>
          <div className="ue-divider">→</div>
          <div className="ue-item ue-item--hi" data-stagger="3">
            <span className="ue-num">8.0×</span>
            <span className="ue-lbl">LTV / CAC</span>
          </div>
        </div>
      </div>
    </section>
  )
}
