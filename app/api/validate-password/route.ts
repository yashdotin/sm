import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const PASSWORD_HASH =
  "$2b$10$iZHh74QFywM/d2npkqSsWu6r3kQR0ktG2WRVC8cKPHvMP72mnkgxq"; // shraddha
const MAX_ATTEMPTS = 5;
const COOLDOWN_MINUTES = 3;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const password = body?.password;

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  const now = Date.now();
  const attemptsKey = `_attempts_${ip}`;
  const cooldownKey = `_cooldown_${ip}`;

  let attempts = Number((globalThis as any)[attemptsKey] || 0);
  let cooldownUntil = Number((globalThis as any)[cooldownKey] || 0);

  if (cooldownUntil && now < cooldownUntil) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const isValid = await bcrypt.compare(password, PASSWORD_HASH);

  if (isValid) {
    (globalThis as any)[attemptsKey] = 0;
    return NextResponse.json({ success: true });
  }

  attempts++;
  (globalThis as any)[attemptsKey] = attempts;

  if (attempts >= MAX_ATTEMPTS) {
    (globalThis as any)[cooldownKey] =
      now + COOLDOWN_MINUTES * 60 * 1000;
    return NextResponse.json(
      { success: false, error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: `Incorrect password. Attempts left: ${
        MAX_ATTEMPTS - attempts
      }`,
    },
    { status: 401 }
  );
}
