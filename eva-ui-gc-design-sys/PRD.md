# EVA-UI: Government of Canada RAG Chat Interface

Production-grade implementation of EVA's RAG chat UI using the Government of Canada Design System and EVA-Sovereign-UI Web Components architecture.

**Experience Qualities**:
1. **Government-grade Trustworthy** - Users must feel the same confidence interacting with EVA as they do with any official Canada.ca service, achieved through strict adherence to GC Design System standards and WCAG 2.2 AA/AAA accessibility.
2. **Effortlessly Bilingual** - Seamless switching between English and French with zero perception of translation or secondary language support, reflecting Canada's bilingual identity.
3. **Professionally Accessible** - Every interaction works flawlessly with keyboard, screen readers, and assistive technologies, ensuring equitable access for all public servants and citizens.

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
The EVA-UI suite includes a sophisticated RAG chat interface, multi-panel customization backstage, knowledge space management, real-time preview systems, deployment management, and comprehensive i18n/accessibility infrastructure requiring advanced state management and component composition.

## Essential Features

### F1: GC-Compliant Chat Interface
- **Functionality**: Full-featured RAG chat interface with knowledge space selection, message history, and streaming responses
- **Purpose**: Enable public servants to query knowledge bases using natural language while maintaining government digital standards
- **Trigger**: User lands on main application route
- **Progression**: Page loads with GC header → User selects knowledge space → User types query → AI streams response → User can continue conversation or switch spaces
- **Success criteria**: Zero GC Design System violations, chat messages persist, streaming works smoothly, WCAG 2.2 AA compliance verified via axe-core

### F2: EVA-Sovereign-UI Web Components Library
- **Functionality**: Reusable Lit 3.x Web Components (eva-header, eva-footer, eva-button, eva-input, eva-select, eva-modal, eva-alert, eva-card, eva-chat-panel) adhering to GC Design System
- **Purpose**: Provide a consistent, accessible, themeable component foundation that can be reused across EVA ecosystem
- **Trigger**: Application bootstrap and component registration
- **Progression**: Components register on page load → Design tokens inject GC colors/typography → Components render with shadow DOM encapsulation → Accessibility features auto-apply
- **Success criteria**: All components pass accessibility tests, design tokens correctly applied, zero runtime errors, comprehensive unit test coverage >80%

### F3: Bilingual i18n System (EN-CA / FR-CA)
- **Functionality**: Complete internationalization with language toggle, locale-specific formatting, and zero hardcoded strings
- **Purpose**: Meet federal bilingualism requirements and provide equitable experience in both official languages
- **Trigger**: User clicks language toggle in header or arrives with browser locale preference
- **Progression**: User clicks EN/FR toggle → Application detects locale change → All UI text updates instantly → Date/number formats adjust → URL updates with lang parameter
- **Success criteria**: No visible English text when in FR mode, no French text in EN mode, smooth transitions, persistence across sessions

### F4: Customization Backstage (⚙️)
- **Functionality**: Split-screen configuration interface with live preview for theme, text, features, and deployment settings
- **Purpose**: Allow administrators to customize EVA-UI branding, behavior, and deployment without code changes
- **Trigger**: User clicks ⚙️ Customize button in header
- **Progression**: User clicks ⚙️ → Backstage panel slides in from right → Left nav shows config sections → User modifies theme colors → Live preview updates in real-time → User exports config or deploys
- **Success criteria**: Real-time preview works, config exports as valid JSON, all customization options accessible via keyboard, changes persist to deployment

### F5: GC Design System Integration
- **Functionality**: Mandatory GC header with wordmark/flag, footer with required links, typography (Lato/Noto Sans), color tokens, and accessibility patterns
- **Purpose**: Ensure EVA-UI is visually and functionally indistinguishable from official Canada.ca services
- **Trigger**: Every page load
- **Progression**: HTML loads → GC fonts load from Google Fonts → Header renders with Canada wordmark → Main content area respects GC grid → Footer renders with date modified
- **Success criteria**: Visual comparison matches Canada.ca reference pages, Lighthouse accessibility score ≥95, skip link navigates correctly

## Edge Case Handling

- **API Connection Failures**: Display GC-styled error alert with bilingual retry instructions, maintain chat history locally via IndexedDB
- **Long Streaming Responses**: Implement virtual scrolling for message list to handle 1000+ message threads without performance degradation
- **Language Mismatch in Knowledge Base**: Clearly indicate when KB content language differs from UI language, offer translation disclaimer
- **Keyboard Trap Prevention**: Ensure modal dialogs, dropdowns, and backstage panel have proper focus trap and ESC key dismissal
- **Offline Mode**: Service worker caches static assets and displays offline notice when API unreachable
- **Screen Reader Announcements**: Use aria-live regions for streaming message updates and status changes
- **Mobile Responsive Breakpoints**: Collapse header navigation, stack chat panels vertically, adjust backstage to full-screen overlay on <768px

## Design Direction

The design must evoke institutional trust, professional competence, and accessible clarity. This is not a consumer chat app—it's a government digital service that happens to use conversational AI. Every visual decision reinforces credibility, bilingual equity, and barrier-free interaction. The aesthetic should feel like an official Canada.ca page that has been thoughtfully enhanced with modern chat capabilities.

## Color Selection

Following the GC Design System v1.0 color palette with high-contrast accessibility focus.

