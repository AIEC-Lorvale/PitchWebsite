const bubbleSequence = [
  {
    text: "It doesn't matter anyways right?",
    duration: 2500,
    drift: "18px",
  },
  {
    text: "I didn't lose anything",
    duration: 2850,
    drift: "-26px",
  },
];

const emotionalLines = [
  "It's not only the elderly who feel the pain",
  "For the child,",
  "It's like trying to wash your kid's clothes...",
  "Only for them to be stained again.",
];

const factBubbles = {
  stat: [
    {
      text: "In 2024, the Canadian Anti-Fraud Centre received 108,878 fraud reports involving over $638 million in reported losses.",
      source: "CAFC 2025",
      left: "9%",
      drift: "18px",
      duration: 6800,
      delay: 0,
    },
    {
      text: "Canada logged 3,390 phishing reports and 989 victims in 2024.",
      source: "CAFC 2025",
      left: "56%",
      drift: "-22px",
      duration: 6600,
      delay: 1050,
    },
    {
      text: "Spear phishing alone accounted for $67.3 million in reported Canadian losses in 2024.",
      source: "CAFC 2025",
      left: "28%",
      drift: "26px",
      duration: 6900,
      delay: 2100,
    },
  ],
  compare: [
    {
      text: "Bank investigator scams led to 2,770 reports and $16.4 million in reported Canadian losses in 2024.",
      source: "CAFC 2025",
      left: "5%",
      drift: "20px",
      duration: 7000,
      delay: 0,
    },
    {
      text: "Older adults' reported fraud losses rose from about $600 million in 2020 to $2.4 billion in 2024.",
      source: "FTC 2025",
      left: "54%",
      drift: "-28px",
      duration: 7200,
      delay: 1150,
    },
    {
      text: "Older consumers reported $159 million in tech support scam losses in 2024.",
      source: "FTC 2025",
      left: "20%",
      drift: "24px",
      duration: 6700,
      delay: 2350,
    },
    {
      text: "Consumers reported $470 million in text-message scam losses in 2024, five times the 2020 level.",
      source: "FTC 2025",
      left: "63%",
      drift: "-18px",
      duration: 7100,
      delay: 3500,
    },
    {
      text: "The FBI said fake toll-road smishing texts generated over 2,000 complaints within weeks of March 2024.",
      source: "FBI IC3 2024",
      left: "36%",
      drift: "14px",
      duration: 6800,
      delay: 4700,
    },
  ],
};

const dom = {
  bubbleSection: document.querySelector(".bubble-section"),
  bubbleCopy: document.querySelector("[data-bubble-copy]"),
  bubble: document.querySelector("[data-thought-bubble]"),
  toneShift: document.querySelector("[data-tone-shift]"),
  statsPrimary: document.querySelector('[data-stat="primary"]'),
  statsSecondary: document.querySelector('[data-stat="secondary"]'),
  statStack: document.querySelector(".stat-stack"),
  compareGrid: document.querySelector("[data-compare-grid]"),
  compareFactStage: document.querySelector('[data-fact-stage="compare"]'),
  factOutro: document.querySelector("[data-fact-outro]"),
  emotionLine: document.querySelector("[data-emotion-line]"),
  emotionSection: document.querySelector('[data-observe="emotion"]'),
  statsSection: document.querySelector('[data-observe="stats"]'),
  sisyphusButton: document.querySelector("[data-sisyphus-button]"),
  sisyphusCanvas: document.querySelector("[data-sisyphus-canvas]"),
  explanation: document.querySelector("[data-explanation]"),
  ctaKicker: document.querySelector(".cta-kicker"),
  ctaTitle: document.querySelector("[data-cta]"),
  ctaSection: document.querySelector("#cta"),
  solutionSection: document.querySelector('[data-observe="solution"]'),
  solutionStack: document.querySelector(".solution-stack"),
  solutionTitle: document.querySelector("[data-solution-title]"),
  solutionIntro: document.querySelector("[data-solution-intro]"),
  solutionBlocks: [...document.querySelectorAll("[data-solution-block]")],
  messageDemo: document.querySelector("[data-message-demo]"),
  systemSection: document.querySelector('[data-observe="system"]'),
  systemShell: document.querySelector(".system-shell"),
  systemTitle: document.querySelector("[data-system-title]"),
  systemLeftHeading: document.querySelector("[data-system-left-heading]"),
  systemLeftBody: document.querySelector("[data-system-left-body]"),
  systemRightHeading: document.querySelector("[data-system-right-heading]"),
  systemRightBody: document.querySelector("[data-system-right-body]"),
  systemSpeed: document.querySelector("[data-system-speed]"),
  systemAnalysis: document.querySelector("[data-system-analysis]"),
  systemFinal: document.querySelector("[data-system-final]"),
  ethicsSection: document.querySelector('[data-observe="ethics"]'),
  ethicsShell: document.querySelector(".ethics-shell"),
  ethicsTitle: document.querySelector("[data-ethics-title]"),
  ethicsBlocks: [...document.querySelectorAll("[data-ethics-block]")],
  ethicsDelete: document.querySelector("[data-ethics-delete]"),
  ethicsQuality: document.querySelector("[data-ethics-quality]"),
  ethicsBias: document.querySelector("[data-ethics-bias]"),
  ethicsFinal: document.querySelector("[data-ethics-final]"),
  aheadSection: document.querySelector('[data-observe="ahead"]'),
  aheadTitle: document.querySelector("[data-ahead-title]"),
  aheadBlocks: [...document.querySelectorAll("[data-ahead-block]")],
  aheadSources: document.querySelector("[data-ahead-sources]"),
  aheadVision: document.querySelector("[data-ahead-vision]"),
  aheadFinal: document.querySelector("[data-ahead-final]"),
};

