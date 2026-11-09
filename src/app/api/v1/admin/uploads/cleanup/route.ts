import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { jsonOk } from "@/lib/api-helpers";
import { adminFailure } from "@/lib/admin-api";
import { cleanupOrphanedUploads } from "@/lib/upload-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST -> delete uploaded images that no page/product/setting references any more (older than 24h). */
export async function POST(req: NextRequest) {
  try {
    await requireAuth(req);
    return jsonOk(await cleanupOrphanedUploads());
  } catch (e) {
    return adminFailure(e, "Cleanup failed");
  }
}
