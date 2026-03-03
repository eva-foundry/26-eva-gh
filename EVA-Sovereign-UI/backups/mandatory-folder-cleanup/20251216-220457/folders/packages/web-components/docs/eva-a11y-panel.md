# eva-a11y-panel

Real-time accessibility customization panel with font size, contrast, and animation controls.

## Overview

The `eva-a11y-panel` component provides a user-facing accessibility settings panel that allows users to customize font size, contrast mode, animations, line height, and letter spacing in real-time. Settings persist to `localStorage` and apply instantly (<100ms latency).

## Features

- ✅ **Font size control**: 75% to 200% in 25% steps
- ✅ **Contrast modes**: Standard (AA 4.5:1) and High Contrast (AAA 7:1)
- ✅ **Animation control**: On, Reduced, Off (respects prefers-reduced-motion)
- ✅ **Text spacing**: Line height and letter spacing adjustments
- ✅ **Real-time updates**: Changes apply instantly via CSS custom properties
- ✅ **Persistence**: Settings saved to localStorage
- ✅ **WCAG 2.2 AAA compliant**: Full keyboard navigation, ARIA attributes

## Installation

```bash
npm install @eva/sovereign-ui
```

## Basic Usage

```html
<eva-a11y-panel></eva-a11y-panel>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showActions` | `boolean` | `true` | Show Apply/Reset buttons |
| `immediate` | `boolean` | `true` | Apply changes immediately (vs. on Apply click) |
| `storageKey` | `string` | `'gc-a11y-settings'` | localStorage key for persistence |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `a11y-change` | `{ settings, changes }` | Fires when any setting changes |
| `a11y-apply` | `{ settings }` | Fires when Apply button is clicked |
| `a11y-reset` | `{ settings }` | Fires when Reset button is clicked |

### CSS Custom Properties (Output)

The component sets these CSS custom properties on `document.documentElement`:

```css
--gc-a11y-font-scale: 1 to 2 (100% to 200%)
--gc-a11y-line-height: 1.0 to 2.0
--gc-a11y-letter-spacing: 0em to 0.5em
```

And these data attributes:

```html
<html data-contrast="aa|aaa" data-animations="on|off|reduced">
```

## Examples

### Immediate Mode (Default)

Changes apply instantly as user adjusts controls.

```html
<eva-a11y-panel immediate></eva-a11y-panel>

<p style="font-size: calc(1rem * var(--gc-a11y-font-scale, 1));">
  This text will change size as you adjust the slider.
</p>
```

### Manual Apply Mode

Changes only apply when user clicks "Apply Changes".

```html
<eva-a11y-panel .immediate="${false}"></eva-a11y-panel>
```

### Without Action Buttons

For embedded use cases where you handle state externally.

```html
<eva-a11y-panel .showActions="${false}"></eva-a11y-panel>
```

### Custom Storage Key

```html
<eva-a11y-panel storageKey="my-app-a11y"></eva-a11y-panel>
```

### Listening to Events

```javascript
const panel = document.querySelector('eva-a11y-panel');

panel.addEventListener('a11y-change', (e) => {
  console.log('Settings changed:', e.detail.settings);
  console.log('What changed:', e.detail.changes);
});

panel.addEventListener('a11y-apply', (e) => {
  console.log('Settings applied:', e.detail.settings);
  // Save to backend, analytics, etc.
});

panel.addEventListener('a11y-reset', (e) => {
  console.log('Reset to defaults:', e.detail.settings);
});
```

## Settings Schema

### A11ySettings Interface

```typescript
interface A11ySettings {
  fontSize: number;        // 75-200
  contrast: 'aa' | 'aaa';
  animations: 'on' | 'off' | 'reduced';
  lineHeight: number;      // 1.0-2.0
  letterSpacing: number;   // 0-0.5em
}
```

### Default Settings

```javascript
{
  fontSize: 100,
  contrast: 'aa',
  animations: 'on',
  lineHeight: 1.5,
  letterSpacing: 0
}
```

## Using Settings in CSS

### Font Size

```css
body {
  font-size: calc(1rem * var(--gc-a11y-font-scale, 1));
}

h1 {
  font-size: calc(2rem * var(--gc-a11y-font-scale, 1));
}
```

### Contrast Mode

```css
/* Standard (AA) */
.text {
  color: #333333;
  background: #ffffff;
}

/* High Contrast (AAA) */
[data-contrast="aaa"] .text {
  color: #000000;
  background: #ffffff;
}
```

### Animations

```css
.animated {
  transition: all 300ms ease-in-out;
}

/* Reduced motion */
[data-animations="reduced"] .animated {
  transition-duration: 100ms;
}

/* No animations */
[data-animations="off"] .animated {
  transition: none;
}
```

### Text Spacing

```css
p {
  line-height: var(--gc-a11y-line-height, 1.5);
  letter-spacing: var(--gc-a11y-letter-spacing, 0);
}
```

## Accessibility

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between controls
- **Arrow Up/Down**: Adjust sliders
- **Space**: Toggle radio buttons
- **Enter**: Activate buttons

### ARIA Attributes

- Sliders have `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Radio groups have `role="radiogroup"` and `aria-label`
- Descriptive labels for all controls
- Info boxes with contextual help

### Screen Reader Support

- All controls have accessible names
- Current values are announced as user adjusts sliders
- Help text provides guidance for each setting

## Integration with Live Preview

```html
<eva-backstage-shell title="Accessibility">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <eva-a11y-panel></eva-a11y-panel>
    
    <eva-live-preview 
      src="/preview" 
      syncA11y>
    </eva-live-preview>
  </div>
</eva-backstage-shell>
```

The preview automatically receives `a11y-change` events and updates in real-time.

## Persistence

Settings are automatically saved to `localStorage` when user clicks "Apply" (or immediately if `immediate` is true).

### Checking Stored Settings

```javascript
const stored = localStorage.getItem('gc-a11y-settings');
if (stored) {
  const settings = JSON.parse(stored);
  console.log('Saved settings:', settings);
}
```

### Clearing Settings

```javascript
localStorage.removeItem('gc-a11y-settings');
```

Or click the "Reset to Defaults" button.

## WCAG Compliance

This component helps applications meet:

- **WCAG 2.1 SC 1.4.4** (Resize text): Font size up to 200%
- **WCAG 2.1 SC 1.4.6** (Contrast - Enhanced): AAA mode with 7:1 ratio
- **WCAG 2.1 SC 1.4.12** (Text Spacing): Adjustable line height and letter spacing
- **WCAG 2.2 SC 2.3.3** (Animation from Interactions): Animation control

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All browsers supporting Web Components v1 and CSS Custom Properties

## Related Components

- [eva-backstage-shell](./eva-backstage-shell.md) - Panel container
- [eva-live-preview](./eva-live-preview.md) - Real-time preview
- [eva-theme-panel](./eva-theme-panel.md) - Theme customization

## Changelog

### v1.0.0 (2025-12-12)
- Initial release
- REQ-2025-12-12-002 Phase 1 implementation
- Font size, contrast, animations, line height, letter spacing controls
- localStorage persistence
- WCAG 2.2 AAA compliance