- **Primary Color**: GC Blue `oklch(0.42 0.15 251)` - Official Government of Canada brand color representing authority and trustworthiness, used for primary actions and focus states
- **Secondary Colors**: 
  - GC Dark Gray `oklch(0.24 0.01 251)` for body text and structural elements
  - GC Medium Gray `oklch(0.50 0.01 251)` for secondary text and borders
  - GC Light Gray `oklch(0.96 0.005 251)` for backgrounds and subtle dividers
- **Accent Color**: GC Red `oklch(0.48 0.21 27)` for critical errors and destructive actions, ensuring 7:1 contrast ratio
- **Foreground/Background Pairings**:
  - Primary Blue on White: `oklch(0.42 0.15 251)` on `oklch(1 0 0)` - Ratio 8.2:1 ✓ (AAA)
  - Dark Gray on White: `oklch(0.24 0.01 251)` on `oklch(1 0 0)` - Ratio 14.1:1 ✓ (AAA)
  - White on Primary Blue: `oklch(1 0 0)` on `oklch(0.42 0.15 251)` - Ratio 8.2:1 ✓ (AAA)
  - Red on White: `oklch(0.48 0.21 27)` on `oklch(1 0 0)` - Ratio 7.3:1 ✓ (AAA)

## Font Selection

GC Design System mandates Lato for English content and Noto Sans for extended Unicode support, conveying official government typography with excellent readability.

- **Typographic Hierarchy**:
  - H1 (Page Title): Lato Bold / 36px / 1.1 line-height / -0.5px letter-spacing
  - H2 (Section Header): Lato Bold / 28px / 1.2 line-height / -0.25px letter-spacing
  - H3 (Subsection): Lato Semibold / 22px / 1.3 line-height / normal letter-spacing
  - Body Text: Lato Regular / 16px / 1.5 line-height / normal letter-spacing
  - Small Text: Lato Regular / 14px / 1.4 line-height / normal letter-spacing
  - Button Text: Lato Bold / 16px / 1.0 line-height / uppercase / 0.5px letter-spacing
  - Code/Monospace: 'Courier New' / 14px / 1.5 line-height (for technical content)

## Animations

Animations serve functional purposes only—focus indication, state transitions, and spatial orientation—never decoration. GC Design System prefers reduced motion by default with respectful animation for sighted users who haven't disabled motion.

Purposeful micro-interactions include: 
- Smooth 150ms ease-out transitions for button hover/focus states
- 250ms slide-in for backstage panel opening (respects prefers-reduced-motion)
- Gentle 100ms fade for tooltip/dropdown appearances
- Streaming message typewriter effect (can be disabled in accessibility settings)
- Focus ring expansion on keyboard navigation (instant, no animation)

## Component Selection

- **Components**: 
  - GC Header (`<eva-header>`) - Canada wordmark, language toggle, skip links, responsive navigation
  - GC Footer (`<eva-footer>`) - Mandatory federal footer links, date modified, bilingual layout
  - Primary Button (`<eva-button variant="primary">`) - GC Blue with white text, 44px min height, bold uppercase labels
  - Text Input (`<eva-input>`) - 3px border, focus ring, clear error states, accessible labels
  - Select Dropdown (`<eva-select>`) - Native select styled to GC standards, keyboard navigable
  - Modal Dialog (`<eva-modal>`) - Focus trap, ESC dismissal, backdrop overlay, ARIA labeling
  - Alert Banner (`<eva-alert>`) - Color-coded by severity, icon + text, dismissible, aria-live
  - Card Container (`<eva-card>`) - Subtle shadow, proper heading structure, semantic HTML
  - Chat Panel (`<eva-chat-panel>`) - Composite component integrating header, message list, input field
  
- **Customizations**: 
  - Custom `<eva-knowledge-space-selector>` dropdown with search/filter for large KB lists
  - Custom `<eva-message-bubble>` with user/AI visual distinction, timestamp, copy button
  - Custom `<eva-streaming-indicator>` animated dots respecting reduced motion
  - Custom `<eva-backstage-panel>` split-screen layout with tree nav and live preview iframe
  
- **States**: 
  - Buttons: default, hover (10% darker), active (20% darker), focus (3px blue ring), disabled (50% opacity, cursor not-allowed)
  - Inputs: default, focus (blue ring + border), error (red border + icon + message), disabled (gray background)
  - Dropdowns: collapsed, expanded (with keyboard highlight on options), disabled
  
- **Icon Selection**: 
  - Use heroicons (outline style) for UI actions: ChatBubbleLeftIcon (chat), Cog6ToothIcon (settings), LanguageIcon (language toggle), XMarkIcon (close), CheckIcon (success), ExclamationTriangleIcon (warning)
  
- **Spacing**: 
  - Use GC spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px
  - Container max-width: 1200px (GC standard page width)
  - Card padding: 24px
  - Button padding: 12px 24px
  - Input padding: 12px 16px
  - Section gaps: 32px vertical, 24px horizontal
  
- **Mobile**: 
  - <768px: Header collapses to hamburger menu, backstage becomes full-screen overlay, chat input becomes sticky footer, font sizes reduce 10%, touch targets expand to 48px minimum
  - 768px-1024px: Tablet layout maintains header structure, backstage uses 60/40 split, chat panel stacks vertically
  - >1024px: Full desktop layout with all features visible, backstage 40/60 split with live preview
