import { BRAND, HERO_BG } from "./constants";
import { DRIVE_IMAGE_MAP, DRIVE_OFFERING_FILE_PREFIX } from "./drive-images";

/** Synced from public/New Building Website — run `npm run sync:images` */
export const SITE_IMAGES = {
  welcome: DRIVE_IMAGE_MAP.welcome.publicPath,
  courtPlan1: DRIVE_IMAGE_MAP.courtPlan1.publicPath,
  courtPlan2: DRIVE_IMAGE_MAP.courtPlan2.publicPath,
  products: DRIVE_IMAGE_MAP.products.publicPath,
  campaignProspectus: DRIVE_IMAGE_MAP.campaignProspectus.publicPath,
} as const;

/** Main Page Pictures / offering folder — one gallery block on homepage (not per text tab) */
export const OFFERING_GALLERY = [
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-1.jpg`,
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-2.jpg`,
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-3.jpg`,
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-4.jpg`,
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-5.jpg`,
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-6.jpg`,
  `/images/${DRIVE_OFFERING_FILE_PREFIX}-7.jpg`,
] as const;

export const IMAGE_FALLBACKS: Record<keyof typeof SITE_IMAGES, string> = {
  welcome: "/images/placeholder.svg",
  courtPlan1: "/images/placeholder.svg",
  courtPlan2: "/images/placeholder.svg",
  products: "/images/placeholder.svg",
  campaignProspectus: "/images/placeholder.svg",
};

export const ZEFFY_URL = BRAND.donationUrl;
export const FACEBOOK_URL = BRAND.facebook;

export const HOME_WELCOME = {
  badge: "‼Coming Soon to Clearfield County‼",
  headline: "Little Mounties Community Sports Complex",
  subheadline: "Little Mounties Community Sports Complex, one stop shop for the sports.",
  paragraphs: [
    "Little Mounties Community Sports Complex is a next-generation indoor sports and family entertainment facility coming to Clearfield County.",
    "The facility will feature high-tech baseball and softball training, indoor basketball and multi-sport courts, and a massive two-story play zone designed for year-round use.",
    "From elite athlete development to birthday parties and family experiences, Little Mounties Community Sports Complex brings everything under one roof.",
  ],
  legacyLine: "VISION FOR TODAY. A LEGACY FOR TOMORROW.",
  mission:
    "Our mission is to build a state-of-the-art recreation center that will serve youth, families, and the greater community—regardless of background or circumstance. This center will be a hub of opportunity, wellness, and connection.",
  visionTitle: "Vision",
  visionIntro: "A fully developed sports complex that includes:",
  visionItems: [
    "Indoor basketball/volleyball courts, batting cages, concessions, meeting rooms, and more",
    "Outdoor multi-use courts and fields",
    'A "Shed Hotel Village" for visiting teams and events—ideas welcome',
    "Community event spaces",
    "Training and development programs",
    "Partnerships with local schools, AAU programs, and regional tournaments",
  ],
};

export const LEAGUE_SPORTS = [
  "Softball",
  "Baseball",
  "Volleyball",
  "Wrestling",
  "Lacrosse",
  "Pickleball",
];

