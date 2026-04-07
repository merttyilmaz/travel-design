"use client";

import { Star } from "lucide-react";

interface RatingButtonProps {
  rating: number;
  reviewsCount: number;
}

function scrollToReviews() {
  const el = document.getElementById("reviews");
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 128;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function RatingButton({ rating, reviewsCount }: RatingButtonProps) {
  return (
    <button
      onClick={scrollToReviews}
      className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
      aria-label={`${rating} out of 5 stars · ${reviewsCount} reviews — scroll to reviews`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="text-sm font-semibold text-gray-800 ml-0.5">{rating}.0</span>
      <span className="text-sm text-gray-400">· {reviewsCount} reviews</span>
    </button>
  );
}
