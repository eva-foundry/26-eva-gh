# MS-InfoJP OpenAI API Configuration Inspector
# Purpose: Check OpenAI API availability and test connection
# Usage: .\scripts\check_openai_api.ps1 -ApiKey "your-api-key"
# Requires: OpenAI API key from platform.openai.com

param(
    [string]$ApiKey = $env:OPENAI_API_KEY,
    [switch]$ExportJson = $true
)

# Enterprise Windows encoding safety
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "[INFO] MS-InfoJP OpenAI API Configuration Inspector" -ForegroundColor Cyan
Write-Host ""

# Check API key
if (-not $ApiKey) {
    Write-Host "[ERROR] No OpenAI API key provided" -ForegroundColor Red
    Write-Host "[INFO] Usage options:" -ForegroundColor Yellow
    Write-Host "  1. .\scripts\check_openai_api.ps1 -ApiKey `"sk-proj-...`"" -ForegroundColor Gray
    Write-Host "  2. Set environment variable: `$env:OPENAI_API_KEY = `"sk-proj-...`"" -ForegroundColor Gray
    Write-Host "  3. Create .env file with OPENAI_API_KEY=sk-proj-..." -ForegroundColor Gray
    Write-Host ""
    Write-Host "[INFO] Get your API key from: https://platform.openai.com/api-keys" -ForegroundColor Cyan
    exit 1
}

# Mask API key for display
$maskedKey = $ApiKey.Substring(0, 7) + "..." + $ApiKey.Substring($ApiKey.Length - 4)
Write-Host "[PASS] OpenAI API key found: $maskedKey" -ForegroundColor Green
Write-Host ""

# Initialize results
$results = @{
    timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    api_key_present = $true
    api_key_masked = $maskedKey
    tests = @{}
}

# Test 1: List Models
Write-Host "[INFO] Testing OpenAI API connection..." -ForegroundColor Yellow
Write-Host "[INFO] Fetching available models..." -ForegroundColor Yellow

