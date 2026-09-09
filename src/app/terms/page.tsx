import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for Little Mounties Community Sports Complex.",
  path: "/terms",
});

const defaultContent = `
<h2>Acceptance of Terms</h2>
<p>By using our facilities and services, you agree to these terms of service.</p>
<h2>Facility Use</h2>
<p>Users must follow all facility rules, respect other members, and use equipment responsibly. We reserve the right to revoke access for violations.</p>
<h2>Bookings & Cancellations</h2>
<p>Court bookings must be cancelled at least 24 hours in advance for a full refund. Late cancellations may incur fees.</p>
<h2>Liability</h2>
<p>Participation in sports activities involves inherent risk. Users participate at their own risk.</p>
`;

export default async function TermsPage() {
  let content = defaultContent;
  try {
    const page = await api.getPage("terms");
    content = page.data.content;
  } catch {
    /* use default */
  }

  return (
    <>
      <PageHero title="Terms of Service" />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: content }} />
        </Container>
      </section>
    </>
  );
}
