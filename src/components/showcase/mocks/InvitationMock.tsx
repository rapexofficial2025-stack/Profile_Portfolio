"use client";

import { useState } from "react";

const templates = {
  ivory: { name: "Ivory Classic", paper: "linear-gradient(145deg, #fbf7ef, #efe6d4)", ink: "#4a3b28", accent: "#b08d57" },
  blush: { name: "Blush Floral", paper: "linear-gradient(145deg, #fdf1f1, #f3dcdc)", ink: "#6b3a45", accent: "#d9848f" },
  midnight: { name: "Midnight Gold", paper: "linear-gradient(145deg, #1d2238, #121526)", ink: "#f1e6c8", accent: "#d4b169" },
} as const;
type TemplateId = keyof typeof templates;

/** Paper texture: fine grain + soft fibres layered over the template color. */
const grain = "repeating-linear-gradient(115deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 4px), repeating-linear-gradient(25deg, rgba(0,0,0,0.012) 0 1px, transparent 1px 7px)";

export function InvitationMock() {
  const [templateId, setTemplateId] = useState<TemplateId>("ivory");
  const [details, setDetails] = useState({ names: "Irvin & Joy", date: "2026-12-12", venue: "Kawit Garden Pavilion" });
  const [open, setOpen] = useState(false);
  const t = templates[templateId];
  const prettyDate = details.date ? new Date(`${details.date}T00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "Date to follow";
  const input = "w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 outline-none focus:border-amber-600";
  const face = { backgroundImage: `${grain}, ${t.paper}`, color: t.ink } as const;

  return <div className="grid min-h-full gap-6 bg-neutral-200 p-5 font-sans text-neutral-800 @3xl:grid-cols-[18rem_1fr] @3xl:p-8">
    <div className="space-y-4">
      <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Paper</p><div className="mt-2 grid grid-cols-3 gap-2">{(Object.keys(templates) as TemplateId[]).map((id) => <button key={id} type="button" onClick={() => setTemplateId(id)} className={`rounded-lg p-1 text-[10px] font-semibold transition ${templateId === id ? "ring-2 ring-amber-600" : "ring-1 ring-neutral-300"}`}><span className="block h-10 rounded-md" style={{ backgroundImage: `${grain}, ${templates[id].paper}` }} /><span className="mt-1 block">{templates[id].name}</span></button>)}</div></div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Names<input className={`${input} mt-1.5 normal-case tracking-normal`} value={details.names} onChange={(e) => setDetails({ ...details, names: e.target.value })} /></label>
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Date<input type="date" className={`${input} mt-1.5 normal-case tracking-normal`} value={details.date} onChange={(e) => setDetails({ ...details, date: e.target.value })} /></label>
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Venue<input className={`${input} mt-1.5 normal-case tracking-normal`} value={details.venue} onChange={(e) => setDetails({ ...details, venue: e.target.value })} /></label>
      <button type="button" onClick={() => setOpen((value) => !value)} className="w-full rounded-full bg-neutral-900 py-2.5 text-sm font-semibold text-neutral-50">{open ? "Close card" : "Open card"}</button>
    </div>

    <div className="flex items-center justify-center py-6 perspective-[1400px]">
      <div className="relative aspect-5/7 w-[min(17rem,80%)]">
        {/* inside page, revealed when the cover swings open */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm p-6 text-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)]" style={face}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: t.accent }}>Reception to follow</p>
          <p className="mt-4 font-serif text-sm leading-6">{prettyDate}</p>
          <p className="mt-2 font-serif text-sm italic">{details.venue || "Venue to follow"}</p>
          <div className="mx-auto mt-5 h-px w-16" style={{ background: t.accent }} />
          <p className="mt-5 text-[9px] uppercase tracking-[0.25em] opacity-70">Kindly RSVP by November 30</p>
        </div>
        {/* cover: hinged on the left, rotates open in 3D */}
        <div className="absolute inset-0 origin-left rounded-sm transition-transform duration-900 ease-[cubic-bezier(.2,.8,.2,1)] transform-3d" style={{ transform: open ? "rotateY(-160deg)" : "rotateY(0deg)" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm p-6 text-center shadow-[0_24px_40px_-12px_rgba(0,0,0,0.5)] backface-hidden" style={face}>
            <div className="absolute inset-3 rounded-sm border" style={{ borderColor: t.accent }} />
            <p className="text-[9px] font-semibold uppercase tracking-[0.35em]" style={{ color: t.accent }}>Together with their families</p>
            <p className="mt-5 font-serif text-3xl leading-tight">{details.names || "Your names"}</p>
            <p className="mt-5 text-[9px] uppercase tracking-[0.3em] opacity-70">request the pleasure of your company</p>
          </div>
          <div className="absolute inset-0 rounded-sm backface-hidden transform-[rotateY(180deg)]" style={{ backgroundImage: `${grain}, ${t.paper}`, filter: "brightness(0.92)" }} />
        </div>
      </div>
    </div>
  </div>;
}
