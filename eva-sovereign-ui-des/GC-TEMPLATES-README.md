# Government of Canada Design System - Page Templates

A comprehensive collection of 10 production-ready page templates following the Government of Canada design standards and best practices.

## 📄 Available Templates

### 1. Components Showcase
**File:** `GCComponentsShowcase.tsx`

Interactive demonstration of all GC Design System components with code examples, live previews, and copy-to-clipboard functionality.

**Use case:** Component library documentation, design system reference

**Features:**
- Live component demos organized by category
- Code examples with syntax highlighting
- Copy-to-clipboard for quick integration
- Responsive tabs navigation

---

### 2. Basic Page Template
**File:** `GCBasicTemplate.tsx`

Standard content page with proper typography, spacing, and semantic HTML structure.

**Use case:** General information pages, program descriptions, policy pages

**Features:**
- Breadcrumb navigation
- Hierarchical heading structure
- Content sections with proper ARIA labels
- Feature highlights with icons
- Call-to-action buttons
- Contact information card

---

### 3. Application Form Template
**File:** `GCFormTemplate.tsx`

Complete multi-section form with validation, error handling, and accessibility features.

**Use case:** Benefit applications, service requests, registration forms

**Features:**
- Form validation with error messages
- Grouped form sections with semantic HTML
- Radio buttons, checkboxes, and select inputs
- Helper text and required field indicators
- Consent and declaration section
- Save draft and submit functionality

---

### 4. Service Page Template
**File:** `GCServiceTemplate.tsx`

Dedicated service description page with eligibility criteria, application process, and FAQ.

**Use case:** Employment Insurance, CPP, OAS, and other government services

**Features:**
- Service overview with key information cards
- Eligibility requirements list
- Step-by-step application process
- Expandable FAQ accordion
- Contact information by region
- Action buttons for primary tasks

---

### 5. Topic Page Template
**File:** `GCTopicTemplate.tsx`

Topic navigation hub with service cards and audience-based information.

**Use case:** Employment and Social Development, Immigration, Health, etc.

**Features:**
- Service cards with icons and descriptions
- "Most requested" quick links section
- Audience-based navigation
- News and announcements
- About the department information
- Grid layout for related services

---

### 6. Calculator Template
**File:** `GCCalculatorTemplate.tsx`

Interactive calculator tool for benefit estimates and financial planning.

**Use case:** CPP retirement calculator, EI benefit estimator, tax calculators

**Features:**
- Multi-field form inputs
- Real-time calculation
- Results visualization with progress bars
- Detailed explanation of methodology
- Reset and recalculate functionality
- Next steps guidance

---

### 7. Checklist/Wizard Template
**File:** `GCChecklistTemplate.tsx`

Multi-step eligibility checker with progress tracking and conditional logic.

**Use case:** Immigration eligibility, benefit qualification, program screening

**Features:**
- Step-by-step progression
- Progress bar showing completion
- Conditional questions based on responses
- Summary of answers
- Eligibility score calculation
- Results page with recommendations

---

### 8. Contact Page Template
**File:** `GCContactTemplate.tsx`

Comprehensive contact information organized by communication channel.

**Use case:** Contact Service Canada, regional office information, help pages

**Features:**
- Tabbed interface for contact methods (phone, online, in-person, mail)
- Service-specific phone numbers
- Office hours and location information
- Regional office directory with addresses
- Important mailing tips
- Fraud reporting section

---

### 9. News & Updates Template
**File:** `GCNewsTemplate.tsx`

News listing page with filtering, search, and pagination.

**Use case:** Department announcements, policy updates, media releases

**Features:**
- Search functionality
- Category filtering
- Pagination for large lists
- News item cards with badges
- Email subscription form
- Media enquiries section
- News archive links

---

### 10. Dashboard Template
**File:** `GCDashboardTemplate.tsx`

User dashboard for My Service Canada Account with claim status and payments.

**Use case:** Personal account management, benefit tracking, document access

**Features:**
- Overview cards with key metrics
- Claim progress tracking
- Action items with priority levels
- Recent payments list
- Document downloads
- Quick links to common tasks
- Help and contact sections

---

## 🎨 Design Standards

All templates follow:

