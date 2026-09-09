import { AnimatedCounter } from "../AnimatedCounter";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/motion", () => ({
  usePrefersReducedMotion: () => true,
}));

describe("AnimatedCounter", () => {
  it("shows final value immediately when reduced motion is preferred", () => {
    render(<AnimatedCounter value={500} suffix="+" label="Members" />);
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
  });
});
