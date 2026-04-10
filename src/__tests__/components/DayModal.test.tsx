import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DayModal } from "@/components/DayModal";

describe("DayModal", () => {
  const defaultProps = {
    isOpen: true,
    dateKey: "2026-03-15",
    onSave: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when not open", () => {
    const { container } = render(
      <DayModal {...defaultProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when dateKey is null", () => {
    const { container } = render(
      <DayModal {...defaultProps} dateKey={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("displays the formatted date", () => {
    render(<DayModal {...defaultProps} />);
    expect(screen.getByText(/March 15, 2026/)).toBeInTheDocument();
  });

  it("shows Garden Log heading", () => {
    render(<DayModal {...defaultProps} />);
    expect(screen.getByText("Garden Log")).toBeInTheDocument();
  });

  it("has Good Day, Tough Day, and Extra Self Care buttons", () => {
    render(<DayModal {...defaultProps} />);
    expect(screen.getByText("Good Day")).toBeInTheDocument();
    expect(screen.getByText("Tough Day")).toBeInTheDocument();
    expect(screen.getByText("Extra Self Care")).toBeInTheDocument();
  });

  it("defaults to Good Day selected", () => {
    render(<DayModal {...defaultProps} />);
    const goodDayButton = screen.getByText("Good Day").closest("button");
    expect(goodDayButton).toHaveAttribute("aria-pressed", "true");
  });

  it("pre-fills with existing entry data for TOUGH day", () => {
    render(
      <DayModal
        {...defaultProps}
        entry={{
          id: "1",
          date: "2026-03-15",
          dayType: "TOUGH",
          notes: "Stressful day",
        }}
      />
    );

    const toughDayButton = screen.getByText("Tough Day").closest("button");
    expect(toughDayButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByDisplayValue("Stressful day")).toBeInTheDocument();
  });

  it("pre-fills with existing entry data for SELF_CARE day", () => {
    render(
      <DayModal
        {...defaultProps}
        entry={{
          id: "1",
          date: "2026-03-15",
          dayType: "SELF_CARE",
          notes: "Bath and journaling",
        }}
      />
    );

    const selfCareButton = screen.getByText("Extra Self Care").closest("button");
    expect(selfCareButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByDisplayValue("Bath and journaling")).toBeInTheDocument();
  });

  it("allows toggling between all three day types", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    const toughDayButton = screen.getByText("Tough Day").closest("button")!;
    await user.click(toughDayButton);
    expect(toughDayButton).toHaveAttribute("aria-pressed", "true");

    const selfCareButton = screen.getByText("Extra Self Care").closest("button")!;
    await user.click(selfCareButton);
    expect(selfCareButton).toHaveAttribute("aria-pressed", "true");

    const goodDayButton = screen.getByText("Good Day").closest("button")!;
    await user.click(goodDayButton);
    expect(goodDayButton).toHaveAttribute("aria-pressed", "true");
  });

  it("shows encouragement text when Self Care is selected", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    expect(screen.queryByText("You deserve this")).not.toBeInTheDocument();

    const selfCareButton = screen.getByText("Extra Self Care").closest("button")!;
    await user.click(selfCareButton);
    expect(screen.getByText("You deserve this")).toBeInTheDocument();
  });

  it("shows self care placeholder when Self Care is selected", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    const selfCareButton = screen.getByText("Extra Self Care").closest("button")!;
    await user.click(selfCareButton);
    expect(screen.getByPlaceholderText(/take care of yourself/)).toBeInTheDocument();
  });

  it("allows typing notes", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/How are you feeling/);
    await user.type(textarea, "Had a peaceful morning");
    expect(textarea).toHaveValue("Had a peaceful morning");
  });

  it("shows character count", () => {
    render(<DayModal {...defaultProps} />);
    expect(screen.getByText("0/1000")).toBeInTheDocument();
  });

  it("calls onSave with GOOD day type when Save is clicked", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/How are you feeling/);
    await user.type(textarea, "Good vibes");

    await user.click(screen.getByText("Save Entry"));
    expect(defaultProps.onSave).toHaveBeenCalledWith(
      "2026-03-15",
      "GOOD",
      "Good vibes"
    );
  });

  it("calls onSave with TOUGH day type", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    await user.click(screen.getByText("Tough Day").closest("button")!);
    await user.click(screen.getByText("Save Entry"));
    expect(defaultProps.onSave).toHaveBeenCalledWith(
      "2026-03-15",
      "TOUGH",
      ""
    );
  });

  it("calls onSave with SELF_CARE day type", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    await user.click(screen.getByText("Extra Self Care").closest("button")!);
    await user.click(screen.getByText("Save Entry"));
    expect(defaultProps.onSave).toHaveBeenCalledWith(
      "2026-03-15",
      "SELF_CARE",
      ""
    );
  });

  it("calls onClose when Cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    await user.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<DayModal {...defaultProps} />);

    await user.click(screen.getByLabelText("Close"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("has accessible dialog role", () => {
    render(<DayModal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
