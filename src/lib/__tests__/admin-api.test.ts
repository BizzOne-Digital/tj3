// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { friendlyError, isAdminResource, sanitizeBody, slugify, withSlug } from "../admin-api";

describe("sanitizeBody", () => {
  it("drops server-managed fields and mongo operators at every depth", () => {
    const body = JSON.parse(
      '{"name":"x","_id":"1","__v":3,"createdAt":"d","$set":{"a":1},"nested":{"$where":"1","ok":true},"list":[{"$ne":1,"v":2}]}',
    );
    expect(sanitizeBody(body)).toEqual({ name: "x", nested: { ok: true }, list: [{ v: 2 }] });
  });

  it("returns an empty object for non-objects", () => {
    expect(sanitizeBody(null)).toEqual({});
    expect(sanitizeBody("x")).toEqual({});
    expect(sanitizeBody([1])).toEqual({});
  });
});

describe("withSlug", () => {
  it("generates a slug from name/title when missing", () => {
    expect(withSlug("coaches", { name: "Coach Dave & Sons" }).slug).toBe("coach-dave-and-sons");
    expect(withSlug("news", { title: "Big News!" }).slug).toBe("big-news");
  });

  it("normalises a provided slug", () => {
    expect(withSlug("team", { name: "A", slug: "My Slug!" }).slug).toBe("my-slug");
  });

  it("leaves resources without a slug untouched", () => {
    expect(withSlug("schedule", { title: "x" })).toEqual({ title: "x" });
    expect(withSlug("faq", { question: "x" })).toEqual({ question: "x" });
  });
});

describe("admin resources", () => {
  it("exposes the new resources and rejects prototype keys", () => {
    for (const r of ["schedule", "coaches", "gallery", "team", "news"]) expect(isAdminResource(r)).toBe(true);
    for (const r of ["users", "storedupload", "__proto__", "constructor", "toString"]) {
      expect(isAdminResource(r), r).toBe(false);
    }
  });

  it("maps duplicate key errors to a readable message", () => {
    const msg = friendlyError({ code: 11000, keyPattern: { slug: 1 } }, "fallback");
    expect(msg).toMatch(/slug/);
    expect(msg).toMatch(/already in use/);
  });

  it("slugify handles odd input", () => {
    expect(slugify("  --Hello__World--  ")).toBe("hello-world");
    expect(slugify("!!!")).toBe("");
  });
});
