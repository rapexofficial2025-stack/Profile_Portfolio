"use client";

import Image from "next/image";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { asset } from "@/lib/asset";

type MenuCategory = "All" | "Starters" | "Mains" | "Noodles" | "Desserts" | "Drinks";

type MenuItem = {
  id: string;
  name: string;
  category: Exclude<MenuCategory, "All">;
  description: string;
  price: number;
  label?: string;
  imageFile: string;
};

const categories: MenuCategory[] = ["All", "Starters", "Mains", "Noodles", "Desserts", "Drinks"];

const menuItems: MenuItem[] = [
  {
    id: "dynamite-prawns",
    name: "Golden Dynamite Prawns",
    category: "Starters",
    description: "Crisp prawns, sweet chili glaze, sesame and spring onion.",
    price: 320,
    label: "House favorite",
    imageFile: "golden-dynamite-prawns.jpg",
  },
  {
    id: "lumpiang-shanghai",
    name: "Savor Lumpiang Shanghai",
    category: "Starters",
    description: "Hand-rolled pork spring rolls with spiced vinegar and atchara.",
    price: 260,
    imageFile: "savor-lumpiang-shanghai.jpg",
  },
  {
    id: "crispy-pata",
    name: "Crispy Pata Royale",
    category: "Mains",
    description: "Slow-tenderized pork leg, crisp skin and house soy-vinegar dip.",
    price: 690,
    label: "Chef's choice",
    imageFile: "crispy-pata-royale.jpg",
  },
  {
    id: "buttered-chicken",
    name: "Lemon Buttered Chicken",
    category: "Mains",
    description: "Golden chicken, cultured butter, calamansi and roasted garlic.",
    price: 310,
    imageFile: "lemon-buttered-chicken.jpg",
  },
  {
    id: "bicol-express",
    name: "Smoked Bicol Express",
    category: "Mains",
    description: "Pork belly, coconut cream, shrimp paste and native chilies.",
    price: 330,
    label: "Spicy",
    imageFile: "smoked-bicol-express.jpg",
  },
  {
    id: "pancit-guisado",
    name: "Celebration Pancit Guisado",
    category: "Noodles",
    description: "Wok-tossed noodles, vegetables, chicken and citrus soy.",
    price: 295,
    imageFile: "celebration-pancit-guisado.jpg",
  },
  {
    id: "ube-cheesecake",
    name: "Ube Basque Cheesecake",
    category: "Desserts",
    description: "Caramelized cheesecake with ube cream and toasted coconut.",
    price: 220,
    label: "New",
    imageFile: "ube-basque-cheesecake.jpg",
  },
  {
    id: "calamansi-spritz",
    name: "Calamansi Sunset Spritz",
    category: "Drinks",
    description: "Calamansi, passionfruit, soda and fresh mint over ice.",
    price: 165,
    imageFile: "calamansi-sunset-spritz.jpg",
  },
];

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export function SavorHousePreview() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationSent, setReservationSent] = useState(false);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = !query || `${item.name} ${item.description}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartTotal = menuItems.reduce((total, item) => total + item.price * (cart[item.id] ?? 0), 0);

  function changeQuantity(id: string, amount: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + amount);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-amber-200/15 bg-[#0c0b09] text-[#f5efe3] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/12 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-full border border-[#c99a55]/45 bg-[radial-gradient(circle_at_35%_30%,#f4d9a6,#9b6227_60%,#2d1808)] text-[#120d07] shadow-[0_7px_20px_rgba(194,139,68,0.24)]">
            <UtensilsCrossed size={19} />
          </div>
          <div>
            <p className="font-serif text-xl tracking-[0.14em] text-[#f4d7a1]">SAVOR HOUSE</p>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/45">Filipino table · modern spirit</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReservationOpen(true)}
            className="rounded-full border border-[#d6a85f]/35 bg-[#d6a85f]/10 px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-[#f6d99f] transition hover:-translate-y-0.5 hover:bg-[#d6a85f]/18"
          >
            RESERVE A TABLE
          </button>
          <div className="relative grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/75">
            <ShoppingBag size={16} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#d69c4a] px-1 text-[9px] font-bold text-[#171008]">{cartCount}</span>}
          </div>
        </div>
      </header>

      <section className="grid min-h-[28rem] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-80 overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
          <Image
            src={asset("/images/projects/image-editing-gifs/before-after/Resto-menu/finish-menu/Cover.webp")}
            alt="Black and gold restaurant menu reference artwork"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center opacity-48"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,6,0.2),rgba(9,8,6,0.68)),linear-gradient(0deg,rgba(9,8,6,0.92),transparent_65%)]" />
          <div className="relative flex h-full min-h-80 flex-col justify-end p-7 sm:p-10">
            <div className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#dfb66f]/25 bg-black/40 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f4d7a1] backdrop-blur-md">
              <Sparkles size={12} /> Thoughtfully Filipino
            </div>
            <p className="font-serif text-4xl leading-[0.95] text-white sm:text-5xl">Gather.<br />Taste. Stay.</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">Comforting Filipino flavors, generous sharing plates and a dining room designed for slow, memorable evenings.</p>
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.13em] text-white/58">
              <span className="flex items-center gap-2"><Clock3 size={13} className="text-[#d7a65c]" /> 11:00 AM–11:00 PM</span>
              <span className="flex items-center gap-2"><MapPin size={13} className="text-[#d7a65c]" /> Cavite, Philippines</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-[radial-gradient(circle_at_85%_15%,rgba(206,145,60,0.14),transparent_34%)] p-6 sm:p-9">
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d6a85f]">Tonight at Savor House</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[#fbf4e8] sm:text-5xl">Familiar dishes, finished with a little wonder.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">Browse the interactive menu, build a sample order or reserve a table. This prototype demonstrates the complete guest-facing restaurant flow.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["01", "Explore the menu"],
              ["02", "Build an order"],
              ["03", "Book your table"],
            ].map(([number, title]) => (
              <div key={number} className="rounded-2xl border border-white/8 bg-white/3 p-4 shadow-[inset_0_1px_rgba(255,255,255,0.05)]">
                <p className="text-[9px] tracking-[0.2em] text-[#c99146]">{number}</p>
                <p className="mt-2 text-xs font-medium text-white/75">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#11100d] px-5 py-8 sm:px-7 lg:px-9">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c99954]">À la carte</p>
            <h3 className="mt-2 font-serif text-3xl text-white">Explore our menu</h3>
          </div>
          <label className="flex min-w-60 items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-3 text-white/45 focus-within:border-[#d4a35c]/45">
            <Search size={15} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search dishes"
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.1em] transition ${activeCategory === category ? "bg-[#d7a257] text-[#160f08] shadow-[0_8px_24px_rgba(215,162,87,0.2)]" : "border border-white/9 bg-white/3 text-white/52 hover:border-[#d7a257]/35 hover:text-white"}`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => {
            const quantity = cart[item.id] ?? 0;
            return (
              <article key={item.id} className="group overflow-hidden rounded-3xl border border-white/8 bg-[#171510] shadow-[0_16px_35px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:border-[#d3a35e]/28">
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/7 bg-[radial-gradient(circle_at_30%_20%,rgba(224,172,94,0.22),transparent_32%),linear-gradient(145deg,#28231b,#0e0d0a)] p-5 text-center">
                  <div className="absolute inset-3 rounded-2xl border border-dashed border-[#d1a15b]/22" />
                  <div className="relative">
                    <UtensilsCrossed className="mx-auto text-[#d2a15b]/60" size={24} />
                    <p className="mt-3 text-[9px] font-semibold tracking-[0.24em] text-[#e2bd80]">IMAGE PLACEHOLDER</p>
                    <p className="mt-2 text-xs font-medium text-white/70">{item.name}</p>
                    <p className="mt-1 text-[9px] text-white/32">Generate: {item.imageFile}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#c59450]">{item.category}</p>
                      <h4 className="mt-2 font-serif text-xl text-white">{item.name}</h4>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-[#efd19e]">{peso.format(item.price)}</p>
                  </div>
                  <p className="mt-3 min-h-12 text-xs leading-5 text-white/46">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white/42">
                      <Star size={11} className="fill-[#c99850] text-[#c99850]" /> {item.label ?? "Made to order"}
                    </span>
                    {quantity === 0 ? (
                      <button type="button" onClick={() => changeQuantity(item.id, 1)} className="flex items-center gap-2 rounded-full bg-[#ede3d3] px-3 py-2 text-[9px] font-bold tracking-[0.12em] text-[#19120a] transition hover:bg-white">
                        ADD <Plus size={12} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-full border border-[#d7a257]/25 bg-black/30 p-1">
                        <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item.id, -1)} className="grid size-7 place-items-center rounded-full text-white/60 transition hover:bg-white/8 hover:text-white"><Minus size={12} /></button>
                        <span className="min-w-4 text-center text-xs font-semibold text-[#f2d59f]">{quantity}</span>
                        <button type="button" aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item.id, 1)} className="grid size-7 place-items-center rounded-full bg-[#d7a257] text-[#19120a]"><Plus size={12} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {visibleItems.length === 0 && (
          <div className="mt-5 rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-white/45">No dish matches that search yet.</div>
        )}
      </section>

      <footer className="flex flex-col justify-between gap-4 border-t border-white/8 bg-black/30 px-6 py-5 sm:flex-row sm:items-center lg:px-9">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/34">Sample order · {cartCount} {cartCount === 1 ? "item" : "items"}</p>
          <p className="mt-1 font-serif text-xl text-[#f1d5a4]">{peso.format(cartTotal)}</p>
        </div>
        <button type="button" disabled={cartCount === 0} className="flex items-center justify-center gap-2 rounded-full bg-[#d5a158] px-5 py-3 text-[10px] font-bold tracking-[0.12em] text-[#171008] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-[#ebbd78] disabled:cursor-not-allowed disabled:opacity-35">
          REVIEW ORDER <ChevronRight size={14} />
        </button>
      </footer>

      {reservationOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Reserve a table">
          <div className="relative w-full max-w-lg rounded-[2rem] border border-[#d7a257]/22 bg-[#15130f] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.7)] sm:p-8">
            <button type="button" aria-label="Close reservation" onClick={() => { setReservationOpen(false); setReservationSent(false); }} className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-white/10 text-white/55 hover:bg-white/8 hover:text-white"><X size={15} /></button>
            {reservationSent ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#d7a257] text-[#171008]"><Check size={24} /></div>
                <p className="mt-5 font-serif text-3xl text-white">Table request received.</p>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/52">Prototype confirmation only. A production build would connect this step to the restaurant reservation system.</p>
                <button type="button" onClick={() => { setReservationOpen(false); setReservationSent(false); }} className="mt-6 rounded-full border border-[#d7a257]/35 px-5 py-3 text-[10px] font-semibold tracking-[0.14em] text-[#efd09b]">CLOSE</button>
              </div>
            ) : (
              <>
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c99850]">Plan your visit</p>
                <h3 className="mt-3 font-serif text-3xl text-white">Reserve a table</h3>
                <p className="mt-2 text-sm leading-6 text-white/45">Choose your preferred date, time and party size.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <label className="rounded-2xl border border-white/9 bg-black/20 p-4 text-[9px] uppercase tracking-[0.16em] text-white/38">Date<input type="date" className="mt-2 block w-full bg-transparent text-xs normal-case tracking-normal text-white/78 outline-none [color-scheme:dark]" /></label>
                  <label className="rounded-2xl border border-white/9 bg-black/20 p-4 text-[9px] uppercase tracking-[0.16em] text-white/38">Time<select defaultValue="19:00" className="mt-2 block w-full bg-[#15130f] text-xs normal-case tracking-normal text-white/78 outline-none"><option value="18:00">6:00 PM</option><option value="19:00">7:00 PM</option><option value="20:00">8:00 PM</option><option value="21:00">9:00 PM</option></select></label>
                  <label className="rounded-2xl border border-white/9 bg-black/20 p-4 text-[9px] uppercase tracking-[0.16em] text-white/38 sm:col-span-2">Guests<select defaultValue="2" className="mt-2 block w-full bg-[#15130f] text-xs normal-case tracking-normal text-white/78 outline-none"><option value="2">2 guests</option><option value="4">4 guests</option><option value="6">6 guests</option><option value="8">8+ guests</option></select></label>
                </div>
                <button type="button" onClick={() => setReservationSent(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#d7a257] px-5 py-3.5 text-[10px] font-bold tracking-[0.14em] text-[#171008] hover:bg-[#e9b96f]"><CalendarDays size={14} /> CHECK TABLE</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
