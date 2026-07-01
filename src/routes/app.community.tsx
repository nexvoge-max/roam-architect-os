import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { communityPosts } from "@/lib/mock-data";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/community")({
  head: () => ({ meta: [{ title: "Community — Trailvia" }] }),
  component: Community,
});

const tabs = ["Following", "Explore", "Trending", "Nearby", "Friends", "Creators"];
const stories = [
  { name: "Yuki", ring: true }, { name: "Aria", ring: true }, { name: "Marco", ring: false },
  { name: "Elena", ring: true }, { name: "Priya", ring: true }, { name: "Jamal", ring: false }, { name: "Kwame", ring: true },
];

function Community() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Community</h1>
        <div className="text-sm text-muted-foreground">Stories, reels, guides, and travelers around the world.</div>
      </div>

      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
        {stories.map((s, i) => (
          <button key={i} className="flex flex-col items-center gap-1 shrink-0">
            <div className={`size-16 rounded-full p-[3px] ${s.ring ? "bg-gradient-to-tr from-emerald via-sky to-coral" : "bg-white/10"}`}>
              <div className="size-full rounded-full bg-background grid place-items-center overflow-hidden">
                <div className="size-[54px] rounded-full bg-gradient-to-br from-warm to-coral grid place-items-center font-bold">{s.name[0]}</div>
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground">{s.name}</span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t, i) => (
          <button key={t} className={`rounded-full px-4 py-1.5 text-xs font-semibold shrink-0 transition ${i===1 ? "bg-primary text-primary-foreground" : "glass hover:bg-white/5"}`}>{t}</button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {communityPosts.map((p) => (
          <GlassCard key={p.id} variant="strong" className="p-0 overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <img src={p.avatar} className="size-10 rounded-full object-cover" alt={p.user} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{p.user}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><MapPin className="size-3" /> {p.place}</div>
              </div>
              <button className="glass rounded-xl p-2"><MoreHorizontal className="size-4" /></button>
            </div>
            <img src={p.image} className="w-full aspect-square object-cover" alt={p.place} />
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <button className="hover:text-coral transition"><Heart className="size-6" /></button>
                <button className="hover:text-sky transition"><MessageCircle className="size-6" /></button>
                <button className="hover:text-primary transition"><Send className="size-6" /></button>
                <button className="ml-auto hover:text-warm transition"><Bookmark className="size-6" /></button>
              </div>
              <div className="text-sm font-semibold">{p.likes.toLocaleString()} likes</div>
              <p className="text-sm"><span className="font-semibold">{p.user}</span> {p.caption}</p>
              <div className="glass rounded-2xl p-3 text-xs flex items-start gap-2">
                <Sparkles className="size-3.5 text-primary mt-0.5 shrink-0" />
                <span><b>AI summary:</b> Late afternoon shot near Kyoto's east side. Best hour: 5–6 PM. Add to your trip?</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
