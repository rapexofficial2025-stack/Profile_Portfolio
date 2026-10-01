import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ShieldAlert } from "lucide-react";
import { experienceTimeline, experienceTracks, progrexDetails, rapexDetails } from "@/data/identity-stats";
import { asset } from "@/lib/asset";

const Chips = ({ items }: { items: string[] }) => <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className="stat-chip">{item}</span>)}</div>;
const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="stat-modal-eyebrow">{children}</p>;

function BrandIdentity({ brand }: { brand: "rapex" | "progrex" }) {
  const isRapex = brand === "rapex";
  const name = isRapex ? "RAPEX Technologies" : "PROGREX";
  const icon = isRapex ? "/images/branding/rapex-logo.png" : "/images/branding/progrex-logo.png";
  const wordmark = isRapex ? "/images/branding/rapex-name-logo.png" : "/images/branding/progrex-name-logo.png";

  return <div className={`stat-brand-identity is-${brand}`} aria-label={name}>
    <span className="stat-brand-logo-frame" aria-hidden="true"><Image src={asset(icon)} alt="" width={96} height={96} className="stat-brand-logo" /></span>
    <span className="stat-brand-wordmark-frame" aria-hidden="true"><Image src={asset(wordmark)} alt="" width={360} height={120} className="stat-brand-wordmark" /></span>
  </div>;
}

export function ExperienceModalContent() {
  return <>
    <Eyebrow>Professional journey</Eyebrow>
    <h2 id="stat-modal-title" className="stat-modal-title">13+ Years of Creative &amp; Technical Experience</h2>
    <p className="stat-modal-lead">A multidisciplinary journey across operations, technology, design and digital creation.</p>
    <ol className="stat-timeline">{experienceTimeline.map((step) => <li key={step.period}><span className="stat-timeline-dot" /><p className="stat-timeline-period">{step.period}</p><p className="stat-timeline-title">{step.title}</p>{step.place && <p className="stat-muted">{step.place}</p>}</li>)}</ol>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">{experienceTracks.map((track) => <div key={track.title}><Eyebrow>{track.title}</Eyebrow><div className="mt-2.5"><Chips items={track.items} /></div></div>)}</div>
    <div className="stat-modal-actions"><Link href="/resume" className="stat-cta is-primary">View full resume <ArrowRight size={15} /></Link></div>
  </>;
}

export function RapexModalContent() {
  const hasDemo = rapexDetails.customerDemoUrl.length > 0;
  return <>
    <div className="flex flex-wrap items-center gap-3"><BrandIdentity brand="rapex" /><span className="stat-badge">Founder project</span></div>
    <h2 id="stat-modal-title" className="stat-modal-title mt-4">{rapexDetails.title}</h2>
    <p className="stat-modal-lead">{rapexDetails.description}</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.2fr]">
      <div><Eyebrow>My role</Eyebrow><ul className="stat-list mt-2.5">{rapexDetails.role.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div><Eyebrow>Platform</Eyebrow><div className="mt-2.5"><Chips items={rapexDetails.features} /></div></div>
    </div>
    <div className="stat-demo-note"><ShieldAlert size={16} className="mt-0.5 shrink-0" /><div><p className="stat-demo-note-title">Live / staging product demonstration</p><p>Demo environment for portfolio evaluation. Please do not enter sensitive personal or payment information.</p></div></div>
    <div className="stat-modal-actions">
      <a href={rapexDetails.progrexProjectsUrl} target="_blank" rel="noopener noreferrer" className="stat-cta is-primary">More web projects <ArrowUpRight size={15} /></a>
      {hasDemo
        ? <a href={rapexDetails.customerDemoUrl} target="_blank" rel="noopener noreferrer" className="stat-cta">Experience customer demo <ArrowUpRight size={15} /></a>
        : <span className="stat-cta is-disabled" aria-disabled="true">Customer demo · coming soon</span>}
    </div>
    <a href={rapexDetails.progrexProjectsUrl} target="_blank" rel="noopener noreferrer" className="stat-text-link">Go to PROGREX <ArrowUpRight size={13} /></a>
  </>;
}

export function ProgrexModalContent() {
  return <>
    <div className="flex flex-wrap items-center gap-3"><BrandIdentity brand="progrex" /><span className="stat-badge is-live"><span className="stat-live-dot" />Live technology business</span></div>
    <h2 id="stat-modal-title" className="stat-modal-title mt-4">{progrexDetails.title}</h2>
    <p className="stat-modal-tagline">{progrexDetails.subtitle}</p>
    <p className="stat-modal-lead">{progrexDetails.description}</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
      <div><Eyebrow>My role</Eyebrow><ul className="stat-list mt-2.5">{progrexDetails.role.map((item) => <li key={item}>{item}</li>)}</ul><div className="mt-4"><Eyebrow>Focus</Eyebrow><ul className="stat-list mt-2.5">{progrexDetails.focus.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      <div><Eyebrow>Services</Eyebrow><div className="mt-2.5"><Chips items={progrexDetails.services} /></div></div>
    </div>
    <div className="stat-modal-actions">
      <a href={progrexDetails.url} target="_blank" rel="noopener noreferrer" className="stat-cta is-primary">Visit PROGREX <ArrowUpRight size={15} /></a>
      <a href={progrexDetails.url} target="_blank" rel="noopener noreferrer" className="stat-cta">View services <ArrowRight size={15} /></a>
    </div>
  </>;
}
