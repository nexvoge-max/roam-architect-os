import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { expenseCategories } from "@/lib/mock-data";
import { Sparkles, TrendingDown, TrendingUp, ArrowRight, DollarSign, Users } from "lucide-react";

export const Route = createFileRoute("/app/finance")({
  head: () => ({ meta: [{ title: "Finance — Trailvia" }] }),
  component: Finance,
});

const timeline = [
  { d: "Today · 08:14", place: "Kikunoi dinner reservation deposit", amt: 120, cat: "Food" },
  { d: "Today · 06:40", place: "Kyoto → Nara train", amt: 24, cat: "Transport" },
  { d: "Yesterday · 21:12", place: "Ritz-Carlton Kyoto · night 3", amt: 780, cat: "Hotels" },
  { d: "Yesterday · 12:40", place: "Nishiki Market lunch (split 3-ways)", amt: 22, cat: "Food" },
  { d: "Yesterday · 09:05", place: "Fushimi Inari private guide", amt: 60, cat: "Activities" },
];

const split = [
  { name: "Snehith", paid: 480, owes: 0 },
  { name: "Aria", paid: 220, owes: 40 },
  { name: "Marco", paid: 180, owes: 80 },
];

function Finance() {
  const total = expenseCategories.reduce((s, c) => s + c.value, 0);
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Trip finance</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Money that travels with you</h1>
        </div>
        <div className="glass rounded-2xl px-4 py-2 text-sm">💴 JPY · 1 USD ≈ 152 ¥</div>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: "Total budget", v: "$6,800", tone: "text-foreground" },
          { l: "Spent", v: `$${total.toLocaleString()}`, tone: "text-warm", sub: "60% used", icon: TrendingUp },
          { l: "Remaining", v: `$${(6800-total).toLocaleString()}`, tone: "text-primary", sub: "12 days left" },
          { l: "Predicted total", v: "$6,240", tone: "text-sky", sub: "Under budget", icon: TrendingDown },
        ].map((s) => (
          <GlassCard key={s.l} variant="strong">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            <div className={`text-3xl font-black mt-1 ${s.tone}`}>{s.v}</div>
            {s.sub && <div className="text-[11px] text-muted-foreground mt-1 inline-flex items-center gap-1">{s.icon && <s.icon className="size-3" />} {s.sub}</div>}
          </GlassCard>
        ))}
      </div>

      {/* Category breakdown */}
      <GlassCard variant="strong">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">Category breakdown</div>
          <div className="text-xs text-muted-foreground">Live</div>
        </div>
        <div className="space-y-3">
          {expenseCategories.map(c => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{c.name}</span>
                <span className="font-semibold">${c.value.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-primary/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(c.value/total)*100}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI + Split */}
      <div className="grid lg:grid-cols-2 gap-3">
        <GlassCard variant="strong">
          <div className="flex items-center gap-2 mb-3"><Sparkles className="size-4 text-primary" /><div className="font-bold">Finance AI</div></div>
          <div className="space-y-2">
            <div className="glass rounded-2xl p-3 text-sm">💡 Booking Kikunoi 5 days earlier saves you $46. Want me to move it?</div>
            <div className="glass rounded-2xl p-3 text-sm">⚠️ You're trending 8% over on food. I found 3 highly-rated cheaper alternatives near your hotel.</div>
            <div className="glass rounded-2xl p-3 text-sm">✨ Convert $500 to JPY today — rate is 2.1% better than 7-day average.</div>
          </div>
          <div className="glass rounded-2xl mt-4 flex items-center gap-2 pl-4 pr-2 py-2">
            <input placeholder="Ask: 'Can I afford another hotel?'" className="flex-1 bg-transparent outline-none text-sm" />
            <button className="rounded-xl bg-primary text-primary-foreground p-2 hover:opacity-90"><ArrowRight className="size-4" /></button>
          </div>
        </GlassCard>

        <GlassCard variant="strong">
          <div className="flex items-center gap-2 mb-3"><Users className="size-4 text-primary" /><div className="font-bold">Split expenses</div></div>
          <div className="space-y-2">
            {split.map(s => (
              <div key={s.name} className="glass rounded-2xl p-3 flex items-center gap-3">
                <div className="size-9 rounded-full bg-gradient-to-br from-warm to-coral grid place-items-center font-bold text-sm">{s.name[0]}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">Paid ${s.paid} · Owes ${s.owes}</div>
                </div>
                {s.owes > 0 ? (
                  <button className="text-xs rounded-full bg-primary text-primary-foreground px-3 py-1.5 font-semibold hover:opacity-90">Settle</button>
                ) : (
                  <span className="text-xs text-primary font-semibold">Settled</span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Timeline */}
      <GlassCard>
        <div className="font-bold mb-3">Expense timeline</div>
        <div className="space-y-2">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-primary/5 transition">
              <div className="size-9 rounded-xl glass grid place-items-center"><DollarSign className="size-4 text-primary" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{t.place}</div>
                <div className="text-[11px] text-muted-foreground">{t.d} · {t.cat}</div>
              </div>
              <div className="font-black">${t.amt}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
