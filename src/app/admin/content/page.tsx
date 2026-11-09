"use client";

import { Button } from "@/components/ui/Button";
import { ContentNode } from "@/features/admin/ContentFields";
import { contentApi } from "@/lib/api";
import {
  CONTENT_SECTIONS,
  mergeContent,
  type ContentKey,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const GROUP_LINKS: Record<string, string> = {
  "Home Page": "/",
  "About Page": "/about",
  "Partners Page": "/partners",
  "Future Members Page": "/founding-members",
  "Shop Page": "/shop",
  "Booking Page": "/booking",
};

type Json = Parameters<typeof ContentNode>[0]["value"];

function SectionEditor({
  sectionKey,
  label,
  description,
  initial,
  hasOverride,
  open,
  onOpenChange,
}: {
  sectionKey: ContentKey;
  label: string;
  description: string;
  initial: Json;
  hasOverride: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Json>(initial);
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);

  const save = useMutation({
    mutationFn: () => contentApi.save(sectionKey, draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast.success(`${label} saved. Changes are live.`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reset = useMutation({
    mutationFn: () => contentApi.reset(sectionKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast.success(`${label} reset to the original text.`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <details
      className="glass-panel group rounded-xl"
      open={open}
      onToggle={(e) => onOpenChange(e.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="font-display text-xl text-white">{label}</h3>
          <p className="mt-0.5 text-sm text-cool-grey">{description}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {hasOverride && (
            <span className="rounded-full border border-ice/40 px-2.5 py-0.5 text-ice">Customised</span>
          )}
          {dirty && (
            <span className="rounded-full border border-amber-400/50 px-2.5 py-0.5 text-amber-300">
              Unsaved changes
            </span>
          )}
        </div>
      </summary>
      <div className="space-y-5 border-t border-border p-5">
        <ContentNode
          name={sectionKey}
          value={draft}
          onChange={setDraft}
          forceImages={sectionKey === "images"}
        />
        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          <Button type="button" onClick={() => save.mutate()} disabled={!dirty || save.isPending}>
            {save.isPending ? "Saving..." : "Save section"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setDraft(initial)} disabled={!dirty}>
            Discard changes
          </Button>
          {hasOverride && (
            <Button
              type="button"
              variant="ghost"
              disabled={reset.isPending}
              onClick={() => {
                if (window.confirm("Reset this section to the original text and images?")) reset.mutate();
              }}
            >
              Reset to original
            </Button>
          )}
        </div>
      </div>
    </details>
  );
}

export default function AdminContentPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => contentApi.get(),
  });
  const groups = Array.from(new Set(CONTENT_SECTIONS.map((s) => s.group)));
  const [active, setActive] = useState(groups[0]);
  // Which sections are expanded; kept here so a save (which re-mounts the editor with fresh data) does not collapse it.
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  if (isLoading) return <p className="text-cool-grey">Loading...</p>;
  if (isError || !data) {
    return (
      <p className="rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-red-300">
        {error instanceof Error ? error.message : "Failed to load site content."}
      </p>
    );
  }

  const { defaults, overrides } = data.data;
  const sections = CONTENT_SECTIONS.filter((s) => s.group === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-white">Site Content</h1>
          <p className="mt-2 max-w-2xl text-cool-grey">
            Edit the text and pictures of every section of the public website. Open a section, change it, and press
            Save. Changes go live immediately.
          </p>
        </div>
        {GROUP_LINKS[active] && (
          <Link
            href={GROUP_LINKS[active]}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-cool-grey hover:text-white"
          >
            View page <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setActive(g)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              g === active
                ? "border-ice bg-electric/20 text-ice"
                : "border-border text-cool-grey hover:text-white",
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const merged = mergeContent(defaults[section.key], overrides[section.key]) as Json;
          return (
            <SectionEditor
              // Re-mount with fresh state whenever the saved content changes.
              key={`${section.key}:${JSON.stringify(merged)}`}
              sectionKey={section.key}
              label={section.label}
              description={section.description}
              initial={merged}
              hasOverride={overrides[section.key] !== undefined}
              open={Boolean(openKeys[section.key])}
              onOpenChange={(o) => setOpenKeys((prev) => ({ ...prev, [section.key]: o }))}
            />
          );
        })}
      </div>
    </div>
  );
}
