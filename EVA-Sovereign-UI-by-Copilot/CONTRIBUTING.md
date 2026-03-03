# Contributing Guide

Thank you for contributing to EVA Sovereign UI. This project targets world-class enterprise and government-grade quality.

## Standards & Governance

- Accessibility: WCAG 2.2 AA baseline; interactive components keyboard operable, ARIA-accurate.
- Performance: Benchmarks must pass (avg ≤16ms, total ≤200ms).
- Bundle size: ES ≤50 KB gzip, UMD ≤75 KB gzip.
- Internationalization: Components respond to locale changes via i18n service.
- Visual Regression: Playwright baselines stable across browsers.

## Branching & Commits

- Branch from `main`.
- Conventional commits are required:
  - `feat:`, `fix:`, `perf:`, `docs:`, `refactor:`, `test:`, `chore:`
  - Scope examples: `feat(pagination): add Home/End nav`

## Required Checks

CI enforces, in order:
- No skipped tests (`scripts/check-no-skips.mjs`).
- Unit tests (`vitest`).
- Visual regression (`playwright`).
- Performance benchmark (`scripts/perf-benchmark.mjs`).
- Size guard (`scripts/size-guard.mjs`).
- Build artifacts (`vite build`).
- Semantic release (`release.yml`).

## Development Workflow

1. `npm ci` then `npm run dev` for local development.
2. Add/modify components in `src/components/**` using EVABaseComponent.
3. Write unit tests in `tests/**`. For keyboard interactions, use provided test-utils.
4. Run `npm test` locally; fix failures.
5. Update docs: `COMPONENT-API.md`, `docs/THEMING-AND-TOKENS.md`.
6. Commit using conventional messages.
7. Open PR; ensure CI passes.

## Release Process

- Merges to `main` trigger `release.yml`.
- Requires `NPM_TOKEN` secret for publishing.
- Semantic-release updates version, `CHANGELOG.md`, tags, and publishes.

## Security & Compliance

- Follow `SECURITY.md` for vulnerability reporting.
- Do not include PII or sensitive data in examples/tests.

## Code Review Guidelines

### For Reviewers

- **Accessibility**: Verify keyboard navigation, ARIA attributes, focus management
- **Performance**: Check bundle size impact, render times, DOM complexity
- **Security**: No `eval()`, no `innerHTML` with user data, CSP compliance
- **i18n**: Ensure hardcoded strings use `i18n.t()` or `*-key` attributes
- **Tests**: Require tests for new components, bug fixes must include regression test
- **Documentation**: API changes must update COMPONENT-API.md

### For Contributors

- **Code Style**: TypeScript strict mode, ESLint passing, no `any` types
- **Commit Messages**: Follow conventional commits, use present tense ("add" not "added")
- **PR Description**: Include motivation, testing approach, breaking changes
- **Breaking Changes**: Document in PR body with `BREAKING CHANGE:` footer

## Internationalization Guidelines

### Adding New Locales

1. Create `src/i18n/locales/{locale}.json` (e.g., `es-MX.json`)
2. Copy structure from `en-CA.json`, translate all strings
3. Add locale to `i18n-service.ts` supportedLocales array
4. Update `eva-language-switcher.ts` with new option
5. Test locale switching with `npm run dev`

### Translation Keys

Use nested JSON structure with dot notation:
```json
{
  "component": {
    "action": {
      "button": "Click Here"
    }
  }
}
```

Access as: `i18n.t('component.action.button')`

## Accessibility Testing Checklist

Before submitting PR with new interactive component:

- [ ] **Keyboard Navigation**: Tab, Enter, Space, Escape, Arrow keys (if applicable)
- [ ] **Focus Management**: 3px indicator, 3:1 contrast, visible focus state
- [ ] **Screen Reader**: ARIA role, label, description, live region (if dynamic)
- [ ] **Color Contrast**: 7:1 for text, 3:1 for UI components (WCAG 2.2 AAA)
- [ ] **Touch Targets**: 44×44px minimum (WCAG 2.2 Target Size)
- [ ] **Motion**: Respects `prefers-reduced-motion` (if animated)

Use axe DevTools browser extension to validate.

## Performance Optimization Tips

- **Shadow DOM**: Use `:host` selector for component styles (scoped, no leakage)
- **Event Delegation**: Attach listeners to root, use `event.target` to determine source
- **Lazy Properties**: Use getters for computed values, cache in private field
- **CSS Variables**: Use design tokens from `src/tokens/`, avoid inline styles
- **Debouncing**: Use `debounce()` utility for resize/input handlers

## Government Deployment Considerations

### Data Sovereignty

- No external API calls (Google Fonts, CDN dependencies)
- Self-hosted fonts in `public/fonts/`
- i18n locale files served from same origin

### Air-Gapped Environments

- Zero runtime dependencies (check `package.json` devDependencies only)
- Build artifacts in `dist/` are standalone
- No telemetry, analytics, or external beacons

### Compliance Verification

- **WCAG 2.2 AA+**: Run axe DevTools, fix all violations
- **Section 508**: Test with screen reader (NVDA/JAWS on Windows, VoiceOver on macOS)
- **PIPEDA/GDPR**: No PII collection, no cookies, no local storage (except i18n locale preference)

## Troubleshooting Common Issues

### Visual Regression Failures

```bash
# Update Playwright baselines after intentional UI change
npm run test:vr:update

# Debug visual diff
npx playwright show-report tests/visual-regression/report
```

### Performance Benchmark Failures

```bash
# Run benchmark with detailed output
npm run benchmark -- --verbose

# Profile specific component
node scripts/perf-benchmark.mjs --component=eva-pagination
```

### TypeScript Errors

```bash
# Check types without emitting
npx tsc --noEmit

# Generate declaration files
npm run build
```

## Release Checklist (Maintainers Only)

Before merging to `main`:

- [ ] All CI checks passing (tests, VR, perf, size, build)
- [ ] CHANGELOG.md updated (automated by semantic-release)
- [ ] Documentation complete (README, COMPONENT-API, QUICKSTART)
- [ ] Breaking changes documented in PR body
- [ ] Version bump follows semantic versioning (major.minor.patch)
- [ ] GitHub release notes reviewed
- [ ] npm package published (automated by release.yml)

## Contact

- **Issues**: https://github.com/MarcoPolo483/EVA-Sovereign-UI-by-Copilot/issues
- **Discussions**: https://github.com/MarcoPolo483/EVA-Sovereign-UI-by-Copilot/discussions
- **Security**: See SECURITY.md for vulnerability reporting
- **Government Deployments**: Contact maintainers via GitHub Discussions (tag: `government`)
