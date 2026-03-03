# Government of Canada Design System Components

A comprehensive library of accessible, bilingual-ready UI components following the Government of Canada design standards and guidelines from https://design-system.alpha.canada.ca/.

## 🎯 Overview

This implementation provides 15+ production-ready components that adhere to:
- **WCAG 2.1 Level AA** accessibility standards
- **Bilingual support** for English and French
- **GC design patterns** from the official design system
- **Keyboard navigation** throughout all components
- **Screen reader compatibility** with proper ARIA labels

## 📦 Available Components

### Form Controls

#### GCButton
Primary, secondary, supertask, danger, and link button variants with multiple size options.

```tsx
import { GCButton } from '@/components/gc'

<GCButton variant="primary" size="default">Submit</GCButton>
<GCButton variant="secondary">Cancel</GCButton>
<GCButton variant="supertask">Important Action</GCButton>
```

#### GCInput
Text input with label, helper text, and error state support.

```tsx
import { GCInput } from '@/components/gc'

<GCInput
  label="Email Address"
  type="email"
  helperText="We'll never share your email"
  error="Invalid email format"
  required
  fullWidth
/>
```

#### GCTextarea
Multi-line text input with the same features as GCInput.

```tsx
import { GCTextarea } from '@/components/gc'

<GCTextarea
  label="Comments"
  helperText="Maximum 500 characters"
  fullWidth
/>
```

#### GCCheckbox
Accessible checkbox with custom styling and label support.

```tsx
import { GCCheckbox } from '@/components/gc'

<GCCheckbox
  label="I agree to the terms"
  helperText="You must agree to continue"
/>
```

#### GCRadio & GCRadioGroup
Radio buttons with proper grouping and accessibility.

```tsx
import { GCRadio, GCRadioGroup } from '@/components/gc'

<GCRadioGroup label="Select an option">
  <GCRadio name="choice" value="1" label="Option 1" />
  <GCRadio name="choice" value="2" label="Option 2" />
</GCRadioGroup>
```

#### GCSelect
Dropdown select with options and proper labeling.

```tsx
import { GCSelect } from '@/components/gc'

<GCSelect
  label="Province"
  options={[
    { value: 'on', label: 'Ontario' },
    { value: 'qc', label: 'Quebec' }
  ]}
  placeholder="Select a province"
  fullWidth
/>
```

### Feedback & Status

#### GCAlert
Contextual alert messages in info, success, warning, and danger variants.

```tsx
import { GCAlert } from '@/components/gc'

<GCAlert variant="success" title="Success" dismissible>
  Your application has been submitted.
</GCAlert>
```

#### GCBadge
Small status indicators in multiple color variants.

```tsx
import { GCBadge } from '@/components/gc'

<GCBadge variant="success">Active</GCBadge>
<GCBadge variant="warning">Pending</GCBadge>
```

#### GCProgressBar
Visual progress indicator with labels and percentage display.

```tsx
import { GCProgressBar } from '@/components/gc'

<GCProgressBar
  value={75}
  max={100}
  label="Upload Progress"
  showPercentage
  variant="success"
/>
```

### Layout & Structure

#### GCCard
Content container with optional title and footer sections.

```tsx
import { GCCard } from '@/components/gc'

<GCCard 
  title="Card Title"
  variant="bordered"
  footer={<button>Action</button>}
>
  Card content goes here
</GCCard>
```

#### GCTable
Accessible data table with custom cell rendering.

```tsx
import { GCTable } from '@/components/gc'

<GCTable
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' }
  ]}
  data={[
    { name: 'John Doe', status: 'Active' }
  ]}
  striped
  hoverable
/>
```

### Navigation

#### GCBreadcrumb
Navigation trail showing current page hierarchy.

```tsx
import { GCBreadcrumb } from '@/components/gc'

<GCBreadcrumb
  items={[
    { label: 'Section', href: '/section' },
    { label: 'Current Page' }
  ]}
  showHome
/>
```

#### GCTabs
Tabbed interface for organizing related content.

```tsx
import { GCTabs } from '@/components/gc'

<GCTabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
  ]}
  activeTab="tab1"
  onTabChange={(id) => console.log(id)}
/>
```

#### GCAccordion
Expandable content sections.

```tsx
import { GCAccordion } from '@/components/gc'

<GCAccordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content</p> },
    { id: '2', title: 'Section 2', content: <p>More content</p> }
  ]}
  allowMultiple={false}
/>
```

#### GCPagination
Page navigation for paginated content.

```tsx
import { GCPagination } from '@/components/gc'

<GCPagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
  maxVisible={5}
/>
```

## 🎨 Design Tokens

### Colors (oklch format)

```css
--primary: oklch(0.45 0.12 250)        /* GC Blue */
--secondary: oklch(0.50 0.20 25)       /* Orange for supertasks */
--accent: oklch(0.55 0.15 150)         /* Blue-green for success */
--background: oklch(0.98 0 0)          /* Off-white */
--foreground: oklch(0.20 0 0)          /* Near-black text */
```

### Spacing Scale

Components use an 8px grid system:
- `gap-2` (8px) - Between related elements
- `gap-4` (16px) - Between components
- `gap-6` (24px) - Between sections
- `gap-8` (32px) - Between major areas

## ♿ Accessibility Features

All components include:

- **Semantic HTML** - Proper element usage (button, input, nav, etc.)
- **ARIA labels** - Screen reader announcements for interactive elements
- **Keyboard navigation** - Full keyboard support with visible focus indicators
- **Color contrast** - All text meets WCAG AA standards (4.5:1 minimum)
- **Focus management** - Clear focus indicators with 2px rings
- **Error messaging** - Descriptive errors linked to form fields

## 🌐 Bilingual Support

Components are built to support both English and French:

- All labels can be provided in either language
- Right-to-left text is not required for Canadian bilingualism
- Text content scales properly for French translations (typically 20-30% longer)
- Error messages and helper text support both languages

## 🚀 Usage

Import components individually from the `@/components/gc` directory:

```tsx
import { GCButton, GCInput, GCAlert } from '@/components/gc'
```

Or import specific components:

```tsx
import { GCButton } from '@/components/gc/GCButton'
```

## 📱 Responsive Design

All components are mobile-first and fully responsive:

- Touch targets are minimum 44x44px
- Tables scroll horizontally on mobile
- Forms stack vertically
- Cards reflow from grid to single column

## 🔗 Resources

- [GC Design System](https://design-system.alpha.canada.ca/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Canada.ca Content Style Guide](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/canada-content-style-guide.html)

## 📄 License

Built for demonstration purposes following Government of Canada design standards.