export const OFFERINGS = {
  intro:
    "Keep scrolling to learn more about what we are going to offer and reach out if you have something you'd like to see included.",
  athletic: {
    title: "Athletic Development",
    body: "In our facility, you will find dedicated coaching and training for baseball and softball. With training tunnels, turf space, fitness area, and analytics using HitTrax Pro, our facility will take your athlete to the next level. Our technology will provide instant feedback and measurable changes that will help at all levels.",
  },
  family: {
    title: "Family Entertainment",
    body: "Little Mounties Community Sports Complex is designed to be more than a training facility—it's a place where the entire family can spend time together. While athletes train, siblings can explore our interactive play zone, parents can relax with food and drinks, and friends can compete across a variety of sports and entertainment experiences.",
    playStructure:
      "Our family entertainment area will feature an active play structure, social gaming attractions, sports simulators, interactive experiences, automated batting cages, and comfortable gathering spaces designed for both kids and adults. Guests will be able to enjoy:",
    bullets: [
      "Baseball and softball",
      "Interactive sports gaming",
      "Automated batting cages",
      "Birthday parties and group events",
      "Camps and family activities",
      "Food, drinks, and social spaces",
      "Corporate and team outings",
    ],
    closing:
      "Whether you're visiting for training, a birthday party, a tournament weekend, or just a fun night out, Little Mounties Community Sports Complex is being built to create an energetic, family-friendly atmosphere that keeps people coming back year-round.",
    goal: "Our goal is simple: create a clean, exciting, and welcoming environment where sports, entertainment, and community all come together under one roof.",
  },
  camps: {
    title: "Camps, Clinics, Classes, and Tournaments",
    body: "Little Mounties Community Sports Complex is being built to provide year-round programming for athletes, teams, and families throughout Central Pennsylvania. Our facility will host camps, clinics, leagues, tournaments, private instruction, team training, and special events across multiple sports and age groups. Whether you're looking for skill development, competition, offseason training, or recreational programming, Little Mounties Community Sports Complex is designed to stay active all year long. Programming may include:",
    bullets: [
      "Baseball and softball training",
      "Multi-sport camps and clinics",
      "Strength and speed training",
      "Team practices and rentals",
      "Tournaments and showcases",
      "Youth leagues and classes",
      "Corporate and community events",
    ],
    goal: "Our goal is to create a flexible, high-energy environment that gives athletes, coaches, and organizations a place to train, compete, and grow regardless of the season.",
  },
  more: {
    title: "What Else Will There Be?",
    body: "Little Mounties Community Sports Complex is designed to bring together sports, technology, entertainment, and family experiences under one roof. In addition to sports programming, the facility is planned to feature:",
    bullets: [
      "Sports simulators and interactive gaming",
      "Automated batting cages",
      "Birthday party spaces",
      "Social gathering areas",
      "Food and beverage options",
      "Sports retail and merchandise",
      "Community events and activities",
    ],
    closing:
      "Whether you're coming for a lesson, tournament, family outing, or special event, Little Mounties Community Sports Complex is being built to create an exciting atmosphere for both athletes and families.",
  },
};

export const LEAGUE_INTRO = {
  question: "Are you part of a league or team?",
  cta: "Click here to tell us more about you!",
  headline: "Bring Your League Here!",
  sportsPrompt: "Are you a part of one of these sports leagues?",
  formPrompt:
    "If you are interested in using our spaces, help us by filling out the form below. This will help us better your experience when we open.",
  formTitle: "Let Us Know More About You!",
};

export const PARTNER_CONTENT = {
  headline: "We Are Looking for Partners!",
  intro:
    "Are you a coach, trainer, sports retail business, medical provider, sponsor, or local company that aligns with Little Mounties Community Sports Complex?",
  destination:
    "We're building a sports and family entertainment destination—and we're looking for the right people and businesses to grow with us.",
  ecosystemIntro:
    "Little Mounties Community Sports Complex is being built as more than just a sports facility. It is designed as a full ecosystem of training, entertainment, food, events, retail, wellness, and community partnerships. We are looking for experienced operators, coaches, business owners, brands, and local organizations who want to grow alongside one of Central Pennsylvania's largest indoor sports and family entertainment destinations.",
  whyTitle: "Why Partner With Us?",
  whyBody: [
    "Little Mounties Community Sports Complex is designed to bring families, athletes, teams, coaches, and local businesses together under one roof.",
    "Our model creates multiple ways for partners to benefit from shared traffic, events, tournaments, memberships, parties, camps, clinics, and year-round programming.",
    "A family may come in for baseball training, stay for food, book a birthday party, join a league, shop for gear, or return for a corporate event. That is the power of the Little Mounties ecosystem.",
  ],
  letsTalk:
    "If your business, skill set, organization, or brand could fit inside Little Mounties Community Sports Complex, we want to hear from you.",
  formTitle: "Tell Us About Your Partnership Idea",
  formSubtitle: "We'd love to hear from you.",
};

