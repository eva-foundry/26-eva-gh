export type GovernancePolicies = {
    maxTenantConcurrent?: number;
    maxDocs?: number;
    maxDocBytes?: number;
    chunkCountCap?: number;
    embeddingCostBudgetUSD?: number;
    denyResourceTags?: string[];
    allowResourceTags?: string[];
    abortBlockedRatioAbove?: number;
};

export const defaultPolicies: GovernancePolicies = {};