const state = {
  statsStarted: false,
  emotionStarted: false,
  ctaShown: false,
  sisyphusLocked: false,
  solutionStarted: false,
  messageDemoRan: false,
  systemStarted: false,
  ethicsStarted: false,
  aheadStarted: false,
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const visibilityState = new WeakMap();
const visibilityWaiters = new WeakMap();

function setSectionVisibility(element, isVisible) {
  if (!element) {
    return;
  }

  visibilityState.set(element, isVisible);
  element.classList.toggle("is-offscreen", !isVisible);

  if (isVisible) {
    const waiters = visibilityWaiters.get(element) ?? [];
    waiters.forEach((resolve) => resolve());
    visibilityWaiters.set(element, []);
  }
}

function isSectionVisible(element) {
  return visibilityState.get(element) ?? false;
}

function waitUntilVisible(element) {
  if (!element || isSectionVisible(element)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const waiters = visibilityWaiters.get(element) ?? [];
    waiters.push(resolve);
    visibilityWaiters.set(element, waiters);
  });
}

async function waitVisibleDuration(element, durationMs) {
  if (!element) {
    await wait(durationMs);
    return;
  }

  let remaining = durationMs;

  while (remaining > 0) {
    await waitUntilVisible(element);
    const slice = Math.min(remaining, 50);
    await wait(slice);

    if (isSectionVisible(element)) {
      remaining -= slice;
    }
  }
}

