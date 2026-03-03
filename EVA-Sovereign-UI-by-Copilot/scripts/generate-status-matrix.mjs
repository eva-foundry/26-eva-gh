#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inventoryPath = path.join(root, 'COMPONENT-INVENTORY.json');
const testsDir = path.join(root, 'tests');
const outputPath = path.join(root, 'COMPLETION-STATUS.md');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function findTestsForComponent(componentName) {
  const matches = [];
  if (!fs.existsSync(testsDir)) return matches;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (stat.isFile() && /\.(test|spec)\.[jt]s$/.test(entry)) {
        const rel = path.relative(root, full).replace(/\\/g, '/');
        if (rel.toLowerCase().includes(componentName.toLowerCase())) {
          matches.push(rel);
        }
      }
    }
  };
  walk(testsDir);
  return matches;
}

function badge(ok) {
  return ok ? '✅' : '❌';
}

function row(c) {
  const tests = findTestsForComponent(c.name);
  const hasA11y = c.accessibility?.wcag?.includes('2.2') || c.accessibility?.wcag?.includes('AA');
  const hasKeyboard = c.features?.includes('keyboard') || c.a11y?.keyboard;
  const hasI18n = c.features?.includes('i18n') || c.i18n === true;
  const hasDocs = c.docs?.length > 0 || c.documentation === true;
  const hasPerf = c.performance === 'benchmarked';
  const hasSizeGuard = c.sizeGuard === true;
  const hasVR = tests.some(t => t.includes('visual-regression'));
  return `| ${c.name} | ${badge(tests.length > 0)} | ${badge(hasA11y)} | ${badge(hasKeyboard)} | ${badge(hasI18n)} | ${badge(hasVR)} | ${badge(hasPerf)} | ${badge(hasSizeGuard)} | ${badge(hasDocs)} |`;
}

function generate() {
  if (!fs.existsSync(inventoryPath)) {
    console.error('COMPONENT-INVENTORY.json not found');
    process.exit(1);
  }
  const inventory = readJSON(inventoryPath);
  const components = Array.isArray(inventory) ? inventory : inventory.components || [];
  const header = `# Completion Status\n\nGenerated: ${new Date().toISOString()}\n\n`;
  const tableHeader = '| Component | Tests | A11y | Keyboard | i18n | Visual | Perf | Size | Docs |\n|---|---|---|---|---|---|---|---|---|';
  const rows = components.map(row).join('\n');
  const doc = header + tableHeader + '\n' + rows + '\n';
  fs.writeFileSync(outputPath, doc, 'utf-8');
  console.log(`Status matrix written to ${path.relative(root, outputPath)}`);
}

generate();
