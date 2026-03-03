/**
 * EVA APIM client configuration.
 * Secrets should be injected via environment variables when running in CI/CD.
 */
export const apimConfig = {
    baseUrl: import.meta.env.VITE_EVA_APIM_BASE_URL || "https://eva-apim.dev/api",
    apiKey: import.meta.env.VITE_EVA_APIM_KEY,
    env: import.meta.env.VITE_EVA_ENV || "dev",
    costCenter: import.meta.env.VITE_EVA_COST_CENTER || "eva-lab"
};
