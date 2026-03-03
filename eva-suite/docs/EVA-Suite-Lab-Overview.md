# EVA Suite Lab – What I Built With AI in a Few Hours

## 1. Context

This is a personal lab experiment exploring what a **Canadian, public-sector-grade EVA platform** could look like when it is:

- Built with **AI assistance** (ChatGPT + GitHub Copilot),
- Structured and driven by an **EVA Dev Orchestrator** (plans + CLI),
- Packaged as an **EVA Suite** of products instead of a single chatbot.

Everything runs in my personal GitHub and Azure lab environment.  
Nothing here is production; it is intentionally a sandbox for ideas and patterns.

Public demo URL (lab only):  
`https://marcopolo483.github.io/eva-suite/`

---

## 2. What exists today

### 2.1 EVA Suite UI (React + Vite)

The `eva-suite` repo is a Vite + React + TypeScript app that presents EVA not as one tool, but as a **suite of 24 product ideas**:

- Products are grouped by themes: operations, decision-support, developer tools, accessibility, impact, and "moonshot" concepts.
- Each product card has a name, category, and short description.
- Clicking a product opens a dedicated product page.

For the December lab demo, six of these products have **fully implemented "hero" experiences** backed by mock data:

1. **EVA LiveOps**  
   Operational cockpit for EVA:
   - KPIs for sessions, error rate, p95 latency, and APIM cost (mocked).
   - Simple sessions-by-hour chart.
   - "EVA LiveOps Copilot" panel with narrative views (overview, reliability, performance, cost).

2. **EVA DA (Decision-Support Demo)**  
   Static neurosymbolic decision-support pattern:
   - Domain selector (e.g., CPP-D, EI).
   - Structured answer with decision, explanation, conditions, sources, and disclaimers.
   - Shows how RAG + rules could support explainable decisions without using real client data.

3. **EVA DevTools / AI Dev Crew**  
   AI-assisted dev team view:
   - Sprint overview (goal + status).
   - Agents (Planner, Frontend, Docs, QA) with roles, focus, and capacity.
   - Tasks table aligned to the sprint.
   - "AI Sprint Coach" panel with highlights, risks, and next steps.

4. **EVA Accessibility**  
   Accessibility coaching demo:
   - Simulated accessibility scan (WCAG references, severity, suggested fixes).
   - "AI Accessibility Coach" summarizing quick wins.
   - Clear demo-only disclaimer.

5. **EVA Impact Analyzer**  
   Executive ROI toy:
   - Scenarios (Conservative / Expected / Ambitious) with inputs and outputs.
   - Annual hours saved, gross and net savings, ROI%, payback months.
   - "Impact Narrator" panel explaining what each scenario would mean.

6. **EVA Process Mapper**  
   Journey + system view:
   - Swimlane-style map of a fictional OAS enquiry flow (citizen, IVR, agent, EVA, program systems).
   - "EVA-assisted" tags on relevant steps (RAG lookup, simplified rules).
   - "Process Coach" panel with highlights, opportunities, and a strong disclaimer.

Together, these six heroes already cover **operations, decisions, dev workflow, accessibility, impact, and process** in one coherent tour.

---

### 2.2 EVA Dev Orchestrator (Python CLI)

The EVA Dev Orchestrator lives in a separate `eva-orchestrator` repo and acts as a small **Dev Orchestrator** engine:

- Plans are expressed as YAML:
  - `sprint-heroes-demo.yml` – plan for the initial 6 hero demos.
  - `eva-suite-polish-deploy-v1.yml` – follow-up plan for polish, i18n, a11y, deploy, and demo docs.
- Each plan has:
  - `plan_id`, label, owner, description, tags.
  - `tasks[]` with id, title, repo, path hints, kind, status, and detailed instructions.

The CLI supports multiple modes:

- `--mode dry-run`  
  - Load a plan, print header + task table.  
  - With `--task <id>`, focus on a single task.

- `--mode print-prompts`  
  - For each task (or a specific one with `--task`), build a detailed AI prompt from the plan and print it.  
  - These prompts can be pasted into ChatGPT or Copilot as "fuel" for code generation.

- `--mode propose-patch` (wired but dormant until the API key is set)  
  - For a given task:
    - Build a prompt,
    - Call the OpenAI API (once configured),
    - Write the response to `out/proposals/PLAN__TASK__TIMESTAMP.md` for review.  
  - No automatic `git apply`; everything stays manual and reviewable.

The **hero plan** is now marked as `done` for all six tasks.  
The **polish+deploy plan** is defined and ready to be executed task-by-task using `print-prompts` and Copilot.

---

## 3. How AI was used

This lab was intentionally built **with AI in the loop**, not just as a target:

- ChatGPT and GitHub Copilot:
  - Generated React components, TypeScript types, mock JSON data, and routing.
  - Helped design the EVA Suite information architecture (products + categories).
  - Helped shape the Dev Orchestrator (plan schema, CLI, `--task` filter, `propose-patch` mode).
- My role was to:
  - Define the **vision** and the constraints (EVA context, public sector, bilingual, a11y, governance).
  - Drive the **plan** (what features exist, what heroes matter).
  - Review and steer the AI output (structure, naming, clarity, safety).

Time-wise, the core of this demo (Suite + 6 heroes + Orchestrator) came together in **hours**, not weeks.

---

## 4. Why this matters for IITB / AICOE / ESDC

This lab is not just a pretty demo; it shows a **working pattern**:

1. **From vision to plan**  
   - Use YAML plans as a single source of truth for what the AI dev crew should build.  
   - Plans are inspectable, versioned, and discussable.

2. **From plan to prompts**  
   - The Orchestrator turns tasks into structured prompts.  
   - AI tools (ChatGPT, Copilot) consume those prompts to generate code and docs.

3. **From prompts to artifacts**  
   - Code lives in standard repos (React, Python).  
   - The suite is deployed as a standard static app (GitHub Pages in this lab).

This pattern:

- Scales to more EVA products and internal apps.
- Supports **traceability** (which plan / task produced which change).
- Keeps humans in control: AI proposes, humans review and integrate.
- Aligns with ESDC's need for **accelerated delivery** without losing governance.

---

## 5. Next steps (beyond the lab)

Natural next steps after this lab:

- Turn `propose-patch` into a real, but safe, workflow:
  - Use OpenAI in batch to generate proposals,
  - Review them manually or integrate with GitHub pull requests.
- Move from mock data to real telemetry and curated content:
  - Connect EVA LiveOps to APIM,
  - Connect EVA DA and Process Mapper to real (non-personal) guidance sources.
- Share this pattern with AICOE / IITB:
  - As a model for **AI-supported development**,
  - As a concrete example of how EVA can be built *by* AI as well as *for* AI.

For now, this lab gives a tangible, clickable answer to:
> "What would it look like if we built EVA as a suite, with AI helping us build it?"
