#!/bin/bash
# Minimal MS-InfoJP Setup - No Failures Allowed
# This script continues on errors and uses only reliable methods

echo "=== MS-InfoJP Quick Setup ==="
echo ""

# Don't exit on errors - continue trying
set +e

# Method 1: Check if az already exists
if command -v az &> /dev/null; then
    echo "✓ Azure CLI found: $(which az)"
    az version 2>&1 | head -3
else
    echo "Installing Azure CLI via pip..."
    pip install --user --quiet azure-cli 2>/dev/null
    
    # Add to PATH
    export PATH="$HOME/.local/bin:$PATH"
    
    if command -v az &> /dev/null; then
        echo "✓ Azure CLI installed successfully"
    else
        echo "⚠ Azure CLI installation pending - try: pip install azure-cli"
    fi
fi

echo ""
echo "=== Next Steps ==="
echo ""
echo "1. Authenticate:"
echo "   az login --use-device-code"
echo ""
echo "2. Set subscription:"
echo "   az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a"
echo ""
echo "3. Generate config:"
echo "   cd base-platform && make extract-env"
echo ""
echo "Or run all at once (paste this):"
echo ""
echo "az login --use-device-code && az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a && cd base-platform && make extract-env"
