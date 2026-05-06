'use client'
import type { SlideProps } from '../Deck'

export default function SlidePurpose({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-purpose${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner narrow purpose-layout">
        <p className="purpose-line">Three products, unified by one purpose.</p>
      </div>
    </section>
  )
}
