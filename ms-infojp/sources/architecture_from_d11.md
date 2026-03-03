# D1.1 – Jurisprudence MVP Architecture (Extract)

## Baseline Architecture (ABRG-aligned)
- Web App (App Service / Container-based)
- Backend API
- Azure OpenAI
- Azure AI Search
- Azure Storage (PDF/HTML storage)
- Azure Key Vault
- Azure APIM (shared entry point)

## Data Flow
1. Poll CanLII metadata for changes (CDC)
2. Download updated/new case documents (PDF/HTML)
3. Parse and extract text
4. Enrich with metadata (court, date, outcome, EI topics)
5. Chunk and embed
6. Index in Azure AI Search
7. Retrieve + generate answers with citations

## Notes
- CanLII API provides metadata only
- Full text comes from scraped/downloaded documents
- Language separation exists at index level, not UI
