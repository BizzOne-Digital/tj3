import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/features/contact/ContactForm";
import { api } from "@/lib/api";
import { BRAND } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Little Mounties Community Sports Complex.",
  path: "/contact",
});

export default async function ContactPage() {
  let settings = null;
  try {
    const res = await api.getSettings();
    settings = res.data;
  } catch {
    settings = {
      address: BRAND.location,
      contactEmail: BRAND.email,
      contactPhone: BRAND.phone,
      contactPerson: BRAND.contactPerson,
    };
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle={`Reach ${BRAND.contactPerson} — we'd love to hear from you.`}
      />
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              {settings?.contactPerson && (
                <div>
                  <p className="font-medium text-white">Contact</p>
                  <p className="text-cool-grey">{settings.contactPerson}</p>
                </div>
              )}
              {settings?.address && (
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-ice" />
                  <div>
                    <p className="font-medium text-white">Address</p>
                    <p className="text-cool-grey">{settings.address}</p>
                  </div>
                </div>
              )}
              {settings?.contactEmail && (
                <div className="flex gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-ice" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href={`mailto:${settings.contactEmail}`} className="text-cool-grey hover:text-ice">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>
              )}
              {settings?.contactPhone && (
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-ice" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href={`tel:${settings.contactPhone}`} className="text-cool-grey hover:text-ice">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
