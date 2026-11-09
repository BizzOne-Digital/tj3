"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { PricingTier } from "@/types/cms";

export default function AdminPricingPage() {
  return (
    <GenericCrudPage<PricingTier>
      resource="pricing"
      title="Pricing Tiers"
      itemLabel="Pricing Tier"
      defaultValues={{ published: true, order: 0, ctaLabel: "Click Here For Payment", ctaUrl: "", category: "Supporter", features: [] }}
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
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            { value: "Naming Rights", label: "Naming Rights" },
            { value: "Platinum", label: "Platinum" },
            { value: "Gold", label: "Gold" },
            { value: "Silver", label: "Silver" },
            { value: "Bronze", label: "Bronze" },
            { value: "Supporter", label: "Supporter" },
            { value: "Friend", label: "Friend" },
          ],
        },
        { name: "features", label: "Benefits / features", type: "lines" },
        { name: "ctaLabel", label: "CTA Label" },
        { name: "ctaUrl", label: "CTA URL" },
        { name: "zeffyUrl", label: "Zeffy payment URL" },
        { name: "order", label: "Order", type: "number" },
        { name: "highlighted", label: "Highlighted", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
