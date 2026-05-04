'use client'
import { useEffect, useRef, useState } from 'react'
import type { SlideProps } from '../Deck'

// FTC 2024: Americans 60+ lost $7.7B to fraud. ~$244 every second.
const ANNUAL_LOSS = 7_700_000_000
const RATE = ANNUAL_LOSS / (365.25 * 24 * 3600) // ≈ 244 $/s

// Seed: dollars already lost since Jan 1 of the current year
function seedFromJan1() {
  const now = new Date()
  const jan1 = new Date(now.getFullYear(), 0, 1).getTime()
  return ((now.getTime() - jan1) / 1000) * RATE
}

const MODULE_LOAD = Date.now()
const SEED = seedFromJan1()

function fmt(n: number) {
  return '$' + Math.floor(n).toLocaleString('en-US')
}

export default function SlideHook({ isActive, isPrev }: SlideProps) {
  const [amount, setAmount] = useState(SEED)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    // Sync to wall-clock so amount is accurate even if slide is revisited
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - MODULE_LOAD) / 1000
      setAmount(SEED + elapsed * RATE)
    }, 80)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isActive])

  return (
    <section className={`slide s-hook${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner narrow">
        <p className="eyebrow">The Problem</p>

        <p className="hook-pre">
          Stolen from Americans 60+ in scam fraud — this year alone
        </p>

        <div className="hook-ticker-wrap">
          <span className="hook-ticker">{fmt(amount)}</span>
          <span className="hook-ticker-sub">growing · +$244 every second · FTC 2024</span>
        </div>

        <div className="hook-chips">
          <div className="hook-chip" data-stagger="0">
            <span className="hook-chip__n">78%</span>
            <span className="hook-chip__l">of seniors encountered ≥1 scam in 90 days · our study</span>
          </div>
          <div className="hook-chip" data-stagger="1">
            <span className="hook-chip__n">+60%</span>
            <span className="hook-chip__l">increase in losses vs 2024</span>
          </div>
          <div className="hook-chip" data-stagger="2">
            <span className="hook-chip__n">$33K</span>
            <span className="hook-chip__l">median loss per incident</span>
          </div>
        </div>

        <p className="hook-quote">
          &ldquo;My granddaughter called me — except it wasn&apos;t her, it just sounded exactly like her.
          She said she&apos;d been in an accident and needed me to wire money. I almost did it.&rdquo;
          <span className="hook-quote__src">— P-007, age 71, Toronto</span>
        </p>
      </div>
    </section>
  )
}
