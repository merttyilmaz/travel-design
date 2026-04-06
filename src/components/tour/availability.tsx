"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ChevronDown, ArrowRight } from "lucide-react";

interface Departure {
  id: string;
  startDate: string;
  endDate: string;
  price: number;
  spotsLeft: number;
}

interface AvailabilityProps {
  departures: Departure[];
}

const months = [
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
];

export function Availability({ departures }: AvailabilityProps) {
  const [selectedMonth, setSelectedMonth] = useState("April 2026");
  const [travelers, setTravelers] = useState(2);

  return (
    <div className="space-y-7">

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sky-200 text-sky-700 bg-sky-50 text-sm font-semibold hover:bg-sky-100 transition-colors">
          <Users className="w-4 h-4" />
          Private Tour
          <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-60" />
        </button>

        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <span className="px-3 py-2.5 text-xs font-semibold text-gray-400 bg-gray-50 border-r border-gray-200 uppercase tracking-wide">
            Travelers
          </span>
          <div className="flex items-center gap-3 px-4 py-2">
            <button
              onClick={() => setTravelers(Math.max(1, travelers - 1))}
              className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-100 text-base font-semibold text-gray-600 flex items-center justify-center transition-colors leading-none"
            >
              −
            </button>
            <span className="text-sm font-bold text-gray-900 w-4 text-center tabular-nums">
              {travelers}
            </span>
            <button
              onClick={() => setTravelers(Math.min(40, travelers + 1))}
              className="w-7 h-7 rounded-full bg-sky-500 hover:bg-sky-600 text-base font-semibold text-white flex items-center justify-center transition-colors leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Month selector */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Select Departure Month
        </p>
        <div className="flex flex-wrap gap-2">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selectedMonth === month
                  ? "bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Departure cards */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Available Departures
        </p>
        {departures.map((dep) => (
          <div
            key={dep.id}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-2xl p-5 bg-white hover:border-sky-200 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
                  <span>{dep.startDate}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  <span>{dep.endDate}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${
                    dep.spotsLeft <= 5
                      ? "border-red-200 text-red-600 bg-red-50"
                      : "border-sky-200 text-sky-600 bg-sky-50"
                  }`}
                >
                  {dep.spotsLeft <= 5 ? "⚡ " : ""}{dep.spotsLeft} spots remaining
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900 leading-tight">
                  ${(dep.price * travelers).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  ${dep.price.toLocaleString()}/person
                </p>
              </div>
              <Button
                size="sm"
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-5 h-10 font-semibold shadow-sm shadow-sky-200 shrink-0"
              >
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
