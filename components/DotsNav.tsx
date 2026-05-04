'use client'
interface Props { current: number; total: number; goTo: (i: number) => void }

export default function DotsNav({ current, total, goTo }: Props) {
  return (
    <nav className="dots" aria-label="Slide navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`dot${i === current ? ' is-active' : ''}`}
          onClick={() => goTo(i)}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </nav>
  )
}
