import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Compass, Map, Wallet, Backpack, Users, Newspaper, Shield, ArrowRight, Star, Play } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { destinations, insights, communityPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trailvia — More Than a Trip. It's Your Story." },
      { name: "description", content: "The AI travel operating system. Plan, navigate, spend, pack, remember. One intelligent companion for every journey." },
      { property: "og:title", content: "Trailvia — AI Travel Operating System" },
      { property: "og:description", content: "Plan, navigate, spend, pack, remember. One intelligent companion for every journey." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Sparkles, title: "AI Planner", desc: "Conversational, multi-destination itineraries built with you.", tone: "from-emerald to-sky" },
  { icon: Compass, title: "Journey Companion", desc: "Verified guides accompany your whole trip. Premium included.", tone: "from-sky to-coral" },
  { icon: Wallet, title: "Finance AI", desc: "Live budget, split bills, currency, predictions.", tone: "from-warm to-coral" },
  { icon: Backpack, title: "Smart Backpack", desc: "AI packing based on weather, activities, weight limits.", tone: "from-emerald to-warm" },
  { icon: Map, title: "Offline Maps", desc: "Full offline hub — maps, tickets, wallet, translations.", tone: "from-sky to-emerald" },
  { icon: Users, title: "Community", desc: "Stories, reels, creators, group trips, live chat.", tone: "from-coral to-warm" },
  { icon: Newspaper, title: "Travel Stories", desc: "Auto-generated journal, replay, and memory studio.", tone: "from-warm to-sky" },
  { icon: Shield, title: "Safety Assistant", desc: "SOS, embassy, translation, unsafe area alerts.", tone: "from-coral to-emerald" },
];

