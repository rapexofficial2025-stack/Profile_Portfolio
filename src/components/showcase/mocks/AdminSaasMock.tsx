"use client";

import { useState } from "react";
import { Bike, LayoutDashboard, Package, Store } from "lucide-react";

type Status = "Pending" | "Delivering" | "Delivered";
const tabs = [{ id: "overview", label: "Overview", icon: LayoutDashboard }, { id: "orders", label: "Orders", icon: Package }, { id: "merchants", label: "Merchants", icon: Store }, { id: "riders", label: "Riders", icon: Bike }] as const;
type Tab = (typeof tabs)[number]["id"];

const kpis = [["Orders today", "1,284", "+12%"], ["Revenue", "₱86.4k", "+8%"], ["Active riders", "142", "+5"], ["Avg. delivery", "27 min", "-3 min"]];
const week = [["Mon", 62], ["Tue", 74], ["Wed", 58], ["Thu", 88], ["Fri", 96], ["Sat", 80], ["Sun", 70]] as const;
const orders: { id: string; merchant: string; rider: string; total: string; status: Status }[] = [
  { id: "RX-10421", merchant: "Kape Kawit", rider: "J. Santos", total: "₱420", status: "Delivering" },
  { id: "RX-10420", merchant: "Lola's Kitchen", rider: "M. Reyes", total: "₱1,150", status: "Pending" },
  { id: "RX-10419", merchant: "Fresh Mart", rider: "A. Cruz", total: "₱2,380", status: "Delivered" },
  { id: "RX-10418", merchant: "Pizza Bay", rider: "R. Lim", total: "₱690", status: "Delivering" },
  { id: "RX-10417", merchant: "Kape Kawit", rider: "J. Santos", total: "₱310", status: "Delivered" },
  { id: "RX-10416", merchant: "Bento Box", rider: "—", total: "₱540", status: "Pending" },
];
const statusTone: Record<Status, string> = { Pending: "bg-amber-400/15 text-amber-300", Delivering: "bg-sky-400/15 text-sky-300", Delivered: "bg-emerald-400/15 text-emerald-300" };

function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle} className={`relative h-5 w-9 shrink-0 rounded-full transition ${on ? "bg-emerald-500" : "bg-zinc-600"}`}><span className={`absolute top-0.5 size-4 rounded-full bg-zinc-50 transition-all ${on ? "left-[1.1rem]" : "left-0.5"}`} /></button>;
}

export function AdminSaasMock() {
  const [tab, setTab] = useState<Tab>("overview");
  const [filter, setFilter] = useState<Status | "All">("All");
  const [merchants, setMerchants] = useState([["Kape Kawit", true], ["Lola's Kitchen", true], ["Fresh Mart", false], ["Pizza Bay", true], ["Bento Box", true], ["Tea Tree", false]] as [string, boolean][]);
  const [riders, setRiders] = useState([["J. Santos", true, 14], ["M. Reyes", true, 9], ["A. Cruz", false, 0], ["R. Lim", true, 11]] as [string, boolean, number][]);
  const shown = orders.filter((order) => filter === "All" || order.status === filter);

  const orderList = <div className="rounded-xl border border-zinc-800 bg-zinc-900/60">
    <div className="flex flex-wrap gap-1.5 border-b border-zinc-800 p-3">{(["All", "Pending", "Delivering", "Delivered"] as const).map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${filter === status ? "bg-indigo-500 text-zinc-50" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>{status}</button>)}</div>
    <div className="divide-y divide-zinc-800">{shown.map((order) => <div key={order.id} className="grid grid-cols-2 gap-1 px-4 py-3 text-xs @2xl:grid-cols-5 @2xl:items-center">
      <span className="font-semibold text-zinc-100">{order.id}</span>
      <span className="justify-self-end @2xl:justify-self-auto @2xl:order-last"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusTone[order.status]}`}>{order.status}</span></span>
      <span className="text-zinc-400">{order.merchant}</span>
      <span className="hidden text-zinc-400 @2xl:block">{order.rider}</span>
      <span className="justify-self-end font-semibold text-zinc-200 @2xl:justify-self-auto">{order.total}</span>
    </div>)}{shown.length === 0 && <p className="px-4 py-6 text-center text-xs text-zinc-500">No orders with this status</p>}</div>
  </div>;

  return <div className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-200 @2xl:flex-row">
    <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-zinc-800 bg-zinc-900 p-2 @2xl:w-48 @2xl:flex-col @2xl:border-b-0 @2xl:border-r @2xl:p-4">
      <p className="mb-4 hidden text-sm font-black tracking-[0.2em] text-indigo-300 @2xl:block">RAPEX<span className="text-zinc-500"> admin</span></p>
      {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${tab === id ? "bg-indigo-500/20 text-indigo-200" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`}><Icon size={15} />{label}</button>)}
    </div>
    <main className="flex-1 space-y-4 p-4 @2xl:p-6">
      <header className="flex items-center justify-between"><div><h3 className="text-lg font-bold text-zinc-50">{tabs.find((item) => item.id === tab)?.label}</h3><p className="text-[11px] text-zinc-500">Kawit, Cavite · live</p></div><span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />Online</span></header>
      {tab === "overview" && <>
        <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4">{kpis.map(([label, value, change]) => <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p><p className="mt-1 text-xl font-bold text-zinc-50">{value}</p><p className="text-[10px] font-semibold text-emerald-400">{change}</p></div>)}</div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><p className="mb-3 text-xs font-semibold text-zinc-300">Orders this week</p><div className="flex h-36 items-end gap-2">{week.map(([day, value]) => <div key={day} className="group flex flex-1 flex-col items-center gap-1.5" title={`${day}: ${value * 14} orders`}><span className="text-[9px] text-zinc-500 opacity-0 transition group-hover:opacity-100">{value * 14}</span><div className="w-full rounded-t-md bg-linear-to-t from-indigo-600 to-violet-400 transition group-hover:from-indigo-400 group-hover:to-fuchsia-300" style={{ height: `${Math.round(value * 1.1)}px` }} /><span className="text-[10px] text-zinc-500">{day}</span></div>)}</div></div>
        {orderList}
      </>}
      {tab === "orders" && orderList}
      {tab === "merchants" && <div className="grid gap-3 @xl:grid-cols-2 @3xl:grid-cols-3">{merchants.map(([name, on], index) => <div key={name} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><div><p className="text-sm font-semibold text-zinc-100">{name}</p><p className={`text-[11px] ${on ? "text-emerald-400" : "text-zinc-500"}`}>{on ? "Accepting orders" : "Paused"}</p></div><Switch on={on} label={`${name} accepting orders`} onToggle={() => setMerchants((list) => list.map((item, i) => i === index ? [item[0], !item[1]] : item))} /></div>)}</div>}
      {tab === "riders" && <div className="space-y-2">{riders.map(([name, on, trips], index) => <div key={name} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><span className={`size-2.5 rounded-full ${on ? "bg-emerald-400" : "bg-zinc-600"}`} /><div className="flex-1"><p className="text-sm font-semibold text-zinc-100">{name}</p><p className="text-[11px] text-zinc-500">{trips} trips today</p></div><Switch on={on} label={`${name} online`} onToggle={() => setRiders((list) => list.map((item, i) => i === index ? [item[0], !item[1], item[2]] : item))} /></div>)}</div>}
    </main>
  </div>;
}
