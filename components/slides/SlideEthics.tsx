'use client'
import type { SlideProps } from '../Deck'

const GUARDS = [
  {
    title: 'Privacy by design',
    desc: 'HomeGuard keeps raw video local. Only a short encrypted clip leaves the device after a detected event.',
  },
  {
    title: 'Human oversight',
    desc: 'Alerts go to family members, not the senior. The system supports care, but never replaces judgment.',
  },
  {
    title: 'Low-friction use',
    desc: 'The senior does not have to learn prompts, apps, or settings. The product is built for dignity, not attention.',
  },
  {
    title: 'Transparent limits',
    desc: 'We surface confidence, reasons, and escalation paths so families know when to trust automation and when to verify.',
  },
]

export default function SlideEthics({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-ethics${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Social Impact</p>
        <h2 className="slide-title">Safety that protects people without invading their home.</h2>
        <p className="ethics-lead">
          Aegis is built for a vulnerable audience. The ethical bar is not just accuracy. It is
          whether the system preserves privacy, avoids coercion, and still helps families respond
          fast when something is wrong.
        </p>

        <div className="ethics-layout">
          <div className="ethics-main">
            {GUARDS.map((item, i) => (
              <article key={item.title} className="ethics-card" data-stagger={i}>
                <p className="ethics-card__index">0{i + 1}</p>
                <div className="ethics-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="ethics-side">
            <p className="ethics-side__title">Why it matters</p>
            <p className="ethics-side__body">
              Older adults should not have to trade dignity for protection. Our approach keeps the
              senior experience passive, uses family consent for setup, and minimizes data exposure
              by default.
            </p>
            <div className="ethics-metric">
              <span className="ethics-metric__n">0</span>
              <span className="ethics-metric__l">extra apps required on the senior&apos;s phone</span>
            </div>
            <div className="ethics-metric">
              <span className="ethics-metric__n">1</span>
              <span className="ethics-metric__l">short encrypted event clip, only when needed</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
