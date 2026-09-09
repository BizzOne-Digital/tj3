"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { Sponsor } from "@/types/cms";

export default function AdminSponsorsPage() {
  return (
    <GenericCrudPage<Sponsor>
      resource="sponsors"
      title="Sponsors"
      defaultValues={{ published: true, order: 0, tier: "community" }}
      columns={[
        { key: "name", label: "Name" },
        { key: "tier", label: "Tier" },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "logoUrl", label: "Logo", type: "image", folder: "gallery" },
        { name: "websiteUrl", label: "Website URL" },
        {
          name: "tier",
          label: "Tier",
          type: "select",
          options: [
            { value: "platinum", label: "Platinum" },
            { value: "gold", label: "Gold" },
            { value: "silver", label: "Silver" },
            { value: "community", label: "Community" },
          ],
        },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
