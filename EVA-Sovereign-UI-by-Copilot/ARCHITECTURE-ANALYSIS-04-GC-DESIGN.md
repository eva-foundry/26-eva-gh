# EVA-Sovereign-UI Architecture Analysis
## Part 4: GC Design System & Five Eyes | Build & Distribution

**Report Date**: November 30, 2025  
**Continues**: [Part 3: Internationalization](./ARCHITECTURE-ANALYSIS-03-I18N.md)

---

## 4. Government of Canada Design System Integration

### 4.1 Design Tokens Implementation

**Location**: `packages/eva-sovereign-ui-wc/src/tokens/`

#### Colors (`colors.ts`)

**Approach**: Dual color system (modern + legacy)

```typescript
// Modern: oklch() color space
export const modernColors = {
  primary: 'oklch(0.30 0.04 250)',      // GC dark blue (#26374A)
  secondary: 'oklch(0.32 0.04 245)',
  destructive: 'oklch(0.55 0.22 25)',   // Red for errors
  // ... 15+ color tokens
};

// Legacy: Hex colors (backward compatibility)
export const gcColors = {
  text: '#333',
  linkBlue: '#284162',
  accent: '#26374A',
  errorRed: '#d3080c',
  // ... 20+ semantic colors
};
```

**GC Design System Alignment**:
- ✅ Primary blue: `#26374A` (GC brand color)
- ✅ Link blue: `#284162` (official link color)
- ✅ Error red: `#d3080c` (official error)
- ✅ H1 bar: `#A62A1E` (red signature bar)

#### Typography (`typography.ts`)

```typescript
export const gcTypography = {
  // Fonts
  fontHeading: '"Lato", sans-serif',
  fontBody: '"Noto Sans", sans-serif',
  
  // Sizes (px)
  sizeH1: 41,
  sizeH2: 32,
  sizeH3: 26,
  sizeH4: 22,
  sizeBody: 20,
  sizeSmall: 16,
  
  // Line heights
  lineHeightHeading: 1.3,
  lineHeightBody: 1.65,
  
  // Weights
  weightRegular: 400,
  weightBold: 700,
};
```

**GC Design System Alignment**:
- ✅ Lato for headings (official GC font)
- ✅ Noto Sans for body (official GC fallback)
- ✅ 20px base font size (GC standard)
- ✅ 1.65 line height (generous spacing)
- ✅ 65-character max line length (readability)

#### Spacing (`spacing.ts`)

```typescript
export const gcSpacing = {
  xs: 8,    // 0.5rem
  sm: 16,   // 1rem
  md: 24,   // 1.5rem
  lg: 32,   // 2rem
  xl: 48,   // 3rem
  xxl: 64,  // 4rem
};

// Helper function
export function spacingCSS(value: number | string): string {
  if (typeof value === 'number') return `${value}px`;
  return gcSpacing[value as keyof typeof gcSpacing] + 'px';
}
```

**GC Design System Alignment**:
- ✅ 8px base grid (GC standard)
- ✅ Multiples of 8 for vertical rhythm

#### Shadows (`shadows.ts`)

```typescript
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)',
};
```

**GC Design System Deviation**: GC DS prefers minimal shadows; this is more generous.

---

### 4.2 Component Patterns (GC DS)

#### Buttons (`eva-gc-button.ts`)

**Six Official Variants**:
```typescript
type ButtonVariant = 
  | 'supertask'           // Blue, large, prominent
  | 'primary'             // Standard blue
  | 'secondary'           // Gray outline
  | 'danger'              // Red, destructive actions
  | 'link'                // Styled like link
  | 'contextual-signin';  // Special sign-in button
```

**Styling**:
```css
/* Primary button */
background: #26374A;
color: white;
padding: 12px 24px;
border-radius: 4px; /* Rectangular, not pill */
font-weight: 700;
font-size: 18px;
min-height: 44px; /* Touch target */

/* Hover */
background: #1c2b3a;

/* Focus */
outline: 3px solid #0535d2;
outline-offset: 2px;
```

**GC Alignment**: ✅ Follows official button spec (rectangular, not rounded pills)

#### Header (`eva-gc-header.ts`)

