'use client'
import type { SlideProps } from '../Deck'

export default function SlideHero({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-hero${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">AIEC 2026 &middot; Semi-Finals Pitch</p>
        <h1 className="hero-title">
          <span className="hero-title__a">Aegis</span>
          <span className="hero-title__b">Family Safety</span>
        </h1>
        <p className="hero-sub">
          AI that watches over aging parents
          <br />
          across the phone, the inbox, and the home.
        </p>
        <div className="hero-pillars">
          <span className="pill pill--msg">MessageGuard</span>
          <span className="pill pill--voice">VoiceGuard</span>
          <span className="pill pill--home">HomeGuard</span>
        </div>
        <p className="hero-hint">Press <kbd>-&gt;</kbd> or click the arrow to begin</p>
      </div>
      <div className="hero-glow" aria-hidden="true" />
    </section>
  )
}
