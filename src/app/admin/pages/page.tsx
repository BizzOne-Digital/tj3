"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { PageContent } from "@/types/cms";

export default function AdminPagesPage() {
  return (
    <GenericCrudPage<PageContent>
      resource="pages"
      title="Pages"
      defaultValues={{ published: true }}
      columns={[
        { key: "slug", label: "Slug" },
        { key: "title", label: "Title" },
      ]}
      fields={[
        { name: "slug", label: "Slug (about, privacy, terms)" },
        { name: "title", label: "Title" },
        { name: "subtitle", label: "Subtitle" },
        { name: "heroImageUrl", label: "Hero Image", type: "image", folder: "pages" },
        { name: "content", label: "Content (HTML)", type: "textarea" },
        { name: "seoTitle", label: "SEO Title" },
        { name: "seoDescription", label: "SEO Description", type: "textarea" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
