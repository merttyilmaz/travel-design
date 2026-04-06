export const tour = {
  slug: "10-days-ecotourism-turkey",
  title: "10 Days Ecotourism Tour Turkey",
  location: "Starts from Istanbul",
  price: 1272,
  originalPrice: 1630,
  rating: 5,
  reviewsCount: 2,
  duration: 10,
  maxGroupSize: 40,
  departureType: "Regular Tour",
  guidingMethod: "Professional Guide",
  language: "English",
  ageRange: "11 - 99",
  images: [
    "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&q=80",
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80",
    "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
  ],
  description:
    "Experience the best of Turkey's natural wonders and historical treasures on this 10-day ecotourism adventure. From the iconic streets of Istanbul to the pristine Seven Lakes, this tour blends cultural immersion with breathtaking nature.",
  tags: ["Ecotourism", "Nature", "Culture", "UNESCO", "Caves", "Waterfalls"],
  highlights: [
    "Istanbul historical sites & Bosphorus Cruise",
    "Seven Lakes & Abant Nature Park",
    "Safranbolu – UNESCO World Heritage town",
    "Ilgarini Cave exploration",
    "Ilica Waterfall & swimming",
    "Amasra medieval castle & Black Sea coast",
    "Kastamonu old city walk",
    "Local farm-to-table meals",
    "Fully guided with professional naturalist",
    "Small group experience (max 40 people)",
  ],
  includes: [
    "10 nights hotel accommodation (4-star)",
    "Daily breakfast and dinner",
    "All transportation in air-conditioned vehicle",
    "Professional English-speaking guide",
    "All entrance fees mentioned in itinerary",
    "Bosphorus cruise ticket",
    "Airport transfer (arrival & departure)",
  ],
  excludes: [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Lunches (unless specified)",
    "Optional activities",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Istanbul",
      description:
        "Arrive at Istanbul Airport where our guide will meet you. Transfer to your hotel in the historic Sultanahmet district. Evening welcome dinner and briefing about the tour.",
    },
    {
      day: 2,
      title: "Istanbul City Tour",
      description:
        "Full-day guided tour of Istanbul's iconic landmarks: Blue Mosque, Hagia Sophia, Topkapi Palace, Grand Bazaar, and an evening Bosphorus cruise to see the city lights.",
    },
    {
      day: 3,
      title: "Istanbul → Seven Lakes (Yedigoller)",
      description:
        "Morning departure to Yedigoller (Seven Lakes) National Park. Scenic hike through the forest, photography of the crystal-clear interconnected lakes. Overnight in Bolu.",
    },
    {
      day: 4,
      title: "Abant Lake & Safranbolu",
      description:
        "Morning visit to Abant Lake for a peaceful walk. Afternoon drive to Safranbolu, a UNESCO World Heritage Site. Evening walk through the perfectly preserved Ottoman town.",
    },
    {
      day: 5,
      title: "Safranbolu → Kastamonu",
      description:
        "Morning exploring Safranbolu's cobblestone streets and traditional houses. Afternoon drive to Kastamonu old city. Visit the 14th-century Kastamonu Castle.",
    },
    {
      day: 6,
      title: "Ilgarini Cave & Amasra",
      description:
        "Morning exploration of Ilgarini Cave, one of Turkey's longest and most dramatic caves. Afternoon drive to Amasra, a charming Black Sea town with a medieval castle.",
    },
    {
      day: 7,
      title: "Black Sea Coast",
      description:
        "Full day along the scenic Black Sea coast. Visit Ilica Waterfall and swim in the natural pools. Local lunch at a family-run restaurant with fresh Black Sea fish.",
    },
    {
      day: 8,
      title: "Yenice Forest",
      description:
        "Trek through Yenice Forest, one of Turkey's most biodiverse ecosystems. Birdwatching and nature photography. Evening bonfire at eco-lodge.",
    },
    {
      day: 9,
      title: "Return to Istanbul",
      description:
        "Scenic drive back to Istanbul. Free afternoon for last-minute shopping at the Grand Bazaar or Spice Market. Farewell dinner at a rooftop restaurant.",
    },
    {
      day: 10,
      title: "Departure",
      description:
        "Breakfast at hotel. Transfer to Istanbul Airport for your departure flight. Safe travels!",
    },
  ],
  availability: [
    {
      id: "apr-18",
      startDate: "Apr 18, 2026",
      endDate: "Apr 27, 2026",
      price: 1272,
      spotsLeft: 12,
    },
    {
      id: "may-02",
      startDate: "May 02, 2026",
      endDate: "May 11, 2026",
      price: 1272,
      spotsLeft: 8,
    },
    {
      id: "may-16",
      startDate: "May 16, 2026",
      endDate: "May 25, 2026",
      price: 1350,
      spotsLeft: 20,
    },
    {
      id: "jun-06",
      startDate: "Jun 06, 2026",
      endDate: "Jun 15, 2026",
      price: 1350,
      spotsLeft: 15,
    },
  ],
  reviews: [
    {
      id: "1",
      name: "Sarah Mitchell",
      avatar: "SM",
      rating: 5,
      date: "March 2026",
      text: "Absolutely incredible experience! The Seven Lakes were breathtaking and our guide was so knowledgeable about Turkish ecology. Safranbolu felt like stepping back in time. Would 100% recommend.",
    },
    {
      id: "2",
      name: "James Okonkwo",
      avatar: "JO",
      rating: 5,
      date: "February 2026",
      text: "The cave visit was the highlight for me – didn't expect it to be so dramatic! Great group size, comfortable hotels, and the food was amazing. Well organized from start to finish.",
    },
  ],
};

export const similarTours = [
  {
    slug: "7-days-cappadocia",
    title: "7 Days Cappadocia & Fairy Chimneys",
    duration: 7,
    price: 890,
    originalPrice: 1100,
    image:
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=600&q=80",
  },
  {
    slug: "12-days-aegean-coast",
    title: "12 Days Turkish Aegean Coast",
    duration: 12,
    price: 1580,
    originalPrice: 1900,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    slug: "5-days-pamukkale",
    title: "5 Days Pamukkale & Hierapolis",
    duration: 5,
    price: 620,
    originalPrice: 780,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
  },
  {
    slug: "8-days-black-sea",
    title: "8 Days Black Sea Highlands",
    duration: 8,
    price: 1050,
    originalPrice: 1300,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
];
