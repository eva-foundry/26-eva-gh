import "dotenv/config";
import { z } from "zod";

export const ConfigSchema = z.object({
  env: z.string().default(process.env.NODE_ENV || "development"),
  region: z.string().default(process.env.EVA_REGION || "eastus"),
  keyVaultUri: z.string().url().optional(),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(overrides?: Partial<Config>): Config {
  const cfg = ConfigSchema.parse({
    env: process.env.NODE_ENV,
    region: process.env.EVA_REGION,
    keyVaultUri: process.env.KEYVAULT_URI,
    ...overrides,
  });
  return cfg;
}

export type SecretResolver = (name: string) => Promise<string | undefined>;

/**
 * Resolve a secret by name. If KEYVAULT_URI is provided and azure SDKs are available, it attempts Key Vault.
 * This function dynamically imports Azure SDKs so they can remain optional.
 */
export async function resolveSecret(name: string, keyVaultUri = process.env.KEYVAULT_URI): Promise<string | undefined> {
  if (!keyVaultUri) return undefined;

  try {
    // Dynamic imports to keep Azure libs optional
    const { DefaultAzureCredential } = await import("@azure/identity");
    const { SecretClient } = await import("@azure/keyvault-secrets");
    const client = new SecretClient(keyVaultUri, new DefaultAzureCredential());
    const resp = await client.getSecret(name);
    return resp.value;
  } catch {
    // Swallow and return undefined to allow fallback
    return undefined;
  }
}
