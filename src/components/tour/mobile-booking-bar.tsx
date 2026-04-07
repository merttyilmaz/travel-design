"use client";

import { useState } from "react";
import { useLayout } from "@/components/providers/layout-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarCheck,
  MessageCircle,
  ShieldCheck,
  Users,
  X,
  Zap,
  Star,
} from "lucide-react";

interface MobileBookingBarProps {
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
}

export function MobileBookingBar({
  price,
  originalPrice,
  rating,
  reviewsCount,
}: MobileBookingBarProps) {
  const { bookingOpen: open, openBooking, closeBooking } = useLayout();
  const [travelers, setTravelers] = useState(2);

  function scrollToReviews() {
    closeBooking();
    const el = document.getElementById("reviews");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function scrollToAvailability() {
    closeBooking();
    const el = document.getElementById("availability");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const total = price * travelers;
  const saved = (originalPrice - price) * travelers;

  return (
    <>
      {/* Sticky bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          </div>
          <p className="text-xs text-gray-500">per person · taxes included</p>
        </div>
        <Button
          onClick={() => openBooking()}
          className="shrink-0 bg-violet-600 hover:bg-violet-700 text-white h-11 px-5 font-semibold rounded-xl text-sm"
        >
          <CalendarCheck className="w-4 h-4 mr-1.5" />
          Book Now
        </Button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => closeBooking()}
        />
      )}

      {/* Slide-up sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Close button */}
        <button
          onClick={() => closeBooking()}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {open && <div className="px-5 pb-8 pt-2 space-y-4 overflow-y-auto max-h-[85vh]">
          {/* Price */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting from</p>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-bold text-gray-900">
                ${price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            </div>
            <button
              onClick={scrollToReviews}
              className="flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Scroll to reviews"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-xs font-semibold text-gray-700 ml-1">
                {rating}.0
              </span>
              <span className="text-xs text-gray-500">· {reviewsCount} reviews</span>
            </button>
          </div>

          <Separator />

          {/* Travelers */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5" />
              <span>Travelers</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">
                {travelers} {travelers === 1 ? "person" : "people"}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 text-lg leading-none transition-colors"
                >
                  −
                </button>
                <span className="text-sm font-semibold text-gray-900 w-4 text-center tabular-nums">
                  {travelers}
                </span>
                <button
                  onClick={() => setTravelers(Math.min(40, travelers + 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 text-lg leading-none transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>
                ${price.toLocaleString()} × {travelers}{" "}
                {travelers === 1 ? "person" : "people"}
              </span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>You save</span>
              <span>−${saved.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-baseline pt-0.5">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-2">
            <Button onClick={scrollToAvailability} className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 font-semibold rounded-xl text-base">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Check Availability
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 h-10 font-medium rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask a Question
            </Button>
          </div>

          {/* Trust signals */}
          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>Free cancellation up to 48h before departure</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
              <span>Early bird discount — only a few spots left</span>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
}
