Kickoff acknowledged ✅



\*\*Project EVA Suite + AI Dev Orchestrator\*\* is officially starting on:



> \*\*November 23, 2025 – 19:45 (America/Toronto)\*\*



From here, I’ll \*\*drive using the plan we agreed\*\*:



\* Build the \*\*best possible EVA Suite demo by Dec 24\*\*, and

\* In parallel, bootstrap the \*\*AI Dev Orchestrator\*\* that will eventually build \*anything\* you need.



No decisions needed right now, so I’m proceeding.



---



\## 1. First official artifacts for your repo



Here are the \*\*two anchor docs\*\* to add under `docs/` in your main EVA Suite repo (likely `eva-suite`).



\### `docs/demo-2025-12-24-scope.md`



```md

\# EVA Suite – December 24, 2025 Demo Scope



\*\*Kickoff date:\*\* 2025-11-23 19:45 (America/Toronto)  

\*\*Owner:\*\* Marco Presta  

\*\*Context:\*\* Personal EVA Suite + AI Dev Orchestrator project (lab), built in public GitHub.



---



\## 1. Purpose of the Dec 24 demo



Deliver a \*\*live, navigable EVA Suite demo\*\* at:



> `https://marcopolo483.github.io/eva-suite/`



The demo must show:



\- EVA Suite as a \*\*coherent product family\*\*, not just a single app.

\- A small number of \*\*hero flows\*\* that feel alive and believable.

\- All other products present with \*\*light but functional demos\*\*.

\- A clear path from \*\*mock data\*\* now to \*\*real EVA Foundation integration\*\* later.



Scope is explicitly \*\*“extensive but shallow”\*\*:

\- Cover all products.

\- Go deeper only on a few flagship experiences.



---



\## 2. High-level goals



By December 24, 2025, the EVA Suite demo should:



1\. \*\*Expose all EVA Suite products\*\*

&nbsp;  - Products loaded from `eva-suite-products.json`.

&nbsp;  - Each product has:

&nbsp;    - Its own page (`/products/:id`).

&nbsp;    - Name, category, emoji/icon.

&nbsp;    - Short description, audience, value.

&nbsp;    - Status tags (e.g., `Demo`, `Mock`, `Future`).

&nbsp;    - A \*small working interaction\* (form, mini-dashboard, toggle, etc.), powered by mock APIs and seeded data.



2\. \*\*Showcase 3+ hero demos\*\*

&nbsp;  - Go one notch deeper on a few products to tell a compelling story:

&nbsp;    - \*\*EVA LiveOps\*\* – AI-assisted operational dashboard \*(flagship)\*.

&nbsp;    - \*\*EVA DA\*\* – Decision-support assistant with mock RAG + RaC explanation.

&nbsp;    - \*\*EVA DevTools / AI Agile Crew\*\* – AI-powered development pod view.

&nbsp;  - These hero demos should:

&nbsp;    - Use richer mock data.

&nbsp;    - Demonstrate cross-product concepts (projects, spaces, agents).

&nbsp;    - Show where real AI and telemetry will plug in later.



3\. \*\*Demonstrate the three-channel paradigm (lightly)\*\*

&nbsp;  - Main focus: Web UI.

&nbsp;  - Optionally hint at:

&nbsp;    - Chat-style interactions (EVA Chat, EVA DA).

&nbsp;    - Voice as a future extension (icons, copy, not full implementation).



4\. \*\*Respect EVA’s core non-functional principles\*\*

&nbsp;  - Accessible by design (WCAG 2.1 AA minded, within reasonable demo limits).

&nbsp;  - Bilingual-ready (EN/FR), with at least:

&nbsp;    - Language toggle.

&nbsp;    - Key UI elements available in both languages.

&nbsp;  - Clean, simple UX for storytelling.



---



\## 3. Technical baseline for the demo



\### 3.1 Frontend stack



\- \*\*Framework:\*\* React 18 + TypeScript.

\- \*\*Bundler:\*\* Vite (preferred) or CRA equivalent.

\- \*\*Hosting:\*\* GitHub Pages.

\- \*\*Styling:\*\* Simple, consistent CSS or utility framework (e.g., Tailwind) – no over-engineering.



\### 3.2 Core features



\- \*\*Routing:\*\*

&nbsp; - `/` – EVA Suite overview page.

&nbsp; - `/products/:id` – product detail pages.

