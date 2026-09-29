import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "superadmin_session";

function secret() {
  return process.env.SUPERADMIN_SESSION_SECRET || "dev-only-secret-change-me";
}

export function createSessionToken() {
  return jwt.sign({ admin: true }, secret(), { expiresIn: "7d" });
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    jwt.verify(token, secret());
    return true;
  } catch {
    return false;
  }
}
