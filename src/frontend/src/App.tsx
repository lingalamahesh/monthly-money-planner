import { DetailSections } from "@/components/DetailSections";
import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { HeroSection } from "@/components/HeroSection";
import { InputSection } from "@/components/InputSection";
import { SnapshotSection } from "@/components/SnapshotSection";
import { SummarySection } from "@/components/SummarySection";
import { usePlanner } from "@/hooks/use-planner";

export default function App() {
  const {
    rawIncome,
    income,
    mode,
    isValid,
    result,
    setMode,
    handleIncomeChange,
    shareOnWhatsApp,
  } = usePlanner();

  function scrollToInput() {
    document
      .getElementById("planner-input")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToResult() {
    setTimeout(() => {
      document
        .getElementById("snapshot")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleSubmit() {
    if (isValid) scrollToResult();
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="app.page"
    >
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏠</span>
            <span className="font-display font-bold text-foreground text-sm leading-tight">
              Monthly Budgeting
              <br />
              <span className="text-primary text-xs font-semibold">
                Money Planner
              </span>
            </span>
          </div>
          <button
            type="button"
            data-ocid="header.start_button"
            onClick={scrollToInput}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary/15 text-foreground border border-primary/30 hover:bg-primary/25 transition-smooth"
          >
            Start Planning
          </button>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection onCta={scrollToInput} />

        <InputSection
          rawIncome={rawIncome}
          mode={mode}
          isValid={isValid}
          onIncomeChange={handleIncomeChange}
          onModeChange={setMode}
          onSubmit={handleSubmit}
        />

        {result && income > 0 && (
          <>
            <SnapshotSection result={result} />
            <DetailSections result={result} />
            <SummarySection result={result} onShare={shareOnWhatsApp} />
          </>
        )}

        {!result && (
          <section
            className="bg-muted/30 border-t border-border"
            data-ocid="planner.empty_state"
          >
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Your plan will appear here
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter your monthly income above and choose your planning
                approach to see your complete family money plan.
              </p>
            </div>
          </section>
        )}
      </main>

      <DisclaimerFooter />
    </div>
  );
}
