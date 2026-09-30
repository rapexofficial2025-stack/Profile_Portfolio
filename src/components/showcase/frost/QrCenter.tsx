"use client";

import { useMemo, useState } from "react";
import { Camera, CheckCircle2, QrCode, Search, X } from "lucide-react";
import type { Pallet } from "./frostData";

function MockQr({ value }: { value: string }) {
  const cells = useMemo(() => Array.from({ length: 225 }, (_, index) => {
    const row = Math.floor(index / 15);
    const column = index % 15;
    const finder = (row < 5 && column < 5) || (row < 5 && column > 9) || (row > 9 && column < 5);
    const code = value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return finder || ((index * 17 + code + row * 7) % 5 < 2);
  }), [value]);
  return <div className="frost-qr-code" aria-label={`Mock QR for ${value}`}>{cells.map((on, index) => <i key={index} className={on ? "is-on" : ""} />)}</div>;
}

export function QrCenter({ pallets, onClose, onOpenLocation }: { pallets: Pallet[]; onClose: () => void; onOpenLocation: (pallet: Pallet) => void }) {
  const [input, setInput] = useState(pallets[0]?.tag ?? "");
  const [result, setResult] = useState<Pallet | null>(pallets[0] ?? null);
  const [scanning, setScanning] = useState(false);
  const find = () => {
    const normalized = input.trim().toLowerCase();
    setResult(pallets.find((pallet) => pallet.tag.toLowerCase() === normalized || pallet.id.toLowerCase() === normalized) ?? null);
  };
  const simulateScan = () => {
    setScanning(true);
    window.setTimeout(() => { const pallet = pallets[137]; setInput(pallet.tag); setResult(pallet); setScanning(false); }, 650);
  };
  return <div className="frost-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="frost-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
      <header><div><span>FRONT-END SIMULATION</span><h3 id="qr-title"><QrCode size={19} /> QR Center</h3></div><button type="button" onClick={onClose} aria-label="Close QR Center"><X size={17} /></button></header>
      <div className="frost-qr-layout">
        <div className="frost-qr-generator"><h4>PALLET QR GENERATOR</h4><MockQr value={result?.tag ?? (input || "TWIN-WMS")} /><p>{result?.tag ?? "Enter a valid pallet tag"}</p></div>
        <div className="frost-scanner"><div className={scanning ? "is-scanning" : ""}><Camera size={35} /><span>{scanning ? "Reading mock label…" : "Simulated scanner panel"}</span><i /></div><button type="button" className="frost-secondary" onClick={simulateScan}>Simulate scan</button></div>
      </div>
      <div className="frost-manual"><label htmlFor="frost-tag">Manual QR / tag input</label><div><Search size={15} /><input id="frost-tag" value={input} onChange={(event) => setInput(event.target.value)} placeholder="TW-101A1-2455 or RM1-CO1-LA-D1" /><button type="button" onClick={find}>Find</button></div></div>
      <div className={`frost-scan-result ${result ? "is-found" : ""}`}>{result ? <><CheckCircle2 size={21} /><div><span>SCAN RESULT</span><strong>{result.id}</strong><p>{result.item} · {result.quantity} boxes · {result.status}</p></div><button type="button" onClick={() => onOpenLocation(result)}>Open location</button></> : <p>No pallet matches that mock QR or tag.</p>}</div>
      <p className="frost-modal-note">Simulation only. No camera, backend or external QR service is used.</p>
    </section>
  </div>;
}
