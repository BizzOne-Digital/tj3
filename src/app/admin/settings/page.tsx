"use client";

import { adminApi, api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { LocalImageField } from "@/features/admin/LocalImageField";
import type { SiteSettings } from "@/types/cms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => api.getSettings(),
  });

  const settings = data?.data;
  const [draft, setDraft] = useState<Partial<SiteSettings> | null>(null);
  const form = draft ?? settings ?? {};

  const mutation = useMutation({
    mutationFn: (payload: Partial<SiteSettings>) => adminApi.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setDraft(null);
      toast.success("Settings saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (key: keyof SiteSettings, value: unknown) => {
    setDraft((prev) => ({ ...(prev ?? settings ?? {}), [key]: value }));
  };

  if (isLoading) return <p className="text-cool-grey">Loading...</p>;

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">Site Settings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(form);
        }}
        className="glass-panel max-w-2xl space-y-5 rounded-xl p-6"
      >
        <Input label="Site Name" value={form.siteName ?? ""} onChange={(e) => set("siteName", e.target.value)} />
        <Input label="Tagline" value={form.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} />
        <LocalImageField
          label="Site Logo"
          folder="pages"
          value={form.logoUrl ?? ""}
          onChange={(url) => set("logoUrl", url)}
        />
        <Input label="Contact Email" value={form.contactEmail ?? ""} onChange={(e) => set("contactEmail", e.target.value)} />
        <Input label="Contact Phone" value={form.contactPhone ?? ""} onChange={(e) => set("contactPhone", e.target.value)} />
        <Textarea label="Address" value={form.address ?? ""} onChange={(e) => set("address", e.target.value)} />
        <Input label="Zeffy Donation URL" value={form.zeffyDonationUrl ?? ""} onChange={(e) => set("zeffyDonationUrl", e.target.value)} />

        <hr className="border-border" />
        <h2 className="font-display text-xl text-white">Announcement Bar</h2>
        <label className="flex items-center gap-2 text-sm text-cool-grey">
          <input
            type="checkbox"
            checked={form.announcement?.enabled ?? false}
            onChange={(e) =>
              set("announcement", { ...form.announcement, enabled: e.target.checked, message: form.announcement?.message ?? "" })
            }
          />
          Enabled
        </label>
        <Textarea
          label="Message"
          value={form.announcement?.message ?? ""}
          onChange={(e) =>
            set("announcement", { ...form.announcement, enabled: form.announcement?.enabled ?? false, message: e.target.value })
          }
        />

        <hr className="border-border" />
        <h2 className="font-display text-xl text-white">Analytics</h2>
        <label className="flex items-center gap-2 text-sm text-cool-grey">
          <input
            type="checkbox"
            checked={form.analytics?.enabled ?? false}
            onChange={(e) =>
              set("analytics", { ...form.analytics, enabled: e.target.checked })
            }
          />
          Analytics Enabled
        </label>
        <Input
          label="GA4 Measurement ID"
          value={form.analytics?.ga4MeasurementId ?? ""}
          onChange={(e) =>
            set("analytics", { ...form.analytics, enabled: form.analytics?.enabled ?? false, ga4MeasurementId: e.target.value })
          }
        />
        <Input
          label="Meta Pixel ID"
          value={form.analytics?.metaPixelId ?? ""}
          onChange={(e) =>
            set("analytics", { ...form.analytics, enabled: form.analytics?.enabled ?? false, metaPixelId: e.target.value })
          }
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
