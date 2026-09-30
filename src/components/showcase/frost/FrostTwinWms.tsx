"use client";

import { useMemo, useState } from "react";
import { Boxes, ChevronRight, CircleAlert, ClipboardCheck, LayoutDashboard, Move3d, QrCode, Search, Snowflake, Thermometer, Warehouse } from "lucide-react";
import { makePallets, roomActivity, weeklyActivity, type Pallet, type WarehouseType } from "./frostData";
import { RackBoard } from "./RackBoard";
import { TwinScene } from "./TwinScene";
import { QrCenter } from "./QrCenter";

type View = "overview" | "rack" | "twin" | "operations";
const activityTone: Record<(typeof roomActivity)[number], string> = { "no operation": "is-idle", receiving: "is-receiving", relocation: "is-relocation", withdrawal: "is-withdrawal", issue: "is-issue" };

function Overview({ warehouse, onWarehouse, onRoom }: { warehouse: WarehouseType; onWarehouse: (type: WarehouseType) => void; onRoom: (room: number) => void }) {
  const pallets = useMemo(() => makePallets(1, warehouse), [warehouse]);
  const loaded = pallets.filter((pallet) => pallet.status !== "empty").length;
  const blocked = pallets.filter((pallet) => pallet.status === "low").length;
  return <div className="frost-overview">
    <div className="frost-overview__heading"><div><span>TWIN WMS · WAREHOUSE HOME</span><h2>Warehouse overview</h2><p>Start with live room activity, then open the rack board for an exact pallet location.</p></div><div className="frost-type-switch"><button type="button" className={warehouse === "cold" ? "is-active" : ""} onClick={() => onWarehouse("cold")}><Snowflake size={14} />Cold Storage</button><button type="button" className={warehouse === "dry" ? "is-active" : ""} onClick={() => onWarehouse("dry")}><Warehouse size={14} />Dry Warehouse</button></div></div>
    <div className="frost-kpis">{[
      ["Temperature", warehouse === "cold" ? "−18°C" : "24°C", <Thermometer key="temperature" size={17} />],
      ["Occupancy", "78%", <Boxes key="occupancy" size={17} />],
      ["Total pallets", String(pallets.length), <Warehouse key="total" size={17} />],
      ["Available", String(loaded), <ClipboardCheck key="available" size={17} />],
      ["Reserved", "126", <Move3d key="reserved" size={17} />],
      ["Blocked", String(blocked), <CircleAlert key="blocked" size={17} />],
    ].map(([label, value, icon]) => <article key={String(label)}><div>{icon}<span>{label}</span></div><strong>{value}</strong><small>Room 1 mock data</small></article>)}</div>
    <div className="frost-overview-grid">
      <section className="frost-room-section"><div className="frost-section-head"><div><span>ROOMS 1–10</span><h3>Live room activity</h3></div><small>Click a room to open its 2D rack board</small></div><div className="frost-room-grid">{roomActivity.map((activity, index) => <button type="button" key={index} onClick={() => onRoom(index + 1)}><span className={activityTone[activity]} /><div><strong>Room {index + 1}</strong><small>{warehouse === "cold" ? "Cold Storage" : "Dry Warehouse"}</small></div><em>{activity}</em><ChevronRight size={15} /></button>)}</div></section>
      <section className="frost-chart"><div className="frost-section-head"><div><span>7 DAY ACTIVITY</span><h3>Room movements</h3></div><strong>458</strong></div><div className="frost-bars">{weeklyActivity.map((value, index) => <div key={index} title={`${value} movements`}><span style={{ height: `${value}%` }} /><small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small></div>)}</div><div className="frost-chart-foot"><span><i className="is-receiving" />Receiving 42%</span><span><i className="is-withdrawal" />Withdrawal 34%</span><span><i className="is-relocation" />Relocation 24%</span></div></section>
    </div>
  </div>;
}

