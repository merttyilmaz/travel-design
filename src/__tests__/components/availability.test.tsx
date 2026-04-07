import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Availability } from "@/components/tour/availability";

const mockDepartures = [
  { id: "apr-18", startDate: "Apr 18, 2026", endDate: "Apr 27, 2026", price: 1272, spotsLeft: 3 },
  { id: "may-02", startDate: "May 02, 2026", endDate: "May 11, 2026", price: 1272, spotsLeft: 8 },
];

describe("Availability", () => {
  it("renders without crashing", () => {
    render(<Availability departures={mockDepartures} />);
  });

  it("renders the 'Select Departure Month' heading", () => {
    render(<Availability departures={mockDepartures} />);
    expect(screen.getByText("Select Departure Month")).toBeInTheDocument();
  });

  it("renders all six month buttons", () => {
    render(<Availability departures={mockDepartures} />);
    expect(screen.getByText("April 2026")).toBeInTheDocument();
    expect(screen.getByText("May 2026")).toBeInTheDocument();
    expect(screen.getByText("June 2026")).toBeInTheDocument();
    expect(screen.getByText("July 2026")).toBeInTheDocument();
    expect(screen.getByText("August 2026")).toBeInTheDocument();
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });

  it("renders departure dates for each card", () => {
    render(<Availability departures={mockDepartures} />);
    expect(screen.getByText("Apr 18, 2026")).toBeInTheDocument();
    expect(screen.getByText("Apr 27, 2026")).toBeInTheDocument();
    expect(screen.getByText("May 02, 2026")).toBeInTheDocument();
  });

  it("renders price per person", () => {
    render(<Availability departures={mockDepartures} />);
    expect(screen.getAllByText("$1,272/person").length).toBeGreaterThan(0);
  });

  it("shows urgent badge style for departures with 5 or fewer spots", () => {
    render(<Availability departures={mockDepartures} />);
    // Apr 18 has 3 spots → urgent badge includes ⚡
    expect(screen.getByText("⚡ 3 spots remaining")).toBeInTheDocument();
  });

  it("shows normal badge for departures with more than 5 spots", () => {
    render(<Availability departures={mockDepartures} />);
    expect(screen.getByText("8 spots remaining")).toBeInTheDocument();
  });

  it("shows initial total as price × 2 travelers", () => {
    render(<Availability departures={mockDepartures} />);
    // 1272 × 2 = 2544
    expect(screen.getAllByText("$2,544").length).toBeGreaterThan(0);
  });

  it("increments traveler count and updates total price", async () => {
    const user = userEvent.setup();
    render(<Availability departures={mockDepartures} />);
    const plusBtn = screen.getByText("+");
    await user.click(plusBtn);
    // travelers = 3, total = 1272 × 3 = 3816
    expect(screen.getAllByText("$3,816").length).toBeGreaterThan(0);
  });

  it("decrements traveler count and updates total price", async () => {
    const user = userEvent.setup();
    render(<Availability departures={mockDepartures} />);
    const minusBtn = screen.getByText("−");
    await user.click(minusBtn);
    // travelers = 1, total = 1272 × 1 = 1272
    expect(screen.getAllByText("$1,272").length).toBeGreaterThan(0);
  });

  it("clamps traveler count at minimum of 1", async () => {
    const user = userEvent.setup();
    render(<Availability departures={mockDepartures} />);
    const minusBtn = screen.getByText("−");
    await user.click(minusBtn); // 2 → 1
    await user.click(minusBtn); // stays at 1
    const travelerDisplays = screen.getAllByText("1");
    expect(travelerDisplays.length).toBeGreaterThan(0);
  });

  it("clamps traveler count at maximum of 40", async () => {
    const user = userEvent.setup();
    render(<Availability departures={mockDepartures} />);
    const plusBtn = screen.getByText("+");
    // Click 39 more times to reach 41 attempts (should stop at 40)
    for (let i = 0; i < 39; i++) {
      await user.click(plusBtn);
    }
    const travelerDisplays = screen.getAllByText("40");
    expect(travelerDisplays.length).toBeGreaterThan(0);
  });

  it("changes selected month when a month button is clicked", async () => {
    const user = userEvent.setup();
    render(<Availability departures={mockDepartures} />);
    const mayBtn = screen.getByText("May 2026");
    await user.click(mayBtn);
    // After click, May 2026 button should have the active styles
    expect(mayBtn.className).toContain("bg-violet-500");
  });
});
