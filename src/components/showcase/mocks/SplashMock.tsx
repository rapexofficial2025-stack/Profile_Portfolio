"use client";

import { useEffect, useState } from "react";
import { Bike, Lock, Mail, MapPin, RotateCcw, ShoppingBag } from "lucide-react";

const slides = [
  { icon: ShoppingBag, title: "Order from local shops", text: "Food, groceries and essentials from stores near you." },
  { icon: Bike, title: "Riders you can track", text: "See your rider on the map from pickup to your door." },
  { icon: MapPin, title: "Delivered in minutes", text: "Average delivery under 30 minutes across Cavite." },
];
type Screen = "splash" | "onboarding" | "signin" | "home";

/** React Native onboarding flow as a web mock: splash → 3-step carousel → sign-in → home. */
export function SplashMock() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => { if (screen !== "splash") return; const id = setTimeout(() => setScreen("onboarding"), 2400); return () => clearTimeout(id); }, [screen]);
  const restart = () => { setSlide(0); setEmail(""); setScreen("splash"); };

  return <div className="flex min-h-full items-stretch justify-center bg-linear-to-br from-violet-950 via-indigo-950 to-neutral-950 font-sans @2xl:items-center @2xl:py-8">
    <div className="relative flex min-h-160 w-full max-w-sm flex-col overflow-hidden bg-neutral-950 text-neutral-100 @2xl:rounded-4xl @2xl:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
      {screen === "splash" && <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-violet-600 to-indigo-800">
        <div className="showcase-splash-logo flex size-24 items-center justify-center rounded-[1.8rem] bg-neutral-50 text-3xl font-black text-violet-700 shadow-2xl">R</div>
        <p className="showcase-splash-word mt-5 text-xl font-black tracking-[0.35em]">RAPEX</p>
        <div className="mt-10 h-1 w-32 overflow-hidden rounded-full bg-neutral-50/20"><div className="showcase-splash-bar h-full rounded-full bg-neutral-50" /></div>
      </div>}

      {screen === "onboarding" && <div className="flex flex-1 flex-col p-6">
        <button type="button" onClick={() => setScreen("signin")} className="self-end text-xs font-semibold text-neutral-400">Skip</button>
        <div key={slide} className="showcase-slide-in flex flex-1 flex-col items-center justify-center text-center">
          {(() => { const Icon = slides[slide].icon; return <div className="flex size-40 items-center justify-center rounded-full bg-linear-to-br from-violet-500/30 to-indigo-500/10"><div className="flex size-24 items-center justify-center rounded-3xl bg-violet-600 shadow-[0_20px_40px_-10px_rgba(124,58,237,0.7)]"><Icon size={40} /></div></div>; })()}
          <h3 className="mt-10 text-2xl font-black">{slides[slide].title}</h3>
          <p className="mt-3 max-w-[16rem] text-sm text-neutral-400">{slides[slide].text}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">{slides.map((_, i) => <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-violet-500" : "w-1.5 bg-neutral-700"}`} />)}</div>
          <button type="button" onClick={() => slide < slides.length - 1 ? setSlide(slide + 1) : setScreen("signin")} className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-bold">{slide < slides.length - 1 ? "Next" : "Get started"}</button>
        </div>
      </div>}

      {screen === "signin" && <form className="showcase-slide-in flex flex-1 flex-col justify-center gap-4 p-6" onSubmit={(event) => { event.preventDefault(); setScreen("home"); }}>
        <h3 className="text-3xl font-black">Welcome back</h3><p className="-mt-2 text-sm text-neutral-400">Sign in to track your orders.</p>
        <label className="flex items-center gap-3 rounded-2xl bg-neutral-900 px-4 py-3"><Mail size={16} className="text-neutral-500" /><input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-600" /></label>
        <label className="flex items-center gap-3 rounded-2xl bg-neutral-900 px-4 py-3"><Lock size={16} className="text-neutral-500" /><input type="password" required placeholder="Password" className="flex-1 bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-600" /></label>
        <button type="submit" className="mt-2 rounded-2xl bg-violet-600 py-3.5 text-sm font-bold">Sign in</button>
        <p className="text-center text-xs text-neutral-500">No account? <span className="font-semibold text-violet-400">Create one</span></p>
      </form>}

      {screen === "home" && <div className="showcase-slide-in flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center"><div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-2xl">✓</div><h3 className="text-2xl font-black">You&apos;re in!</h3><p className="text-sm text-neutral-400">Signed in as {email || "guest"}</p></div>}

      {screen !== "splash" && <button type="button" onClick={restart} className="absolute left-4 top-4 flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-200"><RotateCcw size={12} />Restart</button>}
    </div>
  </div>;
}
