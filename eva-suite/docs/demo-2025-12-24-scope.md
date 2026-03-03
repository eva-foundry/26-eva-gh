# EVA Suite – December 24, 2025 Demo Scope

**Kickoff date:** 2025-11-23 19:45 (America/Toronto)  
**Owner:** Marco Presta  
**Context:** Personal EVA Suite + AI Dev Orchestrator project (lab), built in public GitHub.

---

## 1. Purpose of the Dec 24 demo

Deliver a **live, navigable EVA Suite demo** at:

> `https://marcopolo483.github.io/eva-suite/`

The demo must show:

- EVA Suite as a **coherent product family**, not just a single app.
- A small number of **hero flows** that feel alive and believable.
- All other products present with **light but functional demos**.
- A clear path from **mock data** now to **real EVA Foundation integration** later.

Scope is explicitly **“extensive but shallow”**:
- Cover all products.
- Go deeper only on a few flagship experiences.

---

## 2. High-level goals

By December 24, 2025, the EVA Suite demo should:

1. **Expose all EVA Suite products**
   - Products loaded from `eva-suite-products.json`.
   - Each product has:
     - Its own page (`/products/:id`).
     - Name, category, emoji/icon.
     - Short description, audience, value.
     - Status tags (e.g., `Demo`, `Mock`, `Future`).
     - A *small working interaction* (form, mini-dashboard, toggle, etc.), powered by mock APIs and seeded data.

2. **Showcase 3+ hero demos**
   - Go one notch deeper on a few products to tell a compelling story:
     - **EVA LiveOps** – AI-assisted operational dashboard *(flagship)*.
     - **EVA DA** – Decision-support assistant with mock RAG + RaC explanation.
     - **EVA DevTools / AI Agile Crew** – AI-powered development pod view.
   - These hero demos should:
     - Use richer mock data.
     - Demonstrate cross-product concepts (projects, spaces, agents).
     - Show where real AI and telemetry will plug in later.

3. **Demonstrate the three-channel paradigm (lightly)**
   - Main focus: Web UI.
   - Optionally hint at:
     - Chat-style interactions (EVA Chat, EVA DA).
     - Voice as a future extension (icons, copy, not full implementation).

4. **Respect EVA’s core non-functional principles**
   - Accessible by design (WCAG 2.1 AA minded, within reasonable demo limits).
   - Bilingual-ready (EN/FR), with at least:
     - Language toggle.
     - Key UI elements available in both languages.
   - Clean, simple UX for storytelling.

---

## 3. Technical baseline for the demo

### 3.1 Frontend stack

- **Framework:** React 18 + TypeScript.
- **Bundler:** Vite (preferred) or CRA equivalent.
- **Hosting:** GitHub Pages.
- **Styling:** Simple, consistent CSS or utility framework (e.g., Tailwind) – no over-engineering.

### 3.2 Core features

- **Routing:**
  - `/` – EVA Suite overview page.
  - `/products/:id` – product detail pages.
- **Data:**
  - `eva-suite-products.json` as the **source of truth** for products.
  - Additional JSON files per hero product for seeded data, e.g.:
    - `src/data/liveops-demo.json`
    - `src/data/liveops-ai-insights.json`
    - `src/data/eva-da-demo-*.json`
    - `src/data/devtools-demo-*.json`
- **Design system (lightweight):**
  - Shared layout (`AppLayout`).
  - Reusable components:
    - `ProductCard`
    - `ProductHeader`
    - `KpiTile`
    - `DemoPanel`
    - Simple chart / table components.

---

## 4. Hero demos – minimal acceptance criteria

### 4.1 EVA LiveOps – AI-assisted dashboard

**Route:** `/products/liveops`

**Must have:**

- KPI tiles with mock metrics (sessions, error rate, p95 latency, APIM cost).
- Simple time-series visualization (sessions per hour/day).
- **AI Insight panel** (“EVA LiveOps Copilot”):
  - Viewpoint selector:
    - `Overview`, `Reliability`, `Performance`, `Cost`.
  - For each viewpoint, a mock explanation:
    - 1–2 sentence summary.
    - 2–4 key findings.
    - 1–3 recommendations.
- All metrics and insights driven by **static JSON**:
  - No real backends.
  - Clear, deterministic behavior.

---

### 4.2 EVA DA – Decision-support demo

**Route:** `/products/da` (or similar)

**Must have:**

- Simple **question form**, e.g.:
  - “Ask a policy or eligibility question.”
- Mock “retrieved sources” section:
  - 2–3 fake document titles with metadata (e.g., policy section, jurisprudence ref).
- Mock **RaC decision** block:
  - “Result: Eligible / Not Eligible / Needs Review.”
  - Short, human-readable explanation using conditions.
- Optional domains selector:
  - Jurisprudence vs CPP-D vs generic “EVA DA”.
- All data driven by JSON, with a clear path to real RAG + RaC later.

---

### 4.3 EVA DevTools / AI Agile Crew – Dev pod demo

**Route:** `/products/devtools` or `/products/ai-dev-crew`

**Must have:**

- Table of **AI agents**:
  - Name, specialty, status (Idle / Working / Blocked).
- Simple **sprint toggle**:
  - E.g., `Sprint 3` / `Sprint 4`.
  - Changing sprint updates:
    - Which tasks are done / in progress.
    - A short “AI Coach” sprint summary.
- All driven by JSON, hinting at:
  - How the AI Dev Orchestrator will work.
  - How agents share tools and lessons learned.

---

## 5. “Light demos” for the rest of EVA Suite

All remaining products must:

- Use the common `ProductPage` template.
- Provide:
  - Description, audience, value, status.
  - At least one **interactive element**, for example:
    - Toggle between modes.
    - Filter a small fake list.
    - Simple KPI or settings panel.

Mock data is sufficient; focus on:

- Clear explanation of what the product is.
- Visual and interaction coherence with the rest of the Suite.

---

## 6. Non-functional expectations for the demo

- **Accessibility (a11y)**
  - Use semantic HTML landmark elements (`header`, `nav`, `main`, `footer`).
  - Keyboard navigation must work across menus, buttons, and controls.
  - Provide text alternatives for icons and decorative elements where needed.
  - Maintain reasonable color contrast.

- **Internationalization (i18n)**
  - Implement a simple language toggle (EN/FR).
  - Key UI labels, titles, and navigation items available in both languages.
  - Content texts may start EN-first with FR added progressively.

- **Simplicity**
  - Prefer clarity and consistency over visual complexity.
  - Keep dependencies minimal.

---

## 7. Out-of-scope for Dec 24 demo

Explicitly **not** required by December 24, 2025:

- Real APIM / telemetry integration.
- Real Azure OpenAI / LLM calls.
- Authentication and role-based access.
- Production-ready error handling and observability.
- Full WCAG audit.

These belong to the **post-demo Azure/EVA Foundation integration** phase.

---

## 8. Narrative for the demo

The Dec 24 demo should support a 10–15 minute narrative that:

1. Introduces EVA Suite as ESDC’s **AI-powered ecosystem**, not a single bot.
2. Walks through:
   - EVA Chat / EVA DA as front-door assistants.
   - EVA LiveOps as the **self-observing dashboard**.
   - EVA DevTools / AI Agile Crew as the **AI factory** behind the scenes.
3. Highlights:
   - Mock data now, but real telemetry / AI planned.
   - Bilingual, accessible foundations.
   - The coming **AI Dev Orchestrator** that will automate more and more of EVA’s development.

**This document is the authoritative scope for the Dec 24, 2025 EVA Suite demo.**
