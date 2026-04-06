import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsProps {
  reviews: Review[];
  rating: number;
  reviewsCount: number;
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const cls = size === "sm" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function Reviews({ reviews, rating, reviewsCount }: ReviewsProps) {
  return (
    <div className="space-y-7">

      {/* Summary */}
      <div className="flex items-center gap-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl">
        <div className="text-center shrink-0">
          <p className="text-5xl font-bold text-gray-900 leading-none">{rating}.0</p>
          <Stars rating={rating} />
          <p className="text-xs text-gray-500 mt-2">{reviewsCount} {reviewsCount === 1 ? "review" : "reviews"}</p>
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((label, i) => (
            <div key={label} className="flex items-center gap-3 text-xs">
              <span className="text-gray-500 w-16 text-right shrink-0">{label}</span>
              <div className="flex-1 bg-amber-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${i === 0 ? 100 : 0}%` }}
                />
              </div>
              <span className="text-gray-500 w-4 shrink-0">
                {i === 0 ? reviewsCount : 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-100 rounded-2xl p-6 bg-white space-y-4 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-violet-100 text-violet-700 font-bold text-sm">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
