"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { PricingTier } from "@/types/cms";

export default function AdminPricingPage() {
  return (
    <GenericCrudPage<PricingTier>
      resource="pricing"
      title="Pricing Tiers"
      defaultValues={{ published: true, order: 0, ctaLabel: "Get Started", ctaUrl: "/booking", features: [] }}
      columns={[
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "highlighted", label: "Featured", render: (i) => (i.highlighted ? "Yes" : "No") },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "price", label: "Price" },
        { name: "period", label: "Period (e.g. month)" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "ctaLabel", label: "CTA Label" },
        { name: "ctaUrl", label: "CTA URL" },
        { name: "order", label: "Order", type: "number" },
        { name: "highlighted", label: "Highlighted", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
