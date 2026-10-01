/**
 * Minimal, dependency-free gesture helpers for the portfolio teaser widget.
 * Deliberately not shared with the full Air Holo app — this file is meant
 * to be copy-pasted standalone into another project.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface Landmark extends Point2D {
  z: number;
}

// MediaPipe Hand Landmarker's 21-point indices (the ones we actually use).
export const LM = {
  WRIST: 0,
  THUMB_MCP: 2,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_TIP: 20,
} as const;

function dist(a: Point2D, b: Point2D): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Wrist-to-middle-knuckle distance — used to normalize everything else so it works at any distance from the camera. */
function handScale(lm: Landmark[]): number {
  return Math.max(dist(lm[LM.WRIST], lm[LM.MIDDLE_MCP]), 0.001);
}

export interface ExtendedFingertip {
  landmark: number;
  point: Point2D;
}

const TIPS = [LM.THUMB_TIP, LM.INDEX_TIP, LM.MIDDLE_TIP, LM.RING_TIP, LM.PINKY_TIP];
const MCPS = [LM.THUMB_MCP, LM.INDEX_MCP, LM.MIDDLE_MCP, LM.RING_MCP, LM.PINKY_MCP];

/** Which fingertips are currently extended (tip farther from the wrist than its own knuckle). */
export function detectExtendedFingertips(lm: Landmark[]): ExtendedFingertip[] {
  const wrist = lm[LM.WRIST];
  const out: ExtendedFingertip[] = [];
  for (let i = 0; i < TIPS.length; i++) {
    const tip = lm[TIPS[i]];
    const mcp = lm[MCPS[i]];
    if (dist(tip, wrist) > dist(mcp, wrist)) out.push({ landmark: TIPS[i], point: tip });
  }
  return out;
}

/** Normalized thumb-to-index distance — the classic "pinch" measurement. */
export function thumbIndexDistance(lm: Landmark[]): number {
  return dist(lm[LM.THUMB_TIP], lm[LM.INDEX_TIP]) / handScale(lm);
}

/**
 * Smooths a noisy 0..1-ish distance signal (EMA) and applies hysteresis +
 * a minimum hold time before reporting "attached" — this is what stops a
 * pinch from flickering on/off from ordinary webcam jitter. Same idea as
 * the full app's PairTracker, condensed for a single-file teaser.
 */
export class AttachTracker {
  private smoothed: number | null = null;
  private active = false;
  private pendingSince: number | null = null;

  constructor(
    private closeAt: number,
    private openAt: number,
    private minHoldMs = 80,
    private smoothing = 0.35,
  ) {}

  reset() {
    this.smoothed = null;
    this.active = false;
    this.pendingSince = null;
  }

  update(raw: number, now: number): boolean {
    this.smoothed = this.smoothed === null ? raw : this.smoothed + (raw - this.smoothed) * this.smoothing;

    if (!this.active) {
      if (this.smoothed < this.closeAt) {
        if (this.pendingSince === null) this.pendingSince = now;
        if (now - this.pendingSince >= this.minHoldMs) this.active = true;
      } else {
        this.pendingSince = null;
      }
    } else if (this.smoothed > this.openAt) {
      this.active = false;
      this.pendingSince = null;
    }

    return this.active;
  }
}
