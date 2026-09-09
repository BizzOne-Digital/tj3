"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { Service } from "@/types/cms";

export default function AdminServicesPage() {
  return (
    <GenericCrudPage<Service>
      resource="services"
      title="Services"
      defaultValues={{ published: true, order: 0 }}
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "longDescription", label: "Long Description", type: "textarea" },
        { name: "imageUrl", label: "Image", type: "image", folder: "gallery" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
