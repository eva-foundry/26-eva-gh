# SPEC-01: Technical Architecture & Foundation
# Base Classes, Token System, i18n Framework, Build Pipeline

**Version**: 1.0.0  
**Date**: December 10, 2025  
**Category**: Foundation Architecture  
**Status**: TO BE IMPLEMENTED (establishes foundation for all 130 components)

---

## 🎯 Overview

**Purpose**: Define core technical architecture that ALL 130 components will use

**Key Components**:
1. EVAElement base class (extends LitElement)
2. Design token system (GC Design System colors, typography, spacing)
3. i18n framework (bilingual EN-CA/FR-CA)
4. Build pipeline (Vite, TypeScript, bundling)
5. Testing framework (Vitest, Testing Library, axe-core)
6. Development tools (Storybook, TypeDoc, ESLint, Prettier)

---

## 📦 Base Class Architecture

### EVAElement - Base Class for ALL Components

**Location**: `packages/web-components/src/components/base/EVAElement.ts`

**Purpose**: Shared functionality for all 130 components

**Implementation**:

```typescript
import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { msg, localized, updateWhenLocaleChanges } from '@lit/localize';

/**
 * Base class for all EVA Sovereign UI components
 * Provides:
 * - i18n support (bilingual EN-CA/FR-CA)
 * - Accessibility utilities
 * - Theme token consumption
 * - Event handling patterns
 * - Shadow DOM configuration
 */
@localized()
export class EVAElement extends LitElement {
  /**
   * Component locale (overrides global locale)
   * @default Global locale (from setGlobalLocale())
   */
  @property({ type: String })
  locale?: 'en' | 'fr';

  /**
   * Accessibility label (ARIA)
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel?: string;

  /**
   * Component ID for accessibility references
   */
  @property({ type: String })
  componentId: string = this._generateId();

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  /**
   * Generate unique component ID
   * @private
   */
  private _generateId(): string {
    return `eva-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get localized message
   * @param key - Message key
   * @param values - Interpolation values
   */
  protected msg(key: string, values?: Record<string, string>): string {
    return msg(key, { id: key, values });
  }

  /**
   * Emit custom event with detail
   * @param eventName - Event name (without component prefix)
   * @param detail - Event detail object
   * @param options - Event options (bubbles, composed, cancelable)
   */
  protected emitEvent<T = any>(
    eventName: string,
    detail?: T,
    options: { bubbles?: boolean; composed?: boolean; cancelable?: boolean } = {}
  ): boolean {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: options.bubbles ?? true,
      composed: options.composed ?? true,
      cancelable: options.cancelable ?? false
    });
    return this.dispatchEvent(event);
  }

  /**
   * Focus management - move focus to element
   */
  public focusElement(): void {
    const focusable = this.shadowRoot?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    }
  }

  /**
   * Accessibility - announce to screen readers
   * @param message - Message to announce
   * @param politeness - ARIA live region politeness level
   */
  protected announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', politeness);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  /**
   * Theme token access
   * @param tokenPath - Token path (e.g., 'colors.primary')
   */
  protected getToken(tokenPath: string): string {
    return getComputedStyle(this).getPropertyValue(`--eva-${tokenPath}`) || '';
  }

  /**
   * Lifecycle: Component connected to DOM
   */
  connectedCallback(): void {
    super.connectedCallback();
    
    // Apply locale if specified
    if (this.locale) {
      this.setAttribute('lang', this.locale === 'en' ? 'en-CA' : 'fr-CA');
    }
  }

  /**
   * Lifecycle: Properties changed
   */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    // Update lang attribute when locale changes
    if (changedProperties.has('locale') && this.locale) {
      this.setAttribute('lang', this.locale === 'en' ? 'en-CA' : 'fr-CA');
    }
  }
}
```

**Acceptance Criteria**:
- ✅ All 130 components extend EVAElement
- ✅ i18n support works (msg() method)
- ✅ Event emission pattern consistent
- ✅ Focus management works
- ✅ Screen reader announcements work
- ✅ Token access works
- ✅ TypeScript types complete
- ✅ JSDoc comments complete
- ✅ Unit tests (20+ tests)

**Tests Required** (20 minimum):

```typescript
// EVAElement.test.ts
describe('EVAElement', () => {
  it('generates unique component ID', () => {
    const el1 = new TestElement();
    const el2 = new TestElement();
    expect(el1.componentId).not.to.equal(el2.componentId);
  });

  it('emits custom events', () => {
    const el = new TestElement();
    let eventFired = false;
    el.addEventListener('test-event', () => { eventFired = true; });
    el.emitEvent('test-event');
    expect(eventFired).to.be.true;
  });

  it('supports locale override', async () => {
    const el = await fixture<TestElement>(html`<test-element locale="fr"></test-element>`);
    expect(el.getAttribute('lang')).to.equal('fr-CA');
  });

  // ... 17 more tests
});
```

---

## 🎨 Design Token System

### GC Design System Tokens

**Location**: `packages/web-components/src/tokens/gc-tokens.ts`

**Purpose**: Official Government of Canada Design System tokens

**Implementation**:

```typescript
/**
 * GC Design System Tokens
 * Source: https://design.canada.ca/
 */
