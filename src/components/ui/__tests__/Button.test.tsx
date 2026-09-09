import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Book Now</Button>);
    expect(screen.getByRole("button", { name: "Book Now" })).toBeInTheDocument();
  });

  it("renders as external link", () => {
    render(
      <Button href="https://www.zeffy.com/donate" external>
        Donate
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Donate" });
    expect(link).toHaveAttribute("href", "https://www.zeffy.com/donate");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