\- \*\*Data:\*\*

&nbsp; - `eva-suite-products.json` as the \*\*source of truth\*\* for products.

&nbsp; - Additional JSON files per hero product for seeded data, e.g.:

&nbsp;   - `src/data/liveops-demo.json`

&nbsp;   - `src/data/liveops-ai-insights.json`

&nbsp;   - `src/data/eva-da-demo-\*.json`

&nbsp;   - `src/data/devtools-demo-\*.json`

\- \*\*Design system (lightweight):\*\*

&nbsp; - Shared layout (`AppLayout`).

&nbsp; - Reusable components:

&nbsp;   - `ProductCard`

&nbsp;   - `ProductHeader`

&nbsp;   - `KpiTile`

&nbsp;   - `DemoPanel`

&nbsp;   - Simple chart / table components.



---



\## 4. Hero demos – minimal acceptance criteria



\### 4.1 EVA LiveOps – AI-assisted dashboard



\*\*Route:\*\* `/products/liveops`



\*\*Must have:\*\*



\- KPI tiles with mock metrics (sessions, error rate, p95 latency, APIM cost).

\- Simple time-series visualization (sessions per hour/day).

\- \*\*AI Insight panel\*\* (“EVA LiveOps Copilot”):

&nbsp; - Viewpoint selector:

&nbsp;   - `Overview`, `Reliability`, `Performance`, `Cost`.

&nbsp; - For each viewpoint, a mock explanation:

&nbsp;   - 1–2 sentence summary.

&nbsp;   - 2–4 key findings.

&nbsp;   - 1–3 recommendations.

\- All metrics and insights driven by \*\*static JSON\*\*:

&nbsp; - No real backends.

&nbsp; - Clear, deterministic behavior.



---



\### 4.2 EVA DA – Decision-support demo



\*\*Route:\*\* `/products/da` (or similar)



\*\*Must have:\*\*



\- Simple \*\*question form\*\*, e.g.:

&nbsp; - “Ask a policy or eligibility question.”

\- Mock “retrieved sources” section:

&nbsp; - 2–3 fake document titles with metadata (e.g., policy section, jurisprudence ref).

\- Mock \*\*RaC decision\*\* block:

&nbsp; - “Result: Eligible / Not Eligible / Needs Review.”

&nbsp; - Short, human-readable explanation using conditions.

\- Optional domains selector:

&nbsp; - Jurisprudence vs CPP-D vs generic “EVA DA”.

\- All data driven by JSON, with a clear path to real RAG + RaC later.



---



\### 4.3 EVA DevTools / AI Agile Crew – Dev pod demo



\*\*Route:\*\* `/products/devtools` or `/products/ai-dev-crew`



\*\*Must have:\*\*



\- Table of \*\*AI agents\*\*:

&nbsp; - Name, specialty, status (Idle / Working / Blocked).

\- Simple \*\*sprint toggle\*\*:

&nbsp; - E.g., `Sprint 3` / `Sprint 4`.

&nbsp; - Changing sprint updates:

&nbsp;   - Which tasks are done / in progress.

&nbsp;   - A short “AI Coach” sprint summary.

\- All driven by JSON, hinting at:

&nbsp; - How the AI Dev Orchestrator will work.

&nbsp; - How agents share tools and lessons learned.



---



\## 5. “Light demos” for the rest of EVA Suite



All remaining products must:



\- Use the common `ProductPage` template.

\- Provide:

&nbsp; - Description, audience, value, status.

&nbsp; - At least one \*\*interactive element\*\*, for example:

&nbsp;   - Toggle between modes.

&nbsp;   - Filter a small fake list.

&nbsp;   - Simple KPI or settings panel.



Mock data is sufficient; focus on:



\- Clear explanation of what the product is.

\- Visual and interaction coherence with the rest of the Suite.



---



\## 6. Non-functional expectations for the demo



\- \*\*Accessibility (a11y)\*\*

&nbsp; - Use semantic HTML landmark elements (`header`, `nav`, `main`, `footer`).

&nbsp; - Keyboard navigation must work across menus, buttons, and controls.

&nbsp; - Provide text alternatives for icons and decorative elements where needed.

&nbsp; - Maintain reasonable color contrast.



\- \*\*Internationalization (i18n)\*\*

&nbsp; - Implement a simple language toggle (EN/FR).

&nbsp; - Key UI labels, titles, and navigation items available in both languages.

