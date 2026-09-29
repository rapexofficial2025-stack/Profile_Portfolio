"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Menu, Palette, Rocket, Sparkles, X } from "lucide-react";

const services = [{ icon: Palette, title: "Brand identity", text: "Logos, color and type that feel like you." }, { icon: Sparkles, title: "Web design", text: "Fast, responsive sites built to convert." }, { icon: Rocket, title: "Launch campaigns", text: "Social, video and ads for your big day." }];
const plans = [{ name: "Starter", monthly: 4900, perks: ["1-page site", "Basic SEO", "Contact form"] }, { name: "Growth", monthly: 9900, perks: ["5 pages", "Blog + CMS", "Analytics setup"], featured: true }, { name: "Studio", monthly: 18900, perks: ["Unlimited pages", "Brand refresh", "Priority support"] }];
const quotes = [["They rebuilt our site in three weeks and inquiries doubled.", "Ana, Kawit Bakery"], ["Clear process, beautiful work, zero stress.", "Paolo, Bay Fitness"], ["Our new brand finally matches the quality of our food.", "Lia, Lola's Kitchen"]];

export function BusinessSiteMock() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [quote, setQuote] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.message.trim().length < 10) next.message = "Tell us a bit more (10+ characters)";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };
  const field = "w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none focus:border-orange-500";

  return <div className="min-h-full bg-stone-50 font-sans text-stone-800">
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-stone-50/90 px-5 py-3 backdrop-blur">
      <span className="text-sm font-black tracking-tight">northwind<span className="text-orange-500">.</span></span>
      <div className="hidden gap-5 text-xs font-medium text-stone-600 @2xl:flex"><span>Services</span><span>Pricing</span><span>Work</span><span>Contact</span></div>
      <button type="button" className="hidden rounded-full bg-stone-900 px-4 py-1.5 text-xs font-semibold text-stone-50 @2xl:block">Book a call</button>
      <button type="button" className="@2xl:hidden" aria-label="Menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
    </nav>
    {menuOpen && <div className="space-y-1 border-b border-stone-200 bg-stone-100 px-5 py-3 text-sm font-medium @2xl:hidden">{["Services", "Pricing", "Work", "Contact"].map((item) => <p key={item} className="py-1">{item}</p>)}</div>}

    <header className="px-5 py-12 text-center @2xl:py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600">Creative studio · Cavite</p>
      <h3 className="mx-auto mt-3 max-w-xl text-3xl font-black leading-tight tracking-tight @2xl:text-5xl">Brands and websites that bring customers in.</h3>
      <p className="mx-auto mt-4 max-w-md text-sm text-stone-600">We design, build and launch everything a small business needs to look big online.</p>
      <div className="mt-6 flex justify-center gap-2"><button type="button" className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-stone-50">Start a project</button><button type="button" className="rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold">See our work</button></div>
    </header>

    <section className="grid gap-3 px-5 @2xl:grid-cols-3">{services.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-stone-200 bg-stone-100 p-5 transition hover:-translate-y-1 hover:shadow-lg"><Icon size={20} className="text-orange-500" /><p className="mt-3 font-bold">{title}</p><p className="mt-1 text-sm text-stone-600">{text}</p></div>)}</section>

    <section className="px-5 py-12">
      <div className="flex items-center justify-center gap-3 text-sm font-semibold"><span className={yearly ? "text-stone-400" : ""}>Monthly</span><button type="button" role="switch" aria-checked={yearly} aria-label="Yearly billing" onClick={() => setYearly((value) => !value)} className={`relative h-6 w-11 rounded-full transition ${yearly ? "bg-orange-500" : "bg-stone-300"}`}><span className={`absolute top-0.5 size-5 rounded-full bg-stone-50 shadow transition-all ${yearly ? "left-[1.35rem]" : "left-0.5"}`} /></button><span className={yearly ? "" : "text-stone-400"}>Yearly <span className="text-orange-600">−20%</span></span></div>
      <div className="mt-6 grid gap-3 @2xl:grid-cols-3">{plans.map((plan) => <div key={plan.name} className={`rounded-2xl p-5 ${plan.featured ? "bg-stone-900 text-stone-50" : "border border-stone-200 bg-stone-100"}`}><p className="text-sm font-bold">{plan.name}</p><p className="mt-2 text-3xl font-black">₱{(yearly ? Math.round(plan.monthly * 0.8) : plan.monthly).toLocaleString()}<span className="text-xs font-medium opacity-60">/mo</span></p><ul className="mt-4 space-y-1.5 text-sm">{plan.perks.map((perk) => <li key={perk} className="flex items-center gap-2"><Check size={14} className="text-orange-500" />{perk}</li>)}</ul></div>)}</div>
    </section>

    <section className="bg-orange-50 px-5 py-10 text-center">
      <p className="mx-auto max-w-md text-lg font-semibold italic">“{quotes[quote][0]}”</p><p className="mt-2 text-xs font-semibold uppercase tracking-wider text-stone-500">{quotes[quote][1]}</p>
      <div className="mt-4 flex items-center justify-center gap-3"><button type="button" aria-label="Previous testimonial" onClick={() => setQuote((q) => (q + quotes.length - 1) % quotes.length)} className="rounded-full border border-stone-300 p-1.5"><ChevronLeft size={14} /></button>{quotes.map((_, i) => <span key={i} className={`size-1.5 rounded-full ${i === quote ? "bg-orange-500" : "bg-stone-300"}`} />)}<button type="button" aria-label="Next testimonial" onClick={() => setQuote((q) => (q + 1) % quotes.length)} className="rounded-full border border-stone-300 p-1.5"><ChevronRight size={14} /></button></div>
    </section>

    <section className="px-5 py-12">
      <h4 className="text-center text-2xl font-black">Let&apos;s talk</h4>
      {sent ? <div className="mx-auto mt-6 max-w-md rounded-2xl bg-emerald-50 p-6 text-center text-sm text-emerald-800"><Check className="mx-auto mb-2" />Thanks {form.name.split(" ")[0]}! We&apos;ll reply within one business day.<button type="button" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="mt-3 block w-full text-xs font-semibold underline">Send another</button></div>
        : <form onSubmit={submit} noValidate className="mx-auto mt-6 max-w-md space-y-3">
          {(["name", "email"] as const).map((key) => <div key={key}><input className={field} placeholder={key === "name" ? "Your name" : "Email"} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}</div>)}
          <div><textarea className={`${field} h-24 resize-none`} placeholder="What are you working on?" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />{errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}</div>
          <button type="submit" className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-semibold text-stone-50">Send message</button>
        </form>}
    </section>
    <footer className="border-t border-stone-200 px-5 py-5 text-center text-[11px] text-stone-500">© 2026 Northwind Studio · Frontend mockup</footer>
  </div>;
}
