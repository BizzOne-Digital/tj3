import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { buildMetadata } from "@/lib/seo";
import { BRAND_LOGO } from "@/lib/constants";
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
    icon: BRAND_LOGO,
    apple: BRAND_LOGO,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} h-full overflow-x-clip`}>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-midnight font-sans text-white antialiased">
        <QueryProvider>
          <AnalyticsProvider>
            <SiteShell>{children}</SiteShell>
            <Toaster position="top-right" theme="dark" richColors />
          </AnalyticsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
