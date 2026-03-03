# SPEC-04: GCWeb Design Patterns
# 40 Design Components for Enhanced User Experience

**Version**: 1.0.0  
**Date**: December 10, 2025  
**Category**: GCWeb Design Patterns  
**Status**: TO BE IMPLEMENTED (0/40 complete)

---

## 🎯 Overview

**Purpose**: Implement 40 GC Design System patterns for enhanced user experience

**Source**: https://design.canada.ca/common-design-patterns/

**Status**: None implemented yet (0% complete)

**Priority**: HIGH - These patterns significantly improve usability and user satisfaction on GC websites

---

## 📋 Component Groups

### Group 1: Service Initiation Patterns (7 components)

#### 1. gc-services-info (Services and Information)

**Purpose**: Doormat pattern for service discovery (e.g., homepage topic sections)

**Acceptance Criteria** (25 total):
1. ✅ Grid layout (2-3 columns desktop, 1 column mobile)
2. ✅ Heading for each service section
3. ✅ List of links (5-7 links per section)
4. ✅ Links underlined on hover/focus
5. ✅ WCAG AAA contrast
6. ✅ Keyboard accessible
7. ✅ ARIA navigation landmark
8. ✅ Responsive: collapses to single column on mobile
9. ✅ Icons optional (service-specific)
10. ✅ Bilingual headings and links
11. ✅ Screen reader announces section headings
12. ✅ TypeScript types complete
13. ✅ 25+ unit tests
14. ✅ Storybook story
15. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-services-info')
export class GCServicesInfo extends EVAElement {
  @property({ type: Array })
  sections: Array<{
    heading: string;
    links: Array<{ label: string; href: string; icon?: string }>;
  }> = [];

  @property({ type: Number })
  columns: 2 | 3 = 3;
}
```

---

#### 2. gc-most-requested (Most Requested)

**Purpose**: Highlight top services/tasks (e.g., "Most requested" section on homepage)

**Acceptance Criteria** (20 total):
1. ✅ Prominent visual treatment
2. ✅ 5-7 top links
3. ✅ Icons for each link
4. ✅ Responsive: horizontal scroll on mobile
5. ✅ WCAG AAA contrast
6. ✅ Keyboard accessible
7. ✅ Click tracking support
8. ✅ Bilingual labels
9. ✅ Screen reader announces "Most requested"
10. ✅ TypeScript types complete
11. ✅ 20+ unit tests
12. ✅ Storybook story
13. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-most-requested')
export class GCMostRequested extends EVAElement {
  @property({ type: Array })
  links: Array<{ label: string; href: string; icon: string }> = [];

  @property({ type: String })
  heading: string = 'Most requested';
}
```

---

#### 3. gc-subway-nav (Steps Navigation / Subway Pattern)

**Purpose**: Multi-step process navigation (e.g., "Apply for a passport" - 7 steps)

**Acceptance Criteria** (30 total):
1. ✅ Vertical list of steps
2. ✅ Current step highlighted
3. ✅ Completed steps marked (checkmark icon)
4. ✅ Future steps greyed out
5. ✅ Step numbers visible
6. ✅ Connecting lines between steps
7. ✅ Keyboard accessible
8. ✅ ARIA current="step"
9. ✅ Progress indicator (e.g., "Step 2 of 7")
10. ✅ Click to navigate (optional)
11. ✅ WCAG AAA contrast
12. ✅ Touch targets ≥44px
13. ✅ Bilingual step labels
14. ✅ Screen reader announces progress
15. ✅ Responsive: horizontal on mobile (optional)
16. ✅ TypeScript types complete
17. ✅ 30+ unit tests
18. ✅ Storybook story
19. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-subway-nav')
export class GCSubwayNav extends EVAElement {
  @property({ type: Array })
  steps: Array<{
    label: string;
    href?: string;
    status: 'completed' | 'current' | 'future';
  }> = [];

  @property({ type: Number })
  currentStep: number = 1;

  @property({ type: Boolean })
  allowNavigation: boolean = false; // Click to jump to step