const testimonials = [
  { name: "Aria Chen", role: "Photographer · Kyoto trip", quote: "I've never had a trip feel this effortless. It planned around cherry blossom forecasts and even routed me before crowds.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" },
  { name: "Marco Silva", role: "Founder · Patagonia expedition", quote: "The Journey Companion changed everything. My guide had daily reports, safety notes, even mood check-ins.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
  { name: "Priya Nair", role: "Solo traveler · Iceland ring road", quote: "The finance and offline hub alone are worth it. Aurora ping at 1am is a core memory now.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
];

const plans = [
  { name: "Explorer", price: "Free", tagline: "Start your journey", perks: ["Basic AI planner", "Maps & navigation", "3 trips / year", "Community access"], cta: "Get started" },
  { name: "Premium", price: "$14", tagline: "Most popular", perks: ["Everything in Explorer", "Journey Companion included", "Unlimited trips", "Offline hub", "AI Finance & Backpack"], cta: "Start free trial", featured: true },
  { name: "Elite", price: "$39", tagline: "For frequent travelers", perks: ["Everything in Premium", "Luxury concierge", "Priority guides", "Insurance & lounge", "24/7 human support"], cta: "Talk to us" },
];

const faqs = [
  { q: "Is Trailvia a booking app?", a: "No. Trailvia is an intelligent travel companion. Booking is one part of a much larger ecosystem — planning, navigation, finance, packing, memories, community, and safety." },
  { q: "How does Journey Companion work?", a: "Every Premium trip includes a verified local guide who accompanies you for the trip's duration. You never pay guides directly — it's bundled into your subscription." },
  { q: "Does the AI actually plan the whole trip?", a: "Yes. Give it a vibe, dates, and budget. It builds a full multi-destination itinerary with real-time recommendations, and you refine it in natural language." },
  { q: "What about offline?", a: "Everything — maps, itinerary, tickets, wallet, translations, emergency info — can be downloaded with one tap." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-emerald to-sky grid place-items-center font-black text-primary-foreground">T</div>
            <span className="font-black tracking-tight">Trailvia</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#destinations" className="hover:text-foreground transition">Destinations</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2">Sign in</Link>
            <Link to="/app" className="inline-flex items-center gap-1 rounded-2xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
              Open app <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 size-[600px] rounded-full bg-emerald/20 blur-3xl animate-float-slow" />
          <div className="absolute top-20 -right-40 size-[500px] rounded-full bg-sky/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-0 left-1/3 size-[400px] rounded-full bg-coral/10 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-32 lg:pb-32 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs animate-fade-up">
            <Sparkles className="size-3 text-primary" />
            <span>AI Travel Operating System</span>
            <span className="text-muted-foreground">· v1.0</span>
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.95] animate-fade-up">
            More Than a Trip.<br />
            <span className="text-gradient-emerald">It's Your Story.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-up">
            Trailvia unifies discovery, planning, booking, finance, packing, navigation, community, and memories into one intelligent, AI-first companion.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up">
            <Link to="/app/plan" className="inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:opacity-90 transition glow-emerald">
              Start Planning <ArrowRight className="size-4" />
            </Link>
            <Link to="/app" className="inline-flex items-center gap-2 rounded-2xl glass-strong px-6 py-3.5 font-semibold hover:bg-white/5 transition">
              Explore demo
            </Link>
            <button className="inline-flex items-center gap-2 rounded-2xl px-4 py-3.5 font-medium text-muted-foreground hover:text-foreground transition">
              <Play className="size-4" /> Watch video
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { v: "2.4M+", l: "Travelers" },
              { v: "184", l: "Countries" },
              { v: "48K", l: "Verified guides" },
              { v: "4.9★", l: "Avg rating" },
            ].map((s) => (
              <GlassCard key={s.l} className="p-5 text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient-emerald">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Ecosystem</div>
            <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight max-w-2xl">One app for every part of the journey.</h2>
          </div>
          <p className="text-muted-foreground max-w-md">Not a chatbot. Not a booking site. A fully integrated OS for travelers who want intelligence woven into every moment.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <GlassCard key={f.title} hover className="group">
              <div className={`size-11 rounded-2xl bg-gradient-to-br ${f.tone} grid place-items-center mb-4 group-hover:scale-110 transition`}>
                <f.icon className="size-5 text-primary-foreground" />
              </div>
              <div className="font-bold text-lg">{f.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Popular right now</div>
            <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">Loved by travelers</h2>
          </div>
          <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1">Explore all <ArrowRight className="size-4" /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
          {destinations.slice(0, 8).map((d) => (
            <div key={d.id} className="snap-start shrink-0 w-[300px] rounded-3xl overflow-hidden glass-strong hover-lift group">
              <div className="relative h-48 overflow-hidden">
                <img src={d.image} alt={d.name} className="size-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-xs flex items-center gap-1"><Star className="size-3 fill-warm text-warm" /> {d.rating}</div>
                <div className="absolute bottom-3 left-3 glass rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">{d.budget}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.country}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Score</div>
                    <div className="font-black text-primary">{d.score}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">{d.season}</div>
                <p className="mt-2 text-sm">{d.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-primary">Loved by travelers worldwide</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">Trips that feel effortless</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <GlassCard key={t.name} className="flex flex-col">
              <div className="flex items-center gap-1 text-warm mb-4">{[1,2,3,4,5].map(i => <Star key={i} className="size-4 fill-warm" />)}</div>
              <p className="text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="size-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-primary">Membership</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">Choose your journey</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <GlassCard key={p.name} variant={p.featured ? "strong" : "default"} className={p.featured ? "ring-2 ring-primary/40 glow-emerald" : ""}>
              {p.featured && <div className="inline-block glass rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-primary mb-4">Most popular</div>}
              <div className="font-bold text-2xl">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.tagline}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black">{p.price}</span>
                {p.price !== "Free" && <span className="text-muted-foreground text-sm">/mo</span>}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.perks.map(pk => <li key={pk} className="flex gap-2"><span className="text-primary">✓</span> {pk}</li>)}
              </ul>
              <button className={`mt-8 w-full rounded-2xl py-3 font-semibold transition ${p.featured ? "bg-primary text-primary-foreground hover:opacity-90" : "glass hover:bg-white/5"}`}>{p.cta}</button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-primary">FAQ</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">Answers</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group glass rounded-2xl px-5 py-4">
              <summary className="cursor-pointer list-none font-semibold flex justify-between items-center">{f.q}<span className="text-muted-foreground group-open:rotate-45 transition">+</span></summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <GlassCard variant="strong" className="text-center py-16 glow-emerald">
          <h3 className="text-4xl md:text-5xl font-black tracking-tight">Your next story starts here.</h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join {insights.trips.toLocaleString()}K+ travelers using Trailvia to plan and remember trips they'll never forget.</p>
          <Link to="/app" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:opacity-90 transition">Open the app <ArrowRight className="size-4" /></Link>
        </GlassCard>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 justify-between text-sm text-muted-foreground">
          <div>© 2026 Trailvia · Made for travelers.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Careers</a>
            <a href="#" className="hover:text-foreground">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
