# EVA-Sovereign-UI Architecture Analysis
## Part 3: Internationalization (i18n) Implementation

**Report Date**: November 30, 2025  
**Continues**: [Part 2: Accessibility](./ARCHITECTURE-ANALYSIS-02-ACCESSIBILITY.md)

---

## 3. Internationalization (i18n) Implementation

### 3.1 Locale Support Status

**Implemented Locales**:
- ✅ `en-CA` - English (Canada) - **COMPLETE**
- ✅ `fr-CA` - Français (Canada) - **COMPLETE**

**Planned but Missing**:
- ❌ `en-US` - English (United States) - Not implemented
- ❌ `en-GB` - English (United Kingdom) - Not implemented
- ❌ `en-AU` - English (Australia) - Not implemented
- ❌ `en-NZ` - English (New Zealand) - Not implemented

**Impact**: Five Eyes countries (USA, UK, Australia, NZ) have sovereign profiles for branding/theming but lack translation files.

**Workaround**: US/UK/AU/NZ can use `en-CA` locale and customize branding via profiles.

---

### 3.2 Core I18n Engine Architecture

**Location**: `packages/eva-sovereign-ui-wc/src/i18n/i18n-service.ts`

**Pattern**: Singleton service with observer pattern for reactive updates.

#### Class Structure

```typescript
export class I18nService {
  private static instance: I18nService;
  private currentLocale: string = 'en-CA';
  private translations: Record<string, TranslationMap> = {};
  private listeners: Set<(locale: string) => void> = new Set();

  // Singleton access
  static getInstance(): I18nService;

  // Locale management
  async loadLocale(locale: string): Promise<void>;
  async setLocale(locale: string): Promise<void>;
  getLocale(): string;

  // Translation
  t(key: string, params?: Record<string, any>): string;

  // Subscription (observer pattern)
  subscribe(callback: (locale: string) => void): () => void;
  private notifyListeners(): void;
}

// Export singleton instance
export const i18n = I18nService.getInstance();
```

---

#### Key Features

**1. Nested Translation Keys** (dot notation):
```typescript
// Translation file: en-CA.json
{
  "esdc": {
    "hero": {
      "title": "Building a skilled, adaptable, and inclusive workforce"
    }
  }
}

// Usage in code
i18n.t('esdc.hero.title');
// Returns: "Building a skilled, adaptable, and inclusive workforce"
```

**2. Parameter Interpolation**:
```typescript
// Translation
{
  "greeting": "Hello, {name}!"
}

// Usage
i18n.t('greeting', { name: 'John' });
// Returns: "Hello, John!"
```

**3. Lazy Loading**:
```typescript
// Translations loaded on demand via fetch()
async loadLocale(locale: string): Promise<void> {
  if (this.translations[locale]) return; // Already loaded

  try {
    const response = await fetch(`/src/i18n/locales/${locale}.json`);
    const data = await response.json();
    this.translations[locale] = data;
  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error);
    this.translations[locale] = {};
  }
}
```

**4. Reactive Updates** (observer pattern):
```typescript
// Components subscribe to locale changes
const unsubscribe = i18n.subscribe((locale) => {
  console.log('Locale changed to:', locale);
  this.render(); // Re-render component
});

// Later: cleanup
unsubscribe();
```

---

### 3.3 Component Integration Patterns

#### Pattern 1: Base Component Auto-Subscription

**Location**: `packages/eva-sovereign-ui-wc/src/utils/base-component.ts`

```typescript
export class EVABaseComponent extends HTMLElement {
  protected unsubscribeI18n?: () => void;

  connectedCallback() {
    // Auto-subscribe to locale changes
    this.unsubscribeI18n = i18n.subscribe(() => {
      this.render(); // Re-render on locale change
    });
    this.render();
  }

  disconnectedCallback() {
    // Auto-cleanup subscription
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
    }
  }

  // Translate helper method
  protected t(key: string, params?: Record<string, any>): string {
    return i18n.t(key, params);
  }
}
```

