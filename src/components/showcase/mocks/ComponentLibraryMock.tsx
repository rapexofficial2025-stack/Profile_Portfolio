"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";

const sections = ["Buttons", "Inputs", "Feedback"] as const;
type Section = (typeof sections)[number];
const variants = { primary: "bg-indigo-600 text-neutral-50 hover:bg-indigo-500", secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300", outline: "border border-neutral-300 text-neutral-800 hover:bg-neutral-100", danger: "bg-rose-600 text-neutral-50 hover:bg-rose-500" } as const;
const sizes = { sm: "px-3 py-1 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base" } as const;

function Demo({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  return <div className="rounded-xl border border-neutral-200 bg-neutral-50">
    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2"><p className="text-xs font-bold text-neutral-700">{title}</p>
      <button type="button" onClick={() => { void navigator.clipboard?.writeText(code).catch(() => undefined); setCopied(true); setTimeout(() => setCopied(false), 1400); }} className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600">{copied ? <Check size={12} /> : <Copy size={12} />}{copied ? "Copied" : "Copy"}</button></div>
    <div className="flex flex-wrap items-center gap-3 p-4">{children}</div>
    <pre className="overflow-x-auto rounded-b-xl bg-neutral-900 px-4 py-2 text-[11px] text-emerald-300"><code>{code}</code></pre>
  </div>;
}

export function ComponentLibraryMock() {
  const [section, setSection] = useState<Section>("Buttons");
  const [variant, setVariant] = useState<keyof typeof variants>("primary");
  const [size, setSize] = useState<keyof typeof sizes>("md");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [checks, setChecks] = useState({ news: true, sms: false });
  const [plan, setPlan] = useState("pro");
  const [email, setEmail] = useState("hello@");
  const [toast, setToast] = useState(false);
  const [progress, setProgress] = useState(60);
  const emailBad = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);

  useEffect(() => { if (!loading) return; const id = setTimeout(() => setLoading(false), 1600); return () => clearTimeout(id); }, [loading]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(false), 2200); return () => clearTimeout(id); }, [toast]);

  return <div className="relative min-h-full bg-neutral-100 font-sans text-neutral-800 @2xl:flex">
    <nav className="flex gap-1 border-b border-neutral-200 bg-neutral-50 p-2 @2xl:w-44 @2xl:flex-col @2xl:border-b-0 @2xl:border-r @2xl:p-4">
      <p className="mb-3 hidden text-xs font-black uppercase tracking-[0.2em] text-indigo-600 @2xl:block">rapex/ui</p>
      {sections.map((item) => <button key={item} type="button" onClick={() => setSection(item)} className={`rounded-lg px-3 py-2 text-left text-xs font-semibold transition ${section === item ? "bg-indigo-50 text-indigo-700" : "text-neutral-500 hover:bg-neutral-100"}`}>{item}</button>)}
    </nav>
    <main className="flex-1 space-y-4 p-4 @2xl:p-6">
      <h3 className="text-xl font-black text-neutral-900">{section}</h3>
      {section === "Buttons" && <>
        <div className="flex flex-wrap gap-2 text-[11px]">{(Object.keys(variants) as (keyof typeof variants)[]).map((v) => <button key={v} type="button" onClick={() => setVariant(v)} className={`rounded-full px-2.5 py-1 font-semibold ${variant === v ? "bg-neutral-900 text-neutral-50" : "bg-neutral-200"}`}>{v}</button>)}<span className="mx-1 w-px bg-neutral-300" />{(Object.keys(sizes) as (keyof typeof sizes)[]).map((s) => <button key={s} type="button" onClick={() => setSize(s)} className={`rounded-full px-2.5 py-1 font-semibold ${size === s ? "bg-neutral-900 text-neutral-50" : "bg-neutral-200"}`}>{s}</button>)}</div>
        <Demo title="Button" code={`<Button variant="${variant}" size="${size}"${loading ? " loading" : ""}>Save changes</Button>`}>
          <button type="button" onClick={() => setLoading(true)} disabled={loading} className={`inline-flex items-center gap-2 rounded-lg font-semibold transition disabled:opacity-70 ${variants[variant]} ${sizes[size]}`}>{loading && <Loader2 size={14} className="animate-spin" />}{loading ? "Saving…" : "Save changes"}</button>
          <button type="button" disabled className={`rounded-lg font-semibold opacity-40 ${variants[variant]} ${sizes[size]}`}>Disabled</button>
        </Demo>
      </>}
      {section === "Inputs" && <>
        <Demo title="Text field" code={`<TextField label="Email" error={${emailBad ? '"Enter a valid email"' : "undefined"}} />`}>
          <label className="w-full max-w-xs text-xs font-semibold text-neutral-600">Email<input value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1 w-full rounded-lg border bg-neutral-50 px-3 py-2 text-sm text-neutral-800 outline-none ${emailBad ? "border-rose-500" : "border-neutral-300 focus:border-indigo-500"}`} />{emailBad && <span className="mt-1 block text-[11px] font-medium text-rose-600">Enter a valid email</span>}</label>
        </Demo>
        <Demo title="Switch · Checkbox · Radio" code={`<Switch checked={${toggle}} />  <Checkbox checked={${checks.news}} />  <Radio value="${plan}" />`}>
          <button type="button" role="switch" aria-checked={toggle} aria-label="Notifications" onClick={() => setToggle((v) => !v)} className={`relative h-6 w-11 rounded-full transition ${toggle ? "bg-indigo-600" : "bg-neutral-300"}`}><span className={`absolute top-0.5 size-5 rounded-full bg-neutral-50 shadow transition-all ${toggle ? "left-[1.35rem]" : "left-0.5"}`} /></button>
          {(Object.keys(checks) as (keyof typeof checks)[]).map((key) => <label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={checks[key]} onChange={() => setChecks({ ...checks, [key]: !checks[key] })} className="size-4 accent-indigo-600" />{key === "news" ? "Newsletter" : "SMS"}</label>)}
          {["free", "pro"].map((value) => <label key={value} className="flex items-center gap-2 text-sm capitalize"><input type="radio" name="plan" checked={plan === value} onChange={() => setPlan(value)} className="size-4 accent-indigo-600" />{value}</label>)}
        </Demo>
      </>}
      {section === "Feedback" && <>
        <Demo title="Toast" code={`toast.success("Changes saved")`}><button type="button" onClick={() => setToast(true)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-neutral-50">Show toast</button>{["New", "Beta", "Deprecated"].map((badge, i) => <span key={badge} className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${["bg-emerald-100 text-emerald-700", "bg-indigo-100 text-indigo-700", "bg-neutral-200 text-neutral-600"][i]}`}>{badge}</span>)}</Demo>
        <Demo title="Progress" code={`<Progress value={${progress}} />`}><div className="w-full max-w-sm"><div className="h-2 rounded-full bg-neutral-200"><div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} /></div><input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} aria-label="Progress" className="mt-3 w-full accent-indigo-600" /></div></Demo>
      </>}
    </main>
    <div className={`pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 shadow-xl transition-all duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}><Check size={15} className="text-emerald-400" />Changes saved</div>
  </div>;
}
