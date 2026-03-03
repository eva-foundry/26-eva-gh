# SPEC-07: Testing & Quality Gates
# 100% Test Coverage, All Quality Gates Passing

**Version**: 1.0.0  
**Date**: December 10, 2025  
**Category**: Quality Assurance & Deployment Readiness  
**Target**: 12/12 Quality Gates PASSING before production deployment

---

## 🎯 Overview

**Purpose**: Define complete testing requirements and quality gates for production deployment

**Quality Standard**: Enterprise-grade, government-quality, zero-defect tolerance

**Target Metrics**:
- ✅ 100% test coverage (no exceptions)
- ✅ 0 axe-core violations
- ✅ Lighthouse 100/100 (all categories)
- ✅ WCAG 2.2 AAA compliance
- ✅ Zero production bugs in first 30 days

---

## 📊 Quality Gates Checklist (12 Gates)

### Gate 1: Test Coverage 100%

**Requirement**: ALL code paths covered by tests

**Validation Command**:
```bash
npm test -- --coverage
```

**Expected Output**:
```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |     100 |      100 |     100 |     100 |
  components/eva/     |     100 |      100 |     100 |     100 |
  components/gc-*/    |     100 |      100 |     100 |     100 |
  components/wet-boew/|     100 |      100 |     100 |     100 |
```

**Acceptance Criteria**:
- ✅ Statements coverage: 100%
- ✅ Branch coverage: 100%
- ✅ Function coverage: 100%
- ✅ Line coverage: 100%
- ✅ Uncovered lines: 0

**If Fails**: Identify uncovered lines, write tests, re-run until 100%

---

### Gate 2: Lighthouse Score 100/100

**Requirement**: Perfect Lighthouse scores on all demos

**Validation Command**:
```bash
# Start dev server
npm run storybook &
sleep 10

# Run Lighthouse
npx lighthouse http://localhost:6006 \
  --output=json \
  --output=html \
  --output-path=./lighthouse-report

# Check scores
node -e "
  const report = require('./lighthouse-report.json');
  const scores = {
    performance: report.categories.performance.score * 100,
    accessibility: report.categories.accessibility.score * 100,
    bestPractices: report.categories['best-practices'].score * 100,
    seo: report.categories.seo.score * 100
  };
  console.log(JSON.stringify(scores, null, 2));
  if (Object.values(scores).some(s => s < 100)) {
    process.exit(1);
  }
"
```

**Expected Output**:
```json
{
  "performance": 100,
  "accessibility": 100,
  "bestPractices": 100,
  "seo": 100
}
```

**Acceptance Criteria**:
- ✅ Performance: 100/100
- ✅ Accessibility: 100/100
- ✅ Best Practices: 100/100
- ✅ SEO: 100/100
- ✅ All 3 demos pass (Storybook, Canada Chatbot, GC Design Lab)

**If Fails**: Review Lighthouse report, fix issues, re-run

---

### Gate 3: WCAG 2.2 AAA Compliance

**Requirement**: ALL components meet WCAG 2.2 Level AAA standards

**Validation Command**:
```bash
# Automated testing with axe-core
npx axe packages/web-components/dist/ \
  --tags wcag22aaa \
  --exit

# Manual testing checklist
npm run test:accessibility
```

**Expected Output**:
```
axe DevTools found 0 accessibility issues
✓ All components pass WCAG 2.2 AAA
```

**Acceptance Criteria**:
- ✅ 0 axe-core violations (automated)
- ✅ Color contrast ≥7:1 (AAA standard)
- ✅ Keyboard navigation 100% functional
- ✅ Screen reader tested (NVDA, JAWS, VoiceOver)
- ✅ Focus indicators visible (3px outline minimum)
- ✅ Touch targets ≥44px × 44px
- ✅ No keyboard traps
- ✅ ARIA attributes correct
- ✅ Semantic HTML used
- ✅ Form labels associated