export const PARTNERSHIP_OPPORTUNITIES = [
  "Operating space inside the facility",
  "Coaching or training programs",
  "Sponsored areas or naming rights",
  "Event partnerships",
  "Retail or pro shop partnerships",
  "Food and beverage partnerships",
  "League and tournament hosting",
  "Corporate event partnerships",
  "Youth sports sponsorships",
  "Advisory roles with Little Mounties Community Sports Complex",
];

export const FOUNDING_MEMBERS_INTRO = {
  early:
    "We want to hear from you if you would be interested in being an early member. Click the button to learn more.",
  notSelling: "We are not selling memberships… yet.",
  body: "But if you are interested in being a future member, let us know! You can be one of the first to hear about membership updates, camps, leagues, tournaments, early access, and special events. All you need to do is let us know you are interested in the form below.",
};

export const CAMPAIGN_HEADLINE =
  "Invest in Our Community. Leave a Legacy That Lasts. Giving Levels & Recognition Opportunities.";

export const STAY_CONNECTED_BULLETS = [
  "Membership opportunities",
  "Camps and clinics",
  "League registrations",
  "Tournaments and events",
  "Hiring announcements",
  "Grand opening updates",
];

export const STAY_CONNECTED_FOOTER =
  "Want to stay in touch with progress? Check back periodically or join our Facebook Page.";

export const SHOP_CONTENT = {
  title: "View Products",
  body: "Little Mounties Community Sports Complex is built for more than basketball. Explore the full range of sports, training, and family entertainment experiences planned for our facility. Official merchandise and retail will be available closer to opening.",
};

export const ABOUT_CONTENT = {
  subtitle: "VISION FOR TODAY. A LEGACY FOR TOMORROW.",
  html: `
<p><strong>Coming Soon to Clearfield County</strong></p>
<p>Little Mounties Community Sports Complex is your one-stop shop for sports—a next-generation indoor sports and family entertainment facility coming to Clearfield County.</p>
<p>The facility will feature high-tech baseball and softball training, indoor basketball and multi-sport courts, and a massive two-story play zone designed for year-round use. From elite athlete development to birthday parties and family experiences, Little Mounties Community Sports Complex brings everything under one roof.</p>
<p>Our mission is to build a state-of-the-art recreation center that will serve youth, families, and the greater community—regardless of background or circumstance. This center will be a hub of opportunity, wellness, and connection.</p>
<h3>Vision</h3>
<p>A fully developed sports complex that includes:</p>
<ul>
<li>Indoor basketball/volleyball courts, batting cages, concessions, meeting rooms, and more</li>
<li>Outdoor multi-use courts and fields</li>
<li>A "Shed Hotel Village" for visiting teams and events—ideas welcome</li>
<li>Community event spaces</li>
<li>Training and development programs</li>
<li>Partnerships with local schools, AAU programs, and regional tournaments</li>
</ul>
<p><strong>Building More Than a Gym — Building a Stronger Community.</strong></p>
<p><strong>A Place to Gather. A Community to Grow. A Future to Build.</strong></p>
`,
};

