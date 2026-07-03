import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { destinations } from "@/lib/mock-data";
import { Sparkles, Send, Plus, GripVertical, MapPin, Clock, DollarSign, Sun, Trash2, Wand2, Route as RouteIcon, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/plan")({
  head: () => ({ meta: [{ title: "AI Planner — Trailvia" }] }),
  component: Plan,
});

type Stop = { id: string; name: string; country: string; days: number; image: string; budget: number };
const initial: Stop[] = [
  { id: "1", name: "Tokyo", country: "Japan", days: 4, image: destinations.find(d=>d.id==="tokyo")!.image, budget: 1420 },
  { id: "2", name: "Kyoto", country: "Japan", days: 5, image: destinations.find(d=>d.id==="kyoto")!.image, budget: 1180 },
  { id: "3", name: "Osaka", country: "Japan", days: 3, image: destinations[8].image, budget: 780 },
  { id: "4", name: "Nara", country: "Japan", days: 2, image: destinations[0].image, budget: 320 },
];

const styles = ["Adventure", "Luxury", "Backpacking", "Road Trip", "Business", "Family", "Romantic", "Cultural", "Food", "Photography"];

const daySchedule = [
  { time: "Morning", icon: "🌅", items: [
    { title: "Fushimi Inari Shrine", time: "06:30", dur: "2h", cost: 0, transport: "Metro · 12 min" },
    { title: "Nishiki Market breakfast", time: "09:00", dur: "1h", cost: 18, transport: "Walk · 8 min" },
  ]},
  { time: "Afternoon", icon: "☀️", items: [
    { title: "Kinkaku-ji (Golden Pavilion)", time: "13:00", dur: "1.5h", cost: 4, transport: "Bus · 20 min" },
    { title: "Arashiyama Bamboo Grove", time: "15:30", dur: "2h", cost: 0, transport: "Train · 18 min" },
  ]},
  { time: "Evening", icon: "🌇", items: [
    { title: "Gion district photowalk", time: "18:00", dur: "1.5h", cost: 0, transport: "Walk" },
    { title: "Kaiseki dinner · Kikunoi", time: "20:00", dur: "2.5h", cost: 240, transport: "Taxi · 6 min" },
  ]},
];

const aiMessages = [
  { role: "ai", text: "Great choice — I've built you a 14-day loop through Tokyo, Kyoto, Osaka, and Nara timed with peak bloom. Want me to explain why the order?" },
  { role: "user", text: "Yes, and can we skip a museum day for more food?" },
  { role: "ai", text: "Done. Swapped the Tokyo National Museum for a Tsukiji food crawl on Day 3, and added an evening izakaya route in Osaka. Your food budget went up $85 — still $920 under overall." },
];

