import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

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
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("Footer", () => {
  it("renders all nav section headings", () => {
    render(<Footer />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Travelers")).toBeInTheDocument();
    expect(screen.getByText("Tour Operators")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("renders internal nav items as non-navigating elements (in construction)", () => {
    render(<Footer />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("FAQs")).toBeInTheDocument();
    // No next-link wrappers for internal nav items
    const links = screen.queryAllByTestId("next-link");
    // Only the logo "/" link remains — no nav page links
    const internalHrefs = links.map((l) => l.getAttribute("href")).filter((h) => h?.startsWith("/") && h !== "/");
    expect(internalHrefs).toHaveLength(0);
  });

  it("renders social links as plain anchors with target=_blank", () => {
    render(<Footer />);
    const externalAnchors = document
      .querySelectorAll('a[target="_blank"]');
    expect(externalAnchors.length).toBeGreaterThan(0);
    externalAnchors.forEach((a) => {
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  it("social link hrefs point to external domains", () => {
    render(<Footer />);
    const externalAnchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')
    );
    externalAnchors.forEach((a) => {
      expect(a.href).toMatch(/^https?:\/\//);
    });
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/HarmoniTravel/)).toBeInTheDocument();
  });
});
