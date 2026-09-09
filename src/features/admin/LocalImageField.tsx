"use client";

import { deleteUploadedImage, uploadImageFile } from "@/lib/upload-client";
import type { UploadFolder } from "@/lib/upload-helpers";
import { isStoredUploadUrl, resolveImageUrl } from "@/lib/upload-helpers";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

export function LocalImageField({
  label,
  value,
  onChange,
  folder,
  className,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const previewSrc = value ? resolveImageUrl(value) : "";

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    try {
      if (value && isStoredUploadUrl(value)) {
        await deleteUploadedImage(value);
      }

      const result = await uploadImageFile(file, folder);
      onChange(result.url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    setUploading(true);
    try {
      if (isStoredUploadUrl(value)) {
        await deleteUploadedImage(value);
      }
      onChange("");
      toast.success("Image removed");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Remove failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="block text-sm font-medium text-cool-grey">{label}</p>

      {value ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-graphite">
            <Image
              src={previewSrc}
              alt={label}
              fill
              className="object-cover"
              sizes="112px"
              unoptimized={previewSrc.startsWith("/api/uploads/")}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="break-all text-xs text-cool-grey">{value}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={uploading}
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-white hover:bg-white/5 disabled:opacity-50"
              >
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
                Replace
              </button>
              <button
                type="button"
                disabled={uploading}
                onClick={handleRemove}
                className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-3 py-2 text-xs text-red-300 hover:bg-red-400/10 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface/50 px-4 py-8 text-sm text-cool-grey hover:border-ice/40 hover:text-white disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-ice" />
              Uploading...
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6 text-ice" />
              Upload image ({folder})
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
