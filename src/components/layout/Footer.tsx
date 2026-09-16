import { BRAND, NAV_LINKS } from "@/lib/constants";
import { resolveSiteLogo } from "@/lib/upload-helpers";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

const GET_INVOLVED_LINKS = [
  { href: "/league", label: "Bring Your League" },
  { href: "/partners", label: "Partners" },
  { href: "/founding-members", label: "Future Members" },
  { href: "/pricing", label: "Sponsorship" },
  { href: "/#donate", label: "Donate" },
];

const MORE_LINKS = [
  { href: "/booking", label: "Booking" },
  { href: "/shop", label: "Shop" },
  { href: "/team", label: "Team" },
  { href: "/faq", label: "FAQ" },
];

export function Footer({
  siteName,
  address,
  email,
  phone,
  logoUrl,
  facebookUrl,
  donationUrl,
  tagline,
}: {
  siteName: string;
  address?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  facebookUrl?: string;
  donationUrl?: string;
  tagline?: string;
}) {
  const supportUrl = donationUrl || BRAND.donationUrl;
  const fbUrl = facebookUrl || BRAND.facebook;
  const logo = resolveSiteLogo(logoUrl);

  return (
    <footer className="overflow-x-clip border-t border-electric/20 bg-[#030812]">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid min-w-0 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="min-w-0 lg:col-span-4">
            <Link href="/" className="inline-block max-w-full">
              <Logo src={logo} size="lg" className="max-w-[min(100%,160px)]" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cool-grey">
              {tagline || BRAND.taglines[0]}
            </p>
            {address && (
              <p className="mt-3 flex items-start gap-2 text-sm text-cool-grey">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ice" />
                <span>{address}</span>
              </p>
            )}
            <Link
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-sm border border-ice/60 bg-[#06142f]/80 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(23,107,255,0.25)] transition-all hover:border-ice hover:shadow-[0_0_28px_rgba(115,199,255,0.4)]"
            >
              Support the Project
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ice">Explore</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cool-grey transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ice">Get Involved</p>
            <ul className="space-y-2.5">
              {GET_INVOLVED_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cool-grey transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More + Legal */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ice">More</p>
            <ul className="space-y-2.5">
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cool-grey transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-sm text-cool-grey transition-colors hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-cool-grey transition-colors hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ice">Contact</p>
            <ul className="space-y-3">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm text-cool-grey transition-colors hover:text-ice"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{email}</span>
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-sm text-cool-grey transition-colors hover:text-ice"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cool-grey transition-colors hover:text-[#1877F2]"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — mockup style */}
      <div className="border-t border-electric/15 bg-[#02060f]">
        <div className="mx-auto flex min-w-0 max-w-[1400px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cool-grey sm:text-[11px] sm:tracking-[0.3em]">
            Sports // Families // Opportunity // A Stronger Clearfield County
          </p>
          <p className="text-center text-xs text-cool-grey/80">
            © {new Date().getFullYear()} {siteName}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ice sm:text-[11px] sm:tracking-[0.28em]">
            Play Today. A Brighter Tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
