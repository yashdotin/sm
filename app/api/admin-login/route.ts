import { NextRequest, NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "valentine-admin";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (token === ADMIN_TOKEN) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Invalid admin token." }, { status: 401 });
}
