# Accessibility Features

This document outlines the comprehensive accessibility features implemented in the EVA Sovereign UI design system.

## WCAG 2.1 AA Compliance

The EVA design system meets WCAG 2.1 Level AA standards through the following implementations:

### 1. Perceivable

#### Color Contrast
- All text meets minimum contrast ratios:
  - Normal text (< 18pt): 4.5:1 minimum
  - Large text (≥ 18pt): 3:1 minimum
  - UI components: 3:1 minimum
- High contrast mode support via `@media (prefers-contrast: high)`
- Colors use OKLCH for perceptually uniform color spaces

#### Text Alternatives
- All icons include `aria-hidden="true"` with descriptive button labels
- Images and decorative elements properly marked
- Form inputs have associated labels

#### Adaptable Content
- Semantic HTML structure with proper landmarks (`banner`, `main`, `contentinfo`, `navigation`)
- Logical heading hierarchy (H1 → H2 → H3)
- Content order makes sense when CSS is disabled
- Screen reader-only content for context (`.sr-only` class)

### 2. Operable

#### Keyboard Accessible
- All interactive elements accessible via keyboard
- Logical tab order throughout application
- No keyboard traps
- Skip to main content link (appears on focus)
- Enter and Space keys work on custom interactive elements

#### Focus Management
- Clear focus indicators on all interactive elements
- Focus outline: 2px solid with 2px offset
- Focus visible styles via `:focus-visible` pseudo-class
- Focus restoration after modals/dialogs close
- Focus trap implementation available in utility functions

#### Skip Navigation
- "Skip to main content" link at top of page
- Visible on keyboard focus
- Translatable for bilingual support

### 3. Understandable

#### Readable
- Language of page set on `<html>` element
- Language changes dynamically with locale selection
- Language of parts identified with `lang` attribute
- Clear, simple language in UI text
- Abbreviations and jargon avoided

#### Predictable
- Consistent navigation across all views
- Consistent identification of components
- No automatic context changes
- Components behave consistently

#### Input Assistance
- Form labels properly associated with inputs
- Clear placeholder text
- Error prevention through input validation
- Disabled state clearly indicated
- Required fields identified

### 4. Robust

#### Compatible
- Valid HTML5 semantic markup
- ARIA attributes used correctly:
  - `role` for custom interactive elements
  - `aria-label` for accessible names
  - `aria-labelledby` for label associations
  - `aria-describedby` for descriptions
  - `aria-live` for dynamic content updates
  - `aria-atomic` for complete announcements
  - `aria-hidden` for decorative elements

## Specific Component Implementations

### EVAGCHeader
- `role="banner"` landmark
- Skip to main content link (keyboard accessible)
- Navigation marked with `role="navigation"` and `aria-label`
- Logo marked decorative with `aria-hidden="true"`

### EVAPageShell
- Proper landmark structure (header, main, footer)
- `id="main-content"` target for skip link
- `role="contentinfo"` on footer

### EVALanguageSwitcher
- Button with descriptive `aria-label` including current and target language
- `lang` attribute on button text
- Visual and programmatic indication of current language

### EVAQuickActions
- Section with `aria-labelledby` referencing heading
- Each action is a proper button inside a card
- Icon marked decorative
- Description associated with button via `aria-describedby`
- Keyboard accessible (native button elements)

### EVAChatPanel
- Message list with `role="log"` for chat history
- `aria-live="polite"` for new message announcements
- `aria-atomic="false"` to announce only new messages
- Form semantics for message input
- Loading state announced to screen readers
- Semantic `<time>` elements with `datetime` attribute
- Input labeled with `aria-label`
- Auto-scroll to new messages
- Focus management (returns to input after sending)

### EVAHeroBanner
- Section with `aria-labelledby` referencing heading
- Proper heading structure

## Accessibility Utilities

### useReducedMotion Hook
- Detects `prefers-reduced-motion` user preference
- Returns boolean for conditional animation
- Updates dynamically if preference changes

### useAnnouncer Hook
- Creates persistent ARIA live region
- Provides `announce(message, priority)` function
- Cleans up on unmount

### a11y-utils.ts
Functions for common accessibility patterns:
- `announceToScreenReader(message, priority)` - One-time announcements
- `trapFocus(element)` - Focus trap for modals
- `manageFocus(callback)` - Save and restore focus
- `isReducedMotion()` - Check motion preference
- `getContrastRatio(color1, color2)` - Calculate WCAG contrast

## CSS Accessibility Features

### Screen Reader Only Class
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Focus Visible Styles
```css
*:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --border: oklch(0.40 0 0);
    --input: oklch(0.40 0 0);
  }
}
```

## Internationalization (i18n)

- Bilingual support (English/French for Canadian profiles)
- All UI text translatable via key-based system
- Language switcher accessible and clearly labeled
- HTML `lang` attribute updates dynamically
- RTL support ready (CSS logical properties used)

## Testing Recommendations

### Manual Testing
1. **Keyboard Navigation**: Tab through entire interface
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **Zoom**: Test at 200% zoom level
4. **High Contrast**: Enable high contrast mode
5. **Reduced Motion**: Enable reduced motion preference

### Automated Testing
- axe DevTools for accessibility scanning
- Lighthouse accessibility audit
- WAVE browser extension
- Pa11y for CI/CD integration

### Browser/AT Combinations
- Chrome + NVDA (Windows)
- Firefox + JAWS (Windows)
- Safari + VoiceOver (macOS/iOS)
- Chrome + TalkBack (Android)

## Known Limitations

1. Voice input feature is placeholder only (button implemented, functionality TODO)
2. Profile selector in demo controls could benefit from additional keyboard shortcuts
3. Chat scroll behavior should respect reduced motion preference

## Future Enhancements

1. Add ARIA live region for profile/theme changes
2. Implement roving tabindex for card grids
3. Add keyboard shortcuts documentation
4. Implement focus trap for modal dialogs when added
5. Add ARIA expanded states for collapsible sections
6. Consider ARIA-label translations for dynamic content
