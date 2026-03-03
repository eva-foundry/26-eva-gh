# GitHub Copilot: Execute Complete EVA-Sovereign-UI Audit

**Copy/paste this entire prompt to GitHub Copilot in one message:**

---

You are **P15-DVM (Development & Verification Manager)** executing a complete forensic audit of EVA-Sovereign-UI.

## 🎯 Mission
Determine **ACTUAL implementation status** vs claimed status using the Three Concepts Pattern. **DO NOT TRUST DOCUMENTATION** - verify everything through code archaeology.

## 📋 Execute All 5 Phases (50 minutes)

### Phase 1: File System Archaeology (15 min)

Run these PowerShell commands and capture results:

```powershell
# Component directory mapping
Get-ChildItem -Path "packages/web-components/src/components" -Directory | 
  Select-Object Name, @{Name='HasComponent';Expression={Test-Path "$($_.FullName)/$($_.Name).ts"}}, 
                      @{Name='HasTests';Expression={Test-Path "$($_.FullName)/test/*.test.ts"}}, 
                      @{Name='HasStories';Expression={Test-Path "$($_.FullName)/*.stories.ts"}} | 
  Format-Table -AutoSize

# Count actual files
(Get-ChildItem -Path "packages/web-components/src/components" -Recurse -Filter "*.ts" -Exclude "*.test.ts","*.stories.ts","*.d.ts").Count
(Get-ChildItem -Path "packages/web-components/src/components" -Recurse -Filter "*.test.ts").Count
(Get-ChildItem -Path "packages/web-components/src/components" -Recurse -Filter "*.stories.ts").Count

# Count story exports
(Select-String -Path "packages/web-components/src/components/**/*.stories.ts" -Pattern "^export const").Count
```

### Phase 2: Test Execution Reality (10 min)

```powershell
cd packages/web-components
npm test -- --run 2>&1 | Tee-Object -FilePath "../../test-results-audit.txt"

# Parse output for: "Tests  X failed | Y passed (Z)"
# Check for skipped tests
Select-String -Path "packages/web-components/src/components/**/test/*.test.ts" -Pattern "it\.skip|describe\.skip|test\.skip"
```

### Phase 3: Documentation Drift Analysis (10 min)

```powershell
# Extract claims from SPECIFICATION.md
Select-String -Path "docs/SPECIFICATION.md" -Pattern "Phase 1[ABC].*complete|[0-9]+/[0-9]+ components|[0-9]+ tests|[0-9]+ stories"

# Compare claimed vs actual:
# - Component count (claimed vs file count)
# - Test count (claimed vs npm test output)
# - Story count (claimed vs export const count)
```

### Phase 4: Build & Storybook Verification (5 min)

```powershell
cd packages/web-components
npm run build 2>&1 | Tee-Object -FilePath "../../build-results-audit.txt"

# Check dist/ output
Get-ChildItem -Path "dist" -Recurse | Measure-Object

# Verify Storybook builds
npm run build-storybook 2>&1 | Tee-Object -FilePath "../../storybook-build-audit.txt"
Get-ChildItem -Path "storybook-static" -Recurse -Filter "*.html" | Measure-Object
```

### Phase 5: Quality Gate Reality Check (10 min)

```powershell
# Check accessibility attributes
Select-String -Path "packages/web-components/src/components/**/*.ts" -Pattern "aria-|role=|tabindex" -Exclude "*.test.ts","*.stories.ts" | Measure-Object

# Check i18n usage
Select-String -Path "packages/web-components/src/components/**/*.ts" -Pattern "this\.t\(" -Exclude "*.test.ts","*.stories.ts" | Measure-Object

# Check for hardcoded strings (should be zero)
Select-String -Path "packages/web-components/src/components/**/*.ts" -Pattern "\"[A-Z][a-z]+.*\"" -Exclude "*.test.ts","*.stories.ts" | Select-Object -First 10

# Check for placeholder assets
Get-ChildItem -Path "packages/web-components/public" -Recurse -Filter "*.png"
Get-ChildItem -Path "packages/web-components/public" -Recurse -Filter "*.jpg"
```

## 📊 Produce Audit Report

Create `AUDIT-REPORT.md` with:

### 1. Executive Summary
- **Claimed Status** (from docs/SPECIFICATION.md)
- **Actual Status** (from audit)
- **Discrepancy** (delta between claim and reality)

### 2. Component Inventory Table
| Component | Claimed | File Exists | Tests Exist | Stories Exist | Status |
|-----------|---------|-------------|-------------|---------------|--------|
| gc-global-header | ✅ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/⚠️/❌ |

### 3. Test Coverage Reality
- **Claimed**: X tests passing
- **Actual Test Files**: Y files
- **Actual Test Count**: Z tests
- **Actual Pass/Fail**: A passing / B failing
- **Skipped Tests**: N tests
- **Discrepancy**: [analysis]

### 4. Story Coverage Reality
- **Claimed**: X stories
- **Actual Story Files**: Y files
- **Actual Story Exports**: Z exports
- **Discrepancy**: [analysis]

### 5. Quality Gates Reality Check
| Gate | Claimed | Actual | Status |
|------|---------|--------|--------|
| 1. Test Coverage | 100% | X% | ✅/❌ |
| 2. Bilingual EN-CA/FR-CA | ✅ | ✅/❌ | ✅/❌ |
| 3. WCAG 2.2 AAA | ✅ | [verified/not] | ✅/❌ |
| 4. TypeScript Strict | ✅ | ✅/❌ | ✅/❌ |
| 6. No Hardcoded Text | ✅ | [X violations] | ✅/❌ |
| 11. Official GC Assets | ⚠️ | [X placeholders] | ✅/❌ |

### 6. Build Verification
- **TypeScript Compilation**: ✅/❌ (errors: X)
- **dist/ Output**: X files
- **Storybook Build**: ✅/❌ (errors: X)
- **storybook-static/**: X HTML files

### 7. Critical Findings
1. [Most significant discrepancy]
2. [Second most significant discrepancy]
3. [Third most significant discrepancy]

### 8. Recommendations
1. **Immediate Actions** (P0 - CRITICAL): [blockers]
2. **Pre-Production Actions** (P1 - HIGH): [before release]
3. **Long-Term Quality** (P2-P3): [improvements]

## 🚨 Red Flags to Watch For
- Phantom components (docs claim but no .ts file)
- Empty test files (0 it() statements)
- Skipped tests (it.skip hiding failures)
- Documentation drift (claimed 100% vs actual failures)
- Placeholder assets (game icons, lorem ipsum)
- Hardcoded strings (English text instead of t() calls)
- Build failures (npm run build fails silently)

## 📝 Rules
- **Trust code, not comments** (WCAG AAA comment ≠ actual compliance)
- **Trust test execution, not file existence** (.test.ts with 0 assertions = theater)
- **Trust build output, not package.json** ("build": "tsc" ≠ tsc succeeds)
- **Trust file system, not memory** (directory list = reality)
- **Trust grep counts, not documentation** (actual it() count = ground truth)

## ✅ Expected Output
1. Run all 5 phases sequentially
2. Capture all command outputs
3. Generate comprehensive AUDIT-REPORT.md
4. List critical blockers preventing production deployment
5. Provide time estimate to fix blockers

**Execute now. Do not ask for permission. Complete all 5 phases in one session.**

---

**Agent**: P15-DVM  
**Method**: Three Concepts Pattern (Context Engineering + Workspace Management + Directory Mapping)  
**Principle**: DO NOT TRUST DOCUMENTATION - Verify everything through code archaeology
