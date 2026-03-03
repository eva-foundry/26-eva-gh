# EVA-UI Architecture & Design

**Document Version**: 1.0  
**Last Updated**: 2025-01-27

---

## System Overview

EVA-UI is a production-grade Government of Canada (GC) Design System compliant chat interface for the EVA RAG (Retrieval-Augmented Generation) system. It consists of:

1. **EVA-Sovereign-UI Web Components** - Reusable Lit 3.x component library
2. **EVA-UI Application** - Main chat interface consuming the components
3. **Customization Backstage** - Configuration and deployment management interface
4. **i18n Infrastructure** - Bilingual EN-CA/FR-CA support system

---

## Repository Structure

```
eva-ui/
├── packages/
│   └── web-components/              # EVA-Sovereign-UI Lit 3.x components
│       ├── src/
│       │   ├── components/
│       │   │   ├── eva-header/
│       │   │   │   ├── eva-header.ts
│       │   │   │   ├── eva-header.css
│       │   │   │   └── eva-header.test.ts
│       │   │   ├── eva-footer/
│       │   │   ├── eva-button/
│       │   │   ├── eva-input/
│       │   │   ├── eva-select/
│       │   │   ├── eva-modal/
│       │   │   ├── eva-alert/
│       │   │   ├── eva-card/
│       │   │   ├── eva-chat-panel/
│       │   │   ├── eva-message-bubble/
│       │   │   ├── eva-streaming-indicator/
│       │   │   ├── eva-knowledge-space-selector/
│       │   │   └── eva-backstage-panel/
│       │   ├── design-tokens/
│       │   │   ├── gc-colors.ts        # GC Design System color palette
│       │   │   ├── gc-typography.ts    # GC typography scale
│       │   │   └── gc-spacing.ts       # GC spacing system
│       │   ├── mixins/
│       │   │   └── i18n-mixin.ts       # Lit mixin for component i18n
│       │   ├── assets/
│       │   │   ├── canada-wordmark.svg
│       │   │   └── canada-flag.svg
│       │   └── index.ts                # Component registry
│       ├── package.json
│       └── tsconfig.json
│
├── src/                                # Main application code
│   ├── components/                     # App-specific React/Lit components
│   │   ├── customization/
│   │   │   ├── theme-editor.ts
│   │   │   ├── text-editor.ts
│   │   │   ├── i18n-editor.ts
│   │   │   ├── feature-toggle-editor.ts
│   │   │   └── deploy-manager.ts
│   │   └── layouts/
│   │       ├── main-layout.ts
│   │       └── backstage-layout.ts
│   │
│   ├── services/                       # Business logic services
│   │   ├── api/
│   │   │   ├── eva-api-client.ts       # Base API client
│   │   │   ├── knowledge-space-service.ts
│   │   │   └── chat-service.ts
│   │   ├── i18n/
│   │   │   ├── i18n-service.ts         # Locale management
│   │   │   ├── locales/
│   │   │   │   ├── en-CA.json
│   │   │   │   └── fr-CA.json
│   │   │   └── types.ts                # Translation key types
│   │   ├── config/
│   │   │   ├── config-service.ts       # Customization config management
│   │   │   └── validation-service.ts   # Config validation
│   │   └── storage/
│   │       └── indexed-db-service.ts   # Local persistence
│   │
│   ├── styles/
│   │   ├── gc-design-tokens.css        # GC CSS custom properties
│   │   ├── main.css                    # Global application styles
│   │   └── theme.css                   # Theme overrides
│   │
│   ├── utils/
│   │   ├── contrast-checker.ts         # WCAG contrast validation
│   │   ├── focus-trap.ts               # Accessibility focus management
│   │   └── logger.ts                   # Application logging
│   │
│   ├── App.tsx                         # Root application component
│   └── main.ts                         # Application entry point
│
├── tests/                              # Test suites
│   ├── unit/
│   ├── integration/
│   ├── accessibility/
│   │   └── a11y-suite.test.ts
│   └── e2e/
│
├── docs/                               # Documentation
│   ├── IMPLEMENTATION-PLAN.md
│   ├── ARCHITECTURE-DESIGN.md          # This file
│   ├── UX-NAVIGATION-CUSTOMIZATION.md
│   ├── DISCOVERY-REPORT.md
│   ├── ACCESSIBILITY.md
│   └── API-INTEGRATION.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml                      # CI/CD pipeline
│       └── lighthouse.yml              # Lighthouse CI
│
├── public/
│   ├── index.html                      # GC page shell
│   └── assets/
│
├── package.json                        # Root package (workspace config)
├── tsconfig.json                       # TypeScript config
├── vite.config.ts                      # Vite build config
├── vitest.config.ts                    # Vitest test config
└── README.md
```

