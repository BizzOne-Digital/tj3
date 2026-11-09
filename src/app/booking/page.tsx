import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { BookingForm } from "@/features/booking/BookingForm";
import { getContent } from "@/lib/site-content-server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Facility Interest",
  description: "Express interest in booking space at Little Mounties Community Sports Complex.",
  path: "/booking",
});

export default async function BookingPage() {
  const booking = await getContent("page.booking");
  return (
    <>
      <PageHero title={booking.title} subtitle={booking.subtitle} />
      <section className="py-24">
        <Container className="max-w-2xl">
          <p className="mb-8 text-cool-grey">
            {booking.intro}{" "}
            <Link href="/league" className="text-ice underline hover:text-white">
              {booking.leagueLinkLabel}
            </Link>{" "}
            {booking.introSuffix}
          </p>
          <BookingForm facilities={booking.facilityOptions} />
        </Container>
      </section>
    </>
  );
}
