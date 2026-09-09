"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { StatItem } from "@/types/cms";

export default function AdminStatsPage() {
  return (
    <GenericCrudPage<StatItem>
      resource="stats"
      title="Stats"
      defaultValues={{ published: true, order: 0, value: 0 }}
      columns={[
        { key: "label", label: "Label" },
        { key: "value", label: "Value" },
        { key: "suffix", label: "Suffix" },
      ]}
      fields={[
        { name: "label", label: "Label" },
        { name: "value", label: "Value", type: "number" },
        { name: "prefix", label: "Prefix" },
        { name: "suffix", label: "Suffix" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
