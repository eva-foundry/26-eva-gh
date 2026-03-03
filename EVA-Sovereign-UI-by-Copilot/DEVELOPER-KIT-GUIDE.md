# Developer Kit Demo Guide

## Overview

The Developer Kit is an interactive component gallery that showcases all EVA-Sovereign-UI components with live examples, code snippets, and theming capabilities. It serves as both documentation and a testing ground for developers integrating the design system.

## Features

### 1. Sovereign Profile Switcher

Test all Five Eyes government themes in real-time.

**Profiles:**
- 🇨🇦 **Canada** - Government of Canada (GC Design System)
- 🇺🇸 **USA** - United States Government (US Web Design System inspired)
- 🇬🇧 **UK** - United Kingdom Government (GOV.UK inspired)
- 🇦🇺 **Australia** - Australian Government (Digital Service Standard inspired)
- 🇳🇿 **New Zealand** - New Zealand Government (govt.nz inspired)

**What Changes:**
- Header branding and flag
- Footer legal text and links
- Color palette (primary, secondary, accent)
- Default locale
- Available languages

### 2. Four Content Tabs

#### Components Tab
Browse and test all EVA-Sovereign-UI components:

**GC Header Component**
- Live demo of header with branding
- Profile switcher integration
- Code snippet for copy-paste
- Props documentation

**Program Card Component**
- Grid layout with two sample cards
- Interactive hover states
- Click handlers demonstration
- Responsive design showcase

**EVA Chat Component**
- Fully functional chat interface
- Real-time message exchange
- Suggestion badge interaction
- Scrolling and auto-focus behavior

#### Accessibility Tab
Showcase WCAG 2.2 Level AAA features:

**Feature Grid:**
- ✅ **Keyboard Navigation** - Tab, Enter, Escape, Arrow keys
- ✅ **Screen Reader Support** - NVDA/JAWS compatibility
- ✅ **Focus Indicators** - 3px outlines, 3:1 contrast
- ✅ **Skip Links** - Jump to main content

**Compliance Badge:**
- Visual indicator of AAA compliance
- Explanatory text about standards
- Links to WCAG resources

#### i18n Tab
Demonstrate internationalization capabilities:

**Current Locale Display:**
- Badge showing active locale (en-CA or fr-CA)
- Instructions for language switching

**Format Examples:**
- Date (Long): "Monday, January 15, 2024"
- Date (Short): "01/15/2024"
- Number: "1,234,567.89" (en-CA) vs "1 234 567,89" (fr-CA)
- Currency: "$1,250.50" (en-CA) vs "1 250,50 $" (fr-CA)

**Code Snippet:**
Complete example of using i18n hook with all formatters.

#### Theme Tab
Visual reference for design tokens:

**GC Color Palette:**
- Grid of color swatches
- Color names (Text, Link Blue, Link Hover, etc.)
- Hex codes for each color
- Visual preview of each color

**Typography Scale:**
- H1 example (41px) - "Employment and Social Development Canada"
- H2 example (32px) - "Programs and Services"
- Body example (20px) - Sample paragraph text
- Font family labels (Lato for headings, Noto Sans for body)

## Component Gallery

### GC Header

**Visual Features:**
- Country flag emoji (changes with profile)
- Government name subtitle
- Application title (bold, large)
- Action area for buttons/widgets

**Code Example:**
```typescript
<GCHeader 
  appName="My Government Application"
  profile="canada_gc"
>
  <Button variant="outline" size="sm">
    Sign In
  </Button>
</GCHeader>
```

**Props:**
- `appName` - Application name
- `profile` - Sovereign profile ID
- `children` - Header action elements
- `className` - Additional styling

### GC Footer

**Visual Features:**
- Legal copyright text (profile-specific)
- Horizontal list of footer links
- Responsive layout (column on mobile)
- Muted background color

**Profiles Comparison:**

| Profile | Legal Text |
|---------|------------|
| Canada | © His Majesty the King in Right of Canada |
| USA | An official website of the United States government |
| UK | © Crown copyright |
| Australia | © Commonwealth of Australia |
| New Zealand | © Crown Copyright |

### Program Card

**Visual Features:**
- Large emoji icon (5xl size)
- Card title (xl, bold)
- Description text (base size, muted)
- "Learn more" link with arrow icon
- Hover shadow effect
- Transition animations

**Layout:**
- Header with icon and text flex layout
- Content area for description
- Footer for CTA button
- Responsive grid container

**Interactive States:**
- Default: Subtle border, no shadow
- Hover: Elevated shadow, slight lift
- Focus: Outline ring, keyboard accessible

### EVA Chat

**Visual Features:**
- Robot icon header with gradient background
- Title and subtitle
- Scrollable message area (400px height)
- User messages: right-aligned, blue background
- Assistant messages: left-aligned, grey background
- Typing animation: three bouncing dots
- Suggestion badges below messages
- Input field with send button

