import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { requireAuth } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import { RESOURCE_MAP } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";
import {
  adminFailure,
  isAdminResource,
  revalidatePublicSite,
  sanitizeBody,
  withSlug,
} from "@/lib/admin-api";
import { deleteReplacedUploads } from "@/lib/upload-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  try {
    await requireAuth(req);
    const { resource, id } = await params;
    if (!isAdminResource(resource)) return jsonError("Not found", 404);
    if (!mongoose.isValidObjectId(id)) return jsonError("Invalid id", 400);

    const body = sanitizeBody(await req.json());
    await connectDB();
    const Model = RESOURCE_MAP[resource];
    const before = await Model.findById(id).lean();
    if (!before) return jsonError("Not found", 404);

    const data = "slug" in body || "name" in body || "title" in body ? withSlug(resource, body) : body;
    const updated = await Model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    ).lean();
    if (!updated) return jsonError("Not found", 404);

    // Images that were replaced or removed in this save are deleted from MongoDB storage.
    await deleteReplacedUploads(before, updated);
    revalidatePublicSite();
    return jsonOk({ ...updated, _id: updated._id.toString() });
  } catch (e) {
    return adminFailure(e, "Update failed");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  try {
    await requireAuth(req);
    const { resource, id } = await params;
    if (!isAdminResource(resource)) return jsonError("Not found", 404);
    if (!mongoose.isValidObjectId(id)) return jsonError("Invalid id", 400);

    await connectDB();
    const Model = RESOURCE_MAP[resource];
    const removed = await Model.findByIdAndDelete(id).lean();
    if (removed) await deleteReplacedUploads(removed);
    revalidatePublicSite();
    return jsonOk({ deleted: Boolean(removed) });
  } catch (e) {
    return adminFailure(e, "Delete failed");
  }
}
