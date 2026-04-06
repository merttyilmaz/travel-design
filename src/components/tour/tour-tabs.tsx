"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Itinerary } from "./itinerary";
import { Availability } from "./availability";
import { Reviews } from "./reviews";

interface TourTabsProps {
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

const tabItems = (reviewsCount: number) => [
  { value: "overview", label: "Overview" },
  { value: "highlights", label: "Highlights" },
  { value: "itinerary", label: "Itinerary" },
  { value: "includes", label: "Includes" },
  { value: "availability", label: "Availability" },
  { value: "reviews", label: `Reviews (${reviewsCount})` },
];

export function TourTabs({ tour }: TourTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    document.getElementById("tour-tabs-card")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // No overflow-hidden — would break sticky positioning of the tab header
    <div id="tour-tabs-card" className="bg-white rounded-2xl border border-gray-100 shadow-sm scroll-mt-20">
      <Tabs value={activeTab} onValueChange={handleTabChange}>

        {/* Sticky tab header — inside the card, inherits top radius */}
        <div className="sticky top-16 z-40 bg-white border-b border-gray-100 rounded-t-2xl">
          <div className="overflow-x-auto scrollbar-hide px-4 py-2">
            <TabsList className="flex w-full min-w-max sm:min-w-0 bg-gray-100 rounded-lg p-1 !h-10 gap-1">
              {tabItems(tour.reviewsCount).map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
                    flex-1 h-8 px-4 rounded-md text-sm font-semibold whitespace-nowrap transition-all duration-150
                    text-gray-600 bg-transparent border-0 shadow-none
                    hover:bg-transparent hover:text-violet-500
                    data-active:bg-violet-600 data-active:text-white data-active:shadow-sm
                    data-active:hover:bg-violet-600 data-active:hover:text-white
                  "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6">

          <TabsContent value="overview" className="mt-0 space-y-5 focus-visible:ring-0 outline-none">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {tour.description}
            </p>
            <div className="flex flex-wrap gap-2">
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
          </TabsContent>

          <TabsContent value="highlights" className="mt-0 focus-visible:ring-0 outline-none">
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
          </TabsContent>

          <TabsContent value="itinerary" className="mt-0 focus-visible:ring-0 outline-none">
            <Itinerary days={tour.itinerary} />
          </TabsContent>

          <TabsContent value="includes" className="mt-0 focus-visible:ring-0 outline-none">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  What&apos;s Included
                </h3>
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
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Not Included
                </h3>
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
          </TabsContent>

          <TabsContent value="availability" className="mt-0 focus-visible:ring-0 outline-none">
            <Availability departures={tour.availability} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0 focus-visible:ring-0 outline-none">
            <Reviews
              reviews={tour.reviews}
              rating={tour.rating}
              reviewsCount={tour.reviewsCount}
            />
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
