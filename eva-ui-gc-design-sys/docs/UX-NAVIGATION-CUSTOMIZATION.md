# EVA-UI Customization UX & Navigation

**Document Version**: 1.0  
**Purpose**: Define the user experience for the EVA-UI customization "backstage" interface with live preview capabilities.

---

## Overview

The EVA-UI customization backstage allows administrators to configure branding, content, features, and deployment settings without modifying code. It features a split-screen interface with:

- **Left Panel (40%)**: Navigation tree and configuration controls
- **Right Panel (60%)**: Live preview iframe showing real-time changes

---

## Entry Point: ⚙️ Customize Button

### Location
The Customize button appears in the **GC header** (top-right corner, respecting GC Design System header structure):

```
┌──────────────────────────────────────────────────────────┐
│ 🇨🇦 Government of Canada        EN | FR    ⚙️ Customize  │
└──────────────────────────────────────────────────────────┘
```

### Behavior
- **Click**: Opens backstage panel sliding in from right with smooth 250ms transition
- **Keyboard**: Accessible via Tab navigation, activates on Enter/Space
- **Screen Reader**: Announced as "Customize EVA settings" button
- **Permission**: Only visible to users with `isOwner` permission

### Visual Design
- Icon: Cog6ToothIcon from @heroicons/react
- Size: 24px icon, 44px minimum touch target
- Color: GC Blue on hover, GC Dark Gray default
- Focus: 3px blue ring

---

## Backstage Panel Layout

### Opening Animation
- Panel slides in from right edge over 250ms ease-out
- Backdrop overlay fades in (20% black opacity)
- Focus moves to close button (✕) in panel header
- Main content becomes `aria-hidden="true"`

### Closing Animation
- ESC key or close button (✕) triggers close
- Panel slides out to right edge over 200ms ease-in
- Backdrop fades out
- Focus returns to ⚙️ Customize button

### Responsive Behavior
- **Desktop (>1024px)**: 40/60 split-screen
- **Tablet (768px-1024px)**: 50/50 split-screen, smaller nav icons
- **Mobile (<768px)**: Full-screen overlay, tabs replace split-screen

---

## Navigation Tree (Left Panel)

### Structure

```
┌─────────────────────────┐
│ ✕ Customize EVA         │  ← Header with close button
├─────────────────────────┤
│                         │
│ 🏠 Home                 │  ← Active: blue background
│ 🎨 Theme                │
│ 📝 Text & Content       │
│ 🌐 i18n & Locales       │
│ ⚡ Features             │
│ 🚀 Deploy               │
│ 📥 Import / Export      │
│                         │
│ ────────────────────    │
│                         │
│ [Save Changes]          │  ← Primary button
│ [Reset to Defaults]     │  ← Secondary button
│                         │
└─────────────────────────┘
```

### Navigation Items

Each nav item:
- **Default State**: GC Dark Gray text, transparent background
- **Hover State**: GC Medium Gray background
- **Active State**: GC Blue background, white text
- **Focus State**: 3px blue ring inset
- **Click**: Updates right panel content + live preview

### Keyboard Navigation
- **Tab/Shift+Tab**: Move between nav items
- **Enter/Space**: Activate selected item
- **Arrow Up/Down**: Navigate list (optional enhancement)
- **ESC**: Close backstage panel

---

## Configuration Panels (Right Panel)

### Panel: 🏠 Home

**Purpose**: Overview and quick actions

**Content**:
```
┌─────────────────────────────────────────────────┐
│ Welcome to EVA Customization                    │
│                                                 │
│ Current Configuration:                          │
│ • Theme: Government of Canada (Default)         │
│ • Languages: EN-CA, FR-CA                       │
│ • Features: 3 enabled                           │
│                                                 │
│ Quick Actions:                                  │
│ [Export Current Config]                         │
│ [Import Config File]                            │
│ [Reset All to Defaults]                         │
│                                                 │
│ Recent Changes:                                 │
│ • 2025-01-27 14:32 - Theme color updated        │
│ • 2025-01-26 09:15 - Text override added        │
└─────────────────────────────────────────────────┘
```

---

### Panel: 🎨 Theme

**Purpose**: Customize visual appearance (colors, logo, typography)

