import { formatINR } from "@/lib/calculations";
import { MODE_CONFIGS } from "@/lib/calculations";
import type { AllocationResult } from "@/types/planner";
import { motion } from "motion/react";

interface SummarySectionProps {
  result: AllocationResult;
  onShare: () => void;
}

function Row({
  label,
  value,
  indent = 0,
  highlight = false,
}: { label: string; value: string; indent?: number; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        highlight ? "font-semibold" : ""
      } ${indent === 1 ? "pl-4 border-l-2 border-border" : indent === 2 ? "pl-8 border-l-2 border-border" : ""}`}
    >
      <span
        className={`text-sm ${highlight ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-sm ${highlight ? "text-foreground font-bold" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

export function SummarySection({ result, onShare }: SummarySectionProps) {
  const {
    income,
    mode,
    primary,
    investments: inv,
    equity,
    debt,
    commodities,
    goals,
  } = result;
  const modeLabel = MODE_CONFIGS[mode].label;

  return (
    <section id="summary" className="bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
            Your Complete Monthly Split
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            A clean overview of your entire monthly money plan — {modeLabel}{" "}
            mode.
          </p>

          <div className="bg-card rounded-2xl border border-border p-5 mb-6">
            <div className="pb-3 border-b border-border mb-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-foreground">
                  Monthly Take-Home Income
                </span>
                <span className="font-display font-bold text-xl text-primary">
                  {formatINR(income)}
                </span>
              </div>
            </div>

            <Row
              label="Essentials / Needs"
              value={formatINR(primary.needs)}
              highlight
            />
            <Row
              label="Emergency / Safety"
              value={formatINR(primary.emergency)}
              highlight
            />
            <Row
              label="Investments Total"
              value={formatINR(primary.investments)}
              highlight
            />

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Inside Investments
              </p>

              <Row label="Equity" value={formatINR(inv.equity)} />
              <Row
                label="→ Large Cap"
                value={formatINR(equity.largeCap)}
                indent={1}
              />
              <Row
                label="→ Mid Cap"
                value={formatINR(equity.midCap)}
                indent={1}
              />
              <Row
                label="→ Small Cap"
                value={formatINR(equity.smallCap)}
                indent={1}
              />

              <Row label="Debt" value={formatINR(inv.debt)} />
              <Row
                label="→ Liquid / Overnight"
                value={formatINR(debt.liquid)}
                indent={1}
              />
              <Row
                label="→ Short Duration / TMF"
                value={formatINR(debt.shortDuration)}
                indent={1}
              />
              <Row
                label="→ Target Maturity"
                value={formatINR(debt.targetMaturity)}
                indent={1}
              />

              <Row label="Commodities" value={formatINR(inv.commodities)} />
              <Row
                label="→ Gold"
                value={formatINR(commodities.gold)}
                indent={1}
              />
              <Row
                label="→ Silver"
                value={formatINR(commodities.silver)}
                indent={1}
              />

              <Row label="Crypto" value={formatINR(inv.crypto)} />
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Family Goals
              </p>
              <Row
                label="Child Education"
                value={formatINR(goals.childEducation)}
              />
              <Row label="Retirement" value={formatINR(goals.retirement)} />
              <Row
                label="Home Purchase"
                value={formatINR(goals.homePurchase)}
              />
              <Row label="Vacation" value={formatINR(goals.vacation)} />
            </div>
          </div>

          {/* Share button */}
          <button
            type="button"
            data-ocid="share.whatsapp_button"
            onClick={onShare}
            className="w-full flex items-center justify-center gap-3 bg-whatsapp text-white rounded-2xl py-4 font-bold text-base shadow-elevated hover:opacity-90 transition-smooth"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="WhatsApp"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Share This Plan With My Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
}
