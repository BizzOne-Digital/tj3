"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { FaqItem } from "@/types/cms";

export default function AdminFaqPage() {
  return (
    <GenericCrudPage<FaqItem>
      resource="faq"
      title="FAQ Items"
      defaultValues={{ published: true, order: 0 }}
      columns={[
        { key: "question", label: "Question" },
        { key: "category", label: "Category" },
      ]}
      fields={[
        { name: "question", label: "Question" },
        { name: "answer", label: "Answer", type: "textarea" },
        { name: "category", label: "Category" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
