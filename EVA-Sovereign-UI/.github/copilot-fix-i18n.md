# GitHub Copilot: Fix EVA-Sovereign-UI i18n Translation Failures

**Copy/paste this entire prompt to GitHub Copilot in one message:**

---

You are **P07-DVM (Development Manager)** fixing critical i18n translation failures in EVA-Sovereign-UI.

## 🎯 Mission
Fix **7 failing tests** caused by translation keys not resolving to actual text. This blocks production deployment and violates Official Languages Act compliance.

## 🔍 Problem Summary (from AUDIT-REPORT.md)

**Test Failures**: 7/934 tests failing (99.25% pass rate, need 100%)

### Affected Components
1. **gc-page-navigation** (2 failures)
   - Line 365: `pageNav.previous` key not translating (EN-CA)
   - Line 379: `pageNav.next` key not translating (FR-CA)

2. **gc-report-problem** (5 failures)
   - Line 67: `reportProblem.heading` key not translating
   - Line 76: `reportProblem.intro` key not translating
   - Line 113: `reportProblem.privacyNote` key not translating
   - Line 562: `reportProblem.heading` key not translating (EN-CA)
   - Line 571: `reportProblem.heading` key not translating (FR-CA)

**Root Cause**: Translation keys rendering as literal strings (e.g., "reportProblem.heading") instead of actual translated text.

## 🔧 Fix Strategy (Execute in Order)

### Step 1: Verify Translation Files Exist (5 min)

```powershell
# Check for i18n translation files
Get-ChildItem -Path "packages/web-components/src/i18n" -Recurse -Filter "*.json"

# Read translation files to verify keys exist
Get-Content "packages/web-components/src/i18n/en-CA.json" | Select-String -Pattern "pageNav|reportProblem"
Get-Content "packages/web-components/src/i18n/fr-CA.json" | Select-String -Pattern "pageNav|reportProblem"
```

**Expected**: Translation files should have entries like:
```json
{
  "pageNav": {
    "previous": "Previous",
    "next": "Next"
  },
  "reportProblem": {
    "heading": "Report a problem on this page",
    "intro": "Please select all that apply:",
    "privacyNote": "Your feedback will not be shared publicly."
  }
}
```

**If missing**: Add translation keys to both `en-CA.json` and `fr-CA.json`.

### Step 2: Inspect EVAElement.t() Method (10 min)

```powershell
# Read EVAElement base class to understand translation loading
Get-Content "packages/web-components/src/components/EVAElement.ts" | Select-String -Pattern "t\(|i18n|lang|translation" -Context 3
```

**Debug Questions**:
1. Does `EVAElement.t()` method exist?
2. Is it loading translation bundles from `src/i18n/`?
3. Is it reading the `lang` attribute from component instances?
4. Is there error handling for missing keys?

**If broken**: Fix the `t()` method to:
- Load translation JSON files based on `this.lang` attribute
- Fall back to `en-CA` if locale not found
- Return the key as-is if translation missing (with console warning)

### Step 3: Check Component Usage of this.t() (5 min)

```powershell
# Verify components are calling this.t() correctly
Get-Content "packages/web-components/src/components/gc-page-navigation/gc-page-navigation.ts" | Select-String -Pattern "this\.t\(" -Context 2
Get-Content "packages/web-components/src/components/gc-report-problem/gc-report-problem.ts" | Select-String -Pattern "this\.t\(" -Context 2
```

**Expected**: Components should call:
```typescript
${this.t('pageNav.previous')}
${this.t('reportProblem.heading')}
```

**If hardcoded**: Replace hardcoded strings with `this.t('key')` calls.

### Step 4: Add Missing Translation Keys (10 min)

**File**: `packages/web-components/src/i18n/en-CA.json`

Add/verify these keys exist:
```json
{
  "pageNav": {
    "previous": "Previous",
    "next": "Next"
  },
  "reportProblem": {
    "heading": "Report a problem on this page",
    "intro": "Please select all that apply:",
    "privacyNote": "Your feedback will not be shared publicly. No personal information will be collected."
  }
}
```

**File**: `packages/web-components/src/i18n/fr-CA.json`

Add/verify these keys exist:
```json
{
  "pageNav": {
    "previous": "Précédent",
    "next": "Suivant"
  },
  "reportProblem": {
    "heading": "Signaler un problème sur cette page",
    "intro": "Veuillez sélectionner toutes les options qui s'appliquent :",
    "privacyNote": "Vos commentaires ne seront pas partagés publiquement. Aucun renseignement personnel ne sera recueilli."
  }
}
```

### Step 5: Fix EVAElement.t() Method if Broken (15 min)

**File**: `packages/web-components/src/components/EVAElement.ts`

