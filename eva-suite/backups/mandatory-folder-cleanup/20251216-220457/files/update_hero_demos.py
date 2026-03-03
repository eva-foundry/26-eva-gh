#!/usr/bin/env python3
"""
Update hero demo product descriptions to be more showcase-friendly
"""
import json

# Load the JSON file
with open('src/data/eva-suite-products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

products = data['eva_suite']['products']

# Update EVA LiveOps (id 11)
for product in products:
    if product['id'] == 11:
        product['description'] = "AI-Assisted Operations Dashboard - The operational nerve center for EVA Suite. Real-time KPIs (sessions, errors, latency, costs), time-series visualizations, and an AI-powered Copilot that provides intelligent insights from multiple viewpoints: Overview, Reliability, Performance, and Cost. Instead of drowning in metrics, LiveOps surfaces what matters with AI-generated findings and recommendations. Think 'How is EVA doing right now?' - answered intelligently."
        product['use_case'] = {
            "title": "Platform Team's Morning Review",
            "steps": [
                "DevOps lead opens EVA LiveOps at 8am",
                "Sees 4,821 sessions in last 24h, 0.7% error rate, 640ms P95 latency, $37 APIM cost",
                "Sessions-by-hour chart shows peak at 2pm yesterday",
                "Clicks 'Reliability' viewpoint in AI Copilot panel",
                "EVA: 'Error rate stable but 34 timeout errors spiked at 2pm - investigate API Gateway'",
                "Lead checks logs, finds temp Azure region slowdown (resolved)",
                "Switches to 'Cost' viewpoint: 'Daily spend trending up 8% - consider caching strategy'",
                "Lead: 'Add Redis cache investigation to sprint backlog'"
            ],
            "result": "10-minute intelligent review vs 45 minutes manually analyzing logs and charts"
        }
        product['moonshot'] = "AI-powered observability - predict and prevent incidents before they impact users. Operations dashboard that thinks."
        product['has_dual_buttons'] = True

# Update EVA DA (id 2)
for product in products:
    if product['id'] == 2:
        product['description'] = "Decision Assistant with Neurosymbolic AI - Combines RAG (Retrieval-Augmented Generation) for knowledge search with RaC (Rules as Code) for logical reasoning. Ask complex policy questions across two domains: CPP-D (Disability) and Employment Insurance. EVA DA retrieves curated policy documents, applies simplified eligibility rules, and provides structured answers with: clear decision, human explanation, evaluated conditions, source citations, and disclaimers. The guardrail: AI explains, rules decide - no hallucinations on eligibility."

# Update EVA DevTools (id 22)
for product in products:
    if product['id'] == 22:
        product['description'] = "AI Agile Crew - Sprint Dashboard for AI-Assisted Development. Visualize your AI dev team in action: 4 specialized agents (Sprint Planner, Frontend Dev, Documentation Writer, QA Engineer) working across sprints. See agent status (Working/Idle/Blocked), current focus, capacity utilization, task assignments, and progress. Includes AI Sprint Coach panel providing synthesized sprint health: on-track status, highlights, risks, and recommended next steps. This is the DevTools that builds DevTools - showing how EVA Suite itself gets developed with AI assistance."
        product['use_case'] = {
            "title": "Sprint Review Meeting",
            "steps": [
                "Product Owner opens EVA DevTools at sprint review",
                "Selects 'Sprint 3' - Goal: Deliver LiveOps, EVA DA, and DevCrew hero demos",
                "Sees 4 agents: Planner (85% capacity), Frontend (90%), Docs (40%), QA (60%)",
                "Reviews 6 tasks: EVA Suite shell (Done), LiveOps dashboard (Done), EVA DA demo (Done), DevCrew dashboard (Done), Documentation (In Progress), QA test coverage (In Progress)",
                "AI Sprint Coach summary: 'Sprint on track. 4 of 6 tasks complete. Risk: QA capacity at 60% - may need help for final testing.'",
                "PO: 'Let's add QA support for Sprint 4 and keep frontend capacity high'",
                "Switches to 'Sprint 4' preview - sees new tasks queued, agents ready"
            ],
            "result": "Instant sprint health visibility - know exactly where AI agents are working and what needs attention"
        }
        product['moonshot'] = "Software development at AI speed - 10 specialized agents accelerating every phase of SDLC. The tools that build the tools."
        product['has_dual_buttons'] = True

# Update EVA Accessibility (id 18)
for product in products:
    if product['id'] == 18:
        product['description'] = "AI-Powered WCAG Scanner - Accessibility-first development assistant. Simulates scanning a target website (EVA Suite Product Explorer) and provides detailed accessibility audit: overall grade, issue counts (errors, warnings, passes), and itemized findings with WCAG references, severity levels, problem descriptions, and suggested fixes. Includes 'AI Accessibility Coach' panel offering quick-win recommendations and next steps. Think of it as your accessibility copilot - making WCAG compliance actionable for developers and designers."
        product['use_case'] = {
            "title": "Frontend Dev's Accessibility Review",
            "steps": [
                "Developer opens EVA Accessibility after building new feature",
                "Sees scan target: EVA Suite - Product Explorer, Grade B (demo)",
                "Summary: 7 issues, 4 warnings, 23 passes",
                "Reviews Issue AX1 (WCAG 1.4.3): 'Some secondary text contrast below 4.5:1 - darken background'",
                "Issue AX2 (WCAG 2.4.1): 'No skip link for keyboard users - add jump to main content'",
                "AI Accessibility Coach suggests: 'Quick fixes: add skip link, raise text contrast, use semantic headings, group product cards with ARIA labels'",
                "Developer: 'I can fix 3 of these in 20 minutes'",
                "Makes changes, re-scans → Grade A-"
            ],
            "result": "Actionable accessibility insights in minutes vs days of manual WCAG audits"
        }
        product['moonshot'] = "Make every application accessible by default - accessibility as AI-powered guidance, not an afterthought."
        product['has_dual_buttons'] = True

# Update EVA Impact Analyzer (id 24)
for product in products:
    if product['id'] == 24:
        product['description'] = "ROI Calculator for EVA Suite - Executive-friendly business case tool. Choose from 3 illustrative scenarios (Conservative, Expected, Ambitious) to model department-wide EVA rollout impact. Input employee count, hours saved per week, hourly cost, and platform cost - get instant outputs: annual hours saved, gross/net savings, ROI percentage, and payback period in months. Includes 'Impact Narrator' panel translating numbers into executive-friendly narratives. Answers the CFO's question: 'If I invest $X in EVA, what do I get back and how fast?'"
        product['use_case'] = {
            "title": "Executive Business Case Review",
            "steps": [
                "CFO asks CIO: 'What's the business case for EVA Suite?'",
                "CIO opens EVA Impact Analyzer during meeting",
                "Selects 'Expected' scenario: 1,000 employees, 1 hour/week saved, $60/hour cost",
                "Inputs: $300K annual platform cost",
                "Outputs appear instantly: 46,000 hours saved annually, $2.76M gross savings, $2.46M net savings, 820% ROI, 1.5 month payback",
                "Impact Narrator: 'At roughly one hour saved per week per knowledge worker, EVA becomes a major productivity lever with fast payback'",
                "CFO: 'Show me Conservative scenario too'",
                "CIO switches: 500 employees, 0.5 hours/week → still 245% ROI, 4-month payback",
                "CFO: 'Even conservative looks compelling. Let's proceed.'"
            ],
            "result": "30-second business case vs weeks of spreadsheet modeling - instant executive clarity"
        }
        product['moonshot'] = "Business impact modeling from weeks to seconds - transparent, defensible ROI for AI investments. CFO-friendly intelligence."
        product['has_dual_buttons'] = True

# Update EVA Process Mapper (id 23)
for product in products:
    if product['id'] == 23:
        product['description'] = "AI-Powered Process Visualization - Journey mapping with EVA integration insights. Visualize how citizen enquiries flow across channels, agents, and systems with EVA Suite embedded in the workflow. This demo shows a simplified OAS enquiry journey: citizen calls → IVR routing → agent interaction → EVA knowledge retrieval + rule evaluation → citizen receives answer. Swimlane-style layout shows 5 actors (Citizen, IVR, Agent, EVA, Program Systems) across 11 ordered steps, highlighting EVA-assisted touchpoints with special badges. Includes 'EVA Process Coach' panel explaining the map and identifying optimization opportunities."
        product['use_case'] = {
            "title": "Service Design Workshop",
            "steps": [
                "Business Analyst facilitating 'OAS Service Journey' workshop",
                "Opens EVA Process Mapper to show current-state demo",
                "Team sees 5 swimlanes: Citizen → IVR → Agent → EVA → Program Systems",
                "Step 7 highlighted: 'EVA retrieves OAS policies and job aids (RAG)' - EVA-assisted",
                "Step 8: 'EVA applies simplified eligibility rules (RaC-style)' - EVA-assisted",
                "BA: 'Notice how EVA sits between the agent and knowledge/rules - not replacing humans, augmenting them'",
                "EVA Process Coach panel shows opportunities: 'Automate client situation capture', 'Integrate IVR for early advice', 'Connect to downstream program systems'",
                "Product Manager: 'This makes it clear where EVA adds value - let's prioritize IVR integration'",
                "BA exports diagram for stakeholder deck"
            ],
            "result": "Stakeholder alignment in 15 minutes vs 2 weeks of meetings and Visio iterations"
        }
        product['moonshot'] = "Business analysis at conversation speed - describe processes in plain language, get production-ready diagrams with AI integration insights."
        product['has_dual_buttons'] = True

# Save the updated JSON
with open('src/data/eva-suite-products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Updated hero demo descriptions for 6 products:")
print("   - EVA LiveOps (id 11)")
print("   - EVA DA (id 2)")
print("   - EVA DevTools (id 22)")
print("   - EVA Accessibility (id 18)")
print("   - EVA Impact Analyzer (id 24)")
print("   - EVA Process Mapper (id 23)")
