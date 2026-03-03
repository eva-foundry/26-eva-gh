# Sandbox Minimal Configuration - B1 Basic SKUs for 3GB data, 1-2 users
# Generated: 2026-01-25

# Basic Configuration
location                    = "canadacentral"
environmentName             = "msinfojp-marco"
resourceGroupName           = "infojp-sandbox"

# Use Existing Azure OpenAI
useExistingAOAIService      = true
azureOpenAIResourceGroup    = "rg-sandbox"
azureOpenAIServiceName      = "ao-sandbox"

# Minimal SKUs - B1 Basic Tier (~$120/month total)
appServiceSkuSize           = "B1"
appServiceSkuTier           = "Basic"
enrichmentAppServiceSkuSize = "B1"
enrichmentAppServiceSkuTier = "Basic"
functionsAppSkuSize         = "B1"
functionsAppSkuTier         = "Basic"
searchServicesSkuName       = "basic"

# Security
kv_secret_expiration        = 7776000

# Optional - add any other overrides as needed
