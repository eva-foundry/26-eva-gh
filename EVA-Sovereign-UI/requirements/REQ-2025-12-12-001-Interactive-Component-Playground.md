# REQ-2025-12-12-001: Interactive Component Playground

**Status**: Draft → Review
**Owner**: POD-X (UI) + POD-F (Foundation)
**Priority**: Critical
**Type**: Feature (Epic-level)
**Version**: 1.0.0
**Created**: 2025-12-12

---

## Problem Statement

**Current State**: GC Design Lab shows 100 components as placeholder buttons without:
- Live interactive demos showing actual component rendering
- Property controls to test different configurations
- Multi-framework code examples (React, Vue, Angular, Svelte)
- Production-ready reference for EVA Suite's 40+ products

**Pain Points**:
- Developers can't see how components actually work
- No way to test props/variants without writing code
- No framework-specific integration examples
- Not production-ready as developer documentation

**Impact**: EVA Suite products cannot effectively use the component library without proper documentation and examples.

---

## User Story

**As a** Developer building EVA Suite products (EVA DA 2.0, EVA Chat 2.0, etc.)

**I want** An interactive playground that shows:
1. Live component demos with actual rendering (not placeholders)
2. Interactive property controls to modify props in real-time
3. Code examples in all 5 frameworks (Web Components, React, Vue, Angular, Svelte)
4. Copy-paste ready snippets with proper imports

**So that** I can:
- Understand component capabilities without reading source code
- Test different configurations before integrating
- Get framework-specific implementation guidance
- Accelerate development across all EVA Suite products

---

## Business Value

**Strategic**:
- Accelerates EVA Suite product development (40+ products)
- Reduces developer onboarding time (days → hours)
- Ensures consistent component usage across products
- Serves as THE authoritative reference for component library

**Tactical**:
- Reduces support questions ("How do I use X?")
- Prevents incorrect component usage
- Enables self-service developer experience
- Scales to 100 components without manual effort

**Metrics**:
- Developer time to integrate first component: 60 min → 10 min (83% reduction)
- Support questions per week: 15 → 3 (80% reduction)
- Component adoption rate: 40% → 95% (across EVA products)

---

## Scope

### In Scope

**Phase 1 (MVP - Critical Path)**:
- Interactive playground framework (UI shell)
- 10 core EVA components fully documented:
  - eva-button (6 variants)
  - eva-input (7 types)
  - eva-chat-panel (bilingual AI)
  - eva-select, eva-checkbox, eva-radio
  - eva-modal, eva-alert, eva-card, eva-tabs
- Interactive property controls for each component:
  - Dropdowns for enum props (variant, size, type)
  - Toggle switches for boolean props (disabled, required)
  - Text inputs for string props (placeholder, label)
  - Number inputs for numeric props (maxLength, min, max)
- Live preview panel showing component with current props
- Multi-framework code generator (all 5 frameworks):
  - Web Components (vanilla HTML)
  - React JSX with hooks
  - Vue 3 Composition API
  - Angular standalone components
  - Svelte
- Copy-to-clipboard for code snippets
- Component metadata registry (componentMetadata.js already started)

**Phase 2 (Next Sprint)**:
- 45 GC Design System components
- Navigation patterns (breadcrumbs, side-nav, site-menu)
- Layout components (global-header, global-footer)
- Government widgets (most-requested, topic-menu)

**Phase 3 (Future)**:
- 44 WET-BOEW components
- Advanced features (API documentation, accessibility audits)

### Out of Scope (for Phase 1)

- Visual design generation (we show existing components)
- Component source code editing (read-only reference)
- Storybook migration (this is standalone)
- Performance benchmarking
- Automated testing in playground
- User authentication
- Saving component configurations

---

## Acceptance Criteria

### AC1: Interactive Property Controls
**GIVEN** A developer views eva-button in playground
**WHEN** They change variant dropdown from "primary" → "supertask"
**THEN** Live preview updates instantly to show supertask button styling

### AC2: Multi-Framework Code Generation
**GIVEN** Developer has configured eva-input with type="email", required=true
**WHEN** They click React tab
**THEN** Code snippet shows:
```jsx
<EvaInput type="email" required />
```
WITH proper imports and event handlers

### AC3: Copy-Paste Ready Code
**GIVEN** Developer clicks "Copy Code" on Vue example
**WHEN** They paste into VSCode
**THEN** Code is syntactically correct and includes all necessary imports

### AC4: Component Discovery
**GIVEN** Developer searches "chat"
**WHEN** Search executes
**THEN** eva-chat-panel appears in filtered results with preview

