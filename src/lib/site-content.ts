/**
 * Site content registry.
 *
 * Every editable text/image block on the public site is declared here with its
 * default value (the copy that ships in code). The admin portal stores only the
 * *overrides* in MongoDB (SiteContent collection); at render time the override
 * is merged over the default, so a missing/cleared override always falls back
 * to the shipped content.
 *
 * This file is isomorphic (no server-only imports) so client components and the
 * admin editor can use the same registry.
 */
import { BRAND, HERO_BG } from "./constants";
import {
  CAMPAIGN_HEADLINE,
  FOUNDING_MEMBERS_INTRO,
  HOME_WELCOME,
  INVESTMENT,
  LEAGUE_INTRO,
  LEAGUE_SPORTS,
  MEMBERSHIPS,
  OFFERINGS,
  OFFERING_GALLERY,
  PARTNER_CONTENT,
  REAL_ESTATE,
  SHOP_CONTENT,
  SITE_IMAGES,
  STAY_CONNECTED_BULLETS,
  STAY_CONNECTED_FOOTER,
  ECONOMIC_IMPACT,
  BOOKING_FACILITY_OPTIONS,
} from "./home-content";

export const CONTENT_DEFAULTS = {
  // ---------------------------------------------------------------- Images
  images: {
    welcome: SITE_IMAGES.welcome as string,
    courtPlan1: SITE_IMAGES.courtPlan1 as string,
    courtPlan2: SITE_IMAGES.courtPlan2 as string,
    products: SITE_IMAGES.products as string,
  },

  // ------------------------------------------------------------------ Home
  "home.hero": {
    backgroundImage: HERO_BG as string,
    kicker: "The Future of Community Sports",
    headlineLine1: "BUILDING MORE THAN A GYM.",
    headlineLine2: "BUILDING A STRONGER COMMUNITY.",
    description: BRAND.heroDescription as string,
    exploreButtonLabel: "Explore the Vision",
    location: "Philipsburg • Clearfield County, PA",
  },
  "home.welcome": { ...HOME_WELCOME },
  "home.leagues": {
    eyebrow: "Leagues & Teams",
    ...LEAGUE_INTRO,
    sports: [...LEAGUE_SPORTS],
    formButtonLabel: LEAGUE_INTRO.formTitle,
    partnerButtonLabel: "Partner With Us",
  },
  "home.partnersCta": {
    ...PARTNER_CONTENT,
    buttonLabel: "Partner With Us",
  },
  "home.offerings": {
    eyebrow: "What We Offer",
    title: "What Is Little Mounties Community Sports Complex Offering?",
    ...OFFERINGS,
    gallery: [...OFFERING_GALLERY] as string[],
    productsButtonLabel: "View Products",
  },
  "home.memberships": {
    ...MEMBERSHIPS,
    earlyText: FOUNDING_MEMBERS_INTRO.early,
    buttonLabel: "Founding Members Interest Form",
  },
  "home.campaign": {
    eyebrow: "Capital Campaign",
    title: "Capital Campaign Prospectus",
    headline: CAMPAIGN_HEADLINE,
    cardLabel: "Campaign Draft Prospectus",
    cardTitle: "Capital Campaign Prospectus",
    cardBody:
      "Review the full capital campaign prospectus with giving levels, recognition opportunities, and community impact details.",
    prospectusButtonLabel: "View Prospectus PDF",
    prospectusUrl: "/images/campaign-prospectus.pdf",
    tiersButtonLabel: "View Sponsorship Tiers",
    closingText:
      "From facility naming rights to community supporter tiers, every gift helps build Clearfield County's next-generation sports destination.",
    donateButtonLabel: "Donate Any Amount",
  },
  "home.economic": {
    eyebrow: "Clearfield County",
    title: "An Economic Driver for Clearfield County",
    items: [...ECONOMIC_IMPACT],
  },
  "home.donate": {
    title: "Donate",
    body: "Help build a lasting legacy for our community. Please give any amount to this campaign to help build our community's future.",
    buttonLabel: "Click Here For Payment",
  },
  "home.realEstate": { title: REAL_ESTATE.title, body: [...REAL_ESTATE.body] },
  "home.investment": { title: INVESTMENT.title, body: [...INVESTMENT.body] },
  "home.stayConnected": {
    title: "Stay Connected",
    intro:
      "We're excited to continue sharing updates as Little Mounties Community Sports Complex develops. Join our Facebook Page to stay informed about:",
    bullets: [...STAY_CONNECTED_BULLETS],
    footer: STAY_CONNECTED_FOOTER,
    buttonLabel: "Join Our Facebook Page",
  },

  // ----------------------------------------------------------- Other pages
  "page.about": {
    whoWeAreTitle: "Who We Are",
    pillars: [
      { title: "Our Mission", body: HOME_WELCOME.mission },
      {
        title: "For Every Family",
        body: "From elite athlete development to birthday parties and family experiences, Little Mounties Community Sports Complex brings training, play, and community together under one roof.",
      },
      {
        title: "Community Impact",
        body: "We are building more than a gym — a hub of opportunity, wellness, and connection for Clearfield County and Central Pennsylvania.",
      },
    ],
    planEyebrow: "The Plan",
    contactTitle: "Project Contact",
    ctaTitle: "Help Build the Future of Community Sports",
    ctaBody:
      "Partner with us, support the capital campaign, or stay connected as Little Mounties Community Sports Complex comes to Clearfield County.",
  },
  "page.partners": { ...PARTNER_CONTENT },
  "page.founding": { title: "Future Members", ...FOUNDING_MEMBERS_INTRO },
  "page.shop": { ...SHOP_CONTENT },
  "page.booking": {
    title: "Facility Interest",
    subtitle:
      "Our facility is coming soon to Clearfield County. Share your booking interest and we'll contact you when reservations open.",
    intro:
      "Little Mounties Community Sports Complex is not yet open for court bookings. Use this form to tell us about your league, team, or event needs—or visit our",
    leagueLinkLabel: "Bring Your League Here",
    introSuffix: "form for detailed league information.",
    facilityOptions: [...BOOKING_FACILITY_OPTIONS] as string[],
  },

  // ------------------------------------------------ Hero banners per page
  pageHeroes: {
    about: { title: "About Little Mounties", subtitle: "VISION FOR TODAY. A LEGACY FOR TOMORROW." },
    services: {
      title: "Facility & Services",
      subtitle: "What Little Mounties Community Sports Complex is offering.",
    },
    pricing: { title: "Founding Partners", subtitle: CAMPAIGN_HEADLINE },
    news: { title: "News", subtitle: "Stay up to date with our community." },
    team: {
      title: "Our Team",
      subtitle: "The people building Clearfield County's next sports destination.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Answers to common questions about Little Mounties Community Sports Complex.",
    },
    contact: {
      title: "Contact Us",
      subtitle: `Reach ${BRAND.contactPerson} — we'd love to hear from you.`,
    },
    schedule: {
      title: "Schedule",
      subtitle: "Weekly programs, camps, clinics, and special events.",
    },
    coaches: {
      title: "Our Coaches",
      subtitle: "Meet the coaches and trainers behind our programs.",
    },
    gallery: { title: "Gallery", subtitle: "A look at the project, the community, and the vision." },
  },
};

