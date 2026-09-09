import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { RESOURCE_MAP, ResourceKey } from "@/lib/models";
import { getPublishedList, jsonError, jsonOk, parseQuery } from "@/lib/api-helpers";

const PUBLIC_RESOURCES: ResourceKey[] = [
  "stats",
  "facilities",
  "services",
  "pricing",
  "team",
  "faq",
  "news",
  "shop",
  "sponsors",
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  if (!PUBLIC_RESOURCES.includes(resource as ResourceKey)) {
    return jsonError("Not found", 404);
  }

  const query = parseQuery(req);
  const { items, total } = await getPublishedList(resource as ResourceKey, query);
  return jsonOk(
    items.map((item) => ({ ...item, _id: item._id.toString() })),
    { total },
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; slug?: string }> },
) {
  const { resource, slug } = await params;
  if (resource === "news" && slug) {
    await connectDB();
    const item = await RESOURCE_MAP.news.findOne({ slug, published: true }).lean();
    if (!item) return jsonError("Not found", 404);
    return jsonOk({ ...item, _id: item._id.toString() });
  }
  if (resource === "shop" && slug) {
    await connectDB();
    const item = await RESOURCE_MAP.shop.findOne({ slug, published: true }).lean();
    if (!item) return jsonError("Not found", 404);
    return jsonOk({ ...item, _id: item._id.toString() });
  }
  if (resource === "pages" && slug) {
    await connectDB();
    const item = await RESOURCE_MAP.pages.findOne({ slug, published: true }).lean();
    if (!item) return jsonError("Not found", 404);
    return jsonOk({ ...item, _id: item._id.toString() });
  }
  return jsonError("Not found", 404);
}
