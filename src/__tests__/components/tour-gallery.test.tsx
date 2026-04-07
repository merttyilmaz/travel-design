import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TourGallery } from "@/components/tour/tour-gallery";

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

vi.mock("yet-another-react-lightbox", () => ({
  default: ({ open, close }: { open: boolean; close: () => void }) =>
    open ? (
      <div data-testid="lightbox">
        <button onClick={close}>Close lightbox</button>
      </div>
    ) : null,
}));

vi.mock("yet-another-react-lightbox/plugins/zoom", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/thumbnails", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/fullscreen", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/slideshow", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/download", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/share", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/captions", () => ({ default: {} }));
vi.mock("yet-another-react-lightbox/plugins/counter", () => ({ default: {} }));

vi.mock("yet-another-react-lightbox/styles.css", () => ({}));
vi.mock("yet-another-react-lightbox/plugins/thumbnails.css", () => ({}));
vi.mock("yet-another-react-lightbox/plugins/captions.css", () => ({}));
vi.mock("yet-another-react-lightbox/plugins/counter.css", () => ({}));

const images = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];

describe("TourGallery", () => {
  it("renders without crashing", () => {
    render(<TourGallery images={images} title="My Tour" />);
  });

  it("shows the counter starting at '1 / N'", () => {
    render(<TourGallery images={images} title="My Tour" />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("advances to the next image when Next is clicked", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /next image/i }));
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("goes back to the previous image when Prev is clicked", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /next image/i }));
    await user.click(screen.getByRole("button", { name: /previous image/i }));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("wraps from last to first when Next is clicked on the last image", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /next image/i }));
    await user.click(screen.getByRole("button", { name: /next image/i }));
    await user.click(screen.getByRole("button", { name: /next image/i }));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("wraps from first to last when Prev is clicked on the first image", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /previous image/i }));
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("jumps directly to an image when a dot indicator is clicked", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /go to image 3/i }));
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("renders thumbnail images for all provided images", () => {
    render(<TourGallery images={images} title="My Tour" />);
    expect(screen.getByAltText("Thumbnail 1")).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail 2")).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail 3")).toBeInTheDocument();
  });

  it("renders the main image alt with the correct photo number", () => {
    render(<TourGallery images={images} title="My Tour" />);
    expect(screen.getByAltText("My Tour — photo 1")).toBeInTheDocument();
  });

  it("updates the main image alt when navigating", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /next image/i }));
    expect(screen.getByAltText("My Tour — photo 2")).toBeInTheDocument();
  });

  it("lightbox is hidden initially", () => {
    render(<TourGallery images={images} title="My Tour" />);
    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });

  it("opens the lightbox when the main image area is clicked", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    const mainImage = screen.getByAltText("My Tour — photo 1");
    await user.click(mainImage);
    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
  });

  it("closes the lightbox when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByAltText("My Tour — photo 1"));
    await user.click(screen.getByRole("button", { name: /close lightbox/i }));
    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });

  it("arrow buttons do not open the lightbox", async () => {
    const user = userEvent.setup();
    render(<TourGallery images={images} title="My Tour" />);
    await user.click(screen.getByRole("button", { name: /next image/i }));
    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });
});
