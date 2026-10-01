"use client";

import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { featureMetadata } from "./data";
import "./styles.css";

export function InvitationFeature() {
  const [open, setOpen] = useState(false);
  const [peeled, setPeeled] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) void videoRef.current.play();
    else videoRef.current.pause();
  };

  return (
    <section className="invitation-interactive" aria-label="Interactive Ravian invitation">
      <div
        className="invitation-interactive__stage"
        style={{ backgroundImage: `url("${asset("/images/projects/interactive-ui-design/invitation-paper-engine/table.webp")}")` }}
      >
        <div className={`invitation-interactive__book ${open ? "is-open" : ""}`}>
          <div className="invitation-interactive__inside">
            <img src={asset("/images/projects/interactive-ui-design/invitation-paper-engine/inside-background.webp")} alt="Invitation inside paper" />
            <img src={asset("/images/projects/interactive-ui-design/invitation-paper-engine/right-page.webp")} alt="Invitation right page" />
            <p className="invitation-interactive__message">Greetings<br />Buenas Dias! Mi Querido Tito y Tita.<br /><br />A little message made with love.</p>
          </div>
          <button className="invitation-interactive__cover" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close invitation" : "Open invitation"}>
            <img src={asset("/images/projects/interactive-ui-design/invitation-paper-engine/cover.webp")} alt="Invitation cover" />
          </button>
          {open && (
            <div className="invitation-interactive__left-page">
              <img src={asset("/images/projects/interactive-ui-design/invitation-paper-engine/left-page.webp")} alt="Invitation left page" />
              <div className="invitation-interactive__video-wrap">
                <video ref={videoRef} src={asset("/images/projects/interactive-ui-design/invitation-paper-engine/ravian.mp4")} muted={muted} playsInline preload="metadata" />
                <button type="button" onClick={toggleVideo}>Press Me</button>
              </div>
              <button className={`invitation-interactive__note ${peeled ? "is-peeled" : ""}`} type="button" onClick={() => setPeeled(true)} aria-label="Peel invitation note">
                <span>Hello Po! ❤️</span>
                <span>Please come to my<br />Christening Day! 👶</span>
                <small>{peeled ? "DRAG TO MOVE" : "PUSH TO PEEL ↗"}</small>
              </button>
              <button className="invitation-interactive__mute" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Unmute video" : "Mute video"}>{muted ? "🔇" : "🔊"}</button>
            </div>
          )}
        </div>
      </div>
      <p className="invitation-interactive__hint">{featureMetadata.type} · Drag or tap the cover to open</p>
    </section>
  );
}