**Content**:
```
┌─────────────────────────────────────────────────┐
│ Theme Customization                             │
│                                                 │
│ Colors                                          │
│ ┌─ Primary Color ──────────────────────────┐   │
│ │ [████] oklch(0.42 0.15 251)              │   │
│ │ Contrast Ratio: 8.2:1 ✓ WCAG AAA        │   │
│ └──────────────────────────────────────────┘   │
│                                                 │
│ ┌─ Secondary Color ────────────────────────┐   │
│ │ [████] oklch(0.50 0.01 251)              │   │
│ │ Contrast Ratio: 5.1:1 ✓ WCAG AA         │   │
│ └──────────────────────────────────────────┘   │
│                                                 │
│ Branding                                        │
│ ┌─ Logo Upload ────────────────────────────┐   │
│ │ [Drop file or click to upload]           │   │
│ │ ⚠️ Must meet accessibility requirements   │   │
│ └──────────────────────────────────────────┘   │
│                                                 │
│ [Preview Changes in Real-time →]               │
└─────────────────────────────────────────────────┘
```

**Validation**:
- Color picker shows live contrast ratio
- Red warning if contrast < 4.5:1 (AA)
- Yellow warning if contrast < 7:1 (AAA)
- Green checkmark if ≥ 7:1
- Logo must have alt text input field

**Live Preview**:
- Changes reflect immediately in preview iframe
- Preview shows header/footer with new colors
- Preview shows sample button/input with new theme

---

### Panel: 📝 Text & Content

**Purpose**: Override default UI text strings

**Content**:
```
┌─────────────────────────────────────────────────┐
│ Text & Content Overrides                        │
│                                                 │
│ Search: [____________________] 🔍               │
│                                                 │
│ ┌─ chat.send_button ──────────────────────┐    │
│ │ EN-CA: Send                              │    │
│ │ FR-CA: Envoyer                           │    │
│ │ [Edit] [Reset]                           │    │
│ └──────────────────────────────────────────┘    │
│                                                 │
│ ┌─ chat.placeholder ──────────────────────┐     │
│ │ EN-CA: Type your message...              │    │
│ │ FR-CA: Tapez votre message...            │    │
│ │ [Edit] [Reset]                           │    │
│ └──────────────────────────────────────────┘    │
│                                                 │
│ ┌─ header.title ─────────────────────────┐      │
│ │ EN-CA: EVA Assistant                     │    │
│ │ FR-CA: Assistant EVA                     │    │
│ │ [Edit] [Reset]                           │    │
│ └──────────────────────────────────────────┘    │
│                                                 │
│ Showing 3 of 47 text keys                       │
│ [Load More]                                     │
└─────────────────────────────────────────────────┘
```

**Interaction**:
- Click [Edit]: Inline editing with text input
- Both EN-CA and FR-CA must be provided (validation)
- [Reset]: Reverts to default translation
- Search filters by key name or text content

---

### Panel: 🌐 i18n & Locales

**Purpose**: Manage language settings and locale-specific formatting

**Content**:
```
┌─────────────────────────────────────────────────┐
│ i18n & Locale Settings                          │
│                                                 │
│ Supported Languages                             │
│ ☑ English (Canada) - en-CA [Default]            │
│ ☑ French (Canada) - fr-CA                       │
│                                                 │
│ Default Locale Detection                        │
│ ⦿ Browser preference                            │
│ ○ URL parameter (?lang=en-CA)                   │
│ ○ User preference (stored)                      │
│                                                 │
│ Date & Number Formatting                        │
│ ┌─ Date Format (en-CA) ───────────────────┐    │
│ │ Short: MM/DD/YYYY → 01/27/2025           │    │
│ │ Long: January 27, 2025                   │    │
│ └──────────────────────────────────────────┘    │
│                                                 │
│ ┌─ Date Format (fr-CA) ───────────────────┐    │
│ │ Short: DD/MM/YYYY → 27/01/2025           │    │
│ │ Long: 27 janvier 2025                    │    │
│ └──────────────────────────────────────────┘    │
│                                                 │
│ Translation Completeness                        │
│ EN-CA: 100% (47/47 keys) ✓                      │
│ FR-CA: 100% (47/47 keys) ✓                      │
└─────────────────────────────────────────────────┘
```

**Validation**:
- Both languages must be enabled (federal requirement)
- Flag incomplete translations
- Warn if missing keys detected

---

### Panel: ⚡ Features

**Purpose**: Enable/disable optional functionality

