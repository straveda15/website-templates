import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!process.env.SUPERADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "SUPERADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }

  if (password !== process.env.SUPERADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