**Structure**:
```html
<header>
  <div class="signature-bar"></div> <!-- Red bar at top -->
  <div class="wordmark">
    <img src="/assets/canada-wordmark.svg" alt="Government of Canada" />
  </div>
  <nav>
    <slot name="nav"></slot> <!-- Main navigation -->
  </nav>
  <div class="actions">
    <slot name="actions"></slot> <!-- Language switcher, sign in -->
  </div>
</header>
```

**GC Alignment**:
- ✅ Red signature bar (`#A62A1E`)
- ✅ Canada wordmark in SVG
- ✅ White background
- ✅ Left-aligned layout

#### Footer (`eva-gc-footer.ts`)

**Structure**:
```html
<footer>
  <div class="brand">
    <img src="/assets/canada-wordmark.svg" />
  </div>
  <nav>
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="#">Accessibility</a>
    <a href="#">Canada.ca</a>
  </nav>
  <p class="copyright">© His Majesty the King in Right of Canada</p>
</footer>
```

**GC Alignment**: ✅ Official footer links and copyright text

---

### 4.3 Grid/Layout System

**Components**:
- `<eva-container>` - Max-width wrapper (1200px default)
- `<eva-page-shell>` - Semantic page structure (header, main, footer)

**Grid Strategy**: CSS Grid with auto-fit columns

**Example** (from demos):
```html
<style>
.program-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
</style>

<div class="program-grid">
  <eva-program-card></eva-program-card>
  <eva-program-card></eva-program-card>
  <eva-program-card></eva-program-card>
</div>
```

**GC Alignment**: ✅ Responsive, mobile-first, 24px gutters

---

### 4.4 Theme Application Method

**Approach**: Shadow DOM styles + CSS custom properties

**Example** (`eva-gc-button.ts`):
```typescript
protected render(): void {
  const style = this.createStyles(`
    :host {
      display: inline-block;
    }
    
    button {
      background: var(--gc-primary, ${gcColors.accent});
      color: var(--gc-text-white, white);
      padding: ${gcSpacing.sm}px ${gcSpacing.md}px;
      border-radius: 4px;
      font-family: ${gcTypography.fontBody};
      font-size: ${gcTypography.sizeBody}px;
    }
  `);
  
  this.shadow.appendChild(style);
}
```

**Benefits**:
- Scoped styles (Shadow DOM)
- CSS custom properties for theming
- Fallback to design tokens

**Limitation**: Shadow DOM prevents global CSS from affecting components (intentional isolation).

---

## 5. Five Eyes Presets

### 5.1 Sovereign Profile Structure

**Location**: `packages/eva-sovereign-ui-wc/src/tokens/sovereign-profiles.ts`

**Interface**:
```typescript
export interface SovereignProfile {
  id: string;                    // 'canada_gc', 'usa_gov', etc.
  name: string;                  // Display name
  nameFr?: string;               // French name (Canada only)
  colors: {
    primary: string;             // Brand color
    secondary: string;
    accent: string;
    text: string;
  };
  assets: {
    wordmark?: string;           // Logo SVG path
    logo: string;
    flag: string;
    seal?: string;
  };
  footer: {
    copyright: string;
    links: Array<{ label: string; url: string }>;
  };
  locale: {
    primary: string;             // 'en-CA', 'en-US', etc.
    secondary?: string;          // 'fr-CA' (Canada only)
  };
}
```

---

### 5.2 Five Eyes Profiles Defined

#### 🇨🇦 Canada (Government of Canada)

```typescript
canada_gc: {
  id: 'canada_gc',
  name: 'Government of Canada',
  nameFr: 'Gouvernement du Canada',
  colors: {
    primary: '#26374A',
    secondary: '#284162',
    accent: '#A62A1E',
    text: '#333',
  },
  assets: {
    wordmark: '/assets/canada-wordmark.svg',
    logo: '/assets/canada-logo.svg',
    flag: '/assets/canada-flag.svg',
  },
  footer: {
    copyright: '© His Majesty the King in Right of Canada',
    links: [
      { label: 'Privacy', url: 'https://canada.ca/en/transparency/privacy' },
      { label: 'Terms and conditions', url: 'https://canada.ca/en/transparency/terms' },
      { label: 'Accessibility', url: 'https://canada.ca/en/accessibility' },
      { label: 'Canada.ca', url: 'https://canada.ca' },
    ],
  },
  locale: {
    primary: 'en-CA',
    secondary: 'fr-CA',
  },
}
```

