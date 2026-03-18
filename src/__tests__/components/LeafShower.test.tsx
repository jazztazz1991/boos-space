import { render, screen } from "@testing-library/react";
import { LeafShower } from "@/components/LeafShower";

describe("LeafShower", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders nothing when not active", () => {
    const { container } = render(
      <LeafShower isActive={false} onComplete={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders falling leaves when active", () => {
    render(<LeafShower isActive={true} onComplete={jest.fn()} />);
    expect(screen.getByTestId("leaf-shower")).toBeInTheDocument();
  });

  it("is hidden from accessibility tree", () => {
    render(<LeafShower isActive={true} onComplete={jest.fn()} />);
    expect(screen.getByTestId("leaf-shower")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("renders multiple leaf elements", () => {
    const { container } = render(
      <LeafShower isActive={true} onComplete={jest.fn()} />
    );
    const leaves = container.querySelectorAll(".animate-leaf-fall");
    expect(leaves.length).toBeGreaterThan(0);
    expect(leaves.length).toBeLessThanOrEqual(15);
  });

  it("calls onComplete after animation finishes", () => {
    const onComplete = jest.fn();
    render(<LeafShower isActive={true} onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();
    jest.advanceTimersByTime(4000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("does not render leaves after completing", () => {
    const onComplete = jest.fn();
    const { container, rerender } = render(
      <LeafShower isActive={true} onComplete={onComplete} />
    );

    jest.advanceTimersByTime(4000);

    // Re-render with isActive false (parent would set this in onComplete)
    rerender(<LeafShower isActive={false} onComplete={onComplete} />);
    expect(container.querySelector("[data-testid='leaf-shower']")).toBeNull();
  });
});
