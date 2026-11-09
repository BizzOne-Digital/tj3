import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import { RESOURCE_MAP, SiteSettings } from "@/lib/models";
import { getSettingsDoc, jsonError, jsonOk } from "@/lib/api-helpers";
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

function adminListQuery(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Math.min(Math.max(Number(sp.get("limit")) || 500, 1), 1000);
  const page = Math.max(Number(sp.get("page")) || 1, 1);
  return { limit, skip: (page - 1) * limit };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  try {
    await requireAuth(req);
    const { resource } = await params;
    if (resource === "settings") {
      return jsonOk(await getSettingsDoc());
    }
    if (!isAdminResource(resource)) return jsonError("Not found", 404);

    await connectDB();
    const Model = RESOURCE_MAP[resource];
    const { limit, skip } = adminListQuery(req);
    const [items, total] = await Promise.all([
      Model.find({}).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Model.countDocuments({}),
    ]);
    return jsonOk(
      items.map((item) => ({ ...item, _id: item._id.toString() })),
      { total },
    );
  } catch (e) {
    return adminFailure(e, "Failed to load");
  }
}

async function saveSettings(body: unknown) {
  await connectDB();
  const data = sanitizeBody(body);
  const existing = await SiteSettings.findOne().lean();
  const updated = existing
    ? await SiteSettings.findByIdAndUpdate(existing._id, { $set: data }, { new: true, runValidators: true }).lean()
    : await SiteSettings.create(data).then((d) => d.toObject());
  if (existing) await deleteReplacedUploads(existing, updated);
  revalidatePublicSite();
  return updated;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  try {
    await requireAuth(req);
    const { resource } = await params;
    const body = await req.json();

    if (resource === "settings") return jsonOk(await saveSettings(body));
    if (!isAdminResource(resource)) return jsonError("Not found", 404);

    await connectDB();
    const Model = RESOURCE_MAP[resource];
    const doc = await Model.create(withSlug(resource, sanitizeBody(body)));
    revalidatePublicSite();
    return jsonOk({ ...doc.toObject(), _id: doc._id.toString() });
  } catch (e) {
    return adminFailure(e, "Failed to create");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  try {
    await requireAuth(req);
    const { resource } = await params;
    if (resource !== "settings") return jsonError("Use item route for updates", 400);
    return jsonOk(await saveSettings(await req.json()));
  } catch (e) {
    return adminFailure(e, "Failed to save");
  }
}
