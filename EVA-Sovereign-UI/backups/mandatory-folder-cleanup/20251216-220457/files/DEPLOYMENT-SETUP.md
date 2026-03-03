# EVA Sovereign UI - Deployment Setup Guide

**Date**: December 8, 2025  
**Status**: Ready for Production Deployment

---

## 📋 Prerequisites Checklist

Before deploying, ensure you have:

- ✅ GitHub account with repository access
- ✅ npm account (for publishing packages)
- ✅ Node.js 18+ installed locally
- ✅ Git configured with repository permissions
- ✅ GitHub Actions enabled in repository settings

---

## 🚀 Step 1: Enable GitHub Pages

### Via GitHub UI
1. Go to repository: https://github.com/MarcoPolo483/EVA-Sovereign-UI
2. Click **Settings** > **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save changes

### Verify GitHub Pages
- Wait 2-3 minutes for first deployment
- Access: https://marcopolo483.github.io/EVA-Sovereign-UI/
- Should show Storybook interface

---

## 🔄 Step 2: Push CI/CD Workflows

### Push Workflows to GitHub
\\\powershell
cd "C:\Users\marco\Documents\_AI Dev\EVA Suite\EVA-Sovereign-UI"

# Add workflow files
git add .github/workflows/

# Commit with descriptive message
git commit -m "Add CI/CD workflows for automated testing, building, and deployment"

# Push to main branch
git push origin main
\\\

### Workflows Created
1. **ci.yml** - Runs on every push/PR
   - Tests (vitest)
   - Build (vite)
   - Storybook build
   - Code quality checks

2. **deploy-storybook.yml** - Runs on main branch push
   - Builds Storybook
   - Deploys to GitHub Pages
   - Auto-updates live demo

3. **publish.yml** - Runs on GitHub releases
   - Tests package
   - Builds distribution
   - Publishes to npm
   - Creates release artifacts

---

## 📦 Step 3: Test Local Installation (Optional)

### Create Package Tarball
\\\powershell
cd packages/web-components
npm pack
\\\

**Output**: \va-sovereign-web-components-1.0.0.tgz\

### Test Installation
\\\powershell
# Create test directory
cd ..\..\..
mkdir test-install
cd test-install
npm init -y

# Install from tarball
npm install ../EVA-Sovereign-UI/packages/web-components/eva-sovereign-web-components-1.0.0.tgz

# Verify installation
npm list @eva-sovereign/web-components
\\\

### Test in Browser
\\\html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@eva-sovereign/web-components';
  </script>
</head>
<body>
  <eva-button>Test Button</eva-button>
</body>
</html>
\\\

---

## 🏷️ Step 4: Create GitHub Release

### Via GitHub UI
1. Go to: https://github.com/MarcoPolo483/EVA-Sovereign-UI/releases
2. Click **Draft a new release**
3. Fill in release details:
   - **Tag**: \1.0.0\
   - **Target**: \main\ branch
   - **Title**: \1.0.0 - Initial Release\
   - **Description**: Copy from \packages/web-components/CHANGELOG.md\

4. Attach build artifacts:
   - \packages/web-components/dist/eva-sovereign-ui.es.js\
   - \packages/web-components/dist/eva-sovereign-ui.umd.js\
   - \packages/web-components/dist/eva-sovereign-ui.es.js.map\
   - \packages/web-components/dist/eva-sovereign-ui.umd.js.map\

5. Click **Publish release**

### Via Git Command Line
\\\powershell
cd "C:\Users\marco\Documents\_AI Dev\EVA Suite\EVA-Sovereign-UI"

# Create and push tag
git tag -a v1.0.0 -m "Release v1.0.0 - Initial production release"
git push origin v1.0.0

# Then create release via GitHub UI with artifacts
\\\

---

## 📢 Step 5: Publish to npm

### Setup npm Account
\\\powershell
# Login to npm (one-time setup)
npm login

# Enter credentials:
# - Username: [your npm username]
# - Password: [your npm password]
# - Email: [your npm email]
# - OTP: [if 2FA enabled]
\\\

### Verify Package Before Publishing
\\\powershell
cd packages/web-components

# Dry run (shows what will be published)
npm publish --dry-run --access public
\\\

**Review Output**:
- Check file list (should include dist/, README.md, LICENSE)
- Verify package size (should be ~100-150 KB)
- Confirm version is 1.0.0

### Publish to npm Registry
\\\powershell
# Publish package
npm publish --access public
\\\

**Expected Output**:
\\\
+ @eva-sovereign/web-components@1.0.0
\\\

