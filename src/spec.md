# Specification

## Summary
**Goal:** Build a single-page calculator UI for Pressure, Temperature conversion, and Flow rate that computes results immediately with unit support, clear formulas, and robust validation.

**Planned changes:**
- Create a home screen with three clear sections (or tabs): Pressure, Temperature, Flow, each with labeled inputs and a prominent result area (English-only UI text).
- Implement calculations with unit selectors and show the active formula in each section:
  - Pressure: P = F / A (Force: N, kN; Area: m², cm²; Output: Pa/kPa with correct conversions)
  - Temperature: convert between °C, °F, K (prevent invalid Kelvin < 0 K)
  - Flow: Q = V / t (Volume: m³, L; Time: s, min; Output: m³/s and L/s with correct conversions)
- Add inline input validation and error states (missing/non-numeric inputs; disallow zero/negative area or time where applicable) so results show “—”/“Fix inputs to calculate” instead of misleading numbers.
- Apply an industrial instrument-panel visual theme using Tailwind (dark/gray surfaces, high-contrast typography, single consistent accent color that is not blue/purple) with responsive layout for mobile and desktop.

**User-visible outcome:** Users can switch between Pressure, Temperature, and Flow calculators, enter values with units, see the formula and instant computed results, and get clear inline errors for invalid inputs in a consistent industrial-themed UI.