&nbsp; - Content texts may start EN-first with FR added progressively.



\- \*\*Simplicity\*\*

&nbsp; - Prefer clarity and consistency over visual complexity.

&nbsp; - Keep dependencies minimal.



---



\## 7. Out-of-scope for Dec 24 demo



Explicitly \*\*not\*\* required by December 24, 2025:



\- Real APIM / telemetry integration.

\- Real Azure OpenAI / LLM calls.

\- Authentication and role-based access.

\- Production-ready error handling and observability.

\- Full WCAG audit.



These belong to the \*\*post-demo Azure/EVA Foundation integration\*\* phase.



---



\## 8. Narrative for the demo



The Dec 24 demo should support a 10–15 minute narrative that:



1\. Introduces EVA Suite as ESDC’s \*\*AI-powered ecosystem\*\*, not a single bot.

2\. Walks through:

&nbsp;  - EVA Chat / EVA DA as front-door assistants.

&nbsp;  - EVA LiveOps as the \*\*self-observing dashboard\*\*.

&nbsp;  - EVA DevTools / AI Agile Crew as the \*\*AI factory\*\* behind the scenes.

3\. Highlights:

&nbsp;  - Mock data now, but real telemetry / AI planned.

&nbsp;  - Bilingual, accessible foundations.

&nbsp;  - The coming \*\*AI Dev Orchestrator\*\* that will automate more and more of EVA’s development.



\*\*This document is the authoritative scope for the Dec 24, 2025 EVA Suite demo.\*\*

```



---



\### `docs/ai-dev-orchestrator-vision.md`



````md

\# AI Dev Orchestrator – Vision and Roadmap



\*\*Kickoff date:\*\* 2025-11-23 19:45 (America/Toronto)  

\*\*Owner:\*\* Marco Presta  

\*\*Context:\*\* EVA Suite is the first major “client” of this orchestrator.



---



\## 1. Vision



Build an \*\*AI Dev Orchestrator\*\* that can:



\- Read a \*\*plan\*\* from the repo.

\- Use OpenAI models as an \*\*AI Dev Crew\*\*.

\- Generate and update:

&nbsp; - Code (components, APIs, tests),

&nbsp; - Documentation (MD files),

&nbsp; - Config (JSON/YAML, routes),

\- Run tests / builds,

\- And deliver changes as \*\*branches/PRs\*\* for human review.



EVA Suite is the initial proving ground.  

The endgame is a reusable pattern:



> “Given a repo and a plan, the AI Dev Orchestrator can build and evolve any application, safely and repeatably.”



---



\## 2. Core concepts



\### 2.1 Plans



Plans are \*\*machine-readable work items\*\* stored in the repo, e.g.:



\- `plans/sprint-01-liveops.yaml`

\- `plans/eva-da-demo.yaml`



Each plan describes:



\- Goals (`sprint`, `name`, description).

\- Tasks:

&nbsp; - `id`

&nbsp; - `description`

&nbsp; - `outputs` – paths of files that should be created/updated.



Example:



```yaml

sprint: 1

name: "LiveOps AI demo"

tasks:

&nbsp; - id: liveops-dashboard

&nbsp;   description: "Create EVA LiveOps dashboard component and route."

&nbsp;   outputs:

&nbsp;     - path: "src/components/LiveOpsDashboard.tsx"

&nbsp;     - path: "src/data/liveops-demo.json"

&nbsp;     - path: "src/data/liveops-ai-insights.json"

&nbsp; - id: liveops-docs

&nbsp;   description: "Create product doc for EVA LiveOps AI-assisted demo."

&nbsp;   outputs:

&nbsp;     - path: "docs/eva-liveops-ai-demo.md"

````



Plans are authored by humans (Marco / Scrum Master), executed by the \*\*Orchestrator\*\*.



---



\### 2.2 Orchestrator



The Orchestrator is a script (initially `scripts/run\_plan.py`) that:



1\. Reads a plan file.

2\. Builds a \*\*repo summary\*\* (file tree, key docs).

3\. Calls \*\*OpenAI\*\* with:



&nbsp;  \* A system prompt defining the “EVA Dev Agent”.

&nbsp;  \* The plan YAML.

&nbsp;  \* The repo summary and relevant file snippets.

4\. Receives a structured \*\*JSON payload\*\* from the model, for example:



