"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { InvitationCreatorDemo, InvitationCreatorHeader, InvitationCreatorOutput, InvitationCreatorSidebar, defaultInvitationEditorValues, invitationPaperStyles, type InvitationEditorValues } from "@/components/showcase/InvitationCreatorDemo";
import { InvitationFeaturePreview } from "@/features/invitation-interactive";

const LIVE_INVITATION_URL = "https://rapexofficial2025-stack.github.io/ravian-christening-invitation/";
type Screen = "creator" | "paper" | "engine";
const grain = "repeating-linear-gradient(115deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 4px), repeating-linear-gradient(25deg, rgba(0,0,0,0.012) 0 1px, transparent 1px 7px)";

export function InvitationMock() {
  const [screen, setScreen] = useState<Screen>("creator");
  return <div className="min-h-full bg-neutral-200 p-3 @3xl:p-5"><div className="mb-3 flex w-fit max-w-full overflow-x-auto rounded-full border border-neutral-300 bg-white p-1 text-[10px] font-bold text-neutral-600"><Tab selected={screen === "creator"} onClick={() => setScreen("creator")}>Creator demo</Tab><Tab selected={screen === "paper"} onClick={() => setScreen("paper")}>Paper card</Tab><Tab selected={screen === "engine"} onClick={() => setScreen("engine")}>Custom engine</Tab></div>{screen === "creator" ? <InvitationCreatorDemo /> : screen === "paper" ? <PaperCardMock /> : <CustomEngineCard />}</div>;
}

function Tab({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: string }) {
  return <button type="button" onClick={onClick} className={`shrink-0 rounded-full px-3 py-1.5 transition ${selected ? "bg-violet-600 text-white" : "hover:bg-neutral-100"}`}>{children}</button>;
}

function PaperCardMock() {
  const [values, setValues] = useState<InvitationEditorValues>(defaultInvitationEditorValues);
  const [angle, setAngle] = useState(0);
  const dragRef = useRef<{ x: number; angle: number; width: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const theme = invitationPaperStyles[values.paper];
  const isOpen = angle < -80;
  const prettyDate = values.date ? new Date(`${values.date}T00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "Date to follow";
  const face = { backgroundImage: `${grain}, ${theme.paper}`, color: theme.ink } as const;
  const setOpen = (open: boolean) => setAngle(open ? -160 : 0);
  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => { event.currentTarget.setPointerCapture(event.pointerId); dragRef.current = { x: event.clientX, angle, width: event.currentTarget.getBoundingClientRect().width, moved: false }; };
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => { const drag = dragRef.current; if (!drag) return; const dx = event.clientX - drag.x; if (Math.abs(dx) > 5) drag.moved = true; setAngle(Math.max(-160, Math.min(0, drag.angle + (dx / drag.width) * 180))); };
  const endDrag = () => { const drag = dragRef.current; if (!drag) return; dragRef.current = null; suppressClickRef.current = drag.moved; setOpen(angle < -80); };

  return <section className="overflow-hidden rounded-2xl border border-[#dce4ff] bg-[#f7f9ff] font-sans text-[#17235d] shadow-[0_20px_55px_rgba(77,95,173,0.18)]"><InvitationCreatorHeader /><div className="grid min-h-[34rem] lg:grid-cols-[13rem_minmax(0,1fr)_15rem]"><InvitationCreatorSidebar values={values} setValues={setValues} onToggleCard={() => setOpen(!isOpen)} cardOpen={isOpen} /><main className="relative flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#e8edff,transparent_58%)] p-5 perspective-[1400px]"><div className="relative aspect-5/7 w-[min(17rem,80%)]"><div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm p-6 text-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)]" style={face}><p className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Reception to follow</p><p className="mt-4 font-serif text-sm leading-6">{prettyDate}</p><p className="mt-2 font-serif text-sm italic">{values.venue || "Venue to follow"}</p><div className="mx-auto mt-5 h-px w-16" style={{ background: theme.accent }} /><p className="mt-5 text-[9px] uppercase tracking-[0.25em] opacity-70">Kindly RSVP by November 30</p></div><div role="button" tabIndex={0} aria-label="Drag or click invitation cover to open or close" onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onClick={() => { if (suppressClickRef.current) { suppressClickRef.current = false; return; } setOpen(!isOpen); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpen(!isOpen); } }} className="absolute inset-0 origin-left cursor-grab rounded-sm transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] transform-3d active:cursor-grabbing" style={{ transform: `rotateY(${angle}deg)` }}><div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm p-6 text-center shadow-[0_24px_40px_-12px_rgba(0,0,0,0.5)] backface-hidden" style={face}><div className="absolute inset-3 rounded-sm border" style={{ borderColor: theme.accent }} /><p className="text-[9px] font-semibold uppercase tracking-[0.35em]" style={{ color: theme.accent }}>Together with their families</p><p className="mt-5 font-serif text-3xl leading-tight">{values.names || "Your names"}</p><p className="mt-5 text-[9px] uppercase tracking-[0.3em] opacity-70">request the pleasure of your company</p></div><div className="absolute inset-0 rounded-sm backface-hidden transform-[rotateY(180deg)]" style={{ backgroundImage: `${grain}, ${theme.paper}`, filter: "brightness(0.92)" }} /></div></div><p className="absolute bottom-5 text-center text-[10px] font-medium text-[#7480ac]">Drag the cover left to open, or use the editor control.</p></main><InvitationCreatorOutput names={values.names} /></div></section>;
}

function CustomEngineCard() {
  return <section className="invitation-custom-engine rounded-2xl border border-violet-200 bg-[#f8f7ff] p-4 @3xl:p-6"><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">Custom engine card</p><h2 className="mt-1 text-xl font-bold text-slate-900">Layered invitation interaction</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600">Cover, inside pages, note, video and audio remain separate from the editable sample card.</p></div><a href={LIVE_INVITATION_URL} target="_blank" rel="noreferrer" className="rounded-full bg-violet-600 px-4 py-2 text-[10px] font-bold tracking-[0.12em] text-white shadow-sm transition hover:bg-violet-700">TEST LIVE INVITATION ↗</a></div><InvitationFeaturePreview /></section>;
}