### Verify Publication
\\\powershell
# Check package on npm
npm view @eva-sovereign/web-components

# Test installation from npm
cd ..\..\..
mkdir test-npm-install
cd test-npm-install
npm init -y
npm install @eva-sovereign/web-components
\\\

---

## 🔐 Step 6: Configure GitHub Secrets

### Add npm Token for Automated Publishing
1. Generate npm token:
   - Login to https://www.npmjs.com
   - Account > Access Tokens > Generate New Token
   - Type: **Automation**
   - Copy token (starts with \
pm_...\)

2. Add to GitHub Secrets:
   - Go to repository Settings > Secrets and variables > Actions
   - Click **New repository secret**
   - Name: \NPM_TOKEN\
   - Value: [paste npm token]
   - Click **Add secret**

### Test Automated Publishing
1. Create a new tag (e.g., \1.0.1-test\)
2. Push tag to GitHub
3. GitHub Actions will automatically:
   - Run tests
   - Build package
   - Publish to npm (if tests pass)

---

## 🌐 Step 7: Verify All Deployments

### 1. GitHub Pages (Storybook)
- **URL**: https://marcopolo483.github.io/EVA-Sovereign-UI/
- **Check**: All 18 components render correctly
- **Test**: Interactive controls work

### 2. npm Package
- **URL**: https://www.npmjs.com/package/@eva-sovereign/web-components
- **Check**: Package details visible
- **Test**: \
pm install @eva-sovereign/web-components\

### 3. GitHub Release
- **URL**: https://github.com/MarcoPolo483/EVA-Sovereign-UI/releases/tag/v1.0.0
- **Check**: Release notes from CHANGELOG
- **Test**: Download and extract artifacts

### 4. CI/CD Workflows
- **URL**: https://github.com/MarcoPolo483/EVA-Sovereign-UI/actions
- **Check**: All workflows passing (green checkmarks)
- **Test**: Create PR and verify automated checks run

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- ✅ Storybook accessible at GitHub Pages URL
- ✅ npm package installable with \
pm install\
- ✅ GitHub release v1.0.0 visible with artifacts
- ✅ CI/CD workflows running on commits
- ✅ All tests passing (934/934)
- ✅ Documentation accessible (README, CONTRIBUTING)
- ✅ License visible (MIT)

---

## 🐛 Troubleshooting

### GitHub Pages Not Deploying
**Problem**: Storybook not accessible after 5 minutes  
**Solution**:
1. Check Actions tab for errors
2. Verify Pages is set to "GitHub Actions" source
3. Manually trigger workflow: Actions > Deploy Storybook > Run workflow

### npm Publish Fails
**Problem**: \
pm publish\ returns 403 or 401 error  
**Solution**:
1. Verify npm login: \
pm whoami\
2. Check package name is available: \
pm view @eva-sovereign/web-components\
3. Ensure account has publish permissions
4. Try logging out and back in: \
pm logout && npm login\

### CI/CD Workflow Fails
**Problem**: GitHub Actions failing on tests  
**Solution**:
1. Check workflow logs in Actions tab
2. Run tests locally: \
pm test\
3. Verify Node.js version matches (20.x)
4. Check for missing dependencies: \
pm ci\

### Build Artifacts Missing
**Problem**: dist/ directory empty or missing files  
**Solution**:
1. Run build locally: \
pm run build\
2. Check vite.config.ts configuration
3. Verify TypeScript compilation: \
pm run build:check\
4. Clean and rebuild: \m -rf dist && npm run build\

---

## 📞 Support

### Resources
- **Documentation**: See README.md, CONTRIBUTING.md
- **Issues**: https://github.com/MarcoPolo483/EVA-Sovereign-UI/issues
- **Discussions**: GitHub Discussions tab
- **Contact**: marco@eva-sovereign.com

### Getting Help
1. Check existing GitHub Issues first
2. Review documentation in docs/ directory
3. Test with minimal reproduction case
4. Include error messages and logs in issue reports

---

## 🎉 Success Indicators

**Deployment is successful when**:

1. ✅ GitHub Pages shows live Storybook demo
2. ✅ \
pm install @eva-sovereign/web-components\ works
3. ✅ Components render in browser without errors
4. ✅ All CI/CD workflows passing (green badges)
5. ✅ GitHub release v1.0.0 visible with downloads
6. ✅ README badges showing passing tests and coverage

---

**Setup Guide Version**: 1.0.0  
**Last Updated**: December 8, 2025  
**Maintained By**: EVA Suite Team
