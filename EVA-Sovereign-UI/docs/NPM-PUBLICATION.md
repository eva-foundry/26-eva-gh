# npm Publication Guide

Complete guide for publishing `@eva-sovereign/web-components` to npm registry.

## 📦 Package Information

```json
{
  "name": "@eva-sovereign/web-components",
  "version": "1.0.0",
  "description": "Production-ready Web Components for Government of Canada",
  "license": "MIT"
}
```

## ✅ Pre-Publication Checklist

### 1. Verify Package Metadata ✅

- [x] **Name**: `@eva-sovereign/web-components` (scoped package)
- [x] **Version**: 1.0.0 (semantic versioning)
- [x] **Description**: Clear and concise
- [x] **Keywords**: Comprehensive (20+ keywords)
- [x] **License**: MIT
- [x] **Repository**: GitHub URL with directory
- [x] **Homepage**: GitHub Pages URL
- [x] **Author**: Marco Presta
- [x] **Engines**: Node >=18, npm >=9

### 2. Verify Build Output ✅

```powershell
cd packages/web-components
npm run build
```

Expected output in `dist/`:
- [x] `index.js` (ESM entry point)
- [x] `index.d.ts` (TypeScript declarations)
- [x] `eva-sovereign-ui.es.js` (ESM bundle)
- [x] `eva-sovereign-ui.umd.js` (UMD bundle)

### 3. Verify Documentation ✅

- [x] **README.md**: Installation, usage, examples
- [x] **Storybook**: 40+ stories built
- [x] **API Docs**: TypeDoc generated
- [x] **Examples**: React, Vue, Vanilla JS
- [x] **Migration Guide**: React to Web Components
- [x] **Troubleshooting**: Common issues

### 4. Test Package Locally

```powershell
# Build package
npm run build

# Test local installation
npm pack
# Creates: eva-sovereign-web-components-1.0.0.tgz

# Install in test project
cd ../test-app
npm install ../web-components/eva-sovereign-web-components-1.0.0.tgz

# Verify import works
node -e "import('@eva-sovereign/web-components').then(console.log)"
```

### 5. Quality Gates ✅

- [x] **TypeScript**: 0 errors (strict mode)
- [x] **Tests**: All passing (if implemented)
- [x] **Lint**: No errors
- [x] **Build**: Successful
- [x] **Bundle Size**: < 100 KB (gzipped < 25 KB)

## 🚀 Publication Steps

### Step 1: Create npm Account

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click "Sign Up"
3. Verify email address

### Step 2: Login to npm

```powershell
npm login
```

Enter credentials:
- Username
- Password
- Email
- 2FA code (if enabled)

### Step 3: Verify Login

```powershell
npm whoami
# Should print your username
```

### Step 4: Check Package Name Availability

```powershell
npm view @eva-sovereign/web-components
# Should show: "npm error 404 '@eva-sovereign/web-components@*' is not in this registry"
```

If package exists, you need access or a different name.

### Step 5: Create npm Organization (if needed)

```powershell
# Create @eva-sovereign organization on npmjs.com
# Settings > Organizations > Create Organization
```

### Step 6: Dry Run Publication

```powershell
cd packages/web-components

# Test what will be published
npm publish --dry-run
```

Review output to verify correct files included.

### Step 7: Publish Package

```powershell
# Publish v1.0.0
npm publish --access public

# For scoped packages, must specify --access public
```

Expected output:
```
+ @eva-sovereign/web-components@1.0.0
```

### Step 8: Verify Publication

```powershell
# Check package page
npm view @eva-sovereign/web-components

# Install from npm
npm install @eva-sovereign/web-components
```

## 📊 Post-Publication

### 1. Update README Badges

Add to `README.md`:

```markdown
[![npm version](https://badge.fury.io/js/@eva-sovereign%2Fweb-components.svg)](https://www.npmjs.com/package/@eva-sovereign/web-components)
[![npm downloads](https://img.shields.io/npm/dm/@eva-sovereign/web-components.svg)](https://www.npmjs.com/package/@eva-sovereign/web-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

### 2. Create GitHub Release

```powershell
# Tag release
git tag -a v1.0.0 -m "Release v1.0.0 - Production-ready Web Components"
git push origin v1.0.0
```

On GitHub:
1. Go to Releases
2. Click "Create a new release"
3. Select tag: v1.0.0
4. Title: "v1.0.0 - Production Release"
5. Description: Changelog and highlights
6. Attach `.tgz` file
7. Publish release

### 3. Update GitHub Pages

```powershell
# Trigger GitHub Actions deployment
git push origin master
```

### 4. Announce Release

Share on:
- GitHub Discussions
- Twitter/X
- LinkedIn
- Dev.to
- Reddit (r/webdev, r/javascript)

## 🔄 Future Updates

### Semantic Versioning

- **Major** (2.0.0): Breaking changes
- **Minor** (1.1.0): New features (backward compatible)
- **Patch** (1.0.1): Bug fixes

### Update Workflow

```powershell
# 1. Make changes
# ... edit code ...

# 2. Update version
npm version patch  # or minor/major
# Creates git tag automatically

# 3. Build and test
npm run build
npm test

# 4. Publish
npm publish --access public

# 5. Push changes
git push origin master --tags
```

## 📝 npm Package Page

After publication, configure package page at:
`https://www.npmjs.com/package/@eva-sovereign/web-components`

Add:
- **README**: Auto-imported from package
- **Keywords**: For discoverability
- **Homepage**: Link to GitHub Pages
- **Repository**: Link to GitHub repo
- **Collaborators**: Add team members

## 🔒 Security

### Enable 2FA (Recommended)

```powershell
npm profile enable-2fa auth-and-writes
```

### npm Access Tokens

For CI/CD automation:

1. Generate token: `npm token create`
2. Add to GitHub Secrets: `NPM_TOKEN`
3. Use in workflow:

```yaml
- name: Publish to npm
  run: |
    echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > ~/.npmrc
    npm publish --access public
```

## 📈 Analytics

Track package usage:

- **npm stats**: `npm view @eva-sovereign/web-components`
- **Download counts**: https://npmtrends.com/@eva-sovereign/web-components
- **GitHub stars**: Monitor repository
- **npm Insights**: Check npm account dashboard

## 🐛 Troubleshooting

### Issue: "You do not have permission to publish"

**Fix**: Request access to `@eva-sovereign` scope or use different scope.

### Issue: "Package already exists"

**Fix**: Change package name or request access from current owner.

### Issue: "Invalid version"

**Fix**: Ensure version follows semver (x.y.z format).

### Issue: "Missing required field"

**Fix**: Verify all required fields in package.json:
- name
- version
- description
- license

### Issue: "Build artifacts not found"

**Fix**: Run `npm run build` before publishing.

## 📚 Resources

- **npm Docs**: https://docs.npmjs.com/
- **Semantic Versioning**: https://semver.org/
- **npm Best Practices**: https://docs.npmjs.com/misc/developers
- **Publishing Scoped Packages**: https://docs.npmjs.com/creating-and-publishing-scoped-public-packages

## ✅ Publication Status

**Current Version**: 1.0.0 (ready to publish)  
**Scope**: @eva-sovereign (requires organization)  
**Access**: public  
**Registry**: https://registry.npmjs.org/

---

**Last Updated**: December 7, 2025  
**Maintainer**: Marco Presta + POD-X Team
