# eva-live-preview

Real-time iframe preview with postMessage communication for customization changes.

## Overview

The `eva-live-preview` component embeds an iframe with bidirectional `postMessage` communication, enabling real-time preview updates without page reload. It automatically syncs with `a11y-change`, `theme-change`, and `i18n-change` events, updating the preview in <100ms.

## Features

- ✅ **Iframe embedding**: Sandboxed iframe with security controls
- ✅ **postMessage API**: Bidirectional communication with iframe
- ✅ **Auto-sync events**: Automatically forwards a11y/theme/i18n changes
- ✅ **Loading state**: Spinner while iframe loads
- ✅ **Error handling**: Retry button if iframe fails to load
- ✅ **Message listeners**: Register callbacks for specific message types
- ✅ **Security**: Origin validation, sandbox attributes

## Installation

```bash
npm install @eva/sovereign-ui
```

## Basic Usage

```html
<eva-live-preview 
  src="/preview" 
  iframeTitle="Live preview">
</eva-live-preview>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | `''` | Preview page URL (iframe src) |
| `iframeTitle` | `string` | `''` | Iframe title for accessibility |
| `showLoading` | `boolean` | `true` | Show loading indicator |
| `targetOrigin` | `string` | `window.location.origin` | Target origin for postMessage |
| `syncA11y` | `boolean` | `true` | Auto-sync a11y-change events |
| `syncTheme` | `boolean` | `true` | Auto-sync theme-change events |
| `syncI18n` | `boolean` | `true` | Auto-sync i18n-change events |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `preview-ready` | `{ src }` | Fires when iframe loads successfully |
| `preview-error` | `{ src }` | Fires when iframe fails to load |
| `preview-message` | `PreviewMessage` | Fires when message is received from iframe |

### Methods

| Method | Arguments | Description |
|--------|-----------|-------------|
| `sendMessage(message)` | `PreviewMessage` | Send message to iframe |
| `updateA11y(settings)` | `Partial<A11ySettings>` | Send a11y update to iframe |
| `updateTheme(theme)` | `Record<string, any>` | Send theme update to iframe |
| `updateI18n(translations)` | `Record<string, any>` | Send i18n update to iframe |
| `updateConfig(config)` | `Record<string, any>` | Send full config update |
| `reload()` | - | Reload iframe |
| `onMessage(type, callback)` | `string, Function` | Register message listener |
| `offMessage(type, callback)` | `string, Function` | Unregister message listener |

## Examples

### Basic Preview

```html
<eva-live-preview 
  src="/preview-page.html" 
  iframeTitle="Application preview">
</eva-live-preview>
```

### Sending Messages

```javascript
const preview = document.querySelector('eva-live-preview');

// Send a11y update
preview.updateA11y({
  fontSize: 125,
  contrast: 'aaa'
});

// Send theme update
preview.updateTheme({
  primaryColor: '#0050b3',
  mode: 'dark'
});

// Send i18n update
preview.updateI18n({
  'app.title': 'Titre de l\'application'
});

// Send custom message
preview.sendMessage({
  type: 'custom-event',
  data: { foo: 'bar' }
});
```

### Receiving Messages

```javascript
const preview = document.querySelector('eva-live-preview');

// Method 1: Register callback
preview.onMessage('status-update', (data) => {
  console.log('Status:', data.status);
});

// Method 2: Listen to preview-message event
preview.addEventListener('preview-message', (e) => {
  console.log('Message type:', e.detail.type);
  console.log('Message data:', e.detail.data);
});
```

### Listening to Load Events

```javascript
const preview = document.querySelector('eva-live-preview');

preview.addEventListener('preview-ready', (e) => {
  console.log('Preview loaded:', e.detail.src);
});

preview.addEventListener('preview-error', (e) => {
  console.error('Preview failed:', e.detail.src);
});
```

### Custom Target Origin

For cross-origin iframes, specify the target origin for security.

```html
<eva-live-preview 
  src="https://preview.example.com" 
  targetOrigin="https://preview.example.com">
</eva-live-preview>
```

### Disable Auto-Sync

If you want to manually control when updates are sent.

```html
<eva-live-preview 
  src="/preview"
  .syncA11y="${false}"
  .syncTheme="${false}"
  .syncI18n="${false}">
