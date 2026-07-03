import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { PageHeader, SectionHeader, StatusBadge, TButton } from "@/components/ui-kit";
import { destinations, type Destination } from "@/lib/mock-data";
import {
  Search, Plus, X, Sparkles, Send, MapPin, Star, Clock, Calendar as CalendarIcon,
  Users, Wallet, Compass, CheckCircle2, ArrowRight, GripVertical, Sun, DollarSign,
  Wand2, Route as RouteIcon, Trash2, Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/app/plan")({
  head: () => ({ meta: [{ title: "AI Planner — Trailvia" }] }),
  component: Plan,
});

/* ---------- POI data (per destination) ---------- */
type POI = {
  id: string; name: string; description: string; image: string;
  rating: number; duration: string; category: string;
};

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1200&h=800&q=80`;

const POIS: Record<string, POI[]> = {
  tokyo: [
    { id: "t1", name: "Tokyo Tower", description: "Iconic red lattice tower with panoramic city views.", image: img("1536098561742-ca998e48cbcc"), rating: 4.7, duration: "2h", category: "Landmark" },
    { id: "t2", name: "Shibuya Crossing", description: "The world's busiest and most photogenic intersection.", image: img("1554797589-7241bb691973"), rating: 4.8, duration: "1h", category: "Culture" },
    { id: "t3", name: "Mount Fuji Day Trip", description: "Sacred snow-capped volcano, best viewed at sunrise.", image: img("1570459027562-4a916cc57c9c"), rating: 4.9, duration: "Full day", category: "Nature" },
    { id: "t4", name: "Senso-ji Temple", description: "Tokyo's oldest temple, alive with lanterns and incense.", image: img("1526481280693-3bfa7568e0f3"), rating: 4.8, duration: "2h", category: "Culture" },
    { id: "t5", name: "TeamLab Planets", description: "Immersive digital art you walk through barefoot.", image: img("1554797589-7241bb691973"), rating: 4.9, duration: "3h", category: "Art" },
    { id: "t6", name: "Tsukiji Outer Market", description: "Sushi, uni, and street food from dawn.", image: img("1553621042-f6e147245754"), rating: 4.7, duration: "2h", category: "Food" },
  ],
  kyoto: [
    { id: "k1", name: "Fushimi Inari Shrine", description: "10,000 vermillion torii gates winding up the mountain.", image: img("1528360983277-13d401cdc186"), rating: 4.9, duration: "3h", category: "Culture" },
    { id: "k2", name: "Arashiyama Bamboo Grove", description: "Emerald bamboo forest that sings in the wind.", image: img("1493976040374-85c8e12f0c0e"), rating: 4.8, duration: "2h", category: "Nature" },
    { id: "k3", name: "Kinkaku-ji Golden Pavilion", description: "Zen temple wrapped in gold leaf, mirrored in a pond.", image: img("1524413840807-0c3cb6fa808d"), rating: 4.8, duration: "1.5h", category: "Culture" },
    { id: "k4", name: "Gion District", description: "Historic geisha quarter of lantern-lit lanes.", image: img("1545569341-9eb8b30979d9"), rating: 4.7, duration: "2h", category: "Culture" },
    { id: "k5", name: "Nishiki Market", description: "Five-block food alley — Kyoto's kitchen.", image: img("1553621042-f6e147245754"), rating: 4.6, duration: "1.5h", category: "Food" },
    { id: "k6", name: "Kiyomizu-dera", description: "Wooden stage temple with sweeping city views.", image: img("1478436127897-769e1538f1a2"), rating: 4.8, duration: "2h", category: "Culture" },
  ],
  bali: [
    { id: "b1", name: "Tegallalang Rice Terraces", description: "Emerald stepped fields carved into the valley.", image: img("1537996194471-e657df975ab4"), rating: 4.7, duration: "2h", category: "Nature" },
    { id: "b2", name: "Uluwatu Temple", description: "Clifftop temple with fire dance at sunset.", image: img("1518548419970-58e3b4079ab2"), rating: 4.8, duration: "2h", category: "Culture" },
    { id: "b3", name: "Sacred Monkey Forest", description: "Ancient banyans, moss temples, cheeky macaques.", image: img("1544644181-1484b3fdfc62"), rating: 4.5, duration: "1.5h", category: "Nature" },
    { id: "b4", name: "Mount Batur Sunrise Trek", description: "Volcanic hike ending above the clouds.", image: img("1470240731273-7821a6eeb6bd"), rating: 4.9, duration: "6h", category: "Adventure" },
  ],
  santorini: [
    { id: "s1", name: "Oia Sunset Point", description: "The most photographed sunset in the world.", image: img("1613395877344-13d4a8e0d49e"), rating: 4.9, duration: "2h", category: "Landmark" },
    { id: "s2", name: "Red Beach", description: "Crimson volcanic cliffs meet the Aegean.", image: img("1570077188670-e3a8d69ac5ff"), rating: 4.6, duration: "3h", category: "Nature" },
    { id: "s3", name: "Ancient Akrotiri", description: "Minoan city preserved in volcanic ash.", image: img("1533105079780-92b9be482077"), rating: 4.7, duration: "2h", category: "Culture" },
    { id: "s4", name: "Catamaran Caldera Cruise", description: "Sail past white cliffs to hot springs.", image: img("1507525428034-b723cf961d3e"), rating: 4.8, duration: "5h", category: "Adventure" },
  ],
};

const defaultPOIs: POI[] = [
  { id: "d1", name: "Old Town Walking Tour", description: "Locally guided stroll through the historic quarter.", image: img("1499856871958-5b9627545d1a"), rating: 4.7, duration: "2h", category: "Culture" },
  { id: "d2", name: "Sunset Viewpoint", description: "Panorama over the skyline at golden hour.", image: img("1470240731273-7821a6eeb6bd"), rating: 4.8, duration: "1h", category: "Landmark" },
  { id: "d3", name: "Local Food Market", description: "Street food, spices, and small producers.", image: img("1553621042-f6e147245754"), rating: 4.6, duration: "2h", category: "Food" },
  { id: "d4", name: "Nature Escape", description: "Half-day trip to the nearest wild landscape.", image: img("1500534314209-a25ddb2bd429"), rating: 4.8, duration: "Half day", category: "Nature" },
];

const poisFor = (destId: string) => POIS[destId] ?? defaultPOIs;

/* ---------- Types ---------- */
type Selected = { dest: Destination; pois: POI[] };

type Phase = "search" | "assistant" | "generating" | "dashboard";

/* ---------- Component ---------- */
function Plan() {
  const [phase, setPhase] = useState<Phase>("search");
  const [query, setQuery] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const [active, setActive] = useState<Destination | null>(null);
  const [selected, setSelected] = useState<Selected[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setOpenSuggest(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations.slice(0, 6);
    return destinations.filter(d =>
      d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.tags.join(" ").toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  const totalPlaces = selected.reduce((s, x) => s + x.pois.length, 0);
  const canGenerate = selected.length > 0;

  const pickDestination = (d: Destination) => {
    setActive(d);
    setOpenSuggest(false);
    setQuery("");
    if (!selected.some(s => s.dest.id === d.id)) {
      setSelected(prev => [...prev, { dest: d, pois: [] }]);
    }
  };

  const togglePOI = (destId: string, poi: POI) => {
    setSelected(prev => prev.map(s => {
      if (s.dest.id !== destId) return s;
      const has = s.pois.some(p => p.id === poi.id);
      return { ...s, pois: has ? s.pois.filter(p => p.id !== poi.id) : [...s.pois, poi] };
    }));
  };

  const removeDest = (destId: string) => {
    setSelected(prev => prev.filter(s => s.dest.id !== destId));
    if (active?.id === destId) setActive(null);
  };

  const move = (i: number, dir: -1 | 1) => {
    setSelected(prev => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  if (phase === "assistant") return <AssistantModal onClose={() => setPhase("search")} onDone={() => setPhase("generating")} />;
  if (phase === "generating") return <GeneratingScreen onDone={() => setPhase("dashboard")} />;
  if (phase === "dashboard") return <PlanningDashboard selected={selected} onEdit={() => setPhase("search")} />;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24">
      <PageHeader
        eyebrow="AI Planner"
        title="Design your next journey"
        subtitle="Search a place, add what excites you, and let Trailvia AI shape the perfect itinerary."
        icon={Sparkles}
      />

      {/* Step 1 — Search */}
      <div ref={searchRef} className="relative">
        <div className="glass-strong rounded-3xl p-2 flex items-center gap-2 ring-1 ring-primary/10 focus-within:ring-primary/30 transition">
          <div className="size-12 rounded-2xl bg-primary/10 grid place-items-center shrink-0">
            <Search className="size-5 text-primary" />
          </div>
          <input
            value={query}
            onFocus={() => setOpenSuggest(true)}
            onChange={(e) => { setQuery(e.target.value); setOpenSuggest(true); }}
            placeholder="Where would you like to travel?"
            className="flex-1 bg-transparent outline-none px-2 py-3 text-lg placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} className="glass rounded-xl p-2 hover:bg-primary/5">
              <X className="size-4" />
            </button>
          )}
        </div>

        {openSuggest && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-30 glass-strong rounded-3xl p-2 shadow-lg animate-fade-up max-h-[420px] overflow-y-auto">
            {suggestions.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDestination(d)}
                className="w-full flex items-center gap-3 rounded-2xl p-2.5 hover:bg-primary/5 transition text-left"
              >
                <img src={d.image} alt={d.name} className="size-14 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold truncate">{d.name}</span>
                    <span className="text-xs text-muted-foreground">· {d.country}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{d.tagline}</div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold"><Star className="size-3 fill-warm text-warm" /> {d.rating}</span>
                  <StatusBadge tone="sky">Best {d.season.split("·")[0].trim()}</StatusBadge>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Step 3 — My Journey (chips) */}
      {selected.length > 0 && (
        <GlassCard variant="strong" className="animate-fade-up">
          <SectionHeader
            eyebrow="My Journey"
            title={`${selected.length} destination${selected.length === 1 ? "" : "s"} · ${totalPlaces} place${totalPlaces === 1 ? "" : "s"}`}
            subtitle="Drag to reorder or remove."
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {selected.map((s, i) => (
              <div
                key={s.dest.id}
                className={`group flex items-center gap-2 pl-2 pr-1 py-1 rounded-full glass hover:bg-primary/5 transition ${active?.id === s.dest.id ? "ring-2 ring-primary/40" : ""}`}
              >
                <button onClick={() => move(i, -1)} className="text-muted-foreground/60 hover:text-foreground p-1" title="Move up"><GripVertical className="size-3.5" /></button>
                <button onClick={() => setActive(s.dest)} className="flex items-center gap-2">
                  <img src={s.dest.image} alt={s.dest.name} className="size-7 rounded-full object-cover" />
                  <span className="text-sm font-semibold">{s.dest.name}</span>
                  {s.pois.length > 0 && (
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">{s.pois.length}</span>
                  )}
                  <CheckCircle2 className="size-4 text-emerald" />
                </button>
                <button onClick={() => removeDest(s.dest.id)} className="p-1.5 rounded-full hover:bg-coral/15 text-muted-foreground hover:text-coral transition">
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Step 2 — Explorer */}
      {active && (
        <div className="space-y-4 animate-fade-up">
          <SectionHeader
            eyebrow={`Exploring · ${active.country}`}
            title={`Popular in ${active.name}`}
            subtitle="Tap places to add them to your journey."
            actions={
              <TButton variant="secondary" onClick={() => setActive(null)}>
                Change destination
              </TButton>
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {poisFor(active.id).map((p, idx) => {
              const added = selected.find(s => s.dest.id === active.id)?.pois.some(x => x.id === p.id);
              return (
                <div
                  key={p.id}
                  className="glass rounded-3xl overflow-hidden hover-lift animate-fade-up"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="relative h-40">
                    <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <StatusBadge tone="primary">{p.category}</StatusBadge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold">
                        <Star className="size-3 fill-warm text-warm" /> {p.rating}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold">
                        <Clock className="size-3" /> {p.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</div>
                    <button
                      onClick={() => togglePOI(active.id, p)}
                      className={`mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        added ? "bg-emerald/15 text-emerald" : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {added ? <><CheckCircle2 className="size-4" /> Added</> : <><Plus className="size-4" /> Add</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state (before first pick) */}
      {!active && selected.length === 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.slice(0, 6).map((d, i) => (
            <button
              key={d.id}
              onClick={() => pickDestination(d)}
              className="glass rounded-3xl overflow-hidden hover-lift text-left animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="relative h-40">
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3"><StatusBadge tone="sky">Best {d.season.split("·")[0].trim()}</StatusBadge></div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">{d.name}</div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold"><Star className="size-3 fill-warm text-warm" /> {d.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{d.country} · {d.tagline}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 4 — Generate CTA (sticky) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 animate-fade-up">
        <button
          disabled={!canGenerate}
          onClick={() => setPhase("assistant")}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold shadow-lg transition ${
            canGenerate
              ? "bg-primary text-primary-foreground hover:opacity-90 glow-emerald"
              : "glass text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Sparkles className="size-4" />
          Generate My Trip
          {canGenerate && <ArrowRight className="size-4" />}
        </button>
      </div>
    </div>
  );
}

/* ---------- Step 5 — Assistant Modal ---------- */
type Answers = {
  when?: string;
  who?: string;
  budget?: number;
  vibes: string[];
  companion?: string;
};

const AVATAR = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80";

function AssistantModal({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ vibes: [] });

  const advance = () => setStep(s => s + 1);

  const questions = [
    {
      prompt: "Hi! I'm Ava, your travel companion. When are you travelling?",
      body: <DatePick value={answers.when} onChange={(v) => { setAnswers(a => ({ ...a, when: v })); advance(); }} />,
    },
    {
      prompt: "Lovely. Who's travelling with you?",
      body: <ChipPick options={["Solo", "Couple", "Friends", "Family"]} value={answers.who} onChange={(v) => { setAnswers(a => ({ ...a, who: v })); advance(); }} />,
    },
    {
      prompt: "What's your approximate budget per person?",
      body: <BudgetSlider onDone={(v) => { setAnswers(a => ({ ...a, budget: v })); advance(); }} />,
    },
    {
      prompt: "What kind of experiences are you dreaming of?",
      body: <MultiPick
        options={["Adventure", "Food", "Culture", "Photography", "Shopping", "Nature", "Luxury", "Hidden Gems", "Relaxation"]}
        value={answers.vibes}
        onChange={(vibes) => setAnswers(a => ({ ...a, vibes }))}
        onDone={advance}
      />,
    },
    {
      prompt: "Would you like a local Journey Companion to guide you?",
      body: <ChipPick options={["Yes", "No", "Maybe later"]} value={answers.companion} onChange={(v) => { setAnswers(a => ({ ...a, companion: v })); setTimeout(onDone, 300); }} />,
    },
  ];

  const q = questions[Math.min(step, questions.length - 1)];

  return (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-md grid place-items-center p-4 animate-fade-up">
      <div className="glass-strong rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between p-5 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={AVATAR} alt="Ava" className="size-11 rounded-full object-cover ring-2 ring-primary/30" />
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald ring-2 ring-background animate-pulse" />
            </div>
            <div>
              <div className="font-bold flex items-center gap-2">Ava · Trailvia AI <Sparkles className="size-3.5 text-primary" /></div>
              <div className="text-xs text-muted-foreground">Planning your journey · Step {Math.min(step + 1, questions.length)} of {questions.length}</div>
            </div>
          </div>
          <button onClick={onClose} className="glass rounded-xl p-2 hover:bg-primary/5"><X className="size-4" /></button>
        </div>

        {/* progress */}
        <div className="h-1 bg-primary/5">
          <div className="h-full bg-primary transition-all" style={{ width: `${((step) / questions.length) * 100}%` }} />
        </div>

        {/* body */}
        <div className="p-6 space-y-5 min-h-[280px]">
          <div key={step} className="flex gap-3 animate-fade-up">
            <img src={AVATAR} alt="" className="size-9 rounded-full object-cover shrink-0" />
            <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed max-w-[85%]">
              {q.prompt}
            </div>
          </div>
          <div className="pl-12 animate-fade-up" style={{ animationDelay: "120ms" }}>
            {q.body}
          </div>
        </div>
      </div>
    </div>
  );
}

function DatePick({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const today = new Date();
  const opts = Array.from({ length: 8 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i * 14);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  });
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2"><CalendarIcon className="size-3.5" /> Pick a start date</div>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${value === o ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChipPick({ options, value, onChange }: { options: string[]; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${value === o ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function BudgetSlider({ onDone }: { onDone: (v: number) => void }) {
  const [v, setV] = useState(50);
  const label = v < 33 ? "Budget" : v < 66 ? "Premium" : "Luxury";
  const est = 800 + Math.round((v / 100) * 6500);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">${est.toLocaleString()}<span className="text-sm text-muted-foreground font-medium"> / person</span></div>
        <StatusBadge tone="primary">{label}</StatusBadge>
      </div>
      <input
        type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>Budget</span><span>Premium</span><span>Luxury</span>
      </div>
      <TButton onClick={() => onDone(est)} className="w-full mt-2">Continue</TButton>
    </div>
  );
}

