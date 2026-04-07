"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Zap,
  MessageCircle,
  Star,
  Users,
  CalendarCheck,
} from "lucide-react";

interface BookingCardProps {
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
}

function scrollToAvailability() {
  const el = document.getElementById("availability");
  if (!el) return;
  const offset = 128;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function BookingCard({
  price,
  originalPrice,
  rating,
  reviewsCount,
}: BookingCardProps) {
  const [travelers, setTravelers] = useState(2);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const total = price * travelers;
  const saved = (originalPrice - price) * travelers;

  return (
    <div className="bg-white rounded-xl border-2 shadow-md p-5 space-y-5" style={{ borderColor: "#b796e0" }}>

      {/* Price */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Starting from</p>
        <div className="flex items-baseline gap-2.5">
          <span className="text-4xl font-semibold text-gray-900 tracking-tight">
            ${price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">per person · taxes included</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs font-semibold text-gray-700 ml-1">{rating}.0</span>
          <span className="text-xs text-gray-500">· {reviewsCount} reviews</span>
        </div>
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
          <span>${price.toLocaleString()} × {travelers} {travelers === 1 ? "person" : "people"}</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-700">
          <span>You save</span>
          <span>−${saved.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-baseline pt-0.5">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-semibold text-gray-900">${total.toLocaleString()}</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-2">
        <Button onClick={scrollToAvailability} className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 font-medium rounded-lg text-base transition-colors">
          <CalendarCheck className="w-4 h-4 mr-2" />
          Check Availability
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 h-10 font-medium rounded-lg text-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Ask a Question
        </Button>
      </div>

      {/* Trust signals */}
      <div className="space-y-2 pt-1">
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-500" />
          <span>Free cancellation up to 48h before departure</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
          <span>Early bird discount — only a few spots left</span>
        </div>
      </div>

    </div>
  );
}
