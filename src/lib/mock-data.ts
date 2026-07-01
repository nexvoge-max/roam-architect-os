// Rich mock data powering Trailvia across every screen.
export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  score: number;
  season: string;
  budget: string;
  tagline: string;
  tags: string[];
};

const img = (seed: string, w = 1200, h = 900) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const destinations: Destination[] = [
  { id: "kyoto", name: "Kyoto", country: "Japan", image: img("1493976040374-85c8e12f0c0e"), rating: 4.9, score: 96, season: "Spring · Mar–May", budget: "$$$", tagline: "Cherry blossoms & ancient temples", tags: ["Culture", "Photography", "Food"] },
  { id: "interlaken", name: "Interlaken", country: "Switzerland", image: img("1500534314209-a25ddb2bd429"), rating: 4.8, score: 94, season: "Summer · Jun–Sep", budget: "$$$$", tagline: "Alpine adventure capital", tags: ["Adventure", "Nature", "Luxury"] },
  { id: "bali", name: "Ubud, Bali", country: "Indonesia", image: img("1537996194471-e657df975ab4"), rating: 4.7, score: 92, season: "Apr–Oct", budget: "$$", tagline: "Rice terraces & jungle temples", tags: ["Wellness", "Nature", "Budget"] },
  { id: "santorini", name: "Santorini", country: "Greece", image: img("1613395877344-13d4a8e0d49e"), rating: 4.9, score: 95, season: "May–Sep", budget: "$$$", tagline: "Whitewashed cliffs & sunsets", tags: ["Romantic", "Luxury"] },
  { id: "reykjavik", name: "Reykjavik", country: "Iceland", image: img("1531366936337-7c912a4589a7"), rating: 4.8, score: 93, season: "Sep–Mar", budget: "$$$", tagline: "Northern lights & black beaches", tags: ["Adventure", "Nature"] },
  { id: "marrakech", name: "Marrakech", country: "Morocco", image: img("1489493585363-d69421e0edd3"), rating: 4.6, score: 89, season: "Oct–Apr", budget: "$$", tagline: "Medinas, spices, and riads", tags: ["Culture", "Food"] },
  { id: "patagonia", name: "Patagonia", country: "Chile", image: img("1520962880247-cfaf541c8724"), rating: 4.9, score: 97, season: "Nov–Mar", budget: "$$$$", tagline: "Wild peaks at the world's end", tags: ["Adventure", "Nature"] },
  { id: "lisbon", name: "Lisbon", country: "Portugal", image: img("1555881400-74d7acaacd8b"), rating: 4.7, score: 91, season: "Mar–Oct", budget: "$$", tagline: "Trams, tiles, and Atlantic light", tags: ["Culture", "Food", "Budget"] },
  { id: "tokyo", name: "Tokyo", country: "Japan", image: img("1540959733332-eab4deabeeaf"), rating: 4.9, score: 96, season: "All year", budget: "$$$", tagline: "Neon-lit metropolis of the future", tags: ["Culture", "Food", "Nightlife"] },
  { id: "capetown", name: "Cape Town", country: "South Africa", image: img("1580060839134-75a5edca2e99"), rating: 4.8, score: 93, season: "Oct–Apr", budget: "$$", tagline: "Where oceans and mountains meet", tags: ["Adventure", "Nature"] },
  { id: "dubai", name: "Dubai", country: "UAE", image: img("1512453979798-5ea266f8880c"), rating: 4.7, score: 90, season: "Nov–Mar", budget: "$$$$", tagline: "Skylines, deserts, luxury", tags: ["Luxury", "Shopping"] },
  { id: "queenstown", name: "Queenstown", country: "New Zealand", image: img("1507699622108-4be3abd695ad"), rating: 4.9, score: 95, season: "Dec–Feb, Jun–Aug", budget: "$$$", tagline: "Adventure capital of the world", tags: ["Adventure", "Nature"] },
];

export type Trip = {
  id: string;
  title: string;
  cover: string;
  destinations: string[];
  startDate: string;
  endDate: string;
  days: number;
  budget: number;
  spent: number;
  progress: number;
  status: "upcoming" | "planning" | "in-progress" | "completed";
  companions: number;
  weather: { icon: string; temp: string };
};

