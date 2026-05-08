'use client'
import type { SlideProps } from '../Deck'

export default function SlideMarket({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-market${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner" style={{ gap: '1.1rem' }}>
        <p className="eyebrow">Market &amp; Competitive Landscape</p>
        <h2 className="slide-title">39M households.<br />No integrated solution exists.</h2>

        {/* Market funnel — condensed to horizontal 3-column row */}
        <div
          data-stagger="0"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem' }}
        >
          <div className="mf-layer mf-tam">
            <span className="mf-num">39M</span>
            <span className="mf-label">TAM · All NA 65+ households</span>
          </div>
          <div className="mf-layer mf-sam">
            <span className="mf-num">9.4M</span>
            <span className="mf-label">SAM · Digitally-reachable with caregiver</span>
          </div>
          <div
            className="mf-layer"
            style={{ borderColor: 'rgba(61,185,106,0.35)', background: 'rgba(61,185,106,0.07)' }}
          >
            <span className="mf-num" style={{ color: 'var(--green)' }}>~$97M</span>
            <span className="mf-label">SOM Yr 3 ARR · 620K households</span>
          </div>
        </div>

        {/* Competitive table */}
        <div className="comp-table" data-stagger="1">
          <div className="comp-head">
            <span>Product</span>
            <span>Voice scam</span>
            <span>Text / QR</span>
            <span>Fall detect</span>
            <span>Non-wearable</span>
            <span>Family alerts</span>
            <span>Senior setup</span>
          </div>
          <div className="comp-row comp-row--other">
            <span className="comp-name">Life Alert / Lifeline</span>
            <span className="cx">✗</span><span className="cx">✗</span><span className="cp">~</span>
            <span className="cx">✗</span><span className="cp">~</span><span className="cy comp-bad">High</span>
          </div>
          <div className="comp-row comp-row--other">
            <span className="comp-name">Apple Watch</span>
            <span className="cx">✗</span><span className="cx">✗</span><span className="cy">✓</span>
            <span className="cx">✗</span><span className="cy">✓</span><span className="cy comp-bad">High</span>
          </div>
          <div className="comp-row comp-row--other">
            <span className="comp-name">Eversafe</span>
            <span className="cx">✗</span><span className="cp">~</span><span className="cx">✗</span>
            <span className="cy">✓</span><span className="cy">✓</span><span className="cp">Med</span>
          </div>
          <div className="comp-row comp-row--other">
            <span className="comp-name">ChatGPT / Claude</span>
            <span className="cp">~</span><span className="cp">~</span><span className="cx">✗</span>
            <span className="cy">✓</span><span className="cx">✗</span><span className="cy comp-bad">Very High</span>
          </div>
          <div className="comp-row comp-row--aegis">
            <span className="comp-name comp-name--aegis">Aegis ✦</span>
            <span className="cy cy--aegis">✓</span><span className="cy cy--aegis">✓</span><span className="cy cy--aegis">✓</span>
            <span className="cy cy--aegis">✓</span><span className="cy cy--aegis">✓</span>
            <span className="cy cy--aegis comp-good">Zero</span>
          </div>
        </div>

        <p className="comp-note" data-stagger="2">
          61% of seniors in our study could not copy-paste a message into ChatGPT on a first try.<br />
          Protection that requires the senior to prompt is not protection.
        </p>
      </div>
    </section>
  )
}
