import { NextRequest } from "next/server";
import {
  clearLoginFailures,
  isLoginThrottled,
  loginUser,
  recordLoginFailure,
  setAuthCookies,
  signTokens,
} from "@/lib/auth-server";
import { jsonError, jsonOk } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  let throttleKey = "";
  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return jsonError("Email and password required");
    }
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    throttleKey = `${ip}:${email.toLowerCase()}`;
    if (isLoginThrottled(throttleKey)) {
      return jsonError("Too many attempts. Try again in 15 minutes.", 429);
    }

    const user = await loginUser(email, password);
    clearLoginFailures(throttleKey);
    const tokens = signTokens({ id: user._id.toString(), role: user.role });
    const res = jsonOk({
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    return res;
  } catch {
    if (throttleKey) recordLoginFailure(throttleKey);
    return jsonError("Invalid credentials", 401);
  }
}
