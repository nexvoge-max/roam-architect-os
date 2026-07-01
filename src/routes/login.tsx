import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { Apple, Github } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Trailvia" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen grid place-items-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 size-[600px] rounded-full bg-emerald/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 -right-40 size-[500px] rounded-full bg-sky/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>
      <GlassCard variant="strong" className="w-full max-w-md p-10 relative">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="size-9 rounded-xl bg-gradient-to-br from-emerald to-sky grid place-items-center font-black text-primary-foreground">T</div>
          <span className="font-black tracking-tight">Trailvia</span>
        </Link>
        <h1 className="text-3xl font-black tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to continue your journey.</p>
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/app"; }} className="mt-8 space-y-3">
          <div className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</div>
            <input type="email" required defaultValue="snehith@trailvia.app" className="w-full bg-transparent outline-none text-sm mt-0.5" />
          </div>
          <div className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Password</div>
            <input type="password" required defaultValue="••••••••" className="w-full bg-transparent outline-none text-sm mt-0.5" />
          </div>
          <button className="w-full rounded-2xl bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 transition">Sign in</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-white/10" /> or continue with <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ label: "Apple", icon: Apple }, { label: "Google", icon: null }, { label: "GitHub", icon: Github }].map((p) => (
            <button key={p.label} className="glass rounded-2xl py-2.5 text-xs font-semibold hover:bg-white/5 transition inline-flex items-center justify-center gap-1.5">
              {p.icon ? <p.icon className="size-4" /> : <span className="font-black">G</span>} {p.label}
            </button>
          ))}
        </div>
        <div className="text-sm text-center text-muted-foreground mt-8">
          New to Trailvia? <Link to="/signup" className="text-primary font-semibold hover:underline">Create account</Link>
        </div>
      </GlassCard>
    </div>
  );
}
