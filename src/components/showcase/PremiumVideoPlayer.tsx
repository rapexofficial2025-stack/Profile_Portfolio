"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Repeat, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";
import { SpectrumMeter, VolumeKnob } from "@/components/home/MediaDeck";
import { asset } from "@/lib/asset";

const formatTime = (seconds: number) => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}` : "0:00";

export function PremiumVideoPlayer({ src, poster, title, caption }: { src: string; poster?: string; title: string; caption: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const graphRef = useRef<{ context: AudioContext; gain: GainNode; analyser: AnalyserNode } | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = isLooping;
    video.muted = isMuted;
    if (graphRef.current) graphRef.current.gain.gain.value = volume;
    else video.volume = volume;
  }, [volume, isLooping, isMuted]);

  const connectGraph = (video: HTMLVideoElement) => {
    if (graphRef.current) return graphRef.current;
    const context = new AudioContext();
    const gain = context.createGain();
    const meter = context.createAnalyser();
    meter.fftSize = 1024;
    meter.smoothingTimeConstant = 0.78;
    context.createMediaElementSource(video).connect(gain).connect(meter).connect(context.destination);
    video.volume = 1;
    gain.gain.value = volume;
    graphRef.current = { context, gain, analyser: meter };
    setAnalyser(meter);
    return graphRef.current;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) { video.pause(); return; }
    void connectGraph(video).context.resume();
    void video.play();
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video?.duration) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    video.currentTime = ((event.clientX - bounds.left) / bounds.width) * video.duration;
  };

  const progress = time.duration ? (time.current / time.duration) * 100 : 0;

  return <figure className="work-video-player media-deck mt-5 overflow-hidden rounded-[1.4rem]">
    <button type="button" onClick={togglePlay} className="group/video relative block aspect-video w-full overflow-hidden bg-black" aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}>
      <video ref={videoRef} src={encodeURI(asset(src))} poster={poster ? asset(poster) : undefined} playsInline preload="metadata" className="pointer-events-none h-full w-full object-contain" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} onLoadedMetadata={(event) => setTime({ current: 0, duration: event.currentTarget.duration })} onTimeUpdate={(event) => setTime({ current: event.currentTarget.currentTime, duration: event.currentTarget.duration })}>Your browser does not support this video.</video>
      <span className={`work-video-play-overlay ${isPlaying ? "is-playing" : ""}`}><span className="media-deck-btn media-deck-play">{isPlaying ? <Pause size={20} /> : <Play size={20} className="translate-x-px" />}</span></span>
    </button>

    <div className="work-video-console">
      <div className="work-video-copy"><p>{title}</p><span>{caption}</span></div>
      <div className="work-video-controls">
        <div className="media-deck-pill" role="group" aria-label="Video player controls">
          <button type="button" className="media-deck-btn" onClick={() => skip(-10)} aria-label="Back 10 seconds"><RotateCcw size={14} /></button>
          <button type="button" className={`media-deck-btn media-deck-play ${isPlaying ? "is-on" : ""}`} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause size={15} /> : <Play size={15} className="translate-x-px" />}</button>
          <button type="button" className="media-deck-btn" onClick={() => skip(10)} aria-label="Forward 10 seconds"><RotateCw size={14} /></button>
          <button type="button" className={`media-deck-btn ${isLooping ? "is-on" : ""}`} onClick={() => setIsLooping((value) => !value)} aria-label="Repeat video" aria-pressed={isLooping}><Repeat size={14} /></button>
          <button type="button" className={`media-deck-btn ${isMuted ? "is-on" : ""}`} onClick={() => setIsMuted((value) => !value)} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
        </div>
        <div className="work-video-volume"><VolumeKnob value={volume} onChange={setVolume} /><span>VOLUME</span></div>
        <SpectrumMeter analyser={analyser} isPlaying={isPlaying && !isMuted} />
      </div>
      <div className="work-video-timeline"><span>{formatTime(time.current)}</span><div className="media-deck-track" onClick={seek} role="slider" aria-label="Video progress" aria-valuemin={0} aria-valuemax={Math.round(time.duration)} aria-valuenow={Math.round(time.current)}><span style={{ width: `${progress}%` }} /></div><span>{formatTime(time.duration)}</span></div>
    </div>
  </figure>;
}