**Benefits**:
- All components extending `EVABaseComponent` get automatic i18n support
- No manual subscription management needed
- Memory leaks prevented via `disconnectedCallback` cleanup

---

#### Pattern 2: Attribute-Based Translation Keys

**Usage**: Components accept `*-key` attributes for i18n strings.

**Example**:
```html
<!-- HTML usage -->
<eva-hero-banner 
  title-key="esdc.hero.title"
  description-key="esdc.hero.description">
</eva-hero-banner>
```

**Component Implementation**:
```typescript
// eva-hero-banner.ts
export class EVAHeroBanner extends EVABaseComponent {
  protected render(): void {
    const titleKey = this.getAttr('title-key', '');
    const descKey = this.getAttr('description-key', '');

    const title = titleKey ? this.t(titleKey) : this.getAttr('title', '');
    const desc = descKey ? this.t(descKey) : this.getAttr('description', '');

    this.shadow.innerHTML = `
      <h1>${title}</h1>
      <p>${desc}</p>
    `;
  }
}
```

**Benefits**:
- Declarative API (HTML attributes)
- Automatic re-render on locale change (via `EVABaseComponent` subscription)
- Fallback to literal text if no key provided

---

#### Pattern 3: Direct `i18n.t()` Usage

**Usage**: Import singleton for programmatic translation.

**Example**:
```typescript
import { i18n } from '@eva-suite/sovereign-ui';

// In component logic
const message = i18n.t('chat.placeholder');
```

---

### 3.4 Translation File Structure

**Location**: `packages/eva-sovereign-ui-wc/src/i18n/locales/`

**Files**:
- `en-CA.json` - English (Canada)
- `fr-CA.json` - Français (Canada)

**Structure** (nested JSON):
```json
{
  "app": {
    "title": "EVA-Sovereign-UI",
    "description": "Government Web Components Library"
  },
  "esdc": {
    "title": "Employment and Social Development Canada",
    "hero": {
      "title": "Building a skilled, adaptable, and inclusive workforce",
      "description": "Supporting Canadians through programs and services"
    },
    "programs": {
      "ei": {
        "title": "Employment Insurance",
        "description": "Apply for EI benefits if you've lost your job..."
      },
      "oas": {
        "title": "Old Age Security",
        "description": "Monthly payment for seniors 65 and older..."
      },
      "cpp": {
        "title": "Canada Pension Plan",
        "description": "Retirement, disability, and survivor benefits..."
      }
    }
  },
  "chat": {
    "title": "EVA Assistant",
    "placeholder": "Type your question here...",
    "send": "Send",
    "responses": {
      "ei": "Employment Insurance provides temporary income support...",
      "oas": "Old Age Security is a monthly payment for seniors...",
      "cpp": "Canada Pension Plan provides retirement income..."
    }
  },
  "devkit": {
    "title": "Developer Kit",
    "subtitle": "Component Gallery and Documentation"
  }
}
```

**French Equivalent** (`fr-CA.json`):
```json
{
  "esdc": {
    "title": "Emploi et Développement social Canada",
    "hero": {
      "title": "Bâtir une main-d'œuvre qualifiée, adaptable et inclusive",
      "description": "Soutenir les Canadiens grâce à des programmes et services"
    },
    "programs": {
      "ei": {
        "title": "Assurance-emploi",
        "description": "Demandez des prestations d'AE si vous avez perdu votre emploi..."
      }
    }
  }
}
```

**Naming Convention**: Lowercase with hyphens (en-CA, fr-CA), not underscores (en_CA).

---

### 3.5 Date/Number/Currency Formatters

**Location**: `packages/eva-sovereign-ui-wc/src/i18n/formatters/`

**Purpose**: Locale-aware formatting using native `Intl` APIs.

#### Date Formatting

