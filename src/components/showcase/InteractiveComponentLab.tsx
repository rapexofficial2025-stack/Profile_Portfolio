"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Component, SlidersHorizontal, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type LabTab = "components" | "controls";

export function InteractiveComponentLab({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<LabTab>("components");

  return <motion.div className="fixed inset-0 z-50 overflow-y-auto bg-[#070A0F]/80 px-4 py-8 backdrop-blur-md sm:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Interactive Component Lab">
    <motion.section className="mx-auto max-w-4xl overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#0F1620]/95 shadow-[0_26px_90px_rgba(0,0,0,0.5)]" initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.985 }} transition={{ duration: 0.24 }}>
      <header className="flex items-start justify-between gap-5 border-b border-white/10 px-6 py-5 sm:px-8"><div><p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">INTERACTIVE UI DESIGN</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Interactive Component Lab</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#A7AFBF]">A focused container for reusable interface components and their interaction states.</p></div><button type="button" onClick={onClose} aria-label="Close Interactive Component Lab" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-white/25 hover:text-white"><X size={18} /></button></header>
      <div className="border-b border-white/10 px-6 pt-4 sm:px-8"><div className="flex gap-2 overflow-x-auto pb-4" role="tablist" aria-label="Component lab sections"><LabTabButton active={tab === "components"} onClick={() => setTab("components")} icon={<Component size={15} />} label="Components" /><LabTabButton active={tab === "controls"} onClick={() => setTab("controls")} icon={<SlidersHorizontal size={15} />} label="Controls" /></div></div>
      <div className="p-6 sm:p-8"><AnimatePresence mode="wait">{tab === "components" ? <motion.section key="components" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.18 }} className="grid gap-4 sm:grid-cols-3"><ComponentTile label="Action button" detail="Default, hover, loading" /><ComponentTile label="Status card" detail="Live visual state" /><ComponentTile label="Feedback toast" detail="Success and error" /></motion.section> : <motion.section key="controls" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }} className="grid gap-4 sm:grid-cols-2"><ComponentTile label="Form controls" detail="Inputs, selection and focus" /><ComponentTile label="Motion controls" detail="Subtle responsive feedback" /></motion.section>}</AnimatePresence></div>
    </motion.section>
  </motion.div>;
}

function LabTabButton({ active, icon, label, onClick }: { active: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return <button type="button" role="tab" aria-selected={active} onClick={onClick} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${active ? "border-violet-300/35 bg-violet-500/12 text-violet-100" : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:text-white"}`}>{icon}{label}</button>;
}

function ComponentTile({ label, detail }: { label: string; detail: string }) {
  return <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><span className="block h-1.5 w-12 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" /><h3 className="mt-5 text-base font-semibold text-white">{label}</h3><p className="mt-2 text-xs leading-5 text-[#A7AFBF]">{detail}</p></article>;
}
