'use client'
import { useEffect, useRef } from 'react'
import type { SlideProps } from '../Deck'

export default function SlideAsk({ isActive, isPrev }: SlideProps) {
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const targets = revealRefs.current.filter((item): item is HTMLElement => item !== null)

    if (!isActive) {
      targets.forEach(target => target.classList.remove('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [isActive])

  return (
    <section className={`slide s-ask${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner road-shell">
        <header className="road-hero">
          <p className="eyebrow">Technology + Future Roadmap</p>
          <h2 className="road-title">Real-Time Protection Platform</h2>
          <p className="road-subtitle">Detection &middot; Intelligence &middot; Prevention</p>
          <p className="road-support">Built to protect families across voice, text, and the home.</p>
        </header>

        <section className="road-section road-reveal" ref={el => { revealRefs.current[0] = el }}>
          <h3>Real-Time Scam Detection</h3>
          <p>
            Android-level call monitoring enables real-time scam detection during live calls. Voice is converted
            into text instantly for analysis, while messages are already processed as text natively.
          </p>
          <p>
            All inputs converge into a unified text-based pipeline, so every interaction is scored in one decision
            stream.
          </p>
          <p className="road-key">Scams are detected during interaction, not after the damage is done.</p>
        </section>

        <section className="road-section road-reveal" ref={el => { revealRefs.current[1] = el }}>
          <h3>Two-Layer Intelligence System</h3>
          <div className="road-layers">
            <div className="road-layer">
              <p className="road-layer-title">Layer 1</p>
              <p>
                Fast ML classifier detects urgency patterns, impersonation signals, and scam keywords in real time
                (&lt;50ms).
              </p>
            </div>
            <div className="road-layer">
              <p className="road-layer-title">Layer 2</p>
              <p>
                LLM-based reasoning analyzes context, intent, and conversational deception patterns, then returns the
                final risk decision with explanation.
              </p>
            </div>
          </div>
          <p className="road-key">Speed handles immediacy. Reasoning handles complexity.</p>
        </section>

        <section className="road-section road-reveal" ref={el => { revealRefs.current[2] = el }}>
          <h3>Home Safety (HomeGuard)</h3>
          <ul className="road-list">
            <li>Vision-based fall detection using pose estimation</li>
            <li>No wearable devices required</li>
            <li>Fully on-device edge processing</li>
            <li>Privacy-first architecture with no continuous video streaming</li>
          </ul>
          <p className="road-key">Sub-500ms emergency alert latency.</p>
        </section>

        <section className="road-section road-reveal" ref={el => { revealRefs.current[3] = el }}>
          <h3>Future Roadmap: Threat Intelligence Network</h3>
          <p>
            The system will maintain a verified registry of confirmed scam indicators, including phone numbers, URLs,
            and known scam patterns.
          </p>
          <p>Personal user data is excluded, and new entries are only added when a scam is confirmed by the system.</p>
          <ul className="road-list">
            <li>Shared intelligence layer across all users</li>
            <li>Continuously improving detection accuracy</li>
            <li>Potential API access for external platforms (B2B expansion)</li>
          </ul>
          <p className="road-key">Each confirmed scam strengthens the entire network.</p>
        </section>

        <section className="road-section road-reveal" ref={el => { revealRefs.current[4] = el }}>
          <h3>Platform Model</h3>
          <ul className="road-list">
            <li>Subscription-based household protection</li>
            <li>Caregiver-first distribution model</li>
            <li>Multi-user family accounts where one system protects multiple people</li>
          </ul>
          <p className="road-subhead">Future expansion</p>
          <ul className="road-list">
            <li>Enterprise licensing of the threat intelligence layer</li>
            <li>Integration with elder-care organizations</li>
            <li>Potential API distribution for telecom and security partners</li>
          </ul>
          <p className="road-key">The system becomes more valuable as it scales.</p>
        </section>

        <section className="road-section road-reveal" ref={el => { revealRefs.current[5] = el }}>
          <h3>Why This Works</h3>
          <ul className="road-list">
            <li>Real-time intervention, not post-event analysis</li>
            <li>Unified protection across voice, text, and vision</li>
            <li>Layered AI architecture: fast detection plus deep reasoning</li>
            <li>Privacy-preserving by design</li>
            <li>Emerging intelligence network effect</li>
          </ul>
        </section>
      </div>
    </section>
  )
}
