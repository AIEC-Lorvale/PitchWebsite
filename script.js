/* ══════════════════════════════════════════════════════
   AEGIS PITCH DECK · script.js
   ══════════════════════════════════════════════════════ */

// ── PRESENTATION CONTROLLER ────────────────────────────
class AegisDeck {
  constructor() {
    this.current = 0;
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.total = this.slides.length;
    this.isAnimating = false;

    this.$progress = document.getElementById('progressBar');
    this.$counter = document.getElementById('slideCounter');
    this.$navPrev = document.getElementById('navPrev');
    this.$navNext = document.getElementById('navNext');
    this.$dots = document.getElementById('dotsNav');

    this.modules = {};
    this.init();
  }

  init() {
    this.buildDots();
    this.bindKeys();
    this.bindArrows();
    this.bindTouchSwipe();
    this.goTo(0, true);
  }

  buildDots() {
    this.slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot';
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      btn.addEventListener('click', () => this.goTo(i));
      this.$dots.appendChild(btn);
    });
  }

  goTo(index, instant = false) {
    if (this.isAnimating && !instant) return;
    if (index < 0 || index >= this.total) return;

    const prev = this.current;
    this.current = index;
    this.isAnimating = true;

    this.slides.forEach((sl, i) => {
      sl.classList.remove('is-active', 'is-prev');
      if (i === index) sl.classList.add('is-active');
      else if (i < index) sl.classList.add('is-prev');
    });

    this.updateHUD();
    this.onSlideEnter(index, prev);

    setTimeout(() => { this.isAnimating = false; }, 580);
  }

  next() { this.goTo(this.current + 1); }
  prev() { this.goTo(this.current - 1); }

  updateHUD() {
    const pct = ((this.current + 1) / this.total) * 100;
    this.$progress.style.width = `${pct}%`;
    this.$counter.textContent = `${this.current + 1} / ${this.total}`;
    this.$navPrev.disabled = this.current === 0;
    this.$navNext.disabled = this.current === this.total - 1;

    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === this.current);
    });
  }

  onSlideEnter(index, prev) {
    const slideId = this.slides[index].dataset.index;

    if (slideId === '1') startHookCounter();
    else stopHookCounter();

    if (slideId === '5') initMsgDemo();
    if (slideId === '6') resetVoiceDemo();
    if (slideId === '7') startHgAnimation();
    if (slideId === '12') triggerBars();
  }

  bindKeys() {
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault(); this.next();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); this.prev();
      }
    });
  }

  bindArrows() {
    this.$navNext.addEventListener('click', () => this.next());
    this.$navPrev.addEventListener('click', () => this.prev());
  }

  bindTouchSwipe() {
    let startX = 0, startY = 0;
    const el = document.getElementById('slides');
    el.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < Math.abs(dy) * 1.2 && Math.abs(dy) > 40) {
        if (dy < 0) this.next(); else this.prev();
      }
    }, { passive: true });
  }
}

// ── SLIDE 2: SCAM COUNTER ──────────────────────────────
let hookInterval = null;
let hookStart = null;

function startHookCounter() {
  const el = document.getElementById('hookCounter');
  if (!el) return;
  hookStart = Date.now();
  el.textContent = '0';
  clearInterval(hookInterval);
  hookInterval = setInterval(() => {
    const secs = (Date.now() - hookStart) / 1000;
    const count = Math.floor(secs / 30);
    el.textContent = count;
    if (count > 0) el.style.color = 'var(--red)';
  }, 500);
}

function stopHookCounter() {
  clearInterval(hookInterval);
  hookInterval = null;
}

// ── SLIDE 6: MESSAGEGUARD DEMO ─────────────────────────
const MSG_VERDICTS = {
  scam: {
    cls: 'badge--scam',
    label: '🚨 SCAM DETECTED',
    reasons: [
      'Urgency trigger: "NOW" + time pressure ("2 hours")',
      'Impersonation pattern: "this is your bank"',
      'Suspicious action request: QR code scan',
      'High-risk phrasing matches known phishing templates',
    ],
    alert: 'Alert dispatched to family dashboard · Evidence logged',
  },
  suspicious: {
    cls: 'badge--suspicious',
    label: '⚠ SUSPICIOUS',
    reasons: [
      'Unusual request for personal action via message',
      'Informal language inconsistent with claimed sender',
      'No verifiable sender ID',
    ],
    alert: 'Flagged for family review · Verify through official channels',
  },
  safe: {
    cls: 'badge--safe',
    label: '✓ SAFE',
    reasons: [
      'No urgent action requests',
      'No links or QR codes detected',
      'Message pattern consistent with normal communication',
    ],
    alert: 'No action required',
  },
};

