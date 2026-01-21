# Generate sitemap.xml for HISE documentation
# Crawls html_build directory and creates XML sitemap

$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$HTML_BUILD_DIR = Join-Path $SCRIPT_DIR "..\html_build"
$BASE_URL = "https://docs.hise.dev/"
$OUTPUT_FILE = Join-Path $HTML_BUILD_DIR "sitemap.xml"

function Get-Priority {
    param([string]$path)

    $depth = ($path -split '[/\\]').Count

    if ($path -match 'index\.html$' -and $depth -le 2) {
        return "1.0"  # Homepage
    }
    elseif ($depth -le 3) {
        return "0.9"  # Top-level sections
    }
    elseif ($depth -le 4) {
        return "0.8"  # Sub-sections
    }
    elseif ($path -match '[Tt]utorial') {
        return "0.9"  # Tutorials are important
    }
    else {
        return "0.7"  # Other pages
    }
}

function Get-ChangeFreq {
    param([string]$path)

    $depth = ($path -split '[/\\]').Count

    if ($path -match 'index\.html$' -and $depth -le 2) {
        return "weekly"  # Homepage
    }
    elseif ($path -match '[Tt]utorial') {
        return "monthly"
    }
    elseif ($path -match 'scripting-api') {
        return "monthly"  # API docs change occasionally
    }
    else {
        return "monthly"
    }
}

Write-Host "Generating sitemap.xml..."

# Find all HTML files, excluding template and test files
$html_files = Get-ChildItem -Path $HTML_BUILD_DIR -Recurse -Filter "*.html" |
    Where-Object {
        $_.FullName -notmatch '\\template\\' -and
        $_.FullName -notmatch '\\test-' -and
        $_.Name -notmatch '^test-'
    } |
    Sort-Object FullName

Write-Host "Found $($html_files.Count) HTML files"

# Get last modified date
$lastmod = Get-Date -Format "yyyy-MM-dd"

# Start XML document
$xmlHeader = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"@

Set-Content -Path $OUTPUT_FILE -Value $xmlHeader -Encoding UTF8

# Generate URL entries
foreach ($file in $html_files) {
    # Get relative path from html_build directory
    $fullHtmlBuildPath = (Resolve-Path $HTML_BUILD_DIR).Path
    $rel_path = $file.FullName.Substring($fullHtmlBuildPath.Length + 1).Replace('\', '/')

    # Create clean URL path
    $url_path = $rel_path
    if ($url_path -eq "index.html") {
        $url_path = ""
    }

    # Get priority and changefreq
    $priority = Get-Priority $rel_path
    $changefreq = Get-ChangeFreq $rel_path

    # Write URL entry
    $xmlEntry = @"
  <url>
    <loc>${BASE_URL}${url_path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
"@

    Add-Content -Path $OUTPUT_FILE -Value $xmlEntry -Encoding UTF8
}

# Close XML document
Add-Content -Path $OUTPUT_FILE -Value "</urlset>" -Encoding UTF8

Write-Host "OK - Sitemap generated: $OUTPUT_FILE"
Write-Host "  Total URLs: $($html_files.Count)"