export const gcTokens = {
  colors: {
    // Primary Colors
    'gc-link-blue': '#284162',        // Link text (WCAG AAA on white)
    'gc-fip-red': '#af3c43',          // Flag & Canada wordmark
    'gc-error-red': '#d3080c',        // Error messages
    'gc-accent-navy': '#26374a',      // Accent/secondary elements
    'gc-text-default': '#333',        // Body text
    'gc-text-secondary': '#666',      // Secondary text
    'gc-background-white': '#fff',    // Primary background
    'gc-background-light': '#f5f5f5', // Light grey background
    'gc-background-dark': '#333',     // Dark backgrounds
    'gc-border-default': '#ccc',      // Default borders
    'gc-border-light': '#e1e4e7',     // Light borders
    
    // Status Colors
    'gc-success': '#278400',          // Success messages (WCAG AAA)
    'gc-warning': '#ff9900',          // Warning messages
    'gc-info': '#269abc',             // Info messages
    
    // Interactive States
    'gc-focus-outline': '#284162',    // Focus indicator
    'gc-hover-blue': '#0535d2',       // Hover state for links
    'gc-visited-purple': '#7834bc'    // Visited links
  },

  typography: {
    // Font Families
    'font-family-headings': '"Lato", sans-serif',
    'font-family-body': '"Noto Sans", sans-serif',
    
    // Font Weights
    'font-weight-regular': '400',
    'font-weight-bold': '700',
    
    // Font Sizes (responsive, rem-based)
    'font-size-h1': 'clamp(2rem, 5vw, 2.5rem)',    // 32-40px
    'font-size-h2': 'clamp(1.5rem, 4vw, 2rem)',    // 24-32px
    'font-size-h3': 'clamp(1.25rem, 3vw, 1.5rem)', // 20-24px
    'font-size-h4': '1.125rem',                     // 18px
    'font-size-h5': '1rem',                         // 16px
    'font-size-h6': '0.875rem',                     // 14px
    'font-size-body': '1rem',                       // 16px (base)
    'font-size-small': '0.875rem',                  // 14px
    'font-size-tiny': '0.75rem',                    // 12px
    
    // Line Heights
    'line-height-tight': '1.2',
    'line-height-normal': '1.5',
    'line-height-relaxed': '1.7'
  },

  spacing: {
    // 8px grid system
    'spacing-0': '0',
    'spacing-1': '0.25rem',  // 4px
    'spacing-2': '0.5rem',   // 8px
    'spacing-3': '0.75rem',  // 12px
    'spacing-4': '1rem',     // 16px
    'spacing-5': '1.5rem',   // 24px
    'spacing-6': '2rem',     // 32px
    'spacing-7': '2.5rem',   // 40px
    'spacing-8': '3rem',     // 48px
    'spacing-9': '4rem',     // 64px
    'spacing-10': '5rem'     // 80px
  },

  shadows: {
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },

  borderRadius: {
    'radius-none': '0',
    'radius-sm': '0.125rem',  // 2px
    'radius-md': '0.25rem',   // 4px
    'radius-lg': '0.5rem',    // 8px
    'radius-full': '9999px'   // Fully rounded
  },

  breakpoints: {
    'mobile': '375px',   // Small phones
    'tablet': '768px',   // Tablets
    'desktop': '1024px', // Small desktops
    'wide': '1440px'     // Large desktops
  },

  a11y: {
    // WCAG 2.2 AAA Requirements
    'contrast-ratio-aaa': '7:1',        // Text contrast
    'touch-target-min': '44px',         // Minimum touch target
    'focus-outline-width': '3px',       // Focus indicator
    'animation-duration-max': '500ms'   // Max animation time
  }
};

