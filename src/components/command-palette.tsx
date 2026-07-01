import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Compass, Map, Wallet, Backpack, Users, Newspaper, Plane, Hotel, Settings, Sparkles, Home, Route as RouteIcon, Search as SearchIcon } from "lucide-react";
import { destinations, guides } from "@/lib/mock-data";

const pages = [
  { title: "Home", icon: Home, to: "/app" },
  { title: "AI Planner", icon: Sparkles, to: "/app/plan" },
  { title: "Maps & Navigation", icon: Map, to: "/app/maps" },
  { title: "Trips", icon: RouteIcon, to: "/app/trips" },
  { title: "Community", icon: Users, to: "/app/community" },
  { title: "Finance", icon: Wallet, to: "/app/finance" },
  { title: "Smart Backpack", icon: Backpack, to: "/app/backpack" },
  { title: "News", icon: Newspaper, to: "/app/news" },
  { title: "Hotels", icon: Hotel, to: "/app/hotels" },
  { title: "Flights", icon: Plane, to: "/app/flights" },
  { title: "Settings", icon: Settings, to: "/app/settings" },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const go = (to: string) => { onOpenChange(false); navigate({ to }); };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search anywhere — trips, places, guides, settings..." />
      <CommandList>
        <CommandEmpty>No results. Try "Kyoto" or "budget".</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((p) => (
            <CommandItem key={p.to} onSelect={() => go(p.to)}>
              <p.icon className="size-4" /> {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Destinations">
          {destinations.slice(0, 6).map((d) => (
            <CommandItem key={d.id} onSelect={() => go("/app/plan")}>
              <Compass className="size-4" /> {d.name}, {d.country}
              <span className="ml-auto text-xs text-muted-foreground">{d.season}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Guides">
          {guides.slice(0, 3).map((g) => (
            <CommandItem key={g.id} onSelect={() => go("/app/community")}>
              <Users className="size-4" /> {g.name} · {g.city}
              <span className="ml-auto text-xs text-muted-foreground">{g.matchPct}% match</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="AI Actions">
          <CommandItem onSelect={() => go("/app/plan")}><Sparkles className="size-4" /> Plan a 5-day trip to Japan</CommandItem>
          <CommandItem onSelect={() => go("/app/finance")}><Sparkles className="size-4" /> Split my last dinner expense</CommandItem>
          <CommandItem onSelect={() => go("/app/backpack")}><Sparkles className="size-4" /> Pack my backpack for Iceland</CommandItem>
          <CommandItem onSelect={() => go("/app/maps")}><Sparkles className="size-4" /> Find scenic route with coffee stop</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="glass hidden md:flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-muted-foreground w-[380px] hover:bg-white/5 transition"
    >
      <SearchIcon className="size-4" />
      <span>Search anything — places, trips, guides...</span>
      <kbd className="ml-auto text-[10px] font-semibold glass-subtle rounded-md px-1.5 py-0.5">⌘K</kbd>
    </button>
  );
}
