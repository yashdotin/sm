import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const PASSWORD_HASH = "$2b$10$iZHh74QFywM/d2npkqSsWu6r3kQR0ktG2WRVC8cKPHvMP72mnkgxq"; // 'shraddha'
const MAX_ATTEMPTS = 5;
const COOLDOWN_MINUTES = 3;

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  let attempts = Number(globalThis["_attempts_" + ip] || 0);
  let cooldownUntil = Number(globalThis["_cooldown_" + ip] || 0);
  const now = Date.now();

  if (cooldownUntil && now < cooldownUntil) {
    return NextResponse.json({ success: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  if (await bcrypt.compare(password, PASSWORD_HASH)) {
    globalThis["_attempts_" + ip] = 0;
    return NextResponse.json({ success: true });
  } else {
    attempts++;
    globalThis["_attempts_" + ip] = attempts;
    if (attempts >= MAX_ATTEMPTS) {
      globalThis["_cooldown_" + ip] = now + COOLDOWN_MINUTES * 60 * 1000;
      return NextResponse.json({ success: false, error: "Too many attempts. Try again later." }, { status: 429 });
    }
    return NextResponse.json({ success: false, error: `Incorrect password. Attempts left: ${MAX_ATTEMPTS - attempts}` }, { status: 401 });
  }
}
