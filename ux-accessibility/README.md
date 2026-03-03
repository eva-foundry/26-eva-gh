# UX Accessibility

A transformative, shareable accessibility product to empower ESDC IT and millions of Canadians. Easily integrate WCAG-compliant, bilingual, and highly accessible UI components into any web project.

## Demo
Run locally with `npm run demo` or [view the live demo](#) <!-- TODO: Link to deployed demo app -->

## Get Started
```sh
npm install @esdc/ux-accessibility
```

### Local Development
```sh
# Clone the repository
git clone https://github.com/MarcoPolo483/ux-accessibility.git
cd ux-accessibility

# Install dependencies
npm install

# Run the demo app
npm run demo

# Run accessibility tests
npm run test:a11y

# Run accessibility linting
npm run lint:a11y
```

### Dev Container Setup
This project includes VS Code Dev Container support for consistent development environments:
1. Open in VS Code
2. Install the "Dev Containers" extension
3. Click "Reopen in Container" when prompted
4. The environment will be automatically configured with Node.js 20 and accessibility tools

## Features
- Plug-and-play accessible UI components (buttons, forms, modals, etc.)
- WCAG 2.1 AA compliance
- Bilingual (English/French) support
- Customizable themes
- Framework adapters: React, Vue, Angular
- Automated accessibility testing (axe-core, pa11y, Lighthouse)
- Comprehensive documentation and onboarding

## Repo Structure
```
ux-accessibility/
  src/            # Core library code
  adapters/       # React, Vue, Angular wrappers
  demo/           # Self-contained demo app
  docs/           # Documentation
  .storybook/     # Live playground (optional)
  README.md
  package.json
```

## Roadmap
- [x] Scaffold repo and documentation
- [x] Build flagship accessible components (Button, Form, Modal)
- [x] Set up development environment (Vite + React)
- [x] Create dev container configuration
- [x] Set up automated accessibility tests (axe-core, jsx-a11y)
- [ ] Add framework adapters (Vue, Angular)
- [ ] Deploy demo app for instant access
- [ ] Publish to npm

## Contributing
Open source, welcoming contributions. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License
MIT
