# EVA-Sovereign-UI

**A standards-based web components design system for government applications**

EVA-Sovereign-UI is a framework-agnostic component library built with Web Components (Custom Elements + Shadow DOM) that implements government design patterns with strong accessibility, internationalization, and theming support. It's specifically designed for public-sector applications across Five Eyes countries.

## 🎯 Features

- **Standards-Based Web Components** - No framework lock-in, use with React, Vue, Angular, or vanilla JS
- **Government Design Patterns** - Based on Government of Canada design system with extensible sovereign profiles
- **WCAG 2.1 AA Accessible** - Built with accessibility as a core requirement
- **Internationalized** - Full i18n support with en-CA and fr-CA translations
- **Themeable** - CSS custom properties enable easy theming per sovereign profile
- **Shadow DOM Encapsulation** - Styles don't leak, components are truly isolated

## 🏗️ Project Structure

```
.
├── packages/eva-sovereign-ui-wc/    # Web components library
│   ├── src/
│   │   ├── components/              # Web component implementations
│   │   │   ├── eva-button.ts
│   │   │   ├── eva-gc-header.ts
│   │   │   ├── eva-page-shell.ts
│   │   │   ├── eva-hero-banner.ts
│   │   │   ├── eva-language-switcher.ts
│   │   │   ├── eva-quick-actions.ts
│   │   │   └── eva-chat-panel.ts
│   │   ├── tokens/                  # Design tokens and profiles
│   │   │   ├── design-tokens.ts
│   │   │   └── sovereign-profiles.ts
│   │   ├── themes/                  # CSS theme files
│   │   │   ├── canada-gc.css
│   │   │   ├── uk-gov.css
│   │   │   └── us-gov.css
│   │   ├── i18n/                    # Internationalization
│   │   │   ├── en-CA.json
│   │   │   ├── fr-CA.json
│   │   │   └── i18n-service.ts
│   │   ├── a11y/                    # Accessibility helpers
│   │   │   └── focus-management.ts
│   │   └── index.ts                 # Main entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── apps/demo/                       # Demo application
    ├── index.html
    └── demo.js
```

## 🚀 Quick Start

### Running the Demo

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser to the demo:**
   Navigate to `http://localhost:5173/apps/demo/` (or the port shown in your terminal)

3. **Explore the features:**
   - Use the demo controls in the top-right to switch between sovereign profiles
   - Toggle between English (EN) and French (FR) using the language switcher
   - Interact with the quick actions cards
   - Try the EVA chat panel with simulated responses

### Using in Your Own Project

#### Option 1: Import as ES Module (Recommended)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Government App</title>
  
  <!-- Include theme CSS -->
  <link rel="stylesheet" href="path/to/eva-sovereign-ui-wc/dist/themes/canada-gc.css">
</head>
<body class="eva-theme-canada_gc_intranet">
  
  <!-- Use components declaratively -->
  <eva-page-shell>
    <eva-gc-header slot="header" app-name-key="app.name"></eva-gc-header>
    
    <eva-hero-banner 
      title-key="hero.title" 
      description-key="hero.description">
    </eva-hero-banner>
    
    <eva-quick-actions></eva-quick-actions>
  </eva-page-shell>

  <!-- Import and register components -->
  <script type="module">
    import '../../packages/eva-sovereign-ui-wc/src/index.ts';
    
    // Access i18n and theming API
    const { i18n } = window.EVASovereignUI;
    i18n.setLocale('fr-CA'); // Switch to French
  </script>
</body>
</html>
```

#### Option 2: Build and Import Bundle

```bash
cd packages/eva-sovereign-ui-wc
npm run build
```

Then include the built bundle in your HTML:

```html
<script type="module" src="path/to/dist/eva-sovereign-ui.js"></script>
```

## 📦 Available Components

### `<eva-button>`
A themeable, accessible button component.

```html
<eva-button variant="primary">Submit</eva-button>
<eva-button variant="secondary">Cancel</eva-button>
<eva-button variant="outline">Learn More</eva-button>
```

**Attributes:**
- `variant` - `"primary"` | `"secondary"` | `"outline"` (default: `"primary"`)
- `disabled` - Boolean
- `type` - `"button"` | `"submit"` | `"reset"` (default: `"button"`)

**Events:**
- `eva-click` - Fired when button is clicked

---

### `<eva-gc-header>`
Government of Canada header with bilingual branding.

```html
<eva-gc-header app-name-key="app.name" logo-text-key="header.government_of_canada">
  <eva-language-switcher slot="actions"></eva-language-switcher>
</eva-gc-header>
```

**Attributes:**
- `app-name-key` - i18n key for application name
- `logo-text-key` - i18n key for government branding text

**Slots:**
- `actions` - Header action items (e.g., language switcher)

---

### `<eva-page-shell>`
Semantic page layout with header, main, and footer regions.

```html
<eva-page-shell>
  <eva-gc-header slot="header"></eva-gc-header>
  
  <!-- Default slot for main content -->
  <h1>Page Content</h1>
  
  <div slot="footer">Footer content</div>
