import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/** One heart per device, then the device waits this long before it can add another. */
export const HEART_COOLDOWN_MS = 5 * 60 * 1000;

export type HeartState = { count: number; cooldownMs: number };

/**
 * A device is its network address (Wi-Fi / mobile data) + browser signature + a random id the
 * browser keeps. Different phones, browsers or networks each count, no account needed.
 */
export function deviceKey(ip: string, userAgent: string, clientId: string) {
  return createHash("sha256").update(`${ip}|${userAgent}|${clientId}`).digest("hex").slice(0, 32);
}

type Store = { read(device: string): Promise<HeartState>; add(device: string): Promise<HeartState & { counted: boolean }> };

// --- Upstash Redis (REST), used when its env vars are set: survives restarts and serverless hosting ---
function redisStore(url: string, token: string): Store {
  const call = async (...parts: (string | number)[]) => {
    const response = await fetch(`${url}/${parts.map((part) => encodeURIComponent(String(part))).join("/")}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!response.ok) throw new Error(`Redis request failed: ${response.status}`);
    return (await response.json()).result;
  };
  const read = async (device: string) => {
    const [count, ttl] = await Promise.all([call("get", "hearts:total"), call("pttl", `hearts:device:${device}`)]);
    return { count: Number(count) || 0, cooldownMs: ttl > 0 ? ttl : 0 };
  };
  return {
    read,
    async add(device) {
      const claimed = await call("set", `hearts:device:${device}`, 1, "PX", HEART_COOLDOWN_MS, "NX");
      if (claimed !== "OK") return { ...(await read(device)), counted: false };
      const count = await call("incr", "hearts:total");
      return { count: Number(count), cooldownMs: HEART_COOLDOWN_MS, counted: true };
    },
  };
}

// --- JSON file fallback: fine for `next dev` / `next start` on one server, but resets on serverless hosts ---
function fileStore(): Store {
  const file = path.join(process.cwd(), ".data", "hearts.json");
  type Data = { count: number; devices: Record<string, number> };
  let queue: Promise<unknown> = Promise.resolve();
  const load = async (): Promise<Data> => { try { return JSON.parse(await readFile(file, "utf8")); } catch { return { count: 0, devices: {} }; } };
  const locked = <T,>(task: () => Promise<T>) => { const run = queue.then(task, task); queue = run.catch(() => undefined); return run; };
  const cooldownOf = (data: Data, device: string, now: number) => Math.max(0, (data.devices[device] ?? 0) - now);
  return {
    read: (device) => locked(async () => { const data = await load(); return { count: data.count, cooldownMs: cooldownOf(data, device, Date.now()) }; }),
    add: (device) => locked(async () => {
      const data = await load(); const now = Date.now();
      if (cooldownOf(data, device, now) > 0) return { count: data.count, cooldownMs: cooldownOf(data, device, now), counted: false };
      for (const [key, until] of Object.entries(data.devices)) if (until <= now) delete data.devices[key];
      data.count += 1; data.devices[device] = now + HEART_COOLDOWN_MS;
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, JSON.stringify(data));
      return { count: data.count, cooldownMs: HEART_COOLDOWN_MS, counted: true };
    }),
  };
}

const { UPSTASH_REDIS_REST_URL: redisUrl, UPSTASH_REDIS_REST_TOKEN: redisToken } = process.env;
export const heartStore: Store = redisUrl && redisToken ? redisStore(redisUrl, redisToken) : fileStore();
