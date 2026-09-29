export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/6 px-3.5 py-2 text-[10px] font-medium tracking-[0.12em] text-emerald-200/90 shadow-[0_0_30px_rgba(52,211,153,0.06)]">
      <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" aria-hidden="true" />
      <span>AVAILABLE FOR OPPORTUNITIES</span>
    </div>
  );
}
