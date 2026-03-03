import { Router, Request, Response } from 'express';
import { PricingCatalog } from '../Pricing/PricingCatalog.js';

/**
 * EVA FinOps API router providing access to pricing catalog data.
 * 
 * Endpoints:
 * - GET /api/finops/pricing - Returns all pricing entries
 * - GET /api/finops/pricing/:evaKey - Returns specific pricing entry by key
 * 
 * @param catalog The PricingCatalog instance (injected via DI)
 */
export function createFinOpsRouter(catalog: PricingCatalog): Router {
  const router = Router();

  /**
   * GET /api/finops/pricing
   * 
   * Returns all pricing entries in the catalog.
   * 
   * @example
   * ```bash
   * curl http://localhost:3000/api/finops/pricing
   * ```
   * 
   * Response: 200 OK
   * ```json
   * [
   *   {
   *     "evaKey": "aoai_gpt4_1_input",
   *     "category": "LLM",
   *     "service": "GPT-4.1",
   *     "priceUsd": 5.00,
   *     ...
   *   }
   * ]
   * ```
   */
  router.get('/pricing', (_req: Request, res: Response) => {
    try {
      const entries = catalog.getAll();
      res.json(entries);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to load pricing catalog',
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  /**
   * GET /api/finops/pricing/:evaKey
   * 
   * Returns a specific pricing entry by its EVA key.
   * 
   * @param evaKey The unique identifier for the pricing entry
   * 
   * @example
   * ```bash
   * curl http://localhost:3000/api/finops/pricing/aoai_gpt4_1_input
   * ```
   * 
   * Response: 200 OK
   * ```json
   * {
   *   "evaKey": "aoai_gpt4_1_input",
   *   "category": "LLM",
   *   "service": "GPT-4.1",
   *   "skuOrModel": "Standard",
   *   "meterType": "Input",
   *   "unit": "per 1M tokens",
   *   "priceUsd": 5.00,
   *   "notes": ""
   * }
   * ```
   * 
   * Response: 404 Not Found
   * ```json
   * {
   *   "error": "Pricing entry not found",
   *   "evaKey": "invalid_key"
   * }
   * ```
   */
  router.get('/pricing/:evaKey', (req: Request, res: Response) => {
    try {
      const { evaKey } = req.params;
      const entry = catalog.tryGetByKey(evaKey);

      if (!entry) {
        res.status(404).json({
          error: 'Pricing entry not found',
          evaKey
        });
        return;
      }

      res.json(entry);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to retrieve pricing entry',
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return router;
}
