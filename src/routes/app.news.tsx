import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { AlertTriangle, Cloud, Plane, PartyPopper } from "lucide-react";

export const Route = createFileRoute("/app/news")({
  head: () => ({ meta: [{ title: "Travel News — Trailvia" }] }),
  component: News,
});

const alerts = [
  { icon: Plane, tone: "warm", title: "Kansai Airport minor delays", desc: "Weather rerouting adds ~25 min departures.", time: "12m" },
  { icon: Cloud, tone: "sky", title: "Rain expected in Kyoto on Apr 5", desc: "Pack layers and a light rain jacket.", time: "1h" },
  { icon: AlertTriangle, tone: "coral", title: "Protest closure — Shinjuku 3-chome", desc: "Avoid area Sat 14:00–18:00.", time: "3h" },
  { icon: PartyPopper, tone: "emerald", title: "Cherry blossom festival tonight", desc: "Maruyama Park, 19:00. Free entry.", time: "6h" },
];

const categories = ["Travel", "Weather", "Events", "Advisories", "Visa", "Currency", "Safety", "Festivals"];

function News() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Live in Kyoto</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Travel news</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c,i) => <button key={c} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${i===0 ? "bg-primary text-primary-foreground" : "glass hover:bg-white/5"}`}>{c}</button>)}
      </div>
      <div className="space-y-3">
        {alerts.map((a) => (
          <GlassCard key={a.title} className="hover-lift">
            <div className="flex items-start gap-4">
              <div className={`size-11 rounded-2xl grid place-items-center shrink-0 bg-${a.tone}/20`} style={{ background: `color-mix(in oklab, var(--${a.tone}) 20%, transparent)` }}>
                <a.icon className="size-5" style={{ color: `var(--${a.tone})` }} />
              </div>
              <div className="flex-1">
                <div className="font-bold">{a.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{a.desc}</div>
                <div className="text-[11px] text-muted-foreground mt-2">{a.time} ago</div>
              </div>
              <button className="text-xs rounded-full glass px-3 py-1.5 hover:bg-white/5 shrink-0">Details</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
