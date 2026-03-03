# EVA DevKit - Developer Onboarding

Complete quick-start guide for developers integrating EVA Sovereign UI components into their applications.

## 🎯 Purpose

DevKit provides:
- ✅ **Step-by-step installation** guide
- ✅ **Framework integration** examples (React, Vue, Vanilla JS)
- ✅ **Live interactive demos** with code snippets
- ✅ **Theming and customization** guide
- ✅ **i18n and accessibility** best practices

## 📚 Content Sections

### 1. Getting Started
- Installation (npm + CDN options)
- Quick start tutorial (3 steps)
- First working example
- Browser compatibility

### 2. Component Overview
- 11 component summaries with icons
- Usage patterns
- Key features
- Links to detailed docs

### 3. Framework Integration

#### React
- Import pattern
- useRef + addEventListener
- State management with useState
- Complete working example

#### Vue 3
- Vite configuration (isCustomElement)
- Composition API patterns
- v-model binding
- Complete working example

#### Vanilla JavaScript
- Direct DOM manipulation
- Event listeners
- Simple HTML example

### 4. Advanced Topics

#### Theming
- CSS custom properties
- GC Design System defaults
- Color/spacing/typography override examples

#### i18n (Internationalization)
- setGlobalLocale() API
- Per-component locale attribute
- EN-CA/FR-CA switching

#### Accessibility
- WCAG AAA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Touch target sizes

### 5. Resources
- Storybook link (40+ interactive stories)
- API Documentation (TypeDoc HTML)
- Production demos (Canada.ca Chatbot, GC Design Lab)
- GitHub repository

## 🎨 Design Features

### Sidebar Navigation
- Sticky position (scrolls with content)
- Categorized sections:
  - Getting Started (Installation, Quick Start, Components)
  - Integration (React, Vue, Vanilla JS)
  - Advanced (Theming, i18n, Accessibility)
  - Resources (Storybook, API Docs, Examples)
- Active state indicator
- Smooth scroll to sections

### Code Blocks
- Dark theme (VS Code style)
- Language labels (bash, html, jsx, vue, css, typescript)
- Syntax highlighting
- Copy-friendly formatting

### Interactive Demos
- Live eva-input + eva-button example
- Locale switcher (EN-CA/FR-CA)
- Real-time event demonstration
- Output display area

### Alert Boxes
- Info (blue): Tips and information
- Success (green): Completion messages
- Warning (orange): Important notes
- Icon + content layout

### Feature Cards
- Grid layout (responsive)
- Icon + title + description
- Border-left accent color
- Hover effects

## 🚀 Usage

### Run DevKit

```powershell
# From EVA-Sovereign-UI root
cd demos/devkit
npx serve .
```

Open `http://localhost:3000` in your browser.

### Navigate Content

Use the **sidebar navigation** to jump to sections:
- Click any link for smooth scroll
- Active section highlighted
- Sticky sidebar stays visible while scrolling

### Try Interactive Demos

1. **Input + Button Demo**:
   - Type in the input field
   - Click "Submit" button
   - See output display with timestamp

2. **Locale Switcher**:
   - Click "Français" to switch to French
   - Click "English" to switch back
   - All components update locale globally

## 📖 Learning Path

### Beginners (0-30 minutes)
1. Read "Installation" section
2. Follow "Quick Start" 3-step tutorial
3. Try the live demo
4. Copy code snippets to your project

### Intermediate (30-60 minutes)
1. Choose your framework (React/Vue/Vanilla JS)
2. Follow framework integration guide
3. Implement first component in your app
4. Test with keyboard navigation

### Advanced (60+ minutes)
1. Customize theme with CSS variables
2. Implement bilingual UI with i18n
3. Review accessibility features
4. Explore all 11 components in Storybook

## 🧪 Code Examples

### Complete React Component

```jsx
import { useRef, useEffect, useState } from 'react';
import '@eva-sovereign/web-components';

function LoginForm() {
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const button = buttonRef.current;
    const input = inputRef.current;

    const handleClick = () => {
      console.log('Email:', email);
    };

    const handleInput = (e) => {
      setEmail(e.detail.value);
    };

    button.addEventListener('eva-click', handleClick);
    input.addEventListener('eva-input', handleInput);

    return () => {
      button.removeEventListener('eva-click', handleClick);
      input.removeEventListener('eva-input', handleInput);
    };
  }, [email]);

  return (
    <div>
      <eva-input ref={inputRef} type="email" placeholder="Email"></eva-input>
      <eva-button ref={buttonRef} variant="primary">Sign In</eva-button>
    </div>
  );
}
```

### Complete Vue Component

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@eva-sovereign/web-components';

const email = ref('');
const buttonRef = ref(null);

onMounted(() => {
  buttonRef.value?.addEventListener('eva-click', () => {
    console.log('Email:', email.value);
  });
});
</script>

<template>
  <eva-input v-model="email" type="email" placeholder="Email" />
  <eva-button ref="buttonRef" variant="primary">Sign In</eva-button>
</template>
```

## 🎓 Key Takeaways

After completing DevKit, developers will know:

1. **Installation**: npm vs CDN, browser requirements
2. **Basic Usage**: Import, use in HTML, handle events
3. **Framework Integration**: React refs, Vue config, Vanilla JS
4. **Theming**: CSS custom properties override
5. **i18n**: setGlobalLocale() for bilingual UIs
6. **Accessibility**: WCAG AAA compliance, keyboard nav
7. **Resources**: Storybook, API docs, production demos

## 🌐 Browser Support

- ✅ Chrome 67+ (Desktop & Mobile)
- ✅ Firefox 63+ (Desktop & Mobile)
- ✅ Safari 13.1+ (Desktop & Mobile)
- ✅ Edge 79+ (Desktop)

## 📊 Metrics

- **Content Sections**: 8 comprehensive guides
- **Code Examples**: 15+ snippets across frameworks
- **Interactive Demos**: 2 live demos
- **Time to First Component**: < 5 minutes
- **Completion Time**: 30-60 minutes (full guide)

## 🔗 Related Resources

- **Storybook**: Interactive component playground
- **API Docs**: TypeDoc-generated reference
- **Canada.ca Chatbot**: RAG integration example
- **GC Design Lab**: All 11 components showcase

## 📝 License

Part of EVA-Sovereign-UI suite.  
© 2025 Marco Presta + POD-X Team

---

**Demo Status**: ✅ Production-Ready  
**Target Audience**: Frontend developers (React, Vue, Vanilla JS)  
**Last Updated**: December 7, 2025  
**Maintainer**: POD-X (P07-DVM + P12-UI)
