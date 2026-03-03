# SPEC-02: WET-BOEW Core Plugins Implementation
# 43 Components - Complete Specification for GitHub Agents

**Version**: 1.0.0  
**Date**: December 10, 2025  
**Category**: WET-BOEW Core Plugins  
**Status**: 38 of 43 components TO BE IMPLEMENTED (5 existing need refactor)

---

## 🎯 Category Overview

**Purpose**: Implement all 43 WET-BOEW 4.x core plugins as modern Lit 3.x Web Components

**Reference**: https://wet-boew.github.io/wet-boew/docs/ref/plugins-en.html

**Current Status**: 5/43 implemented (eva-tabs, eva-modal, eva-alert, gc-pagination, wb-*-partial)

**Target**: 100% feature parity with WET-BOEW 4.x, but using modern Web Components (NO jQuery)

---

## 📋 Component Inventory

### Group 1: Form & Validation (5 components)

#### 1. wb-formvalid - Client-Side Form Validation
**Reference**: https://wet-boew.github.io/wet-boew/demos/formvalid/formvalid-en.html

**Purpose**: Validate form inputs with inline error messages

**Acceptance Criteria**:
- ✅ Validates required fields (required attribute)
- ✅ Validates email format (type="email")
- ✅ Validates URL format (type="url")
- ✅ Validates number range (min, max attributes)
- ✅ Validates custom patterns (pattern attribute)
- ✅ Inline error messages (red text below field)
- ✅ Error summary at top of form
- ✅ Prevents submission if validation fails
- ✅ Accessible error announcements (ARIA live regions)
- ✅ Bilingual error messages (EN/FR)
- ✅ Keyboard navigation works
- ✅ Works with all EVA form components (eva-input, eva-select, etc.)

**Technical Implementation**:
```typescript
@customElement('wb-formvalid')
export class WBFormValid extends EVAElement {
  @property({ type: Boolean }) liveValidation = false;
  @property({ type: String}) errorSummaryHeading = 'The form has errors';
  
  // Methods
  validate(): boolean;
  showError(field: string, message: string): void;
  clearErrors(): void;
  
  // Events
  'wb-formvalid-submit': CustomEvent<{valid: boolean, errors: string[]}>;
  'wb-formvalid-error': CustomEvent<{field: string, message: string}>;
}
```

**Tests Required** (20 minimum):
1. ✅ Validates required fields
2. ✅ Validates email format
3. ✅ Validates URL format
4. ✅ Validates number range
5. ✅ Validates custom regex pattern
6. ✅ Shows inline error messages
7. ✅ Shows error summary
8. ✅ Prevents form submission on errors
9. ✅ Clears errors on field change
10. ✅ Announces errors to screen readers
11. ✅ Bilingual error messages work
12. ✅ Keyboard navigation through errors
13. ✅ Focus moves to first error field
14. ✅ Live validation updates as user types
15. ✅ Custom validation rules work
16. ✅ Multiple forms on page work independently
17. ✅ Works with eva-input component
18. ✅ Works with eva-select component
19. ✅ Works with eva-checkbox component
20. ✅ Works with eva-radio component

**Storybook Story**:
```typescript
export default {
  title: 'WET-BOEW/wb-formvalid',
  component: 'wb-formvalid',
  parameters: { docs: { /* ... */ } }
};

export const BasicValidation = {
  render: () => html`
    <wb-formvalid>
      <form>
        <eva-input 
          label="Email" 
          type="email" 
          required>
        </eva-input>
        <eva-input 
          label="Age" 
          type="number" 
          min="18" 
          max="120">
        </eva-input>
        <eva-button type="submit" variant="primary">Submit</eva-button>
      </form>
    </wb-formvalid>
  `
};

export const CustomValidation = { /* ... */ };
export const LiveValidation = { /* ... */ };
export const BilingualErrors = { /* ... */ };
```

**File Outputs**:
- `packages/web-components/src/components/wet-boew/wb-formvalid.ts`
- `packages/web-components/src/components/wet-boew/wb-formvalid.test.ts`
- `packages/web-components/src/components/wet-boew/wb-formvalid.stories.ts`

