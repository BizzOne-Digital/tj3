import { connectDB } from "@/lib/db";
import { RESOURCE_MAP } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string; slug: string }> },
) {
  const { resource, slug } = await params;
  await connectDB();

  if (resource === "news") {
    const item = await RESOURCE_MAP.news.findOne({ slug, published: true }).lean();
    if (!item) return jsonError("Not found", 404);
    return jsonOk({ ...item, _id: item._id.toString() });
  }
  if (resource === "shop") {
    const item = await RESOURCE_MAP.shop.findOne({ slug, published: true }).lean();
    if (!item) return jsonError("Not found", 404);
    return jsonOk({ ...item, _id: item._id.toString() });
  }
  if (resource === "pages") {
    const item = await RESOURCE_MAP.pages.findOne({ slug, published: true }).lean();
    if (!item) return jsonError("Not found", 404);
    return jsonOk({ ...item, _id: item._id.toString() });
  }

  return jsonError("Not found", 404);
}
