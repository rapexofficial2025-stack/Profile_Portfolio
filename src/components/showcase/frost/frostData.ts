export type WarehouseType = "cold" | "dry";
export type PalletStatus = "loaded" | "partial" | "low" | "empty";
export type WingFilter = "full" | "left" | "right";

export type Pallet = {
  id: string;
  room: number;
  column: number;
  level: string;
  depth: number;
  wing: "left" | "right";
  tag: string;
  item: string;
  description: string;
  customer: string;
  batch: string;
  productionDate: string;
  expirationDate: string;
  receivedDate: string;
  quantity: number;
  weight: number;
  fill: number;
  status: PalletStatus;
};

export const levels = ["G", "F", "E", "D", "C", "B", "A"];
export const depths = [1, 2, 3, 4];

const items = ["Frozen Mango Cubes", "Chicken Breast", "Vanilla Ice Cream", "Mixed Vegetables", "Atlantic Salmon", "Dry Pasta", "Canned Tomatoes", "Paper Products"];
const customers = ["North Market", "Harbor Foods", "Freshline Retail", "Cedar Kitchens"];

export function makePallets(room = 1, warehouse: WarehouseType = "cold"): Pallet[] {
  return Array.from({ length: 30 }, (_, columnIndex) => columnIndex + 1).flatMap((column) =>
    levels.flatMap((level, levelIndex) => depths.map((depth) => {
      const seed = column * 31 + levelIndex * 13 + depth * 7 + room * 17;
      const fill = seed % 11 === 0 ? 0 : (seed * 17) % 101;
      const status: PalletStatus = fill === 0 ? "empty" : fill < 20 ? "low" : fill < 60 ? "partial" : "loaded";
      const itemIndex = seed % items.length;
      const quantity = fill === 0 ? 0 : Math.max(4, Math.round(fill / 2));
      return {
        id: `RM${room}-CO${column}-L${level}-D${depth}`,
        room,
        column,
        level,
        depth,
        wing: column <= 15 ? "left" : "right",
        tag: `FT-${room}${String(column).padStart(2, "0")}${level}${depth}-${String(2400 + seed).slice(-4)}`,
        item: warehouse === "cold" ? items[itemIndex % 5] : items[5 + (itemIndex % 3)],
        description: warehouse === "cold" ? "Temperature-controlled palletized inventory" : "Ambient dry-goods palletized inventory",
        customer: customers[seed % customers.length],
        batch: `B${String(8600 + seed).slice(-4)}`,
        productionDate: "2026-07-12",
        expirationDate: warehouse === "cold" ? "2027-01-12" : "2028-07-12",
        receivedDate: "2026-09-18",
        quantity,
        weight: quantity * (warehouse === "cold" ? 12 : 8),
        fill,
        status,
      };
    })),
  );
}

export const roomActivity = [
  "receiving", "no operation", "relocation", "withdrawal", "issue",
  "receiving", "withdrawal", "no operation", "relocation", "receiving",
] as const;

export const weeklyActivity = [42, 68, 54, 82, 63, 91, 58];

export const requestHistory = [
  { id: "PR-2041", date: "Sep 28, 2026", quantity: 20, status: "Completed" },
  { id: "PR-1984", date: "Sep 23, 2026", quantity: 10, status: "Completed" },
  { id: "PR-1872", date: "Sep 14, 2026", quantity: 15, status: "Released" },
];

export function palletTone(status: PalletStatus) {
  return status === "loaded" ? "frost-cell--loaded" : status === "partial" ? "frost-cell--partial" : status === "low" ? "frost-cell--low" : "frost-cell--empty";
}