**Message Flow:**
1. User types in input field
2. Presses Enter or clicks Send button
3. User message appears (right side, blue)
4. Loading animation shows (left side, grey)
5. Assistant response appears after delay
6. Suggestions render as clickable badges
7. Chat auto-scrolls to latest message

**Keyboard Support:**
- Enter to send message
- Tab to navigate between input and send button
- Click suggestions with mouse or keyboard

## Code Snippet Features

### Copy Button
Every code example has a copy button in the top-right corner:
- Icon: Copy (clipboard)
- Active state: CheckCircle (green checkmark)
- Toast notification: "Copied [component name]!"
- Auto-reset after 2 seconds

### Code Formatting
All code snippets use:
- Monospace font (JetBrains Mono)
- Muted background color
- Horizontal scrolling for overflow
- Syntax-aware formatting
- Indentation preserved

### Snippets Included

**1. GC Header Code**
```typescript
<GCHeader 
  appName="My Government App" 
  profile="canada_gc"
>
  <LanguageSwitcher 
    currentLocale={locale}
    availableLocales={['en-CA', 'fr-CA']}
    onLocaleChange={setLocale}
  />
</GCHeader>
```

**2. Program Card Code**
```typescript
<ProgramCard
  icon="💼"
  title={t('programs.ei.title')}
  description={t('programs.ei.description')}
  linkText={t('common.learnMore')}
  onLearnMore={() => {}}
/>
```

**3. EVA Chat Code**
```typescript
<EVAChat
  title="Ask EVA"
  subtitle="Employment Virtual Assistant"
  placeholder="How can I help you today?"
/>
```

**4. i18n Hook Code**
```typescript
import { useI18n } from '@/lib/i18n/use-i18n';

const { locale, setLocale, t, formatDate, formatCurrency } = useI18n();

const title = t('esdc.title');
const formattedDate = formatDate(new Date(), 'long');
const amount = formatCurrency(1250.50, 'CAD');
```

## Interaction Patterns

### Profile Switching Flow

1. User opens Developer Kit
2. Sees Canada profile by default (🇨🇦)
3. Clicks profile selector dropdown
4. Dropdown shows 5 options with flags and names
5. Selects "🇺🇸 United States Government"
6. Header instantly updates with US branding
7. Footer changes to US legal text
8. Current profile display updates
9. All colors remain consistent (uses design tokens)

### Tab Navigation Flow

1. User lands on "Components" tab (default)
2. Sees 4 tab options in horizontal list
3. Clicks "Accessibility" tab
4. Content area smoothly transitions
5. Accessibility features grid appears
6. User can navigate with keyboard (arrow keys)
7. Tab indicator shows active tab (underline)

### Code Copying Flow

1. User sees code snippet with copy button
2. Hovers over copy button (icon highlights)
3. Clicks copy button
4. Button icon changes to checkmark
5. Toast appears: "Copied Header code!"
6. Code is in clipboard (ready to paste)
7. After 2 seconds, button resets to copy icon

## Technical Implementation

### State Management

```typescript
// Profile selection
const [currentProfile, setCurrentProfile] = useState<ProfileId>('canada_gc');

// Code copy tracking
const [copiedCode, setCopiedCode] = useState<string | null>(null);

// Locale (from i18n hook)
const { locale, setLocale, t, formatDate, formatCurrency } = useI18n();
```

### Profile Configuration

```typescript
export const sovereignProfiles: Record<string, SovereignProfile> = {
  canada_gc: {
    id: 'canada_gc',
    name: 'Government of Canada',
    nameShort: 'Canada',
    flag: '🇨🇦',
    colors: { primary: '#26374A', secondary: '#284162', accent: '#A62A1E' },
    legalText: '© His Majesty the King in Right of Canada',
    links: [
      { label: 'Privacy', url: '...' },
      { label: 'Terms', url: '...' },
    ],
    defaultLocale: 'en-CA',
    availableLocales: ['en-CA', 'fr-CA'],
  },
  // ... more profiles
};
```

### Copy Handler

```typescript
const handleCopyCode = (code: string, label: string) => {
  navigator.clipboard.writeText(code);
  setCopiedCode(label);
  toast.success(`Copied ${label}!`);
  setTimeout(() => setCopiedCode(null), 2000);
};
```

## Customization Guide

### Adding New Components

1. Create component demo in `DeveloperKitDemo.tsx`:

```typescript
<Card>
  <CardHeader>
    <CardTitle>New Component</CardTitle>
    <CardDescription>Component description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Live demo */}
    <NewComponent />
    
    {/* Code snippet */}
    <pre className="bg-muted p-4 rounded-lg">
      <code>{newComponentCode}</code>
    </pre>
    <Button onClick={() => handleCopyCode(newComponentCode, 'New Component')}>
      Copy
    </Button>
  </CardContent>
</Card>
```

2. Add code example to `codeExamples` object:

```typescript
const codeExamples = {
  // ... existing examples
  newComponent: `<NewComponent
  prop1="value"
  prop2={value}
/>`,
};
```

### Adding New Tabs

1. Add tab trigger to TabsList:

