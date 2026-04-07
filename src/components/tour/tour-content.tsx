"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Itinerary } from "./itinerary";
import { Availability } from "./availability";
import { Reviews } from "./reviews";

interface TourContentProps {
  tour: {
    description: string;
    tags: string[];
    highlights: string[];
    includes: string[];
    excludes: string[];
    itinerary: { day: number; title: string; description: string }[];
    availability: {
      id: string;
      startDate: string;
      endDate: string;
      price: number;
      spotsLeft: number;
    }[];
    reviews: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      date: string;
      text: string;
    }[];
    rating: number;
    reviewsCount: number;
  };
}

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "includes", label: "Included" },
  { id: "availability", label: "Availability" },
  { id: "reviews", label: "Reviews" },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-gray-900 mb-5">{children}</h2>
  );
}

export function TourContent({ tour }: TourContentProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const navRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // IntersectionObserver — mark a section active when it crosses the upper third
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll active pill into view inside the nav bar
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const pill = nav.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (pill) {
      pill.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [activeSection]);

  function scrollTo(id: string) {
    const el = sectionRefs.current[id];
    if (!el) return;
    const offset = 128; // header (64px) + sticky nav (~52px) + gap
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function setRef(id: string) {
    return (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    };
  }

  return (
    <div className="space-y-3">

      {/* ── Sticky anchor nav ── */}
      <div className="sticky top-16 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-[#f8f9fc] pt-2 pb-2">
        <div
          ref={navRef}
          className="overflow-x-auto scrollbar-hide bg-white border border-gray-100 rounded-xl shadow-sm p-1.5"
        >
          <div className="flex min-w-full">
            {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              data-section={id}
              onClick={() => scrollTo(id)}
              className={`flex-1 min-w-max px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap text-center ${
                activeSection === id
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {id === "reviews" ? `${label} (${tour.reviewsCount})` : label}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* ── Overview ── */}
      <div
        ref={setRef("overview")}
        id="overview"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-36"
      >
        <SectionHeading>Overview</SectionHeading>
        <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
          {tour.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {tour.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-violet-200 text-violet-700 bg-violet-50 font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* ── Highlights ── */}
      <div
        ref={setRef("highlights")}
        id="highlights"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-36"
      >
        <SectionHeading>Highlights</SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-3">
          {tour.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-violet-600" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Itinerary ── */}
      <div
        ref={setRef("itinerary")}
        id="itinerary"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-36"
      >
        <SectionHeading>Itinerary</SectionHeading>
        <Itinerary days={tour.itinerary} />
      </div>

      {/* ── Included / Not included ── */}
      <div
        ref={setRef("includes")}
        id="includes"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-36"
      >
        <SectionHeading>What&apos;s Included</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Included
            </p>
            <ul className="space-y-3">
              {tour.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Not Included
            </p>
            <ul className="space-y-3">
              {tour.excludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-500" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Availability ── */}
      <div
        ref={setRef("availability")}
        id="availability"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-36"
      >
        <SectionHeading>Availability</SectionHeading>
        <Availability departures={tour.availability} />
      </div>

      {/* ── Reviews ── */}
      <div
        ref={setRef("reviews")}
        id="reviews"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-36"
      >
        <SectionHeading>Reviews</SectionHeading>
        <Reviews
          reviews={tour.reviews}
          rating={tour.rating}
          reviewsCount={tour.reviewsCount}
        />
      </div>

    </div>
  );
}
