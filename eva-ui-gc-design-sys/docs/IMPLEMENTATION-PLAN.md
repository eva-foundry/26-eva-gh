# EVA-UI Implementation Plan (P02)

**Project**: EVA-UI - Government of Canada RAG Chat Interface  
**Version**: P02 (Production Implementation)  
**Target**: Full GC Design System compliance with EVA-Sovereign-UI Web Components architecture

---

## EPIC-001: Foundation Setup & Tooling

**Objective**: Establish monorepo structure, build tooling, CI/CD pipeline, and accessibility testing infrastructure.

### Story 1.1: Monorepo & TypeScript Configuration
**Tasks**:
- [ ] Task 1.1.1: Configure npm workspaces in root `package.json` with `packages/web-components` and app workspace
- [ ] Task 1.1.2: Set up TypeScript 5.x with strict mode in `tsconfig.json` and `tsconfig.node.json`
- [ ] Task 1.1.3: Configure path aliases (`@eva-ui/*`, `@components/*`, `@services/*`)
- [ ] Task 1.1.4: Add TypeScript compiler options for Lit decorators and shadow DOM

**Success Criteria**: `npm run build` compiles without errors, imports resolve correctly across workspaces

### Story 1.2: Build & Test Infrastructure
**Tasks**:
- [ ] Task 1.2.1: Configure Vite 5.x with optimized Web Components build settings
- [ ] Task 1.2.2: Set up Vitest with @testing-library/react and happy-dom
- [ ] Task 1.2.3: Integrate axe-core for automated accessibility testing
- [ ] Task 1.2.4: Add test coverage reporting (target: >80%)

**Success Criteria**: `npm test` runs all tests, accessibility violations fail CI, coverage reports generate

### Story 1.3: CI/CD Pipeline
**Tasks**:
- [ ] Task 1.3.1: Create `.github/workflows/ci.yml` with lint, test, build jobs
- [ ] Task 1.3.2: Add Lighthouse CI for performance and accessibility scoring
- [ ] Task 1.3.3: Configure branch protection rules requiring CI pass
- [ ] Task 1.3.4: Add automated dependency updates (Dependabot)

**Success Criteria**: PRs cannot merge without passing CI, Lighthouse scores ≥95 for accessibility

---

## EPIC-002: EVA-Sovereign-UI Web Components (GC Design System)

**Objective**: Build Lit 3.x Web Components library with GC Design System tokens and accessibility baked in.

### Story 2.1: GC Design Tokens Foundation
**Tasks**:
- [ ] Task 2.1.1: Create `packages/web-components/src/design-tokens/gc-colors.ts` with GC color palette in oklch
- [ ] Task 2.1.2: Create `packages/web-components/src/design-tokens/gc-typography.ts` with Lato/Noto Sans scale
- [ ] Task 2.1.3: Create `packages/web-components/src/design-tokens/gc-spacing.ts` with GC spacing scale
- [ ] Task 2.1.4: Create `src/styles/gc-design-tokens.css` to expose tokens as CSS custom properties

**Success Criteria**: Tokens import successfully, CSS variables available in shadow DOM, no hardcoded colors in components

### Story 2.2: GC Header & Footer Components
**Tasks**:
- [ ] Task 2.2.1: Implement `<eva-header>` with Canada wordmark, flag, language toggle, skip link
  - File: `packages/web-components/src/components/eva-header/eva-header.ts`
  - Include responsive mobile hamburger menu
  - ARIA landmarks (banner role)
- [ ] Task 2.2.2: Implement `<eva-footer>` with mandatory GC footer links and date modified
  - File: `packages/web-components/src/components/eva-footer/eva-footer.ts`
  - Bilingual link structure (About, Contact, Terms, Privacy)
  - ARIA landmarks (contentinfo role)
- [ ] Task 2.2.3: Add Canada wordmark SVG asset to `packages/web-components/src/assets/`
- [ ] Task 2.2.4: Write accessibility tests ensuring skip link keyboard navigation works

**Success Criteria**: Header/footer match Canada.ca reference pages, zero axe violations, keyboard navigation works

### Story 2.3: Primitive Form Components
**Tasks**:
- [ ] Task 2.3.1: Implement `<eva-button>` with primary/secondary/destructive variants
  - File: `packages/web-components/src/components/eva-button/eva-button.ts`
  - 44px min height, GC focus ring, disabled states
  - Loading state with spinner
