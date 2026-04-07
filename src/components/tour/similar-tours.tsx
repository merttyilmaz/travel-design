import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ArrowRight } from "lucide-react";

interface SimilarTour {
  slug: string;
  title: string;
  duration: number;
  price: number;
  originalPrice: number;
  image: string;
}

interface SimilarToursProps {
  tours: SimilarTour[];
}

export function SimilarTours({ tours }: SimilarToursProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
          <p className="text-sm text-gray-500 mt-0.5">Explore more curated tours</p>
        </div>
        <span
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 cursor-not-allowed"
          title="Coming soon"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tours.map((tour) => {
          const discount = Math.round(
            ((tour.originalPrice - tour.price) / tour.originalPrice) * 100
          );
          return (
            <div
              key={tour.slug}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-violet-500 text-white border-0 text-xs font-bold shadow-sm">
                    -{discount}%
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                  {tour.title}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tour.duration} Days</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-gray-700">5.0</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-gray-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-gray-900">
                      ${tour.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${tour.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-violet-600">/ person</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
