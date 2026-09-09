import { clearAuthCookies } from "@/lib/auth-server";
import { jsonOk } from "@/lib/api-helpers";

export async function POST() {
  const res = jsonOk({ ok: true });
  clearAuthCookies(res);
  return res;
}
