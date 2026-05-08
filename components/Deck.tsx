'use client'
import { useState, useEffect, useCallback } from 'react'
import TopBar from './TopBar'
import NavArrows from './NavArrows'
import DotsNav from './DotsNav'
import SlideHero       from './slides/SlideHero'
import SlidePurpose    from './slides/SlidePurpose'
import SlideMsgDemo    from './slides/SlideMsgDemo'
import SlideVoiceDemo  from './slides/SlideVoiceDemo'
import SlideHomeGuard  from './slides/SlideHomeGuard'
import SlideTech       from './slides/SlideTech'
import SlideMarket     from './slides/SlideMarket'
import SlideBusiness   from './slides/SlideBusiness'
import SlideValidation from './slides/SlideValidation'
import SlideEthics     from './slides/SlideEthics'
import SlideAsk        from './slides/SlideAsk'

export interface SlideProps {
  isActive: boolean
  isPrev: boolean
}

const SLIDE_COMPONENTS = [
  SlideHero, SlidePurpose,
  SlideMsgDemo, SlideVoiceDemo, SlideHomeGuard,
  SlideTech, SlideEthics, SlideValidation,
  SlideMarket, SlideBusiness, SlideAsk,
]

export default function Deck() {
  const [current, setCurrent] = useState(0)
  const total = SLIDE_COMPONENTS.length

  // Lock body scroll while deck is mounted
  useEffect(() => {
    document.body.classList.add('deck-page')
    return () => document.body.classList.remove('deck-page')
  }, [])

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= total) return
    setCurrent(index)
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'TEXTAREA' || tag === 'INPUT') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        setCurrent(c => Math.min(c + 1, total - 1))
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrent(c => Math.max(c - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  // Touch swipe
  useEffect(() => {
    let startY = 0, startX = 0
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; startX = e.touches[0].clientX }
    const onEnd   = (e: TouchEvent) => {
      const dy = e.changedTouches[0].clientY - startY
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dy) > Math.abs(dx) * 0.8 && Math.abs(dy) > 40) {
        if (dy < 0) setCurrent(c => Math.min(c + 1, total - 1))
        else        setCurrent(c => Math.max(c - 1, 0))
      }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [total])

  return (
    <div className="deck">
      <TopBar current={current} total={total} />
      <div className="slides">
        {SLIDE_COMPONENTS.map((SlideComponent, i) => (
          <SlideComponent key={i} isActive={i === current} isPrev={i < current} />
        ))}
      </div>
      <NavArrows
        onPrev={() => setCurrent(c => Math.max(c - 1, 0))}
        onNext={() => setCurrent(c => Math.min(c + 1, total - 1))}
        canPrev={current > 0}
        canNext={current < total - 1}
      />
      <DotsNav current={current} total={total} goTo={goTo} />
    </div>
  )
}
