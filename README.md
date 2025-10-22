# Fil-Invest

Fil-Invest documents a repeatable framework for defining balanced investment strategies across stocks and crypto assets. The guide below captures the decision logic, portfolio construction rules, and operational workflow referenced in the first task and expands it into an actionable playbook.

## Overview of the Program

1. **Profile investors** to translate qualitative preferences into a quantified Investor Profile Score (IPS).
2. **Filter the investment universe** so only pre-approved stocks and crypto assets flow into the allocation engine.
3. **Assign target weights** using an allocation matrix that reflects the IPS band, diversification guardrails, and risk controls.
4. **Execute, monitor, and rebalance** positions under a clearly defined reporting and governance cadence.

Each section below spells out the inputs, calculations, and operational checkpoints required to keep the strategy aligned with the original specification.

## 1. Investor Profiling

### Required Inputs

- **Risk tolerance:** Conservative, Balanced, or Aggressive.
- **Time horizon:** Short (<= 1 year), Medium (1–5 years), or Long (> 5 years).
- **Liquidity needs:** Low, Moderate, or High.
- **Qualitative notes:** Free-form context that may influence exceptions (e.g., impending liquidity events, regulatory constraints).

Record responses in a profiling worksheet so the same questionnaire is delivered at onboarding and during every scheduled review.

### Score Translation

Map qualitative selections into the 1–5 numeric scale used by the scoring formula:

| Dimension        | Conservative / Short / High | Balanced / Medium / Moderate | Aggressive / Long / Low |
|------------------|-----------------------------|-------------------------------|-------------------------|
| Score Assignment | 1                           | 3                             | 5                       |

Use intermediary values (2 or 4) when answers fall between two categories.

### Investor Profile Score (IPS)

Compute the composite IPS as a weighted sum of the normalized scores:

```
IPS = 0.5 * Risk Score + 0.3 * Time Horizon Score + 0.2 * Liquidity Score
```

Document the IPS, the contributing sub-scores, and any overrides in the client record. Recalculate the IPS at least quarterly or sooner if the investor reports material life changes.

## 2. Asset Universe & Screening

1. **Establish whitelists** for eligible stocks (large- or mid-cap equities with positive earnings, sustainable balance sheets, and reliable disclosures) and crypto assets (layer-1 protocols, blue-chip DeFi, and fiat-backed stablecoins).
2. **Run weekly surveillance** to drop names that breach minimum liquidity thresholds, violate custody/compliance checks, or trigger other risk alerts such as regulatory actions and abnormal drawdowns.
3. **Log removal and reinstatement decisions** so governance reviews can trace why an asset entered or left the list.

Only assets that clear these screens move into the allocation engine.

## 3. Allocation Logic

| IPS Range | Stocks Allocation | Crypto Allocation | Notes |
|-----------|------------------|-------------------|-------|
| 1.0 – 2.4 | 80%              | 20%               | Emphasize defensive stock sectors and reserve crypto exposure for Bitcoin and fiat-backed stablecoins. |
| 2.5 – 3.4 | 65%              | 35%               | Blend broad-market equity ETFs with top-cap crypto projects to balance growth and volatility. |
| 3.5 – 5.0 | 50%              | 50%               | Permit growth equities and higher-beta crypto while monitoring drawdowns closely. |

- Cap individual stock positions at **10%** and crypto positions at **15%** of portfolio value to maintain diversification.
- Direct new cash flows toward underweight sleeves to minimize trading costs when rebalancing.

## 4. Rebalancing & Risk Controls

- **Rebalancing trigger:** Rebalance back to target weights whenever either sleeve drifts by more than 5 percentage points or during the scheduled quarterly review—whichever occurs first.
- **Stop-loss guidance:** Apply 15% trailing stops for equities and 25% trailing stops for crypto. Reallocate the proceeds to cash or stablecoins until the next review.
- **Exception handling:** Document any manual overrides (e.g., trading halts, tax considerations) with rationale and approval signatures.

## 5. Reporting & Governance Workflow

1. Publish a quarterly memo summarizing IPS inputs, allocation shifts, and market commentary.
2. Deliver monthly performance updates versus blended benchmarks that mirror the IPS-derived asset mix (e.g., 70/30 equity/crypto for a mid-range IPS).
3. Maintain an operations checklist covering KYC refresh cycles, exchange custody reviews, fee monitoring, and incident response drills.

## 6. Implementation Notes

- Automate data collection with scripts that pull equity pricing/financial metrics (e.g., Yahoo Finance) and crypto market data (e.g., CoinGecko) to compute volatility, drawdowns, and liquidity statistics.
- Store investor profiles, IPS calculations, allocation history, and rebalance logs in a structured repository (database or auditable spreadsheet) for transparency.
- Plan enhancements such as tactical tilts, ESG overlays, and tax-loss harvesting alerts. Capture backlog items in a product roadmap so feature work remains synchronized with documentation.

## 7. Maintenance Guidelines

- Align documentation updates with any changes to questionnaires, allocation rules, or automation scripts.
- Conduct semi-annual reviews of operational controls (data feeds, custody arrangements, regulatory requirements) to keep the framework current.
- Archive superseded versions of this README with change summaries to preserve an audit trail.

## 8. Local Environment Setup

The repository currently ships as documentation only, so standing up the project locally focuses on creating a workspace where you can review the framework and extend it with tooling if desired.

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-org>/Fil-Invest.git
   cd Fil-Invest
   ```
2. **Create an isolated workspace (optional but recommended)** – If you plan to prototype analytics notebooks or automation scripts alongside the framework, create and activate a virtual environment using your preferred tool (e.g., `python -m venv .venv && source .venv/bin/activate`).
3. **Install additional tooling as needed** – This project does not prescribe dependencies yet. Add requirements files or package manifests when you introduce code modules, and document any new setup steps in this section.
4. **Open the documentation** – Review or edit `README.md` (and any future docs) in your editor of choice to tailor the strategy guidance to your needs.

## Educational Use Only Disclaimer

The information contained in this repository is provided solely for educational and informational purposes. It does not constitute financial, investment, legal, accounting, or tax advice, nor is it an offer to buy or sell any securities or digital assets. Past performance is not indicative of future results. No reader should act or rely on the content without seeking the counsel of a qualified financial professional who can consider individual objectives and constraints. The maintainers are not registered investment advisers, and no fiduciary relationship is created by accessing this material.
