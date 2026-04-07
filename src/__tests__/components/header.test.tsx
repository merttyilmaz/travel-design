import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";
import { LayoutProvider } from "@/components/providers/layout-provider";

const renderWithProvider = () => render(<LayoutProvider><Header /></LayoutProvider>);

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
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("Header", () => {
  it("renders the logo", () => {
    renderWithProvider();
    expect(screen.getByAltText("HarmoniTravel")).toBeInTheDocument();
  });

  it("renders desktop nav items", () => {
    renderWithProvider();
    expect(screen.getAllByText("Destinations").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Activities").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Deals").length).toBeGreaterThan(0);
  });

  it("renders Sign In and Register buttons", () => {
    renderWithProvider();
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Register").length).toBeGreaterThan(0);
  });

  it("renders the mobile menu in the DOM by default (visually hidden)", () => {
    renderWithProvider();
    // Dropdown is always mounted — desktop nav + mobile dropdown = 2 instances
    expect(screen.getAllByText("Destinations")).toHaveLength(2);
  });

  it("mobile menu has pointer-events-none when closed", () => {
    const { container } = renderWithProvider();
    const dropdown = container.querySelector("[class*='origin-top']");
    expect(dropdown?.className).toMatch(/pointer-events-none/);
  });

  it("removes pointer-events-none when the menu is opened", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider();
    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    const dropdown = container.querySelector("[class*='origin-top']");
    expect(dropdown?.className).toMatch(/pointer-events-auto/);
  });

  it("closes the mobile menu when the button is clicked again", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider();
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(menuButton);
    await user.click(menuButton);
    const dropdown = container.querySelector("[class*='origin-top']");
    expect(dropdown?.className).toMatch(/pointer-events-none/);
  });

  describe("mobile search", () => {
    it("renders the search icon button on mobile", () => {
      renderWithProvider();
      expect(screen.getByRole("button", { name: /open search/i })).toBeInTheDocument();
    });

    it("search drawer is not visible initially", () => {
      renderWithProvider();
      expect(screen.queryByPlaceholderText(/where do you want to go/i)).not.toBeInTheDocument();
    });

    it("opens the search drawer when the search icon is clicked", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /open search/i }));
      expect(screen.getByPlaceholderText(/where do you want to go/i)).toBeInTheDocument();
    });

    it("shows popular destination suggestions in the drawer", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /open search/i }));
      expect(screen.getByRole("button", { name: "Istanbul" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cappadocia" })).toBeInTheDocument();
    });

    it("closes the search drawer when the close button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProvider();
      await user.click(screen.getByRole("button", { name: /open search/i }));
      await user.click(screen.getByRole("button", { name: /close search/i }));
      expect(screen.queryByPlaceholderText(/where do you want to go/i)).not.toBeInTheDocument();
    });
  });
});
