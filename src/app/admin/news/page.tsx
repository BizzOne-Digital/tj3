"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { NewsArticle } from "@/types/cms";

export default function AdminNewsPage() {
  return (
    <GenericCrudPage<NewsArticle>
      resource="news"
      title="News Articles"
      defaultValues={{ published: true, featured: false }}
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        {
          key: "published",
          label: "Status",
          render: (item) => (item.published ? "Published" : "Draft"),
        },
      ]}
      fields={[
        { name: "title", label: "Title" },
        { name: "slug", label: "Slug" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content (HTML)", type: "textarea" },
        { name: "imageUrl", label: "Featured Image", type: "image", folder: "gallery" },
        { name: "author", label: "Author" },
        { name: "publishedAt", label: "Published Date (ISO)" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
