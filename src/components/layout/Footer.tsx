import { NAV_LINKS, MOBILE_EXTRA_LINKS } from "@/lib/constants";
import Link from "next/link";

export function Footer({
  siteName,
  address,
  email,
  phone,
}: {
  siteName: string;
  address?: string;
  email?: string;
  phone?: string;
}) {
  return (
    <footer className="overflow-x-clip border-t border-border bg-graphite py-16">
      <div className="mx-auto grid min-w-0 max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div className="min-w-0 break-words">
          <p className="font-display text-xl text-white">{siteName}</p>
          <p className="mt-3 text-sm text-cool-grey">{address}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          {email && <a href={`mailto:${email}`} className="mt-2 block text-sm text-cool-grey hover:text-ice">{email}</a>}
          {phone && <a href={`tel:${phone}`} className="mt-1 block text-sm text-cool-grey hover:text-ice">{phone}</a>}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <div className="mt-2 space-y-1">
            {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm text-cool-grey hover:text-ice">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <Link href="/privacy" className="block text-sm text-cool-grey hover:text-ice">Privacy</Link>
          <Link href="/terms" className="mt-1 block text-sm text-cool-grey hover:text-ice">Terms</Link>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-cool-grey">© {new Date().getFullYear()} {siteName}</p>
    </footer>
  );
}
