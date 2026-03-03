# ESDC Demo Guide

## Overview

The Employment and Social Development Canada (ESDC) demo is a realistic government portal showcasing the EVA-Sovereign-UI design system in action. It demonstrates Official Languages Act compliance, WCAG 2.2 AAA accessibility, and the EVA AI assistant.

## Features

### 1. Bilingual Support (EN/FR)

The demo provides full English and French language support as required by the Official Languages Act.

**Implementation:**
- All text is translatable via i18n keys
- Language switcher in header toggles between EN-CA and FR-CA
- Dates, numbers, and currency format per locale conventions
- Layout remains stable during language switches (no content shift)

**Translation Files:**
- `src/lib/i18n/locales/en-CA.json` - English (Canada)
- `src/lib/i18n/locales/fr-CA.json` - Français (Canada)

### 2. Government Programs

Three core ESDC programs are showcased:

#### Employment Insurance (EI)
- **Icon:** 💼
- **Description:** Temporary financial assistance while you look for work or upgrade your skills
- **Details:** Comprehensive information about eligibility, application process, and payment amounts
- **Key Features:**
  - Regular benefits for unemployed Canadians
  - Requires 420-700 hours of insurable employment
  - Maximum 55% of average insurable weekly earnings

#### Old Age Security (OAS)
- **Icon:** 🧓
- **Description:** Monthly payment for seniors 65 years of age and older
- **Details:** No work history required, amount based on Canadian residence after age 18
- **Key Features:**
  - Available to most Canadians 65+
  - 40 years residence for maximum benefits
  - Automatic enrollment (letter sent at age 64)

#### Canada Pension Plan (CPP)
- **Icon:** 💰
- **Description:** Contributory retirement pension program for Canadian workers
- **Details:** Earnings-related social insurance providing retirement, disability, and survivor benefits
- **Key Features:**
  - Funded by employee/employer contributions
  - Retirement age 65 (can start 60-70)
  - Amount based on contribution history

### 3. Services

#### Job Search
- Access Job Bank (jobbank.gc.ca)
- Search thousands of job postings across Canada
- Resume builder and career planning tools
- Labour market information

#### Benefits Finder
- Discover eligible government benefits
- Answer simple questions for personalized results
- Federal, provincial, and territorial programs
- Quick eligibility screening

### 4. EVA AI Assistant

The Employment Virtual Assistant provides context-aware responses about ESDC programs.

**Supported Topics:**

| Topic | Trigger Keywords | Response |
|-------|------------------|----------|
| Employment Insurance | "employment insurance", "ei", "apply for ei" | EI eligibility, application process, payment amounts |
| Old Age Security | "old age security", "oas", "pension" | OAS requirements, automatic enrollment, payment details |
| Canada Pension Plan | "canada pension", "cpp" | CPP contributions, retirement planning, benefits |
| Job Search | "job", "work" | Job Bank resources, employment services |
| Benefits | "benefits" | Overview of all ESDC benefit programs |
| Disability | "disability" | CPP Disability benefits information |
| Family | "family" | Maternity/parental benefits, child benefits |

**Response Features:**
- Context-aware replies based on keywords
- Suggested follow-up questions
- Natural conversation flow
- Typing animation for realistic feel
- Auto-scroll to latest messages

**Example Conversation:**

```
User: "Tell me about employment insurance"
EVA:  "Employment Insurance (EI) provides temporary financial assistance 
       to unemployed Canadians while they look for work or upgrade their 
       skills. You may be eligible if you have lost your job through no 
       fault of your own and have worked enough insurable hours..."
       
       Suggestions:
       - How do I apply for EI?
       - What are the EI payment amounts?
       - EI eligibility requirements
```

### 5. Accessibility Features

The demo meets WCAG 2.2 Level AAA standards:

#### Skip Links
- Appears when focused
- Jumps to main content
- Essential for keyboard/screen reader users

#### Semantic HTML
```html
<header role="banner">
  <!-- GC Header -->
</header>

<main id="main-content">
  <!-- Page content -->
</main>

<footer role="contentinfo">
  <!-- GC Footer -->
</footer>
```

#### ARIA Labels
- All interactive elements have descriptive labels
- Form inputs have proper associations
- Chat messages announce via live region
- Landmarks for page structure

#### Keyboard Navigation
- Tab through all interactive elements
- Enter to activate buttons/links
- Escape to close dialogs
- Arrow keys in EVA chat (future)

#### Focus Management
- 3px visible focus indicators
- 3:1 contrast ratio on focus states
- Focus restored after modal close
- No keyboard traps

