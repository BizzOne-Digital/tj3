import { HomeHero } from "@/features/home/HomeHero";
import {
  WelcomeSection,
  CourtPlansSection,
  LeagueCTASection,
  OfferingsSection,
  MembershipSection,
  CampaignSection,
  EconomicSection,
  DonateSection,
  RealEstateSection,
  InvestmentSection,
  StayConnectedSection,
  PartnersCTASection,
} from "@/features/home/HomePageSections";
import { api } from "@/lib/api";
import { organizationJsonLd } from "@/lib/seo";

async function getHomeData() {
  try {
    const settings = await api.getSettings();
    return { settings: settings.data };
  } catch {
    return { settings: null };
  }
}

export default async function HomePage() {
  const { settings } = await getHomeData();

  const jsonLd = organizationJsonLd({
    name: settings?.siteName,
    email: settings?.contactEmail,
    phone: settings?.contactPhone,
    address: settings?.address,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero
        donationUrl={settings?.zeffyDonationUrl}
        logoUrl={settings?.logoUrl}
        announcement={settings?.announcement}
      />
      <WelcomeSection />
      <CourtPlansSection />
      <LeagueCTASection />
      <PartnersCTASection />
      <OfferingsSection />
      <MembershipSection />
      <CampaignSection />
      <EconomicSection />
      <DonateSection />
      <RealEstateSection />
      <InvestmentSection />
      <StayConnectedSection />
    </>
  );
}
