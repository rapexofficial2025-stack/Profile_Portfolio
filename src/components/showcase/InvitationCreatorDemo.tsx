"use client";

import Image from "next/image";
import { Music2, Pause, Play, Sparkles, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { asset } from "@/lib/asset";

const invitationBase = "/images/projects/interactive-ui-design/invitation-paper-engine";

export const invitationPaperStyles = {
  ivory: { label: "Ivory Classic", surface: "#fffdf6", paper: "linear-gradient(145deg, #fbf7ef, #efe6d4)", ink: "#4a3b28", accent: "#b78838" },
  blush: { label: "Blush Floral", surface: "#fff2f5", paper: "linear-gradient(145deg, #fdf1f1, #f3dcdc)", ink: "#6b3a45", accent: "#c97aa0" },
  sky: { label: "Sky Blue", surface: "#eff7ff", paper: "linear-gradient(145deg, #eff7ff, #dfeeff)", ink: "#2e4969", accent: "#6b8fc7" },
  midnight: { label: "Midnight Gold", surface: "#151c32", paper: "linear-gradient(145deg, #1d2238, #121526)", ink: "#f1e6c8", accent: "#d7af53" },
} as const;

export type InvitationPaperStyle = keyof typeof invitationPaperStyles;
export type InvitationEditorValues = { eventTitle: string; names: string; date: string; venue: string; paper: InvitationPaperStyle };
export const defaultInvitationEditorValues: InvitationEditorValues = { eventTitle: "Christening Invitation", names: "John & Miya", date: "2026-08-07", venue: "St. Gregory Church", paper: "ivory" };
type EditorSetter = (next: InvitationEditorValues) => void;

export function InvitationCreatorHeader() {
  const [activeTool, setActiveTool] = useState("Design");
  return <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1e7ff] bg-white/80 px-4 py-3 backdrop-blur sm:px-5">
    <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#ffb7d2] to-[#a58cff] text-white shadow-sm"><Sparkles size={17} /></span><div><p className="text-sm font-bold tracking-tight">Blessed Moments</p><p className="text-[10px] font-medium text-[#7480ac]">Invitation Card Creator · demo output</p></div></div>
    <div className="flex items-center gap-1 rounded-full border border-[#dfe5ff] bg-[#f6f7ff] p-1 text-[10px] font-semibold">{["Design", "Templates", "Music"].map((tool) => <button key={tool} type="button" onClick={() => setActiveTool(tool)} className={`rounded-full px-3 py-1.5 transition ${activeTool === tool ? "bg-[#7757e8] text-white shadow-sm" : "text-[#606d9c] hover:bg-white"}`}>{tool}</button>)}</div>
    <span className="rounded-full bg-[#1732bb] px-3 py-2 text-[10px] font-bold text-white shadow-[0_6px_15px_rgba(23,50,187,0.22)]">DEMO OUTPUT</span>
  </header>;
}

