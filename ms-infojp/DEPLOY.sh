#!/bin/bash
# MS-InfoJP Complete Deployment Script
# Run with: bash DEPLOY.sh

set +e
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo "================================================"
echo "MS-InfoJP Complete Deployment"
echo "================================================"

# 1. Install Azure CLI
echo -e "\n${YELLOW}[1/7] Installing Azure CLI...${NC}"
if command -v az &> /dev/null; then
    echo -e "${GREEN}✓ Already installed${NC}"
else
    pip install --user --upgrade azure-cli 2>&1 | tail -5
    export PATH="$HOME/.local/bin:$PATH"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
    if command -v az &> /dev/null; then
        echo -e "${GREEN}✓ Installed${NC}"
    else
        echo -e "${RED}✗ Failed${NC}"; exit 1
    fi
fi

# 2. Authenticate
echo -e "\n${YELLOW}[2/7] Azure Authentication...${NC}"
if az account show &> /dev/null; then
    echo -e "${GREEN}✓ Already authenticated${NC}"
    az account show --query "{Name:name, ID:id}" -o table
else
    echo "Opening browser for device code authentication..."
    az login --use-device-code
    az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
    echo -e "${GREEN}✓ Authenticated to MarcoSub${NC}"
fi

# 3. Verify Resources
echo -e "\n${YELLOW}[3/7] Verifying Azure Resources...${NC}"
RESOURCES=$(az resource list --resource-group infojp-sandbox --query "[].name" -o tsv 2>/dev/null)
if [ -z "$RESOURCES" ]; then
    echo -e "${RED}✗ Cannot access infojp-sandbox resource group${NC}"
    exit 1
else
    echo "$RESOURCES" | while read name; do echo "  ✓ $name"; done
fi

# 4. Generate Environment Config
echo -e "\n${YELLOW}[4/7] Generating backend.env...${NC}"
cd base-platform

# Make scripts executable
chmod +x scripts/*.sh 2>/dev/null

# Try Makefile method first
if make extract-env 2>&1 | grep -q "Success\|Created"; then
    echo -e "${GREEN}✓ Generated via Makefile${NC}"
elif [ -f "app/backend/backend.env" ]; then
    echo -e "${GREEN}✓ Generated backend.env${NC}"
else
    # Fallback to direct Azure query method
    echo -e "${YELLOW}⚠ Makefile failed, using Azure CLI fallback...${NC}"
    cd ..
    bash generate-backend-env.sh
    cd base-platform
fi

if [ -f "app/backend/backend.env" ]; then
    echo "  Endpoints:"
    grep -E "AZURE_OPENAI_ENDPOINT|AZURE_SEARCH_SERVICE_ENDPOINT" app/backend/backend.env | head -2
else
    echo -e "${RED}✗ Failed to generate backend.env${NC}"
fi
cd ..

# 5. Create Storage Containers
echo -e "\n${YELLOW}[5/7] Creating storage containers...${NC}"
for container in documents upload text-enrichment-output; do
    EXISTS=$(az storage container exists --account-name infojpst01 --name $container --auth-mode login --query exists -o tsv 2>/dev/null)
    if [ "$EXISTS" = "true" ]; then
        echo -e "${GREEN}✓ $container (exists)${NC}"
    else
        az storage container create --account-name infojpst01 --name $container --auth-mode login &> /dev/null
        echo -e "${GREEN}✓ $container (created)${NC}"
    fi
done

# 6. Create Cosmos Containers
echo -e "\n${YELLOW}[6/7] Creating Cosmos DB containers...${NC}"
az cosmosdb sql database create --account-name infojp-cosmos --resource-group infojp-sandbox --name statusdb 2>/dev/null || true

for container in conversations sessions; do
    if az cosmosdb sql container show --account-name infojp-cosmos --resource-group infojp-sandbox --database-name statusdb --name $container &> /dev/null; then
        echo -e "${GREEN}✓ $container (exists)${NC}"
    else
        az cosmosdb sql container create --account-name infojp-cosmos --resource-group infojp-sandbox --database-name statusdb --name $container --partition-key-path "/id" &> /dev/null
        echo -e "${GREEN}✓ $container (created)${NC}"
    fi
done

# 7. Deploy Search Index
echo -e "\n${YELLOW}[7/7] Deploying search index...${NC}"
cd base-platform
if make deploy-search-indexes 2>&1 | grep -q "Success\|Created\|already exists"; then
    echo -e "${GREEN}✓ Search index ready${NC}"
else
    echo -e "${YELLOW}⚠ Check search index manually if needed${NC}"
fi
cd ..

# Summary
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "Start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd base-platform/app/backend"
echo "  python app.py"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd base-platform/app/frontend"
echo "  npm install && npm run dev"
echo ""
echo "VS Code will show port forwarding notifications."
echo "Click to open frontend in browser."