- [ ] Task 2.3.2: Implement `<eva-input>` with label, error, helper text
  - File: `packages/web-components/src/components/eva-input/eva-input.ts`
  - Accessible label association, aria-describedby for errors
  - Support for text, email, password types
- [ ] Task 2.3.3: Implement `<eva-select>` styled native select
  - File: `packages/web-components/src/components/eva-select/eva-select.ts`
  - Keyboard navigable, proper option labeling
- [ ] Task 2.3.4: Add comprehensive unit tests for each component

**Success Criteria**: All components pass accessibility tests, visual regression tests pass, props validated

### Story 2.4: Modal, Alert, and Card Components
**Tasks**:
- [ ] Task 2.4.1: Implement `<eva-modal>` with focus trap and ESC dismissal
  - File: `packages/web-components/src/components/eva-modal/eva-modal.ts`
  - Backdrop overlay, ARIA role="dialog", focus management
- [ ] Task 2.4.2: Implement `<eva-alert>` with severity variants (info, success, warning, error)
  - File: `packages/web-components/src/components/eva-alert/eva-alert.ts`
  - Icon + message layout, aria-live for dynamic alerts
- [ ] Task 2.4.3: Implement `<eva-card>` semantic container
  - File: `packages/web-components/src/components/eva-card/eva-card.ts`
  - Proper heading slot, footer slot, shadow elevation
- [ ] Task 2.4.4: Write Context Engineering JSDoc headers for all components

**Success Criteria**: Modals trap focus correctly, alerts announce to screen readers, cards validate heading hierarchy

### Story 2.5: Chat Panel Composite Component
**Tasks**:
- [ ] Task 2.5.1: Implement `<eva-chat-panel>` layout structure
  - File: `packages/web-components/src/components/eva-chat-panel/eva-chat-panel.ts`
  - Top: knowledge space selector
  - Middle: scrollable message list (virtual scroll support)
  - Bottom: input field + send button
- [ ] Task 2.5.2: Implement `<eva-message-bubble>` with user/AI distinction
  - File: `packages/web-components/src/components/eva-message-bubble/eva-message-bubble.ts`
  - Timestamp, copy button, markdown rendering
- [ ] Task 2.5.3: Implement `<eva-streaming-indicator>` animated dots (respects prefers-reduced-motion)
- [ ] Task 2.5.4: Wire chat panel to mock API for development testing

**Success Criteria**: Chat panel renders messages correctly, streaming indicator animates smoothly, accessible to keyboard/SR

---

## EPIC-003: Bilingual i18n Infrastructure

**Objective**: Implement comprehensive EN-CA / FR-CA internationalization with zero hardcoded strings.

### Story 3.1: i18n Service & Locale Detection
**Tasks**:
- [ ] Task 3.1.1: Create `src/services/i18n/i18n-service.ts` with locale management
  - Support locale detection from URL param, browser locale, user preference
  - Expose `setLocale()`, `getLocale()`, `t()` translation function
- [ ] Task 3.1.2: Create `src/services/i18n/locales/en-CA.json` with all English strings
- [ ] Task 3.1.3: Create `src/services/i18n/locales/fr-CA.json` with all French strings
- [ ] Task 3.1.4: Add type safety for translation keys using TypeScript literal types

**Success Criteria**: Language toggle switches all UI text, no English visible in FR mode, no console errors

### Story 3.2: Web Component i18n Integration
**Tasks**:
- [ ] Task 3.2.1: Create i18n mixin for Lit components: `packages/web-components/src/mixins/i18n-mixin.ts`
- [ ] Task 3.2.2: Update all components to use translation keys instead of hardcoded strings
- [ ] Task 3.2.3: Handle locale change events and trigger re-render
- [ ] Task 3.2.4: Test all components in both EN-CA and FR-CA modes

**Success Criteria**: All components render correctly in both languages, smooth transition on locale change

### Story 3.3: Date, Number, and Currency Formatting
**Tasks**:
- [ ] Task 3.3.1: Add `Intl.DateTimeFormat` wrapper for locale-specific date formatting
- [ ] Task 3.3.2: Add `Intl.NumberFormat` wrapper for locale-specific number formatting
- [ ] Task 3.3.3: Update message timestamps to use locale-aware formatting
- [ ] Task 3.3.4: Add unit tests for formatting edge cases

