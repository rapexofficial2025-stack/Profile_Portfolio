"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavigationItem as NavigationItemType } from "@/lib/navigation";

export function NavigationItem({ item, onNavigate }: { item: NavigationItemType; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = isMounted && (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <Link href={item.href} onClick={onNavigate} aria-current={isActive ? "page" : undefined} className={`neu-glass-control group relative flex min-h-11 items-center gap-3 rounded-xl border px-3.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A0F] ${isActive ? "is-active border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035))] text-white" : "border-transparent text-[#A7AFBF] hover:border-white/5 hover:bg-white/5 hover:text-white"}`}>
      <span aria-hidden="true" className={`absolute left-0 h-5 w-0.5 rounded-full bg-gradient-to-b from-[#0EA5E9] to-[#7C3AED] transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
      <span>{item.label}</span>
      <span aria-hidden="true" className={`nav-status-dot ml-auto ${isActive ? "is-selected" : ""}`} />
    </Link>
  );
}