  // Events
  // 'eva-step-change' - { detail: { step: number, label: string } }
}
```

---

#### 4. gc-contextual-alerts (Contextual Alerts)

**Purpose**: In-page alerts for warnings, errors, success messages

**Acceptance Criteria** (25 total):
1. ✅ 4 variants: error, warning, info, success
2. ✅ Icons for each variant (error: X, warning: triangle, info: i, success: checkmark)
3. ✅ Dismissible (close button)
4. ✅ ARIA alert role (assertive for errors)
5. ✅ WCAG AAA contrast (red #d3080c on white = 7.48:1)
6. ✅ Keyboard accessible (close button focusable)
7. ✅ Screen reader announces alert
8. ✅ Bilingual content
9. ✅ Custom icon support
10. ✅ Animation (fade in/out)
11. ✅ TypeScript types complete
12. ✅ 25+ unit tests
13. ✅ Storybook story (all 4 variants)
14. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-contextual-alerts')
export class GCContextualAlerts extends EVAElement {
  @property({ type: String })
  variant: 'error' | 'warning' | 'info' | 'success' = 'info';

  @property({ type: String })
  heading?: string;

  @property({ type: String })
  message: string = '';

  @property({ type: Boolean })
  dismissible: boolean = true;

  @property({ type: Boolean })
  visible: boolean = true;

  // Methods
  public show(): void;
  public hide(): void;

  // Events
  // 'eva-alert-close' - {}
}
```

---

#### 5. gc-feature-tiles (Feature Tiles)

**Purpose**: Visual grid of features/services with images

**Acceptance Criteria** (20 total):
1. ✅ Grid layout (2-4 columns)
2. ✅ Image + heading + description
3. ✅ Call-to-action link
4. ✅ Responsive: 1 column on mobile
5. ✅ WCAG AAA contrast
6. ✅ Images have alt text
7. ✅ Keyboard accessible
8. ✅ Hover effect (lift/shadow)
9. ✅ Bilingual content
10. ✅ TypeScript types complete
11. ✅ 20+ unit tests
12. ✅ Storybook story
13. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-feature-tiles')
export class GCFeatureTiles extends EVAElement {
  @property({ type: Array })
  features: Array<{
    image: string;
    alt: string;
    heading: string;
    description: string;
    href: string;
    ctaLabel: string;
  }> = [];

  @property({ type: Number })
  columns: 2 | 3 | 4 = 3;
}
```

---

#### 6. gc-carousel (Content Carousel)

**Purpose**: Rotating content carousel (e.g., news highlights)

**Acceptance Criteria** (30 total):
1. ✅ Auto-play (optional)
2. ✅ Previous/Next buttons
3. ✅ Dot indicators (pagination)
4. ✅ Pause on hover
5. ✅ Pause button (WCAG 2.2 requirement)
6. ✅ Keyboard accessible (Arrow keys)
7. ✅ ARIA live region (announces slide change)
8. ✅ WCAG AAA contrast
9. ✅ Touch swipe support (mobile)
10. ✅ Lazy loading images
11. ✅ Bilingual content
12. ✅ Screen reader announces current slide (e.g., "Slide 2 of 5")
13. ✅ TypeScript types complete
14. ✅ 30+ unit tests
15. ✅ Storybook story
16. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-carousel')
export class GCCarousel extends EVAElement {
  @property({ type: Array })
  slides: Array<{
    image: string;
    alt: string;
    heading: string;
    description: string;
    href?: string;
  }> = [];

  @property({ type: Boolean })
  autoPlay: boolean = false;

  @property({ type: Number })
  interval: number = 5000; // ms

  @property({ type: Number })
  currentSlide: number = 0;

  // Methods
  public play(): void;
  public pause(): void;
  public next(): void;
  public prev(): void;
  public goToSlide(index: number): void;

  // Events
  // 'eva-carousel-slide-change' - { detail: { currentSlide: number } }
}
```

---

#### 7. gc-topic-menu (Topic Menu)

**Purpose**: Navigate topics/themes (e.g., "Jobs", "Immigration", "Taxes")

**Acceptance Criteria** (20 total):
1. ✅ Grid layout (2-3 columns)
2. ✅ Topic icons
3. ✅ Topic heading + description
4. ✅ Link to topic page
5. ✅ Responsive: 1 column on mobile
6. ✅ WCAG AAA contrast
7. ✅ Keyboard accessible
8. ✅ Bilingual content
9. ✅ TypeScript types complete
10. ✅ 20+ unit tests
11. ✅ Storybook story
12. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-topic-menu')
export class GCTopicMenu extends EVAElement {
  @property({ type: Array })
  topics: Array<{
    icon: string;
    heading: string;
    description: string;
    href: string;
  }> = [];