**Success Criteria**: Dates format as DD/MM/YYYY in FR-CA and MM/DD/YYYY in EN-CA, numbers use appropriate separators

---

## EPIC-004: Customization Backstage (⚙️)

**Objective**: Build split-screen configuration interface with live preview for administrators.

### Story 4.1: Backstage Panel Layout
**Tasks**:
- [ ] Task 4.1.1: Implement `<eva-backstage-panel>` slide-in component
  - File: `packages/web-components/src/components/eva-backstage-panel/eva-backstage-panel.ts`
  - Split-screen layout: 40% nav/config, 60% live preview
  - Accessible close button, ESC dismissal, focus trap
- [ ] Task 4.1.2: Implement tree navigation for config sections (Home, Theme, Text, i18n, Features, Deploy, Import/Export)
- [ ] Task 4.1.3: Add ⚙️ Customize button to `<eva-header>` (respects GC header structure)
- [ ] Task 4.1.4: Implement live preview iframe with message passing

**Success Criteria**: Backstage opens/closes smoothly, navigation works via keyboard, live preview updates in real-time

### Story 4.2: Theme Customization Panel
**Tasks**:
- [ ] Task 4.2.1: Create theme editor UI with color pickers for GC token overrides
  - File: `src/components/customization/theme-editor.ts`
  - Allow customization of primary, secondary, accent colors (with contrast validation)
- [ ] Task 4.2.2: Add logo upload for custom Canada wordmark replacement (with accessibility warnings)
- [ ] Task 4.2.3: Implement theme preview applying changes to live iframe
- [ ] Task 4.2.4: Add theme export as JSON and import from JSON

**Success Criteria**: Color changes reflect immediately in preview, contrast ratios validated, themes export/import correctly

### Story 4.3: Text & i18n Customization
**Tasks**:
- [ ] Task 4.3.1: Create text editor UI for overriding default translations
  - File: `src/components/customization/text-editor.ts`
  - Show EN-CA and FR-CA side-by-side
- [ ] Task 4.3.2: Validate that all required keys have translations in both languages
- [ ] Task 4.3.3: Add import/export for custom translation JSON
- [ ] Task 4.3.4: Implement text search/filter for large translation sets

**Success Criteria**: Custom translations override defaults, missing keys flagged, export includes only overrides

### Story 4.4: Deployment Manager
**Tasks**:
- [ ] Task 4.4.1: Create deployment panel showing current config
  - File: `src/components/customization/deploy-manager.ts`
  - Display JSON config, allow download
- [ ] Task 4.4.2: Add validation step before deployment (accessibility checks, required fields)
- [ ] Task 4.4.3: Implement "Reset to Defaults" functionality
- [ ] Task 4.4.4: Add deployment history/versioning (store in localStorage or KV)

**Success Criteria**: Deployment exports valid config, validation catches errors, reset works correctly

---

## EPIC-005: EVA-API Integration

**Objective**: Connect chat interface to EVA-RAG backend API with proper error handling and streaming.

### Story 5.1: API Client Service
**Tasks**:
- [ ] Task 5.1.1: Create `src/services/api/eva-api-client.ts` with fetch wrapper
  - Support for GET, POST with JSON payloads
  - Authentication token management (if required)
  - Error handling and retry logic
- [ ] Task 5.1.2: Implement streaming response handler for SSE (Server-Sent Events)
- [ ] Task 5.1.3: Add request/response logging (with PII redaction)
- [ ] Task 5.1.4: Write unit tests mocking API responses

**Success Criteria**: API client handles network errors gracefully, streaming works, tests pass with mocked responses

### Story 5.2: Knowledge Space Management
**Tasks**:
- [ ] Task 5.2.1: Create `src/services/api/knowledge-space-service.ts`
  - Fetch available knowledge spaces from API
  - Cache results with expiration
- [ ] Task 5.2.2: Update `<eva-knowledge-space-selector>` to load from API
- [ ] Task 5.2.3: Handle API errors with user-friendly messaging
- [ ] Task 5.2.4: Add loading states during API calls

**Success Criteria**: Knowledge spaces load from API, errors display GC-styled alerts, loading indicators appear

