import { STATIC_NEWS } from "./home-content";
import type { NewsArticle } from "@/types/cms";

export function getStaticNewsArticles(): NewsArticle[] {
  return STATIC_NEWS.map((article) => ({ ...article }));
}

export function getStaticNewsBySlug(slug: string): NewsArticle | undefined {
  return getStaticNewsArticles().find((a) => a.slug === slug);
}