function MockOperations({ pallets, onOpen }: { pallets: Pallet[]; onOpen: (pallet: Pallet) => void }) {
  const candidates = pallets.filter((pallet) => pallet.quantity > 0).slice(0, 8);
  const [selected, setSelected] = useState<string[]>(candidates.slice(0, 4).map((item) => item.id));
  const [quantity, setQuantity] = useState(180);
  const [message, setMessage] = useState("Select pallets, then calculate a front-end-only withdrawal plan.");
  const [fromRoom, setFromRoom] = useState("Room 1");
  const [toRoom, setToRoom] = useState("Room 2");
  const [wing, setWing] = useState("Left wing");
  const calculate = () => {
    let remaining = quantity;
    const plan = candidates.filter((item) => selected.includes(item.id)).map((item) => { const take = Math.min(item.quantity, remaining); remaining -= take; return `${item.id}: ${take}`; }).filter((line) => !line.endsWith(": 0"));
    setMessage(`${plan.join(" · ")}${remaining > 0 ? ` · ${remaining} boxes remain unallocated` : " · request fully allocated"}`);
  };
  const drop = (destination: Pallet) => setMessage(`Mock swap ready: ${fromRoom} pallet → ${toRoom}, ${wing}, ${destination.id}. Existing pallet retained until confirmation.`);
  return <div className="frost-operations">
    <header><span>MOCK OPERATIONS</span><h2>Withdrawal and relocation</h2><p>All interactions remain in browser memory and reset when the demo reloads.</p></header>
    <div className="frost-operation-grid"><section><div className="frost-section-head"><div><span>WITHDRAWAL</span><h3>Selected pallets</h3></div><small>{selected.length} selected</small></div><div className="frost-pallet-table">{candidates.map((pallet) => <label key={pallet.id}><input type="checkbox" checked={selected.includes(pallet.id)} onChange={() => setSelected((current) => current.includes(pallet.id) ? current.filter((id) => id !== pallet.id) : [...current, pallet.id])} /><button type="button" onClick={() => onOpen(pallet)}>{pallet.id}</button><span>{pallet.item}</span><b>{pallet.quantity} boxes</b></label>)}</div><div className="frost-withdraw-actions"><label>Custom quantity<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label><button type="button" className="frost-primary" onClick={calculate}>Withdraw All Selected</button></div></section>
      <section><div className="frost-section-head"><div><span>RELOCATION</span><h3>Drag to destination</h3></div><small>Mock swap enabled</small></div><div className="frost-relocation-controls"><label>From<select value={fromRoom} onChange={(event) => setFromRoom(event.target.value)}>{Array.from({ length: 10 }, (_, i) => <option key={i}>Room {i + 1}</option>)}</select></label><label>To<select value={toRoom} onChange={(event) => setToRoom(event.target.value)}>{Array.from({ length: 10 }, (_, i) => <option key={i}>Room {i + 1}</option>)}</select></label><label>Wing<select value={wing} onChange={(event) => setWing(event.target.value)}><option>Left wing</option><option>Right wing</option></select></label></div><div className="frost-drag-row"><div draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", candidates[0].id)}><Move3d size={16} /><strong>{candidates[0].id}</strong><small>Drag this pallet</small></div><ChevronRight size={18} /><div className="is-destination" onDragOver={(event) => event.preventDefault()} onDrop={() => drop(candidates[5])}><Boxes size={16} /><strong>{candidates[5].id}</strong><small>Drop to mock swap</small></div></div></section>
    </div><div className="frost-operation-message">{message}</div>
  </div>;
}

export function FrostTwinWms() {
  const [view, setView] = useState<View>("overview");
  const [warehouse, setWarehouse] = useState<WarehouseType>("cold");
  const [room, setRoom] = useState(1);
  const [selected, setSelected] = useState<Pallet | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const pallets = useMemo(() => makePallets(room, warehouse), [room, warehouse]);
  const openRoom = (nextRoom: number) => { setRoom(nextRoom); setSelected(null); setView("rack"); };
  const openLocation = (pallet: Pallet) => { setRoom(pallet.room); setSelected(pallet); setQrOpen(false); setView("rack"); };
  return <div className="frost-app">
    <aside className="frost-sidebar"><div className="frost-logo"><span><Snowflake size={18} /></span><div><strong>TWIN</strong><small>WAREHOUSE WMS</small></div></div><nav>{[
      ["overview", "Overview", LayoutDashboard], ["rack", "2D Rack Board", Boxes], ["twin", "3D Twin", Move3d], ["operations", "Mock Operations", ClipboardCheck],
    ].map(([id, label, Icon]) => <button type="button" key={String(id)} className={view === id ? "is-active" : ""} onClick={() => setView(id as View)}><Icon size={16} />{String(label)}</button>)}<button type="button" onClick={() => setQrOpen(true)}><QrCode size={16} />QR Center</button></nav><div className="frost-sidebar__foot"><span className="is-online" />Prototype online<small>Mock data only</small></div></aside>
    <main className="frost-main"><header className="frost-topbar"><div><span>{warehouse === "cold" ? "COLD STORAGE" : "DRY WAREHOUSE"}</span><strong>{view === "overview" ? "All rooms" : `Room ${room}`}</strong></div><label className="frost-top-search"><Search size={14} /><input placeholder="Search warehouse" /></label><button type="button" onClick={() => setQrOpen(true)}><QrCode size={15} />Scan pallet</button><div className="frost-user">IP</div></header>
      <div className="frost-content">{view === "overview" && <Overview warehouse={warehouse} onWarehouse={setWarehouse} onRoom={openRoom} />}{view === "rack" && <RackBoard pallets={pallets} selected={selected} onSelect={setSelected} onOpenTwin={() => setView("twin")} />}{view === "twin" && <TwinScene warehouse={warehouse} />}{view === "operations" && <MockOperations pallets={pallets} onOpen={openLocation} />}</div>
    </main>
    {qrOpen && <QrCenter pallets={pallets} onClose={() => setQrOpen(false)} onOpenLocation={openLocation} />}
  </div>;
}
