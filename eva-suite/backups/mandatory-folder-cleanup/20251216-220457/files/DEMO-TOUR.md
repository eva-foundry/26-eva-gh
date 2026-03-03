# EVA Suite – Demo Tour Guide

**Welcome to the EVA Suite Demo!**

This guide provides a suggested narrative for walking through the 6 hero demos in the EVA Suite showcase. Each demo represents a different product category and demonstrates how EVA agents can transform enterprise workflows.

> ⚠️ **Important**: This is a **personal lab demo** created for demonstration purposes. All data is mock/fictional, and these are not production systems.

---

## Demo Tour Narrative

### Start: Home Page

Begin at the EVA Suite home page where you'll see the vision banner:

> _"I see EVA everywhere... agents talking to agents."_ – Marco's email, December 2023

The home page displays all 24 EVA Suite products across 5 categories. Look for the green **✨ Demo** badges on 6 products – these have live interactive demos.

**Language Toggle**: Notice the EN/FR toggle in the header – EVA Suite supports bilingual interfaces.

---

## The 6 Hero Demos

### 1. 📊 EVA LiveOps

**Where to find it**: Click on "EVA LiveOps" from the home grid

**What it demonstrates**:
EVA LiveOps provides real-time operational intelligence for your infrastructure. This demo shows:
- **24-hour KPI Dashboard**: Sessions, error rates, P95 latency, and APIM costs
- **Hourly Trends Chart**: Visual bar chart showing session volume patterns
- **AI Copilot Panel**: Multiple viewpoints (Overview, Performance, Cost, Reliability) with AI-generated insights, findings, and recommendations

**Key takeaway**: EVA doesn't just show metrics – it interprets them and suggests actions through natural language insights.

---

### 2. 🧠 EVA DA (Decision Assistant)

**Where to find it**: Click on "EVA DA" from the home grid

**What it demonstrates**:
EVA DA provides decision-support for complex government policy scenarios. This demo shows:
- **Domain Selection**: Choose between CPP-D (Canada Pension Plan – Disability) or EI (Employment Insurance)
- **Question Input**: Ask policy questions (pre-populated examples available)
- **Structured Answers**: Decision, explanation, conditions, and source references
- **Disclaimers**: Clear notices that this is mock data for demonstration

**Key takeaway**: EVA can structure complex domain knowledge into actionable, cited decision support – critical for regulated environments.

---

### 3. 🛠️ EVA DevTools / AI Dev Crew

**Where to find it**: Click on "EVA DevTools" or "AI Dev Crew" from the home grid

**What it demonstrates**:
EVA DevTools orchestrates AI agents to manage software development sprints. This demo shows:
- **Sprint Dashboard**: Current sprint info (Sprint 12, Dec 16-30, 2024)
- **AI Agents Table**: 4 specialized agents (Planner, Frontend Dev, Docs Writer, QA Engineer) with their status and current focus
- **Tasks Board**: 6 tasks with types, assignees, and progress status
- **AI Sprint Coach**: Summary panel with progress insights and recommendations

**Key takeaway**: EVA coordinates multiple specialized AI agents working together on complex projects – true "agents talking to agents."

---

### 4. ♿ EVA Accessibility

**Where to find it**: Click on "EVA Accessibility" from the home grid

**What it demonstrates**:
EVA Accessibility scans applications for WCAG compliance issues and suggests fixes. This demo shows:
- **Scan Summary**: Overall grade (C+), issue counts, warnings, and passes
- **Issues List**: Specific WCAG violations with:
  - Impact level (Critical, Major, Minor)
  - WCAG reference codes (1.4.3, 2.1.1, etc.)
  - Affected components and fix recommendations
- **AI Accessibility Coach**: Prioritized quick wins and remediation strategy

**Key takeaway**: EVA brings expert accessibility knowledge to every developer, making compliance achievable and understandable.

---

### 5. 📈 EVA Impact Analyzer

**Where to find it**: Click on "EVA Impact Analyzer" from the home grid

**What it demonstrates**:
EVA Impact Analyzer helps stakeholders model and communicate ROI for AI investments. This demo shows:
- **Scenario Selection**: Conservative, Expected, or Ambitious outcomes
- **Input Panel**: Employees affected, hours saved per week, hourly cost
- **Output Panel**: Annual savings, ROI percentage, payback period, productivity gain, FTE equivalent
- **Impact Narrator**: Natural language summary of the business case

**Key takeaway**: EVA translates technical capabilities into business outcomes that executives understand.

---

### 6. 🗺️ EVA Process Mapper

**Where to find it**: Click on "EVA Process Mapper" from the home grid

**What it demonstrates**:
EVA Process Mapper visualizes service delivery journeys and identifies automation opportunities. This demo shows:
- **Swimlane View**: 11-step OAS (Old Age Security) enquiry process across 5 actors (Citizen, EVA, Agent, Database, Manager)
- **EVA-Assisted Badges**: Green badges highlight steps where EVA provides assistance
- **Process Details**: Each step shows timing, complexity, and descriptions
- **EVA Process Coach**: Highlights, automation opportunities, and disclaimers

**Key takeaway**: EVA makes complex multi-actor processes visible and identifies where AI can reduce friction and delays.

---

## Suggested Demo Flow

**For a 10-minute demo:**
1. **Start** at Home – explain the vision (2 min)
2. **EVA LiveOps** – show real-time ops intelligence (2 min)
3. **EVA DA** – demonstrate decision support (2 min)
4. **EVA DevTools** – show agent coordination (2 min)
5. **EVA Impact Analyzer** – discuss ROI modeling (1 min)
6. **Wrap up** – return to Home, mention the other 18 products in the roadmap (1 min)

**For a 5-minute demo:**
1. **Start** at Home – quick vision (1 min)
2. **EVA LiveOps** – ops intelligence (1.5 min)
3. **EVA DevTools** – agent collaboration (1.5 min)
4. **EVA Impact Analyzer** – business value (1 min)

**For a deep dive (20-30 minutes):**
Walk through all 6 demos sequentially, showing interactions in each panel and discussing the AI architecture behind each product.

---

## Technical Notes

- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router with `/eva-suite/` base path
- **i18n**: Basic English/French support with context provider
- **Styling**: Dark theme with consistent design system
- **Data**: All demos use static JSON mock data

---

## Questions to Address During Demo

1. **"Is this real data?"** → No, all data is mock/fictional for demonstration purposes.
2. **"Can I test it myself?"** → Yes! The demo is interactive – click around and explore.
3. **"Are these production systems?"** → No, this is a personal lab project showing the vision and potential of the EVA Suite.
4. **"What's the timeline?"** → This is Marco's personal project demonstrating capabilities envisioned in December 2023, built in 2025.
5. **"How do the agents actually work?"** → The UI simulates agent interactions; production versions would integrate with LLMs and orchestration frameworks.

---

## After the Demo

- Share the GitHub Pages URL for self-guided exploration
- Reference the README for technical documentation
- Discuss next steps for specific product interests

**Remember**: The power of EVA isn't just in individual products – it's in how they work together as an integrated platform where "agents talk to agents" to solve complex enterprise challenges.

---

*Demo guide created for EVA Suite showcase – December 24, 2025*
