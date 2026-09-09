"use client";

type AnalyticsEvent =
  | "support_project_click"
  | "sponsorship_tier_view"
  | "zeffy_outbound_click"
  | "booking_submit"
  | "contact_submit"
  | "newsletter_submit"
  | "product_checkout_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  window.fbq?.("trackCustom", name, params);
}

export const trackDonationClick = (source: string) =>
  trackEvent("zeffy_outbound_click", { source });
export const trackBookingSubmit = () => trackEvent("booking_submit");
export const trackContactSubmit = () => trackEvent("contact_submit");
export const trackShopClick = (slug: string) =>
  trackEvent("product_checkout_click", { slug });
export const trackSupportClick = (source: string) =>
  trackEvent("support_project_click", { source });
