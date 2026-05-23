interface ProgressBarProps {
  value: number; // 0–100
  color?: "primary" | "success" | "warning" | "danger" | "navy";
  label?: string;
  amount?: string;
  showPct?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-accent",
  warning: "bg-[oklch(0.71_0.18_55)]",
  danger: "bg-destructive",
  navy: "bg-foreground",
};

export function ProgressBar({
  value,
  color = "primary",
  label,
  amount,
  showPct = true,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {(label || amount || showPct) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {amount && (
              <span className="text-sm font-mono font-semibold text-foreground">
                {amount}
              </span>
            )}
            {showPct && (
              <span className="text-xs text-muted-foreground font-mono">
                {Math.round(clamped)}%
              </span>
            )}
          </div>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorMap[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
