"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { Facility } from "@/types/cms";

export default function AdminFacilitiesPage() {
  return (
    <GenericCrudPage<Facility>
      resource="facilities"
      title="Facilities"
      itemLabel="Facility"
      defaultValues={{ published: true, order: 0, features: [] }}
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "features", label: "Features", type: "lines" },
        { name: "imageUrl", label: "Image", type: "image", folder: "gallery" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
