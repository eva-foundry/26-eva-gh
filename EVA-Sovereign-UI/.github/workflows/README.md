# GitHub Pages Deployment

This workflow automatically deploys EVA Sovereign UI documentation to GitHub Pages.

## 🚀 What Gets Deployed

The GitHub Pages site includes:

1. **Storybook** (`/storybook/`)
   - 40+ interactive component stories
   - Live component playground
   - Accessibility testing
   - Locale switcher

2. **API Documentation** (`/docs/`)
   - TypeDoc-generated HTML
   - Complete API reference
   - TypeScript type definitions
   - Props, events, methods

3. **Production Demos** (`/demos/`)
   - **DevKit** (`/demos/devkit/`) - Quick start guide
   - **Canada.ca Chatbot** (`/demos/canada-chatbot/`) - RAG integration
   - **GC Design Lab** (`/demos/gc-design-lab/`) - Component showcase

4. **Component Bundle** (`/dist/`)
   - `eva-sovereign-ui.es.js` (ESM bundle)
   - `eva-sovereign-ui.umd.js` (UMD bundle)

5. **Landing Page** (`/`)
   - Overview with stats
   - Links to all resources
   - GitHub repository link

## 📋 Workflow Details

### Trigger Events
- **Push to main/master branch** - Automatic deployment
- **Manual workflow dispatch** - Deploy on demand

### Build Steps

1. **Checkout code** - Clone repository
2. **Setup Node.js 20** - Install Node.js and npm
3. **Install dependencies** - `npm ci` in web-components package
4. **Build components** - `npm run build` (TypeScript + Vite)
5. **Build Storybook** - `npm run build-storybook` (static HTML)
6. **Generate API docs** - `npm run docs` (TypeDoc)
7. **Copy files** - Organize deployment directory
8. **Create landing page** - Generate index.html
9. **Upload artifact** - Prepare for Pages deployment
10. **Deploy** - Publish to GitHub Pages

### Permissions Required

```yaml
permissions:
  contents: read      # Read repository files
  pages: write        # Write to GitHub Pages
  id-token: write     # OIDC token for deployment
```

## 🔧 Setup Instructions

### 1. Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Under "Build and deployment":
   - Source: **GitHub Actions**
   - (Not "Deploy from a branch")
4. Save settings

### 2. First Deployment

```powershell
# Commit and push the workflow file
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin master
```

The workflow will automatically run and deploy to:
```
https://marcopolo483.github.io/EVA-Sovereign-UI/
```

### 3. Manual Deployment

To deploy manually without pushing:

1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select branch (main/master)
5. Click **Run workflow**

## 📊 Deployment Status

Check deployment status:

1. **Actions Tab**: See build logs and errors
2. **Environments**: View deployment history
3. **Pages Settings**: See current deployment URL

### Successful Deployment

When successful, you'll see:
- ✅ Build job complete
- ✅ Deploy job complete
- 🌐 Deployment URL active

### Common Issues

**Issue**: "Permission denied to deploy"
- **Fix**: Enable Pages write permission in Settings > Actions > General > Workflow permissions

**Issue**: "Artifact upload failed"
- **Fix**: Check public/ directory exists and contains files

**Issue**: "Build failed"
- **Fix**: Check npm scripts exist in package.json (build, build-storybook, docs)

## 🔗 Deployment URL Structure

After deployment, access content at:

```
Base URL: https://marcopolo483.github.io/EVA-Sovereign-UI/

Resources:
├── /                           # Landing page
├── /storybook/                 # Storybook documentation
├── /docs/                      # API documentation
├── /demos/
│   ├── /devkit/                # Quick start guide
│   ├── /canada-chatbot/        # Chatbot demo
│   └── /gc-design-lab/         # Component showcase
└── /dist/                      # Component bundles
    ├── eva-sovereign-ui.es.js
    └── eva-sovereign-ui.umd.js
```

## 📝 Updating Deployment

### Update Content

1. Make changes to components, demos, or docs
2. Commit and push to main/master branch
3. Workflow runs automatically
4. New content deployed in ~5 minutes

### Update Workflow

1. Edit `.github/workflows/deploy.yml`
2. Test locally if possible
3. Commit and push
4. Monitor Actions tab for errors

## 🧪 Testing Before Deployment

### Local Preview

```powershell
# Build everything locally
cd packages/web-components

# Build components
npm run build

# Build Storybook
npm run build-storybook

# Generate API docs
npm run docs

# Serve locally
npx serve storybook-static  # Test Storybook
npx serve docs/api          # Test API docs
npx serve ../../demos       # Test demos
```

### Validate Links

Before deploying, ensure all internal links work:
- Storybook navigation
- API docs navigation
- Demo relative paths (../../packages/web-components/dist/index.js)
- Landing page links

## 📈 Performance

Expected deployment metrics:
- **Build time**: 3-5 minutes
- **Deployment time**: 1-2 minutes
- **Total time**: 5-7 minutes
- **Site size**: ~15-20 MB

## 🔒 Security

- Workflow runs in isolated environment
- No secrets required (public site)
- OIDC authentication for deployment
- Read-only access to repository

## 📞 Support

If deployment fails:
1. Check Actions tab for error logs
2. Verify package.json scripts exist
3. Ensure all dependencies install correctly
4. Test build locally first
5. Check GitHub Pages status page

---

**Workflow Status**: ✅ Ready to Deploy  
**Last Updated**: December 7, 2025  
**Maintainer**: POD-X (P07-DVM + P12-UI)
