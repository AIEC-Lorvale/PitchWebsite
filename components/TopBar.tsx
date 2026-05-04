'use client'
interface Props { current: number; total: number }

export default function TopBar({ current, total }: Props) {
  const pct = ((current + 1) / total) * 100
  return (
    <header className="topbar">
      <span className="topbar__logo">AEGIS</span>
      <div className="topbar__progress-wrap">
        <div className="topbar__progress" style={{ width: `${pct}%` }} />
      </div>
      <span className="topbar__counter">{current + 1} / {total}</span>
    </header>
  )
}