### AC5: Accessibility
**GIVEN** Keyboard-only navigation
**WHEN** Developer tabs through component cards
**THEN** Focus indicators visible, all controls keyboard-accessible (WCAG 2.2 AAA)

### AC6: Responsive Design
**GIVEN** Playground opened on mobile (375px width)
**WHEN** Layout adjusts
**THEN** All controls accessible, code examples readable, no horizontal scroll

---

## QA Definition

### Test Approach

**Unit Tests** (NOT in playground itself, but component library):
- Components render correctly with default props
- Props update triggers re-render
- Events fire as expected

**Integration Tests**:
- Property controls update live preview
- Code generator produces valid syntax
- Framework-specific examples executable

**Manual QA Checklist**:
- [ ] All 10 Phase 1 components render correctly
- [ ] Property controls modify live preview
- [ ] Code examples copy without errors
- [ ] Search/filter works
- [ ] Keyboard navigation functional
- [ ] Mobile responsive (test on 375px, 768px, 1440px)
- [ ] Screen reader announces component changes
- [ ] Bilingual support (EN/FR toggle) works

### Success Metrics

**Quantitative**:
- Zero console errors on page load
- Code examples execute without modification in target frameworks
- WCAG 2.2 AAA compliance (axe-core scan = 0 violations)
- Page load < 3 seconds on 3G connection

**Qualitative**:
- Developer can find and integrate component in < 10 minutes (user testing)
- Code examples rated "helpful" by 90%+ of testers

---

## Dependencies

### Technical Dependencies
- **Web Components Built**: `packages/web-components/dist/eva-sovereign-ui.es.js` (✅ DONE)
- **Component Metadata**: `component-metadata.js` (✅ STARTED - 3/10 components documented)
- **GitHub Pages Deployment**: Workflow configured (✅ DONE)

### Knowledge Dependencies
- Component API documentation (props, events, slots, CSS vars)
- Framework wrapper patterns (React/Vue/Angular/Svelte)
- Code generation templates per framework

### Blockers
- ❌ **React/Vue/Angular/Svelte packages empty** - Need framework wrapper pattern decision
  - **Decision Needed**: Do we auto-generate wrappers or manually create?
  - **Impact**: Code examples may show web component usage in frameworks (valid approach)
  - **Mitigation**: Phase 1 shows web component usage in all frameworks (valid pattern)

---

## Implementation Breakdown

### Task 1: Complete Component Metadata Registry (4 hours)
**Owner**: Developer
**Priority**: Critical
**Details**:
- Complete `component-metadata.js` for 10 components (7 remaining)
- Document all props with types, defaults, descriptions
- Write code examples for all 5 frameworks per component
- Include events, slots, CSS custom properties

**Acceptance**:
- [ ] 10 components have complete metadata
- [ ] All code examples syntactically valid
- [ ] Prop types match component TypeScript definitions

---

### Task 2: Build Interactive Property Editor UI (6 hours)
**Owner**: Developer
**Priority**: Critical
**Details**:
- Create PropertyEditor.js component
- Input types: select (enum), toggle (boolean), text (string), number
- Real-time prop updates to live preview
- Debounced updates (300ms) for text inputs

