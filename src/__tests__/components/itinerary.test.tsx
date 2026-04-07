import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Itinerary } from "@/components/tour/itinerary";

const days = [
  { day: 1, title: "Arrival in Istanbul", description: "Arrive at Istanbul Airport." },
  { day: 2, title: "City Tour", description: "Explore the Blue Mosque and Hagia Sophia." },
  { day: 3, title: "Nature Day", description: "Visit Seven Lakes National Park." },
];

describe("Itinerary", () => {
  it("renders without crashing", () => {
    render(<Itinerary days={days} />);
  });

  it("shows '3-Day Program' heading for 3 days", () => {
    render(<Itinerary days={days} />);
    expect(screen.getByText("3-Day Program")).toBeInTheDocument();
  });

  it("shows '1-Day Program' for a single day", () => {
    render(<Itinerary days={[days[0]]} />);
    expect(screen.getByText("1-Day Program")).toBeInTheDocument();
  });

  it("renders a trigger row for every itinerary day", () => {
    render(<Itinerary days={days} />);
    expect(screen.getByText("Arrival in Istanbul")).toBeInTheDocument();
    expect(screen.getByText("City Tour")).toBeInTheDocument();
    expect(screen.getByText("Nature Day")).toBeInTheDocument();
  });

  it("renders the correct 'Day N' label for each item", () => {
    render(<Itinerary days={days} />);
    expect(screen.getByText("Day 1")).toBeInTheDocument();
    expect(screen.getByText("Day 2")).toBeInTheDocument();
    expect(screen.getByText("Day 3")).toBeInTheDocument();
  });

  it("renders empty list without crashing", () => {
    render(<Itinerary days={[]} />);
    expect(screen.getByText("0-Day Program")).toBeInTheDocument();
  });
});