**Manual Testing Required**:
1. Keyboard-only navigation (unplug mouse)
2. Screen reader testing (NVDA on Windows, VoiceOver on Mac)
3. High contrast mode (Windows High Contrast)
4. Zoom to 200% (text remains readable)
5. Color blindness simulation (Protanopia, Deuteranopia, Tritanopia)

**If Fails**: Fix violations, re-test until 0 violations

---

### Gate 4: Zero axe-core Violations

**Requirement**: Automated accessibility testing passes

**Validation Command**:
```bash
# Test all built components
npx axe packages/web-components/dist/ --exit

# Test Storybook
npm run storybook &
sleep 10
npx axe http://localhost:6006 --exit

# Test demos
cd demos/canada-chatbot && npx serve . &
sleep 5
npx axe http://localhost:3000 --exit
```

**Expected Output**:
```
✓ 0 violations found
✓ All WCAG 2.2 AAA rules passed
```

**Acceptance Criteria**:
- ✅ 0 violations in web-components dist/
- ✅ 0 violations in Storybook
- ✅ 0 violations in Canada Chatbot demo
- ✅ 0 violations in GC Design Lab demo
- ✅ 0 violations in DevKit demo

**If Fails**: Review violations, fix ARIA/semantic issues, re-run

---

### Gate 5: Zero Broken Links

**Requirement**: All internal/external links work

**Validation Command**:
```bash
# Check Storybook links
npm run storybook &
sleep 10
npx linkinator http://localhost:6006 --recurse

# Check docs site
cd docs && npx serve . &
sleep 5
npx linkinator http://localhost:3000 --recurse

# Check demos
cd demos/canada-chatbot && npx linkinator index.html
cd demos/gc-design-lab && npx linkinator index.html
cd demos/devkit && npx linkinator index.html
```

**Expected Output**:
```
✓ 0 broken links found
✓ All URLs return 200 OK
```

**Acceptance Criteria**:
- ✅ All demo links work
- ✅ All documentation links work
- ✅ All Storybook links work
- ✅ All CDN links work (jsDelivr, unpkg)
- ✅ All GitHub links work
- ✅ All external references work (design.canada.ca)

**If Fails**: Fix broken links, update URLs, re-test

---

### Gate 6: Zero Hardcoded Literals

**Requirement**: ALL text externalized to i18n catalogs

**Validation Command**:
```bash
# Search for hardcoded English text
grep -r "TODO\|FIXME\|lorem ipsum\|Lorem Ipsum" packages/web-components/src/

# Check for hardcoded strings in templates
grep -r "Click here\|Submit\|Cancel\|Close" packages/web-components/src/ \
  | grep -v "i18n\|t(\|this.msg("

# Verify all components use i18n
find packages/web-components/src/components -name "*.ts" \
  -exec grep -L "registerMessages\|this.msg(" {} \;
```

**Expected Output**:
```
No hardcoded literals found
All components use i18n system
```

**Acceptance Criteria**:
- ✅ No TODO/FIXME comments in production code
- ✅ No lorem ipsum placeholder text
- ✅ All labels use this.msg() or t()
- ✅ All error messages externalized
- ✅ All validation messages externalized
- ✅ All button text externalized
- ✅ All aria-label attributes use i18n

**If Fails**: Extract hardcoded strings to i18n catalogs, re-run

---

### Gate 7: All Demos Work

**Requirement**: All 3 production demos functional in all 5 frameworks

**Validation Command**:
```bash
# Test Canada Chatbot demo
cd demos/canada-chatbot && npm install && npm run dev &
# Manual: Open http://localhost:5173, test chat, toggle EN/FR

# Test GC Design Lab demo
cd demos/gc-design-lab && npm install && npm run dev &
# Manual: Open http://localhost:5174, test all components

# Test DevKit demo
cd demos/devkit && npm install && npm run dev &
# Manual: Open http://localhost:5175, test installation guides

# Test React integration
cd examples/react && npm install && npm run dev &
# Manual: Verify all components render

# Test Vue integration
cd examples/vue && npm install && npm run dev &
# Manual: Verify all components render

# Test Angular integration
cd examples/angular && npm install && npm start &
# Manual: Verify all components render

# Test Svelte integration
cd examples/svelte && npm install && npm run dev &
# Manual: Verify all components render

# Test plain HTML
cd examples/html && npx serve . &
# Manual: Verify all components render
```

