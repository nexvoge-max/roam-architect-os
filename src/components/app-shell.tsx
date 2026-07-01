import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, Map, Route as RouteIcon, Users, Wallet, Backpack, Newspaper, Hotel, Plane, Bus, Settings, Bell, User } from "lucide-react";
import { CommandPalette, CommandTrigger } from "./command-palette";
import { cn } from "@/lib/utils";

const primary = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/plan", label: "Plan", icon: Sparkles },
  { to: "/app/maps", label: "Maps", icon: Map },
  { to: "/app/trips", label: "Trips", icon: RouteIcon },
  { to: "/app/community", label: "Community", icon: Users },
];
const secondary = [
  { to: "/app/finance", label: "Finance", icon: Wallet },
  { to: "/app/backpack", label: "Backpack", icon: Backpack },
  { to: "/app/news", label: "News", icon: Newspaper },
  { to: "/app/hotels", label: "Hotels", icon: Hotel },
  { to: "/app/flights", label: "Flights", icon: Plane },
  { to: "/app/transport", label: "Transport", icon: Bus },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string, exact?: boolean) => (exact ? pathname === to : pathname === to || pathname.startsWith(to + "/"));

  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-[260px] shrink-0 flex-col glass border-r border-white/5">
        <div className="px-6 pt-6 pb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-emerald to-sky grid place-items-center font-black text-primary-foreground animate-pulse-glow">T</div>
            <div>
              <div className="font-black tracking-tight">Trailvia</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Travel OS</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1">
          <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Explore</div>
          {primary.map((i) => (
            <NavItem key={i.to} {...i} active={isActive(i.to, i.exact)} />
          ))}
          <div className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Tools</div>
          {secondary.map((i) => (
            <NavItem key={i.to} {...i} active={isActive(i.to)} />
          ))}
        </nav>
        <div className="mx-3 mb-4 glass-strong rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-br from-warm to-coral grid place-items-center font-bold">S</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Snehith</div>
              <div className="text-[11px] text-muted-foreground truncate">Premium · 12,480 pts</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass border-b border-white/5">
          <div className="flex items-center gap-3 px-4 lg:px-8 h-16">
            <Link to="/" className="lg:hidden flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-emerald to-sky grid place-items-center font-black text-primary-foreground">T</div>
              <span className="font-black tracking-tight">Trailvia</span>
            </Link>
            <div className="flex-1 flex justify-center">
              <CommandTrigger onClick={() => setCmdOpen(true)} />
              <button onClick={() => setCmdOpen(true)} className="md:hidden glass rounded-2xl p-2.5"><Sparkles className="size-4" /></button>
            </div>
            <button className="relative glass rounded-2xl p-2.5 hover:bg-white/5 transition">
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-coral" />
            </button>
            <button className="glass rounded-2xl p-1 pr-3 hidden sm:flex items-center gap-2 hover:bg-white/5 transition">
              <div className="size-7 rounded-xl bg-gradient-to-br from-warm to-coral grid place-items-center text-xs font-bold">S</div>
              <span className="text-xs font-semibold">Snehith</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>

        {/* Bottom nav - mobile */}
        <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-3xl px-2 py-2 flex items-center justify-around">
          {primary.map((i) => {
            const active = isActive(i.to, i.exact);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition",
                  active ? "bg-white/10 text-foreground" : "text-muted-foreground",
                )}
              >
                <i.icon className="size-5" />
                <span className="text-[10px] font-medium">{i.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* AI FAB */}
        <button
          onClick={() => setCmdOpen(true)}
          className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40 size-14 rounded-full bg-gradient-to-br from-emerald to-sky grid place-items-center shadow-elevated animate-pulse-glow hover:scale-105 transition"
          aria-label="Open AI assistant"
        >
          <Sparkles className="size-6 text-primary-foreground" />
        </button>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}

function NavItem({ to, label, icon: Icon, active }: { to: string; label: string; icon: any; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition",
        active ? "bg-white/10 text-foreground shadow-inner" : "text-muted-foreground hover:text-foreground hover:bg-white/5",
      )}
    >
      <Icon className={cn("size-4", active && "text-primary")} />
      {label}
      {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
    </Link>
  );
}
