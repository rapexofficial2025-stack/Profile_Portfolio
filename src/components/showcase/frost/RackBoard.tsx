"use client";

import { useMemo, useState } from "react";
import { Box, Search, X } from "lucide-react";
import { depths, levels, palletTone, requestHistory, type Pallet, type WingFilter } from "./frostData";

type RackBoardProps = {
  pallets: Pallet[];
  selected: Pallet | null;
  onSelect: (pallet: Pallet) => void;
  onOpenTwin: () => void;
  initialSearch?: string;
};

export function RackBoard({ pallets, selected, onSelect, onOpenTwin, initialSearch = "" }: RackBoardProps) {
  const [query, setQuery] = useState(initialSearch);
  const [wing, setWing] = useState<WingFilter>("full");
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => new Set(pallets.filter((pallet) => !normalized || [pallet.id, pallet.tag, pallet.item, pallet.batch].some((value) => value.toLowerCase().includes(normalized))).map((pallet) => pallet.id)), [normalized, pallets]);
  const columns = wing === "left" ? Array.from({ length: 15 }, (_, i) => i + 1) : wing === "right" ? Array.from({ length: 15 }, (_, i) => i + 16) : Array.from({ length: 30 }, (_, i) => i + 1);

  return <div className="frost-board-screen">
    <div className="frost-board-intro"><div><span>TWIN WMS · RACK DETAILS</span><h2>Room 1 location board</h2><p>Every cell is one pallet position. Select it to see the exact inventory record.</p></div><small>30 columns · 840 locations</small></div>
    <div className="frost-toolbar">
      <label className="frost-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, batch, pallet tag or location" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={13} /></button>}</label>
      <div className="frost-segment" aria-label="Rack wing filter">{(["full", "left", "right"] as WingFilter[]).map((option) => <button type="button" key={option} className={wing === option ? "is-active" : ""} onClick={() => setWing(option)}>{option === "full" ? "Full room" : `${option} wing`}</button>)}</div>
      <button type="button" className="frost-primary" onClick={onOpenTwin}><Box size={14} /> Open 3D Twin</button>
    </div>

    <div className="frost-legend"><span><i className="frost-cell--loaded" />60–100%</span><span><i className="frost-cell--partial" />20–59%</span><span><i className="frost-cell--low" />1–19%</span><span><i className="frost-cell--empty" />Empty</span><span><i className="is-selected" />Selected</span></div>

    <div className="frost-board-wrap">
      <div className="frost-board-scroll">
        <div className="frost-rack-board">
          {columns.map((column) => <div key={column} className={`frost-rack-column ${column === 16 && wing === "full" ? "has-driveway" : ""}`}>
            <div className="frost-column-label"><span>CO{column}</span><small>{column <= 15 ? "LEFT" : "RIGHT"}</small></div>
            <div className="frost-level-stack">{levels.map((level) => <div key={level} className="frost-level-row" title={`Column ${column}, Layer ${level}`}><b>{level}</b><div className="frost-depth-row">{(column <= 15 ? [...depths].reverse() : depths).map((depth) => {
              const pallet = pallets.find((item) => item.column === column && item.level === level && item.depth === depth)!;
              const visible = matches.has(pallet.id);
              return <button key={depth} type="button" title={`${pallet.id} · ${pallet.item} · ${pallet.fill}%`} onClick={() => onSelect(pallet)} className={`frost-pallet-cell ${palletTone(pallet.status)} ${selected?.id === pallet.id ? "is-selected" : ""} ${visible ? "" : "is-dimmed"}`}><span>{depth}</span></button>;
            })}</div></div>)}</div>
          </div>)}
        </div>
      </div>

      <aside className="frost-detail" aria-live="polite">
        {selected ? <><div className="frost-detail__head"><div><span>SELECTED LOCATION</span><h4>{selected.id}</h4></div><span className={`frost-status ${palletTone(selected.status)}`}>{selected.fill}%</span></div>
          <div className="frost-fill-meter" aria-label={`${selected.fill}% load`}><span style={{ width: `${selected.fill}%` }} /><small>{selected.fill}% load</small></div>
          <dl className="frost-detail-grid">
            <div><dt>Pallet Tag Number</dt><dd>{selected.tag}</dd></div><div><dt>Item Name</dt><dd>{selected.item}</dd></div><div className="is-wide"><dt>Description</dt><dd>{selected.description}</dd></div><div><dt>Customer</dt><dd>{selected.customer}</dd></div><div><dt>Batch Number</dt><dd>{selected.batch}</dd></div><div><dt>Production Date</dt><dd>{selected.productionDate}</dd></div><div><dt>Expiration Date</dt><dd>{selected.expirationDate}</dd></div><div><dt>Date Received</dt><dd>{selected.receivedDate}</dd></div><div><dt>Quantity</dt><dd>{selected.quantity} boxes</dd></div><div><dt>Weight</dt><dd>{selected.weight} kg</dd></div><div><dt>Status</dt><dd>{selected.status}</dd></div>
          </dl>
          <div className="frost-history"><h5>PULL-OUT REQUEST HISTORY</h5>{requestHistory.map((row) => <div key={row.id}><span>{row.id}<small>{row.date}</small></span><b>{row.quantity} boxes</b><em>{row.status}</em></div>)}</div>
        </> : <div className="frost-detail__empty"><Box size={26} /><h4>Select a pallet location</h4><p>Click one exact cell to inspect its rack, inventory and pull-out history.</p></div>}
      </aside>
    </div>
    <p className="frost-board-note">ROOM 1 · 30 DRIVE-IN COLUMNS · 7 LEVELS (A–G) · 4 DEPTHS · 8 METER CENTER DRIVEWAY</p>
  </div>;
}
