import {
  BarChart3,
  Bell,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Heart,
  Home,
  LayoutDashboard,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
  UserRound,
} from "lucide-react";

type EcommerceView = "marketplace" | "merchant" | "admin" | "mobile" | "workflow" | "final";
const companyName = "COMPANY NAME";

const productSlots = [
  { label: "Product One", color: "from-violet-500/25 to-fuchsia-400/10" },
  { label: "Product Two", color: "from-orange-400/25 to-amber-300/10" },
  { label: "Product Three", color: "from-sky-400/25 to-cyan-300/10" },
  { label: "Product Four", color: "from-emerald-400/25 to-teal-300/10" },
];

function Brand() {
  return <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-orange-400 via-fuchsia-500 to-violet-600 text-[9px] font-black text-white shadow-lg shadow-violet-950/30">C</span><span className="font-black tracking-tight text-white">{companyName}</span><span className="hidden text-[7px] font-semibold tracking-[0.18em] text-white/35 sm:inline">DIGITAL COMMERCE</span></div>;
}

function ProductCard({ label, color }: { label: string; color: string }) {
  return <div className="overflow-hidden rounded-xl border border-white/8 bg-[#171928] shadow-lg shadow-black/20">
    <div className={`flex aspect-4/3 items-center justify-center bg-linear-to-br ${color}`}><div className="flex flex-col items-center gap-1.5 text-white/35"><Package size={22} strokeWidth={1.4} /><span className="text-[6px] font-bold tracking-[0.14em]">PRODUCT IMAGE</span></div></div>
    <div className="p-2"><p className="text-[8px] font-semibold text-white/85">{label}</p><div className="mt-1 flex items-center justify-between"><span className="text-[8px] font-black text-orange-300">₱0,000</span><span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[5px] text-violet-200">ADD</span></div></div>
  </div>;
}

