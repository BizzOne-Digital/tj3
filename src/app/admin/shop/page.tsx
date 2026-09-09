"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import type { ShopProduct } from "@/types/cms";

export default function AdminShopPage() {
  return (
    <GenericCrudPage<ShopProduct>
      resource="shop"
      title="Shop Products"
      defaultValues={{ published: true, inStock: true, comingSoon: false, price: 0, featured: false }}
      columns={[
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "inStock", label: "Stock", render: (i) => (i.inStock ? "In Stock" : "Out") },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "price", label: "Price", type: "number" },
        { name: "imageUrl", label: "Product Image", type: "image", folder: "products" },
        { name: "category", label: "Category" },
        { name: "externalCheckoutUrl", label: "External Purchase URL" },
        { name: "inStock", label: "In Stock", type: "checkbox" },
        { name: "comingSoon", label: "Coming Soon", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
