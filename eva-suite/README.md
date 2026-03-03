# EVA Suite Portal – Product Catalog & Hero Demos

**Live Demo**: https://marcopolo483.github.io/eva-suite/

EVA Suite Portal is **Product #1** of the EVA Suite ecosystem - the front door with product catalog, hero demos, EVA Library, and Agile Scrum Portal.

**Built with**: React 19 + TypeScript + Vite 7 + GC Design System (WCAG 2.1 AA, bilingual EN-CA/FR-CA)

## EVA Suite Lab Overview

For a narrative explanation of what this lab contains and how it was built with AI assistance, see:

- [`docs/EVA-Suite-Lab-Overview.md`](docs/EVA-Suite-Lab-Overview.md)

## EVA Suite – 6 Hero Demos Implemented

All six EVA Suite hero demos defined in the EVA Orchestrator plan (`eva-suite-heroes-demo-v1`) are now fully implemented in the `eva-suite` repo:

> 📖 **Want to demo the app?** See the [**DEMO-TOUR.md**](./DEMO-TOUR.md) guide for a suggested walkthrough narrative and tips for presenting the 6 hero demos.

1. **EVA LiveOps**  
   - Component: `src/components/LiveOpsDashboard.tsx`  
   - Data: `src/data/liveops-demo.json`, `src/data/liveops-ai-insights.json`  
   - Shows 24h sessions, error rate, p95 latency and APIM cost, plus a sessions-by-hour chart and an "EVA LiveOps Copilot" insight panel.

2. **EVA DA (Decision-Support Demo)**  
   - Component: `src/components/EvaDaDemo.tsx`  
   - Data: `src/data/eva-da-demo.json`  
   - Provides a static decision-support experience for CPP-D and EI scenarios with decision, explanation, conditions, sources and clear demo disclaimers.

3. **EVA DevTools / AI Dev Crew**  
   - Component: `src/components/EvaDevCrewDemo.tsx`  
   - Data: `src/data/eva-devcrew-demo.json`  
   - Renders a sprint dashboard with AI agents (Planner, Frontend, Docs, QA), tasks and an "AI Sprint Coach" summary panel.

4. **EVA Accessibility**  
   - Component: `src/components/EvaAccessibilityDemo.tsx`  
   - Data: `src/data/eva-accessibility-demo.json`  
   - Simulates an accessibility scan of EVA Suite, listing WCAG-style issues and fixes, plus an "AI Accessibility Coach" with prioritized quick wins.

5. **EVA Impact Analyzer**  
   - Component: `src/components/EvaImpactAnalyzerDemo.tsx`  
   - Data: `src/data/eva-impact-analyzer-demo.json`  
   - Lets users explore Conservative / Expected / Ambitious scenarios with inputs (employees, hours saved, cost) and outputs (savings, ROI, payback) and an "Impact Narrator" panel.

6. **EVA Process Mapper**  
   - Component: `src/components/EvaProcessMapperDemo.tsx`  
   - Data: `src/data/eva-process-mapper-demo.json`  
   - Shows a swimlane-style journey for a fictional OAS enquiry, highlighting which steps are EVA-assisted and summarizing highlights, opportunities and disclaimers via an "EVA Process Coach".

## What's Included - GC Design System Features

The **GC Demo** (`/gc-demo` route) showcases enterprise-grade components built with Government of Canada standards:

### 🌐 **Internationalization**
- **Live EN/FR Toggle**: Instant language switching without page reload
- **Context-Aware Content**: All UI elements, messages, and help text translated
- **Locale-Aware Formatting**: Canadian date/time formats (en-CA/fr-CA)
- **Bilingual Sample Questions**: Contextual prompts that adapt to selected language
- **Official Languages Act Compliance**: Full bilingual support throughout

### ♿ **Accessibility (WCAG 2.1 AA)**
- **Color Contrast**: All text meets ≥4.5:1 contrast ratios
  - White on Dark Blue (#26374a): 12.63:1
  - White on GC Blue (#0535d2): 8.59:1
- **Keyboard Navigation**: Full keyboard support (Enter to send, Tab navigation)
- **Focus Management**: Clear focus indicators with 2px blue borders
- **Auto-Scroll**: Messages automatically scroll into view
- **Disabled States**: Clear visual and cursor feedback for unavailable actions
- **Status Indicators**: Typing indicators and loading states for screen readers
- **Semantic HTML**: Proper tags (`<h1>`, `<button>`, etc.) for assistive technologies

### 🍁 **Government of Canada Design Standards**
- **Federal Identity Program (FIP) Colors**:
  - GC Red: `#eb2d37` (alerts)
  - GC Blue: `#0535d2` (primary actions)
  - GC Dark Blue: `#26374a` (headers)
  - GC Yellow: `#ffbf47` (accents)
  - Success Green: `#278400` (completed states)
  - Warning Orange: `#ee7100` (pending states)
- **Canada Wordmark**: Prominent 🍁 maple leaf in headers
- **Typography**: Following canada.ca guidelines
  - Headings: Lato font (41px/37px responsive)
  - Body: Noto Sans (16px base, 1.6 line-height)
- **Professional Styling**: Clean borders, subtle shadows, generous spacing
- **Compliance Badges**: Visible certification (WCAG 2.1 AA • FIP • Official Languages Act)

### 💬 **Bilingual AI Chat Frame** (`GCChatFrame.tsx`)
- White background with GC branding (fixes previous black frame issue)
- Live EN/FR language toggle in header
- Simulated AI responses with typing indicators
- Sample questions for quick start
- Auto-scroll to latest messages
- Timestamp formatting (2:45 PM / 14:45)
- Warning footer marking demo content

### 📊 **Batch RAG Processing Dashboard** (`BatchRAGDemo.tsx`)
- **Manual Refresh Button**: User-controlled data updates (fixes previous auto-refresh issue)
- **Dynamic Data Generation**: New random realistic values on each refresh
  - Documents: 150-850 (changes every click)
  - Chunks: 2,500-8,500 (changes every click)
  - Processing time: 12.5-45.8 seconds (changes every click)
- **Visual Progress Indicators**: Animated progress bars with status colors
- **Batch Status Table**: Completed/Processing/Queued with color-coded badges
- **Recent Documents List**: Realistic government file names
- **Real-time Statistics**: 4-column stats grid with large numbers

### 🎨 **Design System Documentation**
- FIP color palette with hex codes
- Typography specifications (Lato + Noto Sans)
- Accessibility features summary
- NPM installation instructions for `@eva/gc-look-n-feel`

## Deployment (GitHub Pages)

This EVA Suite demo is configured for deployment to GitHub Pages:

- **Base Path**: `/eva-suite/` (configured in `vite.config.ts`)
- **Workflow**: `.github/workflows/deploy.yml` automatically builds and deploys on push to `main`
- **Live URL**: `https://<username>.github.io/eva-suite/` (replace `<username>` with your GitHub username)

### Manual Deployment

To build and deploy manually:

```bash
npm run build
# The dist/ folder contains the production build
```

**Note**: This is a personal lab demo, not a production system. The GitHub Actions workflow is intentionally simple and does not include advanced CI/CD features like testing, staging environments, or security scanning.

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

<!-- Phase 3 enforcement system test -->

<!-- Phase 3 enforcement system test -->
