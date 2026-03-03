# Quick Reference - EVA Sovereign UI v1.0.0

## 🚀 One-Command Deploy
\\\powershell
# Push everything to GitHub
git add . && git commit -m "Week 1 Complete: Production ready v1.0.0" && git push origin main
\\\

## 📦 Package Installation
\\\ash
npm install @eva-sovereign/web-components
\\\

## 🔗 Important URLs
- **npm**: https://www.npmjs.com/package/@eva-sovereign/web-components
- **Storybook**: https://marcopolo483.github.io/EVA-Sovereign-UI/
- **GitHub**: https://github.com/MarcoPolo483/EVA-Sovereign-UI
- **Issues**: https://github.com/MarcoPolo483/EVA-Sovereign-UI/issues

## 💻 Quick Start
\\\html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@eva-sovereign/web-components';
  </script>
</head>
<body>
  <eva-button variant="primary">Click Me</eva-button>
  <eva-card>
    <h2 slot="header">Card Title</h2>
    <p>Card content here</p>
  </eva-card>
</body>
</html>
\\\

## 🧪 Test Commands
\\\powershell
cd packages/web-components
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm run test:coverage # Coverage report
npm run build         # Production build
\\\

## 📊 Key Metrics
- Tests: 934/934 (100%)
- Coverage: 98%+
- Components: 18
- Bundle: 89.68 kB (ES)
- WCAG: 2.2 AAA

## 📚 Documentation Files
- README.md - Usage guide
- CHANGELOG.md - Version history
- LICENSE - MIT license
- CONTRIBUTING.md - Contribution guide
- DEPLOYMENT-SETUP.md - Deploy instructions
- SPRINT-REVIEW-WEEK-1.md - Sprint review

## 🏷️ Version Info
- **Version**: 1.0.0
- **Release Date**: December 8, 2025
- **Status**: Production Ready ✅
