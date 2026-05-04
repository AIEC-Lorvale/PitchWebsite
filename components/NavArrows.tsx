'use client'
interface Props { onPrev: () => void; onNext: () => void; canPrev: boolean; canNext: boolean }

export default function NavArrows({ onPrev, onNext, canPrev, canNext }: Props) {
  return (
    <>
      <button className="nav-arrow nav-arrow--prev" onClick={onPrev} disabled={!canPrev} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="nav-arrow nav-arrow--next" onClick={onNext} disabled={!canNext} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </>
  )
}
