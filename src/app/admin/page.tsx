"use client";

import { useAdminAuth } from "@/features/admin/useAdminAuth";
import { adminApi } from "@/lib/api";
import type { CrudResource } from "@/types/cms";
import { useQueries } from "@tanstack/react-query";
import { Calendar, Mail, Newspaper, Users } from "lucide-react";
import Link from "next/link";

const modules: { href: string; label: string; icon: React.ElementType; resource: CrudResource }[] = [
  { href: "/admin/news", label: "News", icon: Newspaper, resource: "news" },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar, resource: "bookings" },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, resource: "contacts" },
  { href: "/admin/team", label: "Team", icon: Users, resource: "team" },
];

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();

  const counts = useQueries({
    queries: modules.map((m) => ({
      queryKey: ["admin-count", m.resource],
      queryFn: () => adminApi.list(m.resource, { limit: 1 }),
    })),
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-white">Dashboard</h1>
      <p className="mt-2 text-cool-grey">Welcome back, {user?.name ?? user?.email}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="glass-panel rounded-xl p-6 transition-colors hover:border-ice/30"
            >
              <Icon className="h-8 w-8 text-ice" />
              <p className="mt-4 font-display text-xl text-white">{mod.label}</p>
              <p className="mt-1 text-2xl font-semibold text-electric">
                {counts[i].isLoading ? "—" : counts[i].data?.total ?? 0}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 glass-panel rounded-xl p-6">
        <h2 className="font-display text-xl text-white">Quick Links</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            "/admin/settings",
            "/admin/facilities",
            "/admin/services",
            "/admin/pricing",
            "/admin/faq",
            "/admin/shop",
            "/admin/sponsors",
            "/admin/stats",
            "/admin/pages",
          ].map((href) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-border px-4 py-2 text-sm text-cool-grey hover:border-ice hover:text-white"
            >
              {href.replace("/admin/", "").replace(/^\w/, (c) => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