export const STATIC_NEWS = [
  {
    _id: "static-news-1",
    title: "Coming Soon to Clearfield County",
    slug: "coming-soon-clearfield-county",
    excerpt:
      "Little Mounties Community Sports Complex is bringing a next-generation indoor sports and family entertainment destination to Central Pennsylvania.",
    content: `
<p>We are excited to share that <strong>Little Mounties Community Sports Complex</strong> is coming to Clearfield County—a one-stop destination for sports, training, family entertainment, and community connection.</p>
<p>The facility will feature high-tech baseball and softball training, indoor basketball and multi-sport courts, and a massive two-story play zone designed for year-round use. From elite athlete development to birthday parties and family experiences, everything is being planned under one roof.</p>
<p><strong>VISION FOR TODAY. A LEGACY FOR TOMORROW.</strong></p>
<p>Follow our Facebook Page and check back here for construction updates, partnership news, and grand opening announcements.</p>
`,
    imageUrl: HERO_BG,
    author: "Tj Anderson",
    published: true,
    publishedAt: "2025-11-15T12:00:00.000Z",
    featured: true,
  },
  {
    _id: "static-news-2",
    title: "Capital Campaign Now Underway",
    slug: "capital-campaign-underway",
    excerpt:
      "Invest in our community. Explore naming rights, sponsorship tiers, and ways to leave a legacy that lasts.",
    content: `
<p>The <strong>Little Mounties Community Sports Complex capital campaign</strong> is officially underway. This project is designed to serve youth, families, and the greater Clearfield County community—regardless of background or circumstance.</p>
<p>Giving opportunities include facility naming rights, court naming rights, locker room naming, and accessible community supporter tiers from Mountie Friend to Platinum Mountie Sponsor.</p>
<p>Visit our <strong>Sponsorship</strong> page for full details, or donate any amount through our secure Zeffy link. Every gift helps build a stronger community for generations to come.</p>
`,
    imageUrl: "/images/welcome.jpg",
    author: "Tj Anderson",
    published: true,
    publishedAt: "2025-12-01T12:00:00.000Z",
    featured: true,
  },
  {
    _id: "static-news-3",
    title: "Leagues & Teams: Tell Us About Your Needs",
    slug: "bring-your-league-here",
    excerpt:
      "Softball, baseball, volleyball, wrestling, lacrosse, or pickleball—help us plan space and programming before we open.",
    content: `
<p>Are you part of a league or team? We want to hear from you <em>before</em> Little Mounties Community Sports Complex opens.</p>
<p>If you are interested in using our spaces, fill out the <strong>Bring Your League Here</strong> form. Tell us about your organization, age groups, seasonal or year-round needs, and tournament interest.</p>
<p>Your input helps us design courts, training space, and programming that better serves leagues across Clearfield County and Central Pennsylvania.</p>
`,
    imageUrl: "/images/offering-1.jpg",
    author: "Tj Anderson",
    published: true,
    publishedAt: "2026-01-08T12:00:00.000Z",
  },
  {
    _id: "static-news-4",
    title: "Partnership Opportunities Now Open",
    slug: "partnership-opportunities-open",
    excerpt:
      "Coaches, trainers, retailers, food service, and local businesses—we are building an ecosystem and looking for the right partners.",
    content: `
<p>Little Mounties Community Sports Complex is more than a sports facility. It is a full ecosystem of training, entertainment, food, events, retail, wellness, and community partnerships.</p>
<p>We are looking for experienced operators, coaches, business owners, brands, and local organizations who want to grow alongside one of Central Pennsylvania's largest indoor sports and family entertainment destinations.</p>
<p>Partnership opportunities may include operating space, coaching programs, sponsored areas, retail, food and beverage, league hosting, and advisory roles. Submit the <strong>Partner With Us</strong> form to start the conversation.</p>
`,
    imageUrl: "/images/offering-3.jpg",
    author: "Tj Anderson",
    published: true,
    publishedAt: "2026-01-22T12:00:00.000Z",
  },
  {
    _id: "static-news-5",
    title: "Join the Founding Members Interest List",
    slug: "founding-members-interest-list",
    excerpt:
      "Memberships are not for sale yet—but you can be first to hear about camps, leagues, tournaments, and early access.",
    content: `
<p>We are <strong>not selling memberships… yet.</strong> But if you are interested in being a future member, let us know!</p>
<p>Join the founding members interest list to receive updates about memberships, camps, lessons, tournaments, leagues, batting suites, play zone access, adult leagues, and more.</p>
<p>Complete the short form on our <strong>Founding Members</strong> page and tell us which sports and programs matter most to your family.</p>
`,
    imageUrl: "/images/offering-5.jpg",
    author: "Tj Anderson",
    published: true,
    publishedAt: "2026-02-05T12:00:00.000Z",
  },
  {
    _id: "static-news-6",
    title: "Year-Round Programming Planned for Athletes & Families",
    slug: "year-round-programming-planned",
    excerpt:
      "Camps, clinics, tournaments, team training, and family entertainment—designed to keep the facility active in every season.",
    content: `
<p>Little Mounties Community Sports Complex is being built to stay active all year long across Central Pennsylvania.</p>
<p>Planned programming includes baseball and softball training, multi-sport camps and clinics, strength and speed training, team practices and rentals, tournaments and showcases, youth leagues, corporate events, and family entertainment experiences.</p>
<p>Explore our <strong>Facility & Services</strong> page to learn more about athletic development, family entertainment, and everything we are planning to offer under one roof.</p>
`,
    imageUrl: "/images/offering-7.jpg",
    author: "Tj Anderson",
    published: true,
    publishedAt: "2026-02-20T12:00:00.000Z",
  },
] as const;

