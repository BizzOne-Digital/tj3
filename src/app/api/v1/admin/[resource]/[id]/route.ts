import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import { RESOURCE_MAP, ResourceKey } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";

const ADMIN_RESOURCES: ResourceKey[] = [
  "stats",
  "facilities",
  "services",
  "pricing",
  "team",
  "faq",
  "news",
  "shop",
  "sponsors",
  "pages",
  "bookings",
  "contacts",
  "inquiries",
];

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  try {
    await requireAuth(req);
    const { resource, id } = await params;
    if (!ADMIN_RESOURCES.includes(resource as ResourceKey)) {
      return jsonError("Not found", 404);
    }
    const body = await req.json();
    await connectDB();
    const Model = RESOURCE_MAP[resource as ResourceKey];
    const updated = await Model.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!updated) return jsonError("Not found", 404);
    return jsonOk({ ...updated, _id: updated._id.toString() });
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : "Update failed", 400);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  try {
    await requireAuth(req);
    const { resource, id } = await params;
    if (!ADMIN_RESOURCES.includes(resource as ResourceKey)) {
      return jsonError("Not found", 404);
    }
    await connectDB();
    const Model = RESOURCE_MAP[resource as ResourceKey];
    await Model.findByIdAndDelete(id);
    return jsonOk({ deleted: true });
  } catch {
    return jsonError("Delete failed", 400);
  }
}
