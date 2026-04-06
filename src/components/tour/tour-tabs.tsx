"use client";

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
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <Tabs defaultValue="overview">
        {/* Tab bar */}
        <div className="px-4 pt-5 pb-0">
          <TabsList className="flex w-full bg-gray-100 rounded-lg p-1 h-auto gap-1">
            {tabItems(tour.reviewsCount).map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  flex-1 py-3 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-150
                  text-gray-500 bg-transparent border-0 shadow-none
                  hover:bg-muted/60 hover:text-gray-800
                  data-[state=active]:bg-white data-[state=active]:text-sky-600
                  data-[state=active]:font-semibold data-[state=active]:shadow-sm
                "
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab content */}
        <div className="px-6 py-7">

          {/* Overview */}
          <TabsContent value="overview" className="mt-0 space-y-5 focus-visible:ring-0 outline-none">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {tour.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-sky-200 text-sky-700 bg-sky-50 font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </TabsContent>

          {/* Highlights */}
          <TabsContent value="highlights" className="mt-0 focus-visible:ring-0 outline-none">
            <ul className="grid sm:grid-cols-2 gap-3">
              {tour.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-sky-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Itinerary */}
          <TabsContent value="itinerary" className="mt-0 focus-visible:ring-0 outline-none">
            <Itinerary days={tour.itinerary} />
          </TabsContent>

          {/* Includes */}
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

          {/* Availability */}
          <TabsContent value="availability" className="mt-0 focus-visible:ring-0 outline-none">
            <Availability departures={tour.availability} />
          </TabsContent>

          {/* Reviews */}
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
