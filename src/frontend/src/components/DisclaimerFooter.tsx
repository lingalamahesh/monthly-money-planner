export function DisclaimerFooter() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "monthly-budgeting-planner",
  );

  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <p className="text-xs leading-relaxed opacity-70 mb-6 text-center">
          ⚠️ This planner is for educational and awareness purposes only. It is
          not financial advice. Please consult a qualified financial advisor
          before making investment or loan decisions.
        </p>
        <div className="border-t border-background/20 pt-4 text-center">
          <p className="text-xs opacity-50">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
