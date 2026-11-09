import { describe, expect, it } from "vitest";
import {
  CONTENT_DEFAULTS,
  CONTENT_KEYS,
  CONTENT_SECTIONS,
  isContentKey,
  mergeContent,
  resolveContent,
} from "../site-content";

describe("mergeContent", () => {
  it("returns defaults when there is no override", () => {
    expect(mergeContent({ a: "x" }, undefined)).toEqual({ a: "x" });
    expect(mergeContent({ a: "x" }, null)).toEqual({ a: "x" });
  });

  it("overrides strings and keeps untouched keys", () => {
    expect(mergeContent({ a: "x", b: "y" }, { a: "new" })).toEqual({ a: "new", b: "y" });
  });

  it("allows an empty string override (admin cleared the text)", () => {
    expect(mergeContent({ a: "x" }, { a: "" })).toEqual({ a: "" });
  });

  it("replaces arrays wholesale, including with an empty array", () => {
    expect(mergeContent({ list: ["a", "b"] }, { list: ["c"] })).toEqual({ list: ["c"] });
    expect(mergeContent({ list: ["a", "b"] }, { list: [] })).toEqual({ list: [] });
  });

  it("merges nested objects key by key", () => {
    const merged = mergeContent({ one: { a: "1", b: "2" } }, { one: { b: "changed" } });
    expect(merged).toEqual({ one: { a: "1", b: "changed" } });
  });

  it("ignores overrides with the wrong type", () => {
    expect(mergeContent({ a: "x", n: 1, l: ["a"] }, { a: 5, n: "no", l: "no" })).toEqual({
      a: "x",
      n: 1,
      l: ["a"],
    });
  });

  it("never lets operator or prototype keys through", () => {
    const merged = mergeContent({ a: "x" }, JSON.parse('{"$set":{"a":"hack"},"__proto__":{"polluted":true}}'));
    expect(merged).toEqual({ a: "x" });
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe("content registry", () => {
  it("every admin section points at a real content key", () => {
    for (const section of CONTENT_SECTIONS) {
      expect(isContentKey(section.key)).toBe(true);
    }
  });

  it("every content key is editable from the admin (has a section)", () => {
    const covered = new Set(CONTENT_SECTIONS.map((s) => s.key));
    for (const key of CONTENT_KEYS) {
      expect(covered.has(key), `${key} has no admin section`).toBe(true);
    }
  });

  it("resolveContent falls back to defaults and applies overrides", () => {
    expect(resolveContent("home.donate", {}).title).toBe(CONTENT_DEFAULTS["home.donate"].title);
    expect(resolveContent("home.donate", { "home.donate": { title: "Give" } }).title).toBe("Give");
  });

  it("rejects unknown keys", () => {
    expect(isContentKey("nope")).toBe(false);
    expect(isContentKey("__proto__")).toBe(false);
    expect(isContentKey("toString")).toBe(false);
  });
});
