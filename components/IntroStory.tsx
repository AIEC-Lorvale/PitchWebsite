'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import s from './IntroStory.module.css'

const NARRATIVE_TEXTS = [
  "It's not only the elderly who feel the pain.",
  "For the child,",
  "It's like trying to wash your kid's clothes — only for them to be marked by the same stains once again.",
]

type BubblePhase = 'idle' | 'visible' | 'floating'

export default function IntroStory() {
  const [b1, setB1] = useState<BubblePhase>('idle')
  const [b2, setB2] = useState<BubblePhase>('idle')
  const [toneIn, setToneIn] = useState(false)
  const [stat1In, setStat1In] = useState(false)
  const [stat2In, setStat2In] = useState(false)
  const [splitIn, setSplitIn] = useState(false)
  const [narrativeIdx, setNarrativeIdx] = useState<number>(-1) // -1=not started, 0-2=showing, -2=done
  const [narrativeLeaving, setNarrativeLeaving] = useState(false)
  const [shirtClean, setShirtClean] = useState(false)
  const [shirtShaking, setShirtShaking] = useState(false)
  const [explanationIn, setExplanationIn] = useState(false)
  const [ctaIn, setCtaIn] = useState(false)

  const bubbleSectionRef = useRef<HTMLDivElement>(null)
  const toneSectionRef = useRef<HTMLDivElement>(null)
  const statsSectionRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)
  const narrativeSectionRef = useRef<HTMLDivElement>(null)
  const explanationRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const allTimers: ReturnType<typeof setTimeout>[] = []

    function watch(ref: React.RefObject<HTMLDivElement | null>, fn: () => void, thr = 0.35) {
      const el = ref.current
      if (!el) return new IntersectionObserver(() => {})
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { fn(); obs.disconnect() }
      }, { threshold: thr })
      obs.observe(el)
      return obs
    }

    const observers = [
      watch(bubbleSectionRef, () => {
        allTimers.push(setTimeout(() => setB1('visible'), 400))
        allTimers.push(setTimeout(() => setB1('floating'), 1100))
        allTimers.push(setTimeout(() => setB1('idle'), 4300))
        allTimers.push(setTimeout(() => setB2('visible'), 4700))
        allTimers.push(setTimeout(() => setB2('floating'), 5500))
        allTimers.push(setTimeout(() => setB2('idle'), 8700))
      }),
      watch(toneSectionRef, () => setToneIn(true)),
      watch(statsSectionRef, () => {
        setStat1In(true)
        allTimers.push(setTimeout(() => setStat2In(true), 900))
      }, 0.3),
      watch(splitRef, () => setSplitIn(true), 0.3),
      watch(narrativeSectionRef, () => {
        setNarrativeIdx(0)
        setNarrativeLeaving(false)
        function advance(idx: number) {
          allTimers.push(setTimeout(() => {
            setNarrativeLeaving(true)
            allTimers.push(setTimeout(() => {
              const next = idx + 1
              if (next < NARRATIVE_TEXTS.length) {
                setNarrativeIdx(next)
                setNarrativeLeaving(false)
                advance(next)
              } else {
                setNarrativeIdx(-2)
                setNarrativeLeaving(false)
              }
            }, 550))
          }, 2800))
        }
        advance(0)
      }, 0.4),
      watch(explanationRef, () => setExplanationIn(true), 0.3),
      watch(ctaRef, () => setCtaIn(true), 0.3),
    ]

    return () => {
      observers.forEach(o => o.disconnect())
      allTimers.forEach(clearTimeout)
    }
  }, [])

  function handleShirtClick() {
    if (shirtClean || shirtShaking) return
    setShirtClean(true)
    setTimeout(() => {
      setShirtShaking(true)
      setTimeout(() => {
        setShirtClean(false)
        setShirtShaking(false)
      }, 600)
    }, 1000)
  }

  const showingNarrative = narrativeIdx >= 0 && narrativeIdx < NARRATIVE_TEXTS.length

  return (
    <main className={s.intro}>

      {/* ── 1 · HERO ─────────────────────────────────────── */}
      <section className={s.hero}>
        <h1 className={s.heroText}>
          Congratulations, you've clicked a link that LITERALLY SAYS don't click!!!
        </h1>
        <p className={s.heroSub}>↓ scroll to continue ↓</p>
      </section>

      {/* ── 2 · BUBBLES ──────────────────────────────────── */}
      <section className={s.bubbleSection} ref={bubbleSectionRef}>
        {/* Bubble 1 */}
        <div className={s.bubbleWrap}>
          {b1 !== 'idle' && (
            <div className={`${s.bubble} ${b1 === 'floating' ? s.bubbleFloating : s.bubbleVisible}`}>
              It doesn&apos;t matter anyways right?
            </div>
          )}
        </div>
        {/* Bubble 2 */}
        <div className={s.bubbleWrap}>
          {b2 !== 'idle' && (
            <div className={`${s.bubble} ${b2 === 'floating' ? s.bubbleFloating : s.bubbleVisible}`}>
              I didn&apos;t lose anything
            </div>
          )}
        </div>
      </section>

      {/* ── 3 · TONE SHIFT ───────────────────────────────── */}
      <section className={s.toneSection} ref={toneSectionRef}>
        <p className={`${s.toneText} ${toneIn ? s.toneTextVisible : ''}`}>
          For some people it does
        </p>
      </section>

      {/* ── 4 · STATISTICS ───────────────────────────────── */}
      <section className={s.statsSection} ref={statsSectionRef}>
        <p className={`${s.stat1} ${stat1In ? s.stat1Visible : ''}`}>
          6% of all Canadians aged 60+ lose money due to scams each year
        </p>
        <p className={`${s.stat2} ${stat2In ? s.stat2Visible : ''}`}>
          That&apos;s over $7.7 billion lost each year!!!
        </p>
      </section>

      {/* ── 5 · SPLIT STATS ──────────────────────────────── */}
      <section className={s.splitSection} ref={splitRef}>
        <div className={`${s.splitLeft} ${splitIn ? s.splitLeftVisible : ''}`}>
          Though only 5% of Canadian elders are scammed annually, when it applies to your parents,
          the risk feels nearly <strong>100%</strong>.
        </div>
        <div className={s.splitDivider} />
        <div className={`${s.splitRight} ${splitIn ? s.splitRightVisible : ''}`}>
          Americans aged 60+ reported <strong>$7.7 billion</strong> in losses — a 60% increase from 2024.
          Those in their 30s and 40s reported <strong>$4.6 billion</strong>.
        </div>
      </section>

      {/* ── 6 · NARRATIVE (float replace) ────────────────── */}
      <section className={s.narrativeSection} ref={narrativeSectionRef}>
        {showingNarrative && (
          <p className={`${s.narrativeText} ${narrativeLeaving ? s.narrativeTextLeaving : ''}`}>
            {NARRATIVE_TEXTS[narrativeIdx]}
          </p>
        )}
      </section>

      {/* ── 7 · T-SHIRT ──────────────────────────────────── */}
      <section className={s.tshirtSection}>
        <p className={s.tshirtCta}>Click the shirt to wash it</p>
        <div
          className={`${s.tshirtSvgWrap} ${shirtShaking ? s.tshirtShaking : ''}`}
          onClick={handleShirtClick}
          role="button"
          tabIndex={0}
          aria-label="Click to wash the t-shirt"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleShirtClick() }}
        >
          <svg viewBox="0 0 200 185" width="240" height="240" aria-hidden="true">
            {/* T-shirt body */}
            <path
              d="M 60,12 L 8,58 L 44,72 L 44,168 L 156,168 L 156,72 L 192,58 L 140,12 Q 124,32 100,32 Q 76,32 60,12 Z"
              style={{ transition: 'fill 0.5s ease' }}
              fill={shirtClean ? '#e8e8e8' : '#6b3a1f'}
            />
            {/* Stains — visible only when dirty */}
            {!shirtClean && (
              <>
                <ellipse cx="87"  cy="103" rx="13" ry="11" fill="rgba(30,12,3,0.45)" />
                <ellipse cx="113" cy="128" rx="9"  ry="8"  fill="rgba(30,12,3,0.38)" />
                <ellipse cx="80"  cy="137" rx="7"  ry="6"  fill="rgba(30,12,3,0.32)" />
                <ellipse cx="120" cy="98"  rx="6"  ry="5"  fill="rgba(30,12,3,0.28)" />
                <ellipse cx="100" cy="148" rx="8"  ry="6"  fill="rgba(30,12,3,0.22)" />
              </>
            )}
            {/* Sparkle when clean */}
            {shirtClean && (
              <>
                <text x="68"  y="94"  fontSize="16" fill="rgba(200,180,50,0.8)">✦</text>
                <text x="108" y="130" fontSize="12" fill="rgba(200,180,50,0.7)">✦</text>
                <text x="88"  y="148" fontSize="10" fill="rgba(200,180,50,0.6)">✦</text>
              </>
            )}
          </svg>
        </div>
      </section>

      {/* ── 8 · EXPLANATION ──────────────────────────────── */}
      <section className={s.explanationSection} ref={explanationRef}>
        <p className={`${s.explanationText} ${explanationIn ? s.explanationTextVisible : ''}`}>
          That&apos;s how the children of elderly scam victims feel — teaching parents anti-scam
          techniques, but often quite ineffective.
        </p>
      </section>

      {/* ── 9 · CTA ──────────────────────────────────────── */}
      <section className={s.ctaSection} ref={ctaRef}>
        <p className={`${s.ctaText} ${ctaIn ? s.ctaTextVisible : ''}`}>
          We Here At Aegis Are Here To Change Everything.
        </p>
        <Link href="/deck" className={`${s.ctaBtn} ${ctaIn ? s.ctaBtnVisible : ''}`}>
          See the full pitch →
        </Link>
      </section>

    </main>
  )
}
