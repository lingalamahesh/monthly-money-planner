export function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section id="hero" className="bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-4 pt-12 pb-10">
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30">
            <span className="text-sm">🇮🇳</span>
            <span className="text-xs font-semibold text-foreground">
              Designed for Indian Families
            </span>
          </div>

          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight mb-4">
              Plan Your Salary, Investments &amp; Family Goals —{" "}
              <span className="text-primary">The Smarter Way</span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Create a simple monthly money plan for your family using a
              structured income, safety, investment, and goal-based allocation
              system.
            </p>
          </div>

          <div className="w-full rounded-2xl overflow-hidden border border-border shadow-elevated">
            <img
              src="/assets/generated/hero-family-finance.dim_800x500.jpg"
              alt="Family planning their finances together under a banyan tree"
              className="w-full h-48 sm:h-56 object-cover"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              type="button"
              data-ocid="hero.cta_button"
              onClick={onCta}
              className="flex-1 bg-primary text-primary-foreground rounded-2xl py-4 text-base font-bold font-display shadow-elevated hover:opacity-90 transition-smooth"
            >
              Create My Family Money Plan
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center w-full">
            Designed for Indian families who want clarity before they spend,
            save, or invest.
          </p>
        </div>
      </div>
    </section>
  );
}