const sisyphusScene = (() => {
  const COLORS = Object.freeze({
    BG: "#FFFFFF",
    HILL: "#5A3A1E",
    BOULDER: "#3E2A14",
    CHARACTER: "#000000",
  });

  const STATES = Object.freeze({
    IDLE: "IDLE",
    ASCENT: "ASCENT",
    STALL: "STALL",
    DESCENT: "DESCENT",
    RESET: "RESET",
  });

  const DURATIONS = Object.freeze({
    ASCENT: 4.0,
    STALL: 0.75,
    DESCENT: 1.5,
    RESET: 0.75,
  });

  const NEXT_STATE = Object.freeze({
    ASCENT: STATES.STALL,
    STALL: STATES.DESCENT,
    DESCENT: STATES.RESET,
    RESET: STATES.IDLE,
  });

  const canvas = dom.sisyphusCanvas;
  const ctx = canvas.getContext("2d");
  const CURVE_BASE = 1.5;
  const CURVE_SCALE = 8;

  let geometry = null;
  let sceneState = STATES.IDLE;
  let stateTime = 0;
  let t = 0;
  let previousT = 0;
  let previousBoulderProgress = 0;
  let rotation = 0;
  let lastTimestamp = performance.now();

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, amount) {
    return a + (b - a) * amount;
  }

  function easeInCubic(x) {
    return x * x * x;
  }

  function easeOutCubic(x) {
    return 1 - (1 - x) ** 3;
  }

  function pseudoRandom(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
    return value - Math.floor(value);
  }

  function length(x, y) {
    return Math.hypot(x, y);
  }

  function normalize(x, y) {
    const len = length(x, y);
    return { x: x / len, y: y / len };
  }

  function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  function scale(vector, amount) {
    return { x: vector.x * amount, y: vector.y * amount };
  }

  function curveValue(progress) {
    const u = clamp(progress, 0, 1);
    const numerator = CURVE_BASE ** (u * CURVE_SCALE) - 1;
    const denominator = CURVE_BASE ** CURVE_SCALE - 1;
    return numerator / denominator;
  }

  function curveDerivative(progress) {
    const u = clamp(progress, 0, 1);
    const denominator = CURVE_BASE ** CURVE_SCALE - 1;
    return (
      (CURVE_SCALE * Math.log(CURVE_BASE) * CURVE_BASE ** (u * CURVE_SCALE)) /
      denominator
    );
  }

  function pointOnSlope(progress) {
    const u = clamp(progress, 0, 1);
    const rise = curveValue(u);
    return {
      x: lerp(geometry.P0.x, geometry.P1.x, u),
      y: lerp(geometry.P0.y, geometry.P1.y, rise),
    };
  }

  function tangentAt(progress) {
    const dx = geometry.P1.x - geometry.P0.x;
    const dy = (geometry.P1.y - geometry.P0.y) * curveDerivative(progress);
    return normalize(dx, dy);
  }

  function liftNormalAt(progress) {
    const tangent = tangentAt(progress);
    return { x: tangent.y, y: -tangent.x };
  }

  function jitterNormalAt(progress) {
    const tangent = tangentAt(progress);
    return { x: -tangent.y, y: tangent.x };
  }

  function approximateCurveLength() {
    let total = 0;
    let previousPoint = pointOnSlope(0);

    for (let index = 1; index <= 160; index += 1) {
      const point = pointOnSlope(index / 160);
      total += length(point.x - previousPoint.x, point.y - previousPoint.y);
      previousPoint = point;
    }

    return total;
  }

  function recomputeGeometry() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    canvas.width = width;
    canvas.height = height;

    const P0 = { x: 0.1 * width, y: 0.85 * height };
    const P1 = { x: 0.9 * width, y: 0.25 * height };
    const deltaX = P1.x - P0.x;
    const deltaY = P1.y - P0.y;

    geometry = {
      W: width,
      H: height,
      P0,
      P1,
      baseDx: deltaX,
      baseDy: deltaY,
      R: 0.08 * height,
      hillWidth: 0.18 * height,
    };

    geometry.L = approximateCurveLength();
  }

  function resize() {
    recomputeGeometry();
    render();
  }

  function startCycle() {
    if (sceneState !== STATES.IDLE) {
      return false;
    }

    sceneState = STATES.ASCENT;
    stateTime = 0;
    t = 0;
    previousT = 0;
    previousBoulderProgress = 0;
    rotation = 0;
    return true;
  }

  function currentBoulderProgress() {
    if (sceneState === STATES.IDLE) {
      return 0;
    }

    if (sceneState === STATES.ASCENT) {
      const progress = clamp(t / 0.92, 0, 1);
      const lag = 0.018 + 0.072 * progress ** 1.7;
      const rough =
        (Math.sin(stateTime * 12.5) + 0.45 * Math.sin(stateTime * 28 + 0.8)) *
        0.0045 *
        (0.35 + progress);
      return clamp(t - lag + rough, 0, 0.92);
    }

    if (sceneState === STATES.STALL) {
      return clamp(t - 0.074 + Math.sin(stateTime * 22) * 0.0035, 0, 0.92);
    }

    if (sceneState === STATES.DESCENT) {
      const progress = clamp(stateTime / DURATIONS.DESCENT, 0, 1);
      const lag = 0.01 + 0.02 * (1 - progress);
      const rough =
        (Math.sin(stateTime * 11.5) + 0.35 * Math.sin(stateTime * 24 + 0.6)) * 0.003;
      return clamp(t - lag + rough, 0, 0.92);
    }

    return t;
  }

  function currentT() {
    if (sceneState === STATES.IDLE) {
      return 0;
    }

    if (sceneState === STATES.ASCENT) {
      const progress = clamp(stateTime / DURATIONS.ASCENT, 0, 1);
      return 0.92 * easeInCubic(progress);
    }

    if (sceneState === STATES.STALL) {
      return 0.92 - 0.002 * Math.sin(stateTime * 20);
    }

    if (sceneState === STATES.DESCENT) {
      const progress = clamp(stateTime / DURATIONS.DESCENT, 0, 1);
      return 0.92 * (1 - easeOutCubic(progress));
    }

    return 0;
  }

  function update(deltaTime) {
    if (sceneState === STATES.IDLE) {
      t = 0;
      previousT = 0;
      previousBoulderProgress = 0;
      rotation = 0;
      return;
    }

    let remaining = deltaTime;

    while (remaining > 0 && sceneState !== STATES.IDLE) {
      const duration = DURATIONS[sceneState];
      const step = Math.min(remaining, duration - stateTime);

      stateTime += step;
      remaining -= step;

      if (sceneState === STATES.RESET) {
        t = lerp(t, 0, clamp(stateTime / DURATIONS.RESET, 0, 1));
      } else {
        t = currentT();
      }

      if (stateTime >= duration - 1e-9) {
        sceneState = NEXT_STATE[sceneState];
        stateTime = 0;

        if (sceneState === STATES.IDLE) {
          t = 0;
          previousT = 0;
          previousBoulderProgress = 0;
          rotation = 0;
          break;
        }
      }
    }

    const boulderProgress = currentBoulderProgress();
    const currentPoint = pointOnSlope(boulderProgress);
    const previousPoint = pointOnSlope(previousBoulderProgress);
    const travel = length(
      currentPoint.x - previousPoint.x,
      currentPoint.y - previousPoint.y
    );
    const direction = Math.sign(boulderProgress - previousBoulderProgress);
    rotation += (direction * travel) / geometry.R;
    previousT = t;
    previousBoulderProgress = boulderProgress;
  }

  function drawHill() {
    const points = [];

    for (let index = 0; index <= 80; index += 1) {
      points.push(pointOnSlope(index / 80));
    }

    const leftPoint = points[0];
    const rightPoint = points[points.length - 1];

    ctx.fillStyle = COLORS.HILL;
    ctx.beginPath();
    ctx.moveTo(0, geometry.H);
    ctx.lineTo(0, leftPoint.y);
    ctx.lineTo(leftPoint.x, leftPoint.y);

    points.slice(1).forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.lineTo(geometry.W, rightPoint.y);
    ctx.lineTo(geometry.W, geometry.H);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = COLORS.BG;
    ctx.lineWidth = Math.max(6, geometry.H * 0.028);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(leftPoint.x, leftPoint.y);

    points.slice(1).forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.stroke();
  }

  function drawBoulder(center) {
    const facets = [
      { angle: -0.08, radius: 1.01 },
      { angle: 0.3, radius: 0.97 },
      { angle: 0.7, radius: 0.94 },
      { angle: 1.08, radius: 0.99 },
      { angle: 1.46, radius: 1.03 },
      { angle: 1.84, radius: 0.96 },
      { angle: 2.22, radius: 0.93 },
      { angle: 2.6, radius: 0.98 },
      { angle: 3.0, radius: 1.02 },
      { angle: 3.38, radius: 0.96 },
      { angle: 3.78, radius: 0.92 },
      { angle: 4.16, radius: 0.98 },
      { angle: 4.54, radius: 1.04 },
      { angle: 4.92, radius: 0.97 },
      { angle: 5.32, radius: 0.94 },
      { angle: 5.7, radius: 1.0 },
    ];

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    ctx.fillStyle = COLORS.BOULDER;
    ctx.beginPath();
    facets.forEach((facet, index) => {
      const x = Math.cos(facet.angle) * geometry.R * facet.radius;
      const y = Math.sin(facet.angle) * geometry.R * facet.radius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawTriangle(a, b, c) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.closePath();
    ctx.fill();
  }

  function drawPolygon(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index].x, points[index].y);
    }

    ctx.closePath();
    ctx.fill();
  }

  function perpendicularUnit(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: -dy / len, y: dx / len };
  }

  function drawLimb(start, joint, end, startWidth, jointWidth, endWidth) {
    const n1 = perpendicularUnit(start, joint);
    const n2 = perpendicularUnit(joint, end);
    const blend = { x: n1.x + n2.x, y: n1.y + n2.y };
    const blendLen = Math.hypot(blend.x, blend.y) || 1;
    const kneeNormal = { x: blend.x / blendLen, y: blend.y / blendLen };

    ctx.beginPath();
    ctx.moveTo(start.x + n1.x * startWidth, start.y + n1.y * startWidth);
    ctx.lineTo(joint.x + kneeNormal.x * jointWidth, joint.y + kneeNormal.y * jointWidth);
    ctx.lineTo(end.x + n2.x * endWidth, end.y + n2.y * endWidth);
    ctx.lineTo(end.x - n2.x * endWidth, end.y - n2.y * endWidth);
    ctx.lineTo(joint.x - kneeNormal.x * jointWidth, joint.y - kneeNormal.y * jointWidth);
    ctx.lineTo(start.x - n1.x * startWidth, start.y - n1.y * startWidth);
    ctx.closePath();
    ctx.fill();
  }

  function solveElbow(start, end, upperLength, lowerLength, bendDirection) {
    const delta = {
      x: end.x - start.x,
      y: end.y - start.y,
    };
    const distance = Math.hypot(delta.x, delta.y) || 1;
    const clampedDistance = Math.min(
      distance,
      upperLength + lowerLength - 0.001
    );
    const direction = {
      x: delta.x / distance,
      y: delta.y / distance,
    };
    const along =
      (upperLength * upperLength -
        lowerLength * lowerLength +
        clampedDistance * clampedDistance) /
      (2 * clampedDistance);
    const height = Math.sqrt(Math.max(upperLength * upperLength - along * along, 0));
    const base = {
      x: start.x + direction.x * along,
      y: start.y + direction.y * along,
    };
    const perp = { x: -direction.y, y: direction.x };
    const sign =
      perp.x * bendDirection.x + perp.y * bendDirection.y >= 0 ? 1 : -1;

    return {
      x: base.x + perp.x * height * sign,
      y: base.y + perp.y * height * sign,
    };
  }

  function drawCharacter(boulderCenter, jitterOffset, boulderProgress) {
    const pushGap = Math.max(18, geometry.R * 0.34);
    const tChar = clamp(
      boulderProgress - ((geometry.R + pushGap) / geometry.L) * 1.52,
      0,
      1
    );
    const startupClearance =
      geometry.R *
      0.72 *
      Math.max(0, 1 - clamp(boulderProgress / 0.16, 0, 1));
    const lean = (lerp(26, 48, t) * Math.PI) / 180;
    const tangent = tangentAt(tChar);
    const lift = liftNormalAt(tChar);
    const boulderTangent = tangentAt(boulderProgress);
    const normalAngle = Math.atan2(lift.y, lift.x);
    const bodyAngle = normalAngle + lean;
    const stanceCenter = add(
      add(pointOnSlope(tChar), jitterOffset),
      scale(tangent, -startupClearance)
    );

    const rearFootOffset = geometry.R * 0.72;
    const frontFootOffset = geometry.R * 0.24;
    const hipHeight = geometry.R * 0.66;
    const bodyLength = geometry.R * 1.08;
    const strain =
      sceneState === STATES.ASCENT
        ? clamp(stateTime / DURATIONS.ASCENT, 0, 1)
        : sceneState === STATES.STALL
          ? 1
          : 0;
    const isStall = sceneState === STATES.STALL;
    const gaitCycleDuration = 0.5;
    let gaitTime = stateTime;

    if (sceneState === STATES.ASCENT) {
      const pauseDuration = 0.2;
      const pauseWindow = 0.88;
      const pauseCount = Math.ceil(DURATIONS.ASCENT / pauseWindow);
      let pausedTime = 0;

      for (let index = 0; index < pauseCount; index += 1) {
        const windowStart = index * pauseWindow;
        const windowEnd = Math.min(DURATIONS.ASCENT, windowStart + pauseWindow);
        const available = windowEnd - windowStart - pauseDuration - 0.1;

        if (available <= 0 || pseudoRandom(index + 1.9) < 0.38) {
          continue;
        }

        const pauseStart =
          windowStart + 0.05 + pseudoRandom(index + 6.4) * available;

        if (stateTime >= pauseStart + pauseDuration) {
          pausedTime += pauseDuration;
          continue;
        }

        if (stateTime >= pauseStart) {
          pausedTime += stateTime - pauseStart;
          break;
        }
      }

      gaitTime = Math.max(0, stateTime - pausedTime);
    }

    const strideProgress = gaitTime / gaitCycleDuration;
    const stridePhase = strideProgress - Math.floor(strideProgress);
    const rawCadence =
      stridePhase < 0.5 ? stridePhase * 4 - 1 : 3 - stridePhase * 4;
    const cadence = Math.sign(rawCadence) * Math.min(1, Math.abs(rawCadence) * 1.12);
    const cadenceAccent =
      stridePhase < 0.16
        ? -0.9
        : stridePhase < 0.34
          ? -0.25
          : stridePhase < 0.66
            ? 0.2
            : stridePhase < 0.84
              ? 0.9
              : 0.3;
    const stumbleAmount = geometry.R * 0.1 * strain;
    const kneeDrop = geometry.R * 0.12 * strain;
    const stepBase = geometry.R * 0.14;
    const stepTravel = geometry.R * 0.34 * strain;
    const stallPulse =
      Math.sin(stateTime * 12) * 0.7 + Math.sin(stateTime * 23 + 0.8) * 0.3;
    const rearSlip = isStall
      ? -stepBase
      : -stepBase +
        cadence * stepTravel -
        cadence * stumbleAmount * 0.32 -
        cadenceAccent * stumbleAmount * 0.16;
    const frontSlip = isStall
      ? stepBase
      : stepBase -
        cadence * stepTravel +
        cadence * stumbleAmount * 0.28 +
        cadenceAccent * stumbleAmount * 0.1;
    const rearFootLift = isStall ? 0 : -Math.max(0, cadence) * geometry.R * 0.05 * strain;
    const frontFootLift = isStall ? 0 : -Math.max(0, -cadence) * geometry.R * 0.06 * strain;

    const rearFoot = add(
      add(stanceCenter, scale(tangent, rearSlip)),
      scale(lift, rearFootLift)
    );
    const frontFoot = add(
      add(stanceCenter, scale(tangent, frontSlip)),
      scale(lift, frontFootLift)
    );
    const hip = add(stanceCenter, scale(lift, hipHeight));
    const shoulder = {
      x: hip.x + Math.cos(bodyAngle) * bodyLength,
      y: hip.y + Math.sin(bodyAngle) * bodyLength,
    };
    const contactInset = 1;
    const touchPoint = {
      x: boulderCenter.x - boulderTangent.x * (geometry.R + contactInset),
      y: boulderCenter.y - boulderTangent.y * (geometry.R + contactInset),
    };

    const bodyDirection = {
      x: Math.cos(bodyAngle),
      y: Math.sin(bodyAngle),
    };
    const shoulderCenter = add(shoulder, scale(bodyDirection, -geometry.R * 0.08));
    const chestAnchor = add(shoulderCenter, scale(lift, -geometry.R * 0.08));
    const ribCenter = add(hip, scale(bodyDirection, geometry.R * 0.44));
    const waistCenter = add(hip, scale(bodyDirection, geometry.R * 0.18));
    const pelvisCenter = add(
      add(hip, scale(bodyDirection, -geometry.R * 0.06)),
      scale(lift, -geometry.R * 0.02)
    );
    const headCenter = add(shoulder, scale(bodyDirection, geometry.R * 0.28));
    const shoulderLeft = add(shoulderCenter, scale(tangent, -geometry.R * 0.24));
    const shoulderRight = add(shoulderCenter, scale(tangent, geometry.R * 0.24));
    const ribLeft = add(ribCenter, scale(tangent, -geometry.R * 0.21));
    const ribRight = add(ribCenter, scale(tangent, geometry.R * 0.21));
    const waistLeft = add(waistCenter, scale(tangent, -geometry.R * 0.16));
    const waistRight = add(waistCenter, scale(tangent, geometry.R * 0.16));
    const pelvisLeft = add(pelvisCenter, scale(tangent, -geometry.R * 0.22));
    const pelvisRight = add(pelvisCenter, scale(tangent, geometry.R * 0.22));
    const rearKnee = add(
      add(hip, scale(tangent, rearSlip * 0.52)),
      scale(
        lift,
        -geometry.R * 0.02 -
          (isStall
            ? geometry.R * 0.08 + Math.max(0, -stallPulse) * kneeDrop * 0.55
            : Math.max(0, -cadence) * kneeDrop * 0.35)
      )
    );
    const frontKnee = add(
      add(hip, scale(tangent, frontSlip * 0.74)),
      scale(
        lift,
        -geometry.R * 0.22 -
          (isStall
            ? geometry.R * 0.12 + Math.max(0, stallPulse) * kneeDrop * 0.7
            : Math.max(0, cadence) * kneeDrop * 0.45)
      )
    );
    const rearHip = add(
      add(pelvisCenter, scale(tangent, -geometry.R * 0.11)),
      scale(bodyDirection, -geometry.R * 0.03)
    );
    const frontHip = add(
      add(pelvisCenter, scale(tangent, geometry.R * 0.11)),
      scale(bodyDirection, geometry.R * 0.01)
    );
    const upperShoulder = add(chestAnchor, scale(lift, geometry.R * 0.14));
    const lowerShoulder = add(chestAnchor, scale(lift, -geometry.R * 0.14));
    const handOffset = scale(lift, geometry.R * 0.14);
    const upperHand = {
      x: touchPoint.x - handOffset.x,
      y: touchPoint.y + handOffset.y,
    };
    const lowerHand = {
      x: touchPoint.x + handOffset.x,
      y: touchPoint.y - handOffset.y,
    };
    const upperElbow = {
      x: lerp(upperShoulder.x, upperHand.x, 0.5),
      y: lerp(upperShoulder.y, upperHand.y, 0.5),
    };
    const lowerElbow = {
      x: lerp(lowerShoulder.x, lowerHand.x, 0.5),
      y: lerp(lowerShoulder.y, lowerHand.y, 0.5),
    };
    const rearFootBack = add(rearFoot, scale(tangent, -geometry.R * 0.18));
    const rearFootFront = add(rearFoot, scale(tangent, geometry.R * 0.08));
    const frontFootBack = add(frontFoot, scale(tangent, -geometry.R * 0.08));
    const frontFootFront = add(frontFoot, scale(tangent, geometry.R * 0.18));
    const legThickness = Math.max(8, geometry.H * 0.022);
    const legHalf = legThickness * 0.5;
    const armThickness = Math.max(6, geometry.H * 0.016);
    const armHalf = armThickness * 0.5;

    ctx.fillStyle = COLORS.CHARACTER;

    drawLimb(rearHip, rearKnee, rearFoot, legHalf * 0.58, legHalf * 1.15, legHalf * 0.9);
    drawLimb(frontHip, frontKnee, frontFoot, legHalf * 0.58, legHalf * 1.15, legHalf * 0.9);
    drawPolygon([
      shoulderLeft,
      shoulderRight,
      ribRight,
      waistRight,
      pelvisRight,
      pelvisLeft,
      waistLeft,
      ribLeft,
    ]);
    drawLimb(
      upperShoulder,
      upperElbow,
      upperHand,
      armHalf,
      armHalf * 0.95,
      armHalf * 0.85
    );
    drawLimb(
      lowerShoulder,
      lowerElbow,
      lowerHand,
      armHalf,
      armHalf * 0.95,
      armHalf * 0.85
    );
    drawTriangle(rearFootBack, rearFootFront, add(rearFoot, scale(lift, -geometry.R * 0.08)));
    drawTriangle(frontFootBack, frontFootFront, add(frontFoot, scale(lift, -geometry.R * 0.08)));

    ctx.beginPath();
    ctx.arc(headCenter.x, headCenter.y, geometry.R * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }

  function render() {
    ctx.fillStyle = COLORS.BG;
    ctx.fillRect(0, 0, geometry.W, geometry.H);

    drawHill();

    const jitter = sceneState === STATES.ASCENT ? Math.sin(stateTime * 10) * 1.5 : 0;
    const boulderProgress = currentBoulderProgress();
    const jitterOffset = scale(jitterNormalAt(boulderProgress), jitter);
    const ridgeLift = liftNormalAt(boulderProgress);
    const ridgeStroke = Math.max(6, geometry.H * 0.028);
    const ridgeClearance = Math.max(
      geometry.R - ridgeStroke * 0.5 + 1,
      geometry.R * 0.72
    );
    const boulderCenter = add(
      add(pointOnSlope(boulderProgress), jitterOffset),
      scale(ridgeLift, ridgeClearance)
    );

    drawCharacter(boulderCenter, jitterOffset, boulderProgress);
    drawBoulder(boulderCenter);
  }

  function frame(timestamp) {
    const deltaTime = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
    lastTimestamp = timestamp;

    if (sceneState === STATES.IDLE || isSectionVisible(dom.emotionSection)) {
      update(deltaTime);
    }
    render();
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);

  return {
    startCycle,
  };
})();

