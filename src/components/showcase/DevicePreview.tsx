"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { ShowcaseMock } from "@/data/web-showcase";
import { EcommercePortalMock } from "./mocks/EcommercePortalMock";
import { BusinessSiteMock } from "./mocks/BusinessSiteMock";
import { ComponentLibraryMock } from "./mocks/ComponentLibraryMock";
import { InvitationMock } from "./mocks/InvitationMock";
import { SplashMock } from "./mocks/SplashMock";
import { FrostTwinWms } from "./frost/FrostTwinWms";
import { AirHoloGesturePreview } from "./airholo/AirHoloGesturePreview";
import { RapexDashPreview } from "./rapex-dash/RapexDashPreview";

const mocks: Record<ShowcaseMock, () => React.ReactElement> = {
  portal: EcommercePortalMock,
  business: BusinessSiteMock,
  invitation: InvitationMock,
  library: ComponentLibraryMock,
  splash: SplashMock,
  frost: FrostTwinWms,
  airholo: AirHoloGesturePreview,
  game: RapexDashPreview,
};

/** Live front-end mockup in a browser frame (Web) or a phone frame (Mobile). Mocks adapt via container queries. */
export function DevicePreview({ mock, url, defaultDevice }: { mock: ShowcaseMock; url: string; defaultDevice: "web" | "mobile" }) {
  const [device, setDevice] = useState(defaultDevice);
  const Mock = mocks[mock];

  return <div>
    <div className="mb-5 flex justify-center">
      <div className="showcase-toggle" role="tablist" aria-label="Preview device">
        {(["web", "mobile"] as const).map((option) => <button key={option} type="button" role="tab" aria-selected={device === option} onClick={() => setDevice(option)} className={device === option ? "is-on" : ""}>
          {option === "web" ? <Monitor size={14} /> : <Smartphone size={14} />}{option === "web" ? "Web" : "Mobile"}
        </button>)}
      </div>
    </div>
    {device === "web"
      ? <div className={`showcase-browser mx-auto ${mock === "frost" || mock === "game" ? "max-w-344" : "max-w-5xl"}`}>
        <div className="showcase-browser-bar"><span /><span /><span /><p>{url}</p></div>
        <div className={`showcase-screen overflow-y-auto ${mock === "frost" ? "h-208" : "h-144"}`}>{/* key remounts the mock so each device starts fresh */}<div key="web" className="@container min-h-full"><Mock /></div></div>
      </div>
      : <div className="showcase-phone mx-auto">
        <div className="showcase-phone-notch" />
        <div className="showcase-screen h-full overflow-y-auto rounded-[2.1rem]"><div key="mobile" className="@container min-h-full"><Mock /></div></div>
      </div>}
  </div>;
}
