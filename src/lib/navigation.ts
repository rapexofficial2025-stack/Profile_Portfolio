import { BriefcaseBusiness, Home, Mail, Sparkles, UserRound, type LucideIcon } from "lucide-react";

export type NavigationItem = { label: string; href: string; icon: LucideIcon };

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work", href: "/work", icon: BriefcaseBusiness },
  { label: "About", href: "/about", icon: UserRound },
  { label: "Skills", href: "/skills", icon: Sparkles },
  { label: "Contact", href: "/contact", icon: Mail },
];
