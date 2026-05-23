import { Badge } from "@/components/ui/badge";
import { formatINR, formatPct } from "@/lib/calculations";

type RiskLevel = "safe" | "moderate" | "high" | "caution";

interface AllocationCardProps {
  label: string;
  amount: number;
  pct: number;
  description: string;
  icon: string;
  riskLevel?: RiskLevel;
  variant?: "default" | "primary" | "success" | "warning" | "amber";
  "data-ocid"?: string;
}

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  safe: {
    label: "Low Risk",
    className: "bg-accent/20 text-accent-foreground border-accent/30",
  },
  moderate: {
    label: "Moderate Risk",
    className: "bg-primary/20 text-foreground border-primary/30",
  },
  high: {
    label: "Higher Risk",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  caution: {
    label: "Use Caution",
    className: "bg-destructive/20 text-destructive border-destructive/40",
  },
};

const variantStyles: Record<string, string> = {
  default: "bg-card border-border",
  primary:
    "bg-gradient-to-br from-[oklch(0.58_0.14_55)] to-[oklch(0.50_0.17_45)] text-[oklch(0.99_0.01_50)] border-transparent",
  success:
    "bg-gradient-to-br from-[oklch(0.55_0.14_142)] to-[oklch(0.48_0.17_145)] text-[oklch(0.98_0.01_50)] border-transparent",
  warning:
    "bg-gradient-to-br from-[oklch(0.62_0.14_40)] to-[oklch(0.55_0.17_35)] text-[oklch(0.99_0.01_50)] border-transparent",
  amber:
    "bg-gradient-to-br from-[oklch(0.68_0.14_60)] to-[oklch(0.60_0.17_50)] text-[oklch(0.99_0.01_50)] border-transparent",
};

export function AllocationCard({
  label,
  amount,
  pct,
  description,
  icon,
  riskLevel,
  variant = "default",
  "data-ocid": dataOcid,
}: AllocationCardProps) {
  const isDark = variant !== "default";
  const amtClass = isDark ? "text-current" : "text-foreground";
  const descClass = isDark ? "opacity-80" : "text-muted-foreground";
  const labelClass = isDark ? "font-semibold" : "font-semibold text-foreground";

  return (
    <div
      data-ocid={dataOcid}
      className={`rounded-2xl border p-4 shadow-subtle transition-smooth hover:shadow-elevated ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-2xl">{icon}</span>
        </div>
        <div
          className={`text-sm font-mono font-semibold px-2 py-1 rounded-lg ${isDark ? "bg-white/20" : "bg-muted"}`}
        >
          {formatPct(pct)}
        </div>
      </div>
      <p className={`text-sm mb-1 ${labelClass}`}>{label}</p>
      <p
        className={`text-3xl font-display font-bold tracking-tight mb-2 ${amtClass}`}
      >
        {formatINR(amount)}
      </p>
      <p className={`text-xs leading-relaxed ${descClass}`}>{description}</p>
      {riskLevel && (
        <div className="mt-3">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${isDark ? "bg-white/20 border-white/30" : riskConfig[riskLevel].className}`}
          >
            {riskConfig[riskLevel].label}
          </span>
        </div>
      )}
    </div>
  );
}
