"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageIntro } from "../animation/PageIntro";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => api.getSettings(),
    staleTime: 5 * 60 * 1000,
    enabled: !isAdmin,
  });

  const settings = data?.data;

  if (isAdmin) {
    return <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>;
  }

  return (
    <>
      <PageIntro />
      {!isHome && settings?.announcement?.enabled && settings.announcement.message && (
        <AnnouncementBar
          message={settings.announcement.message}
          link={settings.announcement.link}
          linkLabel={settings.announcement.linkLabel}
        />
      )}
      {!isHome && (
        <Header donationUrl={settings?.zeffyDonationUrl} logoUrl={settings?.logoUrl} />
      )}
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <Footer
        siteName={settings?.siteName ?? "Little Mounties Community Sports Complex"}
        address={settings?.address}
        email={settings?.contactEmail}
        phone={settings?.contactPhone}
        logoUrl={settings?.logoUrl}
        facebookUrl={settings?.facebookUrl}
        donationUrl={settings?.zeffyDonationUrl}
        tagline={settings?.tagline}
      />
    </>
  );
}
