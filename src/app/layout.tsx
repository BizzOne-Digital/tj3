import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { connection } from "next/server";
import { Toaster } from "sonner";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { getContentOverrides } from "@/lib/site-content-server";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  ...buildMetadata({}),
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Site copy and images are editable from the admin portal, so render per request.
  await connection();
  const contentOverrides = await getContentOverrides();

  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} h-full overflow-x-clip`}>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-midnight font-sans text-white antialiased">
        <QueryProvider>
          <ContentProvider overrides={contentOverrides}>
            <AnalyticsProvider>
              <SiteShell>{children}</SiteShell>
              <Toaster position="top-right" theme="dark" richColors />
            </AnalyticsProvider>
          </ContentProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
