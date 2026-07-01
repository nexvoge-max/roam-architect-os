import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { destinations, trips, insights, aiRecommendations, notifications } from "@/lib/mock-data";
import { Sparkles, Compass, Map, Wallet, Backpack, Users, Newspaper, PhoneCall, ArrowRight, Cloud, Star, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Home — Trailvia" }] }),
  component: HomeDashboard,
});

const quickActions = [
  { label: "Plan trip", icon: Sparkles, to: "/app/plan", tone: "from-emerald to-sky" },
  { label: "Open map", icon: Map, to: "/app/maps", tone: "from-sky to-coral" },
  { label: "Backpack", icon: Backpack, to: "/app/backpack", tone: "from-warm to-coral" },
  { label: "Finance", icon: Wallet, to: "/app/finance", tone: "from-emerald to-warm" },
  { label: "Community", icon: Users, to: "/app/community", tone: "from-coral to-sky" },
  { label: "Emergency", icon: PhoneCall, to: "/app/settings", tone: "from-coral to-warm" },
];

function HomeDashboard() {
  const active = trips[0];
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Good morning</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Hey Snehith 👋</h1>
          <div className="mt-2 text-sm text-muted-foreground flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1"><Cloud className="size-4" /> Hyderabad · 32° partly cloudy</span>
            <span>·</span>
            <span>12 days until <b className="text-foreground">Cherry Blossom Japan</b></span>
          </div>
        </div>
        <GlassCard className="flex items-center gap-4 py-3 px-5">
          <div className="text-3xl font-black text-gradient-emerald">{insights.travelScore}</div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Travel score</div>
            <div className="text-xs flex items-center gap-1 text-primary"><TrendingUp className="size-3" /> +18 this month</div>
          </div>
        </GlassCard>
      </div>

      {/* Universal search */}
      <GlassCard variant="strong" className="p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 text-primary" />
          <input
            placeholder="Search anywhere — cities, hotels, hidden gems, guides..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button className="hidden md:inline text-xs text-muted-foreground">⌘K</button>
        </div>
      </GlassCard>

      {/* Continue planning */}
      <GlassCard variant="strong" className="p-0 overflow-hidden">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="relative h-56 md:h-auto">
            <img src={active.cover} alt={active.title} className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs">Continue planning</div>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest text-primary">Upcoming trip</div>
            <div className="text-2xl md:text-3xl font-black mt-1">{active.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{active.destinations.join(" → ")}</div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span>📅 {active.startDate} — {active.endDate}</span>
              <span>{active.weather.icon} {active.weather.temp}</span>
              <span>👥 {active.companions}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Plan progress</span><span className="font-semibold">{active.progress}%</span></div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald to-sky" style={{ width: `${active.progress}%` }} />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/app/plan" className="rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-1">Continue <ArrowRight className="size-4" /></Link>
              <Link to="/app/trips" className="rounded-2xl glass px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition">View all trips</Link>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* AI recommendations */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-2xl font-black tracking-tight">For you, curated by AI</h2>
          <div className="text-xs text-muted-foreground">Updated 2 min ago</div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {aiRecommendations.map((r) => (
            <div key={r.title} className="shrink-0 w-52 glass rounded-2xl p-5 hover-lift cursor-pointer">
              <div className="text-3xl">{r.icon}</div>
              <div className="mt-3 font-bold">{r.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{r.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Insights grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { l: "Countries", v: insights.countries },
          { l: "Cities", v: insights.cities },
          { l: "Trips", v: insights.trips },
          { l: "Distance (km)", v: insights.distanceKm.toLocaleString() },
          { l: "Points", v: insights.points.toLocaleString() },
          { l: "Badges", v: 34 },
        ].map((s) => (
          <GlassCard key={s.l} className="text-center py-5">
            <div className="text-3xl font-black text-gradient-emerald">{s.v}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
          </GlassCard>
        ))}
      </section>

      {/* Upcoming trips + notifications */}
      <section className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-3">Upcoming trips</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {trips.filter(t => t.status !== "completed").map((t) => (
              <GlassCard key={t.id} variant="strong" className="p-0 overflow-hidden hover-lift">
                <div className="relative h-32">
                  <img src={t.cover} alt={t.title} className="size-full object-cover" />
                  <div className="absolute top-2 right-2 glass rounded-full px-2 py-0.5 text-[10px]">{t.status}</div>
                </div>
                <div className="p-4">
                  <div className="font-bold">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.startDate} — {t.endDate} · {t.days}d</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>{t.weather.icon} {t.weather.temp}</span>
                    <span className="text-primary font-semibold">{t.progress}%</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-3">Notifications</h2>
          <GlassCard className="p-2 space-y-1">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-white/5 transition cursor-pointer">
                <div className="text-2xl">{n.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{n.title}</div>
                  <div className="text-[10px] text-muted-foreground">{n.time} ago</div>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-2xl font-black tracking-tight mb-3">Quick actions</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickActions.map((q) => (
            <Link key={q.label} to={q.to} className="glass rounded-2xl p-4 text-center hover-lift">
              <div className={`size-10 mx-auto rounded-2xl bg-gradient-to-br ${q.tone} grid place-items-center`}>
                <q.icon className="size-5 text-primary-foreground" />
              </div>
              <div className="mt-2 text-xs font-semibold">{q.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending destinations */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-2xl font-black tracking-tight">Trending destinations</h2>
          <Link to="/app/plan" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">See all <ArrowRight className="size-3" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {destinations.slice(0, 4).map((d) => (
            <div key={d.id} className="relative rounded-3xl overflow-hidden group hover-lift cursor-pointer">
              <img src={d.image} alt={d.name} className="w-full h-52 object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute top-3 right-3 glass rounded-full px-2 py-1 text-xs flex items-center gap-1"><Star className="size-3 fill-warm text-warm" /> {d.rating}</div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="font-bold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.country} · {d.budget}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
