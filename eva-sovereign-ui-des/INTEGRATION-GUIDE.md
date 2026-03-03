# EVA-Sovereign-UI Integration Guide

## Quick Integration

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-org/eva-sovereign-ui.git
cd eva-sovereign-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Basic Setup

```typescript
import { GCHeader, GCFooter, LanguageSwitcher } from '@/components/eva';
import { useI18n } from '@/lib/i18n/use-i18n';

function MyApp() {
  const { locale, setLocale, t } = useI18n();
  
  return (
    <div>
      <GCHeader appName={t('app.title')} profile="canada_gc">
        <LanguageSwitcher
          currentLocale={locale}
          availableLocales={['en-CA', 'fr-CA']}
          onLocaleChange={setLocale}
        />
      </GCHeader>
      
      <main>
        {/* Your content */}
      </main>
      
      <GCFooter profile="canada_gc" />
    </div>
  );
}
```

## Component Integration Examples

### GC Header

The official government header provides branding and navigation.

```typescript
import { GCHeader } from '@/components/eva/GCHeader';
import { Button } from '@/components/ui/button';

<GCHeader 
  appName="My Government Application"
  profile="canada_gc"  // or usa_gov, uk_gov, australia_gov, nz_gov
  className="sticky top-0 z-50"  // optional custom styling
>
  {/* Optional: Add actions to the header */}
  <Button variant="outline" size="sm">
    Sign In
  </Button>
</GCHeader>
```

**Props:**
- `appName` (string, required) - Your application name
- `profile` (ProfileId, optional) - Sovereign profile (default: 'canada_gc')
- `children` (ReactNode, optional) - Header actions (buttons, nav, etc.)
- `className` (string, optional) - Additional CSS classes

### GC Footer

Compliant footer with legal text and required links.

```typescript
import { GCFooter } from '@/components/eva/GCFooter';

// Use default configuration
<GCFooter profile="canada_gc" />

// Or customize
<GCFooter
  profile="canada_gc"
  legalText="© 2024 Custom Legal Text"
  links={[
    { label: 'Privacy', url: '/privacy' },
    { label: 'Terms', url: '/terms' },
  ]}
/>
```

**Props:**
- `profile` (ProfileId, optional) - Determines default legal text and links
- `legalText` (string, optional) - Override default legal text
- `links` (Array, optional) - Custom footer links
- `className` (string, optional) - Additional CSS classes

### Language Switcher

Bilingual toggle for Official Languages Act compliance.

```typescript
import { LanguageSwitcher } from '@/components/eva/LanguageSwitcher';
import { useI18n } from '@/lib/i18n/use-i18n';

function MyComponent() {
  const { locale, setLocale } = useI18n();
  
  return (
    <LanguageSwitcher
      currentLocale={locale}
      availableLocales={['en-CA', 'fr-CA']}
      onLocaleChange={setLocale}
    />
  );
}
```

**Props:**
- `currentLocale` (string, required) - Current active locale (e.g., 'en-CA')
- `availableLocales` (string[], required) - List of supported locales
- `onLocaleChange` (function, required) - Callback when locale changes

### Program Card

Showcase government programs with icons and descriptions.

```typescript
import { ProgramCard } from '@/components/eva/ProgramCard';
import { useI18n } from '@/lib/i18n/use-i18n';

function Programs() {
  const { t } = useI18n();
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <ProgramCard
        icon="💼"
        title={t('programs.ei.title')}
        description={t('programs.ei.description')}
        linkText={t('common.learnMore')}
        onLearnMore={() => navigate('/programs/ei')}
      />
    </div>
  );
}
```

**Props:**
- `icon` (string, required) - Emoji or icon identifier
- `title` (string, required) - Program title
- `description` (string, required) - Brief description
- `linkText` (string, optional) - CTA button text (default: 'Learn more')
- `onLearnMore` (function, optional) - Click handler for CTA
- `className` (string, optional) - Additional CSS classes

### EVA Chat

Conversational AI assistant for citizen inquiries.

```typescript
import { EVAChat } from '@/components/eva/EVAChat';
import { useI18n } from '@/lib/i18n/use-i18n';

function SupportPage() {
  const { t } = useI18n();
  
  return (
    <EVAChat
      title={t('chat.title')}
      subtitle={t('chat.subtitle')}
      placeholder={t('chat.placeholder')}
      className="max-w-4xl mx-auto"
    />
  );
}
```

