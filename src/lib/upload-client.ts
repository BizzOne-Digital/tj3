import type { UploadFolder } from "./upload-helpers";
import { isStoredUploadUrl } from "./upload-helpers";

export type UploadResponse = {
  success: true;
  url: string;
  filename: string;
  size: number;
  folder: UploadFolder;
};

export async function uploadImageFile(file: File, folder: UploadFolder): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Upload failed");
  }
  return json as UploadResponse;
}

export async function deleteUploadedImage(url: string): Promise<void> {
  if (!isStoredUploadUrl(url)) return;

  const res = await fetch("/api/upload", {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Failed to delete image");
  }
}
