# Troubleshooting Guide

Common issues and solutions when using EVA-Sovereign-UI Web Components.

## TypeScript Errors

### "Cannot find module '@eva-sovereign/web-components'"

**Problem**: TypeScript can't resolve the package.

**Solution**: 
1. Ensure package is installed: `npm install @eva-sovereign/web-components`
2. Check `node_modules/@eva-sovereign/web-components/package.json` exists
3. Restart TypeScript server in your IDE

### "Property 'eva-button' does not exist on type 'JSX.IntrinsicElements'"

**Problem**: TypeScript doesn't recognize Web Component tags.

**Solution**: Add type declarations:

```typescript
// src/global.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'eva-button': any;
      'eva-input': any;
      'eva-select': any;
      // Add other components...
    }
  }
}

export {};
```

For full type safety, import component types:

```typescript
import type { EVAButton, EVAInput } from '@eva-sovereign/web-components';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'eva-button': React.DetailedHTMLProps<React.HTMLAttributes<EVAButton>, EVAButton>;
      'eva-input': React.DetailedHTMLProps<React.HTMLAttributes<EVAInput>, EVAInput>;
    }
  }
}
```

### "Type 'undefined' is not assignable to type 'string'"

**Problem**: Strict TypeScript mode requires explicit types for event details.

**Solution**: Type cast custom events:

```typescript
const handleInput = (e: Event) => {
  const customEvent = e as CustomEvent<{ value: string }>;
  console.log(customEvent.detail.value); // ✅ Typed correctly
};
```

## Import Issues

### "Failed to resolve module specifier 'lit'"

**Problem**: Browser can't resolve bare module imports in dev mode.

**Solution**: Use a bundler (Vite, Webpack, Rollup) or import map:

```html
<script type="importmap">
{
  "imports": {
    "lit": "https://cdn.jsdelivr.net/npm/lit@3/+esm",
    "@eva-sovereign/web-components": "./node_modules/@eva-sovereign/web-components/dist/index.js"
  }
}
</script>
```

### "Uncaught SyntaxError: Unexpected token 'export'"

**Problem**: Browser doesn't support ES modules.

**Solution**: 
1. Use `<script type="module">` for imports
2. Ensure server sends correct MIME type (`application/javascript`)
3. Use a bundler for production (Vite, Webpack)

## Component Not Rendering

### Component shows as `<eva-button></eva-button>` in DOM but doesn't render

**Problem**: Component not registered.

**Solution**: Import the component:

```javascript
import '@eva-sovereign/web-components';
// or specific component
import '@eva-sovereign/web-components/eva-button.js';
```

### Component renders but has no styles

**Problem**: Shadow DOM styles not loaded.

**Solution**: Check browser console for errors. Ensure Lit styles are imported correctly.

### Component children don't show

**Problem**: Slots not used correctly.

**Solution**: Use named slots for specific areas:

```html
<!-- ❌ Wrong -->
<eva-card>
  <div class="header">Title</div>
</eva-card>

<!-- ✅ Right -->
<eva-card>
  <div slot="header">Title</div>
</eva-card>
```

## Event Issues

### Events not firing

**Problem**: Event listener not attached or wrong event name.

**Solution**: 
1. Check event name (must be `eva-*`, not `on*`)
2. Attach listener to correct element
3. Use browser DevTools to verify event is dispatched

```javascript
// ❌ Wrong
button.addEventListener('click', handler);

// ✅ Right
button.addEventListener('eva-click', handler);
```

### Events fire but detail is undefined

**Problem**: Accessing wrong property.

**Solution**: Custom events use `detail` property:

```javascript
// ❌ Wrong
const handleInput = (e) => {
  console.log(e.value); // undefined
};

// ✅ Right
const handleInput = (e) => {
  console.log(e.detail.value); // ✅ Correct
};
```

## Styling Issues

### Can't override component styles

**Problem**: Shadow DOM encapsulation prevents external styles.

**Solution**: Use CSS custom properties or wrapper styling:

```css
/* ❌ Won't work (Shadow DOM blocks) */
eva-button {
  background-color: red;
}

/* ✅ Style the wrapper */
.button-container eva-button {
  margin: 1rem;
}

/* ✅ Use CSS custom properties (if provided) */
eva-button {
  --button-bg: red;
}
```

### Styles conflict between components

**Problem**: Global styles leak into components.

**Solution**: Shadow DOM should prevent this. Check if you're using `::part()` or `::slotted()` incorrectly.

### Fonts not loading

