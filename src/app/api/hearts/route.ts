import type { NextRequest } from "next/server";
import { deviceKey, heartStore } from "@/lib/hearts-store";

const CLIENT_ID = /^[a-z0-9-]{8,64}$/i;

function identify(request: NextRequest, clientId: unknown) {
  if (typeof clientId !== "string" || !CLIENT_ID.test(clientId)) return null;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  return deviceKey(ip, request.headers.get("user-agent") ?? "", clientId);
}

export async function GET(request: NextRequest) {
  const device = identify(request, request.nextUrl.searchParams.get("cid"));
  if (!device) return Response.json({ error: "Missing client id" }, { status: 400 });
  return Response.json(await heartStore.read(device));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const device = identify(request, body?.cid);
  if (!device) return Response.json({ error: "Missing client id" }, { status: 400 });
  return Response.json(await heartStore.add(device));
}