  @property({ type: Number })
  columns: 2 | 3 = 3;
}
```

---

### Group 2: Content Organization Patterns (8 components)

#### 8. gc-expand-collapse (Expand/Collapse)

**Purpose**: Accordion pattern for FAQs, help content

**Acceptance Criteria** (25 total):
1. ✅ Multiple panels
2. ✅ Expand/collapse on click
3. ✅ Allow multiple open (optional)
4. ✅ Animated transitions
5. ✅ Keyboard accessible (Tab, Enter, Space)
6. ✅ ARIA accordion pattern
7. ✅ WCAG AAA contrast
8. ✅ Focus indicators
9. ✅ Screen reader announces expanded/collapsed state
10. ✅ Bilingual content
11. ✅ Deep link to expanded panel (URL hash)
12. ✅ TypeScript types complete
13. ✅ 25+ unit tests
14. ✅ Storybook story
15. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-expand-collapse')
export class GCExpandCollapse extends EVAElement {
  @property({ type: Array })
  panels: Array<{
    id: string;
    heading: string;
    content: string;
    expanded: boolean;
  }> = [];

  @property({ type: Boolean })
  allowMultiple: boolean = false;

  // Methods
  public expandPanel(id: string): void;
  public collapsePanel(id: string): void;
  public togglePanel(id: string): void;

  // Events
  // 'eva-panel-expand' - { detail: { id: string, heading: string } }
  // 'eva-panel-collapse' - { detail: { id: string } }
}
```

---

#### 9. gc-tabbed-interface (Tabs)

**Purpose**: Tabbed content organization

**Acceptance Criteria** (25 total):
1. ✅ Tab list + tab panels
2. ✅ Keyboard navigation (Arrow keys, Home, End)
3. ✅ ARIA tabs pattern
4. ✅ Active tab highlighted
5. ✅ Responsive: vertical tabs on mobile
6. ✅ WCAG AAA contrast
7. ✅ Focus indicators
8. ✅ Screen reader announces active tab
9. ✅ Bilingual tab labels
10. ✅ Deep link to tab (URL hash)
11. ✅ TypeScript types complete
12. ✅ 25+ unit tests
13. ✅ Storybook story
14. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-tabbed-interface')
export class GCTabbedInterface extends EVAElement {
  @property({ type: Array })
  tabs: Array<{
    id: string;
    label: string;
    content: string;
  }> = [];

  @property({ type: Number })
  activeTab: number = 0;

  // Methods
  public selectTab(index: number): void;

  // Events
  // 'eva-tab-change' - { detail: { index: number, id: string, label: string } }
}
```

---

#### 10. gc-steps-form (Multi-Step Form)

**Purpose**: Wizard pattern for complex forms (e.g., application processes)

**Acceptance Criteria** (30 total):
1. ✅ Multiple steps (3-7 steps)
2. ✅ Step indicator (breadcrumb/progress bar)
3. ✅ Next/Previous buttons
4. ✅ Step validation
5. ✅ Save progress (localStorage)
6. ✅ Review step (summary of all inputs)
7. ✅ Keyboard accessible
8. ✅ ARIA form landmarks
9. ✅ WCAG AAA contrast
10. ✅ Error messages bilingual
11. ✅ Screen reader announces step changes
12. ✅ TypeScript types complete
13. ✅ 30+ unit tests
14. ✅ Storybook story
15. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-steps-form')
export class GCStepsForm extends EVAElement {
  @property({ type: Array })
  steps: Array<{
    id: string;
    label: string;
    fields: Array<any>; // Form fields configuration
  }> = [];

  @property({ type: Number })
  currentStep: number = 0;

  @property({ type: Object })
  formData: Record<string, any> = {};

  // Methods
  public nextStep(): Promise<boolean>; // Returns false if validation fails
  public prevStep(): void;
  public goToStep(index: number): void;
  public saveProgress(): void;
  public loadProgress(): void;
  public reset(): void;

  // Events
  // 'eva-step-validate' - { detail: { step: number, valid: boolean, errors: string[] } }
  // 'eva-form-submit' - { detail: { formData: Record<string, any> } }
}
```

---

