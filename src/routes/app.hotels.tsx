import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { hotels } from "@/lib/mock-data";
import { Star, Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/app/hotels")({
  head: () => ({ meta: [{ title: "Hotels — Trailvia" }] }),
  component: Hotels,
});

const filters = ["Any budget", "Luxury", "Family", "Beachfront", "Pool", "Pet friendly", "Business", "Spa"];

function Hotels() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Curated stays</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Hotels for Kyoto</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f, i) => (
          <button key={f} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${i===0 ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}>{f}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(h => (
          <GlassCard key={h.id} variant="strong" className="p-0 overflow-hidden hover-lift">
            <div className="relative h-52">
              <img src={h.image} alt={h.name} className="size-full object-cover" />
              {h.badge && <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-primary">{h.badge}</div>}
              <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-xs inline-flex items-center gap-1"><Star className="size-3 fill-warm text-warm" /> {h.rating}</div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-bold truncate">{h.name}</div>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><MapPin className="size-3" /> {h.city}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-black">${h.price}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">/ night</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {h.amenities.map(a => <span key={a} className="text-[10px] glass rounded-full px-2 py-0.5">{a}</span>)}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-primary inline-flex items-center gap-1"><Sparkles className="size-3" /> {h.aiMatch}% AI match</div>
                <button className="text-xs rounded-full bg-primary text-primary-foreground px-3 py-1.5 font-semibold hover:opacity-90">Book</button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