async function runBubbleSequence() {
  await waitUntilVisible(dom.bubbleSection);

  for (const item of bubbleSequence) {
    dom.bubbleCopy.textContent = item.text;
    dom.bubbleCopy.classList.add("is-visible");

    dom.bubble.style.setProperty("--bubble-duration", `${item.duration}ms`);
    dom.bubble.style.setProperty("--bubble-drift", item.drift);
    dom.bubble.classList.remove("is-floating");
    void dom.bubble.offsetWidth;
    dom.bubble.classList.add("is-floating");

    await waitVisibleDuration(dom.bubbleSection, item.duration + 240);
    dom.bubbleCopy.classList.remove("is-visible");
    await waitVisibleDuration(dom.bubbleSection, 320);
  }

  dom.toneShift.classList.add("is-visible");
}

function spawnFactBubble(stage, fact) {
  const bubble = document.createElement("article");
  bubble.className = "fact-bubble";
  bubble.dataset.clicks = "0";
  bubble._stage = stage;
  bubble.style.left = fact.left;
  bubble.style.setProperty("--fact-drift", fact.drift);
  bubble.style.setProperty("--fact-duration", `${fact.duration}ms`);
  bubble.style.setProperty("--fact-pop-y", "-112px");
  bubble.innerHTML = `
    <p class="fact-bubble__text">${fact.text}</p>
    <span class="fact-bubble__source">${fact.source}</span>
  `;

  stage.appendChild(bubble);
  bubble.removeTimer = 0;

  return bubble;
}

