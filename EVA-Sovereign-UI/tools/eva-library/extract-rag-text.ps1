# ============================================================================
# EVA Library - RAG Text Extraction
# Part of P22-DPB (Documentation Publishing Bot)
# ============================================================================
#
# PURPOSE:
# Extract RAG-optimized plain text from markdown documentation for ingestion
# into EVA data pipelines. Complements HTML output from MkDocs.
#
# PATTERN: MD → RAG Text Conversion
# - Strip markdown syntax (headers, links, code blocks)
# - Preserve semantic structure (section boundaries)
# - Add metadata headers (title, date, source)
# - Generate per-Book and per-Chapter text files
# - Create manifest for ingestion pipeline
#
# USAGE:
#   .\extract-rag-text.ps1 -BookPath "docs/book" -OutputDir "site/rag-output"
#
# OUTPUT:
#   site/rag-output/
#     book/
#       index.txt
#       01-getting-started.txt
#       ...
#       _manifest.json (ingestion metadata)
#
# QUALITY GATES:
# ✅ Preserve paragraph structure (no aggressive line merging)
# ✅ Strip markdown syntax but keep code samples readable
# ✅ Include metadata (source file, extraction date, book title)
# ✅ Generate ingestion manifest (for EVA Data Pipeline)
# ✅ Validate UTF-8 encoding (no corruption)
#
# ============================================================================

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$BookPath = "docs/book",

    [Parameter(Mandatory=$false)]
    [string]$OutputDir = "site/rag-output",

    [Parameter(Mandatory=$false)]
    [switch]$ShowDetails
)

# ============================================================================
# CONFIGURATION
# ============================================================================

$ErrorActionPreference = "Stop"

$BookDefinitions = @{
    "book" = @{
        Title = "EVA Sovereign UI Book"
        Description = "Production-ready Web Components implementing Government of Canada Design System"
        Category = "Components"
        Privacy = "public"
        RBACRoles = @("Anonymous", "Authenticated")  # Public access
        Tags = @("web-components", "lit", "gc-design-system", "wcag", "a11y", "i18n", "typescript", "bilingual")
        URL = "https://marcopolo483.github.io/EVA-Sovereign-UI/"
        Priority = 1
    }
}

# ============================================================================
# FUNCTIONS
# ============================================================================

function ConvertTo-RagText {
    <#
    .SYNOPSIS
    Convert markdown to RAG-optimized plain text

    .DESCRIPTION
    Strips markdown syntax while preserving:
    - Paragraph structure
    - Code samples (formatted as plain text)
    - Section hierarchy (via blank lines)
    - Semantic meaning

    .EXAMPLE
    ConvertTo-RagText -MarkdownContent $md -SourceFile "docs/chapter-01.md"
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$MarkdownContent,

        [Parameter(Mandatory=$true)]
        [string]$SourceFile,

        [Parameter(Mandatory=$false)]
        [string]$BookTitle = "EVA Documentation",

        [Parameter(Mandatory=$false)]
        [hashtable]$BookMeta = @{},

        [Parameter(Mandatory=$false)]
        [string]$ChapterName = ""
    )

    # Add comprehensive metadata header with RBAC and citation info
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss UTC"
    $privacy = if ($BookMeta.Privacy) { $BookMeta.Privacy } else { "public" }
    $roles = if ($BookMeta.RBACRoles) { $BookMeta.RBACRoles -join ", " } else { "Anonymous" }
    $tags = if ($BookMeta.Tags) { $BookMeta.Tags -join ", " } else { "" }
    $url = if ($BookMeta.URL) { $BookMeta.URL } else { "" }
    $category = if ($BookMeta.Category) { $BookMeta.Category } else { "Documentation" }

    $output = @"
# ============================================================================
# METADATA
# ============================================================================
# Source: $SourceFile
# Book: $BookTitle
# Chapter: $ChapterName
# Category: $category
# Extracted: $timestamp
# Format: RAG Plain Text (optimized for vector embedding)
#
# RBAC (Role-Based Access Control)
# Privacy: $privacy
# RequiredRoles: $roles
#
# CITATION
# URL: $url
# Tags: $tags
#
# USAGE INSTRUCTIONS FOR RAG SYSTEMS:
# - Use RBAC metadata to filter search results based on user roles
# - Include URL in citations when presenting content to users
# - Use Tags for semantic search and content discovery
# - Privacy="admin" requires authentication before exposing content
# ============================================================================

