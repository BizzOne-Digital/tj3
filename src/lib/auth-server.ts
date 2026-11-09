import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "./models";
import { connectDB } from "./db";

const ACCESS_COOKIE = "lm_access_token";
const REFRESH_COOKIE = "lm_refresh_token";

/** Admin sessions last 12h: the portal has no silent token refresh, so a short TTL would log editors out mid-edit. */
const ACCESS_TTL_SECONDS = 12 * 60 * 60;

function getSecrets() {
  const access = process.env.JWT_ACCESS_SECRET;
  const refresh = process.env.JWT_REFRESH_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!access || !refresh || access.length < 32 || refresh.length < 32) {
      throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET (32+ chars) must be set in production");
    }
    return { access, refresh };
  }
  return {
    access: access || "dev-access-secret-min-32-characters-long",
    refresh: refresh || "dev-refresh-secret-min-32-characters-long",
  };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signTokens(user: { id: string; role: string }) {
  const { access, refresh } = getSecrets();
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, access, { expiresIn: ACCESS_TTL_SECONDS });
  const refreshToken = jwt.sign({ sub: user.id, role: user.role }, refresh, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export function setAuthCookies(res: NextResponse, accessToken: string, refreshToken: string) {
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: ACCESS_TTL_SECONDS,
    path: "/",
  });
  res.cookies.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.delete(ACCESS_COOKIE);
  res.cookies.delete(REFRESH_COOKIE);
}

export async function getAuthUser(req?: NextRequest) {
  await connectDB();
  const token =
    req?.cookies.get(ACCESS_COOKIE)?.value ??
    (await cookies()).get(ACCESS_COOKIE)?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, getSecrets().access) as { sub: string };
    const user = await User.findById(payload.sub).select("-passwordHash");
    return user?.isActive ? user : null;
  } catch {
    return null;
  }
}

export async function requireAuth(req?: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function loginUser(email: string, password: string) {
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  if (!user || !user.isActive) throw new Error("Invalid credentials");
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  return user;
}

/** Map a thrown error from requireAuth() to a response status. */
export function authErrorStatus(e: unknown): 401 | 500 {
  return e instanceof Error && e.message === "Unauthorized" ? 401 : 500;
}

/** Tiny in-memory throttle for login attempts (best effort on serverless: per warm instance). */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

export function isLoginThrottled(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordLoginFailure(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

export function clearLoginFailures(key: string) {
  attempts.delete(key);
}