function MarketplaceScreen({ final = false }: { final?: boolean }) {
  return <div className="flex min-h-full flex-col bg-[#0d0f19] text-white">
    <header className="flex items-center gap-3 border-b border-white/8 bg-[#121421] px-3 py-2.5"><Brand /><div className="mx-auto flex max-w-md flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[7px] text-white/35"><Search size={11} /><span>Search products, stores and services</span></div><Heart size={14} className="text-white/50" /><ShoppingCart size={14} className="text-orange-300" /><UserRound size={14} className="text-white/50" /></header>
    <div className="flex flex-1">
      <aside className="hidden w-28 shrink-0 border-r border-white/8 bg-[#10121d] p-2.5 sm:block"><p className="mb-2 text-[6px] font-bold tracking-[0.18em] text-white/25">SHOP CATEGORIES</p>{["Marketplace", "Food", "Wholesale", "Services", "Auctions"].map((item, index) => <div key={item} className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[7px] ${index === 0 ? "bg-violet-500/20 text-violet-200" : "text-white/45"}`}><span className="size-1.5 rounded-full bg-current" />{item}</div>)}</aside>
      <main className="min-w-0 flex-1 p-3">
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#5b21b6] via-[#7c3aed] to-[#ec4899] p-4 shadow-xl shadow-violet-950/30"><div className="relative z-10 max-w-[60%]"><p className="text-[6px] font-bold tracking-[0.2em] text-orange-200">{companyName} MARKETPLACE</p><h3 className={`${final ? "text-xl sm:text-2xl" : "text-base"} mt-1 font-black leading-tight`}>Everything you need.<br />Delivered your way.</h3><button type="button" className="mt-2 rounded-full bg-white px-3 py-1 text-[6px] font-black text-violet-700">SHOP NOW</button></div><ShoppingBag className="absolute -bottom-5 right-4 size-24 rotate-[-8deg] text-white/12" /></section>
        <div className="mt-3 flex items-center justify-between"><div><p className="text-[9px] font-bold">Featured for you</p><p className="text-[6px] text-white/35">Curated products from trusted stores</p></div><span className="flex items-center gap-1 text-[6px] font-semibold text-violet-300">VIEW ALL <ChevronRight size={9} /></span></div>
        <div className={`mt-2 grid gap-2 ${final ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 lg:grid-cols-4"}`}>{productSlots.map((product) => <ProductCard key={product.label} {...product} />)}</div>
      </main>
    </div>
  </div>;
}

function OperationsScreen({ admin = false }: { admin?: boolean }) {
  const cards = admin
    ? [{ icon: UserRound, label: "Customers", value: "00,000" }, { icon: Store, label: "Merchants", value: "0,000" }, { icon: Truck, label: "Riders", value: "0,000" }]
    : [{ icon: CircleDollarSign, label: "Revenue", value: "₱00,000" }, { icon: ShoppingBag, label: "Orders", value: "000" }, { icon: Boxes, label: "Products", value: "000" }];

  return <div className="min-h-full bg-[#0d0f19] text-white"><header className="flex items-center justify-between border-b border-white/8 bg-[#121421] px-3 py-2.5"><Brand /><div className="flex items-center gap-3 text-white/45"><Search size={13} /><Bell size={13} /><span className="rounded-full bg-violet-500/25 px-2 py-1 text-[6px] text-violet-200">ADMIN</span></div></header><div className="flex"><aside className="w-12 border-r border-white/8 p-2"><div className="space-y-2">{[LayoutDashboard, ShoppingBag, Package, BarChart3].map((Icon, index) => <span key={index} className={`flex size-8 items-center justify-center rounded-lg ${index === 0 ? "bg-violet-500/20 text-violet-300" : "text-white/30"}`}><Icon size={13} /></span>)}</div></aside><main className="min-w-0 flex-1 p-3"><p className="text-[6px] font-bold tracking-[0.2em] text-violet-300">{admin ? `${companyName} ECOSYSTEM` : "MERCHANT CENTER"}</p><h3 className="mt-1 text-sm font-bold">{admin ? "Commerce overview" : "Store performance"}</h3><div className="mt-3 grid grid-cols-3 gap-2">{cards.map(({ icon: Icon, label, value }) => <div key={label} className="rounded-xl border border-white/8 bg-white/4 p-2.5"><Icon size={13} className="text-orange-300" /><p className="mt-2 text-[6px] text-white/35">{label}</p><p className="mt-0.5 text-[11px] font-black">{value}</p></div>)}</div><div className="mt-3 grid gap-2 sm:grid-cols-[1.4fr_1fr]"><div className="rounded-xl border border-white/8 bg-white/4 p-3"><p className="text-[7px] font-bold">Sales activity</p><div className="mt-3 flex h-20 items-end gap-1">{[38, 64, 44, 78, 56, 88, 70, 94, 68, 82].map((height, index) => <span key={index} className="flex-1 rounded-t bg-linear-to-t from-violet-600 to-fuchsia-400" style={{ height: `${height}%` }} />)}</div></div><div className="rounded-xl border border-white/8 bg-white/4 p-3"><p className="text-[7px] font-bold">Recent orders</p>{["Order #0001", "Order #0002", "Order #0003"].map((order, index) => <div key={order} className="mt-2 flex items-center justify-between border-b border-white/6 pb-1.5 text-[6px]"><span className="text-white/60">{order}</span><span className={index === 1 ? "text-orange-300" : "text-emerald-300"}>{index === 1 ? "Packing" : "Ready"}</span></div>)}</div></div></main></div></div>;
}

function MobileScreen() {
  return <div className="flex min-h-full items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.28),transparent_58%)] p-4"><div className="w-36 overflow-hidden rounded-[1.7rem] border-[5px] border-[#222431] bg-[#0d0f19] text-white shadow-2xl shadow-black/50"><div className="mx-auto mt-1 h-1 w-10 rounded-full bg-white/15" /><div className="p-2"><Brand /><div className="mt-2 flex items-center gap-1.5 rounded-full bg-white/6 px-2 py-1 text-[5px] text-white/30"><Search size={8} />Search products</div><div className="mt-2 rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 p-2"><p className="text-[5px] text-white/60">FLASH DISCOVERY</p><p className="mt-0.5 text-[9px] font-black">Find it. Get it.</p></div><div className="mt-2 grid grid-cols-2 gap-1.5">{productSlots.map((product) => <ProductCard key={product.label} {...product} />)}</div><nav className="mt-2 flex justify-around border-t border-white/8 pt-1.5 text-white/35"><Home size={9} /><Search size={9} /><ShoppingCart size={9} className="text-orange-300" /><UserRound size={9} /></nav></div></div><div className="hidden max-w-40 sm:block"><p className="text-[7px] font-bold tracking-[0.2em] text-violet-300">REACT NATIVE UI</p><h3 className="mt-2 text-xl font-black text-white">{companyName} in your pocket.</h3><p className="mt-2 text-[8px] leading-4 text-white/40">Customer-first shopping with category discovery, product placeholders, cart and account navigation.</p></div></div>;
}

function WorkflowScreen() {
  const stages = [{ icon: Search, label: "Discover" }, { icon: ShoppingCart, label: "Cart" }, { icon: CircleDollarSign, label: "Checkout" }, { icon: Truck, label: "Delivery" }];
  return <div className="flex min-h-full flex-col justify-center bg-[#0d0f19] p-5 text-white"><Brand /><p className="mt-5 text-[7px] font-bold tracking-[0.2em] text-violet-300">CONNECTED COMMERCE JOURNEY</p><h3 className="mt-1 text-lg font-black">From discovery to delivery.</h3><div className="mt-5 grid grid-cols-4 gap-2">{stages.map(({ icon: Icon, label }, index) => <div key={label} className="relative rounded-xl border border-white/8 bg-white/4 p-3 text-center"><span className="mx-auto flex size-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300"><Icon size={14} /></span><p className="mt-2 text-[7px] font-bold">{label}</p><p className="mt-1 text-[5px] text-white/30">STEP 0{index + 1}</p>{index < stages.length - 1 ? <ChevronRight size={12} className="absolute -right-3 top-1/2 z-10 text-orange-300" /> : null}</div>)}</div><div className="mt-4 rounded-xl border border-dashed border-white/10 p-3 text-center text-[6px] font-semibold tracking-[0.15em] text-white/30">PRODUCT PHOTOS AND FINAL CATALOG DATA WILL BE ADDED HERE</div></div>;
}

export function EcommerceUiPreview({ view }: { view: EcommerceView }) {
  const label = view === "marketplace" ? "CUSTOMER MARKETPLACE" : view === "merchant" ? "MERCHANT PORTAL" : view === "admin" ? "ADMIN DASHBOARD" : view === "mobile" ? "REACT NATIVE APP" : view === "workflow" ? "COMMERCE WORKFLOW" : "FINAL E-COMMERCE UI";

  return <div className={`showcase-screen overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0d0f19] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.35)] ${view === "final" ? "min-h-112" : "aspect-16/10 min-h-45"}`} aria-label={`${companyName} ${label.toLowerCase()} concept`}>
    <div className="border-b border-white/8 bg-[#171925] px-3 py-1.5 text-[6px] font-bold tracking-[0.18em] text-white/35">{companyName} · {label}</div>
    <div className="min-h-0 flex-1 overflow-hidden">{view === "marketplace" || view === "final" ? <MarketplaceScreen final={view === "final"} /> : view === "merchant" ? <OperationsScreen /> : view === "admin" ? <OperationsScreen admin /> : view === "mobile" ? <MobileScreen /> : <WorkflowScreen />}</div>
  </div>;
}
