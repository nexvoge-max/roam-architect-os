import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { flights } from "@/lib/mock-data";
import { Plane, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/flights")({
  head: () => ({ meta: [{ title: "Flights — Trailvia" }] }),
  component: Flights,
});

function Flights() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Best fares</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Flights</h1>
      </div>
      <GlassCard variant="strong" className="grid md:grid-cols-4 gap-3">
        {["From", "To", "Departure", "Return"].map((l, i) => (
          <div key={l} className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
            <div className="font-semibold text-sm mt-0.5">{["SFO San Francisco","HND Tokyo","Apr 3","Apr 17"][i]}</div>
          </div>
        ))}
      </GlassCard>
      <div className="space-y-3">
        {flights.map(f => (
          <GlassCard key={f.id} className="hover-lift">
            <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-gradient-to-br from-sky to-emerald grid place-items-center"><Plane className="size-5 text-primary-foreground" /></div>
                <div>
                  <div className="font-bold text-sm">{f.airline}</div>
                  <div className="text-[11px] text-muted-foreground">{f.stops === 0 ? "Nonstop" : `${f.stops} stop`}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-2 col-span-2 md:col-span-1">
                <div className="text-center">
                  <div className="font-black">{f.depart}</div>
                  <div className="text-[11px] text-muted-foreground">{f.from}</div>
                </div>
                <div className="text-center text-[10px] text-muted-foreground">
                  <div>{f.duration}</div>
                  <div className="h-px bg-white/10 my-1" />
                  <div>{f.carbon} CO₂</div>
                </div>
                <div className="text-center">
                  <div className="font-black">{f.arrive}</div>
                  <div className="text-[11px] text-muted-foreground">{f.to}</div>
                </div>
              </div>
              {f.badge && <div className="text-[10px] font-semibold uppercase tracking-widest text-primary glass-subtle rounded-full px-2 py-1 justify-self-center hidden md:block">{f.badge}</div>}
              <div className="text-right">
                <div className="text-2xl font-black">${f.price}</div>
                <div className="text-[10px] text-muted-foreground inline-flex items-center gap-1"><Sparkles className="size-3 text-primary" /> AI 94</div>
              </div>
              <button className="rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90">Select</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