```typescript
// formatters/date.ts
export function formatDate(
  date: Date,
  locale: string,
  style: 'short' | 'medium' | 'long' | 'full' = 'medium'
): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: style }).format(date);
}

// Usage
formatDate(new Date(), 'en-CA', 'long');
// "November 30, 2025"

formatDate(new Date(), 'fr-CA', 'long');
// "30 novembre 2025"
```

#### Number Formatting

```typescript
// formatters/number.ts
export function formatNumber(
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

// Usage
formatNumber(1234567.89, 'en-CA');
// "1,234,567.89"

formatNumber(1234567.89, 'fr-CA');
// "1 234 567,89" (space separator, comma decimal)
```

#### Currency Formatting

```typescript
// formatters/currency.ts
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

// Usage
formatCurrency(1234.56, 'CAD', 'en-CA');
// "$1,234.56"

formatCurrency(1234.56, 'CAD', 'fr-CA');
// "1 234,56 $ CA"
```

**Benefits**:
- Native browser APIs (no external dependencies)
- Automatic locale detection
- Currency symbol placement varies by locale
- Pluralization rules built-in (e.g., "1 item" vs "2 items")

---

### 3.6 Language Switcher Component

**Component**: `<eva-language-switcher>`

**Location**: `packages/eva-sovereign-ui-wc/src/components/i18n/eva-language-switcher.ts`

**Purpose**: UI control for changing locale (typically in header).

**Attributes**:
- `current-locale` - Current active locale (e.g., "en-CA")
- `available-locales` - JSON array of supported locales (e.g., `["en-CA", "fr-CA"]`)

**Usage**:
```html
<eva-language-switcher 
  current-locale="en-CA"
  available-locales='["en-CA", "fr-CA"]'>
</eva-language-switcher>
```

**Rendering**:
```typescript
protected render(): void {
  const current = this.getAttr('current-locale', 'en-CA');
  const available = JSON.parse(this.getAttr('available-locales', '["en-CA"]'));

  const otherLocales = available.filter((loc: string) => loc !== current);

  this.shadow.innerHTML = `
    ${otherLocales.map((locale: string) => `
      <a href="#" data-locale="${locale}">
        ${locale === 'fr-CA' ? 'Français' : 'English'}
      </a>
    `).join(' | ')}
  `;

  // Event handler
  this.shadow.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const locale = link.getAttribute('data-locale');
      if (locale) {
        i18n.setLocale(locale);
      }
    });
  });
}
```

**Behavior**: Clicking link triggers `i18n.setLocale()`, which notifies all subscribed components to re-render.

---

### 3.7 I18n Wiring in Demo Apps

#### ESDC Demo

**File**: `apps/esdc-demo/index.html`

**Integration**:
```html
<eva-gc-header slot="header"
  app-name-key="esdc.title"
  profile="canada_gc">
  <eva-language-switcher slot="actions"
    current-locale="en-CA"
    available-locales='["en-CA", "fr-CA"]'>
  </eva-language-switcher>
</eva-gc-header>

<eva-hero-banner
  title-key="esdc.hero.title"
  description-key="esdc.hero.description">
</eva-hero-banner>

<eva-program-card
  title-key="esdc.programs.ei.title"
  description-key="esdc.programs.ei.description"
  icon="💼">
</eva-program-card>
```

**Behavior**:
1. Page loads with `en-CA` locale
2. User clicks "Français" in language switcher
3. `i18n.setLocale('fr-CA')` called
4. All components subscribed to i18n re-render with French strings
5. No page reload needed (reactive update)

#### Dev Kit Demo

**File**: `apps/dev-kit-demo/index.html`

**Integration**:
```html
<eva-gc-header slot="header"
  app-name-key="devkit.title"
  profile="canada_gc">
  <eva-language-switcher slot="actions"></eva-language-switcher>
</eva-gc-header>
```