export const trips: Trip[] = [
  { id: "japan-2026", title: "Cherry Blossom Japan", cover: img("1522547902298-51566e4fb383"), destinations: ["Tokyo", "Kyoto", "Osaka", "Nara"], startDate: "Apr 03", endDate: "Apr 17", days: 14, budget: 6800, spent: 4120, progress: 78, status: "upcoming", companions: 2, weather: { icon: "🌸", temp: "18°" } },
  { id: "swiss-alps", title: "Swiss Alps Escape", cover: img("1476514525535-07fb3b4ae5f1"), destinations: ["Zurich", "Interlaken", "Zermatt"], startDate: "Jul 12", endDate: "Jul 22", days: 10, budget: 5400, spent: 1800, progress: 45, status: "planning", companions: 4, weather: { icon: "🏔️", temp: "22°" } },
  { id: "bali-retreat", title: "Bali Wellness Retreat", cover: img("1537996194471-e657df975ab4"), destinations: ["Ubud", "Canggu", "Uluwatu"], startDate: "Feb 08", endDate: "Feb 20", days: 12, budget: 2900, spent: 2900, progress: 100, status: "completed", companions: 1, weather: { icon: "☀️", temp: "31°" } },
  { id: "iceland-ring", title: "Iceland Ring Road", cover: img("1531366936337-7c912a4589a7"), destinations: ["Reykjavik", "Vik", "Höfn", "Akureyri"], startDate: "Sep 20", endDate: "Sep 30", days: 10, budget: 4200, spent: 0, progress: 12, status: "planning", companions: 2, weather: { icon: "❄️", temp: "8°" } },
];

export type Hotel = {
  id: string; name: string; city: string; image: string; price: number; rating: number; reviews: number;
  amenities: string[]; aiMatch: number; badge?: string;
};
export const hotels: Hotel[] = [
  { id: "h1", name: "The Ritz-Carlton Kyoto", city: "Kyoto", image: img("1566073771259-6a8506099945"), price: 780, rating: 4.9, reviews: 2431, amenities: ["Spa", "Pool", "Michelin", "River view"], aiMatch: 98, badge: "Perfect match" },
  { id: "h2", name: "Aman Tokyo", city: "Tokyo", image: img("1445019980597-93fa8acb246c"), price: 1240, rating: 4.9, reviews: 1820, amenities: ["Spa", "Onsen", "City view"], aiMatch: 95, badge: "Luxury pick" },
  { id: "h3", name: "Mandapa Ubud", city: "Ubud", image: img("1520250497591-112f2f40a3f4"), price: 640, rating: 4.8, reviews: 1102, amenities: ["Pool villa", "Yoga", "Rice fields"], aiMatch: 93 },
  { id: "h4", name: "Belmond Grand", city: "Interlaken", image: img("1551882547-ff40c63fe5fa"), price: 520, rating: 4.7, reviews: 980, amenities: ["Ski", "Spa", "Alpine view"], aiMatch: 91 },
  { id: "h5", name: "Grand Hotel Tremezzo", city: "Lake Como", image: img("1571003123894-1f0594d2b5d9"), price: 890, rating: 4.9, reviews: 1512, amenities: ["Pool", "Lake view", "Michelin"], aiMatch: 89 },
  { id: "h6", name: "The Silo Cape Town", city: "Cape Town", image: img("1590490360182-c33d57733427"), price: 420, rating: 4.8, reviews: 704, amenities: ["Rooftop", "Art", "Harbor"], aiMatch: 88 },
];

export type Flight = {
  id: string; airline: string; from: string; to: string; depart: string; arrive: string; duration: string;
  stops: number; price: number; carbon: string; badge?: string;
};
export const flights: Flight[] = [
  { id: "f1", airline: "ANA", from: "SFO", to: "HND", depart: "10:45", arrive: "14:20+1", duration: "11h 35m", stops: 0, price: 1180, carbon: "Low", badge: "Best value" },
  { id: "f2", airline: "JAL", from: "LAX", to: "NRT", depart: "12:15", arrive: "16:40+1", duration: "12h 25m", stops: 0, price: 1290, carbon: "Low" },
  { id: "f3", airline: "Singapore", from: "JFK", to: "NRT", depart: "01:20", arrive: "05:10+1", duration: "13h 50m", stops: 0, price: 1420, carbon: "Med", badge: "Luxury" },
  { id: "f4", airline: "Emirates", from: "DXB", to: "CDG", depart: "08:05", arrive: "12:50", duration: "7h 45m", stops: 0, price: 780, carbon: "Med" },
  { id: "f5", airline: "SWISS", from: "ZRH", to: "GVA", depart: "07:30", arrive: "08:20", duration: "0h 50m", stops: 0, price: 140, carbon: "Low", badge: "Cheapest" },
];

