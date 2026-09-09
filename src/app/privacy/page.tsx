import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Little Mounties Community Sports Complex.",
  path: "/privacy",
});

const defaultContent = `
<h2>Information We Collect</h2>
<p>We collect information you provide when booking courts, contacting us, or signing up for programs. This may include name, email, phone number, and payment details.</p>
<h2>How We Use Your Information</h2>
<p>We use your information to process bookings, respond to inquiries, send relevant updates, and improve our services.</p>
<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information.</p>
<h2>Contact</h2>
<p>For privacy-related questions, please contact us through our contact page.</p>
`;

export default async function PrivacyPage() {
  let content = defaultContent;
  try {
    const page = await api.getPage("privacy");
    content = page.data.content;
  } catch {
    /* use default */
  }

  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: content }} />
        </Container>
      </section>
    </>
  );
}
