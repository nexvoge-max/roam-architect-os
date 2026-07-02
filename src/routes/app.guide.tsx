import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { guides, trips, notifications } from "@/lib/mock-data";
import {
  Compass, MapPin, Star, Shield, Radio, Sparkles, TrendingUp, Clock,
  MessageCircle, Phone, Navigation, CheckCircle2, AlertTriangle, Calendar,
  Users, DollarSign, ChevronRight, Activity,
} from "lucide-react";

export const Route = createFileRoute("/app/guide")({
  head: () => ({
    meta: [
      { title: "Journey Companion — Trailvia" },
      { name: "description", content: "Live guide dashboard, trip operations, and traveler care — one premium control center." },
    ],
  }),
  component: GuideDashboard,
});

const stats = [
  { label: "Active trips", value: "3", delta: "+1 this week", tone: "emerald", icon: Activity },
  { label: "Travelers under care", value: "12", delta: "4 arriving today", tone: "sky", icon: Users },
  { label: "Avg rating", value: "4.96", delta: "Top 2% globally", tone: "warm", icon: Star },
  { label: "Revenue (MTD)", value: "$8,420", delta: "+18% vs last mo", tone: "coral", icon: DollarSign },
];

const timeline = [
  { time: "08:00", title: "Meet travelers · Gion Hotel", detail: "Yuki + 4 guests · Kyoto walking tour", status: "upcoming", tone: "sky" },
  { time: "10:30", title: "Fushimi Inari · Sunrise route", detail: "Reserved side path · low crowd window", status: "in-progress", tone: "emerald" },
  { time: "13:15", title: "Tea ceremony · Nishijin", detail: "Private host confirmed", status: "confirmed", tone: "emerald" },
  { time: "17:00", title: "Handoff to Osaka guide", detail: "Aditya S. · Shinkansen platform 14", status: "pending", tone: "warm" },
  { time: "20:00", title: "Debrief + rating window", detail: "Auto-send survey", status: "scheduled", tone: "sky" },
];

const alerts = [
  { icon: AlertTriangle, tone: "coral", title: "Rain forecast at 15:00", detail: "Auto-swapped garden visit → covered market. Travelers notified." },
  { icon: Shield, tone: "emerald", title: "All travelers checked in", detail: "SOS system armed · location sharing active." },
  { icon: Sparkles, tone: "sky", title: "AI upsell available", detail: "Sunset river cruise · 92% match for this group. +$180 potential." },
];

