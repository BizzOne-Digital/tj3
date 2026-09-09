import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import { RESOURCE_MAP, ResourceKey, SiteSettings } from "@/lib/models";
import { getSettingsDoc, jsonError, jsonOk, parseQuery } from "@/lib/api-helpers";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  try {
    await requireAuth(req);
    const { resource } = await params;
    if (resource === "settings") {
      const settings = await getSettingsDoc();
      return jsonOk(settings);
    }
    if (!ADMIN_RESOURCES.includes(resource as ResourceKey)) {
      return jsonError("Not found", 404);
    }
    await connectDB();
    const Model = RESOURCE_MAP[resource as ResourceKey];
    const query = parseQuery(req);
    const limit = query.limit ?? 50;
    const page = query.page ?? 1;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Model.find({}).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Model.countDocuments({}),
    ]);
    return jsonOk(
      items.map((item) => ({ ...item, _id: item._id.toString() })),
      { total },
    );
  } catch {
    return jsonError("Unauthorized", 401);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  try {
    await requireAuth(req);
    const { resource } = await params;
    const body = await req.json();

    if (resource === "settings") {
      await connectDB();
      const existing = await SiteSettings.findOne();
      const updated = existing
        ? await SiteSettings.findByIdAndUpdate(existing._id, body, { new: true }).lean()
        : await SiteSettings.create(body).then((d) => d.toObject());
      return jsonOk(updated);
    }

    if (!ADMIN_RESOURCES.includes(resource as ResourceKey)) {
      return jsonError("Not found", 404);
    }

    await connectDB();
    const Model = RESOURCE_MAP[resource as ResourceKey];
    const doc = await Model.create(body);
    return jsonOk({ ...doc.toObject(), _id: doc._id.toString() });
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : "Failed to create", 400);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  try {
    await requireAuth(req);
    const { resource } = await params;
    const body = await req.json();

    if (resource === "settings") {
      await connectDB();
      const existing = await SiteSettings.findOne();
      const updated = existing
        ? await SiteSettings.findByIdAndUpdate(existing._id, body, { new: true }).lean()
        : await SiteSettings.create(body).then((d) => d.toObject());
      return jsonOk(updated);
    }

    return jsonError("Use item route for updates", 400);
  } catch {
    return jsonError("Unauthorized", 401);
  }
}
