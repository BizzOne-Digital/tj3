import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import { SiteContent } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";
import { adminFailure, revalidatePublicSite, sanitizeBody } from "@/lib/admin-api";
import { CONTENT_DEFAULTS, isContentKey, mergeContent } from "@/lib/site-content";
import { deleteReplacedUploads } from "@/lib/upload-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET -> { defaults, overrides } for every editable section. */
export async function GET(req: NextRequest) {
  try {
    await requireAuth(req);
    await connectDB();
    const docs = await SiteContent.find({}).lean();
    const overrides: Record<string, unknown> = {};
    for (const doc of docs) overrides[doc.key] = doc.value;
    return jsonOk({ defaults: CONTENT_DEFAULTS, overrides });
  } catch (e) {
    return adminFailure(e, "Failed to load content");
  }
}

/** PUT { key, value } -> save one section override. */
export async function PUT(req: NextRequest) {
  try {
    await requireAuth(req);
    const body = await req.json();
    const key = String(body?.key ?? "");
    if (!isContentKey(key)) return jsonError("Unknown content section", 400);
    if (!body.value || typeof body.value !== "object" || Array.isArray(body.value)) {
      return jsonError("Invalid value", 400);
    }

    // Keep the stored override shaped like the defaults (wrong types fall back to defaults).
    const value = mergeContent(CONTENT_DEFAULTS[key], sanitizeBody(body.value));

    await connectDB();
    const before = await SiteContent.findOne({ key }).lean();
    await SiteContent.findOneAndUpdate({ key }, { $set: { value } }, { upsert: true, new: true });
    if (before) await deleteReplacedUploads(before.value, value);
    revalidatePublicSite();
    return jsonOk({ key, value });
  } catch (e) {
    return adminFailure(e, "Failed to save content");
  }
}

/** DELETE ?key=... -> reset a section back to the shipped defaults. */
export async function DELETE(req: NextRequest) {
  try {
    await requireAuth(req);
    const key = req.nextUrl.searchParams.get("key") ?? "";
    if (!isContentKey(key)) return jsonError("Unknown content section", 400);
    await connectDB();
    const before = await SiteContent.findOneAndDelete({ key }).lean();
    if (before) await deleteReplacedUploads(before.value);
    revalidatePublicSite();
    return jsonOk({ key, reset: true });
  } catch (e) {
    return adminFailure(e, "Failed to reset content");
  }
}