**Expected Output**:
```
✓ All demos start without errors
✓ All components render correctly
✓ All interactions work (clicks, keyboard, form submission)
✓ Bilingual toggle works (EN ↔ FR)
✓ Accessibility features work
```

**Acceptance Criteria**:
- ✅ Canada Chatbot demo works (chat interface, RAG simulation, bilingual)
- ✅ GC Design Lab demo works (all 130 components, theme editor, code export)
- ✅ DevKit demo works (installation guides, CLI tool, troubleshooting)
- ✅ React example works
- ✅ Vue example works
- ✅ Angular example works
- ✅ Svelte example works
- ✅ Plain HTML example works

**If Fails**: Debug errors, fix issues, re-test

---

### Gate 8: CI/CD Pipelines Green

**Requirement**: All GitHub Actions workflows passing

**Validation Command**:
```bash
# Check workflow status
gh run list --limit 10

# View latest workflow
gh run view

# Check specific workflows
gh workflow view test.yml
gh workflow view build.yml
gh workflow view publish.yml
gh workflow view storybook.yml
gh workflow view lighthouse.yml
```

**Expected Output**:
```
✓ test.yml: Passing
✓ build.yml: Passing
✓ publish.yml: Passing
✓ storybook.yml: Passing
✓ lighthouse.yml: Passing
```

**Acceptance Criteria**:
- ✅ test.yml runs on every PR (all tests pass)
- ✅ build.yml builds all packages (no errors)
- ✅ publish.yml publishes to npm on version tag
- ✅ storybook.yml deploys to GitHub Pages
- ✅ lighthouse.yml reports 100/100 scores
- ✅ No failing workflows in last 10 runs

**If Fails**: Review workflow logs, fix errors, re-run

---

### Gate 9: npm Packages Ready

**Requirement**: All 7 packages publishable to npm

**Validation Command**:
```bash
# Verify package.json in all packages
for pkg in web-components design-tokens react vue angular svelte cli; do
  echo "Checking $pkg..."
  cd packages/$pkg
  npm pack --dry-run
  cd ../..
done

# Test installation
npm install ./packages/web-components
npm install ./packages/react
npm install ./packages/vue
npm install ./packages/angular
npm install ./packages/svelte
npm install ./packages/cli

# Test imports
node -e "
  const { EvaButton } = require('@eva-sovereign/react');
  console.log('✓ React import works');
"
```

**Expected Output**:
```
✓ All packages have valid package.json
✓ All packages build successfully
✓ All packages install without errors
✓ All imports work
```

**Acceptance Criteria**:
- ✅ @eva-sovereign/web-components package.json valid
- ✅ @eva-sovereign/design-tokens package.json valid
- ✅ @eva-sovereign/react package.json valid
- ✅ @eva-sovereign/vue package.json valid
- ✅ @eva-sovereign/angular package.json valid
- ✅ @eva-sovereign/svelte package.json valid
- ✅ @eva-sovereign/cli package.json valid
- ✅ All packages build without errors
- ✅ All packages install without errors
- ✅ All imports work
- ✅ npm publish --dry-run succeeds for all

**If Fails**: Fix package.json errors, re-build, re-test

---

### Gate 10: Complete Documentation

**Requirement**: Storybook + docs site fully complete

**Validation Command**:
```bash
# Build Storybook
npm run build-storybook
# Expected: storybook-static/ directory created

# Check Storybook completeness
find storybook-static -name "*.html" | wc -l
# Expected: ≥130 component pages

# Build docs site
cd docs && npm run build
# Expected: dist/ directory created

# Check docs completeness
grep -r "TODO\|FIXME\|Coming soon" docs/
# Expected: No results
```

**Expected Output**:
```
✓ Storybook built successfully
✓ 130+ component pages generated
✓ Docs site built successfully
✓ All sections complete
```

