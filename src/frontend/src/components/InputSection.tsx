import { MODE_CONFIGS } from "@/lib/calculations";
import type { AllocationMode } from "@/types/planner";

interface ModeCardProps {
  mode: AllocationMode;
  selected: boolean;
  onSelect: (m: AllocationMode) => void;
}

function ModeCard({ mode, selected, onSelect }: ModeCardProps) {
  const cfg = MODE_CONFIGS[mode];
  return (
    <button
      type="button"
      data-ocid={`mode.${mode}_card`}
      onClick={() => onSelect(mode)}
      className={`flex-1 rounded-2xl border-2 p-4 text-left transition-smooth cursor-pointer ${
        selected
          ? "border-primary bg-primary/10 shadow-elevated"
          : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
      }`}
    >
      <div className="text-2xl mb-2">{cfg.emoji}</div>
      <p
        className={`font-semibold font-display text-sm mb-1 ${selected ? "text-primary" : "text-foreground"}`}
      >
        {cfg.label}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {cfg.description}
      </p>
      <div className="mt-3 flex gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-mono">
          {Math.round(cfg.investmentsPct * 100)}% invest
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-mono">
          {Math.round(cfg.needsPct * 100)}% needs
        </span>
      </div>
    </button>
  );
}

interface InputSectionProps {
  rawIncome: string;
  mode: AllocationMode;
  isValid: boolean;
  onIncomeChange: (v: string) => void;
  onModeChange: (m: AllocationMode) => void;
  onSubmit: () => void;
}

export function InputSection({
  rawIncome,
  mode,
  isValid: _isValid,
  onIncomeChange,
  onModeChange,
  onSubmit,
}: InputSectionProps) {
  const modes: AllocationMode[] = ["conservative", "balanced", "aggressive"];

  return (
    <section id="planner-input" className="bg-card border-y border-border">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Start With Your Monthly Take-Home Income
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your combined family monthly salary after all deductions.
        </p>

        <div className="mb-6">
          <label
            htmlFor="income-input"
            className="text-sm font-semibold text-foreground mb-2 block"
          >
            Monthly Take-Home Income
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary">
              ₹
            </span>
            <input
              id="income-input"
              data-ocid="income.input"
              type="tel"
              inputMode="numeric"
              value={
                rawIncome
                  ? Number.parseInt(rawIncome, 10).toLocaleString("en-IN")
                  : ""
              }
              onChange={(e) => onIncomeChange(e.target.value)}
              placeholder="1,00,000"
              className="w-full pl-10 pr-4 py-4 text-2xl font-display font-bold rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-smooth placeholder:text-muted-foreground/50 text-foreground"
            />
          </div>
          {rawIncome && Number.parseInt(rawIncome, 10) <= 0 && (
            <p
              data-ocid="income.field_error"
              className="text-destructive text-xs mt-1"
            >
              Please enter a valid income amount greater than zero.
            </p>
          )}
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold text-foreground mb-3">
            Select Your Planning Approach
          </p>
          <div className="flex gap-3">
            {modes.map((m) => (
              <ModeCard
                key={m}
                mode={m}
                selected={mode === m}
                onSelect={onModeChange}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          data-ocid="planner.submit_button"
          onClick={onSubmit}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 text-base font-bold font-display shadow-elevated hover:opacity-90 transition-smooth"
        >
          Show My Money Plan
        </button>
      </div>
    </section>
  );
}
