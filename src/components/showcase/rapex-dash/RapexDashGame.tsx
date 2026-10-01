"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, RotateCcw, Zap } from "lucide-react";

type Phase = "ready" | "playing" | "paused" | "over";
type ObjectKind = "car" | "package" | "boost";
type GameObject = { kind: ObjectKind; lane: number; z: number; hue: number; hit: boolean };
type GameState = {
  lane: number;
  x: number;
  speed: number;
  boost: number;
  boosting: number;
  distance: number;
  wallet: number;
  deliveries: number;
  combo: number;
  lives: number;
  invulnerable: number;
  objects: GameObject[];
  spawnTimer: number;
  scroll: number;
  flash: { text: string; color: string; time: number } | null;
  shake: number;
};

const HIGH_SCORE_KEY = "rapex-dash-high-score";
const FAR_Z = 140;
const NEAR_Z = 3;
const PLAYER_Z = 5;
const ROAD_HALF = 1.6;
const BOOST_COST = 0.34;

const skyline = Array.from({ length: 34 }, (_, index) => ({
  x: index / 34,
  width: 0.022 + ((index * 37) % 11) / 400,
  height: 0.05 + ((index * 53) % 17) / 110,
  hue: index % 3 === 0 ? 320 : index % 3 === 1 ? 190 : 265,
}));

function createState(): GameState {
  return {
    lane: 1,
    x: 0,
    speed: 18,
    boost: 0.68,
    boosting: 0,
    distance: 0,
    wallet: 0,
    deliveries: 0,
    combo: 0,
    lives: 3,
    invulnerable: 0,
    objects: [],
    spawnTimer: 1,
    scroll: 0,
    flash: null,
    shake: 0,
  };
}

const scoreOf = (state: GameState) => Math.floor(state.distance * 2) + state.deliveries * 250;