export type ContentKey = keyof typeof CONTENT_DEFAULTS;
export type ContentOf<K extends ContentKey> = (typeof CONTENT_DEFAULTS)[K];

export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS) as ContentKey[];

/** Admin-portal grouping: which page each editable section belongs to. */
export const CONTENT_SECTIONS: {
  key: ContentKey;
  group: string;
  label: string;
  description: string;
}[] = [
  { key: "images", group: "Site Images", label: "Main site images", description: "Welcome photo, court plans and products banner used across the site." },
  { key: "home.hero", group: "Home Page", label: "Hero banner", description: "Top banner: background photo, headline, description and button." },
  { key: "home.welcome", group: "Home Page", label: "Welcome & vision", description: "Welcome text, mission and vision list (also used on the About page)." },
  { key: "home.leagues", group: "Home Page", label: "Leagues & teams", description: "League call-to-action and sports list (also used on the League page)." },
  { key: "home.partnersCta", group: "Home Page", label: "Partners call-to-action", description: "Partner block near the top of the home page." },
  { key: "home.offerings", group: "Home Page", label: "What we offer", description: "Offering blocks and the photo gallery." },
  { key: "home.memberships", group: "Home Page", label: "Memberships", description: "Membership text and button." },
  { key: "home.campaign", group: "Home Page", label: "Capital campaign", description: "Prospectus card and donate button." },
  { key: "home.economic", group: "Home Page", label: "Economic impact", description: "Economic driver bullet list (also used on the About page)." },
  { key: "home.donate", group: "Home Page", label: "Donate block", description: "Donate heading, text and button label." },
  { key: "home.realEstate", group: "Home Page", label: "Real estate", description: "Real estate story paragraphs." },
  { key: "home.investment", group: "Home Page", label: "Investment opportunity", description: "Investment paragraphs." },
  { key: "home.stayConnected", group: "Home Page", label: "Stay connected", description: "Facebook / updates block." },
  { key: "page.about", group: "About Page", label: "About page blocks", description: "Pillars, contact and closing call-to-action." },
  { key: "page.partners", group: "Partners Page", label: "Partners page", description: "Headline, intro and partnership opportunities." },
  { key: "page.founding", group: "Future Members Page", label: "Future members page", description: "Heading and intro text." },
  { key: "page.shop", group: "Shop Page", label: "Shop page", description: "Heading and intro text." },
  { key: "page.booking", group: "Booking Page", label: "Booking page", description: "Heading and the facility dropdown options." },
  { key: "pageHeroes", group: "Page Banners", label: "Page banner titles", description: "Title and subtitle shown at the top of Facility, Sponsorship, News, Team, FAQ, Contact, Schedule, Coaches and Gallery pages." },
];

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Merge an admin override over the shipped defaults.
 * - objects merge key by key (so new default keys keep working after a deploy)
 * - arrays / strings / numbers / booleans are replaced wholesale when the
 *   override has the same type as the default
 * - anything undefined / null / wrong type falls back to the default
 */
export function mergeContent<T>(defaults: T, override: unknown): T {
  if (override === undefined || override === null) return defaults;
  if (isPlainObject(defaults)) {
    if (!isPlainObject(override)) return defaults;
    const out: Record<string, unknown> = { ...defaults };
    for (const key of Object.keys(override)) {
      if (key.startsWith("$") || key === "__proto__") continue;
      out[key] =
        key in defaults
          ? mergeContent((defaults as Record<string, unknown>)[key], override[key])
          : override[key];
    }
    return out as T;
  }
  if (Array.isArray(defaults)) {
    return (Array.isArray(override) ? override : defaults) as T;
  }
  return (typeof override === typeof defaults ? override : defaults) as T;
}

export type ContentOverrides = Partial<Record<ContentKey, unknown>>;

export function resolveContent<K extends ContentKey>(
  key: K,
  overrides: ContentOverrides | undefined,
): ContentOf<K> {
  return mergeContent(CONTENT_DEFAULTS[key], overrides?.[key]);
}

export function isContentKey(key: string): key is ContentKey {
  return Object.prototype.hasOwnProperty.call(CONTENT_DEFAULTS, key);
}
