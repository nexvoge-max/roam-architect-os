import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { trips } from "@/lib/mock-data";
import { Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/trips")({
  head: () => ({ meta: [{ title: "Trips — Trailvia" }] }),
  component: Trips,
});

const tabs = ["All", "Upcoming", "Planning", "In progress", "Completed"] as const;

function Trips() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = trips.filter(t => tab === "All" ? true : t.status === tab.toLowerCase().replace(" ", "-"));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Your journeys</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Trips</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${tab === t ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(t => (
          <GlassCard key={t.id} variant="strong" className="p-0 overflow-hidden hover-lift">
            <div className="relative h-48">
              <img src={t.cover} alt={t.title} className="size-full object-cover" />
              <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold">{t.status}</div>
              <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-xs">{t.weather.icon} {t.weather.temp}</div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-xl font-black">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.destinations.join(" · ")}</div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {t.startDate} – {t.endDate}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {t.destinations.length} stops</span>
                <span className="inline-flex items-center gap-1"><Users className="size-3" /> {t.companions}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">${t.spent.toLocaleString()} of ${t.budget.toLocaleString()}</span><span className="font-semibold">{Math.round((t.spent/t.budget)*100)}%</span></div>
                <div className="h-1.5 rounded-full bg-primary/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald to-sky" style={{ width: `${(t.spent/t.budget)*100}%` }} />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-2xl bg-primary text-primary-foreground py-2 text-sm font-semibold hover:opacity-90">Open</button>
                <button className="rounded-2xl glass py-2 px-4 text-sm font-semibold hover:bg-primary/5">Share</button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
