# EVA-UI: Government of Canada RAG Chat Interface

**Production-grade chat interface for EVA (Enterprise Virtual Assistant) using the Government of Canada Design System and EVA-Sovereign-UI Web Components architecture.**

[![CI/CD](https://github.com/MarcoPolo483/eva-ui/workflows/ci/badge.svg)](https://github.com/MarcoPolo483/eva-ui/actions)
[![Accessibility](https://img.shields.io/badge/WCAG-2.2%20AA-green)](docs/ACCESSIBILITY.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🎯 Overview

EVA-UI is the production interface for the EVA RAG (Retrieval-Augmented Generation) system, designed specifically for Canadian federal government deployment. It prioritizes:

- **GC Design System Compliance**: Mandatory Canada.ca visual identity, header/footer, typography, and colors
- **Bilingual Excellence**: Seamless EN-CA / FR-CA support with zero hardcoded strings
- **Accessibility First**: WCAG 2.2 AA/AAA compliance with automated testing and manual audits
- **Enterprise Customization**: Configuration backstage for branding, text, and features without code changes
- **Component Reusability**: EVA-Sovereign-UI Web Components (Lit 3.x) publishable as standalone package

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/MarcoPolo483/eva-ui.git
cd eva-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run all tests
npm test

# Run accessibility tests only
npm run test:a11y

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 📁 Repository Structure

```
eva-ui/
├── packages/web-components/    # EVA-Sovereign-UI Lit 3.x components
├── src/                        # Main application
├── tests/                      # Test suites
├── docs/                       # Documentation
│   ├── IMPLEMENTATION-PLAN.md  # P02 implementation epics/stories
│   ├── ARCHITECTURE-DESIGN.md  # System architecture
│   ├── UX-NAVIGATION-CUSTOMIZATION.md  # Backstage UX
│   └── DISCOVERY-REPORT.md     # Current demo analysis
└── PRD.md                      # Product requirements
```

---

## ✨ Key Features

### 🇨🇦 GC Design System Integration
- Canada wordmark and federal header/footer
- Lato/Noto Sans typography
- Official GC color palette (oklch)
- WCAG-validated contrast ratios

### 🌐 Bilingual Support (EN-CA / FR-CA)
- Zero hardcoded strings
- Locale-aware date/number formatting
- Instant language switching
- Professional translations

### ♿ Accessibility
- **WCAG 2.2 Level AA Compliance** (with AAA features)
- Automated testing with **axe-core** (0 violations)
- Keyboard-only navigation support
- Screen reader optimized (NVDA, JAWS, VoiceOver, TalkBack)
- High contrast color ratios (7:1+ for critical text)
- 44x44px minimum touch targets
- Skip links and ARIA landmarks
- Focus management in modals and dialogs
- **Lighthouse accessibility score: ≥95**

### 💬 RAG Chat Interface
- Knowledge space selection
- Streaming AI responses
- Message history persistence
- Markdown rendering
- Copy/export functionality

### ⚙️ Customization Backstage
- Theme editor with live preview
- Text/translation overrides
- Feature toggles
- Deployment manager
- Configuration import/export

---

## 🧩 Technology Stack

- **Frontend**: React 19.x with TypeScript
- **Build**: Vite 7.x
- **Language**: TypeScript 5.x (strict mode)
- **Testing**: Vitest + @testing-library/react + axe-core + vitest-axe
- **Styling**: Tailwind CSS 4.x + shadcn/ui components + GC Design System tokens
- **Icons**: Phosphor Icons + Heroicons
- **i18n**: Custom service with EN-CA/FR-CA JSON files
- **State Management**: React hooks + Spark KV persistence
- **CI/CD**: GitHub Actions + Lighthouse CI
- **Accessibility**: axe-core + WCAG 2.2 automated testing

---

## 📚 Documentation

- **[Implementation Plan](docs/IMPLEMENTATION-PLAN.md)**: Epics, stories, tasks, and success criteria
- **[Architecture Design](docs/ARCHITECTURE-DESIGN.md)**: System structure, component patterns, services
- **[UX & Customization](docs/UX-NAVIGATION-CUSTOMIZATION.md)**: Backstage interface design
- **[Discovery Report](docs/DISCOVERY-REPORT.md)**: Gap analysis and migration strategy
- **[Task List](docs/TASK-LIST.md)**: Current implementation status and next priorities
- **[Accessibility Guide](tests/accessibility/README.md)**: Testing procedures and WCAG compliance
- **[PRD](PRD.md)**: Product requirements and design direction

---

## 🛠️ Development Workflow

### Component Development
1. Create component in `src/components/[category]/`
2. Use GC Design System color palette (oklch values)
3. Ensure all text is internationalized (no hardcoded strings)
4. Add unit tests and accessibility tests
5. Verify keyboard navigation and ARIA attributes
6. Test with screen readers

### Testing
```bash
npm test                 # Run all tests
npm run test:a11y        # Accessibility tests only
npm run test:watch       # Watch mode for development
npm run test:coverage    # Generate coverage report (80% thresholds)
```

### Linting & Type Checking
```bash
npm run lint             # ESLint code quality
npx tsc --noEmit         # TypeScript type checking
```

### CI/CD Pipeline
- **On PR**: Lint, type check, accessibility tests, full test suite, build, Lighthouse CI
- **On Merge to Main**: Deploy to staging (if configured)
- **Quality Gates**: 
  - 0 accessibility violations (axe-core)
  - Lighthouse accessibility ≥95
  - Test coverage ≥80%
  - 0 TypeScript errors
  - 0 ESLint errors

---

## 🎨 GC Design System Compliance

EVA-UI strictly adheres to the [Government of Canada Design System](https://design-system.alpha.canada.ca/en/):

- ✅ Mandatory header with Canada wordmark and flag
- ✅ Mandatory footer with federal links
- ✅ GC color palette (oklch values with 7:1+ contrast)
- ✅ Lato/Noto Sans typography
- ✅ WCAG 2.2 Level AA compliance (with AAA features)
- ✅ Responsive layout (mobile-first design)
- ✅ Bilingual EN-CA / FR-CA (zero hardcoded strings)
- ✅ Skip to main content link
- ✅ ARIA landmarks and semantic HTML

**Visual Compliance**: All pages match Canada.ca reference designs.

---

## ♿ Accessibility Commitment

EVA-UI is committed to universal access and exceeds minimum federal requirements:

### Automated Testing
- **axe-core**: Runs on every component in CI/CD pipeline
- **vitest-axe**: Integration tests for WCAG 2.2 compliance
- **Lighthouse CI**: Enforces ≥95 accessibility score
- **Coverage**: 5 comprehensive test suites (GCHeader, GCFooter, ChatPanel, BackstagePanel, App)

### Manual Testing
- Quarterly screen reader audits (NVDA, JAWS, VoiceOver, TalkBack)
- Keyboard-only navigation verification
- High contrast mode testing
- Zoom and reflow testing (200% zoom)

### Key Features
- **Keyboard Navigation**: All functionality accessible without mouse (Tab, Enter, Space, Escape)
- **Color Contrast**: 7:1+ ratios for critical text (exceeds AAA)
- **Touch Targets**: 44x44px minimum (exceeds WCAG 2.5.5)
- **Focus Management**: Visible 3px focus rings, focus trap in modals
- **ARIA**: Complete landmark structure (banner, main, contentinfo, navigation)
- **Screen Reader**: aria-live regions for dynamic content, proper labeling

### Compliance
- ✅ **WCAG 2.2 Level A**: Full compliance
- ✅ **WCAG 2.2 Level AA**: Full compliance (target level)
- ✅ **WCAG 2.2 Level AAA**: Partial compliance (color contrast, target size)
- ✅ **Standard on Web Accessibility**: Government of Canada requirement

**Target**: Lighthouse Accessibility Score ≥ 95 (enforced in CI)

**Testing Guide**: See [tests/accessibility/README.md](tests/accessibility/README.md)

---

## 🌍 Internationalization (i18n)

### Supported Locales
- **en-CA**: English (Canada)
- **fr-CA**: French (Canada)

### Translation Files
- `src/services/i18n/locales/en-CA.json` (150+ keys)
- `src/services/i18n/locales/fr-CA.json` (150+ keys)

### Adding Translations
1. Add key to both `en-CA.json` and `fr-CA.json`
2. Use `i18nService.t('key')` in code
3. Run `npm run i18n:validate` to check coverage

---

## 🔗 Related Repositories

- **[eva-api](https://github.com/MarcoPolo483/eva-api)**: Backend API for EVA chat
- **[eva-rag](https://github.com/MarcoPolo483/eva-rag)**: RAG pipeline and vector database

---

## 📄 License

EVA-UI is licensed under the [MIT License](LICENSE).

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards (ESLint, Prettier, TypeScript strict)
4. Write tests (unit + accessibility)
5. Ensure CI passes
6. Submit a pull request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/MarcoPolo483/eva-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MarcoPolo483/eva-ui/discussions)
- **Docs**: [Documentation](docs/)

---

**Built with ❤️ for the Government of Canada by the EVA Development Team**
