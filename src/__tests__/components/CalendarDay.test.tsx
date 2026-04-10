import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarDay } from "@/components/CalendarDay";

describe("CalendarDay", () => {
  const defaultProps = {
    day: 15,
    year: 2026,
    month: 2,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the day number", () => {
    render(<CalendarDay {...defaultProps} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("shows seed icon when no entry exists", () => {
    render(<CalendarDay {...defaultProps} />);
    expect(screen.getByRole("img", { name: "Not logged" })).toBeInTheDocument();
  });

  it("shows leaf icon for a good day", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "GOOD", notes: null }}
      />
    );
    expect(screen.getByRole("img", { name: "Good day" })).toBeInTheDocument();
  });

  it("shows wilted flower icon for a tough day", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "TOUGH", notes: null }}
      />
    );
    expect(screen.getByRole("img", { name: "Tough day" })).toBeInTheDocument();
  });

  it("shows cherry blossom icon for a self care day", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "SELF_CARE", notes: null }}
      />
    );
    expect(screen.getByRole("img", { name: "Self care day" })).toBeInTheDocument();
  });

  it("shows notes indicator when entry has notes", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "GOOD", notes: "Felt great" }}
      />
    );
    expect(screen.getByLabelText("Has notes")).toBeInTheDocument();
  });

  it("does not show notes indicator when entry has no notes", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "GOOD", notes: null }}
      />
    );
    expect(screen.queryByLabelText("Has notes")).not.toBeInTheDocument();
  });

  it("calls onClick with the day number when clicked", async () => {
    const user = userEvent.setup();
    render(<CalendarDay {...defaultProps} />);

    await user.click(screen.getByRole("button"));
    expect(defaultProps.onClick).toHaveBeenCalledWith(15);
  });

  it("has accessible label including status and day", () => {
    render(<CalendarDay {...defaultProps} />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Not logged - 15");
  });

  it("has accessible label for self care day", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "SELF_CARE", notes: null }}
      />
    );
    expect(screen.getByRole("button")).toHaveAccessibleName("Self care day - 15");
  });

  it("applies persistent animations to self care day cells", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "SELF_CARE", notes: null }}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("self-care-cell");
    expect(button).toHaveClass("animate-self-care-breath");

    const emoji = screen.getByRole("img", { name: "Self care day" });
    expect(emoji).toHaveClass("animate-gentle-float");
  });

  it("does not apply persistent animations to non-self-care days", () => {
    render(
      <CalendarDay
        {...defaultProps}
        entry={{ id: "1", date: "2026-03-15", dayType: "GOOD", notes: null }}
      />
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("self-care-cell");
    expect(button).not.toHaveClass("animate-self-care-breath");

    const emoji = screen.getByRole("img", { name: "Good day" });
    expect(emoji).not.toHaveClass("animate-gentle-float");
  });
});