---

## Technology Stack

### Core Technologies
- **Frontend Framework**: Lit 3.x (Web Components) + React 19.x (app shell)
- **Build Tool**: Vite 5.x
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: CSS Custom Properties + GC Design System tokens
- **Testing**: Vitest + @testing-library + axe-core + Playwright
- **Package Manager**: npm 10.x with workspaces

### Key Libraries
- `lit@3.x` - Web Components framework
- `@heroicons/react` - Icons (aligned with GC Design System)
- `marked` - Markdown rendering for chat messages
- `date-fns` - Date/time utilities with locale support
- `framer-motion` - Animations (sparingly, respecting prefers-reduced-motion)

### Development Tools
- ESLint + TypeScript ESLint
- Prettier (code formatting)
- Lighthouse CI (performance & accessibility)
- axe DevTools (manual accessibility testing)

---

## Component Architecture

### EVA-Sovereign-UI Web Components

All components follow this pattern:

```typescript
/**
 * Context Engineering: <eva-component-name>
 * 
 * Mission: [What this component does and why it exists]
 * 
 * Constraints:
 *   - WCAG 2.2 AA/AAA compliance
 *   - GC Design System token usage only
 *   - Bilingual EN-CA/FR-CA support
 *   - Shadow DOM encapsulation
 *   - No external dependencies in component code
 * 
 * Reuses:
 *   - gc-colors design tokens
 *   - gc-typography design tokens
 *   - i18n-mixin for translations
 * 
 * Validates:
 *   - Props via TypeScript types
 *   - Accessibility via axe-core tests
 *   - Visual regression via Playwright
 * 
 * Housekeeping:
 *   - Emits custom events for parent communication
 *   - Uses CSS custom properties for theming
 *   - Cleans up event listeners on disconnect
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { i18nMixin } from '../../mixins/i18n-mixin';
import { gcColors, gcTypography, gcSpacing } from '../../design-tokens';

@customElement('eva-component-name')
export class EvaComponentName extends i18nMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
      /* Use design tokens */
      color: var(--gc-color-text);
      font-family: var(--gc-font-family-base);
    }
  `;

  @property({ type: String })
  someProp = '';

  render() {
    return html`
      <div role="..." aria-label="${this.t('component.label')}">
        ${this.someProp}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-component-name': EvaComponentName;
  }
}
```

### Component Communication Patterns

1. **Props Down**: Parent passes data via properties/attributes
2. **Events Up**: Child emits custom events for state changes
3. **Service Layer**: Components use services for API calls, i18n, config
4. **Reactive Properties**: Lit `@property()` for automatic re-rendering

### Design Token Usage

All styling MUST use GC Design System tokens:

```typescript
// gc-colors.ts
export const gcColors = {
  primary: 'oklch(0.42 0.15 251)',        // GC Blue
  textPrimary: 'oklch(0.24 0.01 251)',    // GC Dark Gray
  textSecondary: 'oklch(0.50 0.01 251)',  // GC Medium Gray
  backgroundPrimary: 'oklch(1 0 0)',      // White
  backgroundSecondary: 'oklch(0.96 0.005 251)', // GC Light Gray
  error: 'oklch(0.48 0.21 27)',           // GC Red
  focus: 'oklch(0.42 0.15 251)',          // GC Blue (focus ring)
};

// gc-typography.ts
export const gcTypography = {
  fontFamilyBase: '"Lato", "Noto Sans", sans-serif',
  fontFamilyMono: '"Courier New", monospace',
  fontSizeH1: '36px',
  fontSizeH2: '28px',
  fontSizeH3: '22px',
  fontSizeBody: '16px',
  fontSizeSmall: '14px',
  fontWeightBold: '700',
  fontWeightSemibold: '600',
  fontWeightRegular: '400',
  lineHeightTight: '1.1',
  lineHeightNormal: '1.5',
};

// gc-spacing.ts
export const gcSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
};
```

These tokens are exposed as CSS custom properties in `gc-design-tokens.css`:

```css
:root {
  --gc-color-primary: oklch(0.42 0.15 251);
  --gc-color-text-primary: oklch(0.24 0.01 251);
  /* ... all tokens */
}
```

---

## Service Layer Architecture

### API Client Pattern

```typescript
// eva-api-client.ts
export class EvaApiClient {
  private baseUrl: string;
  private authToken?: string;

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async stream(endpoint: string, onChunk: (chunk: string) => void): Promise<void> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      onChunk(decoder.decode(value));
    }
  }

  private handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
    };
  }
}
```

### i18n Service Pattern

```typescript
// i18n-service.ts
type Locale = 'en-CA' | 'fr-CA';
type TranslationKey = string; // Generated from locale JSON

export class I18nService {
  private currentLocale: Locale = 'en-CA';
  private translations: Record<Locale, Record<string, string>> = {
    'en-CA': {},
    'fr-CA': {},
  };

  async loadLocale(locale: Locale): Promise<void> {
    const data = await import(`./locales/${locale}.json`);
    this.translations[locale] = data.default;
  }

  setLocale(locale: Locale): void {
    this.currentLocale = locale;
    document.documentElement.lang = locale;
    this.emit('locale-changed', { locale });
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  t(key: TranslationKey, params?: Record<string, string>): string {
    let text = this.translations[this.currentLocale][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{{${k}}}`, v);
      });
    }
    
    return text;
  }

  private emit(event: string, detail: unknown): void {
    window.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

export const i18nService = new I18nService();
```

### Configuration Service Pattern

```typescript
// config-service.ts
export interface EvaConfig {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl?: string;
  };
  text: {
    overrides: Record<string, { 'en-CA': string; 'fr-CA': string }>;
  };
  features: {
    knowledgeSpaceSelector: boolean;
    messageExport: boolean;
    customBranding: boolean;
  };
}

