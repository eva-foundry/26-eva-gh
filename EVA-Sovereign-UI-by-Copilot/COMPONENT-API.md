# EVA Sovereign UI - Component API Reference
### eva-pagination

Accessible pagination control with previous/next buttons, dynamic page number window and ellipsis compression for large totals.

**Attributes:**
- `total`: number (total pages; default `1`)
- `current`: number (current page; default `1`)

**Events:**
- `change`: Fired when page changes
  - `detail`: `{ page: number }`

**Features:**
- Collapses page list with leading/trailing ellipsis when `total > 7` while keeping first, last and pages around `current`.
- Roving `tabindex` for numeric page buttons: only one page button is tabbable (`tabindex="0"`), others receive `tabindex="-1"` to reduce tab stops.
- Landmark semantics: wraps controls in `<nav role="navigation" aria-label="Pagination">`.
- `aria-current="page"` applied to active page button; inactive buttons remove the attribute.
- Keyboard support:
  - `ArrowRight` / `ArrowLeft`: Move focus to next/previous numeric page button (does not change page value until activation).
  - `Home` / `End`: Move focus to first / last numeric page button.
  - `Enter` / `Space`: Activate focused page button (updates `current`, emits `change`).
  - Focus movement updates roving `tabindex` without triggering page change, preserving expected separation of navigation vs activation.
- Previous/Next buttons (`‹` / `›`) disabled at boundaries (`current === 1` or `current === total`).

**Accessibility Notes:**
- Numeric page buttons announce current state via `aria-current`; screen readers provide context (e.g., "Page 3, current page").
- Limited tab stops improves keyboard efficiency; arrows allow intra-widget navigation consistent with WAI-ARIA authoring practices for composite widgets.

**Example:**
```html
<eva-pagination total="42" current="7"></eva-pagination>
```

**Programmatic Update Example:**
```js
const pager = document.querySelector('eva-pagination');
pager.setAttribute('current', '8'); // re-renders and updates aria-current
pager.addEventListener('change', (e) => {
  console.log('Page changed to', e.detail.page);
});
```

---

Complete API documentation for all Web Components (primary + structural sub-components). This supersedes earlier partial list of 43 components.

---

## Table of Contents