export const STATIC_FAQ = [
  {
    question: "When will the facility open?",
    answer:
      "We are in active development in Clearfield County. No opening date is confirmed yet. Join our Facebook Page or contact Tj Anderson for updates.",
  },
  {
    question: "How can I support the capital campaign?",
    answer:
      "Visit our Sponsorship page for giving levels and recognition opportunities, or donate any amount through our secure Zeffy donation link.",
  },
  {
    question: "Can my league use the facility?",
    answer:
      "Yes—we want to hear from leagues before we open. Fill out the Bring Your League Here form so we can plan space and programming for your needs.",
  },
  {
    question: "Are memberships available yet?",
    answer:
      "We are not selling memberships yet. If you are interested in being a future member, complete the Founding Members interest form to receive early updates.",
  },
  {
    question: "How do I become a partner or sponsor?",
    answer:
      "Visit our Partner With Us page or Sponsorship page. We welcome coaches, businesses, sponsors, and organizations that align with our mission.",
  },
  {
    question: "Who do I contact with questions?",
    answer:
      "Contact Tj Anderson at tjandersty@gmail.com or 814-500-8613. We are located in Philipsburg / Clearfield County, Pennsylvania.",
  },
];

export const STATIC_TEAM = [
  {
    name: "Tj Anderson",
    role: "Project Lead & Community Contact",
    bio: "Leading the development of Little Mounties Community Sports Complex—a next-generation indoor sports and family entertainment destination for Clearfield County. Reach out for partnerships, sponsorship, league interest, or general questions.",
  },
];

export const STATIC_SERVICES = [
  {
    name: "Athletic Development",
    description:
      "Dedicated baseball and softball coaching with training tunnels, turf space, fitness area, and HitTrax Pro analytics for measurable athlete development.",
  },
  {
    name: "Family Entertainment",
    description:
      "Interactive play zones, sports simulators, automated batting cages, birthday parties, food and social spaces for the whole family.",
  },
  {
    name: "Camps, Clinics & Tournaments",
    description:
      "Year-round programming including multi-sport camps, leagues, tournaments, team training, and corporate events across Central Pennsylvania.",
  },
  {
    name: "Leagues & Team Rentals",
    description:
      "Indoor courts and training space for softball, baseball, volleyball, wrestling, lacrosse, pickleball, and more.",
  },
  {
    name: "Memberships",
    description:
      "Future membership options with special hours, discounts, and perks for regular visitors. Join the founding members list for early access updates.",
  },
  {
    name: "Partnerships & Sponsorship",
    description:
      "Naming rights, premium sponsorship tiers, retail, food & beverage, and coaching partnerships inside our community sports ecosystem.",
  },
];

export type StaticPricingTier = {
  _id: string;
  name: string;
  price: string;
  category: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  order: number;
};

