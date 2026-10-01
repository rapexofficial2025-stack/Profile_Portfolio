"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

const invitationBase = "/images/projects/interactive-ui-design/invitation-paper-engine";

export function InvitationAutoLoop({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden bg-[#21152c] p-3">
      <Image
        src={asset(`${invitationBase}/table.png`)}
        alt=""
        fill
        sizes={expanded ? "min(56rem, 100vw)" : "25vw"}
        className="object-cover opacity-70"
      />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.2),transparent_48%),linear-gradient(to_top,rgba(22,10,31,0.55),transparent_55%)]" />

      <div className={`relative aspect-1507/997 w-[86%] perspective-[1400px] ${expanded ? "max-w-3xl" : "max-w-xs"}`}>
        <div className="absolute inset-0 overflow-hidden rounded-[0.3rem] bg-[#f7e8cc] shadow-[0_20px_45px_rgba(20,8,28,0.48)]">
          <Image src={asset(`${invitationBase}/inside-background.png`)} alt="Invitation interior" fill sizes="60vw" className="object-cover" />
          <div className="absolute inset-y-0 right-0 w-1/2">
            <Image src={asset(`${invitationBase}/right-page.png`)} alt="Invitation right page" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="absolute inset-y-0 left-0 w-1/2">
            <Image src={asset(`${invitationBase}/left-page.png`)} alt="Invitation left page" fill sizes="30vw" className="object-cover" />
          </div>
        </div>

        <motion.div
          className="absolute inset-y-0 left-1/2 w-1/2 origin-left transform-3d"
          animate={{ rotateY: [0, 0, -176, -176, 0] }}
          transition={{ duration: 8, times: [0, 0.16, 0.42, 0.72, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[0.3rem] shadow-[0_16px_30px_rgba(26,10,31,0.48)] backface-hidden">
            <Image src={asset(`${invitationBase}/cover.png`)} alt="Invitation cover opening and closing automatically" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 rounded-[0.3rem] bg-[#eadcbf] shadow-inner backface-hidden transform-[rotateY(180deg)]" />
        </motion.div>
      </div>

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/18 bg-black/50 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
        TSX AUTO LOOP · OPEN / CLOSE
      </span>
    </div>
  );
}
