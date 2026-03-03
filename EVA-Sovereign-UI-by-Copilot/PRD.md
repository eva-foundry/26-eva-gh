# EVA-Sovereign-UI: Government Design System & Component Library

A production-ready, framework-agnostic web components design system demonstrating official government design patterns, comprehensive accessibility, and internationalization across Five Eyes sovereign nations.

**Experience Qualities**:
1. **Trustworthy** - Official government branding with strict adherence to national design standards conveys authority and legitimacy
2. **Accessible** - WCAG 2.2 AAA compliance ensures every citizen can access critical government services regardless of ability
3. **Inclusive** - Multi-language support and cultural sensitivity demonstrate respect for diverse populations

**Complexity Level**: Complex Application (advanced functionality, multiple sovereign profiles, comprehensive i18n, accessibility features, component library with two full demo applications)

## Essential Features

### 1. Web Components Library (31 Components)
- **Functionality**: Standards-based Custom Elements with Shadow DOM providing framework-agnostic UI components
- **Purpose**: Enable any government agency to build accessible, bilingual web applications without framework lock-in
- **Trigger**: Developer includes `<script src="eva-sovereign-ui.js">` and uses custom HTML elements
- **Progression**: Import library → Use custom elements in HTML → Components render with Shadow DOM → Apply themes via CSS custom properties → Switch locales dynamically
- **Success criteria**: Components work in plain HTML, React, Vue, Angular with consistent behavior and styling

### 2. GC Design System Implementation
- **Functionality**: Official Government of Canada design patterns (Lato/Noto Sans fonts, 65ch line length, 8px grid, official colors, 6 button variants)
- **Purpose**: Legal compliance with Treasury Board standards and visual consistency with Canada.ca
- **Trigger**: Apply `canada_gc` profile and theme CSS
- **Progression**: Set profile attribute → Load GC theme → Components adopt official styling → Wordmark/flag display → Footer shows Crown copyright
- **Success criteria**: Visual match to official Canada.ca pages, passes GC design review standards

### 3. ESDC Public Website Demo
- **Functionality**: Realistic Employment and Social Development Canada portal with programs (EI, OAS, CPP), services (Job Search, Benefits Finder), and EVA chatbot
- **Purpose**: Demonstrate real-world government use case with complex information architecture
- **Trigger**: User navigates to ESDC demo URL
- **Progression**: View homepage hero → Browse program cards → Click into program details → Ask EVA questions → Switch to French → See translated content
- **Success criteria**: Feels like authentic government website, chatbot provides contextual responses, bilingual toggle works seamlessly

### 4. EVA AI Assistant Chatbot
- **Functionality**: Conversational interface with context-aware responses about ESDC programs
- **Purpose**: Show modern citizen engagement pattern for government services
- **Trigger**: User types question in chat input or clicks suggested topics
- **Progression**: Enter question → Press send → Loading spinner → Response appears with typing animation → Auto-scroll to latest → Ask follow-up
- **Success criteria**: Natural conversation flow, accurate program information, accessible with screen readers, keyboard navigable

### 5. Five Eyes Sovereign Profiles
- **Functionality**: Pre-configured themes for Canada, USA, UK, Australia, New Zealand with official logos, colors, legal text
- **Purpose**: Enable rapid deployment for allied nations sharing security architecture
- **Trigger**: Set `profile` attribute to country code
- **Progression**: Select profile → Load country theme → Display national symbols → Apply color palette → Show localized footer text
- **Success criteria**: Each profile looks distinctly governmental with correct national branding

### 6. Internationalization System
- **Functionality**: Translation engine with 5+ locales (EN-CA, FR-CA, EN-US, EN-GB, EN-AU), date/number/currency formatters, RTL preparation
- **Purpose**: Official Languages Act compliance and global accessibility
- **Trigger**: User clicks language switcher or sets `lang` attribute
- **Progression**: Click language toggle → Emit locale change event → Components fetch translations → Re-render with new text → Format dates/numbers correctly
- **Success criteria**: Complete UI translation in <100ms, no layout shift, dates format per locale conventions

### 7. WCAG 2.2 AAA Accessibility
- **Functionality**: 7:1 contrast, full keyboard nav, screen reader optimization, focus indicators, skip links, ARIA landmarks
- **Purpose**: Legal requirement for government accessibility and disability inclusion
- **Trigger**: User navigates with keyboard or screen reader
- **Progression**: Tab through page → Skip link appears on focus → Navigate to main content → Interactive elements announce properly → Focus visible at all times
- **Success criteria**: Passes WAVE/axe audits, usable with NVDA/JAWS, keyboard-only navigation complete

### 8. Developer Kit Demo
- **Functionality**: Interactive component gallery with live code examples, theme switcher, accessibility showcase, integration patterns
- **Purpose**: Developer onboarding and adoption acceleration
- **Trigger**: Developer visits dev kit URL
- **Progression**: Browse component categories → View live examples → Copy code snippets → Switch themes → See visual changes → Test accessibility features
- **Success criteria**: Developers can copy-paste examples and get working components in <5 minutes

## Edge Case Handling

- **Missing translations**: Fall back to English key name, log warning for developer awareness
- **Invalid locale**: Default to `en-CA`, show error in console but maintain functionality
- **Chatbot unknown question**: Provide helpful fallback with list of available topics
- **Slow network**: Show loading states, disable buttons during fetch, timeout after 30s
- **JavaScript disabled**: Components fail gracefully, show `<noscript>` message for critical functions
- **Old browsers**: Polyfills for Custom Elements and Shadow DOM, graceful degradation for CSS features
- **Screen reader edge cases**: ARIA live regions have politeness delays, focus management respects user preferences
- **Keyboard trap prevention**: Escape key always closes modals, focus returns to trigger element

