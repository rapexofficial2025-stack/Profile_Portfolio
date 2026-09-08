"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem as NavigationItemType } from "@/lib/navigation";

export function NavigationItem({ item, onNavigate }: { item: NavigationItemType; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link href={item.href} onClick={onNavigate} aria-current={isActive ? "page" : undefined} className={`group relative flex min-h-11 items-center gap-3 rounded-xl border px-3.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A0F] ${isActive ? "border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035))] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-2px_-2px_7px_rgba(0,0,0,0.24),0_9px_24px_rgba(0,0,0,0.18)]" : "border-transparent text-[#A7AFBF] hover:border-white/[0.06] hover:bg-white/[0.045] hover:text-white hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.04)]"}`}>
      <span aria-hidden="true" className={`absolute left-0 h-5 w-0.5 rounded-full bg-gradient-to-b from-[#0EA5E9] to-[#7C3AED] transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
      <span>{item.label}</span>
    </Link>
  );
}