/**
 * Convert tokens to CSS custom properties
 */
export function generateCSSVariables(): string {
  const css: string[] = [':root {'];
  
  Object.entries(gcTokens).forEach(([category, tokens]) => {
    Object.entries(tokens).forEach(([key, value]) => {
      css.push(`  --eva-${category}-${key}: ${value};`);
    });
  });
  
  css.push('}');
  return css.join('\n');
}
```

**CSS Variables Output** (`packages/web-components/src/tokens/gc-tokens.css`):

```css
:root {
  /* Colors */
  --eva-colors-gc-link-blue: #284162;
  --eva-colors-gc-fip-red: #af3c43;
  --eva-colors-gc-error-red: #d3080c;
  /* ... all tokens ... */
  
  /* Typography */
  --eva-typography-font-family-headings: "Lato", sans-serif;
  --eva-typography-font-family-body: "Noto Sans", sans-serif;
  /* ... all tokens ... */
  
  /* Spacing (8px grid) */
  --eva-spacing-1: 0.25rem;
  --eva-spacing-2: 0.5rem;
  /* ... all tokens ... */
}
```

**Usage in Components**:

```typescript
// Inside component styles
static styles = css`
  button {
    background-color: var(--eva-colors-gc-link-blue);
    color: var(--eva-colors-gc-background-white);
    font-family: var(--eva-typography-font-family-body);
    padding: var(--eva-spacing-3) var(--eva-spacing-5);
    border-radius: var(--eva-borderRadius-radius-md);
  }
`;
```

**Acceptance Criteria**:
- ✅ All GC Design System colors included
- ✅ Official Lato + Noto Sans fonts configured
- ✅ 8px grid spacing system
- ✅ Responsive breakpoints defined
- ✅ WCAG 2.2 AAA contrast ratios validated
- ✅ CSS custom properties generated
- ✅ TypeScript types for token access
- ✅ Documentation with usage examples

---

## 🌍 i18n Framework

### Bilingual Support (EN-CA / FR-CA)

**Location**: `packages/web-components/src/i18n/`

**Purpose**: Runtime bilingual support for ALL components

**Architecture**:

```typescript
// i18n/locale-manager.ts
import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from './generated/locale-codes';

/**
 * Global locale configuration
 */
export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,    // 'en'
  targetLocales,   // ['fr']
  loadLocale: async (locale: string) => {
    const messages = await import(`./generated/locales/${locale}.ts`);
    return messages.default;
  }
});

/**
 * Set global locale for all components
 * @param locale - 'en' or 'fr'
 */
export function setGlobalLocale(locale: 'en' | 'fr'): void {
  setLocale(locale);
  document.documentElement.lang = locale === 'en' ? 'en-CA' : 'fr-CA';
  
  // Emit global event for components that need manual updates
  window.dispatchEvent(new CustomEvent('eva-locale-change', {
    detail: { locale }
  }));
}

/**
 * Get current global locale
 */
export function getGlobalLocale(): 'en' | 'fr' {
  return getLocale() as 'en' | 'fr';
}

/**
 * Toggle between English and French
 */
export function toggleLocale(): void {
  const current = getGlobalLocale();
  setGlobalLocale(current === 'en' ? 'fr' : 'en');
}
```

**Message Registration Pattern**:

```typescript
// i18n/messages.ts
import { msg, str } from '@lit/localize';

/**
 * Register component messages
 * Call this in component constructor or static block
 */