function Plan() {
  const [stops, setStops] = useState(initial);
  const [style, setStyle] = useState("Cultural");
  const [msg, setMsg] = useState("");
  const totalBudget = stops.reduce((s, x) => s + x.budget, 0) + 1820 /* flights */ + 540 /* food */;

  return (
    <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-4 h-[calc(100vh-8rem)]">
      {/* Timeline / builder */}
      <div className="overflow-y-auto space-y-4 pr-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Planning workspace</div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Cherry Blossom Japan</h1>
            <div className="text-sm text-muted-foreground">Apr 03 – Apr 17 · 14 days · 4 destinations</div>
          </div>
          <button className="rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-2 glow-emerald">
            <Wand2 className="size-4" /> Optimize route
          </button>
        </div>

        {/* Multi-destination chain */}
        <GlassCard variant="strong">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold flex items-center gap-2"><RouteIcon className="size-4 text-primary" /> Route</div>
            <button className="text-xs glass rounded-full px-3 py-1 hover:bg-primary/5 inline-flex items-center gap-1"><Plus className="size-3" /> Add stop</button>
          </div>
          <div className="space-y-2">
            {stops.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 glass rounded-2xl p-3 hover-lift">
                <GripVertical className="size-4 text-muted-foreground shrink-0" />
                <img src={s.image} alt={s.name} className="size-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{i + 1}. {s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.country} · {s.days} days · ${s.budget}</div>
                </div>
                <div className="hidden sm:flex flex-col items-end text-xs text-muted-foreground gap-0.5">
                  <span>☀️ 18°</span>
                  <span className="text-primary font-semibold">AI 96</span>
                </div>
                <button className="glass rounded-xl p-2 hover:bg-destructive/20 transition" onClick={() => setStops(stops.filter(x => x.id !== s.id))}>
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Preferences */}
        <GlassCard>
          <div className="font-bold mb-3">Travel style</div>
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <button key={s} onClick={() => setStyle(s)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${style === s ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}>
                {s}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Day-by-day timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-lg">Day 3 · Kyoto</div>
            <div className="flex gap-1">
              {[1,2,3,4,5,6,7].map(d => (
                <button key={d} className={`size-8 rounded-xl text-xs font-semibold transition ${d===3 ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {daySchedule.map((slot) => (
              <div key={slot.time}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><span>{slot.icon}</span> {slot.time}</div>
                <div className="space-y-2">
                  {slot.items.map((it) => (
                    <GlassCard key={it.title} className="p-4 hover-lift">
                      <div className="flex items-center gap-4">
                        <div className="text-center shrink-0">
                          <div className="font-black text-sm">{it.time}</div>
                          <div className="text-[10px] text-muted-foreground">{it.dur}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold">{it.title}</div>
                          <div className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-1">
                            <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {it.transport}</span>
                            <span className="inline-flex items-center gap-1"><DollarSign className="size-3" /> {it.cost === 0 ? "Free" : `$${it.cost}`}</span>
                            <span className="inline-flex items-center gap-1"><Sun className="size-3" /> 22°</span>
                          </div>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-1">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">AI 94</span>
                          <button className="text-xs text-muted-foreground hover:text-foreground">Replace</button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live budget */}
        <GlassCard variant="strong" className="sticky bottom-0">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
            <div>
              <div className="text-xs text-muted-foreground">Flights</div>
              <div className="font-black">$1,820</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Stays</div>
              <div className="font-black">${stops.reduce((s,x)=>s+x.budget,0)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Food</div>
              <div className="font-black">$540</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="font-black text-primary text-xl">${totalBudget.toLocaleString()}</div>
            </div>
            <div className="col-span-2 md:col-span-1 text-right">
              <div className="text-xs text-muted-foreground">Budget left</div>
              <div className="font-black text-warm">$920</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI conversation panel */}
      <div className="glass-strong rounded-3xl flex flex-col h-full min-h-0">
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-emerald to-sky grid place-items-center animate-pulse-glow">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="font-bold">Trailvia AI</div>
            <div className="text-xs text-muted-foreground">Explaining every choice</div>
          </div>
          <button className="glass rounded-xl p-2"><Zap className="size-4 text-warm" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {aiMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
                {m.text}
              </div>
            </div>
          ))}
          <div className="glass rounded-2xl px-4 py-3 text-sm inline-flex items-center gap-2 animate-fade-up">
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="size-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="size-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-muted-foreground">AI thinking...</span>
          </div>
        </div>
        <div className="p-3 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {["Skip museums", "Add beach day", "Reduce budget", "Move to Day 5", "Local food only"].map(s => (
              <button key={s} className="text-[11px] glass rounded-full px-2.5 py-1 hover:bg-primary/5">{s}</button>
            ))}
          </div>
          <div className="glass rounded-2xl flex items-center gap-2 pl-4 pr-2 py-2">
            <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Ask anything — 'add a hidden ramen spot'" className="flex-1 bg-transparent outline-none text-sm" />
            <button className="size-9 rounded-xl bg-primary text-primary-foreground grid place-items-center hover:opacity-90">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
