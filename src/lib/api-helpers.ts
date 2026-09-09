import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { RESOURCE_MAP, ResourceKey, SiteSettings } from "@/lib/models";

export function jsonOk<T>(data: T, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: true, data, ...extra });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function getPublishedList(resource: ResourceKey, query?: { limit?: number; page?: number; q?: string }) {
  await connectDB();
  const Model = RESOURCE_MAP[resource];
  const filter: Record<string, unknown> = {};
  if ("published" in Model.schema.paths) filter.published = true;
  if (query?.q && "title" in Model.schema.paths) {
    filter.$or = [
      { title: { $regex: query.q, $options: "i" } },
      { name: { $regex: query.q, $options: "i" } },
    ];
  }
  const limit = query?.limit ?? 100;
  const page = query?.page ?? 1;
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Model.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);
  return { items, total, page, limit };
}

export async function getSettingsDoc() {
  await connectDB();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    settings = await SiteSettings.create({
      siteName: "Little Mounties Community Sports Complex",
      tagline: "Building More Than a Gym — Building a Stronger Community",
      logoUrl: "/logo.jpg",
      contactEmail: "tjandersty@gmail.com",
      contactPhone: "814-500-8613",
      contactPerson: "Tj Anderson",
      address: "Philipsburg, Pennsylvania / Clearfield County, PA",
      zeffyDonationUrl:
        "https://www.zeffy.com/en-US/donation-form/little-mounties-community-sports-complex",
      facebookUrl: "https://www.facebook.com/profile.php?id=61594353141878",
      hoursStatus: "Facility coming soon—contact us for updates.",
      announcement: {
        enabled: true,
        message: "Coming Soon to Clearfield County",
        link: "/about",
        linkLabel: "Explore the Vision",
      },
    }).then((d) => d.toObject());
  }
  return settings;
}

export function parseQuery(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  return {
    limit: sp.get("limit") ? Number(sp.get("limit")) : undefined,
    page: sp.get("page") ? Number(sp.get("page")) : undefined,
    q: sp.get("q") || undefined,
  };
}
