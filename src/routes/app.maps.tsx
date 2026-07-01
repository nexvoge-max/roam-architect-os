import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { Search, MapPin, Navigation, Layers, Download, Cloud, Compass, Car, Bike, Train, Bus, Plane, Sparkles, Fuel, Coffee, Hotel } from "lucide-react";

export const Route = createFileRoute("/app/maps")({
  head: () => ({ meta: [{ title: "Maps & Navigation — Trailvia" }] }),
  component: Maps,
});

const categories = [
  { icon: "🍜", label: "Food" }, { icon: "🏨", label: "Hotels" }, { icon: "☕", label: "Cafés" },
  { icon: "🏥", label: "Hospitals" }, { icon: "⛽", label: "Fuel" }, { icon: "🏧", label: "ATM" },
  { icon: "🛍️", label: "Shopping" }, { icon: "💎", label: "Hidden gems" }, { icon: "🚇", label: "Transit" },
];

const modes = [
  { icon: Car, label: "Car", time: "42 min", cost: "$12", badge: "Fastest" },
  { icon: Train, label: "Metro", time: "38 min", cost: "$3.20", badge: "Cheapest" },
  { icon: Bus, label: "Bus", time: "1h 12", cost: "$2.10" },
  { icon: Bike, label: "Bike", time: "1h 05", cost: "Free", badge: "Eco" },
  { icon: Plane, label: "Flight", time: "N/A", cost: "—" },
];

function Maps() {
  return (
    <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[1fr_380px] gap-4 h-[calc(100vh-8rem)]">
      {/* Map canvas */}
      <div className="relative rounded-3xl overflow-hidden glass-strong">
        {/* Faux map with layered gradients */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 30% 40%, oklch(0.35 0.1 235 / 0.5), transparent 40%),
            radial-gradient(circle at 70% 60%, oklch(0.4 0.12 165 / 0.4), transparent 40%),
            radial-gradient(circle at 50% 80%, oklch(0.3 0.08 300 / 0.3), transparent 50%),
            repeating-linear-gradient(0deg, oklch(1 0 0 / 0.02) 0, oklch(1 0 0 / 0.02) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, oklch(1 0 0 / 0.02) 0, oklch(1 0 0 / 0.02) 1px, transparent 1px, transparent 60px),
            linear-gradient(180deg, oklch(0.14 0.03 260), oklch(0.11 0.03 262))
          `,
        }} />
        {/* Route line */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 800 600">
          <path d="M 120 480 Q 300 340 420 380 T 680 160" stroke="url(#g1)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 8" />
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.74 0.16 165)" />
              <stop offset="100%" stopColor="oklch(0.72 0.14 235)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Pins */}
        {[
          { x: 15, y: 80, label: "You", tone: "sky" },
          { x: 52, y: 60, label: "Kikunoi", tone: "warm" },
          { x: 85, y: 25, label: "Hotel", tone: "emerald" },
        ].map((p) => (
          <div key={p.label} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <div className="glass-strong rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap">{p.label}</div>
            <div className={`size-3 rounded-full bg-${p.tone} shadow-lg animate-pulse-glow mt-1`} />
          </div>
        ))}

        {/* Floating search */}
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          <div className="glass-strong rounded-2xl flex items-center gap-2 flex-1 px-4 py-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input placeholder="Search places, addresses, coordinates..." className="flex-1 bg-transparent outline-none text-sm" />
          </div>
          <button className="glass-strong rounded-2xl px-3"><Layers className="size-4" /></button>
        </div>

        {/* Category chips */}
        <div className="absolute top-20 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button key={c.label} className="glass rounded-full px-3 py-1.5 text-xs whitespace-nowrap hover:bg-white/5">
              <span className="mr-1.5">{c.icon}</span>{c.label}
            </button>
          ))}
        </div>

        {/* Floating controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="glass-strong rounded-2xl p-3 hover:bg-white/5"><Navigation className="size-4 text-primary" /></button>
          <button className="glass-strong rounded-2xl p-3 hover:bg-white/5"><Compass className="size-4" /></button>
          <button className="glass-strong rounded-2xl p-3 hover:bg-white/5"><Download className="size-4" /></button>
          <button className="glass-strong rounded-2xl p-3 hover:bg-white/5"><Cloud className="size-4" /></button>
        </div>

        {/* AI assist */}
        <div className="absolute bottom-4 left-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 max-w-md">
          <Sparkles className="size-4 text-primary shrink-0" />
          <div className="text-xs">
            <div className="font-semibold">AI: Scenic route via Philosopher's Path adds 12 min</div>
            <div className="text-muted-foreground">3 hidden viewpoints along the way</div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="overflow-y-auto space-y-3">
        {/* Live route */}
        <GlassCard variant="strong">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Live route</div>
          <div className="font-bold">Ritz-Carlton Kyoto → Kikunoi</div>
          <div className="text-xs text-muted-foreground mt-1">2.4 km · Arriving 19:52</div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="glass rounded-xl p-3"><div className="text-xl font-black">42<span className="text-xs ml-0.5">min</span></div><div className="text-[10px] text-muted-foreground uppercase tracking-widest">ETA</div></div>
            <div className="glass rounded-xl p-3"><div className="text-xl font-black">$12</div><div className="text-[10px] text-muted-foreground uppercase tracking-widest">Cost</div></div>
            <div className="glass rounded-xl p-3"><div className="text-xl font-black">☀️</div><div className="text-[10px] text-muted-foreground uppercase tracking-widest">22°</div></div>
          </div>
        </GlassCard>

        {/* Transport modes */}
        <GlassCard>
          <div className="font-bold mb-3">Choose transport</div>
          <div className="space-y-2">
            {modes.map((m) => (
              <button key={m.label} className="w-full glass rounded-2xl p-3 flex items-center gap-3 hover-lift text-left">
                <m.icon className="size-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{m.label}</div>
                  <div className="text-[11px] text-muted-foreground">{m.time} · {m.cost}</div>
                </div>
                {m.badge && <span className="text-[10px] font-semibold text-primary glass-subtle rounded-full px-2 py-0.5">{m.badge}</span>}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Smart stops */}
        <GlassCard>
          <div className="font-bold mb-3">Add a stop</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Coffee, label: "Coffee" },
              { icon: Fuel, label: "Fuel" },
              { icon: Hotel, label: "Hotel" },
            ].map((s) => (
              <button key={s.label} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 hover-lift">
                <s.icon className="size-4 text-primary" />
                <span className="text-xs">{s.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
