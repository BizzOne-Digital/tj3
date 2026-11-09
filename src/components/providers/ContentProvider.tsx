"use client";

import {
  resolveContent,
  type ContentKey,
  type ContentOf,
  type ContentOverrides,
} from "@/lib/site-content";
import { createContext, useContext } from "react";

const ContentContext = createContext<ContentOverrides>({});

export function ContentProvider({
  overrides,
  children,
}: {
  overrides: ContentOverrides;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={overrides}>{children}</ContentContext.Provider>;
}

/** Editable site content (admin override merged over the shipped default). */
export function useContent<K extends ContentKey>(key: K): ContentOf<K> {
  return resolveContent(key, useContext(ContentContext));
}
