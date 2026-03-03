import { describe, it, expect, vi } from "vitest";

import { resolveSecret } from "../config/index.js";

// Provide virtual mocks so the optional Azure SDKs don't need to be installed
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - vitest 2.1 supports virtual mocks but types not yet updated
vi.mock(
  "@azure/identity",
  () => {
    return { DefaultAzureCredential: class {} };
  },
  { virtual: true },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - vitest 2.1 supports virtual mocks but types not yet updated
vi.mock(
  "@azure/keyvault-secrets",
  () => {
    class SecretClient {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      constructor(_uri: string, _cred: any) {}
      async getSecret(name: string) {
        return { value: `val-${name}` };
      }
    }
    return { SecretClient };
  },
  { virtual: true },
);

describe("config key vault resolver", () => {
  it("returns secret value when Key Vault is configured", async () => {
    const v = await resolveSecret("MY_SECRET", "https://example.vault.azure.net/");
    expect(v).toBe("val-MY_SECRET");
  });

  it("returns undefined if Key Vault throws", async () => {
    // Remock to throw from getSecret
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - vitest 2.1 supports virtual mocks but types not yet updated
    vi.doMock(
      "@azure/keyvault-secrets",
      () => {
        class SecretClient {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          constructor(_uri: string, _cred: any) {}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          async getSecret(_name: string) {
            throw new Error("kv-failure");
          }
        }
        return { SecretClient };
      },
      { virtual: true },
    );

    // Need to re-import the function to pick up new mock
    const { resolveSecret: resolveSecret2 } = await import("../config/index.js");
    const v = await resolveSecret2("ANY", "https://example.vault.azure.net/");
    expect(v).toBeUndefined();
  });
});
