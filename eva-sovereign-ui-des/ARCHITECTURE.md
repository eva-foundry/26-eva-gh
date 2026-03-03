# EVA-Sovereign-UI Architecture

**Framework-Agnostic Design System for Government Applications**

## 🎯 Core Philosophy

**Web Components First, Framework Wrappers Second**

EVA-Sovereign-UI is built as **native Web Components** that work everywhere:
- ✅ Plain HTML (no framework)
- ✅ React (via wrapper)
- ✅ Vue (via wrapper)
- ✅ Angular (via wrapper)
- ✅ Svelte (via wrapper)

**No excuses. Easy adoption.**

---

## 📦 Package Structure

```
EVA-Sovereign-UI/
├── packages/
│   ├── core/                          # Foundation (framework-agnostic)
│   │   ├── tokens/
│   │   │   ├── design-tokens.ts       # Colors, spacing, typography
│   │   │   └── sovereign-profiles.ts  # Canada, US, UK, AU, NZ
│   │   ├── i18n/
│   │   │   ├── en-CA.json
│   │   │   ├── fr-CA.json
│   │   │   └── i18n-service.ts        # Translation engine
│   │   ├── a11y/
│   │   │   ├── focus-management.ts    # WCAG AAA utilities
│   │   │   └── aria-helpers.ts
│   │   └── themes/
│   │       ├── canada-gc.css          # Official GC Design System
│   │       ├── us-gov.css             # US Federal
│   │       ├── uk-gov.css             # UK GOV.UK
│   │       ├── au-gov.css             # Australian Gov
│   │       └── nz-gov.css             # New Zealand Gov
│   │
│   ├── web-components/                # ⭐ PRIMARY PACKAGE
│   │   ├── src/components/
│   │   │   ├── eva-button.ts
│   │   │   ├── eva-gc-header.ts
│   │   │   ├── eva-gc-footer.ts
│   │   │   ├── eva-page-shell.ts
│   │   │   ├── eva-hero-banner.ts
│   │   │   ├── eva-language-switcher.ts
│   │   │   ├── eva-quick-actions.ts
│   │   │   ├── eva-chat-panel.ts
│   │   │   ├── eva-message-bubble.ts
│   │   │   ├── eva-feedback-buttons.ts    # Issue #17 - MTI
│   │   │   └── eva-citation-card.ts
│   │   ├── dist/                      # Built bundle
│   │   │   ├── index.js               # ES Module
│   │   │   ├── index.umd.js           # UMD for CDN
│   │   │   └── index.d.ts             # TypeScript types
│   │   └── package.json
│   │
│   ├── react/                         # React wrapper (thin layer)
│   │   ├── src/
│   │   │   ├── Button.tsx             # <eva-button> wrapper
│   │   │   ├── GCHeader.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── vue/                           # Vue wrapper
│   │   └── (similar structure)
│   │
│   ├── angular/                       # Angular wrapper
│   │   └── (similar structure)
│   │
│   └── svelte/                        # Svelte wrapper
│       └── (similar structure)
│
├── apps/
│   └── demo/                          # ⭐ PURE WEB COMPONENTS DEMO
│       ├── index.html                 # No framework, just HTML
│       ├── demo.js                    # Profile switching, i18n
│       └── styles.css
│
└── docs/
    └── storybook/                     # Interactive documentation
```

---

## 🔄 How It Works

### **1. Consumer Uses Web Components Directly (Easiest)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script type="module" src="https://unpkg.com/@eva-suite/sovereign-wc"></script>
  <link rel="stylesheet" href="https://unpkg.com/@eva-suite/sovereign-wc/themes/canada-gc.css">
</head>
<body class="eva-theme-canada">
  
  <eva-gc-header app-name="My App">
    <eva-language-switcher slot="actions"></eva-language-switcher>
  </eva-gc-header>
  
  <eva-chat-panel></eva-chat-panel>
  
  <eva-button variant="primary">Submit</eva-button>
  
