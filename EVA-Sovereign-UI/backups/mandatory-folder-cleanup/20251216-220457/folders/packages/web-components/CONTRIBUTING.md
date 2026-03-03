# Contributing to EVA Sovereign UI Web Components

Thank you for your interest in contributing to the EVA Sovereign UI web components library! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Accessibility Standards](#accessibility-standards)
- [Submission Guidelines](#submission-guidelines)
- [Style Guide](#style-guide)

## 🤝 Code of Conduct

This project adheres to the Government of Canada's [Values and Ethics Code](https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=25049). By participating, you are expected to uphold these values:

- **Respect for democracy** - Upholding democratic principles
- **Respect for people** - Treating all people with respect
- **Integrity** - Acting with honesty and fairness
- **Stewardship** - Using resources responsibly
- **Excellence** - Striving for high quality in all work

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - Lit Plugin

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/eva-sovereign-ui.git
   cd eva-sovereign-ui/packages/web-components
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests to verify setup**
   ```bash
   npm test
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start Storybook for component development**
   ```bash
   npm run storybook
   ```

## 💻 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `docs/*` - Documentation updates

### Creating a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Development Cycle

1. **Write tests first** (TDD approach)
   ```bash
   npm test -- --watch
   ```

2. **Implement component**
   - Create component file: `src/components/eva-component.ts`
   - Create test file: `src/components/eva-component.test.ts`
   - Create stories: `src/components/eva-component.stories.ts`

3. **Run tests continuously**
   ```bash
   npm test -- --watch
   ```

4. **Check in Storybook**
   ```bash
   npm run storybook
   ```

5. **Lint and format**
   ```bash
   npm run lint
   npm run format
   ```

6. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new component"
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

**Examples:**
```bash
feat(eva-button): add loading state
fix(eva-input): correct validation message display
docs(README): update installation instructions
test(eva-modal): add focus trap tests
```

## 🎨 Component Guidelines

### Component Structure

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement';

/**
 * A brief description of the component.
 *
 * @element eva-component
 * 
 * @fires eva-event-name - Description of the event
 * 
 * @slot - Default slot description
 * @slot named-slot - Named slot description
 * 
 * @csspart part-name - CSS part description
 * 
 * @cssprop --eva-component-property - CSS custom property description
 * 
 * @example
 * ```html
 * <eva-component variant="primary">
 *   Content here
 * </eva-component>
 * ```
 */
@customElement('eva-component')
export class EVAComponent extends EVAElement {
  /** Component properties with JSDoc */
  @property({ reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  /** Internal reactive property */
  @property({ type: Boolean })
  disabled = false;

  static styles = css`
    :host {
      display: block;
    }
    
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  render() {
    return html`
      <div class="component">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-component': EVAComponent;
  }
}
```

### Component Checklist

- [ ] Extends `EVAElement` base class
- [ ] Uses `@customElement` decorator
- [ ] All properties have JSDoc comments
- [ ] Uses semantic HTML elements
- [ ] Implements ARIA attributes
- [ ] Supports keyboard navigation
- [ ] Emits custom events with `eva-` prefix
- [ ] Uses CSS custom properties for theming
- [ ] Includes comprehensive tests
- [ ] Has Storybook stories
- [ ] Bilingual support (EN/FR)
- [ ] WCAG 2.2 AAA compliant

### Event Naming

All custom events should use the `eva-` prefix:

```typescript
this.dispatchEvent(new CustomEvent('eva-change', {
  detail: { value: this.value },
  bubbles: true,
  composed: true,
}));
```

### Property Reflection

Reflect important properties to attributes:

```typescript
@property({ reflect: true })
open = false;
```

## 🧪 Testing Requirements

### Test Coverage

All components must achieve **≥95% code coverage**:

```bash
npm run test:coverage
```

### Test Structure

```typescript
import { fixture, expect, html } from '@open-wc/testing';
import { waitForUpdate } from '../../../test/helpers.js';
import './eva-component.js';
import { EVAComponent } from './eva-component.js';

describe('eva-component', () => {
  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<EVAComponent>(html`
        <eva-component></eva-component>
      `);
      
      expect(el).to.exist;
      expect(el.variant).to.equal('primary');
    });
  });

  describe('Properties', () => {
    it('updates when property changes', async () => {
      const el = await fixture<EVAComponent>(html`
        <eva-component></eva-component>
      `);
      
      el.variant = 'secondary';
      await waitForUpdate(el);
      
      expect(el.variant).to.equal('secondary');
    });
  });

  describe('Events', () => {
    it('dispatches event on action', async () => {
      const el = await fixture<EVAComponent>(html`
        <eva-component></eva-component>
      `);
      
      let eventFired = false;
      el.addEventListener('eva-change', () => {
        eventFired = true;
      });
      
      // Trigger action...
      await waitForUpdate(el);
      
      expect(eventFired).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      const el = await fixture<EVAComponent>(html`
        <eva-component></eva-component>
      `);
      
      expect(el.getAttribute('role')).to.equal('button');
      expect(el.getAttribute('aria-label')).to.exist;
    });

    it('supports keyboard navigation', async () => {
      const el = await fixture<EVAComponent>(html`
        <eva-component></eva-component>
      `);
      
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await waitForUpdate(el);
      
      // Verify expected behavior
    });
  });
});
```

### Test Helpers

Use provided helper functions from `test/helpers.ts`:

```typescript
import {
  waitForUpdate,
  queryShadow,
  clickShadow,
  setInputValue,
  waitForEvent,
  pressKey
} from '../../../test/helpers.js';
```

## ♿ Accessibility Standards

### WCAG 2.2 AAA Requirements

All components must meet Level AAA standards:

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Visible focus indicators (minimum 2px outline)
   - Logical tab order

2. **Screen Reader Support**
   - Proper ARIA labels and roles
   - Descriptive link text
   - Form labels associated with inputs
   - Live regions for dynamic content

3. **Color Contrast**
   - Text: 7:1 minimum contrast ratio
   - UI components: 3:1 minimum contrast ratio

4. **Touch Targets**
   - Minimum 44×44px for all interactive elements

5. **Motion & Animation**
   - Respect `prefers-reduced-motion`
   - No auto-playing animations

### Accessibility Testing

```bash
# Manual testing
npm run storybook
# Use axe DevTools extension

