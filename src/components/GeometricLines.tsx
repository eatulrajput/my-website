"use client";

/**
 * GeometricLines — Interactive Square Grid with Thread Physics
 *
 * Renders two canvas panels in the left/right viewport margins.
 * Each panel shows a square grid connected by thread-like lines.
 * On mouse hover, squares are repelled and threads sag/loosen.
 * When the mouse leaves, spring physics return squares to their origin.
 *
 * Physics model per square:
 *   - Repulsion: F ∝ (1 - d/R)² pointing away from cursor
 *   - Spring:    F = k * (origin - pos)
 *   - Damping:   v *= damping each frame
 *
 * Thread rendering:
 *   - Drawn as quadratic bezier curves between adjacent squares
 *   - Control point sags perpendicularly as squares stretch apart
 *   - Alpha fades to 0 as thread over-extends (like it's unravelling)
 */

import { useEffect, useRef } from "react";

// ─── Config ────────────────────────────────────────────────────
const SQ       = 12;     // square side length (px)
const GAP      = 50;     // grid spacing center-to-center (px)
const R        = 160;    // mouse influence radius (px)
const FORCE    = 9;      // repulsion force magnitude
const SPRING   = 0.05;   // spring constant — how fast squares return
const DAMP     = 0.78;   // velocity damping per frame (0=instant stop, 1=no damping)
const SAG_MAX  = 22;     // max sag (px) of thread bezier control point
const THREAD_D = GAP * 1.5; // max rest-distance to draw a thread between two squares
// ───────────────────────────────────────────────────────────────

interface Sq {
  x: number; y: number;   // current position (centre)
  ox: number; oy: number; // origin position  (centre)
  vx: number; vy: number; // velocity
  col: number; row: number;
}

function buildGrid(w: number, h: number): Sq[] {
  const cols = Math.ceil(w / GAP) + 1;
  const rows = Math.ceil(h / GAP) + 1;
  const out: Sq[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ox = c * GAP;
      const oy = r * GAP;
      out.push({ x: ox, y: oy, ox, oy, vx: 0, vy: 0, col: c, row: r });
    }
  }
  return out;
}

function accentColor(): string {
  const dark = document.documentElement.classList.contains("dark");
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(dark ? "--color-accent-dark" : "--color-accent-light")
    .trim();
  return v || (dark ? "#FF8800" : "#f34213");
}

function mountCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d")!;
  let sqs: Sq[] = [];
  let mx = -9999, my = -9999, mactive = false;
  let raf = 0, alive = true;

  // ── Sizing ──────────────────────────────────────────────────
  function resize() {
    // Use physical pixels for crisp rendering on HiDPI
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale to CSS px
    sqs = buildGrid(cssW, cssH);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // ── Mouse tracking (coordinates in CSS px) ──────────────────
  function onMove(e: MouseEvent) {
    const r = canvas.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
    mactive = true;
  }
  function onLeave() {
    mactive = false;
    mx = -9999;
    my = -9999;
  }

  canvas.addEventListener("mousemove", onMove, { passive: true });
  canvas.addEventListener("mouseleave", onLeave);

  // ── Neighbour lookup (built per-frame when needed) ───────────
  // We store cols count to derive index directly
  function getColsCount(): number {
    return Math.ceil(canvas.offsetWidth / GAP) + 1;
  }

  // ── Main render loop ─────────────────────────────────────────
  function frame() {
    if (!alive) return;
    raf = requestAnimationFrame(frame);

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const cols = getColsCount();
    const accent = accentColor();
    const dark = document.documentElement.classList.contains("dark");

    ctx.clearRect(0, 0, W, H);

    // ── Physics update ─────────────────────────────────────
    for (const s of sqs) {
      if (mactive) {
        const dx = s.x - mx;
        const dy = s.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 0) {
          const d = Math.sqrt(d2);
          const t = 1 - d / R;                 // 0..1 (1 = at cursor)
          const f = t * t * FORCE;             // quadratic falloff
          s.vx += (dx / d) * f;
          s.vy += (dy / d) * f;
        }
      }
      // Spring restore
      s.vx += (s.ox - s.x) * SPRING;
      s.vy += (s.oy - s.y) * SPRING;
      // Damp
      s.vx *= DAMP;
      s.vy *= DAMP;
      // Integrate
      s.x += s.vx;
      s.y += s.vy;
    }

    // ── Build grid index (col,row → sq) ────────────────────
    // Indexed as: idx = row * cols + col
    const idx = (c: number, r: number): Sq | undefined => sqs[r * cols + c];

    // ── Draw threads ────────────────────────────────────────
    // Only draw right / down / diag-down-right / diag-down-left
    // (avoids drawing each thread twice)
    ctx.lineWidth = 0.6;

    for (const a of sqs) {
      const neighbors: [number, number][] = [
        [a.col + 1, a.row],      // right
        [a.col,     a.row + 1],  // down
        [a.col + 1, a.row + 1],  // diagonal ↘
        [a.col - 1, a.row + 1],  // diagonal ↙
      ];

      for (const [nc, nr] of neighbors) {
        const b = idx(nc, nr);
        if (!b) continue;

        // Rest length vs current length → how stretched is this thread?
        const rdx = b.ox - a.ox, rdy = b.oy - a.oy;
        const cdx = b.x  - a.x,  cdy = b.y  - a.y;
        const restLen = Math.sqrt(rdx * rdx + rdy * rdy);
        const curLen  = Math.sqrt(cdx * cdx + cdy * cdy);

        // Stretch ratio: 0 = at rest, 1 = fully over-extended
        const stretch = Math.max(0, (curLen - restLen) / Math.max(restLen, 1));

        // Thread fades out as it unravels
        const baseAlpha = dark ? 0.16 : 0.10;
        const alpha = Math.max(0, baseAlpha - stretch * 0.22);
        if (alpha <= 0.005) continue;

        // Sag: bezier control point offsets perpendicular to thread direction
        // More sag as thread stretches (loose thread hangs/droops)
        const sagAmt = Math.min(stretch * SAG_MAX * 2.5, SAG_MAX);
        // Perpendicular unit vector
        const len = Math.max(curLen, 0.001);
        const px = -(cdy / len) * sagAmt;
        const py =  (cdx / len) * sagAmt;
        const mx2 = (a.x + b.x) / 2 + px;
        const my2 = (a.y + b.y) / 2 + py;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx2, my2, b.x, b.y);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }
    }

    // ── Draw squares ────────────────────────────────────────
    const half = SQ / 2;
    for (const s of sqs) {
      const dx = s.x - s.ox;
      const dy = s.y - s.oy;
      const disp = Math.sqrt(dx * dx + dy * dy);
      const ratio = Math.min(disp / (R * 0.45), 1); // 0..1

      // Base alpha + glow boost when displaced (squares "light up" when pushed)
      const baseAlpha = dark ? 0.09 : 0.06;
      const glowAlpha = baseAlpha + ratio * 0.28;

      ctx.globalAlpha = glowAlpha;
      ctx.fillStyle = accent;
      ctx.fillRect(s.x - half, s.y - half, SQ, SQ);

      // Extra bright inner dot when heavily displaced
      if (ratio > 0.5) {
        const innerAlpha = (ratio - 0.5) * 2 * 0.5;
        ctx.globalAlpha = innerAlpha;
        ctx.fillRect(s.x - 1, s.y - 1, 2, 2);
      }
    }

    // ── Corner brackets (static, drawn in canvas) ───────────
    ctx.globalAlpha = dark ? 0.22 : 0.16;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1;
    ctx.lineCap = "square";

    const BL = 32; // bracket leg length
    const BO = 10; // bracket offset from edge

    // Top-left
    ctx.beginPath();
    ctx.moveTo(BO + BL, BO);
    ctx.lineTo(BO, BO);
    ctx.lineTo(BO, BO + BL);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(W - BO - BL, BO);
    ctx.lineTo(W - BO, BO);
    ctx.lineTo(W - BO, BO + BL);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(BO + BL, H - BO);
    ctx.lineTo(BO, H - BO);
    ctx.lineTo(BO, H - BO - BL);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(W - BO - BL, H - BO);
    ctx.lineTo(W - BO, H - BO);
    ctx.lineTo(W - BO, H - BO - BL);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.lineCap = "butt";
  }

  frame();

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    canvas.removeEventListener("mousemove", onMove);
    canvas.removeEventListener("mouseleave", onLeave);
    ro.disconnect();
  };
}

// ── MarginCanvas: mounts a canvas and wires physics ─────────────
function MarginCanvas({ style }: { style: React.CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return mountCanvas(el);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        display: "block",
        position: "absolute",
        top: 0,
        bottom: 0,
        height: "100%",
        pointerEvents: "auto",
        ...style,
      }}
    />
  );
}

// ─── Root component ─────────────────────────────────────────────
export default function GeometricLines() {
  return (
    <div
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
      className="fixed inset-0 z-0 hidden xl:block overflow-hidden"
    >
      {/* Left margin — from viewport left edge to content left edge */}
      <MarginCanvas
        style={{
          left: 0,
          // content zone: max-w-2xl (672px) centred → left edge = 50vw - 336px
          // subtract a 24px gutter so we don't clip against text
          width: "calc(50vw - 360px)",
        }}
      />

      {/* Right margin — from content right edge to viewport right edge */}
      <MarginCanvas
        style={{
          right: 0,
          width: "calc(50vw - 360px)",
        }}
      />
    </div>
  );
}