**UI Structure**:
```
┌─────────────────────────────────────┐
│ eva-button                          │
│                                     │
│ Properties                          │
│ ├─ Variant:  [Primary ▼]          │
│ ├─ Size:     [Medium  ▼]          │
│ ├─ Disabled: [ ] Toggle           │
│ └─ Label:    [Submit Application] │
│                                     │
│ Live Preview                        │
│ ┌─────────────────────────────────┐ │
│ │ [Submit Application]            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Acceptance**:
- [ ] Property controls render for all 10 components
- [ ] Live preview updates < 100ms after prop change
- [ ] No memory leaks on rapid prop changes

---

### Task 3: Build Multi-Framework Code Generator (8 hours)
**Owner**: Developer
**Priority**: High
**Details**:
- Create CodeGenerator.js
- Template engine for 5 frameworks
- Syntax highlighting (Prism.js or highlight.js)
- Copy-to-clipboard with success feedback

**Code Tab Structure**:
```
┌─────────────────────────────────────┐
│ [Web Components] [React] [Vue] ... │
├─────────────────────────────────────┤
│ import { EvaButton } from '@eva...; │
│                                     │
│ <EvaButton                          │
│   variant="primary"                 │
│   size="medium"                     │
│ >                                   │
│   Submit Application                │
│ </EvaButton>                        │
│                                     │
│ [📋 Copy Code]                      │
└─────────────────────────────────────┘
```

**Acceptance**:
- [ ] Code generation works for all 10 components × 5 frameworks = 50 snippets
- [ ] Syntax highlighting renders correctly
- [ ] Copy button shows success toast (2s duration)
- [ ] Code examples validated in CodeSandbox

---

### Task 4: Integrate into GC Design Lab Page (4 hours)
**Owner**: Developer
**Priority**: High
**Details**:
- Replace static component cards with interactive playground
- Maintain search/filter functionality
- Add modal/panel for detailed component view
- Preserve accessibility (keyboard nav, ARIA)

**Acceptance**:
- [ ] Click component card → opens interactive playground modal
- [ ] Modal dismissible (Esc key, close button, click outside)
- [ ] Search/filter still functional
- [ ] No layout shift on modal open

---

### Task 5: Documentation & Deployment (2 hours)
**Owner**: Developer
**Priority**: Medium
**Details**:
- Update README with playground usage instructions
- Add "How to Use" section in GC Design Lab
- Deploy to GitHub Pages
- Create quick-start video (optional, 3 min)

**Acceptance**:
- [ ] README updated
- [ ] GitHub Pages deployed successfully
- [ ] Live URL functional: https://marcopolo483.github.io/EVA-Sovereign-UI/demos/gc-design-lab/

---

## Technical Architecture

### Component Structure
```
demos/gc-design-lab/
├── index.html                    # Main page (already exists)
├── component-metadata.js         # Metadata registry (in progress)
├── PropertyEditor.js             # NEW: Interactive controls
├── CodeGenerator.js              # NEW: Multi-framework snippets
├── ComponentPlayground.js        # NEW: Main playground component
└── styles/
    └── playground.css            # NEW: Playground-specific styles
```

### Data Flow
```
User selects component
  ↓
Load metadata from registry
  ↓
Render PropertyEditor (controls)
  ↓
User changes prop value
  ↓
Update live preview (web component)
  ↓
Regenerate code snippets (all frameworks)
  ↓
User copies code
  ↓
Toast notification: "Code copied!"
```

---

## Risks & Mitigation

### Risk 1: Framework Wrappers Don't Exist
**Severity**: High
**Likelihood**: Confirmed
**Impact**: Cannot show React-specific wrapper usage

**Mitigation**:
- **Option A**: Show web component usage in all frameworks (VALID - frameworks support web components)
- **Option B**: Generate minimal framework wrappers using Lit's `@lit/react`, `@lit-labs/vue`, etc.
- **Decision**: Option A for Phase 1 (get MVP shipped), Option B for Phase 2

**Example (React using Web Component)**:
```jsx
import '@eva-sovereign/web-components';

function MyApp() {
  return <eva-button variant="primary">Submit</eva-button>;
}
```

### Risk 2: 100 Components = Large Metadata File
**Severity**: Medium
**Likelihood**: High
**Impact**: Slow page load, maintenance burden

**Mitigation**:
- Phase 1: 10 components only (manageable)
- Phase 2: Code-split metadata (lazy load per component)
- Phase 3: Generate metadata from TypeScript source (automation)

### Risk 3: Code Generation Drift from Actual APIs
**Severity**: Medium
**Likelihood**: Medium
**Impact**: Examples don't match real component APIs

**Mitigation**:
- Validate code examples in CI/CD (ESLint, TypeScript check)
- Auto-generate from component TypeScript definitions (future)
- Manual review as part of Definition of Done

---

## Timeline

**Phase 1 (MVP)**: 24 hours development time
- Task 1: 4 hours (metadata)
- Task 2: 6 hours (property editor)
- Task 3: 8 hours (code generator)
- Task 4: 4 hours (integration)
- Task 5: 2 hours (docs/deploy)

**Estimated Sprint**: Current sprint (can complete in 1-2 days)

**Dependencies**: None (all prerequisites met)

---

## References

- [P02 Requirements Engine](../../eva-orchestrator/docs/agents/devtools/P02-Requirements-Engine.md)
- [P12 UX & Accessibility Agent](../../eva-orchestrator/docs/agents/devtools/P12-UX-Copy-Accessibility-Agent.md)
- [EVA-Sovereign-UI README](../README.md)
- [Component Library Spec](../docs/SPECIFICATION.md)

---

## Approval

**Product Owner (Marco)**: [ ] Approve [ ] Request Changes [ ] Reject

**Comments**:
_[Marco to review and approve before implementation begins]_

---

**Next Steps After Approval**:
1. Create GitHub issue from this requirement
2. Break down into sprint tasks
3. Assign to developer (ai2/windowsGuy or GitHub Copilot)
4. Begin Task 1 (Complete metadata registry)