export function RapexDashGame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createState());
  const phaseRef = useRef<Phase>("ready");
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [phase, setPhaseState] = useState<Phase>("ready");
  const [result, setResult] = useState({ score: 0, wallet: 0, deliveries: 0, highScore: 0, newRecord: false });
  const [highScore, setHighScore] = useState(0);

  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0);
      if (Number.isFinite(stored)) setHighScore(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const focusGame = () => window.requestAnimationFrame(() => rootRef.current?.focus({ preventScroll: true }));

  const start = useCallback(() => {
    stateRef.current = createState();
    setPhase("playing");
    focusGame();
  }, [setPhase]);

  const steer = useCallback((direction: -1 | 1) => {
    if (phaseRef.current !== "playing") return;
    const state = stateRef.current;
    state.lane = Math.max(0, Math.min(2, state.lane + direction));
  }, []);

  const triggerBoost = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    const state = stateRef.current;
    if (state.boosting > 0 || state.boost < BOOST_COST) return;
    state.boost -= BOOST_COST;
    state.boosting = 1.7;
    state.flash = { text: "NITRO BOOST", color: "#22d3ee", time: 0.9 };
  }, []);

  const togglePause = useCallback(() => {
    if (phaseRef.current === "playing") setPhase("paused");
    else if (phaseRef.current === "paused") {
      setPhase("playing");
      focusGame();
    }
  }, [setPhase]);

  const finish = useCallback(() => {
    const state = stateRef.current;
    const score = scoreOf(state);
    const previous = Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0) || 0;
    const best = Math.max(previous, score);
    window.localStorage.setItem(HIGH_SCORE_KEY, String(best));
    setHighScore(best);
    setResult({ score, wallet: state.wallet, deliveries: state.deliveries, highScore: best, newRecord: score > previous });
    setPhase("over");
  }, [setPhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let last = performance.now();
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);

    const update = (dt: number) => {
      const state = stateRef.current;
      const playing = phaseRef.current === "playing";
      if (!playing) {
        if (phaseRef.current === "ready") state.scroll = (state.scroll + 10 * dt) % 6;
        return;
      }

      state.boosting = Math.max(0, state.boosting - dt);
      state.invulnerable = Math.max(0, state.invulnerable - dt);
      state.shake = Math.max(0, state.shake - dt);
      state.boost = Math.min(1, state.boost + 0.035 * dt);
      if (state.flash) {
        state.flash.time -= dt;
        if (state.flash.time <= 0) state.flash = null;
      }

      const cruise = 20 + Math.min(state.distance / 110, 24);
      const target = state.boosting > 0 ? cruise * 1.7 : cruise;
      state.speed += (target - state.speed) * Math.min(1, dt * 2.4);
      state.distance += state.speed * dt;
      state.scroll = (state.scroll + state.speed * dt) % 6;
      state.x += (state.lane - 1 - state.x) * Math.min(1, dt * 13);

      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0) {
        const lanes = [0, 1, 2].sort(() => Math.random() - 0.5);
        const roll = Math.random();
        if (roll < 0.3) {
          state.objects.push({ kind: "package", lane: lanes[0], z: FAR_Z, hue: 42, hit: false });
          if (Math.random() < 0.55) state.objects.push({ kind: "car", lane: lanes[1], z: FAR_Z + 8, hue: 320, hit: false });
        } else if (roll < 0.38) {
          state.objects.push({ kind: "boost", lane: lanes[0], z: FAR_Z, hue: 190, hit: false });
        } else {
          const cars = Math.random() < Math.min(0.55, state.distance / 2600) ? 2 : 1;
          for (let index = 0; index < cars; index += 1) {
            state.objects.push({ kind: "car", lane: lanes[index], z: FAR_Z + index * 4, hue: [320, 265, 12, 200][Math.floor(Math.random() * 4)], hit: false });
          }
        }
        state.spawnTimer = Math.max(0.45, 1.15 - state.distance / 5200) * (0.8 + Math.random() * 0.45);
      }

      for (const object of state.objects) {
        object.z -= (object.kind === "car" ? state.speed - 7 : state.speed) * dt;
        if (object.hit || object.z > PLAYER_Z + 0.9 || object.z < PLAYER_Z - 0.9) continue;
        if (Math.abs(object.lane - 1 - state.x) > 0.55) continue;
        if (object.kind === "car") {
          if (state.invulnerable > 0) continue;
          object.hit = true;
          state.lives -= 1;
          state.invulnerable = 1.6;
          state.shake = 0.35;
          state.speed *= 0.45;
          state.boosting = 0;
          state.combo = 0;
          state.flash = { text: state.lives > 0 ? "CRASH!" : "SHIFT OVER", color: "#fb7185", time: 0.9 };
        } else if (object.kind === "package") {
          object.hit = true;
          const payout = 85 + state.combo * 15;
          state.combo += 1;
          state.deliveries += 1;
          state.wallet += payout;
          state.flash = { text: `+$${payout} DELIVERED${state.combo > 1 ? ` · x${state.combo}` : ""}`, color: "#fcd34d", time: 1 };
        } else {
          object.hit = true;
          state.boost = Math.min(1, state.boost + 0.5);
          state.flash = { text: "NITRO CELL +50%", color: "#67e8f9", time: 0.8 };
        }
      }
      state.objects = state.objects.filter((object) => object.z > NEAR_Z - 1 && !(object.hit && object.kind !== "car"));
      if (state.lives <= 0) finish();
    };

    const draw = (time: number) => {
      const state = stateRef.current;
      const horizon = height * 0.4;
      const cx = width / 2 + (state.shake > 0 ? (Math.random() - 0.5) * 14 : 0);
      const K = PLAYER_Z * Math.min(width * 0.25, height * 0.5);
      const camH = (height * 0.46 * PLAYER_Z) / K;
      const scale = (z: number) => K / z;
      const screenY = (z: number) => horizon + camH * scale(z);
      const screenX = (worldX: number, z: number) => cx + worldX * scale(z);

      const sky = context.createLinearGradient(0, 0, 0, horizon);
      sky.addColorStop(0, "#0b0420");
      sky.addColorStop(0.65, "#3b0d5c");
      sky.addColorStop(1, "#a21caf");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, horizon + 1);

      const sun = context.createRadialGradient(cx, horizon, 0, cx, horizon, height * 0.36);
      sun.addColorStop(0, "rgba(251,113,133,0.85)");
      sun.addColorStop(0.35, "rgba(217,70,239,0.35)");
      sun.addColorStop(1, "rgba(217,70,239,0)");
      context.fillStyle = sun;
      context.fillRect(0, 0, width, horizon);

      for (const building of skyline) {
        const bx = ((building.x - (state.distance * 0.0004) % 1 + 1) % 1) * (width + 60) - 30;
        const bw = building.width * width;
        const bh = building.height * height;
        context.fillStyle = "#07051a";
        context.fillRect(bx, horizon - bh, bw, bh);
        context.fillStyle = `hsla(${building.hue}, 90%, 65%, 0.55)`;
        for (let wy = horizon - bh + 6; wy < horizon - 4; wy += 9) {
          for (let wx = bx + 3; wx < bx + bw - 3; wx += 7) {
            if ((Math.floor(wx * 13 + wy * 7) % 5) === 0) context.fillRect(wx, wy, 2, 3);
          }
        }
      }

      const ground = context.createLinearGradient(0, horizon, 0, height);
      ground.addColorStop(0, "#12052a");
      ground.addColorStop(1, "#020617");
      context.fillStyle = ground;
      context.fillRect(0, horizon, width, height - horizon);

      const nearZ = NEAR_Z * 0.6;
      context.beginPath();
      context.moveTo(screenX(-ROAD_HALF, FAR_Z), screenY(FAR_Z));
      context.lineTo(screenX(ROAD_HALF, FAR_Z), screenY(FAR_Z));
      context.lineTo(screenX(ROAD_HALF, nearZ), screenY(nearZ));
      context.lineTo(screenX(-ROAD_HALF, nearZ), screenY(nearZ));
      context.closePath();
      context.fillStyle = "#1c1730";
      context.fill();

      context.lineWidth = 3;
      context.shadowBlur = 14;
      for (const side of [-1, 1]) {
        context.strokeStyle = side < 0 ? "#22d3ee" : "#e879f9";
        context.shadowColor = context.strokeStyle;
        context.beginPath();
        context.moveTo(screenX(side * ROAD_HALF, FAR_Z), screenY(FAR_Z));
        context.lineTo(screenX(side * ROAD_HALF, nearZ), screenY(nearZ));
        context.stroke();
      }
      context.shadowBlur = 0;

      context.fillStyle = "rgba(252,211,77,0.85)";
      for (let index = 0; index < 26; index += 1) {
        const z1 = nearZ + index * 6 - state.scroll;
        const z2 = z1 + 2.6;
        if (z1 < nearZ || z2 > FAR_Z) continue;
        for (const laneX of [-0.5, 0.5]) {
          context.beginPath();
          context.moveTo(screenX(laneX - 0.025, z1), screenY(z1));
          context.lineTo(screenX(laneX + 0.025, z1), screenY(z1));
          context.lineTo(screenX(laneX + 0.025, z2), screenY(z2));
          context.lineTo(screenX(laneX - 0.025, z2), screenY(z2));
          context.closePath();
          context.fill();
        }
        const postZ = z1;
        for (const side of [-1, 1]) {
          const s = scale(postZ);
          const px = screenX(side * (ROAD_HALF + 0.35), postZ);
          const py = screenY(postZ);
          context.fillStyle = side < 0 ? "rgba(34,211,238,0.7)" : "rgba(232,121,249,0.7)";
          context.fillRect(px - s * 0.02, py - s * 0.9, Math.max(1, s * 0.04), s * 0.9);
          context.fillStyle = "rgba(252,211,77,0.85)";
        }
      }

      const sorted = [...stateRef.current.objects].sort((a, b) => b.z - a.z);
      for (const object of sorted) {
        if (object.z < nearZ || object.z > FAR_Z) continue;
        const s = scale(object.z);
        const ox = screenX(object.lane - 1, object.z);
        const oy = screenY(object.z);
        const fade = Math.min(1, (FAR_Z - object.z) / 25);
        context.globalAlpha = fade;
        if (object.kind === "car") {
          const w = s * 0.72;
          const h = s * 0.5;
          context.fillStyle = `hsl(${object.hue}, 75%, ${object.hit ? 25 : 42}%)`;
          context.fillRect(ox - w / 2, oy - h, w, h);
          context.fillStyle = `hsl(${object.hue}, 70%, 22%)`;
          context.fillRect(ox - w * 0.36, oy - h * 1.42, w * 0.72, h * 0.46);
          context.fillStyle = "rgba(125,211,252,0.55)";
          context.fillRect(ox - w * 0.3, oy - h * 1.34, w * 0.6, h * 0.3);
          context.shadowColor = "#f43f5e";
          context.shadowBlur = 12;
          context.fillStyle = "#fb7185";
          context.fillRect(ox - w * 0.46, oy - h * 0.7, w * 0.2, h * 0.16);
          context.fillRect(ox + w * 0.26, oy - h * 0.7, w * 0.2, h * 0.16);
          context.shadowBlur = 0;
          context.fillStyle = "#020617";
          context.fillRect(ox - w * 0.45, oy - h * 0.1, w * 0.18, h * 0.16);
          context.fillRect(ox + w * 0.27, oy - h * 0.1, w * 0.18, h * 0.16);
        } else {
          const bob = Math.sin(time / 180 + object.z) * s * 0.05;
          const size = s * 0.32;
          context.shadowBlur = 18;
          if (object.kind === "package") {
            context.shadowColor = "#fbbf24";
            context.fillStyle = "#f59e0b";
            context.fillRect(ox - size / 2, oy - size * 1.6 + bob, size, size);
            context.fillStyle = "#78350f";
            context.fillRect(ox - size * 0.06, oy - size * 1.6 + bob, size * 0.12, size);
            context.fillRect(ox - size / 2, oy - size * 1.16 + bob, size, size * 0.12);
          } else {
            context.shadowColor = "#22d3ee";
            context.fillStyle = "#67e8f9";
            context.beginPath();
            context.moveTo(ox, oy - size * 2 + bob);
            context.lineTo(ox + size * 0.45, oy - size * 1.25 + bob);
            context.lineTo(ox, oy - size * 0.5 + bob);
            context.lineTo(ox - size * 0.45, oy - size * 1.25 + bob);
            context.closePath();
            context.fill();
          }
          context.shadowBlur = 0;
        }
        context.globalAlpha = 1;
      }

      const blink = state.invulnerable > 0 && Math.floor(time / 90) % 2 === 0;
      if (!blink) {
        const s = scale(PLAYER_Z);
        const px = screenX(state.x, PLAYER_Z);
        const py = screenY(PLAYER_Z);
        const lean = (state.lane - 1 - state.x) * 0.5;
        context.save();
        context.translate(px, py);
        context.rotate(lean);
        context.fillStyle = "rgba(0,0,0,0.45)";
        context.beginPath();
        context.ellipse(0, 0, s * 0.3, s * 0.06, 0, 0, Math.PI * 2);
        context.fill();
        if (state.boosting > 0) {
          const flame = context.createLinearGradient(0, 0, 0, s * 0.5);
          flame.addColorStop(0, "rgba(34,211,238,0.9)");
          flame.addColorStop(1, "rgba(34,211,238,0)");
          context.fillStyle = flame;
          context.fillRect(-s * 0.08, -s * 0.05, s * 0.16, s * (0.3 + Math.random() * 0.25));
        }
        context.fillStyle = "#0f172a";
        context.fillRect(-s * 0.07, -s * 0.24, s * 0.14, s * 0.24);
        context.shadowColor = "#34d399";
        context.shadowBlur = 16;
        context.fillStyle = "#10b981";
        context.fillRect(-s * 0.16, -s * 0.5, s * 0.32, s * 0.3);
        context.fillStyle = "#064e3b";
        context.fillRect(-s * 0.12, -s * 0.45, s * 0.24, s * 0.06);
        context.shadowColor = "#22d3ee";
        context.fillStyle = "#22d3ee";
        context.beginPath();
        context.arc(0, -s * 0.62, s * 0.12, Math.PI, 0);
        context.fillRect(-s * 0.12, -s * 0.62, s * 0.24, s * 0.08);
        context.fill();
        context.shadowBlur = 0;
        context.fillStyle = "#fb7185";
        context.fillRect(-s * 0.13, -s * 0.22, s * 0.07, s * 0.04);
        context.fillRect(s * 0.06, -s * 0.22, s * 0.07, s * 0.04);
        context.restore();
      }

      if (state.boosting > 0) {
        context.strokeStyle = "rgba(103,232,249,0.35)";
        context.lineWidth = 2;
        for (let index = 0; index < 18; index += 1) {
          const angle = (index / 18) * Math.PI * 2 + time / 400;
          const r1 = height * (0.35 + ((index * 7 + Math.floor(time / 40)) % 10) / 40);
          context.beginPath();
          context.moveTo(cx + Math.cos(angle) * r1, horizon + Math.sin(angle) * r1 * 0.7);
          context.lineTo(cx + Math.cos(angle) * (r1 + 60), horizon + Math.sin(angle) * (r1 + 60) * 0.7);
          context.stroke();
        }
      }

      if (phaseRef.current !== "ready") drawHud(context, state, width, height, time);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      draw(now);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden && phaseRef.current === "playing") setPhase("paused");
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [finish, setPhase]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toLowerCase();
    if (["arrowleft", "arrowright", "arrowup", "arrowdown", " ", "a", "d", "p", "escape", "enter"].includes(key)) event.preventDefault();
    if (phaseRef.current === "ready" || phaseRef.current === "over") {
      if (key === "enter" || key === " ") start();
      return;
    }
    if (key === "arrowleft" || key === "a") steer(-1);
    else if (key === "arrowright" || key === "d") steer(1);
    else if (key === " " || key === "arrowup" || key === "w") triggerBoost();
    else if (key === "p" || key === "escape") togglePause();
  };

  const enterFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch {
      /* Fullscreen may be unavailable in embedded browsers. */
    }
    focusGame();
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (phaseRef.current === "playing" && !event.currentTarget.contains(event.relatedTarget as Node | null)) setPhase("paused");
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const begin = touchStartRef.current;
        const touch = event.changedTouches[0];
        touchStartRef.current = null;
        if (!begin || phaseRef.current !== "playing") return;
        const dx = touch.clientX - begin.x;
        const dy = touch.clientY - begin.y;
        if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) steer(dx < 0 ? -1 : 1);
        else if (dy < -40) triggerBoost();
      }}
      className="relative h-full min-h-104 w-full touch-none select-none overflow-hidden bg-[#020617] text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      aria-label="RAPEX DASH playable game. Use arrow keys or A and D to steer, Space to boost, P to pause."
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {phase === "playing" && (
        <>
          <div className="absolute right-3 top-[7.5rem] z-10 flex flex-col gap-2 sm:top-3 sm:flex-row">
            <button type="button" onClick={togglePause} aria-label="Pause game" className="inline-flex size-9 items-center justify-center rounded-xl border border-white/15 bg-slate-950/70 text-white/80 backdrop-blur-md transition hover:text-white"><Pause size={15} /></button>
            <button type="button" onClick={enterFullscreen} aria-label="Toggle fullscreen" className="inline-flex size-9 items-center justify-center rounded-xl border border-white/15 bg-slate-950/70 text-white/80 backdrop-blur-md transition hover:text-white"><Maximize2 size={15} /></button>
          </div>
          <div className="absolute inset-x-3 bottom-16 z-10 flex items-end justify-between md:hidden">
            <div className="flex gap-2">
              <button type="button" onPointerDown={() => steer(-1)} aria-label="Steer left" className="inline-flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/65 backdrop-blur-md active:bg-cyan-500/40"><ChevronLeft size={26} /></button>
              <button type="button" onPointerDown={() => steer(1)} aria-label="Steer right" className="inline-flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/65 backdrop-blur-md active:bg-cyan-500/40"><ChevronRight size={26} /></button>
            </div>
            <button type="button" onPointerDown={triggerBoost} aria-label="Boost" className="inline-flex size-14 items-center justify-center rounded-2xl border border-cyan-200/40 bg-cyan-500/70 shadow-[0_0_24px_rgba(6,182,212,0.45)] active:bg-cyan-400"><Zap size={24} /></button>
          </div>
        </>
      )}

      {phase !== "playing" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14),rgba(2,6,23,0.82)_70%)] p-4">
          <section className="w-full max-w-md rounded-2xl border border-cyan-300/25 bg-[#0b1429]/92 p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <p className="text-[9px] font-black tracking-[0.24em] text-cyan-300">{phase === "over" ? "DELIVERY SHIFT COMPLETE" : phase === "paused" ? "GAME PAUSED" : "3D ARCADE COURIER RUNNER"}</p>
            <h2 className="mt-2 text-4xl font-black tracking-tighter text-cyan-300">RAPEX <span className="text-white">DASH</span></h2>
            {phase === "over" ? (
              <div className="mt-5 grid grid-cols-3 gap-2 text-left">
                {[["SCORE", result.score.toLocaleString()], ["EARNED", `$${result.wallet.toLocaleString()}`], ["DELIVERED", String(result.deliveries)]].map(([label, value]) => <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-3"><p className="text-[7px] tracking-[0.16em] text-slate-400">{label}</p><p className="mt-1 text-sm font-black text-white">{value}</p></div>)}
              </div>
            ) : (
              <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-slate-300">Grab glowing delivery packages, collect nitro cells and weave through neon traffic. Three crashes end your shift.</p>
            )}
            <p className="mt-4 text-[10px] font-semibold tracking-[0.14em] text-amber-300">{phase === "over" && result.newRecord ? "NEW HIGH SCORE! " : "HIGH SCORE "}{(phase === "over" ? result.highScore : highScore).toLocaleString()}</p>
            <button type="button" onClick={phase === "paused" ? togglePause : start} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-500 px-5 py-3 text-xs font-black tracking-[0.1em] text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] transition hover:brightness-110 active:shadow-inner">
              {phase === "over" ? <RotateCcw size={15} /> : <Play size={15} fill="currentColor" />}
              {phase === "over" ? "PLAY AGAIN" : phase === "paused" ? "RESUME SHIFT" : "START DELIVERY SHIFT"}
            </button>
            <p className="mt-4 text-[9px] leading-4 tracking-[0.08em] text-slate-400">← → / A D steer · SPACE boost · P pause · swipe on mobile</p>
          </section>
        </div>
      )}
    </div>
  );
}