</body>
</html>
```

**Adoption barrier: ZERO**  
No build tools, no npm, no framework knowledge needed.

---

### **2. Consumer Uses React Wrapper (If Preferred)**

```bash
npm install @eva-suite/sovereign-react
```

```tsx
import { Button, GCHeader, ChatPanel } from '@eva-suite/sovereign-react';

function App() {
  return (
    <>
      <GCHeader appName="My App">
        <LanguageSwitcher slot="actions" />
      </GCHeader>
      
      <ChatPanel />
      
      <Button variant="primary">Submit</Button>
    </>
  );
}
```

**Behind the scenes:** React wrapper just renders `<eva-button>` web component.

---

### **3. Consumer Uses Vue Wrapper (If Preferred)**

```bash
npm install @eva-suite/sovereign-vue
```

```vue
<template>
  <eva-gc-header app-name="My App">
    <eva-language-switcher slot="actions"></eva-language-switcher>
  </eva-gc-header>
  
  <eva-chat-panel />
  
  <eva-button variant="primary">Submit</eva-button>
</template>

<script setup>
import '@eva-suite/sovereign-wc';
</script>
```

---

## 🎯 Free Offer Features (Core Value)

### **What's Included for Free:**

1. **✅ Accessibility (WCAG 2.1 AA/AAA)**
   - Keyboard navigation
   - Screen reader support
   - Focus management
   - High contrast mode
   - Reduced motion support

2. **✅ Internationalization (i18n)**
   - English (en-CA)
   - French (fr-CA)
   - Extensible to other languages
   - RTL support ready

3. **✅ GC Design System**
   - Official Canada.ca components
   - Typography (Lato/Noto Sans)
   - Colors (WCAG AAA compliant)
   - Buttons (6 variants)
   - H1 red bar (#A62A1E)

4. **✅ Five Eyes Sovereign Profiles**
   - 🇨🇦 Canada (GC Design System)
   - 🇺🇸 United States (USWDS)
   - 🇬🇧 United Kingdom (GOV.UK)
   - 🇦🇺 Australia (Australian Gov Design System)
   - 🇳🇿 New Zealand (NZ Design System)

**All built-in, no configuration needed.**

---

## 🚀 EVA Suite Integration

### **The Demo IS the Product**

```
apps/demo/  → Deploy to marcopolo483.github.io/eva-suite/
            → Also used in EVA Suite internal demos
            → No rework needed!
```

**Same demo serves:**
1. Public website (customers can try it)
2. EVA Chat production demo (add APIM backend)
3. EVA Admin dashboard (reuse components)
4. Customer demos (white-label ready)

---

## 📊 Comparison: Old vs New Approach

| Aspect | React-Only (Wrong) | Web Components (Correct) |
|--------|-------------------|--------------------------|
| **Adoption** | "Must use React" | Works everywhere |
| **Barrier** | High (framework lock-in) | Zero (plain HTML) |
| **Demo** | React app (rework for Vue users) | Pure HTML (works for everyone) |
| **Packages** | 1 (react only) | 6 (wc + 5 wrappers) |
| **Reusability** | Low | High |
| **EVA Suite** | Rework needed | Same demo, add backend |
| **Excuses** | Many | None |

---

## ✅ Next Steps

1. **Enhance Web Components** (what Spark started)
   - Production-quality code
   - Complete all 21+ components
   - Full WCAG AAA testing

2. **Build Framework Wrappers**
   - React wrapper (thin layer)
   - Vue wrapper
   - Angular wrapper
   - Svelte wrapper

3. **Polish Demo App**
   - apps/demo/ becomes the showcase
   - Profile switching (5 countries)
   - Language switching (EN/FR)
   - Live chat panel
   - Deploy to GitHub Pages

4. **Integrate with EVA Suite**
   - Same demo + APIM backend
   - Add feedback buttons (Issue #17)
   - Add citations
   - Add conversation history

---

**Built with ❤️ for global government applications**
