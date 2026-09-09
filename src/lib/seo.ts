import type { Metadata } from "next";
import { BRAND } from "./constants";
import { getSiteUrl } from "./utils";

export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${BRAND.name}` : BRAND.name;
  const desc =
    description ??
    "Next-generation indoor sports and family entertainment facility coming to Clearfield County, Pennsylvania.";
  const url = `${getSiteUrl()}${path}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: BRAND.name,
      images: image ? [{ url: image }] : undefined,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}

export function organizationJsonLd(data?: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: data?.name ?? BRAND.name,
    email: data?.email ?? BRAND.email,
    telephone: data?.phone ?? BRAND.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philipsburg",
      addressRegion: "PA",
      addressCountry: "US",
      description: data?.address ?? BRAND.location,
    },
    areaServed: "Clearfield County, Pennsylvania",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  price: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: `${getSiteUrl()}/shop/${product.slug}`,
    },
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    url: `${getSiteUrl()}/news/${article.slug}`,
  };
}
