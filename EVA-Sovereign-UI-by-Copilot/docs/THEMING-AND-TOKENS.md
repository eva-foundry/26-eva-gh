# Theming & Design Tokens

This guide documents EVA Sovereign UI tokens, theming, and high-contrast accessibility requirements for world-class enterprise & government-grade deployments.

## Design Tokens

- Colors: Defined in `theme.json` and `src/tokens/colors.ts` (modern palette, WCAG AA/AAA options).
- Spacing: `src/tokens/spacing.ts` scales (4px base with multiples).
- Typography: `src/tokens/typography.ts` font sizes, weights, line-heights.
- Radius & Elevation: `src/tokens/radius.ts`, `src/tokens/shadows.ts`.

Use tokens via CSS variables exposed from the root. Components read tokens from the host or document root to allow cascading themes.

```css
:root {
  --eva-color-primary: #0055a5;
  --eva-color-on-primary: #ffffff;
  --eva-space-1: 4px;
  --eva-space-2: 8px;
}
```

## Theming

- Global theme: Override `:root` CSS variables.
- Scoped theme: Apply variables on any container; Web Components read computed values from the host.
- Dark/High-contrast: Provide alternates that meet WCAG contrast ($\ge 4.5:1$ for text, $\ge 3:1$ for large text/icons).

```css
[data-theme="gc-dark"] {
  --eva-color-background: #0b0e12;
  --eva-color-surface: #11151b;
  --eva-color-primary: #4db2ff;
  --eva-color-on-primary: #001018;
}
```

## High-Contrast Accessibility

- Minimum contrast: text vs background $\ge 4.5:1$; large text (≥18pt or ≥14pt bold) $\ge 3:1$; non-text UI components $\ge 3:1$ against adjacent colors.
- Focus indicators: Visible outlines ($\ge 3:1$ contrast) on focus.
- State colors: Do not rely on color alone; include icons/text.

## Validation Guidance

- Manual: Use a color contrast analyzer (e.g., axe DevTools, WCAG Contrast checker).
- Automated: Integrate Playwright + axe to verify contrast rules on key views.

Example Playwright + axe snippet:
```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('theme contrast checks', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

## Token Extension

- Add new tokens in `src/tokens/*` and expose as CSS variables.
- Document changes in this file and `COMPONENT-API.md` where relevant.

## Migration & Governance

- All theme changes must pass: unit tests, visual regression, axe contrast checks, performance benchmark, and size guard in CI.
- Use conventional commits (`feat(token): add tertiary color scale`).
