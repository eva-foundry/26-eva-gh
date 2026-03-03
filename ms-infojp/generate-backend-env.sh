#!/bin/bash
# Generate backend.env from Azure resources
# Fallback when Makefile extract-env fails

set +e
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${YELLOW}Generating backend.env from Azure resources...${NC}"

RG="infojp-sandbox"
OPENAI_RG="rg-sandbox"
BACKEND_ENV="base-platform/app/backend/backend.env"

# Get endpoints from Azure (ao-sandbox is in different RG)
OPENAI_ENDPOINT=$(az cognitiveservices account show --name ao-sandbox --resource-group $OPENAI_RG --query "properties.endpoint" -o tsv 2>/dev/null)
SEARCH_ENDPOINT=$(az search service show --name infojp-srch --resource-group $RG --query "endpoint" -o tsv 2>/dev/null)
[ -z "$SEARCH_ENDPOINT" ] && SEARCH_ENDPOINT="https://infojp-srch.search.windows.net/"
COSMOS_ENDPOINT=$(az cosmosdb show --name infojp-cosmos --resource-group $RG --query "documentEndpoint" -o tsv 2>/dev/null)
AI_ENDPOINT=$(az cognitiveservices account show --name infojp-ai-svc --resource-group $RG --query "properties.endpoint" -o tsv 2>/dev/null)
DOCINT_ENDPOINT=$(az cognitiveservices account show --name infojp-doc-intel --resource-group $RG --query "properties.endpoint" -o tsv 2>/dev/null)
STORAGE_ENDPOINT="https://infojpst01.blob.core.windows.net/"

# Generate backend.env
cat > $BACKEND_ENV << EOF
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
EOF

if [ -f "$BACKEND_ENV" ]; then
    echo -e "${GREEN}✓ Generated $BACKEND_ENV${NC}"
    echo ""
    echo "Key endpoints:"
    grep -E "AZURE_OPENAI_ENDPOINT|AZURE_SEARCH_SERVICE_ENDPOINT|COSMOSDB_URL" $BACKEND_ENV | head -3
    exit 0
else
    echo -e "${RED}✗ Failed to generate $BACKEND_ENV${NC}"
    exit 1
fi
