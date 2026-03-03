#!/usr/bin/env node
/**
 * Audit custom elements defined vs documented headings in COMPONENT-API.md.
 * Outputs JSON + human summary.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const srcDir = join(root, 'packages', 'eva-sovereign-ui-wc', 'src');
const apiDoc = join(root, 'COMPONENT-API.md');

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc); else if (entry.endsWith('.ts')) acc.push(full);
  }
  return acc;
}

function extractDefinedElements(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const matches = [...text.matchAll(/customElements\.define\(['"`]([a-z0-9-]+)['"`]/g)].map(m => m[1]);
  return matches;
}

const files = walk(srcDir);
const definedSet = new Set();
const definitions = {};
for (const f of files) {
  const els = extractDefinedElements(f);
  if (els.length) definitions[f] = els;
  for (const el of els) definedSet.add(el);
}

// Parse documented components
const docText = readFileSync(apiDoc, 'utf8');
const documented = [...docText.matchAll(/^###\s+(eva-[a-z0-9-]+)/gm)].map(m => m[1]);
const documentedSet = new Set(documented);

// Diff
const undocumented = [...definedSet].filter(c => !documentedSet.has(c)).sort();
const missingImplementations = [...documentedSet].filter(c => !definedSet.has(c)).sort();

const summary = {
  counts: {
    defined: definedSet.size,
    documented: documentedSet.size,
    undocumentedCount: undocumented.length,
    missingImplementationsCount: missingImplementations.length,
  },
  undocumented,
  missingImplementations,
  files: definitions,
  timestamp: new Date().toISOString()
};

writeFileSync(join(root, 'COMPONENT-INVENTORY.json'), JSON.stringify(summary, null, 2));

// Human readable output
console.log('Component Inventory Audit');
console.log('==========================');
console.log(`Defined custom elements:    ${summary.counts.defined}`);
console.log(`Documented components:      ${summary.counts.documented}`);
console.log(`Undocumented (need docs):   ${summary.undocumented.length}`);
console.log(`Documented but not defined: ${summary.missingImplementations.length}`);
if (undocumented.length) {
  console.log('\nUndocumented Elements:\n- ' + undocumented.join('\n- '));
}
if (missingImplementations.length) {
  console.log('\nMissing Implementations (documented headings without define):\n- ' + missingImplementations.join('\n- '));
}
console.log('\nDetailed file mapping written to COMPONENT-INVENTORY.json');
