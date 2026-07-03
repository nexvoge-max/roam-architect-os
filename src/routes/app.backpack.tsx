import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { packingCategories } from "@/lib/mock-data";
import { Check, Sparkles, Cloud, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/backpack")({
  head: () => ({ meta: [{ title: "Smart Backpack — Trailvia" }] }),
  component: Backpack,
});

const items = [
  { name: "Passport", cat: "Documents", packed: true },
  { name: "Travel insurance printout", cat: "Documents", packed: true },
  { name: "Universal adapter (Type A/B/C)", cat: "Electronics", packed: true },
  { name: "Camera + 24-70mm lens", cat: "Photography", packed: false, ai: "Weather: rain expected, bring cover." },
  { name: "Light rain jacket", cat: "Clothes", packed: false, ai: "Kyoto 60% rain chance Apr 5." },
  { name: "Motion sickness tablets", cat: "Medical", packed: false, ai: "Long train days." },
  { name: "Portable charger 20K mAh", cat: "Electronics", packed: true },
  { name: "Merino wool base layers ×2", cat: "Clothes", packed: true },
];

function Backpack() {
  const packed = packingCategories.reduce((s, c) => s + c.packed, 0);
  const total = packingCategories.reduce((s, c) => s + c.total, 0);
  const pct = Math.round((packed / total) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Packing assistant</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Smart Backpack</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
        {/* Progress ring */}
        <GlassCard variant="strong" className="flex flex-col items-center">
          <div className="relative size-44">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
              <circle cx="50" cy="50" r="42" stroke="oklch(1 0 0 / 0.08)" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="42" stroke="url(#pg)" strokeWidth="8" fill="none" strokeLinecap="round"
                strokeDasharray={`${(pct/100)*264} 264`} />
              <defs>
                <linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.74 0.16 165)" />
                  <stop offset="100%" stopColor="oklch(0.72 0.14 235)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-gradient-emerald">{pct}%</div>
              <div className="text-xs text-muted-foreground">{packed}/{total} packed</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 w-full text-center">
            <div className="glass rounded-xl p-3"><div className="text-xl font-black">18.4 kg</div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Weight</div></div>
            <div className="glass rounded-xl p-3"><div className="text-xl font-black">92</div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Readiness</div></div>
          </div>
          <div className="glass rounded-2xl p-3 mt-4 w-full text-xs inline-flex items-start gap-2">
            <AlertTriangle className="size-4 text-warm shrink-0" />
            <span>Cabin limit 7 kg — you're 2.4 kg over. Move rain jacket to checked?</span>
          </div>
        </GlassCard>

        {/* Categories + AI */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {packingCategories.map(c => (
              <GlassCard key={c.name} className="hover-lift">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{c.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-[11px] text-muted-foreground">{c.packed}/{c.total} packed</div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-primary/5 overflow-hidden mt-3">
                  <div className="h-full bg-gradient-to-r from-emerald to-sky" style={{ width: `${(c.packed/c.total)*100}%` }} />
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard variant="strong">
            <div className="flex items-center gap-2 mb-3"><Cloud className="size-4 text-sky" /><div className="font-bold">Weather-adjusted picks</div></div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { d: "Today", i: "☀️", t: "22°" },
                { d: "Tue", i: "🌧️", t: "16°" },
                { d: "Wed", i: "⛅", t: "19°" },
              ].map(w => (
                <div key={w.d} className="glass rounded-xl p-2"><div className="text-2xl">{w.i}</div><div className="font-semibold">{w.t}</div><div className="text-muted-foreground text-[10px]">{w.d}</div></div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Checklist */}
      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold">Checklist · Cherry Blossom Japan</div>
          <button className="text-xs rounded-full bg-primary text-primary-foreground px-3 py-1.5 font-semibold hover:opacity-90 inline-flex items-center gap-1"><Sparkles className="size-3" /> AI suggestions</button>
        </div>
        <div className="space-y-1.5">
          {items.map(it => (
            <div key={it.name} className={`flex items-center gap-3 rounded-2xl p-3 transition ${it.packed ? "opacity-60" : "glass"}`}>
              <button className={`size-6 rounded-lg grid place-items-center transition ${it.packed ? "bg-primary" : "glass"}`}>
                {it.packed && <Check className="size-3.5 text-primary-foreground" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${it.packed ? "line-through" : ""}`}>{it.name}</div>
                <div className="text-[11px] text-muted-foreground">{it.cat}{it.ai && <> · <span className="text-primary">{it.ai}</span></>}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
