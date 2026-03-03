# Chapter 5: EVA Universe — The Complete Vision

> **"The whole is greater than the sum of its parts."**
> — Aristotle

This chapter presents the **complete EVA architectural vision** — the entire ecosystem visualized as an integrated, clickable universe map. After four chapters exploring philosophy, pods, lifecycle, and governance, we now see **how it all fits together**.

---

## 🌌 Introduction: Visualizing the Vision

EVA Suite is not a single application — it's a **multi-layered platform** serving dozens of solution spaces, governed by human oversight, powered by autonomous agents, and designed for Government of Canada scale and compliance.

This chapter provides:

1. **EVA Universe Map** — Giant clickable architecture showing the entire ecosystem
2. **Core Architecture Diagrams** — 5 essential SVGs explaining key subsystems:
   - EVA Nexus (Platform Spine)
   - EVA Sentinel (Governance Plane)
   - Stakeholder Interest Map
   - Multi-Tenant Architecture
   - Governance Lifecycle

3. **Integration Points** — How these diagrams connect to book chapters, patterns (P01-P22), and real deployments

---

## 🗺️ EVA Universe: The Giant Map

Below is the **complete EVA Suite architecture** — a single, navigable map showing:

- **UI Layer**: EVA Chat 2.0, Domain Assistant 2.0, Accelerator Control Panel, Sovereign-UI
- **EVA Nexus**: Core platform spine (API Gateway, P15 Orchestrator, Unified Retrieval, Model Routing)
- **Infrastructure**: Ingestion Fabric, Vector Store & Search
- **EVA Sentinel**: Governance & safety plane (P16 Awareness, P19 Action Classification, P21 Provenance, P11 Security, P10 Telemetry, P14 LiveOps)
- **ATO Pipeline**: ITSG-33, DADM, EVA Agentic ATO Template
- **Solution Spaces**: Jurisprudence AI, AssistMe, CPP-D Adjudication, KM AI, Evaluation Directorate
- **Operations Consoles**: FinOps (cost dashboards, chargeback), LiveOps (incidents, SLOs, runbooks)
- **Agentic Handbook**: P01-P21 patterns, Canada Agentic Template, ATO playbook

### Interactive SVG Map

Click any block to navigate to the corresponding app, documentation, or console.