## Design Direction

The design should evoke **institutional trust and governmental authority** while remaining **approachable and modern**. Visual style should be **serious yet accessible** - not corporate slick, but professional and service-oriented. Interface should be **minimal and content-focused**, letting critical information and calls-to-action breathe without decorative distractions. The aesthetic must balance **tradition** (official symbols, formal language) with **contemporary** (clean typography, generous whitespace, modern interaction patterns).

## Color Selection

**Custom palette** based on official Government of Canada Design System specifications with strict adherence to accessibility standards.

- **Primary Color**: `#26374A` (Deep Blue-Grey) - Communicates stability, authority, and trustworthiness of federal institutions. Used for primary actions and key UI elements.
- **Secondary Colors**: 
  - `#284162` (Link Blue) - Standard link color with heritage in web accessibility
  - `#A62A1E` (Burgundy Red) - Accent for H1 bars and urgent calls-to-action, references Canadian flag
- **Accent Color**: `#0535d2` (Bright Blue) - Hover state for links, provides clear interactive feedback and high contrast
- **Foreground/Background Pairings**:
  - Background White `#ffffff`: Text `#333` - Ratio 12.6:1 ✓ (AAA)
  - Primary `#26374A`: White text `#ffffff` - Ratio 9.4:1 ✓ (AAA)
  - Link Blue `#284162`: White text `#ffffff` - Ratio 8.2:1 ✓ (AAA)
  - Error Red `#d3080c`: White text `#ffffff` - Ratio 5.5:1 ✓ (AA Large)
  - Accent `#0535d2`: White text `#ffffff` - Ratio 8.9:1 ✓ (AAA)
  - Muted Grey `#f5f5f5`: Text `#333` - Ratio 11.8:1 ✓ (AAA)

## Font Selection

Typography should convey **clarity and readability** with fonts optimized for long-form government content and multilingual support. **Lato** (headings) provides geometric precision and authority, while **Noto Sans** (body) ensures comprehensive Unicode coverage for Official Languages Act compliance.

- **Typographic Hierarchy**:
  - H1 (Page Title): Lato Bold/41px/1.2 line height/tight tracking
  - H2 (Section): Lato Bold/32px/1.3 line height
  - H3 (Subsection): Lato SemiBold/24px/1.4 line height
  - Body (Content): Noto Sans Regular/20px/1.5 line height/65ch max width
  - Label (Forms): Noto Sans Medium/18px/1.4 line height
  - Small (Legal): Noto Sans Regular/16px/1.5 line height

## Animations

Motion should be **purposeful and restrained** - reinforcing interaction feedback and guiding attention without drawing focus from content. Balance is **heavily weighted toward functionality** (state changes, loading indicators, focus transitions) with **minimal decorative motion**. Government users value efficiency over entertainment.

- **Purposeful Meaning**: Subtle fade-ins on page load convey professionalism, button press animations provide tactile feedback, loading spinners communicate system status
- **Hierarchy of Movement**: 
  1. Critical: Loading states, form validation feedback (immediate, assertive)
  2. Important: Modal open/close, language switch (smooth, 200ms)
  3. Subtle: Hover states, focus indicators (instant, <100ms)
  4. Minimal: Card hovers, decorative elements (gentle, optional)

## Component Selection

- **Components**: 
  - Dialogs: `<eva-dialog-modal>` with focus trap for critical confirmations
  - Cards: `<eva-card>` and `<eva-program-card>` with semantic header/body/footer slots
  - Forms: `<eva-form-field>` with integrated label/hint/error, `<eva-error-summary>` for validation
  - Buttons: `<eva-gc-button>` with 6 GC-compliant variants
  - Layout: `<eva-page-shell>`, `<eva-container>` enforcing 65ch max width
  - Navigation: `<eva-breadcrumbs>`, `<eva-skip-link>`, `<eva-service-list>`
  - Feedback: `<eva-alert>`, `<eva-loading-spinner>`, `<eva-progress-bar>`, `<eva-aria-live>`
  - Chat: `<eva-chat-panel>`, `<eva-chat-message>`, `<eva-chat-input>`
  - i18n: `<eva-language-switcher>`, `<eva-date-formatter>`, `<eva-currency-formatter>`
  - Accessibility: `<eva-tooltip>`, focus management utilities

- **Customizations**: 
  - Country-specific headers (`<eva-canada-header>`, etc.) beyond standard components
  - Chat components with government-specific styling (formal, professional)
  - Program cards with icon support for ESDC services

- **States**: 
  - Buttons: default, hover (darker shade), active (pressed inset), focus (3px outline), disabled (50% opacity), loading (spinner + disabled)
  - Inputs: default, focus (blue border + outline), error (red border + icon), success (green check), disabled (grey background)
  - Links: default (blue), hover (darker blue + underline), visited (purple), focus (outline)

- **Icon Selection**: Phosphor Icons for clarity and consistency - House (home), Briefcase (employment), UserCircle (profile), Globe (language), ChatCircle (chat), CaretRight (navigation), Check (success), Warning (error)

- **Spacing**: 8px base unit - xs(8px), sm(16px), md(24px), lg(32px), xl(48px), 2xl(64px) for consistent rhythm

- **Mobile**: 
  - Header: Wordmark scales down, language switcher remains accessible
  - Navigation: Hamburger menu pattern for service lists
  - Cards: Stack vertically, full width on <768px
  - Chat: Fixed bottom panel, collapsible on mobile
  - Forms: Full-width inputs, larger touch targets (44px minimum)
  - Typography: Scale down to 18px body, 32px H1 on mobile