function runFactStream(stage, facts) {
  stage.replaceChildren();
  stage.dataset.streamComplete = "false";
  dom.factOutro.classList.remove("is-visible");
  stage._completedCount = 0;
  stage._expectedCount = facts.length;
  stage.dataset.runToken = String(Number(stage.dataset.runToken ?? "0") + 1);
  const runToken = stage.dataset.runToken;

  facts.forEach((fact) => {
    (async () => {
      await waitVisibleDuration(dom.statsSection, fact.delay);

      if (stage.dataset.runToken !== runToken) {
        return;
      }

      const bubble = spawnFactBubble(stage, fact);
      await waitVisibleDuration(dom.statsSection, fact.duration + 260);

      if (!bubble._completed) {
        bubble._completed = true;
        bubble.remove();
      }

      if (stage.dataset.runToken !== runToken) {
        return;
      }

      stage._completedCount += 1;

      if (stage._completedCount >= stage._expectedCount) {
        stage.dataset.streamComplete = "true";
        maybeRevealFactOutro(stage);
      }
    })();
  });
}

function popFactBubble(bubble) {
  if (!bubble || bubble.classList.contains("is-popped")) {
    return;
  }

  window.clearTimeout(bubble.removeTimer);
  bubble.classList.add("is-popped");

  window.setTimeout(() => {
    bubble._completed = true;
    bubble.remove();
    maybeRevealFactOutro(bubble._stage);
  }, 280);
}

