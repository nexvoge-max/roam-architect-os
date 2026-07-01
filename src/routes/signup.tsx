import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Trailvia" }] }),
  component: Signup,
});

function Signup() {
  return (
    <div className="min-h-screen grid place-items-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-coral/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 -left-40 size-[500px] rounded-full bg-emerald/20 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>
      <GlassCard variant="strong" className="w-full max-w-md p-10 relative">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="size-9 rounded-xl bg-gradient-to-br from-emerald to-sky grid place-items-center font-black text-primary-foreground">T</div>
          <span className="font-black tracking-tight">Trailvia</span>
        </Link>
        <h1 className="text-3xl font-black tracking-tight">Start your journey</h1>
        <p className="text-sm text-muted-foreground mt-1">Free forever plan. Upgrade any time.</p>
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/app"; }} className="mt-8 space-y-3">
          {["Full name", "Email", "Password"].map((l, i) => (
            <div key={l} className="glass rounded-2xl px-4 py-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
              <input type={i===2 ? "password" : "text"} className="w-full bg-transparent outline-none text-sm mt-0.5" />
            </div>
          ))}
          <button className="w-full rounded-2xl bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 transition">Create account</button>
        </form>
        <div className="text-sm text-center text-muted-foreground mt-8">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </div>
      </GlassCard>
    </div>
  );
}
