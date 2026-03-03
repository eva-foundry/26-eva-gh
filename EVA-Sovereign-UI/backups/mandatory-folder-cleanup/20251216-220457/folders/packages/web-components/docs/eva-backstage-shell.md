# eva-backstage-shell

Slide-in customization panel for EVA Suite applications.

## Overview

The `eva-backstage-shell` component provides a slide-in panel (from right or left) for housing customization settings like accessibility, theme, i18n, and feature toggles. It includes a focus trap, Escape key handling, and WCAG 2.2 AAA compliance.

## Features

- ✅ **Slide-in animation**: Smooth CSS transform from right or left
- ✅ **Focus trap**: Keyboard focus stays inside panel when open
- ✅ **Escape to close**: Closes panel and restores previous focus
- ✅ **WCAG 2.2 AAA compliant**: Full keyboard support, ARIA dialog
- ✅ **Customizable width**: Set any CSS width value
- ✅ **Optional trigger**: Default gear icon or custom button

## Installation

```bash
npm install @eva/sovereign-ui
```

## Basic Usage

```html
<eva-backstage-shell title="Settings">
  <div>
    <h3>Panel Content</h3>
    <p>Customization panels go here.</p>
  </div>
</eva-backstage-shell>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Panel open state |
| `position` | `'right' \| 'left'` | `'right'` | Panel slide direction |
| `width` | `string` | `'480px'` | Panel width (CSS value) |
| `title` | `string` | `''` | Panel title |
| `showTrigger` | `boolean` | `true` | Show default gear icon trigger |
| `triggerLabel` | `string` | `''` | ARIA label for trigger button |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `backstage-open` | - | Fires when panel opens |
| `backstage-close` | - | Fires when panel closes |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Panel content |
| `trigger` | Custom trigger button |
| `nav` | Navigation tabs for panel sections |

### Methods

| Method | Arguments | Description |
|--------|-----------|-------------|
| `openPanel()` | - | Opens the panel programmatically |
| `close()` | - | Closes the panel programmatically |

## Examples

### With Accessibility Panel

```html
<eva-backstage-shell title="Accessibility Settings" width="500px">
  <eva-a11y-panel></eva-a11y-panel>
</eva-backstage-shell>
```

### Left Position

```html
<eva-backstage-shell position="left" title="Settings">
  <div>Panel content</div>
</eva-backstage-shell>
```

### Custom Trigger Button

```html
<eva-backstage-shell .showTrigger="${false}">
  <button slot="trigger">Open Settings</button>
  <div>Panel content</div>
</eva-backstage-shell>
```

### With Navigation Tabs

```html
<eva-backstage-shell title="Customization">
  <nav slot="nav">
    <button>Accessibility</button>
    <button>Theme</button>
    <button>i18n</button>
  </nav>
  
  <eva-a11y-panel></eva-a11y-panel>
</eva-backstage-shell>
```

### Programmatic Control

```javascript
const backstage = document.querySelector('eva-backstage-shell');

// Open panel
backstage.openPanel();

// Close panel
backstage.close();

// Listen to events
backstage.addEventListener('backstage-open', () => {
  console.log('Panel opened');
});

backstage.addEventListener('backstage-close', () => {
  console.log('Panel closed');
});
```

## Accessibility

### Keyboard Navigation

- **Escape**: Closes panel
- **Tab**: Moves focus between interactive elements inside panel
- **Shift+Tab**: Moves focus backward (trapped inside panel)

### ARIA Attributes

- `role="dialog"` on panel
- `aria-modal="true"` for modal behavior
- `aria-labelledby` pointing to panel title
- `aria-expanded` on trigger button

### Focus Management

1. When panel opens, focus moves to close button
2. Focus is trapped inside panel (cannot Tab out)
3. When panel closes, focus returns to trigger button

### Screen Reader Support

- Panel title is announced when opened
- Panel state (open/closed) is communicated
- Interactive elements have descriptive labels

## Styling

### CSS Custom Properties

```css
:root {
  --backstage-width: 480px;
  --backstage-background: #ffffff;
  --backstage-overlay-color: rgba(0, 0, 0, 0.5);
  --backstage-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
  --backstage-transition-duration: 300ms;
}
```

### Responsive Behavior

- **Mobile** (<768px): Panel takes full width (100vw)
- **Desktop** (≥768px): Panel uses configured width (default 480px)

## Integration Examples

### With EVA Navigation Shell

```html
<eva-nav-shell mode="sidebar">
  <div slot="header">
    EVA Suite
    <eva-backstage-shell>
      <eva-a11y-panel></eva-a11y-panel>
    </eva-backstage-shell>
  </div>
  
  <nav slot="nav-items">
    <a href="/dashboard">Dashboard</a>
  </nav>
  
  <main>Content</main>
</eva-nav-shell>
```

### Multi-Panel Backstage

```html
<eva-backstage-shell title="Customization">
  <nav slot="nav">
    <button id="a11y-tab" aria-selected="true">Accessibility</button>
    <button id="theme-tab" aria-selected="false">Theme</button>
    <button id="i18n-tab" aria-selected="false">i18n</button>
  </nav>
  
  <div id="a11y-content">
    <eva-a11y-panel></eva-a11y-panel>
  </div>
  
  <div id="theme-content" hidden>
    <eva-theme-panel></eva-theme-panel>
  </div>
  
  <div id="i18n-content" hidden>
    <eva-i18n-panel></eva-i18n-panel>
  </div>
</eva-backstage-shell>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All browsers supporting Web Components v1

## Security Considerations

- Panel content is sandboxed via Shadow DOM
- No inline scripts executed
- Content Security Policy (CSP) compatible

## Related Components

- [eva-a11y-panel](./eva-a11y-panel.md) - Accessibility settings
- [eva-theme-panel](./eva-theme-panel.md) - Theme customization
- [eva-i18n-panel](./eva-i18n-panel.md) - i18n editor
- [eva-nav-shell](./eva-nav-shell.md) - Navigation container

## Changelog

### v1.0.0 (2025-12-12)
- Initial release
- REQ-2025-12-12-002 Phase 1 implementation
