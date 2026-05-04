'use client'
import type { SlideProps } from '../Deck'

export default function SlideWhyNow({ isActive, isPrev }: SlideProps) {
  return (
    <section className={`slide s-whynow${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Why Now</p>
        <h2 className="slide-title">Four tailwinds converging.</h2>
        <div className="tailwinds">
          <div className="tailwind" data-stagger="0">
            <div className="tailwind__icon">📈</div>
            <h3>Demographics</h3>
            <p>US 65+ reaches <strong>73M by 2030</strong>. Canada hits <strong>10M</strong>. One in five North Americans will be a senior within five years.</p>
          </div>
          <div className="tailwind" data-stagger="1">
            <div className="tailwind__icon">🤖</div>
            <h3>AI-era fraud wave</h3>
            <p>Generative voice cloning crossed consumer-quality in 2024. FTC 2024 losses up 25% YoY. CAFC 2024 up 19% YoY.</p>
          </div>
          <div className="tailwind" data-stagger="2">
            <div className="tailwind__icon">📷</div>
            <h3>CV at commodity cost</h3>
            <p>YOLOv8n + MediaPipe BlazePose run <strong>30 FPS on a $75 SBC</strong> — that required $2,000 medical hardware in 2020.</p>
          </div>
          <div className="tailwind" data-stagger="3">
            <div className="tailwind__icon">💳</div>
            <h3>Caregiver digital fluency</h3>
            <p>The buyer is Gen-X or Millennial. <strong>53M US caregivers</strong> spend avg $7,200/yr out-of-pocket. Comfortable with subscription SaaS.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
