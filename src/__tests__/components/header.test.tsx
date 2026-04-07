import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";

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
    render(<Header />);
    expect(screen.getByAltText("HarmoniTravel")).toBeInTheDocument();
  });

  it("renders desktop nav items", () => {
    render(<Header />);
    expect(screen.getAllByText("Destinations").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Activities").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Deals").length).toBeGreaterThan(0);
  });

  it("renders Sign In and Register buttons", () => {
    render(<Header />);
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Register").length).toBeGreaterThan(0);
  });

  it("hides the mobile menu by default", () => {
    render(<Header />);
    // When closed the hamburger menu icon (Menu) is visible but mobile links are not in a separate visible block
    // The mobile menu items only appear after click; there should only be one visible block before click
    const destinationLinks = screen.getAllByText("Destinations");
    // At least the desktop nav link exists; mobile menu should be hidden
    expect(destinationLinks.length).toBe(1);
  });

  it("opens the mobile menu when the menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(menuButton);
    // After opening, both desktop and mobile nav links render
    expect(screen.getAllByText("Destinations")).toHaveLength(2);
  });

  it("closes the mobile menu when the button is clicked again", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(menuButton);
    await user.click(menuButton);
    expect(screen.getAllByText("Destinations")).toHaveLength(1);
  });
});