#### 🇺🇸 USA (US Government)

```typescript
usa_gov: {
  id: 'usa_gov',
  name: 'U.S. Government',
  colors: {
    primary: '#002868',     // Navy blue
    secondary: '#BF0A30',   // Red
    accent: '#FFFFFF',
    text: '#1b1b1b',
  },
  assets: {
    logo: '/assets/usa-seal.svg',
    flag: '/assets/usa-flag.svg',
    seal: '/assets/usa-seal.svg',
  },
  footer: {
    copyright: 'An official website of the United States government',
    links: [
      { label: 'Privacy Policy', url: 'https://www.usa.gov/privacy' },
      { label: 'Accessibility', url: 'https://www.usa.gov/accessibility' },
      { label: 'USA.gov', url: 'https://www.usa.gov' },
    ],
  },
  locale: {
    primary: 'en-US',
  },
}
```

#### 🇬🇧 UK (UK Government)

```typescript
uk_gov: {
  id: 'uk_gov',
  name: 'UK Government',
  colors: {
    primary: '#012169',    // Royal blue
    secondary: '#C8102E',  // Red
    accent: '#FFFFFF',
    text: '#0b0c0c',
  },
  assets: {
    logo: '/assets/uk-crown.svg',
    flag: '/assets/uk-flag.svg',
  },
  footer: {
    copyright: '© Crown copyright',
    links: [
      { label: 'Privacy', url: 'https://www.gov.uk/privacy' },
      { label: 'Cookies', url: 'https://www.gov.uk/cookies' },
      { label: 'Accessibility', url: 'https://www.gov.uk/accessibility' },
      { label: 'GOV.UK', url: 'https://www.gov.uk' },
    ],
  },
  locale: {
    primary: 'en-GB',
  },
}
```

#### 🇦🇺 Australia + 🇳🇿 New Zealand

Similar structure with respective colors, logos, and footer links.

---

### 5.3 Profile Switching Mechanism

**Dev Kit Demo** (`apps/dev-kit-demo/index.html`):

```html
<select id="theme-selector">
  <option value="canada_gc">🇨🇦 Government of Canada</option>
  <option value="usa_gov">🇺🇸 US Government</option>
  <option value="uk_gov">🇬🇧 UK Government</option>
  <option value="australia_gov">🇦🇺 Australian Government</option>
  <option value="nz_gov">🇳🇿 New Zealand Government</option>
</select>

<script type="module">
  document.getElementById('theme-selector').addEventListener('change', (e) => {
    const profile = e.target.value;
    
    // Update header and footer profiles
    document.querySelector('eva-gc-header').setAttribute('profile', profile);
    document.querySelector('eva-gc-footer').setAttribute('profile', profile);
  });
</script>
```

**Component Implementation** (`eva-gc-header.ts`):

```typescript
static get observedAttributes() {
  return ['profile', 'app-name-key'];
}

attributeChangedCallback() {
  const profileId = this.getAttr('profile', 'canada_gc');
  const profile = getProfile(profileId); // Load from sovereign-profiles.ts
  
  this.render(); // Re-render with new profile colors/assets
}
```

**Effect**: Changing `profile` attribute triggers:
1. New logo/wordmark
2. New brand colors
3. New footer copyright text
4. New footer links

---

### 5.4 Locale vs Profile Distinction

| Aspect | Locale (i18n) | Profile (Theming) |
|--------|---------------|-------------------|
| **Purpose** | Translation strings | Visual branding |
| **Examples** | en-CA, fr-CA | canada_gc, usa_gov |
| **Changes** | Text content | Colors, logos, links |
| **Service** | `i18n.setLocale()` | `setAttribute('profile')` |
| **Reactive** | Yes (observer pattern) | Yes (attribute change) |

**Independence**: Can have `locale="fr-CA"` + `profile="uk_gov"` (French text with UK branding).

---

## 6. Build, Bundling, and Distribution

### 6.1 Build Tools

**Primary**: Vite 5.0.7

