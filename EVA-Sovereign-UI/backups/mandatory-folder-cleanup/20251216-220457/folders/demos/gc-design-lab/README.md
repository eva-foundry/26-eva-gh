# GC Design Lab - Component Showcase

Comprehensive showcase of all 11 EVA Sovereign UI components with live, interactive examples.

## 🎯 Purpose

This demo provides:
- ✅ **Complete component library** showcase (all 11 components)
- ✅ **Interactive examples** with live code
- ✅ **Usage patterns** and best practices
- ✅ **Accessibility features** demonstration
- ✅ **GC Design System** compliance verification

## 🧩 Components Featured

### 1. EVA Button (6 variants)
- Supertask: High-emphasis primary action
- Primary: Standard call-to-action
- Secondary: Lower-emphasis alternative action
- Danger: Destructive actions
- Link: Text-style navigation
- Contextual Sign-in: GCKey authentication

### 2. Form Components (6 types)
- **EVA Input**: Text, email, password, tel, url, number
- **EVA Select**: Dropdown with keyboard navigation
- **EVA Checkbox**: Custom styled with 44px targets
- **EVA Radio**: Mutual exclusion with arrow keys
- **EVA Modal**: 3 sizes (small, medium, large)
- **EVA Tabs**: Tabbed content with Home/End shortcuts

### 3. Layout Components (3 types)
- **EVA Card**: Default, bordered, elevated variants
- **EVA Modal**: Focus trap, Esc/backdrop close
- **EVA Tabs**: Arrow navigation, ARIA tabs pattern

### 4. Feedback Components
- **EVA Alert**: Success, info, warning, danger (dismissible)

### 5. Chat Component ⭐
- **EVA Chat Panel**: Message bubbles, typing indicator, RAG-ready

## 🎨 Features

### Interactive Demos
- Live component examples
- Real-time interaction
- Form validation
- State management

### Navigation
- Category filtering (Buttons, Forms, Layout, Feedback, Chat)
- Smooth scrolling
- Responsive design

### Code Examples
- Usage snippets
- Event handling
- Integration patterns

## 🚀 Usage

### Run Demo

```powershell
# From EVA-Sovereign-UI root
cd demos/gc-design-lab
npx serve .
```

Open `http://localhost:3000` in your browser.

### Navigate Components

Use the **header navigation** to filter by category:
- **All Components**: Show everything
- **Buttons**: EVA Button variants
- **Forms**: Input, Select, Checkbox, Radio
- **Layout**: Card, Modal, Tabs
- **Feedback**: Alert types
- **Chat**: EVA Chat Panel

### Try Interactions

1. **Buttons**: Click all 6 variants
2. **Forms**: Fill out the registration form
3. **Modal**: Click "Open Modal" to test focus trap
4. **Tabs**: Navigate with arrow keys (Home/End shortcuts)
5. **Alerts**: Dismiss alerts with X button
6. **Chat**: Send messages and see typing indicator

## 📊 Stats Overview

- **11 Components**: Complete toolkit
- **WCAG AAA**: 7:1 contrast, keyboard nav
- **2 Languages**: EN-CA/FR-CA
- **100% GC Compliant**: Official design system

## 🧪 Testing Use Cases

### Accessibility Testing
- Tab through all components (focus indicators)
- Use screen reader (NVDA/JAWS)
- Test with keyboard only (no mouse)
- 200% zoom level
- High contrast mode

### Functional Testing
- Form validation (required fields, email format)
- Modal focus trap (Tab cycles within modal)
- Tabs keyboard nav (Arrow keys, Home/End)
- Alert dismissal
- Chat message sending

### Visual Testing
- Responsive breakpoints (mobile, tablet, desktop)
- Dark mode (if supported)
- Print styles
- Color contrast

## 🔌 Integration Examples

### Button Events

```javascript
const button = document.querySelector('eva-button');

button.addEventListener('eva-click', (e) => {
  console.log('Button clicked:', e.detail);
});
```

### Form Validation

```javascript
const input = document.querySelector('eva-input');

input.addEventListener('eva-input', (e) => {
  const value = e.detail.value;
  
  if (value.length < 3) {
    input.setAttribute('error', 'Minimum 3 characters');
  } else {
    input.removeAttribute('error');
  }
});
```

### Modal Control

```javascript
const modal = document.querySelector('eva-modal');

// Open
modal.setAttribute('open', 'true');

// Close
modal.removeAttribute('open');

// Listen for close event
modal.addEventListener('eva-close', () => {
  console.log('Modal closed');
});
```

### Chat Integration

```javascript
const chat = document.querySelector('eva-chat-panel');

// Add message
chat.addMessage({
  role: 'assistant',
  content: 'Hello! How can I help?',
  timestamp: new Date().toISOString()
});

// Listen for user messages
chat.addEventListener('eva-message-send', async (e) => {
  const userMessage = e.detail.message;
  
  // Show typing indicator
  chat.setAttribute('is-typing', 'true');
  
  // Query backend
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage })
  });
  
  const data = await response.json();
  
  // Add response
  chat.addMessage({
    role: 'assistant',
    content: data.answer,
    timestamp: new Date().toISOString()
  });
  
  // Hide typing indicator
  chat.setAttribute('is-typing', 'false');
});
```

## 🎓 Learning Outcomes

After exploring this demo, you'll understand:

1. **Component Variants**: Different visual styles for each component
2. **Event Handling**: Custom events (eva-click, eva-input, eva-change)
3. **Accessibility**: WCAG AAA compliance patterns
4. **State Management**: Component state via attributes
5. **Keyboard Navigation**: Focus management and shortcuts
6. **Responsive Design**: Mobile-first approach
7. **GC Design System**: Official colors, fonts, spacing

## 🌐 Browser Support

- ✅ Chrome 67+ (Desktop & Mobile)
- ✅ Firefox 63+ (Desktop & Mobile)
- ✅ Safari 13.1+ (Desktop & Mobile)
- ✅ Edge 79+ (Desktop)

## 📈 Performance

- **Component Bundle**: 87 KB (gzipped: 20 KB)
- **First Paint**: < 1s
- **Interactive**: < 2s
- **Lighthouse Score**: 95+

## 🔗 Related Demos

- **Canada.ca Chatbot**: RAG integration example
- **DevKit**: Developer onboarding guide
- **Storybook**: Isolated component development

## 📝 License

Part of EVA-Sovereign-UI suite.  
© 2025 Marco Presta + POD-X Team

---

**Demo Status**: ✅ Production-Ready  
**Components**: 11 (100% coverage)  
**Last Updated**: December 7, 2025  
**Maintainer**: POD-X (P07-DVM + P12-UI)
