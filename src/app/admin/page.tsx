"use client";

import { Button } from "@/components/ui/Button";
import { useAdminAuth } from "@/features/admin/useAdminAuth";
import { adminApi, maintenanceApi } from "@/lib/api";
import type { CrudResource } from "@/types/cms";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Calendar, CalendarClock, Dumbbell, Mail, Newspaper, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const modules: { href: string; label: string; icon: React.ElementType; resource: CrudResource }[] = [
  { href: "/admin/news", label: "News", icon: Newspaper, resource: "news" },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar, resource: "bookings" },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, resource: "contacts" },
  { href: "/admin/team", label: "Team", icon: Users, resource: "team" },
  { href: "/admin/schedule", label: "Schedule", icon: CalendarClock, resource: "schedule" },
  { href: "/admin/coaches", label: "Coaches", icon: Dumbbell, resource: "coaches" },
];

const quickLinks = [
  { href: "/admin/content", label: "Site Content" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/facilities", label: "Facilities" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/shop", label: "Shop" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/pages", label: "Pages (HTML)" },
];

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();

  const cleanup = useMutation({
    mutationFn: () => maintenanceApi.cleanupUploads(),
    onSuccess: (res) =>
      toast.success(
        `Removed ${res.data.deleted} unused image(s). ${res.data.keptRecent} recent unused image(s) kept for 24h.`,
      ),
    onError: (e: Error) => toast.error(e.message),
  });

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

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-border px-4 py-2 text-sm text-cool-grey hover:border-ice hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 glass-panel rounded-xl p-6">
        <h2 className="font-display text-xl text-white">Image Storage</h2>
        <p className="mt-2 max-w-2xl text-sm text-cool-grey">
          Uploaded pictures are stored in the database. Images you replaced or removed are deleted automatically
          when you save. Use this to also remove pictures that were uploaded but never used (older than 24 hours).
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-4"
          disabled={cleanup.isPending}
          onClick={() => cleanup.mutate()}
        >
          {cleanup.isPending ? "Cleaning..." : "Clean up unused images"}
        </Button>
      </div>
    </div>
  );
}
