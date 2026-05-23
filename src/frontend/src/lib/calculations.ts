import type {
  AllocationMode,
  AllocationResult,
  ModeConfig,
} from "../types/planner";

export const MODE_CONFIGS: Record<AllocationMode, ModeConfig> = {
  conservative: {
    label: "Conservative",
    description:
      "For families who want higher stability, lower market risk, and stronger safety allocation.",
    emoji: "🛡️",
    needsPct: 0.6,
    emergencyPct: 0.1,
    investmentsPct: 0.3,
    equityPct: 0.4,
    debtPct: 0.5,
    commoditiesPct: 0.08,
    cryptoPct: 0.02,
    largeCapPct: 0.7,
    midCapPct: 0.25,
    smallCapPct: 0.05,
    liquidPct: 0.4,
    shortDurationPct: 0.4,
    targetMaturityPct: 0.2,
    goldPct: 0.85,
    silverPct: 0.15,
    childEduPct: 0.45,
    retirementPct: 0.35,
    homePct: 0.15,
    vacationPct: 0.05,
  },
  balanced: {
    label: "Balanced",
    description:
      "For families who want a practical mix of expenses, safety, and long-term investment growth.",
    emoji: "⚖️",
    needsPct: 0.55,
    emergencyPct: 0.1,
    investmentsPct: 0.35,
    equityPct: 0.6,
    debtPct: 0.3,
    commoditiesPct: 0.08,
    cryptoPct: 0.02,
    largeCapPct: 0.6,
    midCapPct: 0.3,
    smallCapPct: 0.1,
    liquidPct: 0.3,
    shortDurationPct: 0.45,
    targetMaturityPct: 0.25,
    goldPct: 0.8,
    silverPct: 0.2,
    childEduPct: 0.4,
    retirementPct: 0.4,
    homePct: 0.15,
    vacationPct: 0.05,
  },
  aggressive: {
    label: "Aggressive",
    description:
      "For families who can take higher market exposure and want to invest more aggressively for the future.",
    emoji: "🚀",
    needsPct: 0.5,
    emergencyPct: 0.1,
    investmentsPct: 0.4,
    equityPct: 0.7,
    debtPct: 0.2,
    commoditiesPct: 0.08,
    cryptoPct: 0.02,
    largeCapPct: 0.5,
    midCapPct: 0.35,
    smallCapPct: 0.15,
    liquidPct: 0.2,
    shortDurationPct: 0.4,
    targetMaturityPct: 0.4,
    goldPct: 0.75,
    silverPct: 0.25,
    childEduPct: 0.35,
    retirementPct: 0.45,
    homePct: 0.15,
    vacationPct: 0.05,
  },
};

export function calculateAllocations(
  income: number,
  mode: AllocationMode,
): AllocationResult {
  const cfg = MODE_CONFIGS[mode];

  const needs = Math.round(income * cfg.needsPct);
  const emergency = Math.round(income * cfg.emergencyPct);
  const investments = income - needs - emergency;

  const equity = Math.round(investments * cfg.equityPct);
  const commodities = Math.round(investments * cfg.commoditiesPct);
  const crypto = Math.round(investments * cfg.cryptoPct);
  const debt = investments - equity - commodities - crypto;

  const largeCap = Math.round(equity * cfg.largeCapPct);
  const midCap = Math.round(equity * cfg.midCapPct);
  const smallCap = equity - largeCap - midCap;

  const liquid = Math.round(debt * cfg.liquidPct);
  const shortDuration = Math.round(debt * cfg.shortDurationPct);
  const targetMaturity = debt - liquid - shortDuration;

  const gold = Math.round(commodities * cfg.goldPct);
  const silver = commodities - gold;

  const childEducation = Math.round(investments * cfg.childEduPct);
  const retirement = Math.round(investments * cfg.retirementPct);
  const homePurchase = Math.round(investments * cfg.homePct);
  const vacation = investments - childEducation - retirement - homePurchase;

  return {
    income,
    mode,
    primary: {
      needs,
      needsPct: cfg.needsPct,
      emergency,
      emergencyPct: cfg.emergencyPct,
      investments,
      investmentsPct: cfg.investmentsPct,
    },
    investments: {
      equity,
      equityPct: cfg.equityPct,
      debt,
      debtPct: cfg.debtPct,
      commodities,
      commoditiesPct: cfg.commoditiesPct,
      crypto,
      cryptoPct: cfg.cryptoPct,
    },
    equity: {
      largeCap,
      largeCapPct: cfg.largeCapPct,
      midCap,
      midCapPct: cfg.midCapPct,
      smallCap,
      smallCapPct: cfg.smallCapPct,
    },
    debt: {
      liquid,
      liquidPct: cfg.liquidPct,
      shortDuration,
      shortDurationPct: cfg.shortDurationPct,
      targetMaturity,
      targetMaturityPct: cfg.targetMaturityPct,
    },
    commodities: {
      gold,
      goldPct: cfg.goldPct,
      silver,
      silverPct: cfg.silverPct,
    },
    goals: {
      childEducation,
      childEducationPct: cfg.childEduPct,
      retirement,
      retirementPct: cfg.retirementPct,
      homePurchase,
      homePurchasePct: cfg.homePct,
      vacation,
      vacationPct: cfg.vacationPct,
    },
  };
}

export function formatINR(amount: number): string {
  if (amount === 0) return "₹0";
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted;
}

export function formatPct(value: number): string {
  return `${Math.round(value * 100)}%`;
}
