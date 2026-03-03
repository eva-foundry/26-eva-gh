# MS-InfoJP Azure Resource Inspector
# Purpose: Inspect Azure subscription for resources needed by MS-InfoJP
# Subscription: c59ee575-eb2a-4b51-a865-4b618f9add0a
# Usage: .\scripts\inspect_azure_resources.ps1
# Requires: Azure CLI (az) and valid authentication

param(
    [string]$SubscriptionId = "c59ee575-eb2a-4b51-a865-4b618f9add0a",
    [switch]$ExportJson = $true
)

# Enterprise Windows encoding safety
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "[INFO] MS-InfoJP Azure Resource Inspector" -ForegroundColor Cyan
Write-Host "[INFO] Subscription ID: $SubscriptionId" -ForegroundColor Cyan
Write-Host ""

# Check Azure CLI authentication
Write-Host "[INFO] Checking Azure CLI authentication..." -ForegroundColor Yellow
$accountCheck = az account show 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Not authenticated to Azure CLI" -ForegroundColor Red
    Write-Host "[INFO] Please run: az login" -ForegroundColor Yellow
    exit 1
}

Write-Host "[PASS] Azure CLI authenticated" -ForegroundColor Green
Write-Host ""

# Set subscription context
Write-Host "[INFO] Setting subscription context..." -ForegroundColor Yellow
az account set --subscription $SubscriptionId 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to set subscription context" -ForegroundColor Red
    Write-Host "[INFO] Available subscriptions:" -ForegroundColor Yellow
    az account list --output table
    exit 1
}

Write-Host "[PASS] Subscription context set" -ForegroundColor Green
Write-Host ""

# Initialize results object
$results = @{
    timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    subscription_id = $SubscriptionId
    resources = @{}
}

# Function to check resource type
function Check-AzureResourceType {
    param(
        [string]$ResourceType,
        [string]$DisplayName,
        [string]$AzCommand
    )
    
    Write-Host "[INFO] Checking $DisplayName..." -ForegroundColor Yellow
    
    try {
        $output = Invoke-Expression "$AzCommand --output json" 2>&1
        
        if ($LASTEXITCODE -eq 0 -and $output) {
            $resources = $output | ConvertFrom-Json
            
            if ($resources -is [Array]) {
                $count = $resources.Count
            } elseif ($resources) {
                $count = 1
                $resources = @($resources)
            } else {
                $count = 0
                $resources = @()
            }
            
            Write-Host "[FOUND] $count $DisplayName instance(s)" -ForegroundColor Green
            
            $results.resources[$ResourceType] = @{
                count = $count
                instances = $resources
            }
            
            # Display details
            if ($count -gt 0) {
                foreach ($resource in $resources) {
                    Write-Host "  - Name: $($resource.name)" -ForegroundColor Cyan
                    if ($resource.location) {
                        Write-Host "    Location: $($resource.location)" -ForegroundColor Gray
                    }
                    if ($resource.resourceGroup) {
                        Write-Host "    Resource Group: $($resource.resourceGroup)" -ForegroundColor Gray
                    }
                    if ($resource.endpoint) {
                        Write-Host "    Endpoint: $($resource.endpoint)" -ForegroundColor Gray
                    }
                    if ($resource.properties -and $resource.properties.endpoint) {
                        Write-Host "    Endpoint: $($resource.properties.endpoint)" -ForegroundColor Gray
                    }
                }
            }
            
            return $true
        } else {
            Write-Host "[NOT FOUND] No $DisplayName instances" -ForegroundColor Yellow
            $results.resources[$ResourceType] = @{
                count = 0
                instances = @()
            }
            return $false
        }
    } catch {
        Write-Host "[ERROR] Failed to check $DisplayName : $_" -ForegroundColor Red
        $results.resources[$ResourceType] = @{
            count = 0
            instances = @()
            error = $_.Exception.Message
        }
        return $false
    }
    
    Write-Host ""
}

