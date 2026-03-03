# Quick Start Guide - EVA Sovereign UI

Get started with EVA Sovereign UI in under 5 minutes.

## ⚡ Instant Try (Copy & Paste)

Create `index.html` with this content:

```html
<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EVA Sovereign UI Demo</title>
  <style>
    body { 
      font-family: 'Noto Sans', -apple-system, sans-serif; 
      max-width: 1200px; 
      margin: 40px auto; 
      padding: 20px;
    }
    h1 { color: #26374a; }
  </style>
</head>
<body>
  <h1>EVA Sovereign UI - Quick Demo</h1>
  
  <!-- Import the components -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/MarcoPolo483/EVA-Sovereign-UI-by-Copilot@merge-spark-copilot/dist/eva-sovereign-ui.es.js"></script>
  
  <!-- Try the components -->
  <section style="margin: 20px 0;">
    <h2>Buttons</h2>
    <eva-button variant="primary">Primary Button</eva-button>
    <eva-button variant="secondary">Secondary</eva-button>
    <eva-button variant="danger">Danger</eva-button>
  </section>

  <section style="margin: 20px 0;">
    <h2>Accordion (Click to expand)</h2>
    <eva-accordion>
      <div slot="header">📋 Employment Insurance</div>
      <div slot="content">
        <p>Apply for EI benefits if you've lost your job through no fault of your own.</p>
      </div>
    </eva-accordion>
  </section>

  <section style="margin: 20px 0;">
    <h2>Pagination (Keyboard: Arrow/Home/End/Enter)</h2>
    <eva-pagination current="3" total="10"></eva-pagination>
  </section>

  <section style="margin: 20px 0;">
    <h2>Alert</h2>
    <eva-alert variant="info">
      This is an informational alert message.
    </eva-alert>
  </section>

  <section style="margin: 20px 0;">
    <h2>Card</h2>
    <eva-card>
      <h3 style="margin-top:0;">Service Card</h3>
      <p>This is a card component with shadow DOM styling.</p>
      <eva-button variant="primary" size="sm">Learn More</eva-button>
    </eva-card>
  </section>
</body>
</html>
```

Open `index.html` in your browser. Done! ✅

## 🛠️ Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/MarcoPolo483/EVA-Sovereign-UI-by-Copilot.git
cd EVA-Sovereign-UI-by-Copilot

# 2. Install dependencies
npm ci

# 3. Start dev server (opens at http://localhost:5173)
npm run dev
```

### Available Demos
- **ESDC Portal**: http://localhost:5173/apps/esdc-demo/index.html
- **Component Gallery**: http://localhost:5173/apps/dev-kit-demo/index.html

## 📦 Production Build

```bash
# Build optimized bundles
npm run build

# Output files in dist/:
# - eva-sovereign-ui.es.js (12.28 KB gzip)
# - eva-sovereign-ui.umd.js (10.96 KB gzip)
# - index.d.ts (TypeScript definitions)

# Verify quality
npm test              # 282 tests
npm run size:guard    # Bundle size check
npm run benchmark     # Performance check
```

## 🎯 Common Use Cases

### Government Page Template

```html
<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <title>Government Service</title>
  <script type="module" src="./dist/eva-sovereign-ui.es.js"></script>
</head>
<body>
  <eva-gc-header profile="canada_gc"></eva-gc-header>
  <eva-skip-link target="#main">Skip to content</eva-skip-link>
  
  <main id="main">
    <eva-container>
      <h1>Service Title</h1>
      <eva-card>
        <p>Service information...</p>
        <eva-button variant="primary">Apply Now</eva-button>
      </eva-card>
    </eva-container>
  </main>
  
  <eva-gc-footer profile="canada_gc"></eva-gc-footer>
</body>
</html>
```

### Form with Validation

```html
<form>
  <eva-input 
    label="Full Name" 
    placeholder="Enter your name"
    required>
  </eva-input>
  
  <eva-select label="Province">
    <option value="on">Ontario</option>
    <option value="qc">Quebec</option>
    <option value="bc">British Columbia</option>
  </eva-select>
  
  <eva-checkbox label="I agree to terms"></eva-checkbox>
  
  <eva-button variant="primary" type="submit">Submit</eva-button>
</form>
```

### Interactive Dashboard

```html
<eva-tabs>
  <div slot="tab-1">Overview</div>
  <div slot="panel-1">
    <eva-card>
      <eva-progress value="75" max="100"></eva-progress>
      <p>75% complete</p>
    </eva-card>
  </div>
  
  <div slot="tab-2">Details</div>
  <div slot="panel-2">
    <eva-table>
      <!-- Table content -->
    </eva-table>
  </div>
</eva-tabs>
```

## ♿ Accessibility Features (Built-in)

All components include:
- ✅ Full keyboard navigation (Tab, Arrow, Home, End, Enter, Space, Escape)
- ✅ ARIA labels and landmarks
- ✅ Screen reader announcements
- ✅ 3px focus indicators with 3:1 contrast
- ✅ WCAG 2.2 AA+ compliant

## 🌐 Internationalization

```javascript
// Switch language (all components update automatically)
import { i18n } from './dist/eva-sovereign-ui.es.js';

await i18n.setLocale('fr-CA');  // Switch to French (Canada)

// Supported: en-CA, fr-CA, en-US, en-GB, en-AU
```

## 📚 Documentation

- **README.md** - Full feature overview
- **CONTRIBUTING.md** - Developer guidelines
- **docs/THEMING-AND-TOKENS.md** - Design tokens and theming
- **docs/EVENT-MODEL.md** - Component events and APIs
- **COMPONENT-API.md** - Component reference
- **PRODUCTION-READY-CERTIFICATION.md** - Quality metrics

## 🆘 Need Help?

1. Check component examples: http://localhost:5173/apps/dev-kit-demo/
2. Review COMPONENT-API.md for full API reference
3. Open an issue: https://github.com/MarcoPolo483/EVA-Sovereign-UI-by-Copilot/issues

## ✅ Quality Metrics

- **Tests**: 282/282 passing (100%)
- **Bundle Size**: 12.28 KB gzip ES module
- **Performance**: 1.02 ms average render time
- **Accessibility**: WCAG 2.2 AA+
- **Browser Support**: Modern browsers (ES2020+)

---

**Ready to ship** — All components production-tested and government-grade certified.