**Acceptance Criteria**:
- ✅ Storybook has story for all 130 components
- ✅ All stories have controls
- ✅ All stories have code snippets
- ✅ Accessibility addon enabled
- ✅ Docs site has all sections:
  - Getting Started
  - Installation
  - Framework Integration (React, Vue, Angular, Svelte, HTML)
  - Component API (TypeDoc)
  - Accessibility Guide
  - i18n Guide
  - Migration Guide (WET-BOEW 4.x)
  - Troubleshooting
  - Contributing
- ✅ Search works
- ✅ Mobile responsive
- ✅ No broken links

**If Fails**: Complete missing sections, re-build, re-deploy

---

### Gate 11: Official GC Assets Only

**Requirement**: No placeholder or unofficial graphics

**Validation Command**:
```bash
# Check for non-SVG images (should only be SVG)
find packages/web-components -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif"
# Expected: 0 results

# Check for unofficial assets
grep -r "placeholder\|temp\|todo\|fake\|mock\|demo" packages/web-components/src/assets/
# Expected: 0 results

# Verify official GC assets exist
ls packages/web-components/src/assets/
# Expected: canada-wordmark.svg, canadian-flag.svg, gc-icons/
```

**Expected Output**:
```
✓ 0 raster images found (all SVG)
✓ 0 placeholder assets found
✓ Official GC assets present
```

**Acceptance Criteria**:
- ✅ Canada Wordmark (SVG) from design.canada.ca
- ✅ Canadian Flag (SVG) from design.canada.ca
- ✅ GC Design System icons (SVG)
- ✅ Self-hosted fonts (Lato, Noto Sans)
- ✅ No colorful/playful consumer icons
- ✅ No video game graphics
- ✅ No placeholder images
- ✅ All graphics government-grade quality

**If Fails**: Replace unofficial assets with official GC assets, re-validate

---

### Gate 12: Professional Visual Standards

**Requirement**: Government-grade visual quality

**Manual Review Checklist**:
- ✅ Colors match GC Design System exactly (no approximations)
- ✅ Typography uses official fonts (Lato for headings, Noto Sans for body)
- ✅ Spacing follows 8px grid system
- ✅ Icons are professional-grade (not consumer-style)
- ✅ No bright/playful colors (this is government software)
- ✅ No Comic Sans or inappropriate fonts
- ✅ Contrast ratios meet WCAG 2.2 AAA (≥7:1)
- ✅ Layout is clean and professional
- ✅ No lorem ipsum in production
- ✅ Screenshots show real Canadian government content

**Validation Command**:
```bash
# Take screenshots of all demos
npx playwright screenshot \
  http://localhost:6006 \
  ./screenshots/storybook.png

npx playwright screenshot \
  http://localhost:3000 \
  ./screenshots/canada-chatbot.png

# Manual review of screenshots
```

**Expected Output**:
```
✓ All screenshots look professional
✓ No visual quality issues
```

**Acceptance Criteria**:
- ✅ Visual design matches design.canada.ca standards
- ✅ No unprofessional graphics
- ✅ Colors, fonts, spacing correct
- ✅ Layouts clean and organized
- ✅ Screenshots suitable for public-facing marketing

**If Fails**: Redesign components, update assets, re-screenshot

---

## 🧪 Test Suite Structure

### Unit Tests (Vitest)

**Location**: `packages/web-components/src/components/**/*.test.ts`

**Pattern**:
```typescript
// eva-button.test.ts
import { fixture, html, expect } from '@open-wc/testing';
import './eva-button';
import type { EvaButton } from './eva-button';

describe('eva-button', () => {
  it('renders with default variant', async () => {
    const el = await fixture<EvaButton>(html`<eva-button>Click me</eva-button>`);
    expect(el.variant).to.equal('primary');
  });

  it('emits click event', async () => {
    const el = await fixture<EvaButton>(html`<eva-button>Click me</eva-button>`);
    let clicked = false;
    el.addEventListener('eva-button-click', () => { clicked = true; });
    el.click();
    expect(clicked).to.be.true;
  });

  // ... 18 more tests for 100% coverage
});
```

