import { useMemo, useState } from "react";
import { calculateAllocations, formatINR } from "../lib/calculations";
import type { AllocationMode, AllocationResult } from "../types/planner";

export function usePlanner() {
  const [rawIncome, setRawIncome] = useState("100000");
  const [mode, setMode] = useState<AllocationMode>("balanced");

  const income = useMemo(() => {
    const parsed = Number.parseInt(rawIncome.replace(/[^0-9]/g, ""), 10);
    return Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [rawIncome]);

  const isValid = income > 0;

  const result = useMemo<AllocationResult | null>(() => {
    if (!isValid) return null;
    return calculateAllocations(income, mode);
  }, [income, mode, isValid]);

  function handleIncomeChange(value: string) {
    const digits = value.replace(/[^0-9]/g, "");
    setRawIncome(digits);
  }

  function generateWhatsAppText(r: AllocationResult): string {
    return encodeURIComponent(
      `🏠 My Family Money Plan

📊 Monthly Income: ${formatINR(r.income)}

💡 MONTHLY SPLIT:
Essentials / Needs: ${formatINR(r.primary.needs)}
Emergency / Safety: ${formatINR(r.primary.emergency)}
Investments: ${formatINR(r.primary.investments)}

📈 INVESTMENT SPLIT:
Equity: ${formatINR(r.investments.equity)}
Debt: ${formatINR(r.investments.debt)}
Gold & Silver: ${formatINR(r.investments.commodities)}
Crypto: ${formatINR(r.investments.crypto)}

🎯 GOAL SPLIT:
Child Education: ${formatINR(r.goals.childEducation)}
Retirement: ${formatINR(r.goals.retirement)}
Home Purchase: ${formatINR(r.goals.homePurchase)}
Vacation: ${formatINR(r.goals.vacation)}

Plan created with Monthly Budgeting Money Planner`,
    );
  }

  function shareOnWhatsApp() {
    if (!result) return;
    const text = generateWhatsAppText(result);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return {
    rawIncome,
    income,
    mode,
    isValid,
    result,
    setMode,
    handleIncomeChange,
    shareOnWhatsApp,
  };
}