function maybeRevealFactOutro(stage) {
  if (!stage || stage.dataset.streamComplete !== "true") {
    return;
  }

  if (stage.querySelector(".fact-bubble")) {
    return;
  }

  dom.factOutro.classList.add("is-visible");
}

function initFactBubbleInteraction() {
  dom.compareFactStage.addEventListener("click", (event) => {
    const bubble = event.target.closest(".fact-bubble");

    if (!bubble) {
      return;
    }

    const nextClicks = Number.parseInt(bubble.dataset.clicks ?? "0", 10) + 1;
    bubble.dataset.clicks = String(nextClicks);

    if (nextClicks >= 3) {
      popFactBubble(bubble);
    }
  });
}

async function runStatsSequence() {
  if (state.statsStarted) {
    return;
  }

  state.statsStarted = true;
  await waitUntilVisible(dom.statsSection);
  dom.statsPrimary.classList.add("is-visible");
  await waitVisibleDuration(dom.statsSection, 850);
  dom.statsSecondary.classList.add("is-visible");
  await waitVisibleDuration(dom.statsSection, 1450);
  dom.statStack.classList.add("is-muted");
  dom.compareGrid.classList.add("is-visible");
  runFactStream(dom.compareFactStage, [
    ...factBubbles.stat,
    ...factBubbles.compare.map((fact) => ({
      ...fact,
      delay: fact.delay + 3300,
    })),
  ]);
}