- [Buttons & Interactive](#buttons--interactive)
- [Form Elements](#form-elements)
- [Overlays & Dialogs](#overlays--dialogs)
- [Navigation](#navigation)
- [Data Display](#data-display)
- [Layout](#layout)
- [Utilities](#utilities)

---

## Buttons & Interactive

### eva-badge

Label/tag component with multiple variants.

**Attributes:**
- `variant`: `"default"` | `"secondary"` | `"destructive"` | `"outline"` (default: `"default"`)

**Slots:**
- Default slot: Badge content

**Example:**
```html
<eva-badge variant="destructive">Error</eva-badge>
```

---

### eva-toggle

Toggle button with pressed state.

**Attributes:**
- `pressed`: boolean (indicates active state)
- `disabled`: boolean
- `variant`: `"default"` | `"outline"` (default: `"default"`)
- `size`: `"sm"` | `"default"` | `"lg"` (default: `"default"`)

**Events:**
- `change`: Fired when toggle state changes
  - `detail`: `{ pressed: boolean }`

**Slots:**
- Default slot: Button content

**Example:**
```html
<eva-toggle pressed>Active</eva-toggle>
```

---

### eva-toggle-group

Group of toggle buttons with single/multiple selection.

**Attributes:**
- `type`: `"single"` | `"multiple"` (default: `"single"`)
- `value`: string (current selected value for single mode)

**Events:**
- `change`: Fired when selection changes
  - `detail`: `{ value: string }`

**Slots:**
- Default slot: eva-toggle-group-item children

**Example:**
```html
<eva-toggle-group type="single" value="center">
  <eva-toggle-group-item value="left">Left</eva-toggle-group-item>
  <eva-toggle-group-item value="center">Center</eva-toggle-group-item>
  <eva-toggle-group-item value="right">Right</eva-toggle-group-item>
</eva-toggle-group>
```

---

### eva-toggle-group-item

Individual toggle within a toggle group.

**Attributes:**
- `value`: string (required)
- `pressed`: boolean
- `disabled`: boolean

**Events:**
- `toggle-item`: Internal event (bubbles to parent)
  - `detail`: `{ value: string }`

---

## Form Elements

### eva-input

Text input field with multiple types.

**Attributes:**
- `type`: "text" | "email" | "password" | "number" | "file" (default: "text")
- `placeholder`: string
- `value`: string
- `disabled`: boolean
- `required`: boolean
- `error`: string (sets error message + aria-invalid)
- `label`: string (accessible label)

**Events:**
- `input`: Native input event
- `change`: Native change event

**Accessibility:**
- Internal label & error IDs mapped via aria-labelledby/aria-describedby.
- Error state sets `aria-invalid="true"`.

**Example:**
```html
<eva-input label="Email" type="email" placeholder="Enter" error="Invalid"></eva-input>
```

---

### eva-textarea
Multi-line text input.

**Attributes:**
- `placeholder`: string
- `value`: string
- `disabled`: boolean
- `required`: boolean

**Events:**
- `input`: Native input event
- `change`: Native change event

**Example:**
```html
<eva-textarea placeholder="Enter message"></eva-textarea>
```

---

### eva-checkbox

Custom checkbox input.

**Attributes:**
- `checked`: boolean
- `disabled`: boolean
- `id`: string (for label association)

**Events:**
- `change`: Fired when checked state changes
  - `detail`: `{ checked: boolean }`

**Example:**
```html
<eva-checkbox id="terms" checked></eva-checkbox>
<eva-label for="terms">Accept terms</eva-label>
```

---

### eva-switch

Toggle switch input.

**Attributes:**
- `checked`: boolean
- `disabled`: boolean
- `id`: string

**Events:**
- `change`: Fired when checked state changes
  - `detail`: `{ checked: boolean }`

**Example:**
```html
<eva-switch id="notifications"></eva-switch>
<eva-label for="notifications">Enable</eva-label>
```

---

### eva-slider

Range slider input.

**Attributes:**
- `value`: number (default: 50)
- `min`: number (default: 0)
- `max`: number (default: 100)
- `step`: number (default: 1)
- `disabled`: boolean

**Events:**
- `change`: Fired when value changes
  - `detail`: `{ value: number }`

**Example:**
```html
<eva-slider value="75" min="0" max="100"></eva-slider>
```

---

### eva-radio-group

Group of radio buttons (single selection).

**Attributes:**
- `name`: string (shared by all items)
- `value`: string (current selected value)

**Events:**
- `change`: Fired when selection changes
  - `detail`: `{ value: string }`

**Slots:**
- Default slot: eva-radio-group-item children

**Example:**
```html
<eva-radio-group name="plan" value="pro">
  <eva-radio-group-item value="free">Free</eva-radio-group-item>
  <eva-radio-group-item value="pro">Pro</eva-radio-group-item>
</eva-radio-group>
```

---

### eva-radio-group-item

Individual radio button.

**Attributes:**
- `value`: string (required)
- `checked`: boolean
- `disabled`: boolean

---

### eva-select

Custom dropdown select.

**Attributes:**
- `placeholder`: string
- `value`: string (current selected value)
- `disabled`: boolean
- `size`: `"sm"` | `"default"` (default: `"default"`)

**Events:**
- `change`: Fired when selection changes
  - `detail`: `{ value: string }`

**Slots:**
- Default slot: eva-select-item children

**Example:**
```html
<eva-select placeholder="Choose option">
  <eva-select-item value="1">Option 1</eva-select-item>
  <eva-select-item value="2">Option 2</eva-select-item>
</eva-select>
```

---

### eva-select-item

Individual select option.

**Attributes:**
- `value`: string (required)

---

### eva-label

Form label with click-to-focus.

**Attributes:**
- `for`: string (ID of associated input)

**Slots:**
- Default slot: Label text

**Example:**
```html
<eva-label for="email">Email Address</eva-label>
<eva-input id="email" type="email"></eva-input>
```

---

### eva-input-otp

One-time password / PIN input field.

**Attributes:**
- `max-length`: number (default: 6)
- `value`: string
- `disabled`: boolean

**Events:**
- `change`: Fired when value changes
  - `detail`: `{ value: string }`

**Features:**
- Auto-focus next input on entry
- Paste support (distributes across inputs)
- Arrow key navigation
- Backspace navigation

**Example:**
```html
<eva-input-otp max-length="6"></eva-input-otp>
```

---

## Overlays & Dialogs

### eva-dialog

Modal dialog with overlay.

**Attributes:**
- `open`: boolean (controls visibility)

**Events:**
- `close`: Fired when dialog closes

**Slots:**
- `title`: Dialog title
- `description`: Dialog description
- Default slot: Dialog content

**Methods:**
- `open()`: Opens the dialog
- `close()`: Closes the dialog

**Example:**
```html
<eva-dialog open>
  <span slot="title">Dialog Title</span>
  <span slot="description">Description</span>
  <p>Content goes here</p>
</eva-dialog>
```

---

### eva-alert-dialog

Confirmation dialog (cannot be dismissed by clicking overlay).

**Attributes:**
- `open`: boolean

**Events:**
- `close`: Fired when dialog closes

**Slots:**
- `title`: Title
- `description`: Description
- Default slot: Content

**Example:**
```html
<eva-alert-dialog open>
  <span slot="title">Are you sure?</span>
  <span slot="description">This cannot be undone.</span>
  <button onclick="this.closest('eva-alert-dialog').removeAttribute('open')">
    Cancel
  </button>
</eva-alert-dialog>
```

---

### eva-popover

Floating content trigger.

**Attributes:**
- `open`: boolean

**Slots:**
- `trigger`: Trigger element
- `content`: Popover content

**Example:**
```html
<eva-popover>
  <button slot="trigger">Open</button>
  <div slot="content">Popover content</div>
</eva-popover>
```

---

### eva-tooltip

Hover tooltip.

**Attributes:**
- None (hover/focus triggered)

**Slots:**
- `trigger`: Element that triggers tooltip
- `content`: Tooltip content

**Example:**
```html
<eva-tooltip>
  <button slot="trigger">Hover me</button>
  <span slot="content">Helpful tip</span>
</eva-tooltip>
```

---

### eva-hover-card

Preview card on hover (200ms delay).

**Attributes:**
- None

**Slots:**
- `trigger`: Trigger element
- `content`: Card content

**Example:**
```html
<eva-hover-card>
  <span slot="trigger">@username</span>
  <div slot="content">
    <strong>User Profile</strong>
    <p>Additional info</p>
  </div>
</eva-hover-card>
```

---

### eva-alert

Status message display.

**Attributes:**
- `variant`: `"default"` | `"destructive"` (default: `"default"`)

**Slots:**
- `title`: Alert title
- `description`: Alert description
- Default slot: Additional content

**Example:**
```html
<eva-alert variant="destructive">
  <span slot="title">Error</span>
  <span slot="description">Something went wrong</span>
</eva-alert>
```

---

### eva-sheet

Side panel (slides in from edge).

**Attributes:**
- `open`: boolean
- `side`: `"top"` | `"right"` | `"bottom"` | `"left"` (default: `"right"`)

**Events:**
- `close`: Fired when sheet closes

**Slots:**
- Default slot: Sheet content
- Named sub-components: eva-sheet-header, eva-sheet-footer, eva-sheet-title, eva-sheet-description

**Example:**
```html
<eva-sheet open side="right">
  <eva-sheet-header>
    <eva-sheet-title>Title</eva-sheet-title>
  </eva-sheet-header>
  <p>Content</p>
</eva-sheet>
```

---

### eva-drawer

Simplified slide-out panel.

**Attributes:**
- `open`: boolean
- `side`: `"top"` | `"right"` | `"bottom"` | `"left"` (default: `"right"`)

**Events:**
- `close`: Fired when drawer closes

**Slots:**
- Default slot: Content

**Example:**
```html
<eva-drawer open side="left">
  <h3>Drawer Title</h3>
  <p>Content</p>
</eva-drawer>
```

---

## Navigation

### eva-tabs

Tabbed interface.

**Attributes:**
- `value`: string (active tab value)

**Events:**
- `change`: Fired when tab changes
  - `detail`: `{ value: string }`

**Slots:**
- Default slot: eva-tabs-list and eva-tabs-content children

**Example:**
```html
<eva-tabs value="tab1">
  <eva-tabs-list>
    <eva-tabs-trigger value="tab1">Tab 1</eva-tabs-trigger>
    <eva-tabs-trigger value="tab2">Tab 2</eva-tabs-trigger>
  </eva-tabs-list>
  <eva-tabs-content value="tab1">Content 1</eva-tabs-content>
  <eva-tabs-content value="tab2">Content 2</eva-tabs-content>
</eva-tabs>
```

---

### eva-dropdown-menu

Context menu with trigger.

**Attributes:**
- None (click triggered)

**Slots:**
- `trigger`: Menu trigger element
- Default slot: Menu items

**Sub-components:**
- `eva-dropdown-menu-item`: Menu item
- `eva-dropdown-menu-separator`: Divider

**Example:**
```html
<eva-dropdown-menu>
  <button slot="trigger">Menu</button>
  <eva-dropdown-menu-item>Item 1</eva-dropdown-menu-item>
  <eva-dropdown-menu-item>Item 2</eva-dropdown-menu-item>
</eva-dropdown-menu>
```

---

### eva-context-menu

Right-click context menu.

**Attributes:**
- None (right-click triggered)

**Slots:**
- `trigger`: Area that triggers menu
- Default slot: Menu items

**Sub-components:**
- `eva-context-menu-item`: Menu item

**Example:**
```html
<eva-context-menu>
  <div slot="trigger">Right-click here</div>
  <eva-context-menu-item>Cut</eva-context-menu-item>
  <eva-context-menu-item>Copy</eva-context-menu-item>
</eva-context-menu>
```

---

### eva-menubar

Application-style horizontal menu bar.

**Attributes:**
- None

**Slots:**
- Default slot: eva-menubar-menu children

**Sub-components:**
- `eva-menubar-menu`: Individual menu
- `eva-menubar-item`: Menu item

**Example:**
```html
<eva-menubar>
  <eva-menubar-menu>
    <span slot="trigger">File</span>
    <eva-menubar-item>New</eva-menubar-item>
    <eva-menubar-item>Open</eva-menubar-item>
  </eva-menubar-menu>
</eva-menubar>
```

---

### eva-breadcrumb

Navigation breadcrumb trail.

**Attributes:**
- None

**Slots:**
- Default slot: eva-breadcrumb-list

**Sub-components:**
- `eva-breadcrumb-list`: Container
- `eva-breadcrumb-item`: Breadcrumb item
- `eva-breadcrumb-link`: Link element
- `eva-breadcrumb-page`: Current page (non-link)
- `eva-breadcrumb-separator`: Separator (default: /)

**Example:**
```html
<eva-breadcrumb>
  <eva-breadcrumb-list>
    <eva-breadcrumb-item>
      <eva-breadcrumb-link href="#">Home</eva-breadcrumb-link>
    </eva-breadcrumb-item>
    <eva-breadcrumb-separator>/</eva-breadcrumb-separator>
    <eva-breadcrumb-item>
      <eva-breadcrumb-page>Current</eva-breadcrumb-page>
    </eva-breadcrumb-item>
  </eva-breadcrumb-list>
</eva-breadcrumb>
```

---

### eva-pagination

Page navigation controls.

**Attributes:**
- `current`: number (current page, 1-indexed)
- `total`: number (total pages)

**Events:**
- `change`: Fired when page changes
  - `detail`: `{ page: number }`

**Features:**
- Ellipsis for large page counts
- Previous/next buttons
- Smart page number display

**Example:**
```html
<eva-pagination current="5" total="10"></eva-pagination>
```

---

## Data Display

### eva-card

Content container with header/footer.

**Attributes:**
- None

**Slots:**
- Default slot: Card content

**Sub-components:**
- `eva-card-header`: Header container
- `eva-card-title`: Title
- `eva-card-description`: Description
- `eva-card-content`: Main content
- `eva-card-footer`: Footer

**Example:**
```html
<eva-card>
  <eva-card-header>
    <eva-card-title>Title</eva-card-title>
    <eva-card-description>Description</eva-card-description>
  </eva-card-header>
  <eva-card-content>
    <p>Content</p>
  </eva-card-content>
  <eva-card-footer>
    <button>Action</button>
  </eva-card-footer>
</eva-card>
```

---

### eva-table

Data table with header/body/rows/cells.

**Attributes:**
- None

**Slots:**
- Default slot: Table content

**Sub-components:**
- `eva-table-header`: Header (wraps thead)
- `eva-table-body`: Body (wraps tbody)
- `eva-table-row`: Table row
- `eva-table-head`: Header cell
- `eva-table-cell`: Body cell

**Example:**
```html
<eva-table>
  <eva-table-header>
    <eva-table-row>
      <eva-table-head>Name</eva-table-head>
      <eva-table-head>Email</eva-table-head>
    </eva-table-row>
  </eva-table-header>
  <eva-table-body>
    <eva-table-row>
      <eva-table-cell>John</eva-table-cell>
      <eva-table-cell>john@example.com</eva-table-cell>
    </eva-table-row>
  </eva-table-body>
</eva-table>
```

---

### eva-avatar

User avatar with image and fallback.

**Attributes:**
- None

**Slots:**
- Default slot: Sub-components

**Sub-components:**
- `eva-avatar-image`: Image element
- `eva-avatar-fallback`: Fallback (shown if image fails)

**Example:**
```html
<eva-avatar>
  <eva-avatar-image src="avatar.jpg"></eva-avatar-image>
  <eva-avatar-fallback>JD</eva-avatar-fallback>
</eva-avatar>
```

---

### eva-progress

Progress bar indicator.

**Attributes:**
- `value`: number (current value)
- `max`: number (maximum value, default: 100)

**Example:**
```html
<eva-progress value="60" max="100"></eva-progress>
```

---

### eva-skeleton

Loading placeholder with pulse animation.

**Attributes:**
- None (style with CSS)

**Slots:**
- None (empty element)

**Example:**
```html
<eva-skeleton style="width: 200px; height: 20px;"></eva-skeleton>
```

---

## Layout

### eva-accordion

Collapsible sections.

**Attributes:**
- `type`: `"single"` | `"multiple"` (default: `"single"`)
- `value`: string (current open item for single mode)

**Events:**
- `change`: Fired when open items change
  - `detail`: `{ value: string | string[] }`

**Slots:**
- Default slot: eva-accordion-item children

**Sub-components:**
- `eva-accordion-item`: Individual accordion item
- `eva-accordion-trigger`: Trigger button
- `eva-accordion-content`: Collapsible content

**Example:**
```html
<eva-accordion type="single">
  <eva-accordion-item value="item1">
    <eva-accordion-trigger>Section 1</eva-accordion-trigger>
    <eva-accordion-content>Content 1</eva-accordion-content>
  </eva-accordion-item>
</eva-accordion>
```

---

### eva-collapsible

Simple collapsible container.

**Attributes:**
- `open`: boolean

**Events:**
- `change`: Fired when state changes

**Slots:**
- Default slot: Sub-components

**Sub-components:**
- `eva-collapsible-trigger`: Trigger
- `eva-collapsible-content`: Content

**Example:**
```html
<eva-collapsible>
  <eva-collapsible-trigger>
    <button>Toggle</button>
  </eva-collapsible-trigger>
  <eva-collapsible-content>
    <p>Hidden content</p>
  </eva-collapsible-content>
</eva-collapsible>
```

---

### eva-separator

Horizontal or vertical divider.

**Attributes:**
- `orientation`: `"horizontal"` | `"vertical"` (default: `"horizontal"`)

**Example:**
```html
<eva-separator></eva-separator>
<eva-separator orientation="vertical"></eva-separator>
```

---

### eva-aspect-ratio

Maintains aspect ratio for embedded content.

**Attributes:**
- `ratio`: string (e.g., "16/9", "4/3", "1/1", default: "16/9")

**Slots:**
- Default slot: Content

**Example:**
```html
<eva-aspect-ratio ratio="16/9">
  <img src="image.jpg" alt="Image">
</eva-aspect-ratio>
```

---

### eva-scroll-area

Container with custom styled scrollbars.

**Attributes:**
- None (style with CSS for dimensions)

**Slots:**
- Default slot: Scrollable content

**Example:**
```html
<eva-scroll-area style="height: 300px;">
  <p>Long content...</p>
</eva-scroll-area>
```

---

## Utilities

### eva-calendar

Month calendar for date selection.

**Attributes:**
- `value`: string (ISO date string, e.g., "2025-11-30")

**Events:**
- `change`: Fired when date is selected
  - `detail`: `{ date: string }` (ISO format)

**Features:**
- Month navigation
- Today indicator
- Selected date highlighting
- Disabled dates support

**Example:**
```html
<eva-calendar value="2025-11-30"></eva-calendar>
```

---

### eva-carousel

Image/content carousel with navigation.

**Attributes:**
- `auto-advance`: number (milliseconds, 0 = disabled)
- `label`: region accessible name (default: "Carousel")

**Events:**
- `change`: Fired when slide changes
  - `detail`: `{ index: number }`

**Slots:**
- Default slot: eva-carousel-item children

**Sub-components:**
- `eva-carousel-item`: Individual slide

**Features:**
- Previous/next buttons (`aria-label` applied)
- Indicator dots (`aria-label` per slide + `aria-current` on active)
- Auto-advance (optional)
- Keyboard navigation (arrows/Home/End + Enter/Space activation)
- Live region announcing current slide (`aria-live="polite"`)
- Semantics: `aria-roledescription="carousel"` + configurable `aria-label`

### eva-carousel-item
Individual slide container (visibility controlled by parent).

**Attributes:**
- `active`: boolean (managed)

**Slots:**
- Default slot: slide content

**Example:**
```html
<eva-carousel-item><img src="hero.jpg" alt="Hero"></eva-carousel-item>
```

---
### Structural & Sub-Components (Overview)
These custom elements provide layout, semantics or styling; they rarely emit custom events.

#### Accordion Parts
- `eva-accordion-item` (attribute `value` identifies section)
- `eva-accordion-trigger` (button with `aria-expanded`)
- `eva-accordion-content` (collapsible region)

#### Tabs Parts
- `eva-tabs-list` (tablist container)
- `eva-tabs-trigger` (`role="tab"`, `aria-selected`)
- `eva-tabs-content` (`role="tabpanel"`)

#### Dropdown Menu Parts
- `eva-dropdown-menu-item` (`role="menuitem"`)
- `eva-dropdown-menu-separator` (`role="separator"`)
- `eva-dropdown-menu-label` (non-interactive label)

#### Context Menu Parts
- `eva-context-menu-item` (same semantics as dropdown item)

#### Menubar Parts
- `eva-menubar-menu` (menu grouping)
- `eva-menubar-item` (`role="menuitem"`)

#### Sheet / Drawer / Dialog Parts
- `eva-sheet-header` / `eva-drawer-header` / `eva-dialog-header`
- `eva-sheet-title` / `eva-dialog-title` (label)
- `eva-sheet-description` / `eva-dialog-description` (describedby)
- `eva-sheet-footer` / `eva-dialog-footer`

#### Card Parts
- `eva-card-header`, `eva-card-title`, `eva-card-description`, `eva-card-content`, `eva-card-footer`

#### Table Parts
- `eva-table-header`, `eva-table-body`, `eva-table-row`, `eva-table-head`, `eva-table-cell`

#### Breadcrumb Parts
- `eva-breadcrumb-list`, `eva-breadcrumb-item`, `eva-breadcrumb-link`, `eva-breadcrumb-page`, `eva-breadcrumb-separator`

#### Collapsible Parts
- `eva-collapsible-trigger`, `eva-collapsible-content`

#### Avatar Parts
- `eva-avatar-image`, `eva-avatar-fallback`

#### Miscellaneous
- `eva-skip-link` (skip navigation anchor)
- `eva-page-shell` (application layout wrapper)
- `eva-container` (spacing/layout utility)
- `eva-program-card` (program data presentation)
- `eva-hero-banner` (large banner region)
- `eva-language-switcher` (emits `change` with `{ locale }`)
- `eva-gc-header` / `eva-gc-footer` (themed structural wrappers)
- `eva-gc-button` (GC variant of button)
- `eva-chat-panel` / `eva-chat-message` (chat UI elements)
- `eva-test-element` (internal/testing only)

**Example:**
```html
<eva-carousel auto-advance="5000">
  <eva-carousel-item>Slide 1</eva-carousel-item>
  <eva-carousel-item>Slide 2</eva-carousel-item>
</eva-carousel>
```

---

## Common Patterns

### Keyboard Navigation

All interactive components support keyboard navigation:
- **Tab**: Focus next element
- **Shift+Tab**: Focus previous element
- **Enter/Space**: Activate button/toggle
- **Escape**: Close overlay/dialog
- **Arrow Keys**: Navigate lists/tabs
- **Home/End**: Navigate to first/last item

### Accessibility

All components include:
- Proper ARIA roles and attributes
- Keyboard support
- Screen reader announcements
- Focus management
- Color contrast (WCAG AAA)
- Reduced motion support

### Custom Events

All custom events:
- Use `bubbles: true` and `composed: true`
- Provide relevant data in `detail` property
- Can be listened to with `addEventListener`

**Example:**
```javascript
const select = document.querySelector('eva-select');
select.addEventListener('change', (e) => {
  console.log('Selected:', e.detail.value);
});
```

### Styling

Components use Shadow DOM:
- Internal styles are encapsulated
- Use CSS custom properties to customize
- Use `::part()` pseudo-element for exposed parts
- Style the host element for layout

**Example:**
```css
eva-button {
  width: 200px;
  margin: 1rem;
}
```

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Requires native Web Components support (Custom Elements, Shadow DOM).

---

**Generated:** November 30, 2025  
**Version:** 1.0.0 (Phase 3 Complete)  
**Components:** 43/46 practical components
