import { BRAND_LOGO } from "./constants";

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const IMAGE_PLACEHOLDER = "/images/placeholder.svg";

const MIME_TO_EXT: Record<AllowedMimeType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const STALE_LOGO_PATHS = new Set(["/logo.jpg", "/logo.jpeg", "/logo.svg"]);

export function isStoredUploadUrl(url: string): boolean {
  return url.startsWith("/api/uploads/");
}

export function isLegacyDiskUploadUrl(url: string): boolean {
  return url.startsWith("/uploads/");
}

/** Prefer the current brand logo; ignore stale DB paths from older deployments. */
export function resolveSiteLogo(logoUrl?: string | null): string {
  if (!logoUrl || STALE_LOGO_PATHS.has(logoUrl)) return BRAND_LOGO;
  if (isLegacyDiskUploadUrl(logoUrl)) return BRAND_LOGO;
  return logoUrl;
}

export function parseStoredUploadUrl(
  url: string,
): { folder: UploadFolder; filename: string } | null {
  const match = url.match(/^\/api\/uploads\/([^/]+)\/([^/]+)$/);
  if (!match) return null;

  const folder = match[1];
  const filename = match[2];

  if (!UPLOAD_FOLDERS.includes(folder as UploadFolder)) return null;
  if (!isSafeUploadFilename(filename)) return null;

  return { folder: folder as UploadFolder, filename };
}

export function isSafeUploadFilename(filename: string): boolean {
  if (!filename || filename.length > 255) return false;
  if (filename.includes("..")) return false;
  if (filename.includes("/") || filename.includes("\\")) return false;
  return /^[a-zA-Z0-9._-]+$/.test(filename);
}

export function isAllowedFolder(folder: string): folder is UploadFolder {
  return UPLOAD_FOLDERS.includes(folder as UploadFolder);
}

export function extensionForMime(mimeType: string): string | null {
  return MIME_TO_EXT[mimeType as AllowedMimeType] ?? null;
}

export function validateUploadFile(
  file: File | Blob,
  mimeType: string,
  size: number,
): string | null {
  if (!ALLOWED_MIME_TYPES.includes(mimeType as AllowedMimeType)) {
    return "Invalid file type. Allowed: JPEG, PNG, WebP, GIF.";
  }
  if (size > MAX_UPLOAD_BYTES) {
    return "File too large. Maximum size is 8MB.";
  }
  if (size <= 0) {
    return "Empty file.";
  }
  return null;
}

/** Resolve public image URLs; legacy disk uploads fall back to placeholder. */
export function resolveImageUrl(url?: string | null): string {
  if (!url) return IMAGE_PLACEHOLDER;
  if (isLegacyDiskUploadUrl(url)) return IMAGE_PLACEHOLDER;
  return url;
}

export function resolveSiteLogoUrl(logoUrl?: string | null): string {
  return resolveImageUrl(resolveSiteLogo(logoUrl));
}
