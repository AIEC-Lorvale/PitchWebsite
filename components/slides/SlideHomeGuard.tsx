'use client'
import { useEffect, useRef, useState } from 'react'
import type { SlideProps } from '../Deck'

export default function SlideHomeGuard({ isActive, isPrev }: SlideProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const stateRef = useRef<'walking' | 'falling' | 'fallen' | 'alert'>('walking')
  const tickRef = useRef(0)
  const fallTickRef = useRef(0)
  const personYRef = useRef(250)
  const personAngleRef = useRef(0)
  const alertShownRef = useRef(false)
  const btnBoundRef = useRef(false)
  const [status, setStatus] = useState('Monitoring…')
  const [isAlert, setIsAlert] = useState(false)
  const [btnLabel, setBtnLabel] = useState('Simulate fall →')

  useEffect(() => {
    if (!isActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    stateRef.current = 'walking'
    tickRef.current = 0
    fallTickRef.current = 0
    personYRef.current = 250
    personAngleRef.current = 0
    alertShownRef.current = false
    setStatus('Monitoring…')
    setIsAlert(false)
    setBtnLabel('Simulate fall →')

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    function draw() {
      const W = canvas!.width, H = canvas!.height
      ctx.clearRect(0, 0, W, H)

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
      for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }

      ctx.font = '10px monospace'
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.textAlign = 'left'
      ctx.fillText('CAM 01 · HALLWAY', 10, 18)

      const now = new Date()
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
      ctx.textAlign = 'right'
      ctx.fillText(ts, W - 10, 18)
      ctx.textAlign = 'left'

      const cx = W / 2
      const s = stateRef.current
      const boxW = 60, boxH = s === 'fallen' || s === 'alert' ? 30 : 100
      const boxX = cx - boxW / 2
      const boxY = personYRef.current - boxH + (s === 'fallen' || s === 'alert' ? 30 : 0)

      const boxColor = s === 'alert' ? 'rgba(224,84,84,0.9)' : s === 'falling' ? 'rgba(232,121,58,0.85)' : 'rgba(61,185,106,0.7)'
      ctx.strokeStyle = boxColor
      ctx.lineWidth = 1.5
      ctx.strokeRect(boxX, boxY, boxW, boxH)

      const cs = 8
      ctx.lineWidth = 2.5
      ;[[boxX,boxY],[boxX+boxW,boxY],[boxX,boxY+boxH],[boxX+boxW,boxY+boxH]].forEach(([bx,by]) => {
        const sx = bx === boxX ? 1 : -1, sy = by === boxY ? 1 : -1
        ctx.beginPath(); ctx.moveTo(bx, by+sy*cs); ctx.lineTo(bx, by); ctx.lineTo(bx+sx*cs, by); ctx.stroke()
      })

      ctx.fillStyle = boxColor
      ctx.font = 'bold 9px monospace'
      ctx.fillText(`PERSON ${s === 'alert' ? '⚠ FALL' : s === 'falling' ? '! FALLING' : '✓ OK'}`, boxX, boxY - 4)

      ctx.save()
      ctx.translate(cx, personYRef.current)
      if (s === 'falling') ctx.rotate(personAngleRef.current)
      if (s === 'fallen' || s === 'alert') ctx.rotate(Math.PI / 2.1)

      const personColor = s === 'alert' ? 'rgba(224,84,84,0.9)' : s === 'falling' ? 'rgba(232,121,58,0.9)' : 'rgba(100,200,140,0.8)'
      ctx.strokeStyle = personColor
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'

      ctx.beginPath(); ctx.arc(0, -72, 10, 0, Math.PI * 2)
      ctx.fillStyle = personColor; ctx.fill()

      ctx.beginPath(); ctx.moveTo(0, -62); ctx.lineTo(0, -30); ctx.stroke()

      const legSwing = Math.sin(tickRef.current * 0.12) * 12
      ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(-12 + legSwing, 0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(12 - legSwing, 0); ctx.stroke()

      const armSwing = Math.sin(tickRef.current * 0.12 + Math.PI) * 10
      ctx.beginPath(); ctx.moveTo(0, -55); ctx.lineTo(-16 - armSwing, -40); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, -55); ctx.lineTo(16 + armSwing, -40); ctx.stroke()

      const joints: [number,number][] = [[0,-72],[-16,-40],[16,-40],[-12,0],[12,0],[0,-55],[0,-30]]
      joints.forEach(([jx,jy]) => {
        ctx.beginPath(); ctx.arc(jx, jy, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill()
      })
      ctx.restore()

      if (s === 'walking') {
        tickRef.current++
        personYRef.current = 250 + Math.sin(tickRef.current * 0.08) * 2
      }
      if (s === 'falling') {
        fallTickRef.current++
        personAngleRef.current = (fallTickRef.current / 30) * (Math.PI / 2.1)
        personYRef.current += 1.5
        if (fallTickRef.current > 30) {
          stateRef.current = 'fallen'
          fallTickRef.current = 0
        }
      }
      if (s === 'fallen') {
        fallTickRef.current++
        if (fallTickRef.current === 20 && !alertShownRef.current) {
          alertShownRef.current = true
          stateRef.current = 'alert'
          setStatus('⚠ FALL DETECTED · Alert sent')
          setIsAlert(true)
          setBtnLabel('Reset →')
          showAlert(ctx, W, H)
        }
      }
      if (s === 'alert') {
        fallTickRef.current++
        if (Math.floor(fallTickRef.current / 8) % 2 === 0) {
          ctx.fillStyle = 'rgba(224,84,84,0.05)'
          ctx.fillRect(0, 0, W, H)
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [isActive])

  function showAlert(ctx: CanvasRenderingContext2D, W: number, H: number) {
    const cx = W / 2
    let alertTick = 0
    function drawBanner() {
      if (alertTick >= 60) return
      const alpha = Math.min(1, alertTick / 15)
      ctx.save()
      ctx.fillStyle = `rgba(224,84,84,${alpha * 0.15})`
      ctx.fillRect(0, H - 60, W, 60)
      ctx.fillStyle = `rgba(224,84,84,${alpha})`
      ctx.font = 'bold 11px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('⚠ FALL EVENT · 3s CLIP ENCRYPTED · FCM ALERT SENT', cx, H - 35)
      ctx.font = '9px monospace'
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`
      ctx.fillText('HomeGuard · edge inference · ≤500ms latency', cx, H - 20)
      ctx.textAlign = 'left'
      ctx.restore()
      alertTick++
      requestAnimationFrame(drawBanner)
    }
    drawBanner()
  }

  function handleBtn() {
    if (stateRef.current === 'walking') {
      stateRef.current = 'falling'
      fallTickRef.current = 0
    } else if (stateRef.current === 'alert') {
      stateRef.current = 'walking'
      tickRef.current = 0
      fallTickRef.current = 0
      personYRef.current = 250
      personAngleRef.current = 0
      alertShownRef.current = false
      setStatus('Monitoring…')
      setIsAlert(false)
      setBtnLabel('Simulate fall →')
    }
  }

  return (
    <section className={`slide s-homeguard${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}>
      <div className="slide__inner">
        <p className="eyebrow">Pillar 3</p>
        <h2 className="slide-title">HomeGuard</h2>
        <p className="hg-tagline">Camera-based fall detection — no wearable, no new hardware required</p>
        <div className="hg-layout">
          <div className="hg-info">
            <p className="hg-tagline">Non-wearable. Privacy-first. Always on.</p>
            <ul className="hg-features">
              <li><span className="check">✓</span> Existing camera or repurposed phone — no new hardware</li>
              <li><span className="check">✓</span> YOLOv8n + MediaPipe BlazePose + LSTM fall classifier on-device at 30 FPS</li>
              <li><span className="check">✓</span> Raw video <strong>never</strong> leaves the home</li>
              <li><span className="check">✓</span> Only a 3-second E2E-encrypted clip on fall event</li>
              <li><span className="check">✓</span> Family FCM alert in ≤500ms</li>
              <li><span className="check">✓</span> Validated across 4 mobility categories + FairFace bias bins</li>
            </ul>
            <div className="hg-stats-row">
              <div className="hg-stat"><span className="hg-stat__n">89%</span><span className="hg-stat__l">recall<br />UR Fall held-out</span></div>
              <div className="hg-stat"><span className="hg-stat__n">74%</span><span className="hg-stat__l">guardians rate<br />fall-anxiety ≥7/10</span></div>
              <div className="hg-stat"><span className="hg-stat__n">64%</span><span className="hg-stat__l">seniors accept<br />hallway-only camera</span></div>
            </div>
            <p className="hg-quote">&ldquo;I won&apos;t wear a pendant. They make you feel old. But a camera in the hallway? As long as nobody is watching the video, I don&apos;t mind.&rdquo; — P-011, age 76</p>
          </div>
          <div className="hg-visual">
            <canvas className="hg-canvas" ref={canvasRef} width={280} height={380} />
            <div className={`hg-status${isAlert ? ' is-alert' : ''}`}>{status}</div>
            <button className="hg-demo-btn" onClick={handleBtn}>{btnLabel}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