</eva-page-shell>
```

**Slots:**
- `header` - Page header area
- (default) - Main content area
- `footer` - Page footer area

---

### `<eva-hero-banner>`
Prominent call-to-action banner with gradient background.

```html
<eva-hero-banner 
  title-key="hero.title" 
  description-key="hero.description">
  <!-- Optional action buttons in default slot -->
  <eva-button>Get Started</eva-button>
</eva-hero-banner>
```

**Attributes:**
- `title-key` - i18n key for hero title
- `description-key` - i18n key for hero description

---

### `<eva-language-switcher>`
Bilingual toggle for EN/FR language switching.

```html
<eva-language-switcher></eva-language-switcher>
```

**Events:**
- `language-changed` - Fired when language changes, `detail: { locale: 'en-CA' | 'fr-CA' }`

---

### `<eva-quick-actions>`
Grid of actionable cards for common tasks.

```html
<eva-quick-actions></eva-quick-actions>
```

**Events:**
- `action-click` - Fired when action card is clicked, `detail: { actionId: string }`

---

### `<eva-chat-panel>`
Conversational interface with message history and input.

```html
<eva-chat-panel></eva-chat-panel>
```

**Events:**
- `message-sent` - Fired when user sends a message, `detail: { message: ChatMessage }`
- `voice-input-requested` - Fired when voice input button is clicked

---

## 🎨 Theming & Sovereign Profiles

EVA-Sovereign-UI supports multiple sovereign profiles. Each profile defines a complete color palette using CSS custom properties.

### Available Profiles

- **Canada GC Intranet** (`canada_gc_intranet`) - Government of Canada design system
- **UK Government Internal** (`uk_gov_internal`) - UK Gov.UK inspired theme
- **US Government Internal** (`us_gov_internal`) - US government variant

### Switching Profiles

Apply a theme class to the `<body>` or root element:

```html
<body class="eva-theme-canada_gc_intranet">
  <!-- Your app -->
</body>
```

Switch themes dynamically:

```javascript
document.body.className = 'eva-theme-uk_gov_internal';
```

### Custom Themes

Create your own profile by defining CSS custom properties:

```css
.eva-theme-my_custom_profile {
  --eva-primary: oklch(0.40 0.15 200);
  --eva-primary-foreground: oklch(0.99 0 0);
  --eva-secondary: oklch(0.50 0.18 30);
  /* ... other variables */
}
```

## 🌐 Internationalization

The i18n system supports key-based translations with hot-swapping.

### Changing Language

```javascript
import { i18n } from './packages/eva-sovereign-ui-wc/src/index.ts';

// Switch to French
i18n.setLocale('fr-CA');

// Get current locale
console.log(i18n.currentLocale); // 'fr-CA'

// Translate a key
console.log(i18n.t('app.name')); // 'Portail Souverain EVA'
```

### Adding New Languages

1. Create a new JSON file in `packages/eva-sovereign-ui-wc/src/i18n/`:

```json
{
  "app": {
    "name": "EVA Sovereign Portal"
  },
  "hero": {
    "title": "Welcome..."
  }
}
```

2. Import and register in `i18n-service.ts`:

```typescript
import myLang from './my-lang.json';

const translations: Record<Locale, any> = {
  'en-CA': enCA,
  'fr-CA': frCA,
  'my-lang': myLang
};
```

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Focus Management** - Visible focus indicators and logical tab order
- **Screen Reader Support** - Proper ARIA attributes and semantic HTML
- **Color Contrast** - All text meets 4.5:1 contrast ratio minimum
- **Reduced Motion** - Respects `prefers-reduced-motion` user preference

### Accessibility Features

- Skip links for main content
- Proper heading hierarchy
- Landmark regions (header, main, footer)
- Focusable and activatable action cards
- Form labels and descriptions
- Live regions for dynamic content (chat messages)

## 🔧 Development

### Building the Library

```bash
cd packages/eva-sovereign-ui-wc
npm run build
```

Output will be in `packages/eva-sovereign-ui-wc/dist/`.

### Development Mode

```bash
npm run dev
```

This starts Vite in development mode with hot module replacement.

## 📋 Browser Support

EVA-Sovereign-UI requires browsers with Web Components support:

- Chrome/Edge 67+
- Firefox 63+
- Safari 13.1+

For older browsers, consider using the [web components polyfills](https://github.com/webcomponents/polyfills).

## 🗺️ Roadmap

This is an MVP scaffold. Future enhancements include:

- Additional components (tables, forms, navigation, breadcrumbs)
- More sovereign profiles (Australia, New Zealand)
- Enhanced accessibility testing and documentation
- Unit tests with Vitest
- Storybook documentation
- NPM package publication
- Form validation helpers
- Advanced i18n features (pluralization, date/number formatting)

## 📄 License

MIT

## 🤝 Contributing

This is an early-stage project. Contributions, feedback, and suggestions are welcome!

---

**Built with ❤️ for the public sector**
