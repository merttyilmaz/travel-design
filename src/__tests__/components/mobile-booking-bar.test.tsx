import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileBookingBar } from "@/components/tour/mobile-booking-bar";
import { LayoutProvider } from "@/components/providers/layout-provider";

const renderWithProvider = (props = defaultProps) =>
  render(<LayoutProvider><MobileBookingBar {...props} /></LayoutProvider>);

const defaultProps = {
  price: 1272,
  originalPrice: 1630,
  rating: 5,
  reviewsCount: 18,
};

describe("MobileBookingBar", () => {
  it("renders without crashing", () => {
    renderWithProvider();
  });

  describe("sticky bar", () => {
    it("shows the price in the sticky bar", () => {
      renderWithProvider();
      // Only the sticky bar renders price when sheet is closed
      expect(screen.getAllByText("$1,272").length).toBeGreaterThan(0);
    });

    it("shows the original price struck out", () => {
      renderWithProvider();
      expect(screen.getAllByText("$1,630").length).toBeGreaterThan(0);
    });

    it("shows the discount badge", () => {
      renderWithProvider();
      expect(screen.getAllByText("-22%").length).toBeGreaterThan(0);
    });

    it("shows the Book Now button", () => {
      renderWithProvider();
      expect(screen.getByRole("button", { name: /book now/i })).toBeInTheDocument();
    });
  });

  describe("sheet", () => {
    it("sheet is not open initially", () => {
      renderWithProvider();
      // Sheet content (Check Availability button) should not be visible before opening
      expect(screen.queryByRole("button", { name: /check availability/i })).not.toBeInTheDocument();
    });

    it("opens the sheet when Book Now is clicked", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      expect(screen.getByRole("button", { name: /check availability/i })).toBeInTheDocument();
    });

    it("closes the sheet when the × button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      await user.click(screen.getByRole("button", { name: /close/i }));
      expect(screen.queryByRole("button", { name: /check availability/i })).not.toBeInTheDocument();
    });

    it("shows the full price breakdown inside the sheet", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      // Total for 2 travelers: 1272 × 2 = 2544
      expect(screen.getAllByText("$2,544").length).toBeGreaterThan(0);
      // Savings: (1630 - 1272) × 2 = 716
      expect(screen.getByText("−$716")).toBeInTheDocument();
    });

    it("increments traveler count inside the sheet", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      await user.click(screen.getByText("+"));
      expect(screen.getByText("3 people")).toBeInTheDocument();
    });

    it("does not go below 1 traveler", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      await user.click(screen.getByText("−"));
      await user.click(screen.getByText("−"));
      expect(screen.getByText("1 person")).toBeInTheDocument();
    });

    it("shows trust signals inside the sheet", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      expect(screen.getByText(/Free cancellation/)).toBeInTheDocument();
    });

    it("shows the Ask a Question button inside the sheet", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /book now/i }));
      expect(screen.getByRole("button", { name: /ask a question/i })).toBeInTheDocument();
    });
  });

  describe("Check Availability scroll", () => {
    beforeEach(() => {
      vi.stubGlobal("scrollTo", vi.fn());
      const mockEl = { getBoundingClientRect: () => ({ top: 1000 }) };
      vi.spyOn(document, "getElementById").mockReturnValue(mockEl as unknown as HTMLElement);
    });

    it("closes the sheet and scrolls to availability when Check Availability is clicked", async () => {
      const user = userEvent.setup();
      renderWithProvider();

      await user.click(screen.getByRole("button", { name: /book now/i }));
      await user.click(screen.getByRole("button", { name: /check availability/i }));

      // Sheet closes — content is removed from DOM
      expect(screen.queryByRole("button", { name: /check availability/i })).not.toBeInTheDocument();
      // Scroll was triggered
      expect(document.getElementById).toHaveBeenCalledWith("availability");
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: "smooth" })
      );
    });
  });
});
