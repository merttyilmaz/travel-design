import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingCard } from "@/components/tour/booking-card";

const defaultProps = {
  price: 1272,
  originalPrice: 1630,
  rating: 5,
  reviewsCount: 18,
};

describe("BookingCard", () => {
  it("renders without crashing", () => {
    render(<BookingCard {...defaultProps} />);
  });

  it("shows the current price", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("$1,272")).toBeInTheDocument();
  });

  it("shows the original crossed-out price", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("$1,630")).toBeInTheDocument();
  });

  it("calculates and shows the discount percentage", () => {
    render(<BookingCard {...defaultProps} />);
    // (1630 - 1272) / 1630 = 21.96% → rounds to 22
    expect(screen.getByText("-22%")).toBeInTheDocument();
  });

  it("shows the review count", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("· 18 reviews")).toBeInTheDocument();
  });

  it("shows rating value", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("shows initial traveler count of 2 with plural label", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("2 people")).toBeInTheDocument();
  });

  it("shows singular 'person' when travelers is 1", async () => {
    const user = userEvent.setup();
    render(<BookingCard {...defaultProps} />);
    const minusBtn = screen.getByText("−");
    await user.click(minusBtn);
    expect(screen.getByText("1 person")).toBeInTheDocument();
  });

  it("does not go below 1 traveler", async () => {
    const user = userEvent.setup();
    render(<BookingCard {...defaultProps} />);
    const minusBtn = screen.getByText("−");
    await user.click(minusBtn); // 2 → 1
    await user.click(minusBtn); // stays at 1
    expect(screen.getByText("1 person")).toBeInTheDocument();
  });

  it("increments traveler count", async () => {
    const user = userEvent.setup();
    render(<BookingCard {...defaultProps} />);
    const plusBtn = screen.getByText("+");
    await user.click(plusBtn);
    expect(screen.getByText("3 people")).toBeInTheDocument();
  });

  it("does not exceed 40 travelers", async () => {
    const user = userEvent.setup();
    render(<BookingCard {...defaultProps} />);
    const plusBtn = screen.getByText("+");
    for (let i = 0; i < 39; i++) {
      await user.click(plusBtn);
    }
    expect(screen.getByText("40 people")).toBeInTheDocument();
    await user.click(plusBtn);
    expect(screen.queryByText("41 people")).not.toBeInTheDocument();
  });

  it("calculates the correct total price for 2 travelers", () => {
    render(<BookingCard {...defaultProps} />);
    // 1272 × 2 = 2544
    expect(screen.getAllByText("$2,544").length).toBeGreaterThan(0);
  });

  it("shows the correct 'You save' amount for 2 travelers", () => {
    render(<BookingCard {...defaultProps} />);
    // (1630 - 1272) × 2 = 716
    expect(screen.getByText("−$716")).toBeInTheDocument();
  });

  it("updates total when traveler count changes", async () => {
    const user = userEvent.setup();
    render(<BookingCard {...defaultProps} />);
    const plusBtn = screen.getByText("+");
    await user.click(plusBtn);
    // 1272 × 3 = 3816
    expect(screen.getAllByText("$3,816").length).toBeGreaterThan(0);
  });

  it("shows the Check Availability CTA button", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("Check Availability")).toBeInTheDocument();
  });

  it("shows the Ask a Question CTA button", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText("Ask a Question")).toBeInTheDocument();
  });

  it("shows the free cancellation trust signal", () => {
    render(<BookingCard {...defaultProps} />);
    expect(screen.getByText(/Free cancellation/)).toBeInTheDocument();
  });

  it("renders unfilled stars for a rating below 5", () => {
    render(<BookingCard {...defaultProps} rating={3} />);
    const stars = document.querySelectorAll(".lucide-star");
    expect(stars.length).toBe(5);
  });

  describe("Check Availability scroll", () => {
    beforeEach(() => {
      vi.stubGlobal("scrollTo", vi.fn());
      const mockEl = { getBoundingClientRect: () => ({ top: 800 }), scrollIntoView: vi.fn() };
      vi.spyOn(document, "getElementById").mockReturnValue(mockEl as unknown as HTMLElement);
    });

    it("scrolls to the availability section when Check Availability is clicked", async () => {
      const user = userEvent.setup();
      render(<BookingCard {...defaultProps} />);
      await user.click(screen.getByText("Check Availability"));
      expect(document.getElementById).toHaveBeenCalledWith("availability");
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: "smooth" })
      );
    });
  });
});
