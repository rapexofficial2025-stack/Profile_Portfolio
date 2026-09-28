import Link from "next/link";
import type { ReactNode } from "react";

type LiquidGlassButtonProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
};

export function LiquidGlassButton({ href, children, icon }: LiquidGlassButtonProps) {
  return <Link href={href} className="liquid-glass-button"><span className="liquid-glass-button__edge" aria-hidden="true" /><span className="liquid-glass-button__reflection" aria-hidden="true" /><span className="liquid-glass-button__icon" aria-hidden="true">{icon}</span><span className="liquid-glass-button__label">{children}</span></Link>;
}
