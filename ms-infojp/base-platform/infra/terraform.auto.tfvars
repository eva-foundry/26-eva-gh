# Auto-loaded tfvars file for msinfojp-marco deployment
# Minimal B1 Basic SKUs for 3GB data, 1-2 users (~$120/month)

# Core Configuration
environmentName          = "msinfojp-marco"
location                 = "canadacentral"
workspace                = "msinfojp-marco"

# Use Existing Azure OpenAI (ao-sandbox in rg-sandbox)
useExistingAOAIService        = true
azureOpenAIResourceGroup      = "rg-sandbox"
azureOpenAIServiceName        = "ao-sandbox"
chatGptDeploymentName         = "gpt-4o"
chatGptModelName              = "gpt-4o"
chatGptModelVersion           = "2024-08-06"
azureOpenAIEmbeddingDeploymentName = "text-embedding-3-small"
embeddingModelName            = "text-embedding-3-small"
embeddingModelVersion         = "1"

# Minimal SKUs for Sandbox
appServiceSkuSize             = "B1"
appServiceSkuTier             = "Basic"
enrichmentAppServiceSkuSize   = "B1"
enrichmentAppServiceSkuTier   = "Basic"
functionsAppSkuSize           = "B1"
functionsAppSkuTier           = "Basic"
searchServicesSkuName         = "basic"

# Security
kv_secret_expiration          = 63072000  # 730 days in seconds
requireWebsiteSecurityMembership = false

# Features (MVP Configuration)
enableWebChat                 = false
enableBingSafeSearch          = true
enableUngroundedChat          = true
enableMathAssistant           = false
enableTabularDataAssistant    = false
enableMultimedia              = false
enableSharepointConnector     = false
enableCustomerUsageAttribution = false

# Application Settings
applicationTitle              = "MS-InfoJP: Jurisprudence Assistant"
chatWarningBannerText         = ""
defaultLanguage               = "en-US"
enableDevCode                 = true
maxCsvFileSize                = 20

# Network (not used in non-secure mode)
enableDdosProtectionPlan      = false

# Azure Environment Configuration (from AzureCloud.env)
azure_environment                       = "AzureCloud"
arm_template_schema_mgmt_api            = "https://schema.management.azure.com"
azure_portal_domain                     = "https://portal.azure.com"
azure_search_domain                     = "search.windows.net"
azure_search_scope                      = "https://search.azure.com"
use_semantic_reranker                   = true
azure_storage_domain                    = "core.windows.net"
azure_openai_domain                     = "openai.azure.com"
azure_openai_authority_host             = "AzureCloud"
azure_sts_issuer_domain                 = "sts.windows.net"
azure_websites_domain                   = "azurewebsites.net"
azure_access_token_domain               = "login.microsoftonline.com"
azure_arm_management_api                = "https://management.azure.com"
azure_keyvault_domain                   = "vaultcore.azure.net"
cosmosdb_domain                         = "documents.azure.com"
azure_monitor_domain                    = "monitor.azure.com"
azure_monitor_oms_domain                = "oms.opinsights.azure.com"
azure_monitor_ods_domain                = "ods.opinsights.azure.com"
azure_automation_domain                 = "azure-automation.net"
azure_ai_document_intelligence_domain   = "cognitiveservices.azure.com"
azure_bing_search_domain                = "api.bing.microsoft.com"
azure_ai_private_link_domain            = "cognitiveservices.azure.com"
azure_acr_domain                        = "azurecr.io"
