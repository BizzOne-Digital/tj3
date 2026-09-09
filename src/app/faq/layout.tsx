import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Little Mounties Community Sports Complex.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