```typescript
<TabsTrigger value="newtab" className="flex items-center gap-2 py-3">
  <Icon size={18} />
  <span className="hidden sm:inline">New Tab</span>
</TabsTrigger>
```

2. Add tab content:

```typescript
<TabsContent value="newtab" className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle>New Tab Content</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Your content */}
    </CardContent>
  </Card>
</TabsContent>
```

### Modifying Color Swatches

Edit `gcColors` import and render:

```typescript
import { gcColors, usaColors } from '@/lib/tokens/colors';

// Use based on profile
const colors = currentProfile === 'usa_gov' ? usaColors : gcColors;

{Object.entries(colors).map(([name, color]) => (
  <div key={name}>
    <div style={{ backgroundColor: color }} />
    <p>{name}</p>
    <p>{color}</p>
  </div>
))}
```

## Accessibility Features

### Keyboard Navigation

**Tab Order:**
1. Profile selector dropdown
2. Tab list (Components, Accessibility, i18n, Theme)
3. Component demos
4. Copy buttons
5. Interactive elements within demos
6. Footer links

**Keyboard Shortcuts:**
- Tab/Shift+Tab: Navigate forward/backward
- Enter/Space: Activate buttons
- Arrow keys: Navigate tab list
- Escape: Close modals/dropdowns

### Screen Reader Announcements

**ARIA Labels:**
```html
<Select aria-label="Select sovereign profile">
<Button aria-label="Copy code to clipboard">
<div role="tablist" aria-label="Component categories">
<div role="tabpanel" aria-labelledby="components-tab">
```

**Live Regions:**
- Toast notifications have `role="status"`
- Copy confirmation announced to screen readers
- Profile changes announced

### Focus Management

- All interactive elements have visible focus
- Focus indicators are 3px outlines
- Contrast ratio 3:1 on focus rings
- No keyboard traps
- Focus restored after modal close

## Testing the Developer Kit

### Functional Testing

- [ ] Profile selector changes header/footer
- [ ] All 5 profiles render correctly
- [ ] Tabs switch content smoothly
- [ ] Copy buttons copy to clipboard
- [ ] Copy confirmation toast appears
- [ ] Code snippets are formatted
- [ ] Language switcher works
- [ ] Format examples update on locale change
- [ ] Color swatches display correctly
- [ ] Typography examples render properly

### Accessibility Testing

- [ ] Tab through entire page
- [ ] All focus indicators visible
- [ ] Screen reader announces changes
- [ ] Copy buttons have labels
- [ ] Profile selector is accessible
- [ ] Tab list navigable with arrows
- [ ] No color-only information
- [ ] Sufficient contrast on all text

### Responsive Testing

- [ ] Mobile (375px): Tabs stack, grid adjusts
- [ ] Tablet (768px): 2-column grids
- [ ] Desktop (1440px): Full layout
- [ ] Color grid remains readable
- [ ] Code snippets scroll horizontally
- [ ] Profile selector fits in header

## Performance Optimization

### Bundle Size
- Design tokens are small JSON objects
- Code examples are strings (minimal size)
- Components lazy-loaded if needed

### Rendering
- Color swatches use CSS (not images)
- Typography examples are text (not images)
- Minimal JavaScript for interactivity

### Best Practices
- Use React.memo for expensive components
- Debounce profile changes if needed
- Lazy load tabs if content is heavy
- Optimize images (none currently used)

## Future Enhancements

- [ ] Add component props table
- [ ] Include variant examples for each component
- [ ] Add dark mode theme showcase
- [ ] Implement search/filter for components
- [ ] Add responsive preview toggle (mobile/tablet/desktop)
- [ ] Include animation examples
- [ ] Add form validation showcase
- [ ] Implement component playground (live editing)
- [ ] Add download button for design tokens
- [ ] Include Storybook integration
- [ ] Add performance metrics
- [ ] Create print-friendly version

## Resources

- **Component Library:** Radix UI + Shadcn
- **Icons:** Phosphor Icons
- **Fonts:** Lato (headings), Noto Sans (body)
- **Color Space:** OKLCH for perceptual uniformity
- **Design System:** Government of Canada Design System

## Troubleshooting

**Issue: Profile not changing**
- Check currentProfile state updates
- Verify profile exists in sovereignProfiles object
- Ensure header/footer use currentProfile prop

**Issue: Copy not working**
- Check browser clipboard API permissions
- Verify navigator.clipboard is available
- Test in HTTPS context (required for clipboard)

**Issue: Code formatting broken**
- Check `<pre>` and `<code>` tags properly nested
- Verify font-mono class applied
- Ensure whitespace preserved in code strings

**Issue: Tabs not switching**
- Confirm TabsContent value matches TabsTrigger value
- Check defaultValue prop on Tabs component
- Verify tab state is controlled or uncontrolled (not both)

---

**For additional help, see:**
- [README.md](./README.md) - Project overview
- [INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md) - Integration patterns
- [ESDC-DEMO-GUIDE.md](./ESDC-DEMO-GUIDE.md) - ESDC demo details
