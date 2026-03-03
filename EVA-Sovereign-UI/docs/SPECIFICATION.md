# EVA-Sovereign-UI: Foundation Library for ALL EVA UI Products

**Feature Name**: EVA-Sovereign-UI Web Components  
**POD**: POD-X (Experience & UI)  
**Phase**: Phase 2 (Build/Code/Test) - FRESH START  
**Status**: 🚧 Ready to Build (December 7, 2025)  
**Owner**: Marco Presta + GitHub Copilot (SM)  
**Last Updated**: December 7, 2025

---

## 🎯 Vision

Build a **TOP NOTCH, 100% production-ready, enterprise & government-grade Web Components library** that serves as THE foundation for ALL EVA UI products. This is NOT a prototype or demo - this is a complete, deployable product that showcases EVA Suite quality to attract ALL Government of Canada departments and agencies.

**CORRECTED SCOPE** (December 7, 2025):
- ❌ **NOT Five Eyes** (removed from scope)
- ❌ **NOT ESDC-specific** (it's a federal agency, not the target)
- ✅ **Foundation library for ALL EVA UI products** (THE core library)

**Core Requirements**:
- **Standards-based**: Lit 3.x + TypeScript 5.7.2 + Custom Elements v1 + Shadow DOM
- **Framework-agnostic**: Core Web Components work in React, Vue, Angular, Svelte, plain HTML
- **GC Design System**: Complete implementation of https://design.canada.ca/ (mandatory elements, tokens, components)
- **Accessible**: WCAG 2.2 AAA compliance (exceeds Canada.ca 2.1 AA minimum)
- **Bilingual**: EN-CA/FR-CA by default (Official Languages Act), runtime switching, zero hardcoded literals
- **Production-ready**: 100% test coverage, 100/100 Lighthouse score, CI/CD pipelines, complete documentation

---

## 🎨 Design Assets & Visual Standards

**CRITICAL**: EVA-Sovereign-UI is a **professional-grade, enterprise & government product** with public visibility. ALL visual assets MUST meet these standards:

### Official GC Design System Assets
**Source**: https://design.canada.ca/  
**Download high-quality assets**:
- **Canada Wordmark SVG** (official Government of Canada signature)
- **Canadian Flag SVG** (official FIP symbol, no raster images)
- **GC Icons** (official government iconography, SVG format only)
- **Typography files**: Lato (700 weight for headings), Noto Sans (regular/bold for body)
- **Color specifications**: Official FIP red (#af3c43), link blue (#284162), all WCAG 2.2 AAA tested

**FORBIDDEN**:
- ❌ NO video game icons or consumer-grade graphics
- ❌ NO colorful/playful icons (this is government, not consumer software)
- ❌ NO raster images (PNG/JPG) where SVG exists
- ❌ NO unofficial fonts or color variants
- ❌ NO placeholder "lorem ipsum" or demo content in final product

### Professional Grade Standards
- **Icons**: Government-standard iconography only (official GC Design System icons)
- **Colors**: Exact GC Design System tokens (no approximations, no "close enough")
- **Typography**: Self-hosted official fonts (Lato, Noto Sans) - NO Google Fonts CDN
- **Graphics**: High-resolution SVG for all vector assets (wordmark, flag, icons)
- **Imagery**: If photos needed for demos, use official Government of Canada media library or high-quality Canadian landscape photos (professional grade only)

---

## 🔓 Licensing & Public Visibility

**EVA-Sovereign-UI Public Package**:
- **Visibility**: PUBLIC (npm registry, GitHub public repo)
- **License**: MIT or Apache 2.0 (allows GC departments/agencies to adopt freely)
- **Target Audience**: ALL Government of Canada departments and agencies
- **Usage**: Can be instantiated across entire EVA Suite wherever UI/UX support required
- **Dependencies**: Must be standalone, low-touch, minimal external dependencies
- **Authorization Model**: Self-service adoption (departments can use without Marco's approval)

**Design for Autonomous Operation**:
- Complete documentation (no gaps, no "contact us for details")
- Working examples for ALL 5 frameworks (React, Vue, Angular, Svelte, HTML)
- Troubleshooting guide covers ALL common issues
- CI/CD pipelines automated (no manual intervention)
- npm packages published and versioned (semantic versioning)
- CDN links available (jsDelivr, unpkg) for instant adoption

---

## 📦 Deliverables (11 Production-Ready Packages + Demos)

### npm Packages (6)
1. **@eva-sovereign/web-components** - Lit 3.x core library (128+ Web Components)
2. **@eva-sovereign/react** - React 18+ wrapper package
3. **@eva-sovereign/vue** - Vue 3+ wrapper package
4. **@eva-sovereign/angular** - Angular 17+ wrapper package
5. **@eva-sovereign/svelte** - Svelte 5+ wrapper package
6. **@eva-sovereign/cli** - CLI tool (`eva-sovereign init [framework]`)

### Production Demos (3)
7. **Canada.ca Chatbot Demo** - <eva-chat-panel> with 10-15 mock FAQs (passports, taxes, SIN, EI, immigration)
8. **GC Design Lab Demo** - Interactive playground for ALL components with theme editor, live prop editing, code export, a11y testing
9. **DevKit Demo** - 5-minute adoption guide with working framework templates and troubleshooting

### Documentation (2)
10. **Storybook** - Complete API documentation for all components
11. **Docs Site** - Separate documentation website with guides, tutorials, examples

---

## 🎯 COMPLETE COMPONENT INVENTORY (128+ Components)

**Updated: December 7, 2025**  
**Source**: https://design.canada.ca/ + https://wet-boew.github.io/GCWeb/  

### **Category 1: WET-BOEW Core Plugins (43 components)**

#### Data & Content Management
1. ❌ **wb-data-ajax** - AJAX content loading with overlays
2. ❌ **wb-data-json** - JSON data templating and rendering
3. ❌ **wb-data-picture** - Responsive images (picturefill port)
4. ❌ **wb-data-inview** - Viewport-triggered content loading
5. ❌ **wb-data-fusion-query** - Query parameter mapping to form inputs
6. ❌ **wb-feeds** - RSS/Atom feed aggregation and display
7. ❌ **wb-filter** - Content filtering by keywords
8. ❌ **wb-tagfilter** - Tag-based content filtering

#### Form Components
9. ✅ **wb-checkbox** - Checkboxes (implemented as `eva-checkbox`)
10. ✅ **wb-radio** - Radio buttons (implemented as `eva-radio`)
11. ✅ **wb-input** - Text inputs (implemented as `eva-input`)
12. ✅ **wb-select** - Select dropdowns (implemented as `eva-select`)
13. ❌ **wb-formvalid** - Client-side form validation with error handling
14. ❌ **wb-postback** - AJAX form submission
15. ❌ **wb-stepsform** - Multi-step wizard forms
16. ❌ **wb-pii-scrub** - Personal information removal before submit

#### Interactive UI Components
17. ✅ **wb-tabs** - Tabbed interfaces (implemented as `eva-tabs`)
18. ❌ **wb-accordion** - Expand/collapse panels (details/summary pattern)
19. ❌ **wb-toggle** - Show/hide content toggles
20. ❌ **wb-details-close** - Auto-close details elements
21. ❌ **wb-overlay** - Modal overlays (implemented as `eva-modal` - partial)
22. ❌ **wb-lightbox** - Image/video galleries with popups
23. ❌ **wb-dismissable** - User-dismissible content

#### Navigation & Menus
24. ❌ **wb-menu** - Interactive navigation menus with submenus
25. ❌ **wb-pagination** - Page navigation controls
26. ❌ **wb-breadcrumbs** - Breadcrumb trail navigation (MANDATORY)

#### Visualization & Media
27. ❌ **wb-charts** - Charts and graphs (bar, line, pie, donut, etc.)
28. ❌ **wb-tables** - DataTables integration (sorting, filtering, pagination)
29. ❌ **wb-geomap** - Interactive maps with overlays
30. ❌ **wb-calendar** - Calendar of events
31. ❌ **wb-multimedia** - Accessible video/audio player with captions

#### Utility Components
32. ❌ **wb-add-cal** - Add to calendar functionality
33. ❌ **wb-bgimg** - Background image management
34. ❌ **wb-equalheight** - Equal height columns (CSS + JS)
35. ❌ **wb-favicon** - Dynamic favicon management
36. ❌ **wb-footnotes** - Accessible footnote handling
37. ❌ **wb-prettify** - Syntax highlighting for code blocks
38. ❌ **wb-texthighlight** - Keyword highlighting in text
39. ❌ **wb-zebra** - Zebra striping for tables/lists

#### Social & External Integration
40. ❌ **wb-share** - Social media sharing widget
41. ❌ **wb-facebook** - Facebook embedded pages
42. ❌ **wb-twitter** - Twitter embedded timelines
43. ❌ **wb-country-content** - Geolocation-based content

#### Session & Security
44. ❌ **wb-session-timeout** - Session timeout warnings
45. ❌ **wb-exitscript** - Exit confirmation for external links
46. ❌ **wb-feedback** - Page feedback form

### **Category 2: GCWeb Mandatory Site-Wide Patterns (10 components - REQUIRED)**

47. ❌ **gc-global-header** - Global header with FIP signature (MANDATORY)
48. ❌ **gc-global-footer** - Global footer with bands (MANDATORY)
49. ❌ **gc-signature** - Government of Canada wordmark (MANDATORY)
50. ❌ **gc-language-toggle** - EN ⇄ FR language switcher (MANDATORY)
51. ❌ **gc-date-modified** - Date modified display (MANDATORY)
52. ❌ **gc-breadcrumbs** - Breadcrumb navigation (MANDATORY)
53. ❌ **gc-site-search** - Site search box (MANDATORY)
54. ❌ **gc-theme-menu** - Theme and topic menu (MANDATORY)
55. ❌ **gc-colours** - Colour system/tokens (MANDATORY)
56. ❌ **gc-typography** - Typography system (Lato, Noto Sans) (MANDATORY)

### **Category 3: GCWeb Design Patterns (40 components)**

#### Buttons & Form Controls
57. ✅ **gc-button** - Button component with 6 variants (implemented as `eva-button`)
58. ❌ **gc-button-signin** - Sign in button (header element)

#### Alerts & Notifications
59. ✅ **gc-alert** - Contextual alerts (implemented as `eva-alert`)
60. ❌ **gc-alert-collapsible** - Collapsible/dismissible alerts
61. ❌ **gc-alert-service-disruption** - Service disruption notices

#### Navigation Patterns
62. ❌ **gc-services-info** - Services and information link blocks
63. ❌ **gc-most-requested** - Most requested links
64. ❌ **gc-subway-nav** - Step-by-step subway navigation
65. ❌ **gc-ordered-nav** - Ordered multi-page navigation
66. ❌ **gc-in-page-toc** - In-page table of contents
67. ❌ **gc-contact-band** - Contact us band

#### Content Patterns
68. ❌ **gc-featured-link** - Featured/promoted links
69. ❌ **gc-context-features** - Context-specific promotional features
70. ❌ **gc-intro-block** - Introduction block for landing pages
71. ❌ **gc-contributors** - Contributors/partners display
72. ❌ **gc-latest-news** - Latest news feed
73. ❌ **gc-minister-profile** - Minister/institutional head profile
74. ❌ **gc-what-we-are-doing** - Government activities section
75. ❌ **gc-about-institution** - About the institution section

#### Media & Visualization
76. ❌ **gc-carousel** - Image/content carousels
77. ❌ **gc-images** - Image display patterns
78. ❌ **gc-multimedia** - Video/audio embedding
79. ❌ **gc-data-tables** - Government data tables
80. ❌ **gc-charts-graphs** - Data visualization

#### Interactive Elements
81. ❌ **gc-expand-collapse** - Expand/collapse (accordion) pattern
82. ❌ **gc-interactive-questions** - Question wizard/decision tree
83. ❌ **gc-privacy-disclaimer** - Privacy disclaimer component
84. ❌ **gc-gc-feedback** - GC Feedback widget (optional)

#### Social & Sharing
85. ❌ **gc-social-follow** - Social media follow box
86. ❌ **gc-social-feeds** - Social media feed widget
87. ❌ **gc-download-links** - File download links with icons

#### Misc Patterns
88. ❌ **gc-labels** - Visual label tags
89. ❌ **gc-contact-info** - Contact information display

### **Category 4: GCWeb Page Templates (25 templates)**

#### Government-Wide Templates
90. ❌ **tpl-home** - Canada.ca home page template (MANDATORY)
91. ❌ **tpl-theme** - Theme page template (MANDATORY)
92. ❌ **tpl-topic** - Topic page template (MANDATORY)
93. ❌ **tpl-search** - Search results page template
94. ❌ **tpl-news-landing** - News landing page
95. ❌ **tpl-news-results** - News search results
96. ❌ **tpl-dept-agencies** - Departments and agencies page

#### Institutional Templates
97. ❌ **tpl-institutional-landing** - Institutional landing page (MANDATORY)
98. ❌ **tpl-ministerial-profile** - Ministerial profile page (MANDATORY)
99. ❌ **tpl-news-product** - News product page (MANDATORY)
100. ❌ **tpl-contact-us** - Contact us page
101. ❌ **tpl-service-performance** - Service performance reporting
102. ❌ **tpl-transparency** - Transparency and corporate reporting
103. ❌ **tpl-program-description** - Program description page
104. ❌ **tpl-partnering-profile** - Partnering arrangement profile

#### Navigation Templates
105. ❌ **tpl-basic-page** - Basic page layout (most common)
106. ❌ **tpl-service-initiation** - Service initiation page
107. ❌ **tpl-long-index** - Long index page (50+ links)
108. ❌ **tpl-short-index** - Short index page (10-50 links)
109. ❌ **tpl-finder** - Finder page (100+ filterable links)
110. ❌ **tpl-faceted-finder** - Faceted finder with complex filters

#### Content Templates
111. ❌ **tpl-consultation** - Consultation profile page
112. ❌ **tpl-regulation-profile** - Regulation profile page
113. ❌ **tpl-act-profile** - Act profile page
114. ❌ **tpl-guidance-legislation** - Guidance on legislation page
115. ❌ **tpl-promotional-events** - Promotional events page (decommissioning)
116. ❌ **tpl-govt-audience** - Government-wide audience page (decommissioning)

#### Accessibility Templates
117. ❌ **tpl-accessibility-plan** - Accessibility plan page
118. ❌ **tpl-accessibility-progress** - Accessibility progress reports
119. ❌ **tpl-accessibility-feedback** - Accessibility feedback form/process

### **Category 5: Experimental Features (Méli-Mélo) (10+ components)**

120. ❌ **exp-math-grid** - Mathematical grid layout (2025-06)
121. ❌ **exp-datatable-utilities** - Advanced DataTable utilities (2024-10)
122. ❌ **exp-conjunction** - Conjunction pattern (2021-05)
123. ❌ **exp-steps-pattern** - Steps navigation pattern (2021-05)
124. ❌ **exp-theme-canadaday** - Canada Day promotional theme
125. ❌ **exp-theme-winterlude** - Winterlude promotional theme
126. ❌ **exp-theme-zev** - Zero-emission vehicle theme
127. ❌ **exp-theme-empathy** - Empathy theme
128. ❌ **exp-theme-choose-canada** - Choose Canada theme
129. ❌ **exp-theme-ai-answers** - AI Answers theme

### **Category 6: EVA Custom Components (2 components - Not in GC Design System)**

130. ⚠️ **eva-card** - Card component (custom, not official GC pattern)
131. ⚠️ **eva-chat-panel** - Chat interface (custom, for EVA RAG integration)

---

## 📊 Implementation Status Summary

| Category | Total | Implemented | Missing | % Complete |
|----------|-------|-------------|---------|------------|
| **WET-BOEW Core Plugins** | 43 | 5 | 38 | 12% |
| **GCWeb Mandatory Patterns** | 10 | 0 | 10 | 0% ⚠️ |
| **GCWeb Design Patterns** | 40 | 3 | 37 | 8% |
| **GCWeb Page Templates** | 25 | 0 | 25 | 0% |
| **Experimental (Méli-Mélo)** | 10 | 0 | 10 | 0% |
| **EVA Custom Components** | 2 | 2 | 0 | 100% |
| **GRAND TOTAL** | **130** | **10** | **120** | **7.7%** |

**Critical Finding**: **0% of mandatory patterns implemented** (blocks production deployment to Canada.ca)

---

## 📦 Repository Structure

**Location**: `C:\Users\marco\Documents\_AI Dev\EVA Suite\EVA-Sovereign-UI\` (CLEARED for fresh start)  
**GitHub**: https://github.com/MarcoPolo483/EVA-Sovereign-UI  
**Status**: Empty directory, ready for fresh implementation

**Planned Structure**:
```
EVA-Sovereign-UI/
├── packages/
│   ├── web-components/        # Lit 3.x core (69+ components)
│   ├── react/                 # React 18+ wrapper
│   ├── vue/                   # Vue 3+ wrapper
│   ├── angular/               # Angular 17+ wrapper
│   ├── svelte/                # Svelte 5+ wrapper
│   ├── cli/                   # CLI tool
│   └── design-tokens/         # GC Design System tokens
├── demos/
│   ├── chatbot/               # Canada.ca Chatbot Demo
│   ├── design-lab/            # GC Design Lab (theme editor)
│   └── devkit/                # DevKit (5-min adoption)
├── docs/                      # Separate docs site
├── storybook/                 # Storybook configuration
├── .eva-memory.json           # EVA Memory System
├── .eva-housekeeping.json     # Housekeeping config
└── .eva-cache/
    └── repo-tree.txt          # Directory mapping
```
├── FIVE-EYES-RESEARCH.md          ✅ Complete
└── (status/migration/testing docs)
```

---

## ✨ Core Capabilities

### 1. **GC Design System (Complete Implementation)**
**Reference**: https://design.canada.ca/

**Mandatory Elements** (every page must have):
- Global header with GC signature (wordmark + Canadian flag)
- Language toggle (English/Français)
- Breadcrumb trail
- Global footer (3 bands: contextual, main, sub-footer)
- Canada wordmark in footer (lower right)
- Date modified (YYYY-MM-DD format)

**Design Tokens**:
- **Typography**: Lato (headings), Noto Sans (body text)
- **Colors**: Link blue #284162, FIP red #af3c43, Error #d3080c, Accent #26374A, Text #333, White backgrounds
- **Spacing**: 8px grid system
- **Layout**: 65 character max line length

**Components**: Buttons (6 variants), Alerts (4 types), Forms (input/textarea/select/checkbox/radio/fieldset), Navigation (breadcrumbs, tabs, menus), Cards, Badges, Tables, 100+ CSS utility classes

### 2. **Web Components (69+ Components)**
Built with Lit 3.x, Custom Elements v1 API, Shadow DOM encapsulation:

1. **EVA Button** - 6 variants (supertask, primary, secondary, danger, link, contextual-signin)
2. **EVA Card** - Content containers with GC styling
3. **EVA Alert** - 4 types (success, info, warning, danger) + dismissible
4. **EVA Badge** - Status indicators
5. **EVA Input** - Text input with validation
6. **EVA Select** - Dropdown with search
7. **EVA Checkbox** - Single/multi-select
8. **EVA Radio** - Radio button groups
9. **EVA Modal** - Dialog with focus trap
10. **EVA Tabs** - Tabbed navigation
11. **EVA Chat Panel** - Signature component for chatbot UIs
6. EVA Select
7. EVA Checkbox
8. EVA Radio
9. EVA Modal
10. EVA Tabs
11. **EVA Chat Panel** (signature component)

### 3. **Framework Support (4 Wrapper Packages + Plain HTML)**
- **Core**: Web Components (Lit 3.x) - framework-agnostic, works everywhere
- **@eva-sovereign/react**: React 18+ wrapper with TypeScript types
- **@eva-sovereign/vue**: Vue 3+ wrapper with Composition API support
- **@eva-sovereign/angular**: Angular 17+ wrapper with standalone components
- **@eva-sovereign/svelte**: Svelte 5+ wrapper with runes support
- **Plain HTML**: Direct `<eva-button>` usage via CDN (jsDelivr, unpkg)

### 4. **Accessibility (WCAG 2.2 AAA)**
- **WCAG 2.2 AAA** compliance (exceeds Canada.ca 2.1 AA minimum)
- **7:1 contrast ratios** (AAA standard)
- **Keyboard navigation** (Tab, Enter, Esc, Arrow keys, no mouse required)
- **Screen reader support** (NVDA, JAWS, VoiceOver tested)
- **ARIA attributes** (roles, labels, live regions, descriptions)
- **Focus management** (visible 3px outline, focus trap in modals)
- **44px touch targets** (mobile-friendly)
- **High contrast mode** (Windows High Contrast tested)
- **Zero axe-core violations** (automated testing)

### 5. **Internationalization (i18n)**
- **Bilingual EN-CA/FR-CA** (Official Languages Act compliance)
- **Runtime language switching** (instant, no page reload)
- **Zero hardcoded literals** (all text externalized)
- **Intl API** for dates, numbers, currencies (locale-aware formatting)
- **Message catalogs** (JSON/YAML format)
- **Pluralization rules** (1 item vs 2+ items)
- **RTL support** (future-ready for Arabic, Hebrew)

### 6. **Testing (100% Coverage)**
- **Unit tests**: Vitest + Testing Library
- **Accessibility tests**: axe-core (zero violations)
- **Visual regression**: Storybook + Chromatic
- **E2E tests**: Playwright (optional)
- **Target**: 100% test coverage (no exceptions)

### 7. **Three Production Demos**

#### Demo 1: Canada.ca Chatbot
**Purpose**: Mock chatbot answering real canada.ca questions  
**Features**:
- `<eva-chat-panel>` component with GC Design System styling
- 10-15 hardcoded FAQs from canada.ca:
  - "How do I apply for a passport?"
  - "What are the tax filing deadlines?"
  - "How to get a SIN number?"
  - "EI benefits eligibility"
  - "Immigration visa types"
  - Plus 10 more real canada.ca questions
- Bilingual EN-CA/FR-CA chat interface
- WCAG 2.2 AAA (keyboard navigation, screen reader announces new messages)
- Message history, typing indicators
- Works in React, Vue, Angular, Svelte, plain HTML

#### Demo 2: GC Design Lab (Interactive Playground)
**Purpose**: Experiment with ALL GC components and settings  
**Features**:
- **Live component editor**: ALL 69+ components (not 10, not 20, ALL)
- **Real-time preview**: Change props, see results instantly
- **Theme editor**:
  - Edit GC Design System tokens (colors, fonts, spacing)
  - Create custom themes (save, export, share)
  - Preview theme across all components
  - Export theme as CSS/JSON
- **Code export**: Copy React/Vue/Angular/Svelte/HTML snippets
- **Accessibility panel**: axe-core testing with live results
- **Responsive preview**: Mobile (375px), Tablet (768px), Desktop (1440px)
- **Language toggle**: Test EN-CA ↔ FR-CA switching
- **Dark mode toggle**: Test contrast ratios
- **Keyboard navigation tester**: Visualize Tab order

#### Demo 3: DevKit (5-Minute Adoption)
**Purpose**: Developers adopt EVA-Sovereign-UI in 5 minutes  
**Features**:
- **CLI tool**: `npm install -g @eva-sovereign/cli`
- **Commands**:
  - `eva-sovereign init [react|vue|angular|svelte|html]` - Create new project
  - `eva-sovereign add <component>` - Add component to existing project
  - `eva-sovereign theme <name>` - Apply theme
- **Quick start guide**: Step-by-step, 5 minutes max
- **Framework templates**: Working projects (not empty shells)
- **Copy-paste examples**: Tested, actually work
- **npm/yarn/pnpm commands**: Install and use
- **CDN links**: jsDelivr, unpkg
- **TypeScript types**: Full IntelliSense
- **Troubleshooting guide**: Common issues solved

### 8. **Documentation (2 Sites)**
- **Storybook**: Complete API documentation for all components
- **Docs Site**: Separate website with guides, tutorials, examples, migration guides
- API documentation per component
- Usage examples (React, Svelte, plain HTML)
- Live Storybook demo
- Migration guide from React components
- Sovereign profile switcher demo

---

## 📊 Quality Gates (All Must Pass)

**CRITICAL**: These are non-negotiable standards. If ANY quality gate fails, the project is NOT production-ready. **Marco will NOT be available to approve incremental progress**. The implementation MUST follow requirements to the letter and apply all EVA principles to reach the expected outcome without friction.

### Autonomous Implementation Requirements
1. **Low-Touch, Standalone Design**: Minimal external dependencies, self-contained packages
2. **Complete Documentation**: NO gaps, NO "contact us for details", NO missing examples
3. **Self-Service Adoption**: GC departments can use without authorization from Marco
4. **Automated CI/CD**: NO manual intervention required
5. **Professional Visual Standards**: Official GC assets only (SVG, high-quality, government-grade)

### Technical Quality Gates
1. **Test Coverage**: 100% (no exceptions) - Vitest + Testing Library
2. **Lighthouse Score**: 100/100 across all 4 categories:
   - Performance (load speed, interactivity)
   - Accessibility (a11y compliance)
   - Best Practices (security, modern standards)
   - SEO (search engine optimization)
3. **WCAG 2.2 AAA**: 7:1 contrast ratios, keyboard nav, screen readers tested
4. **Zero axe-core violations**: Automated accessibility testing passes
5. **Zero broken links**: All demos, docs, and examples work
6. **Zero hardcoded literals**: All text externalized to i18n catalogs
7. **All demos work**: Tested in React, Vue, Angular, Svelte, plain HTML (5 environments)
8. **CI/CD pipelines green**: GitHub Actions workflows passing
9. **npm packages ready**: Publishable to registry with semantic versioning
10. **Complete documentation**: Storybook + docs site both complete
11. **Official GC assets only**: SVG graphics from design.canada.ca, self-hosted fonts, NO video game icons
12. **Professional visual standards**: Government-grade graphics only, NO colorful/playful consumer icons

### Expected Outcome Without Friction
**IF** all requirements followed to the letter AND all EVA principles applied (Three Concepts Pattern, Complete SDLC, Execution Evidence Rule), **THEN** the implementation will reach production-ready state without needing Marco's incremental approvals. The final product review will be straightforward: either all quality gates pass (ship it) or specific gates fail (fix and resubmit).

---

## 🎭 User Stories (Updated December 7, 2025)

### Story 1: GC Design System Compliance
**As a** federal developer building a GC application  
**I want to** use components that fully comply with https://design.canada.ca/  
**So that** my app meets mandatory GC Web Standards

**Acceptance Criteria**:
- [ ] All mandatory elements present (header, footer, wordmark, language toggle, breadcrumbs, date modified)
- [ ] GC Design System tokens applied (Lato/Noto Sans, #284162 link blue, #af3c43 FIP red, 8px grid)
- [ ] WCAG 2.2 AAA contrast ratios enforced (7:1)
- [ ] Bilingual EN-CA/FR-CA with runtime switching
- [ ] Zero axe-core violations

---

### Story 2: Framework-Agnostic Component Usage
**As a** developer using React/Vue/Angular/Svelte  
**I want to** use EVA components in my preferred framework  
**So that** I'm not locked into a single technology

**Acceptance Criteria**:
- [ ] Components work in React 18+ (`import { EvaButton } from '@eva-sovereign/react'`)
- [ ] Components work in Vue 3+ (`import { EvaButton } from '@eva-sovereign/vue'`)
- [ ] Components work in Angular 17+ (`import { EvaButton } from '@eva-sovereign/angular'`)
- [ ] Components work in Svelte 5+ (`import { EvaButton } from '@eva-sovereign/svelte'`)
- [ ] Components work in plain HTML (`<script src="cdn"><eva-button></eva-button>`)
- [ ] Events, props, and slots work consistently across all frameworks
- [ ] Props/attributes work consistently across frameworks

---

### Story 3: Canada.ca Chatbot Demo
**As a** public servant  
**I want to** see a working chatbot that answers canada.ca questions  
**So that** I can evaluate EVA-Sovereign-UI for my department

**Acceptance Criteria**:
- [ ] `<eva-chat-panel>` component renders correctly
- [ ] Answers 10-15 real canada.ca FAQs (passports, taxes, SIN, EI, immigration)
- [ ] Bilingual EN-CA/FR-CA chat interface
- [ ] Keyboard accessible (Tab to input, Enter to send, Esc to close)
- [ ] Screen reader announces new messages
- [ ] Works in React, Vue, Angular, Svelte, plain HTML demos

---

### Story 4: GC Design Lab (Theme Editor)
**As a** designer  
**I want to** experiment with GC Design System components and create custom themes  
**So that** I can prototype government UIs quickly

**Acceptance Criteria**:
- [ ] Live editor for ALL 69+ components
- [ ] Real-time prop editing (change props, see results instantly)
- [ ] Theme editor (edit colors, fonts, spacing; save, export, share)
- [ ] Code export (React/Vue/Angular/Svelte/HTML snippets)
- [ ] Accessibility panel (axe-core testing)
- [ ] Responsive preview (mobile/tablet/desktop)
- [ ] Language toggle, dark mode toggle, keyboard nav tester

---

### Story 5: 5-Minute Adoption (DevKit + CLI)
**As a** developer new to EVA-Sovereign-UI  
**I want to** adopt the library in 5 minutes  
**So that** I can start building quickly

**Acceptance Criteria**:
- [ ] CLI tool installs globally (`npm install -g @eva-sovereign/cli`)
- [ ] `eva-sovereign init react` creates working React project (not empty shell)
- [ ] Project runs with `npm start` (no errors, demo app loads)
- [ ] Copy-paste examples work (tested, not broken)
- [ ] TypeScript types provide IntelliSense
- [ ] Troubleshooting guide solves common issues
- [ ] Keyboard navigation without mouse
- [ ] Screen reader testing passes (NVDA, JAWS)
- [ ] No axe-core violations
- [ ] Supports Windows High Contrast Mode

---

### Story 5: Multi-Language Support
**As a** Canadian developer  
**I want to** switch between EN/FR at runtime  
**So that** users can choose their preferred language

**Acceptance Criteria**:
- [ ] `<eva-provider locale="en-CA">` sets language
- [ ] All component text updates on locale change
- [ ] Date/time formats respect locale (Intl.DateTimeFormat)
- [ ] Number formats respect locale (Intl.NumberFormat)
- [ ] No hardcoded English strings in components

---

## 📋 Functional Requirements

### FR-1: Lit-Based Web Components
- [ ] All components built with Lit 3.x
- [ ] TypeScript 5.x with strict mode
- [ ] Shadow DOM for style encapsulation
- [ ] Custom Element v1 API
- [ ] ES2020+ target for modern browsers

### FR-2: Sovereign Token System
- [ ] GC Design System token file (gc-tokens.ts) ✅ COMPLETE
- [ ] Registry system with helper functions ✅ COMPLETE
  - `getSovereignProfile(id)`
  - `getAllSovereignProfileIds()`
  - `isValidSovereignProfile(id)`
  - `getSovereignProfileByLocale(locale)`
- [ ] Runtime profile switching
- [ ] CSS custom properties for theming
- [ ] Token-based design (no hardcoded colors/fonts)

### FR-3: Component API Mirrors React API
- [ ] Same prop names as React components
- [ ] Same event names (converted to custom events)
- [ ] Same slot patterns
- [ ] Same CSS classes for styling hooks
- [ ] Migration path documented

### FR-4: Accessibility Built-In
- [ ] All components keyboard navigable
- [ ] ARIA attributes automatically applied
- [ ] Focus trap for modals
- [ ] Live regions for dynamic content
- [ ] Skip links where appropriate
- [ ] High contrast mode support

### FR-5: i18n Infrastructure
- [ ] Message registry per component
- [ ] Runtime locale switching
- [ ] Intl API for formatting
- [ ] Bilingual EN/FR by default
- [ ] Foundation for bilingual EN-CA/FR-CA support

### FR-6: Comprehensive Testing
- [ ] Vitest unit tests per component
- [ ] Testing Library integration tests
- [ ] axe-core accessibility tests
- [ ] ≥80% code coverage
- [ ] CI/CD pipeline runs tests on PR

### FR-7: Documentation
- [ ] API docs per component (JSDoc → typedoc)
- [ ] Usage examples (React, Svelte, HTML)
- [ ] Storybook stories per component
- [ ] Migration guide from React
- [ ] Sovereign profile comparison table

### FR-8: Package Distribution
- [ ] npm package `@eva-suite/web-components`
- [ ] ES modules + UMD bundle
- [ ] TypeScript declarations (.d.ts)
- [ ] Source maps for debugging
- [ ] CDN distribution (unpkg, jsDelivr)

---

## 🚀 Non-Functional Requirements

### NFR-1: Performance
- [ ] Bundle size <50KB gzipped (core components)
- [ ] First paint <100ms
- [ ] Component hydration <50ms
- [ ] Lighthouse performance score ≥90

### NFR-2: Browser Support
- [ ] Chrome/Edge ≥90 (Chromium)
- [ ] Firefox ≥88
- [ ] Safari ≥14
- [ ] No IE11 support (modern browsers only)

### NFR-3: Security
- [ ] No XSS vulnerabilities (Lit auto-escapes)
- [ ] CSP-compliant (no inline scripts)
- [ ] Dependency audit (npm audit clean)
- [ ] No secrets in code

### NFR-4: Accessibility (WCAG 2.1)
- [ ] AA compliance for all countries (baseline)
- [ ] AAA compliance for Canada GC (target)
- [ ] axe-core violations = 0
- [ ] Keyboard navigation 100% functional
- [ ] Screen reader testing passed

### NFR-5: Maintainability
- [ ] ESLint + Prettier configured
- [ ] Consistent code style
- [ ] TypeScript strict mode
- [ ] 80%+ test coverage
- [ ] CI/CD pipeline automated

### NFR-6: Observability
- [ ] Component usage metrics (optional)
- [ ] Error tracking (optional)
- [ ] Performance monitoring (optional)

---

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: Lit 3.x (Web Components)
- **Language**: TypeScript 5.x
- **Bundler**: Vite 5.x
- **Testing**: Vitest + Testing Library + axe-core
- **Docs**: Storybook 7.x
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

### Monorepo Structure
- **packages/core**: Design tokens, themes, utilities (shared)
- **packages/react**: React 18+ components (existing, 19 components)
- **packages/web-components**: Lit-based Web Components (new, 69+ components)

### Token Architecture
```typescript
// Token registry (IMPLEMENTED)
import { getSovereignProfile } from '@eva-suite/core/tokens/sovereign';

const tokens = getSovereignProfile('canada-gc');
// → { colors, typography, spacing, shadows, breakpoints, a11y }
```

### Component Base Class
```typescript
// EVAElement base class (TO BE IMPLEMENTED - Copilot A Task A3)
import { LitElement } from 'lit';

export class EVAElement extends LitElement {
  // Sovereign context consumer
  // i18n consumer
  // A11y utilities
}
```

---

## 📅 REVISED Implementation Phases (130 Components)

**Updated**: December 7, 2025  
**Strategy**: 4-phase rollout prioritizing mandatory patterns first  
**Timeline**: 6-12 months for 100% GC Design System coverage

### ✅ Phase 0: Research & Planning (COMPLETE)
- [x] GC Design System comprehensive audit
- [x] GC Design System comprehensive audit (128+ components catalogued)
- [x] WET-BOEW plugin inventory (43 plugins identified)
- [x] Architecture decisions documented (PROJECT-ANALYSIS.md)
- [x] Component prioritization matrix created

---

### 🚧 Phase 1: Mandatory Foundation (15 components) - **CRITICAL PRIORITY**
**Status**: 33% complete (5/15 implemented)  
**Timeline**: 4-6 weeks  
**Blocks**: Production deployment to Canada.ca

#### Mandatory Site-Wide Patterns (10 components - 0% complete)
**These are REQUIRED by C&IA Specification for ALL Canada.ca pages**

- [ ] **gc-global-header** - Global header with FIP signature, search, language toggle
  - FIP wordmark, site menu, search box integration
  - WCAG 2.2 AAA compliant, keyboard navigation
  - Responsive mobile/desktop layouts

- [ ] **gc-global-footer** - Three-band footer (contextual, main, sub-footer)
  - Main band with Government of Canada links
  - Contextual band for page-specific links
  - Sub-footer with wordmark and social links

- [ ] **gc-signature** - Government of Canada official wordmark
  - SVG format, bilingual EN/FR
  - Correct FIP branding specifications
  - High-resolution for print/screen

- [ ] **gc-language-toggle** - EN ⇄ FR switcher
  - Runtime locale switching without page reload
  - URL parameter persistence (lang=fr)
  - Updates all component text instantly

- [ ] **gc-date-modified** - Date modified display
  - ISO 8601 format (YYYY-MM-DD)
  - Bilingual labels ("Date modified" / "Date de modification")
  - Configurable date formats

- [ ] **gc-breadcrumbs** - Breadcrumb navigation trail
  - Hierarchical navigation from Home → Current page
  - ARIA landmark role="navigation"
  - Structured data (schema.org/BreadcrumbList)

- [ ] **gc-site-search** - Site search box
  - Integration with Canada.ca search engine
  - Autocomplete suggestions
  - Keyboard shortcuts (Ctrl+K or /)

- [ ] **gc-theme-menu** - Theme and topic menu
  - Dropdown navigation for 15+ themes
  - Mega-menu pattern for large link sets
  - Touch-friendly mobile interface

- [ ] **gc-colours** - Colour system/tokens
  - Official FIP colours as CSS custom properties
  - WCAG 2.2 AAA contrast ratios validated
  - Dark mode variants (if applicable)

- [ ] **gc-typography** - Typography system
  - Self-hosted Lato (headings) and Noto Sans (body)
  - Font-weight: 400 (regular), 700 (bold)
  - Responsive font sizes (rem-based)

#### High-Priority Interactive Components (5 components - 100% complete ✅)

- [x] **eva-button** - Buttons (6 variants: supertask, primary, secondary, danger, link, contextual-signin)
- [x] **eva-input** - Text inputs, textareas, email, tel, number inputs
- [x] **eva-select** - Select dropdowns with optgroups
- [x] **eva-checkbox** - Checkboxes with labels and fieldsets
- [x] **eva-radio** - Radio button groups

**Milestone M1**: All mandatory patterns implemented → Ready for Canada.ca pilot

---

### 🔜 Phase 2: Core WET-BOEW Plugins (20 components)
**Status**: 15% complete (3/20 implemented)  
**Timeline**: 8-10 weeks  
**Focus**: Most commonly used interactive components

#### Form & Validation (5 components)
- [ ] **wb-formvalid** - Client-side form validation with inline error messages
- [ ] **wb-stepsform** - Multi-step wizard forms with progress indicator
- [ ] **wb-postback** - AJAX form submission without page reload
- [ ] **wb-pii-scrub** - Remove PII before form submit (privacy compliance)
- [ ] **wb-session-timeout** - Session timeout warnings (30-min, 20-min, 10-min alerts)

#### Navigation & Interaction (7 components)
- [x] **eva-tabs** - Tabbed interfaces (horizontal/vertical) ✅
- [x] **eva-modal** - Modal overlays with focus trap ✅
- [x] **eva-alert** - Contextual alerts ✅
- [ ] **wb-accordion** - Expand/collapse accordion panels
- [ ] **wb-toggle** - Show/hide content toggles
- [ ] **wb-menu** - Dropdown navigation menus
- [ ] **wb-pagination** - Page navigation controls (1 2 3 ... 10 Next)

#### Data Display (5 components)
- [ ] **wb-tables** - DataTables integration (sort, filter, paginate, export)
- [ ] **wb-charts** - Charts and graphs (Chart.js integration: bar, line, pie, donut)
- [ ] **wb-calendar** - Calendar of events with month/week/day views
- [ ] **wb-feeds** - RSS/Atom feed aggregation
- [ ] **wb-filter** - Content filtering by keywords/tags

#### Media & Visualization (3 components)
- [ ] **wb-multimedia** - Accessible video/audio player with captions
- [ ] **wb-lightbox** - Image/video galleries with popups
- [ ] **wb-geomap** - Interactive maps with overlays (Leaflet/OpenLayers)

**Milestone M2**: Core interactive components complete → Feature parity with WET-BOEW 4.x

---

### 🔜 Phase 3: GCWeb Design Patterns (30 components)
**Status**: 8% complete (3/30 implemented)  
**Timeline**: 10-12 weeks  
**Focus**: Canada.ca-specific patterns and templates

#### Navigation Patterns (10 components)
- [ ] **gc-services-info** - Services and information link blocks
- [ ] **gc-most-requested** - Most requested links (top tasks)
- [ ] **gc-subway-nav** - Step-by-step subway navigation (multi-page tasks)
- [ ] **gc-ordered-nav** - Ordered multi-page navigation (Prev/Next)
- [ ] **gc-in-page-toc** - In-page table of contents (auto-generated from headings)
- [ ] **gc-contact-band** - Contact us band for pages
- [ ] **gc-featured-link** - Featured/promoted links
- [ ] **gc-context-features** - Context-specific promotional features
- [ ] **gc-intro-block** - Introduction block for landing pages
- [ ] **gc-about-institution** - About the institution section

#### Content Patterns (10 components)
- [ ] **gc-contributors** - Contributors/partners display
- [ ] **gc-latest-news** - Latest news feed widget
- [ ] **gc-minister-profile** - Minister/institutional head profile card
- [ ] **gc-what-we-are-doing** - Government activities section
- [ ] **gc-social-follow** - Social media follow box
- [ ] **gc-social-feeds** - Social media feed widget
- [ ] **gc-download-links** - File download links with icons (PDF, CSV, XLS)
- [ ] **gc-labels** - Visual label tags (status indicators)
- [ ] **gc-contact-info** - Contact information display (address, phone, email)
- [ ] **gc-privacy-disclaimer** - Privacy disclaimer component

#### Interactive Patterns (5 components)
- [ ] **gc-expand-collapse** - Expand/collapse (accordion) pattern
- [ ] **gc-interactive-questions** - Question wizard/decision tree
- [ ] **gc-gc-feedback** - GC Feedback widget (page rating)
- [ ] **gc-carousel** - Image/content carousels (auto-rotate optional)
- [ ] **gc-sign-in-button** - Sign in button (header element)

#### Alert Patterns (3 components)
- [ ] **gc-alert-collapsible** - Collapsible/dismissible alerts
- [ ] **gc-alert-service-disruption** - Service disruption notices
- [ ] **gc-alert-banner** - Site-wide alert banners

#### Media Patterns (2 components)
- [ ] **gc-images** - Image display patterns (figures, captions)
- [ ] **gc-multimedia** - Video/audio embedding patterns

**Milestone M3**: Canada.ca design patterns complete → Ready for institutional pages

---

### 🔜 Phase 4: Templates & Advanced Features (65 components)
**Status**: 0% complete (0/65 implemented)  
**Timeline**: 12-16 weeks  
**Focus**: Page templates and specialized components

#### Page Templates (25 templates)
- [ ] **tpl-home** - Canada.ca home page template (MANDATORY)
- [ ] **tpl-theme** - Theme page template (MANDATORY)
- [ ] **tpl-topic** - Topic page template (MANDATORY)
- [ ] **tpl-institutional-landing** - Institutional landing page (MANDATORY)
- [ ] **tpl-ministerial-profile** - Ministerial profile page (MANDATORY)
- [ ] **tpl-news-product** - News product page (MANDATORY)
- [ ] **tpl-basic-page** - Basic page layout (most common)
- [ ] **tpl-service-initiation** - Service initiation page
- [ ] **tpl-contact-us** - Contact us page
- [ ] **tpl-search** - Search results page
- [ ] **tpl-finder** - Finder page (100+ filterable links)
- [ ] **tpl-faceted-finder** - Faceted finder with complex filters
- [ ] **tpl-long-index** - Long index page (50+ links)
- [ ] **tpl-short-index** - Short index page (10-50 links)
- [ ] **tpl-consultation** - Consultation profile page
- [ ] **tpl-news-landing** - News landing page
- [ ] **tpl-news-results** - News search results
- [ ] **tpl-dept-agencies** - Departments and agencies page
- [ ] **tpl-service-performance** - Service performance reporting
- [ ] **tpl-transparency** - Transparency and corporate reporting
- [ ] **tpl-program-description** - Program description page
- [ ] **tpl-regulation-profile** - Regulation profile page
- [ ] **tpl-act-profile** - Act profile page
- [ ] **tpl-accessibility-plan** - Accessibility plan page
- [ ] **tpl-accessibility-feedback** - Accessibility feedback form

#### Advanced WET-BOEW Plugins (30 components)
- [ ] **wb-data-ajax** - AJAX content loading
- [ ] **wb-data-json** - JSON data templating
- [ ] **wb-data-picture** - Responsive images
- [ ] **wb-data-inview** - Viewport-triggered loading
- [ ] **wb-data-fusion-query** - Query parameter mapping
- [ ] **wb-tagfilter** - Tag-based filtering
- [ ] **wb-add-cal** - Add to calendar
- [ ] **wb-bgimg** - Background image management
- [ ] **wb-equalheight** - Equal height columns
- [ ] **wb-favicon** - Dynamic favicon
- [ ] **wb-footnotes** - Accessible footnotes
- [ ] **wb-prettify** - Code syntax highlighting
- [ ] **wb-texthighlight** - Keyword highlighting
- [ ] **wb-zebra** - Zebra striping
- [ ] **wb-share** - Social media sharing
- [ ] **wb-facebook** - Facebook embedded pages
- [ ] **wb-twitter** - Twitter embedded timelines
- [ ] **wb-country-content** - Geolocation-based content
- [ ] **wb-exitscript** - Exit confirmation
- [ ] **wb-feedback** - Page feedback form
- [ ] **wb-details-close** - Auto-close details
- [ ] **wb-dismissable** - User-dismissible content
- [ ] **wb-randomize** - Random child selection
- [ ] Plus 7 more specialized plugins...

#### Experimental Features (10 components)
- [ ] **exp-math-grid** - Mathematical grid layout
- [ ] **exp-datatable-utilities** - Advanced DataTable utilities
- [ ] **exp-conjunction** - Conjunction pattern
- [ ] **exp-steps-pattern** - Steps navigation
- [ ] **exp-theme-canadaday** - Canada Day promotional theme
- [ ] **exp-theme-winterlude** - Winterlude theme
- [ ] **exp-theme-zev** - Zero-emission vehicle theme
- [ ] **exp-theme-empathy** - Empathy theme
- [ ] **exp-theme-choose-canada** - Choose Canada theme
- [ ] **exp-theme-ai-answers** - AI Answers theme

**Milestone M4**: 100% GC Design System coverage → Enterprise-grade government UI library

---

## 🎯 Implementation Strategy & Best Practices

### Development Workflow (Following CE, WM, HK protocols)

#### CE (Coordination Engine) - Task Management
- **GitHub Projects**: Track all 130 components in Kanban board
- **Sprint Planning**: 2-week sprints, 10-15 components per sprint
- **Daily Updates**: Update component status (Not Started → In Progress → Complete)
- **Blockers**: Flag dependencies (e.g., gc-global-header blocks tpl-home)

#### WM (Work Management) - Code Quality
- **Branch Strategy**: `feature/gc-global-header`, `feature/wb-tables`, etc.
- **Pull Requests**: One component per PR (easier review, faster merge)
- **Code Reviews**: P06 (REV) agent reviews before merge
- **Testing**: P07 (TST) agent generates tests (unit + integration)

#### HK (Housekeeping) - Documentation & Maintenance
- **Component Registry**: Auto-generated from source code
- **Storybook**: One story per component (auto-deployed on merge)
- **API Docs**: TypeDoc generates docs from JSDoc comments
- **CHANGELOG.md**: Semantic versioning, release notes per component

### Component Development Checklist

For EACH of the 130 components, ensure:

- [ ] **TypeScript implementation** with strict mode
- [ ] **Lit 3.x decorators** (@customElement, @property, @state)
- [ ] **Shadow DOM** for style encapsulation
- [ ] **CSS custom properties** for theming
- [ ] **ARIA attributes** (role, aria-label, aria-describedby)
- [ ] **Keyboard navigation** (Tab, Enter, Space, Esc, Arrow keys)
- [ ] **Focus management** (visible focus indicators, focus trap for modals)
- [ ] **i18n support** (EN-CA/FR-CA labels, runtime switching)
- [ ] **Responsive design** (mobile/tablet/desktop breakpoints)
- [ ] **Unit tests** (Vitest, ≥80% coverage)
- [ ] **Integration tests** (Testing Library, user interactions)
- [ ] **Accessibility tests** (axe-core, 0 violations)
- [ ] **Storybook story** (controls, actions, docs)
- [ ] **JSDoc comments** (params, returns, examples)
- [ ] **Usage examples** (React, Vue, Angular, Svelte, HTML)

---

## ✅ Success Criteria (Updated for 130 Components)

### Technical Success
- [ ] **69+ components implemented** (growing toward 130 goal) (100% GC Design System coverage)
- [ ] **≥80% test coverage** (Vitest unit + integration tests)
- [ ] **0 axe-core violations** (WCAG 2.2 AAA compliance)
- [ ] **<50KB gzipped bundle** (core library without templates)
- [ ] **TypeScript strict mode** passes for all components
- [ ] **CI/CD pipeline green** (GitHub Actions: build, test, lint, deploy)
- [ ] **Lighthouse 100/100** (Performance, Accessibility, Best Practices, SEO)

### Business Success
- [ ] **130 components** implemented and documented
- [ ] **Bilingual EN/FR** operational for all components
- [ ] **Live demos deployed** (Storybook + 3 production demos)
- [ ] **Documentation complete** (API docs, guides, troubleshooting)
- [ ] **npm packages published** (@eva-sovereign/web-components v1.0.0)
- [ ] **CDN links active** (jsDelivr, unpkg)

### Adoption Success
- [ ] **Used in ≥1 Government of Canada department** (pilot deployment)
- [ ] **Used in EVA Portal navigation** (internal adoption)
- [ ] **Used in EVA Chat interface** (EVA Suite integration)
- [ ] **Migration path validated** by ≥1 department migrating from WET-BOEW 4.x

---

## 📦 Phase 5: Release & Ecosystem (Post-130 Components)

### Business Success
- [x] 69+ components implemented (18 GC Patterns, 41 WET-BOEW, 10 EVA Foundation)
- [ ] GC Design System tokens operational
- [ ] Bilingual EN/FR operational
- [ ] Live demo deployed
- [ ] Documentation complete

### Adoption Success
- [ ] Used in ≥1 POD-S solution (Jurisprudence or AssistMe)
- [ ] Used in EVA Portal navigation
- [ ] Used in EVA Chat interface
- [ ] Migration path validated by ≥1 React app

---

## 🔗 Dependencies

### EVA Repos
- **eva-ui**: React components (API reference for migration)
- **eva-i11y**: Accessibility patterns and utilities
- **eva-i18n**: i18n infrastructure (if separate)
- **eva-da-2**: EVA Chat interface (consumer of eva-chat-panel)
- **eva-orchestrator**: Backlog lanes, agent coordination, sprint planning

### EVA CDDs
- **eva-ui-cdd.md** (95% complete, standardized)
- **eva-i11y-cdd.md** (95% complete, standardized)
- **eva-portal-navigation-ux.md** (active backlog)
- **eva-chat-widget.md** (active backlog)

### External Dependencies

#### Core Libraries
- **Lit 3.x** - Web Components framework
- **TypeScript 5.7.2** - Type safety and IntelliSense
- **Vite 5.x** - Build tool and dev server

#### Testing & Quality
- **Vitest** - Unit testing framework
- **@testing-library/dom** - Integration testing
- **axe-core** - Accessibility testing (WCAG compliance)
- **Playwright** - E2E testing (optional)

#### Documentation
- **Storybook 8.x** - Component documentation and demos
- **TypeDoc** - API documentation generator

#### WET-BOEW Integration (for advanced components)
- **Chart.js** - Charts and graphs (wb-charts)
- **DataTables** - Table sorting/filtering (wb-tables)
- **Leaflet or OpenLayers** - Maps (wb-geomap)
- **Video.js or Plyr** - Video player (wb-multimedia)

### EVA Agents (Agile Crew)
- **P02 (REQ)**: Requirements gathering (created this specification)
- **P05 (SCA)**: Scaffolder for package setup and project structure
- **P06 (REV)**: PR reviews and code quality gates
- **P07 (TST)**: Test generation (unit, integration, accessibility)
- **P08 (CICD)**: CI/CD pipeline setup (GitHub Actions)
- **P12 (UXA)**: Accessibility review (WCAG 2.2 AAA compliance)
- **P15 (DVM)**: Orchestration and sprint planning for 130 components

---

## ❓ Open Questions

### Q1: Component Naming Convention?
**Context**: Should components use `gc-` prefix (gc-button) or `eva-` prefix (eva-button)?  
**Current**: Using `eva-` prefix for implemented components  
**Recommendation**: Switch to `gc-` for GC Design System compliance, keep `eva-` for custom components (eva-chat-panel)  
**Decision Required**: Marco/PO  
**Impact**: Component naming, documentation, npm package exports

### Q2: WET-BOEW 4.x Compatibility?
**Context**: Should we provide a compatibility layer for existing WET-BOEW 4.x sites?  
**Options**: 
- Full compatibility mode (shadow `wb-` classes)
- Migration CLI tool (`eva-sovereign migrate`)
- Side-by-side coexistence (both libraries loaded)  
**Decision Required**: Marco/PO  
**Impact**: Adoption timeline, migration effort for departments

### Q3: CDN Hosting Strategy?
**Context**: Should we use unpkg, jsDelivr, or custom Azure CDN?  
**Recommendation**: Use jsDelivr (primary) + unpkg (fallback) for public CDN  
**Decision Required**: Marco/PO  
**Impact**: Distribution strategy, load times, reliability

### Q4: Storybook Hosting?
**Context**: GitHub Pages, Netlify, or Azure Static Web Apps?  
**Recommendation**: GitHub Pages (free, auto-deploy from main branch, custom domain support)  
**Decision Required**: Marco/PO  
**Impact**: Demo accessibility, public visibility

### Q5: npm Organization Scope?
**Context**: `@eva-suite/web-components` or `@gc-design-system/web-components`?  
**Current**: Using `@eva-sovereign/web-components`  
**Recommendation**: Keep `@eva-sovereign` for EVA branding, clarify "sovereign" = GC Design System in docs  
**Decision Required**: Marco/PO  
**Impact**: Package naming, discoverability, government adoption

### Q6: Phase 1 Timeline?
**Context**: 15 mandatory components in 4-6 weeks = aggressive timeline  
**Reality Check**: 10 mandatory patterns are complex (global header/footer = 20+ hours each)  
**Recommendation**: 8-10 weeks for Phase 1, or reduce scope to 5 highest-priority mandatory patterns first  
**Decision Required**: Marco/PO  
**Impact**: Sprint planning, resource allocation

### Q7: Template Approach?
**Context**: Should 25 page templates be actual Lit components or HTML examples?  
**Options**:
- **Option A**: Full Lit components (`<gc-home-page>`, `<gc-theme-page>`)
- **Option B**: HTML templates with component composition examples
- **Option C**: Hybrid (common layouts as components, specific pages as examples)  
**Recommendation**: Option C (best balance of reusability and flexibility)  
**Decision Required**: Marco/PO  
**Impact**: 25 templates = 25 components vs 5 layout components + 20 HTML examples

### Q5: EVA Chat Backend Integration?
**Context**: How does EVA Chat Panel connect to RAG backend?  
**Decision Required**: EVA Chat team  
**Impact**: B2 implementation

---

## 📚 Reference Documents

### In This Repo (EVA-Sovereign-UI/)
- [PROJECT-ANALYSIS.md](../PROJECT-ANALYSIS.md) - Architecture decisions
- [DUAL-COPILOT-PLAN.md](../DUAL-COPILOT-PLAN.md) - Execution strategy
- [COORDINATION-PROTOCOL.md](../COORDINATION-PROTOCOL.md) - Agent coordination
- [FIVE-EYES-RESEARCH.md](../FIVE-EYES-RESEARCH.md) - Design system research
- [docs/TRACEABILITY-DIRECTORY.md](../docs/TRACEABILITY-DIRECTORY.md) - Source document inventory

### In EVA Orchestrator
- [docs/backlog/CDD-INVENTORY-UPDATED.md](../../../../eva-orchestrator/docs/backlog/CDD-INVENTORY-UPDATED.md) - 61 CDDs
- [docs/backlog/eva-ui-cdd.md](../../../../eva-orchestrator/docs/backlog/eva-ui-cdd.md) - UI CDD (95% complete)
- [docs/backlog/eva-i11y-cdd.md](../../../../eva-orchestrator/docs/backlog/eva-i11y-cdd.md) - Accessibility CDD (95% complete)
- [to upload/eva-devtools/EVA Crew/EVA Agile Agentic Lifecycle Map.md](../../../../eva-orchestrator/to upload/eva-devtools/EVA Crew/EVA Agile Agentic Lifecycle Map.md) - 6-phase lifecycle

---

**Created by**: P02 (Requirements Agent) pattern  
**Date**: November 28, 2025  
**Status**: ✅ Complete P02 package ready for sprint planning