### Story 5.3: Chat Message Handling
**Tasks**:
- [ ] Task 5.3.1: Create `src/services/chat/chat-service.ts` for message management
  - Send message to API, handle streaming response
  - Store messages in IndexedDB for persistence
- [ ] Task 5.3.2: Integrate chat service with `<eva-chat-panel>`
- [ ] Task 5.3.3: Implement retry logic for failed messages
- [ ] Task 5.3.4: Add message status indicators (sending, sent, error)

**Success Criteria**: Messages send successfully, streaming responses render in real-time, failures allow retry

---

## EPIC-006: Accessibility & Testing

**Objective**: Ensure WCAG 2.2 AA/AAA compliance and comprehensive test coverage.

### Story 6.1: Automated Accessibility Testing
**Tasks**:
- [ ] Task 6.1.1: Add axe-core tests to all component unit tests
- [ ] Task 6.1.2: Create accessibility test suite: `tests/accessibility/a11y-suite.test.ts`
  - Keyboard navigation tests
  - Screen reader announcement tests
  - Color contrast validation
- [ ] Task 6.1.3: Add Lighthouse CI to GitHub Actions with minimum score thresholds
- [ ] Task 6.1.4: Document accessibility features in `docs/ACCESSIBILITY.md`

**Success Criteria**: Zero axe violations in tests, Lighthouse accessibility score ≥95, keyboard nav works everywhere

### Story 6.2: Manual Accessibility Audit
**Tasks**:
- [ ] Task 6.2.1: Conduct manual screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Task 6.2.2: Test with keyboard-only navigation (no mouse)
- [ ] Task 6.2.3: Validate with Windows High Contrast mode
- [ ] Task 6.2.4: Create accessibility issue tickets for any findings

**Success Criteria**: All critical flows work with keyboard and screen reader, high contrast mode doesn't break layout

### Story 6.3: Unit & Integration Test Coverage
**Tasks**:
- [ ] Task 6.3.1: Achieve >80% code coverage across all packages
- [ ] Task 6.3.2: Add integration tests for critical user flows (send message, switch language, customize theme)
- [ ] Task 6.3.3: Add visual regression tests using Playwright or similar
- [ ] Task 6.3.4: Set up test coverage reporting in CI

**Success Criteria**: Coverage reports show >80%, integration tests cover all epics, visual regressions caught in CI

---

## Implementation Sequence (Recommended Order)

**Phase 1: Foundation (Week 1)**
- EPIC-001: Foundation Setup & Tooling
- Story 2.1: GC Design Tokens Foundation

**Phase 2: Core Components (Week 2-3)**
- Story 2.2: GC Header & Footer Components
- Story 2.3: Primitive Form Components
- Story 2.4: Modal, Alert, and Card Components

**Phase 3: Chat Interface (Week 4)**
- Story 2.5: Chat Panel Composite Component
- Story 5.1: API Client Service
- Story 5.3: Chat Message Handling

**Phase 4: Bilingual Support (Week 5)**
- EPIC-003: Bilingual i18n Infrastructure (all stories)

**Phase 5: Customization (Week 6-7)**
- EPIC-004: Customization Backstage (all stories)
- Story 5.2: Knowledge Space Management

**Phase 6: Quality Assurance (Week 8)**
- EPIC-006: Accessibility & Testing (all stories)
- Final manual testing and bug fixes

---

## Definition of Done (Per Story)

- [ ] All tasks completed
- [ ] Unit tests written with >80% coverage
- [ ] Accessibility tests pass (zero axe violations)
- [ ] Code reviewed and approved
- [ ] Documentation updated (JSDoc, README, etc.)
- [ ] Bilingual support verified (EN-CA and FR-CA)
- [ ] No console errors or warnings
- [ ] Lighthouse scores meet thresholds
- [ ] Deployed to staging environment for QA

---

## Risk Management

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GC Design System changes | Low | High | Pin to specific version, monitor for updates |
| Accessibility violations | Medium | High | Automated testing in CI, manual audits each sprint |
| API breaking changes | Medium | Medium | Version API endpoints, contract testing |
| Browser compatibility | Low | Medium | Test in Chrome, Firefox, Safari, Edge |
| Performance degradation | Medium | Medium | Lighthouse CI, virtual scrolling for large lists |
| i18n incomplete coverage | Medium | High | Linter for hardcoded strings, translation validation |

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-27  
**Owner**: EVA-UI Development Team
