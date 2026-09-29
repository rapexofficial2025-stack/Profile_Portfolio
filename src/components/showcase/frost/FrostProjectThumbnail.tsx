import { Boxes, ThermometerSnowflake } from "lucide-react";

export function FrostProjectThumbnail() {
  return <div className="frost-thumb" aria-label="FROST TWIN WMS warehouse dashboard preview">
    <div className="frost-thumb__top"><span className="frost-thumb__brand"><ThermometerSnowflake size={15} /> FROST TWIN WMS</span><span>ROOM 01 · COLD</span></div>
    <div className="frost-thumb__layout">
      <div className="frost-thumb__side"><Boxes size={22} /><i /><i /><i /></div>
      <div className="frost-thumb__main">
        <div className="frost-thumb__stats"><span /><span /><span /></div>
        <div className="frost-thumb__racks">{Array.from({ length: 30 }, (_, index) => <i key={index} className={index % 7 === 0 ? "is-warn" : index % 4 === 0 ? "is-mid" : ""} />)}</div>
      </div>
    </div>
    <div className="frost-thumb__label"><strong>INTERACTIVE WAREHOUSE DIGITAL TWIN</strong><span>2D RACK BOARD · 3D TWIN · QR CENTER</span></div>
  </div>;
}