function MultiPick({ options, value, onChange, onDone }: { options: string[]; value: string[]; onChange: (v: string[]) => void; onDone: () => void }) {
  const toggle = (o: string) => onChange(value.includes(o) ? value.filter(x => x !== o) : [...value, o]);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => toggle(o)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${value.includes(o) ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}
          >
            {o}
          </button>
        ))}
      </div>
      <TButton onClick={onDone} className="w-full" disabled={value.length === 0}>Continue</TButton>
    </div>
  );
}

/* ---------- Step 6 — Generating ---------- */
const STEPS = [
  "Finding flights",
  "Finding hotels",
  "Planning best route",
  "Checking weather",
  "Finding hidden gems",
  "Estimating travel time",
  "Optimizing transportation",
  "Matching Journey Companion",
  "Generating itinerary",
];

function GeneratingScreen({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= STEPS.length) { const t = setTimeout(onDone, 500); return () => clearTimeout(t); }
    const t = setTimeout(() => setI(i + 1), 550);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md grid place-items-center p-4">
      <div className="glass-strong rounded-3xl w-full max-w-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-2xl bg-linear-to-br from-emerald to-sky grid place-items-center animate-pulse-glow">
            <Sparkles className="size-6 text-primary-foreground" />
          </div>
          <div>
            <div className="font-black text-xl tracking-tight">Crafting your journey…</div>
            <div className="text-xs text-muted-foreground">Trailvia AI is working on your itinerary</div>
          </div>
        </div>
        <ul className="space-y-2">
          {STEPS.map((s, idx) => {
            const done = idx < i;
            const active = idx === i;
            return (
              <li key={s} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition ${active ? "bg-primary/5" : ""}`}>
                <span className={`size-6 rounded-full grid place-items-center transition ${done ? "bg-emerald/15 text-emerald" : active ? "bg-primary/15 text-primary" : "bg-primary/5 text-muted-foreground"}`}>
                  {done ? <CheckCircle2 className="size-4" /> : active ? <span className="size-1.5 rounded-full bg-primary animate-pulse" /> : <span className="size-1.5 rounded-full bg-muted-foreground/40" />}
                </span>
                <span className={`text-sm font-semibold ${done ? "text-foreground" : active ? "text-foreground" : "text-muted-foreground"}`}>{s}{active ? "…" : ""}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Step 7 — Dashboard ---------- */
function PlanningDashboard({ selected, onEdit }: { selected: Selected[]; onEdit: () => void }) {
  const stops = selected.length
    ? selected.map((s, i) => ({ id: s.dest.id, name: s.dest.name, country: s.dest.country, days: 3 + (i % 3), image: s.dest.image, budget: 780 + i * 200 }))
    : [{ id: "kyoto", name: "Kyoto", country: "Japan", days: 5, image: destinations.find(d => d.id === "kyoto")!.image, budget: 1180 }];

  const [msg, setMsg] = useState("");
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
    { role: "ai", text: `Journey ready — I stitched together ${stops.map(s => s.name).join(", ")} into a smooth loop. Ask me to swap anything.` },
    { role: "user", text: "Add more food stops in the evenings." },
    { role: "ai", text: "Done. I dropped two more izakayas and a night market into your evenings. Food budget +$85 — still within your target." },
  ];
  const totalBudget = stops.reduce((s, x) => s + x.budget, 0) + 1820 + 540;

  return (
    <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-4 h-[calc(100vh-8rem)]">
      <div className="overflow-y-auto space-y-4 pr-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Planning workspace</div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Your journey</h1>
            <div className="text-sm text-muted-foreground">{stops.length} stops · {stops.reduce((s, x) => s + x.days, 0)} days</div>
          </div>
          <div className="flex items-center gap-2">
            <TButton variant="secondary" onClick={onEdit}>Edit trip</TButton>
            <button className="rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-2">
              <Wand2 className="size-4" /> Optimize
            </button>
          </div>
        </div>

        <GlassCard variant="strong">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold flex items-center gap-2"><RouteIcon className="size-4 text-primary" /> Route</div>
            <StatusBadge tone="emerald">AI Optimized</StatusBadge>
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
                <button className="glass rounded-xl p-2 hover:bg-coral/15 transition"><Trash2 className="size-3.5" /></button>
              </div>
            ))}
          </div>
        </GlassCard>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-lg">Today · {stops[0]?.name}</div>
            <div className="flex gap-1">
              {[1,2,3,4,5,6,7].map(d => (
                <button key={d} className={`size-8 rounded-xl text-xs font-semibold transition ${d===1 ? "bg-primary text-primary-foreground" : "glass hover:bg-primary/5"}`}>{d}</button>
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
                        <StatusBadge tone="primary">AI 94</StatusBadge>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <GlassCard className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Hotels</div>
            <div className="font-black text-lg mt-1">4 confirmed</div>
            <div className="text-xs text-muted-foreground">AI match 96</div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Flights</div>
            <div className="font-black text-lg mt-1">2 legs · $1,820</div>
            <div className="text-xs text-emerald">Best value</div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Companion</div>
            <div className="font-black text-lg mt-1">Yuki T.</div>
            <div className="text-xs text-muted-foreground">Kyoto · ⭐ 4.98</div>
          </GlassCard>
        </div>

        <GlassCard variant="strong" className="sticky bottom-0">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
            <div><div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Wallet className="size-3" /> Flights</div><div className="font-black">$1,820</div></div>
            <div><div className="text-xs text-muted-foreground">Stays</div><div className="font-black">${stops.reduce((s,x)=>s+x.budget,0)}</div></div>
            <div><div className="text-xs text-muted-foreground">Food</div><div className="font-black">$540</div></div>
            <div><div className="text-xs text-muted-foreground">Total</div><div className="font-black text-primary text-xl">${totalBudget.toLocaleString()}</div></div>
            <div className="col-span-2 md:col-span-1 text-right"><div className="text-xs text-muted-foreground">Budget left</div><div className="font-black text-warm">$920</div></div>
          </div>
        </GlassCard>
      </div>

      {/* AI panel */}
      <div className="glass-strong rounded-3xl flex flex-col h-full min-h-0">
        <div className="p-5 border-b border-primary/10 flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-linear-to-br from-emerald to-sky grid place-items-center animate-pulse-glow">
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
        </div>
        <div className="p-3 border-t border-primary/10">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {["Add beach day", "Cheaper hotels", "More culture", "Slower pace"].map(s => (
              <button key={s} className="text-[11px] glass rounded-full px-2.5 py-1 hover:bg-primary/5">{s}</button>
            ))}
          </div>
          <div className="glass rounded-2xl flex items-center gap-2 pl-4 pr-2 py-2">
            <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Ask anything about your trip…" className="flex-1 bg-transparent outline-none text-sm" />
            <button className="size-9 rounded-xl bg-primary text-primary-foreground grid place-items-center hover:opacity-90">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
