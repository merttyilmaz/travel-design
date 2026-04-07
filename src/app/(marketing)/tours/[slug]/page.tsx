import { MapPin, ChevronRight } from "lucide-react";
import { RatingButton } from "@/components/tour/rating-button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TourGallery } from "@/components/tour/tour-gallery";
import { BookingCard } from "@/components/tour/booking-card";
import { TourMeta } from "@/components/tour/tour-meta";
import { TourContent } from "@/components/tour/tour-content";
import { SimilarTours } from "@/components/tour/similar-tours";
import { MobileBookingBar } from "@/components/tour/mobile-booking-bar";
import { tour, similarTours } from "@/lib/mock-data";

export default function TourDetailPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col">
      <Header />

      {/* Title banner — full width, white */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>Tours</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600 font-medium truncate max-w-xs">
              {tour.title}
            </span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {tour.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-violet-500" />
              <span>{tour.location}</span>
            </div>
            <RatingButton rating={tour.rating} reviewsCount={tour.reviewsCount} />
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8 space-y-8">
          {/* Hero: gallery + booking card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            <TourGallery images={tour.images} title={tour.title} />
            <div className="hidden lg:block lg:sticky lg:top-24">
              <BookingCard
                price={tour.price}
                originalPrice={tour.originalPrice}
                rating={tour.rating}
                reviewsCount={tour.reviewsCount}
              />
            </div>
          </div>

          {/* Meta info row */}
          <TourMeta
            duration={tour.duration}
            maxGroupSize={tour.maxGroupSize}
            departureType={tour.departureType}
            guidingMethod={tour.guidingMethod}
            language={tour.language}
            ageRange={tour.ageRange}
          />

          {/* Content sections */}
          <TourContent tour={tour} />

          {/* Similar tours — outside tabs */}
          <SimilarTours tours={similarTours} />
        </div>
      </main>

      <Footer />

      <MobileBookingBar
        price={tour.price}
        originalPrice={tour.originalPrice}
        rating={tour.rating}
        reviewsCount={tour.reviewsCount}
      />
    </div>
  );
}