const SCAM_KEYWORDS = [
  'bank', 'account', 'locked', 'suspended', 'urgent', 'verify', 'click',
  'password', 'credit card', 'winner', 'prize', 'congratulations', 'qr',
  'transfer', 'wire', 'irs', 'cra', 'arrest', 'lawsuit', 'social security',
  'grandma', 'accident', 'police', 'lottery', 'bitcoin', 'crypto',
];

function classifyMessage(text) {
  const lower = text.toLowerCase();
  const hits = SCAM_KEYWORDS.filter(k => lower.includes(k));
  if (hits.length >= 3) return 'scam';
  if (hits.length >= 1) return 'suspicious';
  return 'safe';
}

let msgDemoReady = false;
function initMsgDemo() {
  if (msgDemoReady) return;
  msgDemoReady = true;

  const btn = document.getElementById('demoAnalyzeBtn');
  const input = document.getElementById('demoTextInput');
  const bubble = document.getElementById('demoBubble');

  if (!btn) return;

  function runAnalysis(text) {
    bubble.textContent = text;
    bubble.className = 'demo-bubble';

    const panel = document.getElementById('demoVerdictPanel');
    const badge = document.getElementById('demoVerdictBadge');
    const reasons = document.getElementById('demoVerdictReasons');
    const alert = document.getElementById('demoVerdictAlert');

    panel.style.opacity = '0';
    badge.className = 'demo-verdict-badge';
    badge.textContent = '';
    reasons.innerHTML = '';
    alert.textContent = '';

    setTimeout(() => {
      bubble.classList.add('is-danger');
    }, 300);

    setTimeout(() => {
      const verdict = classifyMessage(text);
      const v = MSG_VERDICTS[verdict];

      badge.className = `demo-verdict-badge ${v.cls}`;
      badge.textContent = v.label;
      reasons.innerHTML = v.reasons.map(r => `<li>${r}</li>`).join('');
      alert.textContent = v.alert;

      panel.style.transition = 'opacity 0.4s ease';
      panel.style.opacity = '1';

      if (verdict === 'safe') bubble.classList.remove('is-danger');
    }, 900);
  }

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      runAnalysis(text);
      input.value = '';
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      btn.click();
    }
  });

  // Run default analysis on first view
  setTimeout(() => {
    runAnalysis(bubble.textContent);
  }, 600);
}

// ── SLIDE 7: VOICEGUARD DEMO ───────────────────────────
const VOICE_TRANSCRIPT = "Hi there, this is Michael from the Canada Revenue Agency. We've detected unusual activity on your account and need to verify your identity immediately. Failure to respond will result in your account being frozen and legal proceedings being initiated against you. Please press 1 now to speak with our security department. This is urgent.";

const VOICE_SIGNALS = [
  'Government impersonation (CRA)',
  'Artificial urgency + threat of legal action',
  'Unsolicited call requesting immediate response',
  'Secrecy cue: "press 1 now"',
  'Money transfer / account threat framing',
];

let voiceDemoActive = false;

function resetVoiceDemo() {
  voiceDemoActive = false;
  const tc = document.getElementById('voiceTranscriptCard');
  const vc = document.getElementById('voiceVerdictCard');
  const transcriptText = document.getElementById('voiceTranscriptText');
  const waveform = document.getElementById('voiceWaveform');
  const playBtn = document.getElementById('voicePlayBtn');

  if (!tc) return;
  tc.classList.remove('is-visible');
  vc.classList.remove('is-visible');
  if (transcriptText) transcriptText.textContent = '';
  if (waveform) waveform.classList.remove('is-playing');
  if (playBtn) {
    playBtn.textContent = '▶ Play & Analyze';
    playBtn.disabled = false;
  }

  const btn = document.getElementById('voicePlayBtn');
  if (btn && !btn._bound) {
    btn._bound = true;
    btn.addEventListener('click', runVoiceDemo);
  }
}

