import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TourTabs } from "@/components/tour/tour-tabs";

const mockTour = {
  description: "A fantastic ecotourism adventure through Turkey.",
  tags: ["Ecotourism", "Nature", "Culture"],
  highlights: ["Istanbul historical sites", "Seven Lakes National Park hike"],
  includes: ["10 nights hotel accommodation", "Daily breakfast and dinner"],
  excludes: ["International flights", "Travel insurance"],
  itinerary: [
    { day: 1, title: "Arrival in Istanbul", description: "Arrive at Istanbul Airport." },
    { day: 2, title: "City Tour", description: "Explore the city." },
  ],
  availability: [
    { id: "apr-18", startDate: "Apr 18, 2026", endDate: "Apr 27, 2026", price: 1272, spotsLeft: 3 },
  ],
  reviews: [
    {
      id: "1",
      name: "Sarah Mitchell",
      avatar: "SM",
      rating: 5,
      date: "March 2026",
      text: "Absolutely incredible experience!",
    },
  ],
  rating: 5,
  reviewsCount: 18,
};

describe("TourTabs", () => {
  it("renders without crashing", () => {
    render(<TourTabs tour={mockTour} />);
  });

  it("renders all six tab triggers", () => {
    render(<TourTabs tour={mockTour} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Highlights")).toBeInTheDocument();
    expect(screen.getByText("Itinerary")).toBeInTheDocument();
    expect(screen.getByText("Includes")).toBeInTheDocument();
    expect(screen.getByText("Availability")).toBeInTheDocument();
  });

  it("shows the review count in the Reviews tab label", () => {
    render(<TourTabs tour={mockTour} />);
    expect(screen.getByText("Reviews (18)")).toBeInTheDocument();
  });

  it("shows the tour description in the default Overview tab", () => {
    render(<TourTabs tour={mockTour} />);
    expect(
      screen.getByText("A fantastic ecotourism adventure through Turkey.")
    ).toBeInTheDocument();
  });

  it("renders overview tags", () => {
    render(<TourTabs tour={mockTour} />);
    expect(screen.getByText("Ecotourism")).toBeInTheDocument();
    expect(screen.getByText("Nature")).toBeInTheDocument();
    expect(screen.getByText("Culture")).toBeInTheDocument();
  });

  it("calls scrollIntoView when a tab is clicked", async () => {
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    await user.click(screen.getByText("Highlights"));
    expect(scrollSpy).toHaveBeenCalled();
    scrollSpy.mockRestore();
  });

  it("shows highlights content after clicking Highlights tab", async () => {
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    await user.click(screen.getByText("Highlights"));
    expect(screen.getByText("Istanbul historical sites")).toBeInTheDocument();
    expect(screen.getByText("Seven Lakes National Park hike")).toBeInTheDocument();
  });

  it("shows itinerary content after clicking Itinerary tab", async () => {
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    await user.click(screen.getByText("Itinerary"));
    expect(screen.getByText("Arrival in Istanbul")).toBeInTheDocument();
  });

  it("shows includes and excludes after clicking Includes tab", async () => {
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    await user.click(screen.getByText("Includes"));
    expect(screen.getByText("10 nights hotel accommodation")).toBeInTheDocument();
    expect(screen.getByText("International flights")).toBeInTheDocument();
  });

  it("shows the skeleton immediately after clicking Reviews tab", async () => {
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    await user.click(screen.getByText("Reviews (18)"));
    // Reviews content is not yet visible — skeleton is showing instead
    expect(screen.queryByText("Sarah Mitchell")).not.toBeInTheDocument();
  });

  it("replaces the skeleton with real reviews after the load delay", async () => {
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    await user.click(screen.getByText("Reviews (18)"));
    await waitFor(
      () => expect(screen.getByText("Sarah Mitchell")).toBeInTheDocument(),
      { timeout: 3000 },
    );
    expect(screen.getByText("Absolutely incredible experience!")).toBeInTheDocument();
  }, 5000);

  it("does not show the skeleton again when revisiting the Reviews tab", async () => {
    const user = userEvent.setup();
    render(<TourTabs tour={mockTour} />);
    // First visit — wait for load
    await user.click(screen.getByText("Reviews (18)"));
    await waitFor(
      () => expect(screen.getByText("Sarah Mitchell")).toBeInTheDocument(),
      { timeout: 3000 },
    );
    // Navigate away and back — content must be instantly visible
    await user.click(screen.getByText("Overview"));
    await user.click(screen.getByText("Reviews (18)"));
    expect(screen.getByText("Sarah Mitchell")).toBeInTheDocument();
  }, 8000);
});