```jsonc

{

&nbsp; "artifacts": \[

&nbsp;   {

&nbsp;     "path": "src/components/LiveOpsDashboard.tsx",

&nbsp;     "content": "import React from 'react';\\n..."

&nbsp;   },

&nbsp;   {

&nbsp;     "path": "src/data/liveops-demo.json",

&nbsp;     "content": "{\\n  \\"context\\": { ... }\\n}"

&nbsp;   },

&nbsp;   {

&nbsp;     "path": "docs/eva-liveops-ai-demo.md",

&nbsp;     "content": "# EVA LiveOps – AI-Assisted Demo Dashboard\\n..."

&nbsp;   }

&nbsp; ],

&nbsp; "notes": "Created dashboard, mock data and doc stub as requested."

}

```



5\. Writes `artifacts\[\*].path` to disk with the provided content.

6\. Optionally runs tests (e.g., `npm test`, `npm run build`).

7\. Leaves changes staged for commit or allows a GitHub Action to commit/push.



---



\### 2.3 Fix Agent



When something goes wrong (failing tests, broken layout, wrong behavior), a second “persona” – the \*\*Fix Agent\*\* – can be invoked with:



\* The plan.

\* The current git diff or file contents.

\* Error logs or a natural-language description of the problem.



The Fix Agent returns a payload like:



```jsonc

{

&nbsp; "patches": \[

&nbsp;   {

&nbsp;     "path": "src/components/LiveOpsDashboard.tsx",

&nbsp;     "content": "/\* corrected TSX content \*/"

&nbsp;   }

&nbsp; ],

&nbsp; "notes": "Fixed missing import and adjusted props."

}

```



The orchestration script or workflow applies patches, reruns tests, and presents the updated state.



---



\## 3. Where it runs: local and GitHub Actions



The same Orchestrator logic should work in:



1\. \*\*Local dev / Codespaces\*\*



&nbsp;  \* Good for:



&nbsp;    \* Early prompt experiments.

&nbsp;    \* Quick, iterative tuning of the Dev Agent.

&nbsp;  \* Run via:



&nbsp;    ```bash

&nbsp;    python scripts/run\_plan.py plans/sprint-01-liveops.yaml

&nbsp;    ```



2\. \*\*GitHub Actions\*\*



&nbsp;  \* Good for:



&nbsp;    \* Consistent, auditable runs.

&nbsp;    \* Multi-plan execution (matrix of plans).

&nbsp;    \* Automatic branch/PR creation.

&nbsp;  \* Workflow (concept):



&nbsp;    \* `ai-dev-plan.yml` for executing plans.

&nbsp;    \* `ai-dev-fix.yml` for fix runs.



This ensures the AI Dev Orchestrator is \*\*both exploratory and governed\*\*.



---



\## 4. Roadmap – staged rollout



\### Stage 0 – Helper (Now → Short Term)



\* Use ChatGPT directly to:



&nbsp; \* Design components, data structures, docs.

&nbsp; \* Manually copy-paste generated artifacts into the repo.

\* Purpose:



&nbsp; \* Finalize patterns for:



&nbsp;   \* File/folder layout.

&nbsp;   \* Component and doc formats.

&nbsp;   \* JSON schemas for demos.



\*\*Output:\*\* Stable demo patterns and specs (e.g., LiveOps AI-assisted dashboard).



---



\### Stage 1 – Single-plan Orchestrator MVP



\* Implement `scripts/run\_plan.py`:



&nbsp; \* Reads one plan YAML.

&nbsp; \* Calls OpenAI once.

&nbsp; \* Writes artifacts to disk in a structured way.

\* Plan example: `plans/sprint-01-liveops.yaml`.

\* Run locally first, then via a simple GitHub Action.

\* No fix logic yet; manual corrections via Copilot or direct edits.



\*\*Success criteria:\*\*



\* Orchestrator can create:



&nbsp; \* `LiveOpsDashboard.tsx`

&nbsp; \* LiveOps JSON data files

&nbsp; \* LiveOps MD doc

&nbsp;   from a single plan file, end to end.



---



\### Stage 2 – Multi-plan + test integration



\* Extend Orchestrator to:



&nbsp; \* Loop through multiple tasks in a plan.

&nbsp; \* Optionally accept a comma-separated list of plan files.

\* Add automatic:



&nbsp; \* `npm test` / `npm run build`.

&nbsp; \* Simple reporting (pass/fail, logs).

