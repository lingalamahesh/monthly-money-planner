# Monthly Budgeting Money Planner — Design Brief

**Purpose**: Premium Indian family finance planner helping couples divide monthly income across needs, emergency, and investments with warm, family-focused clarity.

**Tone & Differentiation**: Editorial lifestyle finance feel (Instagram-reel-worthy), warm and premium but not corporate. Warm gold accents, color-coded allocations, large readable Rupee amounts. No tables, no technical jargon, no use of word "calculator."

**Color Palette**:
| Role | OKLCH | Usage |
|------|-------|-------|
| Background | 0.97 0.03 40 | Warm cream/off-white, inviting |
| Foreground | 0.18 0.02 260 | Deep navy/charcoal, readable |
| Accent (Gold) | 0.65 0.15 55 | Premium highlights, sparingly |
| Success (Green) | 0.62 0.16 142 | Essentials/Emergency (safe) |
| Warning (Amber) | 0.71 0.18 55 | Medium-risk, investments |
| Destructive (Red) | 0.55 0.22 25 | High-risk warnings only |

**Typography**:
- **Display**: Fraunces (distinctive warm serif, premium, hero/titles)
- **Body**: DM Sans (modern, clean, highly readable, all body text)
- **Mono**: Geist Mono (technical elements if needed)
- **Scale**: sm=12px, base=14px, lg=18px, xl=24px, 2xl=32px (mobile-first)

**Elevation & Depth**:
- `shadow-subtle`: 0 2px 8px rgba(0,0,0,0.05) — cards, inputs
- `shadow-elevated`: 0 8px 24px rgba(0,0,0,0.08) — hero, modals
- Background layers: warm cream, soft muted accents, card surfaces

**Structural Zones**:
| Zone | Background | Border | Typography | Purpose |
|------|------------|--------|------------|----------|
| Header | card | border-b | foreground | Navigation, top anchor |
| Hero | background | none | display/lg | Title, tagline, primary CTA |
| Input Section | card | border | body/lg | Income input, mode selector |
| Result Card | card | border-subtle | body | Allocation card (color-coded) |
| Footer | muted/5% | border-t | body-sm | Disclaimer, share action |

**Component Patterns**:
- **Allocation Cards**: Large rounded (12px), color-coded (green/amber/gold), show amount + percentage + description, shadow-subtle, tap to expand.
- **Mode Selector**: Three beautiful cards (Conservative/Balanced/Aggressive), warm descriptions, toggle state with accent color.
- **Charts**: Donut charts with warm color palette (green/amber/gold/red); progress bars for sub-allocations.
- **Input Field**: Large, rounded, placeholder ₹1,00,000 (Indian formatting), warm border-focus.
- **CTA Buttons**: Gold accent (0.65 0.15 55), rounded 12px, shadow-elevated on hover.

**Spacing & Rhythm**:
- Container padding: 16px mobile, 24px tablet+
- Card gap: 12px–16px
- Section gap: 24px–32px
- Line-height: 1.5 for body, 1.2 for display

**Motion**:
- Transition default: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- No bouncy animations; smooth fades for mode selection
- Card hover: slight lift (shadow change), no color shift

**Constraints**:
- NO bold/heavy Fraunces on body text (display only).
- NO use of word "calculator" in any visible UI.
- NO generic fintech aesthetic (no purple gradients, no safe blue).
- NO tables; use cards + donut charts instead.
- NO hover animations on mobile touch targets.
- Indian Rupee formatting (₹X,XX,XXX) throughout.

**Signature Detail**:
Warm gold accent on investment-related cards and CTAs, paired with soft sage-green for essential/emergency allocations. Warm cream background with deep navy text creates family-friendly, approachable premium feel — not cold corporate banking.
