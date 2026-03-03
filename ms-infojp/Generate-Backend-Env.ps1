# Generate-Backend-Env.ps1
# Pure PowerShell version (no bash dependency)

$ErrorActionPreference = "Continue"
Write-Host "Generating backend.env from Azure..." -ForegroundColor Cyan

$RG = "infojp-sandbox"
$OPENAI_RG = "rg-sandbox"
$BACKEND_ENV = "base-platform/app/backend/backend.env"

# Query Azure
Write-Host "Querying Azure resources..." -ForegroundColor Yellow
$OPENAI_ENDPOINT = az cognitiveservices account show --name ao-sandbox --resource-group $OPENAI_RG --query "properties.endpoint" -o tsv 2>$null
$SEARCH_ENDPOINT = az search service show --name infojp-srch --resource-group $RG --query "endpoint" -o tsv 2>$null
if ([string]::IsNullOrEmpty($SEARCH_ENDPOINT)) { $SEARCH_ENDPOINT = "https://infojp-srch.search.windows.net/" }
$COSMOS_ENDPOINT = az cosmosdb show --name infojp-cosmos --resource-group $RG --query "documentEndpoint" -o tsv 2>$null
$AI_ENDPOINT = az cognitiveservices account show --name infojp-ai-svc --resource-group $RG --query "properties.endpoint" -o tsv 2>$null
$DOCINT_ENDPOINT = az cognitiveservices account show --name infojp-doc-intel --resource-group $RG --query "properties.endpoint" -o tsv 2>$null
$STORAGE_ENDPOINT = "https://infojpst01.blob.core.windows.net/"

Write-Host "[INFO] OpenAI Endpoint: $OPENAI_ENDPOINT" -ForegroundColor Gray
Write-Host "[INFO] Search Endpoint: $SEARCH_ENDPOINT" -ForegroundColor Gray
Write-Host "[INFO] Cosmos Endpoint: $COSMOS_ENDPOINT" -ForegroundColor Gray

# Create backend.env
$envContent = @"
# Azure Storage
AZURE_BLOB_STORAGE_ACCOUNT=infojpst01
AZURE_BLOB_STORAGE_ENDPOINT=$STORAGE_ENDPOINT
AZURE_QUEUE_STORAGE_ENDPOINT=https://infojpst01.queue.core.windows.net/

# Azure Search
AZURE_SEARCH_SERVICE=infojp-srch
AZURE_SEARCH_SERVICE_ENDPOINT=$SEARCH_ENDPOINT
AZURE_SEARCH_INDEX=index-jurisprudence
AZURE_SEARCH_AUDIENCE=https://search.azure.com

# Azure OpenAI
AZURE_OPENAI_SERVICE=ao-sandbox
AZURE_OPENAI_ENDPOINT=$OPENAI_ENDPOINT
AZURE_OPENAI_RESOURCE_GROUP=$RG
AZURE_OPENAI_CHATGPT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_CHATGPT_MODEL_NAME=gpt-4o
AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT=text-embedding-3-small
AZURE_OPENAI_EMBEDDINGS_MODEL_NAME=text-embedding-3-small
USE_AZURE_OPENAI_EMBEDDINGS=true
AZURE_OPENAI_AUTHORITY_HOST=AzureCloud

# Cosmos DB
COSMOSDB_URL=$COSMOS_ENDPOINT
COSMOSDB_LOG_DATABASE_NAME=statusdb
COSMOSDB_LOG_CONTAINER_NAME=statuscontainer

# Azure AI Services
AZURE_AI_ENDPOINT=$AI_ENDPOINT
AZURE_AI_CREDENTIAL_DOMAIN=cognitiveservices.azure.com

# Document Intelligence
AZURE_FORM_RECOGNIZER_ENDPOINT=$DOCINT_ENDPOINT

# General
AZURE_SUBSCRIPTION_ID=c59ee575-eb2a-4b51-a865-4b618f9add0a
RESOURCE_GROUP_NAME=$RG
AZURE_ARM_MANAGEMENT_API=https://management.azure.com

# App Settings
MODEL_NAME=gpt-4o
EMBEDDING_DEPLOYMENT_NAME=text-embedding-3-small
OPENAI_DEPLOYMENT_NAME=gpt-4o
APP_LOGGER_NAME=DA_APP
"@

# Ensure directory exists
$envDir = Split-Path $BACKEND_ENV -Parent
if (-not (Test-Path $envDir)) {
    New-Item -ItemType Directory -Path $envDir -Force | Out-Null
}

Set-Content -Path $BACKEND_ENV -Value $envContent
Write-Host "[PASS] Generated $BACKEND_ENV" -ForegroundColor Green
Write-Host ""
Write-Host "Validation:" -ForegroundColor Yellow
if ($OPENAI_ENDPOINT) { Write-Host "  [PASS] AZURE_OPENAI_ENDPOINT" -ForegroundColor Green } else { Write-Host "  [FAIL] AZURE_OPENAI_ENDPOINT is empty" -ForegroundColor Red }
if ($SEARCH_ENDPOINT) { Write-Host "  [PASS] AZURE_SEARCH_SERVICE_ENDPOINT" -ForegroundColor Green } else { Write-Host "  [FAIL] AZURE_SEARCH_SERVICE_ENDPOINT is empty" -ForegroundColor Red }
if ($COSMOS_ENDPOINT) { Write-Host "  [PASS] COSMOSDB_URL" -ForegroundColor Green } else { Write-Host "  [FAIL] COSMOSDB_URL is empty" -ForegroundColor Red }
if ($AI_ENDPOINT) { Write-Host "  [PASS] AZURE_AI_ENDPOINT" -ForegroundColor Green } else { Write-Host "  [FAIL] AZURE_AI_ENDPOINT is empty" -ForegroundColor Red }
if ($DOCINT_ENDPOINT) { Write-Host "  [PASS] AZURE_FORM_RECOGNIZER_ENDPOINT" -ForegroundColor Green } else { Write-Host "  [FAIL] AZURE_FORM_RECOGNIZER_ENDPOINT is empty" -ForegroundColor Red }
