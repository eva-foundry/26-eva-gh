# Accessibility Testing Guide

## Overview

EVA-UI implements comprehensive accessibility testing to ensure WCAG 2.2 Level AA/AAA compliance, as required by the Government of Canada Digital Standards.

## Test Suite

### Automated Accessibility Tests

All components have automated accessibility tests using:
- **axe-core**: Industry-standard accessibility testing engine
- **vitest-axe**: Integration with our Vitest testing framework
- **@testing-library/react**: For component rendering and interaction testing

### Running Tests

```bash
# Run all accessibility tests
npm run test:a11y

# Run all tests (includes accessibility)
npm test

# Run tests in watch mode
npm run test:watch

# Run specific accessibility test
npm test tests/accessibility/GCHeader.a11y.test.tsx
```

## Test Coverage

### Components Tested

1. **GCHeader** (`tests/accessibility/GCHeader.a11y.test.tsx`)
   - Skip link functionality
   - Banner landmark
   - Language toggle accessibility
   - Touch target sizes
   - Color contrast
   - Keyboard navigation

2. **GCFooter** (`tests/accessibility/GCFooter.a11y.test.tsx`)
   - Contentinfo landmark
   - Link accessibility
   - Heading hierarchy
   - Semantic HTML structure
   - Color contrast

3. **ChatPanel** (`tests/accessibility/ChatPanel.a11y.test.tsx`)
   - Form control labeling
   - Heading hierarchy
   - Touch target sizes
   - Keyboard interaction (Enter to send)
   - Message accessibility
   - Loading states
   - Color contrast

4. **BackstagePanel** (`tests/accessibility/BackstagePanel.a11y.test.tsx`)
   - Dialog role and ARIA attributes
   - Focus trap
   - Keyboard navigation (Tab, Escape)
   - Close button accessibility
   - Touch target sizes
   - Color contrast

5. **Full Application** (`tests/accessibility/App.a11y.test.tsx`)
   - Complete document structure
   - Landmark regions
   - Skip link integration
   - Page title
   - Image alt text
   - Form labels
   - ARIA roles
   - Responsive design

## WCAG 2.2 Compliance Checklist

### Level A (Minimum)
- ✅ 1.1.1 Non-text Content: All images have alt text or aria-hidden
- ✅ 1.3.1 Info and Relationships: Semantic HTML and ARIA landmarks
- ✅ 2.1.1 Keyboard: All functionality available via keyboard
- ✅ 2.4.1 Bypass Blocks: Skip link to main content
- ✅ 2.4.2 Page Titled: Descriptive page titles
- ✅ 3.1.1 Language of Page: HTML lang attribute
- ✅ 4.1.2 Name, Role, Value: Proper ARIA attributes

### Level AA (Target)
- ✅ 1.4.3 Contrast (Minimum): 4.5:1 for text, 3:1 for large text
- ✅ 1.4.5 Images of Text: Text used instead of images
- ✅ 2.4.6 Headings and Labels: Descriptive headings
- ✅ 2.4.7 Focus Visible: Visible focus indicators
- ✅ 3.1.2 Language of Parts: Language changes marked

### Level AAA (Stretch Goal)
- ✅ 1.4.6 Contrast (Enhanced): 7:1 for text (achieved in GC color palette)
- ✅ 2.4.8 Location: User knows where they are
- ✅ 2.5.5 Target Size: 44x44px minimum touch targets
- ✅ 3.2.4 Consistent Identification: Components consistently identified

## GC Design System Requirements

### Mandatory Elements
- ✅ Canada wordmark in header
- ✅ Official bilingual branding
- ✅ GC header with 4px bottom border
- ✅ GC footer with required links
- ✅ Skip to main content link
- ✅ Lato / Noto Sans typography
- ✅ GC color palette (oklch values)

### Accessibility Features
- ✅ ARIA landmarks (banner, main, contentinfo, navigation)
- ✅ Semantic HTML5 elements
- ✅ Keyboard navigation support
- ✅ Screen reader announcements (aria-live regions)
- ✅ Focus management in modals
- ✅ High contrast colors (7:1+ ratios)
- ✅ Responsive touch targets (44px minimum)

## Manual Testing Checklist

While automated tests catch many issues, manual testing is still required:

### Keyboard Navigation
- [ ] Tab through all interactive elements in logical order
- [ ] Shift+Tab moves backwards correctly
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals and dialogs
- [ ] Arrow keys navigate within components (dropdowns, lists)
- [ ] Focus is always visible
- [ ] Focus doesn't get trapped (except in modals)

### Screen Reader Testing
Test with at least one of:
- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

Check:
- [ ] All content is announced
- [ ] Headings navigate properly
- [ ] Landmarks are identified
- [ ] Form labels are associated
- [ ] Button purposes are clear
- [ ] Link destinations are clear
- [ ] Dynamic content updates are announced

### Visual Testing
- [ ] 200% zoom doesn't break layout
- [ ] Text reflow works at different sizes
- [ ] Color is not the only visual cue
- [ ] Focus indicators are visible
- [ ] Contrast meets requirements (use browser tools)

### Mobile/Touch Testing
- [ ] All touch targets are 44x44px minimum
- [ ] Swipe gestures work (if applicable)
- [ ] Orientation changes work
- [ ] Pinch zoom works
- [ ] No content is hidden on small screens

## Continuous Integration

### GitHub Actions Workflow

The CI pipeline runs accessibility tests on every PR:

```yaml
- name: Run accessibility tests
  run: npm run test:a11y
```

### Lighthouse CI

Automated Lighthouse checks on each deployment:
- **Accessibility Score Target**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥90

## Common Accessibility Issues to Avoid

### ❌ Don't Do This
```tsx
// Missing label
<input type="text" placeholder="Enter name" />

// Button without accessible name
<button><Icon /></button>

// Div used as button
<div onClick={handleClick}>Click me</div>

// Hardcoded text (not i18n)
<h1>Welcome to EVA</h1>

// Poor contrast
<p style={{ color: '#999', background: '#fff' }}>Text</p>
```

### ✅ Do This Instead
```tsx
// Proper label
<label htmlFor="name">Name</label>
<input id="name" type="text" placeholder="e.g. John Doe" />

// Button with accessible name
<button aria-label="Add item">
  <PlusIcon />
</button>

// Semantic button
<button onClick={handleClick}>Click me</button>

// Internationalized text
<h1>{t('chat.title')}</h1>

// GC Design System colors (high contrast)
<p className="text-foreground bg-background">Text</p>
```

## Resources

### Tools
- [axe DevTools Browser Extension](https://www.deque.com/axe/devtools/)
- [Lighthouse in Chrome DevTools](https://developers.google.com/web/tools/lighthouse)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Documentation
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [GC Design System](https://design-system.alpha.canada.ca/en/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)

### GC Standards
- [Standard on Web Accessibility](https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=23601)
- [Guideline on Making Communications Products Accessible](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/guideline-making-communications-products-accessible.html)

## Next Steps

1. **Run the tests**: `npm run test:a11y`
2. **Review failures**: Address any violations found
3. **Manual testing**: Complete the manual checklist above
4. **Screen reader testing**: Test with at least one screen reader
5. **Document issues**: File accessibility issues in GitHub
6. **Continuous improvement**: Regularly audit and update tests

## Success Criteria

EVA-UI accessibility testing is successful when:
- ✅ All automated axe-core tests pass (0 violations)
- ✅ Lighthouse accessibility score ≥95
- ✅ Manual keyboard testing passes
- ✅ Screen reader testing passes
- ✅ WCAG 2.2 Level AA compliance verified
- ✅ GC Design System requirements met
