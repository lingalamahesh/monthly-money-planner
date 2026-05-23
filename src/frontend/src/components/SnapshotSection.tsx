import { AllocationCard } from "@/components/ui/AllocationCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatINR } from "@/lib/calculations";
import type { AllocationResult } from "@/types/planner";
import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface SnapshotSectionProps {
  result: AllocationResult;
}

const CHART_COLORS = ["#3d8a5e", "#c8862a", "#d4a044", "#c0442a"];

export function SnapshotSection({ result }: SnapshotSectionProps) {
  const { primary, investments: inv, income } = result;

  const chartData = [
    { name: "Equity", value: inv.equity },
    { name: "Debt", value: inv.debt },
    { name: "Commodities", value: inv.commodities },
    { name: "Crypto", value: inv.crypto },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="snapshot" className="bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Your Monthly Money Snapshot
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Based on a monthly income of <strong>{formatINR(income)}</strong>
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={cardVariants}>
            <AllocationCard
              data-ocid="snapshot.needs_card"
              label="Essentials / Needs"
              amount={primary.needs}
              pct={primary.needsPct}
              icon="🏠"
              variant="success"
              description="Groceries, rent, school fees, electricity, fuel, domestic help, subscriptions, and regular family spending."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <AllocationCard
              data-ocid="snapshot.emergency_card"
              label="Emergency / Safety"
              amount={primary.emergency}
              pct={primary.emergencyPct}
              icon="🛡️"
              variant="amber"
              description="Emergency fund, liquid buffer, medical expenses, job-loss protection, and unexpected family needs."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <AllocationCard
              data-ocid="snapshot.investments_card"
              label="Investments"
              amount={primary.investments}
              pct={primary.investmentsPct}
              icon="📈"
              variant="primary"
              description="Long-term wealth creation, child education, retirement planning, home purchase, and family goals."
            />
          </motion.div>
        </motion.div>

        {/* Summary progress bars */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <h3 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
            Income Distribution
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Essentials / Needs"
              value={primary.needsPct * 100}
              amount={formatINR(primary.needs)}
              color="success"
            />
            <ProgressBar
              label="Emergency / Safety"
              value={primary.emergencyPct * 100}
              amount={formatINR(primary.emergency)}
              color="warning"
            />
            <ProgressBar
              label="Investments"
              value={primary.investmentsPct * 100}
              amount={formatINR(primary.investments)}
              color="navy"
            />
          </div>
        </div>

        {/* Donut chart */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Where Your Monthly Investments Can Go
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={76}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number | string) =>
                      typeof v === "number" ? formatINR(v) : v
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full space-y-3">
              {chartData.map((item, i) => (
                <ProgressBar
                  key={item.name}
                  label={item.name}
                  value={(item.value / primary.investments) * 100}
                  amount={formatINR(item.value)}
                  color={
                    (["success", "primary", "warning", "danger"] as const)[i]
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