**Props:**
- `title` (string, optional) - Chat panel title (default: 'Ask EVA')
- `subtitle` (string, optional) - Subtitle/description
- `placeholder` (string, optional) - Input placeholder text
- `className` (string, optional) - Additional CSS classes

**Customizing Responses:**

Edit `src/lib/eva/eva-responses.ts` to add or modify chat responses:

```typescript
export const responses: Record<string, EVAResponse> = {
  'my custom topic': {
    text: 'Response to the custom topic...',
    suggestions: ['Related question 1', 'Related question 2']
  },
  // ... more responses
};
```

## Internationalization Integration

### Setting Up Translations

#### 1. Add Translation Keys

Edit `src/lib/i18n/locales/en-CA.json`:

```json
{
  "myApp": {
    "title": "My Application",
    "welcome": "Welcome, {name}!",
    "description": "This is my government application"
  }
}
```

Edit `src/lib/i18n/locales/fr-CA.json`:

```json
{
  "myApp": {
    "title": "Mon application",
    "welcome": "Bienvenue, {name}!",
    "description": "Ceci est mon application gouvernementale"
  }
}
```

#### 2. Use in Components

```typescript
import { useI18n } from '@/lib/i18n/use-i18n';

function MyComponent() {
  const { t, locale, formatDate, formatCurrency } = useI18n();
  
  return (
    <div>
      <h1>{t('myApp.title')}</h1>
      <p>{t('myApp.welcome', { name: 'John' })}</p>
      
      <p>Current locale: {locale}</p>
      <p>Date: {formatDate(new Date(), 'long')}</p>
      <p>Amount: {formatCurrency(1234.56, 'CAD')}</p>
    </div>
  );
}
```

#### 3. Format Dates and Numbers

```typescript
const { formatDate, formatNumber, formatCurrency } = useI18n();

// Dates
formatDate(new Date(), 'short')   // 2024-01-15
formatDate(new Date(), 'medium')  // Jan 15, 2024
formatDate(new Date(), 'long')    // Monday, January 15, 2024

// Numbers
formatNumber(1234567.89)          // 1,234,567.89 (en-CA)
                                  // 1 234 567,89 (fr-CA)

// Currency
formatCurrency(1250.50, 'CAD')    // $1,250.50 (en-CA)
                                  // 1 250,50 $ (fr-CA)
```

### Adding New Locales

1. Create translation file: `src/lib/i18n/locales/es-US.json`
2. Register in `use-i18n.ts`:

```typescript
import esUS from './locales/es-US.json';

i18nService.setTranslations('es-US', esUS);
```

3. Add to your profile configuration:

```typescript
availableLocales: ['en-CA', 'fr-CA', 'es-US']
```

## Theming and Customization

### Using Sovereign Profiles

Switch between Five Eyes government themes:

```typescript
import { sovereignProfiles } from '@/lib/tokens/sovereign-profiles';

const profile = sovereignProfiles.canada_gc;

console.log(profile.name);        // "Government of Canada"
console.log(profile.flag);        // "🇨🇦"
console.log(profile.legalText);   // "© His Majesty the King in Right of Canada"
console.log(profile.colors);      // { primary: '#26374A', ... }
```

### Customizing Colors

Edit `src/index.css` to modify GC Design System colors:

```css
:root {
  /* Override primary color */
  --primary: oklch(0.35 0.08 250);
  --primary-foreground: oklch(0.98 0 0);
  
  /* Override accent color */
  --accent: oklch(0.45 0.10 10);
  --accent-foreground: oklch(0.98 0 0);
}
```

### Custom Typography

```css
:root {
  /* Override font families */
  body {
    font-family: 'Custom Sans', system-ui, sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Custom Heading', sans-serif;
  }
}
```

### Spacing Customization

```typescript
import { gcSpacing } from '@/lib/tokens/spacing';

// Use design tokens
<div className="p-md">  {/* 24px padding */}
<div className="mt-lg">  {/* 32px margin-top */}
```

## Accessibility Best Practices

### Skip Links

Always include a skip link for keyboard users:

```typescript
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Your content */}
</main>
```

### ARIA Labels

Provide descriptive labels for interactive elements:

```typescript
<button
  aria-label="Close dialog"
  onClick={handleClose}
>
  <X size={20} />
</button>

<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>
```

### Focus Management

Ensure focus is visible and properly managed:

