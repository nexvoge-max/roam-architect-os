import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  className,
  children,
  variant = "default",
  hover = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
}) {
  const base =
    variant === "strong" ? "glass-strong" : variant === "subtle" ? "glass-subtle" : "glass";
  return (
    <div
      className={cn(
        base,
        "rounded-3xl p-6",
        hover && "hover-lift cursor-pointer",
        "animate-fade-up",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
