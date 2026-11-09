"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { Coach } from "@/types/cms";

export default function AdminCoachesPage() {
  return (
    <GenericCrudPage<Coach>
      resource="coaches"
      title="Coaches"
      itemLabel="Coach"
      defaultValues={{ published: true, order: 0, credentials: [] }}
      columns={[
        { key: "name", label: "Name" },
        { key: "sport", label: "Sport / specialty" },
        { key: "title", label: "Title" },
        { key: "order", label: "Order" },
        { key: "published", label: "Status", render: (i) => (i.published ? "Published" : "Hidden") },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug", help: "Leave blank to generate from the name." },
        { name: "title", label: "Title", placeholder: "Head Coach" },
        { name: "sport", label: "Sport / specialty", placeholder: "Baseball" },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "credentials", label: "Credentials / achievements", type: "lines" },
        { name: "photoUrl", label: "Photo", type: "image", folder: "gallery" },
        { name: "email", label: "Email (shown publicly)" },
        { name: "phone", label: "Phone (shown publicly)" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
