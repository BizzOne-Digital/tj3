export type CrudResource =
  | "settings"
  | "stats"
  | "facilities"
  | "services"
  | "pricing"
  | "team"
  | "faq"
  | "news"
  | "shop"
  | "sponsors"
  | "pages"
  | "bookings"
  | "contacts"
  | "inquiries";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  message?: string;
}

export interface SiteSettings {
  _id?: string;
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  contactPerson?: string;
  address: string;
  zeffyDonationUrl: string;
  facebookUrl?: string;
  logoUrl?: string;
  footerStatement?: string;
  hoursStatus?: string;
  announcement?: {
    enabled: boolean;
    message: string;
    link?: string;
    linkLabel?: string;
  };
  analytics?: {
    enabled: boolean;
    ga4MeasurementId?: string;
    metaPixelId?: string;
  };
}

export interface StatItem {
  _id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  published: boolean;
  order: number;
}

export interface Facility {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  features?: string[];
  published: boolean;
  order: number;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  bullets?: string[];
  published: boolean;
  order: number;
}

export interface PricingTier {
  _id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  zeffyUrl?: string;
  category?: string;
  highlighted: boolean;
  published: boolean;
  order: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  photoUrl?: string;
  published: boolean;
  order: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  order: number;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: string;
  published: boolean;
  publishedAt?: string;
  featured?: boolean;
}

export interface ShopProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  inStock: boolean;
  comingSoon: boolean;
  externalCheckoutUrl?: string;
  published: boolean;
  featured?: boolean;
}

export interface Sponsor {
  _id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  tier?: string;
  published: boolean;
  order: number;
}

export interface PageContent {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  heroImageUrl?: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
}

export interface BookingSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  facility: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface AdminUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}
