import { render, screen } from "@testing-library/react";
import { GrowingVine } from "@/components/GrowingVine";

describe("GrowingVine", () => {
  it("renders the left vine", () => {
    render(<GrowingVine goodDays={5} totalDays={31} side="left" />);
    expect(screen.getByTestId("growing-vine-left")).toBeInTheDocument();
  });

  it("renders the right vine", () => {
    render(<GrowingVine goodDays={5} totalDays={31} side="right" />);
    expect(screen.getByTestId("growing-vine-right")).toBeInTheDocument();
  });

  it("is hidden from accessibility tree", () => {
    render(<GrowingVine goodDays={3} totalDays={31} side="left" />);
    const vine = screen.getByTestId("growing-vine-left");
    expect(vine).toHaveAttribute("aria-hidden", "true");
  });

  it("renders leaves matching the number of good days", () => {
    const { container } = render(
      <GrowingVine goodDays={7} totalDays={31} side="left" />
    );
    // Each leaf is a <g> with animate-leaf-grow class containing an ellipse
    const leaves = container.querySelectorAll(".animate-leaf-grow");
    expect(leaves).toHaveLength(7);
  });

  it("renders zero leaves when no good days", () => {
    const { container } = render(
      <GrowingVine goodDays={0} totalDays={31} side="left" />
    );
    const leaves = container.querySelectorAll(".animate-leaf-grow");
    expect(leaves).toHaveLength(0);
  });

  it("renders leaves with staggered animation delays", () => {
    const { container } = render(
      <GrowingVine goodDays={3} totalDays={31} side="right" />
    );
    const leaves = container.querySelectorAll(".animate-leaf-grow");
    expect(leaves[0]).toHaveStyle({ animationDelay: "0s" });
    expect(leaves[1]).toHaveStyle({ animationDelay: "0.1s" });
    expect(leaves[2]).toHaveStyle({ animationDelay: "0.2s" });
  });

  it("renders a bud when there are unlogged days remaining", () => {
    const { container } = render(
      <GrowingVine goodDays={3} totalDays={31} side="left" />
    );
    // Bud is a small circle after the last leaf
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("handles edge case of all good days", () => {
    const { container } = render(
      <GrowingVine goodDays={31} totalDays={31} side="left" />
    );
    const leaves = container.querySelectorAll(".animate-leaf-grow");
    // Should have leaves up to totalDays (limited by vine points)
    expect(leaves.length).toBeGreaterThan(0);
    expect(leaves.length).toBeLessThanOrEqual(31);
  });
});