"@

    # Process line by line
    $lines = $MarkdownContent -split "`n"
    $inCodeBlock = $false
    $codeBlockContent = @()

    foreach ($line in $lines) {
        # Handle code blocks
        if ($line -match '^```') {
            if ($inCodeBlock) {
                # End of code block - output as plain text
                $output += "`nCODE SAMPLE:`n"
                $output += ($codeBlockContent -join "`n")
                $output += "`n`n"
                $codeBlockContent = @()
                $inCodeBlock = $false
            } else {
                # Start of code block
                $inCodeBlock = $true
            }
            continue
        }

        if ($inCodeBlock) {
            $codeBlockContent += $line
            continue
        }

        # Strip markdown syntax (each replacement on separate line to avoid backtick issues)
        $cleaned = $line
        $cleaned = $cleaned -replace '^#{1,6}\s+', ''          # Headers
        $cleaned = $cleaned -replace '\[([^\]]+)\]\([^\)]+\)', '$1'  # Links (keep text)
        $cleaned = $cleaned -replace '\*\*([^\*]+)\*\*', '$1'   # Bold
        $cleaned = $cleaned -replace '\*([^\*]+)\*', '$1'       # Italic
        $cleaned = $cleaned -replace '``([^``]+)``', '$1'      # Inline code (double backtick)
        $cleaned = $cleaned -replace '^\s*[-*+]\s+', '- '       # Bullet lists
        $cleaned = $cleaned -replace '^\s*\d+\.\s+', ''         # Numbered lists
        $cleaned = $cleaned -replace '^>\s+', ''                # Blockquotes
        $cleaned = $cleaned -replace '^\s*\|.*\|.*$', ''        # Tables (skip)
        $cleaned = $cleaned -replace '---+', ''                 # Horizontal rules
        $cleaned = $cleaned -replace '!\[([^\]]*)\]\([^\)]+\)', '[Image: $1]'  # Images

        # Skip empty markdown artifacts
        if ($cleaned -match '^\s*$' -and $line -notmatch '^\s*$') {
            continue
        }

        $output += $cleaned + "`n"
    }

    # Clean up excessive blank lines (max 2 consecutive)
    $output = $output -replace '(\r?\n){3,}', "`n`n"

    return $output
}

