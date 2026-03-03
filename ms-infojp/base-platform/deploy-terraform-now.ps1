# Deploy MS-InfoJP with Terraform - All Variables Set Properly
# This script parses the environment files and sets all variables for Terraform

Set-Location "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform"

Write-Host "`n=== Setting up Terraform environment ===" -ForegroundColor Cyan

# Add terraform to PATH
$env:PATH = "i:\EVA-JP-v1.2\.tools\terraform;$env:PATH"

# Function to parse and set environment variables from bash export files
function Set-EnvFromBashFile {
    param([string]$FilePath)
    
    if (Test-Path $FilePath) {
        Write-Host "Loading: $FilePath" -ForegroundColor Gray
        Get-Content $FilePath | ForEach-Object {
            $line = $_.Trim()
            # Skip comments and empty lines
            if ($line -match '^#' -or $line -eq '') { return }
            
            # Match export VAR=value or VAR=value patterns
            if ($line -match '^export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$' -or $line -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
                $varName = $matches[1]
                $varValue = $matches[2] -replace '^["'']|["'']$', ''  # Remove quotes
                
                # Set the environment variable
                Set-Item -Path "env:$varName" -Value $varValue -Force
                
                # Show key variables
                if ($varName -match 'TF_VAR|AZURE|LOCATION|WORKSPACE|USE_EXISTING') {
                    Write-Host "  $varName = $varValue" -ForegroundColor DarkGray
                }
            }
        }
    } else {
        Write-Host "WARNING: $FilePath not found" -ForegroundColor Yellow
    }
}

# Load both environment files
Write-Host "`nLoading environment files..." -ForegroundColor Cyan
Set-EnvFromBashFile ".\scripts\environments\AzureEnvironments\AzureCloud.env"
Set-EnvFromBashFile ".\scripts\environments\msinfojp-marco.env"

# Ensure critical variables are set
$env:ARM_SUBSCRIPTION_ID = "c59ee575-eb2a-4b51-a865-4b618f9add0a"
$env:TF_VAR_location = "canadacentral"
$env:TF_VAR_workspace = "msinfojp-marco"

Write-Host "`n=== Key Configuration ===" -ForegroundColor Cyan
Write-Host "Workspace: $env:TF_VAR_workspace" -ForegroundColor Green
Write-Host "Location: $env:TF_VAR_location" -ForegroundColor Green
Write-Host "Subscription: $env:ARM_SUBSCRIPTION_ID" -ForegroundColor Green
Write-Host "Using Existing AOAI: $env:USE_EXISTING_AOAI" -ForegroundColor Green
Write-Host "AOAI Service: $env:AZURE_OPENAI_SERVICE_NAME" -ForegroundColor Green
Write-Host "`nApp Service SKU: $env:TF_VAR_appServiceSkuSize / $env:TF_VAR_appServiceSkuTier" -ForegroundColor Yellow
Write-Host "Search SKU: $env:TF_VAR_searchServicesSkuName" -ForegroundColor Yellow

# Change to infra directory
Set-Location .\infra

Write-Host "`n=== Initializing Terraform Workspace ===" -ForegroundColor Cyan
& terraform init

Write-Host "`n=== Selecting/Creating Workspace ===" -ForegroundColor Cyan
& terraform workspace select msinfojp-marco 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating new workspace: msinfojp-marco" -ForegroundColor Yellow
    & terraform workspace new msinfojp-marco
}

Write-Host "`n=== Running Terraform Plan (B1 Basic SKUs for minimal cost) ===" -ForegroundColor Cyan
Write-Host "This will take 1-2 minutes..." -ForegroundColor Gray

& terraform plan -out tfplan-sandbox.tfplan

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== SUCCESS: Plan Complete ===" -ForegroundColor Green
    Write-Host "`nNext step: Run terraform apply to deploy" -ForegroundColor Yellow
    Write-Host "Command: terraform apply tfplan-sandbox.tfplan`n" -ForegroundColor White
} else {
    Write-Host "`n=== FAILED: Check terraform-plan-output.log ===" -ForegroundColor Red
}
