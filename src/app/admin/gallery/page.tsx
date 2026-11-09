"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import { resolveImageUrl } from "@/lib/upload-helpers";
import type { GalleryImage } from "@/types/cms";

export default function AdminGalleryPage() {
  return (
    <GenericCrudPage<GalleryImage>
      resource="gallery"
      title="Gallery"
      itemLabel="Photo"
      defaultValues={{ published: true, order: 0 }}
      columns={[
        {
          key: "imageUrl",
          label: "Photo",
          render: (i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolveImageUrl(i.imageUrl)} alt="" className="h-12 w-16 rounded object-cover" />
          ),
        },
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "order", label: "Order" },
        { key: "published", label: "Status", render: (i) => (i.published ? "Published" : "Hidden") },
      ]}
      fields={[
        { name: "imageUrl", label: "Photo", type: "image", folder: "gallery" },
        { name: "title", label: "Title" },
        { name: "category", label: "Category" },
        { name: "caption", label: "Caption", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
