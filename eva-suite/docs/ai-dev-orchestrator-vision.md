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