#### 11. gc-page-details (Page Details / Metadata)

**Purpose**: Display page metadata (published date, modified date, contributors)

**Acceptance Criteria** (15 total):
1. ✅ Published date
2. ✅ Modified date
3. ✅ Contributors (authors)
4. ✅ Content ID (optional)
5. ✅ ISO 8601 date format
6. ✅ Bilingual labels ("Date modified:" / "Date de modification :")
7. ✅ WCAG AAA contrast
8. ✅ Screen reader accessible
9. ✅ TypeScript types complete
10. ✅ 15+ unit tests
11. ✅ Storybook story
12. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-page-details')
export class GCPageDetails extends EVAElement {
  @property({ type: String })
  publishedDate?: string; // ISO 8601

  @property({ type: String })
  modifiedDate?: string; // ISO 8601

  @property({ type: Array })
  contributors: string[] = [];

  @property({ type: String })
  contentId?: string;
}
```

---

#### 12. gc-feedback-widget (Page Feedback)

**Purpose**: "Did you find what you were looking for?" feedback widget

**Acceptance Criteria** (25 total):
1. ✅ Yes/No buttons
2. ✅ Follow-up question if "No" ("What was wrong?")
3. ✅ Text area for additional feedback
4. ✅ Submit button
5. ✅ Thank you message after submit
6. ✅ Data submission (API endpoint configurable)
7. ✅ Keyboard accessible
8. ✅ WCAG AAA contrast
9. ✅ Bilingual labels
10. ✅ Screen reader accessible
11. ✅ Privacy notice
12. ✅ TypeScript types complete
13. ✅ 25+ unit tests
14. ✅ Storybook story
15. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-feedback-widget')
export class GCFeedbackWidget extends EVAElement {
  @property({ type: String })
  apiEndpoint?: string; // Where to POST feedback

  @property({ type: Boolean })
  submitted: boolean = false;

  // Methods
  public submitFeedback(helpful: boolean, comments?: string): Promise<void>;

  // Events
  // 'eva-feedback-submit' - { detail: { helpful: boolean, comments: string } }
}
```

---

#### 13. gc-filterable-list (Filter Interface)

**Purpose**: Filter/sort lists (e.g., search results, directories)

**Acceptance Criteria** (30 total):
1. ✅ Filter controls (checkboxes, dropdowns, text input)
2. ✅ Sort controls (dropdown)
3. ✅ Results count ("Showing 25 of 100 results")
4. ✅ Clear filters button
5. ✅ Live results update (no page reload)
6. ✅ ARIA live region (announces result count)
7. ✅ Keyboard accessible
8. ✅ WCAG AAA contrast
9. ✅ Touch-friendly controls
10. ✅ Bilingual labels
11. ✅ Screen reader announces filter changes
12. ✅ URL parameter support (bookmarkable)
13. ✅ TypeScript types complete
14. ✅ 30+ unit tests
15. ✅ Storybook story
16. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-filterable-list')
export class GCFilterableList extends EVAElement {
  @property({ type: Array })
  items: Array<Record<string, any>> = [];

  @property({ type: Array })
  filters: Array<{
    id: string;
    label: string;
    type: 'checkbox' | 'dropdown' | 'text';
    options?: Array<{ value: string; label: string }>;
  }> = [];

  @property({ type: Array })
  activeFilters: Array<{ filterId: string; value: any }> = [];

  @property({ type: String })
  sortBy?: string;

  @property({ type: String })
  sortOrder: 'asc' | 'desc' = 'asc';

  // Methods
  public applyFilter(filterId: string, value: any): void;
  public clearFilters(): void;
  public sort(field: string, order: 'asc' | 'desc'): void;
  public getFilteredItems(): Array<Record<string, any>>;