export const STATIC_PRICING_TIERS: StaticPricingTier[] = [
  {
    _id: "facility-naming",
    name: "Facility Naming Rights",
    price: "$500,000–$1,000,000",
    category: "Naming Rights",
    description: "Highest exclusivity — name on the entire building.",
    features: [
      "Name on entire building",
      "Exterior monument signage",
      "Interior lobby plaque with story/history",
      "Annual VIP seating + passes",
      "Exclusive logo on all major posters, programs, livestream overlays",
      "Option for branded color accents inside (blue/white preserved)",
    ],
    highlighted: true,
    order: 1,
  },
  {
    _id: "court-naming",
    name: "Court Naming Rights",
    price: "$150,000–$300,000 per court",
    category: "Naming Rights",
    description: "Exclusive court naming rights with premium recognition.",
    features: [
      "Name printed on the hardwood",
      "Branded sideline padding",
      "Recognition during every home game",
      "Featured sponsor segment in social media highlight reels",
      "Permanent plaque courtside",
    ],
    order: 2,
  },
  {
    _id: "locker-naming",
    name: "Locker Room Naming Rights",
    price: "$75,000–$150,000",
    category: "Naming Rights",
    description: "Premium locker room naming opportunity.",
    features: [
      "Name on entryway",
      "Custom motivational wall with sponsor message",
      "Tasteful small logo on lockers",
      "Annual team photo with sponsor",
    ],
    order: 3,
  },
  {
    _id: "platinum",
    name: "Platinum Mountie Sponsor",
    price: "$25,000",
    category: "Platinum",
    description: "High visibility without naming rights.",
    features: [
      "Large banner in gym",
      "Logo on scorer's table",
      "Sponsor spotlight video posted each season",
      "VIP seating for four at all home games",
      "Logo on Player of the Game posters",
    ],
    highlighted: true,
    order: 4,
  },
  {
    _id: "gold",
    name: "Gold Mountie Sponsor",
    price: "$10,000",
    category: "Gold",
    description: "High-visibility gym and team recognition.",
    features: [
      "Medium banner in gym",
      "Logo on team warm-up shirts",
      "Social media shout-outs each season",
      "Recognition at halftime of one game",
      "Sponsor listing on website",
    ],
    order: 5,
  },
  {
    _id: "silver",
    name: "Silver Mountie Sponsor",
    price: "$5,000",
    category: "Silver",
    description: "Visible community partner recognition.",
    features: [
      "Small banner in gym",
      "Logo on event programs",
      "One social media shout-out",
      "Sponsor listing on donor wall",
    ],
    order: 6,
  },
  {
    _id: "bronze",
    name: "Bronze Sponsor",
    price: "$1,000",
    category: "Bronze",
    features: [
      "Name on donor wall",
      "Recognition in season program",
      "Social media thank-you post",
    ],
    order: 7,
  },
  {
    _id: "blue-white",
    name: "Blue & White Supporter",
    price: "$500",
    category: "Supporter",
    features: [
      "Name on digital donor list",
      "Certificate of appreciation",
      "Optional small plaque in hallway",
    ],
    order: 8,
  },
  {
    _id: "friend",
    name: "Mountie Friend",
    price: "$100",
    category: "Friend",
    features: ["Name on website donor list", "Thank-you card from team"],
    order: 9,
  },
];

export const PRICING_CATEGORY_LABELS: Record<string, string> = {
  "Naming Rights": "Naming Rights Tiers (Highest Exclusivity)",
  Platinum: "Premium Sponsorship Tiers (High Visibility, No Naming Rights)",
  Gold: "Premium Sponsorship Tiers (High Visibility, No Naming Rights)",
  Silver: "Premium Sponsorship Tiers (High Visibility, No Naming Rights)",
  Bronze: "Community Sponsorship Tiers (Accessible, High Volume)",
  Supporter: "Community Sponsorship Tiers (Accessible, High Volume)",
  Friend: "Community Sponsorship Tiers (Accessible, High Volume)",
};

export const MEMBERSHIPS = {
  title: "Memberships",
  body: "Anyone can come and play, but we will be offering memberships for those who want to become a regular part of the action. Members will have access at special hours, discounts, and other perks depending on what kind of member you become.",
  note: "We are not selling memberships… yet.",
};

export const ECONOMIC_IMPACT = [
  "Host youth basketball tournaments, leagues, and events that bring visitors to our community.",
  "Visitors spend at local hotels, restaurants, gas stations, and retail—supporting our local businesses.",
  "Create jobs and opportunities through events, programs, and facility operations.",
  "Strengthen our local economy and showcase Clearfield County.",
];

export const REAL_ESTATE = {
  title: "Real Estate",
  body: [
    "Before any walls can rise, before any court can echo with the sound of kids playing, before any program can expand—we must secure the land.",
    "This property is more than a location. It's the foundation of a vision: a community recreation center that will serve families, athletes, students, and neighbors across Clearfield County. A place built for access, opportunity, and impact.",
    "Your investment in the land is your investment in the future. It allows us to take the first bold step toward a facility that will strengthen local pride, support youth development, attract regional events, and create long-term economic value.",
    "Help us plant the flag. Help us secure the ground. Help us build the future our community deserves.",
  ],
};

