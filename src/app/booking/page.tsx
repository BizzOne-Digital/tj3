import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { BookingForm } from "@/features/booking/BookingForm";
import { BOOKING_FACILITY_OPTIONS } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Facility Interest",
  description: "Express interest in booking space at Little Mounties Community Sports Complex.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        title="Facility Interest"
        subtitle="Our facility is coming soon to Clearfield County. Share your booking interest and we'll contact you when reservations open."
      />
      <section className="py-24">
        <Container className="max-w-2xl">
          <p className="mb-8 text-cool-grey">
            Little Mounties Community Sports Complex is not yet open for court bookings. Use this form to tell us
            about your league, team, or event needs—or visit our{" "}
            <Link href="/league" className="text-ice underline hover:text-white">
              Bring Your League Here
            </Link>{" "}
            form for detailed league information.
          </p>
          <BookingForm facilities={[...BOOKING_FACILITY_OPTIONS]} />
        </Container>
      </section>
    </>
  );
}