function runVoiceDemo() {
  if (voiceDemoActive) return;
  voiceDemoActive = true;

  const waveform = document.getElementById('voiceWaveform');
  const playBtn = document.getElementById('voicePlayBtn');
  const tc = document.getElementById('voiceTranscriptCard');
  const vc = document.getElementById('voiceVerdictCard');
  const transcriptText = document.getElementById('voiceTranscriptText');
  const verdictBadge = document.getElementById('voiceVerdictBadge');
  const signals = document.getElementById('voiceSignals');

  if (!waveform) return;

  playBtn.textContent = '⏸ Analyzing…';
  playBtn.disabled = true;
  waveform.classList.add('is-playing');

  // Show transcript with typewriter effect
  setTimeout(() => {
    tc.classList.add('is-visible');
    typeWriter(transcriptText, VOICE_TRANSCRIPT, 18, () => {
      waveform.classList.remove('is-playing');

      setTimeout(() => {
        vc.classList.add('is-visible');

        verdictBadge.className = 'voice-verdict-badge demo-verdict-badge badge--scam';
        verdictBadge.textContent = '🚨 DO NOT TRUST';

        signals.innerHTML = VOICE_SIGNALS
          .map(s => `<span class="signal-tag">${s}</span>`)
          .join('');

        playBtn.textContent = '✓ Analysis complete';
      }, 500);
    });
  }, 1200);
}

function typeWriter(el, text, speed, done) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (done) done();
    }
  }, speed);
}

// ── SLIDE 8: HOMEGUARD CANVAS ANIMATION ───────────────
let hgAnimFrame = null;
let hgState = 'walking'; // 'walking' | 'falling' | 'fallen' | 'alert'
let hgTick = 0;
let hgFallTick = 0;
let hgPersonY = 250;
let hgPersonAngle = 0;
let hgAlertShown = false;

