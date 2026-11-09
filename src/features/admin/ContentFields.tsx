"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { LocalImageField } from "./LocalImageField";
import { Plus, Trash2 } from "lucide-react";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const IMAGE_KEY = /(image|photo|logo|background)/i;
const NOT_IMAGE_KEY = /(label|text|title|alt|caption)/i;

export function humanize(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isImageKey(key: string, forceImages: boolean): boolean {
  if (forceImages) return true;
  if (key === "gallery") return true;
  return IMAGE_KEY.test(key) && !NOT_IMAGE_KEY.test(key);
}

function isPlainObject(v: unknown): v is Record<string, Json> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Empty copy of a value with the same shape (used to add list items). */
function blankLike(sample: Json | undefined): Json {
  if (Array.isArray(sample)) return [];
  if (isPlainObject(sample)) {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blankLike(v)]));
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

export function ContentNode({
  name,
  label,
  value,
  onChange,
  forceImages = false,
  depth = 0,
}: {
  name: string;
  label?: string;
  value: Json;
  onChange: (next: Json) => void;
  /** Treat every string in this subtree as an image URL (used by the "Main site images" section). */
  forceImages?: boolean;
  depth?: number;
}) {
  const title = label ?? humanize(name);

  // ---------------------------------------------------------------- strings
  if (typeof value === "string") {
    if (isImageKey(name, forceImages)) {
      return <LocalImageField label={title} folder="pages" value={value} onChange={onChange} />;
    }
    if (value.length > 80 || value.includes("\n")) {
      return (
        <Textarea
          label={title}
          rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    return <Input label={title} value={value} onChange={(e) => onChange(e.target.value)} />;
  }

  if (typeof value === "number") {
    return (
      <Input
        label={title}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-cool-grey">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {title}
      </label>
    );
  }

  // ----------------------------------------------------------------- arrays
  if (Array.isArray(value)) {
    const allStrings = value.every((v) => typeof v === "string");

    // Image list (e.g. the offerings photo gallery)
    if (allStrings && isImageKey(name, forceImages)) {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-cool-grey">{title}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {(value as string[]).map((src, i) => (
              <div key={i} className="rounded-xl border border-border p-3">
                <LocalImageField
                  label={`Image ${i + 1}`}
                  folder="pages"
                  value={src}
                  onChange={(url) => onChange((value as string[]).map((s, j) => (j === i ? url : s)))}
                />
                <button
                  type="button"
                  onClick={() => onChange((value as string[]).filter((_, j) => j !== i))}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove image
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange([...(value as string[]), ""])}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-white hover:bg-white/5"
          >
            <Plus className="h-3.5 w-3.5" /> Add image
          </button>
        </div>
      );
    }

    // Plain text list: one entry per line
    if (allStrings) {
      return (
        <Textarea
          label={`${title} (one per line)`}
          rows={Math.min(12, Math.max(3, value.length + 1))}
          value={(value as string[]).join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          onBlur={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean),
            )
          }
        />
      );
    }

    // List of objects (e.g. page pillars)
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-cool-grey">{title}</p>
        {value.map((item, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border bg-surface/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-ice">Item {i + 1}</p>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
            <ContentNode
              name={`${name}-${i}`}
              label=""
              value={item}
              forceImages={forceImages}
              depth={depth + 1}
              onChange={(next) => onChange(value.map((v, j) => (j === i ? next : v)))}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, blankLike(value[0])])}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-white hover:bg-white/5"
        >
          <Plus className="h-3.5 w-3.5" /> Add item
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------- objects
  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    const nested = depth > 0;
    return (
      <div className={cn("space-y-4", nested && title && "rounded-xl border border-border/60 p-4")}>
        {nested && title && <p className="font-display text-lg text-white">{title}</p>}
        {entries.map(([key, child]) => (
          <ContentNode
            key={key}
            name={key}
            value={child}
            forceImages={forceImages}
            depth={depth + 1}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        ))}
      </div>
    );
  }

  return null;
}
