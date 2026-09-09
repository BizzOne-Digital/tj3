"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { TeamMember } from "@/types/cms";

export default function AdminTeamPage() {
  return (
    <GenericCrudPage<TeamMember>
      resource="team"
      title="Team Members"
      defaultValues={{ published: true, order: 0 }}
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "role", label: "Role" },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "photoUrl", label: "Photo", type: "image", folder: "gallery" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
