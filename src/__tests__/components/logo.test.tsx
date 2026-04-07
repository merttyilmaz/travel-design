import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/layout/logo";

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
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

describe("Logo", () => {
  it("renders the HarmoniTravel image", () => {
    render(<Logo />);
    expect(screen.getByAltText("HarmoniTravel")).toBeInTheDocument();
  });

  it("links to the home page", () => {
    render(<Logo />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies no extra image class in light mode (default)", () => {
    render(<Logo />);
    const img = screen.getByAltText("HarmoniTravel");
    expect(img).not.toHaveClass("brightness-0");
  });

  it("applies dark invert class when dark prop is true", () => {
    render(<Logo dark />);
    const img = screen.getByAltText("HarmoniTravel");
    expect(img).toHaveClass("brightness-0", "invert");
  });
});
