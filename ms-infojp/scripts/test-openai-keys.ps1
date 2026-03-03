# Test OpenAI API Keys
# Purpose: Verify which OpenAI API keys are valid before storing in Key Vault

# KEYS REDACTED - Stored in Azure Key Vault infojp-kv
# To retrieve: az keyvault secret show --vault-name infojp-kv --name OPENAI-API-KEY-PRIMARY
# To retrieve: az keyvault secret show --vault-name infojp-kv --name OPENAI-API-KEY-FALLBACK

Write-Host "[SECURITY] OpenAI API keys have been moved to Azure Key Vault" -ForegroundColor Yellow
Write-Host "[INFO] Keys stored as: OPENAI-API-KEY-PRIMARY, OPENAI-API-KEY-FALLBACK" -ForegroundColor Cyan
Write-Host "[INFO] This script is no longer functional - keys secured" -ForegroundColor Green
exit 0

# Original test code preserved below (keys removed)
<#
$keys = @{
    "EVA_OPENAI_API_KEY (2025-11-24)" = "[REDACTED - In Key Vault]"
    "VS Code Continue (2026-01-21)" = "[REDACTED - In Key Vault]"
}
#>

Write-Host "`n=== Testing OpenAI API Keys ===" -ForegroundColor Cyan

foreach ($keyName in $keys.Keys) {
    $apiKey = $keys[$keyName]
    
    Write-Host "`nTesting: $keyName" -ForegroundColor Yellow
    
    try {
        $headers = @{
            "Authorization" = "Bearer $apiKey"
            "Content-Type" = "application/json"
        }
        
        $body = @{
            model = "gpt-4o-mini"
            messages = @(
                @{
                    role = "user"
                    content = "Say 'API key works' if you can read this."
                }
            )
            max_tokens = 10
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" `
            -Method Post `
            -Headers $headers `
            -Body $body `
            -TimeoutSec 10
        
        $message = $response.choices[0].message.content
        Write-Host "[SUCCESS] Key is valid!" -ForegroundColor Green
        Write-Host "Response: $message" -ForegroundColor Green
        Write-Host "Model: $($response.model)" -ForegroundColor Gray
        Write-Host "Usage: $($response.usage.total_tokens) tokens" -ForegroundColor Gray
        
    } catch {
        Write-Host "[FAILED] Key is invalid or expired" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
Write-Host "Choose the working key to use in your deployment." -ForegroundColor Yellow
