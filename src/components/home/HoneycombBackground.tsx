"use client";

import { motion, useReducedMotion } from "framer-motion";

const staticPaths = [
  "M64 178l48-28 48 28v56l-48 28-48-28z M160 234l48-28 48 28v56l-48 28-48-28z M544 156l48-28 48 28v56l-48 28-48-28z",
  "M422 370l48-28 48 28v56l-48 28-48-28z M518 426l48-28 48 28v56l-48 28-48-28z M326 426l48-28 48 28v56l-48 28-48-28z",
  "M94 574l48-28 48 28v56l-48 28-48-28z M190 630l48-28 48 28v56l-48 28-48-28z M574 590l48-28 48 28v56l-48 28-48-28z",
];

const lightPaths = [
  "M64 178l48-28 48 28v56l48 28",
  "M422 370l48-28 48 28v56l48 28",
  "M94 574l48-28 48 28v56l48 28",
];

export function HoneycombBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 700 780" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full opacity-80">
        <defs>
          <pattern id="honeycomb-grid" width="96" height="112" patternUnits="userSpaceOnUse">
            <path d="M48 0l48 28v56l-48 28L0 84V28z M0 84l48 28 48-28" fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="0.8" />
          </pattern>
          <radialGradient id="honeycomb-fade" cx="50%" cy="46%" r="70%">
            <stop offset="0%" stopColor="#070A0F" stopOpacity="0.88" />
            <stop offset="52%" stopColor="#070A0F" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#070A0F" stopOpacity="0.96" />
          </radialGradient>
        </defs>
        <rect width="700" height="780" fill="url(#honeycomb-grid)" opacity="0.48" />
        {staticPaths.map((path, index) => <path key={path} d={path} fill="none" stroke={index === 1 ? "rgba(139,92,246,0.23)" : "rgba(14,165,233,0.14)"} strokeWidth="1" />)}
        {!shouldReduceMotion && lightPaths.map((path, index) => <motion.path key={path} d={path} fill="none" stroke={index === 1 ? "rgba(168,85,247,0.72)" : "rgba(14,165,233,0.55)"} strokeWidth="1.35" strokeLinecap="round" strokeDasharray="10 210" initial={{ strokeDashoffset: 0, opacity: 0.25 }} animate={{ strokeDashoffset: -220, opacity: [0.08, 0.56, 0.08] }} transition={{ duration: 11 + index * 3, delay: index * 1.8, repeat: Infinity, ease: "linear" }} />)}
        <rect width="700" height="780" fill="url(#honeycomb-fade)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,transparent_0%,rgba(7,10,15,0.18)_42%,rgba(7,10,15,0.68)_100%)]" />
    </div>
  );
}