function GuideDashboard() {
  const you = guides[0];
  const activeTrip = trips[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary inline-flex items-center gap-2">
            <Compass className="size-3.5" /> Journey Companion · Guide OS
          </div>
          <h1 className="mt-1 text-4xl md:text-5xl font-black tracking-tight">Good morning, {you.name.split(" ")[0]}.</h1>
          <div className="text-sm text-muted-foreground">Kyoto · 18° · Cherry Blossom Japan — Day 4 of 14</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="glass rounded-2xl px-4 py-2.5 text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/5">
            <Radio className="size-4 text-emerald" /> Go live
          </button>
          <button className="rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90">
            <Sparkles className="size-4" /> Ask AI copilot
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <GlassCard key={s.label} className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-3xl font-black tracking-tight">{s.value}</div>
                <div className="mt-1 text-[11px] text-muted-foreground inline-flex items-center gap-1">
                  <TrendingUp className="size-3 text-emerald" /> {s.delta}
                </div>
              </div>
              <div className={`size-10 rounded-2xl grid place-items-center bg-${s.tone}/10`}>
                <s.icon className={`size-5 text-${s.tone}`} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Live trip */}
        <GlassCard variant="strong" className="lg:col-span-2 p-0 overflow-hidden">
          <div className="relative h-48">
            <img src={activeTrip.cover} className="size-full object-cover" alt={activeTrip.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Live · in progress
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <div className="text-xs text-muted-foreground">Active trip</div>
              <div className="text-2xl font-black tracking-tight">{activeTrip.title}</div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
                <MapPin className="size-3" /> {activeTrip.destinations.join(" → ")}
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold inline-flex items-center gap-2"><Clock className="size-4 text-primary" /> Today's itinerary</div>
              <button className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">Full plan <ChevronRight className="size-3" /></button>
            </div>
            <ol className="relative space-y-3 pl-4 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {timeline.map((t) => (
                <li key={t.time} className="relative">
                  <span className={`absolute -left-[11px] top-1.5 size-2.5 rounded-full bg-${t.tone} ring-4 ring-background`} />
                  <div className="glass-subtle rounded-2xl px-3 py-2.5 flex items-center gap-3">
                    <div className="text-xs font-mono text-muted-foreground w-12 shrink-0">{t.time}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{t.title}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{t.detail}</div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-semibold text-${t.tone} glass rounded-full px-2 py-0.5 shrink-0`}>{t.status}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </GlassCard>

        {/* Right column */}
        <div className="space-y-5">
          {/* Traveler care */}
          <GlassCard variant="strong">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold inline-flex items-center gap-2"><Users className="size-4 text-primary" /> Travelers</div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">4 in group</span>
            </div>
            <div className="space-y-2">
              {["Maya R.", "Jamal T.", "Elena V.", "Priya S."].map((n, i) => (
                <div key={n} className="glass rounded-2xl p-2.5 flex items-center gap-3">
                  <div className={`size-9 rounded-full bg-gradient-to-br ${["from-warm to-coral","from-sky to-emerald","from-emerald to-warm","from-coral to-sky"][i]} grid place-items-center text-xs font-bold`}>{n[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{n}</div>
                    <div className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald" /> Checked in · 2m ago
                    </div>
                  </div>
                  <button className="glass rounded-xl p-1.5 hover:bg-white/5"><MessageCircle className="size-3.5" /></button>
                  <button className="glass rounded-xl p-1.5 hover:bg-white/5"><Phone className="size-3.5" /></button>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full rounded-2xl bg-coral/15 text-coral text-xs font-semibold py-2.5 hover:bg-coral/20 inline-flex items-center justify-center gap-2">
              <Shield className="size-3.5" /> Trigger emergency protocol
            </button>
          </GlassCard>

          {/* AI copilot */}
          <GlassCard className="relative overflow-hidden">
            <div className="absolute -top-8 -right-8 size-32 rounded-full bg-emerald/20 blur-3xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-primary inline-flex items-center gap-1.5">
                <Sparkles className="size-3" /> AI Copilot
              </div>
              <div className="mt-2 text-sm">
                Weather shift at 15:00. I've drafted a swap — <b>Nishiki Market</b> instead of Ryoanji Garden. Auto-notify travelers?
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="rounded-xl bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5"><CheckCircle2 className="size-3 inline mr-1" /> Apply</button>
                <button className="glass rounded-xl text-xs font-semibold px-3 py-1.5">Ask again</button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Alerts + ops row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard variant="strong" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold inline-flex items-center gap-2"><Navigation className="size-4 text-primary" /> Live operations</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Auto-updated · 12s ago</div>
          </div>
          <div className="space-y-2.5">
            {alerts.map((a, i) => (
              <div key={i} className="glass rounded-2xl p-3.5 flex items-start gap-3">
                <div className={`size-9 rounded-xl bg-${a.tone}/10 text-${a.tone} grid place-items-center shrink-0`}>
                  <a.icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground">{a.detail}</div>
                </div>
                <button className="text-[11px] font-semibold text-muted-foreground hover:text-foreground">View</button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard variant="strong">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold inline-flex items-center gap-2"><Calendar className="size-4 text-primary" /> Upcoming</div>
            <button className="text-[11px] text-muted-foreground hover:text-foreground">All</button>
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="glass-subtle rounded-2xl p-2.5 flex items-center gap-3">
                <div className={`size-8 rounded-xl bg-${n.tone}/10 grid place-items-center text-sm`}>{n.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{n.title}</div>
                  <div className="text-[10px] text-muted-foreground">{n.time} ago</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
