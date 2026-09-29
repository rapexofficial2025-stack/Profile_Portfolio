import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";

export function HomeFooter() {
  return <footer className="flex flex-col gap-3 border-t border-white/10 py-7 text-[10px] font-medium tracking-widest text-[#6B7280] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {profile.copyrightName} <span className="px-1.5 text-white/30">·</span> {profile.companyAttribution}</p><p className="inline-flex items-center gap-2"><MapPin size={13} strokeWidth={1.6} aria-hidden="true" />{profile.location}</p></footer>;
}