  // Events
  // 'eva-filter-change' - { detail: { activeFilters: Array<any>, resultCount: number } }
  // 'eva-sort-change' - { detail: { sortBy: string, sortOrder: string } }
}
```

---

#### 14. gc-tag-filter (Tag-Based Filter)

**Purpose**: Filter content by tags/categories

**Acceptance Criteria** (20 total):
1. ✅ Tag cloud or tag list
2. ✅ Active tags highlighted
3. ✅ Click to toggle tag
4. ✅ Results update live
5. ✅ Clear all tags button
6. ✅ Keyboard accessible
7. ✅ WCAG AAA contrast
8. ✅ Bilingual tags
9. ✅ Screen reader announces active tags
10. ✅ TypeScript types complete
11. ✅ 20+ unit tests
12. ✅ Storybook story
13. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-tag-filter')
export class GCTagFilter extends EVAElement {
  @property({ type: Array })
  tags: Array<{ id: string; label: string; count: number }> = [];

  @property({ type: Array })
  activeTags: string[] = [];

  // Methods
  public toggleTag(tagId: string): void;
  public clearTags(): void;

  // Events
  // 'eva-tag-change' - { detail: { activeTags: string[] } }
}
```

---

#### 15. gc-data-table (Enhanced Data Table)

**Purpose**: Sortable, filterable, paginated data table

**Acceptance Criteria** (35 total):
1. ✅ Column headers clickable (sort)
2. ✅ Sort indicator (up/down arrow)
3. ✅ Filter row (search per column)
4. ✅ Pagination
5. ✅ Row selection (checkboxes)
6. ✅ Bulk actions
7. ✅ Export (CSV, Excel)
8. ✅ Responsive: horizontal scroll on mobile
9. ✅ Sticky header
10. ✅ Keyboard accessible (Arrow keys navigate cells)
11. ✅ ARIA table/grid pattern
12. ✅ WCAG AAA contrast
13. ✅ Screen reader announces sort order
14. ✅ Bilingual headers and labels
15. ✅ TypeScript types complete
16. ✅ 35+ unit tests
17. ✅ Storybook story
18. ✅ Documentation complete

**TypeScript Interface**:
```typescript
@customElement('gc-data-table')
export class GCDataTable extends EVAElement {
  @property({ type: Array })
  columns: Array<{
    id: string;
    label: string;
    sortable: boolean;
    filterable: boolean;
    width?: string;
  }> = [];

  @property({ type: Array })
  rows: Array<Record<string, any>> = [];

  @property({ type: String })
  sortColumn?: string;

  @property({ type: String })
  sortOrder: 'asc' | 'desc' = 'asc';

  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: Number })
  pageSize: number = 25;

  // Methods
  public sort(columnId: string): void;
  public filter(columnId: string, value: string): void;
  public selectRow(rowIndex: number): void;
  public selectAllRows(): void;
  public exportCSV(): void;

  // Events
  // 'eva-table-sort' - { detail: { column: string, order: string } }
  // 'eva-table-filter' - { detail: { column: string, value: string } }
  // 'eva-row-select' - { detail: { selectedRows: number[] } }
}
```

---

### Group 3: Interactive Utilities (10 components)

#### 16-25: (Additional 10 components - tooltips, popovers, modals, drawers, notifications, progress bars, skeleton loaders, infinite scroll, sticky elements, back-to-top)

**Note**: Detailed specifications for components 16-40 follow the same pattern:
- Purpose statement
- 20-35 acceptance criteria
- TypeScript interface
- Test requirements (20-35+ tests)
- Storybook story
- File outputs

---

## ✅ Summary Acceptance Criteria

**All 40 GC Design Patterns are COMPLETE when**:

1. ✅ All 40 components implemented
2. ✅ All extend EVAElement base class
3. ✅ All use GC Design System tokens
4. ✅ All support bilingual (EN-CA/FR-CA)
5. ✅ All meet WCAG 2.2 AAA
6. ✅ All keyboard accessible
7. ✅ All have 100% test coverage
8. ✅ All have Storybook stories
9. ✅ All have complete documentation
10. ✅ 0 axe-core violations across all 40 components

---

## 📊 Testing Requirements

**Total Tests**: 1,000+ (25 per component × 40 components)

**Test Categories**:
- ✅ Unit tests (component logic)
- ✅ Integration tests (component interactions)
- ✅ Accessibility tests (axe-core, keyboard, screen reader)
- ✅ Visual regression tests (Chromatic)
- ✅ E2E tests (user workflows)

**Validation Command**:
```bash
npm test -- packages/web-components/src/components/gc-design/

# Expected Output:
# ✅ 1,000+ tests passing
# ✅ 100% coverage (statements, branches, functions, lines)
# ✅ 0 axe-core violations
```

---

**END OF SPEC-04**

**Next**: SPEC-05 (GC Page Templates - 25 templates)
