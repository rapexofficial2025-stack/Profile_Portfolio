"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AttachTracker, detectExtendedFingertips, thumbIndexDistance, LM, type Landmark } from "./airholoGestures";

const FULL_EXPERIENCE_URL = "/work/category/interactive-ui-design/airholo-gesture-lab";
const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type LoadState = "idle" | "loading" | "ready" | "error";
type MapState = "missing-key" | "loading" | "ready" | "error";
type CameraErrorKind = "PERMISSION_DENIED" | "NO_CAMERA" | "MODEL_FAILED" | "UNSUPPORTED" | null;
type GestureMode = "STANDBY" | "POINT TO PAN" | "PINCH TO ZOOM";

type AirHoloMap = {
  getZoom: () => number | undefined;
  panBy: (x: number, y: number) => void;
  setZoom: (zoom: number) => void;
};

type GoogleMapsWindow = Window & {
  google?: {
    maps?: {
      Map: new (
        element: HTMLElement,
        options: {
          center: { lat: number; lng: number };
          zoom: number;
          gestureHandling: string;
          mapTypeControl: boolean;
          streetViewControl: boolean;
          fullscreenControl: boolean;
          zoomControl: boolean;
          styles: Array<Record<string, unknown>>;
        },
      ) => AirHoloMap;
    };
  };
};

interface PointerSample {
  x: number;
  y: number;
  at: number;
}

