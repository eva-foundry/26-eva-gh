# Contributing to UX Accessibility

Thank you for your interest in contributing to the UX Accessibility library! This project aims to provide WCAG-compliant, bilingual, and highly accessible UI components for ESDC IT and millions of Canadians.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ux-accessibility.git`
3. Install dependencies: `npm install`
4. Run the demo: `npm run demo`

## Development Workflow

### Adding New Components

1. Create your component in `src/components/`
2. Follow the existing naming convention: `ComponentName.tsx`
3. Add corresponding stories: `ComponentName.stories.tsx`
4. Export your component in `src/index.ts`
5. Add it to the demo app in `demo/App.tsx`

### Accessibility Requirements

All components must meet these standards:

- **WCAG 2.1 AA compliance**
- **Keyboard navigation support**
- **Screen reader compatibility**
- **Focus management**
- **Proper ARIA attributes**
- **Semantic HTML structure**

### Testing

Before submitting a pull request:

1. Test with keyboard-only navigation
2. Test with a screen reader (NVDA, JAWS, or VoiceOver)
3. Verify color contrast meets AA standards
4. Run automated accessibility tests (when available)

### Bilingual Support

Components should support both English and French:

- Use prop-based text content
- Provide examples in both languages
- Consider text expansion for French translations

## Code Style

- Use TypeScript for all components
- Follow existing naming conventions
- Add proper JSDoc comments
- Include comprehensive prop interfaces

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/component-name`
2. Make your changes following the guidelines above
3. Test thoroughly for accessibility
4. Update documentation if needed
5. Submit a pull request with a clear description

## Questions?

If you have questions about contributing, please open an issue or reach out to the maintainers.

Thank you for helping make the web more accessible! 🌟