# Automated testing
npm test -- --coverage
```

### ARIA Patterns

Follow [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/):

```html
<!-- Button -->
<button role="button" aria-pressed="false">
  Click me
</button>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
</div>

<!-- Tab Panel -->
<div role="tabpanel" aria-labelledby="tab-1">
  Content
</div>
```

## 📝 Submission Guidelines

### Pull Request Process

1. **Update your branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature
   git rebase develop
   ```

2. **Run all checks**
   ```bash
   npm test
   npm run lint
   npm run format
   npm run test:coverage
   ```

3. **Push your changes**
   ```bash
   git push origin feature/your-feature
   ```

4. **Create Pull Request**
   - Go to GitHub and create a PR from your branch to `develop`
   - Fill out the PR template
   - Link related issues

5. **Address review feedback**
   - Make requested changes
   - Push additional commits
   - Request re-review

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Accessibility verified
- [ ] Bilingual support (EN/FR)
- [ ] All tests passing (934/934)
- [ ] Coverage ≥95%
- [ ] Storybook stories added
- [ ] No console errors/warnings

## Screenshots
(If applicable)

## Related Issues
Fixes #123
```

## 🎨 Style Guide

### TypeScript

```typescript
// ✅ Good
@property({ reflect: true })
variant: 'primary' | 'secondary' = 'primary';

// ❌ Bad
@property()
variant: string = 'primary';
```

### CSS

```css
/* ✅ Good: Use custom properties */
:host {
  color: var(--eva-text-color, #000);
  font-size: var(--eva-font-size-base, 16px);
}

/* ❌ Bad: Hard-coded values */
:host {
  color: #000;
  font-size: 16px;
}
```

### HTML Templates

```typescript
// ✅ Good: Semantic HTML
render() {
  return html`
    <button type="button" aria-label="${this.label}">
      <slot></slot>
    </button>
  `;
}

// ❌ Bad: Non-semantic
render() {
  return html`
    <div @click=${this.handleClick}>
      <slot></slot>
    </div>
  `;
}
```

## 🔍 Code Review Criteria

Reviewers will check:

- [ ] **Functionality**: Code works as expected
- [ ] **Tests**: Comprehensive test coverage (≥95%)
- [ ] **Accessibility**: WCAG 2.2 AAA compliant
- [ ] **Performance**: No unnecessary re-renders
- [ ] **Documentation**: JSDoc comments, README updates
- [ ] **Style**: Follows coding standards
- [ ] **Security**: No XSS vulnerabilities
- [ ] **Bilingual**: English and French support
- [ ] **Browser Support**: Works in all supported browsers

## 📚 Resources

- [Lit Documentation](https://lit.dev/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [GC Design System](https://design.canada.ca/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 💬 Getting Help

- **Documentation**: Check the [README](./README.md) and inline code comments
- **Issues**: Search [existing issues](https://github.com/eva-suite/web-components/issues)
- **Discussions**: Ask in [GitHub Discussions](https://github.com/eva-suite/web-components/discussions)
- **Email**: dev@eva-sovereign.ca

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to EVA Sovereign UI! Together we're building accessible, sovereign-ready web components for Canada. 🇨🇦**
