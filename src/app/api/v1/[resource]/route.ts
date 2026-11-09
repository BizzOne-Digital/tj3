import { NextRequest } from "next/server";

import { ResourceKey } from "@/lib/models";
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
  "schedule",
  "coaches",
  "gallery",
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
