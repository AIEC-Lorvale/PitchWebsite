'use client'
import type { SlideProps } from '../Deck'

export default function SlideComp({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-comp${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Competitive Landscape</p>
        <h2 className="slide-title">The moat is the workflow,<br />not the model.</h2>
        <div className="comp-table">
          <div className="comp-head">
            <span>Product</span>
            <span>Voice scam</span>
            <span>Text / QR</span>
            <span>Fall detect</span>
            <span>Non-wearable</span>
            <span>Family alerts</span>
            <span>Senior setup</span>
          </div>
          <div className="comp-row comp-row--other" data-stagger="0">
            <span className="comp-name">Life Alert / Lifeline</span>
            <span className="cx">✗</span><span className="cx">✗</span><span className="cp">~</span>
            <span className="cx">✗</span><span className="cp">~</span><span className="cy comp-bad">High</span>
          </div>
          <div className="comp-row comp-row--other" data-stagger="1">
            <span className="comp-name">Apple Watch</span>
            <span className="cx">✗</span><span className="cx">✗</span><span className="cy">✓</span>
            <span className="cx">✗</span><span className="cy">✓</span><span className="cy comp-bad">High</span>
          </div>
          <div className="comp-row comp-row--other" data-stagger="2">
            <span className="comp-name">Eversafe</span>
            <span className="cx">✗</span><span className="cp">~</span><span className="cx">✗</span>
            <span className="cy">✓</span><span className="cy">✓</span><span className="cp">Med</span>
          </div>
          <div className="comp-row comp-row--other" data-stagger="3">
            <span className="comp-name">ChatGPT / Claude</span>
            <span className="cp">~</span><span className="cp">~</span><span className="cx">✗</span>
            <span className="cy">✓</span><span className="cx">✗</span><span className="cy comp-bad">Very High</span>
          </div>
          <div className="comp-row comp-row--aegis" data-stagger="4">
            <span className="comp-name comp-name--aegis">Aegis ✦</span>
            <span className="cy cy--aegis">✓</span><span className="cy cy--aegis">✓</span><span className="cy cy--aegis">✓</span>
            <span className="cy cy--aegis">✓</span><span className="cy cy--aegis">✓</span><span className="cy cy--aegis comp-good">Zero</span>
          </div>
        </div>
        <p className="comp-note">61% of seniors in our study could not copy-paste a message into ChatGPT on a first try.<br />Protection that requires the senior to prompt is not protection.</p>
      </div>
    </section>
  )
}