async function swapEmotionText(nextText) {
  dom.emotionLine.classList.remove("is-visible");
  await waitVisibleDuration(dom.emotionSection, 400);
  dom.emotionLine.textContent = nextText;
  dom.emotionLine.classList.add("is-visible");
  await waitVisibleDuration(dom.emotionSection, 950);
}

async function runEmotionSequence() {
  if (state.emotionStarted) {
    return;
  }

  state.emotionStarted = true;
  await waitUntilVisible(dom.emotionSection);
  dom.emotionLine.classList.add("is-visible");

  for (let index = 1; index < emotionalLines.length; index += 1) {
    await swapEmotionText(emotionalLines[index]);
  }
}

async function runSolutionSequence() {
  if (state.solutionStarted) {
    return;
  }

  state.solutionStarted = true;
  await waitUntilVisible(dom.solutionSection);
  dom.solutionTitle.classList.add("is-visible");
  await waitVisibleDuration(dom.solutionSection, 180);
  dom.solutionIntro.classList.add("is-visible");
  await waitVisibleDuration(dom.solutionSection, 240);

  for (const [index, block] of dom.solutionBlocks.entries()) {
    await waitUntilVisible(dom.solutionSection);
    block.classList.add("is-visible");

    window.setTimeout(() => {
      if (!isSectionVisible(dom.solutionSection)) {
        return;
      }

      block.querySelectorAll(".solution-key").forEach((keyword) => {
        keyword.classList.add("is-emphasized");
      });
    }, 200);

    if (index === 0 && !state.messageDemoRan) {
      state.messageDemoRan = true;
      await waitVisibleDuration(dom.solutionSection, 220);
      dom.messageDemo.classList.add("is-flagging");
      await waitVisibleDuration(dom.solutionSection, 420);
      dom.messageDemo.classList.add("is-badged");
      await waitVisibleDuration(dom.solutionSection, 420);
      dom.messageDemo.classList.add("is-alerted");
    }

    await waitVisibleDuration(dom.solutionSection, 400);
  }
}