**Additional Feature**: Theme switcher (separate from i18n):
```javascript
document.getElementById('theme-selector').addEventListener('change', (e) => {
  const profile = e.target.value; // e.g., 'usa_gov'
  document.querySelector('eva-gc-header').setAttribute('profile', profile);
  document.querySelector('eva-gc-footer').setAttribute('profile', profile);
});
```

---

### 3.8 Message Format & Pluralization

**Current Implementation**: Simple string replacement with `{param}` syntax.

**Limitations**:
- ❌ No pluralization support (e.g., "1 item" vs "2 items")
- ❌ No gender-specific translations
- ❌ No ordinal numbers (1st, 2nd, 3rd)
- ❌ No relative time formatting (e.g., "2 hours ago")

**Workaround**: Use `Intl.PluralRules` for custom plural handling:
```typescript
const rules = new Intl.PluralRules('en-CA');
const count = 5;
const form = rules.select(count); // "other"

const messages = {
  "zero": "No items",
  "one": "1 item",
  "other": "{count} items"
};

const message = messages[form].replace('{count}', count);
// "5 items"
```

**Recommendation**: Integrate ICU MessageFormat library for advanced features:
- [`@formatjs/intl`](https://formatjs.io/)
- [`fluent`](https://projectfluent.org/)
- [`i18next`](https://www.i18next.com/)

---

### 3.9 Locale Loading Strategy

**Current**: Fetch JSON files on demand from `/src/i18n/locales/`.

**Initialization** (in `index.ts`):
```typescript
import { i18n } from './i18n/i18n-service';

// Pre-load default locales
i18n.loadLocale('en-CA').then(() => {
  i18n.loadLocale('fr-CA');
});
```

**Runtime**:
```typescript
// Language switcher triggers
async handleLocaleChange(locale: string) {
  await i18n.setLocale(locale); // Loads if not already cached
}
```

**Caching**: Translations stored in-memory in `translations` object (no persistence).

**Production Consideration**: For CDN deployment, bundle translations into JS:
```typescript
// Build-time transformation
import enCA from './locales/en-CA.json';
import frCA from './locales/fr-CA.json';

const bundledTranslations = {
  'en-CA': enCA,
  'fr-CA': frCA,
};
```

---

### 3.10 I18n Strengths ✅

1. **Reactive Updates**: Observer pattern ensures all components update on locale change
2. **Automatic Cleanup**: `EVABaseComponent` handles subscription lifecycle
3. **Nested Keys**: Dot notation supports organized translation structure
4. **Native Formatting**: Uses `Intl` APIs (no dependencies)
5. **Declarative API**: Attribute-based translation keys (`title-key="..."`)
6. **Singleton Pattern**: Single source of truth for current locale

---

### 3.11 I18n Gaps ❌

1. **Missing Locales**: Only 2/6 locales implemented (en-CA, fr-CA)
2. **No Pluralization**: Simple string replacement, no ICU MessageFormat
3. **No Fallback Locale**: Missing keys return key itself, not fallback language
4. **No Locale Detection**: No browser language detection (`navigator.language`)
5. **Runtime Fetch**: Translation files loaded via fetch (not bundled)
6. **No Gender/Ordinals**: Advanced features not supported

---

### 3.12 Recommendations 📋

1. **Complete Five Eyes Locales**: Add en-US, en-GB, en-AU, en-NZ JSON files
2. **Integrate ICU MessageFormat**: Support pluralization, gender, ordinals
3. **Add Fallback Logic**: If `fr-CA` key missing, fall back to `en-CA`
4. **Bundle Translations**: Include JSON in compiled bundle for CDN distribution
5. **Auto-Detect Locale**: Use `navigator.language` to set initial locale
6. **Locale Persistence**: Store user's locale preference in `localStorage`
7. **Extract to Package**: Create `@eva-suite/i18n` standalone package

---

**Next**: [Part 4: GC Design System Integration →](./ARCHITECTURE-ANALYSIS-04-GC-DESIGN.md)