---

#### 2. wb-stepsform - Multi-Step Wizard Forms
**Reference**: https://wet-boew.github.io/wet-boew/demos/stepsform/stepsform-en.html

**Purpose**: Break long forms into multiple steps with progress indicator

**Acceptance Criteria**:
- ✅ Displays steps in sequence (Step 1 of 5)
- ✅ Progress indicator shows current step
- ✅ Validates current step before advancing
- ✅ Previous/Next buttons navigation
- ✅ Can jump to completed steps
- ✅ Cannot jump to future steps
- ✅ Save progress (localStorage)
- ✅ Restore progress on page load
- ✅ Keyboard shortcuts (Ctrl+Left/Right for Prev/Next)
- ✅ Accessible step labels (ARIA)
- ✅ Bilingual step labels
- ✅ Mobile responsive (vertical progress indicator)

**Technical Implementation**:
```typescript
@customElement('wb-stepsform')
export class WBStepsForm extends EVAElement {
  @property({ type: Number }) currentStep = 1;
  @property({ type: Number }) totalSteps = 5;
  @property({ type: Boolean }) saveProgress = false;
  @property({ type: Array }) stepLabels = [];
  
  nextStep(): void;
  previousStep(): void;
  goToStep(stepNumber: number): void;
  saveState(): void;
  restoreState(): void;
  
  'wb-stepsform-next': CustomEvent<{from: number, to: number}>;
  'wb-stepsform-previous': CustomEvent<{from: number, to: number}>;
  'wb-stepsform-complete': CustomEvent<{data: object}>;
}
```

**Tests Required** (20 minimum):
1-20. [Full test list omitted for brevity - follows same pattern]

**File Outputs**:
- `packages/web-components/src/components/wet-boew/wb-stepsform.ts`
- `packages/web-components/src/components/wet-boew/wb-stepsform.test.ts`
- `packages/web-components/src/components/wet-boew/wb-stepsform.stories.ts`

---

#### 3. wb-postback - AJAX Form Submission
**Purpose**: Submit forms via AJAX without page reload

**Acceptance Criteria**:
- ✅ Submits form data via XMLHttpRequest/fetch
- ✅ Displays loading spinner during submission
- ✅ Shows success message on completion
- ✅ Shows error message on failure
- ✅ Prevents double submission
- ✅ Supports multipart/form-data (file uploads)
- ✅ Custom success/error handlers
- ✅ Bilingual status messages
- ✅ Accessible status announcements

[Full specification continues...]

---

#### 4. wb-pii-scrub - PII Removal Before Submit
**Purpose**: Remove personally identifiable information before form submission (privacy compliance)

**Acceptance Criteria**:
- ✅ Scrubs social insurance numbers (SIN)
- ✅ Scrubs credit card numbers
- ✅ Scrubs email addresses
- ✅ Scrubs phone numbers
- ✅ Custom PII patterns (regex)
- ✅ Warns user before scrubbing
- ✅ Logs scrubbed fields
- ✅ Bilingual warnings

[Full specification continues...]

---

#### 5. wb-session-timeout - Session Timeout Warnings
**Reference**: https://wet-boew.github.io/wet-boew/demos/session-timeout/session-timeout-en.html

**Purpose**: Warn users before session expires (MANDATORY for GC authenticated apps)

**Acceptance Criteria**:
- ✅ Modal warning at 20 minutes (configurable)
- ✅ Countdown timer displays remaining time
- ✅ "Continue Session" button extends session
- ✅ "Sign Out" button ends session
- ✅ Auto sign-out at 30 minutes (configurable)
- ✅ Keyboard accessible (focus trap in modal)
- ✅ Screen reader announces warning
- ✅ Bilingual modal content
- ✅ WCAG 2.2 AAA compliant