# Check Azure OpenAI
Write-Host "=== Azure OpenAI ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_openai" -DisplayName "Azure OpenAI" -AzCommand "az cognitiveservices account list --query `"[?kind=='OpenAI']`""
Write-Host ""

# Check Azure OpenAI Deployments (if OpenAI exists)
if ($results.resources["azure_openai"].count -gt 0) {
    $openaiAccount = $results.resources["azure_openai"].instances[0]
    $openaiName = $openaiAccount.name
    $openaiRg = $openaiAccount.resourceGroup
    
    Write-Host "[INFO] Checking Azure OpenAI deployments for: $openaiName" -ForegroundColor Yellow
    $deployments = az cognitiveservices account deployment list --name $openaiName --resource-group $openaiRg --output json 2>&1
    
    if ($LASTEXITCODE -eq 0 -and $deployments) {
        $deploymentsObj = $deployments | ConvertFrom-Json
        Write-Host "[FOUND] $($deploymentsObj.Count) deployment(s)" -ForegroundColor Green
        
        $results.resources["azure_openai_deployments"] = @{
            count = $deploymentsObj.Count
            instances = $deploymentsObj
        }
        
        foreach ($deployment in $deploymentsObj) {
            Write-Host "  - Deployment: $($deployment.name)" -ForegroundColor Cyan
            if ($deployment.properties.model) {
                Write-Host "    Model: $($deployment.properties.model.name) ($($deployment.properties.model.version))" -ForegroundColor Gray
            }
            if ($deployment.sku) {
                Write-Host "    Capacity: $($deployment.sku.capacity)" -ForegroundColor Gray
            }
        }
    }
    Write-Host ""
}

# Check Azure Cognitive Search
Write-Host "=== Azure Cognitive Search ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_search" -DisplayName "Azure Cognitive Search" -AzCommand "az search service list"
Write-Host ""

# Check Azure Cosmos DB
Write-Host "=== Azure Cosmos DB ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_cosmosdb" -DisplayName "Azure Cosmos DB" -AzCommand "az cosmosdb list"
Write-Host ""

# Check Azure Storage Accounts
Write-Host "=== Azure Storage ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_storage" -DisplayName "Azure Storage Accounts" -AzCommand "az storage account list"
Write-Host ""

# Check Azure Key Vault
Write-Host "=== Azure Key Vault ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_keyvault" -DisplayName "Azure Key Vault" -AzCommand "az keyvault list"
Write-Host ""

# Check Azure App Service
Write-Host "=== Azure App Service ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_appservice" -DisplayName "Azure App Service" -AzCommand "az webapp list"
Write-Host ""

# Check Azure Functions
Write-Host "=== Azure Functions ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "azure_functions" -DisplayName "Azure Functions" -AzCommand "az functionapp list"
Write-Host ""

# Check Resource Groups
Write-Host "=== Resource Groups ===" -ForegroundColor Magenta
Check-AzureResourceType -ResourceType "resource_groups" -DisplayName "Resource Groups" -AzCommand "az group list"
Write-Host ""

# Summary
Write-Host "=== Summary ===" -ForegroundColor Magenta
Write-Host "[INFO] Resources found:" -ForegroundColor Cyan

$totalResources = 0
foreach ($resourceType in $results.resources.Keys) {
    $count = $results.resources[$resourceType].count
    $totalResources += $count
    
    $status = if ($count -gt 0) { "[PASS]" } else { "[WARN]" }
    $color = if ($count -gt 0) { "Green" } else { "Yellow" }
    
    Write-Host "$status $resourceType : $count" -ForegroundColor $color
}

Write-Host ""
Write-Host "[INFO] Total resources: $totalResources" -ForegroundColor Cyan

# MS-InfoJP Requirements Check
Write-Host ""
Write-Host "=== MS-InfoJP Requirements Check ===" -ForegroundColor Magenta

$requirements = @{
    "Azure OpenAI" = ($results.resources["azure_openai"].count -gt 0)
    "Azure Cognitive Search" = ($results.resources["azure_search"].count -gt 0)
    "Azure Cosmos DB" = ($results.resources["azure_cosmosdb"].count -gt 0)
    "Azure Storage" = ($results.resources["azure_storage"].count -gt 0)
}

$allRequirementsMet = $true
foreach ($requirement in $requirements.Keys) {
    $met = $requirements[$requirement]
    $status = if ($met) { "[PASS]" } else { "[FAIL]" }
    $color = if ($met) { "Green" } else { "Red" }
    
    Write-Host "$status $requirement" -ForegroundColor $color
    
    if (-not $met) {
        $allRequirementsMet = $false
    }
}

Write-Host ""
if ($allRequirementsMet) {
    Write-Host "[PASS] All MS-InfoJP requirements met - ready for Phase 0" -ForegroundColor Green
} else {
    Write-Host "[WARN] Some MS-InfoJP requirements not met - may need resource provisioning" -ForegroundColor Yellow
    Write-Host "[INFO] Consider deploying infrastructure with: cd base-platform && make infrastructure" -ForegroundColor Yellow
}

# Cost Analysis
Write-Host ""
Write-Host "=== Cost Analysis ===" -ForegroundColor Magenta
Write-Host "[INFO] Attempting to retrieve cost data..." -ForegroundColor Yellow

$costData = @{
    method = "none"
    success = $false
    error = $null
    data = $null
}

# Try Method 1: az consumption usage list (requires Cost Management Reader role)
Write-Host "[INFO] Trying consumption usage list..." -ForegroundColor Yellow
$startDate = (Get-Date).AddDays(-30).ToString("yyyy-MM-dd")
$endDate = (Get-Date).ToString("yyyy-MM-dd")

$usageOutput = az consumption usage list --start-date $startDate --end-date $endDate --output json 2>&1

if ($LASTEXITCODE -eq 0 -and $usageOutput) {
    try {
        $usageData = $usageOutput | ConvertFrom-Json
        
        if ($usageData -and $usageData.Count -gt 0) {
            Write-Host "[PASS] Retrieved usage data for last 30 days" -ForegroundColor Green
            
            # Calculate total cost
            $totalCost = 0
            $costByResource = @{}
            
            foreach ($usage in $usageData) {
                if ($usage.pretaxCost) {
                    $totalCost += [decimal]$usage.pretaxCost
                }
                
                if ($usage.instanceName -and $usage.pretaxCost) {
                    $resourceName = $usage.instanceName
                    if (-not $costByResource.ContainsKey($resourceName)) {
                        $costByResource[$resourceName] = 0
                    }
                    $costByResource[$resourceName] += [decimal]$usage.pretaxCost
                }
            }
            
            Write-Host "[INFO] Total cost (last 30 days): `$$($totalCost.ToString('F2'))" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "[INFO] Top 10 resources by cost:" -ForegroundColor Cyan
            
            $topResources = $costByResource.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10
            foreach ($resource in $topResources) {
                Write-Host "  - $($resource.Key): `$$($resource.Value.ToString('F2'))" -ForegroundColor Gray
            }
            
            $costData.method = "consumption_usage"
            $costData.success = $true
            $costData.data = @{
                total_cost = $totalCost
                period = "30_days"
                start_date = $startDate
                end_date = $endDate
                by_resource = $costByResource
            }
        } else {
            Write-Host "[WARN] No usage data available" -ForegroundColor Yellow
            $costData.error = "No usage data returned"
        }
    } catch {
        Write-Host "[ERROR] Failed to parse usage data: $_" -ForegroundColor Red
        $costData.error = $_.Exception.Message
    }
} else {
    Write-Host "[WARN] Consumption usage list not available" -ForegroundColor Yellow
    $costData.error = "Command failed or permission denied"
}

