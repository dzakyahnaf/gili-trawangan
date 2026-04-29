export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  duration: string;
  price: number;
  priceChild?: number;
  minPax: number;
  maxPax: number;
  programs: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  category: "honeymoon" | "family" | "group" | "daytrip" | "diving" | string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Activity {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  duration: string;
  price: number;
  minPax: number;
  maxPax: number;
  schedule: string[];
  meetingPoint: string;
  includes: string[];
  excludes: string[];
  category: "snorkeling" | "diving" | "cruise" | "watersport" | string;
  isActive: boolean;
}

export interface FastBoatSchedule {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
}

export interface FastBoat {
  id: string;
  name: string;
  logo?: string;
  description: string;
  capacity: number;
  speed: string;
  facilities: string[];
  schedules: FastBoatSchedule[];
  isActive: boolean;
}

export interface Speedboat {
  id: string;
  name: string;
  description: string;
  images: string[];
  capacity: number;
  duration: string;
  routes: string[];
  price: number;
  priceUnit: string;
  facilities: string[];
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  caption?: string;
  category: string;
}
