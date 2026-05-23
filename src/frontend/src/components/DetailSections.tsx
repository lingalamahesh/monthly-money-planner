import { AllocationCard } from "@/components/ui/AllocationCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatINR } from "@/lib/calculations";
import type { AllocationResult } from "@/types/planner";
import { motion } from "motion/react";

interface DetailSectionsProps {
  result: AllocationResult;
}

export function DetailSections({ result }: DetailSectionsProps) {
  const { equity, debt, commodities, goals, investments: inv } = result;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Investment Allocation Cards */}
      <section
        id="investment-allocation"
        className="bg-muted/30 border-y border-border"
      >
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
            Investment Allocation
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            How your monthly investment amount is divided across asset classes.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <AllocationCard
              data-ocid="investment.equity_card"
              label="Equity"
              amount={inv.equity}
              pct={inv.equityPct}
              icon="📊"
              riskLevel="moderate"
              description="Long-term wealth creation through mutual funds, index funds, large cap, mid cap, and small cap exposure."
            />
            <AllocationCard
              data-ocid="investment.debt_card"
              label="Debt"
              amount={inv.debt}
              pct={inv.debtPct}
              icon="🏦"
              riskLevel="safe"
              description="Stability and liquidity through liquid funds, short duration funds, and fixed-income instruments."
            />
            <AllocationCard
              data-ocid="investment.commodities_card"
              label="Commodities"
              amount={inv.commodities}
              pct={inv.commoditiesPct}
              icon="🥇"
              riskLevel="moderate"
              description="Diversification through gold and silver — time-tested safe haven assets for Indian families."
            />
            <AllocationCard
              data-ocid="investment.crypto_card"
              label="Crypto"
              amount={inv.crypto}
              pct={inv.cryptoPct}
              icon="₿"
              riskLevel="caution"
              description="Optional high-risk exposure. Keep this very small and only if it fits your family's risk profile."
            />
          </div>
        </div>
      </section>

      {/* Equity Roadmap */}
      <section id="equity-roadmap" className="bg-background">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Equity Roadmap
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              How your equity allocation is spread across company sizes for
              balanced growth.
            </p>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🏢</span>
                  <span className="font-semibold text-sm text-foreground">
                    Large Cap
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    More stable, well-established companies
                  </span>
                </div>
                <ProgressBar
                  value={equity.largeCapPct * 100}
                  amount={formatINR(equity.largeCap)}
                  color="success"
                  label=""
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">📈</span>
                  <span className="font-semibold text-sm text-foreground">
                    Mid Cap
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Growth-focused companies
                  </span>
                </div>
                <ProgressBar
                  value={equity.midCapPct * 100}
                  amount={formatINR(equity.midCap)}
                  color="warning"
                  label=""
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🚀</span>
                  <span className="font-semibold text-sm text-foreground">
                    Small Cap
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Higher risk, higher volatility
                  </span>
                </div>
                <ProgressBar
                  value={equity.smallCapPct * 100}
                  amount={formatINR(equity.smallCap)}
                  color="danger"
                  label=""
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety & Debt */}
      <section
        id="debt-allocation"
        className="bg-muted/30 border-y border-border"
      >
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Safety &amp; Debt Allocation
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your debt investment split for stability, liquidity, and peace of
              mind.
            </p>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">💧</span>
                  <span className="font-semibold text-sm text-foreground">
                    Liquid / Overnight
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Easy access, stays liquid
                  </span>
                </div>
                <ProgressBar
                  value={debt.liquidPct * 100}
                  amount={formatINR(debt.liquid)}
                  color="success"
                  label=""
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">📋</span>
                  <span className="font-semibold text-sm text-foreground">
                    Short Duration / TMF
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Stable, low-volatility allocation
                  </span>
                </div>
                <ProgressBar
                  value={debt.shortDurationPct * 100}
                  amount={formatINR(debt.shortDuration)}
                  color="primary"
                  label=""
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🎯</span>
                  <span className="font-semibold text-sm text-foreground">
                    Target Maturity
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Goal-based fixed income allocation
                  </span>
                </div>
                <ProgressBar
                  value={debt.targetMaturityPct * 100}
                  amount={formatINR(debt.targetMaturity)}
                  color="navy"
                  label=""
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gold & Silver */}
      <section id="gold-silver" className="bg-background">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Gold &amp; Silver Diversification
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              Commodities that act as a hedge against inflation and uncertainty.
            </p>
            <p className="text-xs text-muted-foreground italic mb-6">
              Gold and silver can act as diversification assets, but they should
              not dominate your monthly investment plan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl border border-border p-5 shadow-subtle">
                <div className="text-3xl mb-3">🥇</div>
                <p className="font-semibold text-sm text-foreground mb-1">
                  Gold
                </p>
                <p className="font-display text-2xl font-bold text-foreground mb-2">
                  {formatINR(commodities.gold)}
                </p>
                <ProgressBar
                  value={commodities.goldPct * 100}
                  color="warning"
                  showPct
                  label=""
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Digital gold, gold ETF, or sovereign gold bonds.
                </p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-5 shadow-subtle">
                <div className="text-3xl mb-3">🥈</div>
                <p className="font-semibold text-sm text-foreground mb-1">
                  Silver
                </p>
                <p className="font-display text-2xl font-bold text-foreground mb-2">
                  {formatINR(commodities.silver)}
                </p>
                <ProgressBar
                  value={commodities.silverPct * 100}
                  color="navy"
                  showPct
                  label=""
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Silver ETF or digital silver for diversification.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Family Goals */}
      <section id="family-goals" className="bg-muted/30 border-y border-border">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Goal-Based Family Plan
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              How your investments are mapped to the goals that matter most to
              your family.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <AllocationCard
                data-ocid="goals.child_edu_card"
                label="Child Education"
                amount={goals.childEducation}
                pct={goals.childEducationPct}
                icon="🎓"
                description="School fees, higher education, coaching, college planning, and future academic milestones."
              />
              <AllocationCard
                data-ocid="goals.retirement_card"
                label="Retirement"
                amount={goals.retirement}
                pct={goals.retirementPct}
                icon="🌅"
                description="Long-term independence, future lifestyle protection, and peaceful retirement planning."
              />
              <AllocationCard
                data-ocid="goals.home_card"
                label="Home Purchase"
                amount={goals.homePurchase}
                pct={goals.homePurchasePct}
                icon="🏡"
                description="Down payment, home upgrade, renovation, or future property purchase planning."
              />
              <AllocationCard
                data-ocid="goals.vacation_card"
                label="Vacation"
                amount={goals.vacation}
                pct={goals.vacationPct}
                icon="✈️"
                description="Guilt-free family trips and lifestyle experiences without disturbing long-term goals."
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