#### Contrast Ratios
All text meets AAA standards (7:1 minimum):
- Body text (#333) on white: 12.6:1 ✓
- Primary blue (#26374A) with white: 9.4:1 ✓
- Link blue (#284162) with white: 8.2:1 ✓
- Error red (#d3080c) with white: 5.5:1 ✓ (AA Large)

## User Flows

### Flow 1: Discover Program Information

1. User lands on homepage
2. Reads hero banner: "Building a skilled, adaptable, and inclusive workforce"
3. Scrolls to "Programs and Services" section
4. Sees three program cards: EI, OAS, CPP
5. Clicks "Learn more" on Employment Insurance card
6. Modal opens with detailed EI information
7. Reads full description and eligibility requirements
8. Clicks "Apply now" button (would navigate to application)
9. Closes modal with Escape key or close button

### Flow 2: Ask EVA About Benefits

1. User scrolls to "Ask EVA" section
2. Sees empty chat with suggestion: "Ask me about Employment Insurance..."
3. Types question: "How do I apply for Old Age Security?"
4. Presses Enter or clicks Send button
5. User message appears on right side with blue background
6. Loading animation appears (three bouncing dots)
7. EVA response appears on left side with grey background
8. Response includes detailed OAS information
9. Suggested questions appear as clickable badges below response
10. User clicks suggested question: "OAS payment amounts"
11. New conversation continues with more details

### Flow 3: Switch Language

1. User is viewing page in English
2. Clicks language switcher button in header (shows "English")
3. Language instantly switches to French
4. All text updates: title, programs, chat, footer
5. Dates and numbers reformat to French conventions
6. Layout remains stable (no content shift)
7. EVA chat history remains (could be translated in future)
8. User can switch back to English anytime

### Flow 4: Keyboard-Only Navigation

1. User presses Tab from browser address bar
2. Skip link appears: "Skip to main content"
3. User presses Enter to jump past header
4. Focus moves to first program card
5. Continues tabbing through all three program cards
6. Tabs through service cards
7. Reaches EVA chat input field
8. Types question and presses Enter (no mouse needed)
9. Tabs to language switcher in header
10. Presses Enter to change language
11. Continues navigation with full keyboard access

## Technical Implementation

### Component Architecture

```
ESDCDemo
├── GCHeader
│   ├── Canada flag emoji 🇨🇦
│   ├── "Government of Canada" text
│   ├── App name: "Employment and Social Development Canada"
│   └── LanguageSwitcher
│       └── EN/FR toggle button
├── Main Content
│   ├── Hero Banner
│   │   ├── Title (h2): "Building a skilled, adaptable..."
│   │   └── Description: "Access employment services..."
│   ├── Programs Section
│   │   ├── Section title (h2): "Programs and Services"
│   │   └── Program Cards (grid)
│   │       ├── Employment Insurance Card
│   │       ├── Old Age Security Card
│   │       └── Canada Pension Plan Card
│   ├── Services Section
│   │   ├── Job Search Card
│   │   └── Benefits Finder Card
│   └── Chat Section
│       ├── Section title (h2): "Ask EVA"
│       └── EVAChat Component
│           ├── Chat header with robot icon
│           ├── Message history (ScrollArea)
│           ├── User/Assistant message bubbles
│           ├── Suggestion badges
│           └── Input + Send button
└── GCFooter
    ├── Legal text: "© His Majesty the King in Right of Canada"
    └── Links: Privacy, Terms, Accessibility, Canada.ca
```

### State Management

```typescript
// Locale state (via i18n hook)
const { locale, setLocale, t } = useI18n();

// Selected program for modal
const [selectedProgram, setSelectedProgram] = useState<ProgramDetails | null>(null);

// Chat messages (internal to EVAChat)
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

### Translation Keys Used

```json
{
  "esdc.title": "Employment and Social Development Canada",
  "esdc.hero.title": "Building a skilled, adaptable...",
  "esdc.hero.description": "Access employment services...",
  "esdc.programs.ei.title": "Employment Insurance",
  "esdc.programs.ei.description": "Temporary financial assistance...",
  "esdc.programs.ei.details": "Employment Insurance (EI) provides...",
  "esdc.programs.oas.*": "...",
  "esdc.programs.cpp.*": "...",
  "chat.title": "Ask EVA",
  "chat.subtitle": "Employment Virtual Assistant",
  "chat.placeholder": "How can I help you today?",
  "navigation.skipToMain": "Skip to main content",
  "footer.copyright": "© His Majesty the King in Right of Canada",
  "common.learnMore": "Learn more",
  "common.apply": "Apply now"
}
```

## Customization Guide

### Adding New Programs

1. Add translation keys to `en-CA.json` and `fr-CA.json`:

```json
{
  "esdc": {
    "programs": {
      "newProgram": {
        "title": "New Program Name",
        "description": "Brief description",
        "details": "Full details about the program"
      }
    }
  }
}
```

2. Add program to `programs` array in `ESDCDemo.tsx`:

```typescript
const programs = [
  // ... existing programs
  {
    icon: '🎓',
    titleKey: 'esdc.programs.newProgram.title',
    descKey: 'esdc.programs.newProgram.description',
    detailsKey: 'esdc.programs.newProgram.details',
  },
];
```

### Customizing EVA Responses

Edit `src/lib/eva/eva-responses.ts`:

```typescript
const responses: Record<string, EVAResponse> = {
  'new topic': {
    text: 'Response text explaining the new topic...',
    suggestions: ['Related question 1', 'Related question 2']
  },
  // ... existing responses
};
```

Trigger keywords are case-insensitive and support partial matching.

### Changing Colors

Edit `src/index.css`:

```css
:root {
  /* Primary color (used for header, buttons) */
  --primary: oklch(0.30 0.04 250);  /* GC Blue */
  
  /* Accent color (used for highlights) */
  --accent: oklch(0.45 0.08 10);    /* GC Red */
}
```

### Modifying Layout

Adjust container width in `ESDCDemo.tsx`:

```typescript
// Change max-width on hero
<div className="container mx-auto px-6 py-16 max-w-4xl">

// Change grid columns for programs
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
```

## Testing the Demo

### Manual Testing Checklist

#### Visual Testing
- [ ] Load demo in Chrome, Firefox, Safari
- [ ] Check all text is readable
- [ ] Verify icons display correctly
- [ ] Confirm proper spacing and alignment
- [ ] Test on mobile (375px), tablet (768px), desktop (1440px)

#### Functional Testing
- [ ] Click each program card - modal opens
- [ ] Click "Apply now" button in modal
- [ ] Close modal with X button
- [ ] Close modal with Escape key
- [ ] Type message in EVA chat and send
- [ ] Click suggestion badges
- [ ] Switch language EN → FR → EN
- [ ] Verify all text translates correctly

#### Accessibility Testing
- [ ] Tab through entire page (no traps)
- [ ] Skip link appears when focused
- [ ] All buttons have visible focus
- [ ] Test with NVDA/VoiceOver screen reader
- [ ] Check contrast ratios with WAVE/axe DevTools
- [ ] Verify ARIA labels present
- [ ] Test keyboard shortcuts (Enter, Escape)

#### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] Language switch updates in < 100ms
- [ ] EVA response appears in < 1 second
- [ ] No console errors
- [ ] No layout shift during loading

## Deployment Considerations

### Environment Variables

No environment variables required - all text is in translation files.

### Browser Support

Tested and supported:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Performance Optimization

- Translation files are bundled at build time
- Images should be optimized (WebP format)
- Consider lazy loading for chat component
- Implement code splitting for large pages

### SEO Considerations

```html
<!-- Add to index.html -->
<meta name="description" content="Employment and Social Development Canada - Access programs and services">
<meta name="keywords" content="EI, OAS, CPP, employment, benefits, Canada">
<meta property="og:title" content="ESDC - Employment and Social Development Canada">
<meta property="og:description" content="Building a skilled, adaptable, and inclusive workforce">
```

## Troubleshooting

**Issue: Translations not appearing**
- Check translation key exists in both en-CA.json and fr-CA.json
- Verify `t()` function is called with correct key
- Ensure i18n service is initialized in use-i18n.ts

**Issue: EVA not responding**
- Check eva-responses.ts has matching trigger keyword
- Verify getEVAResponse function is imported
- Look for typos in trigger keywords

**Issue: Modal not opening**
- Verify selectedProgram state updates on card click
- Check Dialog component is imported from ui/dialog
- Ensure modal close handler sets state to null

**Issue: Language switch not working**
- Confirm availableLocales includes both 'en-CA' and 'fr-CA'
- Verify setLocale function is passed to LanguageSwitcher
- Check locale state updates in parent component

## Future Enhancements

- [ ] Add search functionality for programs
- [ ] Implement form for benefit applications
- [ ] Add user authentication/profile
- [ ] Connect EVA to real AI service (GPT-4)
- [ ] Add analytics tracking
- [ ] Implement offline support (PWA)
- [ ] Add print-friendly styles
- [ ] Create program comparison tool
- [ ] Add eligibility calculator
- [ ] Implement saved/favorite programs

---

**For additional help, see:**
- [README.md](./README.md) - Project overview
- [INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md) - Component integration
- [PRD.md](./PRD.md) - Product requirements