const MAP_STYLE: Array<Record<string, unknown>> = [
  { elementType: "geometry", stylers: [{ color: "#08111f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#08111f" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7f9bb3" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1d4962" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6b8da3" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#132a3c" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1d3e54" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#13506a" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#102c40" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#020817" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#38bdf8" }] },
];

export function AirHoloGesturePreview() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapPointerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<AirHoloMap | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  // MediaPipe's runtime type is loaded dynamically and is not exported to this bundle.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const landmarkerRef = useRef<any>(null);
  const pinchTrackerRef = useRef(new AttachTracker(0.075, 0.11));
  const pointerSampleRef = useRef<PointerSample | null>(null);
  const pinchAnchorRef = useRef<number | null>(null);
  const drawPointRef = useRef<{ x: number; y: number } | null>(null);
  const penActiveRef = useRef(false);

  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [mapState, setMapState] = useState<MapState>(MAPS_API_KEY ? "loading" : "missing-key");
  const [error, setError] = useState<CameraErrorKind>(null);
  const [handDetected, setHandDetected] = useState(false);
  const [pinching, setPinching] = useState(false);
  const [penActive, setPenActive] = useState(false);
  const [gestureMode, setGestureMode] = useState<GestureMode>("STANDBY");
  const [online, setOnline] = useState(() => (typeof navigator === "undefined" ? true : navigator.onLine));
  const [fps, setFps] = useState(0);

  const initializeMap = useCallback(() => {
    if (!mapElementRef.current || mapRef.current) return;
    const maps = (window as GoogleMapsWindow).google?.maps;
    if (!maps?.Map) {
      setMapState("error");
      return;
    }

    mapRef.current = new maps.Map(mapElementRef.current, {
      center: { lat: 14.5995, lng: 120.9842 },
      zoom: 12,
      gestureHandling: "greedy",
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: MAP_STYLE,
    });
    setMapState("ready");
  }, []);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      landmarkerRef.current?.close?.();
    };
  }, []);

  function controlMapWithHand(hand: Landmark[], now: number, isPinching: boolean) {
    const map = mapRef.current;
    const tip = hand[LM.INDEX_TIP];
    const x = 1 - tip.x;
    const y = tip.y;

    if (mapPointerRef.current) {
      mapPointerRef.current.style.left = `${x * 100}%`;
      mapPointerRef.current.style.top = `${y * 100}%`;
      mapPointerRef.current.dataset.active = "true";
      mapPointerRef.current.dataset.pinch = String(isPinching);
    }

    if (!map) return;
    const previous = pointerSampleRef.current;
    if (!previous) {
      pointerSampleRef.current = { x, y, at: now };
      pinchAnchorRef.current = isPinching ? y : null;
      return;
    }

    if (isPinching) {
      setGestureMode("PINCH TO ZOOM");
      if (pinchAnchorRef.current === null) pinchAnchorRef.current = y;
      const zoomDelta = pinchAnchorRef.current - y;
      if (Math.abs(zoomDelta) > 0.055 && now - previous.at > 90) {
        const currentZoom = map.getZoom() ?? 12;
        map.setZoom(Math.max(3, Math.min(20, currentZoom + (zoomDelta > 0 ? 1 : -1))));
        pinchAnchorRef.current = y;
        pointerSampleRef.current = { x, y, at: now };
      }
      return;
    }

    pinchAnchorRef.current = null;
    setGestureMode("POINT TO PAN");
    if (now - previous.at < 32) return;

    const dx = x - previous.x;
    const dy = y - previous.y;
    if (Math.abs(dx) > 0.004 || Math.abs(dy) > 0.004) {
      map.panBy(-dx * 760, -dy * 620);
    }
    pointerSampleRef.current = { x, y, at: now };
  }

  function setPen(isActive: boolean) {
    if (penActiveRef.current === isActive) return;
    penActiveRef.current = isActive;
    setPenActive(isActive);
    if (!isActive) drawPointRef.current = null;
  }

  function drawAt(x: number, y: number) {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawPointRef.current = null;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const previous = drawPointRef.current;
    ctx.strokeStyle = "rgba(192, 132, 252, 0.92)";
    ctx.fillStyle = "rgba(103, 232, 249, 0.94)";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "#a78bfa";
    ctx.shadowBlur = 12;
    if (previous) {
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.strokeRect(x - 3.5, y - 3.5, 7, 7);
    ctx.beginPath();
    ctx.arc(x, y, 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    drawPointRef.current = { x, y };
  }

  function drawFromPointer(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    drawAt(event.clientX - bounds.left, event.clientY - bounds.top);
  }

  function clearDrawing() {
    const canvas = drawCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPointRef.current = null;
  }

  async function start() {
    setError(null);
    setLoadState("loading");
    setGestureMode("STANDBY");

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("UNSUPPORTED");
      setLoadState("error");
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
    } catch (cameraError) {
      setError((cameraError as DOMException).name === "NotFoundError" ? "NO_CAMERA" : "PERMISSION_DENIED");
      setLoadState("error");
      return;
    }

    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    try {
      const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });
    } catch {
      setError("MODEL_FAILED");
      setLoadState("error");
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    setLoadState("ready");
    let frames = 0;
    let lastSample = performance.now();

    const loop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const landmarker = landmarkerRef.current;
      if (video && canvas && landmarker && video.readyState >= 2) {
        const now = performance.now();
        const result = landmarker.detectForVideo(video, now);
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        const ctx = canvas.getContext("2d");
        const hand: Landmark[] | undefined = result.landmarks?.[0];

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (hand) {
            const isPinching = drawFrame(ctx, canvas.width, canvas.height, hand, pinchTrackerRef.current, now);
            const extended = detectExtendedFingertips(hand);
            const isDrawing = !isPinching && extended.length === 1 && extended[0].landmark === LM.INDEX_TIP;
            setPinching(isPinching);
            setPen(isDrawing);
            if (isDrawing) {
              const tip = hand[LM.INDEX_TIP];
              const drawCanvas = drawCanvasRef.current;
              if (drawCanvas) drawAt((1 - tip.x) * drawCanvas.clientWidth, tip.y * drawCanvas.clientHeight);
            } else {
              controlMapWithHand(hand, now, isPinching);
            }
          }
        }

        setHandDetected(Boolean(hand));
        if (!hand) {
          pointerSampleRef.current = null;
          pinchAnchorRef.current = null;
          setPinching(false);
          setPen(false);
          setGestureMode("STANDBY");
          if (mapPointerRef.current) mapPointerRef.current.dataset.active = "false";
        }

        frames += 1;
        if (now - lastSample >= 500) {
          setFps(Math.round((frames * 1000) / (now - lastSample)));
          frames = 0;
          lastSample = now;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }

  function stop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    landmarkerRef.current?.close?.();
    landmarkerRef.current = null;
    pinchTrackerRef.current.reset();
    pointerSampleRef.current = null;
    pinchAnchorRef.current = null;
    setLoadState("idle");
    setHandDetected(false);
    setPinching(false);
    setPen(false);
    setGestureMode("STANDBY");
    setFps(0);
    if (mapPointerRef.current) mapPointerRef.current.dataset.active = "false";
  }

  const cameraLabel =
    loadState === "ready" ? "ONLINE" : loadState === "loading" ? "INITIATING" : loadState === "error" ? "ERROR" : "OFF";

  return (
    <div className="airholo-preview">
      {MAPS_API_KEY && (
        <Script
          id="airholo-google-maps"
          src={`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(MAPS_API_KEY)}&v=weekly`}
          strategy="afterInteractive"
          onReady={initializeMap}
          onError={() => setMapState("error")}
        />
      )}

      <header className="airholo-preview__header">
        <div>
          <strong>AIRHOLO Prototype v 1.0</strong>
          <span className="airholo-preview__eyebrow">Experimental Interface Design</span>
        </div>
        <span className={`airholo-preview__live ${handDetected ? "is-active" : ""}`}>
          <i /> {handDetected ? "HAND DETECTED" : "AWAITING HAND"}
        </span>
      </header>

      <div className="airholo-preview__workspace">
        <section className="airholo-preview__map-shell" aria-label="AirHolo gesture-controlled Google Map">
          <div ref={mapElementRef} className="airholo-preview__map" />
          <div className="airholo-preview__map-grid" aria-hidden="true" />
          <div ref={mapPointerRef} className="airholo-preview__map-pointer" data-active="false" data-pinch="false">
            <span />
          </div>
          <canvas
            ref={drawCanvasRef}
            className="airholo-preview__draw-canvas"
            aria-label="Gesture drawing surface"
            onPointerDown={(event) => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); setPen(true); drawFromPointer(event); }}
            onPointerMove={(event) => { if (event.buttons & 1) drawFromPointer(event); }}
            onPointerUp={() => setPen(false)}
            onPointerCancel={() => setPen(false)}
          />

          {mapState !== "ready" && (
            <div className="airholo-preview__map-gate">
              <span>GOOGLE MAPS SURFACE</span>
              <strong>
                {mapState === "missing-key"
                  ? "MAP KEY REQUIRED"
                  : mapState === "error"
                    ? "MAP UNAVAILABLE"
                    : "INITIALIZING MAP"}
              </strong>
              <p>
                {mapState === "missing-key"
                  ? "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local, then restart the portfolio server."
                  : mapState === "error"
                    ? "Check the browser-key restrictions and network connection, then reload."
                    : "Connecting to the live map canvas…"}
              </p>
            </div>
          )}

          <div className="airholo-preview__instructions">
            <span>01</span> One index finger: draw
            <b />
            <span>02</span> Two fingers: pen off · pinch: zoom
          </div>
        </section>

        <aside className="airholo-preview__rail">
          <div className="airholo-preview__frame">
            <video ref={videoRef} className="airholo-preview__video" playsInline muted />
            <canvas ref={canvasRef} className="airholo-preview__canvas" />
            <div className="airholo-preview__camera-label">LIVE VISION / {fps} FPS</div>

            {loadState !== "ready" && (
              <div className="airholo-preview__gate">
                <span className="airholo-preview__title">CAMERA DETECTION</span>
                {loadState === "error" ? (
                  <>
                    <p className="airholo-preview__error">{errorMessage(error)}</p>
                    <button type="button" className="airholo-preview__btn" onClick={start}>
                      TRY AGAIN
                    </button>
                  </>
                ) : (
                  <>
                    <p className="airholo-preview__body">Camera frames stay in this browser and are not recorded or uploaded.</p>
                    <button
                      type="button"
                      className="airholo-preview__btn is-primary"
                      onClick={start}
                      disabled={loadState === "loading"}
                    >
                      {loadState === "loading" ? "INITIATING PROTOTYPE…" : "ENABLE CAMERA"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="airholo-preview__telemetry">
            <div className="airholo-preview__telemetry-title">
              <span>DETECTION STATUS</span>
              {loadState === "ready" && (
                <button type="button" onClick={stop}>CAMERA OFF</button>
              )}
            </div>
            <StatusLine label="Camera" value={cameraLabel} active={loadState === "ready"} warning={loadState === "loading"} />
            <StatusLine label="Hand detection" value={handDetected ? "HAND DETECTED" : "SEARCHING"} active={handDetected} />
            <StatusLine label="Gesture" value={penActive ? "PEN / DRAW" : pinching ? "PINCH / ZOOM" : handDetected ? "POINTER / PAN" : "STANDBY"} active={handDetected} />
            <StatusLine label="Map" value={mapState === "ready" ? "ONLINE" : mapState.replace("-", " ").toUpperCase()} active={mapState === "ready"} />
            <StatusLine label="Network" value={online ? "ONLINE" : "OFFLINE"} active={online} />
            <StatusLine
              label="Prototype"
              value={handDetected ? gestureMode : loadState === "loading" ? "INITIATING" : "STANDBY"}
              active={handDetected}
              warning={loadState === "loading"}
            />
            <button type="button" className="airholo-preview__clear" onClick={clearDrawing}>CLEAR DRAWING</button>
          </div>
        </aside>
      </div>

      <div className="airholo-preview__cta">
        <span>Live browser prototype · camera permission required</span>
        <a href={FULL_EXPERIENCE_URL}>Open full case study →</a>
      </div>
    </div>
  );
}

function StatusLine({ label, value, active = false, warning = false }: { label: string; value: string; active?: boolean; warning?: boolean }) {
  return (
    <div className={`airholo-preview__status-line ${active ? "is-active" : ""} ${warning ? "is-warning" : ""}`}>
      <span><i /> {label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function errorMessage(kind: CameraErrorKind): string {
  switch (kind) {
    case "PERMISSION_DENIED":
      return "Camera access was denied. Check this site's camera permission and try again.";
    case "NO_CAMERA":
      return "No camera was found on this device.";
    case "MODEL_FAILED":
      return "The hand-tracking model failed to load. Check your connection and try again.";
    case "UNSUPPORTED":
      return "This browser does not support the camera APIs required by the prototype.";
    default:
      return "Something went wrong.";
  }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  hand: Landmark[],
  pinchTracker: AttachTracker,
  now: number,
): boolean {
  const toXY = (index: number) => {
    const landmark = hand[index];
    return { x: (1 - landmark.x) * width, y: landmark.y * height };
  };

  const pinching = pinchTracker.update(thumbIndexDistance(hand), now);
  if (pinching) {
    const thumb = toXY(LM.THUMB_TIP);
    const index = toXY(LM.INDEX_TIP);
    ctx.strokeStyle = "rgba(52,211,153,0.9)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#34d399";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(thumb.x, thumb.y);
    ctx.lineTo(index.x, index.y);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  const pulse = 1 + Math.sin(now / 220) * 0.08;
  detectExtendedFingertips(hand).forEach(({ landmark }) => {
    const point = toXY(landmark);
    const attached = pinching && (landmark === LM.THUMB_TIP || landmark === LM.INDEX_TIP);
    const primary = landmark === LM.INDEX_TIP;
    const radius = (primary ? 9 : 6) * pulse;
    ctx.strokeStyle = attached ? "rgba(52,211,153,0.9)" : "rgba(56,189,248,0.75)";
    ctx.lineWidth = primary || attached ? 1.4 : 1;
    ctx.strokeRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
    ctx.beginPath();
    ctx.arc(point.x, point.y, primary ? 1.6 : 1.2, 0, Math.PI * 2);
    ctx.fillStyle = attached ? "#34d399" : "#38bdf8";
    ctx.fill();
  });

  return pinching;
}