export const INVESTMENT = {
  title: "Investment Opportunity",
  body: [
    "Investing in this new community building is investing in the future strength, stability, and economic growth of Clearfield County. This project is designed to generate long-term value—not only through expanded youth programs and community services, but through increased regional activity, new partnerships, and sustained economic impact.",
    "Your investment helps create a facility that will attract events, support local businesses, elevate property values, and provide year-round access for families, athletes, and organizations. This is more than a building—it's an engine for community development and a catalyst for future opportunity.",
    "By partnering with us now, you're securing a stake in a project that will serve thousands, strengthen local identity, and stand as a lasting legacy for generations.",
  ],
};

export const SIGNAGE_OPTIONS = [
  { name: "Gym Banners", price: "$500–$2,500 (size based)" },
  { name: "Wall Murals", price: "$5,000–$15,000" },
  { name: "Scoreboard Panel", price: "$10,000" },
  { name: "Hallway Legacy Plaques", price: "$1,000" },
];

export const MEDIA_PERKS = [
  "Social Media Shoutouts",
  "Livestream Logo Placement",
  "Player of the Game Poster Feature",
  "Season Hype Video Sponsor",
];

export const EXCLUSIVITY_RULES = [
  "Naming rights donors get exclusive category ownership",
  "Platinum sponsors get priority placement over Gold and Silver",
  "No two sponsors share the same premium space",
  'Lower tiers never get perks that "feel" like naming rights',
  "Digital shoutouts scale without threatening exclusivity",
];

export const PARTNER_CATEGORIES = [
  {
    title: "Sports & Training Partners",
    items: [
      "Baseball instructors",
      "Softball instructors",
      "Private coaches",
      "Strength coaches",
      "Speed/agility trainers",
      "Team training groups",
      "Camps & clinics",
      "Club organizations looking for indoor space",
    ],
  },
  {
    title: "Food & Beverage Partners",
    items: [
      "Brewery operators",
      "Sports bar operators",
      "Food service groups",
      "Coffee concepts",
      "Smoothie/protein bar operators",
      "Local food brands",
    ],
  },
  {
    title: "Sports Retail & Pro Shop Partners",
    items: [
      "Baseball/softball retail",
      "Equipment fitting",
      "Uniforms & team stores",
      "Apparel & merchandise",
      "Bat/glove & sports product brands",
    ],
  },
  {
    title: "Health, Recovery & Performance Partners",
    items: [
      "Sports medicine clinics",
      "Physical therapy groups",
      "Chiropractic offices",
      "Athletic trainers",
      "Recovery businesses",
      "Nutrition providers",
      "Wellness brands",
    ],
  },
  {
    title: "Leagues, Clubs & Tournament Hosts",
    items: [
      "Youth leagues, travel teams, soccer clubs, lacrosse clubs, volleyball groups, wrestling clubs, BJJ organizations",
      "Roller derby",
      "Tournament organizers and event promoters looking for space",
    ],
  },
  {
    title: "Sponsorship & Naming Rights",
    items: [
      "Local businesses, regional brands, healthcare groups, banks, insurance agencies, car dealerships, construction companies, and companies interested in visibility inside a high-traffic community facility",
    ],
  },
];

export const FOUNDING_INTERESTS = [
  "Memberships",
  "Camps",
  "Lessons",
  "Tournaments",
  "Leagues",
  "Golf Simulators",
  "Batting Suites",
  "Batting Cages",
  "Birthday Parties",
  "Play Zone",
  "Adult Leagues",
  "Sports",
];

export const FOUNDING_SPORTS = [
  "Baseball/Softball",
  "Golf",
  "Pickleball",
  "Volleyball",
  "Soccer",
  "Lacrosse",
  "Wrestling",
  "BJJ",
  "Football",
  "Rec games (kickball/wiffleball/etc.)",
  "Field Hockey",
  "Other",
];