# Try Method 2: Resource Graph query for resource details + SKU analysis
if (-not $costData.success) {
    Write-Host ""
    Write-Host "[INFO] Trying resource details analysis..." -ForegroundColor Yellow
    
    $allResources = az resource list --output json 2>&1
    
    if ($LASTEXITCODE -eq 0 -and $allResources) {
        try {
            $resourceList = $allResources | ConvertFrom-Json
            Write-Host "[PASS] Retrieved $($resourceList.Count) resources" -ForegroundColor Green
            
            $estimatedCosts = @{}
            $totalEstimated = 0
            
            foreach ($resource in $resourceList) {
                $resourceType = $resource.type
                $resourceName = $resource.name
                $sku = $resource.sku
                
                # Estimate costs based on resource type and SKU
                $monthlyCost = 0
                
                switch -Wildcard ($resourceType) {
                    "*Microsoft.DocumentDB/databaseAccounts*" {
                        if ($sku.name -match "Standard") { $monthlyCost = 25 }
                        else { $monthlyCost = 50 }
                    }
                    "*Microsoft.Storage/storageAccounts*" {
                        $monthlyCost = 2
                    }
                    "*Microsoft.Web/sites*" {
                        if ($sku.tier -match "Free") { $monthlyCost = 0 }
                        elseif ($sku.tier -match "Basic") { $monthlyCost = 13 }
                        elseif ($sku.tier -match "Standard") { $monthlyCost = 75 }
                        elseif ($sku.tier -match "Premium") { $monthlyCost = 150 }
                        else { $monthlyCost = 50 }
                    }
                    "*Microsoft.Web/serverFarms*" {
                        if ($sku.tier -match "Free") { $monthlyCost = 0 }
                        elseif ($sku.tier -match "Basic") { $monthlyCost = 13 }
                        elseif ($sku.tier -match "Standard") { $monthlyCost = 75 }
                        else { $monthlyCost = 50 }
                    }
                    "*Microsoft.DBforPostgreSQL*" {
                        $monthlyCost = 50
                    }
                    "*Microsoft.Compute/virtualMachines*" {
                        if ($sku.name -match "Standard_B") { $monthlyCost = 30 }
                        elseif ($sku.name -match "Standard_D") { $monthlyCost = 100 }
                        else { $monthlyCost = 150 }
                    }
                    "*Microsoft.CognitiveServices/accounts*" {
                        if ($resource.kind -eq "OpenAI") { $monthlyCost = 1000 }
                        else { $monthlyCost = 50 }
                    }
                    "*Microsoft.Search/searchServices*" {
                        if ($sku.name -match "basic") { $monthlyCost = 75 }
                        elseif ($sku.name -match "standard") { $monthlyCost = 250 }
                        else { $monthlyCost = 150 }
                    }
                    "*Microsoft.ContainerInstance*" { $monthlyCost = 10 }
                    "*Microsoft.App/containerApps*" { $monthlyCost = 20 }
                    default { $monthlyCost = 5 }
                }
                
                if ($monthlyCost -gt 0) {
                    $estimatedCosts[$resourceName] = @{
                        type = $resourceType
                        sku = if ($sku.name) { $sku.name } else { "N/A" }
                        estimated_monthly = $monthlyCost
                    }
                    $totalEstimated += $monthlyCost
                }
            }
            
            Write-Host ""
            Write-Host "[INFO] Estimated monthly cost: `$$($totalEstimated.ToString('F2'))" -ForegroundColor Cyan
            Write-Host "[WARN] This is an estimate based on typical SKU pricing" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "[INFO] Top 10 estimated costs by resource:" -ForegroundColor Cyan
            
            $topEstimated = $estimatedCosts.GetEnumerator() | Sort-Object { $_.Value.estimated_monthly } -Descending | Select-Object -First 10
            foreach ($item in $topEstimated) {
                $name = $item.Key
                $details = $item.Value
                Write-Host "  - $name ($($details.sku)): ~`$$($details.estimated_monthly)" -ForegroundColor Gray
            }
            
            $costData.method = "resource_sku_estimation"
            $costData.success = $true
            $costData.data = @{
                total_estimated = $totalEstimated
                note = "Estimated based on typical SKU pricing"
                by_resource = $estimatedCosts
            }
            
        } catch {
            Write-Host "[ERROR] Failed to analyze resources: $_" -ForegroundColor Red
            $costData.error = $_.Exception.Message
        }
    } else {
        Write-Host "[ERROR] Failed to retrieve resource list" -ForegroundColor Red
        $costData.error = "Resource list command failed"
    }
}

