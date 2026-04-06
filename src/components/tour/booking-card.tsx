"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Zap,
  MessageCircle,
  Star,
  Users,
  CalendarCheck,
  TrendingDown,
} from "lucide-react";

interface BookingCardProps {
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">

      {/* Card header — colored band */}
      <div className="bg-gradient-to-br from-sky-500 to-sky-600 px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sky-100 text-xs font-medium mb-1">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white tracking-tight">
                ${price.toLocaleString()}
              </span>
              <span className="text-sky-200 text-base line-through">
                ${originalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-sky-100 text-xs mt-1">per person · taxes included</p>
          </div>
          <Badge className="bg-white/20 text-white border-0 text-sm font-bold px-2.5 py-1 backdrop-blur-sm shrink-0">
            -{discount}%
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? "fill-amber-400 text-amber-400" : "fill-white/30 text-white/30"
              }`}
            />
          ))}
          <span className="text-white text-xs font-semibold ml-0.5">{rating}.0</span>
          <span className="text-sky-200 text-xs">({reviewsCount} reviews)</span>
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">

        {/* Travelers counter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Travelers
          </label>
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">Guests</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-7 h-7 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-base transition-colors leading-none"
              >
                −
              </button>
              <span className="text-base font-bold text-gray-900 w-5 text-center tabular-nums">
                {travelers}
              </span>
              <button
                onClick={() => setTravelers(Math.min(40, travelers + 1))}
                className="w-7 h-7 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white font-semibold text-base transition-colors leading-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Total breakdown */}
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>${price.toLocaleString()} × {travelers} {travelers === 1 ? "person" : "people"}</span>
            <span className="font-medium">${total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-sky-700 font-medium">
            <span className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              You save
            </span>
            <span>-${saved.toLocaleString()}</span>
          </div>
          <Separator className="bg-sky-200/60" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">${total.toLocaleString()}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2.5">
          <Button className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white h-12 font-semibold rounded-xl text-base shadow-sm shadow-sky-200 transition-all">
            <CalendarCheck className="w-4 h-4 mr-2" />
            Check Availability
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-11 font-medium rounded-xl text-sm gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Ask a Question
          </Button>
        </div>

        {/* Trust signals */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span>Free cancellation up to 48h before departure</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span>Early bird discount — only a few spots left</span>
          </div>
        </div>

      </div>
    </div>
  );
}