export class ConfigService {
  private config: EvaConfig = this.getDefaultConfig();

  load(config: Partial<EvaConfig>): void {
    this.config = { ...this.config, ...config };
    this.applyTheme();
  }

  get(): EvaConfig {
    return this.config;
  }

  export(): string {
    return JSON.stringify(this.config, null, 2);
  }

  validate(config: EvaConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate contrast ratios
    // Validate required translations
    // Validate feature flags
    
    return { valid: errors.length === 0, errors };
  }

  private applyTheme(): void {
    document.documentElement.style.setProperty('--gc-color-primary', this.config.theme.primaryColor);
    // Apply other theme tokens
  }

  private getDefaultConfig(): EvaConfig {
    return {
      theme: { primaryColor: 'oklch(0.42 0.15 251)', secondaryColor: 'oklch(0.50 0.01 251)' },
      text: { overrides: {} },
      features: { knowledgeSpaceSelector: true, messageExport: true, customBranding: false },
    };
  }
}

export const configService = new ConfigService();
```

---

## Customization Architecture

### Backstage Panel Structure

```
┌─────────────────────────────────────────────────────────────┐
│ <eva-header> with ⚙️ Customize button                       │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  Navigation  │  Configuration Panel                        │
│  Tree        │  ┌────────────────────────────────────────┐ │
│              │  │                                        │ │
│  • Home      │  │  [Selected panel content]              │ │
│  • Theme     │  │                                        │ │
│  • Text      │  │  Theme: Color pickers, logo upload    │ │
│  • i18n      │  │  Text: Translation overrides           │ │
│  • Features  │  │  i18n: Locale management              │ │
│  • Deploy    │  │  Features: Toggle switches            │ │
│  • Import    │  │  Deploy: Validation & export          │ │
│              │  │                                        │ │
│              │  └────────────────────────────────────────┘ │
│              │                                              │
│  40%         │  60% (or full-width live preview iframe)    │
└──────────────┴──────────────────────────────────────────────┘
```

### Live Preview Mechanism

The live preview uses an iframe with message passing:

```typescript
// Parent (backstage)
const previewFrame = document.querySelector('iframe#live-preview');
previewFrame.contentWindow.postMessage({
  type: 'config-update',
  config: updatedConfig,
}, '*');

