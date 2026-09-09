import { NextRequest } from "next/server";
import { loginUser, setAuthCookies, signTokens } from "@/lib/auth-server";
import { jsonError, jsonOk } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return jsonError("Email and password required");
    const user = await loginUser(email, password);
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
    return jsonError("Invalid credentials", 401);
  }
}
