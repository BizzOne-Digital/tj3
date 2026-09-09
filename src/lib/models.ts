import mongoose, { Schema, Model } from "mongoose";
import { connectDB } from "./db";

const baseOpts = { timestamps: true };

const SiteSettingsSchema = new Schema(
  {
    siteName: { type: String, required: true },
    tagline: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactPerson: String,
    address: { type: String, required: true },
    zeffyDonationUrl: { type: String, required: true },
    facebookUrl: String,
    logoUrl: String,
    footerStatement: String,
    hoursStatus: String,
    announcement: {
      enabled: { type: Boolean, default: true },
      message: String,
      link: String,
      linkLabel: String,
    },
    analytics: {
      enabled: { type: Boolean, default: false },
      ga4MeasurementId: String,
      metaPixelId: String,
    },
  },
  baseOpts,
);

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "admin", "editor"], default: "admin" },
    isActive: { type: Boolean, default: true },
  },
  baseOpts,
);

const crudBase = {
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
};

const StatSchema = new Schema(
  { label: String, value: Number, prefix: String, suffix: String, ...crudBase },
  baseOpts,
);
const FacilitySchema = new Schema(
  { name: String, slug: { type: String, unique: true }, description: String, imageUrl: String, features: [String], ...crudBase },
  baseOpts,
);
const ServiceSchema = new Schema(
  { name: String, slug: { type: String, unique: true }, description: String, longDescription: String, imageUrl: String, bullets: [String], ...crudBase },
  baseOpts,
);
const PricingSchema = new Schema(
  {
    name: String,
    price: String,
    period: String,
    description: String,
    features: [String],
    ctaLabel: String,
    ctaUrl: String,
    zeffyUrl: String,
    category: String,
    highlighted: { type: Boolean, default: false },
    ...crudBase,
  },
  baseOpts,
);
const TeamSchema = new Schema(
  { name: String, slug: { type: String, unique: true }, role: String, bio: String, photoUrl: String, ...crudBase },
  baseOpts,
);
const FaqSchema = new Schema(
  { question: String, answer: String, category: { type: String, default: "General" }, ...crudBase },
  baseOpts,
);
const NewsSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    content: String,
    imageUrl: String,
    author: String,
    publishedAt: Date,
    featured: { type: Boolean, default: false },
    ...crudBase,
  },
  baseOpts,
);
const ShopSchema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    price: { type: Number, default: 0 },
    imageUrl: String,
    category: String,
    inStock: { type: Boolean, default: true },
    comingSoon: { type: Boolean, default: true },
    externalCheckoutUrl: String,
    featured: { type: Boolean, default: false },
    ...crudBase,
  },
  baseOpts,
);
const SponsorSchema = new Schema(
  { name: String, logoUrl: String, websiteUrl: String, tier: String, ...crudBase },
  baseOpts,
);
const PageSchema = new Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    subtitle: String,
    heroImageUrl: String,
    content: String,
    seoTitle: String,
    seoDescription: String,
    published: { type: Boolean, default: true },
  },
  baseOpts,
);
const StoredUploadSchema = new Schema(
  {
    folder: { type: String, required: true, index: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true, select: false },
  },
  baseOpts,
);
StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });
const BookingSchema = new Schema(
  { name: String, email: String, phone: String, facility: String, date: String, timeSlot: String, notes: String, status: { type: String, default: "new" } },
  baseOpts,
);
const ContactSchema = new Schema(
  { name: String, email: String, phone: String, subject: String, message: String, status: { type: String, default: "new" } },
  baseOpts,
);
const InquirySchema = new Schema(
  {
    type: { type: String, enum: ["league", "partner", "founding_member"], required: true },
    name: String,
    email: String,
    organization: String,
    payload: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, default: "new" },
  },
  baseOpts,
);

function getModel<T>(name: string, schema: Schema): Model<T> {
  return (mongoose.models[name] as Model<T>) || mongoose.model<T>(name, schema);
}

export const SiteSettings = getModel("SiteSettings", SiteSettingsSchema);
export const User = getModel("User", UserSchema);
export const Stat = getModel("Stat", StatSchema);
export const Facility = getModel("Facility", FacilitySchema);
export const Service = getModel("Service", ServiceSchema);
export const Pricing = getModel("Pricing", PricingSchema);
export const TeamMember = getModel("TeamMember", TeamSchema);
export const Faq = getModel("Faq", FaqSchema);
export const News = getModel("News", NewsSchema);
export const ShopProduct = getModel("ShopProduct", ShopSchema);
export const Sponsor = getModel("Sponsor", SponsorSchema);
export const PageContent = getModel("PageContent", PageSchema);
export const StoredUpload = getModel("StoredUpload", StoredUploadSchema);
export const Booking = getModel("Booking", BookingSchema);
export const Contact = getModel("Contact", ContactSchema);
export const Inquiry = getModel("Inquiry", InquirySchema);

export const RESOURCE_MAP = {
  stats: Stat,
  facilities: Facility,
  services: Service,
  pricing: Pricing,
  team: TeamMember,
  faq: Faq,
  news: News,
  shop: ShopProduct,
  sponsors: Sponsor,
  pages: PageContent,
  bookings: Booking,
  contacts: Contact,
  inquiries: Inquiry,
} as const;

export type ResourceKey = keyof typeof RESOURCE_MAP;

export async function ensureDb() {
  await connectDB();
}
