"use client";

import { cn } from "@/lib/utils";
import type { CrudResource } from "@/types/cms";
import {
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Settings,
  ShoppingBag,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string; icon: React.ElementType; resource?: CrudResource }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings, resource: "settings" },
  { href: "/admin/stats", label: "Stats", icon: BarChart3, resource: "stats" },
  { href: "/admin/facilities", label: "Facilities", icon: Building2, resource: "facilities" },
  { href: "/admin/services", label: "Services", icon: Wrench, resource: "services" },
  { href: "/admin/pricing", label: "Pricing", icon: DollarSign, resource: "pricing" },
  { href: "/admin/team", label: "Team", icon: Users, resource: "team" },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle, resource: "faq" },
  { href: "/admin/news", label: "News", icon: Newspaper, resource: "news" },
  { href: "/admin/shop", label: "Shop", icon: ShoppingBag, resource: "shop" },
  { href: "/admin/sponsors", label: "Sponsors", icon: Star, resource: "sponsors" },
  { href: "/admin/pages", label: "Pages", icon: FileText, resource: "pages" },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar, resource: "bookings" },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, resource: "contacts" },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail, resource: "inquiries" },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-graphite lg:w-64 lg:border-b-0 lg:border-r">
      <div className="border-b border-border p-4 lg:p-6">
        <Link href="/admin" className="font-display text-lg tracking-wider text-white">
          LM ADMIN
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-1 lg:flex-col lg:space-y-1 lg:overflow-x-visible lg:overflow-y-auto lg:p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors lg:gap-3",
              pathname === href
                ? "bg-electric/20 text-ice"
                : "text-cool-grey hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cool-grey hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