**Technical Implementation**:
```typescript
@customElement('wb-session-timeout')
export class WBSessionTimeout extends EVAElement {
  @property({ type: Number }) sessionDuration = 1800000; // 30 min in ms
  @property({ type: Number }) warningTime = 600000; // 10 min before expiry
  @property({ type: String }) sessionEndpoint = '/api/session/refresh';
  
  startTimer(): void;
  resetTimer(): void;
  showWarning(): void;
  continueSession(): void;
  endSession(): void;
  
  'wb-session-timeout-warning': CustomEvent<{remaining: number}>;
  'wb-session-timeout-end': CustomEvent<void>;
  'wb-session-timeout-continue': CustomEvent<void>;
}
```

**Tests Required** (20 minimum):
1. ✅ Starts countdown on page load
2. ✅ Shows modal at warning time
3. ✅ Countdown timer updates every second
4. ✅ Continue button extends session
5. ✅ Sign out button ends session
6. ✅ Auto sign-out after timeout
7. ✅ Keyboard navigation in modal
8. ✅ Esc key closes modal (but doesn't reset timer)
9. ✅ Focus trap works in modal
10. ✅ Screen reader announces warning
11. ✅ Bilingual modal content
12. ✅ Custom session duration works
13. ✅ Custom warning time works
14. ✅ Session refresh endpoint called
15. ✅ Multiple tabs sync session state
16. ✅ Page visibility API pauses timer when hidden
17. ✅ Timer resumes on page visible
18. ✅ Modal shows on all tabs simultaneously
19. ✅ WCAG 2.2 AAA compliant
20. ✅ Works with GCKey authentication flow

**File Outputs**:
- `packages/web-components/src/components/wet-boew/wb-session-timeout.ts`
- `packages/web-components/src/components/wet-boew/wb-session-timeout.test.ts`
- `packages/web-components/src/components/wet-boew/wb-session-timeout.stories.ts`

---

### Group 2: Navigation & Interaction (7 components)

#### 6. wb-accordion - Expand/Collapse Panels
**Reference**: https://wet-boew.github.io/wet-boew/demos/details/details-en.html

**Purpose**: Collapsible content panels (show/hide)

**Acceptance Criteria**:
- ✅ Expand/collapse on click
- ✅ Expand/collapse on Enter/Space
- ✅ Arrow keys navigate between panels
- ✅ Icon rotates on expand/collapse
- ✅ Smooth animation (CSS transitions)
- ✅ "Expand All" / "Collapse All" buttons
- ✅ Default expanded state configurable
- ✅ ARIA accordion pattern (role, aria-expanded)
- ✅ Keyboard accessible
- ✅ Screen reader friendly
- ✅ Bilingual labels

**Technical Implementation**:
```typescript
@customElement('wb-accordion')
export class WBAccordion extends EVAElement {
  @property({ type: Boolean }) multiExpand = false;
  @property({ type: Boolean }) expandAll = false;
  @property({ type: Number }) activeIndex = -1;
  
  expand(index: number): void;
  collapse(index: number): void;
  toggle(index: number): void;
  expandAllPanels(): void;
  collapseAllPanels(): void;
  
  'wb-accordion-expand': CustomEvent<{index: number}>;
  'wb-accordion-collapse': CustomEvent<{index: number}>;
}
```

[Continues with 20 tests, Storybook stories, file outputs...]

---

#### 7. wb-toggle - Show/Hide Content Toggle
**Purpose**: Simple show/hide toggle for content sections

[Full specification...]

---

#### 8. wb-menu - Dropdown Navigation Menus
**Reference**: https://wet-boew.github.io/wet-boew/demos/menu/menu-en.html

**Purpose**: Accessible dropdown menus with keyboard navigation

**Acceptance Criteria**:
- ✅ Opens on click or hover
- ✅ Closes on Esc or outside click
- ✅ Arrow keys navigate menu items
- ✅ Enter/Space activates menu item
- ✅ Tab moves to next menu
- ✅ Submenus (nested dropdowns)
- ✅ Focus management (returns to trigger)
- ✅ ARIA menu pattern (role="menu", role="menuitem")
- ✅ Touch-friendly (44px targets)
- ✅ Bilingual menu items
- ✅ RTL support (future)

[Full specification continues...]

---

#### 9. wb-overlay - Modal Overlays
**Purpose**: Modal dialogs with backdrop (similar to eva-modal but WET-BOEW API compatible)

[Full specification...]

---

#### 10. wb-lightbox - Image/Video Galleries
**Reference**: https://wet-boew.github.io/wet-boew/demos/lightbox/lightbox-en.html

**Purpose**: Popup galleries for images and videos with prev/next navigation

[Full specification...]

---

#### 11. wb-slideout - Slide-Out Panels
**Purpose**: Panels that slide in from left/right/top/bottom

[Full specification...]

---

#### 12. wb-collapsible-alerts - Collapsible Alert Boxes
**Purpose**: Alerts that can be dismissed or collapsed

[Full specification...]

---

### Group 3: Data Display (5 components)

#### 13. wb-tables - DataTables Integration
**Reference**: https://wet-boew.github.io/wet-boew/demos/tables/tables-en.html

**Purpose**: Sortable, filterable, paginated tables with export functionality

**Acceptance Criteria**:
- ✅ Column sorting (ascending/descending)
- ✅ Multi-column sorting
- ✅ Search/filter across all columns
- ✅ Per-column filtering
- ✅ Pagination (10, 25, 50, 100, All rows)
- ✅ Export to CSV
- ✅ Export to Excel
- ✅ Export to PDF
- ✅ Responsive (stacked on mobile)
- ✅ Keyboard navigation (Tab through headers)
- ✅ Screen reader accessible (ARIA sort)
- ✅ Bilingual headers and controls
- ✅ Row selection (checkboxes)
- ✅ Bulk actions on selected rows

**Technical Implementation**:
```typescript
@customElement('wb-tables')
export class WBTables extends EVAElement {
  @property({ type: Array }) data = [];
  @property({ type: Array }) columns = [];
  @property({ type: Number }) pageSize = 10;
  @property({ type: Boolean }) sortable = true;
  @property({ type: Boolean }) filterable = true;
  @property({ type: Boolean }) exportable = true;
  
  sort(column: string, direction: 'asc' | 'desc'): void;
  filter(column: string, value: string): void;
  exportCSV(): void;
  exportExcel(): void;
  exportPDF(): void;
  selectRow(index: number): void;
  selectAllRows(): void;
  
  'wb-tables-sort': CustomEvent<{column: string, direction: string}>;
  'wb-tables-filter': CustomEvent<{column: string, value: string}>;
  'wb-tables-export': CustomEvent<{format: string, data: any[]}>;
  'wb-tables-select': CustomEvent<{selected: number[]}>;
}
```

**Tests Required** (25 minimum - complex component):
1. ✅ Sorts columns ascending
2. ✅ Sorts columns descending
3. ✅ Multi-column sort works
4. ✅ Global search filters all columns
5. ✅ Per-column filter works
6. ✅ Pagination shows correct rows
7. ✅ Page size change works
8. ✅ Export CSV downloads file
9. ✅ Export Excel downloads file
10. ✅ Export PDF downloads file
11. ✅ Responsive mode stacks columns
12. ✅ Keyboard navigation through headers
13. ✅ Enter/Space toggles sort
14. ✅ ARIA sort attribute updates
15. ✅ Screen reader announces sort direction
16. ✅ Row selection works
17. ✅ Select all checkbox works
18. ✅ Bulk actions on selected rows
19. ✅ Empty state displays message
20. ✅ Loading state shows spinner
21. ✅ Bilingual headers work
22. ✅ Bilingual pagination controls
23. ✅ Large datasets (1000+ rows) perform well
24. ✅ Virtual scrolling for 10000+ rows
25. ✅ WCAG 2.2 AAA compliant

[Continues with Storybook stories, file outputs...]

---

#### 14. wb-charts - Charts and Graphs
**Reference**: https://wet-boew.github.io/wet-boew/demos/charts/charts-en.html

**Purpose**: Data visualization with Chart.js integration

**Acceptance Criteria**:
- ✅ Bar charts (vertical/horizontal)
- ✅ Line charts
- ✅ Pie charts
- ✅ Donut charts
- ✅ Radar charts
- ✅ Scatter plots
- ✅ Accessible data table fallback
- ✅ Keyboard navigation through data points
- ✅ Screen reader accessible (ARIA labels)
- ✅ Bilingual axis labels
- ✅ Responsive (resizes with container)
- ✅ Custom colors (GC Design System palette)
- ✅ Export as PNG/SVG
- ✅ Tooltips on hover
- ✅ Legend toggles data series

[Full specification continues...]

---

#### 15. wb-calendar - Calendar of Events
**Reference**: https://wet-boew.github.io/wet-boew/demos/cal-events/cal-events-en.html

**Purpose**: Display events in month/week/day calendar views

[Full specification...]

---

#### 16. wb-feeds - RSS/Atom Feed Aggregation
**Purpose**: Display RSS/Atom feeds with caching

[Full specification...]

---

#### 17. wb-filter - Content Filtering
**Purpose**: Filter content by keywords, tags, categories

[Full specification...]

---

### Group 4: Data Integration (5 components)

#### 18. wb-data-ajax - AJAX Content Loading
**Purpose**: Load content dynamically via AJAX

[Full specification...]

---

#### 19. wb-data-json - JSON Data Templating
**Reference**: https://wet-boew.github.io/wet-boew/demos/data-json/data-json-en.html

**Purpose**: Render JSON data using templates

[Full specification...]

---

#### 20. wb-data-picture - Responsive Images
**Purpose**: Responsive image loading (srcset, picture element)

[Full specification...]

---

#### 21. wb-data-inview - Lazy Loading
**Purpose**: Load content when scrolled into viewport (performance optimization)

[Full specification...]

---

#### 22. wb-tagfilter - Tag-Based Filtering
**Purpose**: Filter content by tags/labels

[Full specification...]

---

### Group 5: Media & Maps (3 components)

#### 23. wb-multimedia - Accessible Video/Audio Player
**Reference**: https://wet-boew.github.io/wet-boew/demos/multimedia/multimedia-en.html

**Purpose**: Accessible media player with captions, transcripts, audio description

**Acceptance Criteria**:
- ✅ Video playback (MP4, WebM)
- ✅ Audio playback (MP3, OGG)
- ✅ Closed captions (WebVTT)
- ✅ Subtitles (multiple languages)
- ✅ Audio description track
- ✅ Transcript display (synchronized)
- ✅ Keyboard controls (Space=play/pause, Arrow=skip, M=mute)
- ✅ Screen reader accessible
- ✅ Bilingual controls (EN/FR)
- ✅ Playback speed control
- ✅ Volume control
- ✅ Fullscreen mode
- ✅ Picture-in-picture
- ✅ WCAG 2.2 AAA compliant (captions required)

[Full specification continues...]

---

#### 24. wb-geomap - Interactive Maps
**Reference**: https://wet-boew.github.io/wet-boew/demos/geomap/geomap-en.html

**Purpose**: Interactive maps with markers, overlays, geolocation

**Acceptance Criteria**:
- ✅ Displays map (OpenStreetMap or Leaflet)
- ✅ Markers with popups
- ✅ Zoom controls
- ✅ Pan with mouse or touch
- ✅ Geolocation (find user's location)
- ✅ Overlays (polygons, lines, circles)
- ✅ Legend
- ✅ Keyboard accessible (Tab through markers, Enter to open popup)
- ✅ Screen reader accessible (marker labels)
- ✅ Bilingual map labels
- ✅ Mobile responsive

[Full specification continues...]

---

#### 25. wb-prettify - Code Syntax Highlighting
**Reference**: https://wet-boew.github.io/wet-boew/demos/prettify/prettify-en.html

**Purpose**: Syntax highlighting for code blocks

[Full specification...]

---

### Group 6: Utilities (18 components)

#### 26. wb-add-cal - Add to Calendar
**Purpose**: Generate .ics file for calendar apps

[Full specification...]

---

#### 27. wb-bgimg - Background Image Management
**Purpose**: Lazy load background images

[Full specification...]

---

#### 28. wb-equalheight - Equal Height Columns
**Purpose**: Make columns equal height (CSS + JS fallback)

[Full specification...]

---

#### 29. wb-favicon - Dynamic Favicon
**Purpose**: Change favicon dynamically (notification badges)

[Full specification...]

---

#### 30. wb-footnotes - Accessible Footnotes
**Purpose**: Inline footnotes with return links

[Full specification...]

---

#### 31. wb-texthighlight - Keyword Highlighting
**Purpose**: Highlight keywords in text (search results)

[Full specification...]

---

#### 32. wb-zebra - Zebra Striping
**Purpose**: Alternate row colors in tables/lists

[Full specification...]

---

#### 33. wb-share - Social Media Sharing
**Purpose**: Share buttons for Facebook, Twitter, LinkedIn, email

[Full specification...]

---

#### 34-43. [Remaining Utility Components]
- wb-facebook (Facebook embedded pages)
- wb-twitter (Twitter embedded timelines)
- wb-country-content (Geolocation-based content)
- wb-exitscript (Exit confirmation for external links)
- wb-feedback (Page feedback form)
- wb-details (HTML5 details polyfill)
- wb-fieldflow (Form wizard/decision tree)
- wb-archived (Archived content warning)
- wb-dismissable (User-dismissible content)
- wb-randomize (Random child element selection)

[Each with full specifications...]

---

## 📊 Summary Statistics

**Total Components**: 43  
**Existing Components**: 5 (eva-tabs, eva-modal, eva-alert, gc-pagination, partials)  
**To Implement**: 38  
**Total Tests Required**: ~860 (20 tests × 43 components)  
**Total Story Files**: 43  
**Estimated LOC**: ~12,900 (300 LOC per component average)

---

## ✅ Definition of Done (Per Component)

Each of 43 components is complete when:

1. ✅ TypeScript implementation in `wet-boew/wb-*.ts`
2. ✅ Extends `EVAElement` base class
3. ✅ Uses Shadow DOM
4. ✅ TypeScript strict mode passes
5. ✅ ≥20 unit tests (Vitest)
6. ✅ ≥5 integration tests (user interactions)
7. ✅ axe-core accessibility tests pass
8. ✅ Storybook story with ≥3 examples
9. ✅ JSDoc comments complete
10. ✅ Bilingual labels (EN-CA/FR-CA)
11. ✅ Keyboard navigation tested
12. ✅ Responsive design verified
13. ✅ Framework wrappers generated (React/Vue/Angular/Svelte)
14. ✅ Usage examples written
15. ✅ Visual regression screenshot

---

## 🚀 Implementation Order (Priority)

### Phase 1: High-Priority Interactive (8 components)
1. wb-accordion (used on 80%+ of GC pages)
2. wb-tables (data display essential)
3. wb-charts (data visualization essential)
4. wb-formvalid (form validation critical)
5. wb-session-timeout (MANDATORY for authenticated apps)
6. wb-menu (navigation essential)
7. wb-multimedia (media playback)
8. wb-geomap (maps common on GC sites)

### Phase 2: Forms & Validation (4 components)
9. wb-stepsform
10. wb-postback
11. wb-pii-scrub
12. wb-fieldflow

### Phase 3: Content Display (5 components)
13. wb-calendar
14. wb-feeds
15. wb-filter
16. wb-data-json
17. wb-tagfilter

### Phase 4: Media & Utilities (10 components)
18-27. [Remaining components]

### Phase 5: Social & External (16 components)
28-43. [Remaining components]

---

## 📖 Reference Documents

- **WET-BOEW 4.x Documentation**: https://wet-boew.github.io/wet-boew/docs/ref/plugins-en.html
- **WET-BOEW GitHub**: https://github.com/wet-boew/wet-boew
- **GC Design System**: https://design.canada.ca/
- **WCAG 2.2**: https://www.w3.org/WAI/WCAG22/quickref/
- **Lit Framework**: https://lit.dev/
- **TypeScript**: https://www.typescriptlang.org/

---

**END OF SPEC-02**

**Next**: SPEC-03 (GC Mandatory Patterns), SPEC-04 (GC Design Patterns), SPEC-05 (Page Templates)
