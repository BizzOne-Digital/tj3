import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ShopProductActions } from "@/features/shop/ShopProductActions";
import { api } from "@/lib/api";
import { productJsonLd, buildMetadata } from "@/lib/seo";
import { formatPrice, getSiteUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { data } = await api.getProductBySlug(slug);
    return buildMetadata({
      title: data.name,
      description: data.description,
      path: `/shop/${slug}`,
      image: data.imageUrl,
    });
  } catch {
    return buildMetadata({ title: "Product Not Found", noIndex: true });
  }
}

export default async function ShopProductPage({ params }: Props) {
  const { slug } = await params;
  let product;
  try {
    const res = await api.getProductBySlug(slug);
    product = res.data;
  } catch {
    notFound();
  }

  const jsonLd = productJsonLd({
    name: product.name,
    description: product.description,
    url: `${getSiteUrl()}/shop/${slug}`,
    image: product.imageUrl,
    price: product.price,
    currency: "USD",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero title={product.name} subtitle={product.category} imageUrl={product.imageUrl} />
      <section className="py-16">
        <Container className="max-w-2xl">
          <p className="font-display text-4xl gradient-text">{formatPrice(product.price)}</p>
          <p className="mt-6 text-cool-grey">{product.description}</p>
          <p className="mt-2 text-sm text-cool-grey">
            {product.inStock ? "In stock" : "Out of stock"}
          </p>
          <ShopProductActions product={product} />
        </Container>
      </section>
    </>
  );
}
