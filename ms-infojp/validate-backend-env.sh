#!/bin/bash
# Validate backend.env has all required values

set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

BACKEND_ENV="base-platform/app/backend/backend.env"

echo -e "${YELLOW}Validating backend.env...${NC}"

if [ ! -f "$BACKEND_ENV" ]; then
    echo -e "${RED}✗ $BACKEND_ENV not found${NC}"
    exit 1
fi

# Check for empty critical values
FAILED=0
CRITICAL_VARS=(
    "AZURE_SEARCH_SERVICE_ENDPOINT"
    "AZURE_OPENAI_ENDPOINT"
    "COSMOSDB_URL"
    "AZURE_AI_ENDPOINT"
    "AZURE_FORM_RECOGNIZER_ENDPOINT"
)

echo ""
echo "Checking critical variables:"
for VAR in "${CRITICAL_VARS[@]}"; do
    VALUE=$(grep "^${VAR}=" "$BACKEND_ENV" | cut -d'=' -f2)
    if [ -z "$VALUE" ]; then
        echo -e "  ${RED}✗ $VAR is empty${NC}"
        FAILED=1
    else
        # Show only first 50 chars
        SHORT_VALUE=$(echo "$VALUE" | cut -c1-50)
        echo -e "  ${GREEN}✓ $VAR${NC} = ${SHORT_VALUE}..."
    fi
done

echo ""
if [ $FAILED -eq 1 ]; then
    echo -e "${RED}✗ Validation FAILED - backend.env has empty critical values${NC}"
    echo ""
    echo "Run this to regenerate:"
    echo "  bash generate-backend-env.sh"
    exit 1
else
    echo -e "${GREEN}✓ Validation PASSED - all critical values present${NC}"
    exit 0
fi