function drawHud(context: CanvasRenderingContext2D, state: GameState, width: number, height: number, time: number) {
  const panel = (x: number, y: number, w: number, h: number) => {
    context.fillStyle = "rgba(2,6,23,0.72)";
    context.strokeStyle = "rgba(103,232,249,0.25)";
    context.lineWidth = 1;
    context.beginPath();
    context.roundRect(x, y, w, h, 10);
    context.fill();
    context.stroke();
  };

  panel(12, 12, 172, 64);
  context.textAlign = "left";
  context.font = "900 15px system-ui, sans-serif";
  context.fillStyle = "#22d3ee";
  context.fillText("RAPEX", 24, 34);
  context.fillStyle = "#ffffff";
  context.fillText("DASH", 80, 34);
  context.font = "700 11px system-ui, sans-serif";
  context.fillStyle = "#6ee7b7";
  context.fillText(`$${state.wallet.toLocaleString()}`, 24, 54);
  context.fillStyle = "#cbd5e1";
  context.fillText(`${state.deliveries} delivered`, 86, 54);
  context.fillStyle = "#fcd34d";
  context.fillText(`SCORE ${scoreOf(state).toLocaleString()}`, 24, 68);

  const mapW = 74;
  const mapH = 96;
  const mapX = width - mapW - 12;
  const mapY = width < 640 ? 12 : 56;
  panel(mapX, mapY, mapW, mapH);
  context.font = "800 7px system-ui, sans-serif";
  context.fillStyle = "#a5f3fc";
  context.textAlign = "center";
  context.fillText("TACTICAL GPS", mapX + mapW / 2, mapY + 12);
  for (let lane = 0; lane < 3; lane += 1) {
    context.fillStyle = "rgba(103,232,249,0.12)";
    context.fillRect(mapX + 12 + lane * 18, mapY + 18, 14, mapH - 26);
  }
  for (const object of state.objects) {
    if (object.hit || object.z > 70) continue;
    context.fillStyle = object.kind === "car" ? "#f472b6" : object.kind === "package" ? "#fbbf24" : "#67e8f9";
    context.fillRect(mapX + 15 + object.lane * 18, mapY + 18 + (1 - object.z / 70) * (mapH - 32), 8, 5);
  }
  context.fillStyle = "#34d399";
  context.fillRect(mapX + 15 + (state.x + 1) * 18, mapY + mapH - 13, 8, 6);

  const bottom = height - 14;
  panel(width / 2 - 86, bottom - 52, 172, 52);
  context.font = "900 24px system-ui, sans-serif";
  context.fillStyle = "#ffffff";
  context.textAlign = "left";
  context.fillText(String(Math.round(state.speed * 3.2)), width / 2 - 74, bottom - 18);
  context.font = "700 7px system-ui, sans-serif";
  context.fillStyle = "#94a3b8";
  context.fillText("MPH", width / 2 - 74, bottom - 7);
  context.fillText(state.boosting > 0 ? "BOOSTING" : "NITRO", width / 2 - 20, bottom - 34);
  context.fillStyle = "rgba(148,163,184,0.25)";
  context.fillRect(width / 2 - 20, bottom - 28, 94, 7);
  context.fillStyle = state.boost >= BOOST_COST ? "#22d3ee" : "#64748b";
  context.fillRect(width / 2 - 20, bottom - 28, 94 * state.boost, 7);
  context.fillStyle = "#fb7185";
  context.font = "900 12px system-ui, sans-serif";
  context.fillText("♥".repeat(Math.max(0, state.lives)), width / 2 - 20, bottom - 8);

  if (state.flash) {
    context.globalAlpha = Math.min(1, state.flash.time * 2.5);
    context.textAlign = "center";
    context.font = `900 ${Math.min(30, width / 18)}px system-ui, sans-serif`;
    context.shadowColor = state.flash.color;
    context.shadowBlur = 18;
    context.fillStyle = state.flash.color;
    context.fillText(state.flash.text, width / 2, height * 0.3 - (1 - state.flash.time) * 18 + Math.sin(time / 90) * 1.5);
    context.shadowBlur = 0;
    context.globalAlpha = 1;
  }
}