export function registerMessages(componentName: string, messages: Record<string, Record<'en' | 'fr', string>>): void {
  Object.entries(messages).forEach(([key, translations]) => {
    // Register with @lit/localize
    // Implementation depends on lit-localize build process
  });
}

/**
 * Common UI messages (shared across components)
 */
export const commonMessages = {
  close: {
    en: 'Close',
    fr: 'Fermer'
  },
  submit: {
    en: 'Submit',
    fr: 'Soumettre'
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler'
  },
  required: {
    en: 'Required',
    fr: 'Obligatoire'
  },
  optional: {
    en: 'Optional',
    fr: 'Optionnel'
  },
  loading: {
    en: 'Loading...',
    fr: 'Chargement...'
  },
  error: {
    en: 'Error',
    fr: 'Erreur'
  },
  success: {
    en: 'Success',
    fr: 'Succès'
  }
};
```

**Component Usage**:

```typescript
// eva-button.ts
import { msg } from '@lit/localize';
import { EVAElement } from '../base/EVAElement';

export class EvaButton extends EVAElement {
  render() {
    return html`
      <button>
        ${this.msg('button.label')}
      </button>
    `;
  }
}

// Message catalog (en.json)
{
  "button.label": "Click me"
}

// Message catalog (fr.json)
{
  "button.label": "Cliquez-moi"
}
```

**Acceptance Criteria**:
- ✅ Runtime locale switching (no page reload)
- ✅ All 130 components support EN-CA/FR-CA
- ✅ No hardcoded strings in templates
- ✅ Common messages shared across components
- ✅ Locale persists across page reloads (localStorage)
- ✅ URL parameter support (?lang=fr)
- ✅ ARIA labels bilingual
- ✅ Error messages bilingual
- ✅ Date/number formatting locale-aware

---

## 🛠️ Build Pipeline

### Vite Configuration

**Location**: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/web-components/src/index.ts'),
      name: 'EVASovereignUI',
      formats: ['es', 'umd'],
      fileName: (format) => `eva-sovereign-ui.${format}.js`
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit'
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Remove console.log in production
      }
    }
  },
  optimizeDeps: {
    include: ['lit', '@lit/localize']
  }
});
```

### TypeScript Configuration

**Location**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  },
  "include": ["packages/web-components/src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.stories.ts"]
}
```

**Acceptance Criteria**:
- ✅ TypeScript strict mode passes
- ✅ Builds ESM + UMD bundles
- ✅ Generates .d.ts type files
- ✅ Source maps generated
- ✅ Tree-shaking works (dead code eliminated)
- ✅ Bundle size <50KB gzipped (core library)
- ✅ Console.log removed in production

---

## 🧪 Testing Framework

### Vitest Configuration

**Location**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '**/*.test.ts',
        '**/*.stories.ts',
        'dist/'
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  }
});
```

**Acceptance Criteria**:
- ✅ 100% code coverage (no exceptions)
- ✅ All tests pass
- ✅ Coverage reports generated (HTML, JSON, LCOV)
- ✅ CI fails if coverage <100%

---

## 📚 Development Tools

### Storybook Configuration

**Location**: `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../packages/web-components/src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
```

**Acceptance Criteria**:
- ✅ All 130 components have stories
- ✅ Accessibility addon enabled (axe-core)
- ✅ Controls work for all props
- ✅ Code snippets copy correctly
- ✅ Bilingual toggle in toolbar
- ✅ Mobile/tablet/desktop viewports
- ✅ Dark mode toggle

---

## ✅ Summary Acceptance Criteria

**Architecture is COMPLETE when**:

1. ✅ EVAElement base class implemented
2. ✅ All GC Design System tokens defined
3. ✅ i18n framework operational
4. ✅ Build pipeline configured
5. ✅ Testing framework configured
6. ✅ Storybook configured
7. ✅ All tools integrated (ESLint, Prettier, TypeDoc)
8. ✅ First component (eva-button) uses architecture successfully
9. ✅ Documentation complete
10. ✅ TypeScript strict mode passes

---

**END OF SPEC-01**

**Next**: All 130 components built on this foundation
