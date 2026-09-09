import { formatDate, formatPrice, slugify } from "../utils";
import { describe, expect, it } from "vitest";

describe("utils", () => {
  it("slugifies text", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("formats price in CAD", () => {
    expect(formatPrice(29.99)).toMatch(/29\.99/);
  });

  it("formats dates", () => {
    expect(formatDate("2026-01-15")).toMatch(/2026/);
  });
});
