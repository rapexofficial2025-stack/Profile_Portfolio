import { profile } from "@/data/profile";

export function HeroStats() {
  return (
    <section aria-label="Profile statistics" className="border-y border-white/10 py-6 sm:py-7">
      <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0">
        {profile.stats.map((stat) => {
          const value = stat.verified && stat.value ? stat.value : "—";
          return <div key={stat.label} className="border-l border-white/10 pl-4 sm:px-6 first:sm:border-l-0 first:sm:pl-0 last:sm:pr-0">
            <p className={`text-[2rem] font-semibold leading-none tracking-[-0.03em] ${stat.verified ? "text-white/95" : "text-white/40"}`} aria-label={stat.verified ? value : "Value pending verification"}>{value}</p>
            <p className="mt-2 max-w-[11rem] text-[10px] font-medium uppercase leading-4 tracking-[0.15em] text-[#8992A3]">{stat.label}</p>
          </div>;
        })}
      </div>
      <p className="mt-6 border-t border-white/[0.07] pt-4 text-[9px] font-medium tracking-[0.3em] text-white/30">PRODUCT <span className="px-1 text-white/15">•</span> VISUAL <span className="px-1 text-white/15">•</span> DIGITAL</p>
    </section>
  );
}
