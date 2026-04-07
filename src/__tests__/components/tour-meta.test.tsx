import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TourMeta } from "@/components/tour/tour-meta";

const defaultProps = {
  duration: 10,
  maxGroupSize: 40,
  departureType: "Regular Tour",
  guidingMethod: "Professional Guide",
  language: "English",
  ageRange: "11 - 99",
};

describe("TourMeta", () => {
  it("renders without crashing", () => {
    render(<TourMeta {...defaultProps} />);
  });

  it("renders the duration with 'Days' suffix", () => {
    render(<TourMeta {...defaultProps} />);
    expect(screen.getByText("10 Days")).toBeInTheDocument();
  });

  it("renders the max group size with 'Max' prefix", () => {
    render(<TourMeta {...defaultProps} />);
    expect(screen.getByText("Max 40")).toBeInTheDocument();
  });

  it("renders all six meta labels", () => {
    render(<TourMeta {...defaultProps} />);
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("Group Size")).toBeInTheDocument();
    expect(screen.getByText("Tour Type")).toBeInTheDocument();
    expect(screen.getByText("Guiding")).toBeInTheDocument();
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Ages")).toBeInTheDocument();
  });

  it("renders all six meta values", () => {
    render(<TourMeta {...defaultProps} />);
    expect(screen.getByText("Regular Tour")).toBeInTheDocument();
    expect(screen.getByText("Professional Guide")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("11 - 99")).toBeInTheDocument();
  });

  it("reflects custom prop values", () => {
    render(
      <TourMeta
        duration={7}
        maxGroupSize={12}
        departureType="Private Tour"
        guidingMethod="Self-Guided"
        language="French"
        ageRange="18 - 65"
      />
    );
    expect(screen.getByText("7 Days")).toBeInTheDocument();
    expect(screen.getByText("Max 12")).toBeInTheDocument();
    expect(screen.getByText("Private Tour")).toBeInTheDocument();
    expect(screen.getByText("Self-Guided")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.getByText("18 - 65")).toBeInTheDocument();
  });
});