**Problem**: Web fonts need to be loaded in both light DOM and shadow DOM.

**Solution**: Import fonts in both your app CSS and component CSS, or use GC Design System fonts (Lato, Noto Sans) which are loaded globally.

## Accessibility Issues

### Screen reader not announcing changes

**Problem**: ARIA live regions not configured.

**Solution**: Components use `LiveRegionManager` internally. For custom announcements:

```javascript
import { getLiveRegionManager } from '@eva-sovereign/web-components';

const liveRegion = getLiveRegionManager();
liveRegion.announce('Form submitted successfully', 'polite');
```

### Keyboard navigation not working

**Problem**: Focus not managed correctly.

**Solution**:
1. Check `tabindex` attributes (should be 0 or -1)
2. Ensure components are inside `<form>` if needed
3. Use browser DevTools to verify focus order

### Color contrast failing WCAG

**Problem**: Custom colors don't meet 7:1 contrast ratio.

**Solution**: Use GC Design System colors which are WCAG 2.2 AAA compliant:
- Text on white: `#333333` (>7:1)
- Primary blue: `#284162` (>7:1 on white)
- Error red: `#d3080c` (>7:1 on white)

## Locale / i18n Issues

### Translations not showing

**Problem**: Locale not set or messages not registered.

**Solution**:

```javascript
import { setGlobalLocale, registerMessages } from '@eva-sovereign/web-components';

// Set locale
setGlobalLocale('fr-CA');

// Register custom messages
registerMessages('my-component', {
  'en-CA': { greeting: 'Hello' },
  'fr-CA': { greeting: 'Bonjour' },
});
```

### Locale changes don't update components

**Problem**: Components not subscribed to locale changes.

**Solution**: EVA components auto-subscribe. For custom components, use:

```javascript
import { subscribeToLocale } from '@eva-sovereign/web-components';

connectedCallback() {
  this._unsubscribe = subscribeToLocale(() => {
    this.requestUpdate(); // Re-render
  });
}

disconnectedCallback() {
  this._unsubscribe?.();
}
```

## Performance Issues

### Slow initial load

**Problem**: Large bundle size.

**Solution**:
1. Use code splitting: `import('@eva-sovereign/web-components')`
2. Import only needed components: `import '@eva-sovereign/web-components/eva-button.js'`
3. Use CDN for production

### Components re-render too often

**Problem**: Reactive properties trigger unnecessary updates.

**Solution**: Use `@state()` for internal state, `@property()` only for external props.

## Framework-Specific Issues

### React: "Warning: Unknown event handler property"

**Problem**: React doesn't recognize `eva-*` events.

**Solution**: Use `ref` + `addEventListener` instead of JSX props.

### Vue: "Failed to resolve component"

**Problem**: Vue trying to resolve Web Component as Vue component.

**Solution**: Configure Vue to ignore custom elements:

```javascript
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('eva-');
```

### Angular: "Component not found"

**Problem**: Angular doesn't recognize Web Components.

**Solution**: Add `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Browser Compatibility

### Component not working in IE11

**Problem**: Web Components require modern browsers.

**Solution**: IE11 is not supported. Minimum supported browsers:
- Chrome 67+
- Firefox 63+
- Safari 13.1+
- Edge 79+

For older browsers, use polyfills or consider a React/Vue wrapper.

### Shadow DOM not working in Safari < 13

**Problem**: Older Safari versions have limited Shadow DOM support.

**Solution**: Update to Safari 13.1+ or use polyfills.

## Development Issues

### Hot reload not working

**Problem**: Vite/Webpack not detecting Web Component changes.

**Solution**: 
1. Restart dev server
2. Clear browser cache
3. Check `vite.config.ts` includes `.ts` files in watch

### Build fails with "Cannot find module"

**Problem**: Build tool can't resolve dependencies.

**Solution**:
1. Run `npm install` to ensure all dependencies installed
2. Check `tsconfig.json` includes correct paths
3. Verify `package.json` exports are correct

## Still Having Issues?

1. **Check Browser Console**: Look for error messages
2. **Check Network Tab**: Verify files are loading
3. **Use Storybook**: Test components in isolation (`npm run storybook`)
4. **Check GitHub Issues**: Search for similar problems
5. **Open New Issue**: Provide minimal reproduction case

**Useful Debug Commands**:
```bash
# Check TypeScript compilation
npm run build

# Run tests
npm run test

# Check linting
npm run lint

# Generate API docs
npm run docs

# Build Storybook
npm run build-storybook
```
