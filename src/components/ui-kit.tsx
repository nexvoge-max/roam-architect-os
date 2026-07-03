import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

/* ---------------- StatusBadge ----------------
 * Canonical status pill used across every screen.
 * Tones map to semantic tokens defined in styles.css.
 */
export type StatusTone =
  | "emerald" | "sky" | "warm" | "coral" | "muted" | "primary";

const toneClasses: Record<StatusTone, string> = {
  emerald: "text-emerald bg-emerald/10 ring-emerald/20",
  sky: "text-sky bg-sky/10 ring-sky/20",
  warm: "text-warm bg-warm/10 ring-warm/20",
  coral: "text-coral bg-coral/10 ring-coral/20",
  muted: "text-muted-foreground bg-primary/5 ring-primary/10",
  primary: "text-primary bg-primary/10 ring-primary/20",
};

// Canonical status → tone mapping. Extend here — never re-color inline.
const statusMap: Record<string, StatusTone> = {
  upcoming: "sky",
  "in-progress": "emerald",
  "in progress": "emerald",
  live: "emerald",
  online: "emerald",
  confirmed: "emerald",
  completed: "muted",
  scheduled: "sky",
  planning: "warm",
  pending: "warm",
  delayed: "warm",
  cancelled: "coral",
  offline: "muted",
  emergency: "coral",
  verified: "primary",
  premium: "primary",
  elite: "primary",
  "guide assigned": "primary",
};

export function StatusBadge({
  status,
  tone,
  icon: Icon,
  className,
  children,
}: {
  status?: string;
  tone?: StatusTone;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
}) {
  const label = children ?? status ?? "";
  const resolvedTone: StatusTone =
    tone ?? (status ? statusMap[status.toLowerCase()] ?? "muted" : "muted");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ring-1 ring-inset",
        toneClasses[resolvedTone],
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {label}
    </span>
  );
}

/* ---------------- SectionHeader ---------------- */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-0.5">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ---------------- PageHeader ---------------- */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-widest text-primary font-semibold inline-flex items-center gap-2">
            {Icon && <Icon className="size-3.5" />}
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
        {subtitle && <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ---------------- StatCard ---------------- */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = "emerald",
  icon: Icon,
  tone = "emerald",
  className,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  deltaTone?: StatusTone;
  icon?: LucideIcon;
  tone?: StatusTone;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-3xl p-5 hover-lift", className)}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-black tracking-tight">{value}</div>
          {delta && (
            <div className={cn("mt-1 text-[11px] inline-flex items-center gap-1", `text-${deltaTone}`)}>
              {delta}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("size-10 rounded-2xl grid place-items-center shrink-0", `bg-${tone}/10 text-${tone}`)}>
            <Icon className="size-5" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Buttons (canonical variants) ---------------- */
type BtnVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 disabled:pointer-events-none";
const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "glass hover:bg-primary/5",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-primary/5",
  danger: "bg-coral/15 text-coral hover:bg-coral/25",
  success: "bg-emerald/15 text-emerald hover:bg-emerald/25",
};

export function TButton({
  variant = "primary",
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; type?: "button" | "submit" }) {
  return <button className={cn(btnBase, btnVariants[variant], className)} {...props} />;
}

/* ---------------- Empty state ---------------- */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass-strong rounded-3xl p-10 text-center flex flex-col items-center gap-3">
      {Icon && (
        <div className="size-14 rounded-3xl bg-gradient-to-br from-emerald/20 to-sky/20 grid place-items-center">
          <Icon className="size-6 text-primary" />
        </div>
      )}
      <div className="text-lg font-bold tracking-tight">{title}</div>
      {description && <div className="text-sm text-muted-foreground max-w-md">{description}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ---------------- Skeleton shimmer ---------------- */
export function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-primary/5", className)}>
      <div className="absolute inset-0 animate-shimmer" />
    </div>
  );
}
