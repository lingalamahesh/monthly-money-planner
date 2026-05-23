export type AllocationMode = "conservative" | "balanced" | "aggressive";

export interface ModeConfig {
  label: string;
  description: string;
  emoji: string;
  needsPct: number;
  emergencyPct: number;
  investmentsPct: number;
  equityPct: number;
  debtPct: number;
  commoditiesPct: number;
  cryptoPct: number;
  largeCapPct: number;
  midCapPct: number;
  smallCapPct: number;
  liquidPct: number;
  shortDurationPct: number;
  targetMaturityPct: number;
  goldPct: number;
  silverPct: number;
  childEduPct: number;
  retirementPct: number;
  homePct: number;
  vacationPct: number;
}

export interface PrimaryAllocation {
  needs: number;
  needsPct: number;
  emergency: number;
  emergencyPct: number;
  investments: number;
  investmentsPct: number;
}

export interface InvestmentAllocation {
  equity: number;
  equityPct: number;
  debt: number;
  debtPct: number;
  commodities: number;
  commoditiesPct: number;
  crypto: number;
  cryptoPct: number;
}

export interface EquityBreakdown {
  largeCap: number;
  largeCapPct: number;
  midCap: number;
  midCapPct: number;
  smallCap: number;
  smallCapPct: number;
}

export interface DebtBreakdown {
  liquid: number;
  liquidPct: number;
  shortDuration: number;
  shortDurationPct: number;
  targetMaturity: number;
  targetMaturityPct: number;
}

export interface CommoditiesBreakdown {
  gold: number;
  goldPct: number;
  silver: number;
  silverPct: number;
}

export interface GoalAllocation {
  childEducation: number;
  childEducationPct: number;
  retirement: number;
  retirementPct: number;
  homePurchase: number;
  homePurchasePct: number;
  vacation: number;
  vacationPct: number;
}

export interface AllocationResult {
  income: number;
  mode: AllocationMode;
  primary: PrimaryAllocation;
  investments: InvestmentAllocation;
  equity: EquityBreakdown;
  debt: DebtBreakdown;
  commodities: CommoditiesBreakdown;
  goals: GoalAllocation;
}
