#!/bin/bash
# Quick Azure Authentication for MS-InfoJP
# Run after setup-codespace.sh completes

echo "============================================"
echo "Azure Authentication & Verification"
echo "============================================"

# Authenticate
echo "Starting device code authentication..."
echo "Follow the prompts to authenticate in your browser"
az login --use-device-code

# Set subscription
echo ""
echo "Setting subscription to MarcoSub..."
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# Verify
echo ""
echo "Current Azure Context:"
az account show --query "{Name:name, SubscriptionId:id, TenantId:tenantId, Username:user.name}" -o table

# Check Azure resources
echo ""
echo "Verifying Azure Resources..."
az resource list --resource-group infojp-sandbox --query "[].{Name:name, Type:type, Location:location}" -o table

# Get OpenAI deployments
echo ""
echo "Azure OpenAI Model Deployments:"
az cognitiveservices account deployment list \
  --name ao-sandbox \
  --resource-group infojp-sandbox \
  --query "[].{Name:name, Model:properties.model.name, Status:properties.provisioningState}" \
  -o table

echo ""
echo "============================================"
echo "Authentication Complete!"
echo "============================================"
echo ""
echo "Next: Generate environment configuration"
echo "  cd base-platform"
echo "  make extract-env"