**Content**:
```
┌─────────────────────────────────────────────────┐
│ Feature Toggles                                 │
│                                                 │
│ Chat Features                                   │
│ ☑ Knowledge Space Selector                      │
│   Allow users to select from multiple KBs       │
│                                                 │
│ ☑ Message Export                                │
│   Enable export chat history as PDF/JSON        │
│                                                 │
│ ☐ Message Ratings                               │
│   Allow users to rate AI responses              │
│                                                 │
│ Customization Features                          │
│ ☐ Custom Branding                               │
│   Allow logo/color customization                │
│   ⚠️ Enabling may affect GC compliance          │
│                                                 │
│ ☑ Backstage Access                              │
│   Show ⚙️ Customize button for admins           │
│                                                 │
│ Advanced Features                               │
│ ☐ Developer Mode                                │
│   Show debug panel and console logs             │
│                                                 │
│ ☐ Experimental Features                         │
│   Enable beta/unstable functionality            │
│   ⚠️ Not recommended for production             │
└─────────────────────────────────────────────────┘
```

**Interaction**:
- Toggle switches for each feature
- Warnings for features that may affect compliance
- Changes reflect in preview immediately

---

### Panel: 🚀 Deploy

**Purpose**: Validate and export configuration for deployment

**Content**:
```
┌─────────────────────────────────────────────────┐
│ Deploy Configuration                            │
│                                                 │
│ Pre-Deployment Validation                       │
│ ✓ Color contrast ratios meet WCAG AA           │
│ ✓ All translations complete (EN-CA, FR-CA)     │
│ ✓ No accessibility violations detected          │
│ ✓ Configuration schema valid                    │
│                                                 │
│ Configuration Summary                           │
│ • Theme: Custom                                 │
│ • Languages: 2 enabled                          │
│ • Features: 4 enabled                           │
│ • Text Overrides: 12 keys                       │
│                                                 │
│ Export Options                                  │
│ [Download config.json]                          │
│ [Copy to Clipboard]                             │
│ [Generate Deployment Command]                   │
│                                                 │
│ Deployment History                              │
│ 2025-01-27 14:45 - config-v1.2.json             │
│ 2025-01-26 09:30 - config-v1.1.json             │
│ [View All]                                      │
└─────────────────────────────────────────────────┘
```

**Validation Rules**:
- All colors must meet WCAG AA contrast
- Both EN-CA and FR-CA translations required
- Required fields cannot be empty
- Logo must have alt text if uploaded

**Export Format** (config.json):
```json
{
  "version": "1.0",
  "theme": {
    "primaryColor": "oklch(0.42 0.15 251)",
    "secondaryColor": "oklch(0.50 0.01 251)",
    "logoUrl": "https://example.ca/logo.svg",
    "logoAlt": { "en-CA": "Organization Logo", "fr-CA": "Logo de l'organisation" }
  },
  "text": {
    "overrides": {
      "chat.send_button": { "en-CA": "Send", "fr-CA": "Envoyer" }
    }
  },
  "features": {
    "knowledgeSpaceSelector": true,
    "messageExport": true,
    "messageRatings": false,
    "customBranding": false
  },
  "i18n": {
    "defaultLocale": "en-CA",
    "supportedLocales": ["en-CA", "fr-CA"],
    "localeDetection": "browser"
  }
}
```

---

### Panel: 📥 Import / Export

**Purpose**: Backup and restore configuration

**Content**:
```
┌─────────────────────────────────────────────────┐
│ Import / Export Configuration                   │
│                                                 │
│ Export Current Configuration                    │
│ [Export as JSON]                                │
│ [Export as YAML]                                │
│ [Share Configuration URL]                       │
│                                                 │
│ Import Configuration                            │
│ ┌─────────────────────────────────────────┐    │
│ │ [Drop config file here or click]        │    │
│ │                                         │    │
│ │ Supported formats: .json, .yaml         │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
│ ⚠️ Import will override current settings        │
│                                                 │
│ [Validate Before Import]                        │
│ [Import & Apply]                                │
│                                                 │
│ Configuration Templates                         │
│ • Government of Canada (Default)                │
│ • Minimal (Lightweight theme)                   │
│ • High Contrast (Accessibility focused)         │
│                                                 │
│ [Load Template]                                 │
└─────────────────────────────────────────────────┘
```

**Validation on Import**:
- Schema validation (structure matches expected format)
- Color contrast validation
- Translation completeness check
- Feature flag compatibility

---

## Live Preview (Right Panel)

### Preview Iframe

The live preview shows a functional EVA-UI instance with applied configuration:

