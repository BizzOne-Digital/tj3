import "server-only";
import { connectDB } from "./db";
import { StoredUpload } from "./models";
import { parseStoredUploadUrl } from "./upload-helpers";

export async function deleteStoredUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;

  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}
