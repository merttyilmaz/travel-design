import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TourContent } from "@/components/tour/tour-content";

// jsdom does not implement IntersectionObserver — must use function, not arrow
vi.stubGlobal(
  "IntersectionObserver",
  vi.fn().mockImplementation(function () {
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  })
);

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

describe("TourContent", () => {
  it("renders without crashing", () => {
    render(<TourContent tour={mockTour} />);
  });

  describe("anchor nav", () => {
    it("renders all six nav pills", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByRole("button", { name: "Overview" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Highlights" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Itinerary" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Included" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Availability" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reviews (18)" })).toBeInTheDocument();
    });

    it("includes the review count in the Reviews nav pill", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByRole("button", { name: "Reviews (18)" })).toBeInTheDocument();
    });

    it("Overview pill is active by default", () => {
      render(<TourContent tour={mockTour} />);
      const overviewBtn = screen.getByRole("button", { name: "Overview" });
      expect(overviewBtn.className).toMatch(/bg-violet-600/);
    });

    it("scrolls to the correct section when a nav pill is clicked", async () => {
      vi.stubGlobal("scrollTo", vi.fn());
      const mockEl = { getBoundingClientRect: () => ({ top: 500 }) };
      vi.spyOn(document, "getElementById").mockReturnValue(mockEl as unknown as HTMLElement);

      const user = userEvent.setup();
      render(<TourContent tour={mockTour} />);
      await user.click(screen.getByRole("button", { name: "Highlights" }));
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: "smooth" })
      );
    });
  });

  describe("always-visible sections", () => {
    it("shows the overview description without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText("A fantastic ecotourism adventure through Turkey.")).toBeInTheDocument();
    });

    it("shows overview tags without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText("Ecotourism")).toBeInTheDocument();
      expect(screen.getByText("Nature")).toBeInTheDocument();
      expect(screen.getByText("Culture")).toBeInTheDocument();
    });

    it("shows highlights without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText("Istanbul historical sites")).toBeInTheDocument();
      expect(screen.getByText("Seven Lakes National Park hike")).toBeInTheDocument();
    });

    it("shows itinerary days without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText("Arrival in Istanbul")).toBeInTheDocument();
      expect(screen.getByText("City Tour")).toBeInTheDocument();
    });

    it("shows included and excluded items without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText("10 nights hotel accommodation")).toBeInTheDocument();
      expect(screen.getByText("International flights")).toBeInTheDocument();
    });

    it("shows availability dates without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText(/Apr 18/)).toBeInTheDocument();
    });

    it("shows reviews without any interaction", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByText("Sarah Mitchell")).toBeInTheDocument();
      expect(screen.getByText("Absolutely incredible experience!")).toBeInTheDocument();
    });

    it("renders all section headings", () => {
      render(<TourContent tour={mockTour} />);
      expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Highlights" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Itinerary" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "What's Included" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Availability" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Reviews" })).toBeInTheDocument();
    });
  });
});
