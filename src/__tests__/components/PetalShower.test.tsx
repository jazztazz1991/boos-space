import { render, screen, act } from "@testing-library/react";
import { PetalShower } from "@/components/PetalShower";

describe("PetalShower", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders nothing when not active", () => {
    const { container } = render(
      <PetalShower isActive={false} onComplete={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders petal shower container when active", () => {
    render(<PetalShower isActive={true} onComplete={jest.fn()} />);
    expect(screen.getByTestId("petal-shower")).toBeInTheDocument();
  });

  it("is hidden from accessibility tree", () => {
    render(<PetalShower isActive={true} onComplete={jest.fn()} />);
    expect(screen.getByTestId("petal-shower")).toHaveAttribute("aria-hidden", "true");
  });

  it("is not interactive (pointer-events-none)", () => {
    render(<PetalShower isActive={true} onComplete={jest.fn()} />);
    expect(screen.getByTestId("petal-shower")).toHaveClass("pointer-events-none");
  });

  it("renders burst petals, drift petals, sparkles, and glow ring", () => {
    render(<PetalShower isActive={true} onComplete={jest.fn()} />);
    const container = screen.getByTestId("petal-shower");
    const svgs = container.querySelectorAll("svg");
    // 15 burst petals + 12 drift petals + 18 sparkles = 45 SVGs
    expect(svgs.length).toBe(45);
    // Glow ring
    expect(screen.getByTestId("glow-ring")).toBeInTheDocument();
  });

  it("calls onComplete after full animation finishes", () => {
    const onComplete = jest.fn();
    render(<PetalShower isActive={true} onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    // Should not fire at the old 4s mark
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(onComplete).not.toHaveBeenCalled();

    // Should fire at 7s
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("cleans up when deactivated", () => {
    const { rerender, container } = render(
      <PetalShower isActive={true} onComplete={jest.fn()} />
    );

    expect(screen.getByTestId("petal-shower")).toBeInTheDocument();

    rerender(<PetalShower isActive={false} onComplete={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
