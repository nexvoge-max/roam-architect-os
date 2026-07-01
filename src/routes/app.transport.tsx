import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { Plane, Train, Bus, Car, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/transport")({
  head: () => ({ meta: [{ title: "Transport — Trailvia" }] }),
  component: Transport,
});

const options = [
  { icon: Plane, mode: "Flight", time: "3h 20m", price: 340, carbon: 210, comfort: 4, badge: "Fastest" },
  { icon: Train, mode: "Bullet train", time: "5h 45m", price: 180, carbon: 42, comfort: 5, badge: "Recommended" },
  { icon: Bus, mode: "Coach", time: "9h 10m", price: 62, carbon: 78, comfort: 3, badge: "Cheapest" },
  { icon: Car, mode: "Rental car", time: "6h 30m", price: 220, carbon: 165, comfort: 4 },
];

function Transport() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Compare all modes</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Tokyo → Kyoto</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map(o => (
          <GlassCard key={o.mode} variant="strong" className="hover-lift">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-emerald to-sky grid place-items-center"><o.icon className="size-5 text-primary-foreground" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><div className="font-bold">{o.mode}</div>{o.badge && <span className="text-[10px] font-semibold uppercase tracking-widest text-primary glass-subtle rounded-full px-2 py-0.5">{o.badge}</span>}</div>
                <div className="text-xs text-muted-foreground">{o.time} · Comfort {"★".repeat(o.comfort)}{"☆".repeat(5-o.comfort)}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">${o.price}</div>
                <div className="text-[10px] text-muted-foreground">{o.carbon} kg CO₂</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-primary inline-flex items-center gap-1"><Sparkles className="size-3" /> AI 92% match</div>
              <button className="text-xs rounded-full bg-primary text-primary-foreground px-4 py-1.5 font-semibold hover:opacity-90">Book</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