**Coverage Target**: 100% (statements, branches, functions, lines)

---

### Integration Tests (Testing Library)

**Location**: `packages/web-components/src/components/**/*.integration.test.ts`

**Pattern**:
```typescript
// wb-formvalid.integration.test.ts
import { render, screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('wb-formvalid integration', () => {
  it('validates form and shows errors', async () => {
    render(html`
      <wb-formvalid>
        <form>
          <eva-input label="Email" type="email" required></eva-input>
          <eva-button type="submit">Submit</eva-button>
        </form>
      </wb-formvalid>
    `);

    const submit = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submit);

    // Expect error message
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});
```

---

### Accessibility Tests (axe-core)

**Location**: `packages/web-components/src/components/**/*.a11y.test.ts`

**Pattern**:
```typescript
// eva-button.a11y.test.ts
import { fixture, html, expect } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import './eva-button';

expect.extend(toHaveNoViolations);

describe('eva-button accessibility', () => {
  it('has no axe violations', async () => {
    const el = await fixture(html`<eva-button>Click me</eva-button>`);
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('has accessible name', async () => {
    const el = await fixture(html`<eva-button aria-label="Submit form">Submit</eva-button>`);
    expect(el).toHaveAccessibleName('Submit form');
  });
});
```

---

### Visual Regression Tests (Chromatic)

**Location**: `.storybook/stories/**/*.stories.ts`

**Pattern**:
```typescript
// eva-button.stories.ts
export const Primary = {
  render: () => html`<eva-button variant="primary">Primary</eva-button>`,
  parameters: {
    chromatic: { viewports: [375, 768, 1440] } // Test all breakpoints
  }
};
```

**Tool**: Chromatic (https://www.chromatic.com/)

**Command**:
```bash
npx chromatic --project-token=<token>
```

---

### E2E Tests (Playwright - Optional)

**Location**: `tests/e2e/**/*.spec.ts`

**Pattern**:
```typescript
// canada-chatbot.spec.ts
import { test, expect } from '@playwright/test';

test('Canada Chatbot demo works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Type message
  await page.fill('eva-input', 'How do I apply for a passport?');
  await page.click('eva-button');
  
  // Expect response
  await expect(page.locator('eva-chat-panel')).toContainText('passport');
});
```

---

## 🚀 CI/CD Pipeline Configuration

### GitHub Actions Workflow: test.yml

```yaml
name: Test Suite

on:
  pull_request:
  push:
    branches: [main, master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - name: Fail if coverage < 100%
        run: |
          coverage=$(cat coverage/coverage-summary.json | jq '.total.statements.pct')
          if (( $(echo "$coverage < 100" | bc -l) )); then
            echo "Coverage is $coverage%, expected 100%"
            exit 1
          fi
```

### GitHub Actions Workflow: lighthouse.yml

```yaml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:6006
          uploadArtifacts: true
          temporaryPublicStorage: true
          
      - name: Fail if score < 100
        run: |
          scores=$(cat .lighthouseci/lighthouse-*.json | jq '.categories[].score')
          for score in $scores; do
            if (( $(echo "$score < 1" | bc -l) )); then
              echo "Lighthouse score $score is below 100"
              exit 1
            fi
          done
```

---

## ✅ Final Acceptance Criteria

**The project is PRODUCTION-READY when**:

1. ✅ All 12 quality gates PASSING
2. ✅ All 130 components implemented
3. ✅ 3,454+ tests passing (100% coverage)
4. ✅ 0 axe-core violations
5. ✅ Lighthouse 100/100 on all demos
6. ✅ All 7 npm packages published
7. ✅ All documentation complete
8. ✅ All demos deployed
9. ✅ CI/CD pipelines green
10. ✅ First GC department pilot confirmed

---

**END OF SPEC-07**

**Status**: Complete specification package ready for GitHub agent execution