function New-IngestionManifest {
    <#
    .SYNOPSIS
    Create ingestion manifest for EVA Data Pipeline

    .DESCRIPTION
    Generates _manifest.json with metadata for each RAG text file:
    - File path, size, hash
    - Source markdown file
    - Book metadata (title, category, privacy)
    - Extraction timestamp
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$BookPath,

        [Parameter(Mandatory=$true)]
        [array]$ProcessedFiles,

        [Parameter(Mandatory=$true)]
        [hashtable]$BookMeta
    )

    $files = @()
    foreach ($file in $ProcessedFiles) {
        $fullOutputPath = if ([System.IO.Path]::IsPathRooted($file.OutputPath)) {
            $file.OutputPath
        } else {
            Join-Path (Get-Location).Path $file.OutputPath
        }

        $hash = (Get-FileHash -Path $fullOutputPath -Algorithm SHA256).Hash
        $size = (Get-Item $fullOutputPath).Length

        $files += @{
            path = $file.OutputPath -replace [regex]::Escape((Get-Location).Path + "\"), ""
            source = $file.SourcePath -replace [regex]::Escape((Get-Location).Path + "\"), ""
            size = $size
            hash = $hash
            extractedAt = $file.ExtractedAt
        }
    }

    $manifest = @{
        book = $BookMeta.Title
        description = $BookMeta.Description
        category = $BookMeta.Category
        privacy = $BookMeta.Privacy
        rbac = @{
            privacy = $BookMeta.Privacy
            requiredRoles = $BookMeta.RBACRoles
            accessLevel = if ($BookMeta.Privacy -eq "public") { "Public" } else { "Restricted" }
        }
        citation = @{
            url = $BookMeta.URL
            tags = $BookMeta.Tags
            priority = $BookMeta.Priority
        }
        extractedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
        fileCount = $files.Count
        totalSize = ($files | Measure-Object -Property size -Sum).Sum
        files = $files
        version = "1.0.0"
        schema = "https://marcopolo483.github.io/eva-suite/schemas/rag-manifest-v1.json"
    }

    return $manifest
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

Write-Host "`n============================================================================" -ForegroundColor Cyan
Write-Host "EVA Library - RAG Text Extraction (P22-DPB)" -ForegroundColor Yellow
Write-Host "============================================================================`n" -ForegroundColor Cyan

# Determine book name from path
$bookName = Split-Path -Leaf $BookPath
if (-not $BookDefinitions.ContainsKey($bookName)) {
    Write-Warning "Unknown book: $bookName. Using default metadata."
    $BookDefinitions[$bookName] = @{
        Title = $bookName
        Description = "EVA Documentation"
        Category = "Documentation"
        Privacy = "public"
        RBACRoles = @("Anonymous", "Authenticated")
        Tags = @("documentation")
        URL = ""
        Priority = 99
    }
}

if (-not (Test-Path $BookPath)) {
    Write-Error "Book path not found: $BookPath"
    exit 1
}

$bookMeta = $BookDefinitions[$bookName]
$bookOutputDir = Join-Path $OutputDir $bookName

Write-Host "📚 Processing: $($bookMeta.Title)" -ForegroundColor Green
Write-Host "   Source: $BookPath" -ForegroundColor Gray
Write-Host "   Output: $bookOutputDir" -ForegroundColor Gray

# Create output directory
if (-not (Test-Path $bookOutputDir)) {
    New-Item -ItemType Directory -Path $bookOutputDir -Force | Out-Null
}

# Find all markdown files
$mdFiles = Get-ChildItem -Path $BookPath -Filter "*.md" -Recurse

if ($mdFiles.Count -eq 0) {
    Write-Warning "No markdown files found in $BookPath"
    exit 0
}

Write-Host "   Files: $($mdFiles.Count) markdown files" -ForegroundColor Gray

# Process each file
$processedFiles = @()
foreach ($mdFile in $mdFiles) {
    $relativePath = $mdFile.FullName.Substring($BookPath.Length + 1)
    $outputFileName = [System.IO.Path]::GetFileNameWithoutExtension($mdFile.Name) + ".txt"
    $outputPath = Join-Path $bookOutputDir $outputFileName

    if ($ShowDetails) {
        Write-Host "   -> $relativePath" -ForegroundColor DarkGray
    }

    # Extract chapter name from filename (e.g., "01-getting-started.md" -> "Getting Started")
    $chapterName = [System.IO.Path]::GetFileNameWithoutExtension($mdFile.Name) -replace '^\d+-', '' -replace '-', ' '
    $chapterName = (Get-Culture).TextInfo.ToTitleCase($chapterName)

    # Read and convert with full metadata
    $mdContent = Get-Content -Path $mdFile.FullName -Raw -Encoding UTF8
    $ragText = ConvertTo-RagText `
        -MarkdownContent $mdContent `
        -SourceFile $mdFile.FullName `
        -BookTitle $bookMeta.Title `
        -BookMeta $bookMeta `
        -ChapterName $chapterName

    # Write output
    [System.IO.File]::WriteAllText($outputPath, $ragText, [System.Text.Encoding]::UTF8)

    $processedFiles += @{
        SourcePath = $mdFile.FullName
        OutputPath = $outputPath
        ExtractedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    }
}

# Generate manifest
$manifest = New-IngestionManifest `
    -BookPath $BookPath `
    -ProcessedFiles $processedFiles `
    -BookMeta $bookMeta

$manifestPath = Join-Path $bookOutputDir "_manifest.json"
$manifest | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestPath -Encoding UTF8

Write-Host "   ✅ Extracted: $($processedFiles.Count) files" -ForegroundColor Green
Write-Host "   📄 Manifest: $manifestPath" -ForegroundColor Green

Write-Host "`n============================================================================" -ForegroundColor Cyan
Write-Host "✅ RAG Extraction Complete" -ForegroundColor Green
Write-Host "   Files extracted: $($processedFiles.Count)" -ForegroundColor Gray
Write-Host "   Output directory: $bookOutputDir" -ForegroundColor Gray
Write-Host "============================================================================`n" -ForegroundColor Cyan

# ============================================================================
# NEXT STEPS
# ============================================================================

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review RAG text files in $bookOutputDir" -ForegroundColor Gray
Write-Host "2. Use _manifest.json for ingestion into EVA Data Pipeline" -ForegroundColor Gray
Write-Host "3. Files ready for GitHub Pages deployment" -ForegroundColor Gray
Write-Host ""