async function runSystemSequence() {
  if (state.systemStarted) {
    return;
  }

  state.systemStarted = true;
  dom.solutionStack.classList.add("is-exiting");
  await waitUntilVisible(dom.systemSection);
  await waitVisibleDuration(dom.systemSection, 200);
  dom.systemTitle.classList.add("is-visible");
  await waitVisibleDuration(dom.systemSection, 320);
  dom.systemLeftHeading.classList.add("is-visible");
  await waitVisibleDuration(dom.systemSection, 200);
  dom.systemLeftBody.classList.add("is-visible");
  window.setTimeout(() => {
    if (isSectionVisible(dom.systemSection)) {
      dom.systemSpeed.classList.add("is-emphasized");
    }
  }, 200);
  await waitVisibleDuration(dom.systemSection, 360);
  dom.systemRightHeading.classList.add("is-visible");
  await waitVisibleDuration(dom.systemSection, 200);
  dom.systemRightBody.classList.add("is-visible");
  window.setTimeout(() => {
    if (isSectionVisible(dom.systemSection)) {
      dom.systemAnalysis.classList.add("is-emphasized");
    }
  }, 200);
  await waitVisibleDuration(dom.systemSection, 420);
  dom.systemFinal.classList.add("is-visible");
}

async function runEthicsSequence() {
  if (state.ethicsStarted) {
    return;
  }

  state.ethicsStarted = true;
  dom.systemShell.classList.add("is-exiting");
  document.body.classList.add("ethics-stage");
  await waitUntilVisible(dom.ethicsSection);
  await waitVisibleDuration(dom.ethicsSection, 200);
  dom.ethicsTitle.classList.add("is-visible");
  await waitVisibleDuration(dom.ethicsSection, 1000);

  const emphasisKeys = [dom.ethicsDelete, dom.ethicsQuality, dom.ethicsBias];

  for (let index = 0; index < dom.ethicsBlocks.length; index += 1) {
    await waitUntilVisible(dom.ethicsSection);
    const block = dom.ethicsBlocks[index];
    block.classList.add("is-visible");

    if (emphasisKeys[index]) {
      window.setTimeout(() => {
        if (isSectionVisible(dom.ethicsSection)) {
          emphasisKeys[index].classList.add("is-emphasized");
        }
      }, 200);
    }

    await waitVisibleDuration(
      dom.ethicsSection,
      index === dom.ethicsBlocks.length - 1 ? 360 : 300
    );
  }

  dom.ethicsFinal.classList.add("is-visible");
}

async function runAheadSequence() {
  if (state.aheadStarted) {
    return;
  }

  state.aheadStarted = true;
  dom.ethicsShell.classList.add("is-exiting");
  document.body.classList.add("looking-ahead-stage");
  await waitUntilVisible(dom.aheadSection);
  await waitVisibleDuration(dom.aheadSection, 200);
  dom.aheadTitle.classList.add("is-visible");
  await waitVisibleDuration(dom.aheadSection, 1000);

  for (let index = 0; index < dom.aheadBlocks.length; index += 1) {
    await waitUntilVisible(dom.aheadSection);
    const block = dom.aheadBlocks[index];
    block.classList.add("is-visible");

    if (index === 2) {
      window.setTimeout(() => {
        if (isSectionVisible(dom.aheadSection)) {
          dom.aheadSources.classList.add("is-emphasized");
        }
      }, 200);
    }

    await waitVisibleDuration(dom.aheadSection, index === 0 ? 300 : 360);
  }

  dom.aheadVision.classList.add("is-visible");
  await waitVisibleDuration(dom.aheadSection, 500);
  dom.aheadFinal.classList.add("is-visible");
}

async function revealCta() {
  if (state.ctaShown) {
    return;
  }

  state.ctaShown = true;
  await waitVisibleDuration(dom.emotionSection, 1200);
  document.body.classList.add("cta-stage");
  dom.ctaKicker.classList.add("is-visible");
  dom.ctaTitle.classList.add("is-visible");
  dom.ctaSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function initSisyphusInteraction() {
  dom.sisyphusButton.addEventListener("click", async () => {
    if (state.sisyphusLocked) {
      return;
    }

    if (!sisyphusScene.startCycle()) {
      return;
    }

    state.sisyphusLocked = true;

    await waitVisibleDuration(dom.emotionSection, 7000);
    dom.explanation.classList.add("is-visible");
    revealCta();

    state.sisyphusLocked = false;
  });
}

function initScrollObservers() {
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setSectionVisibility(entry.target, entry.isIntersecting && entry.intersectionRatio >= 0.15);
      });
    },
    {
      threshold: [0, 0.15, 0.4],
    }
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const trigger = entry.target.dataset.observe;

        if (trigger === "stats") {
          runStatsSequence();
          observer.unobserve(entry.target);
        }

        if (trigger === "emotion") {
          runEmotionSequence();
          observer.unobserve(entry.target);
        }

        if (trigger === "solution") {
          runSolutionSequence();
          observer.unobserve(entry.target);
        }

        if (trigger === "system") {
          runSystemSequence();
          observer.unobserve(entry.target);
        }

        if (trigger === "ethics") {
          runEthicsSequence();
          observer.unobserve(entry.target);
        }

        if (trigger === "ahead") {
          runAheadSequence();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(dom.statsSection);
  observer.observe(dom.emotionSection);
  observer.observe(dom.solutionSection);
  observer.observe(dom.systemSection);
  observer.observe(dom.ethicsSection);
  observer.observe(dom.aheadSection);

  [
    dom.bubbleSection,
    dom.statsSection,
    dom.emotionSection,
    dom.solutionSection,
    dom.systemSection,
    dom.ethicsSection,
    dom.aheadSection,
  ].forEach((section) => {
    visibilityObserver.observe(section);
  });
}

function init() {
  runBubbleSequence();
  initScrollObservers();
  initFactBubbleInteraction();
  initSisyphusInteraction();
}

init();