- **WCAG 2.1 Level AA** accessibility standards
- **Bilingual-ready** architecture (English/French)
- **Mobile-first** responsive design
- **Semantic HTML** with proper landmarks
- **Consistent spacing** using 8px grid system
- **Official GC colors** in oklch format
- **Focus indicators** for keyboard navigation
- **Screen reader** compatibility with ARIA labels

## 🚀 Usage

### Import a template

```tsx
import { GCServiceTemplate } from '@/components/gc/templates'

function MyPage() {
  return <GCServiceTemplate />
}
```

### Use in a route

```tsx
import { GCDashboardTemplate } from '@/components/gc/templates'

// In your router
<Route path="/dashboard" element={<GCDashboardTemplate />} />
```

### Customize content

Each template is fully customizable. Copy the template file and modify:
- Text content
- Form fields
- Data sources
- Colors and styling
- Component behavior

## 📋 Template Selection Guide

| Need | Recommended Template |
|------|---------------------|
| Information page | Basic Page Template |
| Application/registration | Application Form Template |
| Describe a service | Service Page Template |
| Topic navigation | Topic Page Template |
| Estimate benefits | Calculator Template |
| Check eligibility | Checklist/Wizard Template |
| Contact information | Contact Page Template |
| News/announcements | News & Updates Template |
| User account | Dashboard Template |
| Component reference | Components Showcase |

## 🎯 Key Features

### Accessibility
- Keyboard navigation (Tab, Enter, Space, Arrows)
- Screen reader announcements
- Focus management
- High contrast support
- Reduced motion support

### Responsiveness
- Mobile: Single column, stacked layout
- Tablet: 2-column grid for cards
- Desktop: Full multi-column layouts
- Touch targets: Minimum 44x44px

### Bilingual Support
- All labels accept English/French
- Text scales for translation (20-30% longer)
- Right-to-left not required for Canadian bilingualism

## 🛠️ Customization

### Colors
Modify colors in `index.css`:
```css
:root {
  --primary: oklch(0.45 0.12 250);      /* GC Blue */
  --secondary: oklch(0.50 0.20 25);     /* Orange */
  --accent: oklch(0.55 0.15 150);       /* Blue-green */
}
```

### Typography
Update font families in `index.css`:
```css
body {
  font-family: 'Noto Sans', system-ui, sans-serif;
}

h1, h2, h3 {
  font-family: 'Lato', sans-serif;
}
```

### Spacing
All templates use Tailwind's spacing scale:
- `gap-2` (8px) - Between related elements
- `gap-4` (16px) - Between components
- `gap-6` (24px) - Between sections
- `gap-8` (32px) - Between major areas

## 📚 Resources

- [GC Design System](https://design-system.alpha.canada.ca/)
- [Canada.ca Content Style Guide](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/canada-content-style-guide.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Experience Toolkit (WET)](https://wet-boew.github.io/wet-boew/index-en.html)

## 🔧 Technical Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Phosphor Icons** for iconography
- **Sonner** for toast notifications
- **Framer Motion** for animations

## 📝 Best Practices

1. **Content first**: Write clear, plain language content
2. **Mobile first**: Design for small screens, enhance for large
3. **Accessibility always**: Test with keyboard and screen readers
4. **Performance**: Optimize images, minimize JavaScript
5. **Progressive enhancement**: Core functionality works without JS
6. **Semantic HTML**: Use proper elements and landmarks
7. **Consistent patterns**: Reuse established UI patterns

## 🎓 Training

For teams implementing these templates:

1. **Read** the GC Content Style Guide
2. **Review** WCAG 2.1 Level AA requirements
3. **Test** with keyboard navigation only
4. **Validate** with automated accessibility tools
5. **User test** with diverse audiences
6. **Iterate** based on feedback

## 📄 License

Built for demonstration purposes following Government of Canada design standards.

## 🤝 Contributing

When contributing new templates:

1. Follow existing patterns and conventions
2. Ensure WCAG 2.1 Level AA compliance
3. Test keyboard navigation thoroughly
4. Include proper ARIA labels and landmarks
5. Document usage and customization
6. Provide code examples

## 📞 Support

For questions about:
- **GC Design System**: Consult official documentation
- **Implementation**: Review component source code
- **Accessibility**: Test with NVDA, JAWS, or VoiceOver
- **Content**: Follow Canada.ca Content Style Guide
