/**
 * Simple validation script for EVA FinOps Pricing Catalog
 * 
 * Run with: node --loader ts-node/esm validate-catalog.ts
 * Or after build: node dist/validate-catalog.js
 */

import { PricingCatalog } from './src/Pricing/PricingCatalog.js';

console.log('🔍 EVA FinOps Pricing Catalog Validation\n');

const catalog = new PricingCatalog();

// Test 1: Load all entries
console.log('Test 1: Loading all pricing entries...');
const allEntries = catalog.getAll();
console.log(`✅ Loaded ${allEntries.length} entries`);
console.log(`   Expected: 19 entries`);
if (allEntries.length !== 19) {
  console.error('❌ FAIL: Entry count mismatch');
  process.exit(1);
}

// Test 2: Verify known keys exist
console.log('\nTest 2: Verifying known pricing keys...');
const knownKeys = [
  'aoai_gpt4_1_input',
  'aoai_gpt4o_mini_output',
  'ai_docint_s0_prebuilt',
  'storage_blob_hot',
  'ai_search_s1'
];

for (const key of knownKeys) {
  const entry = catalog.tryGetByKey(key);
  if (!entry) {
    console.error(`❌ FAIL: Key "${key}" not found`);
    process.exit(1);
  }
  console.log(`✅ Found ${key}: $${entry.priceUsd} ${entry.unit}`);
}

// Test 3: Verify specific prices
console.log('\nTest 3: Verifying specific prices...');
const priceTests = [
  { key: 'aoai_gpt4_1_input', expected: 5.00 },
  { key: 'aoai_gpt4_1_output', expected: 15.00 },
  { key: 'aoai_gpt4o_mini_input', expected: 0.15 },
  { key: 'aoai_gpt4o_mini_output', expected: 0.60 },
  { key: 'ai_docint_s0_prebuilt', expected: 0.03 },
  { key: 'ai_search_s1', expected: 0.336 },
  { key: 'storage_blob_hot', expected: 0.0184 }
];

for (const test of priceTests) {
  const price = catalog.tryGetPrice(test.key);
  if (price !== test.expected) {
    console.error(`❌ FAIL: ${test.key} price mismatch. Expected: ${test.expected}, Got: ${price}`);
    process.exit(1);
  }
  console.log(`✅ ${test.key}: $${price}`);
}

// Test 4: Verify categories
console.log('\nTest 4: Verifying categories...');
const categories = new Set(allEntries.map(e => e.category));
const expectedCategories = ['LLM', 'OCR', 'Search', 'Cache', 'Storage', 'App'];

for (const cat of expectedCategories) {
  if (!categories.has(cat)) {
    console.error(`❌ FAIL: Category "${cat}" not found`);
    process.exit(1);
  }
  console.log(`✅ Category: ${cat}`);
}

// Test 5: Cost calculation example
console.log('\nTest 5: Cost calculation example...');
const inputTokens = 2_500_000;
const outputTokens = 500_000;
const inputPrice = catalog.tryGetPrice('aoai_gpt4_1_input')!;
const outputPrice = catalog.tryGetPrice('aoai_gpt4_1_output')!;
const totalCost = (inputTokens / 1_000_000) * inputPrice + (outputTokens / 1_000_000) * outputPrice;
console.log(`   2.5M input tokens @ $${inputPrice}/1M = $${(inputTokens / 1_000_000) * inputPrice}`);
console.log(`   500K output tokens @ $${outputPrice}/1M = $${(outputTokens / 1_000_000) * outputPrice}`);
console.log(`✅ Total cost: $${totalCost.toFixed(2)}`);
if (totalCost !== 20.00) {
  console.error(`❌ FAIL: Cost calculation incorrect`);
  process.exit(1);
}

// Test 6: Reload functionality
console.log('\nTest 6: Testing reload functionality...');
const countBefore = catalog.count;
catalog.reload();
const countAfter = catalog.getAll().length;
if (countBefore !== countAfter) {
  console.error(`❌ FAIL: Count mismatch after reload`);
  process.exit(1);
}
console.log(`✅ Reload successful: ${countAfter} entries`);

console.log('\n🎉 All validation tests passed!');
console.log(`\n📊 Summary:`);
console.log(`   Total entries: ${allEntries.length}`);
console.log(`   Categories: ${Array.from(categories).join(', ')}`);
console.log(`   In-memory cache: ${catalog.count} entries`);
