import { getAuthUser } from "@/lib/auth-server";
import { jsonError, jsonOk } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return jsonError("Unauthorized", 401);
  return jsonOk({
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  });
}