// Child (preview app)
window.addEventListener('message', (event) => {
  if (event.data.type === 'config-update') {
    configService.load(event.data.config);
  }
});
```

---

## Accessibility Architecture

### Focus Management

```typescript
// focus-trap.ts
export class FocusTrap {
  private element: HTMLElement;
  private previousFocus: HTMLElement | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    const focusable = this.getFocusableElements();
    focusable[0]?.focus();
    this.element.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate(): void {
    this.element.removeEventListener('keydown', this.handleKeyDown);
    this.previousFocus?.focus();
  }

  private getFocusableElements(): HTMLElement[] {
    return Array.from(
      this.element.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    
    const focusable = this.getFocusableElements();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
}
```

### Contrast Validation

```typescript
// contrast-checker.ts
export function getContrastRatio(foreground: string, background: string): number {
  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAG_AA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

export function meetsWCAG_AAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

function getLuminance(color: string): number {
  // Parse oklch and convert to relative luminance
  // Implementation details...
}
```

---

## Build & Deployment

### Build Pipeline

```bash
# Install dependencies
npm install

# Build web components package
npm run build:components

# Build main application
npm run build

# Run tests
npm test

# Run accessibility tests
npm run test:a11y

# Run Lighthouse CI
npm run lighthouse
```

### Deployment Artifacts

- `dist/` - Production build of EVA-UI application
- `packages/web-components/dist/` - Publishable Web Components package
- `dist/config.json` - Exportable configuration for customization

---

## Integration Points

### EVA-API Backend

EVA-UI integrates with the EVA-API backend (separate repository) via:

1. **Knowledge Space Endpoint**: `GET /api/v1/knowledge-spaces`
2. **Chat Query Endpoint**: `POST /api/v1/chat/query` (with SSE streaming)
3. **Authentication**: Bearer token (if required)

See `docs/API-INTEGRATION.md` for full API contract.

### EVA-RAG System

The RAG system (separate repository) is abstracted behind the EVA-API. EVA-UI does not directly interact with RAG components.

---

## Security Considerations

- **No Secrets in Frontend**: All API keys/tokens managed server-side
- **XSS Prevention**: Sanitize user input before rendering in chat bubbles
- **CORS**: Ensure API endpoints have proper CORS headers
- **Content Security Policy**: Define strict CSP headers
- **PII Redaction**: Redact sensitive information in logs

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Accessibility Score | ≥ 95 | Lighthouse |
| Bundle Size (main app) | < 200KB gzipped | Vite build |
| Component Library Size | < 100KB gzipped | Vite build |

---

**Document Owner**: EVA-UI Architecture Team  
**Review Cycle**: Quarterly or on major architecture changes