```typescript
// Focus trap for modals
import { Dialog } from '@/components/ui/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  {/* Content automatically gets focus trap */}
</Dialog>

// Restore focus after actions
const buttonRef = useRef<HTMLButtonElement>(null);

const handleAction = () => {
  // Do something
  buttonRef.current?.focus();
};
```

### Keyboard Navigation

Support common keyboard shortcuts:

```typescript
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleClose();
  }
  if (e.key === 'Enter') {
    handleSubmit();
  }
};
```

## Testing Your Integration

### Manual Testing Checklist

#### Visual
- [ ] All colors meet WCAG AAA contrast ratio (7:1)
- [ ] Typography is readable at all sizes
- [ ] Layout is responsive on mobile/tablet/desktop
- [ ] Focus indicators are visible on all interactive elements

#### Keyboard
- [ ] Tab through all interactive elements
- [ ] Skip link appears when focused
- [ ] All buttons respond to Enter
- [ ] All dialogs close with Escape
- [ ] Arrow keys work in menus/lists

#### Screen Reader
- [ ] Test with NVDA (Windows) or VoiceOver (macOS)
- [ ] All images have alt text
- [ ] ARIA labels are present and descriptive
- [ ] Page structure uses semantic HTML
- [ ] Live regions announce dynamic content

#### Internationalization
- [ ] Language switcher toggles all text
- [ ] Dates format correctly per locale
- [ ] Numbers format correctly per locale
- [ ] Currency displays correctly
- [ ] No layout shift when switching languages

### Automated Testing

```typescript
// Example Jest test
import { render, screen } from '@testing-library/react';
import { GCHeader } from '@/components/eva/GCHeader';

describe('GCHeader', () => {
  it('renders app name', () => {
    render(<GCHeader appName="Test App" />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });
  
  it('has proper landmark role', () => {
    render(<GCHeader appName="Test App" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
```

## Common Integration Patterns

### Full Page Layout

```typescript
import { GCHeader, GCFooter, LanguageSwitcher } from '@/components/eva';
import { useI18n } from '@/lib/i18n/use-i18n';

export function Layout({ children }) {
  const { locale, setLocale, t } = useI18n();
  
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only ...">
        {t('navigation.skipToMain')}
      </a>
      
      <GCHeader appName={t('app.title')} profile="canada_gc">
        <LanguageSwitcher
          currentLocale={locale}
          availableLocales={['en-CA', 'fr-CA']}
          onLocaleChange={setLocale}
        />
      </GCHeader>
      
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      <GCFooter profile="canada_gc" />
    </div>
  );
}
```

### Form with Validation

```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ContactForm() {
  const { t } = useI18n();
  const [error, setError] = useState('');
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">{t('form.name')}</Label>
        <Input
          id="name"
          type="text"
          required
          aria-required="true"
        />
      </div>
      
      <Button type="submit" variant="default">
        {t('form.submit')}
      </Button>
    </form>
  );
}
```

### Multi-Step Process

```typescript
import { Progress } from '@/components/ui/progress';

export function ApplicationWizard() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  
  return (
    <div className="max-w-2xl mx-auto">
      <Progress 
        value={progress}
        aria-label={`Step ${step} of ${totalSteps}`}
        className="mb-8"
      />
      
      {step === 1 && <PersonalInfo onNext={() => setStep(2)} />}
      {step === 2 && <Employment onNext={() => setStep(3)} />}
      {step === 3 && <Review onNext={() => setStep(4)} />}
      {step === 4 && <Confirmation />}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

**Issue: Translations not updating**
- Ensure locale is in `availableLocales` array
- Check translation key exists in JSON files
- Verify `useI18n()` hook is called in component

**Issue: Focus not visible**
- Check `*:focus-visible` styles in `index.css`
- Ensure `--ring` color has sufficient contrast
- Test in different browsers (Safari, Firefox, Chrome)

**Issue: Colors don't match GC Design System**
- Verify CSS custom properties in `index.css`
- Check `gcColors` token values
- Ensure using `oklch` color space for consistency

**Issue: Screen reader not announcing changes**
- Add `aria-live` regions for dynamic content
- Verify ARIA labels are present
- Check semantic HTML structure

## Support

For integration help:
- 📚 Review the [README.md](./README.md)
- 💬 Check existing GitHub issues
- 🐛 Report bugs with reproduction steps
- 📧 Contact: support@eva-sovereign-ui.example.com

---

**Happy building! 🇨🇦**
