import { api } from "@/lib/api";
import { getSiteUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/contact",
  "/pricing",
  "/news",
  "/booking",
  "/team",
  "/booster-schedule",
  "/faq",
  "/shop",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const [news, shop] = await Promise.all([api.getNews(), api.getShopProducts()]);
    news.data
      .filter((a) => a.published)
      .forEach((a) => {
        entries.push({
          url: `${base}/news/${a.slug}`,
          lastModified: new Date(a.publishedAt),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });
    shop.data
      .filter((p) => p.published)
      .forEach((p) => {
        entries.push({
          url: `${base}/shop/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      });
  } catch {
    /* API unavailable at build time */
  }

  return entries;
}
