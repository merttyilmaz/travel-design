import { describe, it, expect } from "vitest";
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
    // 1272 × 2 = 2544 (appears in both breakdown row and Total line)
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
    // 1272 × 3 = 3816 (appears in breakdown row and Total line)
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
    render(<BookingCard {...defaultProps} price={1272} originalPrice={1630} rating={3} reviewsCount={5} />);
    // 3 filled + 2 unfilled — component renders 5 star icons total
    const stars = document.querySelectorAll(".lucide-star");
    expect(stars.length).toBe(5);
  });
});