<svg width="1500" height="1000" viewBox="0 0 1500 1000" xmlns="http://www.w3.org/2000/svg">
  <title>EVA Suite Universe — Clickable Architecture Map</title>
  <desc>
    High-level architecture map of EVA Suite showing UI apps, EVA Nexus, Sentinel governance, solution spaces, FinOps and LiveOps. Each block can be wired to its documentation or app.
  </desc>

  <style>
    .title-main { font-family: Arial, sans-serif; font-size: 30px; font-weight: bold; fill:#0f172a; }
    .subtitle  { font-family: Arial, sans-serif; font-size: 18px; fill:#4b5563; }
    .box-ui    { fill:#e0f2fe; stroke:#0369a1; stroke-width:2; rx:14; ry:14; }
    .box-core  { fill:#eef2ff; stroke:#4f46e5; stroke-width:2; rx:14; ry:14; }
    .box-svc   { fill:#ecfdf5; stroke:#047857; stroke-width:2; rx:12; ry:12; }
    .box-gov   { fill:#fef3c7; stroke:#d97706; stroke-width:2; rx:12; ry:12; }
    .box-ops   { fill:#f9fafb; stroke:#4b5563; stroke-width:2; rx:10; ry:10; }
    .label     { font-family: Arial, sans-serif; font-size:16px; fill:#111827; }
    .label-small { font-family: Arial, sans-serif; font-size:14px; fill:#374151; }
    .arrow     { stroke:#4b5563; stroke-width:2; marker-end:url(#arrowhead); }
    a:hover rect { stroke-width:3; }
  </style>

  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
    </marker>
  </defs>

  <!-- MAIN TITLE -->
  <text x="430" y="50" class="title-main">EVA Suite Universe</text>
  <text x="475" y="80" class="subtitle">
    Click any block to navigate to the corresponding app or documentation
  </text>

  <!-- ===================== TOP: EVA SUITE UI APPS ===================== -->
  <!-- EVA Chat -->
  <a href="/eva-library/components/chat-panel" target="_self">
    <rect x="120" y="120" width="260" height="90" class="box-ui" />
    <text x="150" y="155" class="label">EVA Chat 2.0</text>
    <text x="150" y="180" class="label-small">Secure conversational assistant</text>
  </a>

  <!-- EVA Domain Assistant -->
  <a href="/eva-agentic-book/10-case-studies" target="_self">
    <rect x="420" y="120" width="260" height="90" class="box-ui" />
    <text x="450" y="155" class="label">EVA Domain Assistant 2.0</text>
    <text x="450" y="180" class="label-small">RAG & domain search applications</text>
  </a>

  <!-- Accelerator Control Panel -->
  <a href="/eva-agentic-book/03-pods-lifecycle" target="_self">
    <rect x="720" y="120" width="260" height="90" class="box-ui" />
    <text x="750" y="155" class="label">Accelerator Control Panel</text>
    <text x="750" y="180" class="label-small">Self-service solution spaces</text>
  </a>

  <!-- Sovereign UI Docs -->
  <a href="/eva-library/index" target="_self">
    <rect x="1020" y="120" width="260" height="90" class="box-ui" />
    <text x="1050" y="155" class="label">EVA Sovereign-UI</text>
    <text x="1050" y="180" class="label-small">GC DS, WCAG 2.2, web components</text>
  </a>

  <!-- --------------------- arrows from UI to Nexus --------------------- -->
  <line x1="250" y1="210" x2="250" y2="280" class="arrow" />
  <line x1="550" y1="210" x2="550" y2="280" class="arrow" />
  <line x1="850" y1="210" x2="850" y2="280" class="arrow" />
  <line x1="1150" y1="210" x2="1150" y2="280" class="arrow" />

  <!-- ===================== CENTER: EVA NEXUS ===================== -->
  <a href="/eva-agentic-book/06-orchestration" target="_self">
    <rect x="260" y="280" width="620" height="120" class="box-core" />
    <text x="480" y="315" class="label">EVA Nexus — Core Platform Spine</text>
    <text x="290" y="345" class="label-small">• API Gateway (APIM)</text>
    <text x="290" y="365" class="label-small">• Multi-agent orchestration (P15)</text>
    <text x="630" y="345" class="label-small">• Unified retrieval & RAG</text>
    <text x="630" y="365" class="label-small">• Model routing & adapters</text>
  </a>

  <!-- Ingestion Fabric -->
  <a href="/agents/personas/SP01-Data-Ingestion" target="_self">
    <rect x="260" y="420" width="300" height="90" class="box-core" />
    <text x="290" y="455" class="label">Ingestion Fabric</text>
    <text x="290" y="480" class="label-small">OCR • ETL • pipelines • metadata</text>
  </a>

  <!-- Vector Store & Search -->
  <a href="/eva-agentic-book/07-workflows" target="_self">
    <rect x="580" y="420" width="300" height="90" class="box-core" />
    <text x="610" y="455" class="label">Retrieval & Vector Store</text>
    <text x="610" y="480" class="label-small">Semantic search • Reranking • Caching</text>
  </a>

  <!-- Arrows from Nexus to Ingestion & Retrieval -->
  <line x1="570" y1="400" x2="410" y2="420" class="arrow" />
  <line x1="570" y1="400" x2="750" y2="420" class="arrow" />

  <!-- ===================== RIGHT: SENTINEL & ATO ===================== -->
  <!-- EVA Sentinel -->
  <a href="/eva-agentic-book/04-safety-governance" target="_self">
    <rect x="970" y="290" width="390" height="150" class="box-gov" />
    <text x="995" y="320" class="label">EVA Sentinel — Safety & Governance</text>
    <text x="995" y="350" class="label-small">P16 Awareness • P19 Action Class</text>
    <text x="995" y="370" class="label-small">P21 Provenance • P11 Security</text>
    <text x="995" y="390" class="label-small">P10 Telemetry • P14 LiveOps</text>
  </a>

  <!-- ATO / Certification -->
  <a href="/agentic/EVA Canada Agentic AI Template vol3 - how-to" target="_self">
    <rect x="1010" y="470" width="310" height="90" class="box-gov" />
    <text x="1040" y="505" class="label">ATO & Certification Pipeline</text>
    <text x="1040" y="530" class="label-small">
      ITSG-33 • DADM • EVA Agentic ATO Template
    </text>
  </a>

  <!-- Arrows between Nexus & Sentinel / ATO -->
  <line x1="880" y1="340" x2="970" y2="340" class="arrow" />
  <line x1="1130" y1="440" x2="1130" y2="470" class="arrow" />

  <!-- ===================== BOTTOM: SOLUTION SPACES ===================== -->
  <rect x="100" y="540" width="880" height="210" class="box-svc" />
  <text x="130" y="575" class="label">EVA Solution Spaces (Multi-tenant)</text>

  <!-- Jurisprudence -->
  <a href="/eva-agentic-book/10-case-studies#jurisprudence-research-assistant" target="_self">
    <rect x="130" y="600" width="220" height="70" class="box-svc" />
    <text x="145" y="635" class="label-small">Jurisprudence AI</text>
    <text x="145" y="655" class="label-small">Decisions • precedents • RAG</text>
  </a>

  <!-- AssistMe -->
  <a href="/eva-agentic-book/10-case-studies#assistme-migration-companion" target="_self">
    <rect x="380" y="600" width="220" height="70" class="box-svc" />
    <text x="395" y="635" class="label-small">AssistMe Migration Space</text>
    <text x="395" y="655" class="label-small">KTM • sidekick • curated content</text>
  </a>

  <!-- CPP-D -->
  <a href="/eva-agentic-book/10-case-studies" target="_self">
    <rect x="630" y="600" width="220" height="70" class="box-svc" />
    <text x="645" y="635" class="label-small">CPP-D Adjudication Space</text>
    <text x="645" y="655" class="label-small">OCR • timeline • RAG assistant</text>
  </a>

  <!-- KM -->
  <a href="/eva-agentic-book/10-case-studies" target="_self">
    <rect x="255" y="690" width="220" height="70" class="box-svc" />
    <text x="270" y="725" class="label-small">Knowledge Management AI</text>
    <text x="270" y="745" class="label-small">BDM KM • SharePoint • docs</text>
  </a>

  <!-- Eval / Others -->
  <a href="/eva-agentic-book/10-case-studies" target="_self">
    <rect x="505" y="690" width="220" height="70" class="box-svc" />
    <text x="520" y="725" class="label-small">Evaluation Directorate AI</text>
    <text x="520" y="745" class="label-small">EVA Chat for Evaluators</text>
  </a>

  <!-- Arrows from Nexus to solution spaces -->
  <line x1="570" y1="510" x2="240" y2="600" class="arrow" />
  <line x1="570" y1="510" x2="490" y2="600" class="arrow" />
  <line x1="570" y1="510" x2="740" y2="600" class="arrow" />
  <line x1="570" y1="510" x2="365" y2="690" class="arrow" />
  <line x1="570" y1="510" x2="615" y2="690" class="arrow" />

  <!-- ===================== FOOTER: FINOPS & LIVEOPS ===================== -->

  <!-- FinOps Console -->
  <a href="/EVA-2.0/eva-finops/README" target="_self">
    <rect x="120" y="800" width="340" height="120" class="box-ops" />
    <text x="150" y="835" class="label">FinOps Console</text>
    <text x="150" y="860" class="label-small">Cost dashboards • APIM tags • project codes</text>
    <text x="150" y="880" class="label-small">Chargeback • optimization insights</text>
  </a>

  <!-- LiveOps Console -->
  <a href="/agents/devtools/P14-DevOps-LiveOps-Companion" target="_self">
    <rect x="520" y="800" width="340" height="120" class="box-ops" />
    <text x="550" y="835" class="label">LiveOps Console</text>
    <text x="550" y="860" class="label-small">Incidents • drift • safety events</text>
    <text x="550" y="880" class="label-small">Runbooks • SLOs • alert routing</text>
  </a>

  <!-- Agentic Docs / Patterns -->
  <a href="/agents/devtools/index" target="_self">
    <rect x="920" y="800" width="340" height="120" class="box-ops" />
    <text x="950" y="835" class="label">EVA Agentic Handbook</text>
    <text x="950" y="860" class="label-small">P01–P21 patterns • pods • phases</text>
    <text x="950" y="880" class="label-small">Canada Agentic Template • ATO playbook</text>
  </a>

  <!-- Arrows from Sentinel / Spaces down to Ops consoles -->
  <line x1="1130" y1="560" x2="1090" y2="800" class="arrow" />
  <line x1="570" y1="750" x2="690" y2="800" class="arrow" />
  <line x1="350" y1="750" x2="290" y2="800" class="arrow" />

</svg>

---

## 📐 Core Architecture Diagrams

The following 5 diagrams explain key subsystems in detail. Each is **production-ready SVG** — self-contained, accessible, responsive, and ready to embed in any UI framework.

### 1. EVA Nexus — Core Platform Spine

**Purpose**: Shows the layered architecture from UI → API Gateway → Orchestrator → Services.

<svg width="1100" height="760" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill:#eef2f7; stroke:#1f2937; stroke-width:2; rx:10; ry:10; }
    .title { font-family:Arial; font-size:22px; font-weight:bold; fill:#1f2937; }
    .text { font-family:Arial; font-size:16px; fill:#111827; }
    .arrow { stroke:#1f2937; stroke-width:2; marker-end:url(#arrowhead); }
  </style>

  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#1f2937"/>
    </marker>
  </defs>

  <!-- TITLE -->
  <text x="350" y="40" class="title">EVA Nexus — Core Platform Spine</text>

  <!-- UI LAYER -->
  <rect x="100" y="80" width="900" height="90" class="box"/>
  <text x="130" y="115" class="text">- EVA Chat 2.0</text>
  <text x="130" y="145" class="text">- EVA Domain Assistant 2.0</text>
  <text x="500" y="115" class="text">- Sovereign UI Library</text>

  <!-- APIM -->
  <rect x="420" y="200" width="260" height="70" class="box"/>
  <text x="455" y="240" class="text">EVA API Gateway (APIM)</text>

  <!-- Orchestrator -->
  <rect x="400" y="300" width="300" height="80" class="box"/>
  <text x="445" y="345" class="text">P15 Orchestrator & Agent Engine</text>

  <!-- Retrieval -->
  <rect x="90"  y="300" width="250" height="80" class="box"/>
  <text x="120" y="340" class="text">Unified Retrieval Layer</text>

  <!-- Model Adapters -->
  <rect x="740" y="300" width="260" height="80" class="box"/>
  <text x="760" y="340" class="text">Model Routing / Adapters</text>

  <!-- Ingestion -->
  <rect x="380" y="420" width="340" height="90" class="box"/>
  <text x="410" y="455" class="text">Ingestion Fabric (OCR / ETL / Pipelines)</text>

  <!-- Services -->
  <rect x="100" y="550" width="900" height="130" class="box"/>
  <text x="130" y="585" class="text">Multi-Tenant Service Spaces:</text>
  <text x="160" y="615" class="text">- Accelerator</text>
  <text x="300" y="615" class="text">- Jurisprudence</text>
  <text x="450" y="615" class="text">- AssistMe</text>
  <text x="580" y="615" class="text">- CPP-D</text>
  <text x="700" y="615" class="text">- KM AI</text>

  <!-- Arrows -->
  <line x1="550" y1="170" x2="550" y2="200" class="arrow"/>
  <line x1="550" y1="270" x2="550" y2="300" class="arrow"/>
  <line x1="340" y1="340" x2="400" y2="340" class="arrow"/>
  <line x1="700" y1="340" x2="740" y2="340" class="arrow"/>
  <line x1="550" y1="380" x2="550" y2="420" class="arrow"/>
  <line x1="550" y1="510" x2="550" y2="550" class="arrow"/>
</svg>

**Cross-references**:
- [Chapter 6: Orchestration](06-orchestration.md) — P15 Dev Master Orchestrator
- [P15 Pattern](../agents/devtools/P15-Dev-Master-Orchestrator.md) — Full implementation

---

### 2. EVA Sentinel — Governance & Oversight Plane

**Purpose**: Shows automated governance (Pxx patterns) and human oversight bodies.

<svg width="1000" height="700" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill:#f3f4f6; stroke:#1f2937; stroke-width:2; rx:10; ry:10; }
    .title { font-family:Arial; font-size:26px; font-weight:bold; fill:#111827; }
    .text { font-family:Arial; font-size:16px; fill:#111827; }
    .arrow { stroke:#1f2937; stroke-width:2; marker-end:url(#arrowhead2); }
  </style>
  <defs>
    <marker id="arrowhead2" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#1f2937"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="300" y="40" class="title">EVA Sentinel — Governance & Oversight</text>

  <!-- Sentinel -->
  <rect x="150" y="90" width="700" height="260" class="box"/>
  <text x="380" y="125" class="text">Sentinel Plane</text>
  <text x="200" y="165" class="text">P16 — Awareness</text>
  <text x="200" y="195" class="text">P19 — Action Classification</text>
  <text x="200" y="225" class="text">P21 — Provenance & Fingerprinting</text>
  <text x="500" y="165" class="text">P11 — Security Controls</text>
  <text x="500" y="195" class="text">P10 — Telemetry</text>
  <text x="500" y="225" class="text">P14 — LiveOps</text>

  <!-- Human governance -->
  <rect x="150" y="400" width="700" height="240" class="box"/>
  <text x="380" y="435" class="text">Human & Organizational Governance</text>

  <text x="180" y="475" class="text">DGPOC — Ethics & Privacy</text>
  <text x="180" y="505" class="text">PMD — Project Governance</text>

  <text x="460" y="475" class="text">IITB Security / ATO</text>
  <text x="460" y="505" class="text">CDOB — Cloud/Data</text>

  <text x="180" y="545" class="text">Program Areas (CPP-D, Juris, EI)</text>
  <text x="460" y="545" class="text">Architecture Review Board</text>

  <!-- Arrows -->
  <line x1="500" y1="350" x2="500" y2="400" class="arrow"/>
</svg>

**Cross-references**:
- [Chapter 4: Safety & Governance](04-safety-governance.md) — Sentinel integration
- [P16 Awareness Protocol](../agents/devtools/P16-Awareness-Protocol.md)
- [P21 Provenance](../agents/devtools/P21-Provenance-Fingerprinting.md)
- [GC Agentic Framework Vol 3](../agentic/EVA Canada Agentic AI Template vol3.md) — LiveOps & Governance

---

### 3. Stakeholder Interest Map

**Purpose**: Shows how different ESDC directorates interact with EVA Suite.

<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bubble { fill:#e0f2fe; stroke:#0369a1; stroke-width:2; rx:20; ry:20; }
    .center { fill:#fef9c3; stroke:#ca8a04; stroke-width:3; rx:35; ry:35; }
    .text { font-family:Arial; font-size:18px; fill:#0f172a; }
    .title { font-family:Arial; font-size:26px; font-weight:bold; fill:#0f172a; }
    .arrow { stroke:#334155; stroke-width:2; marker-end:url(#arrowhead3); }
  </style>

  <defs>
    <marker id="arrowhead3" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#334155"/>
    </marker>
  </defs>

  <text x="420" y="60" class="title">EVA Stakeholder Interest Map</text>

  <rect x="480" y="110" width="240" height="120" class="center"/>
  <text x="520" y="170" class="text">EVA Platform</text>

  <!-- Bubbles -->
  <rect x="120" y="300" width="240" height="140" class="bubble"/>
  <text x="150" y="350" class="text">BDM</text>
  <text x="150" y="380" class="text">Innovation • KM • AssistMe</text>

  <rect x="480" y="300" width="240" height="140" class="bubble"/>
  <text x="510" y="350" class="text">IITB</text>
  <text x="510" y="380" class="text">Security • Cloud • DevOps</text>

  <rect x="840" y="300" width="240" height="140" class="bubble"/>
  <text x="870" y="350" class="text">DGPOC</text>
  <text x="870" y="380" class="text">Privacy • Ethics</text>

  <rect x="120" y="520" width="240" height="140" class="bubble"/>
  <text x="150" y="570" class="text">Program Areas</text>
  <text x="150" y="600" class="text">CPP-D • Juris • EI</text>

  <rect x="480" y="520" width="240" height="140" class="bubble"/>
  <text x="510" y="570" class="text">PMD</text>
  <text x="510" y="600" class="text">Project Governance</text>

  <rect x="840" y="520" width="240" height="140" class="bubble"/>
  <text x="870" y="570" class="text">CDOB</text>
  <text x="870" y="600" class="text">Data • Cloud Guardrails</text>

  <!-- Arrows -->
  <line x1="600" y1="230" x2="240" y2="300" class="arrow"/>
  <line x1="600" y1="230" x2="600" y2="300" class="arrow"/>
  <line x1="600" y1="230" x2="960" y2="300" class="arrow"/>

  <line x1="240" y1="440" x2="600" y2="520" class="arrow"/>
  <line x1="600" y1="440" x2="240" y2="520" class="arrow"/>
  <line x1="600" y1="440" x2="960" y2="520" class="arrow"/>
</svg>

**Cross-references**:
- [Chapter 3: Pods & Lifecycle](03-pods-lifecycle.md) — How stakeholders map to POD structure
- [GC Agentic Framework Vol 0](../agentic/EVA Canada Agentic AI Template vol0 - how-to.md) — Stakeholder engagement

---

### 4. EVA Multi-Tenant Service Architecture

**Purpose**: Shows shared foundation vs. tenant-isolated spaces.

<svg width="1200" height="780" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill:#f8fafc; stroke:#1e293b; stroke-width:2; rx:10; ry:10; }
    .title { font-family:Arial; font-size:26px; font-weight:bold; fill:#0f172a; }
    .text { font-family:Arial; font-size:16px; fill:#111827; }
    .arrow { stroke:#1e293b; stroke-width:2; marker-end:url(#arrowhead4); }
  </style>
  <defs>
    <marker id="arrowhead4" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b"/>
    </marker>
  </defs>

  <text x="380" y="50" class="title">EVA Multi-Tenant Architecture</text>

  <!-- Shared Foundation -->
  <rect x="150" y="90" width="900" height="150" class="box"/>
  <text x="180" y="130" class="text">Shared EVA Foundation:</text>
  <text x="210" y="160" class="text">- EVA Nexus</text>
  <text x="350" y="160" class="text">- Sentinel</text>
  <text x="500" y="160" class="text">- Sovereign UI</text>
  <text x="650" y="160" class="text">- Ingestion Fabric</text>
  <text x="820" y="160" class="text">- Vector DB</text>

  <!-- Tenants -->
  <rect x="100" y="300" width="1000" height="400" class="box"/>
  <text x="140" y="340" class="text">Tenant Spaces:</text>

  <text x="170" y="380" class="text">Accelerator</text>
  <text x="370" y="380" class="text">Jurisprudence</text>
  <text x="580" y="380" class="text">AssistMe</text>
  <text x="750" y="380" class="text">CPP-D AI</text>
  <text x="900" y="380" class="text">KM AI</text>

  <!-- Arrow -->
  <line x1="600" y1="240" x2="600" y2="300" class="arrow"/>
</svg>

**Cross-references**:
- [Chapter 10: Case Studies](10-case-studies.md) — Tenant space examples
- [P03 Scrum Agent](../agents/devtools/P03-Scrum-Agent.md) — Sprint management per tenant

---

### 5. EVA Governance Lifecycle (End-to-End)

**Purpose**: Shows the 6-phase journey from idea → production → monitoring.

<svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill:#fefce8; stroke:#d97706; stroke-width:2; rx:10; ry:10; }
    .title { font-family:Arial; font-size:28px; font-weight:bold; fill:#92400e; }
    .text { font-family:Arial; font-size:18px; fill:#78350f; }
    .arrow { stroke:#92400e; stroke-width:2; marker-end:url(#arrowhead5); }
  </style>
  <defs>
    <marker id="arrowhead5" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#92400e"/>
    </marker>
  </defs>

  <text x="360" y="60" class="title">EVA Governance Lifecycle</text>

  <!-- Intake -->
  <rect x="450" y="110" width="300" height="90" class="box"/>
  <text x="480" y="160" class="text">1. Intake (AI COE)</text>

  <!-- PMD -->
  <rect x="450" y="240" width="300" height="90" class="box"/>
  <text x="480" y="290" class="text">2. PMD Governance</text>

  <!-- DGPOC -->
  <rect x="450" y="370" width="300" height="90" class="box"/>
  <text x="480" y="420" class="text">3. DGPOC Ethics/Privacy</text>

  <!-- IITB -->
  <rect x="450" y="500" width="300" height="90" class="box"/>
  <text x="480" y="550" class="text">4. IITB Security/ATO</text>

  <!-- Deployment -->
  <rect x="450" y="630" width="300" height="90" class="box"/>
  <text x="480" y="680" class="text">5. Deployment & Sentinel Registration</text>

  <!-- LiveOps -->
  <rect x="450" y="760" width="300" height="90" class="box"/>
  <text x="480" y="810" class="text">6. LiveOps Monitoring</text>

  <!-- Arrows -->
  <line x1="600" y1="200" x2="600" y2="240" class="arrow"/>
  <line x1="600" y1="330" x2="600" y2="370" class="arrow"/>
  <line x1="600" y1="460" x2="600" y2="500" class="arrow"/>
  <line x1="600" y1="590" x2="600" y2="630" class="arrow"/>
  <line x1="600" y1="720" x2="600" y2="760" class="arrow"/>
</svg>

**Cross-references**:
- [Chapter 3: Pods & Lifecycle](03-pods-lifecycle.md) — Phase 0-6 detailed workflows
- [GC Agentic Framework Vol 3](../agentic/EVA Canada Agentic AI Template vol3.md) — Governance gates
- [P02 Requirements Engine](../agents/devtools/P02-Requirements-Engine.md) — Intake automation

---

## 🧭 Integration Points: How This Maps to the Book

| **Diagram** | **Related Chapters** | **DevTools Patterns** | **GC Framework** |
|-------------|---------------------|----------------------|------------------|
| EVA Universe | All chapters | All P01-P22 | All volumes |
| EVA Nexus | Ch 6 (Orchestration) | P15, P06, P07 | Vol 2 (Engineering) |
| EVA Sentinel | Ch 4 (Safety & Governance) | P16, P19, P21, P11, P10, P14 | Vol 3 (LiveOps) |
| Stakeholder Map | Ch 3 (Pods & Lifecycle) | P02, P03 | Vol 0 (Adoption) |
| Multi-Tenant | Ch 10 (Case Studies) | P13, P05 | Vol 4 (Use Cases) |
| Governance Lifecycle | Ch 3 (Pods & Lifecycle) | P02, P11, P14 | Vol 3 (LiveOps) |

---

## 🎯 The Vision: Complete with Holes

As Marco Presta, Product Owner and creator of EVA 2.0, observed:

> **"The vision is complete now — with holes, but complete."**

What this means:

1. **Architecture is defined** — We know what needs to exist (Nexus, Sentinel, Spaces, Consoles, Governance)
2. **Patterns are documented** — P01-P22 provide blueprints for building it
3. **Governance is mapped** — Human oversight + automated safety (Sentinel) + ATO pipeline
4. **Implementation has gaps** — Some spaces are production (Accelerator), some are alpha (Jurisprudence), some are concepts (Evaluation)

**The roadmap ahead**:
- Fill implementation gaps (phases 0-6 per space)
- Connect all systems via EVA Nexus
- Automate governance with Sentinel patterns
- Scale tenant spaces using Accelerator model
- Achieve ATO certification using GC Agentic Template

This chapter captures **the complete vision** — use it as a north star for all EVA Suite development.

---

## 📖 Further Reading

- [Chapter 1: Introduction](01-introduction.md) — Why EVA exists
- [Chapter 2: EVA Philosophy](02-eva-philosophy.md) — Safety before speed, awareness-driven agents
- [Chapter 3: Pods & Lifecycle](03-pods-lifecycle.md) — How work moves through phases 0-6
- [Chapter 4: Safety & Governance](04-safety-governance.md) — Sentinel integration, C0-C3 autonomy
- [Chapter 6: Orchestration](06-orchestration.md) — P15 Dev Master, multi-agent workflows
- [GC Agentic AI Framework](../agentic/EVA Canada Agentic AI Template vol0 - how-to.md) — Canadian government AI deployment template
- [DevTools Patterns](../agents/devtools/index.md) — P01-P22 implementation guides

---

**Next**: [Chapter 6: Orchestration](06-orchestration.md) — How P15 Dev Master coordinates the entire system
