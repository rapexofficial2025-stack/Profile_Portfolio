import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { PageContent } from "@/components/content/PageContent";
import { profile } from "@/data/profile";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Behance", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function ContactPage() {
  return <PageContent eyebrow="CONTACT" title="Let’s create something that makes an impact." description="Available for remote creative, multimedia, UI and digital product opportunities."><section className="grid gap-5 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.75fr)]"><div className="rounded-4xl border border-white/10 bg-[#0F1620]/70 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"><p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">DIRECT CONTACT</p><h2 className="mt-4 text-2xl font-semibold text-white">Start with a clear brief.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#A7AFBF]">Share the role, project challenge, timeline, or idea. I can help shape the concept, build the visual direction, and design the digital experience around it.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="mailto:palacioirvinjay@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300/40 hover:bg-violet-400/10"><Mail size={16} /> Email Me</a><a href="#" className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/15">Send Message</a></div><div className="mt-8 space-y-3 text-sm text-[#A7AFBF]"><p className="flex items-center gap-2"><MapPin size={15} className="text-violet-300" /> Kawit, Cavite, Philippines</p><p className="flex items-center gap-2"><Mail size={15} className="text-violet-300" /> palacioirvinjay@gmail.com</p></div></div><aside className="space-y-4"><div className="rounded-2xl border border-white/10 bg-[#0F1620]/70 p-5"><p className="text-[10px] font-semibold tracking-[0.2em] text-violet-200">SOCIAL</p><div className="mt-4 space-y-3">{socialLinks.map((social) => <Link key={social.label} href={social.href} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/2 px-3 py-2.5 text-sm text-slate-200 transition hover:border-violet-300/25 hover:text-white"><span>{social.label}</span><ArrowUpRight size={14} className="text-violet-300" /></Link>)}</div></div><div className="rounded-2xl border border-white/10 bg-[#0F1620]/70 p-5"><p className="text-[10px] font-semibold tracking-[0.2em] text-violet-200">PROFILE</p><p className="mt-3 text-sm leading-6 text-[#A7AFBF]">{profile.description}</p></div></aside></section></PageContent>;
}