Expected implementation:
```typescript
import enCA from '../i18n/en-CA.json';
import frCA from '../i18n/fr-CA.json';

export class EVAElement extends LitElement {
  @property({ type: String, reflect: true })
  lang: 'en-CA' | 'fr-CA' = 'en-CA';

  private translations = {
    'en-CA': enCA,
    'fr-CA': frCA
  };

  /**
   * Translate a key to localized text
   * @param key - Translation key (e.g., 'pageNav.previous')
   * @returns Translated text or key if not found
   */
  protected t(key: string): string {
    const locale = this.lang || 'en-CA';
    const bundle = this.translations[locale];
    
    if (!bundle) {
      console.warn(`Translation bundle not found for locale: ${locale}`);
      return key;
    }

    // Support nested keys: 'pageNav.previous' → bundle.pageNav.previous
    const keys = key.split('.');
    let value: any = bundle;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} (locale: ${locale})`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }
}
```

**If implementation is different or broken**: Fix it to match above pattern.

### Step 6: Run Tests to Verify Fix (5 min)

```powershell
cd packages/web-components
npm test -- --run 2>&1 | Select-String -Pattern "Test Files|Tests|passed|failed"
```

**Expected Output**:
```
Test Files  26 passed (26)
Tests  934 passed (934)
```

**If still failing**: 
1. Check console for `Translation key not found` warnings
2. Verify JSON files are valid (no syntax errors)
3. Verify import paths in EVAElement.ts are correct
4. Check if components are setting `lang` attribute correctly

### Step 7: Manual Smoke Test (5 min)

```powershell
# Start Storybook to visually verify translations
cd packages/web-components
npm run storybook
```

**Manual checks**:
1. Open `gc-page-navigation` story
2. Verify "Previous" and "Next" buttons show actual text (not keys)
3. Toggle language to FR-CA
4. Verify buttons show "Précédent" and "Suivant"
5. Open `gc-report-problem` story
6. Verify heading, intro, privacy note show actual text (not keys)

### Step 8: Update AUDIT-REPORT.md (2 min)

After all tests pass, update the audit report:

**File**: `AUDIT-REPORT.md`

Change:
```markdown
- **Test Pass Rate**: 99.25% (927 passing, 7 failing)
```

To:
```markdown
- **Test Pass Rate**: 100% (934 passing, 0 failing) ✅ FIXED
```

Add to Critical Findings:
```markdown
### ✅ RESOLVED: i18n Translation System Fixed
**Previously**: Translation keys (`reportProblem.heading`, `pageNav.previous`) rendering as literal strings  
**Fix Applied**: 
1. Added missing translation keys to `en-CA.json` and `fr-CA.json`
2. Fixed `EVAElement.t()` method to properly load translation bundles
3. Verified all 934 tests now passing (100%)

**Date Fixed**: December 10, 2025  
**Fixed By**: P07-DVM
```

## ✅ Expected Outcome

After executing all 8 steps:

1. **All tests passing**: 934/934 (100%)
2. **Translation files complete**: All keys for `pageNav` and `reportProblem` in both EN-CA and FR-CA
3. **EVAElement.t() working**: Correctly loading and resolving translation keys
4. **Storybook verified**: Components render with actual text, not keys
5. **AUDIT-REPORT.md updated**: Documents the fix

## 🚨 Troubleshooting

**If tests still fail after Step 6**:

```powershell
# Enable debug logging in tests
cd packages/web-components
npm test -- --run --reporter=verbose 2>&1 | Select-String -Pattern "reportProblem|pageNav|Translation" -Context 5
```

Look for:
- Import errors (translation JSON files not loading)
- TypeScript errors (wrong import syntax)
- Runtime errors (t() method not found on component)
- Console warnings ("Translation key not found")

**Common Issues**:
1. **JSON syntax error**: Run `node -e "require('./src/i18n/en-CA.json')"` to validate
2. **Import path wrong**: Verify `import enCA from '../i18n/en-CA.json'` path is correct
3. **Webpack/Vite not loading JSON**: Check `vite.config.ts` has JSON plugin
4. **Component not extending EVAElement**: Verify `export class GCPageNavigation extends EVAElement`

## 📝 Execution Rules

- **Execute all 8 steps sequentially**
- **Do not skip steps** (even if you think they're unnecessary)
- **Capture all command outputs** (for debugging if needed)
- **If a step fails, STOP and report the error** (don't proceed to next step)
- **Update AUDIT-REPORT.md only after all tests pass**

**Execute now. Do not ask for permission. Complete all steps in one session.**

---

**Agent**: P07-DVM  
**Goal**: Fix 7 failing i18n tests → Achieve 100% test pass rate (934/934)  
**Time Estimate**: 1 hour  
**Priority**: P0 - CRITICAL (blocks production deployment)