</eva-live-preview>
```

## Message Protocol

### Message Structure

```typescript
interface PreviewMessage {
  type: 'a11y-update' | 'theme-update' | 'i18n-update' | 'config-update' | string;
  data: any;
}
```

### Standard Message Types

| Type | Data | Description |
|------|------|-------------|
| `a11y-update` | `Partial<A11ySettings>` | Accessibility settings changed |
| `theme-update` | `Record<string, any>` | Theme settings changed |
| `i18n-update` | `Record<string, any>` | Translation strings changed |
| `config-update` | `Record<string, any>` | Full configuration update |

### Iframe-Side Implementation

Your preview page should listen for messages:

```html
<!-- preview-page.html -->
<script>
window.addEventListener('message', (e) => {
  // Security: Verify origin
  if (e.origin !== window.location.origin) {
    console.warn('Untrusted origin:', e.origin);
    return;
  }
  
  const message = e.data;
  
  switch (message.type) {
    case 'a11y-update':
      applyA11ySettings(message.data);
      break;
    case 'theme-update':
      applyTheme(message.data);
      break;
    case 'i18n-update':
      updateTranslations(message.data);
      break;
  }
});

function applyA11ySettings(settings) {
  if (settings.fontSize) {
    document.documentElement.style.setProperty(
      '--gc-a11y-font-scale',
      settings.fontSize / 100
    );
  }
  if (settings.contrast) {
    document.documentElement.setAttribute('data-contrast', settings.contrast);
  }
}
</script>
```

## Integration with Backstage

```html
<eva-backstage-shell title="Customization">
  <div style="display: grid; grid-template-columns: 400px 1fr; gap: 2rem;">
    <!-- Settings panel -->
    <div>
      <eva-a11y-panel></eva-a11y-panel>
    </div>
    
    <!-- Live preview -->
    <eva-live-preview 
      src="/preview" 
      syncA11y>
    </eva-live-preview>
  </div>
</eva-backstage-shell>
```

When user adjusts accessibility settings:
1. `eva-a11y-panel` fires `a11y-change` event
2. `eva-live-preview` (with `syncA11y=true`) catches event
3. Sends `postMessage` to iframe
4. Preview updates in <100ms

## Security

### Origin Validation

Always set `targetOrigin` to specific domain (never `"*"` in production):

```javascript
preview.targetOrigin = 'https://preview.example.com';
```

### Sandbox Attributes

The iframe has restricted permissions:

```html
sandbox="allow-scripts allow-same-origin allow-forms"
```

### Message Validation

The component validates message origin before processing:

```javascript
if (e.origin !== this.targetOrigin && this.targetOrigin !== '*') {
  console.warn('Received message from untrusted origin:', e.origin);
  return;
}
```

### Best Practices

1. Use same-origin iframes when possible
2. Set specific `targetOrigin` (not wildcard)
3. Validate message structure before processing
4. Enable CORS only for trusted domains
5. Use HTTPS for cross-origin previews

## Performance

- **Latency**: <100ms from event to iframe update
- **Debouncing**: Not built-in; implement if needed
- **Message size**: Keep data payloads small (<1KB)

### Optimizing for Many Updates

If sending frequent updates, debounce:

```javascript
let timeout;
panel.addEventListener('a11y-change', (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    preview.updateA11y(e.detail.settings);
  }, 100);
});
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All browsers supporting postMessage API

## Troubleshooting

### Preview not loading

- Check `src` URL is correct and accessible
- Verify CORS headers if cross-origin
- Check browser console for iframe errors

### Messages not received

- Verify `targetOrigin` matches iframe origin
- Check iframe has message listener implemented
- Use browser DevTools to inspect postMessage calls

### Cross-origin issues

- Use same-origin preview when possible
- Configure CORS headers on preview server
- Set `targetOrigin` to specific domain

## Related Components

- [eva-a11y-panel](./eva-a11y-panel.md) - Accessibility settings
- [eva-theme-panel](./eva-theme-panel.md) - Theme customization
- [eva-i18n-panel](./eva-i18n-panel.md) - i18n editor
- [eva-backstage-shell](./eva-backstage-shell.md) - Panel container

## Changelog

### v1.0.0 (2025-12-12)
- Initial release
- REQ-2025-12-12-002 Phase 1 implementation
- postMessage communication
- Auto-sync for a11y/theme/i18n events
- Loading and error states
- Security features (origin validation, sandbox)
