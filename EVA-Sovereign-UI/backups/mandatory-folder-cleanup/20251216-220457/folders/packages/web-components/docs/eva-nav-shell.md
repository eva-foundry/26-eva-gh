# eva-nav-shell

Navigation shell component for EVA Suite applications with sidebar and tabs modes.

## Overview

The `eva-nav-shell` component provides a complete navigation structure for single-page or multi-page applications. It supports two modes: sidebar (vertical navigation) and tabs (horizontal navigation), with full keyboard accessibility and mobile responsive behavior.

## Features

- ✅ **Two modes**: Sidebar (vertical) and Tabs (horizontal)
- ✅ **Mobile responsive**: Hamburger menu on mobile, always-visible on desktop
- ✅ **Keyboard navigation**: Tab, Arrow keys, Enter, Escape
- ✅ **WCAG 2.2 AAA compliant**: Full keyboard support, ARIA landmarks
- ✅ **Collapsible sidebar**: Icon-only mode for space-saving
- ✅ **Skip to content link**: Accessible navigation bypass

## Installation

```bash
npm install @eva/sovereign-ui
```

## Basic Usage

### Sidebar Mode

```html
<eva-nav-shell mode="sidebar">
  <div slot="header">
    <img src="/logo.png" alt="EVA Suite">
  </div>
  
  <nav slot="nav-items">
    <a href="/dashboard">Dashboard</a>
    <a href="/chat">Chat</a>
    <a href="/settings">Settings</a>
  </nav>
  
  <main>
    <!-- Your main content -->
  </main>
</eva-nav-shell>
```

### Tabs Mode

```html
<eva-nav-shell mode="tabs">
  <nav slot="nav-items">
    <a href="/tab1">Tab 1</a>
    <a href="/tab2">Tab 2</a>
    <a href="/tab3">Tab 3</a>
  </nav>
  
  <main>
    <!-- Your main content -->
  </main>
</eva-nav-shell>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `'sidebar' \| 'tabs'` | `'sidebar'` | Navigation mode |
| `open` | `boolean` | `false` | Sidebar open state (sidebar mode only) |
| `collapsed` | `boolean` | `false` | Collapsed sidebar (desktop only, sidebar mode) |
| `navLabel` | `string` | `''` | Custom ARIA label for navigation |
| `items` | `NavItem[]` | `[]` | Navigation items (programmatic use) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `nav-toggle` | `{ open: boolean }` | Fires when sidebar is toggled |
| `nav-change` | `{ item: NavItem }` | Fires when navigation item is selected |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Main content area |
| `header` | Sidebar header (logo, app name) |
| `nav-items` | Navigation items |

### Methods

None (stateless component, controlled via properties)

## Examples

### Collapsible Sidebar

```html
<eva-nav-shell mode="sidebar" collapsed>
  <div slot="header">🚀</div>
  
  <nav slot="nav-items">
    <a href="/" title="Dashboard">🏠</a>
    <a href="/chat" title="Chat">💬</a>
    <a href="/settings" title="Settings">⚙️</a>
  </nav>
  
  <main>Content</main>
</eva-nav-shell>
```

### Custom Navigation Label

```html
<eva-nav-shell navLabel="Main application navigation">
  <!-- ... -->
</eva-nav-shell>
```

### Listening to Events

```javascript
const navShell = document.querySelector('eva-nav-shell');

navShell.addEventListener('nav-toggle', (e) => {
  console.log('Sidebar is now:', e.detail.open ? 'open' : 'closed');
});
```

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus to navigation items
- **Arrow Up/Down** (sidebar) or **Arrow Left/Right** (tabs): Navigate between items
- **Enter**: Activate focused item
- **Escape**: Close sidebar (sidebar mode)
- **Home**: Focus first item
- **End**: Focus last item

### ARIA Landmarks

- `role="navigation"` on navigation container
- `aria-label` for navigation description
- `aria-expanded` on sidebar toggle button
- Skip to content link (visible on keyboard focus)

### Screen Reader Support

- Navigation state changes are announced
- Sidebar open/close state is communicated
- Current page/section is indicated with `aria-current`

## Styling

### CSS Custom Properties

```css
:root {
  --eva-nav-sidebar-width: 280px;
  --eva-nav-sidebar-collapsed-width: 64px;
  --eva-nav-background: #26374A;
  --eva-nav-color: #ffffff;
  --eva-nav-border-color: rgba(255, 255, 255, 0.1);
}
```

### Responsive Breakpoints

- **Mobile** (<768px): Sidebar slides in as overlay
- **Desktop** (≥768px): Sidebar always visible

## Integration with EVA Backstage

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
    <a href="/chat">Chat</a>
  </nav>
  
  <main>
    <eva-chat-panel></eva-chat-panel>
  </main>
</eva-nav-shell>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All browsers supporting Web Components v1

## Related Components

- [eva-backstage-shell](./eva-backstage-shell.md) - Customization panel
- [eva-breadcrumbs](./eva-breadcrumbs.md) - Breadcrumb navigation
- [eva-tabs](./eva-tabs.md) - Tab component

## Changelog

### v1.0.0 (2025-12-12)
- Initial release
- REQ-2025-12-12-002 Phase 1 implementation
