import type { UploadFolder } from "./upload-helpers";
import { isStoredUploadUrl } from "./upload-helpers";

export type UploadResponse = {
  success: true;
  url: string;
  filename: string;
  size: number;
  folder: UploadFolder;
};

/**
 * Serverless hosts (Vercel) reject request bodies above ~4.5MB before our route runs,
 * so larger photos are shrunk in the browser first. The server still enforces 8MB.
 */
export const CLIENT_UPLOAD_TARGET_BYTES = 4 * 1024 * 1024;
const MAX_DIMENSION = 2560;

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function prepareImageForUpload(file: File): Promise<File> {
  if (file.size <= CLIENT_UPLOAD_TARGET_BYTES) return file;
  if (file.type === "image/gif") {
    throw new Error("GIF is too large to upload (max 4MB). Use a smaller GIF or a JPEG/PNG/WebP image.");
  }
  if (typeof document === "undefined" || typeof createImageBitmap === "undefined") {
    throw new Error("Image is too large to upload (max 4MB).");
  }

  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not process the image in this browser.");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const type = file.type === "image/png" || file.type === "image/webp" ? "image/webp" : "image/jpeg";
    for (const quality of [0.9, 0.8, 0.7, 0.6, 0.5]) {
      const blob = await canvasToBlob(canvas, type, quality);
      if (blob && blob.size <= CLIENT_UPLOAD_TARGET_BYTES) {
        const ext = type === "image/webp" ? "webp" : "jpg";
        const base = file.name.replace(/\.[^.]+$/, "") || "image";
        return new File([blob], `${base}.${ext}`, { type });
      }
    }
    throw new Error("Image is too large even after compression. Please use a smaller image.");
  } finally {
    bitmap.close();
  }
}

async function readJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function uploadImageFile(file: File, folder: UploadFolder): Promise<UploadResponse> {
  const prepared = await prepareImageForUpload(file);

  const formData = new FormData();
  formData.append("file", prepared);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const json = await readJson(res);
  if (!res.ok) {
    if (res.status === 413) throw new Error("Image is too large to upload. Please use a smaller image.");
    if (res.status === 401) throw new Error("Your session expired. Please log in again.");
    throw new Error(String(json.message || "Upload failed"));
  }
  return json as unknown as UploadResponse;
}

export async function deleteUploadedImage(url: string): Promise<void> {
  if (!isStoredUploadUrl(url)) return;

  const res = await fetch("/api/upload", {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const json = await readJson(res);
  if (!res.ok) {
    throw new Error(String(json.message || "Failed to delete image"));
  }
}
