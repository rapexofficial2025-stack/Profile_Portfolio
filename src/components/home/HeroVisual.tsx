import { FloatingSkillOrbit } from "./FloatingSkillOrbit";
import { ProfilePortrait } from "./ProfilePortrait";

export function HeroVisual() {
  return <div className="absolute inset-0 isolate"><div className="absolute inset-0 z-10 flex items-center justify-center"><ProfilePortrait /></div><FloatingSkillOrbit /></div>;
}
