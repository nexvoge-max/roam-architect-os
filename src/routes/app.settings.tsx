import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Trailvia" }] }),
  component: Settings,
});

const groups = [
  { title: "Account", items: ["Profile", "Email & phone", "Subscription", "Points & rewards"] },
  { title: "Travel preferences", items: ["Travel style", "Budget range", "Diet", "Companion mode"] },
  { title: "AI", items: ["Planning style", "Conversation tone", "Companion avatar", "Memory"] },
  { title: "Notifications", items: ["Trip alerts", "Guide", "Finance", "Weather", "Community"] },
  { title: "Privacy & security", items: ["Location visibility", "2FA", "Passkeys", "Devices"] },
  { title: "Appearance", items: ["Theme", "Accent color", "Glass intensity", "Reduce motion"] },
  { title: "Offline & storage", items: ["Downloaded maps", "Wallet passes", "Cached content"] },
];

function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary">Preferences</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Settings</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {groups.map(g => (
          <GlassCard key={g.title}>
            <div className="font-bold mb-2">{g.title}</div>
            <div className="space-y-1">
              {g.items.map(i => (
                <button key={i} className="w-full flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm hover:bg-primary/5 transition">
                  <span>{i}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