**Configuration** (`vite.config.ts`):
```typescript
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['packages/eva-sovereign-ui-wc/src/**/*.ts'],
      exclude: ['**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/eva-sovereign-ui-wc/src/index.ts'),
      name: 'EVASovereignUI',
      formats: ['es', 'umd'],
      fileName: (format) => `eva-sovereign-ui.${format}.js`,
    },
    sourcemap: true,
    minify: 'esbuild', // Faster than terser
  },
});
```

**Output**:
- ES Module: `dist/eva-sovereign-ui.es.js` (12.28 KB gzip)
- UMD Bundle: `dist/eva-sovereign-ui.umd.js` (10.96 KB gzip)
- TypeScript Declarations: `dist/index.d.ts` + per-component `.d.ts`
- Source Maps: `dist/*.js.map`

---

### 6.2 Module Formats

| Format | Usage | Benefits |
|--------|-------|----------|
| **ES Module** | Modern bundlers (Vite, Webpack 5+) | Tree-shaking, code splitting |
| **UMD** | Legacy scripts, CDN | Works in browser + Node.js |

**Import Examples**:
```javascript
// ES Module (modern)
import '@eva-suite/sovereign-ui';

// UMD (browser global)
<script src="https://cdn.jsdelivr.net/npm/@eva-suite/sovereign-ui/dist/eva-sovereign-ui.umd.js"></script>
<script>
  // Components auto-registered, use directly
</script>
```

---

### 6.3 Tree-Shaking Support

**Current Status**: ❌ **Not supported**

**Reason**: Single entry point auto-registers all 91 custom elements.

**Impact**: Importing library pulls in all 59 components (12.28 KB gzip).

**Workaround**: Use CDN for full bundle, or manually import individual component files (not officially supported).

**Future Enhancement**:
```typescript
// Proposed per-component exports
export { EVAButton } from './components/ui/eva-button';
export { EVAPagination } from './components/ui/eva-pagination';

// Consumer can tree-shake
import { EVAButton } from '@eva-suite/sovereign-ui/button';
```

---

### 6.4 NPM Package Configuration

**Package Name**: `@eva-suite/sovereign-ui`

**package.json**:
```json
{
  "name": "@eva-suite/sovereign-ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/eva-sovereign-ui.umd.js",
  "module": "./dist/eva-sovereign-ui.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/eva-sovereign-ui.es.js",
      "require": "./dist/eva-sovereign-ui.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

**Publication Status**: ⚠️ Not yet published to npm (package name reserved but no releases).

---

### 6.5 Versioning & Release Strategy

**Tool**: semantic-release 23.1.1

**Configuration** (`.releaserc.json`):
```json
{
  "branches": ["main", "next", "beta", "alpha"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

**Commit Convention**: Conventional Commits
- `feat:` → minor version bump (1.0.0 → 1.1.0)
- `fix:` → patch version bump (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → major version bump (1.0.0 → 2.0.0)

**GitHub Actions** (`.github/workflows/release.yml`):
```yaml
on:
  push:
    branches: [main]

jobs:
  release:
    steps:
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npx semantic-release
    env:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Status**: Configured but not yet executed (no npm releases).

---

### 6.6 CDN Distribution

**Planned Strategy**: jsDelivr (free, global CDN)

**URL Pattern**:
```html
<!-- Specific version (recommended) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@eva-suite/sovereign-ui@1.0.0/dist/eva-sovereign-ui.es.js"></script>

<!-- Latest version (auto-updates) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@eva-suite/sovereign-ui/dist/eva-sovereign-ui.es.js"></script>
```

**SRI (Subresource Integrity)**:
```bash
# Generate hash for security
cat dist/eva-sovereign-ui.es.js | openssl dgst -sha384 -binary | openssl base64 -A
```

**Usage with SRI**:
```html
<script type="module" 
  src="https://cdn.jsdelivr.net/npm/@eva-suite/sovereign-ui@1.0.0/dist/eva-sovereign-ui.es.js"
  integrity="sha384-[HASH]"
  crossorigin="anonymous"></script>
```

**Current Status**: Not yet published to npm, so CDN not available.

---

**Next**: [Part 5: Recommendations & Distribution Model →](./ARCHITECTURE-ANALYSIS-05-RECOMMENDATIONS.md)