# Add cost data to results
$results.cost_analysis = $costData

Write-Host ""
Write-Host "[INFO] For exact costs, visit Azure Portal:" -ForegroundColor Cyan
Write-Host "  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/costanalysis" -ForegroundColor Gray

# Export results to JSON
if ($ExportJson) {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $evidenceDir = Join-Path $PSScriptRoot "..\evidence"
    
    # Create evidence directory if it doesn't exist
    if (-not (Test-Path $evidenceDir)) {
        New-Item -ItemType Directory -Path $evidenceDir -Force | Out-Null
    }
    
    $outputPath = Join-Path $evidenceDir "azure_resources_inspection_$timestamp.json"
    
    $results | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputPath -Encoding UTF8
    Write-Host ""
    Write-Host "[INFO] Results exported to: $outputPath" -ForegroundColor Cyan
    
    # Also export to .eva-cache for inventory tracking
    $cacheDir = Join-Path $PSScriptRoot "..\..\..\.eva-cache"
    if (-not (Test-Path $cacheDir)) {
        New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
    }
    
    $cacheOutputPath = Join-Path $cacheDir "azure-inventory-PayAsYouGoSubs1-$timestamp.json"
    $results | ConvertTo-Json -Depth 10 | Out-File -FilePath $cacheOutputPath -Encoding UTF8
    Write-Host "[INFO] Inventory cached to: $cacheOutputPath" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "[INFO] Azure resource inspection complete" -ForegroundColor Green
