#!/bin/bash
# MS-InfoJP Codespace Setup Script
# Handles all failure scenarios and ensures working environment
# Run with: bash setup-codespace.sh

set -e

echo "============================================"
echo "MS-InfoJP Codespace Setup & Diagnostics"
echo "============================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check command availability
command_exists() {
    command -v "$1" &> /dev/null
}

# Function to install Azure CLI (multiple methods)
install_azure_cli() {
    echo -e "${YELLOW}Installing Azure CLI...${NC}"
    
    # Method 1: Try standalone installer (most reliable)
    if ! command_exists az; then
        echo "Attempting standalone installer..."
        curl -L https://aka.ms/InstallAzureCli -o /tmp/install_az.sh
        bash /tmp/install_az.sh --install-dir $HOME/azure-cli --bin-dir $HOME/bin
        export PATH="$HOME/bin:$PATH"
        echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
    fi
    
    # Method 2: If standalone fails, try apt with retry logic
    if ! command_exists az; then
        echo "Attempting apt installation..."
        # Remove bad GPG keys first
        sudo rm -f /etc/apt/trusted.gpg.d/microsoft.gpg 2>/dev/null || true
        
        # Install prerequisites
        sudo apt-get update 2>/dev/null || true
        sudo apt-get install -y ca-certificates curl apt-transport-https lsb-release gnupg 2>/dev/null || true
        
        # Get Microsoft signing key (ignore GPG errors)
        curl -sL https://packages.microsoft.com/keys/microsoft.asc | \
            gpg --dearmor 2>/dev/null | \
            sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null || true
        
        # Add Azure CLI repository
        AZ_REPO=$(lsb_release -cs)
        echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | \
            sudo tee /etc/apt/sources.list.d/azure-cli.list > /dev/null
        
        # Install with error suppression
        sudo apt-get update 2>/dev/null || true
        sudo apt-get install -y azure-cli 2>/dev/null || true
    fi
    
    # Method 3: Use Python pip as last resort
    if ! command_exists az; then
        echo "Attempting pip installation..."
        pip install --user azure-cli
        export PATH="$HOME/.local/bin:$PATH"
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
    fi
}

# Diagnostics
echo -e "\n${YELLOW}=== System Diagnostics ===${NC}"
echo "OS: $(lsb_release -d | cut -f2)"
echo "Python: $(python3 --version)"
echo "Pip: $(pip --version 2>/dev/null || echo 'not installed')"

# Check Azure CLI
echo -e "\n${YELLOW}=== Azure CLI Check ===${NC}"
if command_exists az; then
    echo -e "${GREEN}✓ Azure CLI is installed${NC}"
    az version --output table 2>/dev/null || az --version | head -5
else
    echo -e "${RED}✗ Azure CLI not found${NC}"
    install_azure_cli
    
    if command_exists az; then
        echo -e "${GREEN}✓ Azure CLI successfully installed${NC}"
    else
        echo -e "${RED}✗ Azure CLI installation failed${NC}"
        echo "Manual installation required. See: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli"
        exit 1
    fi
fi

# Check Python packages
echo -e "\n${YELLOW}=== Python Environment ===${NC}"
REQUIRED_PACKAGES=("azure-cosmos" "azure-identity" "azure-keyvault-secrets")
for pkg in "${REQUIRED_PACKAGES[@]}"; do
    if pip show "$pkg" &>/dev/null; then
        echo -e "${GREEN}✓ $pkg${NC}"
    else
        echo -e "${RED}✗ $pkg (installing...)${NC}"
        pip install --user "$pkg"
    fi
done

# Check Node.js
echo -e "\n${YELLOW}=== Node.js Check ===${NC}"
if command_exists node; then
    echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"
    echo -e "${GREEN}✓ npm: $(npm --version)${NC}"
else
    echo -e "${RED}✗ Node.js not installed${NC}"
fi

# Check Make
echo -e "\n${YELLOW}=== Build Tools ===${NC}"
if command_exists make; then
    echo -e "${GREEN}✓ Make: $(make --version | head -1)${NC}"
else
    echo -e "${RED}✗ Make not found${NC}"
fi

# Azure Authentication Status
echo -e "\n${YELLOW}=== Azure Authentication ===${NC}"
if az account show &>/dev/null; then
    echo -e "${GREEN}✓ Already authenticated${NC}"
    az account show --query "{Name:name, Subscription:id, Tenant:tenantId}" -o table
else
    echo -e "${YELLOW}! Not authenticated${NC}"
fi

# Summary & Next Steps
echo -e "\n${GREEN}============================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}============================================${NC}"

if ! az account show &>/dev/null; then
    echo -e "\n${YELLOW}Next: Authenticate to Azure${NC}"
    echo ""
    echo "Run these commands:"
    echo ""
    echo "  az login --use-device-code"
    echo "  az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a"
    echo "  az account show"
    echo ""
    echo -e "${YELLOW}Then proceed with environment setup:${NC}"
    echo "  cd base-platform && make extract-env"
else
    echo -e "\n${GREEN}Ready to generate environment config!${NC}"
    echo "Run: cd base-platform && make extract-env"
fi