\* GitHub Actions:



&nbsp; \* `ai-dev-plan.yml` workflow to:



&nbsp;   \* Run `run\_plan.py` with an input plan.

&nbsp;   \* Commit changes to a branch and push.

&nbsp;   \* Optionally open a PR.



\*\*Success criteria:\*\*



\* For a small sprint (e.g., EVA LiveOps + EVA DA setup), the workflow:



&nbsp; \* Runs multiple plans.

&nbsp; \* Produces branches/PRs with generated code and docs.

&nbsp; \* Leaves human review as the gate to `main`.



---



\### Stage 3 – Fix Agent and guardrails



\* Implement `scripts/fix\_failure.py`:



&nbsp; \* Takes a plan and error log.

&nbsp; \* Calls a “Fix Agent” model.

&nbsp; \* Applies patches.



\* Add \*\*guardrails\*\*:



&nbsp; \* Limit which folders can be modified.

&nbsp; \* Reject destructive commands.

&nbsp; \* Limit artifacts count/size per run.

&nbsp; \* Track tokens and calls for FinOps purposes.



\* Extend GitHub Actions:



&nbsp; \* Enable `ai-dev-fix.yml` to run on demand.



\*\*Success criteria:\*\*



\* When a generated change fails tests or breaks something:



&nbsp; \* A fix run can propose and apply adjustments.

&nbsp; \* The process remains under human control via PRs.



---



\### Stage 4 – Generalization and reuse



Once proven on EVA Suite:



\* Generalize patterns so other projects can reuse:



&nbsp; \* Plan format.

&nbsp; \* Orchestrator script.

&nbsp; \* GitHub workflows.

\* Evolve into an \*\*“AI Dev Crew template”\*\*:



&nbsp; \* Ready to be cloned across repos.

&nbsp; \* Possibly integrated with future EVA / MSP Agentic templates.



---



\## 5. Principles and guardrails



The AI Dev Orchestrator must:



\* \*\*Keep humans in the loop\*\*



&nbsp; \* No direct pushes to `main`.

&nbsp; \* All changes go through branches and PR review.



\* \*\*Avoid dangerous operations\*\*



&nbsp; \* No direct deletion of arbitrary files/directories without explicit plan.

&nbsp; \* No shell commands beyond a safe allowlist (e.g., `npm test`, `npm run build`).



\* \*\*Respect repo conventions\*\*



&nbsp; \* File naming, TypeScript/React patterns, docs layout.

&nbsp; \* Use existing components and design system where possible.



\* \*\*Be observable and auditable\*\*



&nbsp; \* Log which plans were run, when, and on which branch.

&nbsp; \* Keep AI outputs and decisions traceable to specific tasks.



\* \*\*Start narrow, then expand\*\*



&nbsp; \* Initially focused on EVA Suite (React + TS + MD).

&nbsp; \* Later extensible to backend services, IaC, and other languages.



---



\## 6. EVA Suite as the first client



EVA Suite is the \*\*first product\*\* to be built and evolved using this Orchestrator:



\* Hero demos like \*\*EVA LiveOps\*\*, \*\*EVA DA\*\*, and \*\*EVA DevTools\*\* will:



&nbsp; \* Be designed with ChatGPT (interactive mode).

&nbsp; \* Be generated/refined by the Orchestrator (plan-based mode).



Every improvement to the Orchestrator should:



\* Make EVA Suite development faster and more consistent, and

\* Bring you closer to the long-term goal:



&nbsp; > “Automation to develop anything I need.”



\*\*This document is the authoritative vision and roadmap for the AI Dev Orchestrator in this repository.\*\*



```



---



\## 2. What you do next (concrete, no decisions needed)



1\. \*\*Create these two files\*\* in your main EVA repo:

&nbsp;  - `docs/demo-2025-12-24-scope.md`

&nbsp;  - `docs/ai-dev-orchestrator-vision.md`



2\. \*\*Commit \& push\*\* them.



3\. From there, the next move (which I’ll drive) will be:

&nbsp;  - Have you generate a \*\*repo structure snapshot\*\* (`tree -L 3 > repo-structure.txt` or similar) so I can see what’s already there and start reusing / refactoring instead of reinventing.



Whenever you’re ready after committing these, just tell me “done” and I’ll assume the docs exist and move to the next step in the plan.

::contentReference\[oaicite:0]{index=0}

```