```
┌─────────────────────────────────────────────────┐
│ 🔄 Preview (Auto-refresh on changes)            │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ [IFRAME: EVA-UI with live config]         │ │
│  │                                           │ │
│  │ • Shows header with custom colors/logo    │ │
│  │ • Shows sample chat messages              │ │
│  │ • Interactive (can type, click)           │ │
│  │ • Updates in real-time (<100ms)           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│ ────────────────────────────────────────────    │
│                                                 │
│ Preview Controls:                               │
│ [EN] [FR] ← Language toggle for preview         │
│ [Desktop] [Tablet] [Mobile] ← Responsive views  │
└─────────────────────────────────────────────────┘
```

### Preview Features
- **Real-time Updates**: Config changes apply instantly via `postMessage`
- **Interactive**: Can test chat functionality in preview
- **Responsive Toggle**: Switch between desktop/tablet/mobile views
- **Language Toggle**: Test both EN-CA and FR-CA instantly
- **Isolated Context**: Preview doesn't affect main app state

### Preview Communication

```typescript
// Parent (customization panel) → Preview iframe
window.frames['live-preview'].postMessage({
  type: 'config-update',
  config: updatedConfig,
}, '*');

// Preview iframe → Parent (for user interactions)
window.parent.postMessage({
  type: 'preview-interaction',
  action: 'chat-message-sent',
}, '*');
```

---

## Accessibility Features

### Focus Management
- Opening backstage traps focus within panel
- ESC closes panel and returns focus to ⚙️ button
- Tab order: Close button → Nav → Config controls → Save/Reset

### Screen Reader Announcements
- Panel opening: "Customization backstage opened"
- Panel closing: "Customization backstage closed"
- Config changes: "Theme updated, preview refreshed" (aria-live)
- Validation errors: "Error: Color contrast too low" (aria-live="assertive")

### Keyboard Shortcuts
- **ESC**: Close backstage
- **Ctrl+S**: Save changes (focus anywhere in panel)
- **Ctrl+Z**: Undo last change
- **Ctrl+Shift+R**: Reset to defaults (with confirmation)

### ARIA Attributes
```html
<div role="dialog" aria-modal="true" aria-labelledby="backstage-title">
  <h2 id="backstage-title">Customize EVA</h2>
  <nav aria-label="Customization sections">
    <ul role="list">
      <li><button aria-current="page">Home</button></li>
      <li><button>Theme</button></li>
      <!-- ... -->
    </ul>
  </nav>
  <div role="region" aria-label="Live preview">
    <iframe title="Configuration preview"></iframe>
  </div>
</div>
```

---

## Mobile Responsive Design

### Mobile (<768px)

Convert split-screen to tabbed interface:

```
┌─────────────────────────────────┐
│ ✕ Customize EVA                 │
├─────────────────────────────────┤
│ [Edit] [Preview]  ← Tabs        │
├─────────────────────────────────┤
│                                 │
│ [Selected tab content]          │
│                                 │
│ - Edit tab: Nav + config        │
│ - Preview tab: Full preview     │
│                                 │
├─────────────────────────────────┤
│ [Save] [Reset]                  │
└─────────────────────────────────┘
```

### Tablet (768px-1024px)

Maintain split-screen but adjust proportions:

- Nav: Collapse to icons only (tooltips on hover)
- Config: 50% width
- Preview: 50% width

---

## Error Handling

### Validation Errors
- Show inline error messages below invalid fields
- Highlight invalid fields with red border
- Prevent saving until errors resolved
- Show error summary at top of panel

### API Errors
- Display GC-styled alert banner
- Provide retry button
- Fall back to cached config if available

### Import Errors
- Validate file before applying
- Show specific error messages (e.g., "Invalid color format at theme.primaryColor")
- Allow partial import with warnings

---

## User Feedback

### Success Messages
- "Configuration saved successfully" (green alert)
- "Changes deployed" (green alert with checkmark)

### Warning Messages
- "Unsaved changes will be lost" (yellow alert, on close attempt)
- "Color contrast may not meet WCAG AAA" (yellow inline warning)

### Error Messages
- "Failed to save configuration" (red alert with retry button)
- "Invalid configuration file" (red alert with error details)

---

## Implementation Notes

### State Management
- Use React Context or Lit Context for config state
- Debounce preview updates (100ms) to avoid performance issues
- Persist draft changes to localStorage (auto-save every 30s)

### Performance Optimization
- Lazy load configuration panels (only load active panel)
- Virtualize long lists (e.g., text overrides)
- Optimize preview iframe updates (only send changed properties)

### Security
- Validate all imported configs server-side (if deployed)
- Sanitize text overrides to prevent XSS
- Limit file upload sizes (logo < 1MB)

---

**Document Owner**: EVA-UI UX Team  
**Last Review**: 2025-01-27  
**Next Review**: Q2 2025
