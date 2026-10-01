"use client";

import { useState } from "react";
import { ArrowRight, ArrowRightLeft, Check, CheckCircle2, Clock3, CreditCard, Home, Package, ReceiptText, ShoppingBag, Store, UserRound, WalletCards } from "lucide-react";

type OrderStep = 0 | 1 | 2 | 3 | 4;

const companyName = "COMPANY NAME";
const flowLabels = ["Order sent", "Order confirmed", "Payment sent", "Payment confirmed", "Completed"];
const demoStages = ["Create order", "Merchant review", "Customer payment", "Verify payment", "Complete"];

function PhoneFrame({ role, accent, children }: { role: string; accent: "violet" | "orange"; children: React.ReactNode }) {
  return <div className="min-w-0">
    <div className="mb-3 text-center"><p className={`text-[9px] font-black uppercase tracking-[0.24em] ${accent === "violet" ? "text-violet-300" : "text-orange-300"}`}>{role}</p><p className="mt-1 text-[8px] text-white/35">Android mobile application</p></div>
    <div className={`relative mx-auto aspect-9/19 w-full max-w-64 overflow-hidden rounded-4xl border-[5px] bg-[#0b0d16] shadow-[0_26px_60px_rgba(0,0,0,0.48)] ${accent === "violet" ? "border-[#26213d]" : "border-[#3a2922]"}`}>
      <div className="absolute left-1/2 top-1.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-[#05060a]" />
      <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between px-4 text-[7px] font-semibold text-white/55"><span>9:41</span><span>5G&nbsp;&nbsp;▰</span></div>
      <div className="h-full overflow-hidden pt-7">{children}</div>
    </div>
  </div>;
}

function AppHeader({ merchant = false }: { merchant?: boolean }) {
  return <header className="flex items-center justify-between border-b border-white/7 bg-[#111420]/92 px-3 py-2.5"><div className="flex min-w-0 items-center gap-2"><span className={`flex size-7 shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${merchant ? "bg-linear-to-br from-orange-400 to-rose-500" : "bg-linear-to-br from-violet-500 to-cyan-400"}`}>{merchant ? <Store size={13} /> : <ShoppingBag size={13} />}</span><div className="min-w-0"><p className="truncate text-[8px] font-black text-white">{companyName}</p><p className="text-[5px] font-semibold uppercase tracking-[0.16em] text-white/35">{merchant ? "Merchant" : "Customer"}</p></div></div><span className="flex size-7 items-center justify-center rounded-full bg-white/6 text-white/55"><UserRound size={12} /></span></header>;
}

