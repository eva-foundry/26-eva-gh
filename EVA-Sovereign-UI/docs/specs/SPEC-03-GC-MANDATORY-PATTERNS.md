# SPEC-03: GCWeb Mandatory Site-Wide Patterns
# 10 MANDATORY Components for GC Websites

**Version**: 1.0.0  
**Date**: December 10, 2025  
**Category**: GCWeb Mandatory Patterns  
**Status**: 10/10 IMPLEMENTED (requires refinement to meet full specification)

---

## 🎯 Overview

**Purpose**: Refine existing 10 mandatory GC patterns to meet 100% specification compliance

**Critical**: These 10 components are **MANDATORY** on ALL Government of Canada websites per TBS Web Standards (Treasury Board Secretariat). Non-compliance = site rejection.

**Current Status**: All 10 exist in `packages/web-components/src/components/gc-patterns/`, but need refinement:
- ✅ Basic implementation complete
- ⚠️ Need i18n API update (registerMessages → msg())
- ⚠️ Need full WCAG 2.2 AAA audit
- ⚠️ Need official GC assets verification
- ⚠️ Need comprehensive test coverage

---

## 📋 Component List

### 1. gc-global-header (Global Navigation)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-global-header.ts`

**Purpose**: Government of Canada global header with language toggle, search, and breadcrumbs

**Mandatory Elements**:
- Canada wordmark (FIP - Federal Identity Program)
- Language toggle (EN ⟷ FR)
- Search bar (optional but recommended)
- Theme/institution name
- Signature block (Canada flag + "Government of Canada / Gouvernement du Canada")

**Acceptance Criteria** (30 total):

