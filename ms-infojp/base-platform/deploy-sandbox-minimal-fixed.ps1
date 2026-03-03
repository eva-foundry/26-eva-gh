# Deploy MS-InfoJP with Minimal Sandbox SKUs
# Deletes existing deployment and creates fresh with B1/Basic tier resources
# Total cost: ~`$1/month for 1-2 users with 3GB data

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== MS-InfoJP Minimal Sandbox Deployment ===" -ForegroundColor Cyan
Write-Host "This will:" -ForegroundColor Yellow
Write-Host "  1. Delete existing infojp-sandbox resource group" -ForegroundColor Yellow
Write-Host "  2. Update environment file with minimal SKUs (B1 Basic tier)" -ForegroundColor Yellow
Write-Host "  3. Deploy with Terraform" -ForegroundColor Yellow
Write-Host "`nEstimated cost: ~`$1/month" -ForegroundColor Green
Write-Host "  - App Services (3x B1): `$1/month" -ForegroundColor Gray
Write-Host "  - Cognitive Search Basic: `$1/month" -ForegroundColor Gray
Write-Host "  - Cosmos DB Serverless: ~`$1/month" -ForegroundColor Gray
Write-Host "  - Storage: ~`$1/month for 3GB" -ForegroundColor Gray
Write-Host "  - Azure OpenAI: Using existing ao-sandbox (no cost)" -ForegroundColor Gray
Write-Host ""

$confirmation = Read-Host "Proceed? (yes/no)"
if ($confirmation -ne "yes") {
    Write-Host "Cancelled by user" -ForegroundColor Yellow
    exit 0
}

# Step 1: Delete existing resource group
Write-Host "`n[STEP 1] Deleting existing infojp-sandbox resource group..." -ForegroundColor Cyan
$rg = az group show --name infojp-sandbox 2>$null | ConvertFrom-Json
if ($rg) {
    Write-Host "  Found existing resource group, deleting..." -ForegroundColor Yellow
    az group delete --name infojp-sandbox --yes --no-wait
    Write-Host "  Deletion started (runs in background, takes 5-10 minutes)" -ForegroundColor Green
    Write-Host "  Waiting 60 seconds before proceeding..." -ForegroundColor Gray
    Start-Sleep -Seconds 60
} else {
    Write-Host "  No existing resource group found" -ForegroundColor Gray
}

# Step 2: Add SKU overrides to environment file
Write-Host "`n[STEP 2] Adding minimal SKU configuration..." -ForegroundColor Cyan
$envFile = ".\scripts\environments\msinfojp-marco.env"
$skuConfig = @"

# ===== SANDBOX SKU OVERRIDES (Minimal Cost for 3GB data, 1-2 users) =====
# App Service Basic B1: ~``$1/month each (1.75 GB RAM, 1 vCore)
export TF_VAR_appServiceSkuSize="B1"
export TF_VAR_appServiceSkuTier="Basic"
export TF_VAR_enrichmentAppServiceSkuSize="B1"
export TF_VAR_enrichmentAppServiceSkuTier="Basic"
export TF_VAR_functionsAppSkuSize="B1"
export TF_VAR_functionsAppSkuTier="Basic"

# Cognitive Search Basic: ~``$1/month (2GB storage, 15 indexes, 50 indexers)
export TF_VAR_searchServicesSkuName="basic"

# Total estimated cost: ~``$1/month
# Storage, Cosmos DB (serverless), and OpenAI (existing) billed by usage
"@

# Check if SKU config already exists
$content = Get-Content $envFile -Raw
if ($content -notmatch "SANDBOX SKU OVERRIDES") {
    Write-Host "  Adding SKU configuration to $envFile" -ForegroundColor Gray
    Add-Content -Path $envFile -Value $skuConfig
    Write-Host "  SKU configuration added" -ForegroundColor Green
} else {
    Write-Host "  SKU configuration already exists" -ForegroundColor Gray
}

# Step 3: Wait for deletion to complete
Write-Host "`n[STEP 3] Ensuring resource group is deleted..." -ForegroundColor Cyan
$maxWait = 600 # 10 minutes max
$elapsed = 0
$interval = 15

while ($elapsed -lt $maxWait) {
    $rg = az group show --name infojp-sandbox 2>$null | ConvertFrom-Json
    if (-not $rg) {
        Write-Host "  Resource group deleted successfully" -ForegroundColor Green
        break
    }
    Write-Host "  Still deleting... ($elapsed seconds elapsed)" -ForegroundColor Gray
    Start-Sleep -Seconds $interval
    $elapsed += $interval
}

if ($elapsed -ge $maxWait) {
    Write-Host "  WARNING: Deletion taking longer than expected. Proceeding anyway..." -ForegroundColor Yellow
}

# Step 4: Run deployment
Write-Host "`n[STEP 4] Starting deployment with minimal SKUs..." -ForegroundColor Cyan
Write-Host "This will take 20-30 minutes..." -ForegroundColor Yellow
Write-Host ""

$env:PATH = "i:\EVA-JP-v1.2\.tools\terraform;$env:PATH"
& bash ./scripts/inf-create.sh

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== DEPLOYMENT SUCCESSFUL ===" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Extract environment: make extract-env" -ForegroundColor Gray
    Write-Host "  2. Deploy search indexes: make deploy-search-indexes" -ForegroundColor Gray
    Write-Host "  3. Deploy functions: make build-deploy-functions" -ForegroundColor Gray
    Write-Host "  4. Deploy webapp: make build-deploy-webapp" -ForegroundColor Gray
} else {
    Write-Host "`n=== DEPLOYMENT FAILED ===" -ForegroundColor Red
    Write-Host "Check logs for errors" -ForegroundColor Yellow
    exit 1
}

