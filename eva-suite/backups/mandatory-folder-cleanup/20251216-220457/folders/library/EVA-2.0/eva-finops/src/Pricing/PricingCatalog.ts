import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PricingEntry } from './PricingEntry.js';

/**
 * Manages the EVA FinOps pricing catalog, providing access to Azure service
 * pricing data used for cost attribution and estimation.
 * 
 * The catalog loads pricing data from `eva-finops-pricing-v0.1.json` once per
 * process and caches it in memory. Use `Reload()` to force a refresh.
 * 
 * @example
 * ```typescript
 * const catalog = new PricingCatalog();
 * 
 * // Get all entries
 * const allPrices = catalog.getAll();
 * 
 * // Lookup by key
 * const entry = catalog.tryGetByKey("aoai_gpt4_1_input");
 * 
 * // Get just the price
 * const price = catalog.tryGetPrice("aoai_gpt4o_mini_output"); // 0.60
 * ```
 */
export class PricingCatalog {
  private entries: Map<string, PricingEntry> | null = null;
  private readonly pricingFilePath: string;

  /**
   * Creates a new PricingCatalog instance.
   * 
   * @param configPath Optional path to the pricing JSON file. 
   *                   Defaults to `../../config/eva-finops-pricing-v0.1.json`
   */
  constructor(configPath?: string) {
    if (configPath) {
      this.pricingFilePath = resolve(configPath);
    } else {
      // Default: resolve relative to this source file
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      this.pricingFilePath = resolve(__dirname, '../../config/eva-finops-pricing-v0.1.json');
    }
  }

  /**
   * Loads pricing data from the JSON file if not already loaded.
   * Caches the results in memory for subsequent calls.
   * 
   * @throws Error if the pricing file cannot be read or parsed
   */
  private ensureLoaded(): void {
    if (this.entries !== null) {
      return;
    }

    try {
      const rawData = readFileSync(this.pricingFilePath, 'utf-8');
      const jsonData = JSON.parse(rawData) as Array<{
        EVA_Key: string;
        Category: string;
        Service: string;
        SkuOrModel: string;
        MeterType: string;
        Unit: string;
        Price_USD: number;
        Notes: string;
      }>;

      this.entries = new Map();

      for (const item of jsonData) {
        const entry: PricingEntry = {
          evaKey: item.EVA_Key,
          category: item.Category,
          service: item.Service,
          skuOrModel: item.SkuOrModel,
          meterType: item.MeterType,
          unit: item.Unit,
          priceUsd: item.Price_USD,
          notes: item.Notes || undefined
        };
        this.entries.set(entry.evaKey, entry);
      }
    } catch (error) {
      throw new Error(
        `Failed to load EVA FinOps pricing catalog from ${this.pricingFilePath}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Returns all pricing entries in the catalog.
   * 
   * @returns Read-only array of all pricing entries
   */
  getAll(): ReadonlyArray<PricingEntry> {
    this.ensureLoaded();
    return Array.from(this.entries!.values());
  }

  /**
   * Looks up a pricing entry by its EVA key.
   * 
   * @param evaKey The unique identifier for the pricing entry (e.g., "aoai_gpt4_1_input")
   * @returns The matching PricingEntry, or undefined if not found
   * 
   * @example
   * ```typescript
   * const entry = catalog.tryGetByKey("aoai_gpt4o_mini_input");
   * if (entry) {
   *   console.log(`${entry.service}: $${entry.priceUsd} ${entry.unit}`);
   * }
   * ```
   */
  tryGetByKey(evaKey: string): PricingEntry | undefined {
    this.ensureLoaded();
    return this.entries!.get(evaKey);
  }

  /**
   * Looks up the price (in USD) for a given EVA key.
   * 
   * @param evaKey The unique identifier for the pricing entry
   * @returns The price in USD, or undefined if not found
   * 
   * @example
   * ```typescript
   * const price = catalog.tryGetPrice("storage_blob_hot");
   * if (price !== undefined) {
   *   console.log(`Price: $${price} per GB-month`);
   * }
   * ```
   */
  tryGetPrice(evaKey: string): number | undefined {
    const entry = this.tryGetByKey(evaKey);
    return entry?.priceUsd;
  }

  /**
   * Forces a reload of the pricing data from the JSON file.
   * Clears the in-memory cache and re-reads the file on the next access.
   * 
   * Use this when the pricing file has been updated and you need to pick up changes
   * without restarting the process.
   */
  reload(): void {
    this.entries = null;
  }

  /**
   * Returns the number of pricing entries currently loaded.
   * 
   * @returns Count of entries in the catalog, or 0 if not yet loaded
   */
  get count(): number {
    if (this.entries === null) {
      return 0;
    }
    return this.entries.size;
  }
}
