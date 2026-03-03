#!/usr/bin/env bash
#
# EVA Suite – Workspace Bootstrap Script
#
# Purpose:
#   Help you quickly validate and prepare a local EVA Suite workspace on a new machine
#   or environment. Non-destructive: it reports issues and suggests next steps.
#
# Expected layout:
#   eva-suite/
#     eva-foundation/
#     eva-orchestrator/
#     eva-da-2/
#     eva-ops/
#     eva-meta/
#
# Usage:
#   From the eva-suite root folder:
#     ./scripts/bootstrap-eva-workspace.sh
#

set -euo pipefail

ROOT_DIR="$(pwd)"

echo "🔧 EVA Suite Workspace Bootstrap"
echo "Root directory: ${ROOT_DIR}"
echo ""

# --- Helper functions ---

check_cmd() {
  local cmd="$1"
  if command -v "$cmd" >/dev/null 2>&1; then
    echo "✅ Found: $cmd ($(command -v "$cmd"))"
  else
    echo "⚠️  Missing: $cmd"
  fi
}

check_dir() {
  local dir="$1"
  if [ -d "$dir" ]; then
    echo "✅ Directory present: $dir"
  else
    echo "⚠️  Directory missing: $dir"
  fi
}

# --- 1. Check core tools ---

echo "1) Checking required tools..."
check_cmd git
check_cmd node
check_cmd npm
check_cmd python || true
check_cmd code || true
echo ""

# --- 2. Check expected repo structure ---

echo "2) Checking expected EVA Suite folder structure..."
check_dir "eva-foundation"
check_dir "eva-orchestrator"
check_dir "eva-da-2"
check_dir "eva-ops"
check_dir "eva-meta"
echo ""

cat <<'EOF'
If any directories are missing, you likely need to clone them, for example:

  git clone <your-origin-url>/eva-foundation.git
  git clone <your-origin-url>/eva-orchestrator.git
  git clone <your-origin-url>/eva-da-2.git
  git clone <your-origin-url>/eva-ops.git
  git clone <your-origin-url>/eva-meta.git

EOF

# --- 3. Ensure .vscode folder & basic settings exist ---

echo "3) Ensuring .vscode/settings.json exists..."

VS_CODE_DIR=".vscode"
SETTINGS_FILE="${VS_CODE_DIR}/settings.json"

if [ ! -d "$VS_CODE_DIR" ]; then
  echo "ℹ️  Creating .vscode directory..."
  mkdir -p "$VS_CODE_DIR"
fi

if [ ! -f "$SETTINGS_FILE" ]; then
  echo "ℹ️  Creating basic VS Code settings at ${SETTINGS_FILE}..."
  cat > "$SETTINGS_FILE" <<'JSON'
{
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/dist": true
  },
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "git.enableSmartCommit": true,
  "github.copilot.enable": {
    "*": true
  }
}
JSON
else
  echo "✅ Found existing VS Code settings at ${SETTINGS_FILE} (left unchanged)."
fi

echo ""

# --- 4. Ensure EVA Copilot context file exists ---

EVA_CONTEXT_FILE="${VS_CODE_DIR}/eva-copilot-context.md"

if [ ! -f "$EVA_CONTEXT_FILE" ]; then
  echo "ℹ️  Creating EVA Copilot context file at ${EVA_CONTEXT_FILE}..."
  cat > "$EVA_CONTEXT_FILE" <<'MD'
# EVA Suite – Copilot Context

You are working on EVA Suite, a portfolio of ~24 products, including:
- EVA Foundation 2.0 (platform)
- EVA Orchestrator (execution policy and routing)
- EVA DA 2.0 (Information Assistant UI product)
- EVA Suite LiveOps dashboards (formerly EVA Matrix)
- EVA Meta (docs, patterns, runbooks)
- …and additional EVA Suite accelerators and solutions.

Use the “EVA Suite – Copilot Command Library” (copilot-commands.md) for concrete commands per repo.
MD
else
  echo "✅ EVA Copilot context file already exists at ${EVA_CONTEXT_FILE} (left unchanged)."
fi

echo ""

# --- 5. Print the standard Copilot system prompt ---

echo "5) Standard EVA Suite Copilot system prompt (copy/paste into Copilot Chat):"
cat <<'PROMPT'

You are part of the EVA AI Dev Crew, working on the EVA Suite – a reusable, enterprise-grade AI platform made up of many products (around 24), including EVA Foundation 2.0, EVA Orchestrator, EVA DA 2.0, EVA Suite LiveOps dashboards, and EVA Meta.

General rules:
- Always respect the existing repo structure and coding standards.
- Prefer small, incremental changes with clear diffs.
- Assume everything will be deployed via CI/CD – no manual steps unless clearly called out.
- Maximize reuse and modularity; avoid copy-paste.
- Write code that is readable and well-commented; add docstrings where helpful.
- Suggest tests for any non-trivial logic you introduce.
- When you propose changes, summarize them as a step-by-step plan before generating code.
- If something is ambiguous, make a reasonable assumption and clearly state it.

Specific to EVA:
- Honor the EVA header model: x-eva-project, x-eva-app, x-eva-feature, x-eva-env, x-eva-user (or the current canonical set).
- Make it easy to see how cost attribution and telemetry can be wired.
- Keep governance and guardrails extensible (don’t hard-code client-specific policies).

Repo-specific focus:
- In `eva-foundation`: infra as code, APIM configs, shared services.
- In `eva-orchestrator`: execution policies, routing, guardrails, telemetry.
- In `eva-da-2`: UI, accessibility (WCAG), i18n, API client, feedback UI.
- In `eva-ops`: dashboards, monitoring definitions, LiveOps docs.
- In `eva-meta`: documentation, patterns, architectural notes, dev crew runbooks.

Always help maintain a clean, enterprise-grade EVA Suite codebase.

PROMPT

echo ""
echo "✅ EVA Suite workspace bootstrap completed (non-destructive)."
echo "   Next: open this folder in VS Code (code .) and load your eva-suite.code-workspace."