export type Guide = {
  id: string; name: string; photo: string; country: string; city: string; languages: string[]; rating: number;
  trips: number; specialties: string[]; verified: boolean; matchPct: number; status: "available" | "travelling" | "resting";
};
export const guides: Guide[] = [
  { id: "g1", name: "Yuki Tanaka", photo: img("1544005313-94ddf0286df2", 400, 400), country: "Japan", city: "Kyoto", languages: ["EN", "JA", "ZH"], rating: 4.98, trips: 214, specialties: ["Temples", "Tea ceremony", "Food"], verified: true, matchPct: 97, status: "available" },
  { id: "g2", name: "Aditya Sharma", photo: img("1500648767791-00dcc994a43e", 400, 400), country: "India", city: "Jaipur", languages: ["EN", "HI"], rating: 4.94, trips: 178, specialties: ["Heritage", "Photography"], verified: true, matchPct: 93, status: "travelling" },
  { id: "g3", name: "Sofia Alvarez", photo: img("1494790108377-be9c29b29330", 400, 400), country: "Chile", city: "Patagonia", languages: ["EN", "ES"], rating: 4.99, trips: 89, specialties: ["Trekking", "Wildlife"], verified: true, matchPct: 96, status: "available" },
  { id: "g4", name: "Kwame Osei", photo: img("1506794778202-cad84cf45f1d", 400, 400), country: "South Africa", city: "Cape Town", languages: ["EN", "ZU"], rating: 4.91, trips: 132, specialties: ["Safari", "Wine"], verified: true, matchPct: 90, status: "resting" },
];

export const expenseCategories = [
  { name: "Flights", value: 1820, color: "var(--sky)" },
  { name: "Hotels", value: 1420, color: "var(--emerald)" },
  { name: "Food", value: 540, color: "var(--warm)" },
  { name: "Activities", value: 380, color: "var(--coral)" },
  { name: "Transport", value: 220, color: "var(--chart-5)" },
  { name: "Shopping", value: 180, color: "var(--sky)" },
];

export const packingCategories = [
  { name: "Documents", packed: 6, total: 6, icon: "📄" },
  { name: "Electronics", packed: 8, total: 11, icon: "🔌" },
  { name: "Clothes", packed: 14, total: 22, icon: "👕" },
  { name: "Medical", packed: 4, total: 7, icon: "💊" },
  { name: "Photography", packed: 3, total: 5, icon: "📷" },
  { name: "Adventure", packed: 2, total: 6, icon: "🎒" },
];

export const communityPosts = [
  { id: "p1", user: "Maya R.", avatar: img("1438761681033-6461ffad8d80", 200, 200), place: "Kyoto, Japan", image: img("1528360983277-13d401cdc186"), likes: 3420, caption: "Golden hour at Fushimi Inari felt otherworldly. Trailvia routed us before the crowds." },
  { id: "p2", user: "Jamal T.", avatar: img("1531427186611-ecfd6d936c79", 200, 200), place: "Reykjanes, Iceland", image: img("1531366936337-7c912a4589a7"), likes: 2810, caption: "Aurora forecast pinged at 1am. We chased it. Worth it." },
  { id: "p3", user: "Elena V.", avatar: img("1502823403499-6ccfcf4fb453", 200, 200), place: "Oia, Santorini", image: img("1613395877344-13d4a8e0d49e"), likes: 5120, caption: "The AI suggested a rooftop I'd never have found. Best dinner of the trip." },
];

export const notifications = [
  { id: "n1", icon: "✈️", title: "Flight AA284 upgraded to first class", time: "2m", tone: "emerald" },
  { id: "n2", icon: "🌦️", title: "Rain expected in Kyoto tomorrow — pack umbrella", time: "1h", tone: "sky" },
  { id: "n3", icon: "💰", title: "Hotel price dropped 12% for your saved stay", time: "3h", tone: "warm" },
  { id: "n4", icon: "🧭", title: "Yuki (your guide) is 4 min from meeting point", time: "yesterday", tone: "coral" },
];

export const insights = {
  countries: 24, cities: 87, trips: 42, distanceKm: 128_400, travelScore: 924, points: 12_480,
};

export const aiRecommendations = [
  { title: "Weekend Escape", subtitle: "3-day getaways near you", icon: "🌅" },
  { title: "Hidden Gems", subtitle: "Places locals love", icon: "💎" },
  { title: "Budget Friendly", subtitle: "Under $1200 total", icon: "💰" },
  { title: "Luxury Retreats", subtitle: "5-star with concierge", icon: "✨" },
  { title: "Adventure", subtitle: "For adrenaline seekers", icon: "🏔️" },
  { title: "Solo Journeys", subtitle: "Safe, social, curated", icon: "🎒" },
  { title: "Trending Now", subtitle: "Rising 34% this month", icon: "🔥" },
  { title: "Seasonal Picks", subtitle: "Best for April", icon: "🌸" },
];
