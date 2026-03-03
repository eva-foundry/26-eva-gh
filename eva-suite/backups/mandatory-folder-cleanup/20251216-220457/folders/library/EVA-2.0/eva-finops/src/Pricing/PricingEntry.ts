/**
 * Represents a single pricing entry from the EVA FinOps pricing catalog.
 * 
 * Each entry defines the cost for a specific Azure service, SKU, or model
 * used by EVA Suite components. Pricing data is used for cost attribution,
 * estimation, and FinOps dashboards.
 * 
 * @example
 * ```typescript
 * const entry: PricingEntry = {
 *   evaKey: "aoai_gpt4_1_input",
 *   category: "LLM",
 *   service: "GPT-4.1",
 *   skuOrModel: "Standard",
 *   meterType: "Input",
 *   unit: "per 1M tokens",
 *   priceUsd: 5.00,
 *   notes: ""
 * };
 * ```
 */
export interface PricingEntry {
  /**
   * Unique identifier for this pricing entry (e.g., "aoai_gpt4_1_input").
   * Used as the lookup key in the pricing catalog.
   */
  evaKey: string;

  /**
   * Service category (e.g., "LLM", "OCR", "Search", "Cache", "Storage", "App").
   */
  category: string;

  /**
   * Azure service name (e.g., "GPT-4.1", "Azure AI Search", "Azure Blob Storage").
   */
  service: string;

  /**
   * SKU or model variant (e.g., "Standard", "S1", "Hot").
   */
  skuOrModel: string;

  /**
   * Meter type for billing classification (e.g., "Input", "Output", "Compute", "Tier").
   */
  meterType: string;

  /**
   * Pricing unit (e.g., "per 1M tokens", "per hour", "per GB-month", "per page").
   */
  unit: string;

  /**
   * Price in USD for the specified unit.
   */
  priceUsd: number;

  /**
   * Optional notes or additional context about this pricing entry.
   */
  notes?: string;
}
