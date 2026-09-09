"use client";

import { trackShopClick } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import type { ShopProduct } from "@/types/cms";

export function ShopProductActions({ product }: { product: ShopProduct }) {
  if (product.externalUrl) {
    return (
      <Button
        href={product.externalUrl}
        external
        className="mt-8"
        disabled={!product.inStock}
        onClick={() => trackShopClick(product.name)}
      >
        {product.inStock ? "Purchase" : "Out of Stock"}
      </Button>
    );
  }

  return (
    <Button className="mt-8" disabled={!product.inStock}>
      {product.inStock ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}
