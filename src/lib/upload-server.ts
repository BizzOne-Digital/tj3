import "server-only";
import { connectDB } from "./db";
import { RESOURCE_MAP, SiteContent, SiteSettings, StoredUpload } from "./models";
import { collectStoredUploadUrls, parseStoredUploadUrl } from "./upload-helpers";

export { collectStoredUploadUrls };

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

/**
 * Delete uploads that were referenced by `before` but are no longer referenced by `after`.
 * Pass `after = undefined` when the owning document was deleted.
 * Failures are swallowed: a leftover orphan must never block a content save.
 */
export async function deleteReplacedUploads(before: unknown, after?: unknown): Promise<number> {
  const previous = collectStoredUploadUrls(before);
  if (previous.size === 0) return 0;
  const current = after === undefined ? new Set<string>() : collectStoredUploadUrls(after);

  let deleted = 0;
  for (const url of previous) {
    if (current.has(url)) continue;
    try {
      if (await deleteStoredUploadByUrl(url)) deleted += 1;
    } catch {
      /* ignore */
    }
  }
  return deleted;
}

const EMBEDDED_UPLOAD_URL = /\/api\/uploads\/(products|gallery|pages|misc)\/([A-Za-z0-9._-]+)/g;

/** Every `folder/filename` referenced anywhere in the database, including URLs embedded in HTML strings. */
export async function findReferencedUploadKeys(): Promise<Set<string>> {
  await connectDB();
  const models = [...Object.values(RESOURCE_MAP), SiteSettings, SiteContent];
  const referenced = new Set<string>();
  for (const Model of models) {
    const docs = await Model.find({}).lean();
    for (const doc of docs) {
      const text = JSON.stringify(doc);
      for (const match of text.matchAll(EMBEDDED_UPLOAD_URL)) {
        referenced.add(`${match[1]}/${match[2]}`);
      }
    }
  }
  return referenced;
}

/** Delete stored uploads that nothing references and that are older than `graceMs` (default 24h). */
export async function cleanupOrphanedUploads(graceMs = 24 * 60 * 60 * 1000) {
  await connectDB();
  const referenced = await findReferencedUploadKeys();
  const cutoff = new Date(Date.now() - graceMs);
  const all = await StoredUpload.find({}).select("folder filename createdAt").lean();

  let deleted = 0;
  let keptRecent = 0;
  for (const doc of all) {
    if (referenced.has(`${doc.folder}/${doc.filename}`)) continue;
    if (doc.createdAt && doc.createdAt > cutoff) {
      keptRecent += 1;
      continue;
    }
    await StoredUpload.deleteOne({ _id: doc._id });
    deleted += 1;
  }
  return { scanned: all.length, deleted, keptRecent, referenced: referenced.size };
}