function startHgAnimation() {
  const canvas = document.getElementById('hgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  hgState = 'walking';
  hgTick = 0;
  hgFallTick = 0;
  hgPersonY = 250;
  hgPersonAngle = 0;
  hgAlertShown = false;

  const statusEl = document.getElementById('hgStatus');
  const demoBtn = document.getElementById('hgDemoBtn');

  if (demoBtn && !demoBtn._bound) {
    demoBtn._bound = true;
    demoBtn.addEventListener('click', () => {
      if (hgState === 'walking') {
        hgState = 'falling';
        hgFallTick = 0;
      }
    });
  }

  if (hgAnimFrame) cancelAnimationFrame(hgAnimFrame);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background grid (camera view feel)
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Camera label
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillText('CAM 01 · HALLWAY', 10, 18);

    // Timestamp
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    ctx.textAlign = 'right';
    ctx.fillText(ts, canvas.width - 10, 18);
    ctx.textAlign = 'left';

    // Bounding box (YOLOv8n detection)
    const cx = canvas.width / 2;
    const boxW = 60, boxH = hgState === 'fallen' ? 30 : 100;
    const boxX = cx - boxW / 2;
    const boxY = hgPersonY - boxH + (hgState === 'fallen' ? 30 : 0);

    const boxColor = hgState === 'alert' ? 'rgba(224,84,84,0.9)' :
                     hgState === 'falling' ? 'rgba(232,121,58,0.85)' : 'rgba(61,185,106,0.7)';

    ctx.strokeStyle = boxColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Corner accents
    const cs = 8;
    ctx.lineWidth = 2.5;
    [[boxX,boxY],[boxX+boxW,boxY],[boxX,boxY+boxH],[boxX+boxW,boxY+boxH]].forEach(([bx,by]) => {
      const sx = bx === boxX ? 1 : -1, sy = by === boxY ? 1 : -1;
      ctx.beginPath(); ctx.moveTo(bx, by+sy*cs); ctx.lineTo(bx, by); ctx.lineTo(bx+sx*cs, by); ctx.stroke();
    });

    // Label
    ctx.fillStyle = boxColor;
    ctx.font = 'bold 9px monospace';
    ctx.fillText(`PERSON ${hgState === 'alert' ? '⚠ FALL' : hgState === 'falling' ? '! FALLING' : '✓ OK'}`, boxX, boxY - 4);

    // Draw person (stick figure with skeleton overlay)
    ctx.save();
    ctx.translate(cx, hgPersonY);
    if (hgState === 'falling') ctx.rotate(hgPersonAngle);
    if (hgState === 'fallen') ctx.rotate(Math.PI / 2.1);

    const personColor = hgState === 'alert' ? 'rgba(224,84,84,0.9)' :
                        hgState === 'falling' ? 'rgba(232,121,58,0.9)' : 'rgba(100,200,140,0.8)';

    ctx.strokeStyle = personColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    // Head
    ctx.beginPath(); ctx.arc(0, -72, 10, 0, Math.PI * 2);
    ctx.fillStyle = personColor; ctx.fill();

    // Torso
    ctx.beginPath(); ctx.moveTo(0, -62); ctx.lineTo(0, -30); ctx.stroke();

    // Legs
    const legSwing = Math.sin(hgTick * 0.12) * 12;
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(-12 + legSwing, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(12 - legSwing, 0); ctx.stroke();

    // Arms
    const armSwing = Math.sin(hgTick * 0.12 + Math.PI) * 10;
    ctx.beginPath(); ctx.moveTo(0, -55); ctx.lineTo(-16 - armSwing, -40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -55); ctx.lineTo(16 + armSwing, -40); ctx.stroke();

    // BlazePose keypoints (visual only)
    const joints = [[0,-72],[-16,-40],[16,-40],[-12,0],[12,0],[0,-55],[0,-30]];
    joints.forEach(([jx,jy]) => {
      ctx.beginPath(); ctx.arc(jx, jy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill();
    });

    ctx.restore();

    // State machine
    if (hgState === 'walking') {
      hgTick++;
      // Gentle bob
      hgPersonY = 250 + Math.sin(hgTick * 0.08) * 2;
    }

    if (hgState === 'falling') {
      hgFallTick++;
      hgPersonAngle = (hgFallTick / 30) * (Math.PI / 2.1);
      hgPersonY += 1.5;
      if (hgFallTick > 30) {
        hgState = 'fallen';
        hgFallTick = 0;
      }
    }

    if (hgState === 'fallen') {
      hgFallTick++;
      if (hgFallTick === 20 && !hgAlertShown) {
        hgAlertShown = true;
        hgState = 'alert';
        if (statusEl) {
          statusEl.textContent = '⚠ FALL DETECTED · Alert sent';
          statusEl.classList.add('is-alert');
        }
        showFallAlert(canvas);
      }
    }

    if (hgState === 'alert') {
      hgFallTick++;
      // Flashing red overlay
      if (Math.floor(hgFallTick / 8) % 2 === 0) {
        ctx.fillStyle = 'rgba(224,84,84,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    hgAnimFrame = requestAnimationFrame(draw);
  }

  draw();
}

function showFallAlert(canvas) {
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2;

  // Alert banner
  let alpha = 0;
  let alertTick = 0;
  function drawAlert() {
    if (alertTick < 60) {
      alpha = Math.min(1, alertTick / 15);
      ctx.save();
      ctx.fillStyle = `rgba(224,84,84,${alpha * 0.15})`;
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
      ctx.fillStyle = `rgba(224,84,84,${alpha})`;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚠ FALL EVENT · 3s CLIP ENCRYPTED · FCM ALERT SENT', cx, canvas.height - 35);
      ctx.font = '9px monospace';
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
      ctx.fillText('HomeGuard · edge inference · ≤500ms latency', cx, canvas.height - 20);
      ctx.textAlign = 'left';
      ctx.restore();
      alertTick++;
      requestAnimationFrame(drawAlert);
    }
  }
  drawAlert();
}

// ── SLIDE 13: VALIDATION BARS ──────────────────────────
let barsTriggered = false;

function triggerBars() {
  if (barsTriggered) return;
  barsTriggered = true;

  const bars = document.querySelectorAll('.hyp__bar');
  bars.forEach((bar, i) => {
    const val = parseInt(bar.dataset.val, 10);
    setTimeout(() => {
      bar.style.width = `${val}%`;
    }, i * 150 + 200);
  });
}

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.deck = new AegisDeck();
});