✅ **Visual Requirements**:
1. Canada wordmark positioned top-left (FIP guidelines)
2. Language toggle top-right (AB testing - toggle vs link)
3. Theme/institution name below wordmark
4. Signature block with Canada flag SVG (official asset)
5. Responsive: mobile collapses to hamburger menu
6. White background (#fff)
7. Red FIP bar (#af3c43) - exact GC Design System color
8. Black text (#333) - WCAG AAA contrast on white

✅ **Functional Requirements**:
9. Language toggle emits `eva-locale-change` event
10. Search input emits `eva-search` event with query
11. Mobile menu toggles on hamburger click
12. Keyboard accessible (Tab, Enter, Escape)
13. Skip links appear on focus
14. ARIA landmarks (banner, navigation, search)

✅ **i18n Requirements**:
15. All labels bilingual (Search → Recherche, Menu → Menu)
16. ARIA labels bilingual
17. Placeholder text bilingual
18. No hardcoded strings

✅ **Accessibility Requirements** (WCAG 2.2 AAA):
19. Color contrast ≥7:1 (AAA)
20. Focus indicators ≥3px
21. Touch targets ≥44px
22. Screen reader announces language change
23. Keyboard navigation 100%
24. NVDA/JAWS/VoiceOver tested
25. No keyboard traps

✅ **Technical Requirements**:
26. Extends EVAElement base class
27. Uses GC Design System tokens
28. TypeScript strict mode passes
29. Emits standard events (CustomEvent pattern)
30. Documentation complete (JSDoc + Storybook)

**TypeScript Interface**:

```typescript
@customElement('gc-global-header')
export class GCGlobalHeader extends EVAElement {
  @property({ type: String })
  themeName?: string; // e.g., "Canada.ca" or institution name

  @property({ type: Boolean })
  showSearch: boolean = true;

  @property({ type: String })
  searchPlaceholder?: string; // Override default bilingual placeholder

  @property({ type: Boolean })
  showBreadcrumbs: boolean = false;

  @property({ type: Array })
  breadcrumbs: Array<{ label: string; href: string }> = [];

  // Methods
  public toggleLanguage(): void;
  public openMobileMenu(): void;
  public closeMobileMenu(): void;
  public focusSearch(): void;

  // Events
  // 'eva-locale-change' - { detail: { locale: 'en' | 'fr' } }
  // 'eva-search' - { detail: { query: string } }
  // 'eva-menu-toggle' - { detail: { open: boolean } }
}
```

**Test Requirements** (30 tests minimum):

```typescript
describe('gc-global-header', () => {
  it('renders Canada wordmark', async () => {
    const el = await fixture<GCGlobalHeader>(html`<gc-global-header></gc-global-header>`);
    const wordmark = el.shadowRoot!.querySelector('.canada-wordmark');
    expect(wordmark).to.exist;
  });

  it('toggles language on click', async () => {
    const el = await fixture<GCGlobalHeader>(html`<gc-global-header></gc-global-header>`);
    let eventFired = false;
    el.addEventListener('eva-locale-change', () => { eventFired = true; });
    
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('.language-toggle');
    toggle!.click();
    
    expect(eventFired).to.be.true;
  });

  it('meets WCAG 2.2 AAA contrast', async () => {
    const el = await fixture<GCGlobalHeader>(html`<gc-global-header></gc-global-header>`);
    await expect(el).to.be.accessible();
    
    const results = await axe(el);
    expect(results.violations).to.have.lengthOf(0);
  });

  it('is keyboard navigable', async () => {
    const el = await fixture<GCGlobalHeader>(html`<gc-global-header></gc-global-header>`);
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('.language-toggle');
    
    toggle!.focus();
    expect(document.activeElement).to.equal(toggle);
    
    // Simulate Enter key
    toggle!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    // Assert language toggle occurred
  });

  // ... 26 more tests covering all acceptance criteria
});
```

**Storybook Story**:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-global-header';

const meta: Meta = {
  title: 'GC Mandatory Patterns/gc-global-header',
  component: 'gc-global-header',
  tags: ['autodocs'],
  argTypes: {
    themeName: { control: 'text' },
    showSearch: { control: 'boolean' },
    showBreadcrumbs: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    themeName: 'Canada.ca',
    showSearch: true,
    showBreadcrumbs: false
  },
  render: (args) => html`
    <gc-global-header
      .themeName=${args.themeName}
      .showSearch=${args.showSearch}
      .showBreadcrumbs=${args.showBreadcrumbs}
    ></gc-global-header>
  `
};

export const WithBreadcrumbs: Story = {
  args: {
    themeName: 'Canada.ca',
    showBreadcrumbs: true,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Current Page', href: '#' }
    ]
  }
};

export const InstitutionalProfile: Story = {
  args: {
    themeName: 'Health Canada',
    showSearch: true
  }
};
```

**File Outputs**:
- ✅ `gc-global-header.ts` (exists, needs refinement)
- ✅ `gc-global-header.test.ts` (exists, needs more tests)
- ✅ `gc-global-header.stories.ts` (exists, needs all variants)
- 🔄 Update i18n API from registerMessages() to msg()
- 🔄 Add comprehensive accessibility tests (axe-core)
- 🔄 Verify Canada wordmark SVG is official asset

---

### 2. gc-global-footer (Site Footer)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-global-footer.ts`

**Purpose**: Government of Canada global footer with mandatory links

**Mandatory Elements**:
- GC logo (Canada wordmark)
- Mandatory links (Social media, Mobile applications, About, Terms, Privacy)
- Optional contextual links
- Language toggle (if not in header)
- Modified date (last updated)

**Acceptance Criteria** (25 total):

✅ **Visual Requirements**:
1. Three-column layout (desktop), stacked (mobile)
2. Black background (#333), white text (#fff)
3. Canada wordmark bottom-right
4. Clear visual hierarchy
5. Links underlined on hover/focus

✅ **Functional Requirements**:
6. All mandatory links present
7. Language toggle (if enabled)
8. Modified date displayed (ISO 8601 format)
9. Social media icons link to GC official accounts
10. Keyboard accessible

✅ **Content Requirements** (MANDATORY per TBS):
11. "Social media" link
12. "Mobile applications" link
13. "About Canada.ca" link
14. "Terms and conditions" link
15. "Privacy" link
16. Modified date label: "Date modified: YYYY-MM-DD"

✅ **i18n Requirements**:
17. All labels bilingual
18. Date format locale-aware (EN: YYYY-MM-DD, FR: YYYY-MM-DD)

✅ **Accessibility Requirements**:
19. WCAG 2.2 AAA contrast (white on #333 = 12.63:1)
20. Footer landmark (`<footer role="contentinfo">`)
21. Skip link to footer
22. Screen reader tested

✅ **Technical Requirements**:
23. Extends EVAElement
24. Uses GC Design System tokens
25. TypeScript strict mode passes

**TypeScript Interface**:

```typescript
@customElement('gc-global-footer')
export class GCGlobalFooter extends EVAElement {
  @property({ type: String })
  modifiedDate?: string; // ISO 8601: "2025-12-10"

  @property({ type: Boolean })
  showLanguageToggle: boolean = false;

  @property({ type: Array })
  contextualLinks: Array<{ label: string; href: string }> = [];

  @property({ type: Object })
  socialMediaLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
  } = {};

  // Methods
  public setModifiedDate(date: Date): void;

  // Events
  // 'eva-footer-link-click' - { detail: { href: string, label: string } }
}
```

**Test Requirements** (25 tests minimum):

```typescript
describe('gc-global-footer', () => {
  it('renders all mandatory links', async () => {
    const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
    const links = Array.from(el.shadowRoot!.querySelectorAll('a'));
    
    expect(links.some(link => link.textContent?.includes('Social media'))).to.be.true;
    expect(links.some(link => link.textContent?.includes('About Canada.ca'))).to.be.true;
    expect(links.some(link => link.textContent?.includes('Privacy'))).to.be.true;
  });

  it('displays modified date', async () => {
    const el = await fixture<GCGlobalFooter>(html`<gc-global-footer modifiedDate="2025-12-10"></gc-global-footer>`);
    const dateText = el.shadowRoot!.textContent;
    expect(dateText).to.include('2025-12-10');
  });

  it('meets WCAG AAA contrast (white on #333)', async () => {
    const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
    const results = await axe(el);
    expect(results.violations.filter(v => v.id === 'color-contrast')).to.have.lengthOf(0);
  });

  // ... 22 more tests
});
```

**File Outputs**:
- ✅ `gc-global-footer.ts` (exists, needs refinement)
- ✅ `gc-global-footer.test.ts` (exists, needs more tests)
- ✅ `gc-global-footer.stories.ts` (exists, needs all variants)

---

### 3. gc-signature (Canada Signature Block)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-signature.ts`

**Purpose**: Canada flag + "Government of Canada / Gouvernement du Canada" signature

**Mandatory Use**: MUST appear on EVERY GC web page (header or footer)

**Acceptance Criteria** (15 total):

1. ✅ Canada flag SVG (official asset)
2. ✅ Bilingual text: "Government of Canada / Gouvernement du Canada"
3. ✅ Text uses Lato font (GC Design System)
4. ✅ Proper spacing between flag and text
5. ✅ Responsive: scales appropriately
6. ✅ Accessible: ARIA label "Government of Canada"
7. ✅ No raster images (PNG/JPG) - SVG only
8. ✅ Color: Red flag (#af3c43), black text (#333)
9. ✅ WCAG AAA contrast
10. ✅ Works on white and light grey backgrounds
11. ✅ TypeScript types complete
12. ✅ Unit tests (15+)
13. ✅ Storybook story
14. ✅ Documentation complete
15. ✅ Official asset verification (flag SVG from design.canada.ca)

**TypeScript Interface**:

```typescript
@customElement('gc-signature')
export class GCSignature extends EVAElement {
  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  showBilingual: boolean = true;
}
```

**File Outputs**:
- ✅ `gc-signature.ts` (exists)
- ✅ `gc-signature.test.ts` (exists)
- ⚠️ `gc-signature.stories.ts` (exists but has import error - NEEDS FIX)

---

### 4. gc-language-toggle (Language Switcher)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-language-toggle.ts`

**Purpose**: Toggle between English and French (EN ⟷ FR)

**Mandatory Use**: MUST appear on EVERY GC web page (top-right)

**AB Testing Note**: Government of Canada is testing toggle vs link patterns - component supports both

**Acceptance Criteria** (20 total):

1. ✅ Toggle button shows opposite language (EN page → "Français", FR page → "English")
2. ✅ Emits `eva-locale-change` event
3. ✅ Keyboard accessible (Tab, Enter)
4. ✅ ARIA label describes action ("Switch to French")
5. ✅ Visual indicator on hover/focus
6. ✅ Respects user's locale preference
7. ✅ Updates document lang attribute
8. ✅ Announces change to screen readers
9. ✅ Works in both header and footer
10. ✅ Link variant supported (href="#")
11. ✅ Toggle variant supported (button)
12. ✅ WCAG AAA contrast
13. ✅ Touch target ≥44px
14. ✅ No page reload (runtime switching)
15. ✅ localStorage persistence
16. ✅ URL parameter support (?lang=fr)
17. ✅ TypeScript types complete
18. ✅ Unit tests (20+)
19. ✅ Storybook story (both variants)
20. ✅ Documentation complete

**TypeScript Interface**:

```typescript
@customElement('gc-language-toggle')
export class GCLanguageToggle extends EVAElement {
  @property({ type: String })
  variant: 'toggle' | 'link' = 'toggle';

  @property({ type: String })
  currentLocale: 'en' | 'fr' = 'en';

  // Methods
  public toggleLanguage(): void;

  // Events
  // 'eva-locale-change' - { detail: { locale: 'en' | 'fr' } }
}
```

**File Outputs**:
- ✅ `gc-language-toggle.ts` (exists)
- ✅ `gc-language-toggle.test.ts` (exists)
- ✅ `gc-language-toggle.stories.ts` (exists)

---

### 5. gc-breadcrumbs (Breadcrumb Trail)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-breadcrumbs.ts`

**Purpose**: Hierarchical navigation trail (Home > Services > Current Page)

**Mandatory Use**: REQUIRED on all pages except homepage

**Acceptance Criteria** (20 total):

1. ✅ First item always "Canada.ca" (homepage link)
2. ✅ Last item is current page (no link, plain text)
3. ✅ Separator: ">" (greater-than sign)
4. ✅ Items are links (except last)
5. ✅ Keyboard accessible
6. ✅ ARIA breadcrumb navigation landmark
7. ✅ Schema.org BreadcrumbList markup
8. ✅ Truncation on mobile (first + last visible)
9. ✅ Tooltip on hover (full text for truncated items)
10. ✅ WCAG AAA contrast
11. ✅ Links underlined on hover/focus
12. ✅ Current page marked with aria-current="page"
13. ✅ Bilingual labels ("Canada.ca" in both languages)
14. ✅ Responsive: wraps on narrow screens
15. ✅ Max 7 levels deep (TBS guideline)
16. ✅ TypeScript types complete
17. ✅ Unit tests (20+)
18. ✅ Storybook story
19. ✅ Documentation complete
20. ✅ JSON-LD structured data output

**TypeScript Interface**:

```typescript
@customElement('gc-breadcrumbs')
export class GCBreadcrumbs extends EVAElement {
  @property({ type: Array })
  items: Array<{ label: string; href: string }> = [];

  @property({ type: String })
  currentPage?: string;

  // Methods
  public generateStructuredData(): object; // Returns JSON-LD schema

  // Events
  // 'eva-breadcrumb-click' - { detail: { href: string, label: string, index: number } }
}
```

**File Outputs**:
- ✅ `gc-breadcrumbs.ts` (exists)
- ✅ `gc-breadcrumbs.test.ts` (exists)
- ✅ `gc-breadcrumbs.stories.ts` (exists)

---

### 6. gc-site-menu (Main Navigation Menu)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-site-menu.ts`

**Purpose**: Primary site navigation (themes, topics, services)

**Mandatory Use**: REQUIRED on all sites

**Acceptance Criteria** (25 total):

1. ✅ Multi-level navigation (2-3 levels)
2. ✅ Mega menu on desktop
3. ✅ Hamburger menu on mobile
4. ✅ Keyboard navigation (Arrow keys, Tab, Enter, Escape)
5. ✅ ARIA menu roles (menubar, menu, menuitem)
6. ✅ Focus management (trap focus in open menu)
7. ✅ Close on Escape key
8. ✅ Close on outside click
9. ✅ Hover to open (desktop)
10. ✅ Click to open (mobile)
11. ✅ Animated open/close (max 300ms)
12. ✅ WCAG AAA contrast
13. ✅ Touch targets ≥44px
14. ✅ Current page highlighted
15. ✅ Bilingual menu items
16. ✅ Icons for top-level items (optional)
17. ✅ Search within menu (optional)
18. ✅ Responsive: collapses at 768px breakpoint
19. ✅ Screen reader announces menu state
20. ✅ No keyboard traps
21. ✅ TypeScript types complete
22. ✅ Unit tests (25+)
23. ✅ Storybook story
24. ✅ Documentation complete
25. ✅ Accessibility audit passes (axe-core)

**TypeScript Interface**:

```typescript
@customElement('gc-site-menu')
export class GCSiteMenu extends EVAElement {
  @property({ type: Array })
  menuItems: Array<{
    label: string;
    href?: string;
    children?: Array<{ label: string; href: string }>;
  }> = [];

  @property({ type: Boolean })
  isOpen: boolean = false;

  @property({ type: String })
  currentPath?: string; // Highlight active menu item

  // Methods
  public openMenu(): void;
  public closeMenu(): void;
  public toggleMenu(): void;
  public focusFirstItem(): void;
  public focusLastItem(): void;

  // Events
  // 'eva-menu-open' - { detail: { itemIndex: number } }
  // 'eva-menu-close' - {}
  // 'eva-menu-item-click' - { detail: { label: string, href: string } }
}
```

**File Outputs**:
- ✅ `gc-site-menu.ts` (exists)
- ✅ `gc-site-menu.test.ts` (exists)
- ✅ `gc-site-menu.stories.ts` (exists)

---

### 7. gc-skip-links (Skip Navigation)

**Status**: Implemented, needs i18n refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-skip-links.ts`

**Purpose**: Allow keyboard users to skip repetitive navigation

**Mandatory Use**: REQUIRED on all pages (WCAG 2.2 Level A)

**Acceptance Criteria** (15 total):

1. ✅ Hidden until focused (visually-hidden CSS)
2. ✅ First focusable element on page
3. ✅ "Skip to main content" link
4. ✅ "Skip to About government" link (footer)
5. ✅ Custom skip links supported
6. ✅ Focus visible indicator (3px outline)
7. ✅ Jumps to target element (href="#main-content")
8. ✅ Sets focus on target
9. ✅ WCAG AAA contrast
10. ✅ Bilingual labels
11. ✅ Works with keyboard only (Tab)
12. ✅ Screen reader announces destination
13. ✅ TypeScript types complete
14. ⚠️ Unit tests (15+ needed - currently has i18n errors)
15. ✅ Storybook story

**Current Issue**: Uses old registerMessages() API - needs migration to msg()

**TypeScript Interface**:

```typescript
@customElement('gc-skip-links')
export class GCSkipLinks extends EVAElement {
  @property({ type: Array })
  links: Array<{ label: string; target: string }> = [
    { label: 'Skip to main content', target: '#main-content' },
    { label: 'Skip to About government', target: '#footer' }
  ];

  // Methods
  public focusTarget(targetId: string): void;
}
```

**File Outputs**:
- ✅ `gc-skip-links.ts` (exists)
- ⚠️ `gc-skip-links.test.ts` (exists, has i18n failures)
- ✅ `gc-skip-links.stories.ts` (exists)

---

### 8. gc-pagination (Page Navigation)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-pagination.ts`

**Purpose**: Navigate multi-page content (search results, lists)

**Mandatory Use**: REQUIRED for multi-page content

**Acceptance Criteria** (20 total):

1. ✅ Previous/Next buttons
2. ✅ Page number links (1 2 3 ... 10)
3. ✅ Current page highlighted (aria-current="page")
4. ✅ Ellipsis for gaps (...)
5. ✅ First/Last page links (optional)
6. ✅ Keyboard accessible
7. ✅ ARIA navigation landmark
8. ✅ WCAG AAA contrast
9. ✅ Touch targets ≥44px
10. ✅ Disabled state for Previous (on page 1)
11. ✅ Disabled state for Next (on last page)
12. ✅ Emits page change event
13. ✅ URL parameter support (?page=2)
14. ✅ Bilingual labels ("Previous" → "Précédent")
15. ✅ Screen reader announces total pages
16. ✅ Responsive: compact on mobile
17. ✅ TypeScript types complete
18. ✅ Unit tests (20+)
19. ✅ Storybook story
20. ✅ Documentation complete

**TypeScript Interface**:

```typescript
@customElement('gc-pagination')
export class GCPagination extends EVAElement {
  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: Number })
  totalPages: number = 1;

  @property({ type: Number })
  maxVisiblePages: number = 7; // Show 7 page links max

  @property({ type: Boolean })
  showFirstLast: boolean = false;

  // Methods
  public goToPage(page: number): void;
  public nextPage(): void;
  public prevPage(): void;

  // Events
  // 'eva-page-change' - { detail: { page: number, previousPage: number } }
}
```

**File Outputs**:
- ✅ `gc-pagination.ts` (exists)
- ✅ `gc-pagination.test.ts` (exists)
- ✅ `gc-pagination.stories.ts` (exists)

---

### 9. gc-side-nav (Secondary Navigation)

**Status**: Implemented, needs refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-side-nav.ts`

**Purpose**: Section-specific navigation (sidebar)

**Mandatory Use**: REQUIRED for multi-page sections

**Acceptance Criteria** (20 total):

1. ✅ Vertical navigation list
2. ✅ Current page highlighted
3. ✅ Nested items (2 levels)
4. ✅ Expand/collapse nested items
5. ✅ Keyboard accessible
6. ✅ ARIA navigation landmark
7. ✅ WCAG AAA contrast
8. ✅ Links underlined on hover/focus
9. ✅ Sticky positioning (optional)
10. ✅ Responsive: collapses on mobile
11. ✅ Mobile: accordion-style
12. ✅ Bilingual menu items
13. ✅ Scroll to current item on load
14. ✅ Visual hierarchy (indentation)
15. ✅ Screen reader announces expanded/collapsed state
16. ✅ TypeScript types complete
17. ✅ Unit tests (20+)
18. ✅ Storybook story
19. ✅ Documentation complete
20. ✅ Accessibility audit passes

**TypeScript Interface**:

```typescript
@customElement('gc-side-nav')
export class GCSideNav extends EVAElement {
  @property({ type: Array })
  navItems: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }> = [];

  @property({ type: String })
  currentPath?: string;

  @property({ type: Boolean })
  sticky: boolean = false;

  // Methods
  public expandItem(index: number): void;
  public collapseItem(index: number): void;
  public scrollToCurrentItem(): void;

  // Events
  // 'eva-sidenav-item-click' - { detail: { label: string, href: string } }
}
```

**File Outputs**:
- ✅ `gc-side-nav.ts` (exists)
- ✅ `gc-side-nav.test.ts` (exists)
- ✅ `gc-side-nav.stories.ts` (exists)

---

### 10. gc-action-menu (Contextual Actions)

**Status**: Implemented, needs i18n refinement  
**Location**: `packages/web-components/src/components/gc-patterns/gc-action-menu.ts`

**Purpose**: Contextual action buttons (Print, Share, Email)

**Mandatory Use**: RECOMMENDED for content pages

**Acceptance Criteria** (20 total):

1. ✅ Print button (window.print())
2. ✅ Share button (Web Share API or fallback)
3. ✅ Email button (mailto: link)
4. ✅ Custom actions supported
5. ✅ Keyboard accessible
6. ✅ ARIA toolbar role
7. ✅ WCAG AAA contrast
8. ✅ Touch targets ≥44px
9. ✅ Icons + labels (or labels only)
10. ✅ Responsive: vertical stack on mobile
11. ✅ Tooltips on icon-only buttons
12. ✅ Bilingual labels
13. ✅ Screen reader announces action
14. ✅ Emits action events
15. ✅ Web Share API fallback (copy link)
16. ✅ Print preview works
17. ✅ TypeScript types complete
18. ⚠️ Unit tests (20+ needed - currently has i18n errors)
19. ✅ Storybook story
20. ✅ Documentation complete

**Current Issue**: Uses old registerMessages() API - needs migration to msg()

**TypeScript Interface**:

```typescript
@customElement('gc-action-menu')
export class GCActionMenu extends EVAElement {
  @property({ type: Array })
  actions: Array<{
    type: 'print' | 'share' | 'email' | 'custom';
    label: string;
    icon?: string;
    handler?: () => void;
  }> = [
    { type: 'print', label: 'Print' },
    { type: 'share', label: 'Share' },
    { type: 'email', label: 'Email' }
  ];

  @property({ type: Boolean })
  showLabels: boolean = true;

  // Methods
  public print(): void;
  public share(url: string, title: string): Promise<void>;
  public email(subject: string, body: string): void;

  // Events
  // 'eva-action-print' - {}
  // 'eva-action-share' - { detail: { url: string } }
  // 'eva-action-email' - { detail: { subject: string } }
}
```

**File Outputs**:
- ✅ `gc-action-menu.ts` (exists)
- ⚠️ `gc-action-menu.test.ts` (exists, has i18n failures)
- ✅ `gc-action-menu.stories.ts` (exists)

---

## ✅ Summary Refinement Plan

**All 10 Mandatory Patterns Are IMPLEMENTED**

**Refinement Tasks** (apply to all 10):

1. **i18n API Migration**:
   - ❌ Remove registerMessages() calls
   - ✅ Use msg() from @lit/localize
   - ✅ Extract all hardcoded strings
   - ✅ Create message catalogs (en.json, fr.json)

2. **Test Coverage Expansion**:
   - ✅ Achieve 100% coverage (currently 99.25%)
   - ✅ Add axe-core accessibility tests
   - ✅ Add keyboard navigation tests
   - ✅ Add screen reader announcement tests
   - ✅ Add visual regression tests (Chromatic)

3. **Official GC Asset Verification**:
   - ✅ Verify all SVG assets from design.canada.ca
   - ❌ Remove any placeholder/mockup assets
   - ✅ Validate Canada flag, wordmark, FIP colors

4. **WCAG 2.2 AAA Audit**:
   - ✅ Run axe-core on all 10 components
   - ✅ Verify color contrast ≥7:1
   - ✅ Verify touch targets ≥44px
   - ✅ Verify focus indicators ≥3px
   - ✅ Test with NVDA, JAWS, VoiceOver

5. **Storybook Enhancement**:
   - ✅ Fix gc-signature.stories.ts import error
   - ✅ Add all component variants
   - ✅ Add accessibility addon checks
   - ✅ Add bilingual toggle in toolbar

6. **Documentation**:
   - ✅ Complete JSDoc comments
   - ✅ Add usage examples
   - ✅ Add TBS compliance notes
   - ✅ Add implementation guides

---

**Validation Commands**:

```bash
# Run tests for all 10 mandatory patterns
npm test -- packages/web-components/src/components/gc-patterns/

# Expected Output:
# ✅ 300+ tests passing (30 per component × 10 components)
# ✅ 100% coverage
# ✅ 0 axe-core violations

# Build Storybook
npm run build-storybook

# Expected Output:
# ✅ 10 component pages
# ✅ All stories render
# ✅ No import errors

# Run accessibility audit
npx axe packages/web-components/dist/ --tags wcag22aaa --exit

# Expected Output:
# ✅ 0 violations
```

---

**END OF SPEC-03**

**Next**: SPEC-04 (GC Design Patterns - 40 components)