try {
    $headers = @{
        "Authorization" = "Bearer $ApiKey"
        "Content-Type" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/models" -Method Get -Headers $headers -TimeoutSec 10
    
    Write-Host "[PASS] Successfully connected to OpenAI API" -ForegroundColor Green
    
    $results.tests["api_connection"] = @{
        status = "success"
        models_count = $response.data.Count
    }
    
    # Filter relevant models for MS-InfoJP
    $chatModels = $response.data | Where-Object { $_.id -like "*gpt-4*" -or $_.id -like "*gpt-3.5*" }
    $embeddingModels = $response.data | Where-Object { $_.id -like "*embedding*" }
    
    Write-Host ""
    Write-Host "=== Chat Models (GPT-4/3.5) ===" -ForegroundColor Magenta
    Write-Host "[FOUND] $($chatModels.Count) chat model(s)" -ForegroundColor Green
    foreach ($model in $chatModels) {
        Write-Host "  - $($model.id)" -ForegroundColor Cyan
        if ($model.owned_by) {
            Write-Host "    Owner: $($model.owned_by)" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "=== Embedding Models ===" -ForegroundColor Magenta
    Write-Host "[FOUND] $($embeddingModels.Count) embedding model(s)" -ForegroundColor Green
    foreach ($model in $embeddingModels) {
        Write-Host "  - $($model.id)" -ForegroundColor Cyan
        if ($model.owned_by) {
            Write-Host "    Owner: $($model.owned_by)" -ForegroundColor Gray
        }
    }
    
    $results.tests["chat_models"] = @{
        count = $chatModels.Count
        models = ($chatModels | ForEach-Object { $_.id })
    }
    
    $results.tests["embedding_models"] = @{
        count = $embeddingModels.Count
        models = ($embeddingModels | ForEach-Object { $_.id })
    }
    
} catch {
    Write-Host "[ERROR] Failed to connect to OpenAI API: $_" -ForegroundColor Red
    $results.tests["api_connection"] = @{
        status = "failed"
        error = $_.Exception.Message
    }
    
    Write-Host ""
    Write-Host "[INFO] Possible issues:" -ForegroundColor Yellow
    Write-Host "  1. Invalid API key" -ForegroundColor Gray
    Write-Host "  2. API key expired or revoked" -ForegroundColor Gray
    Write-Host "  3. Network connectivity issues" -ForegroundColor Gray
    Write-Host "  4. OpenAI API outage" -ForegroundColor Gray
    Write-Host ""
    Write-Host "[INFO] Verify your API key at: https://platform.openai.com/api-keys" -ForegroundColor Cyan
    
    if ($ExportJson) {
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $evidenceDir = Join-Path $PSScriptRoot "..\evidence"
        $outputPath = Join-Path $evidenceDir "openai_api_check_$timestamp.json"
        
        $results | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputPath -Encoding UTF8
        Write-Host "[INFO] Error details exported to: $outputPath" -ForegroundColor Cyan
    }
    
    exit 1
}

# Test 2: Test Chat Completion
Write-Host ""
Write-Host "=== Testing Chat Completion ===" -ForegroundColor Magenta
Write-Host "[INFO] Sending test query to GPT-4..." -ForegroundColor Yellow

try {
    $testPayload = @{
        model = "gpt-4"
        messages = @(
            @{
                role = "user"
                content = "Say 'Hello from MS-InfoJP' in exactly 5 words."
            }
        )
        max_tokens = 50
        temperature = 0.7
    } | ConvertTo-Json -Depth 10
    
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" -Method Post -Headers $headers -Body $testPayload -TimeoutSec 30
    
    $testResponse = $response.choices[0].message.content.Trim()
    
    Write-Host "[PASS] Chat completion successful" -ForegroundColor Green
    Write-Host "  Response: $testResponse" -ForegroundColor Cyan
    Write-Host "  Model: $($response.model)" -ForegroundColor Gray
    Write-Host "  Tokens used: $($response.usage.total_tokens)" -ForegroundColor Gray
    
    $results.tests["chat_completion"] = @{
        status = "success"
        model = $response.model
        response = $testResponse
        tokens_used = $response.usage.total_tokens
    }
    
} catch {
    Write-Host "[WARN] Chat completion failed: $_" -ForegroundColor Yellow
    Write-Host "[INFO] This may indicate insufficient API credits or model access" -ForegroundColor Yellow
    
    $results.tests["chat_completion"] = @{
        status = "failed"
        error = $_.Exception.Message
    }
}

# Test 3: Test Embeddings
Write-Host ""
Write-Host "=== Testing Embeddings ===" -ForegroundColor Magenta
Write-Host "[INFO] Generating test embedding..." -ForegroundColor Yellow

try {
    $embeddingPayload = @{
        model = "text-embedding-ada-002"
        input = "Employment Insurance jurisprudence test"
    } | ConvertTo-Json -Depth 10
    
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/embeddings" -Method Post -Headers $headers -Body $embeddingPayload -TimeoutSec 30
    
    $embeddingDimensions = $response.data[0].embedding.Count
    
    Write-Host "[PASS] Embedding generation successful" -ForegroundColor Green
    Write-Host "  Model: $($response.model)" -ForegroundColor Gray
    Write-Host "  Dimensions: $embeddingDimensions" -ForegroundColor Gray
    Write-Host "  Tokens used: $($response.usage.total_tokens)" -ForegroundColor Gray
    
    $results.tests["embeddings"] = @{
        status = "success"
        model = $response.model
        dimensions = $embeddingDimensions
        tokens_used = $response.usage.total_tokens
    }
    
} catch {
    Write-Host "[WARN] Embedding generation failed: $_" -ForegroundColor Yellow
    
    $results.tests["embeddings"] = @{
        status = "failed"
        error = $_.Exception.Message
    }
}

# Summary
Write-Host ""
Write-Host "=== MS-InfoJP Requirements Check ===" -ForegroundColor Magenta

$requirements = @{
    "API Connection" = ($results.tests["api_connection"].status -eq "success")
    "Chat Models Available" = ($results.tests["chat_models"].count -gt 0)
    "Embedding Models Available" = ($results.tests["embedding_models"].count -gt 0)
    "Chat Completion Works" = ($results.tests["chat_completion"].status -eq "success")
    "Embeddings Work" = ($results.tests["embeddings"].status -eq "success")
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
    Write-Host "[PASS] OpenAI API fully functional - ready for MS-InfoJP integration" -ForegroundColor Green
    Write-Host ""
    Write-Host "[INFO] Recommended models for MS-InfoJP:" -ForegroundColor Cyan
    Write-Host "  - Chat: gpt-4-turbo-preview or gpt-4" -ForegroundColor Gray
    Write-Host "  - Embeddings: text-embedding-ada-002" -ForegroundColor Gray
    Write-Host ""
    Write-Host "[INFO] Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Configure backend.env with OpenAI API settings" -ForegroundColor Gray
    Write-Host "  2. Modify base-platform to use OpenAI API instead of Azure OpenAI" -ForegroundColor Gray
    Write-Host "  3. Or deploy Azure OpenAI to avoid API rate limits" -ForegroundColor Gray
} else {
    Write-Host "[WARN] Some OpenAI API features not working" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "[INFO] Possible issues:" -ForegroundColor Yellow
    Write-Host "  1. Insufficient API credits - check: https://platform.openai.com/account/billing" -ForegroundColor Gray
    Write-Host "  2. Rate limits reached - wait or upgrade plan" -ForegroundColor Gray
    Write-Host "  3. Model access not granted - request access in OpenAI dashboard" -ForegroundColor Gray
}

# Export results to JSON
if ($ExportJson) {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $evidenceDir = Join-Path $PSScriptRoot "..\evidence"
    $outputPath = Join-Path $evidenceDir "openai_api_check_$timestamp.json"
    
    $results | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputPath -Encoding UTF8
    Write-Host ""
    Write-Host "[INFO] Results exported to: $outputPath" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "[INFO] OpenAI API inspection complete" -ForegroundColor Green
