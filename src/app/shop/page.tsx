import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SiteImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { SHOP_CONTENT } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Shop",
  description: "Official Little Mounties merchandise and gear.",
  path: "/shop",
});

export default async function ShopPage() {
  let products: Awaited<ReturnType<typeof api.getShop>>["data"] = [];
  try {
    const res = await api.getShop();
    products = res.data.filter((p) => p.published);
  } catch {
    /* empty */
  }

  return (
    <>
      <PageHero title={SHOP_CONTENT.title} subtitle={SHOP_CONTENT.body} />
      <section className="overflow-x-clip py-24">
        <Container>
          <ScrollReveal>
            <SiteImage
              imageKey="products"
              alt="Built for more than basketball"
              className="mx-auto aspect-[21/9] w-full max-w-4xl rounded-2xl"
              objectFit="contain"
            />
          </ScrollReveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-cool-grey">{SHOP_CONTENT.body}</p>

          {products.length > 0 ? (
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, i) => (
                <ScrollReveal key={product._id} delay={i * 0.05}>
                  <article className="glass-panel overflow-hidden rounded-2xl">
                    <Link href={`/shop/${product.slug}`} className="relative block aspect-square">
                      <CmsImage src={product.imageUrl || "/images/products.png"} alt={product.name} fill />
                    </Link>
                    <div className="p-5">
                      <Link href={`/shop/${product.slug}`}>
                        <h2 className="font-display text-xl text-white hover:text-ice">{product.name}</h2>
                      </Link>
                      <p className="mt-1 font-semibold text-ice">{formatPrice(product.price)}</p>
                      <Button href={`/shop/${product.slug}`} variant="outline" size="sm" className="mt-4 w-full">
                        View Product
                      </Button>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 flex justify-center">
              <Button href="/founding-members" variant="outline">
                Join Founding Members List
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
