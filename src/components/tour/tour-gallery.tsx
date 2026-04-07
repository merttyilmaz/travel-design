"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface TourGalleryProps {
  images: string[];
  title: string;
}

export function TourGallery({ images, title }: TourGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const slides = images.map((src, i) => ({
    src,
    title: `${title} — photo ${i + 1}`,
    download: src,
    share: { url: src, title: `${title} — photo ${i + 1}` },
  }));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10] group shadow-sm cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${title} — photo ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-500"
          priority={activeIndex === 0}
          loading={activeIndex === 0 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, 65vw"
        />

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Arrow controls */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 text-gray-800" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 text-gray-800" />
        </button>

        {/* Photo counter */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 text-white text-xs font-medium px-2.5 py-1.5 rounded-full backdrop-blur-sm">
          <Images className="w-3.5 h-3.5" />
          <span>{activeIndex + 1} / {images.length}</span>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
              className={`rounded-full transition-all duration-200 ${
                i === activeIndex
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2.5">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 transition-all duration-200 ${
              i === activeIndex
                ? "ring-2 ring-violet-500 ring-offset-2 opacity-100"
                : "opacity-60 hover:opacity-90 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="140px"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={activeIndex}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        plugins={[Zoom, Thumbnails, Fullscreen, Slideshow, Download, Share, Captions, Counter]}
        zoom={{ maxZoomPixelRatio: 4, zoomInMultiplier: 2 }}
        thumbnails={{ position: "bottom", width: 80, height: 60, gap: 8 }}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      />
    </div>
  );
}
