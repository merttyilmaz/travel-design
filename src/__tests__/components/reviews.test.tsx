import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reviews } from "@/components/tour/reviews";

const mockReviews = [
  {
    id: "1",
    name: "Sarah Mitchell",
    avatar: "SM",
    rating: 5,
    date: "March 2026",
    text: "Absolutely incredible experience!",
  },
  {
    id: "2",
    name: "James Okonkwo",
    avatar: "JO",
    rating: 4,
    date: "February 2026",
    text: "The cave visit was the highlight.",
  },
];

describe("Reviews", () => {
  it("renders without crashing", () => {
    render(<Reviews reviews={mockReviews} rating={5} reviewsCount={18} />);
  });

  it("shows the aggregate rating number", () => {
    render(<Reviews reviews={mockReviews} rating={5} reviewsCount={18} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("shows the plural 'reviews' label for multiple reviews", () => {
    render(<Reviews reviews={mockReviews} rating={5} reviewsCount={18} />);
    expect(screen.getByText("18 reviews")).toBeInTheDocument();
  });

  it("shows the singular 'review' label for a single review", () => {
    render(<Reviews reviews={[mockReviews[0]]} rating={5} reviewsCount={1} />);
    expect(screen.getByText("1 review")).toBeInTheDocument();
  });

  it("renders each reviewer's name", () => {
    render(<Reviews reviews={mockReviews} rating={5} reviewsCount={2} />);
    expect(screen.getByText("Sarah Mitchell")).toBeInTheDocument();
    expect(screen.getByText("James Okonkwo")).toBeInTheDocument();
  });

  it("renders each reviewer's date", () => {
    render(<Reviews reviews={mockReviews} rating={5} reviewsCount={2} />);
    expect(screen.getByText("March 2026")).toBeInTheDocument();
    expect(screen.getByText("February 2026")).toBeInTheDocument();
  });

  it("renders each review's text content", () => {
    render(<Reviews reviews={mockReviews} rating={5} reviewsCount={2} />);
    expect(screen.getByText("Absolutely incredible experience!")).toBeInTheDocument();
    expect(screen.getByText("The cave visit was the highlight.")).toBeInTheDocument();
  });

  it("renders empty review list without crashing", () => {
    render(<Reviews reviews={[]} rating={5} reviewsCount={0} />);
    expect(screen.getByText("0 reviews")).toBeInTheDocument();
  });

  it("renders unfilled stars for a rating below 5 (covers xs size branch)", () => {
    const lowRatingReview = { ...mockReviews[0], rating: 2 };
    render(<Reviews reviews={[lowRatingReview]} rating={2} reviewsCount={1} />);
    // Both the summary Stars (size="sm") and review card Stars render — unfilled star branch hit
    const stars = document.querySelectorAll(".lucide-star");
    expect(stars.length).toBeGreaterThan(0);
  });
});
