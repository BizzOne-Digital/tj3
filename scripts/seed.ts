import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/db";
import {
  Facility,
  Faq,
  News,
  PageContent,
  Pricing,
  Service,
  SiteSettings,
  TeamMember,
  User,
} from "../src/lib/models";
import { BRAND, BRAND_LOGO, CONCEPT_IMAGES } from "../src/lib/constants";
import {
  ABOUT_CONTENT,
  STATIC_FAQ,
  STATIC_NEWS,
  STATIC_PRICING_TIERS,
  STATIC_SERVICES,
} from "../src/lib/home-content";

const ZEFFY = BRAND.donationUrl;

const sponsorshipTiers = STATIC_PRICING_TIERS.map((tier) => ({
  name: tier.name,
  price: tier.price,
  category: tier.category,
  description: tier.description,
  features: tier.features,
  ctaLabel: "Click Here For Payment",
  ctaUrl: ZEFFY,
  zeffyUrl: ZEFFY,
  highlighted: tier.highlighted ?? false,
  order: tier.order,
}));

async function seed() {
  await connectDB();
  console.log("Seeding Little Mounties database...");

  await SiteSettings.deleteMany({});
  await User.deleteMany({});
  await Facility.deleteMany({});
  await Service.deleteMany({});
  await Pricing.deleteMany({});
  await Faq.deleteMany({});
  await News.deleteMany({});
  await PageContent.deleteMany({});
  await TeamMember.deleteMany({});

  await SiteSettings.create({
    siteName: BRAND.name,
    tagline: BRAND.taglines[0],
    logoUrl: BRAND_LOGO,
    contactEmail: BRAND.email,
    contactPhone: BRAND.phone,
    contactPerson: BRAND.contactPerson,
    address: BRAND.location,
    zeffyDonationUrl: ZEFFY,
    facebookUrl: BRAND.facebook,
    hoursStatus: "Facility coming soon—contact us for updates.",
    footerStatement: BRAND.taglines[2],
    announcement: {
      enabled: true,
      message: "Coming Soon to Clearfield County",
      link: "/about",
      linkLabel: "Explore the Vision",
    },
  });

  const adminPass = process.env.ADMIN_PASSWORD || "Admin@12345";
  await User.create({
    email: "admin@littlemounties.com",
    passwordHash: await bcrypt.hash(adminPass, 12),
    name: "Tj Anderson",
    role: "super_admin",
  });

  const facilities = [
    { name: "High-Tech Baseball Training", slug: "baseball-training", description: "Advanced indoor baseball development.", imageUrl: CONCEPT_IMAGES.baseball, order: 1 },
    { name: "High-Tech Softball Training", slug: "softball-training", description: "Technology-driven softball instruction.", imageUrl: CONCEPT_IMAGES.training, order: 2 },
    { name: "Basketball Training", slug: "basketball-training", description: "Indoor basketball skill development and training.", imageUrl: CONCEPT_IMAGES.basketball, order: 3 },
    { name: "Tennis Training", slug: "tennis-training", description: "Court-based tennis instruction and programming.", imageUrl: CONCEPT_IMAGES.community, order: 4 },
    { name: "Multi-Sport Courts", slug: "multi-sport-courts", description: "Flexible courts for basketball, volleyball, and more.", imageUrl: CONCEPT_IMAGES.basketball, order: 5 },
    { name: "Play Zone", slug: "play-zone", description: "Massive family play space for year-round fun.", imageUrl: CONCEPT_IMAGES.family, order: 6 },
  ];
  await Facility.insertMany(facilities);

  await Service.insertMany(
    STATIC_SERVICES.map((s, i) => ({
      name: s.name,
      slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: s.description,
      order: i + 1,
    })),
  );

  await Pricing.insertMany(sponsorshipTiers);

  await Faq.insertMany(
    STATIC_FAQ.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      category: "General",
      order: i + 1,
    })),
  );

  await News.insertMany(
    STATIC_NEWS.map((article, i) => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      imageUrl: article.imageUrl,
      author: article.author,
      publishedAt: new Date(article.publishedAt ?? Date.now()),
      featured: article.featured ?? false,
      order: i + 1,
    })),
  );

  await TeamMember.insertMany([
    {
      name: "Tj Anderson",
      slug: "tj-anderson",
      role: "Project Lead & Community Contact",
      bio: "Leading the development of Little Mounties Community Sports Complex for Clearfield County. Contact for partnerships, sponsorship, league interest, or general questions.",
      photoUrl: "/images/tj-anderson.png",
      order: 1,
    },
  ]);

  await PageContent.insertMany([
    {
      slug: "about",
      title: "About Us",
      subtitle: ABOUT_CONTENT.subtitle,
      content: ABOUT_CONTENT.html,
      published: true,
    },
    {
      slug: "privacy",
      title: "Privacy Policy",
      content:
        "<p>Little Mounties Community Sports Complex respects your privacy. Information submitted through our forms (league interest, partnerships, founding members, contact) is used to respond to inquiries and share project updates.</p><p>For questions, contact Tj Anderson at tjandersty@gmail.com.</p>",
      published: true,
    },
    {
      slug: "terms",
      title: "Terms of Service",
      content:
        "<p>By using this website and submitting forms, you agree to receive communications related to Little Mounties Community Sports Complex development, partnerships, and community updates.</p><p>Donations are processed through Zeffy. Facility use terms will be published prior to opening.</p>",
      published: true,
    },
  ]);

  console.log("Seed complete.");
  console.log("Admin login: admin@littlemounties.com /", adminPass);
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
