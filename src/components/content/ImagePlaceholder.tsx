export function ImagePlaceholder({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="group relative flex aspect-[16/10] min-h-[180px] w-full items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.16),rgba(124,58,237,0.06)_25%,rgba(7,10,15,0.96)_68%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_40px_rgba(0,0,0,0.22)]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-violet-300/40 bg-white/[0.04] text-violet-100 shadow-[0_0_26px_rgba(167,139,250,0.25)]">
          <span className="text-xl font-light">◌</span>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200/80">{title.toUpperCase()}</p>
          {subtitle ? <p className="mt-2 text-[9px] font-medium tracking-[0.16em] text-white/40">{subtitle.toUpperCase()}</p> : <p className="mt-2 text-[9px] font-medium tracking-[0.16em] text-white/40">MEDIA COMING SOON</p>}
        </div>
      </div>
    </div>
  );
}