function ProgressPills({ step, accent }: { step: OrderStep; accent: "violet" | "orange" }) {
  return <div className="flex gap-1.5 px-3 pt-3" aria-label={`Order progress: ${flowLabels[step]}`}>{flowLabels.map((label, index) => <span key={label} title={label} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${index <= step ? accent === "violet" ? "bg-violet-400" : "bg-orange-400" : "bg-white/8"}`} />)}</div>;
}

function StatusCard({ step, merchant = false }: { step: OrderStep; merchant?: boolean }) {
  const customerCopy = [["Ready to order", "Review the item and send your order to the merchant."], ["Waiting for merchant", "Your order was sent. The store is reviewing availability."], ["Order confirmed", "The merchant accepted your order. Payment is now available."], ["Payment checking", "Your payment was sent securely for merchant confirmation."], ["Order complete", "Payment is confirmed. Your order is ready for fulfillment."]];
  const merchantCopy = [["Standing by", "A new customer order will appear here in real time."], ["New order received", "Check the product and confirm that it is available."], ["Awaiting payment", "The customer can now complete the secure payment."], ["Payment received", "Review the payment and confirm this transaction."], ["Transaction complete", "Customer and merchant records are synchronized."]];
  const [title, copy] = (merchant ? merchantCopy : customerCopy)[step];
  const complete = step === 4;
  return <div className={`mx-3 mt-3 rounded-2xl border p-3 ${complete ? "border-emerald-400/25 bg-emerald-400/8" : merchant ? "border-orange-300/15 bg-orange-300/6" : "border-violet-300/15 bg-violet-400/7"}`}><div className="flex items-start gap-2.5"><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${complete ? "bg-emerald-400/15 text-emerald-300" : merchant ? "bg-orange-400/15 text-orange-300" : "bg-violet-400/15 text-violet-300"}`}>{complete ? <CheckCircle2 size={16} /> : step === 0 ? <ShoppingBag size={15} /> : <Clock3 size={15} />}</span><div><p className="text-[9px] font-black text-white">{title}</p><p className="mt-1 text-[6px] leading-3 text-white/42">{copy}</p></div></div></div>;
}

function OrderDetails({ step, merchant = false }: { step: OrderStep; merchant?: boolean }) {
  const paymentStage = step >= 2;
  return <div className="mx-3 mt-3 rounded-2xl border border-white/7 bg-white/3 p-3 transition-all duration-500"><div className="flex items-center gap-2.5"><span className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${step === 4 ? "bg-emerald-400/14 text-emerald-300" : merchant ? "bg-orange-400/12 text-orange-300" : "bg-violet-400/12 text-violet-300"}`}>{paymentStage ? <CreditCard size={19} /> : <Package size={19} />}</span><div className="min-w-0 flex-1"><p className="truncate text-[8px] font-bold text-white">{paymentStage ? "Secure Checkout" : "Premium Product"}</p><p className="mt-1 text-[6px] text-white/35">{paymentStage ? step === 4 ? "Paid · Receipt #PAY-2048" : "GCash ·•••• 2048" : "Variant · Standard  ×1"}</p></div><p className="text-[9px] font-black text-white">₱1,499</p></div><div className="my-2.5 h-px bg-white/7" /><div className="flex items-center justify-between text-[6px] text-white/40"><span>Order #CN-2048</span><span className={step === 4 ? "font-bold text-emerald-300" : ""}>{step === 4 ? "Payment complete" : "Delivery ₱99"}</span></div><div className="mt-1.5 flex items-center justify-between"><span className="text-[7px] font-semibold text-white/55">{paymentStage ? "Amount due" : "Total"}</span><span className="text-[11px] font-black text-white">₱1,598</span></div></div>;
}

function Timeline({ step, merchant = false }: { step: OrderStep; merchant?: boolean }) {
  const items = merchant ? ["Order request", "Stock confirmed", "Payment received", "Payment verified", "Ready to fulfill"] : ["Order submitted", "Merchant accepted", "Payment submitted", "Payment verified", "Order completed"];
  return <div className="mx-3 mt-3 rounded-2xl border border-white/7 bg-[#111420] p-3"><p className="mb-2 text-[6px] font-black uppercase tracking-[0.18em] text-white/35">Live activity</p><div className="space-y-1.5">{items.map((item, index) => <div key={item} className="flex items-center gap-2"><span className={`flex size-3.5 items-center justify-center rounded-full ${index <= step ? "bg-emerald-400 text-[#07130e]" : "border border-white/12 text-transparent"}`}>{index <= step ? <Check size={8} strokeWidth={3} /> : null}</span><span className={`text-[6px] ${index <= step ? "text-white/72" : "text-white/23"}`}>{item}</span></div>)}</div></div>;
}

function PhoneAction({ step, merchant, setStep }: { step: OrderStep; merchant: boolean; setStep: (step: OrderStep) => void }) {
  const customerAction = step === 0 ? { label: "Place order", next: 1 as OrderStep, icon: ShoppingBag } : step === 2 ? { label: "Pay ₱1,598", next: 3 as OrderStep, icon: CreditCard } : null;
  const merchantAction = step === 1 ? { label: "Confirm order", next: 2 as OrderStep, icon: ReceiptText } : step === 3 ? { label: "Confirm payment", next: 4 as OrderStep, icon: WalletCards } : null;
  const action = merchant ? merchantAction : customerAction;
  if (step === 4) return <button type="button" onClick={() => setStep(0)} className="mx-3 mb-3 mt-auto flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-400 text-[7px] font-black uppercase tracking-[0.12em] text-[#06120d] shadow-[0_10px_24px_rgba(52,211,153,0.22)]"><CheckCircle2 size={13} /> Start new order</button>;
  if (!action) return <div className="mx-3 mb-3 mt-auto flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/7 bg-white/3 px-2 text-center text-[6px] font-semibold text-white/35"><Clock3 size={11} /> Waiting for {merchant ? "customer action" : "merchant response"}</div>;
  const Icon = action.icon;
  return <button type="button" onClick={() => setStep(action.next)} className={`mx-3 mb-3 mt-auto flex min-h-10 items-center justify-center gap-2 rounded-xl text-[7px] font-black uppercase tracking-[0.12em] text-white transition active:scale-[0.98] ${merchant ? "bg-linear-to-r from-orange-500 to-rose-500 shadow-[0_10px_24px_rgba(249,115,22,0.24)]" : "bg-linear-to-r from-violet-600 to-indigo-500 shadow-[0_10px_24px_rgba(124,58,237,0.28)]"}`}><Icon size={13} /> {action.label} <ArrowRight size={11} /></button>;
}

function CustomerPhone({ step, setStep }: { step: OrderStep; setStep: (step: OrderStep) => void }) {
  return <PhoneFrame role="Customer · Left" accent="violet"><div className="flex h-full flex-col bg-[radial-gradient(circle_at_20%_12%,rgba(124,58,237,0.14),transparent_32%),#0b0d16] text-white"><AppHeader /><ProgressPills step={step} accent="violet" /><StatusCard step={step} /><OrderDetails step={step} /><Timeline step={step} /><PhoneAction step={step} merchant={false} setStep={setStep} /><nav className="flex h-9 shrink-0 items-center justify-around border-t border-white/7 bg-[#10131d] text-white/28"><Home size={12} /><ShoppingBag size={12} className="text-violet-300" /><ReceiptText size={12} /><UserRound size={12} /></nav></div></PhoneFrame>;
}

function MerchantPhone({ step, setStep }: { step: OrderStep; setStep: (step: OrderStep) => void }) {
  return <PhoneFrame role="Merchant · Right" accent="orange"><div className="flex h-full flex-col bg-[radial-gradient(circle_at_80%_12%,rgba(249,115,22,0.13),transparent_32%),#0b0d16] text-white"><AppHeader merchant /><ProgressPills step={step} accent="orange" /><StatusCard step={step} merchant /><OrderDetails step={step} merchant /><Timeline step={step} merchant /><PhoneAction step={step} merchant setStep={setStep} /><nav className="flex h-9 shrink-0 items-center justify-around border-t border-white/7 bg-[#10131d] text-white/28"><Home size={12} /><Store size={12} className="text-orange-300" /><ReceiptText size={12} /><UserRound size={12} /></nav></div></PhoneFrame>;
}

function SyncBridge({ step }: { step: OrderStep }) {
  return <div className="flex min-w-12 flex-col items-center justify-center gap-3 self-center"><span className="flex size-10 items-center justify-center rounded-full border border-violet-300/20 bg-[#141326] text-violet-200 shadow-[0_0_28px_rgba(124,58,237,0.25)]"><ArrowRightLeft size={17} /></span><div className="relative h-36 w-px overflow-hidden bg-linear-to-b from-violet-400/10 via-white/25 to-orange-400/10"><span className="absolute left-1/2 top-0 h-8 w-1 -translate-x-1/2 animate-pulse rounded-full bg-linear-to-b from-violet-400 via-white to-orange-400" /></div><div className="w-16 text-center"><p className="text-[6px] font-black uppercase tracking-[0.16em] text-white/50">Synced</p><p className="mt-1 text-[6px] leading-3 text-white/28">{flowLabels[step]}</p></div></div>;
}

export function EcommerceUiPreview() {
  const [step, setStep] = useState<OrderStep>(0);
  return <div className="showcase-screen overflow-x-auto rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.14),transparent_40%),#080a11] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.35)]" aria-label={`${companyName} synchronized React Native customer and merchant order flow`}><div className="min-w-180"><header className="flex items-center justify-between border-b border-white/8 bg-[#11131d]/92 px-5 py-3"><div><p className="text-[7px] font-black tracking-[0.2em] text-white/72">{companyName} · REACT NATIVE COMMERCE</p><p className="mt-1 text-[6px] text-white/28">Customer and merchant synchronized transaction flow</p></div><span className="rounded-full border border-emerald-400/15 bg-emerald-400/8 px-2.5 py-1 text-[6px] font-bold tracking-[0.14em] text-emerald-300">LIVE SYNC</span></header><div className="border-b border-white/7 bg-black/20 px-6 py-4"><div className="mx-auto max-w-5xl"><div className="mb-3 flex items-center justify-between"><div><p className="text-[7px] font-black uppercase tracking-[0.2em] text-white/70">Interactive order system</p><p className="mt-1 text-[6px] text-white/32">Click a stage or use the active phone button to continue the transaction.</p></div><span className="rounded-lg border border-violet-300/20 bg-violet-400/8 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.14em] text-violet-200">Step {step + 1} / 5</span></div><div role="tablist" aria-label="Transaction demo stages" className="grid grid-cols-5 gap-2">{demoStages.map((label, index) => <button key={label} type="button" role="tab" aria-selected={step === index} onClick={() => setStep(index as OrderStep)} className={`min-h-10 rounded-xl border px-2 py-2 text-[6px] font-black uppercase tracking-[0.1em] transition-all ${step === index ? "translate-y-px border-violet-300/55 bg-linear-to-br from-violet-500/30 to-orange-400/15 text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.45),0_0_18px_rgba(124,58,237,0.2)]" : index < step ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-200" : "border-white/8 bg-white/3 text-white/38 hover:border-white/20 hover:text-white/75"}`}><span className="mr-1.5">{index < step ? "✓" : index + 1}</span>{label}</button>)}</div></div></div><div className="mx-auto grid max-w-5xl grid-cols-[minmax(19rem,1fr)_5.5rem_minmax(19rem,1fr)] items-center gap-6 px-6 py-7 sm:px-8"><div className="rounded-[1.75rem] border border-violet-300/15 bg-violet-400/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_45px_rgba(31,20,60,0.28)]"><CustomerPhone step={step} setStep={setStep} /></div><SyncBridge step={step} /><div className="rounded-[1.75rem] border border-orange-300/15 bg-orange-400/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_45px_rgba(70,30,12,0.24)]"><MerchantPhone step={step} setStep={setStep} /></div></div></div></div>;
}
