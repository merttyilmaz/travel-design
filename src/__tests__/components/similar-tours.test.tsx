import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SimilarTours } from "@/components/tour/similar-tours";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

const mockTours = [
  {
    slug: "7-days-cappadocia",
    title: "7 Days Cappadocia & Fairy Chimneys",
    duration: 7,
    price: 890,
    originalPrice: 1100,
    image: "https://example.com/cappadocia.jpg",
  },
  {
    slug: "5-days-pamukkale",
    title: "5 Days Pamukkale & Hierapolis",
    duration: 5,
    price: 620,
    originalPrice: 800,
    image: "https://example.com/pamukkale.jpg",
  },
];

describe("SimilarTours", () => {
  it("renders the section heading", () => {
    render(<SimilarTours tours={mockTours} />);
    expect(screen.getByText("You Might Also Like")).toBeInTheDocument();
  });

  it("renders 'View all' as a non-navigating element (in construction)", () => {
    render(<SimilarTours tours={mockTours} />);
    const viewAll = screen.getByText("View all");
    expect(viewAll.tagName).not.toBe("A");
    expect(viewAll.closest("a")).toBeNull();
  });

  it("renders each tour title", () => {
    render(<SimilarTours tours={mockTours} />);
    expect(screen.getByText("7 Days Cappadocia & Fairy Chimneys")).toBeInTheDocument();
    expect(screen.getByText("5 Days Pamukkale & Hierapolis")).toBeInTheDocument();
  });

  it("renders tour cards as non-navigating elements (in construction)", () => {
    render(<SimilarTours tours={mockTours} />);
    expect(screen.queryAllByTestId("next-link")).toHaveLength(0);
    expect(screen.getByText("7 Days Cappadocia & Fairy Chimneys")).toBeInTheDocument();
    expect(screen.getByText("5 Days Pamukkale & Hierapolis")).toBeInTheDocument();
  });

  it("shows the discounted price for each tour", () => {
    render(<SimilarTours tours={mockTours} />);
    expect(screen.getByText("$890")).toBeInTheDocument();
    expect(screen.getByText("$620")).toBeInTheDocument();
  });

  it("shows the original crossed-out price for each tour", () => {
    render(<SimilarTours tours={mockTours} />);
    expect(screen.getByText("$1,100")).toBeInTheDocument();
    expect(screen.getByText("$800")).toBeInTheDocument();
  });

  it("calculates and renders discount badges correctly", () => {
    render(<SimilarTours tours={mockTours} />);
    // (1100-890)/1100 = 19.09% → rounds to 19
    expect(screen.getByText("-19%")).toBeInTheDocument();
    // (800-620)/800 = 22.5% → rounds to 23
    expect(screen.getByText("-23%")).toBeInTheDocument();
  });

  it("renders duration for each tour", () => {
    render(<SimilarTours tours={mockTours} />);
    expect(screen.getByText("7 Days")).toBeInTheDocument();
    expect(screen.getByText("5 Days")).toBeInTheDocument();
  });

  it("renders no tour cards when tours array is empty", () => {
    render(<SimilarTours tours={[]} />);
    expect(screen.queryByText("7 Days Cappadocia & Fairy Chimneys")).not.toBeInTheDocument();
  });
});