export function InvitationCreatorSidebar({ values, setValues, onToggleCard, cardOpen }: { values: InvitationEditorValues; setValues: EditorSetter; onToggleCard?: () => void; cardOpen?: boolean }) {
  const update = <K extends keyof InvitationEditorValues>(key: K, value: InvitationEditorValues[K]) => setValues({ ...values, [key]: value });
  return <aside className="border-b border-[#e1e7ff] bg-white/70 p-4 lg:border-r lg:border-b-0">
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7180b2]">Card design</p>
    <label className="mt-5 block text-xs font-bold">Event title<input value={values.eventTitle} onChange={(event) => update("eventTitle", event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce3fb] bg-white px-3 py-2 text-xs outline-none ring-[#8168eb] transition focus:ring-2" /></label>
    <label className="mt-4 block text-xs font-bold">Celebrants<input value={values.names} onChange={(event) => update("names", event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce3fb] bg-white px-3 py-2 text-xs outline-none ring-[#8168eb] transition focus:ring-2" /></label>
    <div className="mt-5"><p className="text-xs font-bold">Paper style</p><div className="mt-2 grid grid-cols-2 gap-2">{(Object.keys(invitationPaperStyles) as InvitationPaperStyle[]).map((style) => <button key={style} type="button" onClick={() => update("paper", style)} className={`rounded-xl border p-2 text-left transition ${values.paper === style ? "border-[#7653ea] bg-[#f3efff] shadow-sm" : "border-[#e1e6f8] bg-white hover:border-[#b9adf5]"}`}><span className="block h-7 rounded-lg border border-black/5" style={{ background: invitationPaperStyles[style].surface }} /><span className="mt-1 block text-[8px] font-semibold leading-tight">{invitationPaperStyles[style].label}</span></button>)}</div></div>
    <label className="mt-4 block text-xs font-bold">Event date<input type="date" value={values.date} onChange={(event) => update("date", event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce3fb] bg-white px-3 py-2 text-xs outline-none ring-[#8168eb] transition focus:ring-2" /></label>
    <label className="mt-4 block text-xs font-bold">Venue<input value={values.venue} onChange={(event) => update("venue", event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce3fb] bg-white px-3 py-2 text-xs outline-none ring-[#8168eb] transition focus:ring-2" /></label>
    <div className="mt-5 rounded-xl border border-[#dfe4fb] bg-[#f8f9ff] p-3"><p className="text-[10px] font-bold">Event details</p><p className="mt-2 text-[10px] leading-4 text-[#68749d]">{values.date || "Date to follow"} · 3:00 PM<br />{values.venue || "Venue to follow"}</p></div>
    {onToggleCard && <button type="button" onClick={onToggleCard} className="mt-4 w-full rounded-xl bg-[#1732bb] px-3 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#112896]">{cardOpen ? "Close paper card" : "Open paper card"}</button>}
  </aside>;
}

export function InvitationCreatorOutput({ names }: { names: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleAudio = async () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) { await audio.play(); setIsPlaying(true); } else { audio.pause(); setIsPlaying(false); } };
  return <aside className="border-t border-[#e1e7ff] bg-white/70 p-4 lg:border-t-0 lg:border-l">
    <audio ref={audioRef} src={asset(`${invitationBase}/play-piano.mp3`)} onEnded={() => setIsPlaying(false)} preload="metadata" />
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7180b2]">Final output</p>
    <div className="mt-4 overflow-hidden rounded-xl border border-[#dce3fb] bg-white p-2"><div className="relative aspect-[1.27] overflow-hidden rounded-lg"><Image src={asset(`${invitationBase}/interactive-invitation-asset/1st generate.webp`)} alt="Invitation source artwork" fill sizes="(max-width: 1024px) 48vw, 17vw" className="object-cover" /><span className="absolute bottom-2 left-2 rounded-md bg-[#1e2b73]/85 px-2 py-1 text-[7px] font-bold text-white">{names || "John & Miya"}</span></div></div>
    <div className="mt-5 rounded-xl border border-[#dce3fb] bg-white p-3"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-[#f0edff] text-[#7254df]"><Music2 size={14} /></span><div><p className="text-[10px] font-bold">Music background</p><p className="text-[9px] text-[#7782aa]">play-piano.mp3</p></div></div><button type="button" onClick={() => void toggleAudio()} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#7858ea] px-3 py-2 text-[10px] font-bold text-white transition hover:bg-[#6341d6]">{isPlaying ? <Pause size={13} /> : <Play size={13} />}{isPlaying ? "Pause audio" : "Play audio"}</button></div>
    <div className="mt-4 rounded-xl border border-[#dce3fb] bg-[#f8f9ff] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold"><Volume2 size={13} /> Asset stack</p><p className="mt-2 text-[9px] leading-4 text-[#6c779e]">Cover · inside pages · frame artwork · video message · piano audio</p></div>
  </aside>;
}

export function InvitationCreatorDemo() {
  const [values, setValues] = useState<InvitationEditorValues>(defaultInvitationEditorValues);
  return <section className="overflow-hidden rounded-2xl border border-[#dce4ff] bg-[#f7f9ff] text-[#17235d] shadow-[0_20px_55px_rgba(77,95,173,0.18)]" aria-label="Invitation Card Creator demonstration"><InvitationCreatorHeader /><div className="grid min-h-[31rem] lg:grid-cols-[13rem_minmax(0,1fr)_15rem]"><InvitationCreatorSidebar values={values} setValues={setValues} /><main className="flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#e8edff,transparent_58%)] p-6 text-center"><div className="max-w-sm rounded-2xl border border-dashed border-[#cbd5fa] bg-white/65 p-6 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7180b2]">Working paper card</p><h2 className="mt-3 text-lg font-bold">Preview moved to the Paper Card tab</h2><p className="mt-3 text-xs leading-5 text-[#68749d]">These editor controls are active. Use the Paper Card tab to apply them to the card you can open, close and drag.</p><p className="mt-5 text-[10px] font-semibold text-[#7653ea]">{values.eventTitle} · {values.names || "John & Miya"}</p></div></main><InvitationCreatorOutput names={values.names} /></div></section>;
}
