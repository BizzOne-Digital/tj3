import "server-only";
import { cache } from "react";
import { connectDB } from "./db";
import { SiteContent } from "./models";
import {
  CONTENT_KEYS,
  resolveContent,
  type ContentKey,
  type ContentOf,
  type ContentOverrides,
} from "./site-content";

/** All admin overrides, loaded once per request. Never throws (falls back to defaults). */
export const getContentOverrides = cache(async (): Promise<ContentOverrides> => {
  try {
    await connectDB();
    const docs = await SiteContent.find({ key: { $in: CONTENT_KEYS } }).lean();
    const out: ContentOverrides = {};
    for (const doc of docs) {
      out[doc.key as ContentKey] = doc.value;
    }
    return out;
  } catch {
    return {};
  }
});

export async function getContent<K extends ContentKey>(key: K): Promise<ContentOf<K>> {
  return resolveContent(key, await getContentOverrides());
}
