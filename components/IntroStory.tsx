'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import s from './IntroStory.module.css'

const SCREEN4_LINES = [
  "This isn't just about scams.",
  "It's about protecting people you care about.",
  "And once you start... it doesn't really stop.",
]

const SCREEN5_LINES = [
  'You explain what to look for.',
  'You try to keep things safe.',
  "But it doesn't stay solved.",
]

type BubblePhase = 'idle' | 'visible' | 'floating'
type Screen6Phase = 'line1' | 'line2' | 'interactive' | 'after'

export default function IntroStory() {
  const [b1, setB1] = useState<BubblePhase>('idle')
  const [b2, setB2] = useState<BubblePhase>('idle')
  const [toneIn, setToneIn] = useState(false)
  const [ctaIn, setCtaIn] = useState(false)

  const [flowScreen, setFlowScreen] = useState(0)
  const maxFlowRef = useRef(0)
  const flowTriggerRefs = useRef<(HTMLDivElement | null)[]>([])

  const [screen4Idx, setScreen4Idx] = useState(0)
  const [screen4Visible, setScreen4Visible] = useState(true)
  const [screen5Idx, setScreen5Idx] = useState(0)
  const [screen5Visible, setScreen5Visible] = useState(true)
  const [screen6Phase, setScreen6Phase] = useState<Screen6Phase>('line1')

  const [shirtClean, setShirtClean] = useState(false)
  const [shirtReturning, setShirtReturning] = useState(false)
  const [shirtBusy, setShirtBusy] = useState(false)

  const played4Ref = useRef(false)
  const played5Ref = useRef(false)
  const played6Ref = useRef(false)
  const stepTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const bubbleSectionRef = useRef<HTMLDivElement>(null)
  const toneSectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const allTimers: ReturnType<typeof setTimeout>[] = []

    function watch(ref: React.RefObject<HTMLDivElement | null>, fn: () => void, thr = 0.35) {
      const el = ref.current
      if (!el) return new IntersectionObserver(() => {})
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          fn()
          obs.disconnect()
        }
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
      watch(ctaRef, () => setCtaIn(true), 0.3),
    ]

    return () => {
      observers.forEach(o => o.disconnect())
      allTimers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const idx = Number((entry.target as HTMLElement).dataset.step)
        if (Number.isNaN(idx)) return

        if (idx > maxFlowRef.current) {
          maxFlowRef.current = idx
          setFlowScreen(idx)
        }
      })
    }, { threshold: 0.58, rootMargin: '-8% 0px -8% 0px' })

    flowTriggerRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    stepTimersRef.current.forEach(clearTimeout)
    stepTimersRef.current = []

    if (flowScreen === 3 && !played4Ref.current) {
      played4Ref.current = true
      setScreen4Idx(0)
      setScreen4Visible(true)

      stepTimersRef.current.push(setTimeout(() => setScreen4Visible(false), 1000))
      stepTimersRef.current.push(setTimeout(() => {
        setScreen4Idx(1)
        setScreen4Visible(true)
      }, 1400))
      stepTimersRef.current.push(setTimeout(() => setScreen4Visible(false), 2450))
      stepTimersRef.current.push(setTimeout(() => {
        setScreen4Idx(2)
        setScreen4Visible(true)
      }, 2850))
    }

    if (flowScreen === 4 && !played5Ref.current) {
      played5Ref.current = true
      setScreen5Idx(0)
      setScreen5Visible(true)

      stepTimersRef.current.push(setTimeout(() => setScreen5Visible(false), 850))
      stepTimersRef.current.push(setTimeout(() => {
        setScreen5Idx(1)
        setScreen5Visible(true)
      }, 1250))
      stepTimersRef.current.push(setTimeout(() => setScreen5Visible(false), 2100))
      stepTimersRef.current.push(setTimeout(() => {
        setScreen5Idx(2)
        setScreen5Visible(true)
      }, 2500))
    }

    if (flowScreen === 5 && !played6Ref.current) {
      played6Ref.current = true
      setScreen6Phase('line1')

      stepTimersRef.current.push(setTimeout(() => setScreen6Phase('line2'), 900))
      stepTimersRef.current.push(setTimeout(() => setScreen6Phase('interactive'), 1800))
    }

    return () => {
      stepTimersRef.current.forEach(clearTimeout)
      stepTimersRef.current = []
    }
  }, [flowScreen])

  function handleShirtClick() {
    if (flowScreen !== 5 || screen6Phase !== 'interactive' || shirtBusy) return

    setShirtBusy(true)
    setShirtClean(true)
    setShirtReturning(false)

    setTimeout(() => {
      setShirtClean(false)
      setShirtReturning(true)

      setTimeout(() => {
        setShirtReturning(false)
        setShirtBusy(false)
        setScreen6Phase('after')
      }, 500)
    }, 1000)
  }

  function renderScreenContent() {
    if (flowScreen === 0) {
      return (
        <div className={s.sequenceStack}>
          <p className={`${s.sequenceLine} ${s.sequenceDelay0}`}>
            6% of Canadians aged 60+ lose money to scams each year
          </p>
          <p className={`${s.sequenceLine} ${s.sequenceImpact} ${s.sequenceDelay1}`}>
            $7.7 billion lost annually
          </p>
          <p className={`${s.sequenceLine} ${s.sequenceMetric} ${s.sequenceDelay2}`}>
            $33,000 per incident
          </p>
        </div>
      )
    }

    if (flowScreen === 1) {
      return (
        <div className={s.sequenceStack}>
          <p className={`${s.sequenceLine} ${s.sequenceDelay0}`}>And it&apos;s accelerating</p>
          <p className={`${s.sequenceLine} ${s.sequenceFast} ${s.sequenceDelayFast1}`}>+$244 every second</p>
          <p className={`${s.sequenceLine} ${s.sequenceFast} ${s.sequenceDelayFast2}`}>+60% year-over-year</p>
          <p className={`${s.sequenceLine} ${s.sequenceFast} ${s.sequenceDelayFast3}`}>
            78% encountered a scam in the last 90 days
          </p>
        </div>
      )
    }

    if (flowScreen === 2) {
      return (
        <div className={s.sequenceQuoteWrap}>
          <p className={s.sequenceQuote}>
            &ldquo;My granddaughter called me - except it wasn&apos;t her... I almost did it.&rdquo;
          </p>
          <p className={s.sequenceQuoteSource}>- P-007, age 71, Toronto</p>
        </div>
      )
    }

    if (flowScreen === 3) {
      return (
        <p className={`${s.sequenceReplaceLine} ${screen4Visible ? s.sequenceReplaceIn : s.sequenceReplaceOut}`}>
          {SCREEN4_LINES[screen4Idx]}
        </p>
      )
    }

    if (flowScreen === 4) {
      return (
        <p className={`${s.sequenceReplaceLine} ${screen5Visible ? s.sequenceReplaceIn : s.sequenceReplaceOut}`}>
          {SCREEN5_LINES[screen5Idx]}
        </p>
      )
    }

    if (flowScreen === 5) {
      if (screen6Phase === 'line1') {
        return <p className={s.sequenceReplaceLine}>It looks simple.</p>
      }

      if (screen6Phase === 'line2') {
        return <p className={s.sequenceReplaceLine}>You fix it...</p>
      }

      return (
        <div className={s.sequenceShirtBlock}>
          <p className={s.sequenceShirtLine}>{screen6Phase === 'after' ? '...then it needs attention again.' : 'For a moment-'}</p>
          <div
            className={s.sequenceShirtWrap}
            onClick={handleShirtClick}
            role="button"
            tabIndex={0}
            aria-label="Click to wash the shirt"
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') handleShirtClick()
            }}
          >
            <svg viewBox="0 0 200 185" width="230" height="230" aria-hidden="true">
              <path
                className={`${s.sequenceShirtBody} ${shirtClean ? s.sequenceShirtBodyClean : ''}`}
                d="M 60,12 L 8,58 L 44,72 L 44,168 L 156,168 L 156,72 L 192,58 L 140,12 Q 124,32 100,32 Q 76,32 60,12 Z"
              />
              <g className={`${s.sequenceStains} ${shirtClean ? s.sequenceStainsHidden : ''} ${shirtReturning ? s.sequenceStainsReturn : ''}`}>
                <ellipse cx="87" cy="103" rx="13" ry="11" />
                <ellipse cx="113" cy="128" rx="9" ry="8" />
                <ellipse cx="80" cy="137" rx="7" ry="6" />
                <ellipse cx="120" cy="98" rx="6" ry="5" />
                <ellipse cx="100" cy="148" rx="8" ry="6" />
              </g>
            </svg>
          </div>
        </div>
      )
    }

    return (
      <div className={s.sequenceClose}>
        <p className={s.sequenceCloseMain}>That&apos;s what protecting someone can feel like.</p>
        <p className={s.sequenceCloseSub}>Not a one-time fix.</p>
      </div>
    )
  }

  return (
    <main className={s.intro}>
      <section className={s.hero}>
        <h1 className={s.heroText}>
          Congratulations, you&apos;ve clicked a link that LITERALLY SAYS don&apos;t click!!!
        </h1>
        <p className={s.heroSub}>scroll to continue</p>
      </section>

      <section className={s.bubbleSection} ref={bubbleSectionRef}>
        <div className={s.bubbleWrap}>
          {b1 !== 'idle' && (
            <div className={`${s.bubble} ${b1 === 'floating' ? s.bubbleFloating : s.bubbleVisible}`}>
              It doesn&apos;t matter anyways right?
            </div>
          )}
        </div>
        <div className={s.bubbleWrap}>
          {b2 !== 'idle' && (
            <div className={`${s.bubble} ${b2 === 'floating' ? s.bubbleFloating : s.bubbleVisible}`}>
              I didn&apos;t lose anything
            </div>
          )}
        </div>
      </section>

      <section className={s.toneSection} ref={toneSectionRef}>
        <p className={`${s.toneText} ${toneIn ? s.toneTextVisible : ''}`}>For some people it does</p>
      </section>

      <section className={s.sequenceSection}>
        <div className={s.sequenceSticky}>
          <div className={s.sequencePanel} key={flowScreen}>
            {renderScreenContent()}
          </div>
        </div>
        <div className={s.sequenceTriggers} aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={s.sequenceTrigger}
              data-step={i}
              ref={el => { flowTriggerRefs.current[i] = el }}
            />
          ))}
        </div>
      </section>

      <section className={s.ctaSection} ref={ctaRef}>
        <p className={`${s.ctaText} ${ctaIn ? s.ctaTextVisible : ''}`}>
          We Here At Aegis Are Here To Change Everything.
        </p>
        <Link href="/deck" className={`${s.ctaBtn} ${ctaIn ? s.ctaBtnVisible : ''}`}>
          See the full pitch -&gt;
        </Link>
      </section>
    </main>
  )
}
