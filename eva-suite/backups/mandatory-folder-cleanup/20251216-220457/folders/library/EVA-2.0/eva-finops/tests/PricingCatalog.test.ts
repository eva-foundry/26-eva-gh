import { describe, it, expect, beforeEach } from '@jest/globals';
import { PricingCatalog } from '../src/Pricing/PricingCatalog.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('PricingCatalog', () => {
  let catalog: PricingCatalog;

  beforeEach(() => {
    // Use the actual pricing file from config/
    const configPath = resolve(__dirname, '../config/eva-finops-pricing-v0.1.json');
    catalog = new PricingCatalog(configPath);
  });

  describe('getAll', () => {
    it('should load all pricing entries', () => {
      const entries = catalog.getAll();
      
      expect(entries).toBeDefined();
      expect(entries.length).toBeGreaterThan(0);
      expect(entries.length).toBe(19); // Based on current pricing file
    });

    it('should return entries with all required fields', () => {
      const entries = catalog.getAll();
      const firstEntry = entries[0];

      expect(firstEntry).toHaveProperty('evaKey');
      expect(firstEntry).toHaveProperty('category');
      expect(firstEntry).toHaveProperty('service');
      expect(firstEntry).toHaveProperty('skuOrModel');
      expect(firstEntry).toHaveProperty('meterType');
      expect(firstEntry).toHaveProperty('unit');
      expect(firstEntry).toHaveProperty('priceUsd');
      expect(typeof firstEntry.priceUsd).toBe('number');
    });
  });

  describe('tryGetByKey', () => {
    it('should find known LLM pricing entry', () => {
      const entry = catalog.tryGetByKey('aoai_gpt4_1_input');

      expect(entry).toBeDefined();
      expect(entry?.evaKey).toBe('aoai_gpt4_1_input');
      expect(entry?.category).toBe('LLM');
      expect(entry?.service).toBe('GPT-4.1');
      expect(entry?.meterType).toBe('Input');
      expect(entry?.priceUsd).toBe(5.00);
      expect(entry?.unit).toBe('per 1M tokens');
    });

    it('should find known OCR pricing entry', () => {
      const entry = catalog.tryGetByKey('ai_docint_s0_prebuilt');

      expect(entry).toBeDefined();
      expect(entry?.category).toBe('OCR');
      expect(entry?.service).toBe('Azure AI Document Intelligence');
      expect(entry?.priceUsd).toBe(0.03);
      expect(entry?.unit).toBe('per page');
    });

    it('should find known storage pricing entry', () => {
      const entry = catalog.tryGetByKey('storage_blob_hot');

      expect(entry).toBeDefined();
      expect(entry?.category).toBe('Storage');
      expect(entry?.service).toBe('Azure Blob Storage');
      expect(entry?.priceUsd).toBe(0.0184);
      expect(entry?.unit).toBe('per GB-month');
    });

    it('should return undefined for non-existent key', () => {
      const entry = catalog.tryGetByKey('nonexistent_key');
      expect(entry).toBeUndefined();
    });
  });

  describe('tryGetPrice', () => {
    it('should return correct price for GPT-4.1 input', () => {
      const price = catalog.tryGetPrice('aoai_gpt4_1_input');
      expect(price).toBe(5.00);
    });

    it('should return correct price for GPT-4o-mini output', () => {
      const price = catalog.tryGetPrice('aoai_gpt4o_mini_output');
      expect(price).toBe(0.60);
    });

    it('should return correct price for Azure AI Search S1', () => {
      const price = catalog.tryGetPrice('ai_search_s1');
      expect(price).toBe(0.336);
    });

    it('should return undefined for non-existent key', () => {
      const price = catalog.tryGetPrice('invalid_key');
      expect(price).toBeUndefined();
    });
  });

  describe('reload', () => {
    it('should allow reloading the catalog', () => {
      const firstLoad = catalog.getAll();
      expect(firstLoad.length).toBeGreaterThan(0);

      catalog.reload();
      
      const secondLoad = catalog.getAll();
      expect(secondLoad.length).toBe(firstLoad.length);
    });
  });

  describe('count', () => {
    it('should return 0 before first load', () => {
      const freshCatalog = new PricingCatalog();
      expect(freshCatalog.count).toBe(0);
    });

    it('should return correct count after loading', () => {
      catalog.getAll();
      expect(catalog.count).toBe(19);
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid file path', () => {
      const invalidCatalog = new PricingCatalog('/nonexistent/path/pricing.json');
      
      expect(() => invalidCatalog.getAll()).toThrow('Failed to load EVA FinOps pricing catalog');
    });
  });

  describe('categories', () => {
    it('should have all expected categories', () => {
      const entries = catalog.getAll();
      const categories = new Set(entries.map(e => e.category));

      expect(categories).toContain('LLM');
      expect(categories).toContain('OCR');
      expect(categories).toContain('Search');
      expect(categories).toContain('Cache');
      expect(categories).toContain('Storage');
      expect(categories).toContain('App');
    });
  });
});
